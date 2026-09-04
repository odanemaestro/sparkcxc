-- SPARK Study Circles V9.0 database verification.
-- Safe read-only checks to run in Supabase SQL Editor after the migration.

select
  to_regclass('public.study_circle_preferences') as preferences_table,
  to_regclass('public.study_circles') as circles_table,
  to_regclass('public.study_circle_members') as members_table,
  to_regclass('public.study_circle_posts') as posts_table,
  to_regclass('public.study_circle_reports') as reports_table;

select
  to_regprocedure('public.spark_set_study_circle_preference(boolean,text[],boolean)') as set_preference_rpc,
  to_regprocedure('public.spark_get_study_circle_home()') as get_home_rpc,
  to_regprocedure('public.spark_match_study_circle()') as match_rpc,
  to_regprocedure('public.spark_create_study_circle_post(text)') as create_post_rpc,
  to_regprocedure('public.spark_report_study_circle_post(uuid,text,text)') as report_post_rpc,
  to_regprocedure('public.spark_leave_study_circle()') as leave_rpc,
  to_regprocedure('public.spark_parent_study_circle_status(uuid)') as parent_status_rpc,
  to_regprocedure('public.admin_get_study_circle_reports()') as admin_reports_rpc,
  to_regprocedure('public.admin_resolve_study_circle_report(uuid,text,boolean)') as admin_resolve_rpc;

select
  tablename,
  rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'study_circle_preferences',
    'study_circles',
    'study_circle_members',
    'study_circle_posts',
    'study_circle_reports'
  )
order by tablename;
