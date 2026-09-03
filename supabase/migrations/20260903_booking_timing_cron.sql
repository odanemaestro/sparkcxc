-- Run after 20260903_booking_timing_notifications.sql.
-- Supabase Cron / pg_cron must already be enabled in Integrations > Cron.

-- Remove an older copy of this same job if it exists, making this script safe
-- to run again while leaving the separate 30-minute confirmed-session reminder alone.
do $$
declare
  v_jobid bigint;
begin
  if to_regnamespace('cron') is null then
    raise exception 'Supabase Cron is not enabled. Enable Integrations > Cron, then run this file again.';
  end if;

  for v_jobid in
    select jobid from cron.job where jobname = 'spark-booking-confirmation-deadlines'
  loop
    perform cron.unschedule(v_jobid);
  end loop;
end;
$$;

select cron.schedule(
  'spark-booking-confirmation-deadlines',
  '*/5 * * * *',
  'select public.spark_process_booking_confirmation_deadlines();'
);
