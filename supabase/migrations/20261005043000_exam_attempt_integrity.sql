-- SPARK Paper 2 server-authoritative attempt provenance and deadlines.
-- Practice clients may fall back locally when offline, but authenticated attempts
-- can use these RPCs for a server clock and idempotent submission.

create table if not exists public.spark_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  subject_id text not null,
  paper text not null,
  session_mode text not null default 'timed',
  bank_version text,
  rubric_version text,
  grader_version text,
  started_at timestamptz not null default clock_timestamp(),
  deadline_at timestamptz,
  submitted_at timestamptz,
  status text not null default 'in_progress' check (status in ('in_progress','submitted')),
  timed_out boolean not null default false,
  response_snapshot jsonb,
  response_snapshot_hash text,
  score numeric,
  max_score numeric,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.spark_exam_attempts enable row level security;

drop policy if exists spark_exam_attempts_select_own on public.spark_exam_attempts;
create policy spark_exam_attempts_select_own
on public.spark_exam_attempts for select
to authenticated
using (user_id = auth.uid());

drop policy if exists spark_exam_attempts_insert_own on public.spark_exam_attempts;
create policy spark_exam_attempts_insert_own
on public.spark_exam_attempts for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists spark_exam_attempts_update_own on public.spark_exam_attempts;
create policy spark_exam_attempts_update_own
on public.spark_exam_attempts for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

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
  if p_duration_seconds is null or p_duration_seconds <= 0 then
    raise exception 'Duration must be positive';
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

  update public.spark_exam_attempts
  set submitted_at=v_now,
      status='submitted',
      timed_out=(deadline_at is not null and v_now >= deadline_at),
      response_snapshot=coalesce(p_response_snapshot,'{}'::jsonb),
      response_snapshot_hash=p_response_snapshot_hash,
      score=p_score,
      max_score=p_max_score,
      metadata=coalesce(metadata,'{}'::jsonb) || coalesce(p_metadata,'{}'::jsonb)
  where id=p_attempt_id;

  return query
  select p_attempt_id,v_now,(v_row.deadline_at is not null and v_now >= v_row.deadline_at),clock_timestamp();
end;
$$;

grant execute on function public.spark_start_exam_attempt(text,text,text,integer,text,text,text,jsonb) to authenticated;
grant execute on function public.spark_exam_attempt_clock(uuid) to authenticated;
grant execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) to authenticated;
