import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import FnhDecisionLab from "./FnhDecisionLab";

describe("FNH food planning and label labs are readable and responsive to input",()=>{
 test("four-mix status counts different groups, not number of foods or a hard-coded 4/4",()=>{
  render(<FnhDecisionLab type="fnh-meal-builder"/>);
  expect(screen.getByText("3 different food groups · aim for four")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:/Fresh guava/}));
  expect(screen.getByText("4 different food groups · four-mix achieved")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:/Avocado/}));
  expect(screen.getByText("5 different food groups · four-mix achieved")).toBeInTheDocument();
  expect(screen.queryByText(/\$\{/)).not.toBeInTheDocument();
 });
 test("invalid blank serving amounts show a prompt instead of false zero nutrients",()=>{
  render(<FnhDecisionLab type="fnh-label-calculator"/>);
  expect(screen.getByText("15 g sugar")).toBeInTheDocument();
  const nutrient=screen.getByRole("spinbutton",{name:"Sugar per label reference (g)"});
  fireEvent.change(nutrient,{target:{value:""}});
  expect(screen.getByText(/Enter valid non-negative nutrient values/)).toBeInTheDocument();
  expect(screen.queryByText("0 g sugar")).not.toBeInTheDocument();
 });
 test("switching to sodium updates the example value and concentration units",()=>{
  render(<FnhDecisionLab type="fnh-label-calculator"/>);
  fireEvent.change(screen.getByRole("combobox",{name:"Nutrient"}),{target:{value:"Sodium"}});
  expect(screen.getByRole("spinbutton",{name:"Sodium per label reference (mg)"})).toHaveValue(200);
  expect(screen.getByText("500 mg sodium")).toBeInTheDocument();
 });
});
