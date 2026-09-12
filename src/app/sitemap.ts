import type { MetadataRoute } from "next";
import { absolute, getAllRoutes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map((r) => ({
    url: absolute(r.path),
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
