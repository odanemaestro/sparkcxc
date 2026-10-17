-- POB catalog registration, safe and idempotent DRAFT provisioning.
-- Mirrors src/subjects/subjectRegistry.js.
-- Does NOT publish course, grant student enrollment, or enable Paper 1/2 scoring.
-- Execute as privileged operator only. Existing records are NEVER overwritten.
begin;

insert into public.spark_subjects (
 id,name,short_name,qualification,mark,description,enabled,status,
 sort_order,implementation,study_view,capabilities,routes,stats,manifest_version
) values (
 'principles-of-business',
 'CSEC Principles of Business',
 'Principles of Business',
 'CSEC','PB',
 'Learn the CSEC Principles of Business syllabus through Caribbean business examples, cases, revision and examination practice.',
 false,'draft',48,'generic','study',
 '{"study":true,"practice":true,"flashcards":true,"progress":true,"paper1":true,"paper2":true,"adaptive":false,"structured":true,"labs":true,"sba":true}'::jsonb,
 '{"study":"/study/principles-of-business","practice":"/practice/principles-of-business","flashcards":"/dashboard/flashcards/principles-of-business","progress":"/dashboard/progress"}'::jsonb,
 '{"sections":10,"topics":42,"objectives":119,"flashcards":119}'::jsonb,
 1
)
on conflict (id) do nothing;

-- Fail on accidental published/visible state, even if an earlier row existed.
do $pob_guard$
begin
  if not exists (
    select 1 from public.spark_subjects
    where id='principles-of-business'
      and enabled=false and status='draft'
      and implementation='generic' and study_view='study'
  ) then
    raise exception 'POB must remain a disabled draft while historical marking is uncalibrated';
  end if;
end $pob_guard$;

commit;
