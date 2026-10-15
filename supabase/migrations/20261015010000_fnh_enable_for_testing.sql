begin;

-- FNH TEST ACCESS ONLY.
-- Run in a test/staging Supabase project, not production, unless you
-- intend to expose FNH to students using the same database.
-- Apply AFTER the three FNH setup migrations.
do $$
begin
  if not exists (
    select 1 from public.spark_subjects
    where id='food-nutrition-and-health'
  ) then
    raise exception 'FNH subject not registered. Run the FNH setup scripts first.';
  end if;
  if to_regprocedure('public.spark_fnh_subject_activity_notifications()') is null then
    raise exception 'FNH notification migration missing.';
  end if;
end $$;

update public.spark_subjects
set enabled=true,
    status='published',
    learning_config=coalesce(learning_config,'{}'::jsonb) ||
      jsonb_build_object('releaseStage','manual-testing'),
    updated_at=now()
where id='food-nutrition-and-health';

commit;

-- To close testing afterwards, run:
-- update public.spark_subjects
-- set enabled=false, status='draft', updated_at=now()
-- where id='food-nutrition-and-health';
