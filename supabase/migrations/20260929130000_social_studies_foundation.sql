begin;

-- ============================================================================
-- SPARK CSEC Social Studies V1
-- Current syllabus: CXC 14/G/SYLL 22, revised for examinations from May/June 2025.
-- Built as a generic SPARK subject. Keep draft until all four syllabus parts pass QA.
-- ============================================================================

insert into public.spark_subjects(
  id,name,short_name,qualification,mark,description,enabled,status,sort_order,
  implementation,study_view,capabilities,routes,stats,learning_config,manifest_version
)
values (
  'social-studies',
  'CSEC Social Studies',
  'Social Studies',
  'CSEC',
  'SS',
  'Study the current CSEC Social Studies syllabus through Caribbean-centred lessons, research skills, interactive practice, flashcards and exam-focused review.',
  true,
  'draft',
  60,
  'generic',
  'study',
  '{
    "study":true,
    "practice":false,
    "flashcards":true,
    "progress":true,
    "paper1":false,
    "paper2":false,
    "adaptive":false,
    "structured":false,
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
    "topics":0,
    "objectives":62,
    "flashcards":0,
    "interactiveActivities":0
  }'::jsonb,
  '{
    "syllabusCode":"CXC 14/G/SYLL 22",
    "syllabusRevision":"Revised 2022 / current syllabus",
    "examFrom":"May/June 2025",
    "coursePrinciples":[
      "Caribbean-centred examples",
      "Teacher-like explanations",
      "Research and SBA skills woven through lessons",
      "Source evaluation and data literacy",
      "Frequent application practice"
    ],
    "exam":{
      "paper1":{"items":60,"minutes":75,"sectionAItems":30,"sectionBItems":30},
      "paper2":{"minutes":160,"questions":6,"structuredQuestions":4,"essayQuestions":2,"allQuestionsRequired":true},
      "paper3":"031 School-Based Assessment or 032 Alternative to SBA"
    },
    "source":{
      "publisher":"Caribbean Examinations Council",
      "title":"CSEC Social Studies Syllabus",
      "code":"CXC 14/G/SYLL 22",
      "url":"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Social-Studies-Syllabus-July-2023.pdf"
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
  sort_order=excluded.sort_order,
  implementation=excluded.implementation,
  study_view=excluded.study_view,
  capabilities=case when public.spark_subjects.status='draft' then excluded.capabilities else public.spark_subjects.capabilities end,
  routes=excluded.routes,
  stats=excluded.stats,
  learning_config=excluded.learning_config,
  manifest_version=greatest(public.spark_subjects.manifest_version,excluded.manifest_version),
  updated_at=now();

insert into public.spark_subject_sections(subject_id,section_id,title,description,sort_order,enabled,metadata)
values
('social-studies','a1-individual-family','A(i): Individual and the Family',
 'Understand family life, parenting, social issues and Caribbean cultural identity while developing source-evaluation and research skills.',10,true,
 '{"majorSection":"A","part":"i","syllabusTitle":"Individual and the Family","theme":"family"}'::jsonb),
('social-studies','a2-society-governance','A(ii): Society and Governance',
 'Study social groups, institutions, government, elections, citizenship and the skills needed to judge information and participate responsibly.',20,true,
 '{"majorSection":"A","part":"ii","syllabusTitle":"Society and Governance","theme":"society"}'::jsonb),
('social-studies','b1-development-resources','B(i): Development and Use of Resources',
 'Study population, migration, human resources, employment, natural resources, sustainability, climate change and data interpretation.',30,true,
 '{"majorSection":"B","part":"i","syllabusTitle":"Development and Use of Resources","theme":"resources"}'::jsonb),
('social-studies','b2-regional-development','B(ii): Regional Development',
 'Study Caribbean development, industries, regional challenges, integration, CARICOM, CSME, tourism and regional cooperation.',40,true,
 '{"majorSection":"B","part":"ii","syllabusTitle":"Regional Development","theme":"integration"}'::jsonb)
on conflict(subject_id,section_id) do update set
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

commit;
