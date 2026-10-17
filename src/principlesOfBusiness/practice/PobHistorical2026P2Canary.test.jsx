import React from "react";
import {fireEvent,render,screen,waitFor} from "@testing-library/react";
import PobPracticeHub from "./PobPracticeHub";

const oldHistorical=process.env.REACT_APP_POB_HISTORICAL_JAN2026_MARKING;
const oldMarking=process.env.REACT_APP_SERVER_MARKING;
beforeEach(()=>{
  window.localStorage.clear();
  window.scrollTo=jest.fn();
  process.env.REACT_APP_POB_HISTORICAL_JAN2026_MARKING="true";
  process.env.REACT_APP_SERVER_MARKING="true";
});
afterEach(()=>{
  if(oldHistorical===undefined)delete process.env.REACT_APP_POB_HISTORICAL_JAN2026_MARKING;
  else process.env.REACT_APP_POB_HISTORICAL_JAN2026_MARKING=oldHistorical;
  if(oldMarking===undefined)delete process.env.REACT_APP_SERVER_MARKING;
  else process.env.REACT_APP_SERVER_MARKING=oldMarking;
  window.localStorage.clear();
});

test("authorized client canary submits exact historical bank and source while never injecting a grade",async()=>{
 const rpc=jest.fn(async(name,args)=>{
  if(name==="spark_start_exam_attempt")return {data:[{attempt_id:"canary-qa-attempt",deadline_at:"2026-11-01T12:00:00Z",server_now:"2026-11-01T10:00:00Z"}],error:null};
  if(name==="spark_submit_exam_attempt")return {data:[{attempt_id:"canary-qa-attempt"}],error:null};
  if(name==="spark_enqueue_marking")return {data:{id:"canary-job",status:"queued"},error:null};
  throw new Error("Unexpected database request "+name);
 });
 render(<PobPracticeHub userId="canary-qa" supabase={{rpc}}/>);
 fireEvent.click(screen.getByRole("button",{name:"Preview historical Paper 2"}));
 expect(screen.getByText(/limited server-side practice marking check/)).toBeTruthy();
 fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
 await waitFor(()=>expect(rpc).toHaveBeenCalledWith("spark_start_exam_attempt",expect.objectContaining({
  p_subject_id:"principles-of-business",p_paper:"02",
  p_bank_version:"pob-historical-2026-jan-p2-v1",
  p_rubric_version:"pob-historical-2026-jan-p2-rubric-v1",
  p_metadata:expect.objectContaining({
   paper_id:"POB-P2-2026-JAN",
   source_sha256:"0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581"
  })
 })));
 fireEvent.change(screen.getAllByRole("textbox")[0],{target:{value:"Accountant, auditor and business analyst."}});
 fireEvent.click(screen.getByRole("button",{name:"Submit Paper 2"}));
 fireEvent.click(screen.getByRole("button",{name:"Submit responses"}));
 await waitFor(()=>expect(rpc).toHaveBeenCalledWith("spark_submit_exam_attempt",expect.objectContaining({
  p_attempt_id:"canary-qa-attempt",p_score:null,p_max_score:100,
  p_response_snapshot:expect.objectContaining({
   "POB-P2-2026-JAN:Q1:a":"Accountant, auditor and business analyst."
  })
 })));
 await waitFor(()=>expect(rpc).toHaveBeenCalledWith("spark_enqueue_marking",{
  p_attempt_id:"canary-qa-attempt"
 }));
 expect(screen.queryByText(/100 \/ 100/)).toBeNull();
});

test("historical server flag alone never enqueues when general online marking is disabled",()=>{
 process.env.REACT_APP_SERVER_MARKING="false";
 const rpc=jest.fn();
 render(<PobPracticeHub userId="canary-closed" supabase={{rpc}}/>);
 fireEvent.click(screen.getByRole("button",{name:"Preview historical Paper 2"}));
 fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
 expect(rpc).not.toHaveBeenCalled();
});
