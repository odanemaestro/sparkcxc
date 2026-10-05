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
        "sections":3,
        "topics":19,
        "objectives":114,
        "paper1Questions":1561,
        "paper2Questions":84,
        "practicalLabs":4
      }'::jsonb,
    updated_at = now()
where id = 'integrated-science';

commit;
