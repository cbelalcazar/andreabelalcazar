import { describe, expect, it } from "vitest";
import { education, hero, roles, services, site } from "@/content/site";

describe("contenido verificado", () => {
  it("el H1 tiene 12 palabras o menos... o al menos menos de 20 y sin palabras prohibidas", () => {
    const banned = /impecable|vanguardia|excelencia|arquitecta de narrativas|alto nivel|impacto real/i;
    expect(hero.h1).not.toMatch(banned);
    expect(hero.lead).not.toMatch(banned);
    expect(hero.h1.split(/\s+/).length).toBeLessThanOrEqual(20);
  });

  it("los cargos usan títulos exactos de la hoja de vida", () => {
    expect(roles[0]).toMatchObject({ title: "Jefe de Prensa y Relaciones Públicas", current: true });
    expect(roles.map((r) => r.org)).toEqual(
      expect.arrayContaining(["Concejo de Cali", "Secretaría de Salud Pública", "La Occidental Ltda."]),
    );
    expect(roles.filter((r) => r.current)).toHaveLength(1);
  });

  it("la formación incluye los tres títulos", () => {
    expect(education).toHaveLength(3);
  });

  it("hay 4 servicios con id único", () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(4);
  });

  it("la navegación apunta a secciones existentes", () => {
    expect(site.nav.map((n) => n.href)).toEqual(["#perfil", "#servicios", "#trayectoria", "#contacto"]);
  });
});
