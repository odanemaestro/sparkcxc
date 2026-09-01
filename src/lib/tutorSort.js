// ============================================================================
// Done by: Odane Robinson
//
// Pure sorting function for the tutor marketplace ("Find your tutor") page,
// extracted out of TutorsView in App.js so it can be unit tested directly
// without mounting the whole view or mocking Supabase.
// ============================================================================

/**
 * Returns a NEW array (never mutates `tutors`), sorted according to sortBy:
 *   - "rating_desc": highest rated first; ties broken by session_count
 *     descending (more completed sessions ranks higher on an equal rating);
 *     unrated tutors (rating null/undefined/0) sort to the end rather than
 *     incorrectly outranking a tutor with a genuine low rating.
 *   - "price_asc": cheapest rate_jmd first.
 *   - "price_desc": most expensive rate_jmd first.
 *   - anything else (e.g. "default"): original order, unchanged.
 */
export function sortTutors(tutors, sortBy) {
  const list = [...(tutors || [])];
  if (sortBy === "rating_desc") {
    return list.sort((a, b) => {
      const ar = a.rating || 0, br = b.rating || 0;
      if (br !== ar) return br - ar;
      return (b.session_count || 0) - (a.session_count || 0);
    });
  }
  if (sortBy === "price_asc") {
    return list.sort((a, b) => (a.rate_jmd || 0) - (b.rate_jmd || 0));
  }
  if (sortBy === "price_desc") {
    return list.sort((a, b) => (b.rate_jmd || 0) - (a.rate_jmd || 0));
  }
  return list;
}
