/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import PoaPracticeHub from "../principlesOfAccounts/practice/PoaPracticeHub";
import { getPoaHistoricalPaper } from "../principlesOfAccounts/data/poaHistoricalPapers";
import { freshHistoricalAttempt, historicalAttemptKey } from "../principlesOfAccounts/practice/poaHistoricalAttempts";
import FnhPracticeHub from "../fnh/practice/FnhPracticeHub";
import PobPracticeHub from "../principlesOfBusiness/practice/PobPracticeHub";
import InformationTechnologyPaper1Exam from "../informationTechnology/practice/InformationTechnologyPaper1Exam";
import InformationTechnologyPaper2Exam from "../informationTechnology/practice/InformationTechnologyPaper2Exam";
import EnglishAPracticeHub from "../englishA/practice/EnglishAPracticeHub";
import SocialStudiesPracticeHub from "../socialStudies/practice/SocialStudiesPracticeHub";
import IntegratedSciencePracticeHub from "../integratedScience/practice/IntegratedSciencePracticeHub";
import { loadIntegratedScienceBankIndex, loadIntegratedScienceModule } from "../integratedScience/data/integratedScienceBank";
import { startServerExamAttempt, submitServerExamAttempt, readServerExamClock, readServerExamV2Result } from "../grading/serverExamAttempt";

jest.mock("../grading/serverExamAttempt", () => ({
  startServerExamAttempt: jest.fn(async () => ({ available: false })),
  submitServerExamAttempt: jest.fn(async () => ({ available: false })),
  readServerExamV2Result: jest.fn(async () => ({ available: false })),
  readServerExamClock: jest.fn(async () => ({ available: false })),
  localExamDeadline: () => null,
}));
jest.mock("../subjects/subjectProgress", () => ({ recordSubjectActivity: jest.fn(async () => ({ error: null })) }));
jest.mock("../integratedScience/data/integratedScienceBank", () => ({
  ...jest.requireActual("../integratedScience/data/integratedScienceBank"),
  loadIntegratedScienceBankIndex: jest.fn(), loadIntegratedScienceModule: jest.fn(),
}));
jest.mock("../integratedScience/practice/IntegratedScienceQuestionRenderer", () => ({
  IntegratedSciencePaper1Question: ({question}) => <p>{question.id}</p>,
  IntegratedSciencePaper2Question: ({question}) => <p>{question.id}</p>,
}));

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); jest.clearAllMocks();
  startServerExamAttempt.mockResolvedValue({ available: false });
  submitServerExamAttempt.mockResolvedValue({ available: false });
  readServerExamClock.mockResolvedValue({ available: false });
  readServerExamV2Result.mockResolvedValue({ available: false });
  loadIntegratedScienceBankIndex.mockResolvedValue({});
  loadIntegratedScienceModule.mockResolvedValue({ module: 2, topics: [{ topic: 1, title: "Energy", objectives: [] }],
    paper01: [{ id: "restored-is-1", topic: 1 }, { id: "restored-is-2", topic: 1 }], paper02: [] });
  window.scrollTo = jest.fn();
  window.history.replaceState(null, "", "/");
  if (!crypto.randomUUID) Object.defineProperty(crypto, "randomUUID", { value: () => String(Math.random()) });
  global.structuredClone = value => JSON.parse(JSON.stringify(value));
});
const route = hash => window.history.replaceState(null, "", hash);
const again = (first, content) => { first.unmount(); return render(content); };

test("Accounts opens the same historical Paper 2 question after refresh, without standalone tools in the exam", () => {
  const paper = getPoaHistoricalPaper("poa-2-2022-mj");
  const key = historicalAttemptKey("refresh-student", paper.id);
  const deadline = Date.now() + 450000;
  localStorage.setItem(key, JSON.stringify({ ...freshHistoricalAttempt(paper), phase: "exam", mode: "timed", index: 1, deadline }));
  route("#/practice/principles-of-accounts?view=historical&paper=2&source=poa-2-2022-mj");
  const content = <PoaPracticeHub userId="refresh-student"/>;
  const first = render(content);
  expect(screen.getByRole("heading", { name: /^Question 2/ })).toBeInTheDocument();
  expect(screen.queryByText("Open accounting tools")).not.toBeInTheDocument();
  again(first, content);
  expect(screen.getByRole("heading", { name: /^Question 2/ })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(key)).deadline).toBe(deadline);
  expect(submitServerExamAttempt).not.toHaveBeenCalled();
});

test("Accounts library filters and paper selection survive a cold remount", () => {
  route("#/practice/principles-of-accounts");
  const content = <PoaPracticeHub userId="refresh-student"/>;
  const first = render(content);
  fireEvent.click(screen.getByRole("button", { name: "Open Paper 2", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Past papers", exact: true }));
  fireEvent.change(screen.getByLabelText("Year"), { target: { value: "2025" } });
  fireEvent.change(screen.getByLabelText("Session"), { target: { value: "JAN" } });
  again(first, content);
  expect(screen.getByRole("heading", { name: "Paper 2: Structured questions" })).toBeInTheDocument();
  expect(screen.getByLabelText("Year")).toHaveValue("2025");
  expect(screen.getByLabelText("Session")).toHaveValue("JAN");
  expect(screen.getByRole("button", { name: "Past papers", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("FNH set 2 opens the saved current question after refreshing its URL", () => {
  route("#/practice/food-nutrition-and-health");
  const content = <FnhPracticeHub userId="refresh-student"/>;
  const first = render(content);
  fireEvent.click(screen.getByRole("button", { name: /Paper 1/i }));
  fireEvent.click(within(screen.getByText("Practice set 2").closest("section")).getByRole("button", { name: /Select practice paper/i }));
  fireEvent.click(screen.getByRole("button", { name: "Start examination" }));
  fireEvent.click(screen.getByRole("button", { name: "Next", exact: true }));
  expect(window.location.hash).toContain("view=exam1");
  expect(window.location.hash).toContain("set1=2");
  again(first, content);
  expect(screen.getByText("Question 2 of 60", { exact: true })).toBeInTheDocument();
});

test("POB original Paper 1 resumes its question and deadline from the routed exam", () => {
  route("#/practice/principles-of-business");
  const content = <PobPracticeHub userId="refresh-student"/>;
  const first = render(content);
  fireEvent.click(screen.getByRole("button", { name: "Open Paper 1", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Start examination" }));
  fireEvent.click(screen.getByRole("button", { name: "Next question" }));
  const key = Object.keys(localStorage).find(key => key.startsWith("spark:pob:refresh-student:"));
  const deadline = JSON.parse(localStorage.getItem(key)).deadline;
  again(first, content);
  expect(screen.getByText("Question 2 of 60")).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(key)).deadline).toBe(deadline);
});

test("IT Paper 1 result survives refresh without adding a second result", () => {
  route("#/practice/information-technology/paper-1");
  const content = <InformationTechnologyPaper1Exam/>;
  const first = render(content);
  fireEvent.click(screen.getByRole("button", { name: "Start Paper 1", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Question 60", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: /Submit paper/i }));
  const results = localStorage.getItem("spark-it-paper1-results-v1");
  again(first, content);
  expect(screen.getByRole("button", { name: "Back to IT Practice" })).toBeInTheDocument();
  expect(localStorage.getItem("spark-it-paper1-results-v1")).toBe(results);
});

test("IT Paper 2 restores submitted marking and saved results without resubmitting", () => {
  route("#/practice/information-technology/paper-2");
  const content = <InformationTechnologyPaper2Exam/>;
  let first = render(content);
  fireEvent.click(screen.getByRole("button", { name: "Start Paper 2", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Submit paper now", exact: true }));
  first = again(first, content);
  fireEvent.click(screen.getByRole("button", { name: "Save result", exact: true }));
  const results = localStorage.getItem("spark-it-paper2-results-v1");
  again(first, content);
  expect(screen.getByRole("button", { name: "Back to IT Practice" })).toBeInTheDocument();
  expect(localStorage.getItem("spark-it-paper2-results-v1")).toBe(results);
  expect(submitServerExamAttempt).not.toHaveBeenCalled();
});

test("English A navigation restores its selected Paper 2 and instructions", () => {
  route("#/practice/english-a");
  const content = <EnglishAPracticeHub userId="refresh-student"/>;
  let first = render(content);
  fireEvent.click(screen.getByRole("button", { name: "Open Paper 2 Simulator" }));
  fireEvent.click(screen.getAllByRole("button", { name: /^Prepare / })[1]);
  const title = screen.getByRole("heading", { level: 1 }).textContent;
  first = again(first, content);
  expect(window.location.hash).toContain("mode=paper2");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(title);
  fireEvent.click(screen.getByRole("button", { name: /Back to Paper 2 library/ }));
  again(first, content);
  expect(screen.getByRole("heading", { name: "Paper 2 Simulator", exact: true })).toBeInTheDocument();
});

test("Social Studies Paper 1 retains its answer, current item and absolute deadline", () => {
  route("#/practice/social-studies");
  const content = <SocialStudiesPracticeHub userId="refresh-student"/>;
  const first = render(content);
  fireEvent.click(screen.getByRole("button", { name: "Start Paper 01" }));
  fireEvent.click(document.querySelector(".ss-question-options button"));
  fireEvent.click(screen.getByRole("button", { name: "Next", exact: true }));
  const key = "spark:social-studies:paper1:refresh-student";
  const saved = JSON.parse(localStorage.getItem(key));
  again(first, content);
  expect(screen.getByText("Question 2 of 60")).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(key))).toMatchObject({ endsAt: saved.endsAt, answers: saved.answers, index: 1 });
});

test("refreshing an expired Social Studies paper shows its result rather than a fresh timer", () => {
  route("#/practice/social-studies?mode=paper1");
  const key = "spark:social-studies:paper1:refresh-student";
  const endsAt = Date.now() - 5000;
  localStorage.setItem(key, JSON.stringify({ endsAt, index: 3, answers: {}, submitted: false }));
  const content = <SocialStudiesPracticeHub userId="refresh-student"/>;
  const first = render(content);
  expect(screen.getByText("Paper 01 complete")).toBeInTheDocument();
  again(first, content);
  expect(screen.getByText("Paper 01 complete")).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(key))).toMatchObject({ endsAt, submitted: true });
});

test("Integrated Science topic filters and current bank question survive asynchronous bank loading", async () => {
  route("#/practice/integrated-science?mode=topic&module=2&topic=1&question=1");
  const content = <IntegratedSciencePracticeHub userId="refresh-student"/>;
  const first = render(content);
  await screen.findByText("restored-is-2");
  again(first, content);
  await screen.findByText("restored-is-2");
  expect(screen.getByLabelText("Module")).toHaveValue("2");
  expect(screen.getByLabelText("Topic")).toHaveValue("1");
});
