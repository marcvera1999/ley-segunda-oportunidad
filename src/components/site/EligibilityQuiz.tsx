import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

type Q = { q: string; correct: boolean };

const QUESTIONS: Q[] = [
  { q: "¿Tienes deudas que no puedes pagar?", correct: true },
  { q: "¿Eres persona física o autónomo (no empresa S.L.)?", correct: true },
  { q: "¿Has sido condenado por delitos económicos en los últimos 10 años?", correct: false },
  { q: "¿Estás actuando de buena fe (no has ocultado bienes)?", correct: true },
];

export function EligibilityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const answer = (yes: boolean) => {
    setAnswers((a) => [...a, yes]);
    setStep((s) => s + 1);
  };
  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  const done = step >= QUESTIONS.length;
  const allOk = done && answers.every((a, i) => a === QUESTIONS[i].correct);
  const progress = (Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100;

  const current = !done ? QUESTIONS[step] : null;
  const yesIsGood = current?.correct === true;
  const noIsGood = current?.correct === false;

  const goodCls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-sage text-sage-foreground px-6 min-h-[52px] font-semibold hover:opacity-90 transition";
  const neutralCls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-primary/70 px-6 min-h-[52px] font-medium hover:bg-secondary/70 transition border border-[color:var(--border-warm)]";

  return (
    <div className="rounded-3xl bg-card border-[1.5px] border-gold p-6 md:p-10 shadow-[var(--shadow-form)] max-w-[600px] mx-auto">
      {!done && (
        <>
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
            <span className="uppercase tracking-wider font-semibold">
              Pregunta {step + 1} de {QUESTIONS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[color:var(--border-warm)] overflow-hidden mb-8">
            <motion.div
              className="h-full bg-gold rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            <h3 className="font-display text-2xl md:text-[28px] text-primary mb-8 leading-snug">
              {current!.q}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => answer(true)}
                className={yesIsGood ? goodCls : neutralCls}
              >
                <Check className="h-5 w-5" /> Sí
              </button>
              <button
                onClick={() => answer(false)}
                className={noIsGood ? goodCls : neutralCls}
              >
                <X className="h-5 w-5" /> No
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`text-center rounded-2xl p-6 ${
              allOk ? "bg-[color:var(--sage-light)]" : "bg-secondary"
            }`}
          >
            <div
              className={`inline-flex h-14 w-14 items-center justify-center rounded-full mb-4 ${
                allOk ? "bg-sage text-sage-foreground" : "bg-gold text-gold-foreground"
              }`}
            >
              {allOk ? <Check className="h-7 w-7" /> : <X className="h-7 w-7" />}
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {allOk ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-6 w-6 text-sage" /> Probablemente cumples los requisitos
                </span>
              ) : (
                "Puede que existan otras vías para ti"
              )}
            </h3>
            <p className="text-primary/75 mb-6 max-w-md mx-auto">
              {allOk
                ? "Un abogado puede revisar tu caso sin coste y llamarte hoy mismo."
                : "Cada situación es única. Estudiamos tu caso, sin compromiso."}
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-gold text-gold-foreground px-7 min-h-[52px] font-semibold hover:opacity-95 transition"
            >
              Habla con un abogado ahora →
            </a>
            <div>
              <button
                onClick={reset}
                className="mt-5 text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
              >
                Repetir el test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
