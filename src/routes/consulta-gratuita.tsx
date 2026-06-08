import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, Search, FileText, Sunrise, Star, ShieldCheck, Lock, Clock } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { TrustBar } from "@/components/site/TrustBar";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { seo, SITE, localBusinessJsonLd } from "@/lib/seo";

const TITLE = "Consulta gratuita Ley Segunda Oportunidad | Cancela tus deudas";
const DESC =
  "Pide tu consulta gratuita y sin compromiso. Abogados especialistas en la Ley de la Segunda Oportunidad en Barcelona. Te llamamos en menos de 1 hora.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.url}/consulta-gratuita#webpage`,
      url: `${SITE.url}/consulta-gratuita`,
      name: TITLE,
      description: DESC,
      inLanguage: SITE.lang,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#business` },
    },
    localBusinessJsonLd(),
  ],
};

export const Route = createFileRoute("/consulta-gratuita")({
  head: () => {
    const { meta, links } = seo({ title: TITLE, description: DESC, path: "/consulta-gratuita" });
    return {
      meta,
      links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: ConsultaGratuita,
});

function ConsultaGratuita() {
  return (
    <main className="overflow-x-hidden">
      <HeroForm />
      <TrustBar />
      <ComoFunciona />
      <Testimonios />
      <Garantia />
      <WhatsAppFab />
    </main>
  );
}

/* ============ HERO + FORM (above the fold) ============ */
function HeroForm() {
  const beneficios = [
    "Cancelación legal y definitiva de tus deudas",
    "Paramos embargos y llamadas de acreedores",
    "Primera consulta gratis y 100% confidencial",
    "Particulares y autónomos en Barcelona",
  ];
  return (
    <section
      className="relative pt-28 pb-16 md:pt-32 md:pb-24"
      style={{ background: "linear-gradient(180deg, #FAF8F4 0%, #F5F0E8 100%)" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] md:text-xs uppercase tracking-[0.18em] text-gold font-semibold border border-gold/50 rounded-full px-4 py-1.5 mb-6 bg-gold/5"
          >
            Consulta gratuita · Sin compromiso
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-primary leading-[1.07] tracking-tight text-[34px] md:text-[48px]"
          >
            Cancela tus deudas con la{" "}
            <span className="italic text-gold">Ley de la Segunda Oportunidad</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-5 text-[18px] md:text-[20px] text-muted-foreground max-w-[540px] leading-relaxed"
          >
            Si no puedes pagar tus préstamos, tarjetas o deudas de tu negocio,
            existe una salida legal. Te decimos gratis si puedes acogerte.
          </motion.p>

          <ul className="mt-7 space-y-3">
            {beneficios.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                className="flex items-start gap-3 text-primary/90"
              >
                <ShieldCheck className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-gold" />
            Te llamamos en menos de 1 hora (horario laboral).
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          id="formulario"
          className="scroll-mt-24"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

/* ============ CÓMO FUNCIONA ============ */
function ComoFunciona() {
  const steps = [
    { Icon: Phone, t: "Nos cuentas tu caso", d: "Una llamada confidencial y gratuita. Sin papeleo." },
    { Icon: Search, t: "Estudiamos tu viabilidad", d: "Un abogado analiza tu situación en 24–48 horas." },
    { Icon: FileText, t: "Presentamos el expediente", d: "Tramitamos todo ante los Juzgados de Barcelona." },
    { Icon: Sunrise, t: "Tus deudas se cancelan", d: "Resolución judicial firme. Empiezas de cero." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">El proceso</p>
          <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
            Cuatro pasos. Sin burocracia.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-5">
          {steps.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="text-center">
                <div className="relative mx-auto h-14 w-14 rounded-full bg-background border-2 border-gold flex items-center justify-center text-gold mb-4">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg text-primary mb-2">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIOS ============ */
function Testimonios() {
  const t = [
    { name: "Carlos", city: "Barcelona", amount: "68.000€", quote: "Me trataron como a una persona, no como a un expediente. Hoy duermo tranquilo." },
    { name: "María", city: "L'Hospitalet", amount: "41.500€", quote: "No sabía que esto existía. En 9 meses cancelaron todas mis deudas." },
    { name: "Ahmed", city: "Badalona", amount: "93.000€", quote: "Mi negocio quebró y pensaba que estaba acabado. Tengo una nueva oportunidad." },
  ];
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">Casos reales</p>
          <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
            Personas que ya empezaron de cero
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {t.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.1}>
              <article className="h-full rounded-2xl bg-card border-l-4 border-l-gold border border-[color:var(--border-warm)] p-6">
                <div className="flex gap-0.5 text-gold mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic text-primary/85 leading-relaxed mb-5">{it.quote}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-[color:var(--border-warm)]">
                  <span className="h-9 w-9 rounded-full bg-sage text-sage-foreground flex items-center justify-center font-display font-semibold text-sm">
                    {it.name[0]}
                  </span>
                  <div>
                    <p className="font-display text-sm text-primary leading-tight">{it.name}, {it.city}</p>
                    <p className="text-sm text-gold font-bold">{it.amount} cancelados</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ GARANTÍA + CTA FINAL ============ */
function Garantia() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage mb-5">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
            Tu primera consulta es gratis y confidencial
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Sin compromiso y protegida por el secreto profesional del abogado.
            Cuéntanos tu situación y te decimos con sinceridad si la Ley de la
            Segunda Oportunidad puede ayudarte.
          </p>
          <a
            href="#formulario"
            className="pulse-gold mt-8 inline-flex items-center justify-center rounded-full bg-gold text-gold-foreground px-8 min-h-[56px] font-semibold hover:opacity-95 transition"
          >
            Pedir mi consulta gratuita →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
