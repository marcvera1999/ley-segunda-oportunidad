-- Permitir NULL en deuda_aproximada para soportar consultas sin monto especificado
ALTER TABLE public.leads ALTER COLUMN deuda_aproximada DROP NOT NULL;
