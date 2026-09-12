import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/content/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import { site } from "@/content/site";
import { buildBreadcrumbs, graph } from "@/lib/seo";
import retrato from "@/assets/img/andrea-belalcazar-retrato.jpg";
import og from "@/assets/img/andrea-belalcazar-retrato-og.jpg";

const description =
  "Kit de prensa de Andrea Belalcázar: biografías cortas y largas, temas sobre los que puede opinar, fotografías en alta resolución y contacto directo para entrevistas y paneles.";

export const metadata: Metadata = {
  title: "Prensa y entrevistas",
  description,
  alternates: { canonical: "/prensa" },
  openGraph: { title: "Prensa y entrevistas · Andrea Belalcázar", description, url: "/prensa", type: "website" },
};

const bio50 = `${site.name} es ${site.jobTitle.toLowerCase()} de la ${site.employer.name} y estratega de comunicación política e institucional en Cali, con experiencia en gobierno, campañas electorales y empresa privada.`;

const bio150 = `${site.name} es ${site.jobTitle.toLowerCase()} de la ${site.employer.name}. Profesional en Mercadeo con especialización en Gerencia de Marketing Estratégico (Universidad del Valle), ha ejercido la jefatura de prensa del Concejo de Cali y de la campaña presidencial de 2022 en el Valle del Cauca, dirigió las comunicaciones y el marketing digital de una campaña a la Alcaldía de Cali y lideró el equipo digital de la Secretaría de Salud Pública. Antes trabajó en mercadeo y servicio al cliente en el sector privado. Integra estrategia, operación e inteligencia artificial aplicada a la comunicación pública.`;

const temas = [
  "Comunicación institucional y relación con medios en entidades territoriales",
  "Gestión de crisis y reputación en el sector público",
  "Comunicación política y campañas en el Valle del Cauca",
  "Inteligencia artificial aplicada a equipos de prensa y comunicación",
  "Marketing y pauta digital para instituciones y marcas",
  "Turismo del Valle del Cauca: posicionamiento y agenda mediática",
];

export default function PrensaPage() {
  const crumbs = [{ name: "Prensa", path: "/prensa" }];
  return (
    <main id="contenido">
      <JsonLd data={graph(buildBreadcrumbs(crumbs))} />
      <PageHeader
        eyebrow="Prensa"
        title="Para periodistas, productores y organizadores"
        lead={description}
        crumbs={crumbs}
      />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-24 md:px-8 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <section aria-labelledby="bio-corta">
            <h2 id="bio-corta" className="font-serif text-2xl text-white">
              Biografía corta (50 palabras)
            </h2>
            <p className="mt-3 rounded-xl border border-line bg-white/[0.02] p-5 leading-relaxed text-paper/85">
              {bio50}
            </p>
          </section>
          <section aria-labelledby="bio-larga">
            <h2 id="bio-larga" className="font-serif text-2xl text-white">
              Biografía larga (150 palabras)
            </h2>
            <p className="mt-3 rounded-xl border border-line bg-white/[0.02] p-5 leading-relaxed text-paper/85">
              {bio150}
            </p>
          </section>
          <section aria-labelledby="temas">
            <h2 id="temas" className="font-serif text-2xl text-white">
              Temas sobre los que puede opinar
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {temas.map((t) => (
                <li key={t} className="rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-paper/85">
                  {t}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="datos">
            <h2 id="datos" className="font-serif text-2xl text-white">
              Datos para créditos
            </h2>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-line p-4">
                <dt className="text-muted">Nombre</dt>
                <dd className="text-paper">{site.name}</dd>
              </div>
              <div className="rounded-xl border border-line p-4">
                <dt className="text-muted">Cargo</dt>
                <dd className="text-paper">
                  {site.jobTitle}, {site.employer.name}
                </dd>
              </div>
              <div className="rounded-xl border border-line p-4">
                <dt className="text-muted">Ciudad</dt>
                <dd className="text-paper">
                  {site.city}, {site.region}, Colombia
                </dd>
              </div>
              <div className="rounded-xl border border-line p-4">
                <dt className="text-muted">Sitio web</dt>
                <dd className="text-paper">andreabelalcazar.com</dd>
              </div>
            </dl>
          </section>
        </div>

        <aside className="space-y-8 lg:col-span-5">
          <section aria-labelledby="fotos">
            <h2 id="fotos" className="font-serif text-2xl text-white">
              Fotografías
            </h2>
            <p className="mt-2 text-sm text-muted">
              Uso editorial permitido con crédito «Cortesía Andrea Belalcázar». Clic para abrir en tamaño completo.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={retrato.src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line"
              >
                <Image
                  src={retrato}
                  alt="Retrato profesional de Andrea Belalcázar, formato vertical"
                  fill
                  sizes="(min-width:1024px) 20vw, 45vw"
                  quality={70}
                  className="object-cover object-top"
                />
              </a>
              <a
                href={og.src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line"
              >
                <Image
                  src={og}
                  alt="Retrato de Andrea Belalcázar, recorte para redes"
                  fill
                  sizes="(min-width:1024px) 20vw, 45vw"
                  quality={70}
                  className="object-cover object-top"
                />
              </a>
            </div>
          </section>
          <section aria-labelledby="contacto-prensa" className="rounded-2xl border border-gold/30 bg-gold/5 p-7">
            <h2 id="contacto-prensa" className="font-serif text-2xl text-white">
              Contacto para entrevistas
            </h2>
            <p className="mt-2 text-sm text-muted">Respuesta el mismo día para solicitudes de prensa.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <WhatsAppLink
                  placement="footer"
                  topic="prensa"
                  className="text-gold underline underline-offset-4 hover:text-paper"
                >
                  WhatsApp {site.whatsapp.display}
                </WhatsAppLink>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}?subject=Solicitud%20de%20prensa`}
                  className="break-all text-gold underline underline-offset-4 hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
