/** @jest-environment jsdom */
import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import PobPracticeHub,{PobPaper1Exam} from "../practice/PobPracticeHub";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as first,verifyPobSpecimenCheckpoint} from "./pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20 as second,verifyPobSpecimenCheckpoint11to20} from "./pobCxcSpecimenP1Checkpoint11to20";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30 as third,verifyPobSpecimenCheckpoint21to30} from "./pobCxcSpecimenP1Checkpoint21to30";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40 as fourth,verifyPobSpecimenCheckpoint31to40} from "./pobCxcSpecimenP1Checkpoint31to40";
import {POB_PAPER1_ORIGINAL_ITEMS} from "./pobPaper1Original";
beforeEach(()=>{
 window.localStorage.clear();
 Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>jest.clearAllMocks());
describe("CXC 2019 specimen Q31–40 academic and scored-practice QA",()=>{
 test("published CXC answers and source-page/objective references match ten checked items",()=>{
  expect(verifyPobSpecimenCheckpoint()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint11to20()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint21to30()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint31to40()).toEqual({valid:true,issues:[]});
  expect(fourth.questions.map(q=>q.number)).toEqual([31,32,33,34,35,36,37,38,39,40]);
  expect(fourth.questions.map(q=>q.answer).join("")).toBe("BDAADADADB");
  expect(fourth.questions.map(q=>q.syllabusRef)).toEqual(["6.6","6.9","6.11","6.9","7.6","7.1","7.8","7.2","7.7","7.4"]);
  expect(fourth.questions.map(q=>q.sourcePdfPage)).toEqual([81,82,82,82,82,82,82,82,82,83]);
  expect(fourth.questions.map(q=>q.sourcePage)).toEqual([5,6,6,6,6,6,6,6,6,7]);
  expect(fourth.sourcePages).toEqual([81,82,83]);
  expect(fourth.officialKeySourcePdfPage).toBe(86);
  expect(fourth.sourcePdfSha256).toBe(first.sourcePdfSha256);
  expect(fourth.maxScore).toBe(10);
  expect(new Set([...first.questions,...second.questions,...third.questions,...fourth.questions].map(q=>q.id)).size).toBe(40);
  expect(POB_PAPER1_ORIGINAL_ITEMS).toHaveLength(60);
 });
 test("tampering with CXC key, syllabus, source pages or options blocks start",()=>{
  const changes=[
   questions=>questions.map((q,i)=>i===0?{...q,answer:"A"}:q),
   questions=>questions.map((q,i)=>i===1?{...q,syllabusRef:"7.7"}:q),
   questions=>questions.map((q,i)=>i===9?{...q,sourcePdfPage:82}:q),
   questions=>questions.map((q,i)=>i===3?{...q,options:[q.options[0],q.options[0],q.options[2],q.options[3]]}:q),
   questions=>questions.map((q,i)=>i===4?{...q,answerSourceVerified:false}:q),
   questions=>questions.map((q,i)=>i===7?{...q,sourceKeyAcademicReview:false}:q)
  ];
  for(const change of changes){
   expect(verifyPobSpecimenCheckpoint31to40({...fourth,questions:change(fourth.questions)}).valid).toBe(false);
  }
 });
 test("Q38 preserves the supplied CXC letter A while warning about wholesaler ambiguity",()=>{
  const item=fourth.questions[7];
  expect(item.number).toBe(38);
  expect(item.options[0]).toBe("retailer");
  expect(item.options[2]).toBe("wholesaler");
  expect(item.answer).toBe("A");
  expect(item.sourceKeyAcademicReview).toBe(true);
  expect(item.keyConcern).toMatch(/wholesalers/);
 });
 test("student can score fourth checkpoint and sees original Q31 label, not Q1",()=>{
  const {container}=render(<PobPaper1Exam paperOverride={fourth} userId="batch-four" onBack={jest.fn()}/>);
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 31–40"})).toBeInTheDocument();
  expect(screen.getByText(/PDF pages 81–83/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  expect(screen.getByText(/CXC specimen Q31/)).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(10);
  fireEvent.click(container.querySelector('input[name="POB-CXC-SPEC19-Q31"][value="B"]'));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  expect(screen.getByText("1 / 10")).toBeInTheDocument();
  expect(screen.getByText(/10% correct/)).toBeInTheDocument();
  expect(window.localStorage.getItem("spark:pob:batch-four:"+fourth.id)).toContain("review");
 });
 test("after reviewing Q38 the source-key academic caution appears, not a false textbook justification",()=>{
  const {container}=render(<PobPaper1Exam paperOverride={fourth} userId="q38-review" onBack={jest.fn()}/>);
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  const buttons=container.querySelectorAll(".pob-exam-number-grid button");
  fireEvent.click(buttons[7]);
  expect(screen.getByText(/source-key review/i)).toBeInTheDocument();
  expect(screen.getAllByText(/wholesal/).length).toBeGreaterThan(0);
 });
 test("home exposes all four separately named specimen checkpoints",()=>{
  render(<PobPracticeHub userId="batch-four-home" onBack={jest.fn()}/>);
  expect(screen.getByRole("button",{name:"Questions 1–10"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Questions 11–20"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Questions 21–30"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Questions 31–40"}));
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 31–40"})).toBeInTheDocument();
 });
});
