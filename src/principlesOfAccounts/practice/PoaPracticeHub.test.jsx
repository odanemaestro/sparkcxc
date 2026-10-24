/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import PoaPracticeHub from "./PoaPracticeHub";
import {
  startServerExamAttempt,
  submitServerExamAttempt,
  readServerExamV2Result,
} from "../../grading/serverExamAttempt";
jest.mock("../../fnh/practice/FnhPaper1Exam", () => () => null);
jest.mock("../../grading/serverExamAttempt", () => ({
  startServerExamAttempt: jest.fn(),
  submitServerExamAttempt: jest.fn(),
  readServerExamV2Result: jest.fn(),
  localExamDeadline: () => null,
}));
jest.mock("../../subjects/subjectProgress", () => ({
  recordSubjectActivity: jest.fn(async () => ({ error: null })),
}));
const openOriginalPaper2 = () => {
  fireEvent.click(screen.getByRole("button", { name: "Open Paper 2", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Select practice paper", exact: true }));
};
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  window.scrollTo = jest.fn();
  global.structuredClone = (v) => JSON.parse(JSON.stringify(v));
  if (!crypto.randomUUID)
    Object.defineProperty(crypto, "randomUUID", {
      value: () => String(Math.random()),
    });
  startServerExamAttempt.mockResolvedValue({
    available: true,
    attempt_id: "saved-attempt",
  });
  submitServerExamAttempt.mockResolvedValue({ available: true });
  readServerExamV2Result.mockResolvedValue({
    available: true,
    status: "provisional",
    score: null,
    unresolvedMarks: 100,
  });
});
test("submits immutable response keys and a null score to the shared V2 attempt path", async () => {
  render(<PoaPracticeHub userId="student-a" supabase={{ rpc: jest.fn() }} />);
  openOriginalPaper2();
  fireEvent.click(
    screen.getByRole("button", { name: "Start Paper 2", exact: true }),
  );
  await waitFor(() =>
    expect(screen.getByLabelText(/^Net sales/)).toBeInTheDocument(),
  );
  expect(startServerExamAttempt).toHaveBeenCalledWith(
    expect.objectContaining({
      subjectId: "principles-of-accounts",
      graderVersion: "marking-reconciliation-v2",
      durationSeconds: 10800,
    }),
  );
  fireEvent.change(screen.getByLabelText(/^Net sales/), {
    target: { value: "$116,000" },
  });
  fireEvent.click(
    screen.getByRole("button", { name: "Submit Paper 2", exact: true }),
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Submit now", exact: true }),
  );
  await waitFor(() =>
    expect(submitServerExamAttempt).toHaveBeenCalledWith(
      expect.objectContaining({
        attemptId: "saved-attempt",
        score: null,
        maxScore: 100,
        responses: expect.objectContaining({
          "POA-Q1::1": { answer: "$116,000" },
        }),
      }),
    ),
  );
  expect(
    screen.getByText(/1 matching numerical checkpoints out of 100/),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/^Net sales/)).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "Check grading result" }));
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent(
      "A final score is not yet available",
    ),
  );
  expect(readServerExamV2Result).toHaveBeenCalledWith(
    expect.objectContaining({ attemptId: "saved-attempt" }),
  );
});
test("an expired saved attempt automatically submits the saved answers once", async () => {
  localStorage.setItem(
    "spark-poa-paper2-v1:student-a",
    JSON.stringify({
      phase: "exam",
      id: "restored",
      responses: { "POA-Q1::1": { answer: "116000" } },
      index: 0,
      deadline: Date.now() - 1000,
      serverId: "restored-server",
    }),
  );
  render(<PoaPracticeHub userId="student-a" supabase={{ rpc: jest.fn() }} />);
  openOriginalPaper2();
  await waitFor(() => expect(submitServerExamAttempt).toHaveBeenCalledTimes(1));
  expect(submitServerExamAttempt).toHaveBeenCalledWith(
    expect.objectContaining({
      attemptId: "restored-server",
      responses: { "POA-Q1::1": { answer: "116000" } },
      score: null,
    }),
  );
  expect(startServerExamAttempt).not.toHaveBeenCalled();
});

test("Paper 2 can save and exit without submitting the attempt", async () => {
  render(<PoaPracticeHub userId="student-a" supabase={{ rpc: jest.fn() }}/>);
  openOriginalPaper2();
  fireEvent.click(screen.getByRole("button", { name: "Start Paper 2", exact: true }));
  await screen.findByLabelText(/^Net sales/);
  fireEvent.change(screen.getByLabelText(/^Net sales/), { target: { value: "116000" } });
  fireEvent.change(screen.getByLabelText("Show your working for this question"), { target: { value: "120000 - 4000 = 116000" } });
  fireEvent.click(screen.getByRole("button", { name: "Exit examination", exact: true }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Save and exit", exact: true }));
  expect(screen.getByRole("heading", { name: "Paper 2: Structured questions", exact: true })).toBeInTheDocument();
  expect(submitServerExamAttempt).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Select practice paper", exact: true }));
  expect(screen.getByLabelText(/^Net sales/)).toHaveValue("116000");
  expect(screen.getByLabelText("Show your working for this question")).toHaveValue("120000 - 4000 = 116000");
  expect(screen.queryByText(/missing|duplicate/i)).not.toBeInTheDocument();
});

test("paper libraries separate practice sets and past papers and retain each paper's filters", () => {
  render(<PoaPracticeHub userId="student-a" />);
  expect(screen.getByRole("button", { name: "Open accounting tools" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Open Paper 1", exact: true }));
  expect(screen.getByRole("button", { name: "Practice sets", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "Select specimen paper" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Past papers", exact: true }));
  fireEvent.change(screen.getByLabelText("Year"), { target: { value: "2025" } });
  fireEvent.change(screen.getByLabelText("Session"), { target: { value: "JAN" } });
  const paper1Library = screen.getByRole("region", { name: "Paper 1 past papers" });
  expect(within(paper1Library).getAllByRole("article")).toHaveLength(1);
  expect(within(paper1Library).getByRole("heading", { name: "2025 January" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Back to Accounts practice" }));
  fireEvent.click(screen.getByRole("button", { name: "Open Paper 2", exact: true }));
  expect(screen.getByRole("button", { name: "Practice sets", exact: true })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Past papers", exact: true }));
  expect(screen.getByLabelText("Year")).toHaveValue("all");
  fireEvent.click(screen.getByRole("button", { name: "Back to Accounts practice" }));
  fireEvent.click(screen.getByRole("button", { name: "Open Paper 1", exact: true }));
  expect(screen.getByRole("button", { name: "Past papers", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByLabelText("Year")).toHaveValue("2025");
  expect(screen.getByLabelText("Session")).toHaveValue("JAN");
});
