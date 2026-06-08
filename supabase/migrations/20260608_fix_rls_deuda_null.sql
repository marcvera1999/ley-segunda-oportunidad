-- Actualizar la política de RLS para permitir NULL en deuda_aproximada
DROP POLICY "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(nombre) BETWEEN 1 AND 200
  AND length(situacion) BETWEEN 1 AND 200
  AND (deuda_aproximada IS NULL OR length(deuda_aproximada) BETWEEN 1 AND 100)
  AND contacto_tipo IN ('telefono','whatsapp','email')
  AND length(contacto_valor) BETWEEN 1 AND 300
  AND (mensaje IS NULL OR length(mensaje) <= 5000)
);
