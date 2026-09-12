import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Solo los previews de Vercel llevan noindex; en local (sin VERCEL_ENV) y en producción no.
const isVercelPreview = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";

/**
 * CSP sin nonce (compatible con prerender estático). Incluye los orígenes de
 * GA4, Vercel Analytics y Speed Insights. Si se añade un tercero nuevo, hay que
 * listarlo aquí o el navegador lo bloqueará en silencio.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.googletagmanager.com https://*.analytics.google.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "media-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me https://api.whatsapp.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Las previews de Vercel (*.vercel.app) no deben indexarse
  ...(isVercelPreview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // typedRoutes desactivado: los breadcrumbs y tarjetas construyen href dinámicos desde el índice de contenido
  typedRoutes: false,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // Assets de /public con nombre estable: caché larga pero revalidable
        source: "/:file(clip-video\\.mp4|clip-video\\.webm|clip-video-poster\\.webp|llms\\.txt)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    // Enlaces cortos para bios de redes, con UTM (auditoría M-05)
    return [
      { source: "/ig", destination: "/?utm_source=instagram&utm_medium=bio&utm_campaign=perfil", permanent: false },
      { source: "/li", destination: "/?utm_source=linkedin&utm_medium=bio&utm_campaign=perfil", permanent: false },
      { source: "/wa", destination: "/#contacto", permanent: false },
    ];
  },
};

// Plugins como strings: requisito de Turbopack (guía MDX de Next 16)
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter"], ["remark-gfm"]],
    rehypePlugins: [["rehype-slug"], ["rehype-autolink-headings", { behavior: "wrap" }]],
  },
});

export default withMDX(nextConfig);
