-- Publish the reviewed course after its frontend bundle has been deployed.
begin;

do $$
begin
  if not exists (
    select 1
    from public.spark_subjects
    where id = 'caribbean-history'
      and implementation = 'generic'
      and routes ->> 'study' = '/study/caribbean-history'
      and routes ->> 'practice' = '/practice/caribbean-history'
  ) then
    raise exception 'Caribbean History course registration is missing or inconsistent';
  end if;

  if (select count(*) from public.spark_subject_sections
      where subject_id = 'caribbean-history' and enabled) <> 10 then
    raise exception 'Caribbean History requires all 10 study sections';
  end if;

  if (select count(*) from public.spark_subject_topics
      where subject_id = 'caribbean-history' and enabled) <> 35 then
    raise exception 'Caribbean History requires all 35 study lessons';
  end if;

  if (select count(*) from public.spark_subject_activity_catalog
      where subject_id = 'caribbean-history' and enabled
        and activity_key in ('lab:ch-timeline', 'lab:ch-source', 'lab:ch-essay', 'lab:ch-sba')) <> 4 then
    raise exception 'Caribbean History requires all four workshop activities';
  end if;
end;
$$;

update public.spark_subjects
set enabled = true, status = 'live', updated_at = now()
where id = 'caribbean-history';

commit;
