import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function noSeriousA11y(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
}

test.describe("home", () => {
  test("carga con las fuentes reales aplicadas", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const family = await h1.evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toContain("Playfair Display");
    const bodyFamily = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    expect(bodyFamily).toContain("Inter");
  });

  test("no descarga el vídeo ni terceros en la carga inicial", async ({ page }) => {
    const urls: string[] = [];
    page.on("request", (r) => urls.push(r.url()));
    await page.goto("/", { waitUntil: "networkidle" });
    expect(urls.filter((u) => /\.(mp4|webm)(\?|$)/.test(u))).toEqual([]);
    expect(urls.filter((u) => u.includes("transparenttextures"))).toEqual([]);
  });

  test("el retrato LCP se precarga, no es lazy y tiene sizes", async ({ page }) => {
    await page.goto("/");
    const img = page.getByRole("img", { name: /Andrea Belalcázar, jefe de prensa/ });
    await expect(img).not.toHaveAttribute("loading", "lazy");
    await expect(img).toHaveAttribute("sizes", /min-width/);
    await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(1);
  });

  test("todos los enlaces de WhatsApp llevan texto prellenado y abren en pestaña nueva", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('a[href^="https://wa.me/573105354473"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toContain("?text=");
      expect(await links.nth(i).getAttribute("target")).toBe("_blank");
    }
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  });

  test("sin scroll horizontal ni texto menor de 12 px", async ({ page }) => {
    await page.goto("/");
    const metrics = await page.evaluate(() => ({
      hScroll: document.documentElement.scrollWidth > window.innerWidth,
      minFont: Math.min(
        ...Array.from(document.querySelectorAll("a,p,span,li,dt,dd,h1,h2,h3,figcaption,button"))
          .filter((e) => (e as HTMLElement).innerText?.trim() && getComputedStyle(e).display !== "none")
          .map((e) => parseFloat(getComputedStyle(e).fontSize)),
      ),
    }));
    expect(metrics.hScroll).toBe(false);
    expect(metrics.minFont).toBeGreaterThanOrEqual(12);
  });

  test("accesibilidad sin violaciones serias (axe)", async ({ page }) => {
    await page.goto("/");
    await noSeriousA11y(page);
  });
});

test.describe("navegación móvil", () => {
  test.skip(({ isMobile }) => !isMobile, "solo en el proyecto móvil");

  test("el menú abre, navega y cierra con Escape", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Abrir menú" });
    await expect(button).toBeVisible();
    await button.click();
    const dialog = page.getByRole("dialog", { name: "Menú principal" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Trayectoria" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
  });

  test("el botón flotante no tapa los CTAs del hero", async ({ page }) => {
    await page.goto("/");
    const float = page.locator('a[data-placement="float"]');
    // Oculto mientras el hero está visible
    await expect(float.locator("..")).toHaveAttribute("aria-hidden", "true");
    await page.getByRole("link", { name: "Ver trayectoria" }).scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 2000);
    await expect(float.locator("..")).toHaveAttribute("aria-hidden", "false");
    await expect(float).toHaveAttribute("aria-label", /WhatsApp/);
  });
});
