import { philosophy, tools } from "@/content/site";

export default function Philosophy() {
  return (
    <section id="perfil" className="theme-dark bg-ground px-4 py-24 md:px-6 md:py-36" aria-labelledby="perfil-title">
      <div className="reveal mx-auto max-w-[1024px]">
        <p className="eyebrow text-center">{philosophy.eyebrow}</p>
        <h2 id="perfil-title" className="display-lg mx-auto mt-4 max-w-[20ch] text-center text-balance">
          {philosophy.title}
        </h2>
        <blockquote className="mx-auto mt-12 max-w-[34ch] text-center font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-balance text-ink">
          «{philosophy.quote}»
        </blockquote>
        <div className="mx-auto mt-16 grid max-w-[900px] gap-10 text-[17px] leading-[1.6] text-muted md:grid-cols-2 md:gap-14">
          {philosophy.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <ul className="mx-auto mt-14 flex max-w-[900px] flex-wrap justify-center gap-2" aria-label="Herramientas">
          {tools.map((t) => (
            <li key={t} className="rounded-full border border-line px-4 py-2 text-[13px] font-medium text-ink-2">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
