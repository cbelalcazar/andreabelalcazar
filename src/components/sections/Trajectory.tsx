import Image from "next/image";
import { education, roles, showPeriod } from "@/content/site";
import LazyVideo from "@/components/media/LazyVideo";
import evento1 from "@/assets/img/andrea-belalcazar-evento-1.jpg";
import evento2 from "@/assets/img/andrea-belalcazar-evento-2.jpg";

const typeLabel = { gobierno: "Gobierno", campaña: "Campaña", empresa: "Empresa" } as const;

export default function Trajectory() {
  return (
    <section
      id="trayectoria"
      className="border-y border-line bg-ink-2 px-4 py-16 md:px-8 md:py-28"
      aria-labelledby="trayectoria-title"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-4">Trayectoria</p>
          <h2 id="trayectoria-title" className="font-serif text-3xl leading-tight text-balance text-white md:text-5xl">
            Gobierno, campañas y empresa
          </h2>

          <ol className="mt-10 border-l border-gold/30">
            {roles.map((r) => (
              <li key={`${r.org}-${r.title}`} className="relative pb-10 pl-8 last:pb-0">
                <span
                  className={`absolute top-2 -left-[5px] h-[9px] w-[9px] rounded-full ${r.current ? "bg-gold" : "bg-muted/60"}`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.12em] uppercase">
                  <span className={r.current ? "text-gold" : "text-muted"}>{typeLabel[r.type]}</span>
                  {showPeriod(r.period) && (
                    <>
                      <span className="text-muted/50" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-muted">{r.period}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-white">{r.title}</h3>
                <p className="mt-1 text-base text-paper/85">{r.org}</p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <p className="eyebrow mb-4">Formación</p>
            <dl className="divide-y divide-line rounded-2xl border border-line bg-black/30">
              {education.map((e) => (
                <div key={e.degree} className="grid gap-1 px-6 py-5">
                  <dt className="font-serif text-xl text-white">{e.degree}</dt>
                  <dd className="text-sm text-muted">
                    {e.level} ·{" "}
                    <a
                      href={e.schoolUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="underline-offset-4 hover:text-gold hover:underline"
                    >
                      {e.school}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="m-0">
            <LazyVideo
              sources={[
                { src: "/clip-video.webm", type: "video/webm" },
                { src: "/clip-video.mp4", type: "video/mp4" },
              ]}
              poster="/clip-video-poster.webp"
              label="Andrea Belalcázar en un cubrimiento de medios"
              className="aspect-video rounded-2xl border border-line bg-black/40"
            />
            <figcaption className="mt-2 text-xs text-muted">
              Cubrimiento de medios · Secretaría de Turismo del Valle del Cauca.
            </figcaption>
          </figure>

          <div className="grid grid-cols-2 gap-4">
            <figure className="m-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-line">
                <Image
                  src={evento1}
                  alt="Andrea Belalcázar junto a colegas en un evento institucional"
                  fill
                  sizes="(min-width:1024px) 20vw, 45vw"
                  quality={70}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-muted">Evento institucional.</figcaption>
            </figure>
            <figure className="m-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-line">
                <Image
                  src={evento2}
                  alt="Andrea Belalcázar en cabina de radio durante una entrevista"
                  fill
                  sizes="(min-width:1024px) 20vw, 45vw"
                  quality={70}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-muted">Entrevista en radio.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
