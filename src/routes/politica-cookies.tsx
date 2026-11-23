import { createFileRoute } from "@tanstack/react-router";
import { seo, SITE } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { openCookieSettings } from "@/lib/analytics";

export const Route = createFileRoute("/politica-cookies")({
  head: () =>
    seo({
      title: "Política de Cookies | Deuda Eliminada",
      description: "Política de cookies de Deuda Eliminada.",
      path: "/politica-cookies",
      noindex: true,
    }),
  component: Page,
});

const ROWS: { name: string; owner: string; purpose: string; duration: string; type: string }[] = [
  {
    name: "de_cookie_consent",
    owner: "Propia",
    purpose: "Guarda si has aceptado o rechazado las cookies.",
    duration: "Hasta que la borres",
    type: "Técnica (almacenamiento local)",
  },
  {
    name: "hl_form_submits",
    owner: "Propia",
    purpose: "Evita envíos repetidos del formulario (antispam).",
    duration: "1 hora",
    type: "Técnica (almacenamiento local)",
  },
  {
    name: "hl_exit_shown",
    owner: "Propia",
    purpose: "Evita mostrar el aviso de consulta gratuita más de una vez.",
    duration: "Sesión",
    type: "Técnica (almacenamiento de sesión)",
  },
  {
    name: "_ga, _ga_*",
    owner: "Google (Google Analytics)",
    purpose: "Distinguir visitantes y medir cómo se usa la web.",
    duration: "Hasta 2 años",
    type: "Análisis (solo si aceptas)",
  },
  {
    name: "_gcl_au, _gcl_*",
    owner: "Google (Google Ads)",
    purpose: "Medir qué anuncios generan contactos.",
    duration: "Hasta 90 días",
    type: "Publicidad (solo si aceptas)",
  },
];

function Page() {
  return (
    <LegalPage title="Política de cookies">
      <LegalSection title="1. Qué son las cookies">
        <p>
          Las cookies y tecnologías similares (como el almacenamiento local del navegador) son
          pequeños archivos que una web guarda en tu dispositivo para funcionar correctamente o para
          obtener información sobre cómo se usa.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué cookies usamos">
        <p>
          En {SITE.name} usamos cookies técnicas, necesarias para que la web funcione, y, solo si
          las aceptas, cookies de análisis y de publicidad de Google. Si las rechazas o no eliges,
          no se instalan cookies de análisis ni de publicidad.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-[color:var(--border-warm)]">
                <th className="py-2 pr-3">Nombre</th>
                <th className="py-2 pr-3">Titular</th>
                <th className="py-2 pr-3">Finalidad</th>
                <th className="py-2 pr-3">Duración</th>
                <th className="py-2">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.name} className="border-b border-[color:var(--border-warm)] align-top">
                  <td className="py-2 pr-3 font-mono text-xs">{r.name}</td>
                  <td className="py-2 pr-3">{r.owner}</td>
                  <td className="py-2 pr-3">{r.purpose}</td>
                  <td className="py-2 pr-3">{r.duration}</td>
                  <td className="py-2">{r.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Google puede tratar estos datos fuera del Espacio Económico Europeo con las garantías
          descritas en la{" "}
          <a href="/politica-privacidad" className="underline">
            política de privacidad
          </a>
          . Más información en policies.google.com/technologies/cookies.
        </p>
      </LegalSection>

      <LegalSection title="3. Cómo aceptar, rechazar o cambiar tu elección">
        <p>
          Al entrar en la web te mostramos un aviso con dos botones, «Aceptar» y «Rechazar». Seguir
          navegando no supone aceptar. Puedes cambiar tu elección en cualquier momento:
        </p>
        <button
          type="button"
          onClick={openCookieSettings}
          className="inline-flex rounded-full bg-gold text-gold-foreground px-5 py-2 font-semibold hover:opacity-90 transition"
        >
          Configurar cookies
        </button>
        <p>
          También puedes borrar o bloquear las cookies desde la configuración de tu navegador
          (Chrome, Safari, Firefox o Edge). Si bloqueas las cookies técnicas, algunas partes de la
          web pueden no funcionar bien.
        </p>
      </LegalSection>

      <LegalSection title="4. Cambios en esta política">
        <p>
          Actualizaremos esta política si cambian las cookies que usamos. La fecha de la última
          actualización aparece al principio de la página.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
