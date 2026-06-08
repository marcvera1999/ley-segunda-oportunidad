import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/politica-cookies")({
  head: () => seo({ title: "Política de Cookies | Vida Sin Deudas", description: "Política de cookies de Vida Sin Deudas.", path: "/politica-cookies", noindex: true }),
  component: () => (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <h1 className="font-display text-4xl text-primary">Política de Cookies</h1>
      <div className="mt-6 space-y-4 text-primary/80">
        <p>Este sitio web utiliza cookies técnicas necesarias para su funcionamiento. No usamos cookies de seguimiento publicitario sin tu consentimiento explícito.</p>
      </div>
    </main>
  ),
});
