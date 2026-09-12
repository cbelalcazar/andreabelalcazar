import Image from "next/image";
import Link from "next/link";
import { hero, site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import retrato from "@/assets/img/andrea-belalcazar-retrato.jpg";

export default function Hero() {
  return (
    <section id="hero" className="bg-ground px-4 pt-20 pb-16 md:px-6 md:pt-32 md:pb-24" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Retrato: primero en móvil, a la derecha en desktop. Es lo primero que debe verse. */}
        <figure className="relative order-first m-0 lg:order-last lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-surface-2 sm:aspect-[4/5] lg:aspect-[4/5]">
            <Image
              src={retrato}
              alt="Andrea Belalcázar, jefe de prensa y estratega de comunicación política, en Cali"
              fill
              preload
              placeholder="blur"
              quality={75}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="absolute bottom-5 left-6 text-white md:bottom-6 md:left-7">
              <p className="font-display text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]">{site.name}</p>
              <p className="text-[13px] text-white/85 md:text-[14px]">
                {site.jobTitle} · {site.city}, Colombia
              </p>
            </figcaption>
          </div>
        </figure>

        <div className="lg:col-span-6">
          <p className="eyebrow">{hero.badge}</p>
          <h1 id="hero-title" className="display-lg mt-4 max-w-[16ch] text-balance">
            {hero.h1}
          </h1>
          <p className="lead-xl mt-6 max-w-[52ch]">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <WhatsAppLink placement="hero" className="link-chevron">
              {hero.ctaPrimary}
            </WhatsAppLink>
            <Link href="/casos" className="link-chevron">
              {hero.ctaSecondary}
            </Link>
          </div>
          <ul
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[13px] font-medium text-muted"
            aria-label="Entidades y campañas en las que ha trabajado"
          >
            {hero.proof.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
