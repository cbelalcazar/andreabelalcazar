import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="contenido"
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center md:px-8"
    >
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="font-serif text-4xl text-balance text-white md:text-6xl">Esta página no existe.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        Puede que el enlace haya cambiado. Lo importante sigue en la página principal.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-semibold text-ink hover:bg-gold-deep"
        >
          Ir al inicio
        </Link>
        <WhatsAppLink
          placement="not-found"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white hover:bg-white/5"
        >
          Escribir por WhatsApp
        </WhatsAppLink>
      </div>
    </main>
  );
}
