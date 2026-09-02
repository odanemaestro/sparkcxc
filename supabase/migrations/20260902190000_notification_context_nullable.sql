-- SPARK notification schema compatibility fix
--
-- Earlier versions of SPARK used the notifications table only for tutor-side
-- booking alerts and could require tutor_id on every row. The Notification
-- Centre now stores student, parent, tutor, exam, family and application
-- notices in the same table. tutor_id, student_id and booking_id are context
-- fields, not ownership fields, so they must be optional. recipient_user_id is
-- the field used by RLS to decide who owns a notification.

alter table if exists public.notifications
  alter column tutor_id drop not null,
  alter column student_id drop not null,
  alter column booking_id drop not null;

-- Keep the main Notification Centre migration safe for databases upgraded from
-- the older booking-only notification schema.
comment on column public.notifications.tutor_id is
  'Optional tutor context for a notification. Notification ownership is recipient_user_id.';
comment on column public.notifications.student_id is
  'Optional student context for a notification. Notification ownership is recipient_user_id.';
comment on column public.notifications.booking_id is
  'Optional booking context for a notification.';
