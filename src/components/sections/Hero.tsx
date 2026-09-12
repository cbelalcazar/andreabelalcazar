import Image from "next/image";
import Link from "next/link";
import { hero, site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import heroImg from "@/assets/img/andrea-belalcazar-hero.jpg";

export default function Hero() {
  return (
    <section id="hero" className="bg-ground px-4 pt-28 pb-16 md:px-6 md:pt-40 md:pb-24" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1024px] text-center">
        <p className="eyebrow">{hero.badge}</p>
        <h1 id="hero-title" className="display-xl mx-auto mt-4 max-w-[18ch] text-balance">
          {hero.h1}
        </h1>
        <p className="lead-xl mx-auto mt-6 max-w-[60ch] text-balance">{hero.lead}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <WhatsAppLink placement="hero" className="link-chevron">
            {hero.ctaPrimary}
          </WhatsAppLink>
          <Link href="/casos" className="link-chevron">
            {hero.ctaSecondary}
          </Link>
        </div>
      </div>

      <figure className="mx-auto mt-12 max-w-[1200px] md:mt-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-surface-2 sm:aspect-[16/10] lg:aspect-[16/9]">
          <Image
            src={heroImg}
            alt="Andrea Belalcázar, jefe de prensa y estratega de comunicación política, en Cali"
            fill
            preload
            placeholder="blur"
            quality={75}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-[70%_20%]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-5 left-6 text-left text-white md:bottom-7 md:left-8">
            <p className="font-display text-[20px] font-semibold tracking-[-0.02em] md:text-[24px]">{site.name}</p>
            <p className="text-[13px] text-white/80 md:text-[15px]">
              {site.jobTitle} · {site.employer.name}
            </p>
          </figcaption>
        </div>
      </figure>

      <ul
        className="mx-auto mt-10 flex max-w-[1024px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] font-medium text-muted"
        aria-label="Entidades y campañas en las que ha trabajado"
      >
        {hero.proof.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
