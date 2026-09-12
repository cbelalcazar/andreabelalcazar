import Link from "next/link";
import { CaseCard, PostCard } from "@/components/content/Cards";
import { getCases, getPosts } from "@/lib/content";

export default function LatestContent() {
  const cases = getCases().slice(0, 3);
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <section id="casos" className="px-4 py-16 md:px-8 md:py-28" aria-labelledby="casos-title">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">Casos</p>
              <h2 id="casos-title" className="font-serif text-3xl leading-tight text-balance text-white md:text-5xl">
                Dónde he aplicado esto
              </h2>
            </div>
            <Link href="/casos" className="text-sm font-semibold text-gold hover:text-paper">
              Ver los seis casos →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section
          id="blog"
          className="border-y border-line bg-ink-2 px-4 py-16 md:px-8 md:py-28"
          aria-labelledby="blog-title"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-4">Blog</p>
                <h2 id="blog-title" className="font-serif text-3xl leading-tight text-balance text-white md:text-5xl">
                  Guías desde el oficio
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-gold hover:text-paper">
                Todos los artículos →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
