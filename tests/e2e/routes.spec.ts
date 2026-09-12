import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = "https://www.andreabelalcazar.com";

/** Rutas representativas de cada tipo (el sitemap cubre el resto). */
const routes = [
  "/sobre-mi",
  "/servicios",
  "/servicios/gestion-de-crisis",
  "/casos",
  "/casos/concejo-de-cali",
  "/blog",
  "/glosario",
  "/glosario/jefe-de-prensa",
  "/prensa",
  "/contacto",
];

test.describe("rutas de contenido", () => {
  for (const route of routes) {
    test(`${route}: metadata, h1 único, breadcrumbs, JSON-LD y accesibilidad`, async ({ page }) => {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(90);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc?.length ?? 0).toBeGreaterThanOrEqual(100);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${BASE}${route}`);
      await expect(page.getByRole("navigation", { name: "Ruta de navegación" })).toBeVisible();
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = ld.flatMap((t) => JSON.parse(t)["@graph"].map((n: { "@type": string }) => n["@type"]));
      expect(types).toContain("BreadcrumbList");
      await expect(page.locator('a[href="#"]')).toHaveCount(0);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
    });
  }

  test("un artículo del blog tiene Article, FAQPage y su imagen OG propia", async ({ page, request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const m = sitemap.match(new RegExp(`${BASE}/blog/([a-z0-9-]+)</loc>`));
    test.skip(!m, "aún no hay artículos publicados");
    const slug = m![1];
    await page.goto(`/blog/${slug}`);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ld.flatMap((t) => JSON.parse(t)["@graph"].map((n: { "@type": string }) => n["@type"]));
    expect(types).toEqual(expect.arrayContaining(["Article", "BreadcrumbList", "FAQPage"]));
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toContain(`/blog/${slug}/opengraph-image`);
    const img = await request.get(`/blog/${slug}/opengraph-image`);
    expect(img.status()).toBe(200);
    expect((await img.body()).byteLength).toBeLessThan(300_000);
    await expect(page.locator('meta[property="article:published_time"]')).toHaveCount(1);
  });

  test("sitemap cubre todas las secciones y el RSS es válido", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const locs = sitemap.match(/<loc>/g)?.length ?? 0;
    expect(locs).toBeGreaterThanOrEqual(45);
    for (const p of [
      "/servicios/jefatura-de-prensa",
      "/casos/concejo-de-cali",
      "/glosario/vocero",
      "/prensa",
      "/contacto",
    ]) {
      expect(sitemap).toContain(`<loc>${BASE}${p}</loc>`);
    }
    const rss = await request.get("/rss.xml");
    expect(rss.status()).toBe(200);
    expect(rss.headers()["content-type"]).toContain("application/rss+xml");
    const xml = await rss.text();
    expect(xml).toContain("<rss");
    expect(xml).toContain("<channel>");
  });

  test("Search Console verification presente", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="google-site-verification"]')).toHaveAttribute("content", /.{20,}/);
  });
});
