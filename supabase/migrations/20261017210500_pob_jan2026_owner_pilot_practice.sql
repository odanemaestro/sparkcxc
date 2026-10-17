-- Owner-authorized experimental practice scoring. Calibration remains FALSE.
-- This permits bounded real-world student testing without asserting external validity.
-- General marking quotas, authenticated ownership and revision/source controls remain intact.
begin;
alter table public.spark_marking_config add column if not exists
  pob_historical_jan26_owner_pilot_enabled boolean not null default false;
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

  -- The original and historical banks have different, service-controlled
  -- authorization. Browser metadata never grants an examination release.
  if v_attempt.subject_id = 'principles-of-business' then
    if v_attempt.bank_version = 'pob-historical-2026-jan-p2-v1' then
      if v_attempt.metadata->>'paper_id' is distinct from 'POB-P2-2026-JAN'
        or v_attempt.metadata->>'source_sha256' is distinct from '0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581'
        or v_attempt.rubric_version is distinct from 'pob-historical-2026-jan-p2-rubric-v1'
        or v_attempt.grader_version is distinct from 'online-v1'
        or v_attempt.score is not null
        or v_attempt.max_score is distinct from 100
      then
        raise exception 'Unsupported historical POB examination version';
      end if;
    elsif v_attempt.bank_version is distinct from 'pob-original-paper2-01'
       or v_attempt.metadata->>'paper_id' is distinct from 'pob-original-paper2-01'
       or v_attempt.score is not null
       or v_attempt.max_score is distinct from 100
    then
      raise exception 'Unsupported POB examination version';
    end if;
  end if;

  select *
  into v_config
  from public.spark_marking_config
  where singleton;

  -- Historical bank has its own, independent fail-closed approval.
  -- Canaries require the one configured tester. Public requires a separate
  -- operator-approved calibration flag. Neither is enabled by migration.
  if v_attempt.subject_id = 'principles-of-business'
     and v_attempt.bank_version = 'pob-historical-2026-jan-p2-v1'
     and not (
       (coalesce(v_config.pob_historical_jan26_public_enabled,false)
        and coalesce(v_config.pob_historical_jan26_calibrated,false))
       or coalesce(v_config.pob_historical_jan26_owner_pilot_enabled,false)
       or
       (coalesce(v_config.pob_historical_jan26_canary_enabled,false)
        and v_config.pob_historical_jan26_tester_id is not null
        and auth.uid() = v_config.pob_historical_jan26_tester_id)
     )
  then
    raise exception 'Historical POB marking not enabled';
  end if;

  -- Explicit operator-controlled canary. A disabled draft does not
  -- become public just because the global English A / IS queue is on.
  if v_attempt.subject_id = 'principles-of-business'
     and v_attempt.bank_version = 'pob-original-paper2-01'
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

create or replace function public.spark_submit_exam_attempt(
  p_attempt_id uuid,
  p_response_snapshot jsonb,
  p_response_snapshot_hash text,
  p_score numeric,
  p_max_score numeric,
  p_metadata jsonb default '{}'::jsonb
)
returns table (
  attempt_id uuid,
  submitted_at timestamptz,
  timed_out boolean,
  server_now timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_row public.spark_exam_attempts%rowtype;
  v_config public.spark_marking_config%rowtype;
  v_historical boolean := false;
begin
  select * into v_row
  from public.spark_exam_attempts
  where id=p_attempt_id and user_id=auth.uid()
  for update;

  if not found then
    raise exception 'Attempt not found';
  end if;

  if v_row.status='submitted' then
    return query select v_row.id,v_row.submitted_at,v_row.timed_out,v_now;
    return;
  end if;

  v_historical :=
      v_row.subject_id='principles-of-business'
      and v_row.paper='02'
      and v_row.bank_version='pob-historical-2026-jan-p2-v1'
      and v_row.rubric_version='pob-historical-2026-jan-p2-rubric-v1'
      and v_row.grader_version='online-v1'
      and v_row.metadata->>'paper_id'='POB-P2-2026-JAN'
      and v_row.metadata->>'source_sha256'='0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581';
  if v_row.subject_id='principles-of-business'
    and v_row.bank_version='pob-historical-2026-jan-p2-v1'
  then
    select * into v_config from public.spark_marking_config where singleton;
    if not v_historical
       or not ((v_config.pob_historical_jan26_public_enabled and v_config.pob_historical_jan26_calibrated)
        or v_config.pob_historical_jan26_owner_pilot_enabled
        or (v_config.pob_historical_jan26_canary_enabled
            and auth.uid()=v_config.pob_historical_jan26_tester_id))
    then
      raise exception 'Historical POB submission not enabled';
    end if;
  end if;
  if (v_row.subject_id='principles-of-business' and v_row.paper='02' and p_score is not null)
     or (p_score is null and not (
        (v_row.subject_id='principles-of-business' and v_row.paper='02'
         and v_row.bank_version='pob-original-paper2-01' and p_max_score=100)
         or (v_historical and p_max_score=100)
        )) or p_max_score is null
     or coalesce(p_score::text,'') in ('NaN','Infinity','-Infinity')
     or p_max_score::text in ('NaN','Infinity','-Infinity')
     or p_score < 0 or p_max_score <= 0 or p_score > p_max_score or p_max_score > 10000 then
    raise exception 'Invalid practice score';
  end if;
  if jsonb_typeof(p_response_snapshot) is distinct from 'object'
     or octet_length(p_response_snapshot::text) > 2097152
     or jsonb_typeof(coalesce(p_metadata,'{}'::jsonb)) <> 'object'
     or octet_length(coalesce(p_metadata,'{}'::jsonb)::text) > 16384
     or length(coalesce(p_response_snapshot_hash,'')) > 128 then
    raise exception 'Invalid submission payload';
  end if;

  update public.spark_exam_attempts
  set submitted_at=v_now,
      status='submitted',
      timed_out=(deadline_at is not null and v_now >= deadline_at),
      response_snapshot=coalesce(p_response_snapshot,'{}'::jsonb),
      response_snapshot_hash=p_response_snapshot_hash,
      score=p_score,
      max_score=p_max_score,
      metadata=coalesce(metadata,'{}'::jsonb)
        || (case when v_historical then
             coalesce(p_metadata,'{}'::jsonb) - 'paper_id' - 'source_sha256'
                - 'bank_version' - 'rubric_version' - 'grader_version'
           else coalesce(p_metadata,'{}'::jsonb) end)
        || jsonb_build_object('score_authority',case when v_row.subject_id='principles-of-business' and v_row.paper='02' then 'pending-server-marking' else 'client-practice-estimate' end,'received_after_deadline',v_now >= v_row.deadline_at)
  where id=p_attempt_id;

  return query
  select p_attempt_id,v_now,(v_row.deadline_at is not null and v_now >= v_row.deadline_at),clock_timestamp();
end;
$$;


revoke execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) from public,anon;
grant execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) to authenticated;

commit;
