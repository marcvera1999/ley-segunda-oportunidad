
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  situacion TEXT NOT NULL,
  deuda_aproximada TEXT NOT NULL,
  contacto_tipo TEXT NOT NULL,
  contacto_valor TEXT NOT NULL,
  mensaje TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(nombre) BETWEEN 1 AND 200
  AND length(situacion) BETWEEN 1 AND 200
  AND length(deuda_aproximada) BETWEEN 1 AND 100
  AND contacto_tipo IN ('telefono','whatsapp','email')
  AND length(contacto_valor) BETWEEN 1 AND 300
  AND (mensaje IS NULL OR length(mensaje) <= 5000)
);
