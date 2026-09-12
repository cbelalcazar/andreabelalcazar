import type { Metadata } from "next";
import PageHeader from "@/components/content/PageHeader";
import { ServiceCard } from "@/components/content/Cards";
import ContactBlock from "@/components/content/ContactBlock";
import JsonLd from "@/components/seo/JsonLd";
import { getServices } from "@/lib/content";
import { buildBreadcrumbs, buildCollection, graph } from "@/lib/seo";

const title = "Servicios de comunicación política e institucional";
const description =
  "Jefatura de prensa, gestión de crisis, marketing político y estrategia digital, y comunicación institucional para gobiernos, campañas y marcas del Valle del Cauca.";

export const metadata: Metadata = {
  title: "Servicios",
  description,
  alternates: { canonical: "/servicios" },
  openGraph: { title, description, url: "/servicios", type: "website" },
};

export default function ServiciosPage() {
  const services = getServices();
  const crumbs = [{ name: "Servicios", path: "/servicios" }];
  return (
    <main id="contenido">
      <JsonLd
        data={graph(buildCollection({ path: "/servicios", name: title, description }), buildBreadcrumbs(crumbs))}
      />
      <PageHeader eyebrow="Servicios" title="Qué hago y para quién" lead={description} crumbs={crumbs} />
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
