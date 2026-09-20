begin;

-- ============================================================================
-- SPARK Learner Intelligence V2
-- Evidence-weighted mastery, forgetting/retention, model vs student confidence,
-- misconception memory, item calibration, recommendation outcomes and guarded
-- model promotion. The authoritative CXC marking/grading path is not changed.
-- ============================================================================

create table if not exists public.spark_learning_evidence_v2 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null check (subject_id ~ '^[a-z0-9][a-z0-9_-]{0,39}$'),
  skill text not null check (char_length(skill) between 1 and 180),
  source text not null check (char_length(source) between 1 and 80),
  item_id text,
  evidence_key text not null check (char_length(evidence_key) between 1 and 220),
  observed_score numeric,
  correct boolean,
  evidence_weight numeric not null default 0.2,
  difficulty text,
  student_confidence numeric,
  help_used boolean not null default false,
  error_code text,
  error_label text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint spark_learning_evidence_v2_score_check check (observed_score is null or observed_score between 0 and 1),
  constraint spark_learning_evidence_v2_weight_check check (evidence_weight > 0 and evidence_weight <= 5),
  constraint spark_learning_evidence_v2_confidence_check check (student_confidence is null or student_confidence between 0 and 1),
  unique(user_id, evidence_key)
);

create index if not exists spark_learning_evidence_v2_user_skill_idx
  on public.spark_learning_evidence_v2(user_id, subject_id, skill, occurred_at desc);
create index if not exists spark_learning_evidence_v2_item_idx
  on public.spark_learning_evidence_v2(subject_id, item_id, occurred_at desc)
  where item_id is not null;

create table if not exists public.spark_learning_skill_state_v2 (
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null,
  skill text not null,
  mastery_probability numeric not null default 0.5,
  effective_mastery numeric not null default 0.5,
  model_confidence numeric not null default 0,
  self_confidence numeric,
  calibration_gap numeric,
  trend_score numeric not null default 0,
  evidence_count integer not null default 0,
  scored_evidence_count integer not null default 0,
  stability_days numeric not null default 14,
  retention_probability numeric not null default 1,
  priority_score numeric not null default 50,
  prerequisite_risk numeric not null default 0,
  misconception_counts jsonb not null default '{}'::jsonb,
  misconception_labels jsonb not null default '{}'::jsonb,
  last_source text,
  last_practised_at timestamptz,
  recommended_action text,
  model_version text not null default 'li-v2.0',
  updated_at timestamptz not null default now(),
  primary key(user_id, subject_id, skill),
  constraint spark_learning_skill_state_v2_probability_check check (
    mastery_probability between 0 and 1 and
    effective_mastery between 0 and 1 and
    model_confidence between 0 and 1 and
    retention_probability between 0 and 1
  ),
  constraint spark_learning_skill_state_v2_self_confidence_check check (self_confidence is null or self_confidence between 0 and 1)
);

create index if not exists spark_learning_skill_state_v2_priority_idx
  on public.spark_learning_skill_state_v2(user_id, priority_score desc, subject_id);

create table if not exists public.spark_learning_item_calibration (
  subject_id text not null,
  item_id text not null,
  source text not null,
  authored_difficulty text,
  attempts integer not null default 0,
  weight_sum numeric not null default 0,
  score_sum numeric not null default 0,
  mean_score numeric,
  observed_difficulty numeric,
  mismatch_flag boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key(subject_id, item_id, source)
);

create table if not exists public.spark_learning_recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null,
  skill text,
  action_type text not null,
  action_key text not null,
  priority_score numeric not null default 0,
  rationale jsonb not null default '{}'::jsonb,
  baseline_mastery numeric,
  outcome_mastery numeric,
  outcome_delta numeric,
  model_version text not null default 'li-v2.0',
  status text not null default 'shown' check (status in ('shown','started','completed','dismissed')),
  shown_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz
);

create index if not exists spark_learning_recommendations_user_idx
  on public.spark_learning_recommendations(user_id, shown_at desc);
create index if not exists spark_learning_recommendations_outcome_idx
  on public.spark_learning_recommendations(subject_id, action_type, completed_at desc)
  where completed_at is not null;

create table if not exists public.spark_learning_action_effectiveness (
  subject_id text not null,
  action_type text not null,
  exposures integer not null default 0,
  starts integer not null default 0,
  completions integer not null default 0,
  positive_outcomes integer not null default 0,
  avg_delta numeric not null default 0,
  effectiveness_score numeric not null default 0.5,
  updated_at timestamptz not null default now(),
  primary key(subject_id, action_type),
  constraint spark_learning_action_effectiveness_score_check check (effectiveness_score between 0 and 1)
);

create table if not exists public.spark_learning_model_versions (
  version_key text primary key,
  status text not null check (status in ('champion','candidate','retired')),
  weights jsonb not null default '{}'::jsonb,
  sample_size integer not null default 0,
  backtest_score numeric,
  notes text,
  created_at timestamptz not null default now(),
  promoted_at timestamptz
);

insert into public.spark_learning_model_versions(version_key,status,weights,sample_size,notes)
values (
  'li-v2.0','champion',
  '{"mastery":0.52,"confidence":0.18,"retention":0.18,"trend":0.12,"min_candidate_samples":200,"promotion_margin":0.02}'::jsonb,
  0,
  'Initial transparent learner-intelligence model. Candidate models must beat this model in backtesting before promotion.'
)
on conflict(version_key) do nothing;

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.spark_learning_evidence_v2 enable row level security;
alter table public.spark_learning_skill_state_v2 enable row level security;
alter table public.spark_learning_recommendations enable row level security;
alter table public.spark_learning_item_calibration enable row level security;
alter table public.spark_learning_action_effectiveness enable row level security;
alter table public.spark_learning_model_versions enable row level security;

revoke insert, update, delete on public.spark_learning_evidence_v2 from authenticated;
revoke insert, update, delete on public.spark_learning_skill_state_v2 from authenticated;
revoke insert, update, delete on public.spark_learning_recommendations from authenticated;
revoke insert, update, delete on public.spark_learning_item_calibration from authenticated;
revoke insert, update, delete on public.spark_learning_action_effectiveness from authenticated;
revoke insert, update, delete on public.spark_learning_model_versions from authenticated;

grant select on public.spark_learning_evidence_v2 to authenticated;
grant select on public.spark_learning_skill_state_v2 to authenticated;
grant select on public.spark_learning_recommendations to authenticated;
grant select on public.spark_learning_item_calibration to authenticated;
grant select on public.spark_learning_action_effectiveness to authenticated;
grant select on public.spark_learning_model_versions to authenticated;

drop policy if exists "Students view own learner evidence v2" on public.spark_learning_evidence_v2;
create policy "Students view own learner evidence v2"
on public.spark_learning_evidence_v2 for select to authenticated
using (user_id = auth.uid());

drop policy if exists "Parents view linked learner evidence v2" on public.spark_learning_evidence_v2;
create policy "Parents view linked learner evidence v2"
on public.spark_learning_evidence_v2 for select to authenticated
using (
  exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid()
      and psl.student_id = spark_learning_evidence_v2.user_id
      and psl.status = 'approved'
  )
);

drop policy if exists "Students view own learner state v2" on public.spark_learning_skill_state_v2;
create policy "Students view own learner state v2"
on public.spark_learning_skill_state_v2 for select to authenticated
using (user_id = auth.uid());

drop policy if exists "Parents view linked learner state v2" on public.spark_learning_skill_state_v2;
create policy "Parents view linked learner state v2"
on public.spark_learning_skill_state_v2 for select to authenticated
using (
  exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid()
      and psl.student_id = spark_learning_skill_state_v2.user_id
      and psl.status = 'approved'
  )
);

drop policy if exists "Students view own recommendations" on public.spark_learning_recommendations;
create policy "Students view own recommendations"
on public.spark_learning_recommendations for select to authenticated
using (user_id = auth.uid());

drop policy if exists "Parents view linked recommendations" on public.spark_learning_recommendations;
create policy "Parents view linked recommendations"
on public.spark_learning_recommendations for select to authenticated
using (
  exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid()
      and psl.student_id = spark_learning_recommendations.user_id
      and psl.status = 'approved'
  )
);

drop policy if exists "Authenticated view item calibration" on public.spark_learning_item_calibration;
create policy "Authenticated view item calibration"
on public.spark_learning_item_calibration for select to authenticated using (true);

drop policy if exists "Authenticated view action effectiveness" on public.spark_learning_action_effectiveness;
create policy "Authenticated view action effectiveness"
on public.spark_learning_action_effectiveness for select to authenticated using (true);

drop policy if exists "Authenticated view learning model registry" on public.spark_learning_model_versions;
create policy "Authenticated view learning model registry"
on public.spark_learning_model_versions for select to authenticated using (true);

-- ---------------------------------------------------------------------------
-- Recalculate one learner/subject/skill state from immutable evidence.
-- Exposure-only evidence counts toward confidence/breadth but does not pretend
-- that opening a lesson, SBA guide or lab proves mastery.
-- ---------------------------------------------------------------------------
create or replace function public.spark_recalculate_learning_skill_v2(
  p_user_id uuid,
  p_subject_id text,
  p_skill text
)
returns public.spark_learning_skill_state_v2
language plpgsql
security definer
set search_path = public
as $$
declare
  v_mastery numeric := 0.5;
  v_effective_mastery numeric := 0.5;
  v_model_confidence numeric := 0;
  v_self_confidence numeric;
  v_trend numeric := 0;
  v_evidence_count integer := 0;
  v_scored_count integer := 0;
  v_weight_sum numeric := 0;
  v_weighted_score numeric := 0;
  v_last_at timestamptz;
  v_last_source text;
  v_stability numeric := 14;
  v_retention numeric := 1;
  v_priority numeric := 50;
  v_days numeric := 0;
  v_miscounts jsonb := '{}'::jsonb;
  v_mislabels jsonb := '{}'::jsonb;
  v_row public.spark_learning_skill_state_v2;
begin
  select
    count(*)::int,
    count(*) filter (where observed_score is not null)::int,
    coalesce(sum(
      evidence_weight
      * case lower(coalesce(difficulty,'')) when 'hard' then 1.15 when 'easy' then 0.85 else 1 end
      * case when observed_score is null then 0 else exp(-greatest(0, extract(epoch from (now()-occurred_at))/86400.0)/90.0) end
    ) filter (where observed_score is not null),0),
    coalesce(sum(
      observed_score
      * evidence_weight
      * case lower(coalesce(difficulty,'')) when 'hard' then 1.15 when 'easy' then 0.85 else 1 end
      * exp(-greatest(0, extract(epoch from (now()-occurred_at))/86400.0)/90.0)
    ) filter (where observed_score is not null),0),
    max(occurred_at),
    (array_agg(source order by occurred_at desc))[1],
    avg(student_confidence) filter (where student_confidence is not null)
  into
    v_evidence_count,v_scored_count,v_weight_sum,v_weighted_score,
    v_last_at,v_last_source,v_self_confidence
  from public.spark_learning_evidence_v2
  where user_id=p_user_id and subject_id=p_subject_id and skill=p_skill;

  -- Beta-like prior centred at 0.50. As evidence grows the prior matters less.
  if v_scored_count > 0 then
    v_mastery := (1.0 + v_weighted_score) / (2.0 + v_weight_sum);
  else
    v_mastery := 0.5;
  end if;

  v_model_confidence := least(0.99, greatest(0, 1 - exp(-(v_weight_sum + v_evidence_count*0.05)/3.5)));

  with ranked as (
    select observed_score,
           row_number() over(order by occurred_at desc) rn
    from public.spark_learning_evidence_v2
    where user_id=p_user_id and subject_id=p_subject_id and skill=p_skill
      and observed_score is not null
  )
  select coalesce(avg(observed_score) filter(where rn<=3),v_mastery)
       - coalesce(avg(observed_score) filter(where rn between 4 and 6),v_mastery)
  into v_trend
  from ranked;

  v_stability := greatest(4, least(120,
    7 + 95*v_mastery*v_model_confidence + greatest(-10,least(10,v_trend*35))
  ));

  if v_last_at is not null then
    v_days := greatest(0, extract(epoch from (now()-v_last_at))/86400.0);
    v_retention := greatest(0.05, least(1, exp(-v_days/v_stability)));
  else
    v_retention := 0.82;
  end if;

  v_effective_mastery := greatest(0,least(1,v_mastery*v_retention));

  select coalesce(jsonb_object_agg(error_code,cnt),'{}'::jsonb)
  into v_miscounts
  from (
    select error_code,count(*)::int cnt
    from public.spark_learning_evidence_v2
    where user_id=p_user_id and subject_id=p_subject_id and skill=p_skill
      and error_code is not null and char_length(trim(error_code))>0
    group by error_code
  ) s;

  select coalesce(jsonb_object_agg(error_code,label),'{}'::jsonb)
  into v_mislabels
  from (
    select distinct on(error_code) error_code,coalesce(error_label,error_code) label
    from public.spark_learning_evidence_v2
    where user_id=p_user_id and subject_id=p_subject_id and skill=p_skill
      and error_code is not null and char_length(trim(error_code))>0
    order by error_code,occurred_at desc
  ) s;

  v_priority := least(100,greatest(0,
    (1-v_effective_mastery)*52
    + (1-v_model_confidence)*18
    + (1-v_retention)*18
    + greatest(0,-v_trend)*100*12/100
  ));

  insert into public.spark_learning_skill_state_v2(
    user_id,subject_id,skill,mastery_probability,effective_mastery,
    model_confidence,self_confidence,calibration_gap,trend_score,
    evidence_count,scored_evidence_count,stability_days,retention_probability,
    priority_score,misconception_counts,misconception_labels,last_source,
    last_practised_at,recommended_action,model_version,updated_at
  ) values (
    p_user_id,p_subject_id,p_skill,v_mastery,v_effective_mastery,
    v_model_confidence,v_self_confidence,
    case when v_self_confidence is null then null else v_self_confidence-v_mastery end,
    v_trend,v_evidence_count,v_scored_count,v_stability,v_retention,
    v_priority,v_miscounts,v_mislabels,v_last_source,v_last_at,
    case
      when v_model_confidence<0.2 then 'Build a stronger baseline with a lesson and a short practice set.'
      when v_effective_mastery<0.45 then 'Review the lesson, then complete targeted practice.'
      when 1-v_retention>=0.40 then 'Use spaced review now, then confirm the skill with an exam-style question.'
      when v_effective_mastery<0.75 then 'Use targeted practice and harder questions to make the skill more reliable.'
      else 'Maintain this skill with spaced review while SPARK shifts attention to weaker areas.'
    end,
    'li-v2.0',now()
  )
  on conflict(user_id,subject_id,skill) do update set
    mastery_probability=excluded.mastery_probability,
    effective_mastery=excluded.effective_mastery,
    model_confidence=excluded.model_confidence,
    self_confidence=excluded.self_confidence,
    calibration_gap=excluded.calibration_gap,
    trend_score=excluded.trend_score,
    evidence_count=excluded.evidence_count,
    scored_evidence_count=excluded.scored_evidence_count,
    stability_days=excluded.stability_days,
    retention_probability=excluded.retention_probability,
    priority_score=excluded.priority_score,
    misconception_counts=excluded.misconception_counts,
    misconception_labels=excluded.misconception_labels,
    last_source=excluded.last_source,
    last_practised_at=excluded.last_practised_at,
    recommended_action=excluded.recommended_action,
    model_version='li-v2.0',
    updated_at=now()
  returning * into v_row;

  return v_row;
end;
$$;

revoke all on function public.spark_recalculate_learning_skill_v2(uuid,text,text) from public,anon,authenticated;

-- ---------------------------------------------------------------------------
-- Canonical V2 evidence recorder.
-- ---------------------------------------------------------------------------
create or replace function public.spark_record_learning_evidence_v2(
  p_subject_id text,
  p_skill text,
  p_source text,
  p_item_id text default null,
  p_observed_score numeric default null,
  p_correct boolean default null,
  p_evidence_weight numeric default 0.2,
  p_difficulty text default null,
  p_student_confidence numeric default null,
  p_help_used boolean default false,
  p_error_code text default null,
  p_error_label text default null,
  p_metadata jsonb default '{}'::jsonb,
  p_evidence_key text default null,
  p_occurred_at timestamptz default now()
)
returns public.spark_learning_skill_state_v2
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_subject text := lower(trim(coalesce(p_subject_id,'')));
  v_skill text := left(trim(coalesce(p_skill,'')),180);
  v_source text := left(trim(coalesce(p_source,'')),80);
  v_key text := left(coalesce(nullif(trim(p_evidence_key),''),v_source||':'||coalesce(p_item_id,'item')||':'||extract(epoch from coalesce(p_occurred_at,now()))::text),220);
  v_inserted uuid;
  v_state public.spark_learning_skill_state_v2;
  v_mean numeric;
  v_attempts integer;
  v_weight_sum numeric;
  v_score_sum numeric;
  v_mismatch boolean;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if not exists(select 1 from public.profiles where id=v_user_id and role='student') then
    raise exception 'Only Student accounts can record learning evidence';
  end if;
  if v_subject !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then raise exception 'Invalid subject id'; end if;
  if char_length(v_skill)<1 then raise exception 'Skill is required'; end if;
  if char_length(v_source)<1 then raise exception 'Evidence source is required'; end if;
  if p_observed_score is not null and p_observed_score not between 0 and 1 then raise exception 'Observed score must be between 0 and 1'; end if;
  if p_student_confidence is not null and p_student_confidence not between 0 and 1 then raise exception 'Student confidence must be between 0 and 1'; end if;
  if p_evidence_weight<=0 or p_evidence_weight>5 then raise exception 'Invalid evidence weight'; end if;

  insert into public.spark_learning_evidence_v2(
    user_id,subject_id,skill,source,item_id,evidence_key,observed_score,correct,
    evidence_weight,difficulty,student_confidence,help_used,error_code,error_label,
    metadata,occurred_at
  ) values (
    v_user_id,v_subject,v_skill,v_source,nullif(trim(coalesce(p_item_id,'')),''),
    v_key,p_observed_score,p_correct,p_evidence_weight,nullif(lower(trim(coalesce(p_difficulty,''))),''),
    p_student_confidence,coalesce(p_help_used,false),nullif(trim(coalesce(p_error_code,'')),''),
    nullif(trim(coalesce(p_error_label,'')),''),coalesce(p_metadata,'{}'::jsonb),coalesce(p_occurred_at,now())
  )
  on conflict(user_id,evidence_key) do nothing
  returning id into v_inserted;

  if v_inserted is not null and p_item_id is not null and p_observed_score is not null then
    insert into public.spark_learning_item_calibration(
      subject_id,item_id,source,authored_difficulty,attempts,weight_sum,score_sum,
      mean_score,observed_difficulty,mismatch_flag,updated_at
    ) values (
      v_subject,left(p_item_id,180),v_source,p_difficulty,1,p_evidence_weight,
      p_observed_score*p_evidence_weight,p_observed_score,1-p_observed_score,false,now()
    )
    on conflict(subject_id,item_id,source) do update set
      authored_difficulty=coalesce(excluded.authored_difficulty,public.spark_learning_item_calibration.authored_difficulty),
      attempts=public.spark_learning_item_calibration.attempts+1,
      weight_sum=public.spark_learning_item_calibration.weight_sum+excluded.weight_sum,
      score_sum=public.spark_learning_item_calibration.score_sum+excluded.score_sum,
      updated_at=now();

    select attempts,weight_sum,score_sum
      into v_attempts,v_weight_sum,v_score_sum
    from public.spark_learning_item_calibration
    where subject_id=v_subject and item_id=left(p_item_id,180) and source=v_source;

    v_mean := case when v_weight_sum>0 then v_score_sum/v_weight_sum else null end;
    v_mismatch := case
      when lower(coalesce(p_difficulty,''))='easy' and v_attempts>=8 and v_mean<0.55 then true
      when lower(coalesce(p_difficulty,''))='hard' and v_attempts>=8 and v_mean>0.82 then true
      else false
    end;

    update public.spark_learning_item_calibration
    set mean_score=v_mean,observed_difficulty=case when v_mean is null then null else 1-v_mean end,
        mismatch_flag=v_mismatch,updated_at=now()
    where subject_id=v_subject and item_id=left(p_item_id,180) and source=v_source;
  end if;

  select * into v_state
  from public.spark_recalculate_learning_skill_v2(v_user_id,v_subject,v_skill);
  return v_state;
end;
$$;

revoke all on function public.spark_record_learning_evidence_v2(text,text,text,text,numeric,boolean,numeric,text,numeric,boolean,text,text,jsonb,text,timestamptz) from public,anon;
grant execute on function public.spark_record_learning_evidence_v2(text,text,text,text,numeric,boolean,numeric,text,numeric,boolean,text,text,jsonb,text,timestamptz) to authenticated;

-- ---------------------------------------------------------------------------
-- Automatic Mathematics evidence bridges. These keep full-paper and lesson
-- activity in the same V2 model even when those screens use older persistence
-- code. They observe stored results only; they never influence grading.
-- ---------------------------------------------------------------------------
create or replace function public.spark_capture_math_exam_learning_v2()
returns trigger
language plpgsql
security definer
set search_path = public
as $
declare
  v_score numeric;
  v_key text;
begin
  if new.completed_at is null then return new; end if;
  v_score := case
    when new.percent is not null then greatest(0,least(1,new.percent/100.0))
    when new.max_score is not null and new.max_score>0 and new.score is not null then greatest(0,least(1,new.score/new.max_score))
    else null
  end;
  v_key := 'math-exam:'||coalesce(new.attempt_key,new.id::text);

  insert into public.spark_learning_evidence_v2(
    user_id,subject_id,skill,source,item_id,evidence_key,observed_score,correct,
    evidence_weight,difficulty,metadata,occurred_at
  ) values (
    new.user_id,'mathematics','Mathematics :: Exam readiness','practice_exam',
    coalesce(new.attempt_key,new.id::text),v_key,v_score,
    case when v_score is null then null else v_score>=0.60 end,
    case when lower(coalesce(new.paper_type,''))='paper2' then 1.50 else 1.30 end,
    'hard',
    jsonb_build_object('paper_type',new.paper_type,'attempt_key',new.attempt_key),
    coalesce(new.completed_at,now())
  )
  on conflict(user_id,evidence_key) do nothing;

  perform public.spark_recalculate_learning_skill_v2(new.user_id,'mathematics','Mathematics :: Exam readiness');
  return new;
end;
$;

drop trigger if exists spark_capture_math_exam_learning_v2 on public.practice_exam_attempts;
create trigger spark_capture_math_exam_learning_v2
after insert or update of completed_at,percent,score
on public.practice_exam_attempts
for each row execute function public.spark_capture_math_exam_learning_v2();

create or replace function public.spark_capture_math_lesson_learning_v2()
returns trigger
language plpgsql
security definer
set search_path = public
as $
declare
  v_title text;
  v_skill text;
begin
  if not coalesce(new.completed,false) then return new; end if;
  begin
    select title into v_title from public.lessons where id=new.lesson_id;
  exception when others then
    v_title := null;
  end;
  v_skill := 'Mathematics :: '||coalesce(nullif(v_title,''),new.lesson_id::text);

  insert into public.spark_learning_evidence_v2(
    user_id,subject_id,skill,source,item_id,evidence_key,observed_score,correct,
    evidence_weight,metadata,occurred_at
  ) values (
    new.user_id,'mathematics',v_skill,'lesson',
    new.lesson_id::text,'math-lesson:'||new.lesson_id::text,null,null,0.08,
    jsonb_build_object('exposure_only',true,'lesson_id',new.lesson_id),
    coalesce(new.completed_at,now())
  )
  on conflict(user_id,evidence_key) do nothing;

  perform public.spark_recalculate_learning_skill_v2(new.user_id,'mathematics',v_skill);
  return new;
end;
$;

drop trigger if exists spark_capture_math_lesson_learning_v2 on public.lesson_progress;
create trigger spark_capture_math_lesson_learning_v2
after insert or update of completed,completed_at
on public.lesson_progress
for each row execute function public.spark_capture_math_lesson_learning_v2();

-- ---------------------------------------------------------------------------
-- Recommendation loop. SPARK records what it recommended and whether following
-- that advice improved the learner state. Effectiveness then becomes a bounded
-- input to future recommendation ranking.
-- ---------------------------------------------------------------------------
create or replace function public.spark_record_learning_recommendation(
  p_subject_id text,
  p_skill text,
  p_action_type text,
  p_action_key text,
  p_priority_score numeric default 0,
  p_rationale jsonb default '{}'::jsonb,
  p_baseline_mastery numeric default null,
  p_model_version text default 'li-v2.0'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_id uuid;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if not exists(select 1 from public.profiles where id=v_user_id and role='student') then
    raise exception 'Only Student accounts can receive learning recommendations';
  end if;

  select id into v_id
  from public.spark_learning_recommendations
  where user_id=v_user_id and action_key=p_action_key
    and shown_at>=now()-interval '12 hours'
  order by shown_at desc limit 1;

  if v_id is null then
    insert into public.spark_learning_recommendations(
      user_id,subject_id,skill,action_type,action_key,priority_score,rationale,
      baseline_mastery,model_version,status,shown_at
    ) values (
      v_user_id,lower(trim(p_subject_id)),nullif(trim(coalesce(p_skill,'')),''),
      left(trim(p_action_type),60),left(trim(p_action_key),180),
      coalesce(p_priority_score,0),coalesce(p_rationale,'{}'::jsonb),
      p_baseline_mastery,left(coalesce(p_model_version,'li-v2.0'),40),'shown',now()
    ) returning id into v_id;

    insert into public.spark_learning_action_effectiveness(subject_id,action_type,exposures,updated_at)
    values(lower(trim(p_subject_id)),left(trim(p_action_type),60),1,now())
    on conflict(subject_id,action_type) do update set
      exposures=public.spark_learning_action_effectiveness.exposures+1,updated_at=now();
  end if;
  return v_id;
end;
$$;

create or replace function public.spark_start_learning_recommendation(p_recommendation_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_subject text;
  v_action text;
begin
  update public.spark_learning_recommendations
  set status='started',started_at=coalesce(started_at,now())
  where id=p_recommendation_id and user_id=auth.uid() and status in('shown','started')
  returning subject_id,action_type into v_subject,v_action;
  if not found then raise exception 'Recommendation not found'; end if;

  update public.spark_learning_action_effectiveness
  set starts=starts+1,updated_at=now()
  where subject_id=v_subject and action_type=v_action;
end;
$$;

create or replace function public.spark_refresh_learning_action_effectiveness(
  p_subject_id text,
  p_action_type text
)
returns public.spark_learning_action_effectiveness
language plpgsql
security definer
set search_path = public
as $$
declare
  v_exposures int:=0;
  v_starts int:=0;
  v_completions int:=0;
  v_positive int:=0;
  v_delta numeric:=0;
  v_score numeric:=0.5;
  v_row public.spark_learning_action_effectiveness;
begin
  select count(*)::int,
         count(*) filter(where started_at is not null)::int,
         count(*) filter(where completed_at is not null)::int,
         count(*) filter(where completed_at is not null and coalesce(outcome_delta,0)>0.02)::int,
         coalesce(avg(outcome_delta) filter(where completed_at is not null),0)
  into v_exposures,v_starts,v_completions,v_positive,v_delta
  from public.spark_learning_recommendations
  where subject_id=p_subject_id and action_type=p_action_type;

  v_score := greatest(0.20,least(0.85,
    ((v_positive+3.0)/(v_completions+6.0))*0.75
    + greatest(0,least(0.10,v_delta))*2.5
  ));

  insert into public.spark_learning_action_effectiveness(
    subject_id,action_type,exposures,starts,completions,positive_outcomes,avg_delta,effectiveness_score,updated_at
  ) values (
    p_subject_id,p_action_type,v_exposures,v_starts,v_completions,v_positive,v_delta,v_score,now()
  )
  on conflict(subject_id,action_type) do update set
    exposures=excluded.exposures,starts=excluded.starts,completions=excluded.completions,
    positive_outcomes=excluded.positive_outcomes,avg_delta=excluded.avg_delta,
    effectiveness_score=excluded.effectiveness_score,updated_at=now()
  returning * into v_row;
  return v_row;
end;
$$;

revoke all on function public.spark_refresh_learning_action_effectiveness(text,text) from public,anon,authenticated;

create or replace function public.spark_apply_learning_evidence_outcome(
  p_subject_id text,
  p_skill text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $
declare
  v_user_id uuid := auth.uid();
  v_rec public.spark_learning_recommendations%rowtype;
  v_mastery numeric;
  v_delta numeric;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  select * into v_rec
  from public.spark_learning_recommendations
  where user_id=v_user_id
    and subject_id=lower(trim(p_subject_id))
    and status='started'
    and completed_at is null
    and (skill is null or skill=trim(p_skill))
    and started_at>=now()-interval '14 days'
  order by started_at desc
  limit 1
  for update;

  if v_rec.id is null then
    return jsonb_build_object('matched',false);
  end if;

  select effective_mastery*100 into v_mastery
  from public.spark_learning_skill_state_v2
  where user_id=v_user_id
    and subject_id=lower(trim(p_subject_id))
    and skill=trim(p_skill);

  v_delta := case
    when v_mastery is null or v_rec.baseline_mastery is null then 0
    else v_mastery-v_rec.baseline_mastery
  end;

  update public.spark_learning_recommendations
  set status='completed',
      completed_at=now(),
      outcome_mastery=v_mastery,
      outcome_delta=v_delta
  where id=v_rec.id;

  perform public.spark_refresh_learning_action_effectiveness(v_rec.subject_id,v_rec.action_type);

  return jsonb_build_object(
    'matched',true,
    'recommendation_id',v_rec.id,
    'outcome_mastery',v_mastery,
    'outcome_delta',v_delta
  );
end;
$;

revoke all on function public.spark_apply_learning_evidence_outcome(text,text) from public,anon;
grant execute on function public.spark_apply_learning_evidence_outcome(text,text) to authenticated;

create or replace function public.spark_complete_learning_recommendation(p_recommendation_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rec public.spark_learning_recommendations%rowtype;
  v_mastery numeric;
  v_delta numeric;
begin
  select * into v_rec
  from public.spark_learning_recommendations
  where id=p_recommendation_id and user_id=auth.uid()
  for update;
  if v_rec.id is null then raise exception 'Recommendation not found'; end if;

  select effective_mastery*100 into v_mastery
  from public.spark_learning_skill_state_v2
  where user_id=auth.uid() and subject_id=v_rec.subject_id and skill=v_rec.skill;

  v_delta := case when v_mastery is null or v_rec.baseline_mastery is null then 0 else v_mastery-v_rec.baseline_mastery end;

  update public.spark_learning_recommendations
  set status='completed',completed_at=coalesce(completed_at,now()),
      outcome_mastery=v_mastery,outcome_delta=v_delta
  where id=v_rec.id;

  perform public.spark_refresh_learning_action_effectiveness(v_rec.subject_id,v_rec.action_type);
  return jsonb_build_object('status','completed','outcome_mastery',v_mastery,'outcome_delta',v_delta);
end;
$$;

revoke all on function public.spark_record_learning_recommendation(text,text,text,text,numeric,jsonb,numeric,text) from public,anon;
grant execute on function public.spark_record_learning_recommendation(text,text,text,text,numeric,jsonb,numeric,text) to authenticated;
revoke all on function public.spark_start_learning_recommendation(uuid) from public,anon;
grant execute on function public.spark_start_learning_recommendation(uuid) to authenticated;
revoke all on function public.spark_complete_learning_recommendation(uuid) from public,anon;
grant execute on function public.spark_complete_learning_recommendation(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Guarded champion/candidate registry. Learning can tune recommendations and
-- item difficulty automatically. A core model cannot replace the production
-- champion unless it has enough evidence and wins a backtest by the configured
-- margin. Promotion itself remains service-role only.
-- ---------------------------------------------------------------------------
create or replace function public.spark_promote_learning_model_candidate(p_version_key text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_candidate public.spark_learning_model_versions%rowtype;
  v_champion public.spark_learning_model_versions%rowtype;
  v_min_samples int:=200;
  v_margin numeric:=0.02;
begin
  if coalesce(current_setting('request.jwt.claim.role',true),'') <> 'service_role' then
    raise exception 'Service role required';
  end if;
  select * into v_candidate from public.spark_learning_model_versions where version_key=p_version_key and status='candidate' for update;
  if v_candidate.version_key is null then raise exception 'Candidate model not found'; end if;
  select * into v_champion from public.spark_learning_model_versions where status='champion' order by promoted_at desc nulls last,created_at desc limit 1 for update;
  if v_champion.weights ? 'min_candidate_samples' then v_min_samples := (v_champion.weights->>'min_candidate_samples')::int; end if;
  if v_champion.weights ? 'promotion_margin' then v_margin := (v_champion.weights->>'promotion_margin')::numeric; end if;
  if v_candidate.sample_size < v_min_samples then raise exception 'Candidate does not have enough evaluation samples'; end if;
  if v_candidate.backtest_score is null or v_champion.backtest_score is not null and v_candidate.backtest_score < v_champion.backtest_score+v_margin then
    raise exception 'Candidate has not beaten the champion by the required margin';
  end if;
  update public.spark_learning_model_versions set status='retired' where status='champion';
  update public.spark_learning_model_versions set status='champion',promoted_at=now() where version_key=v_candidate.version_key;
end;
$$;

revoke all on function public.spark_promote_learning_model_candidate(text) from public,anon,authenticated;
grant execute on function public.spark_promote_learning_model_candidate(text) to service_role;

comment on table public.spark_learning_evidence_v2 is
'Immutable SPARK learner evidence. Exposure-only events may have no observed score and therefore do not masquerade as mastery.';
comment on table public.spark_learning_skill_state_v2 is
'Derived learner state containing evidence-weighted mastery, retention, model confidence, self-confidence calibration, trend and misconception memory.';
comment on table public.spark_learning_item_calibration is
'Observed question/item difficulty statistics. Calibration can flag authored-difficulty mismatches but cannot alter an answer key or marking scheme.';
comment on table public.spark_learning_recommendations is
'Recommendation audit trail used to learn which intervention types help students over time.';
comment on table public.spark_learning_model_versions is
'Guarded champion/candidate registry. Production model promotion requires backtest evidence and service-role approval.';

commit;
