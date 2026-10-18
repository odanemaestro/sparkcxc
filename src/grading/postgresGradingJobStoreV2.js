/**
 * Server-only PostgreSQL storage adapter for gradingJobRunnerV2.
 * db.query(sql, params) MUST use parameter binding and a trusted DB role.
 * No browser build should import this module.
 */
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const checkUuid=x=>{if(typeof x!=="string"||!uuid.test(x))throw new TypeError("Invalid UUID");return x;};
const validStatus=new Set(["retry","provisional","failed"]);
export function createPostgresGradingJobStore(db){
 if(typeof db?.query!=="function")throw new TypeError("PostgreSQL query adapter required");
 const claim=async(jobId)=>{
  checkUuid(jobId);
  const {rows=[]}=await db.query(
   "select * from spark_grading_private.claim_marking_job_v2($1::uuid)",[jobId]);
  const row=rows[0];
  if(!row)return null;
  return {token:checkUuid(row.lease_token),job:{
    id:checkUuid(row.job_id),attemptId:checkUuid(row.attempt_id),
    rubricVersion:row.rubric_version,status:"running",attempts:row.attempts
  }};
 };
 const finish=async(jobId,token,outcome)=>{
  checkUuid(jobId);checkUuid(token);
  if(!validStatus.has(outcome?.status))throw new TypeError("Invalid completion status");
  const result=outcome.status==="provisional"?(outcome.result??null):null;
  const {rows=[]}=await db.query(
   "select spark_grading_private.finish_marking_job_v2($1::uuid,$2::uuid,$3::text,$4::text,$5::jsonb) as accepted",
   [jobId,token,outcome.status,String(outcome.reason??"").slice(0,100),
    result===null?null:JSON.stringify(result)]
  );
  if(rows[0]?.accepted!==true)throw new Error("Grading lease expired or superseded");
  return true;
 };
 return {
  claim,
  commit:finish,
  retry:(jobId,token,outcome)=>finish(jobId,token,{...outcome,result:null})
 };
}
