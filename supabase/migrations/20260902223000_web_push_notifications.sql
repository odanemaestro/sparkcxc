-- SPARK Web Push notifications
-- Adds opt-in notification preferences and per-device Web Push subscriptions.
-- Push delivery itself is performed by the send-push Supabase Edge Function.

create table if not exists public.notification_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  push_enabled boolean not null default false,
  show_push_previews boolean not null default true,
  booking_updates boolean not null default true,
  exam_results boolean not null default true,
  learning_progress boolean not null default true,
  family_updates boolean not null default true,
  tutor_updates boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.notification_preferences add column if not exists push_enabled boolean not null default false;
alter table public.notification_preferences add column if not exists show_push_previews boolean not null default true;
alter table public.notification_preferences add column if not exists booking_updates boolean not null default true;
alter table public.notification_preferences add column if not exists exam_results boolean not null default true;
alter table public.notification_preferences add column if not exists learning_progress boolean not null default true;
alter table public.notification_preferences add column if not exists family_updates boolean not null default true;
alter table public.notification_preferences add column if not exists tutor_updates boolean not null default true;
alter table public.notification_preferences add column if not exists created_at timestamptz not null default now();
alter table public.notification_preferences add column if not exists updated_at timestamptz not null default now();

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  expiration_time bigint,
  user_agent text,
  platform text,
  is_active boolean not null default true,
  last_seen_at timestamptz not null default now(),
  last_success_at timestamptz,
  last_failure_at timestamptz,
  failure_count integer not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.push_subscriptions add column if not exists user_id uuid references public.profiles(id) on delete cascade;
alter table public.push_subscriptions add column if not exists endpoint text;
alter table public.push_subscriptions add column if not exists p256dh text;
alter table public.push_subscriptions add column if not exists auth text;
alter table public.push_subscriptions add column if not exists expiration_time bigint;
alter table public.push_subscriptions add column if not exists user_agent text;
alter table public.push_subscriptions add column if not exists platform text;
alter table public.push_subscriptions add column if not exists is_active boolean not null default true;
alter table public.push_subscriptions add column if not exists last_seen_at timestamptz not null default now();
alter table public.push_subscriptions add column if not exists last_success_at timestamptz;
alter table public.push_subscriptions add column if not exists last_failure_at timestamptz;
alter table public.push_subscriptions add column if not exists failure_count integer not null default 0;
alter table public.push_subscriptions add column if not exists last_error text;
alter table public.push_subscriptions add column if not exists created_at timestamptz not null default now();
alter table public.push_subscriptions add column if not exists updated_at timestamptz not null default now();

create unique index if not exists push_subscriptions_endpoint_uidx
  on public.push_subscriptions(endpoint);
create index if not exists push_subscriptions_user_active_idx
  on public.push_subscriptions(user_id, is_active, updated_at desc);

create or replace function public.spark_touch_push_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists spark_notification_preferences_updated_at_trg on public.notification_preferences;
create trigger spark_notification_preferences_updated_at_trg
before update on public.notification_preferences
for each row execute function public.spark_touch_push_updated_at();

drop trigger if exists spark_push_subscriptions_updated_at_trg on public.push_subscriptions;
create trigger spark_push_subscriptions_updated_at_trg
before update on public.push_subscriptions
for each row execute function public.spark_touch_push_updated_at();

alter table public.notification_preferences enable row level security;
alter table public.push_subscriptions enable row level security;

drop policy if exists "Users read own notification preferences" on public.notification_preferences;
create policy "Users read own notification preferences"
on public.notification_preferences for select
using (user_id = auth.uid());

drop policy if exists "Users create own notification preferences" on public.notification_preferences;
create policy "Users create own notification preferences"
on public.notification_preferences for insert
with check (user_id = auth.uid());

drop policy if exists "Users update own notification preferences" on public.notification_preferences;
create policy "Users update own notification preferences"
on public.notification_preferences for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users read own push devices" on public.push_subscriptions;
create policy "Users read own push devices"
on public.push_subscriptions for select
using (user_id = auth.uid());

drop policy if exists "Users delete own push devices" on public.push_subscriptions;
create policy "Users delete own push devices"
on public.push_subscriptions for delete
using (user_id = auth.uid());

revoke all on public.notification_preferences from anon;
revoke all on public.push_subscriptions from anon;
grant select, insert, update on public.notification_preferences to authenticated;
grant select, delete on public.push_subscriptions to authenticated;

-- Register or move a browser subscription to the currently authenticated user.
-- The endpoint is unique to a browser/service-worker subscription. A security
-- definer RPC is used so a shared device can safely move the endpoint from a
-- previously logged-in account after that account has been detached on logout.
create or replace function public.spark_register_push_subscription(
  p_endpoint text,
  p_p256dh text,
  p_auth text,
  p_expiration_time bigint default null,
  p_user_agent text default null,
  p_platform text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_id uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;
  if p_endpoint is null or p_endpoint !~ '^https://' then
    raise exception 'Invalid push endpoint';
  end if;
  if p_p256dh is null or length(p_p256dh) < 20 or p_auth is null or length(p_auth) < 8 then
    raise exception 'Invalid push subscription keys';
  end if;

  insert into public.push_subscriptions (
    user_id, endpoint, p256dh, auth, expiration_time,
    user_agent, platform, is_active, last_seen_at,
    failure_count, last_error
  ) values (
    v_user_id, left(p_endpoint, 4096), p_p256dh, p_auth, p_expiration_time,
    left(coalesce(p_user_agent, ''), 500), left(coalesce(p_platform, ''), 80),
    true, now(), 0, null
  )
  on conflict (endpoint) do update set
    user_id = excluded.user_id,
    p256dh = excluded.p256dh,
    auth = excluded.auth,
    expiration_time = excluded.expiration_time,
    user_agent = excluded.user_agent,
    platform = excluded.platform,
    is_active = true,
    last_seen_at = now(),
    failure_count = 0,
    last_error = null,
    updated_at = now()
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.spark_register_push_subscription(text,text,text,bigint,text,text) from public;
grant execute on function public.spark_register_push_subscription(text,text,text,bigint,text,text) to authenticated;

-- Detach the current browser endpoint from the signed-in account. The browser
-- subscription can remain alive so the same user can be re-associated on a
-- later login without asking for notification permission again.
create or replace function public.spark_unregister_push_subscription(p_endpoint text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_count integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;
  delete from public.push_subscriptions
  where user_id = v_user_id and endpoint = p_endpoint;
  get diagnostics v_count = row_count;
  return v_count > 0;
end;
$$;

revoke all on function public.spark_unregister_push_subscription(text) from public;
grant execute on function public.spark_unregister_push_subscription(text) to authenticated;

-- Turn push off for the whole account and deactivate every saved device. Browser
-- subscriptions remain under browser control, but no server delivery occurs until
-- the user explicitly enables a device again.
create or replace function public.spark_disable_push_for_account()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  insert into public.notification_preferences (user_id, push_enabled)
  values (v_user_id, false)
  on conflict (user_id) do update set
    push_enabled = false,
    updated_at = now();

  update public.push_subscriptions
  set is_active = false,
      updated_at = now()
  where user_id = v_user_id;

  return true;
end;
$$;

revoke all on function public.spark_disable_push_for_account() from public;
grant execute on function public.spark_disable_push_for_account() to authenticated;

-- Create in-app reminders for confirmed sessions about 30 minutes before
-- their start time. Supabase Cron can call this function every five minutes.
-- The dedupe keys make repeated cron runs safe.
create or replace function public.spark_create_session_reminders()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_scanned integer := 0;
begin
  for r in
    select
      b.id,
      b.student_id,
      b.tutor_id,
      b.subject,
      b.session_date,
      b.start_time,
      t.user_id as tutor_user_id,
      coalesce(t.name, 'your tutor') as tutor_name,
      coalesce(p.name, 'your student') as student_name,
      ((b.session_date::timestamp + coalesce(b.start_time, '00:00:00')::time) at time zone 'America/Jamaica') as session_at
    from public.bookings b
    join public.tutors t on t.id = b.tutor_id
    left join public.profiles p on p.id = b.student_id
    where b.status = 'confirmed'
      and b.completed_at is null
      and ((b.session_date::timestamp + coalesce(b.start_time, '00:00:00')::time) at time zone 'America/Jamaica')
          between now() + interval '25 minutes' and now() + interval '35 minutes'
  loop
    perform public.spark_create_notification(
      r.student_id,
      'session_reminder',
      'Session starts soon',
      format('Your %s session with %s starts at %s.', coalesce(r.subject, 'tutoring'), r.tutor_name, to_char(r.start_time, 'HH12:MI AM')),
      'dashboard', 'View booking', r.id, null, r.student_id,
      jsonb_build_object('session_date', r.session_date, 'start_time', r.start_time, 'subject', r.subject),
      'booking:' || r.id::text || ':reminder-student'
    );

    perform public.spark_create_notification(
      r.tutor_user_id,
      'session_reminder',
      'Session starts soon',
      format('Your %s session with %s starts at %s.', coalesce(r.subject, 'tutoring'), r.student_name, to_char(r.start_time, 'HH12:MI AM')),
      'dashboard', 'View booking', r.id, r.tutor_id, null,
      jsonb_build_object('session_date', r.session_date, 'start_time', r.start_time, 'subject', r.subject),
      'booking:' || r.id::text || ':reminder-tutor'
    );

    v_scanned := v_scanned + 1;
  end loop;

  return v_scanned;
end;
$$;

revoke all on function public.spark_create_session_reminders() from public, anon, authenticated;

comment on table public.notification_preferences is
  'Per-account opt-in and category preferences for SPARK Web Push.';
comment on table public.push_subscriptions is
  'Per-device Web Push subscriptions. Readable only by the owner; server delivery uses the Edge Function service key.';
