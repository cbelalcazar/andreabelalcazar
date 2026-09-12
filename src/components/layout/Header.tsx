import Link from "next/link";
import { site } from "@/content/site";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-black/5 bg-[#f5f5f7]/85 text-[#1d1d1f] md:backdrop-blur-xl md:backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-4 md:h-14 md:px-6">
        <Link
          href="/"
          className="font-display text-[19px] font-semibold tracking-[-0.02em]"
          aria-label="Andrea Belalcázar, inicio"
        >
          Andrea Belalcázar
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[13px] font-medium text-[#1d1d1f]/85">
            {site.nav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center transition-opacity hover:opacity-60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                className="inline-flex min-h-8 items-center rounded-full bg-[#1d1d1f] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#424245]"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
