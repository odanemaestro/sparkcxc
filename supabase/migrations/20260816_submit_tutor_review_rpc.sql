-- CaribPrep: submit tutor reviews through a secure RPC.
-- This avoids client-side INSERT RLS mismatches while keeping all eligibility
-- checks enforced in the database.

DROP FUNCTION IF EXISTS public.submit_tutor_review(uuid, integer, text);

CREATE OR REPLACE FUNCTION public.submit_tutor_review(
  p_booking_id uuid,
  p_rating integer,
  p_body text
)
RETURNS public.reviews
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
SET row_security = off
AS $$
DECLARE
  v_booking public.bookings%ROWTYPE;
  v_review public.reviews%ROWTYPE;
  v_body text := trim(coalesce(p_body, ''));
  v_session_end timestamp;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must be signed in to submit a review';
  END IF;

  IF p_rating IS NULL OR p_rating < 1 OR p_rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;

  IF length(v_body) < 10 OR length(v_body) > 1000 THEN
    RAISE EXCEPTION 'Review must be between 10 and 1000 characters';
  END IF;

  SELECT * INTO v_booking
  FROM public.bookings
  WHERE id = p_booking_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;

  IF v_booking.student_id <> auth.uid() THEN
    RAISE EXCEPTION 'You can only review your own tutoring sessions';
  END IF;

  IF v_booking.status <> 'confirmed' THEN
    RAISE EXCEPTION 'Only confirmed tutoring sessions can be reviewed';
  END IF;

  -- Booking date/time values are stored as Jamaica-local values.
  v_session_end :=
    v_booking.session_date::date
    + COALESCE(v_booking.start_time, '00:00:00')::time
    + (COALESCE(v_booking.duration_minutes, 60) * interval '1 minute');

  IF v_session_end >= (now() AT TIME ZONE 'America/Jamaica') THEN
    RAISE EXCEPTION 'This session has not ended yet';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.reviews r WHERE r.booking_id = p_booking_id
  ) THEN
    RAISE EXCEPTION 'You have already reviewed this session';
  END IF;

  INSERT INTO public.reviews (
    booking_id,
    student_id,
    tutor_id,
    rating,
    body
  )
  VALUES (
    v_booking.id,
    v_booking.student_id,
    v_booking.tutor_id,
    p_rating,
    v_body
  )
  RETURNING * INTO v_review;

  RETURN v_review;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_tutor_review(uuid, integer, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_tutor_review(uuid, integer, text) TO authenticated;
