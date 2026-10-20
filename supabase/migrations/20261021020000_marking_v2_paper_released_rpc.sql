-- Lets an exam client ask whether a Paper 2 is released for V2 server marking
-- before routing an attempt to it. Mirrors the rubric conditions used by
-- enqueue_submitted_exam_v2, so a client never submits an unscored script for
-- a paper the server will not mark. Reveals only a boolean.
begin;
create or replace function public.spark_v2_paper_released(p_subject_id text,p_paper_id text)
returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null
  and coalesce(p_subject_id,'') not in ('','english-a')
  and exists(select 1 from spark_grading_private.rubrics_v2 r
   where r.subject_id=p_subject_id and r.paper_id=p_paper_id
    and r.active and r.verification_status='verified'
    and r.source_sha256 ~ '^[a-f0-9]{64}$'
    and (select sum((c->>'maxMarks')::int) from
         jsonb_array_elements(r.criteria)c)=r.expected_total_marks)
$$;
revoke all on function public.spark_v2_paper_released(text,text)
 from public,anon;
grant execute on function public.spark_v2_paper_released(text,text) to authenticated;
commit;
