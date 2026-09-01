-- CaribPrep: real tutor session completion + earnings foundation.
-- Run after the existing tutor/reviews migrations.
-- Does NOT change confirmed booking semantics: completed_at is the source of truth
-- for earnings, while status remains confirmed so existing booking/review flows keep working.

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS payout_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS paid_at timestamptz;

ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_payout_status_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_payout_status_check
  CHECK (payout_status IN ('pending','paid'));

CREATE INDEX IF NOT EXISTS idx_bookings_tutor_completed
  ON public.bookings(tutor_id, completed_at)
  WHERE completed_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bookings_tutor_payout
  ON public.bookings(tutor_id, payout_status)
  WHERE completed_at IS NOT NULL;

-- Stamp sessions as completed when their actual end time has passed in Jamaica.
-- Only confirmed, non-cancelled/non-declined bookings can become completed.
CREATE OR REPLACE FUNCTION public.sync_tutor_completed_sessions(p_tutor_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_count integer;
BEGIN
  SELECT user_id INTO v_user_id
  FROM public.tutors
  WHERE id = p_tutor_id;

  IF v_user_id IS NULL OR v_user_id <> auth.uid() THEN
    RAISE EXCEPTION 'Not authorized to sync these sessions.';
  END IF;

  UPDATE public.bookings b
  SET completed_at = (
    (b.session_date::date + COALESCE(b.start_time, '00:00:00')::time
      + (COALESCE(b.duration_minutes, 60) * INTERVAL '1 minute'))
      AT TIME ZONE 'America/Jamaica'
  )
  WHERE b.tutor_id = p_tutor_id
    AND b.status = 'confirmed'
    AND b.completed_at IS NULL
    AND (
      b.session_date::date + COALESCE(b.start_time, '00:00:00')::time
      + (COALESCE(b.duration_minutes, 60) * INTERVAL '1 minute')
    ) < (NOW() AT TIME ZONE 'America/Jamaica');

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_tutor_completed_sessions(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.sync_tutor_completed_sessions(uuid) TO authenticated;

-- Backfill sessions that already happened before this migration was installed.
UPDATE public.bookings b
SET completed_at = (
  (b.session_date::date + COALESCE(b.start_time, '00:00:00')::time
    + (COALESCE(b.duration_minutes, 60) * INTERVAL '1 minute'))
    AT TIME ZONE 'America/Jamaica'
)
WHERE b.status = 'confirmed'
  AND b.completed_at IS NULL
  AND (
    b.session_date::date + COALESCE(b.start_time, '00:00:00')::time
    + (COALESCE(b.duration_minutes, 60) * INTERVAL '1 minute')
  ) < (NOW() AT TIME ZONE 'America/Jamaica');

-- Admin-only payout update. Earnings are never changed; this only records whether
-- an already-earned session has been paid.
CREATE OR REPLACE FUNCTION public.admin_mark_tutor_earnings_paid(p_booking_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Not authorized: admin only';
  END IF;

  UPDATE public.bookings
  SET payout_status = 'paid',
      paid_at = COALESCE(paid_at, NOW())
  WHERE id = ANY(p_booking_ids)
    AND completed_at IS NOT NULL
    AND status = 'confirmed';

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_mark_tutor_earnings_paid(uuid[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_mark_tutor_earnings_paid(uuid[]) TO authenticated;

COMMENT ON COLUMN public.bookings.completed_at IS
  'Actual session end timestamp in UTC, stamped after the scheduled session end in America/Jamaica.';
COMMENT ON COLUMN public.bookings.payout_status IS
  'Tutor payout state for an earned session: pending or paid.';
COMMENT ON COLUMN public.bookings.paid_at IS
  'Timestamp when an administrator recorded the tutor payout as paid.';


CREATE OR REPLACE FUNCTION public.admin_get_pending_tutor_payouts()
RETURNS TABLE (
  booking_id uuid, tutor_id uuid, tutor_name text, student_name text,
  subject text, session_date date, duration_minutes integer, rate_jmd integer, completed_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true) THEN
    RAISE EXCEPTION 'Not authorized: admin only';
  END IF;

  RETURN QUERY
  SELECT b.id, b.tutor_id, t.name, sp.name, b.subject, b.session_date,
         b.duration_minutes, b.rate_jmd, b.completed_at
  FROM public.bookings b
  JOIN public.tutors t ON t.id = b.tutor_id
  LEFT JOIN public.profiles sp ON sp.id = b.student_id
  WHERE b.status = 'confirmed'
    AND b.completed_at IS NOT NULL
    AND COALESCE(b.payout_status, 'pending') = 'pending'
  ORDER BY b.completed_at DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_get_pending_tutor_payouts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_get_pending_tutor_payouts() TO authenticated;
