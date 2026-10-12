begin;

-- ============================================================================
-- SPARK CSEC Chemistry V1
--
-- Source of truth:
--   CXC 21/G/SYLL 13, revised syllabus effective for the current course.
--
-- The audited learner content is maintained in src/chemistry/. Chemistry uses
-- the shared generic study shell with a static syllabus catalog and a custom
-- Paper 02 practice implementation.
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
  'Study the full CSEC Chemistry syllabus with clear teacher-style notes, interactive practical models, flashcards and full Paper 02 examination practice.',
  true,
  'live',
  37,
  'custom',
  'generic-study',
  '{
    "study":true,
    "practice":true,
    "flashcards":true,
    "progress":true,
    "paper1":false,
    "paper2":true,
    "adaptive":false,
    "structured":true,
    "labs":true,
    "sba":true
  }'::jsonb,
  '{
    "study":"/study/chemistry",
    "practice":"/practice/chemistry",
    "flashcards":"/dashboard/flashcards/chemistry",
    "progress":"/dashboard/progress"
  }'::jsonb,
  '{
    "sections":3,
    "topics":21,
    "objectives":119,
    "paper2HistoricalSources":28,
    "paper2Sets":4,
    "paper2QuestionsPerSet":6,
    "paper2Marks":100,
    "paper2Minutes":150
  }'::jsonb,
  '{
    "syllabusCode":"CXC 21/G/SYLL 13",
    "sections":[
      {"id":"section-a","title":"Principles of Chemistry"},
      {"id":"section-b","title":"Organic Chemistry"},
      {"id":"section-c","title":"Inorganic Chemistry"}
    ],
    "exam":{
      "paper2":{
        "questions":6,
        "minutes":150,
        "marks":100,
        "structure":{
          "dataAnalysis":1,
          "structured":2,
          "extendedResponse":3
        }
      }
    },
    "content":{
      "teacherNotes":true,
      "workedExamples":true,
      "interactiveLabs":true,
      "genericFlashcards":true,
      "paper2MarkSchemes":true,
      "paper2Explanations":true,
      "historicalPaper2Sources":28
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
  enabled=excluded.enabled,
  status=excluded.status,
  sort_order=excluded.sort_order,
  implementation=excluded.implementation,
  study_view=excluded.study_view,
  capabilities=excluded.capabilities,
  routes=excluded.routes,
  stats=excluded.stats,
  learning_config=excluded.learning_config,
  manifest_version=greatest(public.spark_subjects.manifest_version,excluded.manifest_version),
  updated_at=now();

commit;
