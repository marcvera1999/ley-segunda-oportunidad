import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Preguntas frecuentes Ley Segunda Oportunidad Barcelona | Horizonte Legal";
const DESC = "Resolvemos tus dudas sobre la Ley de la Segunda Oportunidad: costes, plazos, vivienda, Hacienda, autónomos y mucho más.";

export const Route = createFileRoute("/preguntas-frecuentes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:url", content: "/preguntas-frecuentes" },
    ],
    links: [{ rel: "canonical", href: "/preguntas-frecuentes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8 text-center">
      <h1 className="font-display text-4xl md:text-5xl text-primary">Preguntas frecuentes</h1>
      <p className="mt-5 text-muted-foreground">
        Encuentra todas las respuestas en nuestra sección FAQ de la página principal.
      </p>
      <Link to="/" hash="faq" className="mt-8 inline-flex rounded-full bg-primary text-primary-foreground px-6 py-3">
        Ir a las preguntas →
      </Link>
    </main>
  );
}
