begin;

-- ============================================================================
-- SPARK Generic Subject Learner Shell V2.1
-- ============================================================================

create or replace function public.spark_get_subject_learning_structure(
  p_subject_id text
)
returns jsonb
language plpgsql
security definer
stable
set search_path = public
as $function$
declare
  v_id text := lower(trim(coalesce(p_subject_id,'')));
  v_subject public.spark_subjects%rowtype;
begin
  select *
  into v_subject
  from public.spark_subjects s
  where s.id = v_id
    and s.enabled = true
    and s.status = 'live';

  if not found then
    return null;
  end if;

  return jsonb_build_object(
    'subject', jsonb_build_object(
      'id', v_subject.id,
      'name', v_subject.name,
      'short_name', v_subject.short_name,
      'qualification', v_subject.qualification,
      'mark', v_subject.mark,
      'description', v_subject.description,
      'capabilities', v_subject.capabilities,
      'routes', v_subject.routes,
      'learning_config', v_subject.learning_config
    ),
    'sections', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'subject_id', s.subject_id,
          'section_id', s.section_id,
          'title', s.title,
          'description', s.description,
          'sort_order', s.sort_order,
          'enabled', s.enabled,
          'metadata', s.metadata
        )
        order by s.sort_order, s.title
      )
      from public.spark_subject_sections s
      where s.subject_id = v_id
        and s.enabled = true
    ), '[]'::jsonb),
    'topics', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'subject_id', t.subject_id,
          'topic_id', t.topic_id,
          'section_id', t.section_id,
          'title', t.title,
          'description', t.description,
          'sort_order', t.sort_order,
          'enabled', t.enabled,
          'metadata', t.metadata
        )
        order by t.sort_order, t.title
      )
      from public.spark_subject_topics t
      where t.subject_id = v_id
        and t.enabled = true
    ), '[]'::jsonb),
    'activities', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'subject_id', a.subject_id,
          'activity_key', a.activity_key,
          'activity_type', a.activity_type,
          'section_id', a.section_id,
          'topic_id', a.topic_id,
          'title', a.title,
          'route', a.route,
          'evidence_weight', a.evidence_weight,
          'enabled', a.enabled,
          'metadata', a.metadata
        )
        order by a.title, a.activity_key
      )
      from public.spark_subject_activity_catalog a
      where a.subject_id = v_id
        and a.enabled = true
    ), '[]'::jsonb)
  );
end;
$function$;

revoke all on function public.spark_get_subject_learning_structure(text) from public, anon;
grant execute on function public.spark_get_subject_learning_structure(text) to authenticated;


create or replace function public.spark_guard_generic_subject_publish()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if new.enabled = true
     and new.status = 'live'
     and new.implementation = 'generic'
     and coalesce((new.capabilities->>'study')::boolean,false) = true then

    if not exists (
      select 1
      from public.spark_subject_sections s
      where s.subject_id = new.id
        and s.enabled = true
    ) then
      raise exception 'Add at least one enabled section before publishing a generic Study subject';
    end if;

    if not exists (
      select 1
      from public.spark_subject_topics t
      where t.subject_id = new.id
        and t.enabled = true
    ) then
      raise exception 'Add at least one enabled topic before publishing a generic Study subject';
    end if;

    if exists (
      select 1
      from public.spark_subject_topics t
      where t.subject_id = new.id
        and t.enabled = true
        and not exists (
          select 1
          from public.spark_subject_sections s
          where s.subject_id = new.id
            and s.section_id = t.section_id
            and s.enabled = true
        )
    ) then
      raise exception 'Every enabled topic must belong to an enabled section before publishing';
    end if;

    if exists (
      select 1
      from public.spark_subject_topics t
      where t.subject_id = new.id
        and t.enabled = true
        and nullif(trim(coalesce(t.description,'')),'') is null
        and jsonb_typeof(t.metadata->'lesson') is distinct from 'object'
    ) then
      raise exception 'Every enabled topic needs learner content before publishing';
    end if;
  end if;

  return new;
end;
$function$;

drop trigger if exists spark_guard_generic_subject_publish_trigger on public.spark_subjects;
create trigger spark_guard_generic_subject_publish_trigger
before insert or update on public.spark_subjects
for each row execute function public.spark_guard_generic_subject_publish();


create or replace function public.spark_set_subject_enrollment(
  p_subject_id text,
  p_enrolled boolean
)
returns public.spark_student_subject_enrollments
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_student_id uuid := auth.uid();
  v_subject_id text := lower(trim(coalesce(p_subject_id, '')));
  v_row public.spark_student_subject_enrollments;
begin
  if v_student_id is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1 from public.profiles p
    where p.id = v_student_id and p.role = 'student'
  ) then
    raise exception 'Only Student accounts can manage subject enrollment';
  end if;

  if v_subject_id !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then
    raise exception 'Invalid subject id';
  end if;

  if coalesce(p_enrolled,false) = true
     and not exists (
       select 1
       from public.spark_subjects s
       where s.id = v_subject_id
         and s.enabled = true
         and s.status = 'live'
     ) then
    raise exception 'This subject is not currently available for enrollment';
  end if;

  insert into public.spark_student_subject_enrollments(
    student_id, subject_id, status, enrolled_at, updated_at
  ) values (
    v_student_id,
    v_subject_id,
    case when coalesce(p_enrolled, false) then 'active' else 'inactive' end,
    now(),
    now()
  )
  on conflict (student_id, subject_id) do update set
    status = excluded.status,
    enrolled_at = case
      when excluded.status = 'active'
       and public.spark_student_subject_enrollments.status <> 'active'
      then now()
      else public.spark_student_subject_enrollments.enrolled_at
    end,
    updated_at = now()
  returning * into v_row;

  return v_row;
end;
$function$;

revoke all on function public.spark_set_subject_enrollment(text,boolean) from public, anon;
grant execute on function public.spark_set_subject_enrollment(text,boolean) to authenticated;


create or replace function public.spark_auto_enroll_new_subject_progress()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if not exists (
    select 1
    from public.spark_subjects s
    where s.id = lower(trim(new.subject_id))
      and s.enabled = true
      and s.status = 'live'
  ) then
    return new;
  end if;

  insert into public.spark_student_subject_enrollments(
    student_id, subject_id, status, enrolled_at, updated_at
  ) values (
    new.user_id,
    lower(trim(new.subject_id)),
    'active',
    coalesce(new.first_recorded_at, now()),
    now()
  )
  on conflict (student_id, subject_id) do nothing;

  return new;
end;
$function$;

revoke all on function public.spark_auto_enroll_new_subject_progress() from public, anon, authenticated;

comment on function public.spark_get_subject_learning_structure(text) is
'Returns enabled sections, topics and activity metadata for one live SPARK subject. Draft and disabled subjects return null.';

comment on function public.spark_guard_generic_subject_publish() is
'Prevents generic Study subjects from going live until enabled learner structure and topic content are ready.';

commit;