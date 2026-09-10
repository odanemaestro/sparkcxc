-- SPARK RC2 subject enrollment + general learning goal verification.
select 'spark_student_subject_enrollments table' as check_name,
       to_regclass('public.spark_student_subject_enrollments') is not null as passed;

select 'subject enrollment RPC' as check_name,
       to_regprocedure('public.spark_set_subject_enrollment(text,boolean)') is not null as passed;

select 'general goal suggestion RPC' as check_name,
       to_regprocedure('public.spark_suggest_goal(uuid,integer,date,text)') is not null as passed;

select 'goal response RPC' as check_name,
       to_regprocedure('public.spark_respond_goal_suggestion(uuid,text)') is not null as passed;

select 'single active goal index retained' as check_name,
       to_regclass('public.spark_student_goals_one_active_idx') is not null as passed;

select 'student enrollment policy' as check_name,
       exists (
         select 1 from pg_policies
         where schemaname='public'
           and tablename='spark_student_subject_enrollments'
           and policyname='Students view own subject enrollments'
       ) as passed;

select 'approved parent enrollment policy' as check_name,
       exists (
         select 1 from pg_policies
         where schemaname='public'
           and tablename='spark_student_subject_enrollments'
           and policyname='Parents view linked child subject enrollments'
       ) as passed;

select 'enrollment realtime publication' as check_name,
       exists (
         select 1 from pg_publication_tables
         where pubname='supabase_realtime'
           and schemaname='public'
           and tablename='spark_student_subject_enrollments'
       ) as passed;


select 'goal table comment is subject-neutral' as check_name,
       coalesce(obj_description('public.spark_student_goals'::regclass), '') not ilike '%Mathematics%' as passed;

select 'active enrollments by subject' as check_name,
       subject_id,
       count(*) as active_students
from public.spark_student_subject_enrollments
where status='active'
group by subject_id
order by subject_id;

select 'active goal titles are general' as check_name,
       count(*) filter (where status='active') as active_goals,
       count(*) filter (
         where status='active'
           and title = 'Reach ' || target_percent::text || '% overall in SPARK'
       ) as general_goal_titles
from public.spark_student_goals;
