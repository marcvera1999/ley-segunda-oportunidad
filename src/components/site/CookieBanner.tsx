import { useEffect, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("hl_cookie_consent")) setShow(true);
  }, []);
  if (!show) return null;
  const accept = () => {
    localStorage.setItem("hl_cookie_consent", "1");
    setShow(false);
  };
  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] bg-primary text-primary-foreground text-sm border-t border-primary-foreground/15 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-3 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <p className="text-primary-foreground/85">
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
