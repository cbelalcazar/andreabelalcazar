/**
 * Única fuente de verdad del contenido del sitio.
 * Regla: solo datos verificados (hoja de vida oficial). Nada inventado.
 * Los huecos se marcan con TODO(andrea) y se listan en AUDITORIA-2026-09.md §17.5.
 */

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
  tagline: "Estrategia de prensa y comunicación política",
  title: "Andrea Belalcázar · Estrategia de prensa y comunicación política",
  description:
    "Jefe de prensa y estratega de comunicación con experiencia en gobierno, campañas electorales y empresa en el Valle del Cauca. Relación con medios, narrativa institucional y gestión de crisis.",
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
  nav: [
    { href: "/servicios", label: "Servicios" },
    { href: "/casos", label: "Casos" },
    { href: "/blog", label: "Blog" },
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/contacto", label: "Contacto" },
  ],
} as const;

export const hero = {
  badge: "Comunicación política e institucional · Cali, Colombia",
  h1: "Estrategia de prensa y narrativa para gobiernos, campañas y marcas del suroccidente colombiano.",
  lead: "Soy Andrea Belalcázar. He liderado la comunicación de una secretaría departamental, un concejo municipal, una campaña presidencial en el Valle y una campaña a la Alcaldía de Cali. Ayudo a instituciones y líderes a decir lo correcto, a tiempo y en el medio correcto.",
  ctaPrimary: "Hablemos por WhatsApp",
  ctaSecondary: "Ver casos",
  proof: [
    "Secretaría de Turismo del Valle del Cauca",
    "Concejo de Cali",
    "Secretaría de Salud Pública",
    "Campaña presidencial 2022 · Valle del Cauca",
  ],
} as const;

export const philosophy = {
  eyebrow: "Enfoque",
  title: "Claridad antes que ruido.",
  quote:
    "La comunicación política moderna no acepta errores. O construyes tu narrativa, o dejas que otros la definan por ti.",
  paragraphs: [
    "Soy profesional en Mercadeo con especialización en Gerencia de Marketing Estratégico. Trabajo en prensa, relaciones públicas, comunicación institucional, marketing político, narrativa pública, medios y estrategia digital.",
    "Integro visión estratégica, capacidad operativa e inteligencia artificial aplicada para potenciar posicionamiento, reputación y resultados. Hoy lidero la estrategia de prensa y el relacionamiento con medios de la Secretaría de Turismo del Valle del Cauca.",
  ],
} as const;

export type Service = {
  id: string;
  icon: "mic" | "shield" | "target" | "briefcase";
  title: string;
  summary: string;
  bullets: readonly string[];
};

export const services: readonly Service[] = [
  {
    id: "jefatura-de-prensa",
    icon: "mic",
    title: "Jefatura de prensa y relación con medios",
    summary:
      "Estrategia de prensa, mensajes clave, comunicados, agendas mediáticas y cubrimientos para fortalecer el posicionamiento institucional.",
    bullets: [
      "Comunicados y ruedas de prensa",
      "Agenda mediática y vocería",
      "Relacionamiento con medios nacionales y locales",
    ],
  },
  {
    id: "gestion-de-crisis",
    icon: "shield",
    title: "Gestión de crisis y reputación",
    summary:
      "Lectura de coyuntura, manejo de coyunturas comunicacionales y protección de la reputación institucional bajo presión.",
    bullets: ["Protocolos de respuesta", "Vocería en escenarios de alta exposición", "Monitoreo digital y de medios"],
  },
  {
    id: "marketing-politico-digital",
    icon: "target",
    title: "Marketing político y estrategia digital",
    summary:
      "Diseño y ejecución de estrategias integrales de comunicación y marketing político: discurso, mensajes clave, pauta y contenidos.",
    bullets: ["Meta Ads y Google Ads", "Email marketing y automatización", "IA aplicada a comunicación"],
  },
  {
    id: "comunicacion-institucional",
    icon: "briefcase",
    title: "Comunicación institucional y asuntos públicos",
    summary:
      "Traducción de objetivos institucionales en mensajes claros, visibles y estratégicos para ciudadanía, gremios y aliados.",
    bullets: ["Narrativa institucional", "Campañas ciudadanas", "Redacción estratégica"],
  },
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

export const contact = {
  title: "¿Necesitas a alguien que hable con los medios por ti?",
  lead: "Cuéntame tu situación en un mensaje. Respondo personalmente.",
  cta: "Hablemos por WhatsApp",
} as const;

/** Periodos con TODO no se muestran en la UI; sirven de recordatorio. */
export const showPeriod = (period: string) => !period.startsWith("TODO");
