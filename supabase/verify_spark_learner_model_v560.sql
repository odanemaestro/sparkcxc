-- Read-only verification for SPARK V5.6.0 Learner Model
select to_regclass('public.spark_learner_skill_state') as learner_state_table,
       to_regclass('public.spark_learner_evidence') as learner_evidence_table;

select routine_name
from information_schema.routines
where routine_schema = 'public'
  and routine_name in ('spark_apply_learner_evidence','spark_record_learner_evidence','spark_capture_csec_question_attempt')
order by routine_name;

select trigger_name, event_object_table
from information_schema.triggers
where trigger_schema = 'public'
  and trigger_name = 'zz_spark_capture_learner_evidence';

select policyname, tablename, cmd
from pg_policies
where schemaname = 'public'
  and tablename in ('spark_learner_skill_state','spark_learner_evidence')
order by tablename, policyname;

select count(*) as learner_skill_rows,
       count(distinct user_id) as students_with_model_state
from public.spark_learner_skill_state;
