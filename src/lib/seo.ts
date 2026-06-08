// ============================================================
// CONFIGURACIÓN SEO CENTRAL
// ------------------------------------------------------------
// Único punto de verdad para dominio, marca y datos de contacto.
// Cuando cambies de dominio o tengas los datos reales del despacho,
// edita SOLO este objeto y se propaga a toda la web (meta, canonical,
// Open Graph, sitemap, robots, datos estructurados).
// ============================================================

export const SITE = {
  /** Dominio sin barra final. CAMBIAR AQUÍ si cambia el dominio. */
  url: "https://vidasindeudas.es",

  /** Marca / nombre del negocio. */
  name: "Vida Sin Deudas",
  legalName: "Vida Sin Deudas Abogados",

  locale: "es_ES",
  lang: "es-ES",

  /** Imagen para compartir en redes (1200×630). Súbela a /public/og-cover.jpg */
  ogImage: "/og-cover.jpg",

  /** Datos de contacto / negocio (PLACEHOLDER — sustituir por los reales). */
  phone: "+34932426252",
  email: "vidasindeudas@vidasindeudas.es",
  address: {
    street: "Passeig de Gràcia 120, 2º Derecha",
    city: "Barcelona",
    region: "Barcelona",
    postalCode: "08008",
    country: "ES",
  },
  geo: { lat: 41.3974, lng: 2.1611 },

  /** Perfiles sociales (rellenar cuando existan). Se usan en sameAs. */
  social: [] as string[],

  defaultTitle: "Cancela tus deudas con la Ley de la Segunda Oportunidad | Vida Sin Deudas",
  defaultDescription:
    "Cancela tus deudas legalmente con la Ley de la Segunda Oportunidad. Abogados especialistas en Barcelona. Consulta gratuita y sin compromiso.",
} as const;

/** Convierte una ruta relativa en URL absoluta sobre el dominio. */
export function absUrl(path = "/"): string {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return SITE.url + (path.startsWith("/") ? path : `/${path}`);
}

type SeoArgs = {
  title: string;
  description?: string;
  /** Ruta relativa de la página, p.ej. "/blog". */
  path?: string;
  /** Imagen OG opcional (relativa o absoluta). */
  image?: string;
  /** Tipo Open Graph. */
  type?: "website" | "article";
  /** Marca la página como no indexable (páginas legales finas, etc.). */
  noindex?: boolean;
};

/**
 * Genera meta + links SEO consistentes (canonical + OG + Twitter + hreflang)
 * con URLs ABSOLUTAS. Úsalo en el `head()` de cada ruta.
 */
export function seo({
  title,
  description = SITE.defaultDescription,
  path = "/",
  image,
  type = "website",
  noindex = false,
}: SeoArgs) {
  const url = absUrl(path);
  const img = absUrl(image ?? SITE.ogImage);

  const meta = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1",
    },
    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:locale", content: SITE.locale },
    { property: "og:site_name", content: SITE.name },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];

  const links = [
    { rel: "canonical", href: url },
    { rel: "alternate", hrefLang: SITE.lang, href: url },
    { rel: "alternate", hrefLang: "x-default", href: url },
  ];

  return { meta, links };
}

/** Datos estructurados del negocio (LegalService + LocalBusiness). */
export function localBusinessJsonLd(extra?: Record<string, unknown>) {
  return {
    "@type": ["LegalService", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    image: absUrl(SITE.ogImage),
    description: SITE.defaultDescription,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "€€",
    areaServed: { "@type": "City", name: SITE.address.city },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    ...(SITE.social.length ? { sameAs: SITE.social } : {}),
    ...extra,
  };
}
