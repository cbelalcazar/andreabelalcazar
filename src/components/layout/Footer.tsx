import Link from "next/link";
import { site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";

const groups = [
  {
    title: "Servicios",
    links: [
      { href: "/servicios/jefatura-de-prensa", label: "Jefatura de prensa" },
      { href: "/servicios/gestion-de-crisis", label: "Gestión de crisis" },
      { href: "/servicios/marketing-politico-digital", label: "Estrategia digital" },
      { href: "/servicios/comunicacion-institucional", label: "Comunicación institucional" },
    ],
  },
  {
    title: "Conocer",
    links: [
      { href: "/sobre-mi", label: "Sobre mí" },
      { href: "/casos", label: "Casos" },
      { href: "/prensa", label: "Prensa" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Leer",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/blog/tema/prensa", label: "Prensa y medios" },
      { href: "/blog/tema/crisis", label: "Gestión de crisis" },
      { href: "/glosario", label: "Glosario" },
    ],
  },
];

/** Enlaces del glosario en todo el sitio: refuerzan el rastreo de las fichas (plan G-13). */
const glossaryLinks = [
  { href: "/glosario/vocero", label: "Vocero" },
  { href: "/glosario/agenda-setting", label: "Agenda setting" },
  { href: "/glosario/off-the-record", label: "Off the record" },
  { href: "/glosario/rueda-de-prensa", label: "Rueda de prensa" },
  { href: "/glosario/gestion-de-crisis", label: "Gestión de crisis" },
  { href: "/glosario/relaciones-publicas", label: "Relaciones públicas" },
  { href: "/glosario/opinion-publica", label: "Opinión pública" },
  { href: "/glosario/desinformacion", label: "Desinformación" },
  { href: "/glosario/voceria", label: "Vocería" },
  { href: "/glosario/narrativa", label: "Narrativa" },
  { href: "/glosario/asuntos-publicos", label: "Asuntos públicos" },
  { href: "/glosario/pauta-digital", label: "Pauta digital" },
  { href: "/glosario/segmentacion", label: "Segmentación" },
  { href: "/glosario/clipping", label: "Clipping" },
  { href: "/glosario/embargo-informativo", label: "Embargo informativo" },
  { href: "/glosario/free-press", label: "Free press" },
  { href: "/glosario/earned-media", label: "Earned media" },
  { href: "/glosario/owned-media", label: "Owned media" },
  { href: "/glosario/paid-media", label: "Paid media" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ground px-4 pt-12 pb-10 text-[12px] text-muted md:px-6">
      <div className="mx-auto max-w-[1024px]">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="mb-3 font-semibold text-ink">{g.title}</p>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-8 items-center hover:text-ink hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <address className="not-italic">
            <p className="mb-3 font-semibold text-ink">Contacto</p>
            <ul className="space-y-2">
              <li>
                <WhatsAppLink
                  placement="footer"
                  className="inline-flex min-h-8 items-center hover:text-ink hover:underline"
                >
                  WhatsApp {site.whatsapp.display}
                </WhatsAppLink>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-8 items-center break-all hover:text-ink hover:underline"
                >
                  {site.email}
                </a>
              </li>
              <li>
                {site.city}, {site.region}, Colombia
              </li>
            </ul>
          </address>
        </div>
        <nav aria-label="Glosario" className="mt-10 border-t border-line pt-5">
          <p className="mb-2 font-semibold text-ink">
            <Link href="/glosario" className="hover:underline">
              Glosario
            </Link>
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {glossaryLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-8 items-center hover:text-ink hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright © {year} {site.name}. {site.jobTitle}, {site.employer.name}.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link href="/privacidad" className="hover:text-ink hover:underline">
                Privacidad
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="hover:text-ink hover:underline">
                RSS
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-ink hover:underline">
                Mapa del sitio
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
