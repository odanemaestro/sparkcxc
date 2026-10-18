-- Batch 4 staging: server-owned grading jobs. Apply only after review.
-- Private schema, no direct client access, no final grade publication.
begin;
create schema if not exists spark_grading_private;
revoke all on schema spark_grading_private from public, anon, authenticated;
grant usage on schema spark_grading_private to service_role;
create table if not exists spark_grading_private.marking_jobs_v2 (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.spark_exam_attempts(id) on delete cascade,
  rubric_version text not null check (length(trim(rubric_version)) between 1 and 128),
  status text not null default 'queued'
    check (status in ('queued','running','retry','provisional','failed')),
  attempts integer not null default 0 check (attempts between 0 and 10),
  lease_token uuid,
  lease_expires_at timestamptz,
  next_run_at timestamptz not null default now(),
  result jsonb,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (attempt_id, rubric_version),
  check ((status='running') = (lease_token is not null and lease_expires_at is not null)),
  check (result is null or jsonb_typeof(result)='object')
);
create index if not exists marking_jobs_v2_ready_idx
  on spark_grading_private.marking_jobs_v2(next_run_at, created_at)
  where status in ('queued','retry');
alter table spark_grading_private.marking_jobs_v2 enable row level security;
revoke all on spark_grading_private.marking_jobs_v2 from public,anon,authenticated;
grant select,insert,update on spark_grading_private.marking_jobs_v2 to service_role;
-- Definer owns the row locks. PUBLIC access is revoked before commit.
create or replace function spark_grading_private.claim_marking_job_v2(p_job_id uuid)
returns table(job_id uuid, attempt_id uuid, rubric_version text, attempts integer, lease_token uuid)
language plpgsql security definer set search_path = '' as $$
declare v_job spark_grading_private.marking_jobs_v2%rowtype;
begin
  if (auth.jwt()->>'role') is distinct from 'service_role' then raise exception 'Forbidden'; end if;
  update spark_grading_private.marking_jobs_v2 j
  set status='running', attempts=j.attempts+1, lease_token=gen_random_uuid(),
      lease_expires_at=clock_timestamp()+interval '2 minutes',
      updated_at=clock_timestamp()
  where j.id=p_job_id and j.attempts<3
    and j.next_run_at<=clock_timestamp()
    and (j.status in ('queued','retry')
      or (j.status='running' and j.lease_expires_at<clock_timestamp()))
  returning * into v_job;
  if found then
    return query select v_job.id,v_job.attempt_id,v_job.rubric_version,v_job.attempts,v_job.lease_token;
  end if;
end; $$;
create or replace function spark_grading_private.finish_marking_job_v2(
  p_job_id uuid,p_lease_token uuid,p_status text,p_reason text,p_result jsonb default null
) returns boolean
language plpgsql security definer set search_path = '' as $$
declare v_count integer;
begin
  if (auth.jwt()->>'role') is distinct from 'service_role' then raise exception 'Forbidden'; end if;
  if p_status not in ('retry','provisional','failed') then raise exception 'Invalid worker terminal status'; end if;
  if p_result is not null and (p_status<>'provisional' or jsonb_typeof(p_result)<>'object'
     or octet_length(p_result::text)>65536) then raise exception 'Invalid result'; end if;
  update spark_grading_private.marking_jobs_v2 j
  set status=p_status,reason=left(coalesce(p_reason,''),100),
      result=p_result,lease_token=null,lease_expires_at=null,
      next_run_at=case when p_status='retry' then clock_timestamp()+interval '1 minute'
                  else j.next_run_at end,
      updated_at=clock_timestamp()
  where j.id=p_job_id and j.status='running'
     and j.lease_token=p_lease_token and j.lease_expires_at>clock_timestamp();
  get diagnostics v_count = row_count;
  return v_count=1;
end; $$;
revoke all on function spark_grading_private.claim_marking_job_v2(uuid) from public,anon,authenticated;
revoke all on function spark_grading_private.finish_marking_job_v2(uuid,uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function spark_grading_private.claim_marking_job_v2(uuid) to service_role;
grant execute on function spark_grading_private.finish_marking_job_v2(uuid,uuid,text,text,jsonb) to service_role;
commit;
