import { site } from "@/content/site";
import { getPosts, TEMAS } from "@/lib/content";

// Prerenderizado en build: el contenido vive en el repo
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = getPosts();
  const lastBuild = posts[0] ? new Date(`${posts[0].updated ?? posts[0].date}T12:00:00Z`) : new Date();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/blog/${p.slug}</link>
      <guid isPermaLink="true">${site.url}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <category>${esc(TEMAS[p.tema])}</category>
      <author>${esc(site.email)} (${esc(site.name)})</author>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} · Blog</title>
    <link>${site.url}/blog</link>
    <description>${esc("Comunicación política, prensa, gestión de crisis e IA aplicada, desde el sector público colombiano.")}</description>
    <language>es-co</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
