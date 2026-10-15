/** @jest-environment jsdom */
import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import {GenericLessonContent} from "../subjects/GenericSubjectStudyView";

const lesson={
  id:"b2-caribbean-location",
  sectionId:"B2",
  metadata:{lesson:{
    introduction:"The Caribbean is a region shaped by geography and society.",
    sections:[{title:"Where is the Caribbean?",paragraphs:["The Greater and Lesser Antilles are Caribbean island groups."]}],
    keyPoints:["Location affects trade and communication."],
    summary:"Use geographic evidence before making conclusions.",
  }}
};
test("Social Studies notes remain first, then approved reference maps appear",()=>{
  const {container}=render(<GenericLessonContent subjectId="social-studies" topic={lesson} editorial/>);
  expect(screen.getByText("The Greater and Lesser Antilles are Caribbean island groups.")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"See visuals"})).toBeInTheDocument();
  expect(container.querySelectorAll(".ss-reference-card")).toHaveLength(2);
  const note=container.querySelector(".spark-generic-lesson-section");
  const visual=container.querySelector("#spark-social-visuals");
  expect(note.compareDocumentPosition(visual)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  HTMLElement.prototype.scrollIntoView=jest.fn();
  fireEvent.click(screen.getByRole("button",{name:"See visuals"}));
  expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
});
test("visuals never appear for another subject even with a matching topic id",()=>{
  const {container}=render(<GenericLessonContent subjectId="chemistry" topic={lesson} editorial/>);
  expect(container.querySelector("#spark-social-visuals")).toBeNull();
  expect(screen.queryByRole("button",{name:"See visuals"})).toBeNull();
});
test("unchanged lessons keep their normal notes and no additional visual navigation",()=>{
  const {container}=render(<GenericLessonContent subjectId="social-studies" topic={{...lesson,id:"a1-roles-changing-family"}} editorial/>);
  expect(container.querySelector(".ss-reference-section")).toBeNull();
  expect(screen.queryByRole("button",{name:"See visuals"})).toBeNull();
});
