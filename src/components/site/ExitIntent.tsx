import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function ExitIntent() {
  const [show, setShow] = useState(false);
  // Si el banner de cookies sigue visible (abajo), subimos el pop-up para no solaparlo.
  const [cookiePending, setCookiePending] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const trigger = () => {
      if (sessionStorage.getItem("hl_exit_shown") === "1") return;
      sessionStorage.setItem("hl_exit_shown", "1");
      setCookiePending(!localStorage.getItem("hl_cookie_consent"));
      setShow(true);
    };

    // 1) Exit-intent: el ratón sale por la parte superior (hacia la barra del navegador).
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 4) trigger();
    };
    document.addEventListener("mouseleave", onLeave);

    // 2) Respaldo: si a los 20 s no se ha mostrado (p. ej. en portátiles donde el
    //    exit-intent casi nunca se dispara), se muestra igualmente.
    const t = window.setTimeout(trigger, 20000);

    return () => {
      document.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(t);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`hidden md:flex fixed ${cookiePending ? "bottom-24" : "bottom-6"} left-6 z-[110] w-[min(44rem,calc(100%-3rem))] bg-card border border-gold rounded-2xl shadow-[var(--shadow-form)] py-3 pl-5 pr-3 items-center gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300`}>
      <p className="flex-1 min-w-0 text-[15px] text-primary font-medium leading-snug">
        ⏳ Antes de irte — ¿sabías que tu consulta es{" "}
        <span className="font-semibold text-gold">gratuita</span>?
      </p>
      <a
        href="#contacto"
        onClick={() => setShow(false)}
        className="inline-flex items-center whitespace-nowrap rounded-full bg-gold text-gold-foreground px-5 py-2 text-sm font-semibold hover:opacity-95 transition"
      >
        Consultar ahora →
      </a>
      <button
        onClick={() => setShow(false)}
        aria-label="Cerrar"
        className="shrink-0 text-muted-foreground hover:text-primary transition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
