# Parent dashboard exam results setup

Paper 1 and Paper 2 submissions now save to `public.practice_exam_attempts` in Supabase.

## Required database step

Run this migration in Supabase before testing the feature:

`supabase/migrations/20260901_practice_exam_attempts_parent_dashboard.sql`

The migration adds:

- one row per completed Paper 1 or Paper 2 attempt
- duplicate protection per student and exam attempt
- student insert/read access
- approved linked-parent read access through `parent_student_links`
- indexes for recent exam history

## Existing local results

When a signed-in student opens Practice, SPARK syncs the Paper 1 and Paper 2 results still present in that browser's local storage into the new table. This lets recent attempts from the previous build appear on the linked parent's dashboard too.

## Parent dashboard

The selected child's progress panel now shows:

- Paper 1 attempt count
- Paper 2 attempt count
- overall full-exam average
- score and percentage for each recent attempt
- completion date and time
- exam duration
- questions completed
- submitted versus time-expired status
