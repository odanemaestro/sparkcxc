begin;

-- ============================================================================
-- SPARK CSEC Integrated Science full-course acceptance integrity V2
-- Keep one enabled learner topic for each canonical syllabus objective.
-- ============================================================================

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
