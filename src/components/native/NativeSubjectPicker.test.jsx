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
