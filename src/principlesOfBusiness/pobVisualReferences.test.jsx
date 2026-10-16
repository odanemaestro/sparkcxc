/** @jest-environment jsdom */
import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import PobReferenceMedia from "./components/PobReferenceMedia";
import {POB_MEDIA_BY_OBJECTIVE,POB_MEDIA_OBJECTIVE_CODES,pobMediaForTopic} from "./data/pobReferenceMedia";
import {POB_OBJECTIVES,POB_TOPICS} from "./data/pobCourse";

test("sourced visual references link to genuine POB objectives",()=>{
 const valid=new Set(POB_OBJECTIVES.map(o=>o.code));
 expect(POB_MEDIA_OBJECTIVE_CODES).toHaveLength(4);
 for(const code of POB_MEDIA_OBJECTIVE_CODES){
  expect(valid.has(code)).toBe(true);
  for(const image of POB_MEDIA_BY_OBJECTIVE[code]){
   expect(image.mediaUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//);
   expect(image.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
   expect(image.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//);
   expect(image.author.length).toBeGreaterThan(3);
   expect(image.alt.length).toBeGreaterThan(25);
   expect(image.focus.length).toBeGreaterThan(30);
  }
 }
});
test("visual guides appear only when a specific lesson contains the relevant objective",()=>{
 const topic=POB_TOPICS.find(t=>t.metadata.syllabus.objectiveCodes.includes("S7.1"));
 const {container}=render(<PobReferenceMedia topic={topic}/>);
 expect(screen.getByRole("heading",{name:"Examples and visual guides"})).toBeInTheDocument();
 expect(screen.getByRole("img")).toHaveAttribute("alt",expect.stringContaining("supplier"));
 expect(container.querySelectorAll(".pob-ref-card")).toHaveLength(1);
 expect(screen.getByRole("link",{name:"Original source"})).toBeInTheDocument();
 expect(pobMediaForTopic(POB_TOPICS.find(t=>t.metadata.syllabus.section===4))).toEqual([]);
});
test("unavailable Wikimedia media have an accessible fall back",()=>{
 const topic=POB_TOPICS.find(t=>t.metadata.syllabus.objectiveCodes.includes("S6.3"));
 render(<PobReferenceMedia topic={topic}/>);
 fireEvent.error(screen.getByRole("img"));
 expect(screen.getByRole("status")).toHaveTextContent("Visual temporarily unavailable");
 expect(screen.getByRole("link",{name:"Open original diagram"})).toHaveAttribute("href",expect.stringContaining("commons.wikimedia.org"));
});
