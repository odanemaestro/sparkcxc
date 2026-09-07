-- SPARK V5.3.9K5
-- Finalize a Google OAuth signup role only for an account created by the
-- current OAuth attempt. Existing accounts keep their established SPARK role.

create or replace function public.spark_finalize_google_oauth_intent(
  p_role text,
  p_started_at timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_user_created_at timestamptz;
  v_identity_count integer := 0;
  v_google_identity_count integer := 0;
  v_profile_role text;
  v_is_new_google_account boolean := false;
  v_updated integer := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_role not in ('student', 'parent', 'tutor') then
    raise exception 'Unsupported account role';
  end if;

  if p_started_at is null
     or p_started_at < now() - interval '20 minutes'
     or p_started_at > now() + interval '2 minutes' then
    raise exception 'OAuth intent expired';
  end if;

  select u.created_at
    into v_user_created_at
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

  v_is_new_google_account :=
    v_user_created_at >= p_started_at - interval '2 minutes'
    and v_user_created_at <= now() + interval '2 minutes'
    and v_identity_count = 1
    and v_google_identity_count = 1;

  select p.role
    into v_profile_role
  from public.profiles p
  where p.id = v_user_id;

  if v_is_new_google_account then
    update public.profiles
       set role = p_role
     where id = v_user_id;

    get diagnostics v_updated = row_count;

    if v_updated <> 1 then
      raise exception 'SPARK profile is not ready';
    end if;

    v_profile_role := p_role;
  end if;

  return jsonb_build_object(
    'user_id', v_user_id,
    'new_google_account', v_is_new_google_account,
    'role_applied', v_is_new_google_account,
    'role', v_profile_role
  );
end;
$$;

revoke all on function public.spark_finalize_google_oauth_intent(text,timestamptz) from public;
grant execute on function public.spark_finalize_google_oauth_intent(text,timestamptz) to authenticated;
