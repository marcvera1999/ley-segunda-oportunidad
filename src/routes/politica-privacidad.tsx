import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/politica-privacidad")({
  head: () => seo({ title: "Política de Privacidad | Vida Sin Deudas", description: "Política de privacidad de Vida Sin Deudas.", path: "/politica-privacidad", noindex: true }),
  component: () => (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <h1 className="font-display text-4xl text-primary">Política de Privacidad</h1>
      <div className="mt-6 space-y-4 text-primary/80">
        <p>Tus datos se tratan de forma 100% confidencial y están protegidos por el secreto profesional del abogado.</p>
        <p>Responsable: Vida Sin Deudas. Finalidad: gestión de consultas legales. Base legal: consentimiento del interesado.</p>
        <p>Puedes ejercer tus derechos de acceso, rectificación, supresión y oposición en: vidasindeudas@vidasindeudas.es</p>
      </div>
    </main>
  ),
});
