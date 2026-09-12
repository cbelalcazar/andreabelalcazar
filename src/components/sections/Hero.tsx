import Image from "next/image";
import { hero, site } from "@/content/site";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import retrato from "@/assets/img/andrea-belalcazar-retrato.jpg";

export default function Hero() {
  return (
    <section id="hero" className="relative px-4 pt-24 pb-14 md:px-8 md:pt-40 md:pb-24" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Retrato primero en móvil: la cara es la prueba nº 1 */}
        <div className="relative order-first lg:order-last">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl sm:aspect-[4/5]">
            <Image
              src={retrato}
              alt="Andrea Belalcázar, jefe de prensa y estratega de comunicación política, en Cali"
              fill
              preload
              placeholder="blur"
              quality={70}
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between">
              <div>
                <p className="font-serif text-xl text-white">{site.name}</p>
                <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">{site.city}, Colombia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
            {hero.badge}
          </p>
          <h1
            id="hero-title"
            className="font-serif text-4xl leading-[1.08] text-balance text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {hero.h1}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">{hero.lead}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppLink
              placement="hero"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold px-8 text-sm font-semibold text-ink shadow-xl shadow-gold/10 transition-colors hover:bg-gold-deep"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {hero.ctaPrimary}
            </WhatsAppLink>
            <a
              href="#trayectoria"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <ul
            className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted"
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
