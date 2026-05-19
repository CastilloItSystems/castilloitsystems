/**
 * Builders puros para schema.org JSON-LD.
 * Usados desde frontmatter de .astro y pasados al Layout via prop `schema`.
 */
import { SITE } from "./seo";

export const breadcrumb = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: b.name,
    item: `${SITE.url}${b.url}`,
  })),
});

export const softwareApplication = (opts: {
  name: string;
  description: string;
  category?: string;
  os?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: opts.name,
  description: opts.description,
  applicationCategory: opts.category || "BusinessApplication",
  operatingSystem: opts.os || "Web, Linux, Docker",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "0",
    availability: "https://schema.org/InStock",
    description: "Demo gratuita · presupuesto cerrado a medida",
  },
  publisher: { "@type": "Organization", name: SITE.name },
});

export const service = (opts: {
  name: string;
  description: string;
  areaServed?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: opts.areaServed || "Anzoátegui, Venezuela",
});

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const article = (opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: opts.title,
  description: opts.description,
  datePublished: opts.publishedAt,
  dateModified: opts.updatedAt,
  author: { "@type": "Organization", name: SITE.name },
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    logo: { "@type": "ImageObject", url: `${SITE.url}/img/logo.svg` },
  },
  mainEntityOfPage: `${SITE.url}/recursos/${opts.slug}`,
  keywords: opts.keywords.join(", "),
  articleSection: opts.category,
});

export const blog = (
  posts: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    updatedAt: string;
  }[],
) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `Recursos · ${SITE.name}`,
  description:
    "Guías técnicas sobre nómina petrolera CCP, software empresarial e infraestructura IT en Venezuela.",
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    url: `${SITE.url}/recursos/${p.slug}`,
  })),
});

export const aboutPage = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `Sobre nosotros · ${SITE.name}`,
  description:
    "Equipo de ingenieros venezolanos especializados en software a medida, infraestructura crítica y ciberseguridad. Casa matriz en Barcelona, Anzoátegui.",
  url: `${SITE.url}/sobre-nosotros`,
  publisher: { "@id": `${SITE.url}/#organization` },
});

export const founder = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alfredo Castillo",
  jobTitle: "Fundador & Director de Ingeniería",
  worksFor: { "@id": `${SITE.url}/#organization` },
  url: `${SITE.url}/sobre-nosotros`,
  sameAs: [SITE.social.linkedin],
});

export const contactPage = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contacto · ${SITE.name}`,
  description:
    "Hable directo con ingenieros de Castillo IT en Barcelona, Anzoátegui. WhatsApp +58 412-770-5451 · auditoría técnica gratuita.",
  url: `${SITE.url}/contacto`,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    telephone: SITE.phone,
    email: SITE.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer support",
      availableLanguage: "Spanish",
      hoursAvailable: SITE.hours,
    },
  },
});

export const NOMISYS_FAQ: { q: string; a: string }[] = [
  {
    q: "¿NomiSys cubre todos los sistemas de trabajo del CCP PDVSA?",
    a: "Sí. Cubre 5×2, 7×7, 4×4, 5-5-5-6, 21×7, STOB, 2×4, 3×6 y 5×10, tanto para Nómina Diaria como Mensual, incluyendo régimen de contratistas FUTPV.",
  },
  {
    q: "¿Maneja multi-empresa?",
    a: "Sí. Puede operar múltiples empresas desde una sola instalación, con RBAC granular para aislar roles y permisos por empresa.",
  },
  {
    q: "¿Qué pasa si cambia el CCP o hay aumentos presidenciales?",
    a: "Liberamos actualizaciones de tabulador en menos de 48 horas después de publicada la tabla oficial. La actualización es sin costo adicional.",
  },
  {
    q: "¿NomiSys genera los archivos para el IVSS y FAOV?",
    a: "Sí. Exporta los archivos de aportes para IVSS, FAOV y LPH en los formatos requeridos por cada ente, listos para carga directa.",
  },
  {
    q: "¿Cuánto tiempo toma la implementación?",
    a: "Entre 2 y 4 semanas según volumen de trabajadores y sistemas de trabajo. Incluye migración de data histórica y capacitación en sitio.",
  },
  {
    q: "¿El sistema opera sin internet?",
    a: "Sí. NomiSys es on-premise; funciona en tu red local sin depender de conexión a internet para la operación diaria.",
  },
];

export const AUTOSYS_FAQ: { q: string; a: string }[] = [
  {
    q: "¿Autosys genera facturas fiscales válidas ante el SENIAT?",
    a: "Sí. Emite facturas con número de control correlativo, datos del contribuyente y cálculo de IVA conforme a los requerimientos del SENIAT.",
  },
  {
    q: "¿Puedo ver en tiempo real qué está haciendo cada mecánico?",
    a: "Sí. El módulo de productividad registra apertura, avance y cierre de cada orden de trabajo con marca de tiempo, asignado al técnico responsable.",
  },
  {
    q: "¿Maneja inventario de repuestos y alerta stock mínimo?",
    a: "Sí. Define stock mínimo por ítem; el sistema alerta cuando el inventario cae por debajo del umbral configurado.",
  },
  {
    q: "¿Cuánto tiempo tarda la implementación?",
    a: "Normalmente 6 semanas: levantamiento, configuración, carga de catálogos, capacitación y acompañamiento en arranque en vivo.",
  },
  {
    q: "¿El sistema funciona sin internet?",
    a: "Sí. Es on-premise; opera en tu red local sin depender de conexión a internet para el flujo diario de trabajo.",
  },
  {
    q: "¿Tiene app móvil para los mecánicos?",
    a: "Actualmente el módulo de técnicos opera desde navegador (responsive) en tablet o celular. App nativa está en hoja de ruta para el próximo ciclo.",
  },
];
