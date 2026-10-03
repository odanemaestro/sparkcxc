begin;

update public.spark_subject_topics
set
  title = '1.1.1 Diffusion, Osmosis and Active Transport',
  sort_order = 1,
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-1-diffusion-osmosis-active-transport';

update public.spark_subject_topics
set
  title = '1.1.2 Animal and Plant Cells',
  sort_order = 2,
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-animal-and-plant-cells';

commit;
