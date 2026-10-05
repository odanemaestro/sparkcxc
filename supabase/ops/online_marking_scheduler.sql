-- SPARK online Paper 2 automatic marking scheduler
-- Run this in the target Supabase project's SQL Editor after:
-- 1. mark-paper2 is deployed,
-- 2. OPENAI_API_KEY, SPARK_MARKING_MODEL and SPARK_MARKER_SECRET are configured,
-- 3. the queue migration has been applied.
--
-- This is intentionally NOT a migration because the project URL and secret are
-- environment-specific operational values.

create extension if not exists pg_cron;
create extension if not exists pg_net;
create extension if not exists supabase_vault with schema vault;

-- Create these two Vault secrets once per environment.
-- Replace the placeholder values before running these two statements.
-- select vault.create_secret('https://YOUR-PROJECT-REF.supabase.co', 'spark_project_url');
-- select vault.create_secret('YOUR-STRONG-SPARK-MARKER-SECRET', 'spark_marker_secret');

-- Remove an earlier schedule with this name before recreating it.
do $$
declare
  v_job_id bigint;
begin
  select jobid into v_job_id
  from cron.job
  where jobname='spark-mark-paper2-worker'
  limit 1;

  if v_job_id is not null then
    perform cron.unschedule(v_job_id);
  end if;
end $$;

select cron.schedule(
  'spark-mark-paper2-worker',
  '* * * * *',
  $$
  select net.http_post(
    url := (
      select decrypted_secret
      from vault.decrypted_secrets
      where name='spark_project_url'
      limit 1
    ) || '/functions/v1/mark-paper2',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'x-spark-marker-secret',(
        select decrypted_secret
        from vault.decrypted_secrets
        where name='spark_marker_secret'
        limit 1
      )
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Verification
select jobid,jobname,schedule,active
from cron.job
where jobname='spark-mark-paper2-worker';

-- To pause scheduling without deleting the job:
-- update cron.job set active=false where jobname='spark-mark-paper2-worker';

-- To resume:
-- update cron.job set active=true where jobname='spark-mark-paper2-worker';
