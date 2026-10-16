/** @jest-environment jsdom */
import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import PobDecisionLabs from "./PobDecisionLabs";

test("start-up lab updates projected break-even and exposes formula",()=>{
  render(<PobDecisionLabs sectionNumber={3}/>);
  expect(screen.getByRole("region",{name:"Business startup feasibility lab"})).toBeInTheDocument();
  expect(screen.getByText("40 snacks")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Price per snack (J$)"),{target:{value:"300"}});
  expect(screen.getByText("Not achievable at this price")).toBeInTheDocument();
  expect(screen.getByText(/Increasing volume alone cannot cover/)).toBeInTheDocument();
});
test("inventory lab responds to lead-time changes",()=>{
  render(<PobDecisionLabs sectionNumber={7}/>);
  expect(screen.getByText("90 items")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Supplier delivery lead time (days)"),{target:{value:"8"}});
  expect(screen.getByText("132 items")).toBeInTheDocument();
});
test("simple-interest lab calculates duration correctly and explains limitations",()=>{
  render(<PobDecisionLabs sectionNumber={8}/>);
  expect(screen.getByText("J$18,000")).toBeInTheDocument();
  expect(screen.getByText(/not an actual instalment loan quotation/)).toBeInTheDocument();
});
test("price changes are calculated for marketing study",()=>{
  render(<PobDecisionLabs sectionNumber={6}/>);
  expect(screen.getByText("20.0%")).toBeInTheDocument();
  expect(screen.getByText(/changing prices can also change/)).toBeInTheDocument();
});
test("do not add unrelated calculators to other syllabus sections",()=>{
 const {container}=render(<PobDecisionLabs sectionNumber={1}/>);
 expect(container).toBeEmptyDOMElement();
});
