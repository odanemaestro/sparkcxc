import {createShadowPaper2Grader,runShadowPaper2Job} from "./shadowPaper2WorkerV2";
const id="11111111-1111-4111-8111-111111111111";
const attempt="22222222-2222-4222-8222-222222222222";
const token="33333333-3333-4333-8333-333333333333";
const submission={attemptId:attempt,subjectId:"chemistry",paperId:"paper1",
 rubricVersion:"rubric-v1",criteria:[{id:"q1",maxMarks:2,acceptedPhrases:["vasodilation"]}],
 responses:{q1:"vasodilation"},responseSnapshotHash:"hash"};
test("shadow grader identifies evidence yet leaves marks unresolved",async()=>{
 const grade=createShadowPaper2Grader({load:jest.fn(async()=>submission)});
 const r=await grade({attemptId:attempt,rubricVersion:"rubric-v1"});
 expect(r.advisoryCount).toBe(1);
 expect(r.reconciliation.confirmedMarks).toBe(0);
 expect(r.reconciliation.unresolvedMarks).toBe(2);
 expect(r.serverAttested).toBe(false);
});
test("rejects mismatched submission identity",async()=>{
 const grade=createShadowPaper2Grader({load:async()=>({...submission,attemptId:id})});
 await expect(grade({attemptId:attempt,rubricVersion:"rubric-v1"})).rejects.toThrow("identity");
});
test("integrated worker runs stored rubric then persists only provisional state",async()=>{
 const db={query:jest.fn(async(sql)=>{
  if(sql.includes("claim_marking_job_v2"))return {rows:[{
    job_id:id,attempt_id:attempt,rubric_version:"rubric-v1",attempts:1,lease_token:token
  }]};
  if(sql.includes("from public.spark_exam_attempts"))return {rows:[{
    id:attempt,subject_id:"chemistry",paper_id:"paper1",rubric_version:"rubric-v1",
    criteria:submission.criteria,response_snapshot:submission.responses,response_snapshot_hash:"hash"
  }]};
  if(sql.includes("finish_marking_job_v2"))return {rows:[{accepted:true}]};
  throw Error("Unexpected SQL");
 })};
 const result=await runShadowPaper2Job({db,jobId:id});
 expect(result.status).toBe("provisional");
 const finish=db.query.mock.calls.find(([sql])=>sql.includes("finish_marking_job_v2"));
 expect(finish[1][2]).toBe("provisional");
 expect(JSON.parse(finish[1][4]).unresolvedMarks).toBe(2);
});
test("unknown rubric never gets a verified status",async()=>{
 const db={query:jest.fn(async(sql)=>{
  if(sql.includes("claim_marking_job_v2"))return {rows:[{
    job_id:id,attempt_id:attempt,rubric_version:"rubric-v1",attempts:1,lease_token:token
  }]};
  if(sql.includes("finish_marking_job_v2"))return {rows:[{accepted:true}]};
  return {rows:[]};
 })};
 const r=await runShadowPaper2Job({db,jobId:id});
 expect(r.status).toBe("retry");
});
