-- SPARK booking lifecycle hardening
-- Prevents a pending booking from being confirmed after its scheduled start time.
-- This preserves the existing respond_to_booking RPC and notification logic.

begin;

create or replace function public.spark_prevent_late_booking_confirmation()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  v_session_start timestamptz;
begin
  if new.status = 'confirmed'
     and old.status is distinct from 'confirmed' then

    if new.session_date is null then
      raise exception 'A booking cannot be confirmed without a session date.';
    end if;

    v_session_start :=
      (
        (
          new.session_date::text || ' ' ||
          coalesce(new.start_time::text, '00:00:00')
        )::timestamp
        at time zone 'America/Jamaica'
      );

    if v_session_start <= now() then
      raise exception
        'This booking can no longer be confirmed because its scheduled start time has passed.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists spark_prevent_late_booking_confirmation
on public.bookings;

create trigger spark_prevent_late_booking_confirmation
before update of status, session_date, start_time
on public.bookings
for each row
execute function public.spark_prevent_late_booking_confirmation();

commit;
