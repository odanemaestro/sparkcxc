import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NativeMathPracticeHome from "./NativeMathPracticeHome";

test("compact exam list preserves resume and new-paper choices", () => {
  const onPaper1 = jest.fn();
  const onPaper2 = jest.fn();
  render(<NativeMathPracticeHome
    paper1Active={{questionIds:Array(60).fill("q")}}
    paper2Active={{exam:{questions:Array(10).fill({})}}}
    onPaper1={onPaper1}
    onPaper2={onPaper2}
  />);
  expect(screen.getByRole("heading", {name:"Mathematics"})).toBeTruthy();
  expect(screen.queryByText("Practise under examination conditions.")).toBeNull();
  const first = screen.getByRole("article", {name:"Paper 1"});
  fireEvent.click(first.querySelector(".spark-native-exam-primary"));
  expect(onPaper1).toHaveBeenCalledWith("resume");
  const second = screen.getByRole("article", {name:"Paper 2"});
  fireEvent.click(second.querySelector(".spark-native-exam-secondary"));
  expect(onPaper2).toHaveBeenCalledWith("new");
});

test("navigation to subjects, adaptive and 2027 stays available", () => {
  const onBack = jest.fn();
  const onAdaptive = jest.fn();
  const on2027 = jest.fn();
  render(<NativeMathPracticeHome onBack={onBack} onAdaptive={onAdaptive} on2027={on2027}/>);
  fireEvent.click(screen.getByRole("button", {name:"Back to subjects"}));
  fireEvent.click(screen.getByRole("button", {name:/Adaptive practice/}));
  fireEvent.click(screen.getByRole("button", {name:/2027 syllabus/}));
  expect(onBack).toHaveBeenCalledTimes(1);
  expect(onAdaptive).toHaveBeenCalledTimes(1);
  expect(on2027).toHaveBeenCalledTimes(1);
});
