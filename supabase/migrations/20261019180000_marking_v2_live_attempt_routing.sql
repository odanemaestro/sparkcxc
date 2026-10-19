-- Canonical server-owned V2 paper routing, independently of client rubric version.
-- Only verified and activated sources are routable. Unmapped submissions keep
-- the existing live practice path and cannot create V2 jobs.
begin;
alter table public.spark_exam_attempts
 add column if not exists v2_paper_id text,
 add column if not exists v2_rubric_version text,
 add column if not exists v2_response_sha256 text;

create or replace function spark_grading_private.enqueue_submitted_exam_v2(p_attempt_id uuid)
returns uuid language plpgsql security definer set search_path='' as $$
declare a public.spark_exam_attempts%rowtype;
declare r spark_grading_private.rubrics_v2%rowtype;
declare v_count integer;
declare v_job uuid;
declare v_selected text;
begin
 if current_user <> 'postgres' and session_user <> 'postgres' and
    coalesce(auth.jwt()->>'role','') <> 'service_role' then
  raise exception 'Forbidden' using errcode='42501';
 end if;
 select * into a from public.spark_exam_attempts where id=p_attempt_id
 and status='submitted' and paper='02' for update;
 if not found then return null; end if;
 if a.v2_rubric_version is not null then
  select id into v_job from spark_grading_private.marking_jobs_v2
   where attempt_id=a.id and rubric_version=a.v2_rubric_version;
  return v_job;
 end if;
 if a.metadata->>'paper_id' is null or
   jsonb_typeof(a.response_snapshot) is distinct from 'object' then
  return null;
 end if;
 v_selected:=a.metadata->>'selected_creative_prompt';
 -- English A papers are six-task combinations, not their 5-character base IDs.
 -- Never guess a choice where multiple variants remain plausible.
 select count(*),min(r0.paper_id) into v_count,v_selected
 from spark_grading_private.rubrics_v2 r0
 where r0.subject_id=a.subject_id and r0.active
  and r0.verification_status='verified'
  and r0.source_sha256 ~ '^[a-f0-9]{64}$'
  and (select sum((c->>'maxMarks')::int) from
       jsonb_array_elements(r0.criteria)c)=r0.expected_total_marks
  and (
    (a.subject_id='english-a'
      and a.bank_version='english-a-paper2-v1'
      and r0.paper_id like (a.metadata->>'paper_id')||'-C_'
      and exists (select 1 from jsonb_array_elements(r0.criteria)c
        where c->>'id'=a.metadata->>'selected_creative_prompt')
      and not exists(select 1 from jsonb_object_keys(a.response_snapshot) k
        where k like (a.metadata->>'paper_id')||'-M2-C_'
        and k<>(a.metadata->>'selected_creative_prompt')))
    or (a.subject_id<>'english-a'
      and r0.paper_id=a.metadata->>'paper_id'
      and (a.subject_id<>'principles-of-business'
       or a.bank_version=r0.paper_id))
  )
  and not exists (
    select 1 from jsonb_object_keys(a.response_snapshot) k
    where not exists (
      select 1 from jsonb_array_elements(r0.criteria)c
      where k=c->>'id' or k=(c->>'id')||':analysis'
       or (a.subject_id<>'english-a' and split_part(c->>'id','::',1)=k)
    )
  );
 if v_count<>1 then return null; end if;
 select * into r from spark_grading_private.rubrics_v2
 where subject_id=a.subject_id and paper_id=v_selected
 and active and verification_status='verified';
 if not found then return null; end if;
 update public.spark_exam_attempts
 set v2_paper_id=r.paper_id,v2_rubric_version=r.rubric_version,
 v2_response_sha256=encode(pg_catalog.sha256(convert_to(a.response_snapshot::text,'UTF8')),'hex')
 where id=a.id and v2_rubric_version is null;
 insert into spark_grading_private.marking_jobs_v2(attempt_id,rubric_version)
 values(a.id,r.rubric_version)
 on conflict(attempt_id,rubric_version) do nothing;
 select id into v_job from spark_grading_private.marking_jobs_v2
 where attempt_id=a.id and rubric_version=r.rubric_version;
 return v_job;
end $$;
revoke all on function spark_grading_private.enqueue_submitted_exam_v2(uuid) from public,anon,authenticated;
grant execute on function spark_grading_private.enqueue_submitted_exam_v2(uuid) to service_role;

create or replace function spark_grading_private.submission_v2_queue_trigger()
returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.paper='02' and new.status='submitted'
  and (tg_op='INSERT' or old.status is distinct from 'submitted') then
  perform spark_grading_private.enqueue_submitted_exam_v2(new.id);
 end if;
 return new;
end $$;
drop trigger if exists spark_exam_attempt_v2_enqueue on public.spark_exam_attempts;
create trigger spark_exam_attempt_v2_enqueue
 after insert or update of status on public.spark_exam_attempts
 for each row execute function spark_grading_private.submission_v2_queue_trigger();

create or replace function public.spark_v2_claim_next_shadow_job()
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_job uuid;
declare v_claim record;
declare v_attempt public.spark_exam_attempts%rowtype;
declare v_rubric spark_grading_private.rubrics_v2%rowtype;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role'
  and session_user<>'postgres' then
  raise exception 'Forbidden' using errcode='42501';
 end if;
 select id into v_job from spark_grading_private.marking_jobs_v2
 where (status in ('queued','retry') or
 (status='running' and lease_expires_at<clock_timestamp()))
 and attempts<3 and next_run_at<=clock_timestamp()
 order by next_run_at,created_at,id for update skip locked limit 1;
 if v_job is null then return null; end if;
 select * into v_claim from spark_grading_private.claim_marking_job_v2(v_job);
 if not found then return null; end if;
 select * into v_attempt from public.spark_exam_attempts a
 where a.id=v_claim.attempt_id and a.status='submitted'
 and a.paper='02' and a.v2_rubric_version=v_claim.rubric_version;
 if not found then
  perform spark_grading_private.finish_marking_job_v2(
  v_claim.job_id,v_claim.lease_token,'failed','missing-verified-v2-submission',null);
  return null;
 end if;
 select * into v_rubric from spark_grading_private.rubrics_v2 r
 where r.subject_id=v_attempt.subject_id and r.paper_id=v_attempt.v2_paper_id
 and r.rubric_version=v_claim.rubric_version
 and r.active and r.verification_status='verified';
 if not found or
 v_attempt.v2_response_sha256 is distinct from
 encode(pg_catalog.sha256(convert_to(v_attempt.response_snapshot::text,'UTF8')),'hex') then
  perform spark_grading_private.finish_marking_job_v2(
  v_claim.job_id,v_claim.lease_token,'failed','source-or-response-integrity-mismatch',null);
  return null;
 end if;
 return jsonb_build_object(
 'jobId',v_claim.job_id,'leaseToken',v_claim.lease_token,
 'attemptId',v_attempt.id,'subjectId',v_attempt.subject_id,
 'paperId',v_rubric.paper_id,'rubricVersion',v_rubric.rubric_version,
 'sourceSha256',v_rubric.source_sha256,'attempts',v_claim.attempts,
 'criteria',v_rubric.criteria,'responses',v_attempt.response_snapshot
 );
end $$;
revoke all on function public.spark_v2_claim_next_shadow_job()
 from public,anon,authenticated;
grant execute on function public.spark_v2_claim_next_shadow_job()
 to service_role;
commit;