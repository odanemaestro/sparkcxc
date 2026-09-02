-- SPARK parent learning milestone notifications
--
-- Records meaningful learning events once, shows them on the linked-parent
-- progress dashboard, and creates parent notifications without sending an
-- alert for every individual practice question.

create table if not exists public.learning_milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  title text not null,
  score numeric(8,2),
  max_score numeric(8,2),
  percent numeric(5,2),
  skill text,
  lesson_id text,
  metadata jsonb not null default '{}'::jsonb,
  dedupe_key text not null,
  created_at timestamptz not null default now(),
  unique(dedupe_key)
);

create index if not exists learning_milestones_user_created_idx
  on public.learning_milestones(user_id, created_at desc);

alter table public.learning_milestones enable row level security;

drop policy if exists "Students and linked parents read learning milestones" on public.learning_milestones;
create policy "Students and linked parents read learning milestones"
on public.learning_milestones for select
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.parent_student_links l
    where l.parent_id = auth.uid()
      and l.student_id = learning_milestones.user_id
      and l.status = 'approved'
  )
);

revoke insert, update, delete on public.learning_milestones from anon, authenticated;
grant select on public.learning_milestones to authenticated;

-- Track whether a lesson was completed from the lesson screen or by passing
-- its topic test. The trigger uses this to avoid two parent alerts for one
-- student action.
alter table if exists public.lesson_progress
  add column if not exists completion_source text;

create or replace function public.spark_record_learning_milestone_for_student(
  p_student_id uuid,
  p_event_type text,
  p_title text,
  p_parent_title text,
  p_parent_message text,
  p_score numeric default null,
  p_max_score numeric default null,
  p_skill text default null,
  p_lesson_id text default null,
  p_metadata jsonb default '{}'::jsonb,
  p_dedupe_key text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_percent numeric(5,2);
  v_metadata jsonb;
begin
  if p_student_id is null or nullif(trim(coalesce(p_event_type, '')), '') is null then
    return null;
  end if;

  if p_max_score is not null and p_max_score > 0 and p_score is not null then
    v_percent := round((p_score / p_max_score) * 100, 2);
  end if;

  v_metadata := coalesce(p_metadata, '{}'::jsonb)
    || jsonb_build_object(
      'student_id', p_student_id,
      'event_type', p_event_type,
      'title', left(coalesce(p_title, 'Learning update'), 160)
    );

  if p_score is not null then
    v_metadata := v_metadata || jsonb_build_object('score', p_score);
  end if;
  if p_max_score is not null then
    v_metadata := v_metadata || jsonb_build_object('max_score', p_max_score);
  end if;
  if v_percent is not null then
    v_metadata := v_metadata || jsonb_build_object('percent', v_percent);
  end if;
  if p_skill is not null then
    v_metadata := v_metadata || jsonb_build_object('skill', p_skill);
  end if;
  if p_lesson_id is not null then
    v_metadata := v_metadata || jsonb_build_object('lesson_id', p_lesson_id);
  end if;

  insert into public.learning_milestones (
    user_id, event_type, title, score, max_score, percent, skill,
    lesson_id, metadata, dedupe_key
  ) values (
    p_student_id, p_event_type, left(coalesce(p_title, 'Learning update'), 160),
    p_score, p_max_score, v_percent, p_skill, p_lesson_id, v_metadata,
    coalesce(p_dedupe_key, p_student_id::text || ':' || p_event_type || ':' || gen_random_uuid()::text)
  )
  on conflict (dedupe_key) do nothing
  returning id into v_id;

  if v_id is null then
    return null;
  end if;

  v_metadata := v_metadata || jsonb_build_object('milestone_id', v_id);
  update public.learning_milestones set metadata = v_metadata where id = v_id;

  perform public.spark_notify_linked_parents(
    p_student_id,
    'child_' || p_event_type,
    p_parent_title,
    p_parent_message,
    'dashboard',
    'View progress',
    null,
    v_metadata,
    'learning:' || v_id::text
  );

  return v_id;
end;
$$;

revoke all on function public.spark_record_learning_milestone_for_student(uuid,text,text,text,text,numeric,numeric,text,text,jsonb,text) from public;

-- Browser-facing milestone recorder. The signed-in student is always the
-- subject of the event, so one account cannot create progress notices for a
-- different student.
create or replace function public.spark_record_student_milestone(
  p_event_type text,
  p_title text,
  p_score numeric default null,
  p_max_score numeric default null,
  p_skill text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_id uuid := auth.uid();
  v_student_name text;
  v_safe_title text;
  v_score numeric;
  v_max numeric;
  v_percent numeric(5,2);
  v_parent_title text;
  v_parent_message text;
  v_key text;
begin
  if v_student_id is null then
    raise exception 'Authentication required';
  end if;

  if p_event_type not in (
    'topic_quiz_completed',
    'adaptive_session_completed',
    'section_completed',
    'section_test_completed'
  ) then
    raise exception 'Unsupported learning milestone';
  end if;

  v_safe_title := left(coalesce(nullif(trim(p_title), ''), 'CSEC Mathematics'), 120);
  v_score := case when p_score is null then null else greatest(0, p_score) end;
  v_max := case when p_max_score is null then null else greatest(0, p_max_score) end;
  if v_score is not null and v_max is not null and v_max > 0 then
    v_score := least(v_score, v_max);
    v_percent := round((v_score / v_max) * 100, 2);
  end if;

  select coalesce(name, 'Your child') into v_student_name
  from public.profiles where id = v_student_id;

  if p_event_type = 'topic_quiz_completed' then
    v_parent_title := 'Topic test completed';
    v_parent_message := format(
      '%s completed the %s topic test%s.',
      v_student_name,
      v_safe_title,
      case when v_percent is null then '' else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%' end
    );
  elsif p_event_type = 'adaptive_session_completed' then
    v_parent_title := 'Adaptive Practice completed';
    v_parent_message := format(
      '%s completed an Adaptive Practice session in %s%s.',
      v_student_name,
      v_safe_title,
      case when v_percent is null then '' else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%' end
    );
  elsif p_event_type = 'section_completed' then
    v_parent_title := 'Section completed';
    v_parent_message := format('%s completed %s.', v_student_name, v_safe_title);
  else
    v_parent_title := 'Section test completed';
    v_parent_message := format(
      '%s completed the %s section test%s.',
      v_student_name,
      v_safe_title,
      case when v_percent is null then '' else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%' end
    );
  end if;

  v_key := v_student_id::text || ':' || p_event_type || ':' || md5(lower(v_safe_title)) ||
    case when p_event_type = 'section_completed' then '' else ':' || current_date::text end;

  return public.spark_record_learning_milestone_for_student(
    v_student_id,
    p_event_type,
    v_safe_title,
    v_parent_title,
    v_parent_message,
    v_score,
    v_max,
    p_skill,
    null,
    coalesce(p_metadata, '{}'::jsonb),
    v_key
  );
end;
$$;

revoke all on function public.spark_record_student_milestone(text,text,numeric,numeric,text,jsonb) from public;
grant execute on function public.spark_record_student_milestone(text,text,numeric,numeric,text,jsonb) to authenticated;

create or replace function public.spark_lesson_milestone_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lesson_title text;
  v_student_name text;
  v_total_lessons integer;
  v_completed_lessons integer;
begin
  if not new.completed then
    return new;
  end if;

  if tg_op = 'UPDATE' and coalesce(old.completed, false) then
    return new;
  end if;

  select coalesce(title, 'CSEC Mathematics lesson') into v_lesson_title
  from public.lessons where id = new.lesson_id;

  select coalesce(name, 'Your child') into v_student_name
  from public.profiles where id = new.user_id;

  -- A passed topic test already creates a scored notification, so do not send
  -- a second lesson-complete alert for the same action.
  if coalesce(new.completion_source, 'manual') <> 'quiz' then
    perform public.spark_record_learning_milestone_for_student(
      new.user_id,
      'lesson_completed',
      v_lesson_title,
      'Lesson completed',
      format('%s completed %s.', v_student_name, v_lesson_title),
      null, null, v_lesson_title, new.lesson_id::text,
      jsonb_build_object('completion_source', coalesce(new.completion_source, 'manual')),
      new.user_id::text || ':lesson_completed:' || new.lesson_id::text
    );
  end if;

  -- With the current SPARK curriculum, public.lessons represents the CSEC
  -- Mathematics course. Notify once when every lesson row is complete.
  select count(*) into v_total_lessons from public.lessons;
  select count(distinct lp.lesson_id) into v_completed_lessons
  from public.lesson_progress lp
  where lp.user_id = new.user_id and lp.completed = true;

  if v_total_lessons > 0 and v_completed_lessons >= v_total_lessons then
    perform public.spark_record_learning_milestone_for_student(
      new.user_id,
      'course_completed',
      'CSEC Mathematics',
      'Course completed',
      format('%s completed all CSEC Mathematics lessons.', v_student_name),
      null, null, null, null,
      jsonb_build_object('completed_lessons', v_completed_lessons, 'total_lessons', v_total_lessons),
      new.user_id::text || ':course_completed:csec-mathematics'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists spark_lesson_milestone_notifications_trg on public.lesson_progress;
create trigger spark_lesson_milestone_notifications_trg
after insert or update of completed on public.lesson_progress
for each row execute function public.spark_lesson_milestone_notifications();

create or replace function public.spark_skill_milestone_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_name text;
  v_old_score numeric := 0;
  v_new_score numeric := coalesce(new.mastery_score, 0);
  v_attempts integer := coalesce(new.attempts, 0);
begin
  if tg_op = 'UPDATE' then
    v_old_score := coalesce(old.mastery_score, 0);
  end if;

  select coalesce(name, 'Your child') into v_student_name
  from public.profiles where id = new.user_id;

  if v_attempts >= 3 and v_new_score < 50 then
    perform public.spark_record_learning_milestone_for_student(
      new.user_id,
      'weak_skill_alert',
      coalesce(new.skill, 'A mathematics skill'),
      'Skill needs attention',
      format('%s may need more support with %s. Current mastery is %s%% after %s attempts.',
        v_student_name, coalesce(new.skill, 'this skill'), trim(to_char(v_new_score, 'FM999990.0')), v_attempts),
      v_new_score, 100, new.skill, null,
      jsonb_build_object('attempts', v_attempts, 'mastery_level', new.mastery_level),
      new.user_id::text || ':weak_skill_alert:' || coalesce(new.skill, 'unknown')
    );
  end if;

  if v_attempts >= 3 and v_new_score >= 80 and (tg_op = 'INSERT' or v_old_score < 80) then
    perform public.spark_record_learning_milestone_for_student(
      new.user_id,
      'mastery_milestone',
      coalesce(new.skill, 'A mathematics skill'),
      'Mastery milestone',
      format('%s reached %s%% mastery in %s.',
        v_student_name, trim(to_char(v_new_score, 'FM999990.0')), coalesce(new.skill, 'this skill')),
      v_new_score, 100, new.skill, null,
      jsonb_build_object('attempts', v_attempts, 'mastery_level', new.mastery_level),
      new.user_id::text || ':mastery_milestone:' || coalesce(new.skill, 'unknown')
    );
  elsif tg_op = 'UPDATE' and v_attempts >= 3 and v_old_score < 50 and v_new_score >= 70 and v_new_score < 80 then
    perform public.spark_record_learning_milestone_for_student(
      new.user_id,
      'skill_improved',
      coalesce(new.skill, 'A mathematics skill'),
      'Skill improving',
      format('%s improved %s mastery to %s%%.',
        v_student_name, coalesce(new.skill, 'this skill'), trim(to_char(v_new_score, 'FM999990.0'))),
      v_new_score, 100, new.skill, null,
      jsonb_build_object('attempts', v_attempts, 'mastery_level', new.mastery_level),
      new.user_id::text || ':skill_improved:' || coalesce(new.skill, 'unknown')
    );
  end if;

  return new;
end;
$$;

drop trigger if exists spark_skill_milestone_notifications_trg on public.csec_skill_progress;
create trigger spark_skill_milestone_notifications_trg
after insert or update of mastery_score, attempts on public.csec_skill_progress
for each row execute function public.spark_skill_milestone_notifications();

-- Keep the parent progress dashboard live while a connected child studies.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'learning_milestones'
  ) then
    alter publication supabase_realtime add table public.learning_milestones;
  end if;
exception
  when undefined_object then
    null;
end $$;
