import { Briefcase, Mic, Shield, Target } from "lucide-react";
import Link from "next/link";
import { services } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";

const icons = { mic: Mic, shield: Shield, target: Target, briefcase: Briefcase } as const;

export default function Services() {
  return (
    <section id="servicios" className="px-4 py-16 md:px-8 md:py-28" aria-labelledby="servicios-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="eyebrow mb-4">Servicios</p>
          <h2 id="servicios-title" className="font-serif text-3xl leading-tight text-balance text-white md:text-5xl">
            Qué hago
          </h2>
          <p className="mt-4 text-lg text-muted">
            Comunicación política e institucional para gobiernos, campañas y marcas. Cada servicio termina en una
            conversación directa, sin intermediarios.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li
                key={s.id}
                id={s.id}
                className="flex flex-col rounded-2xl border border-line bg-white/[0.02] p-7 transition-colors hover:border-gold/40"
              >
                <span
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-gold"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-serif text-xl leading-snug text-white">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{s.summary}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-paper/80">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href={`/servicios/${s.id}`}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold hover:text-paper"
                  >
                    Ver servicio <span aria-hidden="true">→</span>
                  </Link>
                  <WhatsAppLink
                    placement="services"
                    topic={s.id}
                    className="inline-flex min-h-11 items-center text-sm text-muted hover:text-gold"
                  >
                    Consultar por WhatsApp
                  </WhatsAppLink>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
