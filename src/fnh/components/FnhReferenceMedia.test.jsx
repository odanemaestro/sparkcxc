/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FnhReferenceMedia from "./FnhReferenceMedia";
import { FNH_MEDIA_TOPIC_IDS, FNH_STUDY_MEDIA, fnhMediaForTopic } from "../data/fnhReferenceMedia";

test("FNH has varied course-specific diagrams, photos and optional safety videos with legitimate source links",()=>{
  const entries=Object.values(FNH_STUDY_MEDIA).flat();
  expect(FNH_MEDIA_TOPIC_IDS.length).toBeGreaterThanOrEqual(15);
  expect(entries.length).toBeGreaterThanOrEqual(20);
  expect(entries.filter(x=>x.kind==="video").length).toBeGreaterThanOrEqual(2);
  expect(new Set(entries.map(x=>x.file)).size).toBe(entries.length);
  for(const item of entries){
    expect(item.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    expect(item.mediaUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//);
    expect(item.licenceUrl).toMatch(/^https:\/\/creativecommons\.org\//);
    expect(item.author.length).toBeGreaterThan(2);
    expect(item.alt.length).toBeGreaterThan(20);
    expect(item.focus.length).toBeGreaterThan(25);
  }
  expect(fnhMediaForTopic("water-digestion-evidence")[0].title).toMatch(/digestion/i);
  expect(fnhMediaForTopic("labels-claims")[0].note).toMatch(/Caribbean/i);
  expect(fnhMediaForTopic("unknown")).toEqual([]);
});

test("renders responsive credited FNH references without grading controls",()=>{
  const view=render(<FnhReferenceMedia topicId="equipment"/>);
  expect(screen.getByRole("region",{name:"Food Nutrition and Health visual references"})).toBeInTheDocument();
  expect(view.container.querySelectorAll(".spark-fnh-ref-card")).toHaveLength(2);
  expect(screen.getAllByRole("img")).toHaveLength(2);
  expect(screen.getByText("Measuring ingredients accurately")).toBeInTheDocument();
  expect(screen.getAllByRole("link",{name:/View larger image/})).toHaveLength(2);
  expect(screen.queryByRole("button",{name:"Check answers"})).not.toBeInTheDocument();
});

test("external image failures provide a source fallback",()=>{
  render(<FnhReferenceMedia topicId="water-digestion-evidence"/>);
  fireEvent.error(screen.getByRole("img"));
  expect(screen.getByRole("status")).toHaveTextContent("could not be loaded");
  expect(screen.getByRole("link",{name:"View original source"})).toHaveAttribute("href",expect.stringContaining("commons.wikimedia.org"));
});

test("video stays unloaded until the student requests playback",()=>{
  const view=render(<FnhReferenceMedia topicId="hygiene-cooking"/>);
  expect(view.container.querySelector("video")).toBeNull();
  fireEvent.click(screen.getByRole("button",{name:"Load video"}));
  expect(view.container.querySelector("video")).toBeInTheDocument();
  expect(view.container.querySelector("video").getAttribute("preload")).toBe("none");
});

test("topics without a useful media choice are left uncluttered",()=>{
  const view=render(<FnhReferenceMedia topicId="consumer-rights"/>);
  expect(view.container).toBeEmptyDOMElement();
});
