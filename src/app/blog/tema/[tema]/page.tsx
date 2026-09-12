import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/content/PageHeader";
import { PostCard } from "@/components/content/Cards";
import JsonLd from "@/components/seo/JsonLd";
import { getPostsByTema, getTemasConPosts, TEMAS, type Tema } from "@/lib/content";
import { buildBreadcrumbs, buildCollection, graph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTemasConPosts().map((tema) => ({ tema }));
}

const descriptions: Record<Tema, string> = {
  "comunicacion-politica":
    "Cómo se construye y se sostiene un mensaje político e institucional: narrativa, discurso, agenda y relación con la ciudadanía.",
  crisis:
    "Protocolos, vocería bajo presión y decisiones de las primeras horas para proteger la reputación de instituciones, campañas y marcas.",
  prensa:
    "Jefatura de prensa en la práctica: comunicados, ruedas de prensa, relación con periodistas y medición de cobertura.",
  ia: "Usos reales, límites y riesgos de la inteligencia artificial en equipos de prensa y comunicación.",
  "marketing-digital":
    "Pauta, contenidos, medición e indicadores para que la estrategia digital sirva a un objetivo y no al revés.",
  coyuntura: "Lectura de la actualidad política y mediática colombiana desde la comunicación.",
};

export async function generateMetadata({ params }: PageProps<"/blog/tema/[tema]">): Promise<Metadata> {
  const { tema } = await params;
  if (!(tema in TEMAS)) return {};
  const t = tema as Tema;
  return {
    title: `${TEMAS[t]} · Blog`,
    description: descriptions[t],
    alternates: { canonical: `/blog/tema/${t}` },
    openGraph: {
      title: `${TEMAS[t]} · Blog de Andrea Belalcázar`,
      description: descriptions[t],
      url: `/blog/tema/${t}`,
      type: "website",
    },
  };
}

export default async function TemaPage({ params }: PageProps<"/blog/tema/[tema]">) {
  const { tema } = await params;
  if (!(tema in TEMAS)) notFound();
  const t = tema as Tema;
  const posts = getPostsByTema(t);
  const crumbs = [
    { name: "Blog", path: "/blog" },
    { name: TEMAS[t], path: `/blog/tema/${t}` },
  ];
  return (
    <main id="contenido">
      <JsonLd
        data={graph(
          buildCollection({ path: `/blog/tema/${t}`, name: TEMAS[t], description: descriptions[t] }),
          buildBreadcrumbs(crumbs),
        )}
      />
      <PageHeader eyebrow="Tema" title={TEMAS[t]} lead={descriptions[t]} crumbs={crumbs} />
      <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
