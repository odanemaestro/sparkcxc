-- Read-only live deployment diagnostic. No personal learner information
-- or worker secrets are returned. Run with the Supabase SQL editor/MCP.
-- This query reports actual deployed *database* functions, not repository
-- migrations or proof of safe historical grade release.
with code as (
  select
    coalesce(pg_get_functiondef(to_regprocedure('public.spark_enqueue_marking(uuid)')),'') as enqueue,
    coalesce(pg_get_functiondef(to_regprocedure('public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb)')),'') as submit
), counts as (
  select
    (select count(*) from public.spark_exam_attempts
      where subject_id='principles-of-business') as pob_attempts,
    (select count(*) from public.spark_exam_attempts
      where subject_id='principles-of-business' and bank_version like 'POB-P%') as historical_attempts
)
select
 (select count(*)=1 from public.spark_subjects
   where id='principles-of-business' and enabled=false and status='draft') as pob_catalog_draft_safe,
 (select enabled from public.spark_marking_config where singleton=true) as general_marking_enabled,
 (select revision from public.spark_marking_config where singleton=true) as marking_revision,
 position('principles-of-business' in code.enqueue)>0 as deployed_enqueue_mentions_pob,
 position('v_row.bank_version' in code.submit)>0
   and position('p_score is not null' in code.submit)>0 as deployed_submit_supports_null_pob_score,
 position('daily_global_limit' in code.enqueue)>0
   and position('daily_token_budget' in code.enqueue)>0 as deployed_queue_preserves_global_token_budget,
 counts.pob_attempts,counts.historical_attempts
from code,counts;
