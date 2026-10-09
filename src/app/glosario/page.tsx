import type { Metadata } from "next";
import PageHeader from "@/components/content/PageHeader";
import { TermCard } from "@/components/content/Cards";
import JsonLd from "@/components/seo/JsonLd";
import { demandRank, getTerms } from "@/lib/content";
import { buildBreadcrumbs, buildDefinedTermSet, graph } from "@/lib/seo";

const description =
  "Definiciones claras de los términos que se usan en prensa, comunicación política e institucional: jefe de prensa, comunicado, vocero, framing, agenda setting, gestión de crisis y más.";

export const metadata: Metadata = {
  title: "Glosario de comunicación política y prensa",
  description,
  alternates: { canonical: "/glosario" },
  openGraph: { title: "Glosario de comunicación política y prensa", description, url: "/glosario", type: "website" },
};

/** Letra inicial sin tilde, para agrupar el índice A–Z. */
function initial(term: string): string {
  return term
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .charAt(0)
    .toUpperCase();
}

export default function GlosarioPage() {
  const terms = getTerms();
  const top = [...terms].sort((a, b) => demandRank(a.slug) - demandRank(b.slug)).slice(0, 6);
  const groups = new Map<string, typeof terms>();
  for (const t of terms) groups.set(initial(t.term), [...(groups.get(initial(t.term)) ?? []), t]);
  const crumbs = [{ name: "Glosario", path: "/glosario" }];
  return (
    <main id="contenido">
      <JsonLd data={graph(buildDefinedTermSet(terms), buildBreadcrumbs(crumbs))} />
      <PageHeader
        eyebrow="Glosario"
        title="Los términos del oficio, explicados sin jerga"
        lead={description}
        crumbs={crumbs}
      />
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8" aria-labelledby="mas-consultados">
        <h2 id="mas-consultados" className="mb-6 font-display text-3xl text-ink">
          Los más consultados
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((t) => (
            <TermCard key={t.slug} t={t} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8" aria-labelledby="todos">
        <h2 id="todos" className="mb-4 font-display text-3xl text-ink">
          Todos los términos
        </h2>
        <nav aria-label="Índice alfabético" className="mb-10 flex flex-wrap gap-2">
          {[...groups.keys()].map((l) => (
            <a
              key={l}
              href={`#letra-${l}`}
              className="flex h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 text-[15px] font-semibold text-ink hover:bg-surface"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="space-y-10">
          {[...groups.entries()].map(([l, ts]) => (
            <div key={l} id={`letra-${l}`} className="scroll-mt-24">
              <h3 className="eyebrow mb-3">{l}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ts.map((t) => (
                  <TermCard key={t.slug} t={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
