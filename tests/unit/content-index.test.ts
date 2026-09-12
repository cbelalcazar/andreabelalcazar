import { describe, expect, it } from "vitest";
import { getAllRoutes, getCases, getPosts, getServices, getTerms, TEMAS } from "@/lib/content";
import { services as homeServices } from "@/content/site";

const banned =
  /impecable|vanguardia|excelencia|alto nivel|impacto real|disruptivo|sinergia|en la era digital|sin duda/i;

describe("índice de contenido (MDX + Zod)", () => {
  it("carga servicios, casos, glosario y posts sin errores de frontmatter", () => {
    expect(getServices().length).toBe(4);
    expect(getCases().length).toBe(6);
    expect(getTerms().length).toBeGreaterThanOrEqual(30);
    expect(getPosts().length).toBeGreaterThanOrEqual(1);
  });

  it("los servicios del home existen como páginas", () => {
    const slugs = new Set(getServices().map((s) => s.slug));
    for (const s of homeServices) expect(slugs.has(s.id), s.id).toBe(true);
  });

  it("los enlaces internos de related/services apuntan a slugs existentes", () => {
    const serviceSlugs = new Set(getServices().map((s) => s.slug));
    const termSlugs = new Set(getTerms().map((t) => t.slug));
    for (const s of getServices())
      for (const r of s.related) expect(serviceSlugs.has(r), `${s.slug} → ${r}`).toBe(true);
    for (const c of getCases()) for (const r of c.services) expect(serviceSlugs.has(r), `${c.slug} → ${r}`).toBe(true);
    for (const t of getTerms()) for (const r of t.related) expect(termSlugs.has(r), `${t.slug} → ${r}`).toBe(true);
  });

  it("posts: temas válidos, sin borradores, sin palabras prohibidas en título/descripción", () => {
    for (const p of getPosts()) {
      expect(Object.keys(TEMAS)).toContain(p.tema);
      expect(p.draft).toBe(false);
      expect(p.title).not.toMatch(banned);
      expect(p.description).not.toMatch(banned);
      expect(p.faq.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("rutas únicas, con barra inicial y sin barra final", () => {
    const paths = getAllRoutes().map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) {
      expect(p.startsWith("/")).toBe(true);
      if (p !== "/") expect(p.endsWith("/")).toBe(false);
    }
    expect(paths).toEqual(
      expect.arrayContaining(["/", "/sobre-mi", "/servicios", "/casos", "/blog", "/glosario", "/prensa", "/contacto"]),
    );
  });
});
