/** @jest-environment jsdom */
import React from "react";
import fs from "fs";
import path from "path";
import {render,screen,fireEvent,cleanup} from "@testing-library/react";
import PobPracticeHub,{PobPaper1Exam} from "../practice/PobPracticeHub";
import {POB_CXC_2019_SPECIMEN_P1_FULL as full} from "./pobCxcSpecimenP1Full";

// DOM smoke tests at common viewport widths are NOT photographic browser checks.
// Pair with the CSS media breakpoints, and keep real-device acceptance separate.
describe.each([
 ["small phone",320,720],["phone",390,844],["tablet",768,1024],
 ["laptop",1366,768],["desktop",1920,1080]
])("POB exam viewport %s %ix%i",(_label,width,height)=>{
 beforeEach(()=>{
  Object.defineProperty(window,"innerWidth",{configurable:true,value:width});
  Object.defineProperty(window,"innerHeight",{configurable:true,value:height});
  window.localStorage.clear();
  Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
 });
 afterEach(()=>cleanup());
 test("all exam modes are reachable and full exam starts with 60 accessible question buttons",()=>{
  const {container}=render(<PobPracticeHub userId={"qa-"+width} onBack={jest.fn()}/>);
  expect(screen.getByRole("button",{name:"Start 2019 specimen Paper 1"})).toBeInTheDocument();
  expect(screen.queryByRole("button",{name:"Questions 51–60"})).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start 2019 specimen Paper 1"}));
  expect(screen.getByText(/Academic review notice/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByRole("timer")).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(60);
  expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(4);
  fireEvent.click(container.querySelectorAll(".pob-exam-number-grid button")[59]);
  expect(screen.getByText("Question 60 of 60")).toBeInTheDocument();
 });
});
test("mobile/tablet breakpoints keep tappable navigation and accessible dark-theme CSS tokens",()=>{
 const css=fs.readFileSync(path.join(__dirname,"..","practice","pobPractice.css"),"utf8");
 expect(css).toContain("@media(max-width:850px)");
 expect(css).toContain("@media(max-width:530px)");
 expect(css).toContain("max-height:256px;overflow-y:auto");
 expect(css).toContain(".pob-exam-number-grid button{min-height:44px");
 expect(css).toContain("repeat(5,minmax(0,1fr))");
 expect(css).toContain("var(--spark-paper");
 expect(css).toContain("var(--spark-ink");
 expect(css).toContain(":focus-visible");
 expect(css).toContain("@media(prefers-reduced-motion:reduce)");
});
