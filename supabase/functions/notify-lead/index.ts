// Supabase Edge Function: notify-lead
// Triggered by a database webhook on INSERT into public.leads.
// Sends an email via Resend and an SMS via Twilio.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Lead {
  id: string;
  nombre: string;
  situacion: string;
  deuda_aproximada: string;
  contacto_tipo: string;
  contacto_valor: string;
  mensaje: string | null;
  created_at: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Lead;
  schema: string;
  old_record: null | Lead;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: WebhookPayload = await req.json();
    const lead = payload.record;

    if (!lead) {
      return new Response(JSON.stringify({ error: "No record in payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: Record<string, unknown> = {};

    // --- Email via Resend ---
    // DESACTIVADO: el email de aviso lo envía Make (Gmail). Mantener este envío
    // provocaba dos correos por cada lead. Pon EMAIL_VIA_RESEND_ENABLED = true
    // para reactivarlo si algún día Make deja de enviar el email.
    const EMAIL_VIA_RESEND_ENABLED = false;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!EMAIL_VIA_RESEND_ENABLED) {
      console.log("notify-lead: email por Resend deshabilitado (lo envía Make).");
    } else if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
    } else {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a2942;">
          <h2 style="color: #1a2942; border-bottom: 2px solid #c9a84c; padding-bottom: 10px;">
            🔔 Nueva consulta – Horizonte Legal
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Nombre:</td><td>${escapeHtml(lead.nombre)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Situación:</td><td>${escapeHtml(lead.situacion)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Deuda aproximada:</td><td>${escapeHtml(lead.deuda_aproximada)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Método de contacto:</td><td>${escapeHtml(lead.contacto_tipo)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Contacto:</td><td>${escapeHtml(lead.contacto_valor)}</td></tr>
            ${lead.mensaje ? `<tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Mensaje:</td><td>${escapeHtml(lead.mensaje).replace(/\n/g, "<br>")}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: bold;">Recibido:</td><td>${new Date(lead.created_at).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</td></tr>
          </table>
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            Contacta al cliente en menos de 24 horas para maximizar la conversión.
          </p>
        </div>
      `;

      const emailBody: Record<string, unknown> = {
        from: "Horizonte Legal <onboarding@resend.dev>",
        to: ["marcshtsht@gmail.com"],
        subject: "🔔 Nueva consulta – Horizonte Legal",
        html,
      };
      if (lead.contacto_tipo === "email" && lead.contacto_valor) {
        emailBody.reply_to = lead.contacto_valor;
      }

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
      });
      const emailData = await emailRes.json();
      results.email = { status: emailRes.status, data: emailData };
      if (!emailRes.ok) console.error("Resend error:", emailData);
    }

    // --- SMS via Twilio ---
    const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
    const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
    const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER") ?? "+34625349097";

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      console.error("Missing Twilio credentials");
    } else {
      const smsBody = `🔔 Nueva consulta Horizonte Legal
Nombre: ${lead.nombre}
Situación: ${lead.situacion}
Deuda: ${lead.deuda_aproximada}
Contacto: ${lead.contacto_tipo} ${lead.contacto_valor}`;

      const twilioRes = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: "+34625349097",
            From: TWILIO_PHONE_NUMBER,
            Body: smsBody,
          }),
        },
      );
      const twilioData = await twilioRes.json();
      results.sms = { status: twilioRes.status, data: twilioData };
      if (!twilioRes.ok) console.error("Twilio error:", twilioData);
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-lead error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
