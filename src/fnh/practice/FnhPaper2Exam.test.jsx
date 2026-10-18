import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import FnhPaper2Exam from "./FnhPaper2Exam";

describe("FNH Paper 2 automatic evidence review",()=>{
 beforeEach(()=>{
  localStorage.clear();
  Object.defineProperty(window,"scrollTo",{configurable:true,value:jest.fn()});
 });
 test("students see confirmed and unresolved marks without self-selected grading",()=>{
  render(<FnhPaper2Exam setNumber={1}/>);
  expect(screen.getByText("Paper 2 examination instructions")).toBeInTheDocument();
  expect(screen.getByText(/Unrecognised valid wording remains unresolved/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  fireEvent.change(screen.getByRole("textbox",{name:/Question 1 part a answer/}),{
   target:{value:"Diet means the usual foods and drinks consumed by a person."}
  });
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 2"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit now"}));
  expect(screen.getByText("Confirmed marking points")).toBeInTheDocument();
  expect(screen.getByText(/marks confirmed by SPARK/)).toBeInTheDocument();
  expect(screen.getByText(/marks remain unresolved/)).toBeInTheDocument();
  expect(screen.queryByRole("checkbox",{name:/My response includes marking point/})).not.toBeInTheDocument();
  expect(screen.getByText(/verified lower bound, not the candidate/i)).toBeInTheDocument();
 });
 test("blank responses do not invent marks or require student self-scoring",()=>{
  render(<FnhPaper2Exam setNumber={2}/>);
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 2"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit now"}));
  expect(screen.getByText(/0 \/ 96 marks confirmed by SPARK/)).toBeInTheDocument();
  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
 });
});