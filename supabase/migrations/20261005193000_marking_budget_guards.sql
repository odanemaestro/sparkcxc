-- Cost and usage guards for optional automated Paper 2 marking.
-- The normal SPARK grader remains authoritative when a deeper check is unavailable.
begin;

alter table public.spark_marking_config
  add column if not exists daily_global_limit integer not null default 20
    check(daily_global_limit between 1 and 10000),
  add column if not exists daily_token_budget bigint not null default 1000000
    check(daily_token_budget between 10000 and 1000000000),
  add column if not exists per_job_token_reservation integer not null default 50000
    check(per_job_token_reservation between 1000 and 500000);

alter table public.spark_marking_jobs
  add column if not exists reserved_tokens integer not null default 50000
    check(reserved_tokens between 0 and 500000);

-- Safer public-test default. This can be raised deliberately after cost review.
update public.spark_marking_config
set daily_user_limit=least(daily_user_limit,3),
    daily_global_limit=least(daily_global_limit,20),
    daily_token_budget=least(daily_token_budget,1000000),
    per_job_token_reservation=greatest(per_job_token_reservation,50000)
where singleton=true;

create or replace function public.spark_enqueue_marking(p_attempt_id uuid)
returns public.spark_marking_jobs
language plpgsql
security definer
set search_path=public
as $$
declare
  v_attempt public.spark_exam_attempts%rowtype;
  v_config public.spark_marking_config%rowtype;
  v_job public.spark_marking_jobs%rowtype;
  v_day_start timestamptz := date_trunc('day',clock_timestamp());
  v_global_jobs integer;
  v_reserved bigint;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;

  select * into v_attempt
  from public.spark_exam_attempts
  where id=p_attempt_id and user_id=auth.uid();

  if not found or v_attempt.status<>'submitted' then
    raise exception 'Submitted attempt required';
  end if;

  if v_attempt.subject_id not in ('english-a','integrated-science') or v_attempt.paper<>'02' then
    raise exception 'Unsupported assessment';
  end if;

  select * into v_config
  from public.spark_marking_config
  where singleton;

  -- Disabled means: silently keep the normal SPARK grade.
  if not coalesce(v_config.enabled,false) then return null; end if;

  -- Serialize this user's enqueue attempts so repeated clicks cannot race.
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));

  -- Reuse an already-created job for this attempt/revision without consuming
  -- another daily allowance.
  select * into v_job
  from public.spark_marking_jobs
  where attempt_id=p_attempt_id and revision=v_config.revision;

  if found then return v_job; end if;

  -- Per-student rolling 24-hour cap.
  if (
    select count(*)
    from public.spark_marking_jobs
    where user_id=auth.uid()
      and created_at>clock_timestamp()-interval '24 hours'
  ) >= v_config.daily_user_limit then
    return null;
  end if;

  -- A single global lock makes daily reservations atomic across users.
  perform pg_advisory_xact_lock(hashtextextended('spark-marking-daily-budget',0));

  select count(*),coalesce(sum(reserved_tokens),0)
    into v_global_jobs,v_reserved
  from public.spark_marking_jobs
  where created_at>=v_day_start;

  if v_global_jobs>=v_config.daily_global_limit then return null; end if;

  -- Reserve a conservative token allowance before a provider call exists.
  -- This prevents queued work from silently exceeding the configured daily
  -- budget even when several students request checks at the same time.
  if v_reserved+v_config.per_job_token_reservation>v_config.daily_token_budget then
    return null;
  end if;

  insert into public.spark_marking_jobs(
    attempt_id,user_id,revision,reserved_tokens
  ) values(
    p_attempt_id,auth.uid(),v_config.revision,v_config.per_job_token_reservation
  )
  returning * into v_job;

  return v_job;
end;
$$;

revoke all on function public.spark_enqueue_marking(uuid) from public,anon;
grant execute on function public.spark_enqueue_marking(uuid) to authenticated;

commit;
