begin;

-- ============================================================================
-- SPARK CSEC Chemistry Course V1
-- Source: CXC 21/G/SYLL 13.
-- Local lesson content is packaged with the application. This migration
-- publishes Chemistry in the dynamic subject catalog so students can enrol.
-- ============================================================================

insert into public.spark_subjects(
  id,name,short_name,qualification,mark,description,enabled,status,sort_order,
  implementation,study_view,capabilities,routes,stats,learning_config,manifest_version
)
values (
  'chemistry',
  'CSEC Chemistry',
  'Chemistry',
  'CSEC',
  'CH',
  'Study the full CSEC Chemistry syllabus with teacher-style lessons, interactive chemistry labs and full Paper 02 practice.',
  true,
  'live',
  45,
  'generic',
  'study',
  '{"study":true,"practice":true,"flashcards":false,"progress":true,"paper1":false,"paper2":true,"adaptive":false,"structured":true,"labs":true,"sba":true}'::jsonb,
  '{"study":"/study/chemistry","practice":"/practice/chemistry","flashcards":null,"progress":"/dashboard/progress"}'::jsonb,
  '{"sections":3,"topics":21,"objectives":119,"paper2HistoricalPapers":28,"paper2PracticeSets":6,"paper2Marks":100,"paper2Minutes":150,"interactiveLabs":13}'::jsonb,
  '{
    "syllabusCode":"CXC 21/G/SYLL 13",
    "sections":[
      {"id":"section-a-principles","title":"Section A: Principles of Chemistry"},
      {"id":"section-b-organic","title":"Section B: Organic Chemistry"},
      {"id":"section-c-inorganic","title":"Section C: Inorganic Chemistry"}
    ],
    "paper02":{
      "minutes":150,
      "marks":100,
      "questions":6,
      "composition":{"dataAnalysis":1,"structured":2,"extendedResponse":3},
      "profiles":{"KC":35,"UK":55,"XS":10},
      "historicalSources":28,
      "originalPracticeSets":6,
      "automaticMarkingReview":true
    },
    "content":{
      "teacherStyleNotes":true,
      "interactiveLabs":true,
      "sequentialLessons":true,
      "svgFigures":true,
      "historicalPaperArchive":true
    }
  }'::jsonb,
  1
)
on conflict (id) do update set
  name=excluded.name,
  short_name=excluded.short_name,
  qualification=excluded.qualification,
  mark=excluded.mark,
  description=excluded.description,
  enabled=true,
  status='live',
  sort_order=excluded.sort_order,
  implementation=excluded.implementation,
  study_view=excluded.study_view,
  capabilities=excluded.capabilities,
  routes=excluded.routes,
  stats=excluded.stats,
  learning_config=excluded.learning_config,
  manifest_version=greatest(public.spark_subjects.manifest_version,excluded.manifest_version),
  updated_at=now();

insert into public.spark_subject_sections(subject_id,section_id,title,description,sort_order,enabled,metadata)
values
('chemistry','section-a-principles','Section A: Principles of Chemistry','Matter, mixtures, atoms, periodicity, bonding, quantitative chemistry, acids and bases, redox, electrochemistry, rates and energetics.',100,true,'{"syllabus":"CXC 21/G/SYLL 13"}'::jsonb),
('chemistry','section-b-organic','Section B: Organic Chemistry','Hydrocarbon sources, homologous series, organic reactions and polymers.',200,true,'{"syllabus":"CXC 21/G/SYLL 13"}'::jsonb),
('chemistry','section-c-inorganic','Section C: Inorganic Chemistry','Metals, extraction and alloys, environmental chemistry, non-metals, water and qualitative analysis.',300,true,'{"syllabus":"CXC 21/G/SYLL 13"}'::jsonb)
on conflict(subject_id,section_id) do update set
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

commit;
