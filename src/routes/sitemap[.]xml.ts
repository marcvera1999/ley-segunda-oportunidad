import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/ley-segunda-oportunidad-barcelona", priority: "0.9", changefreq: "monthly" },
  { path: "/autonomos-ley-segunda-oportunidad-barcelona", priority: "0.8", changefreq: "monthly" },
  { path: "/cancelar-deudas-hacienda-barcelona", priority: "0.8", changefreq: "monthly" },
  { path: "/preguntas-frecuentes", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.6", changefreq: "weekly" },
  { path: "/aviso-legal", priority: "0.3", changefreq: "yearly" },
  { path: "/politica-privacidad", priority: "0.3", changefreq: "yearly" },
  { path: "/politica-cookies", priority: "0.3", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = routes.map(
          (r) =>
            `  <url><loc>${BASE_URL}${r.path}</loc><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
