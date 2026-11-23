import { createFileRoute } from "@tanstack/react-router";
import { seo, SITE, LEGAL } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const Route = createFileRoute("/politica-privacidad")({
  head: () =>
    seo({
      title: "Política de Privacidad | Deuda Eliminada",
      description: "Política de privacidad de Deuda Eliminada.",
      path: "/politica-privacidad",
      noindex: true,
    }),
  component: Page,
});

function Page() {
  const a = SITE.address;
  return (
    <LegalPage title="Política de privacidad">
      <LegalSection title="1. Responsable del tratamiento">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Responsable: {LEGAL.titular || SITE.name}
            {LEGAL.titular ? ` (nombre comercial: ${SITE.name})` : ""}.
          </li>
          {LEGAL.nif && <li>NIF: {LEGAL.nif}.</li>}
          <li>
            Domicilio: {a.street}, {a.postalCode} {a.city}.
          </li>
          <li>Correo electrónico: {SITE.email}. Teléfono: 932 426 252.</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Qué datos tratamos">
        <p>
          A través del formulario de la web recogemos tu nombre y tu teléfono. No te pedimos datos
          sobre tus deudas en la web: esa información solo se trata, si nos la facilitas, durante la
          llamada o la consulta, y queda protegida por el secreto profesional del abogado.
        </p>
        <p>
          Si nos escribes por WhatsApp o nos llamas, tratamos los datos que nos facilites en esa
          comunicación. Si aceptas las cookies de análisis y publicidad, también se tratan datos de
          navegación, como se explica en la{" "}
          <a href="/politica-cookies" className="underline">
            política de cookies
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Para qué los usamos y base legal">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Atender tu consulta</strong>: llamarte, estudiar si puedes acogerte a la Ley de
            la Segunda Oportunidad y, si lo solicitas, enviarte una propuesta de honorarios. Base
            legal: tu consentimiento al enviar el formulario y la aplicación, a petición tuya, de
            medidas precontractuales.
          </li>
          <li>
            <strong>Prestar el servicio jurídico</strong>, si nos contratas. Base legal: la
            ejecución del contrato (hoja de encargo) y las obligaciones legales del despacho.
          </li>
          <li>
            <strong>Analítica web y medición de anuncios</strong>, solo si aceptas las cookies
            correspondientes. Base legal: tu consentimiento, que puedes retirar en cualquier momento
            desde «Configurar cookies», al pie de la página.
          </li>
        </ul>
        <p>No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos.</p>
      </LegalSection>

      <LegalSection title="4. Cuánto tiempo los conservamos">
        <p>
          Si no llegas a contratar nuestros servicios, conservamos tus datos de contacto durante un
          máximo de 12 meses desde nuestra última comunicación y después los suprimimos. Si nos
          contratas, los conservamos mientras dure el encargo y, después, durante los plazos que
          exige la ley para atender posibles responsabilidades.
        </p>
      </LegalSection>

      <LegalSection title="5. A quién se comunican">
        <p>
          No cedemos tus datos a terceros, salvo obligación legal. Para gestionar la web y las
          consultas utilizamos proveedores que tratan los datos por cuenta nuestra (encargados del
          tratamiento), con contrato y solo para estos fines:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Vercel: alojamiento de la web.</li>
          <li>Supabase: base de datos donde se guardan las solicitudes del formulario.</li>
          <li>Make: automatización de los avisos internos de nuevas solicitudes.</li>
          <li>
            Google: correo electrónico, hojas de cálculo internas y, solo con tu consentimiento,
            Google Analytics y Google Ads.
          </li>
          <li>Twilio: envío de avisos internos por SMS al despacho.</li>
          <li>WhatsApp (Meta), si decides contactarnos por ese canal.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Transferencias internacionales">
        <p>
          Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo,
          principalmente en Estados Unidos. En ese caso lo hacen con las garantías que exige el
          RGPD: empresas adheridas al Marco de Privacidad de Datos UE-EE. UU. o cláusulas
          contractuales tipo aprobadas por la Comisión Europea.
        </p>
      </LegalSection>

      <LegalSection title="7. Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
          tratamiento y portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo
          a {SITE.email} o por correo postal a la dirección indicada, indicando el derecho que
          quieres ejercer.
        </p>
        <p>
          Si consideras que no hemos tratado tus datos correctamente, puedes presentar una
          reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
        </p>
      </LegalSection>

      <LegalSection title="8. Confidencialidad">
        <p>
          Toda la información que nos facilites sobre tu situación está protegida por el secreto
          profesional de la abogacía y se trata de forma confidencial.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
