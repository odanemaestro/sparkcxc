import {processGradingJob,classifyGradingResult,validateGradingJob} from "./gradingJobRunnerV2";
const job={id:"job_12345678",attemptId:"attempt_12345",rubricVersion:"rubric_12345",status:"running",attempts:1};
const fixture=()=>({
 claim:jest.fn(async()=>({job,token:"lease_12345678"})),
 commit:jest.fn(async()=>{}),retry:jest.fn(async()=>{})
});
test("completed local marks stay provisional without server attestation",async()=>{
 const store=fixture();
 const grader=jest.fn(async()=>({reconciliation:{confirmedMarks:5,unresolvedMarks:0}}));
 const result=await processGradingJob({store,grader,jobId:job.id});
 expect(result.status).toBe("provisional");
 expect(store.commit.mock.calls[0][2].status).toBe("provisional");
});
test("unresolved marks remain provisional even with server attestation",async()=>{
 const r=classifyGradingResult({serverAttested:true,reconciliation:{confirmedMarks:2,unresolvedMarks:3}});
 expect(r.status).toBe("provisional");
});
test("job lease required and no claim is a no-op",async()=>{
 const store=fixture();store.claim.mockResolvedValue(null);
 expect(await processGradingJob({store,grader:async()=>{},jobId:job.id})).toEqual({status:"not-claimed"});
 expect(store.commit).not.toHaveBeenCalled();
});
test("worker errors retry without storing raw response data",async()=>{
 const store=fixture();
 const result=await processGradingJob({store,grader:async()=>{throw new Error("SECRET-ESSAY");},jobId:job.id});
 expect(result.status).toBe("retry");
 expect(JSON.stringify(store.retry.mock.calls)).not.toContain("SECRET-ESSAY");
});
test("max attempts stops retrying",async()=>{
 const store=fixture();store.claim.mockResolvedValue({job:{...job,attempts:3},token:"lease_12345678"});
 const r=await processGradingJob({store,grader:async()=>{throw Error("bad");},jobId:job.id,maxAttempts:3});
 expect(r.status).toBe("failed");
});
test("invalid IDs and job state are rejected",()=>{
 expect(()=>validateGradingJob({...job,status:"published"})).toThrow();
 expect(()=>validateGradingJob({...job,id:"x"})).toThrow();
});

test("commit failure never retries a superseded lease or claims success",async()=>{
 const store=fixture();
 store.commit.mockRejectedValue(new Error("Grading lease expired or superseded"));
 await expect(processGradingJob({store,grader:async()=>({
  reconciliation:{confirmedMarks:1,unresolvedMarks:0}
 }),jobId:job.id})).rejects.toThrow("lease expired");
 expect(store.retry).not.toHaveBeenCalled();
});
test("failed grader result commits failure, never publishes",async()=>{
 const store=fixture();
 const result=await processGradingJob({store,grader:async()=>({invalid:true}),jobId:job.id});
 expect(result.status).toBe("failed");
 expect(store.commit.mock.calls[0][2]).toMatchObject({status:"failed",result:null});
});
