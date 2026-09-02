-- Secure booking actions for SPARK
-- Booking state changes are performed through narrow SECURITY DEFINER functions.
-- This avoids granting broad UPDATE access on public.bookings while still
-- allowing the assigned tutor or student to perform the actions available in
-- the application.

create or replace function public.respond_to_booking(
  p_booking_id uuid,
  p_action text,
  p_reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking public.bookings%rowtype;
  v_tutor_user_id uuid;
  v_action text := lower(trim(coalesce(p_action, '')));
  v_reason text := nullif(trim(coalesce(p_reason, '')), '');
  v_session_at timestamp;
begin
  if auth.uid() is null then
    raise exception 'You must be signed in to update a booking';
  end if;

  select *
    into v_booking
  from public.bookings
  where id = p_booking_id
  for update;

  if not found then
    raise exception 'Booking not found';
  end if;

  select user_id
    into v_tutor_user_id
  from public.tutors
  where id = v_booking.tutor_id;

  if v_tutor_user_id is null or v_tutor_user_id <> auth.uid() then
    raise exception 'Only the assigned tutor can update this booking';
  end if;

  if v_action in ('confirm', 'accept') then
    if v_booking.status = 'confirmed' then
      return jsonb_build_object('id', v_booking.id, 'status', 'confirmed', 'unchanged', true);
    end if;

    if v_booking.status <> 'pending' then
      raise exception 'Only a pending booking can be confirmed';
    end if;

    update public.bookings
    set status = 'confirmed',
        cancellation_reason = null,
        cancelled_by = null,
        cancelled_at = null
    where id = v_booking.id;

    return jsonb_build_object('id', v_booking.id, 'status', 'confirmed');
  end if;

  if v_action = 'decline' then
    if v_booking.status = 'declined' then
      return jsonb_build_object('id', v_booking.id, 'status', 'declined', 'unchanged', true);
    end if;

    if v_booking.status <> 'pending' then
      raise exception 'Only a pending booking can be declined';
    end if;

    if v_reason is null then
      raise exception 'Please give a reason for declining this booking';
    end if;

    update public.bookings
    set status = 'declined',
        cancellation_reason = v_reason,
        cancelled_by = auth.uid(),
        cancelled_at = now()
    where id = v_booking.id;

    return jsonb_build_object('id', v_booking.id, 'status', 'declined');
  end if;

  if v_action = 'cancel' then
    if v_booking.status = 'cancelled' then
      return jsonb_build_object('id', v_booking.id, 'status', 'cancelled', 'unchanged', true);
    end if;

    if v_booking.status <> 'confirmed' then
      raise exception 'Only a confirmed booking can be cancelled by the tutor';
    end if;

    if v_reason is null then
      raise exception 'Please give a reason for cancelling this booking';
    end if;

    v_session_at := v_booking.session_date::date + coalesce(v_booking.start_time, '00:00:00')::time;
    if v_session_at - timezone('America/Jamaica', now()) < interval '1 hour' then
      raise exception 'This session starts too soon to cancel';
    end if;

    update public.bookings
    set status = 'cancelled',
        cancellation_reason = v_reason,
        cancelled_by = auth.uid(),
        cancelled_at = now()
    where id = v_booking.id;

    return jsonb_build_object('id', v_booking.id, 'status', 'cancelled');
  end if;

  raise exception 'Unsupported booking action';
end;
$$;

revoke all on function public.respond_to_booking(uuid,text,text) from public;
grant execute on function public.respond_to_booking(uuid,text,text) to authenticated;

create or replace function public.cancel_booking_as_student(
  p_booking_id uuid,
  p_reason text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking public.bookings%rowtype;
  v_reason text := nullif(trim(coalesce(p_reason, '')), '');
  v_session_at timestamp;
begin
  if auth.uid() is null then
    raise exception 'You must be signed in to update a booking';
  end if;

  select *
    into v_booking
  from public.bookings
  where id = p_booking_id
  for update;

  if not found then
    raise exception 'Booking not found';
  end if;

  if v_booking.student_id <> auth.uid() then
    raise exception 'You can only cancel your own booking';
  end if;

  if v_booking.status = 'cancelled' then
    return jsonb_build_object('id', v_booking.id, 'status', 'cancelled', 'unchanged', true);
  end if;

  if v_booking.status not in ('pending', 'confirmed') then
    raise exception 'This booking can no longer be cancelled';
  end if;

  if v_reason is null then
    raise exception 'Please give a reason for cancelling this booking';
  end if;

  v_session_at := v_booking.session_date::date + coalesce(v_booking.start_time, '00:00:00')::time;
  if v_session_at - timezone('America/Jamaica', now()) < interval '1 hour' then
    raise exception 'This session starts too soon to cancel';
  end if;

  update public.bookings
  set status = 'cancelled',
      cancellation_reason = v_reason,
      cancelled_by = auth.uid(),
      cancelled_at = now()
  where id = v_booking.id;

  return jsonb_build_object('id', v_booking.id, 'status', 'cancelled');
end;
$$;

revoke all on function public.cancel_booking_as_student(uuid,text) from public;
grant execute on function public.cancel_booking_as_student(uuid,text) to authenticated;
