-- Batch 4 continuation: server-owned, immutable rubric registry and enqueue.
-- Staging migration only. No trigger on production submissions; no score updates.
begin;
create table if not exists spark_grading_private.rubrics_v2 (
 subject_id text not null,
 rubric_version text not null,
 paper_id text not null,
 criteria jsonb not null,
 active boolean not null default false,
 created_at timestamptz not null default now(),
 primary key(subject_id,rubric_version,paper_id),
 check (jsonb_typeof(criteria)='array' and jsonb_array_length(criteria)>0),
 check (length(subject_id) between 1 and 100 and length(rubric_version) between 1 and 128
   and length(paper_id) between 1 and 128)
);
alter table spark_grading_private.rubrics_v2 enable row level security;
revoke all on spark_grading_private.rubrics_v2 from public,anon,authenticated;
grant select on spark_grading_private.rubrics_v2 to service_role;
-- Only migration/operator sessions curate rubrics. Workers read them.
create or replace function spark_grading_private.enqueue_marking_job_v2(p_attempt_id uuid)
returns uuid language plpgsql security definer set search_path='' as $$
declare v_attempt public.spark_exam_attempts%rowtype;
declare v_job_id uuid;
begin
 if session_user not in ('postgres','service_role') then raise exception 'Forbidden'; end if;
 select * into v_attempt from public.spark_exam_attempts
 where id=p_attempt_id and status='submitted' and paper='02';
 if not found then raise exception 'Submitted Paper 2 required'; end if;
 if v_attempt.rubric_version is null or v_attempt.rubric_version='' then
   raise exception 'Rubric version missing';
 end if;
 if not exists (
   select 1 from spark_grading_private.rubrics_v2 r
   where r.subject_id=v_attempt.subject_id
     and r.rubric_version=v_attempt.rubric_version
     and r.paper_id=v_attempt.metadata->>'paper_id' and r.active
 ) then raise exception 'No active server rubric'; end if;
 insert into spark_grading_private.marking_jobs_v2(attempt_id,rubric_version)
 values(v_attempt.id,v_attempt.rubric_version)
 on conflict(attempt_id,rubric_version) do nothing;
 select id into v_job_id from spark_grading_private.marking_jobs_v2
 where attempt_id=v_attempt.id and rubric_version=v_attempt.rubric_version;
 return v_job_id;
end; $$;
revoke all on function spark_grading_private.enqueue_marking_job_v2(uuid) from public,anon,authenticated;
grant execute on function spark_grading_private.enqueue_marking_job_v2(uuid) to service_role;
-- No direct writes of rubric definitions from workers.
commit;
