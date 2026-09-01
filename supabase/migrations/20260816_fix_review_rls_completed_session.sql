-- CaribPrep: allow reviews once the booked session has actually ended.
-- Fixes today's completed sessions being rejected by an overly strict
-- session_date < current_date check.

DROP POLICY IF EXISTS "Students can create verified session reviews" ON public.reviews;

CREATE POLICY "Students can create verified session reviews"
ON public.reviews FOR INSERT
WITH CHECK (
  auth.uid() = student_id
  AND EXISTS (
    SELECT 1
    FROM public.bookings b
    WHERE b.id = booking_id
      AND b.student_id = auth.uid()
      AND b.tutor_id = reviews.tutor_id
      AND b.status = 'confirmed'
      AND (
        b.session_date::timestamp
        + COALESCE(b.start_time, '00:00:00')::time
        + (COALESCE(b.duration_minutes, 60) * INTERVAL '1 minute')
      ) < NOW()
  )
  AND rating BETWEEN 1 AND 5
  AND length(trim(body)) BETWEEN 10 AND 1000
);
