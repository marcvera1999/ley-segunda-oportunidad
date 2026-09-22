import { useEffect, useRef, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("hl_cookie_consent")) setShow(true);
  }, []);

  // Publica la altura real del banner para que los elementos fijos del pie
  // (WhatsApp, CTA móvil) se aparten. Se mide en vez de fijarse porque el
  // banner pasa a dos líneas en pantallas estrechas.
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

  const accept = () => {
    localStorage.setItem("hl_cookie_consent", "1");
    setShow(false);
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-0 inset-x-0 z-[100] bg-primary text-primary-foreground text-sm border-t border-primary-foreground/15 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-3 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <p className="w-full sm:w-auto min-w-0 text-center sm:text-left text-primary-foreground/85">
          Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{" "}
          <a href="/politica-cookies" className="underline text-gold">política de cookies</a>.
        </p>
        <button
          onClick={accept}
          className="rounded-full bg-gold text-gold-foreground px-4 py-1.5 font-medium hover:opacity-90"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
