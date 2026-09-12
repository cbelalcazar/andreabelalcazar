import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { site } from "@/content/site";

/**
 * Índice de contenido: única fuente para rutas, sitemap, RSS, enlaces
 * relacionados y tests de integración. El cuerpo MDX se importa dinámicamente
 * en cada página (patrón de la guía MDX de Next 16).
 */

const CONTENT_DIR = join(process.cwd(), "src/content");
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dateRe = /^\d{4}-\d{2}-\d{2}$/;

export const TEMAS = {
  "comunicacion-politica": "Comunicación política",
  crisis: "Gestión de crisis",
  prensa: "Prensa y medios",
  ia: "IA aplicada a comunicación",
  "marketing-digital": "Marketing y estrategia digital",
  coyuntura: "Coyuntura",
} as const;
export type Tema = keyof typeof TEMAS;

const Faq = z.object({ q: z.string().min(8), a: z.string().min(20) });

export const PostSchema = z.object({
  title: z.string().min(10).max(80),
  description: z.string().min(100).max(170),
  date: z.string().regex(dateRe),
  updated: z.string().regex(dateRe).optional(),
  tema: z.enum(Object.keys(TEMAS) as [Tema, ...Tema[]]),
  tags: z.array(z.string()).max(8).default([]),
  faq: z.array(Faq).max(6).default([]),
  draft: z.boolean().default(false),
});
export type PostMeta = z.infer<typeof PostSchema> & { slug: string; readingMinutes: number };

export const ServiceSchema = z.object({
  title: z.string().min(8).max(90),
  description: z.string().min(100).max(170),
  eyebrow: z.string().min(3).max(60),
  forWho: z.array(z.string()).min(2).max(6),
  deliverables: z.array(z.string()).min(3).max(10),
  icon: z.enum(["mic", "shield", "target", "briefcase", "presentation"]),
  order: z.number().int(),
  faq: z.array(Faq).max(6).default([]),
  related: z.array(z.string().regex(slugRe)).default([]),
});
export type ServiceMeta = z.infer<typeof ServiceSchema> & { slug: string };

export const CaseSchema = z.object({
  title: z.string().min(8).max(90),
  description: z.string().min(100).max(170),
  entity: z.string(),
  entityType: z.enum(["gobierno", "campaña", "empresa"]),
  role: z.string(),
  /** Texto libre; "TODO" oculta el periodo hasta confirmarlo. */
  period: z.string().default("TODO"),
  order: z.number().int(),
  services: z.array(z.string().regex(slugRe)).default([]),
});
export type CaseMeta = z.infer<typeof CaseSchema> & { slug: string };

export const TermSchema = z.object({
  term: z.string().min(2).max(60),
  short: z.string().min(60).max(170),
  related: z.array(z.string().regex(slugRe)).default([]),
});
export type TermMeta = z.infer<typeof TermSchema> & { slug: string };

type Kind = "blog" | "servicios" | "casos" | "glosario";

function readAll<T extends z.ZodObject<z.ZodRawShape>>(
  kind: Kind,
  schema: T,
): Array<z.infer<T> & { slug: string; body: string }> {
  const dir = join(CONTENT_DIR, kind);
  const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    if (!slugRe.test(slug)) throw new Error(`Slug inválido: ${kind}/${file}`);
    const raw = readFileSync(join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Frontmatter inválido en ${kind}/${file}: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`,
      );
    }
    const parsedData = parsed.data as z.infer<T> & Record<string, unknown>;
    return { ...parsedData, slug, body: content };
  });
}

function omitBody<T extends { body: string }>(x: T): Omit<T, "body"> {
  const { body, ...rest } = x;
  void body;
  return rest;
}

function readingMinutes(body: string): number {
  const words = body
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPosts(): PostMeta[] {
  return readAll("blog", PostSchema)
    .filter((p) => !p.draft)
    .map(({ body, ...p }) => ({ ...p, readingMinutes: readingMinutes(body) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getPost(slug: string): PostMeta | undefined {
  return getPosts().find((p) => p.slug === slug);
}
export function getPostsByTema(tema: Tema): PostMeta[] {
  return getPosts().filter((p) => p.tema === tema);
}
export function getTemasConPosts(): Tema[] {
  const set = new Set(getPosts().map((p) => p.tema));
  return (Object.keys(TEMAS) as Tema[]).filter((t) => set.has(t));
}

export function getServices(): ServiceMeta[] {
  return readAll("servicios", ServiceSchema)
    .map((s) => omitBody(s))
    .sort((a, b) => a.order - b.order);
}
export function getService(slug: string): ServiceMeta | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function getCases(): CaseMeta[] {
  return readAll("casos", CaseSchema)
    .map((c) => omitBody(c))
    .sort((a, b) => a.order - b.order);
}
export function getCase(slug: string): CaseMeta | undefined {
  return getCases().find((c) => c.slug === slug);
}

export function getTerms(): TermMeta[] {
  return readAll("glosario", TermSchema)
    .map((t) => omitBody(t))
    .sort((a, b) => a.term.localeCompare(b.term, "es"));
}
export function getTerm(slug: string): TermMeta | undefined {
  return getTerms().find((t) => t.slug === slug);
}

export type RouteEntry = {
  path: string;
  lastModified: Date;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Todas las rutas indexables del sitio (para sitemap, tests y enlaces). */
export function getAllRoutes(): RouteEntry[] {
  const posts = getPosts();
  const newest = posts[0]?.updated ?? posts[0]?.date ?? "2026-09-12";
  const d = (s: string) => new Date(s);
  const routes: RouteEntry[] = [
    { path: "/", lastModified: d(newest), priority: 1, changeFrequency: "weekly" },
    { path: "/sobre-mi", lastModified: d("2026-09-12"), priority: 0.9, changeFrequency: "monthly" },
    { path: "/servicios", lastModified: d("2026-09-12"), priority: 0.9, changeFrequency: "monthly" },
    { path: "/casos", lastModified: d("2026-09-12"), priority: 0.8, changeFrequency: "monthly" },
    { path: "/prensa", lastModified: d("2026-09-12"), priority: 0.8, changeFrequency: "monthly" },
    { path: "/contacto", lastModified: d("2026-09-12"), priority: 0.8, changeFrequency: "yearly" },
    { path: "/blog", lastModified: d(newest), priority: 0.8, changeFrequency: "weekly" },
    { path: "/glosario", lastModified: d("2026-09-12"), priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacidad", lastModified: d("2026-09-12"), priority: 0.2, changeFrequency: "yearly" },
  ];
  for (const s of getServices())
    routes.push({
      path: `/servicios/${s.slug}`,
      lastModified: d("2026-09-12"),
      priority: 0.9,
      changeFrequency: "monthly",
    });
  for (const c of getCases())
    routes.push({ path: `/casos/${c.slug}`, lastModified: d("2026-09-12"), priority: 0.8, changeFrequency: "monthly" });
  for (const t of getTemasConPosts())
    routes.push({ path: `/blog/tema/${t}`, lastModified: d(newest), priority: 0.6, changeFrequency: "weekly" });
  for (const p of posts)
    routes.push({
      path: `/blog/${p.slug}`,
      lastModified: d(p.updated ?? p.date),
      priority: 0.7,
      changeFrequency: "monthly",
    });
  for (const t of getTerms())
    routes.push({
      path: `/glosario/${t.slug}`,
      lastModified: d("2026-09-12"),
      priority: 0.4,
      changeFrequency: "yearly",
    });
  return routes;
}

export const absolute = (path: string) => `${site.url}${path === "/" ? "/" : path}`;
