/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PoaHistoricalExam from "./PoaHistoricalExam";
import { getPoaHistoricalPaper } from "../data/poaHistoricalPapers";
import manifest from "../../../public/principles-of-accounts/manifest.json";
import { freshHistoricalAttempt, historicalAttemptKey } from "./poaHistoricalAttempts";
import { startServerExamAttempt, submitServerExamAttempt, readServerExamClock } from "../../grading/serverExamAttempt";
jest.mock("../components/AccountingWorkspace", () => () => <div>Accounting tools</div>);
jest.mock("../../subjects/subjectProgress", () => ({ recordSubjectActivity: jest.fn(async () => ({ error: null })) }));
jest.mock("../../grading/serverExamAttempt", () => ({
  startServerExamAttempt: jest.fn(), submitServerExamAttempt: jest.fn(), readServerExamClock: jest.fn(),
  readServerExamV2Result: jest.fn(), localExamDeadline: (clock) => clock.localDeadline ?? null,
}));
beforeEach(() => {
  localStorage.clear(); jest.clearAllMocks(); window.scrollTo = jest.fn();
  if (!crypto.randomUUID) Object.defineProperty(crypto, "randomUUID", { value: () => String(Math.random()) });
  startServerExamAttempt.mockResolvedValue({ available: true, attempt_id: "server-123" });
  submitServerExamAttempt.mockResolvedValue({ available: true });
  readServerExamClock.mockResolvedValue({ available: false });
});
const props = (id) => ({ paper: getPoaHistoricalPaper(id), source: manifest.find((s) => s.id === id), userId: "learner-a", supabase: { rpc: jest.fn() }, onBack: jest.fn() });

test("historical answers, flags, page and question restore, then submit through V2 with no browser grade", async () => {
  const config = props("poa-1-2022-jan");
  const view = render(<PoaHistoricalExam {...config}/>);
  fireEvent.click(screen.getByRole("button", { name: "Start practice", exact: true }));
  await screen.findByRole("radio", { name: /^C / });
  fireEvent.click(screen.getByRole("radio", { name: /^C / }));
  expect(screen.queryByLabelText(/Calculation or reasoning/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Flag for review" }));
  fireEvent.click(screen.getByRole("button", { name: "Next question", exact: true }));
  expect(screen.getByRole("heading", { name: "Question 2", exact: true })).toBeInTheDocument();
  view.unmount();
  render(<PoaHistoricalExam {...config}/>);
  expect(screen.getByRole("heading", { name: "Question 2", exact: true })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Previous question", exact: true }));
  expect(screen.getByRole("radio", { name: /^C / })).toBeChecked();
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Remove flag" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Submit paper", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Submit now", exact: true }));
  await waitFor(() => expect(submitServerExamAttempt).toHaveBeenCalledTimes(1));
  expect(submitServerExamAttempt).toHaveBeenCalledWith(expect.objectContaining({ score: null, maxScore: 60,
    responses: expect.objectContaining({ "1": { answer: "C" } }),
    metadata: expect.objectContaining({ paper_id: "poa-1-2022-jan", scorePublicationAllowed: false, historical: true }),
  }));
  expect(screen.getByText(/Practice check: 1 of 60 checked answers correct/)).toBeInTheDocument();
  expect(screen.getByRole("radio", { name: /^C / })).toBeDisabled();
});

test("expiry preserves optional working with invalid selection and submits exactly once", async () => {
  const config = props("poa-2-2017-jan"), paper = config.paper;
  const saved = { ...freshHistoricalAttempt(paper), phase: "exam", mode: "timed", deadline: Date.now() - 1000,
    serverId: "restored-server", selectedQuestions: [1, 2, 3], responses: { "5": { working: "My complete optional answer" } } };
  localStorage.setItem(historicalAttemptKey(config.userId, paper.id), JSON.stringify(saved));
  render(<PoaHistoricalExam {...config}/>);
  await waitFor(() => expect(submitServerExamAttempt).toHaveBeenCalledTimes(1));
  expect(submitServerExamAttempt).toHaveBeenCalledWith(expect.objectContaining({
    attemptId: "restored-server", score: null, responses: expect.objectContaining({ "5": saved.responses["5"] }),
    metadata: expect.objectContaining({ selection_valid: false }),
  }));
  expect(screen.getByText(/All your responses were retained for review/)).toBeInTheDocument();
  expect(readServerExamClock).toHaveBeenCalledTimes(1);
});

test("restored timed practice refreshes the server clock before trusting an expired device deadline", async () => {
  const config = props("poa-1-2022-jan"), paper = config.paper;
  localStorage.setItem(historicalAttemptKey(config.userId, paper.id), JSON.stringify({ ...freshHistoricalAttempt(paper), phase: "exam", mode: "timed", deadline: Date.now() - 200000,
    serverId: "restored-server", selectedQuestions: paper.questions.map((q) => q.number) }));
  readServerExamClock.mockResolvedValue({ available: true, localDeadline: Date.now() + 100000 });
  render(<PoaHistoricalExam {...config}/>);
  await waitFor(() => expect(readServerExamClock).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(screen.getByText(/Time remaining 00:01:/)).toBeInTheDocument());
  expect(submitServerExamAttempt).not.toHaveBeenCalled();
});

test("the text Paper 1 has full answer choices, no reasoning field, and a save-and-exit control", async () => {
  const config = props("poa-1-2025-jan");
  render(<PoaHistoricalExam {...config}/>);
  fireEvent.click(screen.getByRole("button", { name: "Start practice", exact: true }));
  await screen.findByText(/Which of the following financial statements shows/);
  expect(screen.getByRole("radio", { name: /D Statement of financial position/ })).toBeInTheDocument();
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(document.querySelector("canvas, object, iframe")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Exit examination", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Save and exit", exact: true }));
  expect(config.onBack).toHaveBeenCalledTimes(1);
});

test("source cash-book, ledger-heading and cheque fields survive exit and submit as saved responses", async () => {
  const config = props("poa-2-2022-mj");
  const view = render(<PoaHistoricalExam {...config}/>);
  fireEvent.click(screen.getByRole("button", { name: "Start practice", exact: true }));
  const receipt = await screen.findByLabelText("Page 1, row 1, Receipts $");
  fireEvent.change(receipt, { target: { value: "1500" } });
  fireEvent.change(screen.getByLabelText("2022-1b-1, ACCT. TITLE:"), { target: { value: "Stationery" } });
  fireEvent.change(screen.getByLabelText("Cheque amount in figures"), { target: { value: "1484" } });
  fireEvent.click(screen.getByRole("button", { name: "Exit examination", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Save and exit", exact: true }));
  expect(submitServerExamAttempt).not.toHaveBeenCalled();
  view.unmount();
  render(<PoaHistoricalExam {...config}/>);
  expect(screen.getByLabelText("Page 1, row 1, Receipts $")).toHaveValue("1500");
  expect(screen.getByLabelText("2022-1b-1, ACCT. TITLE:")).toHaveValue("Stationery");
  expect(screen.getByLabelText("Cheque amount in figures")).toHaveValue("1484");
  fireEvent.click(screen.getByRole("button", { name: "Submit paper", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Submit now", exact: true }));
  await waitFor(() => expect(submitServerExamAttempt).toHaveBeenCalledWith(expect.objectContaining({ score: null,
    responses: expect.objectContaining({ "1": { cells: { "2022-1a:0:0": "1500", "2022-1b-1:heading:title": "Stationery", "2022-1c:amount": "1484" } } }),
  })));
});
