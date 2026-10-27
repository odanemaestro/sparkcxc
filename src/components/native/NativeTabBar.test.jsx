import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NativeTabBar from "./NativeTabBar";

test("renders accessible native student destinations and indicates active tab", () => {
  const onNavigate = jest.fn();
  render(<NativeTabBar view="study" onNavigate={onNavigate} />);
  expect(screen.getByRole("navigation", { name: "Student navigation" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Study" }).getAttribute("aria-current")).toBe("page");
  fireEvent.click(screen.getByRole("button", { name: "Practice" }));
  expect(onNavigate).toHaveBeenCalledWith("practice");
  fireEvent.click(screen.getByRole("button", { name: "Study" }));
  expect(onNavigate).toHaveBeenCalledTimes(1);
});
