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
  false,
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
  enabled=false,
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

-- Stage all 21 actual course topics before enabling the published generic Study subject.
-- The database publish guard also requires at least one enabled topic.
insert into public.spark_subject_topics(subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata)
values
('chemistry','a1-states-of-matter','section-a-principles','A1. States of Matter','Use particle ideas to explain solids, liquids, gases and changes of state.',101,true,'{}'::jsonb),
('chemistry','a2-mixtures-separations','section-a-principles','A2. Mixtures and Separations','Classify mixtures and choose separation methods from differences in physical properties.',102,true,'{}'::jsonb),
('chemistry','a3-atomic-structure','section-a-principles','A3. Atomic Structure','Use atomic structure, isotopes and nuclide notation confidently.',103,true,'{}'::jsonb),
('chemistry','a4-periodic-table','section-a-principles','A4. Periodic Table and Periodicity','Explain periodic arrangement and use trends to predict behaviour.',104,true,'{}'::jsonb),
('chemistry','a5-bonding','section-a-principles','A5. Structure and Bonding','Connect bonding and structure to formulae, properties and uses.',105,true,'{}'::jsonb),
('chemistry','a6-mole-concept','section-a-principles','A6. Mole Concept','Use moles, formula masses, gas volumes, equations and concentration.',106,true,'{}'::jsonb),
('chemistry','a7-acids-bases-salts','section-a-principles','A7. Acids, Bases and Salts','Work with pH, acid strength, salt preparation, neutralisation and titration.',107,true,'{}'::jsonb),
('chemistry','a8-redox','section-a-principles','A8. Oxidation and Reduction','Identify redox change, oxidation numbers and oxidising or reducing agents.',108,true,'{}'::jsonb),
('chemistry','a9-electrochemistry','section-a-principles','A9. Electrochemistry','Explain electrolysis, electrode products, Faraday calculations and industrial uses.',109,true,'{}'::jsonb),
('chemistry','a10-rates','section-a-principles','A10. Rates of Reaction','Explain collision theory, rate factors and rate graphs.',110,true,'{}'::jsonb),
('chemistry','a11-energetics','section-a-principles','A11. Energetics','Use energy profiles and calorimetry to study exothermic and endothermic change.',111,true,'{}'::jsonb),
('chemistry','b1-hydrocarbon-sources','section-b-organic','B1. Sources of Hydrocarbon Compounds','Petroleum, natural gas, fractions and cracking.',201,true,'{}'::jsonb),
('chemistry','b2-organic-introduction','section-b-organic','B2. Organic Chemistry: An Introduction','Carbon bonding, homologous series, nomenclature and structural isomerism.',202,true,'{}'::jsonb),
('chemistry','b3-carbon-reactions','section-b-organic','B3. Reactions of Carbon Compounds','Alkanes, alkenes, alcohols, acids, esters, fermentation, soap and detergents.',203,true,'{}'::jsonb),
('chemistry','b4-polymers','section-b-organic','B4. Polymers','Addition and condensation polymers, uses and environmental effects.',204,true,'{}'::jsonb),
('chemistry','c1-characteristics-metals','section-c-inorganic','C1. Characteristics of Metals','Physical properties and reactions of metals and their compounds.',301,true,'{}'::jsonb),
('chemistry','c2-reactivity-extraction','section-c-inorganic','C2. Reactivity and Extraction of Metals','Reactivity series, displacement, and extraction of iron and aluminium.',302,true,'{}'::jsonb),
('chemistry','c3-uses-alloys','section-c-inorganic','C3. Uses of Metals and Alloys','Explain alloy properties and connect materials to uses.',303,true,'{}'::jsonb),
('chemistry','c4-metals-environment','section-c-inorganic','C4. Metals, Living Systems and the Environment','Corrosion, biological roles of metals and heavy-metal hazards.',304,true,'{}'::jsonb),
('chemistry','c5-nonmetals-water-green','section-c-inorganic','C5. Non-metals, Water and Green Chemistry','Properties and uses of non-metals, gases, water chemistry, pollution and Green Chemistry.',305,true,'{}'::jsonb),
('chemistry','c6-qualitative-analysis','section-c-inorganic','C6. Qualitative Analysis','Identify cations, anions and gases from systematic observations.',306,true,'{}'::jsonb)
on conflict(subject_id,topic_id) do update set
  section_id=excluded.section_id,
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=true,
  updated_at=now();

-- Publish only after the section and topic catalog passes SPARK's existing guard.
update public.spark_subjects
set enabled=true,status='live',updated_at=now()
where id='chemistry';

commit;
