begin;

-- ============================================================================
-- SPARK canonical subject progress: interactive diagram support
--
-- Preserve the complete live activity-type contract and add `diagram`.
-- Existing production types:
-- lesson, lab, flashcard, flashcard_review, sba_review, topic_quiz,
-- section_checkpoint, exam, practice, other.
-- ============================================================================

alter table public.spark_subject_progress
  drop constraint if exists spark_subject_progress_activity_type_check;

alter table public.spark_subject_progress
  add constraint spark_subject_progress_activity_type_check
  check (
    activity_type in (
      'lesson',
      'lab',
      'flashcard',
      'flashcard_review',
      'sba_review',
      'topic_quiz',
      'section_checkpoint',
      'exam',
      'practice',
      'diagram',
      'other'
    )
  );

alter table public.spark_subject_activity_events
  drop constraint if exists spark_subject_activity_events_activity_type_check;

alter table public.spark_subject_activity_events
  add constraint spark_subject_activity_events_activity_type_check
  check (
    activity_type in (
      'lesson',
      'lab',
      'flashcard',
      'flashcard_review',
      'sba_review',
      'topic_quiz',
      'section_checkpoint',
      'exam',
      'practice',
      'diagram',
      'other'
    )
  );


create or replace function public.spark_record_subject_progress(
  p_subject_id text,
  p_activity_key text,
  p_activity_type text,
  p_section_id text default null,
  p_topic_id text default null,
  p_title text default null,
  p_completed boolean default true,
  p_score numeric default null,
  p_max_score numeric default null,
  p_percent numeric default null,
  p_metadata jsonb default '{}'::jsonb,
  p_silent boolean default false
)
returns public.spark_subject_progress
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
  v_subject_id text := lower(trim(coalesce(p_subject_id, '')));
  v_key text := trim(coalesce(p_activity_key, ''));
  v_type text := lower(trim(coalesce(p_activity_type, '')));
  v_title text := left(coalesce(nullif(trim(p_title), ''), v_key), 180);
  v_score numeric := case when p_score is null then null else greatest(0, p_score) end;
  v_max numeric := case when p_max_score is null then null else greatest(0, p_max_score) end;
  v_percent numeric(6,2);
  v_row public.spark_subject_progress;
  v_is_attempt boolean;
  v_existing_completed_at timestamptz;
  v_should_log boolean := false;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  if not exists (
    select 1 from public.profiles p
    where p.id = v_user_id and p.role = 'student'
  ) then
    raise exception 'Only Student accounts can record learning progress';
  end if;

  if v_subject_id !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then
    raise exception 'Invalid subject id';
  end if;

  if char_length(v_key) not between 1 and 120 then
    raise exception 'Invalid activity key';
  end if;

  if v_type not in (
    'lesson','lab','flashcard','flashcard_review','sba_review',
    'topic_quiz','section_checkpoint','exam','practice','diagram','other'
  ) then
    raise exception 'Unsupported subject activity type';
  end if;

  if v_score is not null and v_max is not null and v_max > 0 then
    v_score := least(v_score, v_max);
    v_percent := round((v_score / v_max) * 100, 2);
  elsif p_percent is not null then
    v_percent := greatest(0, least(100, p_percent));
  else
    v_percent := null;
  end if;

  v_is_attempt := v_type in ('topic_quiz','section_checkpoint','exam','practice');

  select sp.completed_at
    into v_existing_completed_at
  from public.spark_subject_progress sp
  where sp.user_id = v_user_id
    and sp.subject_id = v_subject_id
    and sp.activity_key = v_key;

  insert into public.spark_subject_progress(
    user_id, subject_id, activity_key, activity_type, section_id, topic_id, title,
    completed, score, max_score, percent, best_percent, attempt_count, metadata,
    completed_at, first_recorded_at, updated_at
  ) values (
    v_user_id, v_subject_id, v_key, v_type,
    nullif(trim(coalesce(p_section_id,'')),''),
    nullif(trim(coalesce(p_topic_id,'')),''),
    v_title, coalesce(p_completed,false),
    v_score, v_max, v_percent, v_percent,
    case when v_is_attempt and not coalesce(p_silent,false) then 1 else 0 end,
    coalesce(p_metadata,'{}'::jsonb) || jsonb_build_object('subject_id',v_subject_id),
    case when coalesce(p_completed,false) then now() else null end,
    now(), now()
  )
  on conflict (user_id, subject_id, activity_key) do update set
    activity_type = excluded.activity_type,
    section_id = coalesce(excluded.section_id, public.spark_subject_progress.section_id),
    topic_id = coalesce(excluded.topic_id, public.spark_subject_progress.topic_id),
    title = excluded.title,
    completed = excluded.completed,
    completed_at = coalesce(public.spark_subject_progress.completed_at, excluded.completed_at),
    score = coalesce(excluded.score, public.spark_subject_progress.score),
    max_score = coalesce(excluded.max_score, public.spark_subject_progress.max_score),
    percent = coalesce(excluded.percent, public.spark_subject_progress.percent),
    best_percent = case
      when excluded.percent is null then public.spark_subject_progress.best_percent
      else greatest(coalesce(public.spark_subject_progress.best_percent,0), excluded.percent)
    end,
    attempt_count = public.spark_subject_progress.attempt_count
      + case when v_is_attempt and not coalesce(p_silent,false) then 1 else 0 end,
    metadata = public.spark_subject_progress.metadata || excluded.metadata,
    updated_at = now()
  returning * into v_row;

  if not coalesce(p_silent,false) then
    v_should_log := v_is_attempt
      or v_type = 'flashcard'
      or (
        v_type in ('lesson','lab','flashcard_review','sba_review','diagram')
        and coalesce(p_completed,false)
        and v_existing_completed_at is null
      );
  end if;

  if v_should_log then
    insert into public.spark_subject_activity_events(
      user_id, subject_id, activity_key, activity_type, section_id, topic_id, title,
      completed, score, max_score, percent, metadata, occurred_at, created_at
    ) values (
      v_user_id, v_subject_id, v_key, v_type,
      nullif(trim(coalesce(p_section_id,'')),''),
      nullif(trim(coalesce(p_topic_id,'')),''),
      v_title, coalesce(p_completed,false),
      v_score, v_max, v_percent,
      coalesce(p_metadata,'{}'::jsonb) || jsonb_build_object('subject_id',v_subject_id),
      now(), now()
    );
  end if;

  return v_row;
end;
$function$;

revoke all on function public.spark_record_subject_progress(
  text,text,text,text,text,text,boolean,numeric,numeric,numeric,jsonb,boolean
) from public, anon;

grant execute on function public.spark_record_subject_progress(
  text,text,text,text,text,text,boolean,numeric,numeric,numeric,jsonb,boolean
) to authenticated;


create or replace function public.spark_sync_subject_progress(
  p_subject_id text,
  p_rows jsonb
)
returns integer
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
  v_subject_id text := lower(trim(coalesce(p_subject_id,'')));
  v_item jsonb;
  v_count integer := 0;
  v_key text;
  v_type text;
  v_percent numeric;
  v_best numeric;
  v_attempts integer;
  v_when timestamptz;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  if not exists (
    select 1 from public.profiles p
    where p.id = v_user_id and p.role = 'student'
  ) then
    raise exception 'Only Student accounts can sync learning progress';
  end if;

  if v_subject_id !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then
    raise exception 'Invalid subject id';
  end if;

  if jsonb_typeof(coalesce(p_rows,'[]'::jsonb)) <> 'array' then
    raise exception 'Progress rows must be an array';
  end if;

  if jsonb_array_length(coalesce(p_rows,'[]'::jsonb)) > 250 then
    raise exception 'Too many progress rows';
  end if;

  for v_item in
    select value
    from jsonb_array_elements(coalesce(p_rows,'[]'::jsonb))
  loop
    v_key := trim(coalesce(v_item->>'activity_key',''));
    v_type := lower(trim(coalesce(v_item->>'activity_type','')));

    if char_length(v_key) not between 1 and 120 then continue; end if;

    if v_type not in (
      'lesson','lab','flashcard','flashcard_review','sba_review',
      'topic_quiz','section_checkpoint','exam','practice','diagram','other'
    ) then
      continue;
    end if;

    begin v_percent := nullif(v_item->>'percent','')::numeric;
    exception when others then v_percent := null;
    end;

    begin v_best := nullif(v_item->>'best_percent','')::numeric;
    exception when others then v_best := null;
    end;

    begin
      v_attempts := greatest(
        0,
        coalesce(nullif(v_item->>'attempt_count','')::integer,0)
      );
    exception when others then
      v_attempts := 0;
    end;

    begin v_when := nullif(v_item->>'occurred_at','')::timestamptz;
    exception when others then v_when := null;
    end;

    insert into public.spark_subject_progress(
      user_id, subject_id, activity_key, activity_type, section_id, topic_id, title,
      completed, score, max_score, percent, best_percent, attempt_count, metadata,
      completed_at, first_recorded_at, updated_at
    ) values (
      v_user_id, v_subject_id, v_key, v_type,
      nullif(trim(coalesce(v_item->>'section_id','')),''),
      nullif(trim(coalesce(v_item->>'topic_id','')),''),
      left(coalesce(nullif(trim(v_item->>'title'),''),v_key),180),
      coalesce((v_item->>'completed')::boolean,false),
      case when v_item ? 'score' and nullif(v_item->>'score','') is not null
        then greatest(0,(v_item->>'score')::numeric) else null end,
      case when v_item ? 'max_score' and nullif(v_item->>'max_score','') is not null
        then greatest(0,(v_item->>'max_score')::numeric) else null end,
      case when v_percent is null then null
        else greatest(0,least(100,v_percent)) end,
      case when coalesce(v_best,v_percent) is null then null
        else greatest(0,least(100,coalesce(v_best,v_percent))) end,
      v_attempts,
      coalesce(v_item->'metadata','{}'::jsonb)
        || jsonb_build_object('subject_id',v_subject_id,'backfilled',true),
      case when coalesce((v_item->>'completed')::boolean,false)
        then coalesce(v_when,now()) else null end,
      coalesce(v_when,now()),
      coalesce(v_when,now())
    )
    on conflict (user_id,subject_id,activity_key) do update set
      completed = case
        when excluded.activity_type in ('lesson','lab','diagram')
        then public.spark_subject_progress.completed or excluded.completed
        else public.spark_subject_progress.completed
      end,
      completed_at = coalesce(
        public.spark_subject_progress.completed_at,
        excluded.completed_at
      ),
      score = coalesce(
        public.spark_subject_progress.score,
        excluded.score
      ),
      max_score = coalesce(
        public.spark_subject_progress.max_score,
        excluded.max_score
      ),
      percent = coalesce(
        public.spark_subject_progress.percent,
        excluded.percent
      ),
      best_percent = greatest(
        coalesce(public.spark_subject_progress.best_percent,0),
        coalesce(excluded.best_percent,0)
      ),
      attempt_count = greatest(
        public.spark_subject_progress.attempt_count,
        excluded.attempt_count
      ),
      metadata = public.spark_subject_progress.metadata || excluded.metadata,
      updated_at = case
        when public.spark_subject_progress.updated_at is null then excluded.updated_at
        when v_when is null then public.spark_subject_progress.updated_at
        else greatest(
          public.spark_subject_progress.updated_at,
          excluded.updated_at
        )
      end;

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$function$;

revoke all on function public.spark_sync_subject_progress(text,jsonb)
from public, anon;

grant execute on function public.spark_sync_subject_progress(text,jsonb)
to authenticated;

commit;