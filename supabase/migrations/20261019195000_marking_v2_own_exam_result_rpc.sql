-- Authenticated student reads only their own V2 examiner outcome.
-- No access to private rubrics, queue details or other students' scripts.
begin;
create or replace function public.spark_v2_exam_result(p_attempt_id uuid)
returns jsonb language sql security definer set search_path='' as $$
select jsonb_build_object(
 'attemptId',a.id,
 'status',case when a.v2_rubric_version is null then 'not-eligible'
   when j.id is null then 'queued' else j.status end,
 'paperId',a.v2_paper_id,
 'rubricVersion',a.v2_rubric_version,
 'score',case when j.status='verified' and
   a.metadata->>'score_authority'='server-v2-deterministic' then a.score else null end,
 'maxMarks',case when j.status='verified' then a.max_score
   else null end,
 'unresolvedMarks',case when j.status='provisional'
  then (j.result->>'unresolvedMarks')::numeric
  when j.status='verified' then 0 else null end,
 'criterionResults',case when j.status in ('provisional','verified')
  then j.result->'parts' else '[]'::jsonb end
)
from public.spark_exam_attempts a
left join spark_grading_private.marking_jobs_v2 j
 on j.attempt_id=a.id and j.rubric_version=a.v2_rubric_version
where a.id=p_attempt_id and a.user_id=auth.uid()
and a.status='submitted' and a.paper='02'
$$;
revoke all on function public.spark_v2_exam_result(uuid)
 from public,anon;
grant execute on function public.spark_v2_exam_result(uuid) to authenticated;
commit;