
-- Enable pg_net for async HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function: call the notify-lead Edge Function on every new lead
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM extensions.http_post(
    url := 'https://xxyivmzadabjdhyoreru.supabase.co/functions/v1/notify-lead',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'leads',
      'schema', 'public',
      'record', row_to_json(NEW),
      'old_record', NULL
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_lead_created_notify ON public.leads;
CREATE TRIGGER on_lead_created_notify
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.notify_new_lead();
