/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { GenericLessonContent } from "../subjects/GenericSubjectStudyView";

const topic={ id:"hygiene-cooking",sectionId:"section-seven",metadata:{lesson:{
  introduction:"Safe food handling prevents contamination.",
  sections:[{title:"Kitchen hygiene",paragraphs:["Wash hands before preparing food."]}],
  keyPoints:["Keep raw meat away from ready-to-eat food."],
}}};

test("FNH references follow lesson notes and retain original teaching content",()=>{
  const view=render(<GenericLessonContent subjectId="food-nutrition-and-health" topic={topic}/>);
  expect(screen.getByText("Wash hands before preparing food.")).toBeInTheDocument();
  expect(screen.getByText("Food-safety controls")).toBeInTheDocument();
  expect(view.container.querySelector("#fnh-lesson-visuals")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:/See visuals/})).toBeInTheDocument();
  expect(screen.queryByRole("button",{name:"Check answers"})).not.toBeInTheDocument();
});

test("visual references do not leak into other courses",()=>{
 const view=render(<GenericLessonContent subjectId="chemistry" topic={topic}/>);
 expect(view.container.querySelector(".spark-fnh-reference-media")).toBeNull();
});

test("an FNH lesson without media keeps its original practice and no visuals jump item",()=>{
 const view=render(<GenericLessonContent subjectId="food-nutrition-and-health" topic={{...topic,id:"consumer-rights"}}/>);
 expect(view.container.querySelector("#fnh-lesson-visuals")).toBeNull();
 expect(screen.queryByRole("button",{name:/See visuals/})).toBeNull();
});
