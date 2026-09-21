begin;

-- ============================================================================
-- SPARK CSEC Integrated Science full-course acceptance integrity V2
-- Keep one enabled learner topic for each canonical syllabus objective.
-- ============================================================================

-- Retire legacy full-course placeholder topics that used the m1-o-..., m2-o-...
-- and m3-o-... identifiers. Keep the rows for historical references, but remove
-- them from the learner structure once the acceptance-audited canonical topics
-- have been inserted.
update public.spark_subject_topics
set enabled = false,
    updated_at = now()
where subject_id = 'integrated-science'
  and topic_id ~ '^m[123]-o-';

-- Preserve old catalog records for audit/history while preventing activities
-- tied to retired placeholder topic IDs from surfacing in the learner shell.
update public.spark_subject_activity_catalog
set enabled = false,
    updated_at = now()
where subject_id = 'integrated-science'
  and topic_id ~ '^m[123]-o-';

-- Reconcile the accepted Module 3 learner structure with databases that
-- already use the original module-3-our-planet section id. The audited
-- objective migrations temporarily write to module-3-environment, then this
-- final gate moves those canonical topics and activities onto the established
-- section and retires the temporary duplicate.
update public.spark_subject_topics
set section_id = 'module-3-our-planet',
    updated_at = now()
where subject_id = 'integrated-science'
  and section_id = 'module-3-environment';

update public.spark_subject_activity_catalog
set section_id = 'module-3-our-planet',
    updated_at = now()
where subject_id = 'integrated-science'
  and section_id = 'module-3-environment';

update public.spark_subject_sections
set enabled = false,
    updated_at = now()
where subject_id = 'integrated-science'
  and section_id = 'module-3-environment';

update public.spark_subject_sections
set title = 'Module 3: Our Planet',
    description = 'Study the universe and Solar System, Caribbean weather and terrestrial processes, water and aquatic environments, forces, materials, household chemicals, pollution and environmental responsibility.',
    sort_order = 30,
    enabled = true,
    metadata = coalesce(metadata,'{}'::jsonb)
      || '{"module":3,"skills":["Knowledge and Comprehension","Use of Knowledge","Experimental Skills"]}'::jsonb,
    updated_at = now()
where subject_id = 'integrated-science'
  and section_id = 'module-3-our-planet';

-- Objective 1.1.1 was already established as
-- m1-t1-1-diffusion-osmosis-active-transport. A later objective migration
-- introduced m1-t1-1-cell-transport for the same syllabus objective. Keep the
-- established learner/progress route and remove only the redundant later row.
delete from public.spark_subject_topics
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-1-cell-transport';

-- Objective 1.1.2 was already seeded as m1-t1-2-animal-and-plant-cells.
-- A later migration introduced a second topic row with the same objective.
-- The established topic keeps the richer acceptance-audited lesson, diagram
-- activity routes and learner progression history contract.
delete from public.spark_subject_topics
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-plant-animal-cells';

update public.spark_subjects
set stats = coalesce(stats,'{}'::jsonb)
  || '{
    "sections":3,
    "topics":114,
    "objectives":114,
    "topicsBuilt":114,
    "objectivesBuilt":114
  }'::jsonb,
updated_at = now()
where id = 'integrated-science';

-- Fail the migration if the final enabled course structure is not a strict
-- one-topic-per-objective mapping against the 114-code canonical bank.
do $$
declare
  v_section_count integer;
  v_topic_count integer;
  v_objective_count integer;
begin
  select count(*)
    into v_section_count
  from public.spark_subject_sections
  where subject_id = 'integrated-science'
    and enabled = true;

  select count(*)
    into v_topic_count
  from public.spark_subject_topics
  where subject_id = 'integrated-science'
    and enabled = true;

  select count(distinct metadata #>> '{syllabus,objective}')
    into v_objective_count
  from public.spark_subject_topics
  where subject_id = 'integrated-science'
    and enabled = true
    and nullif(metadata #>> '{syllabus,objective}','') is not null;

  if v_section_count <> 3 then
    raise exception 'Integrated Science acceptance gate failed: expected 3 enabled sections, found %', v_section_count;
  end if;

  if v_topic_count <> 114 then
    raise exception 'Integrated Science acceptance gate failed: expected 114 enabled topics, found %', v_topic_count;
  end if;

  if v_objective_count <> 114 then
    raise exception 'Integrated Science acceptance gate failed: expected 114 unique syllabus objectives, found %', v_objective_count;
  end if;
end
$$;

commit;
