# CaribPrep Reviews + Parent/Guardian - final setup

## Existing migrations

If you already ran these, **do not run them again**:

- `20260816_csec_adaptive_learning.sql`
- `20260816_reviews_parent_system.sql`

## New migration for this release

Run this one once in **Supabase → SQL Editor → New query**:

- `20260816_family_resend_and_realtime.sql`

It fixes the family-request lifecycle so a parent can resend a request after a student previously declined or revoked it. It also enables Realtime for `parent_student_links` when the Supabase Realtime publication is available.

## Expected family-request flow

1. Parent enters the student's family code.
2. Parent sees **Awaiting approval** immediately.
3. Student sees the incoming request.
4. Student can approve or decline.
5. If the student declines, the existing relationship remains in the database as `declined`.
6. If the parent enters the same family code again, the existing relationship is safely reset to `pending` instead of remaining stuck at `declined`.
7. An open student dashboard receives the new pending request through Realtime and refreshes its request list.
8. An open parent dashboard receives approval/decline changes through Realtime as well.

## Tutor avatar behavior

Tutor cards no longer trust `initials` or `avatar_color` being populated correctly. The UI generates initials from the tutor name and chooses a deterministic CaribPrep palette fallback when the stored color is missing or malformed.

## Testing checklist

### Parent resend

- Parent A sends request to Student B.
- Student B declines it.
- Confirm the student sees the declined state.
- Parent A sends the same family code again.
- Parent A should immediately see **Awaiting approval**.
- Student B should see the request again without logging out.
- Student B approves it.
- Parent A should move into the connected-child dashboard without refreshing.

### Tutor marketplace

- Open **Tutors**.
- Confirm every tutor has visible initials in a colored avatar.
- Test a tutor record with blank/null initials and avatar color; the UI should still render initials and a fallback color.
- Test mobile width: filters scroll horizontally and the search field becomes full width.
