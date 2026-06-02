-- ============================================================
-- FASE 1 — SEGURIDAD  (tabla public.leads)
-- Proyecto EN USO por el formulario: jyzotpamjmffvjrxfjwf
-- Ejecutar en: Supabase → SQL Editor (con el proyecto correcto seleccionado)
--
-- Contexto: se ha comprobado que el rol `anon` (clave pública que viaja en el
-- JS del navegador) puede SELECT y DELETE sobre `leads`, no solo INSERT.
-- Eso expone nombres y teléfonos de clientes (RGPD) y permite que cualquiera
-- borre tus leads. Este script lo bloquea: anon SOLO puede INSERT.
-- ============================================================


-- ── TAREA 2 · Verificar y CORREGIR la RLS ───────────────────

-- (a) Diagnóstico: ver políticas actuales antes de tocar nada.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'leads';

-- (b) Activar Row Level Security.
alter table public.leads enable row level security;

-- (c) Quitar privilegios amplios del rol anónimo; dejar SOLO INSERT.
revoke all on public.leads from anon;
grant insert on public.leads to anon;

-- (d) Eliminar TODAS las políticas existentes (suelen ser permisivas).
do $$
declare pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'leads'
  loop
    execute format('drop policy %I on public.leads', pol.policyname);
  end loop;
end $$;

-- (e) Crear políticas mínimas:
--     - anon: solo puede INSERTAR (enviar el formulario)
--     - authenticated: solo puede LEER (tú, logueado en un panel)
create policy "leads_insert_anon"
  on public.leads for insert to anon
  with check (true);

create policy "leads_select_authenticated"
  on public.leads for select to authenticated
  using (true);

-- (f) Comprobación final: anon NO debe poder leer ni borrar.
--     Esta query debe devolver SOLO las dos políticas de arriba.
select policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename = 'leads';


-- ── TAREA 3 · Eliminar datos de prueba ──────────────────────
-- 1) Revisa primero qué hay (hay 5 filas a fecha de este script):
select created_at, nombre, contacto_valor, deuda_aproximada, estado
from public.leads
order by created_at;

-- 2) Borra SOLO las filas de prueba. AJUSTA la condición a tus datos reales.
--    Ejemplos típicos de filas de test:
-- delete from public.leads
-- where nombre ilike '%test%'
--    or nombre ilike '%prueba%'
--    or contacto_valor in ('+34600000000', '600000000', '000000000');


-- ── TAREA 4 · Rate limiting en servidor (barrera real) ──────
-- El límite en cliente (localStorage) ya está en ContactForm.tsx, pero es
-- fácil de saltar. La barrera de verdad va aquí. Dos opciones:
--
-- OPCIÓN RÁPIDA (recomendada): pasársela a Lovable con este prompt exacto:
--   "Add server-side rate limiting to the leads form: create a Supabase
--    Edge Function that receives the lead, reads the client IP from the
--    x-forwarded-for header, checks a `rate_limits` table (max 3 inserts per
--    IP per hour), inserts the lead with the service role, and rejects with
--    429 if the limit is exceeded. The browser form must call this Edge
--    Function instead of inserting directly with the anon key."
--
-- OPCIÓN MANUAL (tabla de apoyo si haces la Edge Function tú):
-- create table if not exists public.rate_limits (
--   ip text not null,
--   created_at timestamptz not null default now()
-- );
-- create index if not exists rate_limits_ip_time on public.rate_limits (ip, created_at);
-- -- En la Edge Function: contar filas de esa IP en la última hora; si >= 3, 429.
