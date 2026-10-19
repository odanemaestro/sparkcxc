-- V2 source-bound numeric suggestions: advisory storage only.
-- Server reloads rubric ceiling and fences writes with the job lease.
begin;

create or replace function public.spark_v2_finish_shadow_job_with_advisory(
 p_job_id uuid,p_lease_token uuid,p_reviewed_items integer,p_candidates jsonb
) returns boolean language plpgsql security definer set search_path='' as $$
declare
 v_rubric jsonb;
 v_max integer;
 v_row jsonb;
 v_part jsonb;
 v_suggested integer := 0;
 v_count integer := 0;
 v_seen text[] := '{}';
 v_candidate_marks integer;
 v_result jsonb;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role'
    and session_user<>'postgres' then
   raise exception 'Forbidden' using errcode='42501';
 end if;
 if p_candidates is null or jsonb_typeof(p_candidates)<>'array'
   or jsonb_array_length(p_candidates)>200 or octet_length(p_candidates::text)>32000 then
   raise exception 'Invalid shadow diagnostics payload';
 end if;
 select r.criteria into v_rubric
 from spark_grading_private.marking_jobs_v2 j
 join public.spark_exam_attempts a on a.id=j.attempt_id
 join spark_grading_private.rubrics_v2 r on
    r.subject_id=a.subject_id and r.paper_id=a.metadata->>'paper_id'
    and r.rubric_version=j.rubric_version
 where j.id=p_job_id and j.lease_token=p_lease_token
   and j.status='running' and j.lease_expires_at>clock_timestamp()
   and a.status='submitted' and a.paper='02'
   and a.rubric_version=j.rubric_version
   and r.active and r.verification_status='verified';
 if v_rubric is null then return false; end if;
 if p_reviewed_items is distinct from jsonb_array_length(v_rubric) then
   raise exception 'Shadow reviewed-criterion count mismatch';
 end if;
 select coalesce(sum((c->>'maxMarks')::integer),0) into v_max
 from jsonb_array_elements(v_rubric) c;
 if v_max<=0 or v_max>1000 then raise exception 'Invalid server rubric ceiling'; end if;
 for v_row in select value from jsonb_array_elements(p_candidates) loop
   if jsonb_typeof(v_row)<>'object'
      or (select count(*) from jsonb_object_keys(v_row))<>3
      or v_row->>'criterionId' is null
      or v_row->>'rule' not in ('scalar-answer-match','typed-numeric-check')
      or coalesce(v_row->>'suggestedMarks','') !~ '^[1-9][0-9]*$' then
     raise exception 'Invalid shadow candidate';
   end if;
   if v_row->>'criterionId'=any(v_seen) then
     raise exception 'Duplicate shadow candidate';
   end if;
   v_seen:=array_append(v_seen,v_row->>'criterionId');
   select c into v_part from jsonb_array_elements(v_rubric) c
      where c->>'id'=v_row->>'criterionId';
   if v_part is null then raise exception 'Unknown shadow criterion'; end if;
   v_candidate_marks:=(v_row->>'suggestedMarks')::integer;
   if v_candidate_marks>(v_part->>'maxMarks')::integer then
     raise exception 'Shadow candidate exceeds registered rubric ceiling';
   end if;
   v_suggested:=v_suggested+v_candidate_marks;
   v_count:=v_count+1;
 end loop;
 if v_suggested>v_max then raise exception 'Shadow suggestions exceed paper maximum'; end if;
 v_result=jsonb_build_object(
   'authority','advisory','finalScore',null,'confirmedMarks',0,
   'maxMarks',v_max,'unresolvedMarks',v_max,
   'reviewedItems',p_reviewed_items,'candidateParts',v_count,
   'suggestedMarks',v_suggested,'candidates',p_candidates,
   'canPublishFinalScore',false
 );
 return spark_grading_private.finish_marking_job_v2(
   p_job_id,p_lease_token,'provisional',
   'requires-independent-mark-reconciliation',v_result
 );
end $$;

revoke all on function public.spark_v2_finish_shadow_job_with_advisory(uuid,uuid,integer,jsonb)
 from public,anon,authenticated;
grant execute on function public.spark_v2_finish_shadow_job_with_advisory(uuid,uuid,integer,jsonb)
 to service_role;
commit;
