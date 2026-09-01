# CaribPrep v9.5 - Rejected Tutor Re-application Fix

## What this fixes

If a tutor's application was rejected, submitting a revised application could fail with:

> The application can only be changed by an authorized administrator.

The application RPC was correctly trying to perform the controlled status change, but the existing database trigger was not recognizing the RPC's transaction-local authorization marker.

The new migration updates the trigger so that:

- Direct applicant changes to `status`, `verified`, or `active` remain blocked.
- The trusted `submit_tutor_application` RPC can move a **rejected** application back to `pending`.
- The applicant still cannot approve their own application.
- Pending, approved, and deactivated applications cannot be resubmitted.

## Supabase step

You have already run the previous tutor migrations. Run **only this new migration**:

`supabase/migrations/20260816_fix_tutor_reapplication_trigger.sql`

No other Supabase migration in this package needs to be rerun.

## Test

1. Admin rejects a tutor application.
2. Tutor signs back in.
3. Tutor edits the application.
4. Submit the revised application.
5. It should succeed and set the existing row to `pending`.
6. Confirm the tutor cannot directly change their own status to `approved`.
7. Admin can then approve/reject it normally.
