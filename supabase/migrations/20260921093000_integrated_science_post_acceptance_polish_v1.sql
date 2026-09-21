begin;

-- ============================================================================
-- Integrated Science post-acceptance learner polish V1
-- Normalise the two preserved Unit 1 topics after legacy-to-canonical catch-up.
-- ============================================================================

update public.spark_subject_topics
set
  section_id = 'module-1-organisms-life-processes',
  title = '1.1.1 Diffusion, Osmosis and Active Transport',
  sort_order = 10,
  enabled = true,
  metadata = jsonb_set(
    metadata,
    '{syllabus,objective}',
    '"1.1.1"'::jsonb,
    true
  ),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-1-diffusion-osmosis-active-transport';

update public.spark_subject_topics
set
  section_id = 'module-1-organisms-life-processes',
  title = '1.1.2 Animal and Plant Cells',
  sort_order = 20,
  enabled = true,
  metadata = jsonb_set(
    metadata,
    '{syllabus,objective}',
    '"1.1.2"'::jsonb,
    true
  ),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-animal-and-plant-cells';

do $$
declare
  v_first text;
  v_second text;
begin
  select topic_id into v_first
  from public.spark_subject_topics
  where subject_id = 'integrated-science'
    and enabled = true
  order by sort_order, title
  limit 1;

  select topic_id into v_second
  from public.spark_subject_topics
  where subject_id = 'integrated-science'
    and enabled = true
  order by sort_order, title
  offset 1
  limit 1;

  if v_first <> 'm1-t1-1-diffusion-osmosis-active-transport'
     or v_second <> 'm1-t1-2-animal-and-plant-cells' then
    raise exception
      'Integrated Science first-topic repair failed: found % then %',
      v_first, v_second;
  end if;
end
$$;

commit;
