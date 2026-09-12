import Link from "next/link";
import { Briefcase, Mic, Shield, Target } from "lucide-react";
import { services } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";

const icons = { mic: Mic, shield: Shield, target: Target, briefcase: Briefcase } as const;

export default function Services() {
  return (
    <section id="servicios" className="bg-ground px-4 py-24 md:px-6 md:py-36" aria-labelledby="servicios-title">
      <div className="mx-auto max-w-[1024px]">
        <div className="reveal text-center">
          <p className="eyebrow">Servicios</p>
          <h2 id="servicios-title" className="display-lg mx-auto mt-4 max-w-[18ch] text-balance">
            Qué hago y para quién.
          </h2>
          <p className="lead-xl mx-auto mt-6 max-w-[52ch] text-balance">
            Comunicación política e institucional para gobiernos, campañas y marcas. Cada servicio termina en una
            conversación directa.
          </p>
        </div>

        <ul className="reveal mt-14 grid gap-4 md:grid-cols-2">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.id} className="tile flex flex-col">
                <span
                  className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-ground text-ink"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="display-md text-balance">{s.title}</h3>
                <p className="mt-4 text-[17px] leading-[1.55] text-muted">{s.summary}</p>
                <ul className="mt-5 space-y-1.5 text-[15px] text-ink-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-2" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6">
                  <Link href={`/servicios/${s.id}`} className="link-chevron">
                    Ver servicio
                  </Link>
                  <WhatsAppLink placement="services" topic={s.id} className="link-chevron">
                    Consultar
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
