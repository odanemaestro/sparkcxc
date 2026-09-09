-- Read-only verification for SPARK V5.6.1 Answer Intelligence.
select to_regclass('public.spark_answer_observations') as answer_observations,
       to_regclass('public.spark_answer_pattern_state') as answer_pattern_state,
       to_regclass('public.spark_question_validation_state') as question_validation_state;

select p.proname,
       pg_get_function_identity_arguments(p.oid) as arguments,
       p.prosecdef as security_definer
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'spark_record_answer_observation';

select schemaname, tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename in ('spark_answer_observations','spark_answer_pattern_state','spark_question_validation_state')
order by tablename, policyname;

-- Content-quality signal. A question with repeated canonical conflicts or a
-- high uncertain/self-assessed rate deserves human review. These counts NEVER
-- change the answer key automatically.
select question_id,
       total_observations,
       uncertain_count,
       self_assessed_count,
       canonical_conflict_count,
       round(100.0 * uncertain_count / nullif(total_observations, 0), 1) as uncertain_percent,
       last_seen_at
from public.spark_question_validation_state
where canonical_conflict_count > 0
   or uncertain_count >= 3
order by canonical_conflict_count desc,
         uncertain_count desc,
         total_observations desc
limit 50;
