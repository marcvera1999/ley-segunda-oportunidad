import { useEffect, useState } from "react";
import { WHATSAPP_HREF, WhatsAppIcon } from "./whatsapp";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className={`pulse-whatsapp fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] text-white shadow-xl ring-1 ring-black/5 h-14 w-14 md:h-auto md:w-auto md:py-3.5 md:pl-4 md:pr-5 justify-center hover:bg-[#1eb855] hover:shadow-2xl transition-[background-color,box-shadow,opacity,transform] duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7 md:h-6 md:w-6 flex-shrink-0" />
      <span className="hidden md:inline font-semibold whitespace-nowrap">
        Escríbenos por WhatsApp
      </span>
    </a>
  );
}
