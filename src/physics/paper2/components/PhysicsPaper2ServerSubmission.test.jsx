import React from "react";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
import PhysicsPaper2Exam from "./PhysicsPaper2Exam";
import {confirmPhysicsV2Submission} from "./physicsV2SubmissionConfirmation";
import {getPhysicsPaper2Paper} from "../physicsPaper2Bank";
import {markPhysicsPaper2,modelResponsesForPhysicsPaper2} from "../physicsPaper2Marking";

jest.mock("../../../practice/MathText",()=>({children})=><span>{children}</span>);
jest.mock("../../../practice/Paper2ResponseInput",()=>()=>null);
jest.mock("./PhysicsGraphWorking",()=>()=>null);
jest.mock("../../../lib/supabaseClient",()=>({supabase:{rpc:jest.fn()}}));
jest.mock("../../../grading/V2VerifiedScore",()=>()=>(
 <span data-testid="confirmed-server-poll">Server polling started</span>
));
jest.mock("./physicsV2SubmissionConfirmation",()=>({
 confirmPhysicsV2Submission:jest.fn()
}));
jest.mock("../physicsPaper2Marking",()=>({
 markPhysicsPaper2:jest.fn(()=>({marks:42,of:100,criteria:[]})),
 modelResponsesForPhysicsPaper2:jest.fn(()=>({}))
}));
jest.mock("../physicsPaper2Bank",()=>({
 ...jest.requireActual("../physicsPaper2Bank"),
 getPhysicsPaper2Paper:jest.fn()
}));
const paper={
 paper_id:"spark-phy-p02-practice-1",marks:100,
 questions:[{question_id:"phy-p2-1-q1",question_number:1,marks:100,
  section:"I",topic:"Graph",stem:"Read the graph",
  parts:[{id:"a",label:"(a)",prompt:"State a value",marks:100,
   answerType:"text",criteria:[]}]}]
};
const snapshot={"phy-p2-1-q1::a":{answer:"saved answer"}};
const active=status=>({
 paperId:"spark-phy-p02-practice-1",phase:"review",
 resultId:"result-1",serverAttemptId:"test-attempt-1",
 serverSubmissionStatus:status,
 submittedAt:"2026-10-23T05:01:00Z",startedAt:"2026-10-23T02:00:00Z",
 endsAt:Date.now()-30000,responses:snapshot,currentIndex:0
});
const restore=status=>window.localStorage.setItem(
 "spark-physics-paper2-active-v1:student-1",JSON.stringify(active(status)));
beforeEach(()=>{
 // Jest uses resetMocks:true, so inline jest.fn implementations need restoring
 // before every test. A missing getPhysicsPaper2Paper implementation would
 // otherwise render the library instead of the saved review.
 getPhysicsPaper2Paper.mockReturnValue(paper);
 markPhysicsPaper2.mockReturnValue({marks:42,of:100,criteria:[]});
 modelResponsesForPhysicsPaper2.mockReturnValue({});
 window.localStorage.clear();
 window.localStorage.setItem("spark-physics-paper2-results-v1:student-1",
  JSON.stringify([{id:"result-1",attemptProvenance:{bank_version:"physics-paper2-v1"}}]));
});
test("failed upload offers retry, preserves answers, hides marking poll until acknowledged",async()=>{
 restore("failed");
 confirmPhysicsV2Submission.mockResolvedValue({
  status:"confirmed",result:{available:true,attemptId:"test-attempt-1",status:"queued"}
 });
 render(<PhysicsPaper2Exam userId="student-1" onBack={()=>{}}/>);
 expect(screen.getByText(/couldn't confirm that your paper reached/i)).toBeTruthy();
 expect(screen.queryByTestId("confirmed-server-poll")).toBeNull();
 fireEvent.click(screen.getByRole("button",{name:"Retry server submission"}));
 await waitFor(()=>expect(screen.getByTestId("confirmed-server-poll")).toBeTruthy());
 expect(confirmPhysicsV2Submission).toHaveBeenCalledWith(expect.objectContaining({
  attemptId:"test-attempt-1",paperId:"spark-phy-p02-practice-1",
  responses:snapshot,maxMarks:100
 }));
});
test("already-confirmed submission displays verified result polling",()=>{
 restore("confirmed");
 render(<PhysicsPaper2Exam userId="student-1" onBack={()=>{}}/>);
 expect(screen.getByTestId("confirmed-server-poll")).toBeTruthy();
 expect(confirmPhysicsV2Submission).not.toHaveBeenCalled();
});
test("reload of in-flight submission becomes recoverable retry, never silently polled",()=>{
 restore("submitting");
 render(<PhysicsPaper2Exam userId="student-1" onBack={()=>{}}/>);
 expect(screen.getByRole("button",{name:"Retry server submission"})).toBeTruthy();
 expect(screen.queryByTestId("confirmed-server-poll")).toBeNull();
});
test("received paper with unknown queue offers status-only check, not resubmission",async()=>{
 restore("checking");
 confirmPhysicsV2Submission.mockResolvedValue({status:"not-eligible"});
 render(<PhysicsPaper2Exam userId="student-1" onBack={()=>{}}/>);
 fireEvent.click(screen.getByRole("button",{name:"Check server submission"}));
 await waitFor(()=>expect(screen.getByText(/not accepted for V2 marking/i)).toBeTruthy());
 expect(confirmPhysicsV2Submission).toHaveBeenCalledWith(expect.objectContaining({
  checkOnly:true
 }));
 expect(screen.queryByTestId("confirmed-server-poll")).toBeNull();
});
