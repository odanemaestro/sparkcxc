begin;

-- FNH preview capability sync. Do not publish or enroll students automatically.
-- Run after 20261014010000 and 20261014011000.
do $$
begin
  if not exists (select 1 from public.spark_subjects where id='food-nutrition-and-health') then
    raise exception 'Run 20261014010000_fnh_syllabus_course_draft.sql first';
  end if;
  if to_regclass('public.spark_subject_activity_events') is null then
    raise exception 'Missing canonical subject activity events table';
  end if;
  if to_regprocedure('public.spark_fnh_subject_activity_notifications()') is null then
    raise exception 'Run 20261014011000_fnh_progress_notifications.sql first';
  end if;
end $$;

update public.spark_subjects
set capabilities=coalesce(capabilities,'{}'::jsonb) || jsonb_build_object(
    'study',true,'practice',true,'paper1',true,'paper2',true,
    'structured',true,'flashcards',true,'progress',true,
    'labs',true,'sba',true,'adaptive',false
  ),
  learning_config=coalesce(learning_config,'{}'::jsonb) ||
    jsonb_build_object('releaseStage','practice-and-integration-review'),
  enabled=false,
  status='draft',
  updated_at=now()
where id='food-nutrition-and-health';

commit;
