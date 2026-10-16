/** @jest-environment jsdom */
import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import PobPracticeHub,{PobPaper1Exam} from "../practice/PobPracticeHub";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as first,verifyPobSpecimenCheckpoint} from "./pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20 as second,verifyPobSpecimenCheckpoint11to20} from "./pobCxcSpecimenP1Checkpoint11to20";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30 as third,verifyPobSpecimenCheckpoint21to30} from "./pobCxcSpecimenP1Checkpoint21to30";
import {POB_PAPER1_ORIGINAL_ITEMS} from "./pobPaper1Original";

beforeEach(()=>{
 window.localStorage.clear();
 Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>jest.clearAllMocks());

describe("CXC 2019 Principles of Business specimen Paper 1, Q21–30",()=>{
 test("all ten official keys, objectives, page references and original item IDs match source",()=>{
  expect(verifyPobSpecimenCheckpoint()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint11to20()).toEqual({valid:true,issues:[]});
  expect(verifyPobSpecimenCheckpoint21to30()).toEqual({valid:true,issues:[]});
  expect(third.questions.map(q=>q.number)).toEqual([21,22,23,24,25,26,27,28,29,30]);
  expect(third.questions.map(q=>q.answer).join("")).toBe("DCBBCBDBDA");
  expect(third.questions.map(q=>q.syllabusRef)).toEqual(["5.1","5.6","5.7","5.2","5.1","5.10","5.8","6.2","6.8","6.1"]);
  expect(third.questions.map(q=>q.sourcePage)).toEqual([4,4,4,5,5,5,5,5,5,5]);
  expect(third.questions.map(q=>q.sourcePdfPage)).toEqual([80,80,80,81,81,81,81,81,81,81]);
  expect(third.sourcePages).toEqual([80,81]);
  expect(third.officialKeySourcePdfPage).toBe(86);
  expect(third.maxScore).toBe(10);
  expect(third.timeLimitMinutes).toBe(13);
  expect(new Set([...first.questions,...second.questions,...third.questions].map(q=>q.id)).size).toBe(30);
  expect(first.id).not.toBe(third.id);
  expect(second.id).not.toBe(third.id);
  expect(first.sourcePdfSha256).toBe(third.sourcePdfSha256);
  expect(POB_PAPER1_ORIGINAL_ITEMS).toHaveLength(60);
 });
 test("revised, duplicated or unsupported answer/options evidence blocks marking",()=>{
  const wrong={...third,questions:third.questions.map((q,i)=>i===1?{...q,answer:"D"}:q)};
  expect(verifyPobSpecimenCheckpoint21to30(wrong).valid).toBe(false);
  const swapped={...third,questions:[third.questions[1],third.questions[0],...third.questions.slice(2)]};
  expect(verifyPobSpecimenCheckpoint21to30(swapped).valid).toBe(false);
  const wrongChoices={...third,questions:third.questions.map((q,i)=>i===7?{...q,options:[q.options[0],q.options[0],...q.options.slice(2)]}:q)};
  expect(verifyPobSpecimenCheckpoint21to30(wrongChoices).valid).toBe(false);
  const missingEvidence={...third,questions:third.questions.map((q,i)=>i===9?{...q,questionWordingVerified:false}:q)};
  expect(verifyPobSpecimenCheckpoint21to30(missingEvidence).valid).toBe(false);
  const wrongPages={...third,questions:third.questions.map((q,i)=>i===0?{...q,sourcePdfPage:81}:q)};
  expect(verifyPobSpecimenCheckpoint21to30(wrongPages).valid).toBe(false);
 });
 test("student can complete a timed ten-question checkpoint and review 1 of 10 score",()=>{
  const {container}=render(<PobPaper1Exam paperOverride={third} userId="third-student" onBack={jest.fn()}/>);
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 21–30"})).toBeInTheDocument();
  expect(screen.getByText(/PDF pages 80–81/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  expect(screen.getByText(/CXC specimen Q21/)).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(10);
  fireEvent.click(container.querySelector('input[name="POB-CXC-SPEC19-Q21"][value="D"]'));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  expect(screen.getByText("1 / 10")).toBeInTheDocument();
  expect(screen.getByText(/10% correct/)).toBeInTheDocument();
  expect(window.localStorage.getItem("spark:pob:third-student:"+third.id)).toContain("review");
 });
 test("home view shows all three checkpoints without replacing the SPARK-original Paper 1",()=>{
  render(<PobPracticeHub userId="third-menu" onBack={jest.fn()}/>);
  expect(screen.getByRole("button",{name:"Questions 1–10"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Questions 11–20"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Questions 21–30"}));
  expect(screen.getByRole("heading",{name:"2019 CXC specimen: questions 21–30"})).toBeInTheDocument();
 });
});
