-- SPARK V5.3.9F
-- Make 2027 Practice submissions use the existing notification pipeline while
-- preserving the established notification types and user preference categories.

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
  elsif p_event_type = 'section_test_completed'
      and coalesce(p_metadata->>'format', '') = '2027' then
    v_parent_title := '2027 Practice completed';
    v_parent_message := format(
      '%s completed %s%s.',
      v_student_name,
      v_safe_title,
      case when v_percent is null then '' else ' and scored ' || trim(to_char(v_percent, 'FM999990.0')) || '%' end
    );
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

-- Keep Paper 1/Paper 2 notification types intact so existing notification
-- routing and exam-results preferences continue to work. 2027 full papers are
-- stored as paper2 rows and identified by metadata.format = '2027'.
create or replace function public.spark_exam_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_name text;
  v_paper_label text;
  v_type text;
  v_status text;
  v_is_2027 boolean;
  v_paper_letter text;
  v_notification_metadata jsonb;
begin
  select coalesce(name, 'Student') into v_student_name from public.profiles where id = new.user_id;

  v_is_2027 := new.paper_type = 'paper2' and coalesce(new.metadata->>'format', '') = '2027';
  v_paper_letter := upper(nullif(trim(coalesce(new.metadata->>'paper_letter', '')), ''));

  if v_is_2027 then
    v_paper_label := '2027 Practice Paper' || case when v_paper_letter is null then '' else ' ' || v_paper_letter end;
  else
    v_paper_label := case when new.paper_type = 'paper1' then 'Paper 1' else 'Paper 2' end;
  end if;

  v_type := case when new.paper_type = 'paper1' then 'paper1_completed' else 'paper2_completed' end;
  v_status := case
    when coalesce(new.percent, 0) < 40 then 'Needs attention'
    when new.percent < 60 then 'Developing'
    when new.percent < 80 then 'Satisfactory'
    else 'Strong'
  end;

  v_notification_metadata := coalesce(new.metadata, '{}'::jsonb)
    || jsonb_build_object(
      'attempt_key', new.attempt_key,
      'paper_type', new.paper_type,
      'score', new.score,
      'max_score', new.max_score,
      'percent', new.percent,
      'performance_status', v_status
    );

  perform public.spark_create_notification(
    new.user_id, v_type, v_paper_label || ' completed',
    format('You completed %s and scored %s%%. Status: %s.', v_paper_label, trim(to_char(new.percent, 'FM999990.00')), v_status),
    'dashboard', 'View progress', null, null, new.user_id,
    v_notification_metadata,
    'exam:' || new.user_id::text || ':' || new.attempt_key || ':student'
  );

  perform public.spark_notify_linked_parents(
    new.user_id,
    case when new.paper_type = 'paper1' then 'child_paper1_completed' else 'child_paper2_completed' end,
    v_student_name || ' completed ' || v_paper_label,
    format('%s completed %s and scored %s%%. Status: %s.', v_student_name, v_paper_label, trim(to_char(new.percent, 'FM999990.00')), v_status),
    'dashboard', 'View progress', null,
    v_notification_metadata || jsonb_build_object('student_id', new.user_id),
    'exam:' || new.user_id::text || ':' || new.attempt_key || ':parent'
  );
  return new;
end;
$$;
