begin;

-- ============================================================================
-- SPARK Learning Loop V3 admin-access alignment
--
-- SPARK's application admin authority is profiles.is_admin. Earlier Learning
-- Intelligence / Learning Loop admin RPCs incorrectly tested role = 'admin'.
-- Keep every server-side admin check aligned with the existing app authority.
-- ============================================================================

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
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and coalesce(p.is_admin,false) = true
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
      and coalesce(p.is_admin,false) = true
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
      and coalesce(p.is_admin,false) = true
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

comment on function public.spark_admin_learning_strategy_dashboard_v3() is
'Admin-only Learning Loop V3 dashboard using SPARK profiles.is_admin authority.';

comment on function public.spark_admin_set_learning_strategy_v3(text,text,numeric) is
'Admin-only Learning Loop V3 strategy controls using SPARK profiles.is_admin authority.';

commit;