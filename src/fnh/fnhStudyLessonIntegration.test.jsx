import React from "react";
import {render,screen} from "@testing-library/react";
import {GenericLessonContent} from "../subjects/GenericSubjectStudyView";
import {FNH_TOPICS} from "./data/fnhCourse";

describe("FNH interactive questions are visible inside the actual SPARK lesson renderer",()=>{
 test("student receives syllabus lesson, practical quiz and open-answer teacher check",()=>{
  const topic=FNH_TOPICS.find(row=>row.id==="water-digestion-evidence");
  render(<GenericLessonContent subjectId="food-nutrition-and-health" topic={topic}/>);
  expect(screen.getByText("Try it like a CSEC candidate")).toBeInTheDocument();
  expect(screen.getByText(/Where does most absorption of digested nutrients occur/)).toBeInTheDocument();
  expect(screen.getByText("Can you explain this objective?")).toBeInTheDocument();
  expect(screen.getByText("0 of 3 checked")).toBeInTheDocument();
  expect(screen.getAllByText(/Caribbean example/).length).toBeGreaterThan(0);
 });
 test("FNH lesson changes provide their own topical questions instead of copying the previous set",()=>{
  const first=FNH_TOPICS.find(row=>row.id==="meal-planning-multimix");
  const second=FNH_TOPICS.find(row=>row.id==="labels-claims");
  const view=render(<GenericLessonContent subjectId="food-nutrition-and-health" topic={first}/>);
  expect(screen.getByText(/A learner selects yam, breadfruit/)).toBeInTheDocument();
  view.rerender(<GenericLessonContent subjectId="food-nutrition-and-health" topic={second}/>);
  expect(screen.getByText(/A snack contains 6 g of sugar per 40 g/)).toBeInTheDocument();
  expect(screen.queryByText(/A learner selects yam, breadfruit/)).not.toBeInTheDocument();
 });
});
