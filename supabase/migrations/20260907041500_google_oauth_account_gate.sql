-- SPARK V5.3.9K7
-- Google OAuth account gate
--
-- Product rules:
--   * Google on Log in authenticates an established SPARK account.
--   * Google on Log in with a brand-new Google identity does NOT silently
--     become a Student. The user must explicitly confirm Student or choose
--     Student / Parent / Tutor.
--   * Google on Sign up honors the role selected before OAuth.
--   * Google on Sign up with an established SPARK account is rejected.
--   * A provisional Google account remains gated across refreshes/logouts
--     until account type is explicitly completed.
--
-- The OAuth attempt is created BEFORE redirect using server time. This avoids
-- relying on the browser clock to decide whether the returned Auth user is new.

create table if not exists public.spark_google_oauth_attempts (
  id uuid primary key default gen_random_uuid(),
  mode text not null check (mode in ('login', 'signup')),
  requested_role text null check (requested_role in ('student', 'parent', 'tutor')),
  created_at timestamptz not null default now(),
  consumed_at timestamptz null,
  resolved_user_id uuid null references auth.users(id) on delete set null
);

create index if not exists spark_google_oauth_attempts_created_at_idx
  on public.spark_google_oauth_attempts(created_at);

alter table public.spark_google_oauth_attempts enable row level security;

create table if not exists public.spark_google_pending_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text null,
  created_at timestamptz not null default now()
);

alter table public.spark_google_pending_accounts enable row level security;

-- These tables are intentionally inaccessible directly from the browser.
revoke all on table public.spark_google_oauth_attempts from public, anon, authenticated;
revoke all on table public.spark_google_pending_accounts from public, anon, authenticated;

-- Remove the timestamp-based K5/K6 role-finalization function. K7 replaces it
-- with a server-created OAuth attempt, which is stricter.
drop function if exists public.spark_finalize_google_oauth_intent(text, timestamptz);

create or replace function public.spark_begin_google_oauth_attempt(
  p_mode text,
  p_role text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if p_mode not in ('login', 'signup') then
    raise exception 'Unsupported OAuth mode';
  end if;

  if p_mode = 'signup' and p_role not in ('student', 'parent', 'tutor') then
    raise exception 'Choose a valid account type';
  end if;

  if p_mode = 'login' then
    p_role := null;
  end if;

  -- Small housekeeping pass. Consumed/abandoned attempts are not account data.
  delete from public.spark_google_oauth_attempts
   where created_at < now() - interval '1 day';

  insert into public.spark_google_oauth_attempts(mode, requested_role)
  values (p_mode, p_role)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.spark_begin_google_oauth_attempt(text, text) from public;
grant execute on function public.spark_begin_google_oauth_attempt(text, text) to anon, authenticated;

create or replace function public.spark_resolve_google_oauth_attempt(
  p_attempt_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_attempt public.spark_google_oauth_attempts%rowtype;
  v_user_created_at timestamptz;
  v_email text;
  v_identity_count integer := 0;
  v_google_identity_count integer := 0;
  v_profile_role text;
  v_pending boolean := false;
  v_new_from_this_attempt boolean := false;
  v_updated integer := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  select *
    into v_attempt
  from public.spark_google_oauth_attempts
  where id = p_attempt_id
    and consumed_at is null
    and created_at >= now() - interval '20 minutes'
  for update;

  if v_attempt.id is null then
    raise exception 'Google sign-in attempt expired';
  end if;

  select u.created_at, u.email
    into v_user_created_at, v_email
  from auth.users u
  where u.id = v_user_id;

  if v_user_created_at is null then
    raise exception 'Authenticated user not found';
  end if;

  select
    count(*)::integer,
    count(*) filter (where i.provider = 'google')::integer
    into v_identity_count, v_google_identity_count
  from auth.identities i
  where i.user_id = v_user_id;

  if v_google_identity_count < 1 then
    raise exception 'Google identity required';
  end if;

  select exists(
    select 1
    from public.spark_google_pending_accounts p
    where p.user_id = v_user_id
  ) into v_pending;

  -- Server time is authoritative. An established account necessarily predates
  -- the attempt created immediately before redirect. A new OAuth user is
  -- created after that attempt.
  v_new_from_this_attempt :=
    v_user_created_at >= v_attempt.created_at
    and v_user_created_at <= now()
    and v_identity_count = 1
    and v_google_identity_count = 1;

  select p.role
    into v_profile_role
  from public.profiles p
  where p.id = v_user_id;

  update public.spark_google_oauth_attempts
     set consumed_at = now(),
         resolved_user_id = v_user_id
   where id = v_attempt.id;

  if v_attempt.mode = 'signup' then
    -- A provisional account produced by a previous Google-login attempt has
    -- never had an account type confirmed. It may be completed from Sign up.
    if v_pending then
      update public.profiles
         set role = v_attempt.requested_role
       where id = v_user_id;
      get diagnostics v_updated = row_count;
      if v_updated <> 1 then
        raise exception 'SPARK profile is not ready';
      end if;

      delete from public.spark_google_pending_accounts
       where user_id = v_user_id;

      return jsonb_build_object(
        'status', 'signup_created',
        'role', v_attempt.requested_role,
        'email', v_email,
        'resumed_pending', true
      );
    end if;

    if not v_new_from_this_attempt then
      return jsonb_build_object(
        'status', 'existing_signup',
        'role', v_profile_role,
        'email', v_email
      );
    end if;

    update public.profiles
       set role = v_attempt.requested_role
     where id = v_user_id;
    get diagnostics v_updated = row_count;

    if v_updated <> 1 then
      raise exception 'SPARK profile is not ready';
    end if;

    return jsonb_build_object(
      'status', 'signup_created',
      'role', v_attempt.requested_role,
      'email', v_email,
      'resumed_pending', false
    );
  end if;

  -- LOGIN
  -- Previously provisional Google account: keep asking for explicit setup.
  if v_pending then
    return jsonb_build_object(
      'status', 'login_needs_setup',
      'email', v_email
    );
  end if;

  -- First-ever Google authentication started from Log in. Supabase has created
  -- an Auth user, but SPARK deliberately withholds portal access until the user
  -- confirms Student or chooses another account type.
  if v_new_from_this_attempt then
    insert into public.spark_google_pending_accounts(user_id, email)
    values (v_user_id, v_email)
    on conflict (user_id) do update
      set email = excluded.email;

    return jsonb_build_object(
      'status', 'login_needs_setup',
      'email', v_email
    );
  end if;

  return jsonb_build_object(
    'status', 'login_existing',
    'role', v_profile_role,
    'email', v_email
  );
end;
$$;

revoke all on function public.spark_resolve_google_oauth_attempt(uuid) from public;
grant execute on function public.spark_resolve_google_oauth_attempt(uuid) to authenticated;

create or replace function public.spark_google_pending_account_status()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  select p.email
    into v_email
  from public.spark_google_pending_accounts p
  where p.user_id = v_user_id;

  if not found then
    return jsonb_build_object('pending', false);
  end if;

  return jsonb_build_object(
    'pending', true,
    'email', v_email
  );
end;
$$;

revoke all on function public.spark_google_pending_account_status() from public;
grant execute on function public.spark_google_pending_account_status() to authenticated;

create or replace function public.spark_complete_google_pending_account(
  p_role text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text;
  v_updated integer := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_role not in ('student', 'parent', 'tutor') then
    raise exception 'Choose a valid account type';
  end if;

  select p.email
    into v_email
  from public.spark_google_pending_accounts p
  where p.user_id = v_user_id
  for update;

  if not found then
    raise exception 'No Google account setup is pending';
  end if;

  update public.profiles
     set role = p_role
   where id = v_user_id;
  get diagnostics v_updated = row_count;

  if v_updated <> 1 then
    raise exception 'SPARK profile is not ready';
  end if;

  delete from public.spark_google_pending_accounts
   where user_id = v_user_id;

  return jsonb_build_object(
    'completed', true,
    'role', p_role,
    'email', v_email
  );
end;
$$;

revoke all on function public.spark_complete_google_pending_account(text) from public;
grant execute on function public.spark_complete_google_pending_account(text) to authenticated;
