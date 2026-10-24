/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import Paper1Exam from "./Paper1Exam";
import Paper2Exam from "./Paper2Exam";
import Paper2027ModuleExam from "./Paper2027ModuleExam";
import * as paper1Engine from "./paper1Engine";
import { buildPaper2Exam } from "./paper2Engine";
import { getCsec2027Paper, csec2027ActiveKey } from "./csec2027Data";
import { savePracticeExamAttempt } from "./persistence";
jest.mock("./persistence", () => ({
  ...jest.requireActual("./persistence"), savePracticeExamAttempt: jest.fn(),
}));
const bank = Array.from({ length: 60 }, (_, index) => ({
  question_id: `refresh-q${index + 1}`, question_number: index + 1, paper: "Paper 1", year: 2020,
  sitting: "MJ", topic: "Algebra", subtopic: "Computation", stem: `Refresh question ${index + 1}`,
  correct_option: "A", correct_answer: "1", option_a: "1", option_b: "2", option_c: "3", option_d: "4",
}));
beforeEach(() => {
  localStorage.clear(); window.scrollTo = jest.fn();
  jest.spyOn(paper1Engine, "loadPaper1Bank").mockResolvedValue(bank);
  jest.spyOn(paper1Engine, "loadPaper1Diagrams").mockResolvedValue({});
  savePracticeExamAttempt.mockResolvedValue({});
});
afterEach(() => jest.restoreAllMocks());

test("Mathematics Paper 1 restores the submitted review and its current question without saving another result", async () => {
  localStorage.setItem("spark-paper1-review-v1:review-student", JSON.stringify({
    phase: "review", id: "submitted-p1", seed: 9, templatePaper: "Paper 1",
    questionIds: bank.map(question => question.question_id), answers: { "refresh-q5": "A" }, flags: [],
    currentIndex: 6, deadline: Date.now() - 5000, usedSeconds: 100, reviewIndex: 4,
  }));
  const first = render(<Paper1Exam userId="review-student"/>);
  await screen.findByRole("heading", { name: "Question 5 of 60" });
  first.unmount();
  render(<Paper1Exam userId="review-student"/>);
  await screen.findByRole("heading", { name: "Question 5 of 60" });
  expect(localStorage.getItem("spark-paper1-active-v1")).toBeNull();
  expect(localStorage.getItem("spark-paper1-results-v1")).toBeNull();
  expect(savePracticeExamAttempt).not.toHaveBeenCalled();
});

test("Mathematics Paper 2 restores the submitted review without restarting the timer or publication", () => {
  const exam = buildPaper2Exam({ seed: 42, previouslyUsedQuestionIds: [] });
  localStorage.setItem("spark-paper2-review-v1:review-student", JSON.stringify({
    phase: "review", exam, answers: {}, flags: [], currentIndex: 0,
    deadline: Date.now() - 5000, remaining: 300, timedOut: false, reviewIndex: 2,
  }));
  const first = render(<Paper2Exam userId="review-student"/>);
  expect(screen.getByRole("heading", { name: `Question ${exam.questions[2].question_number}`, exact: true })).toBeInTheDocument();
  first.unmount();
  render(<Paper2Exam userId="review-student"/>);
  expect(screen.getByRole("heading", { name: `Question ${exam.questions[2].question_number}`, exact: true })).toBeInTheDocument();
  expect(localStorage.getItem("spark-paper2-active-v52")).toBeNull();
  expect(localStorage.getItem("spark-paper2-results-v2")).toBeNull();
  expect(savePracticeExamAttempt).not.toHaveBeenCalled();
});

test("2027 Mathematics restores a completed module's review rather than new instructions", () => {
  const paper = getCsec2027Paper("module1", "A");
  const key = csec2027ActiveKey(paper.letter, paper.modeKey);
  localStorage.setItem(`${key}:review:review-student`, JSON.stringify({
    phase: "review", paperId: paper.paper_id, answers: {}, flags: [], currentIndex: 0,
    deadline: Date.now() - 5000, remaining: 150, reviewIndex: 1,
  }));
  const first = render(<Paper2027ModuleExam paper={paper} userId="review-student"/>);
  expect(document.querySelector(".paper2-review-head")).toHaveTextContent(`Module ${paper.questions[1].module} · Question ${paper.questions[1].question_number}`);
  first.unmount();
  render(<Paper2027ModuleExam paper={paper} userId="review-student"/>);
  expect(document.querySelector(".paper2-review-head")).toHaveTextContent(`Module ${paper.questions[1].module} · Question ${paper.questions[1].question_number}`);
  expect(localStorage.getItem(key)).toBeNull();
  expect(savePracticeExamAttempt).not.toHaveBeenCalled();
});
