begin;

-- ============================================================================
-- SPARK Learner Intelligence V2
--
-- This migration records recommendations and their outcomes so SPARK can learn
-- which interventions are useful over time. It also exposes aggregate observed
-- question difficulty. It never changes canonical answers or marking schemes.
-- ============================================================================

create table if not exists public.spark_learning_recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null,
  skill_key text,
  action_type text not null,
  target_activity_type text,
  title text not null,
  reason text,
  baseline_mastery numeric,
  baseline_readiness numeric,
  model_version text not null default 'spark-learner-v2.0',
  status text not null default 'started'
    check (status in ('shown','started','completed','dismissed','expired')),
  outcome_activity_type text,
  outcome_activity_key text,
  outcome_percent numeric,
  outcome_metadata jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(subject_id) between 1 and 40),
  check (char_length(action_type) between 1 and 60),
  check (baseline_mastery is null or baseline_mastery between 0 and 100),
  check (baseline_readiness is null or baseline_readiness between 0 and 100),
  check (outcome_percent is null or outcome_percent between 0 and 100)
);

create index if not exists spark_learning_recommendations_user_recent_idx
  on public.spark_learning_recommendations(user_id, created_at desc);

create index if not exists spark_learning_recommendations_subject_status_idx
  on public.spark_learning_recommendations(user_id, subject_id, status, created_at desc);

alter table public.spark_learning_recommendations enable row level security;

drop policy if exists spark_learning_recommendations_select_own on public.spark_learning_recommendations;
create policy spark_learning_recommendations_select_own
on public.spark_learning_recommendations
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists spark_learning_recommendations_insert_own on public.spark_learning_recommendations;
create policy spark_learning_recommendations_insert_own
on public.spark_learning_recommendations
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists spark_learning_recommendations_update_own on public.spark_learning_recommendations;
create policy spark_learning_recommendations_update_own
on public.spark_learning_recommendations
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create or replace function public.spark_record_learning_recommendation(
  p_subject_id text,
  p_skill_key text default null,
  p_action_type text default 'review',
  p_target_activity_type text default null,
  p_title text default 'SPARK recommendation',
  p_reason text default null,
  p_baseline_mastery numeric default null,
  p_baseline_readiness numeric default null,
  p_model_version text default 'spark-learner-v2.0',
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
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
    lower(trim(p_subject_id)),
    nullif(trim(coalesce(p_skill_key,'')),''),
    lower(trim(coalesce(p_action_type,'review'))),
    nullif(lower(trim(coalesce(p_target_activity_type,''))),''),
    left(coalesce(nullif(trim(p_title),''),'SPARK recommendation'),180),
    nullif(trim(coalesce(p_reason,'')),''),
    case when p_baseline_mastery is null then null else greatest(0,least(100,p_baseline_mastery)) end,
    case when p_baseline_readiness is null then null else greatest(0,least(100,p_baseline_readiness)) end,
    left(coalesce(nullif(trim(p_model_version),''),'spark-learner-v2.0'),80),
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
begin
  if v_user_id is null or v_subject = '' or v_type = '' then
    return null;
  end if;

  select r.id into v_id
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
      or (r.action_type = 'assessment' and v_type in ('section_checkpoint','exam'))
      or (r.action_type = 'prerequisite_review' and v_type in ('lesson','topic_quiz','practice'))
      or (r.action_type = 'lesson_or_lab' and v_type in ('lesson','lab'))
      or (r.action_type = 'flashcards' and v_type in ('flashcard','flashcard_review'))
    )
  order by r.created_at desc
  limit 1;

  if v_id is null then
    return null;
  end if;

  update public.spark_learning_recommendations
  set status = 'completed',
      outcome_activity_type = v_type,
      outcome_activity_key = left(coalesce(p_activity_key,''),120),
      outcome_percent = case when p_percent is null then null else greatest(0,least(100,p_percent)) end,
      outcome_metadata = coalesce(p_metadata,'{}'::jsonb),
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

-- Aggregate observed question difficulty. This does not replace authored
-- Easy/Medium/Hard labels. It gives SPARK a second, evidence-based signal and
-- flags questions whose observed performance is surprising.
create or replace view public.spark_question_difficulty_v2 as
select
  qa.question_id,
  count(*)::int as attempt_count,
  round(avg(case when qa.correct then 1.0 else 0.0 end)::numeric,4) as success_rate,
  round((1.0 - avg(case when qa.correct then 1.0 else 0.0 end))::numeric,4) as observed_difficulty,
  case
    when count(*) < 10 then 'low'
    when count(*) < 30 then 'medium'
    else 'high'
  end as confidence_band,
  min(qa.attempted_at) as first_observed_at,
  max(qa.attempted_at) as last_observed_at
from public.csec_question_attempts qa
group by qa.question_id;

revoke all on public.spark_question_difficulty_v2 from anon, authenticated;
grant select on public.spark_question_difficulty_v2 to service_role;

-- Learning-loop report used to compare recommendation strategies. A candidate
-- model should be back-tested against this outcome history before replacing the
-- production model.
create or replace view public.spark_recommendation_effectiveness_v2 as
select
  r.subject_id,
  r.action_type,
  r.target_activity_type,
  r.model_version,
  count(*)::int as recommendations_started,
  count(*) filter (where r.status = 'completed')::int as recommendations_completed,
  round(
    (
      count(*) filter (where r.status = 'completed')::numeric
      / nullif(count(*),0)
    ) * 100,
    1
  ) as completion_rate,
  round(avg(r.outcome_percent) filter (where r.outcome_percent is not null),1) as average_outcome_percent,
  round(avg(r.baseline_mastery) filter (where r.baseline_mastery is not null),1) as average_baseline_mastery,
  min(r.created_at) as first_observed_at,
  max(r.created_at) as last_observed_at
from public.spark_learning_recommendations r
group by r.subject_id, r.action_type, r.target_activity_type, r.model_version;

revoke all on public.spark_recommendation_effectiveness_v2 from anon, authenticated;
grant select on public.spark_recommendation_effectiveness_v2 to service_role;

comment on table public.spark_learning_recommendations is
'SPARK Learner Intelligence V2 recommendation and outcome history. Used to measure which interventions help.';

comment on view public.spark_question_difficulty_v2 is
'Observed aggregate question difficulty from student attempts. Informational only. Never changes canonical answers or marking.';

comment on view public.spark_recommendation_effectiveness_v2 is
'Aggregate recommendation outcomes for safe model evaluation and champion-vs-candidate comparison.';

commit;