-- SPARK Rewards V5.7.0.1 verification
-- Safe to run directly in the Supabase SQL Editor.
-- The SQL Editor has no authenticated app user, so this verifier intentionally
-- does NOT call spark_get_rewards_dashboard(null). Test that RPC from the
-- authenticated SPARK application, or use the optional transaction below.

select to_regclass('public.spark_reward_preferences') as reward_preferences_table;

select proname, prosecdef
from pg_proc
where proname in (
  'spark_reward_weekly_scores',
  'spark_reward_lifetime_points',
  'spark_set_reward_preferences',
  'spark_get_rewards_dashboard'
)
order by proname;

-- Optional authenticated simulation for SQL Editor testing.
-- Uncomment only when you deliberately want to test against one student.
-- This transaction rolls back and does not persist the simulated claim.
--
-- begin;
-- select set_config(
--   'request.jwt.claim.sub',
--   (select id::text from public.profiles where role = 'student' limit 1),
--   true
-- );
-- select auth.uid() as simulated_logged_in_student;
-- select public.spark_get_rewards_dashboard(auth.uid());
-- rollback;
