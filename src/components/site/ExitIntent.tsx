import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function ExitIntent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (sessionStorage.getItem("hl_exit_shown") === "1") return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 4 && !sessionStorage.getItem("hl_exit_shown")) {
        sessionStorage.setItem("hl_exit_shown", "1");
        setShow(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="hidden md:flex fixed bottom-6 left-6 z-50 w-[min(34rem,calc(100%-2rem))] bg-card border border-gold rounded-2xl shadow-[var(--shadow-form)] p-4 items-center gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-primary font-medium leading-snug">
          ⏳ Antes de irte — ¿sabías que tu consulta es <span className="font-semibold text-gold">gratuita</span>?
        </p>
      </div>
      <a
        href="#contacto"
        onClick={() => setShow(false)}
        className="text-sm text-gold font-semibold hover:underline whitespace-nowrap"
      >
        Consultar ahora →
      </a>
      <button
        onClick={() => setShow(false)}
        aria-label="Cerrar"
        className="text-muted-foreground hover:text-primary transition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
