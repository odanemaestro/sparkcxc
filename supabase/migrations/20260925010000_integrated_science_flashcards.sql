begin;

update public.spark_subjects
set
  capabilities = jsonb_set(
    jsonb_set(
      coalesce(capabilities,'{}'::jsonb),
      '{study}',
      'true'::jsonb,
      true
    ),
    '{flashcards}',
    'true'::jsonb,
    true
  ),
  routes = jsonb_set(
    jsonb_set(
      coalesce(routes,'{}'::jsonb),
      '{study}',
      to_jsonb('/study/integrated-science'::text),
      true
    ),
    '{flashcards}',
    to_jsonb('/dashboard/flashcards/integrated-science'::text),
    true
  ),
  updated_at = now()
where id = 'integrated-science';

commit;
