import Link from "next/link";
import { site } from "@/content/site";
import MobileMenu from "@/components/layout/MobileMenu";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-3 md:px-6 md:pt-5">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full border border-line bg-ink/90 px-5 md:h-16 md:px-8 md:backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3" aria-label="Andrea Belalcázar, inicio">
          <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
          <span className="font-serif text-lg tracking-wide text-white">
            Andrea <span className="font-bold">Belalcázar</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium tracking-wide text-muted">
            {site.nav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <WhatsAppLink
                placement="nav"
                className="inline-flex min-h-10 items-center rounded-full border border-gold/50 px-4 text-paper transition-colors hover:bg-gold hover:text-ink"
              >
                Contacto
              </WhatsAppLink>
            </li>
          </ul>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
