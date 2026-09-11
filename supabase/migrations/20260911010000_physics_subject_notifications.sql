begin;

-- Fail clearly if the prerequisite notification and multi-subject migrations
-- have not been applied yet. This avoids a partially-installed trigger.
do $$
begin
  if to_regclass('public.spark_subject_activity_events') is null then
    raise exception 'SPARK prerequisite missing: public.spark_subject_activity_events';
  end if;
  if to_regprocedure('public.spark_create_notification(uuid,text,text,text,text,text,uuid,uuid,uuid,jsonb,text)') is null then
    raise exception 'SPARK prerequisite missing: public.spark_create_notification';
  end if;
  if to_regprocedure('public.spark_notify_linked_parents(uuid,text,text,text,text,text,uuid,jsonb,text)') is null then
    raise exception 'SPARK prerequisite missing: public.spark_notify_linked_parents';
  end if;
end $$;

-- SPARK Physics notification parity
--
-- Physics progress is stored in spark_subject_progress and
-- spark_subject_activity_events. Mathematics full papers use
-- practice_exam_attempts, whose trigger creates exam notifications. This
-- trigger gives Physics the same notification behaviour without duplicating
-- activity rows or changing the generic subject-progress schema.

create or replace function public.spark_physics_subject_activity_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_name text;
  v_percent numeric(6,2);
  v_status text;
  v_metadata jsonb;
  v_title text;
  v_parent_title text;
  v_parent_message text;
  v_dedupe text;
begin
  if lower(coalesce(new.subject_id, '')) <> 'physics' or not coalesce(new.completed, false) then
    return new;
  end if;

  select coalesce(name, 'Your child')
  into v_student_name
  from public.profiles
  where id = new.user_id;

  v_percent := case
    when new.percent is not null then greatest(0, least(100, new.percent))
    when new.score is not null and new.max_score is not null and new.max_score > 0
      then round((new.score / new.max_score) * 100, 2)
    else null
  end;

  v_status := case
    when v_percent is null then null
    when v_percent < 40 then 'Needs attention'
    when v_percent < 60 then 'Developing'
    when v_percent < 80 then 'Satisfactory'
    else 'Strong'
  end;

  v_metadata := coalesce(new.metadata, '{}'::jsonb)
    || jsonb_build_object(
      'subject_id', 'physics',
      'subject_name', 'CSEC Physics',
      'activity_event_id', new.id,
      'activity_key', new.activity_key,
      'activity_type', new.activity_type,
      'section_id', new.section_id,
      'topic_id', new.topic_id,
      'score', new.score,
      'max_score', new.max_score,
      'percent', v_percent,
      'performance_status', v_status,
      'student_id', new.user_id
    );

  -- Full Physics Paper 2 attempts mirror Mathematics exam notifications.
  -- The student receives the bell/push result and linked parents receive the
  -- corresponding child progress notification.
  if new.activity_type = 'exam' then
    v_title := coalesce(nullif(trim(new.title), ''), 'Physics Paper 2') || ' completed';
    v_dedupe := 'physics:exam:' || new.id::text;

    perform public.spark_create_notification(
      new.user_id,
      'paper2_completed',
      v_title,
      case
        when v_percent is null then 'Your Physics Paper 2 result has been saved.'
        else format(
          'You completed %s and scored %s%%. Status: %s.',
          coalesce(nullif(trim(new.title), ''), 'Physics Paper 2'),
          trim(to_char(v_percent, 'FM999990.00')),
          v_status
        )
      end,
      'dashboard',
      'View progress',
      null,
      null,
      new.user_id,
      v_metadata,
      v_dedupe || ':student'
    );

    perform public.spark_notify_linked_parents(
      new.user_id,
      'child_paper2_completed',
      v_student_name || ' completed ' || coalesce(nullif(trim(new.title), ''), 'Physics Paper 2'),
      case
        when v_percent is null then format('%s completed %s.', v_student_name, coalesce(nullif(trim(new.title), ''), 'Physics Paper 2'))
        else format(
          '%s completed %s and scored %s%%. Status: %s.',
          v_student_name,
          coalesce(nullif(trim(new.title), ''), 'Physics Paper 2'),
          trim(to_char(v_percent, 'FM999990.00')),
          v_status
        )
      end,
      'dashboard',
      'View progress',
      null,
      v_metadata,
      v_dedupe || ':parent'
    );

    return new;
  end if;

  -- Mathematics learning milestones notify linked parents for lesson, topic
  -- test and section-test progress. Reuse those established notification types
  -- so the same notification preferences and Web Push categories apply.
  if new.activity_type = 'lesson' then
    v_parent_title := 'Physics lesson completed';
    v_parent_message := format('%s completed %s.', v_student_name, coalesce(nullif(trim(new.title), ''), 'a CSEC Physics lesson'));
    v_dedupe := 'physics:lesson:' || new.user_id::text || ':' || md5(lower(coalesce(new.activity_key, new.id::text)));

    perform public.spark_notify_linked_parents(
      new.user_id,
      'child_lesson_completed',
      v_parent_title,
      v_parent_message,
      'dashboard',
      'View progress',
      null,
      v_metadata,
      v_dedupe
    );
  elsif new.activity_type = 'topic_quiz' then
    v_parent_title := 'Physics topic test completed';
    v_parent_message := format(
      '%s completed %s%s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'a CSEC Physics topic test'),
      case when v_percent is null then '' else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%' end
    );
    v_dedupe := 'physics:topic_quiz:' || new.user_id::text || ':' || md5(lower(coalesce(new.activity_key, new.id::text))) || ':' || current_date::text;

    perform public.spark_notify_linked_parents(
      new.user_id,
      'child_topic_quiz_completed',
      v_parent_title,
      v_parent_message,
      'dashboard',
      'View progress',
      null,
      v_metadata,
      v_dedupe
    );
  elsif new.activity_type = 'section_checkpoint' then
    v_parent_title := 'Physics section checkpoint completed';
    v_parent_message := format(
      '%s completed %s%s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'a CSEC Physics section checkpoint'),
      case when v_percent is null then '' else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%' end
    );
    v_dedupe := 'physics:section_checkpoint:' || new.user_id::text || ':' || md5(lower(coalesce(new.activity_key, new.id::text))) || ':' || current_date::text;

    perform public.spark_notify_linked_parents(
      new.user_id,
      'child_section_test_completed',
      v_parent_title,
      v_parent_message,
      'dashboard',
      'View progress',
      null,
      v_metadata,
      v_dedupe
    );
  end if;

  return new;
end;
$$;

revoke all on function public.spark_physics_subject_activity_notifications() from public, anon, authenticated;

drop trigger if exists spark_physics_subject_activity_notifications_trg on public.spark_subject_activity_events;
create trigger spark_physics_subject_activity_notifications_trg
after insert on public.spark_subject_activity_events
for each row
when (new.subject_id = 'physics' and new.completed = true)
execute function public.spark_physics_subject_activity_notifications();

comment on function public.spark_physics_subject_activity_notifications() is
  'Creates Physics exam and linked-parent learning notifications from canonical subject activity events.';

commit;
