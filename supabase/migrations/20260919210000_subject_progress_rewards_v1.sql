begin;

-- SPARK cross-subject rewards V1
--
-- Physics and Information Technology use spark_subject_progress as their
-- canonical learning record. The original rewards functions pre-dated that
-- model and therefore counted Mathematics-focused legacy tables only.
--
-- This migration keeps the existing 100-point weekly balance and existing
-- reward dashboard contract while adding completed non-Mathematics lessons,
-- interactive labs, IT SBA guide reviews, topic tests, checkpoints, full
-- practice papers and IT flashcard reviews.
--
-- Canonical activity keys are unique per activity, so opening or repeating a
-- completed item does not create unlimited points. Weekly credit uses the
-- first recorded completion date rather than updated_at.

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
legacy_lesson_counts as (
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
legacy_exam_counts as (
  select pe.user_id, count(*)::int as exams_completed
  from public.practice_exam_attempts pe
  where pe.completed_at is not null
    and (timezone('America/Jamaica', pe.completed_at))::date >= p_week_start
    and (timezone('America/Jamaica', pe.completed_at))::date < p_week_start + 7
  group by pe.user_id
),
legacy_flashcard_counts as (
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
subject_counts as (
  select sp.user_id,
         count(*) filter (where sp.activity_type = 'lesson')::int as lessons_completed,
         count(*) filter (where sp.activity_type = 'topic_quiz')::int as topic_quizzes_completed,
         count(*) filter (where sp.activity_type = 'section_checkpoint')::int as checkpoints_completed,
         count(*) filter (where sp.activity_type = 'lab')::int as labs_completed,
         count(*) filter (where sp.activity_type = 'sba_review')::int as sba_reviews_completed,
         count(*) filter (where sp.activity_type = 'exam')::int as exams_completed,
         count(*) filter (where sp.activity_type = 'flashcard_review')::int as flashcard_reviews
  from public.spark_subject_progress sp
  where lower(coalesce(sp.subject_id, '')) <> 'mathematics'
    and sp.completed = true
    and coalesce(sp.first_recorded_at, sp.updated_at) is not null
    and (timezone('America/Jamaica', coalesce(sp.first_recorded_at, sp.updated_at)))::date >= p_week_start
    and (timezone('America/Jamaica', coalesce(sp.first_recorded_at, sp.updated_at)))::date < p_week_start + 7
  group by sp.user_id
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

  union

  select sp.user_id,
         (timezone('America/Jamaica', coalesce(sp.first_recorded_at, sp.updated_at)))::date
  from public.spark_subject_progress sp
  where lower(coalesce(sp.subject_id, '')) <> 'mathematics'
    and sp.completed = true
    and sp.activity_type in (
      'lesson',
      'lab',
      'sba_review',
      'flashcard_review',
      'topic_quiz',
      'section_checkpoint',
      'exam'
    )
    and coalesce(sp.first_recorded_at, sp.updated_at) is not null
    and (timezone('America/Jamaica', coalesce(sp.first_recorded_at, sp.updated_at)))::date >= p_week_start
    and (timezone('America/Jamaica', coalesce(sp.first_recorded_at, sp.updated_at)))::date < p_week_start + 7
),
day_counts as (
  select user_id, count(distinct study_date)::int as study_days
  from study_dates
  group by user_id
),
base as (
  select s.user_id,
         coalesce(dc.study_days, 0)::int as study_days,
         (coalesce(llc.lessons_completed, 0) + coalesce(sc.lessons_completed, 0))::int as lessons_completed,
         (coalesce(mc.topic_quizzes_completed, 0) + coalesce(sc.topic_quizzes_completed, 0))::int as topic_quizzes_completed,
         coalesce(qc.question_attempts, 0)::int as question_attempts,
         coalesce(qc.correct_questions, 0)::int as correct_questions,
         (coalesce(lec.exams_completed, 0) + coalesce(sc.exams_completed, 0))::int as exams_completed,
         (coalesce(lfc.flashcard_reviews, 0) + coalesce(sc.flashcard_reviews, 0))::int as flashcard_reviews,
         coalesce(mc.skills_improved, 0)::int as skills_improved,
         coalesce(mc.mastery_milestones, 0)::int as mastery_milestones,
         coalesce(sc.checkpoints_completed, 0)::int as subject_checkpoints_completed,
         coalesce(sc.labs_completed, 0)::int as subject_labs_completed,
         coalesce(sc.sba_reviews_completed, 0)::int as subject_sba_reviews_completed
  from students s
  left join day_counts dc on dc.user_id = s.user_id
  left join legacy_lesson_counts llc on llc.user_id = s.user_id
  left join question_counts qc on qc.user_id = s.user_id
  left join legacy_exam_counts lec on lec.user_id = s.user_id
  left join legacy_flashcard_counts lfc on lfc.user_id = s.user_id
  left join milestone_counts mc on mc.user_id = s.user_id
  left join subject_counts sc on sc.user_id = s.user_id
),
scored as (
  select b.*,
         least(25, b.study_days * 4)::int as consistency_points,
         least(25, b.skills_improved * 10 + b.mastery_milestones * 5)::int as improvement_points,
         least(
           20,
           case
             when b.question_attempts <= 0 then 0
             when b.question_attempts < 5 then b.correct_questions * 2
             else round(
               12.0 * (b.correct_questions::numeric / nullif(b.question_attempts, 0))
               + least(8.0, b.question_attempts::numeric / 5.0)
             )::int
           end
         )::int as practice_points,
         least(
           15,
           b.lessons_completed * 5
           + b.topic_quizzes_completed * 3
           + b.subject_labs_completed * 4
           + b.subject_sba_reviews_completed * 2
         )::int as lesson_points,
         least(
           10,
           b.exams_completed * 5
           + b.subject_checkpoints_completed * 4
         )::int as exam_points,
         least(5, ceil(b.flashcard_reviews::numeric / 5.0))::int as flashcard_points
  from base b
)
select
  s.user_id,
  s.study_days,
  s.lessons_completed,
  s.topic_quizzes_completed,
  s.question_attempts,
  s.correct_questions,
  s.exams_completed,
  s.flashcard_reviews,
  s.skills_improved,
  s.mastery_milestones,
  s.consistency_points,
  s.improvement_points,
  s.practice_points,
  s.lesson_points,
  s.exam_points,
  s.flashcard_points,
  (
    s.consistency_points
    + s.improvement_points
    + s.practice_points
    + s.lesson_points
    + s.exam_points
    + s.flashcard_points
  )::int as weekly_points
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
with legacy_points as (
  select (
    coalesce((
      select count(*) * 20
      from public.lesson_progress lp
      where lp.user_id = p_student_id and lp.completed = true
    ), 0)
    + coalesce((
      select count(*) * 5
      from public.csec_question_attempts qa
      where qa.user_id = p_student_id and qa.correct is true
    ), 0)
    + coalesce((
      select count(*) * 2
      from public.spark_flashcard_review_events fr
      where fr.user_id = p_student_id
    ), 0)
    + coalesce((
      select sum(case when pe.paper_type = 'paper2' then 100 else 75 end)
      from public.practice_exam_attempts pe
      where pe.user_id = p_student_id and pe.completed_at is not null
    ), 0)
    + coalesce((
      select sum(case lm.event_type
        when 'topic_quiz_completed' then 30
        when 'adaptive_session_completed' then 25
        when 'skill_improved' then 40
        when 'mastery_milestone' then 50
        else 0 end)
      from public.learning_milestones lm
      where lm.user_id = p_student_id
    ), 0)
  )::int as points
),
subject_points as (
  select coalesce(sum(
    case sp.activity_type
      when 'lesson' then 20
      when 'lab' then 15
      when 'sba_review' then 10
      when 'flashcard_review' then 2
      when 'topic_quiz' then 30
      when 'section_checkpoint' then 50
      when 'exam' then
        case
          when lower(coalesce(sp.metadata->>'paper_type', '')) = 'paper2'
            or lower(coalesce(sp.activity_key, '')) like 'paper2:%'
          then 100
          else 75
        end
      else 0
    end
  ), 0)::int as points
  from public.spark_subject_progress sp
  where sp.user_id = p_student_id
    and lower(coalesce(sp.subject_id, '')) <> 'mathematics'
    and sp.completed = true
)
select (legacy_points.points + subject_points.points)::int
from legacy_points
cross join subject_points;
$$;

revoke all on function public.spark_reward_lifetime_points(uuid) from public;
revoke all on function public.spark_reward_lifetime_points(uuid) from authenticated;

comment on function public.spark_reward_weekly_scores(date) is
'SPARK weekly rewards with canonical Physics and Information Technology learning activity included without double-counting Mathematics legacy activity.';

comment on function public.spark_reward_lifetime_points(uuid) is
'SPARK lifetime points including canonical non-Mathematics subject lessons, labs, SBA reviews, flashcards, assessments and practice papers.';

commit;