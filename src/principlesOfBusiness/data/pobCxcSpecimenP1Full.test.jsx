/** @jest-environment jsdom */
import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import PobPracticeHub,{PobPaper1Exam} from "../practice/PobPracticeHub";
import {POB_CXC_2019_SPECIMEN_P1_FULL as full,verifyPobFullSpecimen} from "./pobCxcSpecimenP1Full";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as q01} from "./pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20 as q02} from "./pobCxcSpecimenP1Checkpoint11to20";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30 as q03} from "./pobCxcSpecimenP1Checkpoint21to30";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40 as q04} from "./pobCxcSpecimenP1Checkpoint31to40";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50 as q05} from "./pobCxcSpecimenP1Checkpoint41to50";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60 as q06} from "./pobCxcSpecimenP1Checkpoint51to60";

beforeEach(()=>{
 window.localStorage.clear();
 Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>jest.clearAllMocks());

describe("Complete CXC 2019 specimen Paper 1 simulation",()=>{
 test("the combined 60-question paper has official 75-minute duration and complete published answer sequence",()=>{
  expect(verifyPobFullSpecimen()).toEqual({valid:true,issues:[]});
  expect(full.questions).toHaveLength(60);
  expect(full.timeLimitMinutes).toBe(75);
  expect(full.maxScore).toBe(60);
  expect(full.questions.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(full.questions.map(q=>q.id)).size).toBe(60);
  expect(full.questions.map(q=>q.answer).join("")).toBe(
   "AABBCACBDCBDCADCDDCDDCBBCBDBDABDAADADADBBACADDCADABACCADCDAC"
  );
  expect(full.sourcePages).toEqual([78,79,80,81,82,83,84,85]);
  expect(full.officialKeySourcePdfPage).toBe(86);
  expect(full.academicReviewQuestionNumbers).toEqual([38,51,53]);
  expect(q01.questions.length+q02.questions.length+q03.questions.length+
   q04.questions.length+q05.questions.length+q06.questions.length).toBe(60);
  expect(full.id).not.toBe(q06.id);
 });
 test("full paper fails closed if even one answer or plausible option is silently changed",()=>{
  const variants=[
   questions=>questions.map((q,i)=>i===7?{...q,answer:"A"}:q),
   questions=>questions.map((q,i)=>i===14?{...q,stem:q.stem+" silently changed"}:q),
   questions=>questions.map((q,i)=>i===46?{...q,options:[...q.options.slice(0,3),"Invented fourth option"]}:q),
   questions=>questions.map((q,i)=>i===58?{...q,sourcePdfPage:84}:q),
   questions=>questions.map((q,i)=>i===52?{...q,sourceKeyAcademicReview:false}:q)
  ];
  variants.forEach(change=>expect(verifyPobFullSpecimen({...full,questions:change(full.questions)}).valid).toBe(false));
  expect(verifyPobFullSpecimen({...full,timeLimitMinutes:13}).valid).toBe(false);
  expect(verifyPobFullSpecimen({...full,questions:full.questions.slice(0,59)}).valid).toBe(false);
 });
 test("full specimen opens with 60 questions, 75-minute timer and a visible academic caution",()=>{
  const {container}=render(<PobPaper1Exam paperOverride={full} userId="whole-spec" onBack={jest.fn()}/>);
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: full 60-question Paper 1"})).toBeInTheDocument();
  expect(screen.getAllByText(/75 minutes/).length).toBeGreaterThan(0);
  expect(screen.getByText(/PDF pages 78–85/)).toBeInTheDocument();
  expect(screen.getByText(/Academic review notice/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByText("Question 1 of 60")).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(60);
  expect(screen.getByRole("timer")).toBeInTheDocument();
  fireEvent.click(container.querySelector('input[name="POB-CXC-SPEC19-Q01"][value="A"]'));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  expect(screen.getByText("1 / 60")).toBeInTheDocument();
  expect(screen.getByText(/2% correct/)).toBeInTheDocument();
  expect(window.localStorage.getItem("spark:pob:whole-spec:"+full.id)).toContain("review");
 });
 test("user can choose either the full timed paper or one of six separately saved checkpoints",()=>{
  render(<PobPracticeHub userId="all-spec-menu" onBack={jest.fn()}/>);
  for(const name of ["Questions 1–10","Questions 11–20","Questions 21–30","Questions 31–40","Questions 41–50","Questions 51–60"]){
   expect(screen.getByRole("button",{name})).toBeInTheDocument();
  }
  fireEvent.click(screen.getByRole("button",{name:"Full 60-question specimen"}));
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: full 60-question Paper 1"})).toBeInTheDocument();
 });
});
