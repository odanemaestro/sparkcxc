-- Private V2 review gate and service-only shadow worker bridge.
-- Draft source criteria are never active or publishable.
begin;

alter table spark_grading_private.rubrics_v2
 add column if not exists verification_status text not null default 'draft'
   check (verification_status in ('draft','verified')),
 add column if not exists source_sha256 text,
 add column if not exists verified_by text,
 add column if not exists verified_at timestamptz;

alter table spark_grading_private.rubrics_v2
 add constraint rubrics_v2_active_requires_review
 check (not active or (
   verification_status='verified'
   and source_sha256 ~ '^[0-9a-f]{64}$'
   and length(trim(verified_by))>=3
   and verified_at is not null
 ));

-- Do not expose any raw input, rubric, or score writes to browser roles.
create or replace function public.spark_v2_claim_next_shadow_job()
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_job uuid;
declare v_claim record;
declare v_attempt public.spark_exam_attempts%rowtype;
declare v_rubric spark_grading_private.rubrics_v2%rowtype;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role'
   and session_user <> 'postgres' then
    raise exception 'Forbidden' using errcode='42501';
 end if;
 select id into v_job
 from spark_grading_private.marking_jobs_v2
 where (status in ('queued','retry') or
        (status='running' and lease_expires_at<clock_timestamp()))
   and attempts<3 and next_run_at<=clock_timestamp()
 order by next_run_at,created_at,id for update skip locked limit 1;
 if v_job is null then return null; end if;
 select * into v_claim
   from spark_grading_private.claim_marking_job_v2(v_job);
 if not found then return null; end if;
 select * into v_attempt from public.spark_exam_attempts a
   where a.id=v_claim.attempt_id and a.status='submitted' and a.paper='02'
     and a.rubric_version=v_claim.rubric_version;
 if not found then
    perform spark_grading_private.finish_marking_job_v2(
      v_claim.job_id,v_claim.lease_token,'failed','missing-valid-submission',null);
    return null;
 end if;
 select * into v_rubric from spark_grading_private.rubrics_v2 r
 where r.subject_id=v_attempt.subject_id and r.paper_id=v_attempt.metadata->>'paper_id'
   and r.rubric_version=v_claim.rubric_version
   and r.active and r.verification_status='verified';
 if not found then
    perform spark_grading_private.finish_marking_job_v2(
      v_claim.job_id,v_claim.lease_token,'failed','missing-verified-server-rubric',null);
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

create or replace function public.spark_v2_finish_shadow_job(
  p_job_id uuid,p_lease_token uuid,p_reviewed_items integer default 0
) returns boolean language plpgsql security definer set search_path='' as $$
declare v_max integer;
declare v_parts jsonb;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role'
   and session_user <> 'postgres' then
   raise exception 'Forbidden' using errcode='42501';
 end if;
 if p_reviewed_items is null or p_reviewed_items<0 or p_reviewed_items>10000 then
   raise exception 'Invalid diagnostic count';
 end if;
 select coalesce(sum((c->>'maxMarks')::integer),0),
        coalesce(jsonb_agg(jsonb_build_object(
          'id',c->>'id','maxMarks',(c->>'maxMarks')::integer,
          'confirmedMarks',0,'unresolvedMarks',(c->>'maxMarks')::integer
        )),'[]'::jsonb)
 into v_max,v_parts
 from spark_grading_private.marking_jobs_v2 j
 join public.spark_exam_attempts a on a.id=j.attempt_id
 join spark_grading_private.rubrics_v2 r on
    r.subject_id=a.subject_id and r.rubric_version=j.rubric_version
    and r.paper_id=a.metadata->>'paper_id'
 cross join lateral jsonb_array_elements(r.criteria) c
 where j.id=p_job_id and j.lease_token=p_lease_token
   and r.active and r.verification_status='verified';
 if v_max<=0 then return false; end if;
 return spark_grading_private.finish_marking_job_v2(
 p_job_id,p_lease_token,'provisional','requires-independent-mark-reconciliation',
 jsonb_build_object('authority','advisory','finalScore',null,'confirmedMarks',0,
   'maxMarks',v_max,'unresolvedMarks',v_max,'reviewedItems',p_reviewed_items,
   'parts',v_parts,'canPublishFinalScore',false));
end $$;
revoke all on function public.spark_v2_finish_shadow_job(uuid,uuid,integer)
 from public,anon,authenticated;
grant execute on function public.spark_v2_finish_shadow_job(uuid,uuid,integer)
 to service_role;

commit;
