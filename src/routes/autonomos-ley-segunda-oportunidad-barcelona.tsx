import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

const TITLE = "Autónomos con deudas Barcelona | Deuda Eliminada";
const DESC = "Autónomos en Barcelona con deudas de su actividad: estudiamos si puedes cancelarlas con la Ley de la Segunda Oportunidad. Consulta gratuita con abogados especialistas.";

export const Route = createFileRoute("/autonomos-ley-segunda-oportunidad-barcelona")({
  head: () => seo({ title: TITLE, description: DESC, path: "/autonomos-ley-segunda-oportunidad-barcelona" }),
  component: Page,
});

function Page() {
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <p className="text-sm uppercase tracking-widest text-gold-ink mb-3">Para autónomos</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
        Autónomo con deudas en Barcelona: empieza de cero
      </h1>
      <div className="mt-8 space-y-5 text-[17px] text-primary/85 leading-relaxed text-justify hyphens-auto">
        <p>Si eres autónomo en Barcelona y tu actividad ha generado deudas que ya no puedes asumir, la Ley de la Segunda Oportunidad está pensada para ti.</p>
        <p>La ley permite exonerar deudas con proveedores, bancos, líneas de crédito y leasing y, dentro de los límites legales, una parte de las deudas con Hacienda y la Seguridad Social. Estudiamos tu caso, incluido si es necesario cerrar la actividad o no.</p>
      </div>
      <div className="mt-10">
        <Link to="/" hash="contacto" className="inline-flex rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium">
          Solicitar consulta gratuita →
        </Link>
      </div>
    </main>
  );
}
