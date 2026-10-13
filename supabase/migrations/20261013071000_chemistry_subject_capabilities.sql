begin;
-- Keep deployed subject-catalog routes aligned with the Chemistry React registry.
update public.spark_subjects
set capabilities=coalesce(capabilities,'{}'::jsonb)||'{"flashcards":true,"paper1":true,"paper2":true,"progress":true}'::jsonb,
    routes=coalesce(routes,'{}'::jsonb)||'{"study":"/study/chemistry","practice":"/practice/chemistry","flashcards":"/dashboard/flashcards/chemistry","progress":"/dashboard/progress"}'::jsonb,
    updated_at=now()
where id='chemistry';
commit;
