import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-privacidad")({
  head: () => ({
    meta: [{ title: "Política de Privacidad | Horizonte Legal" }, { name: "description", content: "Política de privacidad de Horizonte Legal." }],
    links: [{ rel: "canonical", href: "/politica-privacidad" }],
  }),
  component: () => (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <h1 className="font-display text-4xl text-primary">Política de Privacidad</h1>
      <div className="mt-6 space-y-4 text-primary/80">
        <p>Tus datos se tratan de forma 100% confidencial y están protegidos por el secreto profesional del abogado.</p>
        <p>Responsable: Horizonte Legal. Finalidad: gestión de consultas legales. Base legal: consentimiento del interesado.</p>
        <p>Puedes ejercer tus derechos de acceso, rectificación, supresión y oposición en: hola@horizontelegal.es</p>
      </div>
    </main>
  ),
});
