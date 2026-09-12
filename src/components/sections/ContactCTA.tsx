import { contact, site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function ContactCTA() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-black px-4 py-20 md:px-8 md:py-32"
      aria-labelledby="contacto-title"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">Contacto</p>
        <h2 id="contacto-title" className="font-serif text-4xl leading-tight text-balance text-white md:text-6xl">
          {contact.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{contact.lead}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppLink
            placement="footer-cta"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-10 text-sm font-semibold text-ink transition-colors hover:bg-gold"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {contact.cta}
          </WhatsAppLink>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-10 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Escribir un correo
          </a>
        </div>
      </div>
    </section>
  );
}
