import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SightDefectsExplorer from "./SightDefectsExplorer";

test("switches the sourced eye illustration when the lesson tab changes", () => {
  render(<SightDefectsExplorer />);
  expect(screen.getByRole("img", { name: "Short sight: focus in front of the retina" })).toHaveAttribute("src", expect.stringContaining("0390.svg"));
  fireEvent.click(screen.getByRole("button", { name: /Long sight/i }));
  expect(screen.getByRole("img", { name: "Long sight: focus behind the retina" })).toHaveAttribute("src", expect.stringContaining("0391.svg"));
  expect(screen.queryByRole("img", { name: "Short sight: focus in front of the retina" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /^Astigmatism$/i }));
  expect(screen.getByRole("img", { name: "Astigmatism" })).toHaveAttribute("src", expect.stringContaining("0392.svg"));
});

test("exposes source credits without removing the lesson controls", () => {
  render(<SightDefectsExplorer />);
  expect(screen.getByText("Image credits")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "short sighted eye", hidden: true })).toHaveAttribute("href", expect.stringContaining("/Servier/short-sighted-eye.svg"));
  expect(screen.getByRole("button", { name: /Cataract/i })).toBeEnabled();
});
