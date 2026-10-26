import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { allVariants, contact, hero, methodology, positioning, serviceCta, services, valueProp } from "@/content/site";

/**
 * Reglas de redacción comercial del brief de Andrea (PLAN-CONSULTORIA-2026-11, C-17):
 * no prometer victorias electorales, cobertura garantizada ni manipulación de la opinión pública.
 */
const promises =
  /garantiz(?:o|amos|ada|ado|adas|ados)\b|aseguramos|te aseguro|victoria|ganar(?:á|emos|as)? (?:la|las) elecci|cobertura (?:asegurada|garantizada)|manipul|resultados (?:asegurados|garantizados)/i;

const commercialMdx = ["servicios", "casos"].flatMap((dir) => {
  const base = join(process.cwd(), "src/content", dir);
  return readdirSync(base)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ file: `${dir}/${f}`, text: readFileSync(join(base, f), "utf8") }));
});

const strings = (v: unknown): string[] =>
  typeof v === "string"
    ? [v]
    : Array.isArray(v) || (v && typeof v === "object")
      ? Object.values(v).flatMap(strings)
      : [];

describe("reglas de redacción comercial", () => {
  it("los textos de portada y de las dos variantes no prometen resultados", () => {
    const texts = strings([hero, valueProp, methodology, contact, services, serviceCta, allVariants]);
    for (const t of texts) expect(t, t).not.toMatch(promises);
  });

  it("servicios y casos en MDX no prometen resultados", () => {
    for (const { file, text } of commercialMdx) expect(text, file).not.toMatch(promises);
  });

  it("la variante institucional no ofrece servicios electorales", () => {
    const v = allVariants.institucional;
    const texts = strings([v.title, v.description, v.tagline, v.hero, v.political]);
    for (const t of texts) expect(t, t).not.toMatch(/electoral|candidat|campaña/i);
  });

  it("la variante activa es la institucional hasta resolver A-8", () => {
    // Cambiar este test es parte de la tarea C-30, con el concepto legal en la mano.
    expect(positioning).toBe("institucional");
  });
});
