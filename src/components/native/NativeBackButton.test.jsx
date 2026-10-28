import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NativeBackButton from "./NativeBackButton";

test("left chevron has a full, accessible back target", () => {
  const back = jest.fn();
  render(<NativeBackButton onClick={back} label="Back to subjects" />);
  const button = screen.getByRole("button", { name: "Back to subjects" });
  expect(button.getAttribute("type")).toBe("button");
  expect(button.querySelector("svg")).not.toBeNull();
  expect(button.textContent).toBe("");
  fireEvent.click(button);
  expect(back).toHaveBeenCalledTimes(1);
});

test("disabled chevron does not navigate", () => {
  const back = jest.fn();
  render(<NativeBackButton onClick={back} disabled />);
  fireEvent.click(screen.getByRole("button", { name: "Go back" }));
  expect(back).not.toHaveBeenCalled();
});
