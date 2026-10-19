-- V2 private rubric registration readiness across all nine courses.
-- Source totals are accounting facts, not examiner attestations or approvals.
begin;
DO $registration$
declare actual integer; invalid integer;
begin
 select count(*), count(*) filter(where
    r.verification_status<>'draft' or r.active
    or r.verified_by is not null or r.verified_at is not null
    or r.expected_total_marks is not null
    or r.source_sha256 is distinct from
       encode(pg_catalog.sha256(convert_to(r.criteria::text,'UTF8')),'hex')
    or coalesce((select sum((c->>'maxMarks')::integer)
                 from jsonb_array_elements(r.criteria)c),0) <>
       case r.subject_id
        when 'chemistry' then 100
        when 'english-a' then 120
        when 'food-nutrition-and-health' then 96
        when 'information-technology' then 90
        when 'integrated-science' then 105
        when 'mathematics' then 100
        when 'physics' then 100
        when 'principles-of-business' then 100
        when 'social-studies' then 100
        else -1 end
    or exists(select 1 from jsonb_array_elements(r.criteria)c
       where coalesce(c->>'id','')='' or
         c->>'id' is distinct from c->>'sourcePartId'
         or coalesce(c->>'maxMarks','') !~ '^[1-9][0-9]*$')
    or jsonb_array_length(r.criteria) <>
       (select count(distinct c->>'id') from jsonb_array_elements(r.criteria)c))
 into actual,invalid
 from spark_grading_private.rubrics_v2 r;
 if actual<>67 or invalid<>0 then
   raise exception 'Nine-subject source readiness mismatch: % rubrics, % invalid',
     actual,invalid;
 end if;
 if (select sum(jsonb_array_length(criteria)) from spark_grading_private.rubrics_v2)<>2118
 then raise exception 'Unexpected nine-subject source part inventory'; end if;
 update spark_grading_private.rubrics_v2 r
 set expected_total_marks=(select sum((c->>'maxMarks')::integer)
                           from jsonb_array_elements(r.criteria)c)
 where r.verification_status='draft' and not r.active
   and r.expected_total_marks is null;
 GET DIAGNOSTICS actual=ROW_COUNT;
 if actual<>67 then raise exception 'Only %/67 draft totals were registered',actual; end if;
end $registration$;

create or replace view spark_grading_private.rubric_approval_readiness_v2
with (security_invoker=true)
as
select r.subject_id,r.paper_id,r.rubric_version,r.active,
 r.verification_status,r.expected_total_marks,
 jsonb_array_length(r.criteria) as source_parts,
 (select sum((c->>'maxMarks')::integer) from jsonb_array_elements(r.criteria)c)
   as source_total_marks,
 (r.source_sha256=encode(pg_catalog.sha256(convert_to(r.criteria::text,'UTF8')),'hex'))
   as source_hash_matches,
 (select count(*) from jsonb_array_elements(r.criteria)c where exists(
  select 1 from spark_grading_private.rubric_criterion_reviews_v2 v
  where v.subject_id=r.subject_id and v.paper_id=r.paper_id
   and v.rubric_version=r.rubric_version and v.criterion_id=c->>'id'
   and v.criterion_sha256=encode(pg_catalog.sha256(convert_to(c::text,'UTF8')),'hex')
 )) as source_matched_reviews,
 (select count(*) from jsonb_array_elements(r.criteria)c where not exists(
  select 1 from spark_grading_private.rubric_criterion_reviews_v2 v
  where v.subject_id=r.subject_id and v.paper_id=r.paper_id
   and v.rubric_version=r.rubric_version and v.criterion_id=c->>'id'
   and v.criterion_sha256=encode(pg_catalog.sha256(convert_to(c::text,'UTF8')),'hex')
 )) as pending_criterion_reviews,
 (select count(*) from jsonb_array_elements(r.criteria)c
  cross join lateral jsonb_array_elements(
    case when jsonb_typeof(c->'sourceMarking'->'criteria')='array'
         then c->'sourceMarking'->'criteria' else '[]'::jsonb end) mark
  where mark->'check'->>'type'='manual-verification'
 ) as explicit_manual_checks
from spark_grading_private.rubrics_v2 r;
revoke all on spark_grading_private.rubric_approval_readiness_v2
 from public,anon,authenticated;
grant select on spark_grading_private.rubric_approval_readiness_v2 to service_role;
commit;
