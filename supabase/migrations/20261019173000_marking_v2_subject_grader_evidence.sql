-- V2 existing nine-course deterministic examiner diagnostics.
-- Every per-part estimate is reconciled against server-owned source ceilings.
-- The output remains advisory until separate, signed criterion verification.
begin;
create or replace function public.spark_v2_finish_shadow_subject_job(
 p_job_id uuid,p_lease_token uuid,p_reviewed_items integer,p_rows jsonb
) returns boolean language plpgsql security definer set search_path='' as $$
declare v_rubric jsonb;
declare v_total integer;
declare v_row jsonb;
declare v_part jsonb;
declare v_identity text;
declare v_mark integer;
declare v_sum integer := 0;
declare v_used text[] := '{}'::text[];
declare v_subject text;
declare v_result jsonb;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role'
   and session_user<>'postgres' then
  raise exception 'Forbidden' using errcode='42501';
 end if;
 if p_rows is null or jsonb_typeof(p_rows)<>'array'
   or jsonb_array_length(p_rows)<1 or jsonb_array_length(p_rows)>1000
   or octet_length(p_rows::text)>131072 then
  raise exception 'Invalid subject evidence';
 end if;
 select r.criteria,r.subject_id into v_rubric,v_subject
 from spark_grading_private.marking_jobs_v2 j
 join public.spark_exam_attempts a on a.id=j.attempt_id
 join spark_grading_private.rubrics_v2 r on
 r.subject_id=a.subject_id and r.rubric_version=j.rubric_version
 and r.paper_id=a.metadata->>'paper_id'
 where j.id=p_job_id and j.lease_token=p_lease_token
 and j.status='running' and j.lease_expires_at>clock_timestamp()
 and a.status='submitted' and a.paper='02'
 and a.rubric_version=j.rubric_version
 and r.active and r.verification_status='verified';
 if v_rubric is null then return false; end if;
 if jsonb_array_length(p_rows)<>jsonb_array_length(v_rubric)
   or p_reviewed_items<>jsonb_array_length(v_rubric) then
  raise exception 'Incomplete source criterion coverage';
 end if;
 select coalesce(sum((c->>'maxMarks')::integer),0)
 into v_total from jsonb_array_elements(v_rubric)c;
 if v_total<=0 or v_total>1000 then raise exception 'Invalid source ceiling'; end if;
 for v_row in select value from jsonb_array_elements(p_rows) loop
  if jsonb_typeof(v_row)<>'object' or
    (select count(*) from jsonb_object_keys(v_row))<>4 or
    coalesce(v_row->>'criterionId','')='' or
    coalesce(v_row->>'suggestedMarks','')!~ '^[0-9]+$' or
    coalesce(v_row->>'maxMarks','')!~ '^[1-9][0-9]*$' or
    coalesce(v_row->>'method','')!~ '^existing-[A-Za-z0-9-]{3,80}$' then
   raise exception 'Invalid detailed examiner evidence';
  end if;
  v_identity:=v_row->>'criterionId';
  if v_identity=any(v_used) then raise exception 'Duplicate criterion decision'; end if;
  v_used:=array_append(v_used,v_identity);
  select c into v_part from jsonb_array_elements(v_rubric) c
    where c->>'id'=v_identity;
  if v_part is null then raise exception 'Unknown criterion decision'; end if;
  v_mark:=(v_row->>'suggestedMarks')::integer;
  if (v_row->>'maxMarks')::integer<>(v_part->>'maxMarks')::integer
    or v_mark>(v_part->>'maxMarks')::integer then
   raise exception 'Examiner part ceiling exceeded';
  end if;
  if (v_subject='mathematics' and v_row->>'method'<>'existing-mathematics-MAB-ECF')
    or (v_subject='physics' and v_row->>'method'<>'existing-physics-rubric-checks')
    or (v_subject='information-technology' and v_row->>'method'<>'existing-IT-specific-rules')
    or (v_subject='chemistry' and v_row->>'method'<>'existing-chemistry-evidence')
    or (v_subject='english-a' and v_row->>'method'<>'existing-english-a-analytic-rubric')
    or (v_subject='food-nutrition-and-health' and v_row->>'method'<>'existing-FNH-criterion-evidence')
    or (v_subject='integrated-science' and v_row->>'method'<>'existing-integrated-science-evidence')
    or (v_subject='principles-of-business' and v_row->>'method'<>'existing-POB-subcriterion-evidence')
    or (v_subject='social-studies' and v_row->>'method' not in
      ('existing-social-studies-concepts','existing-social-studies-essay','existing-social-studies-blank')) then
   raise exception 'Examiner method not registered for source subject';
  end if;
  v_sum:=v_sum+v_mark;
 end loop;
 if v_sum>v_total then raise exception 'Aggregate mark ceiling exceeded'; end if;
 v_result:=jsonb_build_object(
  'authority','existing-practice-examiner-advisory',
  'paperMarks',v_total,'examinedParts',p_reviewed_items,
  'suggestedMarks',v_sum,'rows',p_rows,
  'finalScore',null,'confirmedMarks',0,'unresolvedMarks',v_total,
  'canPublishFinalScore',false
 );
 return spark_grading_private.finish_marking_job_v2(
  p_job_id,p_lease_token,'provisional',
  'awaiting-independent-server-reconciliation',v_result);
end $$;
revoke all on function public.spark_v2_finish_shadow_subject_job(uuid,uuid,integer,jsonb)
 from public,anon,authenticated;
grant execute on function public.spark_v2_finish_shadow_subject_job(uuid,uuid,integer,jsonb)
 to service_role;
commit;
