begin;

-- ============================================================================
-- SPARK CSEC Social Studies V1
--
-- Current source of truth:
--   Caribbean Examinations Council, CXC 14/G/SYLL 22
--   Effective for examinations from May/June 2025.
--
-- This migration publishes the subject in SPARK's dynamic catalog. The learner
-- content itself is a custom audited React course under src/socialStudies/.
-- ============================================================================

insert into public.spark_subjects(
  id,
  name,
  short_name,
  qualification,
  mark,
  description,
  enabled,
  status,
  sort_order,
  implementation,
  study_view,
  capabilities,
  routes,
  stats,
  learning_config,
  manifest_version
)
values (
  'social-studies',
  'CSEC Social Studies',
  'Social Studies',
  'CSEC',
  'SS',
  'Study the current CSEC Social Studies syllabus through Caribbean-centred lessons, interactive activities, flashcards, research skills and original exam-style practice.',
  true,
  'live',
  40,
  'custom',
  'social-studies',
  '{
    "study":true,
    "practice":true,
    "flashcards":true,
    "progress":true,
    "paper1":true,
    "paper2":true,
    "adaptive":false,
    "structured":true,
    "labs":false,
    "sba":true
  }'::jsonb,
  '{
    "study":"/study/social-studies",
    "practice":"/practice/social-studies",
    "flashcards":"/dashboard/flashcards/social-studies",
    "progress":"/dashboard/progress"
  }'::jsonb,
  '{
    "sections":4,
    "topics":39,
    "objectives":84,
    "mcq":156,
    "paper1Items":60,
    "shortAnswer":80,
    "paper2StructuredMarks":56,
    "paper2EssayMarks":44,
    "paper2Sets":3,
    "flashcards":342
  }'::jsonb,
  '{
    "syllabusCode":"CXC 14/G/SYLL 22",
    "effectiveFrom":"May/June 2025",
    "primarySource":"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Social-Studies-Syllabus-July-2023.pdf",
    "units":[
      {"id":"A1","title":"Individual and the Family"},
      {"id":"A2","title":"Society and Governance"},
      {"id":"B1","title":"Development and Use of Resources"},
      {"id":"B2","title":"Regional Development"}
    ],
    "exam":{
      "paper1":{"items":60,"minutes":75,"sectionAItems":30,"sectionBItems":30},
      "paper2":{"questions":6,"minutes":160,"compulsory":true,"structuredMarks":56,"essayMarks":44,"practiceSets":3},
      "paper3":"SBA Paper 031 or Alternative Paper 032"
    },
    "content":{
      "teacherNotes":true,
      "caribbeanExamples":true,
      "interactiveActivities":true,
      "flashcards":true,
      "originalPractice":true,
      "researchSkills":true,
      "shortAnswerExaminer":true,
      "autoMarkStructuredResponses":true,
      "autoMarkEssayResponses":true
    }
  }'::jsonb,
  1
)
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  qualification = excluded.qualification,
  mark = excluded.mark,
  description = excluded.description,
  enabled = excluded.enabled,
  status = excluded.status,
  sort_order = excluded.sort_order,
  implementation = excluded.implementation,
  study_view = excluded.study_view,
  capabilities = excluded.capabilities,
  routes = excluded.routes,
  stats = excluded.stats,
  learning_config = excluded.learning_config,
  manifest_version = greatest(public.spark_subjects.manifest_version,excluded.manifest_version),
  updated_at = now();

commit;
