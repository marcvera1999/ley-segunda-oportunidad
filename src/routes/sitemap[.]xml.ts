import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absUrl } from "@/lib/seo";

// Solo páginas indexables (las legales llevan noindex y se omiten aquí).
const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/ley-segunda-oportunidad-barcelona", priority: "0.9", changefreq: "monthly" },
  { path: "/autonomos-ley-segunda-oportunidad-barcelona", priority: "0.8", changefreq: "monthly" },
  { path: "/cancelar-deudas-hacienda-barcelona", priority: "0.8", changefreq: "monthly" },
  { path: "/preguntas-frecuentes", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.6", changefreq: "weekly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls = routes.map(
          (r) =>
            `  <url><loc>${absUrl(r.path)}</loc><lastmod>${lastmod}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
