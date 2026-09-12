import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/content/PageHeader";
import Faq from "@/components/content/Faq";
import ContactBlock from "@/components/content/ContactBlock";
import { CaseCard, PostCard, ServiceCard } from "@/components/content/Cards";
import JsonLd from "@/components/seo/JsonLd";
import { getCases, getPosts, getService, getServices } from "@/lib/content";
import { buildBreadcrumbs, buildFaq, buildService, graph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/servicios/${s.slug}` },
    openGraph: { title: s.title, description: s.description, url: `/servicios/${s.slug}`, type: "website" },
  };
}

export default async function ServicioPage({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const { default: Body } = await import(`@/content/servicios/${slug}.mdx`);
  const related = getServices().filter((x) => s.related.includes(x.slug));
  const cases = getCases()
    .filter((c) => c.services.includes(s.slug))
    .slice(0, 3);
  const posts = getPosts().slice(0, 3);
  const crumbs = [
    { name: "Servicios", path: "/servicios" },
    { name: s.title, path: `/servicios/${s.slug}` },
  ];

  return (
    <main id="contenido">
      <JsonLd data={graph(buildService(s), buildBreadcrumbs(crumbs), buildFaq(s.faq))} />
      <PageHeader eyebrow={s.eyebrow} title={s.title} lead={s.description} crumbs={crumbs} />

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-20 md:px-8 lg:grid-cols-12">
        <article className="prose-site min-w-0 lg:col-span-7">
          <Body />
          <Faq items={s.faq} />
        </article>

        <aside className="min-w-0 space-y-8 lg:col-span-5">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="eyebrow mb-3">Para quién</p>
            <ul className="space-y-2 text-ink-2">
              {s.forWho.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="eyebrow mb-3">Entregables</p>
            <ol className="list-decimal space-y-2 pl-5 text-ink-2 marker:text-accent">
              {s.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
          </div>
          <ContactBlock
            placement="services"
            topic={s.slug}
            title="Consultar este servicio"
            text="Cuéntame qué necesitas y en qué plazo. Te respondo con una propuesta de trabajo."
          />
        </aside>
      </div>

      {cases.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8" aria-labelledby="casos-rel">
          <h2 id="casos-rel" className="mb-6 font-display text-3xl text-ink">
            Casos relacionados
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8" aria-labelledby="serv-rel">
          <h2 id="serv-rel" className="mb-6 font-display text-3xl text-ink">
            Servicios que se complementan
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <ServiceCard key={r.slug} s={r} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8" aria-labelledby="posts-rel">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="posts-rel" className="font-display text-3xl text-ink">
              Artículos recientes
            </h2>
            <Link href="/blog" className="text-sm font-semibold text-accent hover:text-ink">
              Ver el blog →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
