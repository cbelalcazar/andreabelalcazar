import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/content/PageHeader";
import { TermCard, formatDate } from "@/components/content/Cards";
import ContactBlock from "@/components/content/ContactBlock";
import Faq from "@/components/content/Faq";
import JsonLd from "@/components/seo/JsonLd";
import { serviceCta, site } from "@/content/site";
import { getPost, getService, getTerm, getTermHeadings, getTerms } from "@/lib/content";
import { buildBreadcrumbs, buildDefinedTerm, buildFaq, buildTermPage, graph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTerms().map((t) => ({ termino: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/glosario/[termino]">): Promise<Metadata> {
  const { termino } = await params;
  const t = getTerm(termino);
  if (!t) return {};
  const title = t.seoTitle ?? `${t.term}: qué es y por qué importa`;
  const description = t.seoDescription ?? t.short;
  return {
    // Con seoTitle se omite el sufijo de marca: deja el espacio visible en Google al término (plan G-02)
    title: t.seoTitle ? { absolute: t.seoTitle } : title,
    description,
    alternates: { canonical: `/glosario/${t.slug}` },
    openGraph: {
      title,
      description,
      url: `/glosario/${t.slug}`,
      type: "article",
      ...(t.updated ? { modifiedTime: t.updated } : {}),
    },
  };
}

export default async function TerminoPage({ params }: PageProps<"/glosario/[termino]">) {
  const { termino } = await params;
  const t = getTerm(termino);
  if (!t) notFound();
  const { default: Body } = await import(`@/content/glosario/${termino}.mdx`);
  const related = getTerms().filter((x) => t.related.includes(x.slug));
  const headings = getTermHeadings(t.slug);
  const guide = t.guide ? getPost(t.guide) : undefined;
  const service = t.service ? getService(t.service) : undefined;
  const cta = t.service ? serviceCta[t.service] : undefined;
  const crumbs = [
    { name: "Glosario", path: "/glosario" },
    { name: t.term, path: `/glosario/${t.slug}` },
  ];
  return (
    <main id="contenido">
      <JsonLd data={graph(buildDefinedTerm(t), buildTermPage(t), buildBreadcrumbs(crumbs), buildFaq(t.faq))} />
      <PageHeader
        eyebrow="Glosario"
        title={t.term}
        lead={t.answer ? undefined : t.short}
        crumbs={crumbs}
        meta={
          t.updated || t.reviewed ? (
            <>
              {t.reviewed ? (
                <span>
                  Revisado por{" "}
                  <Link href="/sobre-mi" className="text-ink underline underline-offset-4 hover:text-accent">
                    {site.name}
                  </Link>
                </span>
              ) : null}
              {t.updated ? (
                <span>
                  Actualizado el <time dateTime={t.updated}>{formatDate(t.updated)}</time>
                </span>
              ) : null}
            </>
          ) : undefined
        }
      />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-24 md:px-8 lg:grid-cols-12">
        <article className="prose-site min-w-0 lg:col-span-7">
          {t.answer ? (
            <section
              aria-labelledby="respuesta"
              className="not-prose mb-10 rounded-[20px] border border-accent/40 bg-surface p-6 md:p-7"
            >
              <p id="respuesta" className="eyebrow mb-2">
                En pocas palabras
              </p>
              <p className="text-[18px] leading-[1.6] text-ink">{t.answer}</p>
            </section>
          ) : null}
          {headings.length >= 4 ? (
            <nav aria-label="En esta página" className="not-prose mb-10">
              <p className="eyebrow mb-3">En esta página</p>
              <ol className="space-y-2 text-[15px]">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-ink-2 underline-offset-4 hover:text-accent hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <Body />
          <Faq items={t.faq} />
          {t.sources.length > 0 && (
            <section aria-labelledby="fuentes" className="not-prose mt-12">
              <h2 id="fuentes" className="eyebrow mb-3">
                Fuentes
              </h2>
              <ul className="space-y-2 text-[15px] text-muted">
                {t.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener" className="underline underline-offset-4 hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {guide ? (
            <Link
              href={`/blog/${guide.slug}`}
              data-track="glossary_guide_click"
              data-topic={`${t.slug}→${guide.slug}`}
              className="not-prose mt-12 flex flex-col rounded-[20px] bg-surface p-6 no-underline shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              <span className="eyebrow">Guía práctica</span>
              <span className="mt-1 font-display text-[20px] leading-tight font-semibold text-ink">{guide.title}</span>
              <span className="mt-2 text-[15px] leading-[1.55] text-muted">{guide.description}</span>
              <span className="link-chevron mt-4 text-[15px]">Leer la guía</span>
            </Link>
          ) : null}
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
          {service ? (
            <Link
              href={`/servicios/${service.slug}`}
              data-track="glossary_service_click"
              data-topic={`${t.slug}→${service.slug}`}
              className="flex flex-col rounded-[20px] border border-line p-5 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              <span className="eyebrow">Servicio relacionado</span>
              <span className="mt-1 font-display text-[18px] font-semibold text-ink">{service.title}</span>
              <span className="link-chevron mt-3 text-[15px]">Ver servicio</span>
            </Link>
          ) : null}
          <ContactBlock
            placement="glossary"
            topic={`glosario:${t.slug}`}
            title={cta?.title ?? "¿Necesitas aplicarlo en tu equipo?"}
            text={cta?.text}
          />
        </aside>
      </div>
    </main>
  );
}
