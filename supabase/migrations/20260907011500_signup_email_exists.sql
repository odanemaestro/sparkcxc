-- SPARK V5.3.9J3
-- Reliable duplicate-email check for the public signup screen.
-- This intentionally exposes only a boolean existence result because SPARK's
-- signup UX explicitly tells a user when an email is already registered.

create or replace function public.spark_email_registered(p_email text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users u
    where pg_catalog.lower(u.email) = pg_catalog.lower(pg_catalog.btrim(p_email))
  );
$$;

revoke all on function public.spark_email_registered(text) from public;
grant execute on function public.spark_email_registered(text) to anon, authenticated;
