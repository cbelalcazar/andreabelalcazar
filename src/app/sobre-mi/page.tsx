import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/content/PageHeader";
import ContactBlock from "@/components/content/ContactBlock";
import JsonLd from "@/components/seo/JsonLd";
import { education, roles, showPeriod, site, tools } from "@/content/site";
import { absoluteUrl, buildBreadcrumbs, buildProfilePage, graph } from "@/lib/seo";
import retrato from "@/assets/img/andrea-belalcazar-retrato.jpg";

const description =
  "Profesional en Mercadeo con especialización en Gerencia de Marketing Estratégico. Jefe de prensa en gobierno, campañas electorales y empresa privada en el Valle del Cauca.";

export const metadata: Metadata = {
  title: "Sobre mí",
  description,
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: `Sobre ${site.name}`,
    description,
    url: "/sobre-mi",
    type: "profile",
    firstName: "Andrea",
    lastName: "Belalcázar",
  },
};

const typeLabel = { gobierno: "Gobierno", campaña: "Campaña", empresa: "Empresa" } as const;

export default function SobreMiPage() {
  const crumbs = [{ name: "Sobre mí", path: "/sobre-mi" }];
  return (
    <main id="contenido">
      <JsonLd data={graph(buildProfilePage(absoluteUrl(retrato.src)), buildBreadcrumbs(crumbs))} />
      <PageHeader
        eyebrow="Sobre mí"
        title="Comunico instituciones y liderazgos desde el Valle del Cauca."
        lead={description}
        crumbs={crumbs}
      />

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-20 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line lg:sticky lg:top-32">
            <Image
              src={retrato}
              alt={`${site.name}, retrato profesional`}
              fill
              sizes="(min-width:1024px) 30vw, 100vw"
              quality={70}
              className="object-cover object-top"
              placeholder="blur"
            />
          </div>
        </div>

        <div className="min-w-0 space-y-12 lg:col-span-8">
          <section aria-labelledby="quien" className="prose-site">
            <h2 id="quien">Quién soy</h2>
            <p>
              Soy {site.name}, {site.jobTitle.toLowerCase()} de la {site.employer.name}. Trabajo en prensa, relaciones
              públicas, comunicación institucional, marketing político, narrativa pública, medios y estrategia digital.
            </p>
            <p>
              Mi formación es de mercadeo, no de periodismo, y eso define mi manera de trabajar: parto de un objetivo,
              defino la audiencia y el mensaje, elijo el canal y mido. Integro visión estratégica, capacidad operativa e
              inteligencia artificial aplicada para potenciar posicionamiento, reputación y resultados.
            </p>
            <p>
              He liderado comunicación en tres entornos distintos: gobierno (Secretaría de Turismo del Valle del Cauca,
              Concejo de Cali, Secretaría de Salud Pública), campañas electorales (jefatura de prensa regional de una
              campaña presidencial en 2022 y dirección de comunicaciones de una campaña a la Alcaldía de Cali) y empresa
              privada (La Occidental Ltda.).
            </p>
          </section>

          <section aria-labelledby="trayectoria">
            <h2 id="trayectoria" className="font-serif text-3xl text-white">
              Trayectoria
            </h2>
            <ol className="mt-6 border-l border-gold/30">
              {roles.map((r) => (
                <li key={`${r.org}-${r.title}`} className="relative pb-8 pl-8 last:pb-0">
                  <span
                    className={`absolute top-2 -left-[5px] h-[9px] w-[9px] rounded-full ${r.current ? "bg-gold" : "bg-muted/60"}`}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                    <span className={r.current ? "text-gold" : ""}>{typeLabel[r.type]}</span>
                    {showPeriod(r.period) ? <> · {r.period}</> : null}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-white">{r.title}</h3>
                  <p className="text-paper/85">{r.org}</p>
                  <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted">
                    {r.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">
              Ver los{" "}
              <Link href="/casos" className="text-gold underline underline-offset-4 hover:text-paper">
                casos en detalle
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="formacion">
            <h2 id="formacion" className="font-serif text-3xl text-white">
              Formación
            </h2>
            <dl className="mt-6 divide-y divide-line rounded-2xl border border-line">
              {education.map((e) => (
                <div key={e.degree} className="px-6 py-5">
                  <dt className="font-serif text-xl text-white">{e.degree}</dt>
                  <dd className="text-sm text-muted">
                    {e.level} ·{" "}
                    <a
                      href={e.schoolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold hover:underline"
                    >
                      {e.school}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="herramientas">
            <h2 id="herramientas" className="font-serif text-3xl text-white">
              Herramientas
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t} className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm text-paper">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="como-trabajo" className="prose-site">
            <h2 id="como-trabajo">Cómo trabajo</h2>
            <ul>
              <li>
                <strong>Datos antes que adjetivos.</strong> Un mensaje que no se puede comprobar no sale.
              </li>
              <li>
                <strong>Una sola vocería.</strong> En prensa y en crisis, la institución habla con una voz.
              </li>
              <li>
                <strong>Medición mensual.</strong> Publicaciones, tono, alcance y conversaciones generadas.
              </li>
              <li>
                <strong>IA con revisión humana.</strong> Acelera borradores y monitoreo; el criterio y la decisión son
                de personas.
              </li>
            </ul>
          </section>

          <ContactBlock placement="trajectory" title="¿Trabajamos juntos?" />
        </div>
      </div>
    </main>
  );
}
