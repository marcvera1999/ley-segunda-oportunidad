import { useEffect, useRef, useState } from "react";
import { getConsent, setConsent, OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/analytics";

/**
 * Banner de cookies (RGPD / LSSI + Consent Mode v2).
 * - "Rechazar" y "Aceptar" tienen el mismo tamaño y visibilidad.
 * - Seguir navegando NO cuenta como aceptar.
 * - Se puede volver a abrir desde "Configurar cookies" (pie de página).
 */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (getConsent() === null) setShow(true);
    const open = () => setShow(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  // Publica la altura real del banner para que los elementos fijos del pie
  // (WhatsApp, CTA móvil) se aparten. Se mide en vez de fijarse porque el
  // banner pasa a varias líneas en pantallas estrechas.
  useEffect(() => {
    if (!show) return;
    const root = document.documentElement;
    const sync = () => {
      const h = ref.current?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--cookiebar-h", `${h}px`);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("resize", sync);
      root.style.removeProperty("--cookiebar-h");
    };
  }, [show]);

  if (!show) return null;

  const choose = (granted: boolean) => {
    setConsent(granted);
    setShow(false);
  };

  const btn = "rounded-full px-5 py-2 font-semibold min-w-[110px] transition hover:opacity-90";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-live="polite"
      aria-label="Configuración de cookies"
      className="fixed bottom-0 inset-x-0 z-[100] bg-primary text-primary-foreground text-sm border-t border-primary-foreground/15 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-3 flex flex-col md:flex-row items-center gap-3 justify-between">
        <p className="w-full md:w-auto min-w-0 text-center md:text-left text-primary-foreground/85 leading-relaxed">
          Usamos cookies propias necesarias para que la web funcione y, solo si las aceptas, cookies
          de Google para analizar las visitas y medir nuestros anuncios. Puedes cambiar tu elección
          cuando quieras en «Configurar cookies», al pie de la página. Más información en la{" "}
          <a href="/politica-cookies" className="underline text-gold">
            política de cookies
          </a>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose(false)}
            className={`${btn} bg-primary-foreground text-primary`}
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className={`${btn} bg-gold text-gold-foreground`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
