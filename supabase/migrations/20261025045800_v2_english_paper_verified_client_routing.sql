-- Permit released English A original Paper 2 choices through the client-side
-- V2 availability check. Never rely on criterion approvals alone.
-- Enqueue/score server authorization remains authoritative and checks the
-- selected creative-writing prompt and exact submitted response keys.
begin;
create or replace function public.spark_v2_paper_released(
 p_subject_id text,p_paper_id text)
returns boolean
language sql stable security definer set search_path='' as $$
 select auth.uid() is not null
  and coalesce(p_subject_id,'') <> ''
  and coalesce(p_paper_id,'') <> ''
  and exists (
   select 1
   from spark_grading_private.rubrics_v2 r
   join spark_grading_private.rubric_release_status_v2 v
    on v.subject_id=r.subject_id and v.paper_id=r.paper_id
     and v.rubric_version=r.rubric_version
   where r.subject_id=p_subject_id
    and r.active and r.verification_status='verified'
    and v.paper_verified and v.source_hash_matches
    and v.verified_criteria=v.criteria
    and r.source_sha256 ~ '^[a-f0-9]{64}$'
    and (select sum((c->>'maxMarks')::integer)
         from jsonb_array_elements(r.criteria)c)=r.expected_total_marks
    and (
     (p_subject_id='english-a'
      and (
       (p_paper_id ~ '^EA-P2-[A-F]$'
         and r.paper_id in (p_paper_id||'-C1',p_paper_id||'-C2'))
       or (p_paper_id ~ '^EA-P2-[A-F]-C[12]$'
         and r.paper_id=p_paper_id)
      ))
     or (p_subject_id<>'english-a' and r.paper_id=p_paper_id)
    )
  )
$$;
revoke all on function public.spark_v2_paper_released(text,text)
 from public,anon;
grant execute on function public.spark_v2_paper_released(text,text)
 to authenticated;
commit;
