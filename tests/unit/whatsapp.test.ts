import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { site } from "@/content/site";

describe("buildWhatsAppUrl", () => {
  it("apunta al número oficial y prellena el texto con el placement", () => {
    const url = new URL(buildWhatsAppUrl("hero"));
    expect(url.origin + url.pathname).toBe(`https://wa.me/${site.whatsapp.phone}`);
    expect(url.searchParams.get("text")).toBe("Hola Andrea, te escribo desde andreabelalcazar.com (hero).");
  });

  it("incluye el tema cuando se pasa", () => {
    const url = new URL(buildWhatsAppUrl("services", "gestion-de-crisis"));
    expect(url.searchParams.get("text")).toContain("services · gestion-de-crisis");
  });

  it("el número no cambia por accidente", () => {
    expect(site.whatsapp.phone).toBe("573105354473");
  });
});
