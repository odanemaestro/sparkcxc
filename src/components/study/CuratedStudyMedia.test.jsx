/** @jest-environment jsdom */
import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import CuratedStudyMedia from "./CuratedStudyMedia";
import {PHYSICS_REFERENCE_MEDIA,IT_REFERENCE_MEDIA,referencesFor} from "./curatedStudyMedia";
import physicsTopics from "../../physics/course/physicsTopicsReference.json";
import itCourse from "../../informationTechnology/course/itCourseData.json";

describe("Physics and IT source-verified examples",()=>{
  test("selects only real Physics and IT topics and records author and licences",()=>{
    const physicsIds=new Set(physicsTopics.map(t=>t.id));
    const itIds=new Set(itCourse.topics.map(t=>String(t.id)));
    expect(Object.keys(PHYSICS_REFERENCE_MEDIA)).toHaveLength(7);
    expect(Object.keys(IT_REFERENCE_MEDIA)).toHaveLength(4);
    for(const id of Object.keys(PHYSICS_REFERENCE_MEDIA))expect(physicsIds.has(id)).toBe(true);
    for(const id of Object.keys(IT_REFERENCE_MEDIA))expect(itIds.has(id)).toBe(true);
    const resources=[...Object.values(PHYSICS_REFERENCE_MEDIA).flat(),...Object.values(IT_REFERENCE_MEDIA).flat()];
    expect(resources).toHaveLength(12);
    expect(resources.filter(item=>item.kind==="video")).toHaveLength(1);
    for(const item of resources){
      expect(item.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(item.mediaUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//);
      expect(item.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//);
      expect(item.credit.length).toBeGreaterThan(2);
      expect(item.alt.length).toBeGreaterThan(20);
      expect(item.focus.length).toBeGreaterThan(40);
    }
    expect(referencesFor("chemistry","A1")).toEqual([]);
    expect(referencesFor("physics","A2")).toEqual([]);
    expect(referencesFor("information-technology",19)).toHaveLength(1);
  });
  test("shows the exact source and author under each diagram",()=>{
    render(<CuratedStudyMedia subject="information-technology" topicId={8}/>);
    expect(screen.getByRole("region",{name:"Information Technology visual references"})).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt",expect.stringContaining("network connection patterns"));
    expect(screen.getByRole("heading",{name:"Examples and visual guides"})).toBeInTheDocument();
    expect(screen.getByText("Credit: Maksim; SVG by Malyszkz")).toBeInTheDocument();
    expect(screen.getByRole("link",{name:"Original source"})).toHaveAttribute("href",expect.stringContaining("commons.wikimedia.org"));
    expect(screen.getByRole("link",{name:"Public domain"})).toHaveAttribute("href",expect.stringContaining("creativecommons.org"));
  });
  test("keeps videos unloaded until students request playback",()=>{
    const {container}=render(<CuratedStudyMedia subject="physics" topicId="A1"/>);
    expect(container.querySelector("video")).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:"Load video"}));
    const video=container.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("preload","none");
    expect(video).toHaveAttribute("controls");
  });
  test("handles failed external resources without a broken image icon",()=>{
    render(<CuratedStudyMedia subject="physics" topicId="C5"/>);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status")).toHaveTextContent("Reference unavailable");
    expect(screen.getByRole("link",{name:"Open original source"})).toBeInTheDocument();
  });
  test("does not add decorative references to lessons already covered by simulations",()=>{
    const {container}=render(<CuratedStudyMedia subject="information-technology" topicId={16}/>);
    expect(container).toBeEmptyDOMElement();
  });
});
