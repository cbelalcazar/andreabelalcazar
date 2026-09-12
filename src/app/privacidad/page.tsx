import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos recoge andreabelalcazar.com, con qué fin y cómo ejercer tus derechos según la Ley 1581 de 2012.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main id="contenido" className="px-4 pt-32 pb-20 md:px-8">
      <article className="mx-auto max-w-2xl space-y-8 text-base leading-relaxed text-ink-2">
        <header>
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="font-display text-4xl text-balance text-ink md:text-5xl">Política de privacidad</h1>
          <p className="mt-3 text-sm text-muted">Última actualización: 12 de septiembre de 2026.</p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-ink">Responsable</h2>
          <p>
            {site.name}, {site.city}, Colombia. Contacto:{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-accent">
              {site.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-ink">Qué datos se tratan</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">Medición sin cookies.</strong> Vercel Analytics y Speed Insights registran
              páginas vistas y métricas de rendimiento de forma agregada, sin identificadores persistentes.
            </li>
            <li>
              <strong className="text-ink">Google Analytics 4 (solo con tu consentimiento).</strong> Si aceptas el
              aviso, se activan cookies de análisis para conocer qué contenido resulta útil. Puedes rechazarlo sin que
              el sitio deje de funcionar.
            </li>
            <li>
              <strong className="text-ink">WhatsApp y correo.</strong> Si me escribes, trato los datos que tú incluyas
              en el mensaje únicamente para responderte. Esos canales los operan WhatsApp (Meta) y tu proveedor de
              correo bajo sus propias políticas.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-ink">Finalidad y base legal</h2>
          <p>
            Mejorar el sitio y atender consultas profesionales. El tratamiento se realiza conforme a la Ley 1581 de 2012
            y el Decreto 1377 de 2013 de Colombia, con base en tu autorización (analítica con cookies) y en el interés
            legítimo de responder a quien me contacta.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-ink">Tus derechos</h2>
          <p>
            Puedes conocer, actualizar, rectificar o suprimir tus datos y revocar la autorización escribiendo a{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-accent">
              {site.email}
            </a>
            . Para retirar el consentimiento de Google Analytics, borra los datos del sitio en tu navegador y vuelve a
            elegir «Rechazar» cuando aparezca el aviso.
          </p>
        </section>

        <p className="pt-4 text-sm text-muted">
          <Link href="/" className="underline underline-offset-4 hover:text-accent">
            Volver al inicio
          </Link>
        </p>
      </article>
    </main>
  );
}
