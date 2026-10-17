import React from "react";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
import {POB_HISTORICAL_REVIEW_BANKS,getPobHistoricalReviewBank} from "../data/pobHistoricalArchiveRegistry";
import PobHistoricalArchive from "./PobHistoricalArchive";

beforeEach(()=>{window.localStorage.clear();window.scrollTo=jest.fn()});
afterEach(()=>{window.localStorage.clear()});

test("all 46 historical sources load: 20 Paper 1 and 26 Paper 2, one unique source per bank",()=>{
 const all=POB_HISTORICAL_REVIEW_BANKS;
 expect(all).toHaveLength(46);
 expect(all.filter(r=>r.paper===1)).toHaveLength(20);
 expect(all.filter(r=>r.paper===2)).toHaveLength(26);
 expect(new Set(all.map(r=>r.id)).size).toBe(46);
 for(const record of all){
  expect(record.bank.id).toBe(record.source.id);
  expect(record.bank.sourceSha256).toBe(record.source.sourceSha256);
  expect(Array.isArray(record.bank.questions)||Array.isArray(record.bank.entries)||Array.isArray(record.bank.proposedEntries)).toBe(true);
 }
 expect(getPobHistoricalReviewBank("POB-P2-2019-MJ-ALT").source.reclassifiedFromPaper1).toBe(true);
});
test("renders whole searchable archive and opens a past Paper 1 answer sheet",()=>{
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 expect(screen.getByText(/46 source papers shown/)).toBeTruthy();
 fireEvent.change(screen.getByLabelText("Paper type"),{target:{value:"1"}});
 expect(screen.getByText(/20 source papers shown/)).toBeTruthy();
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2023"}});
 fireEvent.click(screen.getByRole("button",{name:/2023 January.*Answer-sheet and explanations/}));
 expect(screen.getByText(/Paper 1 · Answer-sheet practice/)).toBeTruthy();
 expect(screen.getByText(/60 numbered slots/)).toBeTruthy();
 fireEvent.click(screen.getByRole("button",{name:"Check answers against SPARK key"}));
 expect(screen.getByText(/Provisional score:/)).toBeTruthy();
});
test("2018 scan gap is visible and never marked wrong",()=>{
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2018"}});
 fireEvent.click(screen.getByRole("button",{name:/2018 May\/June.*Paper 1.*Answer-sheet and explanations/}));
 expect(screen.getAllByText(/omits original questions 53–57|Not present in the supplied source scan/).length).toBeGreaterThan(0);
});
test("historical Paper 2 allows written answers and shows actual authored rubrics without a fake score",()=>{
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2005"}});
 fireEvent.click(screen.getByRole("button",{name:/2005 May\/June.*Paper 2.*Written answers and mark schemes/}));
 expect(screen.getByText(/Paper 2 · Written-answer practice/)).toBeTruthy();
 const entry=screen.getAllByRole("textbox")[0];
 fireEvent.change(entry,{target:{value:"A registered company follows national company law."}});
 fireEvent.click(screen.getByRole("button",{name:"Submit responses and view marking scheme"}));
 expect(screen.getAllByText(/SPARK model answer/).length).toBeGreaterThan(0);
 expect(screen.getByText(/Automatic numerical marking for this historical sitting is not yet connected/)).toBeTruthy();
});
test("January 2026 archive route goes to the already implemented live pilot exam",()=>{
 const open=jest.fn();
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={open}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2026"}});
 fireEvent.click(screen.getByRole("button",{name:/2026 January.*Paper 2.*Written answers and mark schemes/}));
 fireEvent.click(screen.getByRole("button",{name:"Open timed January 2026 Paper 2"}));
 expect(open).toHaveBeenCalledTimes(1);
});

test("older Paper 2 accepts valid option selections and requests server-only provisional examiner scoring",async()=>{
 const old1=process.env.REACT_APP_SERVER_MARKING;
 const old2=process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING;
 process.env.REACT_APP_SERVER_MARKING="true";
 process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING="true";
 try{
  const rpc=jest.fn(async(name)=>{
   if(name==="spark_start_exam_attempt")return {data:[{attempt_id:"historical-written-attempt"}],error:null};
   if(name==="spark_submit_exam_attempt")return {data:[{attempt_id:"historical-written-attempt"}],error:null};
   if(name==="spark_enqueue_marking")return {data:{id:"historical-job",status:"queued"},error:null};
   throw Error("Unexpected RPC "+name);
  });
  render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}
    userId="historical-writer" supabase={{rpc}}/>);
  fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2005"}});
  fireEvent.click(screen.getByRole("button",{name:/2005 May\/June.*Paper 2.*Written answers and mark schemes/}));
  expect(screen.getByText(/Question 4 or 5/)).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Question 4 or 5"),{target:{value:"5"}});
  fireEvent.change(screen.getAllByRole("textbox")[0],{target:{value:"A lawful organisation must be registered."}});
  fireEvent.click(screen.getByRole("button",{name:"Submit responses and view marking scheme"}));
  fireEvent.click(screen.getByRole("button",{name:"Request detailed AI practice marking"}));
  await waitFor(()=>expect(rpc).toHaveBeenCalledWith("spark_start_exam_attempt",
    expect.objectContaining({p_bank_version:"pob-archive-v1-pob-p2-2005-mj",
       p_metadata:expect.objectContaining({
        paper_id:"POB-P2-2005-MJ",selected_questions:[1,2,3,5,6,8]
       })})));
  await waitFor(()=>expect(rpc).toHaveBeenCalledWith("spark_submit_exam_attempt",
    expect.objectContaining({p_score:null,p_max_score:100,
      p_response_snapshot:expect.objectContaining({
       "POB-P2-2005-MJ:Q1:a":"A lawful organisation must be registered."
      })})));
  await waitFor(()=>expect(rpc).toHaveBeenCalledWith("spark_enqueue_marking",
    {p_attempt_id:"historical-written-attempt"}));
 }finally{
  if(old1===undefined)delete process.env.REACT_APP_SERVER_MARKING;
  else process.env.REACT_APP_SERVER_MARKING=old1;
  if(old2===undefined)delete process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING;
  else process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING=old2;
 }
});
