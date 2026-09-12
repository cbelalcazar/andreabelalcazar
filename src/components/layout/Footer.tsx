import Link from "next/link";
import { site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-black px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-white">Andrea Belalcázar</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            {site.jobTitle}, {site.employer.name}.
          </p>
        </div>

        <address className="text-sm text-muted not-italic">
          <p className="eyebrow mb-3">Contacto</p>
          <ul className="space-y-2">
            <li>
              <WhatsAppLink placement="footer" className="inline-flex min-h-11 items-center hover:text-gold">
                WhatsApp {site.whatsapp.display}
              </WhatsAppLink>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:text-gold">
                {site.email}
              </a>
            </li>
            <li>
              {site.city}, {site.region}, Colombia
            </li>
          </ul>
        </address>

        <nav aria-label="Pie de página" className="text-sm text-muted">
          <p className="eyebrow mb-3">Sitio</p>
          <ul className="space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={`/${item.href}`} className="inline-flex min-h-11 items-center hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/privacidad" className="inline-flex min-h-11 items-center hover:text-gold">
                Privacidad
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-[1400px] border-t border-line pt-6 text-xs text-muted">
        © {year} Andrea Belalcázar · Cali, Colombia
      </p>
    </footer>
  );
}
