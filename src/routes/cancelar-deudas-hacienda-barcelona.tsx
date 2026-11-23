import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

const TITLE = "Cancelar deudas con Hacienda en Barcelona | Deuda Eliminada";
const DESC = "¿Deudas con Hacienda o la Seguridad Social? Analizamos qué parte se puede exonerar con la Ley de la Segunda Oportunidad en Barcelona. Consulta gratuita.";

export const Route = createFileRoute("/cancelar-deudas-hacienda-barcelona")({
  head: () => seo({ title: TITLE, description: DESC, path: "/cancelar-deudas-hacienda-barcelona" }),
  component: Page,
});

function Page() {
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <p className="text-sm uppercase tracking-widest text-gold-ink mb-3">Hacienda y SS</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
        Cancelar deudas con Hacienda en Barcelona
      </h1>
      <div className="mt-8 space-y-5 text-[17px] text-primary/85 leading-relaxed text-justify hyphens-auto">
        <p>Desde la reforma de 2022, la Ley de la Segunda Oportunidad permite exonerar una parte de la deuda con Hacienda y con la Seguridad Social: la ley fija un límite de 10.000 € por organismo, con los primeros 5.000 € exonerados íntegramente y el 50 % del importe entre 5.000 € y 10.000 €.</p>
        <p>Los tribunales están interpretando estos límites, por eso analizamos qué parte de tu deuda pública se puede exonerar según tu caso. La parte que no se exonere puede aplazarse o fraccionarse.</p>
        <p>En Deuda Eliminada te ayudamos a planificar la estrategia que mejor encaja con tu situación fiscal en Barcelona.</p>
      </div>
      <div className="mt-10">
        <Link to="/" hash="contacto" className="inline-flex rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium">
          Solicitar consulta gratuita →
        </Link>
      </div>
    </main>
  );
}
