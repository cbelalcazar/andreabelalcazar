import type { Metadata } from "next";
import PageHeader from "@/components/content/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { site } from "@/content/site";
import { buildBreadcrumbs, graph } from "@/lib/seo";
import ContactForm from "./ContactForm";

const description =
  "Escríbele a Andrea Belalcázar por WhatsApp, correo o formulario para consultas de prensa, gestión de crisis, estrategia digital y comunicación institucional en el Valle del Cauca.";

export const metadata: Metadata = {
  title: "Contacto",
  description,
  alternates: { canonical: "/contacto" },
  openGraph: { title: "Contacto · Andrea Belalcázar", description, url: "/contacto", type: "website" },
};

export default function ContactoPage() {
  const crumbs = [{ name: "Contacto", path: "/contacto" }];
  const formEnabled = Boolean(process.env.RESEND_API_KEY);
  return (
    <main id="contenido">
      <JsonLd data={graph(buildBreadcrumbs(crumbs))} />
      <PageHeader
        eyebrow="Contacto"
        title="Cuéntame tu situación. Respondo personalmente."
        lead={description}
        crumbs={crumbs}
      />
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-24 md:px-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-5">
          <WhatsAppLink
            placement="footer-cta"
            topic="contacto"
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-6 hover:bg-surface-2"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
              <WhatsAppIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-semibold text-ink">WhatsApp</span>
              <span className="text-sm text-muted">{site.whatsapp.display} · la vía más rápida</span>
            </span>
          </WhatsAppLink>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-6 hover:border-line"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent"
              aria-hidden="true"
            >
              @
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-ink">Correo</span>
              <span className="block truncate text-sm text-muted">{site.email}</span>
            </span>
          </a>
          <div className="rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
            <p className="font-semibold text-ink">Ubicación</p>
            <p>
              {site.city}, {site.region}, Colombia. Trabajo con entidades de todo el suroccidente y a distancia con el
              resto del país.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl border border-line bg-surface p-6 md:p-8">
            <h2 className="font-display text-2xl text-ink">Formulario</h2>
            {formEnabled ? (
              <div className="mt-6">
                <ContactForm />
              </div>
            ) : (
              <p className="mt-4 text-muted">
                El formulario se activará próximamente. Mientras tanto, WhatsApp y el correo funcionan con normalidad y
                llegan directamente a Andrea.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
