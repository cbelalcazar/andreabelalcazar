/**
 * Única fuente de verdad del contenido del sitio.
 * Regla: solo datos verificados (hoja de vida oficial). Nada inventado.
 * Los huecos se marcan con TODO(andrea) y se listan en AUDITORIA-2026-09.md §17.5.
 */

/**
 * Posicionamiento comercial (PLAN-CONSULTORIA-2026-11 §3, tarea C-10).
 * - "institucional": comunicación estratégica y medios primero; sin oferta electoral.
 *   Es la variante segura mientras Andrea sea funcionaria pública.
 * - "completo": marketing político primero, como pide su brief del 2026-10-26.
 * Cambiar a "completo" solo con la decisión A-8 resuelta (concepto legal o salida del cargo).
 */
export type Positioning = "institucional" | "completo";
export const positioning: Positioning = "institucional";

type ServiceSlug =
  "posicionamiento-en-medios" | "gestion-de-crisis" | "comunicacion-institucional" | "marketing-politico-digital";

type Variant = {
  title: string;
  description: string;
  tagline: string;
  hero: { badge: string; lead: string };
  /** Orden de las soluciones en portada, /servicios y footer (jerarquía del brief). */
  order: readonly ServiceSlug[];
  /** Solo la solución política cambia de nombre entre variantes. */
  political: { title: string; summary: string; bullets: readonly string[]; cta: { title: string; text: string } };
  closingLead: string;
  knowsAbout: readonly string[];
};

const variants: Record<Positioning, Variant> = {
  institucional: {
    title: "Andrea Belalcázar · Comunicación estratégica y prensa · Cali",
    description:
      "Comunicación estratégica, posicionamiento en medios, reputación y jefatura de prensa para líderes, instituciones y marcas en Cali y el Valle del Cauca.",
    tagline: "Comunicación estratégica y relaciones públicas",
    hero: {
      badge: "Comunicación estratégica · Relaciones públicas · Cali, Colombia",
      lead: "Diseño estrategias de comunicación que fortalecen la imagen pública, posicionan a líderes e instituciones y generan presencia en los medios. Integro relaciones públicas, gestión de prensa y estrategia digital para que cada mensaje llegue a la audiencia correcta y construya credibilidad.",
    },
    order: ["posicionamiento-en-medios", "gestion-de-crisis", "comunicacion-institucional", "marketing-politico-digital"],
    political: {
      title: "Comunicación política y estrategia digital",
      summary:
        "Narrativa, mensajes y estrategia digital para líderes y organizaciones con agenda pública: discurso, contenidos, pauta y medición con una sola estrategia.",
      bullets: [
        "Diagnóstico de comunicación y narrativa",
        "Contenidos y pauta en Meta y Google",
        "IA aplicada a comunicación",
      ],
      cta: {
        title: "¿Lideras una agenda pública?",
        text: "Narrativa, mensajes clave, contenidos y pauta digital con una sola estrategia.",
      },
    },
    closingLead:
      "Ya sea que estés construyendo una marca personal, liderando una organización o buscando más reconocimiento en los medios, una comunicación estratégica marca la diferencia.",
    knowsAbout: [
      "Comunicación estratégica",
      "Posicionamiento en medios",
      "Relaciones públicas",
      "Jefatura de prensa",
      "Reputación pública",
      "Gestión de crisis",
      "Comunicación política",
      "Marketing digital",
      "Inteligencia artificial aplicada a comunicación",
    ],
  },
  completo: {
    title: "Andrea Belalcázar · Marketing político y comunicación estratégica",
    description:
      "Consultoría en marketing político, comunicación estratégica, posicionamiento en medios, reputación pública y jefatura de prensa en Cali y el Valle del Cauca.",
    tagline: "Marketing político y comunicación estratégica",
    hero: {
      badge: "Marketing político · Comunicación estratégica · Relaciones públicas",
      lead: "Diseño estrategias de comunicación que fortalecen la imagen pública, posicionan a líderes y marcas y generan presencia en los medios. Integro marketing político, relaciones públicas, gestión de prensa y estrategia digital para que cada mensaje llegue a la audiencia correcta y construya credibilidad.",
    },
    order: ["marketing-politico-digital", "posicionamiento-en-medios", "gestion-de-crisis", "comunicacion-institucional"],
    political: {
      title: "Marketing político y comunicación electoral",
      summary:
        "Estrategias integrales para campañas y proyectos políticos: diagnóstico, narrativa, mensajes, estrategia digital, posicionamiento de candidatos y comunicación territorial.",
      bullets: ["Diagnóstico y narrativa de campaña", "Estrategia digital y pauta", "Comunicación territorial"],
      cta: {
        title: "¿Preparas una campaña?",
        text: "Diagnóstico, narrativa, mensajes y estrategia digital coherentes en cada etapa de la campaña.",
      },
    },
    closingLead:
      "Ya sea que estés construyendo una marca personal, liderando una organización, preparando una campaña electoral o buscando más reconocimiento en los medios, una comunicación estratégica marca la diferencia.",
    knowsAbout: [
      "Marketing político",
      "Comunicación electoral",
      "Comunicación estratégica",
      "Posicionamiento en medios",
      "Relaciones públicas",
      "Jefatura de prensa",
      "Reputación pública",
      "Gestión de crisis",
      "Inteligencia artificial aplicada a comunicación",
    ],
  },
};

const variant = variants[positioning];

/** Para tests: las dos variantes deben cumplir las reglas de redacción (C-17). */
export const allVariants = variants;

/** Nombres de sección del brief. Las URL no cambian (plan §2: etiquetas sí, URL no). */
export const labels = {
  services: "Soluciones",
  cases: "Proyectos",
  blog: "Perspectivas",
  glossary: "Glosario",
} as const;

export const site = {
  name: "Andrea Belalcázar",
  legalName: "Yuly Andrea Belalcázar",
  url: "https://www.andreabelalcazar.com",
  locale: "es-CO",
  ogLocale: "es_CO",
  city: "Cali",
  region: "Valle del Cauca",
  country: "CO",
  /** Título oficial exacto según hoja de vida (no "Directora"). */
  jobTitle: "Jefe de Prensa y Relaciones Públicas",
  employer: {
    name: "Secretaría de Turismo del Valle del Cauca",
    url: "https://www.valledelcauca.gov.co/turismo",
  },
  tagline: variant.tagline,
  title: variant.title,
  description: variant.description,
  knowsAbout: variant.knowsAbout,
  whatsapp: {
    /** Número en formato internacional sin "+". No cambiar sin confirmación. */
    phone: "573105354473",
    display: "+57 310 535 4473",
  },
  email: "belalcazarmarketingdigital@gmail.com",
  /** ID de medición GA4 (público por diseño). NEXT_PUBLIC_GA_ID lo sobreescribe. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-5S474KXVJ8",
  /**
   * TODO(andrea): añadir solo perfiles verificados. El perfil de X/Twitter
   * "andreabelalcazar" no existe (404) y el de LinkedIn no pudo verificarse,
   * por eso este arreglo está vacío hasta confirmar las URLs reales.
   */
  sameAs: [] as string[],
  /** Menú del brief (Inicio · Soluciones · Proyectos · Perspectivas · Contacto) + Glosario, que trae el tráfico. */
  nav: [
    { href: "/servicios", label: labels.services },
    { href: "/casos", label: labels.cases },
    { href: "/glosario", label: labels.glossary },
    { href: "/blog", label: labels.blog },
    { href: "/contacto", label: "Contacto" },
  ],
} as const;

/**
 * Voz en primera persona del singular: el brief pide «diseñamos» solo si hay
 * equipo detrás. TODO(andrea): decisión A-9 (¿equipo o red colaboradora?).
 * Titular T1 del brief. TODO(andrea): decisión A-10 (T1, T2 o T3, plan §4.1).
 */
export const hero = {
  badge: variant.hero.badge,
  h1: "La reputación se construye. El posicionamiento se planifica.",
  lead: variant.hero.lead,
  ctaPrimary: "Hablemos de tu estrategia",
  ctaSecondary: "Ver proyectos",
  /** Pie del retrato: oficio, no cargo (el cargo está en /sobre-mi). */
  role: "Estratega de comunicación y relaciones públicas",
  proof: [
    "Secretaría de Turismo del Valle del Cauca",
    "Concejo de Cali",
    "Secretaría de Salud Pública",
    "Campaña presidencial 2022 · Valle del Cauca",
  ],
} as const;

/** Propuesta de valor del brief (sección 2), adaptada a primera persona. */
export const valueProp = {
  eyebrow: "Propuesta de valor",
  title: "Que tu historia tenga relevancia pública.",
  quote: "No se trata solo de aparecer en los medios. Se trata de construir una reputación que abra oportunidades.",
  paragraphs: [
    "Estar en los medios no es simplemente aparecer en televisión, radio o prensa. Es saber qué comunicar, cuándo hacerlo, dónde tener presencia y cómo convertir esa visibilidad en reconocimiento y reputación.",
    "Con una estrategia de relaciones públicas y posicionamiento en medios identifico oportunidades para proyectar tu experiencia, fortalecer tu liderazgo y construir una imagen pública sólida. Porque no basta con que te vean: importa cómo te perciben y por qué te recuerdan.",
  ],
} as const;

export type Service = {
  id: ServiceSlug;
  icon: "mic" | "shield" | "target" | "briefcase";
  title: string;
  summary: string;
  bullets: readonly string[];
};

const serviceById: Record<ServiceSlug, Service> = {
  "posicionamiento-en-medios": {
    id: "posicionamiento-en-medios",
    icon: "mic",
    title: "Posicionamiento en medios y jefatura de prensa",
    summary:
      "Convierto tu conocimiento, trayectoria y propuestas en oportunidades de visibilidad: estrategia de prensa, relación con periodistas, entrevistas y agenda mediática.",
    bullets: [
      "Estrategia de prensa y agenda mediática",
      "Relación con periodistas y gestión de entrevistas",
      "Comunicados, contenidos noticiosos y ruedas de prensa",
    ],
  },
  "gestion-de-crisis": {
    id: "gestion-de-crisis",
    icon: "shield",
    title: "Reputación y gestión de crisis",
    summary:
      "Marca personal y reputación pública para líderes, directivos e instituciones, y una respuesta ordenada cuando la reputación está en juego.",
    bullets: [
      "Mensajes y atributos de posicionamiento",
      "Protocolos de crisis y vocería bajo presión",
      "Monitoreo de medios y redes",
    ],
  },
  "comunicacion-institucional": {
    id: "comunicacion-institucional",
    icon: "briefcase",
    title: "Comunicación institucional y asuntos públicos",
    summary:
      "Planes de prensa, posicionamiento de voceros, comunicación de gestión y manejo de coyunturas para entidades, gremios y organizaciones.",
    bullets: ["Narrativa institucional y comunicación de gestión", "Posicionamiento de voceros", "Campañas ciudadanas"],
  },
  "marketing-politico-digital": {
    id: "marketing-politico-digital",
    icon: "target",
    title: variant.political.title,
    summary: variant.political.summary,
    bullets: variant.political.bullets,
  },
};

/** Soluciones en el orden de la variante activa. */
export const services: readonly Service[] = variant.order.map((id) => serviceById[id]);

/** Posición y nombre de cada solución; `getServices()` los aplica sobre el MDX. */
export function solutionFor(slug: string): { title: string; order: number } | undefined {
  const i = variant.order.indexOf(slug as ServiceSlug);
  return i === -1 ? undefined : { title: serviceById[slug as ServiceSlug].title, order: i + 1 };
}

/**
 * CTA contextual de las fichas del glosario según el servicio relacionado
 * (plan G-12). Solo describe servicios ya publicados en /servicios.
 */
export const serviceCta: Record<string, { title: string; text: string }> = {
  "posicionamiento-en-medios": {
    title: "¿Necesitas presencia en los medios?",
    text: "Estrategia de prensa, relación con periodistas y preparación de voceros para líderes y organizaciones.",
  },
  "gestion-de-crisis": {
    title: "¿Estás frente a una crisis?",
    text: "Protocolos de respuesta, vocería bajo presión y monitoreo de medios y redes.",
  },
  "marketing-politico-digital": variant.political.cta,
  "comunicacion-institucional": {
    title: "¿Tu institución necesita una narrativa clara?",
    text: "Objetivos institucionales convertidos en mensajes claros para ciudadanía, gremios y aliados.",
  },
};

/** Metodología del brief (sección 4): lo que se entrega y se mide en cada paso. */
export const methodology = {
  eyebrow: "Metodología",
  title: "Diagnosticar. Diseñar. Posicionar. Medir.",
  lead: "Analizo el contexto, identifico los objetivos y desarrollo estrategias que integran medios tradicionales, plataformas digitales y comunicación directa.",
  steps: [
    {
      name: "Diagnosticar",
      text: "Contexto, percepción actual y presencia en medios y redes. Objetivos y audiencias definidos por escrito.",
    },
    {
      name: "Diseñar",
      text: "Narrativa, mensajes clave, vocería, canales y calendario: una estrategia que todo el equipo puede seguir.",
    },
    {
      name: "Posicionar",
      text: "Ejecución en medios, plataformas digitales y comunicación directa, con relación permanente con periodistas.",
    },
    {
      name: "Medir",
      text: "Alcance, presencia en medios, consistencia del mensaje y percepción pública para ajustar cada acción.",
    },
  ],
} as const;

/**
 * Fichas del glosario ordenadas por impresiones en Search Console
 * (2026-09-09 → 2026-10-06). Ordena "Los más consultados" en /glosario
 * y los conceptos clave de cada servicio. Revisar cada mes (plan §8).
 */
export const glossaryByDemand = [
  "vocero",
  "agenda-setting",
  "off-the-record",
  "rueda-de-prensa",
  "media-training",
  "mensaje-clave",
  "framing",
  "boletin-de-prensa",
  "jefe-de-prensa",
  "fact-checking",
  "comunicado-de-prensa",
  "kpi-de-comunicacion",
  "storytelling-politico",
  "reputacion-institucional",
  "monitoreo-de-medios",
] as const;

export type Role = {
  org: string;
  title: string;
  /** Periodo textual según hoja de vida. TODO(andrea): fechas exactas. */
  period: string;
  current?: boolean;
  type: "gobierno" | "campaña" | "empresa";
  bullets: readonly string[];
};

/** Orden: actual primero. Títulos exactos de la hoja de vida. */
export const roles: readonly Role[] = [
  {
    org: "Secretaría de Turismo del Valle del Cauca",
    title: "Jefe de Prensa y Relaciones Públicas",
    period: "Actualidad",
    current: true,
    type: "gobierno",
    bullets: [
      "Lidera la estrategia de prensa y el relacionamiento con medios para fortalecer el posicionamiento institucional del sector turismo.",
      "Coordina mensajes clave, comunicados, agendas mediáticas, cubrimientos y oportunidades de visibilidad pública.",
    ],
  },
  {
    org: "Campaña presidencial de María Fernanda Cabal",
    title: "Jefe de Prensa Valle del Cauca",
    period: "Campaña presidencial 2022",
    type: "campaña",
    bullets: [
      "Comunicación política y posicionamiento en un entorno electoral de alta exposición pública.",
      "Construcción de narrativa, mensajes estratégicos y visibilidad mediática de la candidata en la región.",
    ],
  },
  {
    org: "Concejo de Cali",
    title: "Jefe de Prensa",
    period: "TODO(andrea): periodo",
    type: "gobierno",
    bullets: [
      "Coordinación de la estrategia de comunicación institucional, relacionamiento con medios y difusión de agenda pública.",
      "Redacción y distribución de comunicados, organización de ruedas de prensa y manejo de coyunturas.",
    ],
  },
  {
    org: "Campaña a la Alcaldía de Cali · Miyerlandi Torres",
    title: "Líder de Comunicaciones y Marketing Digital",
    period: "TODO(andrea): periodo",
    type: "campaña",
    bullets: [
      "Diseño y ejecución de la estrategia integral de comunicación y marketing político de campaña.",
      "Coordinación de medios, discurso, mensajes clave, agenda pública y contenidos digitales.",
    ],
  },
  {
    org: "Secretaría de Salud Pública",
    title: "Estratega líder de equipo digital",
    period: "TODO(andrea): periodo",
    type: "gobierno",
    bullets: [
      "Estrategias de comunicación para campañas de salud pública con enfoque ciudadano.",
      "Liderazgo de campañas de prevención, medios y coordinación del equipo de comunicaciones.",
    ],
  },
  {
    org: "La Occidental Ltda.",
    title: "Directora de Servicio al Cliente y Mercadeo",
    period: "TODO(andrea): periodo",
    type: "empresa",
    bullets: [
      "Plan estratégico digital, campañas de fidelización, automatización y seguimiento comercial.",
      "Coordinación interáreas para impulsar metas de negocio y experiencia del cliente.",
    ],
  },
] as const;

export const education = [
  {
    degree: "Especialización en Gerencia de Marketing Estratégico",
    school: "Universidad del Valle",
    schoolUrl: "https://www.univalle.edu.co/",
    level: "Especialización",
  },
  {
    degree: "Diplomado en Marketing Estratégico de Servicios",
    school: "Universidad Santiago de Cali",
    schoolUrl: "https://www.usc.edu.co/",
    level: "Diplomado",
  },
  {
    degree: "Profesional en Mercadeo",
    school: "Universidad Santiago de Cali",
    schoolUrl: "https://www.usc.edu.co/",
    level: "Pregrado",
  },
] as const;

export const tools = [
  "Meta Ads",
  "Google Ads",
  "Canva",
  "ChatGPT y flujos de IA",
  "Email marketing y automatización",
  "Monitoreo digital y contenidos",
] as const;

/** Cierre comercial del brief (sección 5). */
export const contact = {
  title: "Tu imagen pública también necesita una estrategia.",
  lead: variant.closingLead,
  cta: "Solicita una consultoría estratégica",
} as const;

/** Periodos con TODO no se muestran en la UI; sirven de recordatorio. */
export const showPeriod = (period: string) => !period.startsWith("TODO");
