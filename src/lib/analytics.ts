// ============================================================
// MEDICIÓN (Google Tag Manager + Consent Mode v2)
// ------------------------------------------------------------
// - GTM se carga en todas las páginas desde src/routes/__root.tsx.
// - Por defecto NO se guarda ninguna cookie de análisis ni de publicidad:
//   el consentimiento empieza en "denied" y solo pasa a "granted" cuando
//   el usuario pulsa "Aceptar" en el banner (CookieBanner.tsx).
// - Los contactos se envían a GTM con track("nombre_evento").
//   Eventos actuales: formulario_enviado, test_completado,
//   cookie_consent_update. Los clics en teléfono (tel:) y WhatsApp
//   (wa.me) se detectan desde GTM sin código.
// ============================================================

export const GTM_ID = "GTM-K2V3HQKW";

/** Clave en localStorage con la elección del usuario: "granted" | "denied". */
export const CONSENT_KEY = "de_cookie_consent";

/** Evento del navegador para volver a abrir el banner ("Configurar cookies"). */
export const OPEN_COOKIE_SETTINGS_EVENT = "de:open-cookie-settings";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type ConsentValue = "granted" | "denied";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Envía un evento a GTM (dataLayer). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** Guarda la elección del usuario y actualiza Consent Mode. */
export function setConsent(granted: boolean) {
  const v: ConsentValue = granted ? "granted" : "denied";
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* noop */
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: v,
      ad_user_data: v,
      ad_personalization: v,
      analytics_storage: v,
    });
  }
  track("cookie_consent_update", { consent: v });
}

/** Abre de nuevo el banner de cookies (enlace "Configurar cookies"). */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

/**
 * Script en línea para el <head>. Debe ir ANTES que cualquier otra etiqueta:
 * 1) Consent Mode v2 con todo denegado por defecto.
 * 2) Si el usuario ya aceptó en otra visita, se aplica su elección.
 * 3) Carga del contenedor de Google Tag Manager.
 */
export const HEAD_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;
