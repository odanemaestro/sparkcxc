-- Private immutable-source lookup. Question selections come from the submitted
-- attempt; a browser never chooses a rubric version or an offered mark total.
create or replace function spark_grading_private.poa_method_variant_v2(a public.spark_exam_attempts)
returns text language plpgsql stable security definer set search_path='' as $$
declare
 s spark_grading_private.poa_method_sources_v2%rowtype;
 selected integer[];
begin
 if a.subject_id<>'principles-of-accounts' or a.paper<>'02'
    or a.bank_version is distinct from 'poa-historical-text-v1:'||(a.metadata->>'paper_id')
    or jsonb_typeof(a.metadata->'selected_questions') is distinct from 'array'
    or jsonb_array_length(a.metadata->'selected_questions')<>5
    or jsonb_typeof(a.response_snapshot) is distinct from 'object' then return null; end if;
 select * into s from spark_grading_private.poa_method_sources_v2 where source_paper_id=a.metadata->>'paper_id';
 if not found or a.metadata->>'source_sha256' is distinct from s.source_pdf_sha256 then return null; end if;
 if exists(select 1 from jsonb_array_elements(a.metadata->'selected_questions') q
   where jsonb_typeof(q)<>'number' or q::text !~ '^[1-7]$') then return null; end if;
 select array_agg(n order by n) into selected from
   (select distinct q::text::integer n from jsonb_array_elements(a.metadata->'selected_questions') q) values;
 if cardinality(selected)<>5 or not selected <@ s.question_numbers or not s.compulsory <@ selected
   or (select count(*) from unnest(selected) q where q=any(s.optional))<>s.choose_count
   or exists(select 1 from jsonb_object_keys(a.response_snapshot) k where not k=any(selected::text[])) then return null; end if;
 return s.source_paper_id||'--q-'||array_to_string(selected,'-');
end $$;
revoke all on function spark_grading_private.poa_method_variant_v2(public.spark_exam_attempts) from public,anon,authenticated;
grant execute on function spark_grading_private.poa_method_variant_v2(public.spark_exam_attempts) to service_role;

do $routing$
declare def text; anchor text;
begin
 select pg_get_functiondef('spark_grading_private.enqueue_submitted_exam_v2(uuid)'::regprocedure) into def;
 if strpos(def,'poa_method_variant_v2(a)')=0 then
  anchor:='and r0.paper_id=a.metadata->>''paper_id''';
  if length(def)-length(replace(def,anchor,''))<>length(anchor) then raise exception 'Unexpected V2 source-paper routing'; end if;
  execute replace(def,anchor,$new$and r0.paper_id=case when a.subject_id='principles-of-accounts' and a.bank_version like 'poa-historical-text-v1:%'
    then spark_grading_private.poa_method_variant_v2(a) else a.metadata->>'paper_id' end$new$);
 end if;
end $routing$;

-- Validate the method version, PDF identity, selected question and allocation
-- before accepting an examiner row. Existing private release/hash/lease gates
-- continue to protect the complete registered policy, including every point.
create or replace function spark_grading_private.poa_method_criterion_valid_v2(r spark_grading_private.rubrics_v2,c jsonb)
returns boolean language sql stable security definer set search_path='' as $$
 select r.rubric_version='poa-source-methods-v1' and r.expected_total_marks=100
  and jsonb_array_length(r.criteria)=5 and c->>'sourceFormat'='poa-method-question-v1'
  and c->>'maxMarks'='20' and c->'sourceMarking'->>'authority'='spark-authored'
  and c->'sourceMarking'->>'rubricVersion'='poa-source-methods-v1'
  and c->'sourceMarking'->>'questionNumber'=c->>'id'
  and c->'sourceMarking'->'policy'->>'authority'='spark-authored'
  and c->'sourceMarking'->'policy'->>'sourceSha256'=s.source_pdf_sha256
  and c->'sourceMarking'->>'sourceSha256'=s.source_pdf_sha256
  and r.paper_id=s.source_paper_id||'--q-'||(select string_agg(v::text,'-' order by v::text) from jsonb_array_elements(c->'sourceMarking'->'selectedQuestions')v)
  and (select sum((section->>'maxMarks')::integer) from jsonb_array_elements(c->'sourceMarking'->'policy'->'sections')section)=20
 from spark_grading_private.poa_method_sources_v2 s where s.source_paper_id=c->'sourceMarking'->>'sourcePaperId';
$$;
revoke all on function spark_grading_private.poa_method_criterion_valid_v2(spark_grading_private.rubrics_v2,jsonb) from public,anon,authenticated;
grant execute on function spark_grading_private.poa_method_criterion_valid_v2(spark_grading_private.rubrics_v2,jsonb) to service_role;

do $provenance$
declare def text; old_block text; new_block text;
begin
 select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure) into def;
 if strpos(def,'Accounts source-method provenance v1')=0 then
  old_block:=substring(def from '  -- Accounts examiner provenance is paper-specific[\s\S]*?  v_total:=v_total\+v_mark;');
  if old_block is null then raise exception 'Unexpected Accounts examiner provenance guard'; end if;
  new_block:=$new$
  -- Accounts source-method provenance v1. The original numerical policy retains
  -- its exact fingerprint; source methods use their own verified allocation.
  -- Accounts examiner provenance is paper-specific.
  if v_rubric.subject_id='principles-of-accounts' then
   if not (
    (v_rubric.paper_id='POA-ORIGINAL-02-01' and v_rubric.rubric_version='poa-original-criteria-v1'
      and v_rubric.source_sha256='dd855fecbe8ec3ee9c61f86c5b3f424d91a45112e07e5dc84fa3782df435a6f8'
      and v_method='existing-POA-original-numeric-v2' and v_part->>'sourceFormat'='poa-original-paper2'
      and v_part->>'kind'='numeric' and v_part->>'maxMarks'='1')
    or (v_method='existing-POA-source-methods-v1'
      and coalesce(spark_grading_private.poa_method_criterion_valid_v2(v_rubric,v_part),false))
   ) then raise exception 'Accounts examiner provenance mismatch'; end if;
  elsif v_method in ('existing-POA-original-numeric-v2','existing-POA-source-methods-v1') then
   raise exception 'Accounts examiner provenance mismatch';
  end if;
  v_total:=v_total+v_mark;
$new$;
  execute replace(def,old_block,new_block);
 end if;
end $provenance$;
