import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DEUDAS = [
  "Menos de 10.000€",
  "10.000€ – 30.000€",
  "30.000€ – 60.000€",
  "60.000€ – 100.000€",
  "Más de 100.000€",
];

export function ContactForm({ bare = false }: { bare?: boolean }) {
  const [deuda, setDeuda] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!deuda || !telefono || !nombre || !gdpr) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      const leadData = {
        nombre,
        situacion: "Por cualificar en llamada",
        deuda_aproximada: deuda,
        contacto_tipo: "telefono" as const,
        contacto_valor: telefono,
        mensaje: null,
      };

      const { error: insertError } = await supabase.from("leads").insert(leadData);
      if (insertError) throw new Error(insertError.message);

      try {
        await fetch("https://hook.eu1.make.com/s1xr4wtekgngfmq7dyr3wls27wkx1mhx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...leadData, created_at: new Date().toISOString() }),
        });
      } catch (whErr) {
        console.error("[ContactForm] Make webhook error:", whErr);
      }

      setDone(true);
    } catch (err) {
      console.error("[ContactForm] submission error:", err);
      setError(`Ha ocurrido un error: ${(err as Error)?.message || "desconocido"}`);
    } finally {
      setLoading(false);
    }
  };

  const wrapper = bare
    ? ""
    : "rounded-3xl bg-card border-[1.5px] border-gold p-6 md:p-10 shadow-[var(--shadow-form)]";

  return (
    <div className={wrapper} id="mini-form">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage text-sage-foreground mb-5"
            >
              <Check className="h-8 w-8" strokeWidth={3} />
            </motion.div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-2">
              Gracias, {nombre.split(" ")[0]}.
            </h3>
            <p className="text-primary/85">Te llamamos en menos de 2 horas.</p>
            <p className="text-sm text-muted-foreground mt-3">
              (En horario laboral. Si es fuera de horario, te llamamos mañana.)
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {!bare && (
              <div className="text-center space-y-3">
                <span className="inline-block text-[11px] uppercase tracking-widest text-gold border border-gold/40 rounded-full px-3 py-1 bg-gold/5">
                  Consulta gratuita · Respuesta en menos de 2 horas
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-primary">¿Cuánto debes?</h3>
                <p className="text-sm text-muted-foreground">
                  Es el único dato que necesitamos para empezar.
                </p>
              </div>
            )}

            {/* Field 1: Debt pills */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-3">
                Importe aproximado de tu deuda
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEUDAS.map((d, i) => {
                  const isLast = i === DEUDAS.length - 1;
                  const isSel = deuda === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDeuda(d)}
                      className={`text-center px-4 py-3.5 rounded-full border-[1.5px] text-sm font-medium transition-all md:hover:scale-[1.02] active:scale-100 ${
                        isLast ? "sm:col-span-2" : ""
                      } ${
                        isSel
                          ? "bg-gold border-gold text-gold-foreground"
                          : "bg-transparent border-[color:var(--border-warm)] text-primary hover:border-gold/60"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 2: Phone */}
            <AnimatePresence>
              {deuda && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-semibold text-primary mb-2">
                    ¿A qué número te llamamos?
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+34 600 000 000"
                    aria-label="Teléfono"
                    maxLength={300}
                    autoFocus
                    className="w-full bg-background border-[1.5px] border-[color:var(--border-warm)] focus:border-gold outline-none px-4 py-3.5 rounded-2xl text-base placeholder:text-muted-foreground/60"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Solo para que un abogado te llame. Nada más.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Field 3: Name */}
            <AnimatePresence>
              {deuda && telefono.length >= 6 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="overflow-hidden space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      ¿Cómo te llamas?
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      aria-label="Nombre"
                      maxLength={200}
                      className="w-full bg-background border-[1.5px] border-[color:var(--border-warm)] focus:border-gold outline-none px-4 py-3.5 rounded-2xl text-base placeholder:text-muted-foreground/60"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gdpr}
                      onChange={(e) => setGdpr(e.target.checked)}
                      className="mt-0.5 accent-[var(--gold)]"
                    />
                    <span>
                      Acepto la{" "}
                      <a href="/politica-privacidad" className="text-primary underline underline-offset-2">
                        política de privacidad
                      </a>{" "}
                      y que Horizonte Legal me contacte.
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-gold-foreground px-6 min-h-[56px] text-base font-semibold hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Quiero saber si puedo cancelar mis deudas →</>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Confidencial · Secreto profesional del abogado · Sin compromiso
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
