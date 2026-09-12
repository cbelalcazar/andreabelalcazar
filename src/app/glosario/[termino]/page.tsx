import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/content/PageHeader";
import { TermCard } from "@/components/content/Cards";
import ContactBlock from "@/components/content/ContactBlock";
import JsonLd from "@/components/seo/JsonLd";
import { getTerm, getTerms } from "@/lib/content";
import { buildBreadcrumbs, buildDefinedTerm, graph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTerms().map((t) => ({ termino: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/glosario/[termino]">): Promise<Metadata> {
  const { termino } = await params;
  const t = getTerm(termino);
  if (!t) return {};
  const title = `${t.term}: qué es y por qué importa`;
  return {
    title,
    description: t.short,
    alternates: { canonical: `/glosario/${t.slug}` },
    openGraph: { title, description: t.short, url: `/glosario/${t.slug}`, type: "article" },
  };
}

export default async function TerminoPage({ params }: PageProps<"/glosario/[termino]">) {
  const { termino } = await params;
  const t = getTerm(termino);
  if (!t) notFound();
  const { default: Body } = await import(`@/content/glosario/${termino}.mdx`);
  const related = getTerms().filter((x) => t.related.includes(x.slug));
  const crumbs = [
    { name: "Glosario", path: "/glosario" },
    { name: t.term, path: `/glosario/${t.slug}` },
  ];
  return (
    <main id="contenido">
      <JsonLd data={graph(buildDefinedTerm(t), buildBreadcrumbs(crumbs))} />
      <PageHeader eyebrow="Glosario" title={t.term} lead={t.short} crumbs={crumbs} />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-24 md:px-8 lg:grid-cols-12">
        <article className="prose-site min-w-0 lg:col-span-7">
          <Body />
        </article>
        <aside className="min-w-0 space-y-6 lg:col-span-5">
          {related.length > 0 && (
            <div>
              <p className="eyebrow mb-3">Términos relacionados</p>
              <div className="grid gap-3">
                {related.map((r) => (
                  <TermCard key={r.slug} t={r} />
                ))}
              </div>
            </div>
          )}
          <ContactBlock placement="services" topic={`glosario:${t.slug}`} title="¿Necesitas aplicarlo en tu equipo?" />
        </aside>
      </div>
    </main>
  );
}
