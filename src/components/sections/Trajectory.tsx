import Image from "next/image";
import Link from "next/link";
import { education, roles, showPeriod } from "@/content/site";
import LazyVideo from "@/components/media/LazyVideo";
import evento1 from "@/assets/img/andrea-belalcazar-evento-1.jpg";
import evento2 from "@/assets/img/andrea-belalcazar-evento-2.jpg";

const typeLabel = { gobierno: "Gobierno", campaña: "Campaña", empresa: "Empresa" } as const;

export default function Trajectory() {
  return (
    <section id="trayectoria" className="bg-ground px-4 py-24 md:px-6 md:py-36" aria-labelledby="trayectoria-title">
      <div className="mx-auto max-w-[1024px]">
        <div className="reveal text-center">
          <p className="eyebrow">Trayectoria</p>
          <h2 id="trayectoria-title" className="display-lg mx-auto mt-4 max-w-[18ch] text-balance">
            Gobierno, campañas y empresa.
          </h2>
        </div>

        <div className="reveal mt-14 grid gap-4 lg:grid-cols-12">
          <ol className="tile lg:col-span-7">
            {roles.map((r, i) => (
              <li key={`${r.org}-${r.title}`} className={`flex gap-5 ${i > 0 ? "mt-8 border-t border-line pt-8" : ""}`}>
                <span className="w-8 shrink-0 pt-1 font-display text-[13px] font-semibold text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="eyebrow">
                    <span className={r.current ? "text-accent" : ""}>{typeLabel[r.type]}</span>
                    {showPeriod(r.period) ? <> · {r.period}</> : null}
                  </p>
                  <h3 className="mt-1 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em] text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-0.5 text-[15px] text-ink-2">{r.org}</p>
                  <ul className="mt-2 space-y-1 text-[15px] leading-relaxed text-muted">
                    {r.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="tile">
              <p className="eyebrow mb-4">Formación</p>
              <dl className="divide-y divide-line">
                {education.map((e) => (
                  <div key={e.degree} className="py-4 first:pt-0 last:pb-0">
                    <dt className="font-display text-[17px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                      {e.degree}
                    </dt>
                    <dd className="mt-1 text-[14px] text-muted">
                      {e.level} · {e.school}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="overflow-hidden rounded-[28px] bg-surface-2">
              <LazyVideo
                sources={[
                  { src: "/clip-video.webm", type: "video/webm" },
                  { src: "/clip-video.mp4", type: "video/mp4" },
                ]}
                poster="/clip-video-poster.webp"
                label="Andrea Belalcázar en un cubrimiento de medios"
                className="aspect-video"
              />
            </figure>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-[28px]">
                <Image
                  src={evento1}
                  alt="Andrea Belalcázar junto a colegas en un evento institucional"
                  fill
                  sizes="(min-width:1024px) 20vw, 45vw"
                  quality={70}
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[28px]">
                <Image
                  src={evento2}
                  alt="Andrea Belalcázar en cabina de radio durante una entrevista"
                  fill
                  sizes="(min-width:1024px) 20vw, 45vw"
                  quality={70}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center">
          <Link href="/sobre-mi" className="link-chevron">
            Conocer la trayectoria completa
          </Link>
        </p>
      </div>
    </section>
  );
}
