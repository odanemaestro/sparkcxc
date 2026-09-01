# v9.8 Review submission fix

The student review form now submits through the secure `submit_tutor_review` Supabase RPC instead of a direct `reviews` table INSERT.

Run this migration once in Supabase SQL Editor:

`supabase/migrations/20260816_submit_tutor_review_rpc.sql`

The RPC verifies:
- signed-in student
- booking belongs to the student
- booking is confirmed
- session has actually ended using America/Jamaica time
- rating is 1–5
- review body is 10–1000 characters
- one review per booking

No previous migrations need to be rerun.
