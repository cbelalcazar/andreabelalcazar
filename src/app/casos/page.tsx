import type { Metadata } from "next";
import PageHeader from "@/components/content/PageHeader";
import { CaseCard } from "@/components/content/Cards";
import ContactBlock from "@/components/content/ContactBlock";
import JsonLd from "@/components/seo/JsonLd";
import { labels } from "@/content/site";
import { getCases } from "@/lib/content";
import { buildBreadcrumbs, buildCollection, graph } from "@/lib/seo";

const title = "Proyectos: gobierno, campañas y empresa";
const description =
  "Seis entornos distintos, una misma disciplina: Secretaría de Turismo del Valle, campaña presidencial 2022, Concejo de Cali, Alcaldía de Cali, Secretaría de Salud Pública y sector privado.";

export const metadata: Metadata = {
  title: labels.cases,
  description,
  alternates: { canonical: "/casos" },
  openGraph: { title, description, url: "/casos", type: "website" },
};

export default function CasosPage() {
  const cases = getCases();
  const crumbs = [{ name: labels.cases, path: "/casos" }];
  return (
    <main id="contenido">
      <JsonLd data={graph(buildCollection({ path: "/casos", name: title, description }), buildBreadcrumbs(crumbs))} />
      <PageHeader
        eyebrow={labels.cases}
        title={title}
        lead="Cada proyecto describe el contexto, el reto y lo que se hizo. Las cifras se publican cuando pueden verificarse."
        crumbs={crumbs}
      />
      <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
        <div className="mx-auto max-w-3xl">
          <ContactBlock placement="trajectory" />
        </div>
      </section>
    </main>
  );
}
