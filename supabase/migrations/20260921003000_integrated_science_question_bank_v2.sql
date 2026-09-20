begin;

-- ============================================================================
-- SPARK CSEC Integrated Science Question Bank v2
-- Full v1.2.0 bank: 1,561 Paper 01 items + 84 Paper 02 questions.
-- Keep the subject's current publication status unchanged.
-- ============================================================================

update public.spark_subjects
set
  capabilities = coalesce(capabilities,'{}'::jsonb)
    || '{
      "study":true,
      "practice":true,
      "progress":true,
      "paper1":true,
      "paper2":true,
      "structured":true
    }'::jsonb,
  routes = coalesce(routes,'{}'::jsonb)
    || '{
      "study":"/study/integrated-science",
      "practice":"/practice/integrated-science",
      "progress":"/dashboard/progress"
    }'::jsonb,
  stats = coalesce(stats,'{}'::jsonb)
    || '{
      "paper1Questions":1561,
      "paper2Questions":84,
      "specificObjectives":114,
      "questionBankVersion":"1.2.0"
    }'::jsonb,
  learning_config = coalesce(learning_config,'{}'::jsonb)
    || '{
      "questionBank":{
        "version":"1.2.0",
        "paper01Items":1561,
        "paper02Questions":84,
        "modules":3,
        "specificObjectives":114,
        "syllabus":"CXC 23/G/SYLL 23 amended for examinations from 2027"
      }
    }'::jsonb,
  updated_at = now()
where id = 'integrated-science';

commit;
