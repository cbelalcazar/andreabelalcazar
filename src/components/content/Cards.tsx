import Link from "next/link";
import { Briefcase, Mic, Presentation, Shield, Target } from "lucide-react";
import type { CaseMeta, PostMeta, ServiceMeta, TermMeta } from "@/lib/content";
import { TEMAS } from "@/lib/content";

const icons = { mic: Mic, shield: Shield, target: Target, briefcase: Briefcase, presentation: Presentation } as const;
const typeLabel = { gobierno: "Gobierno", campaña: "Campaña", empresa: "Empresa" } as const;

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

export function ServiceCard({ s }: { s: ServiceMeta }) {
  const Icon = icons[s.icon];
  return (
    <Link
      href={`/servicios/${s.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-white/[0.02] p-7 transition-colors hover:border-gold/40 hover:bg-white/[0.04]"
    >
      <span
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-gold"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" />
      </span>
      <p className="eyebrow mb-2">{s.eyebrow}</p>
      <h3 className="font-serif text-xl leading-snug text-white">{s.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-muted">{s.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:text-paper">
        Ver servicio <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export function CaseCard({ c }: { c: CaseMeta }) {
  return (
    <Link
      href={`/casos/${c.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-white/[0.02] p-7 transition-colors hover:border-gold/40 hover:bg-white/[0.04]"
    >
      <p className="eyebrow mb-2">
        {typeLabel[c.entityType]}
        {c.period !== "TODO" ? <span className="text-muted"> · {c.period}</span> : null}
      </p>
      <h3 className="font-serif text-xl leading-snug text-white">{c.entity}</h3>
      <p className="mt-1 text-sm text-paper/80">{c.role}</p>
      <p className="mt-3 text-base leading-relaxed text-muted">{c.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:text-paper">
        Leer el caso <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export function PostCard({ p }: { p: PostMeta }) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white/[0.02] p-7 transition-colors hover:border-gold/40">
      <p className="eyebrow mb-3">
        <Link href={`/blog/tema/${p.tema}`} className="hover:text-paper">
          {TEMAS[p.tema]}
        </Link>
      </p>
      <h3 className="font-serif text-xl leading-snug text-white">
        <Link href={`/blog/${p.slug}`} className="hover:text-gold">
          {p.title}
        </Link>
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted">{p.description}</p>
      <p className="mt-5 text-sm text-muted">
        <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min de lectura
      </p>
    </article>
  );
}

export function TermCard({ t }: { t: TermMeta }) {
  return (
    <Link
      href={`/glosario/${t.slug}`}
      className="flex flex-col rounded-xl border border-line bg-white/[0.02] p-5 transition-colors hover:border-gold/40"
    >
      <h3 className="font-serif text-lg text-white">{t.term}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t.short}</p>
    </Link>
  );
}
