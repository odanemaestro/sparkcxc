-- Verified, atomic, service-only Paper 2 score publication.
-- Only structurally approved server rubrics and fully resolved criterion rows
-- can replace a client estimate. Unresolved evidence is retained as provisional.
begin;
alter table spark_grading_private.marking_jobs_v2
 drop constraint if exists marking_jobs_v2_status_check;
alter table spark_grading_private.marking_jobs_v2
 add constraint marking_jobs_v2_status_check
 check (status in ('queued','running','retry','provisional','verified','failed'));

create or replace function public.spark_v2_complete_subject_job(
 p_job_id uuid,p_lease_token uuid,p_rows jsonb,p_bundle_sha256 text
) returns jsonb language plpgsql security definer set search_path='' as $$
declare
 v_attempt public.spark_exam_attempts%rowtype;
 v_rubric spark_grading_private.rubrics_v2%rowtype;
 v_job spark_grading_private.marking_jobs_v2%rowtype;
 v_row jsonb;
 v_part jsonb;
 v_seen text[] := '{}';
 v_mark numeric;v_total numeric:=0;v_max numeric:=0;v_unresolved numeric:=0;
 v_count integer:=0;
 v_result jsonb;
 v_verified boolean;
 v_method text;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role'
  and session_user<>'postgres' then
  raise exception 'Forbidden' using errcode='42501';
 end if;
 if p_rows is null or jsonb_typeof(p_rows)<>'array'
  or jsonb_array_length(p_rows) not between 1 and 1000
  or octet_length(p_rows::text)>180000
  or p_bundle_sha256 is null or p_bundle_sha256 !~ '^[a-f0-9]{64}$' then
  raise exception 'Invalid trusted examiner payload';
 end if;
 select * into v_job from spark_grading_private.marking_jobs_v2
  where id=p_job_id and lease_token=p_lease_token and status='running'
   and lease_expires_at>clock_timestamp() for update;
 if not found then return jsonb_build_object('status','stale-lease'); end if;
 select * into v_attempt from public.spark_exam_attempts where id=v_job.attempt_id
  and status='submitted' and paper='02'
  and v2_rubric_version=v_job.rubric_version for update;
 if not found then raise exception 'Attempt or registered version invalid'; end if;
 if v_attempt.v2_response_sha256 is distinct from
 encode(pg_catalog.sha256(convert_to(v_attempt.response_snapshot::text,'UTF8')),'hex') then
  raise exception 'Submission source drift';
 end if;
 select * into v_rubric from spark_grading_private.rubrics_v2
 where subject_id=v_attempt.subject_id and paper_id=v_attempt.v2_paper_id
 and rubric_version=v_job.rubric_version and active
 and verification_status='verified' for share;
 if not found or v_rubric.source_sha256 is null or
 v_rubric.expected_total_marks is null then
  raise exception 'No approved rubric';
 end if;
 if jsonb_array_length(p_rows)<>jsonb_array_length(v_rubric.criteria) then
  raise exception 'Incomplete paper coverage';
 end if;
 for v_row in select value from jsonb_array_elements(p_rows) loop
  if jsonb_typeof(v_row)<>'object'
    or (select count(*) from jsonb_object_keys(v_row))<>5
    or coalesce(v_row->>'criterionId','')=''
    or coalesce(v_row->>'suggestedMarks','')!~ '^[0-9]+(\\.[0-9]{1,3})?$'
    or coalesce(v_row->>'maxMarks','')!~ '^[1-9][0-9]*$'
    or jsonb_typeof(v_row->'resolved') is distinct from 'boolean'
    or coalesce(v_row->>'method','')!~ '^existing-[A-Za-z0-9-]{3,80}$' then
   raise exception 'Invalid verified examiner row';
  end if;
  if (v_row->>'criterionId')=any(v_seen) then raise exception 'Duplicate criterion'; end if;
  v_seen:=array_append(v_seen,v_row->>'criterionId');
  select c into v_part from jsonb_array_elements(v_rubric.criteria)c
   where c->>'id'=v_row->>'criterionId';
  if not found then raise exception 'Unknown criterion'; end if;
  v_mark:=(v_row->>'suggestedMarks')::numeric;
  if (v_row->>'maxMarks')::integer<>(v_part->>'maxMarks')::integer
   or v_mark>(v_part->>'maxMarks')::integer or v_mark<0 then
   raise exception 'Criterion mark exceeds source scheme';
  end if;
  v_method:=v_row->>'method';
  if (v_rubric.subject_id='mathematics' and v_method<>'existing-mathematics-MAB-ECF')
    or (v_rubric.subject_id='physics' and v_method<>'existing-physics-rubric-checks')
    or (v_rubric.subject_id='information-technology' and v_method<>'existing-IT-specific-rules')
    or (v_rubric.subject_id='chemistry' and v_method<>'existing-chemistry-evidence')
    or (v_rubric.subject_id='english-a' and v_method<>'existing-english-a-analytic-rubric')
    or (v_rubric.subject_id='food-nutrition-and-health' and v_method<>'existing-FNH-criterion-evidence')
    or (v_rubric.subject_id='integrated-science' and v_method<>'existing-integrated-science-evidence')
    or (v_rubric.subject_id='principles-of-business' and v_method<>'existing-POB-subcriterion-evidence')
    or (v_rubric.subject_id='social-studies' and v_method not in
       ('existing-social-studies-concepts','existing-social-studies-essay','existing-social-studies-blank')) then
   raise exception 'Subject examiner provenance mismatch';
  end if;
  v_total:=v_total+v_mark;
  v_max:=v_max+(v_part->>'maxMarks')::numeric;
  if (v_row->>'resolved')::boolean=false then
   v_unresolved:=v_unresolved+(v_part->>'maxMarks')::numeric;
  end if;
  v_count:=v_count+1;
 end loop;
 if v_max is distinct from v_rubric.expected_total_marks or
   v_total>v_max then raise exception 'Paper total mismatch'; end if;
 v_verified:=v_unresolved=0;
 v_result:=jsonb_build_object(
  'authority',case when v_verified then 'server-v2-deterministic' else 'server-v2-provisional' end,
  'bundleSha256',p_bundle_sha256,'paperId',v_rubric.paper_id,
  'rubricVersion',v_rubric.rubric_version,'sourceSha256',v_rubric.source_sha256,
  'reviewedItems',v_count,'maxMarks',v_max,
  'candidateMarks',v_total,'confirmedMarks',case when v_verified then v_total else null end,
  'unresolvedMarks',v_unresolved,'finalScore',case when v_verified then v_total else null end,
  'canPublishFinalScore',v_verified,'parts',p_rows);
 update spark_grading_private.marking_jobs_v2
 set status=case when v_verified then 'verified' else 'provisional' end,
  result=v_result,reason=case when v_verified then 'server-rule-reconciled'
   else 'unresolved-criterion-evidence' end,
  lease_token=null,lease_expires_at=null,updated_at=clock_timestamp()
 where id=v_job.id and lease_token=p_lease_token
 and status='running' and lease_expires_at>clock_timestamp();
 if not found then raise exception 'Worker lease lost'; end if;
 if v_verified then
  update public.spark_exam_attempts set
   score=v_total,max_score=v_max,grader_version='spark-paper2-v2',
   metadata=metadata||jsonb_build_object(
     'score_authority','server-v2-deterministic','v2_paper_id',v_rubric.paper_id,
     'v2_rubric_version',v_rubric.rubric_version,
     'v2_source_sha256',v_rubric.source_sha256,
     'v2_marker_sha256',p_bundle_sha256,
     'v2_verified_at',clock_timestamp(),
     'v2_confirmed_marks',v_total,'v2_unresolved_marks',0)
  where id=v_attempt.id and status='submitted';
 end if;
 return jsonb_build_object('status',case when v_verified then 'verified' else 'provisional' end,
 'score',case when v_verified then v_total else null end,
 'maxMarks',v_max,'unresolvedMarks',v_unresolved);
end $$;
revoke all on function public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)
 from public,anon,authenticated;
grant execute on function public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)
 to service_role;
commit;