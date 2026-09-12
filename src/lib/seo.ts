import type { Graph, PersonLeaf, WebSiteLeaf } from "schema-dts";
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
      itemOffered: { "@type": "Service", name: s.title, description: s.summary, url: `${site.url}/#servicios` },
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
  return {
    "@context": "https://schema.org",
    "@graph": [buildWebSite(), buildPerson(imageUrl)],
  };
}

/** Serializa JSON-LD escapando "<" para evitar cierre prematuro del script. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
