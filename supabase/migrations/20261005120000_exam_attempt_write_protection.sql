-- Restrict attempts to owned, idempotent RPC writes. Client scores remain estimates.
-- Late responses remain available for practice; they are explicitly flagged, not certified.
begin;
drop policy if exists spark_exam_attempts_insert_own on public.spark_exam_attempts;
drop policy if exists spark_exam_attempts_update_own on public.spark_exam_attempts;
revoke insert, update, delete, truncate, references, trigger on public.spark_exam_attempts from public, anon, authenticated;
grant select on public.spark_exam_attempts to authenticated;
create index if not exists spark_exam_attempts_user_started_idx
  on public.spark_exam_attempts(user_id,started_at desc);
create or replace function public.spark_start_exam_attempt(
  p_subject_id text,
  p_paper text,
  p_session_mode text,
  p_duration_seconds integer,
  p_bank_version text default null,
  p_rubric_version text default null,
  p_grader_version text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns table (
  attempt_id uuid,
  started_at timestamptz,
  deadline_at timestamptz,
  server_now timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  if p_duration_seconds is null or p_duration_seconds <= 0 or p_duration_seconds > 21600 then
    raise exception 'Duration must be between 1 second and 6 hours';
  end if;
  -- Durations for the two clients currently using these RPCs are server-owned.
  if p_paper='02' and coalesce(p_session_mode,'timed')='timed' and (
    (p_subject_id='english-a' and p_duration_seconds<>9900) or
    (p_subject_id='integrated-science' and p_duration_seconds<>9000)
  ) then
    raise exception 'Duration does not match this timed paper';
  end if;

  if p_subject_id is null or length(p_subject_id) not between 1 and 80
     or p_paper not in ('01','02') or p_paper is null
     or coalesce(p_session_mode,'timed') not in ('timed','practice') then
    raise exception 'Invalid exam configuration';
  end if;
  if jsonb_typeof(coalesce(p_metadata,'{}'::jsonb)) <> 'object'
     or octet_length(coalesce(p_metadata,'{}'::jsonb)::text) > 16384 then
    raise exception 'Invalid attempt metadata';
  end if;

  insert into public.spark_exam_attempts(
    user_id,subject_id,paper,session_mode,bank_version,rubric_version,grader_version,
    started_at,deadline_at,metadata
  ) values (
    auth.uid(),p_subject_id,p_paper,coalesce(nullif(p_session_mode,''),'timed'),
    p_bank_version,p_rubric_version,p_grader_version,
    v_now,v_now + make_interval(secs => p_duration_seconds),coalesce(p_metadata,'{}'::jsonb)
  )
  returning id into v_id;

  return query
  select v_id,v_now,v_now + make_interval(secs => p_duration_seconds),clock_timestamp();
end;
$$;

create or replace function public.spark_exam_attempt_clock(p_attempt_id uuid)
returns table (
  attempt_id uuid,
  status text,
  started_at timestamptz,
  deadline_at timestamptz,
  submitted_at timestamptz,
  server_now timestamptz,
  expired boolean
)
language sql
security definer
set search_path = public
as $$
  select a.id,a.status,a.started_at,a.deadline_at,a.submitted_at,clock_timestamp(),
         (a.deadline_at is not null and clock_timestamp() >= a.deadline_at)
  from public.spark_exam_attempts a
  where a.id=p_attempt_id and a.user_id=auth.uid();
$$;

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

  if p_score is null or p_max_score is null
     or p_score::text in ('NaN','Infinity','-Infinity')
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
      metadata=coalesce(metadata,'{}'::jsonb) || coalesce(p_metadata,'{}'::jsonb)
        || jsonb_build_object('score_authority','client-practice-estimate','received_after_deadline',v_now >= v_row.deadline_at)
  where id=p_attempt_id;

  return query
  select p_attempt_id,v_now,(v_row.deadline_at is not null and v_now >= v_row.deadline_at),clock_timestamp();
end;
$$;

grant execute on function public.spark_start_exam_attempt(text,text,text,integer,text,text,text,jsonb) to authenticated;
grant execute on function public.spark_exam_attempt_clock(uuid) to authenticated;
grant execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) to authenticated;

revoke execute on function public.spark_start_exam_attempt(text,text,text,integer,text,text,text,jsonb) from public, anon;
revoke execute on function public.spark_exam_attempt_clock(uuid) from public, anon;
revoke execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) from public, anon;
commit;
