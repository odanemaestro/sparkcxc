# SPARK Notification Centre setup

The Notification Centre is included in the application header for signed-in students, parents and tutors.

## Supabase migration

Run this migration in the same Supabase project used by SPARK:

`supabase/migrations/20260902_notification_centre.sql`

The migration:

- upgrades or creates the `notifications` table
- adds a user-specific `recipient_user_id`
- adds unread state through `read_at`
- adds titles, actions and metadata
- enables RLS so users only read and update their own notifications
- creates booking and session notifications
- creates Paper 1 and Paper 2 completion notifications
- sends linked parents their own child-progress notifications
- creates tutor-application status notifications
- creates family-link notifications
- enables Supabase Realtime for the table

Browser clients no longer insert booking notifications directly. Database triggers create the notification after the booking change succeeds. This prevents a user from creating a notification for another account manually.

## Events covered

- new booking request
- booking confirmed
- booking declined
- booking cancelled by a student
- booking cancelled by a tutor
- booking date or time changed
- session completed
- Paper 1 completed
- Paper 2 completed
- linked child Paper 1 and Paper 2 results for parents
- tutor application status changed
- parent or guardian connection request and response

## Responsive behaviour

The header now switches to a menu button on tablets and phones. The Notification Centre opens as a right-side drawer on larger screens and a full-width panel on small screens.

The responsive pass also includes:

- mobile navigation
- mobile dashboard section tabs
- mobile lesson section and topic selectors
- single-column tutor cards on small screens
- responsive marketing and contact grids
- responsive footer columns
- larger touch targets
- 16px mobile form controls to prevent unwanted browser zoom
- safe-area support and `100dvh` for modern mobile browsers
