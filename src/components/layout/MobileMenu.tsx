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
        className="flex h-11 w-11 items-center justify-center rounded-full text-[#1d1d1f] hover:bg-black/5"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
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
              <path d="M4 8h16" />
              <path d="M4 16h16" />
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
          className="fixed inset-0 z-[90] flex flex-col bg-[#f5f5f7] px-6 pt-20 pb-8 text-[#1d1d1f]"
        >
          <nav aria-label="Principal (móvil)">
            <ul className="flex flex-col divide-y divide-black/10">
              {site.nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between font-display text-[28px] font-semibold tracking-[-0.02em]"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-black/30">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <WhatsAppLink
              placement="mobile-menu"
              onClick={() => setOpen(false)}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] text-[16px] font-medium text-white"
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
