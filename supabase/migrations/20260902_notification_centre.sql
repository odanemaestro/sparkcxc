-- SPARK Notification Centre
-- Stores booking, session, exam, family and tutor-application updates in one
-- user-specific inbox. All notification creation happens in database triggers
-- so users cannot create messages for other accounts from the browser.

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_user_id uuid references public.profiles(id) on delete cascade,
  tutor_id uuid references public.tutors(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete cascade,
  type text not null default 'update',
  title text,
  message text not null default '',
  action_view text,
  action_label text,
  metadata jsonb not null default '{}'::jsonb,
  dedupe_key text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.notifications add column if not exists recipient_user_id uuid references public.profiles(id) on delete cascade;
alter table public.notifications add column if not exists title text;
alter table public.notifications add column if not exists action_view text;
alter table public.notifications add column if not exists action_label text;
alter table public.notifications add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.notifications add column if not exists dedupe_key text;
alter table public.notifications add column if not exists read_at timestamptz;
alter table public.notifications add column if not exists created_at timestamptz not null default now();

create index if not exists notifications_recipient_created_idx
  on public.notifications(recipient_user_id, created_at desc);
create index if not exists notifications_recipient_unread_idx
  on public.notifications(recipient_user_id, read_at, created_at desc);
create unique index if not exists notifications_dedupe_key_uidx
  on public.notifications(dedupe_key) where dedupe_key is not null;

-- Map older booking notification rows into the new recipient field where the
-- intended recipient can be determined from the existing notification type.
update public.notifications n
set recipient_user_id = n.student_id
where n.recipient_user_id is null
  and n.student_id is not null
  and n.type in ('booking_confirmed','booking_declined','booking_cancelled_by_tutor');

update public.notifications n
set recipient_user_id = t.user_id
from public.tutors t
where n.recipient_user_id is null
  and n.tutor_id = t.id
  and n.type in ('booking_created','booking_cancelled');

alter table public.notifications enable row level security;

-- Replace earlier prototype policies with one clear rule: a notification
-- belongs to exactly one recipient. Existing policy names are not assumed.
do $$
declare
  policy_row record;
begin
  for policy_row in
    select policyname
    from pg_policies
    where schemaname = 'public' and tablename = 'notifications'
  loop
    execute format('drop policy if exists %I on public.notifications', policy_row.policyname);
  end loop;
end $$;

create policy "Users read own notifications"
on public.notifications for select
using (recipient_user_id = auth.uid());

create policy "Users update own notifications"
on public.notifications for update
using (recipient_user_id = auth.uid())
with check (recipient_user_id = auth.uid());

-- Table privileges provide a second guard. Signed-in users only need to read
-- and mark their own notifications. All inserts come from trigger functions.
revoke insert, delete on public.notifications from anon, authenticated;
grant select, update on public.notifications to authenticated;

create or replace function public.spark_create_notification(
  p_recipient_user_id uuid,
  p_type text,
  p_title text,
  p_message text,
  p_action_view text default null,
  p_action_label text default null,
  p_booking_id uuid default null,
  p_tutor_id uuid default null,
  p_student_id uuid default null,
  p_metadata jsonb default '{}'::jsonb,
  p_dedupe_key text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_recipient_user_id is null then
    return;
  end if;

  if p_dedupe_key is not null and exists (
    select 1 from public.notifications where dedupe_key = p_dedupe_key
  ) then
    return;
  end if;

  insert into public.notifications (
    recipient_user_id, type, title, message, action_view, action_label,
    booking_id, tutor_id, student_id, metadata, dedupe_key
  ) values (
    p_recipient_user_id, p_type, p_title, p_message, p_action_view, p_action_label,
    p_booking_id, p_tutor_id, p_student_id, coalesce(p_metadata, '{}'::jsonb), p_dedupe_key
  );
exception
  when unique_violation then
    null;
end;
$$;

revoke all on function public.spark_create_notification(uuid,text,text,text,text,text,uuid,uuid,uuid,jsonb,text) from public;

create or replace function public.spark_notify_linked_parents(
  p_student_id uuid,
  p_type text,
  p_title text,
  p_message text,
  p_action_view text,
  p_action_label text,
  p_booking_id uuid,
  p_metadata jsonb,
  p_dedupe_suffix text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  parent_row record;
begin
  for parent_row in
    select parent_id
    from public.parent_student_links
    where student_id = p_student_id and status = 'approved'
  loop
    perform public.spark_create_notification(
      parent_row.parent_id,
      p_type,
      p_title,
      p_message,
      p_action_view,
      p_action_label,
      p_booking_id,
      null,
      null,
      coalesce(p_metadata, '{}'::jsonb),
      case when p_dedupe_suffix is null then null else p_dedupe_suffix || ':' || parent_row.parent_id::text end
    );
  end loop;
end;
$$;

revoke all on function public.spark_notify_linked_parents(uuid,text,text,text,text,text,uuid,jsonb,text) from public;

create or replace function public.spark_booking_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tutor_user_id uuid;
  v_tutor_name text;
  v_student_name text;
  v_when text;
  v_reason text;
begin
  select t.user_id, coalesce(t.name, 'Your tutor')
    into v_tutor_user_id, v_tutor_name
  from public.tutors t
  where t.id = new.tutor_id;

  select coalesce(p.name, 'A student')
    into v_student_name
  from public.profiles p
  where p.id = new.student_id;

  v_when := concat(new.session_date::text, ' at ', left(coalesce(new.start_time::text, ''), 5));
  v_reason := nullif(trim(coalesce(new.cancellation_reason, '')), '');

  if tg_op = 'INSERT' then
    perform public.spark_create_notification(
      v_tutor_user_id,
      'booking_created',
      'New booking request',
      format('%s requested a %s session for %s.', v_student_name, coalesce(new.subject, 'tutoring'), v_when),
      'dashboard', 'View booking', new.id, new.tutor_id, null,
      jsonb_build_object('session_date', new.session_date, 'start_time', new.start_time, 'subject', new.subject),
      'booking:' || new.id::text || ':created'
    );
    return new;
  end if;

  if old.status is distinct from new.status then
    if new.status = 'confirmed' then
      perform public.spark_create_notification(
        new.student_id, 'booking_confirmed', 'Booking confirmed',
        format('%s confirmed your %s session for %s.', v_tutor_name, coalesce(new.subject, 'tutoring'), v_when),
        'dashboard', 'View booking', new.id, null, new.student_id,
        jsonb_build_object('session_date', new.session_date, 'start_time', new.start_time, 'subject', new.subject),
        'booking:' || new.id::text || ':confirmed'
      );
      perform public.spark_notify_linked_parents(
        new.student_id, 'booking_confirmed', 'Child booking confirmed',
        format('%s has a confirmed %s session for %s.', v_student_name, coalesce(new.subject, 'tutoring'), v_when),
        'dashboard', 'View progress', new.id,
        jsonb_build_object('student_id', new.student_id, 'subject', new.subject),
        'booking:' || new.id::text || ':parent-confirmed'
      );
    elsif new.status = 'declined' then
      perform public.spark_create_notification(
        new.student_id, 'booking_declined', 'Booking declined',
        format('%s declined your %s session for %s.%s', v_tutor_name, coalesce(new.subject, 'tutoring'), v_when,
          case when v_reason is null then '' else ' Reason: ' || v_reason end),
        'dashboard', 'View booking', new.id, null, new.student_id,
        '{}'::jsonb,
        'booking:' || new.id::text || ':declined'
      );
      perform public.spark_notify_linked_parents(
        new.student_id, 'booking_declined', 'Child booking declined',
        format('%s''s %s booking for %s was declined.', v_student_name, coalesce(new.subject, 'tutoring'), v_when),
        'dashboard', 'View progress', new.id, '{}'::jsonb,
        'booking:' || new.id::text || ':parent-declined'
      );
    elsif new.status = 'cancelled' then
      if new.cancelled_by = new.student_id then
        perform public.spark_create_notification(
          v_tutor_user_id, 'booking_cancelled', 'Booking cancelled',
          format('%s cancelled the %s session for %s.%s', v_student_name, coalesce(new.subject, 'tutoring'), v_when,
            case when v_reason is null then '' else ' Reason: ' || v_reason end),
          'dashboard', 'View booking', new.id, new.tutor_id, null,
          '{}'::jsonb,
          'booking:' || new.id::text || ':cancelled-tutor'
        );
      else
        perform public.spark_create_notification(
          new.student_id, 'booking_cancelled_by_tutor', 'Session cancelled',
          format('%s cancelled your %s session for %s.%s', v_tutor_name, coalesce(new.subject, 'tutoring'), v_when,
            case when v_reason is null then '' else ' Reason: ' || v_reason end),
          'dashboard', 'View booking', new.id, null, new.student_id,
          '{}'::jsonb,
          'booking:' || new.id::text || ':cancelled-student'
        );
      end if;
      perform public.spark_notify_linked_parents(
        new.student_id, 'booking_cancelled', 'Child session cancelled',
        format('%s''s %s session for %s was cancelled.', v_student_name, coalesce(new.subject, 'tutoring'), v_when),
        'dashboard', 'View progress', new.id, '{}'::jsonb,
        'booking:' || new.id::text || ':parent-cancelled'
      );
    end if;
  end if;

  if (old.session_date is distinct from new.session_date or old.start_time is distinct from new.start_time)
     and new.status not in ('cancelled','declined') then
    perform public.spark_create_notification(
      new.student_id, 'booking_rescheduled', 'Session time changed',
      format('Your %s session with %s is now scheduled for %s.', coalesce(new.subject, 'tutoring'), v_tutor_name, v_when),
      'dashboard', 'View booking', new.id, null, new.student_id, '{}'::jsonb,
      'booking:' || new.id::text || ':rescheduled-student:' || coalesce(new.session_date::text,'') || ':' || coalesce(new.start_time::text,'')
    );
    perform public.spark_create_notification(
      v_tutor_user_id, 'booking_rescheduled', 'Session time changed',
      format('Your %s session with %s is now scheduled for %s.', coalesce(new.subject, 'tutoring'), v_student_name, v_when),
      'dashboard', 'View booking', new.id, new.tutor_id, null, '{}'::jsonb,
      'booking:' || new.id::text || ':rescheduled-tutor:' || coalesce(new.session_date::text,'') || ':' || coalesce(new.start_time::text,'')
    );
    perform public.spark_notify_linked_parents(
      new.student_id, 'booking_rescheduled', 'Child session changed',
      format('%s''s %s session is now scheduled for %s.', v_student_name, coalesce(new.subject, 'tutoring'), v_when),
      'dashboard', 'View progress', new.id, '{}'::jsonb,
      'booking:' || new.id::text || ':parent-rescheduled:' || coalesce(new.session_date::text,'') || ':' || coalesce(new.start_time::text,'')
    );
  end if;

  if old.completed_at is null and new.completed_at is not null then
    perform public.spark_create_notification(
      new.student_id, 'session_completed', 'Session completed',
      format('Your %s session with %s has been marked complete.', coalesce(new.subject, 'tutoring'), v_tutor_name),
      'dashboard', 'View booking', new.id, null, new.student_id, '{}'::jsonb,
      'booking:' || new.id::text || ':completed-student'
    );
    perform public.spark_notify_linked_parents(
      new.student_id, 'session_completed', 'Child session completed',
      format('%s completed a %s tutoring session.', v_student_name, coalesce(new.subject, 'tutoring')),
      'dashboard', 'View progress', new.id, '{}'::jsonb,
      'booking:' || new.id::text || ':parent-completed'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists spark_booking_notifications_trg on public.bookings;
create trigger spark_booking_notifications_trg
after insert or update on public.bookings
for each row execute function public.spark_booking_notifications();

create or replace function public.spark_exam_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_name text;
  v_paper_label text;
  v_type text;
begin
  select coalesce(name, 'Student') into v_student_name from public.profiles where id = new.user_id;
  v_paper_label := case when new.paper_type = 'paper1' then 'Paper 1' else 'Paper 2' end;
  v_type := case when new.paper_type = 'paper1' then 'paper1_completed' else 'paper2_completed' end;

  perform public.spark_create_notification(
    new.user_id, v_type, v_paper_label || ' completed',
    format('You completed %s and scored %s%%.', v_paper_label, trim(to_char(new.percent, 'FM999990.00'))),
    'dashboard', 'View progress', null, null, new.user_id,
    jsonb_build_object('attempt_key', new.attempt_key, 'paper_type', new.paper_type, 'score', new.score, 'max_score', new.max_score, 'percent', new.percent),
    'exam:' || new.user_id::text || ':' || new.attempt_key || ':student'
  );

  perform public.spark_notify_linked_parents(
    new.user_id,
    case when new.paper_type = 'paper1' then 'child_paper1_completed' else 'child_paper2_completed' end,
    v_student_name || ' completed ' || v_paper_label,
    format('%s completed %s and scored %s%%.', v_student_name, v_paper_label, trim(to_char(new.percent, 'FM999990.00'))),
    'dashboard', 'View progress', null,
    jsonb_build_object('student_id', new.user_id, 'attempt_key', new.attempt_key, 'paper_type', new.paper_type, 'percent', new.percent),
    'exam:' || new.user_id::text || ':' || new.attempt_key || ':parent'
  );
  return new;
end;
$$;

drop trigger if exists spark_exam_notifications_trg on public.practice_exam_attempts;
create trigger spark_exam_notifications_trg
after insert on public.practice_exam_attempts
for each row execute function public.spark_exam_notifications();

create or replace function public.spark_tutor_application_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status is distinct from new.status then
    perform public.spark_create_notification(
      new.user_id,
      'tutor_application_update',
      'Tutor application update',
      case new.status
        when 'approved' then 'Your tutor application has been approved.'
        when 'rejected' then 'Your tutor application was not approved. Open your application for details.'
        when 'pending' then 'Your tutor application is under review.'
        else 'Your tutor application status is now ' || coalesce(new.status, 'updated') || '.'
      end,
      case when new.status = 'approved' then 'dashboard' else 'become-tutor' end,
      'View application', null, null, null,
      jsonb_build_object('tutor_id', new.id, 'status', new.status),
      'tutor-application:' || new.id::text || ':' || coalesce(new.status, 'unknown')
    );
  end if;
  return new;
end;
$$;

drop trigger if exists spark_tutor_application_notifications_trg on public.tutors;
create trigger spark_tutor_application_notifications_trg
after update of status on public.tutors
for each row execute function public.spark_tutor_application_notifications();

create or replace function public.spark_family_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_parent_name text;
  v_student_name text;
begin
  select coalesce(name, 'A parent or guardian') into v_parent_name from public.profiles where id = new.parent_id;
  select coalesce(name, 'Student') into v_student_name from public.profiles where id = new.student_id;

  if tg_op = 'INSERT' and new.status = 'pending' then
    perform public.spark_create_notification(
      new.student_id, 'family_link_request', 'Family connection request',
      format('%s sent you a parent or guardian connection request.', v_parent_name),
      'dashboard', 'Review request', null, null, new.student_id,
      jsonb_build_object('link_id', new.id, 'parent_id', new.parent_id),
      'family:' || new.id::text || ':request'
    );
  elsif tg_op = 'UPDATE' and old.status is distinct from new.status then
    perform public.spark_create_notification(
      new.parent_id, 'family_link_update', 'Family connection update',
      case new.status
        when 'approved' then format('%s approved your family connection request.', v_student_name)
        when 'declined' then format('%s declined your family connection request.', v_student_name)
        else format('Your family connection with %s is now %s.', v_student_name, new.status)
      end,
      'dashboard', 'View dashboard', null, null, null,
      jsonb_build_object('link_id', new.id, 'student_id', new.student_id, 'status', new.status),
      'family:' || new.id::text || ':' || new.status
    );
  end if;
  return new;
end;
$$;

drop trigger if exists spark_family_notifications_trg on public.parent_student_links;
create trigger spark_family_notifications_trg
after insert or update on public.parent_student_links
for each row execute function public.spark_family_notifications();

-- Realtime makes unread counts and the drawer update without a refresh.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'notifications'
  ) then
    alter publication supabase_realtime add table public.notifications;
  end if;
exception
  when undefined_object then
    null;
end $$;
