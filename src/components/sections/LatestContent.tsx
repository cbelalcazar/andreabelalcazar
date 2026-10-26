import Link from "next/link";
import { CaseCard, PostCard, TermCard } from "@/components/content/Cards";
import { labels } from "@/content/site";
import { demandRank, getCases, getPosts, getTerms } from "@/lib/content";

export default function LatestContent() {
  const cases = getCases().slice(0, 3);
  const posts = getPosts().slice(0, 3);
  // Los términos más buscados: puerta de entrada del tráfico y enlazado interno (plan C-05)
  const terms = getTerms()
    .sort((a, b) => demandRank(a.slug) - demandRank(b.slug))
    .slice(0, 6);
  return (
    <>
      <section id="casos" className="bg-ground px-4 py-24 md:px-6 md:py-36" aria-labelledby="casos-title">
        <div className="mx-auto max-w-[1024px]">
          <div className="reveal text-center">
            <p className="eyebrow">{labels.cases}</p>
            <h2 id="casos-title" className="display-lg mx-auto mt-4 max-w-[18ch] text-balance">
              Dónde he aplicado esto.
            </h2>
            <p className="lead-xl mx-auto mt-6 max-w-[48ch] text-balance">
              Gobierno, campañas y empresa. Cada proyecto cuenta el reto, el enfoque y lo que se hizo.
            </p>
          </div>
          <div className="reveal mt-14 grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/casos" className="link-chevron">
              Ver todos los proyectos
            </Link>
          </p>
        </div>
      </section>

      {posts.length > 0 && (
        <section id="blog" className="theme-dark bg-ground px-4 py-24 md:px-6 md:py-36" aria-labelledby="blog-title">
          <div className="mx-auto max-w-[1024px]">
            <div className="reveal text-center">
              <p className="eyebrow">{labels.blog}</p>
              <h2 id="blog-title" className="display-lg mx-auto mt-4 max-w-[18ch] text-balance">
                Guías desde el oficio.
              </h2>
              <p className="lead-xl mx-auto mt-6 max-w-[48ch] text-balance">
                Prensa, comunicación política, crisis e inteligencia artificial, explicadas para quien tiene que
                decidir.
              </p>
            </div>
            <div className="reveal mt-14 grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
            <p className="mt-10 text-center">
              <Link href="/blog" className="link-chevron">
                Todas las perspectivas
              </Link>
            </p>
          </div>
        </section>
      )}
      {terms.length > 0 && (
        <section id="glosario" className="bg-ground px-4 py-24 md:px-6 md:py-36" aria-labelledby="glosario-title">
          <div className="mx-auto max-w-[1024px]">
            <div className="reveal text-center">
              <p className="eyebrow">{labels.glossary}</p>
              <h2 id="glosario-title" className="display-lg mx-auto mt-4 max-w-[18ch] text-balance">
                Los conceptos más consultados.
              </h2>
              <p className="lead-xl mx-auto mt-6 max-w-[48ch] text-balance">
                Treinta términos de prensa y comunicación pública, explicados con ejemplos y fuentes.
              </p>
            </div>
            <div className="reveal mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {terms.map((t) => (
                <TermCard key={t.slug} t={t} />
              ))}
            </div>
            <p className="mt-10 text-center">
              <Link href="/glosario" className="link-chevron">
                Ver el glosario completo
              </Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
