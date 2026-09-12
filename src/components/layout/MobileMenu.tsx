"use client"; // estado abierto/cerrado, foco y tecla Escape

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const button = buttonRef.current;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-paper hover:bg-white/10"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="fixed inset-0 z-[90] flex flex-col bg-ink/98 px-6 pt-24 pb-10"
        >
          <nav aria-label="Principal (móvil)">
            <ul className="flex flex-col gap-2">
              {site.nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-4 font-serif text-3xl text-paper hover:bg-white/5 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <WhatsAppLink
              placement="mobile-menu"
              onClick={() => setOpen(false)}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gold text-base font-semibold text-ink hover:bg-gold-deep"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hablemos por WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      )}
    </div>
  );
}
