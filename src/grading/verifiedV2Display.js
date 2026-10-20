/**
 * Only server-published, owner-scoped V2 results may replace an examination's
 * practice estimate. The backend RPC enforces ownership; this guard also
 * refuses stale/mismatched and malformed responses in the UI.
 */
export function verifiedV2Display(result, attemptId) {
  if (!attemptId || !result || result.available !== true ||
      result.status !== "verified" ||
      String(result.attemptId || "") !== String(attemptId)) return null;
  const score=Number(result.score);
  const maxMarks=Number(result.maxMarks);
  if (result.score == null || result.maxMarks == null ||
      !Number.isFinite(score) || !Number.isFinite(maxMarks) ||
      maxMarks<=0 || score<0 || score>maxMarks) return null;
  return {score,maxMarks,percent:Math.round(score/maxMarks*100)};
}
