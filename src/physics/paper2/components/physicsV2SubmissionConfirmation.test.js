import {confirmPhysicsV2Submission} from "./physicsV2SubmissionConfirmation";
import {readServerExamV2Result,submitServerExamAttempt} from "../../../grading/serverExamAttempt";

jest.mock("../../../grading/serverExamAttempt",()=>({
 readServerExamV2Result:jest.fn(),
 submitServerExamAttempt:jest.fn()
}));
const inputs={supabase:{rpc:jest.fn()},attemptId:"attempt-42",paperId:"spark-phy-p02-practice-1",
 responses:{"phy-p2-1-q1::c":{answer:"2400 kPa cm³"}},maxMarks:100,
 provenance:{rubric_version:"source-shape-draft-v2"}};
beforeEach(()=>{
 jest.clearAllMocks();
 submitServerExamAttempt.mockResolvedValue({available:true,attempt_id:"attempt-42",submitted_at:"2026-10-23T05:00:00Z"});
 readServerExamV2Result.mockResolvedValue({available:true,attemptId:"attempt-42",status:"queued"});
});
test("waits for submission receipt and V2 queued status before confirming",async()=>{
 const out=await confirmPhysicsV2Submission(inputs);
 expect(out.status).toBe("confirmed");
 expect(out.result.status).toBe("queued");
 expect(submitServerExamAttempt).toHaveBeenCalledWith(expect.objectContaining({
  supabase:inputs.supabase,attemptId:inputs.attemptId,
  responses:inputs.responses,score:null,maxScore:100
 }));
 expect(readServerExamV2Result).toHaveBeenCalledTimes(1);
});
test.each([
 {available:false},
 {available:true,attempt_id:"another-attempt",submitted_at:"2026-10-23T05:00:00Z"},
 {available:true,attempt_id:"attempt-42"}
])("never polls or confirms after missing/unmatched submission receipt %j",async ack=>{
 submitServerExamAttempt.mockResolvedValue(ack);
 expect(await confirmPhysicsV2Submission(inputs)).toEqual({status:"failed"});
 expect(readServerExamV2Result).not.toHaveBeenCalled();
});
test("unknown queue status does not report a verified result",async()=>{
 readServerExamV2Result.mockResolvedValue({available:true,attemptId:"attempt-42",status:"not-eligible"});
 expect(await confirmPhysicsV2Submission(inputs)).toEqual({status:"not-eligible"});
});
test("unavailable queue status keeps submitted answers and offers a status recheck",async()=>{
 readServerExamV2Result.mockResolvedValue({available:false});
 expect(await confirmPhysicsV2Submission(inputs)).toEqual({status:"checking"});
 readServerExamV2Result.mockResolvedValue({available:true,attemptId:"attempt-42",status:"running"});
 expect((await confirmPhysicsV2Submission({...inputs,checkOnly:true})).status).toBe("confirmed");
 expect(submitServerExamAttempt).toHaveBeenCalledTimes(1);
});
test("a check-only retry never resubmits an already received paper",async()=>{
 expect((await confirmPhysicsV2Submission({...inputs,checkOnly:true})).status).toBe("confirmed");
 expect(submitServerExamAttempt).not.toHaveBeenCalled();
});
test("rejects other attempt's queue result",async()=>{
 readServerExamV2Result.mockResolvedValue({available:true,attemptId:"wrong",status:"verified",score:100});
 expect((await confirmPhysicsV2Submission(inputs)).status).toBe("checking");
});
test("accepts completed and provisional queue outcomes without claiming a final score",async()=>{
 for(const status of ["retry","verified","provisional","failed"]){
  readServerExamV2Result.mockResolvedValue({available:true,attemptId:"attempt-42",status});
  expect((await confirmPhysicsV2Submission(inputs)).status).toBe("confirmed");
 }
});
