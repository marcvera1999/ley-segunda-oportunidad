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
    const { error } = await supabaseAdmin.from("leads").insert({
      nombre: data.nombre,
      situacion: data.situacion,
      deuda_aproximada: data.deuda_aproximada,
      contacto_tipo: data.contacto_tipo,
      contacto_valor: data.contacto_valor,
      mensaje: data.mensaje ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
