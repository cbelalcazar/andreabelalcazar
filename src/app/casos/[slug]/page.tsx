import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/content/PageHeader";
import ContactBlock from "@/components/content/ContactBlock";
import { CaseCard, ServiceCard } from "@/components/content/Cards";
import JsonLd from "@/components/seo/JsonLd";
import { getCase, getCases, getServices } from "@/lib/content";
import { buildBreadcrumbs, graph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/casos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/casos/${c.slug}` },
    openGraph: { title: c.title, description: c.description, url: `/casos/${c.slug}`, type: "article" },
  };
}

const typeLabel = { gobierno: "Gobierno", campaña: "Campaña", empresa: "Empresa" } as const;

export default async function CasoPage({ params }: PageProps<"/casos/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const { default: Body } = await import(`@/content/casos/${slug}.mdx`);
  const services = getServices().filter((s) => c.services.includes(s.slug));
  const others = getCases()
    .filter((x) => x.slug !== c.slug)
    .slice(0, 3);
  const crumbs = [
    { name: "Casos", path: "/casos" },
    { name: c.entity, path: `/casos/${c.slug}` },
  ];

  return (
    <main id="contenido">
      <JsonLd data={graph(buildBreadcrumbs(crumbs))} />
      <PageHeader
        eyebrow={`${typeLabel[c.entityType]}${c.period !== "TODO" ? ` · ${c.period}` : ""}`}
        title={c.title}
        lead={c.description}
        crumbs={crumbs}
        meta={
          <>
            <span>
              <strong className="text-ink">Rol:</strong> {c.role}
            </span>
            <span>
              <strong className="text-ink">Entidad:</strong> {c.entity}
            </span>
          </>
        }
      />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-20 md:px-8 lg:grid-cols-12">
        <article className="prose-site min-w-0 lg:col-span-7">
          <Body />
        </article>
        <aside className="min-w-0 space-y-6 lg:col-span-5">
          {services.length > 0 && (
            <div>
              <p className="eyebrow mb-3">Servicios aplicados</p>
              <div className="grid gap-4">
                {services.map((s) => (
                  <ServiceCard key={s.slug} s={s} />
                ))}
              </div>
            </div>
          )}
          <ContactBlock placement="trajectory" topic={c.slug} title="¿Tu entidad enfrenta algo parecido?" />
        </aside>
      </div>
      {others.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8" aria-labelledby="otros-casos">
          <h2 id="otros-casos" className="mb-6 font-display text-3xl text-ink">
            Otros casos
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <CaseCard key={o.slug} c={o} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
