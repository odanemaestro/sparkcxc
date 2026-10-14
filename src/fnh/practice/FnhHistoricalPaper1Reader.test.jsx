import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import FnhPracticeHub from "./FnhPracticeHub";
import FnhHistoricalPaper1Reader from "./FnhHistoricalPaper1Reader";
import FnhPaper1HistoricalDiagram from "./FnhPaper1HistoricalDiagram";
import {fnhHistoricalPaper1Reader,FNH_P1_RENDERABLE_DIAGRAM_IDS} from "../data/fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";

describe("FNH historical Paper 01 unscored review safeguards",()=>{
 beforeEach(()=>{
  localStorage.clear();
  Object.defineProperty(window,"scrollTo",{value:jest.fn(),configurable:true});
 });
 test("only verified source identity and available source figures are displayed",()=>{
  expect(fnhHistoricalPaper1Reader("FNH-P1-2021-MJ")).toBeNull();
  expect(fnhHistoricalPaper1Reader("FNH-P2-2018-MJ")).toBeNull();
  expect(fnhHistoricalPaper1Reader("FNH-P1-2099-MJ")).toBeNull();
  for(const year of [2014,2018,2019,2020,2026]){
   const source=fnhHistoricalPaper1Reader("FNH-P1-"+year+"-MJ");
   expect(source?.questions).toHaveLength(60);
   expect(source.scored).toBe(false);
   expect(source.verifiedKeys).toBe(false);
   expect(source.excludedNumbers).toHaveLength(0);
  }
  const missing=fnhHistoricalPaper1Reader("FNH-P1-2004-MJ");
  expect(missing.excludedNumbers).toEqual([46,47]);
  expect(missing.questions).toHaveLength(58);
  const partial=fnhHistoricalPaper1Reader("FNH-P1-2005-MJ");
  expect(partial.missingSourceQuestions).toEqual([54,55,56,57,58,59,60]);
  expect(partial.questions).toHaveLength(53);
  expect(partial.excludedNumbers).toEqual([]);
  expect(partial.scored).toBe(false);
  expect(partial.verifiedKeys).toBe(false);
 });
 test("all browser-visible records omit provisional answers and marking data",()=>{
  for(const source of FNH_SUPPLIED_ARCHIVE.filter(x=>x.paper===1)){
   const data=fnhHistoricalPaper1Reader(source.id);
   if(!data)continue;
   expect(data.questions.every((q,i)=>i===0||q.number>data.questions[i-1].number)).toBe(true);
   for(const q of data.questions){
    expect(q).not.toHaveProperty("proposedAnswer");
    expect(q).not.toHaveProperty("answer");
    expect(q).not.toHaveProperty("explanation");
    expect(q).not.toHaveProperty("officialKeyEvidence");
    expect(q).not.toHaveProperty("officialKeyVerified");
    expect(q.options).toHaveLength(4);
    expect(Object.isFrozen(q.options)).toBe(true);
   }
   expect(fnhHistoricalSimulatorReady(source.id)).toBeNull();
  }
  for(const id of FNH_P1_RENDERABLE_DIAGRAM_IDS){
   expect(FnhPaper1HistoricalDiagram({type:id})).not.toBeNull();
  }
 });
 test("2003 records appear in their original numerical order even if draft data is shuffled",()=>{
  const paper=fnhHistoricalPaper1Reader("FNH-P1-2003-MJ");
  expect(paper.questions).toHaveLength(60);
  expect(paper.questions.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
 });
 test("unscored choices persist locally and never show answers or grades",()=>{
  const onBack=jest.fn();
  const view=render(<FnhHistoricalPaper1Reader sourceId="FNH-P1-2026-MJ" userId="student-1" onBack={onBack}/>);
  expect(screen.getByText("2026 Paper 1: Question review")).toBeInTheDocument();
  expect(screen.getByText("0 marks awarded")).toBeInTheDocument();
  expect(screen.getByText(/Your choices are saved on this device/)).toBeInTheDocument();
  const first=screen.getByRole("radio",{name:"mental"});
  fireEvent.click(first);
  expect(first).toBeChecked();
  expect(screen.getByText("1 selections saved")).toBeInTheDocument();
  expect(screen.queryByText(/Correct answer:/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:/Next question →/}));
  expect(screen.getByText("Original Question 2 of 60")).toBeInTheDocument();
  view.unmount();
  render(<FnhHistoricalPaper1Reader sourceId="FNH-P1-2026-MJ" userId="student-1" onBack={onBack}/>);
  fireEvent.click(screen.getByRole("button",{name:/Go to question 1, selected/}));
  expect(screen.getByRole("radio",{name:"mental"})).toBeChecked();
  fireEvent.click(screen.getByRole("button",{name:"Clear choice"}));
  expect(screen.getByRole("radio",{name:"mental"})).not.toBeChecked();
  fireEvent.click(screen.getByRole("button",{name:/Back to Paper 1 sources/}));
  expect(onBack).toHaveBeenCalledTimes(1);
 });
 test("archive navigation retains Past papers when returning from source review",()=>{
  render(<FnhPracticeHub userId="student-2" onBack={jest.fn()}/>);
  fireEvent.click(screen.getByRole("button",{name:/Paper 1/i}));
  fireEvent.click(screen.getByRole("button",{name:"Past papers"}));
  expect(screen.getByText("Historical Paper 1 sources")).toBeInTheDocument();
  const card=screen.getByRole("heading",{name:"2026 Paper 1"}).closest("article");
  fireEvent.click(within(card).getByRole("button",{name:/Review source questions/}));
  expect(screen.getByText("2026 Paper 1: Question review")).toBeInTheDocument();
  expect(screen.queryByRole("button",{name:"Start examination"})).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:/Back to Paper 1 sources/}));
  expect(screen.getByText("Historical Paper 1 sources")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Past papers"})).toHaveAttribute("aria-pressed","true");
  const invalid=screen.getByRole("heading",{name:"2021 Paper 1"}).closest("article");
  expect(within(invalid).queryByRole("button",{name:/Review source questions/})).not.toBeInTheDocument();
  expect(within(invalid).getByText(/The supplied file is not a Food/)).toBeInTheDocument();
 });
});
