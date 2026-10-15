/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DatabaseLab from "./DatabaseLab";

const lab = {
  id: "database",
  title: "Database Studio",
  description: "Build related tables",
  mark: "DB",
  app: "Database"
};

test("Relationships navigation reveals accessible form fields and saves an order", () => {
  const userId = "database-relationship-form-test";
  render(<DatabaseLab lab={lab} userId={userId} completed={false} onBack={() => {}} onComplete={() => {}} />);
  fireEvent.click(screen.getByRole("button", { name: "Relationships" }));
  const relationship = screen.getByRole("combobox", { name: "Relationship type" });
  expect(relationship).toBeInTheDocument();
  expect(relationship.closest(".itv2-db-relationship-field")).toBeInTheDocument();
  fireEvent.change(relationship, { target: { value: "One-to-many" } });
  expect(relationship).toHaveValue("One-to-many");
  const orderFields = screen.getByLabelText("Order ID").closest(".itv2-db-order-fields");
  expect(orderFields).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "Customer" })).toBeInTheDocument();
  expect(screen.getByRole("spinbutton", { name: "Amount (JMD)" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Save order" }));
  expect(screen.getByText("Order saved with a valid customer foreign key.")).toBeInTheDocument();
});
