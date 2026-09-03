-- SPARK booking timing, confirmation reminders and automatic closure
-- Policy:
--   * Student booking requests require at least 90 minutes' notice.
--   * Tutors receive a final confirmation reminder around 75 minutes before start.
--   * Tutor confirmation closes 60 minutes before start.
--   * Unanswered requests are stored as pending + confirmation_expired_at, while
--     the app displays the user-facing state "Not confirmed".
--   * Student, approved linked parents and tutor are notified when the request closes.

begin;

alter table public.bookings
  add column if not exists confirmation_reminder_sent_at timestamptz;

alter table public.bookings
  add column if not exists confirmation_expired_at timestamptz;

comment on column public.bookings.confirmation_reminder_sent_at is
  'When SPARK sent the final tutor reminder for an unanswered booking request.';

comment on column public.bookings.confirmation_expired_at is
  'When an unanswered booking request closed at the tutor confirmation deadline.';

create index if not exists bookings_pending_confirmation_deadline_idx
  on public.bookings (session_date, start_time)
  where status = 'pending' and confirmation_expired_at is null;

-- Booking requests and reschedules must leave both sides reasonable notice.
create or replace function public.spark_enforce_booking_notice()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  v_session_start timestamptz;
begin
  if new.status in ('cancelled', 'declined') then
    return new;
  end if;

  if new.session_date is null or new.start_time is null then
    return new;
  end if;

  v_session_start :=
    (new.session_date::date + new.start_time::time)
      at time zone 'America/Jamaica';

  if v_session_start < now() + interval '90 minutes' then
    raise exception 'Sessions must be booked at least 90 minutes before the start time. Please choose a later time.';
  end if;

  return new;
end;
$$;

revoke all on function public.spark_enforce_booking_notice() from public;

drop trigger if exists spark_booking_notice_insert_trg on public.bookings;
create trigger spark_booking_notice_insert_trg
before insert on public.bookings
for each row execute function public.spark_enforce_booking_notice();

drop trigger if exists spark_booking_notice_reschedule_trg on public.bookings;
create trigger spark_booking_notice_reschedule_trg
before update of session_date, start_time on public.bookings
for each row execute function public.spark_enforce_booking_notice();

-- Replace the earlier late-confirmation guard with the final 60-minute response
-- deadline. This also prevents a stale/direct client from declining a request
-- after SPARK has already closed it.
create or replace function public.spark_prevent_late_booking_confirmation()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  v_session_start timestamptz;
begin
  if old.status = 'pending'
     and new.status in ('confirmed', 'declined')
     and old.status is distinct from new.status then

    if new.session_date is null or new.start_time is null then
      raise exception 'A booking request cannot be answered without a complete session time.';
    end if;

    v_session_start :=
      (new.session_date::date + new.start_time::time)
        at time zone 'America/Jamaica';

    if old.confirmation_expired_at is not null
       or v_session_start <= now() + interval '60 minutes' then
      raise exception 'This booking request has closed. Tutor responses are required at least 60 minutes before the session.';
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.spark_prevent_late_booking_confirmation() from public;

drop trigger if exists spark_prevent_late_booking_confirmation on public.bookings;
create trigger spark_prevent_late_booking_confirmation
before update of status on public.bookings
for each row execute function public.spark_prevent_late_booking_confirmation();

-- Processes the two timed events. Call this every five minutes with Supabase Cron.
create or replace function public.spark_process_booking_confirmation_deadlines()
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  booking_row record;
  v_reminders integer := 0;
  v_closed integer := 0;
  v_when text;
  v_deadline text;
begin
  if to_regprocedure('public.spark_create_notification(uuid,text,text,text,text,text,uuid,uuid,uuid,jsonb,text)') is null then
    raise exception 'SPARK notification helper is not installed.';
  end if;

  if to_regprocedure('public.spark_notify_linked_parents(uuid,text,text,text,text,text,uuid,jsonb,text)') is null then
    raise exception 'SPARK parent notification helper is not installed.';
  end if;

  -- Final reminder: around 75 minutes before the requested start time.
  for booking_row in
    select
      b.id,
      b.student_id,
      b.tutor_id,
      b.subject,
      b.session_date,
      b.start_time,
      t.user_id as tutor_user_id,
      coalesce(t.name, 'Your tutor') as tutor_name,
      coalesce(p.name, 'A student') as student_name,
      ((b.session_date::date + b.start_time::time) at time zone 'America/Jamaica') as session_start
    from public.bookings b
    join public.tutors t on t.id = b.tutor_id
    join public.profiles p on p.id = b.student_id
    where b.status = 'pending'
      and b.confirmation_expired_at is null
      and b.confirmation_reminder_sent_at is null
      and b.session_date is not null
      and b.start_time is not null
      and ((b.session_date::date + b.start_time::time) at time zone 'America/Jamaica') > now() + interval '60 minutes'
      and ((b.session_date::date + b.start_time::time) at time zone 'America/Jamaica') <= now() + interval '75 minutes'
    order by b.session_date, b.start_time
    for update of b skip locked
  loop
    update public.bookings
    set confirmation_reminder_sent_at = now()
    where id = booking_row.id
      and status = 'pending'
      and confirmation_expired_at is null
      and confirmation_reminder_sent_at is null;

    if found then
      v_when := to_char(
        booking_row.session_start at time zone 'America/Jamaica',
        'FMDay, FMMonth FMDD, YYYY "at" FMHH12:MI AM'
      );
      v_deadline := to_char(
        (booking_row.session_start - interval '60 minutes') at time zone 'America/Jamaica',
        'FMHH12:MI AM'
      );

      perform public.spark_create_notification(
        booking_row.tutor_user_id,
        'booking_confirmation_reminder',
        'Confirmation needed',
        format(
          '%s requested %s for %s. Please confirm by %s Jamaica time so they can plan with confidence. Unconfirmed requests close automatically at the deadline.',
          booking_row.student_name,
          coalesce(booking_row.subject, 'tutoring'),
          v_when,
          v_deadline
        ),
        'dashboard',
        'Review request',
        booking_row.id,
        booking_row.tutor_id,
        booking_row.student_id,
        jsonb_build_object(
          'student_id', booking_row.student_id,
          'session_date', booking_row.session_date,
          'start_time', booking_row.start_time,
          'subject', booking_row.subject,
          'confirmation_deadline', booking_row.session_start - interval '60 minutes'
        ),
        'booking:' || booking_row.id::text || ':confirmation-reminder'
      );

      v_reminders := v_reminders + 1;
    end if;
  end loop;

  -- Confirmation deadline: 60 minutes before start. Mark the request closed,
  -- then tell every person who needs to know. Status remains 'pending' so we
  -- preserve the truth that the tutor never accepted or explicitly declined it.
  for booking_row in
    select
      b.id,
      b.student_id,
      b.tutor_id,
      b.subject,
      b.session_date,
      b.start_time,
      t.user_id as tutor_user_id,
      coalesce(t.name, 'Your tutor') as tutor_name,
      coalesce(p.name, 'Student') as student_name,
      ((b.session_date::date + b.start_time::time) at time zone 'America/Jamaica') as session_start
    from public.bookings b
    join public.tutors t on t.id = b.tutor_id
    join public.profiles p on p.id = b.student_id
    where b.status = 'pending'
      and b.confirmation_expired_at is null
      and b.session_date is not null
      and b.start_time is not null
      and ((b.session_date::date + b.start_time::time) at time zone 'America/Jamaica') <= now() + interval '60 minutes'
    order by b.session_date, b.start_time
    for update of b skip locked
  loop
    update public.bookings
    set confirmation_expired_at = now()
    where id = booking_row.id
      and status = 'pending'
      and confirmation_expired_at is null;

    if found then
      v_when := to_char(
        booking_row.session_start at time zone 'America/Jamaica',
        'FMDay, FMMonth FMDD, YYYY "at" FMHH12:MI AM'
      );

      perform public.spark_create_notification(
        booking_row.student_id,
        'booking_not_confirmed',
        'Session not confirmed',
        format(
          'Your %s session with %s for %s wasn''t confirmed by the deadline, so the request has closed. You can choose another tutor or time whenever you''re ready.',
          coalesce(booking_row.subject, 'tutoring'),
          booking_row.tutor_name,
          v_when
        ),
        'dashboard',
        'View booking',
        booking_row.id,
        null,
        booking_row.student_id,
        jsonb_build_object(
          'student_id', booking_row.student_id,
          'session_date', booking_row.session_date,
          'start_time', booking_row.start_time,
          'subject', booking_row.subject
        ),
        'booking:' || booking_row.id::text || ':not-confirmed-student'
      );

      perform public.spark_notify_linked_parents(
        booking_row.student_id,
        'child_booking_not_confirmed',
        'Tutoring session not confirmed',
        format(
          '%s''s %s session with %s for %s wasn''t confirmed by the deadline, so no session is scheduled.',
          booking_row.student_name,
          coalesce(booking_row.subject, 'tutoring'),
          booking_row.tutor_name,
          v_when
        ),
        'dashboard',
        'View progress',
        booking_row.id,
        jsonb_build_object(
          'student_id', booking_row.student_id,
          'session_date', booking_row.session_date,
          'start_time', booking_row.start_time,
          'subject', booking_row.subject
        ),
        'booking:' || booking_row.id::text || ':parent-not-confirmed'
      );

      perform public.spark_create_notification(
        booking_row.tutor_user_id,
        'booking_not_confirmed',
        'Booking request closed',
        format(
          '%s''s %s request for %s closed because it wasn''t confirmed by the deadline. The session is no longer scheduled.',
          booking_row.student_name,
          coalesce(booking_row.subject, 'tutoring'),
          v_when
        ),
        'dashboard',
        'View request',
        booking_row.id,
        booking_row.tutor_id,
        booking_row.student_id,
        jsonb_build_object(
          'student_id', booking_row.student_id,
          'session_date', booking_row.session_date,
          'start_time', booking_row.start_time,
          'subject', booking_row.subject
        ),
        'booking:' || booking_row.id::text || ':not-confirmed-tutor'
      );

      v_closed := v_closed + 1;
    end if;
  end loop;

  return jsonb_build_object('reminders_sent', v_reminders, 'requests_closed', v_closed);
end;
$$;

revoke all on function public.spark_process_booking_confirmation_deadlines() from public, anon, authenticated;

commit;
