# CaribPrep v10 - Tutor Earnings & Session Completion

## What changed
- A confirmed session is considered completed only after its scheduled end time has passed in `America/Jamaica`.
- `bookings.completed_at` stores the actual scheduled end timestamp once synced.
- Existing `rate_jmd` on each booking is used for earnings, so later tutor rate changes do not alter old earnings.
- Tutor Earnings now shows:
  - Total earned
  - This month
  - This week
  - Sessions completed
  - Pending payout
  - Current hourly rate
  - Session history
  - Earnings by subject
  - Paid earnings
- Admins get a basic Tutor payouts section to mark completed sessions as paid.

## Supabase
Run this migration once in Supabase SQL Editor:

`supabase/migrations/20260816_tutor_earnings_completion_and_payouts.sql`

It adds `completed_at`, `payout_status`, and `paid_at`, backfills already-finished confirmed sessions, and creates secure functions for completion syncing and admin payout recording.

## React
Replace the project with this build and run:

```bash
npm install
npm start
```

No existing booking status needs to be changed from `confirmed` to `completed`; `completed_at` is intentionally the completion source of truth so existing booking and review flows remain compatible.
