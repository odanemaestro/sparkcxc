-- Controlled POB Paper 02 queue roll-out. Preserve LIVE production's existing
-- global daily job / token limits, per-user cap, idempotency and locks.
-- Historical CXC POB source IDs are NEVER permitted.
--
-- The SPARK original bank may be queued only when a service-role operator
-- explicitly opts in AND identifies a single internal authenticated tester.
-- Both defaults are fail-closed, so applying this migration cannot
-- auto-enable POB grading or expose it publicly.
begin;

alter table public.spark_marking_config
  add column if not exists pob_original_enabled boolean not null default false;
alter table public.spark_marking_config
  add column if not exists pob_internal_tester_user_id uuid default null;

create or replace function public.spark_enqueue_marking(p_attempt_id uuid)
returns public.spark_marking_jobs
language plpgsql
security definer
set search_path=public
as $function$
declare
  v_attempt public.spark_exam_attempts%rowtype;
  v_config public.spark_marking_config%rowtype;
  v_job public.spark_marking_jobs%rowtype;

  v_day_start timestamptz := date_trunc('day', clock_timestamp());
  v_global_jobs integer;
  v_reserved bigint;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select *
  into v_attempt
  from public.spark_exam_attempts
  where id = p_attempt_id
    and user_id = auth.uid();

  if not found or v_attempt.status <> 'submitted' then
    raise exception 'Submitted attempt required';
  end if;

  if v_attempt.paper <> '02'
     or v_attempt.subject_id not in (
       'english-a','integrated-science','principles-of-business'
     ) then
    raise exception 'Unsupported assessment';
  end if;

  -- The candidate does not control the trusted POB grading bank.
  -- Historical POB PDF source IDs must never enter this queue.
  if v_attempt.subject_id = 'principles-of-business'
     and (
       v_attempt.bank_version is distinct from 'pob-original-paper2-01'
       or v_attempt.metadata->>'paper_id' is distinct from 'pob-original-paper2-01'
       or v_attempt.score is not null
       or v_attempt.max_score is distinct from 100
     ) then
    raise exception 'Unsupported POB examination version';
  end if;

  select *
  into v_config
  from public.spark_marking_config
  where singleton;

  -- Explicit operator-controlled canary. A disabled draft does not
  -- become public just because the global English A / IS queue is on.
  if v_attempt.subject_id = 'principles-of-business'
     and (
       not coalesce(v_config.pob_original_enabled,false)
       or v_config.pob_internal_tester_user_id is null
       or auth.uid() is distinct from v_config.pob_internal_tester_user_id
     ) then
    raise exception 'POB internal marking not enabled';
  end if;

  -- Existing global queue switch (applies to EVERY subject).
  if not coalesce(v_config.enabled, false) then
    return null;
  end if;

  -- Serialize attempts for this student to protect rolling quota.
  perform pg_advisory_xact_lock(
    hashtextextended(auth.uid()::text, 0)
  );

  -- Idempotent marking for exactly this attempt and rubric revision.
  select *
  into v_job
  from public.spark_marking_jobs
  where attempt_id = p_attempt_id
    and revision = v_config.revision;
  if found then
    return v_job;
  end if;

  if (
    select count(*)
    from public.spark_marking_jobs
    where user_id = auth.uid()
      and created_at > clock_timestamp() - interval '24 hours'
  ) >= v_config.daily_user_limit then
    return null;
  end if;

  -- Global concurrency-safe reservations protect all other subjects.
  perform pg_advisory_xact_lock(
    hashtextextended('spark-marking-daily-budget', 0)
  );

  select
    count(*),
    coalesce(sum(reserved_tokens), 0)
  into
    v_global_jobs,
    v_reserved
  from public.spark_marking_jobs
  where created_at >= v_day_start;

  if v_global_jobs >= v_config.daily_global_limit then
    return null;
  end if;

  if
    v_reserved + v_config.per_job_token_reservation
      > v_config.daily_token_budget
  then
    return null;
  end if;

  insert into public.spark_marking_jobs (
    attempt_id,
    user_id,
    revision,
    reserved_tokens
  )
  values (
    p_attempt_id,
    auth.uid(),
    v_config.revision,
    v_config.per_job_token_reservation
  )
  returning *
  into v_job;

  return v_job;
end;
$function$;

revoke all on function public.spark_enqueue_marking(uuid) from public,anon;
grant execute on function public.spark_enqueue_marking(uuid) to authenticated;
commit;
