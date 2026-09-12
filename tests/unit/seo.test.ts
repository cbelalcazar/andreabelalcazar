import { describe, expect, it } from "vitest";
import { buildHomeGraph, buildPerson, serializeJsonLd, PERSON_ID } from "@/lib/seo";
import { site } from "@/content/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import manifest from "@/app/manifest";

describe("JSON-LD", () => {
  const img = `${site.url}/img/retrato.jpg`;

  it("Person usa el título oficial y no inventa perfiles", () => {
    const p = buildPerson(img);
    expect(p["@id"]).toBe(PERSON_ID);
    expect(p.jobTitle).toBe("Jefe de Prensa y Relaciones Públicas");
    // sameAs solo aparece si hay URLs verificadas
    if (site.sameAs.length === 0) expect("sameAs" in p).toBe(false);
    for (const url of site.sameAs) expect(url).not.toMatch(/twitter\.com\/andreabelalcazar$/);
  });

  it("el grafo tiene WebSite y Person enlazados", () => {
    const g = buildHomeGraph(img) as unknown as { "@graph": Array<{ "@type": string; "@id": string }> };
    const types = g["@graph"].map((n) => n["@type"]);
    expect(types).toEqual(expect.arrayContaining(["WebSite", "Person"]));
  });

  it("serializa escapando < para evitar cierre del script", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("</script>");
  });
});

describe("metadata routes", () => {
  it("robots permite todo y declara el sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${site.url}/sitemap.xml`);
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    expect(rules[0]).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("sitemap incluye la home con prioridad 1", () => {
    const s = sitemap();
    const home = s.find((e) => e.url === `${site.url}/`);
    expect(home?.priority).toBe(1);
    for (const e of s) expect(e.url.startsWith(site.url)).toBe(true);
  });

  it("manifest usa el color de marca", () => {
    const m = manifest();
    expect(m.theme_color).toBe("#f5f5f7");
    expect(m.icons?.length).toBeGreaterThan(0);
  });
});
