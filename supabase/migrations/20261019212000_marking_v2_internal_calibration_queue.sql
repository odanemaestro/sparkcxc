-- Operator-facing live criterion queue for genuine SPARK-internal approval.
-- This migration records NO approvals and NEVER activates a paper.
-- The source hash binds each queue item to its exact registered JSONB row.
begin;
create or replace view spark_grading_private.v2_calibration_queue
with (security_invoker=true) as
select
 r.subject_id, r.paper_id, r.rubric_version,
 c.item->>'id' as criterion_id,
 (c.item->>'maxMarks')::integer as max_marks,
 encode(pg_catalog.sha256(convert_to(c.item::text,'UTF8')),'hex') as criterion_sha256,
 r.source_sha256 as paper_source_sha256,
 r.verification_status, r.active,
 case
   when r.subject_id='physics' and c.item->'sourceMarking'->>'responseType'='graph'
     then 'manual-graph-artifact'
   when r.subject_id='english-a'
     then 'extended-writing-evidence'
   when r.subject_id='mathematics' and
    (case when jsonb_typeof(c.item->'sourceMarking'->'criteria')='array'
     then jsonb_array_length(c.item->'sourceMarking'->'criteria')
     else 0 end)=0
     then 'missing-detailed-math-allocation'
   when r.subject_id='social-studies' and
    c.item->'sourceMarking'->>'component' in ('content','organisation','organization')
     then 'essay-task-and-choice-rules'
   when r.subject_id='food-nutrition-and-health'
     then 'alternative-written-evidence'
   when r.subject_id='chemistry' or r.subject_id='integrated-science'
     then 'science-response-and-method'
   when r.subject_id='information-technology'
     then 'it-answer-and-code-evidence'
   when r.subject_id='principles-of-business'
     then 'business-case-alternatives'
   when r.subject_id='physics'
     then 'physics-alternative-and-ecf'
   when r.subject_id='mathematics'
     then 'math-method-and-ecf'
   else 'written-response-source-calibration'
 end as review_focus,
 x.verified_by as recorded_reviewer,
 x.verified_at as recorded_review_time,
 x.review_note as recorded_review_note,
 (x.criterion_id is not null) as source_matched_review,
 (r.verification_status='verified' and r.active) as paper_live
from spark_grading_private.rubrics_v2 r
cross join lateral jsonb_array_elements(r.criteria) as c(item)
left join spark_grading_private.rubric_criterion_reviews_v2 x on
 x.subject_id=r.subject_id and x.paper_id=r.paper_id
 and x.rubric_version=r.rubric_version
 and x.criterion_id=c.item->>'id'
 and x.criterion_sha256=encode(pg_catalog.sha256(convert_to(c.item::text,'UTF8')),'hex');
revoke all on spark_grading_private.v2_calibration_queue from public,anon,authenticated;
grant select on spark_grading_private.v2_calibration_queue to service_role;
commit;
