import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

const TITLE = "Cancelar deudas con Hacienda en Barcelona | Vida Sin Deudas";
const DESC = "Cancela hasta 10.000€ de deuda con Hacienda y otros 10.000€ con la Seguridad Social mediante la Ley de la Segunda Oportunidad en Barcelona.";

export const Route = createFileRoute("/cancelar-deudas-hacienda-barcelona")({
  head: () => seo({ title: TITLE, description: DESC, path: "/cancelar-deudas-hacienda-barcelona" }),
  component: Page,
});

function Page() {
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <p className="text-sm uppercase tracking-widest text-gold mb-3">Hacienda y SS</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
        Cancelar deudas con Hacienda en Barcelona
      </h1>
      <div className="mt-8 space-y-5 text-[17px] text-primary/85 leading-relaxed">
        <p>Desde la reforma de 2022, la Ley de la Segunda Oportunidad permite cancelar hasta 10.000€ de deuda con Hacienda y otros 10.000€ con la Seguridad Social por deudor.</p>
        <p>En Vida Sin Deudas te ayudamos a planificar la estrategia que mejor encaja con tu situación fiscal en Barcelona.</p>
      </div>
      <div className="mt-10">
        <Link to="/" hash="contacto" className="inline-flex rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium">
          Solicitar consulta gratuita →
        </Link>
      </div>
    </main>
  );
}
