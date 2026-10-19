-- Scheduled V2 server worker. Source credentials stay encrypted in Vault.
-- Without an explicitly provisioned spark_v2_service_role_key the scheduler
-- makes no HTTP request and leaves live grading unchanged.
do $setup$
begin
 if not exists (select 1 from vault.secrets where name='spark_project_url') then
  raise exception 'Project endpoint not present in Supabase Vault';
 end if;
 perform cron.schedule(
  'spark-mark-paper2-v2-worker',
  '*/2 * * * *',
  $schedule$
    select net.http_post(
      url:=(select decrypted_secret from vault.decrypted_secrets
        where name='spark_project_url' limit 1) ||
        '/functions/v1/mark-paper2-v2-shadow',
      headers:=jsonb_build_object(
        'Content-Type','application/json',
        'Authorization','Bearer '||
         (select decrypted_secret from vault.decrypted_secrets
          where name='spark_v2_service_role_key' limit 1)),
      body:='{}'::jsonb
    )
    where exists(select 1 from vault.secrets
      where name='spark_v2_service_role_key');
  $schedule$
 );
end $setup$;