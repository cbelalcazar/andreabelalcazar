import Link from "next/link";
import { CaseCard, PostCard } from "@/components/content/Cards";
import { getCases, getPosts } from "@/lib/content";

export default function LatestContent() {
  const cases = getCases().slice(0, 3);
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <section id="casos" className="bg-ground-2 px-4 py-24 md:px-6 md:py-36" aria-labelledby="casos-title">
        <div className="mx-auto max-w-[1024px]">
          <div className="reveal text-center">
            <p className="eyebrow">Casos</p>
            <h2 id="casos-title" className="display-lg mx-auto mt-4 max-w-[18ch] text-balance">
              Dónde he aplicado esto.
            </h2>
            <p className="lead-xl mx-auto mt-6 max-w-[48ch] text-balance">
              Gobierno, campañas y empresa. Cada caso cuenta el contexto, el reto y lo que hice.
            </p>
          </div>
          <div className="reveal mt-14 grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/casos" className="link-chevron">
              Ver los seis casos
            </Link>
          </p>
        </div>
      </section>

      {posts.length > 0 && (
        <section id="blog" className="theme-dark bg-ground px-4 py-24 md:px-6 md:py-36" aria-labelledby="blog-title">
          <div className="mx-auto max-w-[1024px]">
            <div className="reveal text-center">
              <p className="eyebrow">Blog</p>
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
                Todos los artículos
              </Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
