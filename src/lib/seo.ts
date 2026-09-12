import type {
  Article,
  BreadcrumbList,
  CollectionPage,
  DefinedTerm,
  DefinedTermSet,
  FAQPage,
  Graph,
  PersonLeaf,
  ProfilePage,
  Service,
  WebSiteLeaf,
} from "schema-dts";
import { education, services, site } from "@/content/site";

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function buildPerson(imageUrl: string): PersonLeaf {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    alternateName: site.legalName,
    url: `${site.url}/`,
    image: { "@type": "ImageObject", url: imageUrl, width: "1600", height: "2000" },
    jobTitle: site.jobTitle,
    worksFor: { "@type": "GovernmentOrganization", name: site.employer.name, url: site.employer.url },
    hasOccupation: { "@type": "Occupation", name: "Estratega de comunicación política e institucional" },
    alumniOf: [...new Map(education.map((e) => [e.school, e])).values()].map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
      sameAs: e.schoolUrl,
    })),
    knowsAbout: [
      "Comunicación política",
      "Jefatura de prensa",
      "Relaciones públicas",
      "Gestión de crisis",
      "Marketing digital",
      "Inteligencia artificial aplicada a comunicación",
    ],
    knowsLanguage: "es",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    email: `mailto:${site.email}`,
    ...(site.sameAs.length ? { sameAs: [...site.sameAs] } : {}),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.summary, url: `${site.url}/servicios/${s.id}` },
    })),
  };
}

export function buildWebSite(): WebSiteLeaf {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: site.locale,
    publisher: { "@id": PERSON_ID },
  };
}

export function buildHomeGraph(imageUrl: string): Graph {
  return { "@context": "https://schema.org", "@graph": [buildWebSite(), buildPerson(imageUrl)] };
}

export type Crumb = { name: string; path: string };

export function buildBreadcrumbs(crumbs: Crumb[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function buildFaq(faq: { q: string; a: string }[]): FAQPage | null {
  if (!faq.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function buildService(s: { slug: string; title: string; description: string }): Service {
  return {
    "@type": "Service",
    "@id": `${site.url}/servicios/${s.slug}#service`,
    name: s.title,
    description: s.description,
    url: `${site.url}/servicios/${s.slug}`,
    serviceType: s.title,
    provider: { "@id": PERSON_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Valle del Cauca" },
      { "@type": "Country", name: "Colombia" },
    ],
  };
}

export function buildArticle(p: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  tema: string;
}): Article {
  const url = `${site.url}/blog/${p.slug}`;
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    inLanguage: site.locale,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    keywords: p.tags.join(", "),
    articleSection: p.tema,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function buildDefinedTerm(t: { slug: string; term: string; short: string }): DefinedTerm {
  return {
    "@type": "DefinedTerm",
    "@id": `${site.url}/glosario/${t.slug}#term`,
    name: t.term,
    description: t.short,
    url: `${site.url}/glosario/${t.slug}`,
    inDefinedTermSet: `${site.url}/glosario#set`,
  };
}

export function buildDefinedTermSet(terms: { slug: string; term: string }[]): DefinedTermSet {
  return {
    "@type": "DefinedTermSet",
    "@id": `${site.url}/glosario#set`,
    name: "Glosario de comunicación política y prensa",
    url: `${site.url}/glosario`,
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, url: `${site.url}/glosario/${t.slug}` })),
  };
}

export function buildProfilePage(imageUrl: string): ProfilePage {
  return {
    "@type": "ProfilePage",
    "@id": `${site.url}/sobre-mi#profile`,
    url: `${site.url}/sobre-mi`,
    dateModified: "2026-09-12",
    mainEntity: buildPerson(imageUrl),
  };
}

export function buildCollection(c: { path: string; name: string; description: string }): CollectionPage {
  return {
    "@type": "CollectionPage",
    "@id": `${site.url}${c.path}#collection`,
    url: `${site.url}${c.path}`,
    name: c.name,
    description: c.description,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

type Node = Graph["@graph"][number];
export function graph(...nodes: Array<Node | null>): Graph {
  return { "@context": "https://schema.org", "@graph": nodes.filter((n): n is Node => n !== null) };
}

/** Serializa JSON-LD escapando "<" para evitar cierre prematuro del script. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
