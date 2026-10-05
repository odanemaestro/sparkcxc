begin;

update public.spark_subjects
set capabilities = coalesce(capabilities,'{}'::jsonb)
  || '{
    "study":true,
    "practice":true,
    "flashcards":true,
    "progress":true,
    "paper1":true,
    "paper2":true,
    "adaptive":false,
    "structured":true,
    "labs":true,
    "sba":false
  }'::jsonb,
    stats = coalesce(stats,'{}'::jsonb)
      || '{
        "paper1Questions":1561,
        "paper2Questions":84,
        "practicalLabs":4
      }'::jsonb,
    updated_at = now()
where id = 'integrated-science';

commit;
