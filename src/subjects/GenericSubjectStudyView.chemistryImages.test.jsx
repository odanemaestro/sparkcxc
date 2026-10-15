/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import { GenericLessonContent } from "./GenericSubjectStudyView";

test("approved chemistry references appear after the lesson notes without becoming graded questions",()=>{
  const topic={
    id:"a7-acids-bases-salts",
    sectionId:"section-a-principles",
    metadata:{lesson:{
      introduction:"Acids and bases can be compared using pH.",
      sections:[{title:"Indicators",paragraphs:["Use an indicator to observe a pH change."]}],
      keyPoints:["pH 7 is neutral in ordinary aqueous solutions at 25 °C."],
    }}
  };
  const view=render(<GenericLessonContent subjectId="chemistry" topic={topic}/>);
  expect(screen.getByText("Use an indicator to observe a pH change.")).toBeInTheDocument();
  expect(screen.getByText("Acid–base titration apparatus")).toBeInTheDocument();
  expect(view.container.querySelectorAll(".spark-chem-reference-figure")).toHaveLength(2);
  expect(screen.queryByRole("button",{name:"Check answers"})).not.toBeInTheDocument();
});

test("other subjects never display chemistry illustrations on matching topic ids",()=>{
  const view=render(<GenericLessonContent subjectId="social-studies" topic={{id:"a7-acids-bases-salts",metadata:{lesson:{introduction:"Other subject"}}}}/>);
  expect(view.container.querySelector(".spark-chem-reference-section")).toBeNull();
});
