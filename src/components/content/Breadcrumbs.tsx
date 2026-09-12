import Link from "next/link";
import type { Crumb } from "@/lib/seo";

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Inicio", path: "/" }, ...crumbs];
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-paper/80">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="inline-flex min-h-8 items-center hover:text-gold">
                  {c.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
