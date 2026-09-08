-- SPARK V5.3.10
-- Learning intelligence, spaced-repetition flashcards, student-owned goals,
-- parent goal suggestions, and progress-report email audit/rate limiting.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Flashcard spaced repetition
-- ---------------------------------------------------------------------------
create table if not exists public.spark_flashcard_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  repetitions integer not null default 0 check (repetitions >= 0),
  interval_days integer not null default 0 check (interval_days >= 0),
  ease_factor numeric(4,2) not null default 2.50 check (ease_factor >= 1.30 and ease_factor <= 4.00),
  last_rating text check (last_rating is null or last_rating in ('again','hard','got_it','easy')),
  last_reviewed_at timestamptz,
  next_review_at timestamptz,
  review_count integer not null default 0 check (review_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id),
  check (char_length(card_id) between 1 and 64)
);

create index if not exists spark_flashcard_progress_due_idx
  on public.spark_flashcard_progress(user_id, next_review_at);

alter table public.spark_flashcard_progress enable row level security;
revoke all on public.spark_flashcard_progress from anon;
revoke insert, update, delete on public.spark_flashcard_progress from authenticated;
grant select on public.spark_flashcard_progress to authenticated;

drop policy if exists "Students manage own flashcard progress" on public.spark_flashcard_progress;
drop policy if exists "Students view own flashcard progress" on public.spark_flashcard_progress;
create policy "Students view own flashcard progress"
on public.spark_flashcard_progress
for select
to authenticated
using (
  auth.uid() = user_id
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student')
);

drop policy if exists "Parents view linked child flashcard progress" on public.spark_flashcard_progress;
create policy "Parents view linked child flashcard progress"
on public.spark_flashcard_progress
for select
to authenticated
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
  and exists (
    select 1
    from public.parent_student_links psl
    where psl.parent_id = auth.uid()
      and psl.student_id = spark_flashcard_progress.user_id
      and psl.status = 'approved'
  )
);

-- Immutable review events make weekly/monthly report counts accurate. The
-- progress table holds current scheduling state, while this table holds history.
create table if not exists public.spark_flashcard_review_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null check (char_length(card_id) between 1 and 64),
  rating text not null check (rating in ('again','hard','got_it','easy')),
  reviewed_at timestamptz not null default now()
);

create index if not exists spark_flashcard_review_events_user_date_idx
  on public.spark_flashcard_review_events(user_id, reviewed_at desc);

alter table public.spark_flashcard_review_events enable row level security;
revoke all on public.spark_flashcard_review_events from anon;
revoke insert, update, delete on public.spark_flashcard_review_events from authenticated;
grant select on public.spark_flashcard_review_events to authenticated;

drop policy if exists "Students view own flashcard review events" on public.spark_flashcard_review_events;
drop policy if exists "Parents view linked child flashcard review events" on public.spark_flashcard_review_events;

create policy "Students view own flashcard review events"
on public.spark_flashcard_review_events
for select
to authenticated
using (
  auth.uid() = user_id
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student')
);

create policy "Parents view linked child flashcard review events"
on public.spark_flashcard_review_events
for select
to authenticated
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
  and exists (
    select 1
    from public.parent_student_links psl
    where psl.parent_id = auth.uid()
      and psl.student_id = spark_flashcard_review_events.user_id
      and psl.status = 'approved'
  )
);

create or replace function public.spark_record_flashcard_review(
  p_card_id text,
  p_rating text,
  p_repetitions integer,
  p_interval_days integer,
  p_ease_factor numeric,
  p_next_review_at timestamptz
)
returns public.spark_flashcard_progress
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_row public.spark_flashcard_progress;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;
  if not exists (select 1 from public.profiles p where p.id = v_user_id and p.role = 'student') then
    raise exception 'Only Student accounts can review flashcards';
  end if;
  if p_card_id is null or char_length(trim(p_card_id)) not between 1 and 64 then
    raise exception 'Invalid flashcard id';
  end if;
  if p_rating not in ('again','hard','got_it','easy') then
    raise exception 'Invalid flashcard rating';
  end if;
  if p_repetitions < 0 or p_repetitions > 10000 then
    raise exception 'Invalid repetition count';
  end if;
  if p_interval_days < 0 or p_interval_days > 36500 then
    raise exception 'Invalid review interval';
  end if;
  if p_ease_factor < 1.30 or p_ease_factor > 4.00 then
    raise exception 'Invalid ease factor';
  end if;
  if p_next_review_at is null then
    raise exception 'Next review time is required';
  end if;

  insert into public.spark_flashcard_progress (
    user_id, card_id, repetitions, interval_days, ease_factor, last_rating,
    last_reviewed_at, next_review_at, review_count, updated_at
  ) values (
    v_user_id, trim(p_card_id), p_repetitions, p_interval_days, p_ease_factor,
    p_rating, now(), p_next_review_at, 1, now()
  )
  on conflict (user_id, card_id) do update set
    repetitions = excluded.repetitions,
    interval_days = excluded.interval_days,
    ease_factor = excluded.ease_factor,
    last_rating = excluded.last_rating,
    last_reviewed_at = now(),
    next_review_at = excluded.next_review_at,
    review_count = public.spark_flashcard_progress.review_count + 1,
    updated_at = now()
  returning * into v_row;

  insert into public.spark_flashcard_review_events(user_id, card_id, rating, reviewed_at)
  values (v_user_id, trim(p_card_id), p_rating, now());

  return v_row;
end;
$$;

revoke all on function public.spark_record_flashcard_review(text,text,integer,integer,numeric,timestamptz) from public, anon;
grant execute on function public.spark_record_flashcard_review(text,text,integer,integer,numeric,timestamptz) to authenticated;

-- ---------------------------------------------------------------------------
-- Student-owned goals
-- ---------------------------------------------------------------------------
create table if not exists public.spark_student_goals (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 160),
  target_percent integer not null check (target_percent between 1 and 100),
  target_date date,
  status text not null default 'active' check (status in ('active','completed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists spark_student_goals_one_active_idx
  on public.spark_student_goals(student_id)
  where status = 'active';

alter table public.spark_student_goals enable row level security;
revoke all on public.spark_student_goals from anon;
grant select, insert, update, delete on public.spark_student_goals to authenticated;

drop policy if exists "Students manage own goals" on public.spark_student_goals;
create policy "Students manage own goals"
on public.spark_student_goals
for all
to authenticated
using (
  auth.uid() = student_id
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student')
)
with check (
  auth.uid() = student_id
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student')
);

drop policy if exists "Parents view linked child goals" on public.spark_student_goals;
create policy "Parents view linked child goals"
on public.spark_student_goals
for select
to authenticated
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
  and exists (
    select 1
    from public.parent_student_links psl
    where psl.parent_id = auth.uid()
      and psl.student_id = spark_student_goals.student_id
      and psl.status = 'approved'
  )
);

-- Parent suggestions are intentionally non-binding. Direct writes are revoked;
-- vetted RPCs below enforce role, approved family linkage and immutable identity.
create table if not exists public.spark_goal_suggestions (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  target_percent integer not null check (target_percent between 1 and 100),
  target_date date,
  message text check (message is null or char_length(message) <= 240),
  status text not null default 'pending' check (status in ('pending','accepted','declined','withdrawn')),
  created_at timestamptz not null default now(),
  responded_at timestamptz
);

create index if not exists spark_goal_suggestions_student_idx
  on public.spark_goal_suggestions(student_id, status, created_at desc);
create index if not exists spark_goal_suggestions_parent_idx
  on public.spark_goal_suggestions(parent_id, status, created_at desc);

alter table public.spark_goal_suggestions enable row level security;
revoke all on public.spark_goal_suggestions from anon;
revoke insert, update, delete on public.spark_goal_suggestions from authenticated;
grant select on public.spark_goal_suggestions to authenticated;

drop policy if exists "Parents suggest goals to linked children" on public.spark_goal_suggestions;
drop policy if exists "Parents view own goal suggestions" on public.spark_goal_suggestions;
drop policy if exists "Parents withdraw own pending goal suggestions" on public.spark_goal_suggestions;
drop policy if exists "Students view own goal suggestions" on public.spark_goal_suggestions;
drop policy if exists "Students respond to own goal suggestions" on public.spark_goal_suggestions;

create policy "Parents view own goal suggestions"
on public.spark_goal_suggestions
for select
to authenticated
using (
  parent_id = auth.uid()
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
);

create policy "Students view own goal suggestions"
on public.spark_goal_suggestions
for select
to authenticated
using (
  student_id = auth.uid()
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student')
);

create or replace function public.spark_suggest_goal(
  p_student_id uuid,
  p_target_percent integer,
  p_target_date date default null,
  p_message text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_parent_id uuid := auth.uid();
  v_id uuid;
  v_parent_name text;
  v_message text := nullif(trim(coalesce(p_message, '')), '');
begin
  if v_parent_id is null then
    raise exception 'Authentication required';
  end if;
  if not exists (select 1 from public.profiles where id = v_parent_id and role = 'parent') then
    raise exception 'Only Parent accounts can suggest goals';
  end if;
  if not exists (
    select 1 from public.parent_student_links
    where parent_id = v_parent_id and student_id = p_student_id and status = 'approved'
  ) then
    raise exception 'Approved parent-child connection required';
  end if;
  if not exists (select 1 from public.profiles where id = p_student_id and role = 'student') then
    raise exception 'Goal suggestions can only be sent to Student accounts';
  end if;
  if p_target_percent is null or p_target_percent not between 1 and 100 then
    raise exception 'Target percentage must be between 1 and 100';
  end if;
  if p_target_date is not null and p_target_date < current_date then
    raise exception 'Target date cannot be in the past';
  end if;
  if v_message is not null and char_length(v_message) > 240 then
    raise exception 'Goal message is too long';
  end if;

  -- Keep the experience simple: a new suggestion from the same parent replaces
  -- their older pending suggestion for this child rather than stacking prompts.
  update public.spark_goal_suggestions
  set status = 'withdrawn', responded_at = now()
  where parent_id = v_parent_id and student_id = p_student_id and status = 'pending';

  insert into public.spark_goal_suggestions(
    parent_id, student_id, target_percent, target_date, message, status
  ) values (
    v_parent_id, p_student_id, p_target_percent, p_target_date, v_message, 'pending'
  ) returning id into v_id;

  select coalesce(name, 'Your parent or guardian') into v_parent_name
  from public.profiles where id = v_parent_id;

  perform public.spark_create_notification(
    p_student_id,
    'goal_suggested',
    'New learning goal suggestion',
    coalesce(v_parent_name, 'Your parent or guardian') || ' suggested a ' || p_target_percent::text || '% Mathematics goal. You decide whether to accept it.',
    'dashboard',
    'View goal',
    null,
    null,
    p_student_id,
    jsonb_build_object('suggestion_id', v_id, 'student_id', p_student_id, 'target_percent', p_target_percent),
    'goal-suggested:' || v_id::text
  );

  return v_id;
end;
$$;

revoke all on function public.spark_suggest_goal(uuid,integer,date,text) from public, anon;
grant execute on function public.spark_suggest_goal(uuid,integer,date,text) to authenticated;

create or replace function public.spark_respond_goal_suggestion(
  p_suggestion_id uuid,
  p_status text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_id uuid := auth.uid();
  v_suggestion public.spark_goal_suggestions%rowtype;
  v_goal_id uuid;
  v_existing_goal_id uuid;
  v_student_name text;
begin
  if v_student_id is null then
    raise exception 'Authentication required';
  end if;
  if not exists (select 1 from public.profiles where id = v_student_id and role = 'student') then
    raise exception 'Only Student accounts can respond to goal suggestions';
  end if;
  if p_status not in ('accepted','declined') then
    raise exception 'Response must be accepted or declined';
  end if;

  select * into v_suggestion
  from public.spark_goal_suggestions
  where id = p_suggestion_id
  for update;

  if v_suggestion.id is null or v_suggestion.student_id <> v_student_id then
    raise exception 'Goal suggestion not found';
  end if;
  if v_suggestion.status <> 'pending' then
    raise exception 'This goal suggestion has already been answered';
  end if;

  if p_status = 'accepted' then
    select id into v_existing_goal_id
    from public.spark_student_goals
    where student_id = v_student_id and status = 'active'
    order by created_at desc
    limit 1
    for update;

    if v_existing_goal_id is null then
      insert into public.spark_student_goals(student_id, title, target_percent, target_date, status)
      values (
        v_student_id,
        'Reach ' || v_suggestion.target_percent::text || '% in CSEC Mathematics',
        v_suggestion.target_percent,
        case when v_suggestion.target_date is null or v_suggestion.target_date >= current_date then v_suggestion.target_date else null end,
        'active'
      ) returning id into v_goal_id;
    else
      update public.spark_student_goals
      set title = 'Reach ' || v_suggestion.target_percent::text || '% in CSEC Mathematics',
          target_percent = v_suggestion.target_percent,
          target_date = case when v_suggestion.target_date is null or v_suggestion.target_date >= current_date then v_suggestion.target_date else null end,
          updated_at = now()
      where id = v_existing_goal_id
      returning id into v_goal_id;
    end if;
  end if;

  update public.spark_goal_suggestions
  set status = p_status, responded_at = now()
  where id = v_suggestion.id;

  select coalesce(name, 'Your child') into v_student_name
  from public.profiles where id = v_student_id;

  perform public.spark_create_notification(
    v_suggestion.parent_id,
    'goal_suggestion_response',
    case when p_status = 'accepted' then 'Goal suggestion accepted' else 'Goal suggestion declined' end,
    coalesce(v_student_name, 'Your child') || case when p_status = 'accepted' then ' accepted your Mathematics goal suggestion.' else ' decided not to use your Mathematics goal suggestion right now.' end,
    'dashboard',
    'View progress',
    null,
    null,
    v_student_id,
    jsonb_build_object('suggestion_id', v_suggestion.id, 'student_id', v_student_id, 'status', p_status, 'goal_id', v_goal_id),
    'goal-response:' || v_suggestion.id::text || ':' || p_status
  );

  return jsonb_build_object('status', p_status, 'goal_id', v_goal_id);
end;
$$;

revoke all on function public.spark_respond_goal_suggestion(uuid,text) from public, anon;
grant execute on function public.spark_respond_goal_suggestion(uuid,text) to authenticated;

create or replace function public.spark_withdraw_goal_suggestion(p_suggestion_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'parent') then
    raise exception 'Only Parent accounts can withdraw goal suggestions';
  end if;
  update public.spark_goal_suggestions
  set status = 'withdrawn', responded_at = now()
  where id = p_suggestion_id and parent_id = auth.uid() and status = 'pending';
  if not found then raise exception 'Pending goal suggestion not found'; end if;
end;
$$;

revoke all on function public.spark_withdraw_goal_suggestion(uuid) from public, anon;
grant execute on function public.spark_withdraw_goal_suggestion(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Progress-report email audit + atomic rate-limit reservation
-- ---------------------------------------------------------------------------
create table if not exists public.spark_progress_report_email_log (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  period_label text not null check (char_length(period_label) between 1 and 100),
  status text not null default 'attempting' check (status in ('attempting','sent','failed')),
  provider_message_id text,
  error_code text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists spark_progress_report_email_log_parent_created_idx
  on public.spark_progress_report_email_log(parent_id, created_at desc);

alter table public.spark_progress_report_email_log enable row level security;
revoke all on public.spark_progress_report_email_log from anon, authenticated;

create or replace function public.spark_begin_progress_report_email(
  p_parent_id uuid,
  p_student_id uuid,
  p_period_label text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_recent_count integer;
  v_daily_count integer;
begin
  if p_parent_id is null or p_student_id is null then
    raise exception 'Report email identity is incomplete';
  end if;

  -- Serialize reservations per Parent account so concurrent requests cannot
  -- bypass the rate limit.
  perform pg_advisory_xact_lock(hashtext(p_parent_id::text));

  select count(*) into v_recent_count
  from public.spark_progress_report_email_log
  where parent_id = p_parent_id and created_at >= now() - interval '15 minutes';

  if v_recent_count >= 3 then
    raise exception 'SPARK_REPORT_RATE_LIMIT_15M';
  end if;

  select count(*) into v_daily_count
  from public.spark_progress_report_email_log
  where parent_id = p_parent_id and created_at >= now() - interval '24 hours';

  if v_daily_count >= 10 then
    raise exception 'SPARK_REPORT_RATE_LIMIT_24H';
  end if;

  insert into public.spark_progress_report_email_log(parent_id, student_id, period_label, status)
  values (p_parent_id, p_student_id, left(coalesce(nullif(trim(p_period_label), ''), 'Progress report'), 100), 'attempting')
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.spark_begin_progress_report_email(uuid,uuid,text) from public, anon, authenticated;
grant execute on function public.spark_begin_progress_report_email(uuid,uuid,text) to service_role;

comment on table public.spark_flashcard_progress is 'Per-student spaced-repetition state for SPARK curated flashcards.';
comment on table public.spark_flashcard_review_events is 'Immutable flashcard review history used for learning activity reports.';
comment on table public.spark_student_goals is 'Student-owned CSEC Mathematics performance goals. Linked parents have read-only visibility.';
comment on table public.spark_goal_suggestions is 'Non-binding goal suggestions from approved linked parents. Students accept or decline via secure RPC.';
comment on table public.spark_progress_report_email_log is 'Metadata-only report email audit/rate-limit log. PDF/report contents are never stored here.';
