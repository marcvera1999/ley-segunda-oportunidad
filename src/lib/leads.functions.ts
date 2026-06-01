import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  nombre: z.string().trim().min(1).max(200),
  situacion: z.string().min(1).max(200),
  deuda_aproximada: z.string().min(1).max(100),
  contacto_tipo: z.enum(["telefono", "whatsapp", "email"]),
  contacto_valor: z.string().trim().min(3).max(300),
  mensaje: z.string().max(5000).optional().nullable(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { error, data: inserted } = await supabaseAdmin
      .from("leads")
      .insert({
        nombre: data.nombre,
        situacion: data.situacion,
        deuda_aproximada: data.deuda_aproximada,
        contacto_tipo: data.contacto_tipo,
        contacto_valor: data.contacto_valor,
        mensaje: data.mensaje ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error("[submitLead] Supabase insert failed:", JSON.stringify(error, null, 2));
      throw new Error(`Insert failed: ${error.message} (code: ${error.code})`);
    }

    // Fire-and-forget notification (don't fail the form if email/SMS fails)
    try {
      const SUPABASE_URL = process.env.SUPABASE_URL!;
      const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const res = await fetch(`${SUPABASE_URL}/functions/v1/clever-endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({
          type: "INSERT",
          table: "leads",
          schema: "public",
          record: inserted,
          old_record: null,
        }),
      });
      if (!res.ok) {
        console.error("[submitLead] notify-lead failed:", res.status, await res.text());
      }
    } catch (e) {
      console.error("[submitLead] notify-lead invocation error:", e);
    }

    return { ok: true, id: inserted?.id };
  });
