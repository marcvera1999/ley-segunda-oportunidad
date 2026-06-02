import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";

const QUESTIONS = [
  "¿Tienes deudas que no puedes pagar?",
  "¿Son superiores a 5.000€ en total?",
  "¿Eres persona física o autónomo (no empresa S.L.)?",
  "¿No has sido condenado por delitos económicos en los últimos 10 años?",
  "¿Estás actuando de buena fe (no has ocultado bienes)?",
];

export function EligibilityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const answer = (yes: boolean) => {
    const next = [...answers, yes];
    setAnswers(next);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  const done = step >= QUESTIONS.length;
  const allYes = done && answers.every(Boolean);

  return (
    <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-warm)] p-7 md:p-10 max-w-2xl mx-auto">
      {/* progress dots */}
      <div className="flex justify-center gap-2 mb-7">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i < step ? "w-8 bg-gold" : i === step ? "w-8 bg-primary/60" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Pregunta {step + 1} de {QUESTIONS.length}
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-8">
              {QUESTIONS[step]}
            </h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => answer(true)}
                className="inline-flex items-center gap-2 rounded-full bg-sage text-sage-foreground px-7 py-3 font-medium hover:opacity-90 transition"
              >
                <Check className="h-4 w-4" /> Sí
              </button>
              <button
                onClick={() => answer(false)}
                className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-3 font-medium hover:bg-secondary/70 transition border border-border"
              >
                <X className="h-4 w-4" /> No
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full mb-4 ${allYes ? "bg-sage text-sage-foreground" : "bg-gold text-gold-foreground"}`}>
              {allYes ? <Check className="h-7 w-7" /> : <span className="font-display text-xl">!</span>}
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {allYes
                ? "Parece que cumples los requisitos"
                : "Puede que existan otras vías para ti"}
            </h3>
            <p className="text-muted-foreground mb-7 max-w-md mx-auto">
              {allYes
                ? "Déjanos tu teléfono y un abogado revisará tu caso sin coste y te llamará en menos de 24h."
                : "Cada situación es única. Déjanos tu teléfono y lo estudiamos juntos, sin compromiso."}
            </p>

            {/* Cierre en caliente: el formulario aparece aquí mismo */}
            <div className="text-left mt-2 pt-6 border-t border-border">
              <ContactForm bare />
            </div>

            <button
              onClick={reset}
              className="mt-6 text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
            >
              Repetir el test
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
