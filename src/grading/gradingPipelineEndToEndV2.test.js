import {createGradingSubmissionRepository} from "./gradingSubmissionRepositoryV2";
import {runShadowPaper2Job} from "./shadowPaper2WorkerV2";

const jobId="11111111-1111-4111-8111-111111111111";
const attemptId="22222222-2222-4222-8222-222222222222";
const leaseId="33333333-3333-4333-8333-333333333333";
function harness({missingRubric=false,expiredLease=false}={}){
 const state={status:"queued",attempts:0,commits:[],reads:0};
 const db={query:jest.fn(async(sql,params)=>{
  if(sql.includes("enqueue_marking_job_v2")){
   if(missingRubric)throw Error("No active server rubric");
   return {rows:[{job_id:jobId}]};
  }
  if(sql.includes("claim_marking_job_v2")){
   if(state.status!=="queued"&&state.status!=="retry")return {rows:[]};
   state.status="running";state.attempts++;
   return {rows:[{job_id:jobId,attempt_id:attemptId,rubric_version:"v1",
     attempts:state.attempts,lease_token:leaseId}]};
  }
  if(sql.includes("from public.spark_exam_attempts")){
   state.reads++;
   if(missingRubric)return {rows:[]};
   return {rows:[{id:attemptId,subject_id:"chemistry",paper_id:"practice-a",
     rubric_version:"v1",response_snapshot:{q1:"evaporation"},
     response_snapshot_hash:"stored-hash",
     criteria:[{id:"q1",maxMarks:2,acceptedPhrases:["evaporation"]}]}]};
  }
  if(sql.includes("finish_marking_job_v2")){
   state.commits.push(params);
   if(expiredLease)return {rows:[{accepted:false}]};
   state.status=params[2];
   return {rows:[{accepted:true}]};
  }
  throw Error("Unexpected SQL");
 })};
 return {db,state};
}
test("submitted attempt flows through enqueue, claim, trusted lookup and provisional storage",async()=>{
 const {db,state}=harness();
 const repository=createGradingSubmissionRepository(db);
 expect(await repository.enqueue(attemptId)).toBe(jobId);
 const result=await runShadowPaper2Job({db,jobId});
 expect(result.status).toBe("provisional");
 expect(state.reads).toBe(1);
 expect(state.status).toBe("provisional");
 expect(state.commits).toHaveLength(1);
 const stored=JSON.parse(state.commits[0][4]);
 expect(stored.maxMarks).toBe(2);
 expect(stored.confirmedMarks).toBe(0);
 expect(stored.unresolvedMarks).toBe(2);
 expect(db.query.mock.calls.every(([sql])=>!sql.toLowerCase().includes("update public.spark_exam_attempts"))).toBe(true);
});
test("completed job is not claimed again or double-committed",async()=>{
 const {db,state}=harness();
 await runShadowPaper2Job({db,jobId});
 expect(await runShadowPaper2Job({db,jobId})).toEqual({status:"not-claimed"});
 expect(state.commits).toHaveLength(1);
});
test("expired lease rejects result and does not publish a score",async()=>{
 const {db,state}=harness({expiredLease:true});
 await expect(runShadowPaper2Job({db,jobId})).rejects.toThrow("lease expired");
 expect(state.commits).toHaveLength(1);
 expect(state.commits[0][2]).toBe("provisional");
});
test("unapproved rubric rejects enqueue and never produces a score",async()=>{
 const {db,state}=harness({missingRubric:true});
 await expect(createGradingSubmissionRepository(db).enqueue(attemptId))
   .rejects.toThrow("No active server rubric");
 expect(state.commits).toHaveLength(0);
});
