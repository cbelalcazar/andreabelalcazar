import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Fecha del último cambio de contenido relevante (actualizar al publicar). */
export const CONTENT_UPDATED = new Date("2026-09-12");

export const staticRoutes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/privacidad", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((r) => ({
    url: `${site.url}${r.path === "/" ? "/" : r.path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
