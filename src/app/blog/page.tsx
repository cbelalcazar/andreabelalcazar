import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/content/PageHeader";
import { PostCard } from "@/components/content/Cards";
import JsonLd from "@/components/seo/JsonLd";
import { getPosts, getTemasConPosts, TEMAS } from "@/lib/content";
import { buildBreadcrumbs, buildCollection, graph } from "@/lib/seo";

const title = "Blog: comunicación política, prensa y gestión de crisis";
const description =
  "Guías prácticas sobre jefatura de prensa, comunicación política e institucional, gestión de crisis, pauta digital e inteligencia artificial aplicada, escritas desde el trabajo en el sector público colombiano.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { title, description, url: "/blog", type: "website" },
};

export default function BlogPage() {
  const posts = getPosts();
  const temas = getTemasConPosts();
  const crumbs = [{ name: "Blog", path: "/blog" }];
  return (
    <main id="contenido">
      <JsonLd data={graph(buildCollection({ path: "/blog", name: title, description }), buildBreadcrumbs(crumbs))} />
      <PageHeader
        eyebrow="Blog"
        title="Lo que aprendí haciendo prensa y comunicación pública"
        lead={description}
        crumbs={crumbs}
      />
      <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8">
        <nav aria-label="Temas" className="mb-8 flex flex-wrap gap-2">
          {temas.map((t) => (
            <Link
              key={t}
              href={`/blog/tema/${t}`}
              className="rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-ink hover:text-accent"
            >
              {TEMAS[t]}
            </Link>
          ))}
          <a href="/rss.xml" className="rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-accent">
            RSS
          </a>
        </nav>
        {posts.length === 0 ? (
          <p className="text-muted">Los primeros artículos se publican esta semana.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
