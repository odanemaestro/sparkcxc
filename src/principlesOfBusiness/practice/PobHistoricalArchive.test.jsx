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
test("January 2023 P1 is a real timed 60-item original source exam, not an answer sheet",()=>{
 const {container}=render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 expect(screen.getByText(/46 source papers shown/)).toBeInTheDocument();
 fireEvent.change(screen.getByLabelText("Paper type"),{target:{value:"1"}});
 expect(screen.getByText(/20 source papers shown/)).toBeInTheDocument();
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2023"}});
 fireEvent.click(screen.getByRole("button",{name:/2023 January.*Full 60-question source paper/}));
 expect(screen.getByText(/2023 January · Paper 1 examination/)).toBeInTheDocument();
 expect(screen.getByText(/All 60 question texts and four options from the supplied transcription/)).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Start 60-question Paper 1"}));
 expect(screen.getByText(/type of business environment MOST typical/)).toBeInTheDocument();
 expect(screen.getByText("mixed economy")).toBeInTheDocument();
 expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(60);
 fireEvent.click(screen.getByRole("button",{name:"Next question"}));
 expect(screen.getByText("Question 2 of 60")).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
 expect(screen.getByText(/Provisional answer comparison/)).toBeInTheDocument();
});
test("incomplete 2018 historical Paper 1 never presents anonymous A-D slots as a finished simulation",()=>{
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2018"}});
 fireEvent.click(screen.getByRole("button",{name:/2018 May\/June.*Paper 1.*Answer-key reference/}));
 expect(screen.getByText(/Paper 1 · Source-text incomplete/)).toBeInTheDocument();
 expect(screen.getByText(/An answer key alone is not a simulated examination/)).toBeInTheDocument();
 expect(screen.getByText(/Use optional answer sheet with your own original paper/)).toBeInTheDocument();
});
test("2018 scan gap is visible and never marked wrong",()=>{
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2018"}});
 fireEvent.click(screen.getByRole("button",{name:/2018 May\/June.*Paper 1.*Answer-key reference/}));
 expect(screen.getByText(/omits original questions 53–57/)).toBeInTheDocument();
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
 expect(screen.getByText(/Question wording and worked solutions come from your uploaded Paper 2 transcription/)).toBeTruthy();
});
test("January 2026 archive route goes to the already implemented live pilot exam",()=>{
 const open=jest.fn();
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={open}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2026"}});
 fireEvent.click(screen.getByRole("button",{name:/2026 January.*Paper 2.*Written answers and mark schemes/}));
 fireEvent.click(screen.getByRole("button",{name:"Open timed January 2026 Paper 2"}));
 expect(open).toHaveBeenCalledTimes(1);
});

test("older source transcription supports optional questions without enabling uncalibrated AI scoring",()=>{
 const old1=process.env.REACT_APP_SERVER_MARKING;
 const old2=process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING;
 process.env.REACT_APP_SERVER_MARKING="true";
 process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING="true";
 try{
  const rpc=jest.fn();
  render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}
   userId="historical-writer" supabase={{rpc}}/>);
  fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2005"}});
  fireEvent.click(screen.getByRole("button",{name:/2005 May\/June.*Paper 2.*Written answers and mark schemes/}));
  fireEvent.change(screen.getByLabelText("Question 4 or 5"),{target:{value:"5"}});
  fireEvent.change(screen.getAllByRole("textbox")[0],{target:{value:"A lawful organisation must be registered."}});
  fireEvent.click(screen.getByRole("button",{name:"Submit responses and view marking scheme"}));
  expect(screen.queryByRole("button",{name:"Request detailed AI practice marking"})).not.toBeInTheDocument();
  expect(screen.getAllByText(/SPARK model answer/).length).toBeGreaterThan(0);
  expect(rpc.mock.calls.filter(([name])=>name==="spark_start_exam_attempt"||name==="spark_submit_exam_attempt")).toHaveLength(0);
 }finally{
  if(old1===undefined)delete process.env.REACT_APP_SERVER_MARKING;
  else process.env.REACT_APP_SERVER_MARKING=old1;
  if(old2===undefined)delete process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING;
  else process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING=old2;
 }
});

test("Batch 1 historical Paper 1 opens as a full 60-question simulated exam with stem and actual A–D choices",()=>{
 const {container}=render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2002"}});
 fireEvent.click(screen.getByRole("button",{name:/2002 May\/June.*Paper 1.*60-question text practice/}));
 expect(screen.getByText(/2002 May\/June · Paper 1 examination/)).toBeInTheDocument();
 expect(screen.getByText(/60 transcribed questions/)).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Start 60-question Paper 1"}));
 expect(screen.getByText(/more than one type of economic system exists/)).toBeInTheDocument();
 expect(screen.getByText(/different methods can be used to solve the same economic problem/)).toBeInTheDocument();
 expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(60);
 fireEvent.click(screen.getByRole("button",{name:"Next question"}));
 expect(screen.getByText("Question 2 of 60")).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
 expect(screen.getByText(/Provisional answer comparison/)).toBeInTheDocument();
});
test("source-dependent diagrams are shown but explicitly excluded from provisional marking",()=>{
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2002"}});
 fireEvent.click(screen.getByRole("button",{name:/2002 May\/June.*Paper 1.*60-question text practice/}));
 fireEvent.click(screen.getByRole("button",{name:"Start 60-question Paper 1"}));
 fireEvent.click(screen.getByRole("button",{name:"39"}));
 expect(screen.getByText(/Original-source review pending/)).toBeInTheDocument();
 expect(screen.getByText(/excluded from the provisional score until checked/)).toBeInTheDocument();
});

test("Paper 1 timed attempt survives remount without granting a fresh timer",()=>{
 const props={onBack:jest.fn(),onOpenJanuary2026:jest.fn()};
 const first=render(<PobHistoricalArchive {...props}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2002"}});
 fireEvent.click(screen.getByRole("button",{name:/2002 May\/June.*Paper 1.*60-question text practice/}));
 fireEvent.click(screen.getByRole("button",{name:"Start 60-question Paper 1"}));
 const stored=JSON.parse(window.localStorage.getItem("spark:pob:source-questions:POB-P1-2002-MJ:attempt"));
 expect(stored.deadline).toBeGreaterThan(Date.now());
 fireEvent.click(screen.getByRole("button",{name:"2"}));
 fireEvent.click(screen.getByRole("button",{name:"Back to paper details"}));
 first.unmount();
 render(<PobHistoricalArchive {...props}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2002"}});
 fireEvent.click(screen.getByRole("button",{name:/2002 May\/June.*Paper 1.*60-question text practice/}));
 expect(screen.getByText("Question 1 of 60")).toBeInTheDocument();
 expect(screen.queryByRole("button",{name:"Start 60-question Paper 1"})).not.toBeInTheDocument();
 expect(JSON.parse(window.localStorage.getItem("spark:pob:source-questions:POB-P1-2002-MJ:attempt")).deadline).toBe(stored.deadline);
 fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
 expect(JSON.parse(window.localStorage.getItem("spark:pob:source-questions:POB-P1-2002-MJ:attempt")).review).toBe(true);
 fireEvent.click(screen.getByRole("button",{name:"Try again"}));
 expect(window.localStorage.getItem("spark:pob:source-questions:POB-P1-2002-MJ:attempt")).toBeNull();
});

test("approved owner supplied SVGs appear on historical Paper 1 questions",()=>{
 const {container}=render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2015"}});
 fireEvent.click(screen.getByRole("button",{name:/2015 May\/June.*Paper 1.*60-question text practice/}));
 fireEvent.click(screen.getByRole("button",{name:"Start 60-question Paper 1"}));
 fireEvent.click(screen.getByRole("button",{name:"10"}));
 const diagram=container.querySelector(".pob-source-diagram img");
 expect(diagram).toBeInTheDocument();
 expect(diagram.getAttribute("src")).toMatch(/^data:image\/svg\+xml/);
 expect(diagram).toHaveAttribute("alt","Diagram for question 10");
});

test("owner supplied 2015 historical Paper 2 shows real written prompts and worked answers after submission",()=>{
 render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2015"}});
 fireEvent.click(screen.getByRole("button",{name:/2015 May\/June.*Paper 2.*Written answers/}));
 expect(screen.getAllByText(/Define EACH of the following business concepts:/).length).toBeGreaterThan(0);
 expect(screen.getByText(/Owner-supplied numbered questions and detailed worked answers/)).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Submit responses and view marking scheme"}));
 expect(screen.getByText(/Profit is the amount by which a business/)).toBeInTheDocument();
 expect(screen.queryByRole("button",{name:/Request detailed AI practice marking/})).not.toBeInTheDocument();
});

test("January 2022 owner-source pilot submits only its versioned 100-mark bank",async()=>{
 const old1=process.env.REACT_APP_SERVER_MARKING,old2=process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING,old3=process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;
 process.env.REACT_APP_SERVER_MARKING="true";
 process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING="true";
 process.env.REACT_APP_POB_OWNER_SOURCE_MARKING="true";
 try{
  const rpc=jest.fn(async name=>{
   if(name==="spark_start_exam_attempt")return {data:[{attempt_id:"owner-source-pilot"}],error:null};
   if(name==="spark_submit_exam_attempt")return {data:[{attempt_id:"owner-source-pilot"}],error:null};
   return {data:null,error:null};
  });
  render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}
   userId="pob-pilot-tester" supabase={{rpc}}/>);
  fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2022"}});
  fireEvent.click(screen.getByRole("button",{name:/2022 January.*Paper 2.*Written answers and mark schemes/}));
  expect(screen.getByText(/source-aligned rubric for provisional practice assessment/)).toBeInTheDocument();
  fireEvent.change(screen.getAllByRole("textbox")[0],{target:{value:"To earn a profit and to help the community."}});
  fireEvent.click(screen.getByRole("button",{name:"Submit responses and view marking scheme"}));
  fireEvent.click(screen.getByRole("button",{name:"Request detailed AI practice marking"}));
  await waitFor(()=>expect(rpc).toHaveBeenCalledWith("spark_start_exam_attempt",
   expect.objectContaining({p_bank_version:"pob-archive-owner-v2-pob-p2-2022-jan",
    p_rubric_version:"pob-owner-historical-rubric-v2",
    p_metadata:expect.objectContaining({paper_id:"POB-P2-2022-JAN",owner_source_provisional:true})})));
 }finally{
  if(old1===undefined)delete process.env.REACT_APP_SERVER_MARKING;else process.env.REACT_APP_SERVER_MARKING=old1;
  if(old2===undefined)delete process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING;else process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING=old2;
  if(old3===undefined)delete process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;else process.env.REACT_APP_POB_OWNER_SOURCE_MARKING=old3;
 }
});

test("historical Paper 2 restores supplied SVG figures without authorizing figure grading",()=>{
 const {container}=render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
 fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2019"}});
 fireEvent.click(screen.getByRole("button",{name:/2019 January.*Paper 2.*Written answers and mark schemes/}));
 const img=container.querySelector('img[alt="Supplied figure for Question 3 (c)"]');
 expect(img).toBeInTheDocument();
 expect(img.getAttribute("src")).toMatch(/^data:image\/svg\+xml/);
 expect(screen.getByRole("note")).toHaveTextContent(/not approved for numerical marking of visual tasks/);
 expect(screen.queryByRole("button",{name:"Request detailed AI practice marking"})).not.toBeInTheDocument();
});
test("January 2022 source rubric pilot remains eligible while May 2022 printed diagram blocks grading",()=>{
 const january=getPobHistoricalReviewBank("POB-P2-2022-JAN");
 const may=getPobHistoricalReviewBank("POB-P2-2022-MJ");
 const {auditPobOwnerPaper2Calibration}=require("../../grading/pobOwnerArchiveCalibration");
 expect(auditPobOwnerPaper2Calibration(january).ready).toBe(true);
 expect(auditPobOwnerPaper2Calibration(may).rubricReady).toBe(true);
 expect(auditPobOwnerPaper2Calibration(may).ready).toBe(false);
 expect(auditPobOwnerPaper2Calibration(may).visualIssues.some(issue=>issue.includes("original_visual_needs_qa"))).toBe(true);
});

test("owner Paper 2 pilot stays hidden when source marking release switch is off",()=>{
 const old1=process.env.REACT_APP_SERVER_MARKING,old2=process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING,old3=process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;
 process.env.REACT_APP_SERVER_MARKING="true";
 process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING="true";
 delete process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;
 try{
  render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
  fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2022"}});
  fireEvent.click(screen.getByRole("button",{name:/2022 January.*Paper 2.*Written answers and mark schemes/}));
  fireEvent.click(screen.getByRole("button",{name:"Submit responses and view marking scheme"}));
  expect(screen.queryByRole("button",{name:"Request detailed AI practice marking"})).not.toBeInTheDocument();
  expect(screen.getAllByText(/SPARK model answer/).length).toBeGreaterThan(0);
 }finally{
  if(old1===undefined)delete process.env.REACT_APP_SERVER_MARKING;else process.env.REACT_APP_SERVER_MARKING=old1;
  if(old2===undefined)delete process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING;else process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING=old2;
  if(old3===undefined)delete process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;else process.env.REACT_APP_POB_OWNER_SOURCE_MARKING=old3;
 }
});

test("the SPARK historical Paper 2 marking scheme works with AI switches disabled",()=>{
 const oldA=process.env.REACT_APP_SERVER_MARKING;
 const oldB=process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;
 delete process.env.REACT_APP_SERVER_MARKING;
 delete process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;
 try{
  render(<PobHistoricalArchive onBack={jest.fn()} onOpenJanuary2026={jest.fn()}/>);
  fireEvent.change(screen.getByLabelText("Find a historical sitting"),{target:{value:"2022"}});
  fireEvent.click(screen.getByRole("button",{name:/2022 January.*Paper 2.*Written answers and mark schemes/}));
  expect(screen.getByText(/SPARK marking scheme ready/)).toBeInTheDocument();
  fireEvent.change(screen.getAllByRole("textbox")[0],{target:{value:"Jane might want to earn more money and become independent."}});
  fireEvent.click(screen.getByRole("button",{name:"Submit responses and view marking scheme"}));
  const region=screen.getByText("SPARK rubric review").closest("section");
  expect(region).toHaveTextContent("Confirmed marks: 0 / 100");
  expect(region).toHaveTextContent("1 written part(s) still require evidence-based assessment");
  expect(screen.getAllByText(/SPARK model answer/).length).toBeGreaterThan(0);
  expect(screen.queryByRole("button",{name:"Request detailed AI practice marking"})).not.toBeInTheDocument();
 }finally{
  if(oldA===undefined)delete process.env.REACT_APP_SERVER_MARKING;
  else process.env.REACT_APP_SERVER_MARKING=oldA;
  if(oldB===undefined)delete process.env.REACT_APP_POB_OWNER_SOURCE_MARKING;
  else process.env.REACT_APP_POB_OWNER_SOURCE_MARKING=oldB;
 }
});
