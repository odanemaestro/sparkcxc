-- Verify the LIVE installed guarded POB queue after applying
-- 20261017190000_pob_original_p2_controlled_queue.sql.
-- Read-only: no PII, student answers, IDs, secrets or configuration changes.
select
 (select enabled=false and status='draft'
  from public.spark_subjects where id='principles-of-business') is true as pob_catalog_hidden_draft,
 (select enabled from public.spark_marking_config where singleton) as global_marking_enabled,
 (select pob_original_enabled=false and pob_internal_tester_user_id is null
  from public.spark_marking_config where singleton) is true as pob_canary_default_off,
 position('pob-original-paper2-01'
  in pg_get_functiondef('public.spark_enqueue_marking(uuid)'::regprocedure))>0 as original_bank_pinned,
 position('v_attempt.metadata->>''paper_id'''
  in pg_get_functiondef('public.spark_enqueue_marking(uuid)'::regprocedure))>0 as paper_id_pinned,
 position('pob_internal_tester_user_id'
  in pg_get_functiondef('public.spark_enqueue_marking(uuid)'::regprocedure))>0 as internal_tester_gate_installed,
 position('v_attempt.max_score is distinct from 100'
  in pg_get_functiondef('public.spark_enqueue_marking(uuid)'::regprocedure))>0 as verified_100_mark_max,
 position('daily_global_limit'
  in pg_get_functiondef('public.spark_enqueue_marking(uuid)'::regprocedure))>0 as daily_job_budget_retained,
 position('daily_token_budget'
  in pg_get_functiondef('public.spark_enqueue_marking(uuid)'::regprocedure))>0 as daily_token_budget_retained,
 position('hashtextextended'
  in pg_get_functiondef('public.spark_enqueue_marking(uuid)'::regprocedure))>0 as advisory_lock_retained,
 not has_function_privilege('anon','public.spark_enqueue_marking(uuid)','EXECUTE') as anonymous_enqueue_denied,
 (select count(*) from public.spark_exam_attempts
   where subject_id='principles-of-business' and bank_version like 'POB-P%')=0
   as no_historical_pob_attempts;
