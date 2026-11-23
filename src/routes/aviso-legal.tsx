import { createFileRoute } from "@tanstack/react-router";
import { seo, SITE, LEGAL } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const Route = createFileRoute("/aviso-legal")({
  head: () =>
    seo({
      title: "Aviso Legal | Deuda Eliminada",
      description: "Aviso legal de Deuda Eliminada.",
      path: "/aviso-legal",
      noindex: true,
    }),
  component: Page,
});

function Page() {
  const a = SITE.address;
  return (
    <LegalPage title="Aviso legal">
      <LegalSection title="1. Titular de la web">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la
          información y de comercio electrónico (LSSI), se informa de los datos del titular de{" "}
          {SITE.url.replace("https://", "")}:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Nombre comercial: {SITE.name}.</li>
          {LEGAL.titular && <li>Titular: {LEGAL.titular}.</li>}
          {LEGAL.nif && <li>NIF: {LEGAL.nif}.</li>}
          <li>
            Domicilio: {a.street}, {a.postalCode} {a.city}.
          </li>
          <li>Teléfono: 932 426 252.</li>
          <li>Correo electrónico: {SITE.email}.</li>
        </ul>
        {LEGAL.titular && (
          <p>
            «{SITE.name}» es un nombre comercial utilizado por {LEGAL.titular} para prestar
            servicios jurídicos en materia de la Ley de la Segunda Oportunidad.
          </p>
        )}
      </LegalSection>

      <LegalSection title="2. Profesión regulada">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Profesión: abogacía. Título académico: licenciatura o grado en Derecho, expedido en
            España.
          </li>
          <li>
            Colegio profesional: Il·lustre Col·legi de l'Advocacia de Barcelona (ICAB),
            www.icab.cat.
          </li>
          {LEGAL.colegiados.map((c) => (
            <li key={c.numero}>
              {c.nombre}, abogado/a colegiado/a en el ICAB con el número {c.numero}.
            </li>
          ))}
          <li>
            Normas profesionales aplicables: Estatuto General de la Abogacía Española (Real Decreto
            135/2021) y Código Deontológico de la Abogacía Española, disponibles en www.abogacia.es.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Información de esta web">
        <p>
          Los contenidos de esta web tienen carácter informativo y general. No constituyen
          asesoramiento jurídico ni sustituyen el estudio personalizado de cada caso por un abogado.
          El resultado de cualquier procedimiento depende de las circunstancias de cada persona y de
          la decisión del juzgado competente.
        </p>
        <p>
          El envío de una consulta a través de la web no crea por sí mismo una relación profesional.
          Esta solo existe cuando se firma la hoja de encargo correspondiente.
        </p>
      </LegalSection>

      <LegalSection title="4. Condiciones de uso">
        <p>
          El usuario se compromete a utilizar la web de forma lícita y a no introducir datos falsos
          o de terceros sin su autorización. El titular puede modificar los contenidos de la web en
          cualquier momento y no se responsabiliza de los daños derivados de un uso indebido de la
          web ni de los contenidos de webs de terceros enlazadas.
        </p>
      </LegalSection>

      <LegalSection title="5. Propiedad intelectual">
        <p>
          Los textos, diseños, logotipos y demás contenidos de la web pertenecen a su titular o se
          usan con autorización. No se permite su reproducción con fines comerciales sin
          autorización previa.
        </p>
      </LegalSection>

      <LegalSection title="6. Protección de datos y cookies">
        <p>
          El tratamiento de datos personales se explica en la{" "}
          <a href="/politica-privacidad" className="underline">
            política de privacidad
          </a>{" "}
          y el uso de cookies en la{" "}
          <a href="/politica-cookies" className="underline">
            política de cookies
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Legislación aplicable">
        <p>Este aviso legal se rige por la legislación española.</p>
      </LegalSection>
    </LegalPage>
  );
}
