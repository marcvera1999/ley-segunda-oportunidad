import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, Phone, MessageCircle, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SITUACIONES = [
  "No puedo pagar mis préstamos o tarjetas",
  "Soy autónomo y tengo deudas de mi actividad",
  "Soy avalista de una deuda que no es mía",
  "Tengo deudas con Hacienda o Seguridad Social",
  "Otro / No sé cómo describirlo",
];

const DEUDAS = [
  "Menos de 10.000€",
  "Entre 10.000€ y 30.000€",
  "Entre 30.000€ y 60.000€",
  "Entre 60.000€ y 100.000€",
  "Más de 100.000€",
];

type ContactoTipo = "telefono" | "whatsapp" | "email";

export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [situacion, setSituacion] = useState("");
  const [deuda, setDeuda] = useState("");
  const [contactoTipo, setContactoTipo] = useState<ContactoTipo>("whatsapp");
  const [contactoValor, setContactoValor] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!nombre || !situacion || !deuda || !contactoValor || !gdpr) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      const leadData = {
        nombre,
        situacion,
        deuda_aproximada: deuda,
        contacto_tipo: contactoTipo,
        contacto_valor: contactoValor,
        mensaje: mensaje || null,
      };

      const { data: inserted, error: insertError } = await supabase
        .from("leads")
        .insert(leadData)
        .select()
        .single();

      if (insertError) {
        console.error("[ContactForm] insert error:", insertError);
        throw new Error(`No pudimos guardar tu consulta: ${insertError.message}`);
      }

      const { error: fnError } = await supabase.functions.invoke("clever-endpoint", {
        body: { record: inserted ?? leadData },
      });

      if (fnError) {
        // Lead was saved — log notification failure but don't block the user
        console.error("[ContactForm] clever-endpoint error:", fnError);
      }

      setDone(true);
    } catch (err) {
      console.error("[ContactForm] submission error:", err);
      const msg = (err as Error)?.message || "Error desconocido";
      setError(`Ha ocurrido un error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-warm)] p-7 md:p-10">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage text-sage-foreground mb-5">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              Hemos recibido tu consulta, {nombre.split(" ")[0]}.
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Un abogado te contactará en menos de 24 horas en horario laboral.
              Estás a un paso de recuperar tu tranquilidad.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Field label="¿Cuál es tu nombre?">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                aria-label="Nombre"
                required
                maxLength={200}
                className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2.5 text-lg placeholder:text-muted-foreground/60"
              />
            </Field>

            <Field label="¿Cuál es tu situación principal?">
              <select
                value={situacion}
                onChange={(e) => setSituacion(e.target.value)}
                required
                aria-label="Situación"
                className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2.5 text-base appearance-none cursor-pointer"
              >
                <option value="">Elige una opción…</option>
                {SITUACIONES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="¿Cuánto debes aproximadamente?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEUDAS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDeuda(d)}
                    className={`text-left px-4 py-3 rounded-xl border transition text-sm ${
                      deuda === d
                        ? "border-gold bg-gold/10 text-primary"
                        : "border-border hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="¿Cuál es la mejor forma de contactarte?">
              <div className="flex gap-2 mb-3">
                {[
                  { id: "telefono", label: "Teléfono", Icon: Phone },
                  { id: "whatsapp", label: "WhatsApp", Icon: MessageCircle },
                  { id: "email", label: "Email", Icon: Mail },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setContactoTipo(id as ContactoTipo)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full text-sm transition border ${
                      contactoTipo === id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {label}
                  </button>
                ))}
              </div>
              <input
                type={contactoTipo === "email" ? "email" : "tel"}
                value={contactoValor}
                onChange={(e) => setContactoValor(e.target.value)}
                placeholder={contactoTipo === "email" ? "tu@email.com" : "+34 600 000 000"}
                aria-label="Contacto"
                required
                maxLength={300}
                className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2.5 text-lg placeholder:text-muted-foreground/60"
              />
            </Field>

            <Field label="¿Hay algo más que quieras contarnos? (opcional)">
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={3}
                maxLength={5000}
                placeholder="Tu situación es única. Puedes escribirnos lo que necesites."
                aria-label="Mensaje"
                className="w-full bg-transparent border border-border rounded-xl focus:border-gold outline-none p-3 text-base placeholder:text-muted-foreground/60 resize-none"
              />
            </Field>

            <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={gdpr}
                onChange={(e) => setGdpr(e.target.checked)}
                required
                className="mt-1 accent-[var(--gold)]"
              />
              <span>
                He leído y acepto la{" "}
                <a href="/politica-privacidad" className="text-primary underline underline-offset-4">
                  política de privacidad
                </a>.
              </span>
            </label>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="pulse-gold w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-4 text-base font-semibold hover:opacity-95 transition disabled:opacity-60"
            >
              {loading ? "Enviando…" : "Solicitar mi consulta gratuita →"}
            </button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Tus datos son 100% confidenciales y están protegidos por el secreto profesional del abogado.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-primary/80 mb-2 font-medium">{label}</label>
      {children}
    </div>
  );
}
