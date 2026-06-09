import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

const TITLE = "Ley de la Segunda Oportunidad en Barcelona | Vida Sin Deudas";
const DESC = "Guía completa de la Ley de la Segunda Oportunidad en Barcelona. Cancela tus deudas legalmente con abogados especialistas. Consulta gratuita.";

export const Route = createFileRoute("/ley-segunda-oportunidad-barcelona")({
  head: () => seo({ title: TITLE, description: DESC, path: "/ley-segunda-oportunidad-barcelona" }),
  component: Page,
});

function Page() {
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <p className="text-sm uppercase tracking-widest text-gold mb-3">Guía completa</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
        Abogados especialistas en Ley de la Segunda Oportunidad en Barcelona
      </h1>
      <div className="mt-8 space-y-5 text-[17px] text-primary/85 leading-relaxed text-justify hyphens-auto">
        <p>La Ley de la Segunda Oportunidad (Ley 25/2015, reformada en 2022) es la herramienta legal que permite a personas físicas y autónomos en Barcelona cancelar sus deudas y empezar de nuevo.</p>
        <p>En Vida Sin Deudas acompañamos a particulares y autónomos en todo el procedimiento ante los Juzgados Mercantiles de Barcelona, desde el análisis inicial de viabilidad hasta la resolución firme de cancelación de deudas (EPI).</p>
        <p>Cancelar deudas en Barcelona es posible: préstamos personales, tarjetas, microcréditos, deudas de la actividad empresarial y, dentro de los límites legales, también deudas con Hacienda y la Seguridad Social.</p>
      </div>
      <div className="mt-10">
        <Link to="/" hash="contacto" className="inline-flex rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium">
          Solicitar consulta gratuita →
        </Link>
      </div>
    </main>
  );
}
