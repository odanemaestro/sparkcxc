begin;

-- SPARK Office Administration progress notification parity (Paper 01, Paper 02, lessons and labs)
--
-- Office Administration records lessons, labs, flashcards, Paper 01 and Paper 02 results
-- through the canonical spark_subject_activity_events model. This trigger gives Office Administration
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

create or replace function public.spark_oa_subject_activity_notifications()
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
  if lower(coalesce(new.subject_id, '')) <> 'office-administration'
     or not coalesce(new.completed, false) then
    return new;
  end if;

  -- Do not notify for an unpublished course or an inactive enrolment.
  if not exists (
    select 1 from public.spark_student_subject_enrollments e
    join public.spark_subjects s on s.id=e.subject_id
    where e.student_id=new.user_id and e.subject_id=new.subject_id
      and e.status='active' and s.enabled and s.status='live'
  ) then return new; end if;

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
      'subject_id', 'office-administration',
      'subject_name', 'CSEC Office Administration',
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

  if new.activity_type in ('exam','practice') and (new.activity_type = 'exam' or lower(coalesce(new.metadata->>'paper','')) in ('01','1','paper1','paper 1','02','2','paper2','paper 2')) then
    v_paper := case
      when lower(coalesce(new.metadata->>'paper', '')) in ('02','2','paper2','paper 2')
        or lower(coalesce(new.metadata->>'paper_type', '')) = 'paper2' then 'Paper 02'
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
      'Office Administration ' || v_paper
    );
    v_dedupe := 'office-administration:exam:' || new.id::text;

    perform public.spark_create_notification(
      new.user_id,
      v_student_type,
      v_activity_title || ' completed',
      case
        when v_percent is null then
          'Your responses for ' || v_activity_title || ' have been saved. A final score is not yet available.'
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
    v_parent_title := 'Office Administration lesson completed';
    v_parent_message := format(
      '%s completed %s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'a Office Administration lesson')
    );
    v_dedupe := 'office-administration:lesson:' || new.user_id::text || ':' ||
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

  elsif new.activity_type in ('topic_quiz','practice') then
    v_parent_title := 'Office Administration practice completed';
    v_parent_message := format(
      '%s completed %s%s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'a Office Administration topic practice set'),
      case when v_percent is null then ''
        else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%'
      end
    );
    v_dedupe := 'office-administration:topic_quiz:' || new.user_id::text || ':' ||
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
    v_parent_title := 'Office Administration module checkpoint completed';
    v_parent_message := format(
      '%s completed %s%s.',
      v_student_name,
      coalesce(nullif(trim(new.title), ''), 'a Office Administration module checkpoint'),
      case when v_percent is null then ''
        else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%'
      end
    );
    v_dedupe := 'office-administration:section_checkpoint:' || new.user_id::text || ':' ||
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
  elsif new.activity_type = 'lab' then
    v_parent_title := 'Office Administration lab completed';
    v_parent_message := format('%s completed %s.',v_student_name,coalesce(nullif(trim(new.title),''),'a Office Administration lab'));
    v_dedupe := 'office-administration:lab:' || new.user_id::text || ':' || md5(lower(coalesce(new.activity_key,new.id::text)));
    perform public.spark_create_notification(new.user_id,'lab_completed',
      coalesce(nullif(trim(new.title),''),'Office Administration lab')||' completed',
      'You completed '||coalesce(nullif(trim(new.title),''),'an Office Administration lab')||'.',
      'dashboard','View progress',null,null,new.user_id,v_metadata,v_dedupe||':student');
    perform public.spark_notify_linked_parents(new.user_id,'child_lesson_completed',v_parent_title,v_parent_message,'dashboard','View progress',null,v_metadata,v_dedupe);
  end if;

  return new;
end;
$$;

revoke all on function public.spark_oa_subject_activity_notifications()
from public, anon, authenticated;

drop trigger if exists spark_oa_subject_activity_notifications_trg
on public.spark_subject_activity_events;

create trigger spark_oa_subject_activity_notifications_trg
after insert on public.spark_subject_activity_events
for each row
when (new.subject_id = 'office-administration' and new.completed = true)
execute function public.spark_oa_subject_activity_notifications();

comment on function public.spark_oa_subject_activity_notifications() is
  'Creates Office Administration exam and linked-parent learning notifications from canonical subject activity events.';

commit;
