import Breadcrumbs from "@/components/content/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  meta,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  meta?: React.ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <header
      className={`mx-auto max-w-[1024px] px-4 pt-24 pb-12 md:px-6 md:pt-36 md:pb-16 ${center ? "text-center" : ""}`}
    >
      <div className={center ? "flex justify-center" : ""}>
        <Breadcrumbs crumbs={crumbs} />
      </div>
      {eyebrow ? <p className="eyebrow mt-8">{eyebrow}</p> : <div className="mt-8" />}
      <h1 className={`display-lg mt-3 text-balance ${center ? "mx-auto max-w-[22ch]" : "max-w-[24ch]"}`}>{title}</h1>
      {lead ? (
        <p className={`lead-xl mt-6 text-balance ${center ? "mx-auto max-w-[60ch]" : "max-w-[60ch]"}`}>{lead}</p>
      ) : null}
      {meta ? (
        <div
          className={`mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-muted ${center ? "justify-center" : ""}`}
        >
          {meta}
        </div>
      ) : null}
    </header>
  );
}
