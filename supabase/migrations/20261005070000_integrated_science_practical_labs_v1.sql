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


-- Keep the database learning catalog aligned with the complete learner course.
insert into public.spark_subject_sections(subject_id,section_id,title,description,sort_order,enabled,metadata)
values
('integrated-science','module-1-organisms-life-processes','Module 1: Organisms and Life Processes','Cells, reproduction, transport, excretion, coordination and health.',10,true,'{"module":1}'::jsonb),
('integrated-science','module-2-energy','Module 2: Energy','Energy changes, life processes, fuels, electricity, heat transfer and ventilation.',20,true,'{"module":2}'::jsonb),
('integrated-science','module-3-our-planet','Module 3: Our Planet','Earth and space, weather, water, forces, materials, household chemistry and pollution.',30,true,'{"module":3}'::jsonb)
on conflict(subject_id,section_id) do update set
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=true,
  metadata=coalesce(public.spark_subject_sections.metadata,'{}'::jsonb)||excluded.metadata,
  updated_at=now();

-- Retire the two original objective-level pilot rows. Their interactive diagrams
-- are retained by the learner runtime and attached to the canonical Units of Life topic.
update public.spark_subject_topics
set enabled=false,updated_at=now()
where subject_id='integrated-science';

with rows(topic_id,section_id,title,sort_order,objective_codes) as (
  values
  ('is-m1-t1-units-of-life','module-1-organisms-life-processes','Units of Life',101,array['1.1.1','1.1.2']::text[]),
  ('is-m1-t2-plant-reproduction','module-1-organisms-life-processes','Reproduction and Growth in Plants',102,array['1.2.1','1.2.2','1.2.3','1.2.4','1.2.5','1.2.6','1.2.7']::text[]),
  ('is-m1-t3-animal-reproduction','module-1-organisms-life-processes','Reproduction and Growth in Animals',103,array['1.3.1','1.3.2','1.3.3','1.3.4','1.3.5','1.3.6','1.3.7','1.3.8']::text[]),
  ('is-m1-t4-transport-systems','module-1-organisms-life-processes','Transport Systems',104,array['1.4.1','1.4.2','1.4.3']::text[]),
  ('is-m1-t5-excretion','module-1-organisms-life-processes','Excretion',105,array['1.5.1','1.5.2','1.5.3']::text[]),
  ('is-m1-t6-coordination','module-1-organisms-life-processes','Sense Organs and Coordination',106,array['1.6.1','1.6.2','1.6.3','1.6.4','1.6.5','1.6.6']::text[]),
  ('is-m1-t7-health','module-1-organisms-life-processes','Health',107,array['1.7.1','1.7.2','1.7.3','1.7.4','1.7.5','1.7.6','1.7.7','1.7.8','1.7.9','1.7.10','1.7.11','1.7.12']::text[]),
  ('is-m2-t1-conservation-energy','module-2-energy','Conservation of Energy',201,array['2.1.1','2.1.2','2.1.3','2.1.4']::text[]),
  ('is-m2-t2-life-energy','module-2-energy','Energy in Life Processes',202,array['2.2.1','2.2.2','2.2.3','2.2.4','2.2.5','2.2.6','2.2.7','2.2.8']::text[]),
  ('is-m2-t3-energy-sources','module-2-energy','Fossil Fuels and Alternative Sources of Energy',203,array['2.3.1','2.3.2']::text[]),
  ('is-m2-t4-electricity','module-2-energy','Electricity and Lighting',204,array['2.4.1','2.4.2','2.4.3','2.4.4','2.4.5','2.4.6','2.4.7','2.4.8','2.4.9','2.4.10']::text[]),
  ('is-m2-t5-heat-ventilation','module-2-energy','Temperature Control and Ventilation',205,array['2.5.1','2.5.2','2.5.3','2.5.4','2.5.5']::text[]),
  ('is-m3-t1-universe','module-3-our-planet','The Universe and Our Solar System',301,array['3.1.1','3.1.2','3.1.3','3.1.4','3.1.5']::text[]),
  ('is-m3-t2-terrestrial','module-3-our-planet','The Terrestrial Environment',302,array['3.2.1','3.2.2','3.2.3','3.2.4']::text[]),
  ('is-m3-t3-water','module-3-our-planet','Water and the Aquatic Environment',303,array['3.3.1','3.3.2','3.3.3','3.3.4','3.3.5','3.3.6','3.3.7','3.3.8','3.3.9','3.3.10']::text[]),
  ('is-m3-t4-forces','module-3-our-planet','Forces',304,array['3.4.1','3.4.2','3.4.3','3.4.4','3.4.5','3.4.6','3.4.7','3.4.8','3.4.9']::text[]),
  ('is-m3-t5-materials','module-3-our-planet','Metals and Non-metals',305,array['3.5.1','3.5.2','3.5.3','3.5.4','3.5.5','3.5.6']::text[]),
  ('is-m3-t6-household-chemistry','module-3-our-planet','Household Chemicals',306,array['3.6.1','3.6.2','3.6.3','3.6.4','3.6.5','3.6.6','3.6.7']::text[]),
  ('is-m3-t7-pollution','module-3-our-planet','Pollutants and Environment',307,array['3.7.1','3.7.2','3.7.3']::text[])
)
insert into public.spark_subject_topics(subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata)
select
  'integrated-science',
  topic_id,
  section_id,
  title,
  'Full SPARK learner lesson aligned to CSEC Integrated Science objectives '||array_to_string(objective_codes,', ')||'.',
  sort_order,
  true,
  jsonb_build_object(
    'syllabusObjectives',to_jsonb(objective_codes),
    'canonicalStudy',true,
    'contentSource','integratedScienceStudyCourse-v1'
  )
from rows
on conflict(subject_id,topic_id) do update set
  section_id=excluded.section_id,
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=true,
  metadata=coalesce(public.spark_subject_topics.metadata,'{}'::jsonb)||excluded.metadata,
  updated_at=now();


commit;
