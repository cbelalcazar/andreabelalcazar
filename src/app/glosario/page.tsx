import type { Metadata } from "next";
import PageHeader from "@/components/content/PageHeader";
import { TermCard } from "@/components/content/Cards";
import JsonLd from "@/components/seo/JsonLd";
import { getTerms } from "@/lib/content";
import { buildBreadcrumbs, buildDefinedTermSet, graph } from "@/lib/seo";

const description =
  "Definiciones claras de los términos que se usan en prensa, comunicación política e institucional: jefe de prensa, comunicado, vocero, framing, agenda setting, gestión de crisis y más.";

export const metadata: Metadata = {
  title: "Glosario de comunicación política y prensa",
  description,
  alternates: { canonical: "/glosario" },
  openGraph: { title: "Glosario de comunicación política y prensa", description, url: "/glosario", type: "website" },
};

export default function GlosarioPage() {
  const terms = getTerms();
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
      <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((t) => (
            <TermCard key={t.slug} t={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
