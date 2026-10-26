import type { Metadata } from "next";
import PageHeader from "@/components/content/PageHeader";
import { ServiceCard } from "@/components/content/Cards";
import ContactBlock from "@/components/content/ContactBlock";
import JsonLd from "@/components/seo/JsonLd";
import { labels } from "@/content/site";
import { getServices } from "@/lib/content";
import { buildBreadcrumbs, buildCollection, graph } from "@/lib/seo";

const title = "Soluciones de comunicación estratégica";
const description =
  "Posicionamiento en medios, reputación y gestión de crisis, comunicación institucional y estrategia digital para líderes, instituciones y marcas del Valle del Cauca.";

export const metadata: Metadata = {
  title: title,
  description,
  alternates: { canonical: "/servicios" },
  openGraph: { title, description, url: "/servicios", type: "website" },
};

export default function ServiciosPage() {
  const services = getServices();
  const crumbs = [{ name: labels.services, path: "/servicios" }];
  return (
    <main id="contenido">
      <JsonLd
        data={graph(buildCollection({ path: "/servicios", name: title, description }), buildBreadcrumbs(crumbs))}
      />
      <PageHeader eyebrow={labels.services} title="Qué hago y para quién" lead={description} crumbs={crumbs} />
      <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
        <div className="mx-auto max-w-3xl">
          <ContactBlock
            placement="services"
            title="¿No sabes cuál necesitas?"
            text="Escríbeme con dos líneas sobre tu situación y te digo por dónde empezar."
          />
        </div>
      </section>
    </main>
  );
}
