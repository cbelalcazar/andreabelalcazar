import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/content/PageHeader";
import Faq from "@/components/content/Faq";
import ContactBlock from "@/components/content/ContactBlock";
import { PostCard, formatDate } from "@/components/content/Cards";
import ShareBar from "@/components/content/ShareBar";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { getPost, getPosts, TEMAS } from "@/lib/content";
import { buildArticle, buildBreadcrumbs, buildFaq, graph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `/blog/${p.slug}`,
      type: "article",
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: [site.name],
      section: TEMAS[p.tema],
      tags: p.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);
  const related = getPosts()
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.tema === p.tema) - Number(a.tema === p.tema))
    .slice(0, 3);
  const crumbs = [
    { name: "Blog", path: "/blog" },
    { name: TEMAS[p.tema], path: `/blog/tema/${p.tema}` },
    { name: p.title, path: `/blog/${p.slug}` },
  ];
  const url = `${site.url}/blog/${p.slug}`;

  return (
    <main id="contenido">
      <JsonLd data={graph(buildArticle(p), buildBreadcrumbs(crumbs), buildFaq(p.faq))} />
      <PageHeader
        eyebrow={TEMAS[p.tema]}
        title={p.title}
        lead={p.description}
        crumbs={crumbs}
        meta={
          <>
            <span>
              Por{" "}
              <Link href="/sobre-mi" className="text-paper underline underline-offset-4 hover:text-gold">
                {site.name}
              </Link>
            </span>
            <span>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              {p.updated ? <> · actualizado el {formatDate(p.updated)}</> : null}
            </span>
            <span>{p.readingMinutes} min de lectura</span>
          </>
        }
      />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-20 md:px-8 lg:grid-cols-12">
        <article className="prose-site min-w-0 lg:col-span-8">
          <Body />
          <Faq items={p.faq} />
          {p.tags.length > 0 && (
            <p className="not-prose mt-10 flex flex-wrap gap-2 text-sm">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 text-muted">
                  {t}
                </span>
              ))}
            </p>
          )}
        </article>
        <aside className="min-w-0 space-y-6 lg:col-span-4">
          <ShareBar url={url} title={p.title} />
          <div className="rounded-2xl border border-line bg-white/[0.02] p-6">
            <p className="eyebrow mb-2">Sobre la autora</p>
            <p className="text-sm leading-relaxed text-muted">
              {site.name} es {site.jobTitle.toLowerCase()} de la {site.employer.name} y estratega de comunicación
              política e institucional en Cali.{" "}
              <Link href="/sobre-mi" className="text-gold underline underline-offset-4 hover:text-paper">
                Conoce su trayectoria
              </Link>
              .
            </p>
          </div>
          <ContactBlock
            placement="services"
            topic={`blog:${p.slug}`}
            title="¿Quieres aplicar esto en tu entidad?"
            text="Escríbeme y lo aterrizamos a tu caso."
          />
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8" aria-labelledby="rel-posts">
          <h2 id="rel-posts" className="mb-6 font-serif text-3xl text-white">
            Sigue leyendo
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <PostCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
