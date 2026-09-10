begin;

-- SPARK RC2
-- Student-selected subject enrollment + one general SPARK learning goal.
-- This migration intentionally keeps spark_student_goals as one active goal per
-- student. Goals are NOT scoped to Mathematics, Physics, or any other subject.

-- ---------------------------------------------------------------------------
-- Student subject enrollment
-- ---------------------------------------------------------------------------
create table if not exists public.spark_student_subject_enrollments (
  student_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null,
  status text not null default 'active' check (status in ('active','inactive')),
  enrolled_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (student_id, subject_id),
  check (subject_id ~ '^[a-z0-9][a-z0-9_-]{0,39}$')
);

create index if not exists spark_student_subject_enrollments_student_status_idx
  on public.spark_student_subject_enrollments(student_id, status, updated_at desc);

comment on table public.spark_student_subject_enrollments is
  'Student-selected SPARK subjects. Inactive rows preserve an explicit leave choice while learning progress remains stored separately.';

alter table public.spark_student_subject_enrollments enable row level security;
revoke all on public.spark_student_subject_enrollments from anon;
revoke insert, update, delete on public.spark_student_subject_enrollments from authenticated;
grant select on public.spark_student_subject_enrollments to authenticated;

drop policy if exists "Students view own subject enrollments" on public.spark_student_subject_enrollments;
create policy "Students view own subject enrollments"
on public.spark_student_subject_enrollments
for select
to authenticated
using (
  auth.uid() = student_id
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'student'
  )
);

drop policy if exists "Parents view linked child subject enrollments" on public.spark_student_subject_enrollments;
create policy "Parents view linked child subject enrollments"
on public.spark_student_subject_enrollments
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'parent'
  )
  and exists (
    select 1
    from public.parent_student_links psl
    where psl.parent_id = auth.uid()
      and psl.student_id = spark_student_subject_enrollments.student_id
      and psl.status = 'approved'
  )
);

-- Existing students are enrolled only where SPARK already has evidence that
-- they participated. This avoids assuming that every student studies
-- Mathematics or Physics while preserving existing dashboard continuity.
with mathematics_participants as (
  select user_id as student_id from public.lesson_progress
  union
  select user_id from public.csec_question_attempts
  union
  select user_id from public.practice_exam_attempts
  union
  select user_id from public.csec_skill_progress
  union
  select user_id from public.learning_milestones
  union
  select user_id from public.spark_flashcard_progress
  union
  select student_id from public.spark_student_goals
)
insert into public.spark_student_subject_enrollments(student_id, subject_id, status, enrolled_at, updated_at)
select distinct mp.student_id, 'mathematics', 'active', now(), now()
from mathematics_participants mp
join public.profiles p on p.id = mp.student_id and p.role = 'student'
where mp.student_id is not null
on conflict (student_id, subject_id) do nothing;

-- The RC1 generic progress layer already stores Physics and is intentionally
-- future-subject friendly. Preserve any subject that has recorded progress.
insert into public.spark_student_subject_enrollments(student_id, subject_id, status, enrolled_at, updated_at)
select sp.user_id,
       lower(trim(sp.subject_id)),
       'active',
       coalesce(min(sp.first_recorded_at), now()),
       now()
from public.spark_subject_progress sp
join public.profiles p on p.id = sp.user_id and p.role = 'student'
where trim(coalesce(sp.subject_id, '')) <> ''
group by sp.user_id, lower(trim(sp.subject_id))
on conflict (student_id, subject_id) do nothing;

create or replace function public.spark_set_subject_enrollment(
  p_subject_id text,
  p_enrolled boolean
)
returns public.spark_student_subject_enrollments
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_id uuid := auth.uid();
  v_subject_id text := lower(trim(coalesce(p_subject_id, '')));
  v_row public.spark_student_subject_enrollments;
begin
  if v_student_id is null then
    raise exception 'Authentication required';
  end if;
  if not exists (
    select 1 from public.profiles p
    where p.id = v_student_id and p.role = 'student'
  ) then
    raise exception 'Only Student accounts can manage subject enrollment';
  end if;
  if v_subject_id !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then
    raise exception 'Invalid subject id';
  end if;

  insert into public.spark_student_subject_enrollments(
    student_id, subject_id, status, enrolled_at, updated_at
  ) values (
    v_student_id,
    v_subject_id,
    case when coalesce(p_enrolled, false) then 'active' else 'inactive' end,
    now(),
    now()
  )
  on conflict (student_id, subject_id) do update set
    status = excluded.status,
    enrolled_at = case
      when excluded.status = 'active'
       and public.spark_student_subject_enrollments.status <> 'active'
      then now()
      else public.spark_student_subject_enrollments.enrolled_at
    end,
    updated_at = now()
  returning * into v_row;

  -- Leaving a course only hides it from active dashboard/report surfaces.
  -- Saved learning progress and the student's general SPARK goal are retained.
  return v_row;
end;
$$;

revoke all on function public.spark_set_subject_enrollment(text,boolean) from public, anon;
grant execute on function public.spark_set_subject_enrollment(text,boolean) to authenticated;

-- If learning progress is recorded for a subject before the student has ever
-- made an enrollment choice, treat actual participation as enrollment. An
-- explicit inactive preference is never reactivated automatically.
create or replace function public.spark_auto_enroll_new_subject_progress()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.spark_student_subject_enrollments(
    student_id, subject_id, status, enrolled_at, updated_at
  ) values (
    new.user_id,
    lower(trim(new.subject_id)),
    'active',
    coalesce(new.first_recorded_at, now()),
    now()
  )
  on conflict (student_id, subject_id) do nothing;
  return new;
end;
$$;

revoke all on function public.spark_auto_enroll_new_subject_progress() from public, anon, authenticated;

drop trigger if exists spark_subject_progress_auto_enroll on public.spark_subject_progress;
create trigger spark_subject_progress_auto_enroll
after insert on public.spark_subject_progress
for each row execute function public.spark_auto_enroll_new_subject_progress();

-- ---------------------------------------------------------------------------
-- General SPARK learning goal
-- ---------------------------------------------------------------------------
-- Keep the original one-active-goal-per-student model. Existing Mathematics
-- goals keep their target/date/status and become overall SPARK learning goals.
create unique index if not exists spark_student_goals_one_active_idx
  on public.spark_student_goals(student_id)
  where status = 'active';

update public.spark_student_goals
set title = 'Reach ' || target_percent::text || '% overall in SPARK',
    updated_at = now()
where status = 'active'
  and title is distinct from ('Reach ' || target_percent::text || '% overall in SPARK');

comment on table public.spark_student_goals is
  'Student-owned overall SPARK learning goals. The target is evaluated across enrolled subjects with assessment evidence; linked parents have read-only visibility.';

-- A Parent can suggest one general goal for a linked Student. The goal is not
-- tied to any subject. At least one active enrollment is required so the goal
-- has a meaningful learning scope.
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
  if not exists (
    select 1 from public.profiles
    where id = v_parent_id and role = 'parent'
  ) then
    raise exception 'Only Parent accounts can suggest goals';
  end if;
  if not exists (
    select 1 from public.parent_student_links
    where parent_id = v_parent_id
      and student_id = p_student_id
      and status = 'approved'
  ) then
    raise exception 'Approved parent-child connection required';
  end if;
  if not exists (
    select 1 from public.profiles
    where id = p_student_id and role = 'student'
  ) then
    raise exception 'Goal suggestions can only be sent to Student accounts';
  end if;
  if not exists (
    select 1 from public.spark_student_subject_enrollments e
    where e.student_id = p_student_id and e.status = 'active'
  ) then
    raise exception 'The student must enroll in at least one subject first';
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

  -- Keep the experience simple: a new suggestion from the same Parent replaces
  -- their older pending suggestion for this Student rather than stacking them.
  update public.spark_goal_suggestions
  set status = 'withdrawn', responded_at = now()
  where parent_id = v_parent_id
    and student_id = p_student_id
    and status = 'pending';

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
    coalesce(v_parent_name, 'Your parent or guardian') ||
      ' suggested an overall learning goal of ' || p_target_percent::text ||
      '%. You decide whether to accept it.',
    'dashboard',
    'View goal',
    null,
    null,
    p_student_id,
    jsonb_build_object(
      'suggestion_id', v_id,
      'student_id', p_student_id,
      'target_percent', p_target_percent,
      'scope', 'all_subjects'
    ),
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
  if not exists (
    select 1 from public.profiles
    where id = v_student_id and role = 'student'
  ) then
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
    if not exists (
      select 1 from public.spark_student_subject_enrollments e
      where e.student_id = v_student_id and e.status = 'active'
    ) then
      raise exception 'Enroll in at least one subject before accepting a goal';
    end if;

    select id into v_existing_goal_id
    from public.spark_student_goals
    where student_id = v_student_id and status = 'active'
    order by created_at desc
    limit 1
    for update;

    if v_existing_goal_id is null then
      insert into public.spark_student_goals(
        student_id, title, target_percent, target_date, status
      ) values (
        v_student_id,
        'Reach ' || v_suggestion.target_percent::text || '% overall in SPARK',
        v_suggestion.target_percent,
        case
          when v_suggestion.target_date is null
            or v_suggestion.target_date >= current_date
          then v_suggestion.target_date
          else null
        end,
        'active'
      ) returning id into v_goal_id;
    else
      update public.spark_student_goals
      set title = 'Reach ' || v_suggestion.target_percent::text || '% overall in SPARK',
          target_percent = v_suggestion.target_percent,
          target_date = case
            when v_suggestion.target_date is null
              or v_suggestion.target_date >= current_date
            then v_suggestion.target_date
            else null
          end,
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
    case
      when p_status = 'accepted' then 'Goal suggestion accepted'
      else 'Goal suggestion declined'
    end,
    coalesce(v_student_name, 'Your child') || case
      when p_status = 'accepted'
        then ' accepted your overall learning goal suggestion.'
      else ' decided not to use your overall learning goal suggestion right now.'
    end,
    'dashboard',
    'View progress',
    null,
    null,
    v_student_id,
    jsonb_build_object(
      'suggestion_id', v_suggestion.id,
      'student_id', v_student_id,
      'status', p_status,
      'goal_id', v_goal_id,
      'scope', 'all_subjects'
    ),
    'goal-response:' || v_suggestion.id::text || ':' || p_status
  );

  return jsonb_build_object(
    'status', p_status,
    'goal_id', v_goal_id,
    'scope', 'all_subjects'
  );
end;
$$;

revoke all on function public.spark_respond_goal_suggestion(uuid,text) from public, anon;
grant execute on function public.spark_respond_goal_suggestion(uuid,text) to authenticated;

-- Realtime lets Student and Parent dashboards update immediately when a subject
-- is enrolled/left in another tab or device.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'spark_student_subject_enrollments'
    ) then
      alter publication supabase_realtime add table public.spark_student_subject_enrollments;
    end if;
  end if;
end $$;

commit;
