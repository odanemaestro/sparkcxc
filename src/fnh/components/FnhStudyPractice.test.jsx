import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import FnhStudyPractice from "./FnhStudyPractice";

describe("FNH formative study-note practice interactions",()=>{
 test("original single-choice question offers a hint, feedback and an immediate retry",()=>{
  render(<FnhStudyPractice topicId="diet-basics"/>);
  expect(screen.getByText("Try it like a CSEC candidate")).toBeInTheDocument();
  expect(screen.getByText("0 of 3 checked")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Need a hint?"}));
  expect(screen.getByText("Think about missing food groups and drinks.")).toBeInTheDocument();
  const optionA=screen.getByRole("radio",{name:/Replace the sweet drink/});
  fireEvent.click(optionA);
  fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));
  expect(screen.getByText("Review this one, then try again.")).toBeInTheDocument();
  expect(screen.getByText("1 of 3 checked")).toBeInTheDocument();
  expect(screen.getByText("Answer:").parentElement).toHaveTextContent("Answer: B");
  fireEvent.click(screen.getByRole("button",{name:"Try this question again"}));
  expect(screen.getByText("0 of 3 checked")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("radio",{name:/Include a vegetable or fruit/}));
  fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));
  expect(screen.getByText("Well reasoned!")).toBeInTheDocument();
  expect(screen.getByText(/does not change Paper 1 or Paper 2 scores/)).toBeInTheDocument();
 });
 test("multi-select requires exactly the complete correct set",()=>{
  render(<FnhStudyPractice topicId="diet-basics"/>);
  fireEvent.click(screen.getByRole("button",{name:"Next question →"}));
  expect(screen.getByText("SELECT ALL THAT APPLY")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("checkbox",{name:/Include a variety of food groups/}));
  fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));
  expect(screen.getByText("Review this one, then try again.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Try this question again"}));
  fireEvent.click(screen.getByRole("checkbox",{name:/Include a variety of food groups/}));
  fireEvent.click(screen.getByRole("checkbox",{name:/Drink safe water regularly/}));
  fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));
  expect(screen.getByText("Well reasoned!")).toBeInTheDocument();
 });
 test("order challenge uses buttons usable without drag-and-drop",()=>{
  render(<FnhStudyPractice topicId="community-food-security"/>);
  fireEvent.click(screen.getByRole("button",{name:"Go to practice question 3"}));
  expect(screen.getByText("PUT IN ORDER")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Move step 2 up"}));
  fireEvent.click(screen.getByRole("button",{name:"Move step 4 up"}));
  fireEvent.click(screen.getByRole("button",{name:"Move step 3 up"}));
  fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));
  expect(screen.getByText("Well reasoned!")).toBeInTheDocument();
 });
 test("number question accepts proper calculation and rejects a blank",()=>{
  render(<FnhStudyPractice topicId="budget-packed-dining"/>);
  expect(screen.getByText("WORK IT OUT")).toBeInTheDocument();
  const answer=screen.getByRole("spinbutton",{name:"Calculated answer"});
  expect(screen.getByRole("button",{name:"Check my answer"})).toBeDisabled();
  fireEvent.change(answer,{target:{value:"1130"}});
  fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));
  expect(screen.getByText("Well reasoned!")).toBeInTheDocument();
  expect(screen.queryByText(/official CXC mark/)).not.toBeInTheDocument();
 });
 test("students can move between unanswered questions and reset their local study practice",()=>{
  render(<FnhStudyPractice topicId="community-food-security"/>);
  fireEvent.click(screen.getByRole("button",{name:"Next question →"}));
  fireEvent.click(screen.getByRole("button",{name:"Next question →"}));
  fireEvent.click(screen.getByRole("button",{name:"Practise again ↻"}));
  expect(screen.getByText("Question 1")).toBeInTheDocument();
  expect(screen.getByText("0 of 3 checked")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"← Previous"})).toBeDisabled();
 });
});
