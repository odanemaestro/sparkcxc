/** @jest-environment jsdom */
import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import PobPracticeHub,{PobPaper1Exam} from "../practice/PobPracticeHub";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as first,verifyPobSpecimenCheckpoint} from "./pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20 as second,verifyPobSpecimenCheckpoint11to20} from "./pobCxcSpecimenP1Checkpoint11to20";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30 as third,verifyPobSpecimenCheckpoint21to30} from "./pobCxcSpecimenP1Checkpoint21to30";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40 as fourth,verifyPobSpecimenCheckpoint31to40} from "./pobCxcSpecimenP1Checkpoint31to40";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50 as fifth,verifyPobSpecimenCheckpoint41to50} from "./pobCxcSpecimenP1Checkpoint41to50";
import {POB_PAPER1_ORIGINAL_ITEMS} from "./pobPaper1Original";
beforeEach(()=>{
 window.localStorage.clear();
 Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>jest.clearAllMocks());
describe("CXC 2019 specimen questions 41–50, source-to-scored-practice",()=>{
 test("published CXC keys, printed pages and syllabus references match ten item records",()=>{
  expect(verifyPobSpecimenCheckpoint()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint11to20()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint21to30()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint31to40()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint41to50()).toEqual({valid:true,issues:[]});
  expect(fifth.questions.map(q=>q.number)).toEqual([41,42,43,44,45,46,47,48,49,50]);
  expect(fifth.questions.map(q=>q.answer).join("")).toBe("BACADDCADA");
  expect(fifth.questions.map(q=>q.syllabusRef)).toEqual(["8.2","8.2","8.3","8.1","8.2","8.5","8.3","9.1","9.2","9.4 (a)"]);
  expect(fifth.questions.map(q=>q.sourcePdfPage)).toEqual([83,83,83,83,83,83,83,83,84,84]);
  expect(fifth.questions.map(q=>q.sourcePage)).toEqual([7,7,7,7,7,7,7,7,8,8]);
  expect(fifth.sourcePages).toEqual([83,84]);
  expect(fifth.officialKeySourcePdfPage).toBe(86);
  expect(fifth.sourcePdfSha256).toBe(first.sourcePdfSha256);
  expect(new Set([...first.questions,...second.questions,...third.questions,...fourth.questions,...fifth.questions].map(q=>q.id)).size).toBe(50);
  expect(POB_PAPER1_ORIGINAL_ITEMS).toHaveLength(60);
 });
 test("changing published answer, choice, objective or source flag prevents certification",()=>{
  const changes=[
   items=>items.map((q,i)=>i===0?{...q,answer:"A"}:q),
   items=>items.map((q,i)=>i===0?{...q,stem:q.stem+" Changed without source review"}:q),
   items=>items.map((q,i)=>i===0?{...q,options:[...q.options.slice(0,3),"Invented distractor"]}:q),
   items=>items.map((q,i)=>i===9?{...q,syllabusRef:"9.4 (b)"}:q),
   items=>items.map((q,i)=>i===8?{...q,sourcePdfPage:83}:q),
   items=>items.map((q,i)=>i===5?{...q,options:[q.options[0],q.options[0],q.options[2],q.options[3]]}:q),
   items=>items.map((q,i)=>i===2?{...q,answerSourceVerified:false}:q),
   items=>items.map((q,i)=>i===1?{...q,sourceWordingNote:""}:q)
  ];
  for(const mutate of changes){
   const altered={...fifth,questions:mutate(fifth.questions)};
   expect(verifyPobSpecimenCheckpoint41to50(altered).valid).toBe(false);
  }
 });
 test("CXC's unusual wording in question 42 is kept rather than silently corrected",()=>{
  const item=fifth.questions[1];
  expect(item.number).toBe(42);
  expect(item.stem).toContain("a service fee discharged");
  expect(item.answer).toBe("A");
  expect(item.options[0]).toBe("Current");
  expect(item.sourceWordingNote).toMatch(/fee discharged/);
 });
 test("student completes fifth ten-question checkpoint and gets a real score",()=>{
  const {container}=render(<PobPaper1Exam paperOverride={fifth} userId="batch-five" onBack={jest.fn()}/>);
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 41–50"})).toBeInTheDocument();
  expect(screen.getByText(/PDF pages 83–84/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  expect(screen.getByText(/CXC specimen Q41/)).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(10);
  fireEvent.click(container.querySelector('input[name="POB-CXC-SPEC19-Q41"][value="B"]'));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  expect(screen.getByText("1 / 10")).toBeInTheDocument();
  expect(screen.getByText(/10% correct/)).toBeInTheDocument();
  expect(window.localStorage.getItem("spark:pob:batch-five:"+fifth.id)).toContain("review");
 });
 test("home presents a single 60-question CXC specimen, with source checkpoints internal only",()=>{
  const {container}=render(<PobPracticeHub userId="specimen-main-menu" onBack={jest.fn()}/>);
  expect(screen.getByRole("button",{name:"Start 2019 specimen Paper 1"})).toBeInTheDocument();
  expect(screen.queryByRole("button",{name:"Questions 1–10"})).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start 2019 specimen Paper 1"}));
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: full 60-question Paper 1"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(60);
 });;
});
