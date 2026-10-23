/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import AccountingWorkspace, {
  validateAccountingWork,
} from "./AccountingWorkspace";
beforeEach(() => {
  localStorage.clear();
  global.structuredClone = (value) => JSON.parse(JSON.stringify(value));
  if (!crypto.randomUUID)
    Object.defineProperty(crypto, "randomUUID", {
      value: () => String(Math.random()),
    });
});
test("posts a split journal entry, links ledger and trial balance, and restores it", () => {
  const onComplete = jest.fn();
  const view = render(
    <AccountingWorkspace
      userId="student-a"
      topic={{ id: "poa-s4", sectionId: "poa-section-4" }}
      onActivityComplete={onComplete}
    />,
  );
  fireEvent.change(screen.getByLabelText("Transaction description"), {
    target: { value: "Opening investment" },
  });
  fireEvent.change(screen.getByLabelText("Debit 1"), {
    target: { value: "10000" },
  });
  fireEvent.change(screen.getByLabelText("Account 2"), {
    target: { value: "capital" },
  });
  fireEvent.change(screen.getByLabelText("Credit 2"), {
    target: { value: "10000" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Post transaction" }));
  expect(screen.getByText(/Opening investment/)).toBeInTheDocument();
  expect(onComplete).toHaveBeenCalledWith(
    expect.objectContaining({
      activityType: "lab",
      activityId: "poa:poa-s4:journal",
    }),
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Trial balance", exact: true }),
  );
  expect(screen.getAllByText("10,000.00").length).toBeGreaterThan(1);
  view.unmount();
  render(<AccountingWorkspace userId="student-a" />);
  expect(screen.getByText(/Opening investment/)).toBeInTheDocument();
});
test("unbalanced transactions do not post and show useful feedback", () => {
  render(<AccountingWorkspace userId="student-a" />);
  fireEvent.change(screen.getByLabelText("Transaction description"), {
    target: { value: "Wrong amount" },
  });
  fireEvent.change(screen.getByLabelText("Debit 1"), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByLabelText("Account 2"), {
    target: { value: "capital" },
  });
  fireEvent.change(screen.getByLabelText("Credit 2"), {
    target: { value: "99" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Post transaction" }));
  expect(screen.getByText(/must equal credits/)).toBeInTheDocument();
  expect(
    JSON.parse(localStorage.getItem("spark-poa-workspace-v1:student-a"))
      .entries,
  ).toHaveLength(0);
});
test("budget opening cash and inventory movements survive remount and stay scoped to student", () => {
  const view = render(<AccountingWorkspace userId="student-a" />);
  fireEvent.click(screen.getByRole("button", { name: "Budgets", exact: true }));
  fireEvent.change(
    screen.getByLabelText("Initial cash balance (negative for overdraft)"),
    { target: { value: "7500" } },
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Inventory", exact: true }),
  );
  fireEvent.click(screen.getByRole("button", { name: "Add movement" }));
  view.unmount();
  const second = render(<AccountingWorkspace userId="student-a" />);
  fireEvent.click(screen.getByRole("button", { name: "Budgets", exact: true }));
  expect(
    screen.getByLabelText("Initial cash balance (negative for overdraft)")
      .value,
  ).toBe("7500");
  fireEvent.click(
    screen.getByRole("button", { name: "Inventory", exact: true }),
  );
  expect(
    screen.getByText(/Closing stock: 10 units valued at 50/),
  ).toBeInTheDocument();
  second.unmount();
  render(<AccountingWorkspace userId="student-b" />);
  fireEvent.click(screen.getByRole("button", { name: "Budgets", exact: true }));
  expect(
    screen.getByLabelText("Initial cash balance (negative for overdraft)")
      .value,
  ).toBe("0");
});
test("custom partner accounts appear in the journal and persisted chart", () => {
  render(<AccountingWorkspace userId="student-a" />);
  fireEvent.click(screen.getByRole("button", { name: "Ledger", exact: true }));
  fireEvent.change(screen.getByLabelText("New account name"), {
    target: { value: "Asha current" },
  });
  fireEvent.change(screen.getByLabelText("Account category"), {
    target: { value: "equity" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add account" }));
  fireEvent.click(screen.getByRole("button", { name: "Journal", exact: true }));
  expect(
    within(screen.getByLabelText("Account 1")).getByRole("option", {
      name: "Asha current",
    }),
  ).toBeInTheDocument();
});
test("backup validation rejects malformed and unbalanced journals", () => {
  expect(() =>
    validateAccountingWork({
      entries: [
        {
          id: "bad",
          date: "2026-01-01",
          description: "Bad",
          lines: [{ account: "bank", debit: 100, credit: 0 }],
        },
      ],
    }),
  ).toThrow();
});
