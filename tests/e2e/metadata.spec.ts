import { expect, test } from "@playwright/test";

const BASE = "https://www.andreabelalcazar.com";

test.describe("descubrimiento y metadatos", () => {
  test("robots.txt, sitemap.xml, manifest, iconos y OG responden 200", async ({ request }) => {
    for (const path of [
      "/robots.txt",
      "/sitemap.xml",
      "/manifest.webmanifest",
      "/icon.svg",
      "/apple-icon",
      "/opengraph-image",
      "/twitter-image",
      "/llms.txt",
      "/.well-known/security.txt",
    ]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
  });

  test("la imagen Open Graph pesa menos de 300 KB y es 1200×630", async ({ request, page }) => {
    const res = await request.get("/opengraph-image");
    expect(res.headers()["content-type"]).toContain("image/png");
    const body = await res.body();
    expect(body.byteLength).toBeLessThan(300_000);
    await page.goto("/");
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toContain("/opengraph-image");
  });

  test("robots.txt declara el sitemap y el sitemap contiene la home", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain(`Sitemap: ${BASE}/sitemap.xml`);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain(`<loc>${BASE}/</loc>`);
  });

  test("la home tiene canonical, theme-color, lang es-CO, un solo h1 y JSON-LD válido", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es-CO");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`^${BASE}/?$`));
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0A0A0B");
    await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title();
    expect(title.length).toBeLessThanOrEqual(70);
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(ld ?? "{}");
    const types = graph["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toEqual(expect.arrayContaining(["WebSite", "Person"]));
    const person = graph["@graph"].find((n: { "@type": string }) => n["@type"] === "Person");
    expect(person.jobTitle).toBe("Jefe de Prensa y Relaciones Públicas");
    expect(JSON.stringify(person)).not.toContain("twitter.com/andreabelalcazar");
  });

  test("cabeceras de seguridad presentes", async ({ request }) => {
    const h = (await request.get("/")).headers();
    for (const key of [
      "content-security-policy",
      "strict-transport-security",
      "x-frame-options",
      "cross-origin-opener-policy",
      "x-content-type-options",
      "referrer-policy",
      "permissions-policy",
    ]) {
      expect(h[key], key).toBeTruthy();
    }
    expect(h["x-powered-by"]).toBeUndefined();
  });

  test("la 404 es de marca, en español y no se indexa", async ({ page }) => {
    const res = await page.goto("/esta-ruta-no-existe");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/no existe/i);
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("link", { name: "Ir al inicio" })).toBeVisible();
  });
});
