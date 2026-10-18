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
 if(!result||typeof result!=="object"||!result.reconciliation||
    !Number.isFinite(result.reconciliation.unresolvedMarks)||
    !Number.isFinite(result.reconciliation.confirmedMarks))
   return {status:"failed",reason:"invalid-grader-output"};
 if(result.reconciliation.unresolvedMarks>0)
   return {status:"provisional",reason:"unresolved-criteria"};
 // A local pass is not sufficient for a verified server result.
 if(result.serverAttested!==true)
   return {status:"provisional",reason:"missing-server-attestation"};
 return {status:"verified",reason:"server-attested"};
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
 try{
  if(job.attempts>maxAttempts){
    await store.commit(job.id,lease.token,{status:"failed",reason:"retry-limit-exceeded"});
    return {status:"failed"};
  }
  // The grader must independently fetch the submitted response and rubric
  // from trusted storage. Never pass caller-owned scores or rubric decisions.
  const output=await grader({attemptId:job.attemptId,rubricVersion:job.rubricVersion});
  const outcome=classifyGradingResult(output);
  await store.commit(job.id,lease.token,{
    ...outcome,
    // No client-provided verified score is persisted by this orchestrator.
    result:outcome.status==="failed"?null:output.reconciliation
  });
  return outcome;
 }catch(error){
  const terminal=job.attempts>=maxAttempts;
  // Avoid persisting sensitive student responses or external service errors.
  await store.retry(job.id,lease.token,{
   status:terminal?"failed":"retry",
   reason:"worker-execution-error"
  });
  return {status:terminal?"failed":"retry",reason:"worker-execution-error"};
 }
}
