import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NativeSubjectPicker from "./NativeSubjectPicker";

const subjects = [
  {id:"mathematics",name:"CSEC Mathematics",shortName:"Mathematics",description:"Long catalogue details"},
  {id:"food-nutrition-and-health",name:"CSEC Food, Nutrition and Health",shortName:"Food, Nutrition and Health",description:"Long programme description"},
];

test("native study picker keeps subjects with no marketing copy", () => {
  const onSelect = jest.fn();
  render(<NativeSubjectPicker subjects={subjects} capability="study" onSelect={onSelect}/>);
  expect(screen.getByRole("heading", {name:"Study"})).toBeTruthy();
  expect(screen.getByText("2 subjects")).toBeTruthy();
  expect(screen.queryByText("Long catalogue details")).toBeNull();
  expect(screen.queryByText("Available")).toBeNull();
  fireEvent.click(screen.getByRole("button", {name:"Open Mathematics"}));
  expect(onSelect).toHaveBeenCalledWith(subjects[0]);
});

test("practice and all-subject progress keep their callbacks", () => {
  const onSelectAll = jest.fn();
  render(<NativeSubjectPicker subjects={subjects.slice(0,1)} capability="progress" allOption onSelectAll={onSelectAll}/>);
  fireEvent.click(screen.getByRole("button", {name:/All subjects/}));
  expect(onSelectAll).toHaveBeenCalledTimes(1);
});

test("empty state remains accessible", () => {
  render(<NativeSubjectPicker subjects={[]} capability="flashcards" />);
  expect(screen.getByText("No subjects here yet.")).toBeTruthy();
});

test("embedded subject picker has a left chevron that returns to previous screen", () => {
  const onBack = jest.fn();
  render(<NativeSubjectPicker subjects={subjects} capability="study" embedded onBack={onBack}/>);
  const back = screen.getByRole("button", {name:"Back to previous screen"});
  expect(back.textContent).toBe("");
  fireEvent.click(back);
  expect(onBack).toHaveBeenCalledTimes(1);
});

beforeEach(() => window.localStorage.clear());

test("a previously opened enrolled subject appears once at the top", () => {
  const onSelect = jest.fn();
  const props = { subjects, capability: "study", userId: "student-1", onSelect };
  const first = render(<NativeSubjectPicker {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "Open Physics" }));
  expect(onSelect).toHaveBeenCalledWith(subjects[1]);
  first.unmount();

  render(<NativeSubjectPicker {...props} />);
  expect(screen.getByRole("heading", { name: "Recently opened" })).toBeTruthy();
  expect(screen.getAllByRole("button", { name: "Open Physics" })).toHaveLength(1);
  const recentGroup = screen.getByRole("heading", { name: "Recently opened" }).nextElementSibling;
  expect(recentGroup.querySelector("button")?.getAttribute("aria-label")).toBe("Open Physics");
});

test("recent subject never leaks to another student or capability", () => {
  const props = { subjects, capability: "study", userId: "student-1", onSelect: jest.fn() };
  const first = render(<NativeSubjectPicker {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "Open Physics" }));
  first.unmount();

  const otherUser = render(<NativeSubjectPicker {...props} userId="student-2" />);
  expect(screen.queryByRole("heading", { name: "Recently opened" })).toBeNull();
  otherUser.unmount();

  render(<NativeSubjectPicker {...props} capability="practice" />);
  expect(screen.queryByRole("heading", { name: "Recently opened" })).toBeNull();
});

test("hidden or unenrolled subjects are never restored into the recent row", () => {
  const props = { subjects, capability: "study", userId: "student-1", onSelect: jest.fn() };
  const first = render(<NativeSubjectPicker {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "Open Physics" }));
  first.unmount();

  render(<NativeSubjectPicker {...props} subjects={subjects.slice(0,1)} />);
  expect(screen.queryByRole("heading", { name: "Recently opened" })).toBeNull();
  expect(screen.queryByRole("button", { name: "Open Physics" })).toBeNull();
});
