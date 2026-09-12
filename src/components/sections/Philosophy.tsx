import { philosophy, tools } from "@/content/site";

export default function Philosophy() {
  return (
    <section
      id="perfil"
      className="border-y border-line bg-ink-2 px-4 py-16 md:px-8 md:py-28"
      aria-labelledby="perfil-title"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {philosophy.eyebrow}
          </p>
          <h2 id="perfil-title" className="font-serif text-3xl leading-tight text-balance text-white md:text-4xl">
            {philosophy.title}
          </h2>
        </div>
        <div className="space-y-10 lg:col-span-8">
          <blockquote className="border-l-2 border-gold/60 pl-6 font-serif text-2xl leading-snug text-paper md:text-4xl">
            <p>«{philosophy.quote}»</p>
          </blockquote>
          <div className="grid gap-8 text-lg leading-relaxed text-muted md:grid-cols-2">
            {philosophy.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div>
            <p className="eyebrow mb-3">Herramientas</p>
            <ul className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t} className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm text-paper">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
