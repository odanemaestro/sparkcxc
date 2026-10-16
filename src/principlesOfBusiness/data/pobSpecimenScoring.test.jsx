/** @jest-environment jsdom */
import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import {scorePobSpecimen} from "./pobSpecimenScoring";
import {POB_CXC_2019_SPECIMEN_P1_FULL as full} from "./pobCxcSpecimenP1Full";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40 as batch38} from "./pobCxcSpecimenP1Checkpoint31to40";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60 as batch51} from "./pobCxcSpecimenP1Checkpoint51to60";
import {PobPaper1Exam} from "../practice/PobPracticeHub";

beforeEach(()=>{
 window.localStorage.clear();
 Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>jest.clearAllMocks());
describe("POB CXC specimen disputed-key fair comparison",()=>{
 test("all 60 original source responses are retained but 3 are excluded from uncontested learning score",()=>{
  const answers=Object.fromEntries(full.questions.map(q=>[q.id,q.answer]));
  expect(scorePobSpecimen(full.questions,answers)).toEqual({
   publishedKeyScore:60,publishedKeyMax:60,uncontestedScore:57,uncontestedMax:57,
   disputedQuestionNumbers:[38,51,53],uncontestedPercent:100
  });
  const incorrect=Object.fromEntries(full.questions.map(q=>[q.id,"?"]));
  expect(scorePobSpecimen(full.questions,incorrect)).toMatchObject({
   publishedKeyScore:0,uncontestedScore:0,uncontestedMax:57,uncontestedPercent:0
  });
 });
 test("answering only a disputed item does not inflate the uncontested learning score",()=>{
  const {id,answer}=batch51.questions[0];
  expect(scorePobSpecimen(batch51.questions,{[id]:answer})).toEqual({
   publishedKeyScore:1,publishedKeyMax:10,uncontestedScore:0,uncontestedMax:8,
   disputedQuestionNumbers:[51,53],uncontestedPercent:0
  });
  expect(scorePobSpecimen(batch38.questions,{}).uncontestedMax).toBe(9);
 });
 test("full practice labels printed-key comparison and separately discloses a 57-item learning score",()=>{
  const {container}=render(<PobPaper1Exam userId="fair-scoring" paperOverride={full} onBack={jest.fn()}/>);
  expect(screen.getByText(/Academic review notice/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  const buttons=container.querySelectorAll(".pob-exam-number-grid button");
  expect(buttons).toHaveLength(60);
  // Choose the published CXC key for disputed Q51 and verify it does not earn uncontested credit.
  fireEvent.click(buttons[50]);
  fireEvent.click(container.querySelector('input[name="POB-CXC-SPEC19-Q51"][value="B"]'));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 1"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit and review"}));
  expect(screen.getByText("1 / 60")).toBeInTheDocument();
  expect(screen.getByText(/Uncontested learning score: 0 \/ 57/)).toBeInTheDocument();
  expect(screen.getByText(/38, 51, 53/)).toBeInTheDocument();
 });
});
