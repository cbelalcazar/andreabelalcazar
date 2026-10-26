import Image from "next/image";
import { valueProp } from "@/content/site";
import LazyVideo from "@/components/media/LazyVideo";
import evento1 from "@/assets/img/andrea-belalcazar-evento-1.jpg";
import evento2 from "@/assets/img/andrea-belalcazar-evento-2.jpg";

export default function ValueProp() {
  return (
    <section
      id="propuesta"
      className="theme-dark bg-ground px-4 py-24 md:px-6 md:py-36"
      aria-labelledby="propuesta-title"
    >
      <div className="reveal mx-auto max-w-[1024px]">
        <p className="eyebrow text-center">{valueProp.eyebrow}</p>
        <h2 id="propuesta-title" className="display-lg mx-auto mt-4 max-w-[20ch] text-center text-balance">
          {valueProp.title}
        </h2>
        <div className="mx-auto mt-14 grid max-w-[900px] gap-10 text-[17px] leading-[1.6] text-muted md:grid-cols-2 md:gap-14">
          {valueProp.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <blockquote className="mx-auto mt-16 max-w-[34ch] text-center font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-balance text-ink">
          «{valueProp.quote}»
        </blockquote>

        {/* Prueba visual del trabajo con medios: cabina de radio, eventos y cubrimientos. */}
        <div className="mt-16 grid gap-4 md:grid-cols-12">
          <figure className="overflow-hidden rounded-[28px] bg-surface-2 md:col-span-6">
            <LazyVideo
              sources={[
                { src: "/clip-video.webm", type: "video/webm" },
                { src: "/clip-video.mp4", type: "video/mp4" },
              ]}
              poster="/clip-video-poster.webp"
              label="Andrea Belalcázar en un cubrimiento de medios"
              className="aspect-video h-full"
            />
          </figure>
          <div className="relative aspect-square overflow-hidden rounded-[28px] md:col-span-3 md:aspect-auto">
            <Image
              src={evento2}
              alt="Andrea Belalcázar en cabina de radio durante una entrevista"
              fill
              sizes="(min-width:768px) 25vw, 100vw"
              quality={70}
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[28px] md:col-span-3 md:aspect-auto">
            <Image
              src={evento1}
              alt="Andrea Belalcázar junto a colegas en un evento institucional"
              fill
              sizes="(min-width:768px) 25vw, 100vw"
              quality={70}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
