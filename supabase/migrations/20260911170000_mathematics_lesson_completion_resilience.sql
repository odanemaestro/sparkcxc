begin;

-- SPARK Mathematics lesson completion resilience
--
-- The Mathematics UI previously depended on an exact title match in the
-- legacy public.lessons table and then performed a direct lesson_progress
-- upsert. The current curriculum contains 124 topics and can outgrow or rename
-- rows in that legacy catalogue. This RPC makes spark_subject_progress the
-- durable subject-scoped completion record and mirrors lesson_progress only
-- when a legacy lesson row exists.

do $$
begin
  if to_regclass('public.spark_subject_progress') is null then
    raise exception 'Missing public.spark_subject_progress. Apply the multisubject progress migration first.';
  end if;
  if to_regprocedure('public.spark_record_subject_progress(text,text,text,text,text,text,boolean,numeric,numeric,numeric,jsonb,boolean)') is null then
    raise exception 'Missing public.spark_record_subject_progress. Apply the multisubject progress migration first.';
  end if;
end $$;

alter table if exists public.lesson_progress
  add column if not exists completion_source text;

create or replace function public.spark_record_mathematics_lesson_completion(
  p_section_id text,
  p_topic_id text,
  p_title text,
  p_completion_source text default 'manual'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_section_id text := left(trim(coalesce(p_section_id, '')), 40);
  v_topic_id text := left(trim(coalesce(p_topic_id, '')), 40);
  v_title text := left(trim(coalesce(p_title, '')), 180);
  v_source text := case when lower(trim(coalesce(p_completion_source,''))) = 'quiz' then 'quiz' else 'manual' end;
  v_activity_key text;
  v_lesson_id public.lessons.id%type;
  v_progress_id public.lesson_progress.id%type;
  v_legacy_saved boolean := false;
  v_subject_saved boolean := false;
  v_subject_row public.spark_subject_progress;
  v_student_name text;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;
  if not exists (
    select 1 from public.profiles p
    where p.id = v_user_id and lower(coalesce(p.role,'')) = 'student'
  ) then
    raise exception 'Only Student accounts can record Mathematics lesson progress';
  end if;
  if v_title = '' then
    raise exception 'Lesson title is required';
  end if;

  v_activity_key := 'lesson:' || coalesce(nullif(v_section_id,''),'section') || ':' || coalesce(nullif(v_topic_id,''), md5(lower(v_title)));
  v_activity_key := left(v_activity_key, 120);

  -- Durable subject-scoped record. This no longer depends on the legacy
  -- lessons catalogue containing every current curriculum title.
  select * into v_subject_row
  from public.spark_record_subject_progress(
    'mathematics',
    v_activity_key,
    'lesson',
    nullif(v_section_id,''),
    nullif(v_topic_id,''),
    v_title,
    true,
    null,
    null,
    null,
    jsonb_build_object(
      'source','mathematics_lesson_view',
      'completion_source',v_source
    ),
    false
  );
  v_subject_saved := true;

  -- Best-effort legacy mirror for existing reports, rewards and older code.
  -- Exact match first, then case/whitespace-insensitive match. LIMIT 1 avoids
  -- .single() failures if duplicate legacy titles exist.
  select l.id into v_lesson_id
  from public.lessons l
  where l.title = v_title
  order by l.id
  limit 1;

  if v_lesson_id is null then
    select l.id into v_lesson_id
    from public.lessons l
    where lower(trim(l.title)) = lower(v_title)
    order by l.id
    limit 1;
  end if;

  if v_lesson_id is not null then
    select lp.id into v_progress_id
    from public.lesson_progress lp
    where lp.user_id = v_user_id and lp.lesson_id = v_lesson_id
    order by lp.completed_at desc nulls last, lp.id
    limit 1;

    if v_progress_id is null then
      insert into public.lesson_progress(
        user_id, lesson_id, completed, completion_source, completed_at
      ) values (
        v_user_id, v_lesson_id, true, v_source, now()
      );
    else
      update public.lesson_progress
      set completed = true,
          completion_source = v_source,
          completed_at = coalesce(completed_at, now())
      where id = v_progress_id;
    end if;
    v_legacy_saved := true;
  end if;

  -- If there is no legacy lesson row, the generic record above is still a
  -- complete save. Preserve the linked-parent lesson notification as well.
  if not v_legacy_saved
     and to_regprocedure('public.spark_record_learning_milestone_for_student(uuid,text,text,text,text,numeric,numeric,text,text,jsonb,text)') is not null then
    select coalesce(name, 'Your child') into v_student_name
    from public.profiles where id = v_user_id;

    perform public.spark_record_learning_milestone_for_student(
      v_user_id,
      'lesson_completed',
      v_title,
      'Lesson completed',
      format('%s completed %s.', coalesce(v_student_name,'Your child'), v_title),
      null,
      null,
      v_title,
      null,
      jsonb_build_object(
        'subject_id','mathematics',
        'section_id',nullif(v_section_id,''),
        'topic_id',nullif(v_topic_id,''),
        'completion_source',v_source,
        'legacy_lesson_missing',true
      ),
      v_user_id::text || ':lesson_completed:mathematics:' || md5(lower(v_title))
    );
  end if;

  return jsonb_build_object(
    'saved', v_subject_saved or v_legacy_saved,
    'subject_saved', v_subject_saved,
    'legacy_saved', v_legacy_saved,
    'activity_key', v_activity_key,
    'title', v_title
  );
end;
$$;

revoke all on function public.spark_record_mathematics_lesson_completion(text,text,text,text) from public, anon;
grant execute on function public.spark_record_mathematics_lesson_completion(text,text,text,text) to authenticated;

comment on function public.spark_record_mathematics_lesson_completion(text,text,text,text) is
  'Records Mathematics lesson completion without requiring every current curriculum topic to exist in the legacy lessons catalogue.';

commit;
