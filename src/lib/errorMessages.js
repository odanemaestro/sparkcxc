// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// Turns raw Supabase/network error messages into plain-language text a
// student can actually act on, instead of a raw Postgres/JS error string.
// ============================================================================
export const friendlyErrorMessage = (value) => {
  const raw = String(value?.message || value || "").trim();
  const msg = raw.toLowerCase();
  if (!raw) return "Something went wrong. Please try again.";
  if (msg.includes("row-level security") || msg.includes("permission denied"))
    return "We couldn't complete that action because your account isn't currently allowed to do it. Please refresh the page and try again. If it still happens, contact support.";
  if (msg.includes("already reviewed") || msg.includes("reviews_one_per_booking") || msg.includes("duplicate key"))
    return "You've already reviewed this tutoring session. You can view your review from the tutor's profile.";
  if (msg.includes("session has not ended") || msg.includes("not yet eligible"))
    return "This review will be available after your tutoring session has finished. Please come back once the session is over.";
  if (msg.includes("booking not found"))
    return "We couldn't find that tutoring session. Please refresh your bookings and try again.";
  if (msg.includes("only the assigned tutor"))
    return "Only the tutor assigned to this booking can update it.";
  if (msg.includes("only a pending booking can be confirmed") || msg.includes("only a pending booking can be declined"))
    return "This booking has already been updated. Refresh your sessions and try again.";
  if (msg.includes("this booking can no longer be cancelled") || msg.includes("only a confirmed booking can be cancelled"))
    return "This booking can no longer be cancelled.";
  if (msg.includes("session starts too soon to cancel"))
    return "This session starts too soon to cancel. Please contact the other person directly.";
  if (msg.includes("you can only cancel your own booking"))
    return "You can only cancel a booking made from your account.";
  if (msg.includes("only confirmed tutoring sessions"))
    return "Only confirmed tutoring sessions can be reviewed.";
  if (msg.includes("only review your own tutoring sessions"))
    return "You can only review tutoring sessions that you booked.";
  if (msg.includes("must be signed in") || msg.includes("not authenticated"))
    return "Please sign in again to continue.";
  if (msg.includes("rating must be between"))
    return "Please choose a rating from 1 to 5 stars.";
  if (msg.includes("review must be between"))
    return "Your review should be between 10 and 1,000 characters.";
  if (msg.includes("network") || msg.includes("fetch") || msg.includes("failed to fetch"))
    return "We couldn't reach SPARK right now. Check your internet connection and try again.";
  return raw;
};

