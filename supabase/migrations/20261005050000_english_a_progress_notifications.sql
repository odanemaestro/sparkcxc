begin;

-- SPARK English A progress notification parity
--
-- English A records lesson completion and Paper 01 / Paper 02 attempts through
-- the shared spark_subject_activity_events model. This trigger gives English A
-- the same Notification Centre, Web Push and linked-parent behaviour used by
-- Physics, Information Technology, Integrated Science and Social Studies.

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

create or replace function public.spark_english_a_subject_activity_notifications()
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
  v_paper text;
  v_student_type text;
  v_parent_type text;
  v_activity_title text;
  v_parent_title text;
  v_parent_message text;
  v_dedupe text;
begin
  if lower(coalesce(new.subject_id, '')) <> 'english-a'
     or not coalesce(new.completed, false) then
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
      'subject_id', 'english-a',
      'subject_name', 'CSEC English A',
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

  if new.activity_type = 'exam' then
    v_paper := case
      when lower(coalesce(new.metadata->>'paper', '')) in ('01','1','paper1','paper 1')
        or lower(coalesce(new.metadata->>'paper_type', '')) = 'paper1'
        or lower(coalesce(new.activity_key, '')) like '%paper1%'
        or lower(coalesce(new.title, '')) like '%paper 01%'
        or lower(coalesce(new.title, '')) like '%paper 1%'
        then 'Paper 01'
      else 'Paper 02'
    end;

    if v_paper = 'Paper 01' then
      v_student_type := 'paper1_completed';
      v_parent_type := 'child_paper1_completed';
      v_metadata := v_metadata || jsonb_build_object('paper_type', 'paper1');
    else
      v_student_type := 'paper2_completed';
      v_parent_type := 'child_paper2_completed';
      v_metadata := v_metadata || jsonb_build_object('paper_type', 'paper2');
    end if;

    v_activity_title := coalesce(
      nullif(trim(new.title), ''),
      'English A ' || v_paper
    );
    v_dedupe := 'english-a:exam:' || new.id::text;

    perform public.spark_create_notification(
      new.user_id,
      v_student_type,
      v_activity_title || ' completed',
      case
        when v_percent is null then
          'Your ' || v_activity_title || ' result has been saved.'
        else format(
          'You completed %s and scored %s%%. Status: %s.',
          v_activity_title,
          trim(to_char(v_percent, 'FM999990.0')),
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
      v_parent_type,
      v_student_name || ' completed ' || v_activity_title,
      case
        when v_percent is null then
          format('%s completed %s.', v_student_name, v_activity_title)
        else format(
          '%s completed %s and scored %s%%. Status: %s.',
          v_student_name,
          v_activity_title,
          trim(to_char(v_percent, 'FM999990.0')),
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

  if new.activity_type = 'lesson' then
    v_parent_title := 'English A lesson completed';
    v_parent_message := format(
      '%s completed %s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'an English A lesson')
    );
    v_dedupe := 'english-a:lesson:' || new.user_id::text || ':' ||
      md5(lower(coalesce(new.activity_key, new.id::text)));

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
    v_parent_title := 'English A topic practice completed';
    v_parent_message := format(
      '%s completed %s%s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'an English A topic practice set'),
      case when v_percent is null then ''
        else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%'
      end
    );
    v_dedupe := 'english-a:topic_quiz:' || new.user_id::text || ':' ||
      md5(lower(coalesce(new.activity_key, new.id::text))) || ':' || current_date::text;

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
    v_parent_title := 'English A module checkpoint completed';
    v_parent_message := format(
      '%s completed %s%s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'an English A module checkpoint'),
      case when v_percent is null then ''
        else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%'
      end
    );
    v_dedupe := 'english-a:section_checkpoint:' || new.user_id::text || ':' ||
      md5(lower(coalesce(new.activity_key, new.id::text))) || ':' || current_date::text;

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

revoke all on function public.spark_english_a_subject_activity_notifications()
from public, anon, authenticated;

drop trigger if exists spark_english_a_subject_activity_notifications_trg
on public.spark_subject_activity_events;

create trigger spark_english_a_subject_activity_notifications_trg
after insert on public.spark_subject_activity_events
for each row
when (new.subject_id = 'english-a' and new.completed = true)
execute function public.spark_english_a_subject_activity_notifications();

comment on function public.spark_english_a_subject_activity_notifications() is
  'Creates English A exam and linked-parent learning notifications from canonical subject activity events.';

commit;
