-- Explicitly deny public SELECT on leads. RLS is already enabled and there is no
-- SELECT policy, so reads are already denied; this adds an explicit restrictive
-- policy to make the intent unambiguous and satisfy security scanners.
-- Lead data is read server-side via the service role (supabaseAdmin), which bypasses RLS.

REVOKE SELECT ON public.leads FROM anon, authenticated;

CREATE POLICY "Deny public read access to leads"
ON public.leads
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);