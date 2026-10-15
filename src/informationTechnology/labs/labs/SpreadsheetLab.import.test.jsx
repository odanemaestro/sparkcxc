/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SpreadsheetLab from "./SpreadsheetLab";
import { workspaceStorageKey } from "../models/workspacePersistence.mjs";

const lab = { title: "Spreadsheet Studio", description: "Test worksheet navigation", mark: "IT", app: "Spreadsheet" };

test("recovers imported custom worksheets without requiring a Sales sheet", () => {
  const id = "test-imported-custom-worksheets";
  const key = workspaceStorageKey(id, "spreadsheet");
  window.localStorage.setItem(key, JSON.stringify({
    version: 1, labId: "spreadsheet", value: { Budget: { A1: "Imported budget", B2: 50 } }
  }));
  try {
    render(<SpreadsheetLab lab={lab} userId={id} completed={false} onBack={() => {}} onComplete={() => {}} />);
    const budget = screen.getByRole("tab", { name: "Budget" });
    expect(budget).toBeInTheDocument();
    fireEvent.click(budget);
    expect(screen.getByRole("table", { name: "Budget editable worksheet" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Budget A1, Imported budget/ })).toBeInTheDocument();
  } finally { window.localStorage.removeItem(key); }
});
