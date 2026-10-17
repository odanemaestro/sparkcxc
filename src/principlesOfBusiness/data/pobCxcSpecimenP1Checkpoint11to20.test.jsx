/** @jest-environment jsdom */
import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import PobPracticeHub,{PobPaper1Exam} from "../practice/PobPracticeHub";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as first,verifyPobSpecimenCheckpoint} from "./pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20 as second,verifyPobSpecimenCheckpoint11to20} from "./pobCxcSpecimenP1Checkpoint11to20";
import {POB_PAPER1_ORIGINAL_ITEMS} from "./pobPaper1Original";

beforeEach(()=>{
 window.localStorage.clear();
 Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>jest.clearAllMocks());

describe("CXC specimen batch 02, questions 11 to 20",()=>{
 test("source-checked key, syllabus objectives, page references, ten unique complete MCQs",()=>{
  expect(verifyPobSpecimenCheckpoint()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint11to20()).toEqual({valid:true,issues:[]});
  expect(second.questions.map(q=>q.number)).toEqual([11,12,13,14,15,16,17,18,19,20]);
  expect(second.questions.map(q=>q.answer).join("")).toBe("BDCADCDDCD");
  expect(second.questions.map(q=>q.syllabusRef)).toEqual(["2.9","3.3","3.7","3.14","3.10","3.13","4.3","4.9","4.5","4.6"]);
  expect(second.questions.map(q=>q.sourcePage)).toEqual([3,3,3,3,3,3,4,4,4,4]);
  expect(second.questions.map(q=>q.sourcePdfPage)).toEqual([79,79,79,79,79,79,80,80,80,80]);
  expect(new Set([...first.questions,...second.questions].map(q=>q.id)).size).toBe(20);
  expect(POB_PAPER1_ORIGINAL_ITEMS).toHaveLength(60);
  expect(first.id).not.toBe(second.id);
  expect(first.sourcePdfSha256).toBe(second.sourcePdfSha256);
 });
 test("failure-safe key validator detects one changed answer, duplicate or missing choice and missing source proof",()=>{
  const changed={...second,questions:second.questions.map((q,i)=>i===2?{...q,answer:"B"}:q)};
  expect(verifyPobSpecimenCheckpoint11to20(changed).valid).toBe(false);
  const swapped={...second,questions:[second.questions[1],second.questions[0],...second.questions.slice(2)]};
  expect(verifyPobSpecimenCheckpoint11to20(swapped).valid).toBe(false);
  const duplicate={...second,questions:second.questions.map((q,i)=>i===4?{...q,options:[q.options[0],q.options[0],...q.options.slice(2)]}:q)};
  expect(verifyPobSpecimenCheckpoint11to20(duplicate).valid).toBe(false);
  const missing={...second,questions:second.questions.map((q,i)=>i===8?{...q,answerSourceVerified:false}:q)};
  expect(verifyPobSpecimenCheckpoint11to20(missing).valid).toBe(false);
 });
 test("new checkpoint scores answered choice, reports out of ten and keeps source question number",()=>{
  const {container}=render(<PobPaper1Exam paperOverride={second} userId="specimen-student" onBack={jest.fn()}/>);
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 11–20"})).toBeInTheDocument();
  expect(screen.getByText(/PDF pages 79–80/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  expect(screen.getByText(/CXC specimen Q11/)).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(10);
  fireEvent.click(container.querySelector('input[name="POB-CXC-SPEC19-Q11"][value="B"]'));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  expect(screen.getByText("1 / 10")).toBeInTheDocument();
  expect(screen.getByText(/10% correct/)).toBeInTheDocument();
  expect(window.localStorage.getItem("spark:pob:specimen-student:"+second.id)).toContain("review");
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
