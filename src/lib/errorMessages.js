// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// Turns raw Supabase/network error messages into plain-language text a
// student can act on, instead of a raw Postgres/JS error string.
// ============================================================================
export const friendlyErrorMessage = (value, fallback = "") => {
  const raw = String(value?.message || value || "").trim();
  const msg = raw.toLowerCase();
  const code = String(value?.code || "").trim().toUpperCase();
  if (!raw) return fallback || "Something went wrong. Please try again.";

  if (msg.includes("row-level security") || msg.includes("permission denied") || code === "42501")
    return "We couldn't complete that action with your current account permissions. Refresh the page and try again. If the problem continues, contact support.";
  if (msg.includes("already reviewed") || msg.includes("reviews_one_per_booking") || msg.includes("duplicate key"))
    return "You've already reviewed this tutoring session. You can view your review from the tutor's profile.";
  if (msg.includes("session has not ended") || msg.includes("not yet eligible"))
    return "This review will be available after your tutoring session has finished. Please come back once the session is over.";
  if (msg.includes("booking not found"))
    return "We couldn't find that tutoring session. Refresh your bookings and try again.";
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

  // Never expose database internals such as table names, column names,
  // constraints or PostgREST schema-cache messages to students, parents or
  // tutors. The original error is still logged to the browser console by the
  // calling action for debugging.
  const databaseCodes = new Set(["23502", "23503", "23505", "23514", "PGRST202", "PGRST204"]);
  const looksTechnical = databaseCodes.has(code)
    || msg.includes("violates not-null constraint")
    || msg.includes("violates foreign key constraint")
    || msg.includes("violates check constraint")
    || msg.includes("null value in column")
    || msg.includes("relation ")
    || msg.includes("schema cache")
    || msg.includes("function public.")
    || msg.includes("postgres")
    || msg.includes("sqlstate");

  if (looksTechnical)
    return fallback || "We couldn't save your changes. Please try again. If the problem continues, contact support.";

  return fallback || raw;
};
