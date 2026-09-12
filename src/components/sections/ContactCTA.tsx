import { contact, site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function ContactCTA() {
  return (
    <section
      id="contacto"
      className="theme-dark bg-ground px-4 py-28 md:px-6 md:py-44"
      aria-labelledby="contacto-title"
    >
      <div className="reveal mx-auto max-w-[1024px] text-center">
        <p className="eyebrow">Contacto</p>
        <h2 id="contacto-title" className="display-xl mx-auto mt-4 max-w-[16ch] text-balance">
          {contact.title}
        </h2>
        <p className="lead-xl mx-auto mt-6 max-w-[40ch] text-balance">{contact.lead}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppLink placement="footer-cta" className="btn-pill">
            <WhatsAppIcon className="h-5 w-5" />
            {contact.cta}
          </WhatsAppLink>
          <a href={`mailto:${site.email}`} className="btn-pill-ghost">
            Escribir un correo
          </a>
        </div>
      </div>
    </section>
  );
}
