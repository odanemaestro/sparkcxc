begin;

-- ============================================================================
-- SPARK Next Best Action V2
--
-- Adds safe aggregate learning signals on top of Learner Intelligence V2.
-- No function in this migration changes canonical answers, mark schemes or
-- awarded marks.
-- ============================================================================

create or replace function public.spark_get_learning_recommendation_history(
  p_subject_id text default null,
  p_limit integer default 80
)
returns setof public.spark_learning_recommendations
language sql
security definer
set search_path = public
as $function$
  select r.*
  from public.spark_learning_recommendations r
  where r.user_id = auth.uid()
    and (
      nullif(lower(trim(coalesce(p_subject_id,''))), '') is null
      or r.subject_id = lower(trim(p_subject_id))
    )
  order by r.created_at desc
  limit greatest(1, least(coalesce(p_limit,80), 200));
$function$;

revoke all on function public.spark_get_learning_recommendation_history(text,integer) from public;
grant execute on function public.spark_get_learning_recommendation_history(text,integer) to authenticated;

-- Students may dismiss one of their own stored recommendations. This is used
-- as a future fatigue signal, not as a penalty.
create or replace function public.spark_dismiss_learning_recommendation(
  p_recommendation_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
  v_count integer;
begin
  if v_user_id is null then
    return false;
  end if;

  update public.spark_learning_recommendations
  set status = 'dismissed',
      metadata = coalesce(metadata,'{}'::jsonb) || jsonb_build_object('dismissed_at', now()),
      updated_at = now()
  where id = p_recommendation_id
    and user_id = v_user_id
    and status in ('shown','started');

  get diagnostics v_count = row_count;
  return v_count > 0;
end;
$function$;

revoke all on function public.spark_dismiss_learning_recommendation(uuid) from public;
grant execute on function public.spark_dismiss_learning_recommendation(uuid) to authenticated;

-- Keep the V1 signature so every existing client remains compatible. Phase 2
-- adds a non-causal before/after performance signal to outcome_metadata.
create or replace function public.spark_observe_recommendation_outcome(
  p_subject_id text,
  p_activity_type text,
  p_activity_key text,
  p_percent numeric default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
  v_subject text := lower(trim(coalesce(p_subject_id,'')));
  v_type text := lower(trim(coalesce(p_activity_type,'')));
  v_id uuid;
  v_baseline numeric;
  v_outcome numeric;
begin
  if v_user_id is null or v_subject = '' or v_type = '' then
    return null;
  end if;

  select r.id, r.baseline_mastery
    into v_id, v_baseline
  from public.spark_learning_recommendations r
  where r.user_id = v_user_id
    and r.subject_id = v_subject
    and r.status = 'started'
    and r.created_at >= now() - interval '14 days'
    and (
      r.target_activity_type is null
      or r.target_activity_type = v_type
      or (r.action_type = 'targeted_practice' and v_type in ('topic_quiz','practice','exam'))
      or (r.action_type = 'baseline' and v_type in ('topic_quiz','practice','exam'))
      or (r.action_type = 'assessment' and v_type in ('section_checkpoint','exam','practice','topic_quiz'))
      or (r.action_type = 'prerequisite_review' and v_type in ('lesson','topic_quiz','practice'))
      or (r.action_type = 'cross_subject_prerequisite' and v_type in ('topic_quiz','practice','lesson'))
      or (r.action_type = 'lesson_or_lab' and v_type in ('lesson','lab'))
      or (r.action_type = 'lesson' and v_type = 'lesson')
      or (r.action_type = 'lab' and v_type = 'lab')
      or (r.action_type = 'sba_review' and v_type = 'sba_review')
      or (r.action_type = 'flashcards' and v_type in ('flashcard','flashcard_review'))
    )
  order by r.created_at desc
  limit 1;

  if v_id is null then
    return null;
  end if;

  v_outcome := case
    when p_percent is null then null
    else greatest(0,least(100,p_percent))
  end;

  update public.spark_learning_recommendations
  set status = 'completed',
      outcome_activity_type = v_type,
      outcome_activity_key = left(coalesce(p_activity_key,''),120),
      outcome_percent = v_outcome,
      outcome_metadata = coalesce(p_metadata,'{}'::jsonb)
        || case
             when v_outcome is not null and v_baseline is not null
             then jsonb_build_object(
               'performance_signal_delta', round(v_outcome - v_baseline, 2),
               'performance_signal_note', 'Outcome minus baseline mastery is a learning signal, not a causal effect estimate.'
             )
             else '{}'::jsonb
           end,
      completed_at = now(),
      updated_at = now()
  where id = v_id;

  return v_id;
end;
$function$;

revoke all on function public.spark_observe_recommendation_outcome(
  text,text,text,numeric,jsonb
) from public;
grant execute on function public.spark_observe_recommendation_outcome(
  text,text,text,numeric,jsonb
) to authenticated;

-- Privacy-safe aggregate intervention signal. It returns no user identifiers
-- and suppresses small samples. The client may use this only as a small ranking
-- adjustment. It never overrides learner-specific evidence.
create or replace function public.spark_recommendation_effectiveness_signal_v2()
returns table(
  subject_id text,
  action_type text,
  target_activity_type text,
  completed_count bigint,
  completion_rate numeric,
  average_outcome_percent numeric,
  average_outcome_delta numeric
)
language sql
security definer
set search_path = public
as $function$
  with grouped as (
    select
      r.subject_id,
      r.action_type,
      r.target_activity_type,
      count(*) as started_count,
      count(*) filter (where r.status = 'completed') as completed_count,
      avg(r.outcome_percent) filter (where r.status = 'completed' and r.outcome_percent is not null) as average_outcome_percent,
      avg(r.outcome_percent - r.baseline_mastery)
        filter (
          where r.status = 'completed'
            and r.outcome_percent is not null
            and r.baseline_mastery is not null
        ) as average_outcome_delta
    from public.spark_learning_recommendations r
    group by r.subject_id, r.action_type, r.target_activity_type
  )
  select
    g.subject_id,
    g.action_type,
    g.target_activity_type,
    g.completed_count,
    round((g.completed_count::numeric / nullif(g.started_count,0)) * 100, 1),
    round(g.average_outcome_percent, 1),
    round(g.average_outcome_delta, 1)
  from grouped g
  where g.completed_count >= 8;
$function$;

revoke all on function public.spark_recommendation_effectiveness_signal_v2() from public;
grant execute on function public.spark_recommendation_effectiveness_signal_v2() to authenticated;

-- Admin-only question quality signal. This exposes aggregate counts only.
-- It is for review queues and calibration. It cannot alter an answer key.
create or replace function public.spark_admin_question_quality_signals_v2(
  p_min_attempts integer default 20,
  p_limit integer default 200
)
returns table(
  question_id text,
  attempt_count bigint,
  success_rate numeric,
  observed_difficulty numeric,
  confidence_band text
)
language plpgsql
security definer
set search_path = public
as $function$
begin
  if auth.uid() is null or not exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ) then
    raise exception 'Admin access required';
  end if;

  return query
  select
    q.question_id::text,
    q.attempt_count::bigint,
    q.success_rate,
    q.observed_difficulty,
    q.confidence_band
  from public.spark_question_difficulty_v2 q
  where q.attempt_count >= greatest(10, coalesce(p_min_attempts,20))
  order by q.observed_difficulty desc, q.attempt_count desc
  limit greatest(1, least(coalesce(p_limit,200), 1000));
end;
$function$;

revoke all on function public.spark_admin_question_quality_signals_v2(integer,integer) from public;
grant execute on function public.spark_admin_question_quality_signals_v2(integer,integer) to authenticated;

comment on function public.spark_recommendation_effectiveness_signal_v2() is
'Privacy-safe aggregate recommendation outcomes. Small samples are suppressed. Used only as a bounded ranking signal.';

comment on function public.spark_admin_question_quality_signals_v2(integer,integer) is
'Admin-only aggregate question difficulty signal for review. Never changes canonical answers or marking.';

commit;