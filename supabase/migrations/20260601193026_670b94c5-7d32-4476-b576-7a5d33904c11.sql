DROP TRIGGER IF EXISTS on_lead_created_notify ON public.leads;
DROP FUNCTION IF EXISTS public.notify_new_lead();