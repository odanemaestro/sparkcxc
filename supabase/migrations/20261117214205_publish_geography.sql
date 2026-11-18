-- Activate the reviewed Geography course after the frontend has deployed.
begin;

do $$
begin
  if not exists (
    select 1 from public.spark_subjects
    where id = 'geography'
      and implementation = 'generic'
      and routes ->> 'study' = '/study/geography'
      and routes ->> 'practice' = '/practice/geography'
  ) then
    raise exception 'Geography course registration is missing or inconsistent';
  end if;

  if (select count(*) from public.spark_subject_sections
      where subject_id = 'geography' and enabled) <> 3 then
    raise exception 'Geography requires all three study sections';
  end if;

  if (select count(*) from public.spark_subject_topics
      where subject_id = 'geography' and enabled) <> 25 then
    raise exception 'Geography requires all 25 study lessons';
  end if;

  if (select count(*) from public.spark_subject_activity_catalog
      where subject_id = 'geography' and enabled
        and activity_key in ('lab:geo-map', 'lab:geo-climate', 'lab:geo-fieldwork', 'lab:geo-sketch')) <> 4 then
    raise exception 'Geography requires all four workshop activities';
  end if;
end;
$$;

update public.spark_subjects
set enabled = true, status = 'live', updated_at = now()
where id = 'geography';

commit;
