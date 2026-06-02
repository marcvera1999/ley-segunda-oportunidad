import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  nombre: z.string().trim().min(1).max(200),
  situacion: z.string().min(1).max(200),
  deuda_aproximada: z.string().min(1).max(100),
  contacto_tipo: z.enum(["telefono", "whatsapp", "email"]),
  contacto_valor: z.string().trim().min(3).max(300),
  mensaje: z.string().max(5000).nullable().optional(),
});

const MAX_PER_HOUR = 3;
const WINDOW_MS = 60 * 60 * 1000;

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/submit-lead")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        const ip = getClientIp(request);

        /*
        // Rate limit check — DESACTIVADO TEMPORALMENTE
        const sinceIso = new Date(Date.now() - WINDOW_MS).toISOString();
        const { count, error: countErr } = await supabaseAdmin
          .from("rate_limits")
          .select("id", { count: "exact", head: true })
          .eq("ip", ip)
          .eq("endpoint", "leads")
          .gte("created_at", sinceIso);

        if (countErr) {
          console.error("[submit-lead] rate count error:", countErr);
          return new Response(
            JSON.stringify({ error: "Internal error" }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }

        if ((count ?? 0) >= MAX_PER_HOUR) {
          return new Response(
            JSON.stringify({
              error: "Has enviado demasiadas solicitudes. Inténtalo más tarde o escríbenos por WhatsApp.",
            }),
            { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }
        */

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const parsed = LeadSchema.safeParse(payload);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: "Datos inválidos." }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }

        const lead = parsed.data;

        const { data: inserted, error: insertErr } = await supabaseAdmin
          .from("leads")
          .insert({
            nombre: lead.nombre,
            situacion: lead.situacion,
            deuda_aproximada: lead.deuda_aproximada,
            contacto_tipo: lead.contacto_tipo,
            contacto_valor: lead.contacto_valor,
            mensaje: lead.mensaje ?? null,
          })
          .select()
          .single();

        if (insertErr) {
          console.error("[submit-lead] insert error:", insertErr);
          return new Response(
            JSON.stringify({ error: "No hemos podido registrar tu consulta." }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }

        // Record the rate-limit hit (fire-and-forget)
        supabaseAdmin
          .from("rate_limits")
          .insert({ ip, endpoint: "leads" })
          .then(({ error }) => {
            if (error) console.error("[submit-lead] rate insert error:", error);
          });

        // Invoke notify-lead edge function (email + SMS) on the external Supabase project
        try {
          const EXT_URL = "https://jyzotpamjmffvjrxfjwf.supabase.co";
          const EXT_KEY = process.env.SERVICE_ROLE_KEY;
          if (EXT_KEY) {
            const res = await fetch(`${EXT_URL}/functions/v1/clever-endpoint`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${EXT_KEY}`,
                apikey: EXT_KEY,
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
              console.error("[submit-lead] notify-lead failed:", res.status, await res.text());
            }
          } else {
            console.warn("[submit-lead] SERVICE_ROLE_KEY not set; skipping notify-lead");
          }
        } catch (e) {
          console.error("[submit-lead] notify-lead invocation error:", e);
        }

        // Fire-and-forget: replicate the lead into the external Supabase project
        try {
          const EXT_URL = "https://jyzotpamjmffvjrxfjwf.supabase.co";
          const EXT_KEY = process.env.SERVICE_ROLE_KEY;
          if (EXT_KEY) {
            const extRes = await fetch(`${EXT_URL}/rest/v1/leads`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apikey: EXT_KEY,
                Authorization: `Bearer ${EXT_KEY}`,
                Prefer: "return=minimal",
              },
              body: JSON.stringify({
                nombre: lead.nombre,
                situacion: lead.situacion,
                deuda_aproximada: lead.deuda_aproximada,
                contacto_tipo: lead.contacto_tipo,
                contacto_valor: lead.contacto_valor,
                mensaje: lead.mensaje ?? null,
              }),
            });
            if (!extRes.ok) {
              console.error("[submit-lead] external supabase insert failed:", extRes.status, await extRes.text());
            }
          } else {
            console.warn("[submit-lead] SERVICE_ROLE_KEY not set; skipping external supabase insert");
          }
        } catch (e) {
          console.error("[submit-lead] external supabase insert error:", e);
        }

        // Fire-and-forget Make webhook
        try {
          await fetch("https://hook.eu1.make.com/s1xr4wtekgngfmq7dyr3wls27wkx1mhx", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...lead, created_at: new Date().toISOString() }),
          });
        } catch (e) {
          console.error("[submit-lead] make webhook error:", e);
        }

        return new Response(
          JSON.stringify({ ok: true, id: inserted?.id }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
        );
      },
    },
  },
});
