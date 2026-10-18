import React from "react";
import {fireEvent,render,screen,waitFor} from "@testing-library/react";
import PobPracticeHub from "./PobPracticeHub";

beforeEach(()=>{
  window.localStorage.clear();
  window.scrollTo=jest.fn();
});
afterEach(()=>window.localStorage.clear());

describe("POB January 2026 historical exam end-to-end preview",()=>{
 test("renders real 2026 questions in five-question timed exam with correct 32-part count",async()=>{
  const rpc=jest.fn();
  render(<PobPracticeHub userId="historical-preview-qa" supabase={{rpc}}/>);
  expect(screen.getByText("Historical Paper 2 · January 2026")).toBeTruthy();
  fireEvent.click(screen.getByRole("button",{name:"Preview historical Paper 2"}));
  expect(screen.getByText(/CSEC Principles of Business · January 2026 · Paper 02/)).toBeTruthy();
  expect(screen.getByText(/No numerical score, official CXC mark or live grading job is created/)).toBeTruthy();
  fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
  expect(screen.getByText("0 of 32 parts answered")).toBeTruthy();
  expect(screen.getByText(/Maria is a student at Happy Valley High School/)).toBeTruthy();
  expect(screen.getByText(/List THREE careers in the field of business/)).toBeTruthy();
  expect(screen.getAllByRole("textbox")).toHaveLength(7);
  fireEvent.click(screen.getByRole("button",{name:/Question 2:/}));
  expect(screen.getByText(/Juan wants to establish a fast-food business/)).toBeTruthy();
  expect(screen.getAllByRole("textbox")).toHaveLength(6);
  expect(screen.getByText(/ONE primary and ONE secondary source of information/)).toBeTruthy();
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 2"}));
  expect(screen.getByText(/0 of 32 parts have responses/)).toBeTruthy();
  fireEvent.click(screen.getByRole("button",{name:"Submit responses"}));
  await waitFor(()=>expect(screen.getByText(/32 responses submitted/)).toBeTruthy());
  expect(screen.getByText(/No score has been invented for free-text responses/)).toBeTruthy();
  expect(rpc).toHaveBeenCalledWith("spark_record_subject_progress",expect.objectContaining({p_subject_id:"principles-of-business",p_activity_type:"exam",p_score:null}));
  expect(rpc.mock.calls.filter(([name])=>/server_exam_attempt|grade_exam/i.test(name))).toHaveLength(0);
 });
 test("historical preview stores answers without requesting an authenticated marking attempt",()=>{
  const rpc=jest.fn();
  render(<PobPracticeHub userId="historical-source-qa" supabase={{rpc}}/>);
  fireEvent.click(screen.getByRole("button",{name:"Preview historical Paper 2"}));
  fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
  const answers=screen.getAllByRole("textbox");
  fireEvent.change(answers[0],{target:{value:"Accountant, auditor and banking manager."}});
  expect(screen.getByText("1 of 32 parts answered")).toBeTruthy();
  expect(rpc).not.toHaveBeenCalled();
 });
});
