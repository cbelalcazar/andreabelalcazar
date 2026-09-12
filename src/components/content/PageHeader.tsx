import Breadcrumbs from "@/components/content/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  meta,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  meta?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[1400px] px-4 pt-28 pb-10 md:px-8 md:pt-40 md:pb-14">
      <Breadcrumbs crumbs={crumbs} />
      {eyebrow ? <p className="eyebrow mt-8 mb-4">{eyebrow}</p> : <div className="mt-8" />}
      <h1 className="max-w-4xl font-serif text-4xl leading-[1.08] text-balance text-white md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{lead}</p> : null}
      {meta ? <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">{meta}</div> : null}
    </header>
  );
}
