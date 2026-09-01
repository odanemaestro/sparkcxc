# v9.6 Reviews RLS Fix

## What was fixed
A completed session occurring **today** could be shown as `completed` by the app, while the database policy only allowed reviews when `session_date < current_date`. That caused `new row violates row-level security policy for table reviews`.

The new policy checks the actual scheduled session end time using `session_date + start_time + duration_minutes`.

## Supabase
Run only:
`supabase/migrations/20260816_fix_review_rls_completed_session.sql`

No previous migrations need to be rerun.
