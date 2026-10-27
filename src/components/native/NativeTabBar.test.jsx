import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NativeTabBar, { activeNativeTab } from "./NativeTabBar";

jest.mock("../notifications/NotificationCenter", () => () => <button type="button">Open notifications</button>);
jest.mock("../ui/ThemeSelector", () => ({ onChange }) => <button type="button" onClick={() => onChange("dark")}>Change appearance</button>);

test("native tabs navigate between the five student destinations", () => {
  const onNavigate = jest.fn();
  const onLogout = jest.fn();
  render(<NativeTabBar view="study" onNavigate={onNavigate} user={{ email:"student@example.com" }} profile={{ name:"Student" }} onLogout={onLogout} />);
  expect(screen.getByRole("navigation", { name:"Student navigation" })).toBeTruthy();
  expect(screen.getByRole("button", { name:"Study" }).getAttribute("aria-current")).toBe("page");
  fireEvent.click(screen.getByRole("button", { name:"Practice" }));
  expect(onNavigate).toHaveBeenCalledWith("practice");
  fireEvent.click(screen.getByRole("button", { name:"More" }));
  expect(screen.getByRole("dialog", { name:"More" })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name:/Flashcards/ }));
  expect(onNavigate).toHaveBeenCalledWith("dashboard:flashcards");
});

test("progress dashboard route lights up the progress tab", () => {
  expect(activeNativeTab("dashboard", "#/dashboard/progress")).toBe("progress");
  expect(activeNativeTab("dashboard", "#/dashboard/subjects")).toBe("dashboard");
  expect(activeNativeTab("practice", "#/dashboard/progress")).toBe("practice");
});

test("account actions remain available in More", () => {
  const onLogout = jest.fn();
  const setThemeMode = jest.fn();
  render(<NativeTabBar view="dashboard" onNavigate={() => {}} user={{ email:"student@example.com" }} onLogout={onLogout} setThemeMode={setThemeMode} resolvedTheme="light" />);
  fireEvent.click(screen.getByRole("button", { name:"More" }));
  expect(screen.getByRole("button", { name:"Open notifications" })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name:"Change appearance" }));
  expect(setThemeMode).toHaveBeenCalledWith("dark");
  fireEvent.click(screen.getByRole("button", { name:/Log out/ }));
  expect(onLogout).toHaveBeenCalledTimes(1);
});
