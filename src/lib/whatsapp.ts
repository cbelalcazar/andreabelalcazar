import { site } from "@/content/site";

export type WhatsAppPlacement =
  "nav" | "hero" | "services" | "trajectory" | "footer-cta" | "footer" | "float" | "not-found" | "mobile-menu";

/**
 * Construye el enlace wa.me con texto prellenado. El propio mensaje sirve
 * de atribución: Andrea sabe desde qué parte del sitio le escriben.
 */
export function buildWhatsAppUrl(placement: WhatsAppPlacement, topic?: string): string {
  const base = `https://wa.me/${site.whatsapp.phone}`;
  const context = topic ? `${placement} · ${topic}` : placement;
  const text = `Hola Andrea, te escribo desde andreabelalcazar.com (${context}).`;
  return `${base}?text=${encodeURIComponent(text)}`;
}
