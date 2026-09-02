-- Add plain-language performance status to future Paper 1 and Paper 2 notifications.
-- Existing exam attempts are classified in the interface from their saved percentage.

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
begin
  select coalesce(name, 'Student') into v_student_name from public.profiles where id = new.user_id;
  v_paper_label := case when new.paper_type = 'paper1' then 'Paper 1' else 'Paper 2' end;
  v_type := case when new.paper_type = 'paper1' then 'paper1_completed' else 'paper2_completed' end;
  v_status := case
    when coalesce(new.percent, 0) < 40 then 'Needs attention'
    when new.percent < 60 then 'Developing'
    when new.percent < 80 then 'Satisfactory'
    else 'Strong'
  end;

  perform public.spark_create_notification(
    new.user_id, v_type, v_paper_label || ' completed',
    format('You completed %s and scored %s%%. Status: %s.', v_paper_label, trim(to_char(new.percent, 'FM999990.00')), v_status),
    'dashboard', 'View progress', null, null, new.user_id,
    jsonb_build_object('attempt_key', new.attempt_key, 'paper_type', new.paper_type, 'score', new.score, 'max_score', new.max_score, 'percent', new.percent, 'performance_status', v_status),
    'exam:' || new.user_id::text || ':' || new.attempt_key || ':student'
  );

  perform public.spark_notify_linked_parents(
    new.user_id,
    case when new.paper_type = 'paper1' then 'child_paper1_completed' else 'child_paper2_completed' end,
    v_student_name || ' completed ' || v_paper_label,
    format('%s completed %s and scored %s%%. Status: %s.', v_student_name, v_paper_label, trim(to_char(new.percent, 'FM999990.00')), v_status),
    'dashboard', 'View progress', null,
    jsonb_build_object('student_id', new.user_id, 'attempt_key', new.attempt_key, 'paper_type', new.paper_type, 'percent', new.percent, 'performance_status', v_status),
    'exam:' || new.user_id::text || ':' || new.attempt_key || ':parent'
  );
  return new;
end;
$$;
