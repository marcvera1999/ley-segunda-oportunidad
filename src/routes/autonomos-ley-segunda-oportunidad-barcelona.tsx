import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Autónomos y Ley Segunda Oportunidad Barcelona | Horizonte Legal";
const DESC = "Autónomos en Barcelona con deudas de su actividad: cancela tus deudas con la Ley de la Segunda Oportunidad. Consulta gratuita con abogados especialistas.";

export const Route = createFileRoute("/autonomos-ley-segunda-oportunidad-barcelona")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/autonomos-ley-segunda-oportunidad-barcelona" },
    ],
    links: [{ rel: "canonical", href: "/autonomos-ley-segunda-oportunidad-barcelona" }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <p className="text-sm uppercase tracking-widest text-gold mb-3">Para autónomos</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
        Autónomo con deudas en Barcelona: empieza de cero
      </h1>
      <div className="mt-8 space-y-5 text-[17px] text-primary/85 leading-relaxed">
        <p>Si eres autónomo en Barcelona y tu actividad ha generado deudas que ya no puedes asumir, la Ley de la Segunda Oportunidad está pensada para ti.</p>
        <p>Cancelamos deudas con proveedores, bancos, líneas de crédito, leasing y, dentro de los límites legales, también con Hacienda y la Seguridad Social.</p>
      </div>
      <div className="mt-10">
        <Link to="/" hash="contacto" className="inline-flex rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium">
          Solicitar consulta gratuita →
        </Link>
      </div>
    </main>
  );
}
