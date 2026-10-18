/**
 * Server-side Batch 4 grading job runner.
 * Dependency-injected storage and grader. NOT a browser or publication API.
 * The store implementation must enforce atomic leases, ownership, and retries.
 */
const allowedStates=new Set(["queued","retry","running","verified","provisional","failed"]);
const validId=value=>typeof value==="string"&&/^[a-zA-Z0-9_-]{8,128}$/.test(value);
export const JOB_RUNNER_V2_VERSION="grading-job-runner-v2";
export function validateGradingJob(job){
 if(!job||typeof job!=="object"||!validId(job.id)||
    !validId(job.attemptId)||!validId(job.rubricVersion)||
    !allowedStates.has(job.status)||!Number.isInteger(job.attempts)||
    job.attempts<0||job.attempts>10)
  throw new TypeError("Invalid grading job");
 return job;
}
export function classifyGradingResult(result){
 const rec=result?.reconciliation;
 if(!rec||typeof rec!=="object"||
    !Number.isFinite(rec.unresolvedMarks)||rec.unresolvedMarks<0||
    !Number.isFinite(rec.confirmedMarks)||rec.confirmedMarks<0||
    !Number.isFinite(rec.maxMarks)||rec.maxMarks<=0||
    rec.confirmedMarks+rec.unresolvedMarks>rec.maxMarks+1e-8||
    !Array.isArray(rec.parts)||rec.parts.length===0)
   return {status:"failed",reason:"invalid-grader-output"};
 if(result.reconciliation.unresolvedMarks>0)
   return {status:"provisional",reason:"unresolved-criteria"};
 // A local pass is not sufficient for a verified server result.
 return {status:"provisional",reason:"awaiting-independent-server-verification"};
}
/**
 * store.claim() must be transactional: one runner receives a lease per job.
 * store.commit() must condition on job ID AND lease token, preventing stale
 * runners from overwriting a newer result. Nothing here writes final scores.
 */
export async function processGradingJob({store,grader,jobId,maxAttempts=3}={}){
 if(!store?.claim||!store?.commit||!store?.retry||typeof grader!=="function"||
    !validId(jobId)||!Number.isInteger(maxAttempts)||maxAttempts<1||maxAttempts>10)
   throw new TypeError("Invalid grading worker dependencies");
 const lease=await store.claim(jobId);
 if(!lease)return {status:"not-claimed"};
 const job=validateGradingJob(lease.job);
 if(job.id!==jobId||!validId(lease.token)||job.status!=="running")
   throw new Error("Invalid lease");
 if(job.attempts>maxAttempts){
  await store.commit(job.id,lease.token,{status:"failed",reason:"retry-limit-exceeded"});
  return {status:"failed"};
 }
 let output;
 try{
  // The grader independently fetches submitted responses and server rubric.
  output=await grader({attemptId:job.attemptId,rubricVersion:job.rubricVersion});
 }catch(error){
  const terminal=job.attempts>=maxAttempts;
  await store.retry(job.id,lease.token,{
   status:terminal?"failed":"retry",reason:"worker-execution-error"
  });
  return {status:terminal?"failed":"retry",reason:"worker-execution-error"};
 }
 const outcome=classifyGradingResult(output);
 // A failed final commit is a lease/DB error, not a grading error.
 // Never retry with a lost token or report successful persistence.
 await store.commit(job.id,lease.token,{
  ...outcome,
  result:outcome.status==="failed"?null:output.reconciliation
 });
 return outcome;
}
