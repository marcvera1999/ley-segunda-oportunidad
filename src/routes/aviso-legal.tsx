import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/aviso-legal")({
  head: () => seo({ title: "Aviso Legal | Horizonte Legal", description: "Aviso legal de Horizonte Legal.", path: "/aviso-legal", noindex: true }),
  component: () => (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <h1 className="font-display text-4xl text-primary">Aviso Legal</h1>
      <div className="mt-6 space-y-4 text-primary/80">
        <p>Titular: Horizonte Legal — Carrer de Pau Claris, 100, 08009 Barcelona.</p>
        <p>Inscrita en el Il·lustre Col·legi de l'Advocacia de Barcelona (ICAB).</p>
        <p>Contacto: hola@horizontelegal.es</p>
      </div>
    </main>
  ),
});
