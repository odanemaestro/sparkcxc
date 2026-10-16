/** @jest-environment jsdom */
import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import PobPracticeHub,{PobPaper1Exam} from "../practice/PobPracticeHub";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as first,verifyPobSpecimenCheckpoint} from "./pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20 as second,verifyPobSpecimenCheckpoint11to20} from "./pobCxcSpecimenP1Checkpoint11to20";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30 as third,verifyPobSpecimenCheckpoint21to30} from "./pobCxcSpecimenP1Checkpoint21to30";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40 as fourth,verifyPobSpecimenCheckpoint31to40} from "./pobCxcSpecimenP1Checkpoint31to40";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50 as fifth,verifyPobSpecimenCheckpoint41to50} from "./pobCxcSpecimenP1Checkpoint41to50";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60 as sixth,verifyPobSpecimenCheckpoint51to60} from "./pobCxcSpecimenP1Checkpoint51to60";

beforeEach(()=>{
  window.localStorage.clear();
  Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>jest.clearAllMocks());

describe("CXC specimen Q51–60: official key, source accuracy and SPARK automatic grading",()=>{
 test("all six checkpoints contain 60 unique original CXC specimen items and the sixth key matches the printed source",()=>{
  expect(verifyPobSpecimenCheckpoint()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint11to20()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint21to30()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint31to40()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint41to50()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint51to60()).toEqual({valid:true,issues:[]});
  expect(sixth.questions.map(q=>q.number)).toEqual([51,52,53,54,55,56,57,58,59,60]);
  expect(sixth.questions.map(q=>q.answer).join("")).toBe("BACCADCDAC");
  expect(sixth.questions.map(q=>q.syllabusRef)).toEqual(["9.4 (b)","9.4 (b)","9.3","9.2","10.11","10.13","10.13","10.1","10.5","10.15"]);
  expect(sixth.questions.map(q=>q.sourcePdfPage)).toEqual([84,84,84,84,84,84,85,85,85,85]);
  expect(sixth.questions.map(q=>q.sourcePage)).toEqual([8,8,8,8,8,8,9,9,9,9]);
  expect(sixth.officialKeySourcePdfPage).toBe(86);
  const all=[first,second,third,fourth,fifth,sixth].flatMap(p=>p.questions);
  expect(all).toHaveLength(60);
  expect(all.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(all.map(q=>q.id)).size).toBe(60);
  expect(new Set([first,second,third,fourth,fifth,sixth].map(p=>p.id)).size).toBe(6);
  expect(new Set([first,second,third,fourth,fifth,sixth].map(p=>p.sourcePdfSha256)).size).toBe(1);
 });
 test("changing stem, A–D choice, answer, key caveat, source-page or syllabus reference prevents certification",()=>{
  const variants=[
   qs=>qs.map((q,i)=>i===0?{...q,stem:q.stem+" altered"}:q),
   qs=>qs.map((q,i)=>i===2?{...q,options:[...q.options.slice(0,3),"Made up"]}:q),
   qs=>qs.map((q,i)=>i===4?{...q,answer:"D"}:q),
   qs=>qs.map((q,i)=>i===6?{...q,sourcePdfPage:84}:q),
   qs=>qs.map((q,i)=>i===5?{...q,syllabusRef:"10.10"}:q),
   qs=>qs.map((q,i)=>i===0?{...q,sourceKeyAcademicReview:false}:q),
   qs=>qs.map((q,i)=>i===2?{...q,keyConcern:""}:q),
   qs=>qs.map((q,i)=>i===8?{...q,questionWordingVerified:false}:q)
  ];
  variants.forEach(change=>expect(verifyPobSpecimenCheckpoint51to60({...sixth,questions:change(sixth.questions)}).valid).toBe(false));
 });
 test("CXC printed B for Q51 and C for Q53 remain explicitly disputed, not silently rewritten",()=>{
  expect(sixth.questions[0]).toMatchObject({number:51,answer:"B",sourceKeyAcademicReview:true});
  expect(sixth.questions[2]).toMatchObject({number:53,answer:"C",sourceKeyAcademicReview:true});
  expect(sixth.questions[0].keyConcern).toMatch(/indirect tax/);
  expect(sixth.questions[2].keyConcern).toMatch(/Reducing taxes/);
  expect(sixth.questions[6].sourceWordingNote).toMatch(/dated terminology/);
  expect(sixth.questions[8].historicalContextNote).toMatch(/USMCA/);
 });
 test("student sees review warning, completes timed checkpoint and gets automatic one-of-ten scoring",()=>{
  const {container}=render(<PobPaper1Exam paperOverride={sixth} userId="final-specimen" onBack={jest.fn()}/>);
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 51–60"})).toBeInTheDocument();
  expect(screen.getByText(/PDF pages 84–85/)).toBeInTheDocument();
  expect(screen.getByText(/Academic review notice/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  expect(screen.getByText(/CXC specimen Q51/)).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(10);
  fireEvent.click(container.querySelector('input[name="POB-CXC-SPEC19-Q51"][value="B"]'));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  expect(screen.getByText("1 / 10")).toBeInTheDocument();
  expect(screen.getByText(/10% correct/)).toBeInTheDocument();
  expect(screen.getByText(/source-key review/i)).toBeInTheDocument();
  expect(window.localStorage.getItem("spark:pob:final-specimen:"+sixth.id)).toContain("review");
 });
 test("all six checkpoint selectors exist and Q51–60 opens on its own ID",()=>{
  render(<PobPracticeHub userId="final-specimen-menu" onBack={jest.fn()}/>);
  for(const group of ["1–10","11–20","21–30","31–40","41–50","51–60"]){
    expect(screen.getByRole("button",{name:"Questions "+group})).toBeInTheDocument();
  }
  fireEvent.click(screen.getByRole("button",{name:"Questions 51–60"}));
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 51–60"})).toBeInTheDocument();
 });
});
