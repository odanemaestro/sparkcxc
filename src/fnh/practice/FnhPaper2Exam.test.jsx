import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import FnhPaper2Exam from "./FnhPaper2Exam";

describe("FNH Paper 02 source-aware self-review and marking safety",()=>{
 beforeEach(()=>{
  localStorage.clear();
  Object.defineProperty(window,"scrollTo",{configurable:true,value:jest.fn()});
 });
 test("students see only self-selected practice points, not a SPARK-generated final result",()=>{
  render(<FnhPaper2Exam setNumber={1}/>);
  expect(screen.getByText("Paper 2 examination instructions")).toBeInTheDocument();
  expect(screen.getByText(/written answers are not automatically graded yet/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  fireEvent.change(screen.getByRole("textbox",{name:/Question 1 part a answer/}),{
   target:{value:"A diet is the foods and drinks regularly consumed by a person."}
  });
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 2"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit now"}));
  expect(screen.getByText("Self-check · not graded")).toBeInTheDocument();
  expect(screen.getByText(/self-check practice, not a grade/)).toBeInTheDocument();
  expect(screen.getAllByText(/SPARK example answer points/).length).toBeGreaterThan(0);
  expect(screen.queryByText(/Correct answer and marking scheme/)).not.toBeInTheDocument();
  expect(screen.getByText(/SPARK has not automatically assessed your written responses/)).toBeInTheDocument();
  const checkbox=screen.getByRole("checkbox",{
   name:"My response includes marking point 1 for question 1 part a"
  });
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getByText(/1 \/ 96 points you selected yourself/)).toBeInTheDocument();
  expect(screen.getByText(/1 \/ 2 possible points. This is not a marked result/)).toBeInTheDocument();
  expect(screen.queryByText(/Your result:/)).not.toBeInTheDocument();
 });
 test("blank responses cannot claim a point in Paper 2 self-check mode",()=>{
  render(<FnhPaper2Exam setNumber={2}/>);
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit Paper 2"}));
  fireEvent.click(screen.getByRole("button",{name:"Submit now"}));
  const checkbox=screen.getByRole("checkbox",{
   name:"My response includes marking point 1 for question 1 part a"
  });
  expect(checkbox).toBeDisabled();
  expect(screen.getByText(/0 \/ 96 points you selected yourself/)).toBeInTheDocument();
 });
});
