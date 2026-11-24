import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { getServerConfig } from "../config.server";

// Envío del formulario de contacto desde el SERVIDOR (Vercel).
// La URL del webhook de Make y su token viven solo en variables de entorno
// de Vercel: nunca llegan al navegador ni a este repositorio (que es público).

// Un humano tarda varios segundos en escribir teléfono + nombre y marcar la
// casilla. Un bot lo envía al instante.
const MIN_FILL_MS = 2500;

const leadInput = z.object({
  nombre: z.string().trim().min(1).max(200),
  contacto_valor: z.string().trim().min(6).max(300),
  // Campo trampa (honeypot): invisible para personas. Si llega relleno, es un bot.
  website: z.string().max(500).optional().default(""),
  // Momento (ms) en que se mostró el formulario.
  startedAt: z.number().int().nonnegative(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(leadInput)
  .handler(async ({ data }) => {
    // Bot detectado: respondemos "ok" para no darle pistas, pero no guardamos nada.
    const tooFast = Date.now() - data.startedAt < MIN_FILL_MS;
    if (data.website || tooFast) {
      console.warn("[submitLead] envío descartado:", data.website ? "honeypot" : "demasiado rápido");
      return { ok: true };
    }

    const lead = { nombre: data.nombre, contacto_valor: data.contacto_valor };

    // 1) Guardar el lead en Supabase.
    const { error } = await supabase.from("leads").insert(lead);
    if (error) {
      console.error("[submitLead] Supabase insert error:", error.message);
      throw new Error("No se ha podido guardar la solicitud.");
    }

    // 2) Avisar a Make (Google Sheets + email). Si Make falla, el lead ya está en Supabase.
    const { makeWebhookUrl, makeWebhookToken } = getServerConfig();
    if (!makeWebhookUrl) {
      console.error("[submitLead] Falta la variable de entorno MAKE_WEBHOOK_URL");
    } else {
      try {
        const res = await fetch(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...lead,
            created_at: new Date().toISOString(),
            token: makeWebhookToken ?? "",
          }),
        });
        if (!res.ok) console.error("[submitLead] Make respondió", res.status);
      } catch (err) {
        console.error("[submitLead] Make webhook error:", err);
      }
    }

    return { ok: true };
  });
