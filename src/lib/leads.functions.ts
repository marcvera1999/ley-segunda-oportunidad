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
    console.log("[submitLead] inserting lead:", { ...data, contacto_valor: "***" });
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
    console.log("[submitLead] inserted:", inserted?.id);
    return { ok: true, id: inserted?.id };
  });
