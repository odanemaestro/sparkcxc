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

/** Only show server criterion marks when the complete verified paper reconciles. */
export function verifiedV2Parts(result,attemptId){
  const verified=verifiedV2Display(result,attemptId);
  if(!verified||!Array.isArray(result.criterionResults))return null;
  const marks=new Map();
  let earned=0,maximum=0;
  for(const part of result.criterionResults){
    const id=part?.criterionId;
    const value=Number(part?.suggestedMarks);
    const ceiling=Number(part?.maxMarks);
    if(typeof id!=="string"||!id||marks.has(id)||
      part?.resolved!==true||part.suggestedMarks==null||part.maxMarks==null||
      !Number.isFinite(value)||!Number.isFinite(ceiling)||
      ceiling<=0||value<0||value>ceiling)return null;
    marks.set(id,value);
    earned+=value;maximum+=ceiling;
  }
  if(!marks.size||Math.abs(earned-verified.score)>1e-7||
    Math.abs(maximum-verified.maxMarks)>1e-7)return null;
  return marks;
}
