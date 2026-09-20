begin;

update public.spark_subjects
set
  learning_config = coalesce(learning_config,'{}'::jsonb)
    || '{
      "examFormat":{
        "effectiveFrom":2027,
        "paper01":{
          "durationMinutes":75,
          "questions":60,
          "marks":60,
          "moduleDistribution":{"1":20,"2":20,"3":20}
        },
        "paper02":{
          "durationMinutes":150,
          "questions":6,
          "marks":105,
          "questionsPerModule":2,
          "firstQuestionPerModule":{"kind":"practical","marks":20},
          "secondQuestionPerModule":{"kind":"structured","marks":15}
        }
      }
    }'::jsonb,
  updated_at = now()
where id = 'integrated-science';

commit;
