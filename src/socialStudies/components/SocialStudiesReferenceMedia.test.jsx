/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SocialStudiesReferenceMedia from "./SocialStudiesReferenceMedia";
import { SOCIAL_STUDIES_MEDIA, SOCIAL_STUDIES_MEDIA_TOPIC_IDS, socialStudiesMediaForTopic } from "../data/socialStudiesReferenceMedia";
import { SOCIAL_STUDIES_LESSONS } from "../data/socialStudiesCourse";

describe("Social Studies online learning references",()=>{
  test("uses traceable credited assets across the CSEC course",()=>{
    const media=Object.values(SOCIAL_STUDIES_MEDIA).flat();
    const ids=new Set(SOCIAL_STUDIES_LESSONS.map(lesson=>lesson.id));
    expect(SOCIAL_STUDIES_MEDIA_TOPIC_IDS.length).toBeGreaterThanOrEqual(15);
    expect(media.length).toBeGreaterThanOrEqual(18);
    expect(media.filter(item=>item.kind==="video")).toHaveLength(1);
    for(const id of SOCIAL_STUDIES_MEDIA_TOPIC_IDS) {
      expect(ids.has(id)).toBe(true);
      const files=SOCIAL_STUDIES_MEDIA[id].map(item=>item.file);
      expect(new Set(files).size).toBe(files.length);
    }
    for(const item of media){
      expect(item.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(item.mediaUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//);
      expect(item.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//);
      expect(item.author.length).toBeGreaterThan(2);
      expect(item.alt.length).toBeGreaterThan(24);
      expect(item.question.length).toBeGreaterThan(30);
    }
    expect(socialStudiesMediaForTopic("b2-unknown-topic")).toEqual([]);
  });

  test("displays accessible regional maps and historical context",()=>{
    const {container}=render(<SocialStudiesReferenceMedia topicId="b2-caribbean-location"/>);
    expect(screen.getByRole("region",{name:"Social Studies visual references"})).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(container.querySelectorAll(".ss-reference-card")).toHaveLength(2);
    expect(screen.getByRole("heading",{name:"Examples and visual guides"})).toBeInTheDocument();
    expect(screen.getByText(/Political statuses on older maps/)).toBeInTheDocument();
    expect(screen.getAllByRole("link",{name:/Open large image/})).toHaveLength(2);
  });

  test("links every diagram to creator and reuse licence",()=>{
    render(<SocialStudiesReferenceMedia topicId="a2-government-structure"/>);
    expect(screen.getByText("Credit: Judkessler")).toBeInTheDocument();
    expect(screen.getByRole("link",{name:"CC0 1.0"})).toHaveAttribute("href",expect.stringContaining("creativecommons.org"));
    expect(screen.getByRole("link",{name:"Source"})).toHaveAttribute("href",expect.stringContaining("commons.wikimedia.org"));
    expect(screen.getByText(/parliamentary systems/)).toBeInTheDocument();
  });

  test("if a remote image fails, provides an accessible original source",()=>{
    render(<SocialStudiesReferenceMedia topicId="b2-tourism-integration"/>);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status")).toHaveTextContent("Media unavailable");
    expect(screen.getByRole("link",{name:"View original source"})).toBeInTheDocument();
  });

  test("does not download a video until the student chooses to play it",()=>{
    const {container}=render(<SocialStudiesReferenceMedia topicId="b1-climate-change"/>);
    expect(container.querySelector("video")).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:"Load video"}));
    const video=container.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("preload","none");
    expect(video).toHaveAttribute("controls");
    expect(screen.getByText(/single hurricane does not by itself prove climate change/)).toBeInTheDocument();
  });

  test("does not clutter topics without an appropriate approved visual",()=>{
    const {container}=render(<SocialStudiesReferenceMedia topicId="a2-governance-citizenship"/>);
    expect(container).toBeEmptyDOMElement();
  });
});
