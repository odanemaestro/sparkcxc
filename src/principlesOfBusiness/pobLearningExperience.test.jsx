/** @jest-environment jsdom */
import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import PobLearningTools,{PobTopicPractice} from "./components/PobLearningTools";
import PobPracticeHub,{PobPaper1Exam,PobPaper2Exam} from "./practice/PobPracticeHub";
import PobSbaWorkspace from "./practice/PobSbaWorkspace";
import {POB_TOPICS} from "./data/pobCourse";

beforeEach(()=>{
  window.localStorage.clear();
  Object.defineProperty(window,"scrollTo",{value:jest.fn(),writable:true,configurable:true});
});
afterEach(()=>{jest.clearAllMocks()});

test("POB lesson displays interactive calculation tools alongside three subject-specific questions",()=>{
  const topic=POB_TOPICS.find(t=>t.metadata.syllabus.section===5);
  const {container}=render(<PobLearningTools topic={topic}/>);
  expect(screen.getByRole("region",{name:"Business calculations laboratory"})).toBeInTheDocument();
  expect(screen.getByRole("region",{name:"Principles of Business quick practice"})).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-mcq")).toHaveLength(3);
  expect(screen.getByText(/Output per labour hour/)).toBeInTheDocument();
});

test("POB topic practice can be answered, checked and retried",()=>{
  const topic=POB_TOPICS.find(t=>t.metadata.syllabus.section===1);
  const callback=jest.fn();
  const {container}=render(<PobTopicPractice topic={topic} onActivityComplete={callback}/>);
  expect(container.querySelectorAll("fieldset.pob-mcq")).toHaveLength(3);
  expect(screen.getByRole("button",{name:"Check answers"})).toBeDisabled();
  for(const fieldset of container.querySelectorAll("fieldset.pob-mcq")){
    fireEvent.click(fieldset.querySelector('input[type="radio"]'));
  }
  fireEvent.click(screen.getByRole("button",{name:"Check answers"}));
  expect(callback).toHaveBeenCalledWith(expect.objectContaining({
    subjectId:"principles-of-business",topicId:topic.id,activityKey:expect.stringMatching(/^pob-practice:pob-s1-lesson-01:\d+$/),total:3
  }));
  expect(screen.getAllByText(/Correct answer:|Correct/).length).toBeGreaterThan(0);
  fireEvent.click(screen.getByRole("button",{name:"Try again"}));
  expect(screen.getByRole("button",{name:"Check answers"})).toBeDisabled();
});

test("POB Paper 1 has a real exam instructions page and 60-question navigator",()=>{
  const {container}=render(<PobPaper1Exam userId="test-student" onBack={jest.fn()}/>);
  expect(screen.getByRole("heading",{name:/Paper 1: Multiple-choice examination/})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
  expect(screen.getByText("Question 1 of 60")).toBeInTheDocument();
  expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(60);
  expect(screen.getByRole("button",{name:"Submit Paper 1"})).toBeInTheDocument();
});

test("POB Paper 2 is five compulsory 20-mark scenarios with written response entry",()=>{
  render(<PobPaper2Exam userId="test-student" onBack={jest.fn()}/>);
  expect(screen.getByText(/Five compulsory 20-mark questions/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
  expect(screen.getByText("20 marks")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox")).toHaveLength(5);
  expect(screen.getByRole("button",{name:"Question 5: 0 of 5 parts answered"})).toBeInTheDocument();
});

test("POB SBA draft warns against invented evidence and does not claim official marks",()=>{
  render(<PobSbaWorkspace onBack={jest.fn()}/>);
  expect(screen.getByText("Research must be real.")).toBeInTheDocument();
  expect(screen.getByText(/does not automatically earn its official marks/)).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Export research draft"})).toBeDisabled();
  fireEvent.change(screen.getByRole("textbox"),{target:{value:"How do prices influence buying decisions at a neighbourhood grocery?"}});
  expect(screen.getByText(/1 of 10 sections started/)).toBeInTheDocument();
});

test("POB practice hub offers historical source preview but no fabricated historical grades",()=>{
  render(<PobPracticeHub userId="test-student" onBack={jest.fn()}/>);
  expect(screen.getByRole("button",{name:"Open Paper 1"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Open Paper 2"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Open research workspace"})).toBeInTheDocument();
  expect(screen.getByText(/The January 2026 historical Paper 2 supports experimental AI-assisted marking/)).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Browse all 46 historical papers"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Preview historical Paper 2"})).toBeInTheDocument();
});

test("POB Paper 2 navigator shows per-question answered-part progress",()=>{
 render(<PobPaper2Exam userId="test-student" onBack={jest.fn()}/>);
 fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
 expect(screen.getByRole("button",{name:"Question 1: 0 of 5 parts answered"})).toHaveAttribute("aria-current","step");
 const response=screen.getAllByRole("textbox")[0];
 fireEvent.change(response,{target:{value:"An entrepreneur organises business resources and takes risks."}});
 expect(screen.getByRole("button",{name:"Question 1: 1 of 5 parts answered"})).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Question 2: 0 of 5 parts answered"}));
 expect(screen.getByRole("button",{name:"Question 2: 0 of 5 parts answered"})).toHaveAttribute("aria-current","step");
 expect(screen.getByRole("button",{name:"Question 1: 1 of 5 parts answered"})).not.toHaveAttribute("aria-current");
});

test("POB Paper 2 review summarises answered parts without assigning marks",()=>{
 render(<PobPaper2Exam userId="test-student" onBack={jest.fn()}/>);
 fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
 fireEvent.change(screen.getAllByRole("textbox")[0],{target:{value:"An entrepreneur organises resources and accepts risks."}});
 fireEvent.click(screen.getByRole("button",{name:"Submit Paper 2"}));
 fireEvent.click(screen.getByRole("button",{name:"Submit responses"}));
 expect(screen.getByText(/Question 1: 1 of 5 parts answered/)).toBeInTheDocument();
 expect(screen.getByText(/No score has been invented/)).toBeInTheDocument();
});

test("2019 specimen is one uninterrupted 60-item sitting, never six user-facing checkpoints",()=>{
 const {container}=render(<PobPracticeHub userId="specimen-flow-test" onBack={jest.fn()}/>);
 expect(screen.getByRole("button",{name:"Start 2019 specimen Paper 1"})).toBeInTheDocument();
 expect(screen.queryByRole("button",{name:"Questions 1–10"})).not.toBeInTheDocument();
 expect(screen.queryByRole("button",{name:"Questions 51–60"})).not.toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Start 2019 specimen Paper 1"}));
 expect(screen.getByText(/60 questions over 75 minutes/)).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
 expect(container.querySelectorAll(".pob-exam-number-grid button")).toHaveLength(60);
 expect(screen.getByText("Question 1 of 60")).toBeInTheDocument();
 const next=screen.getByRole("button",{name:"Next question"});
 fireEvent.click(next);
 expect(screen.getByText("Question 2 of 60")).toBeInTheDocument();
});
test("Paper 2 uses its existing question navigator, without a redundant next-incomplete button",()=>{
 render(<PobPaper2Exam userId="question-skip-test" onBack={jest.fn()}/>);
 fireEvent.click(screen.getByRole("button",{name:"Start Paper 2"}));
 expect(screen.queryByRole("button",{name:/Go to next incomplete question/})).not.toBeInTheDocument();
 expect(screen.getByRole("button",{name:"Question 1: 0 of 5 parts answered"})).toBeInTheDocument();
 expect(screen.getByRole("button",{name:"Next question"})).toBeInTheDocument();
});
