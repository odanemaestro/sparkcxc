begin;

-- ============================================================================
-- SPARK Learning Loop V3
--
-- Safe champion-vs-candidate recommendation experiments.
--
-- Guardrails:
--   * strategy effects are bounded ranking changes only
--   * assignments are stable per student + subject
--   * small samples cannot steer the engine
--   * model promotion requires an explicit admin action and minimum evidence
--   * recommendation outcomes are matched to the intended scope where possible
--   * nothing here changes canonical answers, mark schemes or awarded marks
-- ============================================================================

create table if not exists public.spark_learning_strategies (
  strategy_id text primary key,
  label text not null,
  description text not null default '',
  status text not null
    check (status in ('champion','candidate','paused','retired')),
  rollout_percent numeric not null default 0
    check (rollout_percent between 0 and 100),
  config jsonb not null default '{}'::jsonb,
  experiment_id text not null default 'next-best-action-v3',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists spark_learning_strategies_one_champion_idx
  on public.spark_learning_strategies ((status))
  where status = 'champion';

insert into public.spark_learning_strategies(
  strategy_id,label,description,status,rollout_percent,config,experiment_id
)
values
(
  'balanced-v2',
  'Balanced V2',
  'Current production Next Best Action ranking. Learner-specific evidence remains the main signal.',
  'champion',
  100,
  '{
    "actionBoosts": {},
    "lowConfidenceBaselineBoost": 0,
    "retentionRiskBoost": 0,
    "stalePracticeBoost": 0,
    "exactTargetBoost": 0,
    "maximumAdjustment": 0
  }'::jsonb,
  'next-best-action-v3'
),
(
  'retention-aware-v3',
  'Retention-aware V3',
  'Candidate that gives small bounded extra weight to retention risk, stale evidence and low-confidence baselines.',
  'candidate',
  10,
  '{
    "actionBoosts": {
      "flashcards": 3,
      "baseline": 1.5,
      "targeted_practice": 1
    },
    "lowConfidenceBaselineBoost": 3,
    "retentionRiskBoost": 7,
    "stalePracticeBoost": 3,
    "exactTargetBoost": 1,
    "maximumAdjustment": 8
  }'::jsonb,
  'next-best-action-v3'
)
on conflict (strategy_id) do nothing;

create table if not exists public.spark_learning_strategy_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null,
  strategy_id text not null references public.spark_learning_strategies(strategy_id),
  experiment_id text not null default 'next-best-action-v3',
  cohort_bucket integer not null check (cohort_bucket between 0 and 99),
  assigned_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, subject_id)
);

create index if not exists spark_learning_strategy_assignments_strategy_idx
  on public.spark_learning_strategy_assignments(strategy_id, subject_id, assigned_at);

alter table public.spark_learning_strategy_assignments enable row level security;

drop policy if exists spark_learning_strategy_assignments_select_own
on public.spark_learning_strategy_assignments;

create policy spark_learning_strategy_assignments_select_own
on public.spark_learning_strategy_assignments
for select
to authenticated
using (user_id = auth.uid());

revoke all on public.spark_learning_strategy_assignments from anon, authenticated;
grant select on public.spark_learning_strategy_assignments to authenticated;

-- Remove ambiguous old active recommendations before the stricter matcher is
-- enabled. Keep only the newest started recommendation per user + subject.
with ranked as (
  select
    id,
    row_number() over (
      partition by user_id, subject_id
      order by created_at desc, id desc
    ) as rn
  from public.spark_learning_recommendations
  where status = 'started'
)
update public.spark_learning_recommendations r
set
  status = 'expired',
  outcome_metadata = coalesce(r.outcome_metadata,'{}'::jsonb)
    || jsonb_build_object('expired_reason','superseded_before_learning_loop_v3'),
  updated_at = now()
from ranked x
where r.id = x.id
  and x.rn > 1;

update public.spark_learning_recommendations
set
  status = 'expired',
  outcome_metadata = coalesce(outcome_metadata,'{}'::jsonb)
    || jsonb_build_object('expired_reason','stale_before_learning_loop_v3'),
  updated_at = now()
where status = 'started'
  and created_at < now() - interval '7 days';

create or replace function public.spark_get_learning_strategy_assignment(
  p_subject_id text
)
returns table(
  assignment_id uuid,
  strategy_id text,
  label text,
  status text,
  experiment_id text,
  cohort_bucket integer,
  config jsonb
)
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
  v_subject text := lower(trim(coalesce(p_subject_id,'')));
  v_existing public.spark_learning_strategy_assignments%rowtype;
  v_strategy public.spark_learning_strategies%rowtype;
  v_champion public.spark_learning_strategies%rowtype;
  v_candidate public.spark_learning_strategies%rowtype;
  v_bucket integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if v_subject = '' then
    raise exception 'Subject is required';
  end if;

  if not exists (
    select 1
    from public.profiles p
    where p.id = v_user_id
      and p.role = 'student'
  ) then
    raise exception 'Only Student accounts receive learning strategy assignments';
  end if;

  select a.*
  into v_existing
  from public.spark_learning_strategy_assignments a
  join public.spark_learning_strategies s
    on s.strategy_id = a.strategy_id
  where a.user_id = v_user_id
    and a.subject_id = v_subject
    and s.status in ('champion','candidate')
  limit 1;

  if v_existing.id is not null then
    select *
    into v_strategy
    from public.spark_learning_strategies
    where public.spark_learning_strategies.strategy_id = v_existing.strategy_id;

    return query
    select
      v_existing.id,
      v_strategy.strategy_id,
      v_strategy.label,
      v_strategy.status,
      v_existing.experiment_id,
      v_existing.cohort_bucket,
      v_strategy.config;
    return;
  end if;

  select *
  into v_champion
  from public.spark_learning_strategies
  where public.spark_learning_strategies.status = 'champion'
  limit 1;

  if v_champion.strategy_id is null then
    raise exception 'No champion learning strategy is configured';
  end if;

  select *
  into v_candidate
  from public.spark_learning_strategies
  where public.spark_learning_strategies.status = 'candidate'
    and rollout_percent > 0
  order by updated_at desc, strategy_id
  limit 1;

  v_bucket := mod(
    hashtextextended(v_user_id::text || ':' || v_subject, 0)::numeric
      + 9223372036854775808::numeric,
    100
  )::integer;

  if v_candidate.strategy_id is not null
     and v_bucket < floor(v_candidate.rollout_percent)::integer then
    v_strategy := v_candidate;
  else
    v_strategy := v_champion;
  end if;

  insert into public.spark_learning_strategy_assignments(
    user_id,subject_id,strategy_id,experiment_id,cohort_bucket,assigned_at,updated_at
  )
  values (
    v_user_id,
    v_subject,
    v_strategy.strategy_id,
    v_strategy.experiment_id,
    v_bucket,
    now(),
    now()
  )
  on conflict (user_id,subject_id) do update
  set
    strategy_id = excluded.strategy_id,
    experiment_id = excluded.experiment_id,
    cohort_bucket = excluded.cohort_bucket,
    assigned_at = now(),
    updated_at = now()
  returning * into v_existing;

  return query
  select
    v_existing.id,
    v_strategy.strategy_id,
    v_strategy.label,
    v_strategy.status,
    v_existing.experiment_id,
    v_existing.cohort_bucket,
    v_strategy.config;
end;
$function$;

revoke all on function public.spark_get_learning_strategy_assignment(text) from public;
grant execute on function public.spark_get_learning_strategy_assignment(text) to authenticated;

-- V3 recommendation recording keeps one active recommendation per subject.
-- Starting a new recommendation expires any unfinished previous recommendation
-- for that subject so an unrelated later activity cannot complete the wrong row.
create or replace function public.spark_record_learning_recommendation(
  p_subject_id text,
  p_skill_key text default null,
  p_action_type text default 'review',
  p_target_activity_type text default null,
  p_title text default 'SPARK recommendation',
  p_reason text default null,
  p_baseline_mastery numeric default null,
  p_baseline_readiness numeric default null,
  p_model_version text default 'spark-learning-loop-v3.0',
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
  v_id uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1 from public.profiles p
    where p.id = v_user_id and p.role = 'student'
  ) then
    raise exception 'Only Student accounts can record learning recommendations';
  end if;

  if v_subject = '' then
    raise exception 'Subject is required';
  end if;

  update public.spark_learning_recommendations
  set
    status = 'expired',
    outcome_metadata = coalesce(outcome_metadata,'{}'::jsonb)
      || jsonb_build_object(
        'expired_reason','superseded_by_new_recommendation',
        'expired_at',now()
      ),
    updated_at = now()
  where user_id = v_user_id
    and subject_id = v_subject
    and status = 'started';

  insert into public.spark_learning_recommendations(
    user_id,
    subject_id,
    skill_key,
    action_type,
    target_activity_type,
    title,
    reason,
    baseline_mastery,
    baseline_readiness,
    model_version,
    status,
    metadata,
    started_at,
    created_at,
    updated_at
  )
  values (
    v_user_id,
    v_subject,
    nullif(trim(coalesce(p_skill_key,'')),''),
    lower(trim(coalesce(p_action_type,'review'))),
    nullif(lower(trim(coalesce(p_target_activity_type,''))),''),
    left(coalesce(nullif(trim(p_title),''),'SPARK recommendation'),180),
    nullif(trim(coalesce(p_reason,'')),''),
    case when p_baseline_mastery is null then null else greatest(0,least(100,p_baseline_mastery)) end,
    case when p_baseline_readiness is null then null else greatest(0,least(100,p_baseline_readiness)) end,
    left(coalesce(nullif(trim(p_model_version),''),'spark-learning-loop-v3.0'),80),
    'started',
    coalesce(p_metadata,'{}'::jsonb),
    now(),
    now(),
    now()
  )
  returning id into v_id;

  return v_id;
end;
$function$;

revoke all on function public.spark_record_learning_recommendation(
  text,text,text,text,text,text,numeric,numeric,text,jsonb
) from public;
grant execute on function public.spark_record_learning_recommendation(
  text,text,text,text,text,text,numeric,numeric,text,jsonb
) to authenticated;

-- Scope matcher for Phase 3 outcome attribution.
-- The recommendation target can optionally carry:
-- target.outcomeScope.topicId
-- target.outcomeScope.sectionId
-- target.outcomeScope.skill
-- target.outcomeScope.activityKeyPrefix
create or replace function public.spark_learning_outcome_scope_match_v3(
  p_recommendation_metadata jsonb,
  p_activity_key text,
  p_activity_metadata jsonb
)
returns boolean
language plpgsql
immutable
as $function$
declare
  v_scope jsonb := coalesce(p_recommendation_metadata,'{}'::jsonb)
    #> '{target,outcomeScope}';
  v_topic text;
  v_section text;
  v_skill text;
  v_prefix text;
  v_observed_topic text;
  v_observed_section text;
  v_observed_skill text;
begin
  if v_scope is null or v_scope = '{}'::jsonb then
    return true;
  end if;

  v_topic := nullif(lower(trim(coalesce(v_scope->>'topicId',''))),'');
  v_section := nullif(lower(trim(coalesce(v_scope->>'sectionId',''))),'');
  v_skill := nullif(lower(trim(coalesce(v_scope->>'skill',''))),'');
  v_prefix := nullif(lower(trim(coalesce(v_scope->>'activityKeyPrefix',''))),'');

  v_observed_topic := nullif(lower(trim(coalesce(
    p_activity_metadata->>'topic_id',
    p_activity_metadata->>'topic',
    ''
  ))),'');
  v_observed_section := nullif(lower(trim(coalesce(
    p_activity_metadata->>'section_id',
    p_activity_metadata->>'section',
    ''
  ))),'');
  v_observed_skill := nullif(lower(trim(coalesce(
    p_activity_metadata->>'skill',
    p_activity_metadata->>'requested_skill',
    ''
  ))),'');

  if v_topic is not null
     and not (
       v_observed_topic = v_topic
       or lower(coalesce(p_activity_key,'')) like '%:' || v_topic
     ) then
    return false;
  end if;

  if v_section is not null
     and not (
       v_observed_section = v_section
       or lower(coalesce(p_activity_key,'')) like '%:' || v_section
     ) then
    return false;
  end if;

  if v_skill is not null
     and v_observed_skill is distinct from v_skill then
    return false;
  end if;

  if v_prefix is not null
     and lower(coalesce(p_activity_key,'')) not like v_prefix || '%' then
    return false;
  end if;

  return true;
end;
$function$;

-- Keep the existing public signature. V3 makes matching stricter without
-- changing any caller.
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

  update public.spark_learning_recommendations
  set
    status = 'expired',
    outcome_metadata = coalesce(outcome_metadata,'{}'::jsonb)
      || jsonb_build_object('expired_reason','stale_recommendation'),
    updated_at = now()
  where user_id = v_user_id
    and subject_id = v_subject
    and status = 'started'
    and created_at < now() - interval '7 days';

  select r.id, r.baseline_mastery
  into v_id, v_baseline
  from public.spark_learning_recommendations r
  where r.user_id = v_user_id
    and r.subject_id = v_subject
    and r.status = 'started'
    and r.created_at >= now() - interval '7 days'
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
    and public.spark_learning_outcome_scope_match_v3(
      r.metadata,
      p_activity_key,
      coalesce(p_metadata,'{}'::jsonb)
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
  set
    status = 'completed',
    outcome_activity_type = v_type,
    outcome_activity_key = left(coalesce(p_activity_key,''),120),
    outcome_percent = v_outcome,
    outcome_metadata = coalesce(p_metadata,'{}'::jsonb)
      || case
           when v_outcome is not null and v_baseline is not null
           then jsonb_build_object(
             'performance_signal_delta', round(v_outcome - v_baseline,2),
             'performance_signal_note',
             'Outcome minus baseline mastery is a learning signal, not a causal effect estimate.',
             'scope_matched', true
           )
           else jsonb_build_object('scope_matched',true)
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

-- Strategy performance is aggregate and contains no student identifiers.
create or replace view public.spark_learning_strategy_performance_v3 as
with base as (
  select
    coalesce(nullif(r.metadata->>'strategy_id',''),'legacy-v2') as strategy_id,
    coalesce(nullif(r.metadata->>'experiment_id',''),'pre-v3') as experiment_id,
    r.subject_id,
    count(*) as started_count,
    count(*) filter (where r.status = 'completed') as completed_count,
    avg(r.outcome_percent)
      filter (where r.status = 'completed' and r.outcome_percent is not null)
      as average_outcome_percent,
    avg(r.outcome_percent - r.baseline_mastery)
      filter (
        where r.status = 'completed'
          and r.outcome_percent is not null
          and r.baseline_mastery is not null
      ) as average_outcome_delta,
    min(r.created_at) as first_observed_at,
    max(r.created_at) as last_observed_at
  from public.spark_learning_recommendations r
  group by 1,2,3
)
select
  b.strategy_id,
  b.experiment_id,
  b.subject_id,
  b.started_count::bigint,
  b.completed_count::bigint,
  round((b.completed_count::numeric / nullif(b.started_count,0)) * 100,1)
    as completion_rate,
  round(b.average_outcome_percent,1) as average_outcome_percent,
  round(b.average_outcome_delta,1) as average_outcome_delta,
  round(
    b.average_outcome_delta
      * (b.completed_count::numeric / (b.completed_count + 24)),
    1
  ) as adjusted_outcome_delta,
  case
    when b.completed_count < 12 then 'insufficient'
    when b.completed_count < 30 then 'early'
    when b.completed_count < 75 then 'moderate'
    else 'strong'
  end as confidence_band,
  case
    when b.completed_count >= 20 and b.average_outcome_delta < -5
      then 'negative_outcome_signal'
    when b.completed_count >= 20
      and (b.completed_count::numeric / nullif(b.started_count,0)) < 0.35
      then 'low_completion'
    else null
  end as safety_flag,
  b.first_observed_at,
  b.last_observed_at
from base b;

revoke all on public.spark_learning_strategy_performance_v3 from anon, authenticated;
grant select on public.spark_learning_strategy_performance_v3 to service_role;

-- Student clients receive only sufficiently sampled aggregate strategy signals.
create or replace function public.spark_learning_strategy_performance_signal_v3()
returns table(
  strategy_id text,
  subject_id text,
  completed_count bigint,
  completion_rate numeric,
  average_outcome_delta numeric,
  adjusted_outcome_delta numeric,
  confidence_band text
)
language sql
security definer
set search_path = public
as $function$
  select
    p.strategy_id,
    p.subject_id,
    p.completed_count,
    p.completion_rate,
    p.average_outcome_delta,
    p.adjusted_outcome_delta,
    p.confidence_band
  from public.spark_learning_strategy_performance_v3 p
  where p.strategy_id <> 'legacy-v2'
    and p.completed_count >= 12;
$function$;

revoke all on function public.spark_learning_strategy_performance_signal_v3() from public;
grant execute on function public.spark_learning_strategy_performance_signal_v3() to authenticated;

create or replace function public.spark_admin_learning_strategy_dashboard_v3()
returns table(
  strategy_id text,
  label text,
  description text,
  status text,
  rollout_percent numeric,
  experiment_id text,
  started_count bigint,
  completed_count bigint,
  completion_rate numeric,
  average_outcome_delta numeric,
  adjusted_outcome_delta numeric,
  confidence_band text,
  safety_flag text,
  first_observed_at timestamptz,
  last_observed_at timestamptz,
  eligible_for_review boolean
)
language plpgsql
security definer
set search_path = public
as $function$
begin
  if auth.uid() is null or not exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  ) then
    raise exception 'Admin access required';
  end if;

  return query
  with perf as (
    select
      p.strategy_id,
      sum(p.started_count)::bigint as started_count,
      sum(p.completed_count)::bigint as completed_count,
      round(
        sum(p.completion_rate * p.started_count)
          / nullif(sum(p.started_count),0),
        1
      ) as completion_rate,
      round(
        sum(p.average_outcome_delta * p.completed_count)
          / nullif(sum(p.completed_count),0),
        1
      ) as average_outcome_delta,
      round(
        sum(p.adjusted_outcome_delta * p.completed_count)
          / nullif(sum(p.completed_count),0),
        1
      ) as adjusted_outcome_delta,
      min(p.first_observed_at) as first_observed_at,
      max(p.last_observed_at) as last_observed_at,
      case
        when sum(p.completed_count) < 12 then 'insufficient'
        when sum(p.completed_count) < 30 then 'early'
        when sum(p.completed_count) < 75 then 'moderate'
        else 'strong'
      end as confidence_band,
      max(p.safety_flag) filter (where p.safety_flag is not null) as safety_flag
    from public.spark_learning_strategy_performance_v3 p
    where p.strategy_id <> 'legacy-v2'
    group by p.strategy_id
  )
  select
    s.strategy_id,
    s.label,
    s.description,
    s.status,
    s.rollout_percent,
    s.experiment_id,
    coalesce(p.started_count,0),
    coalesce(p.completed_count,0),
    coalesce(p.completion_rate,0),
    p.average_outcome_delta,
    p.adjusted_outcome_delta,
    coalesce(p.confidence_band,'insufficient'),
    p.safety_flag,
    p.first_observed_at,
    p.last_observed_at,
    (
      s.status = 'candidate'
      and coalesce(p.completed_count,0) >= 30
      and p.first_observed_at <= now() - interval '7 days'
      and p.safety_flag is null
    ) as eligible_for_review
  from public.spark_learning_strategies s
  left join perf p
    on p.strategy_id = s.strategy_id
  order by
    case s.status
      when 'champion' then 1
      when 'candidate' then 2
      when 'paused' then 3
      else 4
    end,
    s.strategy_id;
end;
$function$;

revoke all on function public.spark_admin_learning_strategy_dashboard_v3() from public;
grant execute on function public.spark_admin_learning_strategy_dashboard_v3() to authenticated;

create or replace function public.spark_admin_set_learning_strategy_v3(
  p_strategy_id text,
  p_action text,
  p_rollout_percent numeric default null
)
returns boolean
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_action text := lower(trim(coalesce(p_action,'')));
  v_strategy public.spark_learning_strategies%rowtype;
  v_candidate record;
  v_champion record;
begin
  if auth.uid() is null or not exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  ) then
    raise exception 'Admin access required';
  end if;

  select *
  into v_strategy
  from public.spark_learning_strategies
  where strategy_id = p_strategy_id;

  if v_strategy.strategy_id is null then
    raise exception 'Unknown learning strategy';
  end if;

  if v_action = 'pause' then
    if v_strategy.status <> 'candidate' then
      raise exception 'Only a candidate strategy can be paused';
    end if;

    update public.spark_learning_strategies
    set status = 'paused', rollout_percent = 0, updated_at = now()
    where strategy_id = p_strategy_id;

    return true;
  end if;

  if v_action in ('resume','set_rollout') then
    if v_strategy.status not in ('candidate','paused') then
      raise exception 'Only candidate strategies can change rollout';
    end if;

    update public.spark_learning_strategies
    set
      status = case
        when coalesce(p_rollout_percent,10) > 0 then 'candidate'
        else 'paused'
      end,
      rollout_percent = greatest(
        0,
        least(25,coalesce(p_rollout_percent,10))
      ),
      updated_at = now()
    where strategy_id = p_strategy_id;

    return true;
  end if;

  if v_action = 'promote' then
    if v_strategy.status <> 'candidate' then
      raise exception 'Only a candidate strategy can be promoted';
    end if;

    select *
    into v_candidate
    from public.spark_admin_learning_strategy_dashboard_v3()
    where strategy_id = p_strategy_id;

    select *
    into v_champion
    from public.spark_admin_learning_strategy_dashboard_v3()
    where status = 'champion'
    limit 1;

    if coalesce(v_candidate.completed_count,0) < 30 then
      raise exception 'Candidate needs at least 30 completed recommendation outcomes';
    end if;

    if v_candidate.first_observed_at is null
       or v_candidate.first_observed_at > now() - interval '7 days' then
      raise exception 'Candidate needs at least 7 days of observed outcomes';
    end if;

    if v_candidate.safety_flag is not null then
      raise exception 'Candidate has an active safety flag: %', v_candidate.safety_flag;
    end if;

    if coalesce(v_champion.completed_count,0) < 30 then
      raise exception 'Champion needs at least 30 completed outcomes for a fair comparison';
    end if;

    if v_candidate.completion_rate < v_champion.completion_rate - 10 then
      raise exception 'Candidate completion rate is too far below the champion';
    end if;

    if coalesce(v_candidate.adjusted_outcome_delta,-999)
       < coalesce(v_champion.adjusted_outcome_delta,0) - 2 then
      raise exception 'Candidate adjusted outcome signal is too far below the champion';
    end if;

    update public.spark_learning_strategies
    set status = 'retired', rollout_percent = 0, updated_at = now()
    where status = 'champion';

    update public.spark_learning_strategies
    set status = 'champion', rollout_percent = 100, updated_at = now()
    where strategy_id = p_strategy_id;

    return true;
  end if;

  raise exception 'Unsupported strategy action';
end;
$function$;

revoke all on function public.spark_admin_set_learning_strategy_v3(text,text,numeric) from public;
grant execute on function public.spark_admin_set_learning_strategy_v3(text,text,numeric) to authenticated;

comment on table public.spark_learning_strategies is
'SPARK Learning Loop strategy registry. Promotion is admin-controlled and never modifies grading.';

comment on table public.spark_learning_strategy_assignments is
'Stable student-subject assignments for safe champion-vs-candidate recommendation experiments.';

comment on view public.spark_learning_strategy_performance_v3 is
'Aggregate strategy outcomes. Before/after deltas are non-causal learning signals and are shrunk for small samples.';

comment on function public.spark_learning_outcome_scope_match_v3(jsonb,text,jsonb) is
'Matches a recommendation to the intended topic, section, skill or activity-key prefix when that scope is available.';

commit;