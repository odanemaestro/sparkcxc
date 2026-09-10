select to_regclass('public.spark_subject_progress') as subject_progress_table;
select to_regclass('public.spark_subject_activity_events') as subject_activity_events_table;

select proname
from pg_proc
where proname in (
  'spark_record_subject_progress',
  'spark_sync_subject_progress',
  'spark_reward_weekly_scores',
  'spark_reward_lifetime_points'
)
order by proname;

select policyname, cmd
from pg_policies
where schemaname='public'
  and tablename in ('spark_subject_progress','spark_subject_activity_events')
order by tablename, policyname;

select tablename
from pg_publication_tables
where pubname='supabase_realtime'
  and schemaname='public'
  and tablename in ('spark_subject_progress','spark_subject_activity_events')
order by tablename;
