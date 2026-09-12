import Link from "next/link";
import { Briefcase, Mic, Presentation, Shield, Target } from "lucide-react";
import type { CaseMeta, PostMeta, ServiceMeta, TermMeta } from "@/lib/content";
import { TEMAS } from "@/lib/content";

const icons = { mic: Mic, shield: Shield, target: Target, briefcase: Briefcase, presentation: Presentation } as const;
const typeLabel = { gobierno: "Gobierno", campaña: "Campaña", empresa: "Empresa" } as const;

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

const tile =
  "group flex flex-col rounded-[28px] bg-surface p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none md:p-8";

export function ServiceCard({ s }: { s: ServiceMeta }) {
  const Icon = icons[s.icon];
  return (
    <Link href={`/servicios/${s.slug}`} className={tile}>
      <span
        className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-ground text-ink"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <p className="eyebrow">{s.eyebrow}</p>
      <h3 className="mt-1 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em] text-balance text-ink">
        {s.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.55] text-muted">{s.description}</p>
      <span className="link-chevron mt-5 text-[15px]">Ver servicio</span>
    </Link>
  );
}

export function CaseCard({ c }: { c: CaseMeta }) {
  return (
    <Link href={`/casos/${c.slug}`} className={tile}>
      <p className="eyebrow">
        {typeLabel[c.entityType]}
        {c.period !== "TODO" ? <> · {c.period}</> : null}
      </p>
      <h3 className="mt-1 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em] text-balance text-ink">
        {c.entity}
      </h3>
      <p className="mt-1 text-[14px] text-ink-2">{c.role}</p>
      <p className="mt-3 text-[15px] leading-[1.55] text-muted">{c.description}</p>
      <span className="link-chevron mt-5 text-[15px]">Leer el caso</span>
    </Link>
  );
}

export function PostCard({ p }: { p: PostMeta }) {
  return (
    <article className={tile}>
      <p className="eyebrow">
        <Link href={`/blog/tema/${p.tema}`} className="hover:text-ink">
          {TEMAS[p.tema]}
        </Link>
      </p>
      <h3 className="mt-1 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em] text-balance text-ink">
        <Link href={`/blog/${p.slug}`} className="hover:underline">
          {p.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] leading-[1.55] text-muted">{p.description}</p>
      <p className="mt-5 text-[13px] text-muted">
        <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min
      </p>
    </article>
  );
}

export function TermCard({ t }: { t: TermMeta }) {
  return (
    <Link
      href={`/glosario/${t.slug}`}
      className="flex flex-col rounded-[20px] bg-surface p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
    >
      <h3 className="font-display text-[18px] font-semibold tracking-[-0.01em] text-ink">{t.term}</h3>
      <p className="mt-2 text-[14px] leading-[1.5] text-muted">{t.short}</p>
    </Link>
  );
}
