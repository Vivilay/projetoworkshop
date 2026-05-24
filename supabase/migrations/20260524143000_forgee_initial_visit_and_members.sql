-- FORGEE — schema inicial (site + dashboard)
-- Políticas abertas para anon/authenticated até habilitar auth no dashboard.
-- Re-aplicável no SQL Editor: remova antes policies com o mesmo nome se necessário.
-- Postgres 13+: gen_random_uuid() nativo — sem extensão extra.

-- Tipos de negócio (planos da landing)
do $$
begin
  if not exists (select 1 from pg_type where typname = 'member_plan_code') then
    create type public.member_plan_code as enum ('LIVRE', 'PLUS', 'ELITE');
  end if;
  if not exists (select 1 from pg_type where typname = 'member_status') then
    create type public.member_status as enum ('prospect', 'ativo', 'pausado', 'cancelado');
  end if;
end $$;

create table if not exists public.visit_bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (length(trim(full_name)) > 0),
  email text not null check (
    position('@'::text in email) > 1
    and position('.'::text in substr(email, position('@'::text in email))) > 1
    and length(trim(email)) <= 254
  ),
  phone text,
  preferred_at timestamptz,
  notes text,
  source text not null default 'site_cta_visita_gratuita',
  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table public.visit_bookings is 'Solicitações de visita gratuita e leads do marketing (inputs do site).';

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  cref text,
  plan_code public.member_plan_code not null default 'LIVRE',
  status public.member_status not null default 'prospect',
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint members_email_ck check (
    email is null
    or (
      position('@'::text in email) > 1
      and position('.'::text in substr(email, position('@'::text in email))) > 1
      and length(trim(email)) <= 254
    )
  )
);

comment on table public.members is 'Membros / alunos (módulos Membros, agenda e financeiro).';

create or replace function public.set_members_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists trg_members_updated_at on public.members;
create trigger trg_members_updated_at
before update on public.members
for each row
execute function public.set_members_updated_at();

alter table public.visit_bookings enable row level security;
alter table public.members enable row level security;

drop policy if exists visit_bookings_allow_all_pref_auth on public.visit_bookings;
create policy visit_bookings_allow_all_pref_auth
  on public.visit_bookings
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists members_allow_all_pref_auth on public.members;
create policy members_allow_all_pref_auth
  on public.members
  for all
  to anon, authenticated
  using (true)
  with check (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.visit_bookings to anon, authenticated;
grant select, insert, update, delete on table public.members to anon, authenticated;
