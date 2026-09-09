begin;

create table if not exists public.spark_reward_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  leaderboard_visible boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.spark_reward_preferences enable row level security;

drop policy if exists "Students can read own reward preferences" on public.spark_reward_preferences;
create policy "Students can read own reward preferences"
on public.spark_reward_preferences
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Students can insert own reward preferences" on public.spark_reward_preferences;
create policy "Students can insert own reward preferences"
on public.spark_reward_preferences
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Students can update own reward preferences" on public.spark_reward_preferences;
create policy "Students can update own reward preferences"
on public.spark_reward_preferences
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.spark_reward_weekly_scores(p_week_start date)
returns table (
  user_id uuid,
  study_days integer,
  lessons_completed integer,
  topic_quizzes_completed integer,
  question_attempts integer,
  correct_questions integer,
  exams_completed integer,
  flashcard_reviews integer,
  skills_improved integer,
  mastery_milestones integer,
  consistency_points integer,
  improvement_points integer,
  practice_points integer,
  lesson_points integer,
  exam_points integer,
  flashcard_points integer,
  weekly_points integer
)
language sql
stable
security definer
set search_path = public
as $$
with students as (
  select p.id as user_id
  from public.profiles p
  where p.role = 'student'
),
lesson_counts as (
  select lp.user_id, count(*)::int as lessons_completed
  from public.lesson_progress lp
  where lp.completed = true
    and lp.completed_at is not null
    and (timezone('America/Jamaica', lp.completed_at))::date >= p_week_start
    and (timezone('America/Jamaica', lp.completed_at))::date < p_week_start + 7
  group by lp.user_id
),
question_counts as (
  select qa.user_id,
         count(*)::int as question_attempts,
         count(*) filter (where qa.correct is true)::int as correct_questions
  from public.csec_question_attempts qa
  where qa.attempted_at is not null
    and (timezone('America/Jamaica', qa.attempted_at))::date >= p_week_start
    and (timezone('America/Jamaica', qa.attempted_at))::date < p_week_start + 7
  group by qa.user_id
),
exam_counts as (
  select pe.user_id, count(*)::int as exams_completed
  from public.practice_exam_attempts pe
  where pe.completed_at is not null
    and (timezone('America/Jamaica', pe.completed_at))::date >= p_week_start
    and (timezone('America/Jamaica', pe.completed_at))::date < p_week_start + 7
  group by pe.user_id
),
flashcard_counts as (
  select fr.user_id, count(*)::int as flashcard_reviews
  from public.spark_flashcard_review_events fr
  where fr.reviewed_at is not null
    and (timezone('America/Jamaica', fr.reviewed_at))::date >= p_week_start
    and (timezone('America/Jamaica', fr.reviewed_at))::date < p_week_start + 7
  group by fr.user_id
),
milestone_counts as (
  select lm.user_id,
         count(*) filter (where lm.event_type = 'topic_quiz_completed')::int as topic_quizzes_completed,
         count(*) filter (where lm.event_type = 'skill_improved')::int as skills_improved,
         count(*) filter (where lm.event_type = 'mastery_milestone')::int as mastery_milestones
  from public.learning_milestones lm
  where lm.created_at is not null
    and (timezone('America/Jamaica', lm.created_at))::date >= p_week_start
    and (timezone('America/Jamaica', lm.created_at))::date < p_week_start + 7
  group by lm.user_id
),
study_dates as (
  select lp.user_id, (timezone('America/Jamaica', lp.completed_at))::date as study_date
  from public.lesson_progress lp
  where lp.completed = true and lp.completed_at is not null
    and (timezone('America/Jamaica', lp.completed_at))::date >= p_week_start
    and (timezone('America/Jamaica', lp.completed_at))::date < p_week_start + 7
  union
  select qa.user_id, (timezone('America/Jamaica', qa.attempted_at))::date
  from public.csec_question_attempts qa
  where qa.attempted_at is not null
    and (timezone('America/Jamaica', qa.attempted_at))::date >= p_week_start
    and (timezone('America/Jamaica', qa.attempted_at))::date < p_week_start + 7
  union
  select pe.user_id, (timezone('America/Jamaica', pe.completed_at))::date
  from public.practice_exam_attempts pe
  where pe.completed_at is not null
    and (timezone('America/Jamaica', pe.completed_at))::date >= p_week_start
    and (timezone('America/Jamaica', pe.completed_at))::date < p_week_start + 7
  union
  select fr.user_id, (timezone('America/Jamaica', fr.reviewed_at))::date
  from public.spark_flashcard_review_events fr
  where fr.reviewed_at is not null
    and (timezone('America/Jamaica', fr.reviewed_at))::date >= p_week_start
    and (timezone('America/Jamaica', fr.reviewed_at))::date < p_week_start + 7
  union
  select lm.user_id, (timezone('America/Jamaica', lm.created_at))::date
  from public.learning_milestones lm
  where lm.created_at is not null
    and (timezone('America/Jamaica', lm.created_at))::date >= p_week_start
    and (timezone('America/Jamaica', lm.created_at))::date < p_week_start + 7
),
day_counts as (
  select user_id, count(distinct study_date)::int as study_days
  from study_dates
  group by user_id
),
base as (
  select s.user_id,
         coalesce(dc.study_days, 0)::int as study_days,
         coalesce(lc.lessons_completed, 0)::int as lessons_completed,
         coalesce(mc.topic_quizzes_completed, 0)::int as topic_quizzes_completed,
         coalesce(qc.question_attempts, 0)::int as question_attempts,
         coalesce(qc.correct_questions, 0)::int as correct_questions,
         coalesce(ec.exams_completed, 0)::int as exams_completed,
         coalesce(fc.flashcard_reviews, 0)::int as flashcard_reviews,
         coalesce(mc.skills_improved, 0)::int as skills_improved,
         coalesce(mc.mastery_milestones, 0)::int as mastery_milestones
  from students s
  left join day_counts dc on dc.user_id = s.user_id
  left join lesson_counts lc on lc.user_id = s.user_id
  left join question_counts qc on qc.user_id = s.user_id
  left join exam_counts ec on ec.user_id = s.user_id
  left join flashcard_counts fc on fc.user_id = s.user_id
  left join milestone_counts mc on mc.user_id = s.user_id
),
scored as (
  select b.*,
         least(25, b.study_days * 4)::int as consistency_points,
         least(25, b.skills_improved * 10 + b.mastery_milestones * 5)::int as improvement_points,
         least(20,
           case
             when b.question_attempts <= 0 then 0
             when b.question_attempts < 5 then b.correct_questions * 2
             else round(
               12.0 * (b.correct_questions::numeric / nullif(b.question_attempts, 0))
               + least(8.0, b.question_attempts::numeric / 5.0)
             )::int
           end
         )::int as practice_points,
         least(15, b.lessons_completed * 5 + b.topic_quizzes_completed * 3)::int as lesson_points,
         least(10, b.exams_completed * 5)::int as exam_points,
         least(5, ceil(b.flashcard_reviews::numeric / 5.0))::int as flashcard_points
  from base b
)
select s.*,
       (s.consistency_points + s.improvement_points + s.practice_points + s.lesson_points + s.exam_points + s.flashcard_points)::int as weekly_points
from scored s;
$$;

revoke all on function public.spark_reward_weekly_scores(date) from public;
revoke all on function public.spark_reward_weekly_scores(date) from authenticated;

create or replace function public.spark_reward_lifetime_points(p_student_id uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
select (
  coalesce((select count(*) * 20 from public.lesson_progress lp where lp.user_id = p_student_id and lp.completed = true), 0)
  + coalesce((select count(*) * 5 from public.csec_question_attempts qa where qa.user_id = p_student_id and qa.correct is true), 0)
  + coalesce((select count(*) * 2 from public.spark_flashcard_review_events fr where fr.user_id = p_student_id), 0)
  + coalesce((select sum(case when pe.paper_type = 'paper2' then 100 else 75 end) from public.practice_exam_attempts pe where pe.user_id = p_student_id and pe.completed_at is not null), 0)
  + coalesce((select sum(case lm.event_type
      when 'topic_quiz_completed' then 30
      when 'adaptive_session_completed' then 25
      when 'skill_improved' then 40
      when 'mastery_milestone' then 50
      else 0 end)
      from public.learning_milestones lm where lm.user_id = p_student_id), 0)
)::int;
$$;

revoke all on function public.spark_reward_lifetime_points(uuid) from public;
revoke all on function public.spark_reward_lifetime_points(uuid) from authenticated;

create or replace function public.spark_set_reward_preferences(p_leaderboard_visible boolean)
returns public.spark_reward_preferences
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_row public.spark_reward_preferences;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select p.role into v_role from public.profiles p where p.id = auth.uid();
  if v_role is distinct from 'student' then
    raise exception 'Only student accounts can change leaderboard visibility';
  end if;

  insert into public.spark_reward_preferences(user_id, leaderboard_visible, updated_at)
  values (auth.uid(), coalesce(p_leaderboard_visible, false), now())
  on conflict (user_id) do update
    set leaderboard_visible = excluded.leaderboard_visible,
        updated_at = now()
  returning * into v_row;

  return v_row;
end;
$$;

grant execute on function public.spark_set_reward_preferences(boolean) to authenticated;

create or replace function public.spark_get_rewards_dashboard(p_student_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_week_start date;
  v_allowed_subject uuid := null;
  v_viewer_role text;
  v_leaders jsonb := '[]'::jsonb;
  v_winner jsonb := null;
  v_subject jsonb := null;
  v_preferences jsonb := jsonb_build_object('leaderboard_visible', false);
  v_total_participants integer := 0;
  v_lifetime integer := 0;
begin
  if v_caller is null then
    raise exception 'Authentication required';
  end if;

  select p.role into v_viewer_role from public.profiles p where p.id = v_caller;
  v_week_start := (timezone('America/Jamaica', now()))::date
                  - ((extract(isodow from timezone('America/Jamaica', now()))::int - 1));

  if p_student_id is not null then
    if p_student_id = v_caller and v_viewer_role = 'student' then
      v_allowed_subject := p_student_id;
    elsif v_viewer_role = 'parent' and exists (
      select 1 from public.parent_student_links psl
      where psl.parent_id = v_caller
        and psl.student_id = p_student_id
        and psl.status = 'approved'
    ) then
      v_allowed_subject := p_student_id;
    end if;
  end if;

  with ranked as (
    select ws.*,
           row_number() over (
             order by ws.weekly_points desc, ws.study_days desc, ws.skills_improved desc,
                      ws.correct_questions desc, ws.user_id
           )::int as rank,
           count(*) filter (where ws.weekly_points > 0) over ()::int as total_participants
    from public.spark_reward_weekly_scores(v_week_start) ws
  ),
  visible_ranked as (
    select r.*,
           case
             when r.user_id = v_allowed_subject then true
             else false
           end as is_subject,
           case
             when coalesce(pref.leaderboard_visible, false) then
               case
                 when nullif(trim(p.name), '') is null then 'SPARK Learner'
                 when array_length(regexp_split_to_array(trim(p.name), '\s+'), 1) > 1 then
                   (regexp_split_to_array(trim(p.name), '\s+'))[1] || ' ' || left((regexp_split_to_array(trim(p.name), '\s+'))[array_length(regexp_split_to_array(trim(p.name), '\s+'), 1)], 1) || '.'
                 else trim(p.name)
               end
             when r.user_id = v_allowed_subject then
               case when v_viewer_role = 'student' then 'You' else coalesce(nullif(trim(p.name), ''), 'Your student') end
             else 'Anonymous SPARK'
           end as display_name
    from ranked r
    join public.profiles p on p.id = r.user_id
    left join public.spark_reward_preferences pref on pref.user_id = r.user_id
    where r.weekly_points > 0
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'rank', vr.rank,
           'display_name', vr.display_name,
           'weekly_points', vr.weekly_points,
           'study_days', vr.study_days,
           'skills_improved', vr.skills_improved,
           'is_subject', vr.is_subject
         ) order by vr.rank), '[]'::jsonb)
  into v_leaders
  from (select * from visible_ranked where rank <= 10 order by rank) vr;

  select count(*) into v_total_participants
  from public.spark_reward_weekly_scores(v_week_start) ws
  where ws.weekly_points > 0;

  if jsonb_array_length(v_leaders) > 0 then
    v_winner := v_leaders -> 0;
  end if;

  if v_allowed_subject is not null then
    v_lifetime := public.spark_reward_lifetime_points(v_allowed_subject);

    with ranked as (
      select ws.*,
             row_number() over (
               order by ws.weekly_points desc, ws.study_days desc, ws.skills_improved desc,
                        ws.correct_questions desc, ws.user_id
             )::int as rank
      from public.spark_reward_weekly_scores(v_week_start) ws
      where ws.weekly_points > 0
    ),
    subject_row as (
      select ws.*,
             coalesce(r.rank, 0)::int as rank
      from public.spark_reward_weekly_scores(v_week_start) ws
      left join ranked r on r.user_id = ws.user_id
      where ws.user_id = v_allowed_subject
      limit 1
    )
    select jsonb_build_object(
      'weekly_points', sr.weekly_points,
      'rank', sr.rank,
      'total_participants', v_total_participants,
      'lifetime_points', v_lifetime,
      'study_days', sr.study_days,
      'lessons_completed', sr.lessons_completed,
      'topic_quizzes_completed', sr.topic_quizzes_completed,
      'question_attempts', sr.question_attempts,
      'correct_questions', sr.correct_questions,
      'exams_completed', sr.exams_completed,
      'flashcard_reviews', sr.flashcard_reviews,
      'skills_improved', sr.skills_improved,
      'mastery_milestones', sr.mastery_milestones,
      'consistency_points', sr.consistency_points,
      'improvement_points', sr.improvement_points,
      'practice_points', sr.practice_points,
      'lesson_points', sr.lesson_points,
      'exam_points', sr.exam_points,
      'flashcard_points', sr.flashcard_points
    ) into v_subject
    from subject_row sr;

    if v_subject is null then
      v_subject := jsonb_build_object(
        'weekly_points', 0, 'rank', 0, 'total_participants', v_total_participants,
        'lifetime_points', v_lifetime, 'study_days', 0, 'lessons_completed', 0,
        'topic_quizzes_completed', 0, 'question_attempts', 0, 'correct_questions', 0,
        'exams_completed', 0, 'flashcard_reviews', 0, 'skills_improved', 0,
        'mastery_milestones', 0, 'consistency_points', 0, 'improvement_points', 0,
        'practice_points', 0, 'lesson_points', 0, 'exam_points', 0, 'flashcard_points', 0
      );
    end if;

    if v_allowed_subject = v_caller and v_viewer_role = 'student' then
      select jsonb_build_object('leaderboard_visible', coalesce(pref.leaderboard_visible, false))
      into v_preferences
      from (select 1) seed
      left join public.spark_reward_preferences pref on pref.user_id = v_caller;
    end if;
  end if;

  return jsonb_build_object(
    'week_start', v_week_start,
    'week_end', v_week_start + 6,
    'winner', v_winner,
    'leaders', v_leaders,
    'subject', v_subject,
    'preferences', v_preferences,
    'total_participants', v_total_participants
  );
end;
$$;

grant execute on function public.spark_get_rewards_dashboard(uuid) to authenticated;

comment on function public.spark_get_rewards_dashboard(uuid) is
'SPARK V5.7 rewards dashboard. Returns privacy-safe weekly leaders plus the caller or an approved parent-linked student score. Academic correctness and mastery state are never modified.';

commit;
