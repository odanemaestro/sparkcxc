/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ChemistryReferenceDiagrams from "./ChemistryReferenceDiagrams";
import { CHEMISTRY_REFERENCE_DIAGRAMS, chemistryReferencesFor } from "../data/chemistryReferenceDiagrams";

test("Chemistry topic images match topic ids, preserve source credits, and use attributed licences",()=>{
  const all=Object.values(CHEMISTRY_REFERENCE_DIAGRAMS).flat();
  expect(all.length).toBe(10);
  expect(chemistryReferencesFor("A2")).toHaveLength(2);
  expect(chemistryReferencesFor("a7-acids-bases-salts")).toHaveLength(2);
  expect(chemistryReferencesFor("b1-hydrocarbon-sources")[0].title).toMatch(/fractional/i);
  expect(chemistryReferencesFor("c6-qualitative-analysis")).toHaveLength(0);
  expect(new Set(all.map(d=>d.file)).size).toBe(all.length);
  for(const source of all) {
    expect(source.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    expect(source.imageUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//);
    expect(source.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//);
    expect(source.author.length).toBeGreaterThan(2);
    expect(source.alt.length).toBeGreaterThan(25);
    expect(source.focus.length).toBeGreaterThan(40);
  }
});

test("renders responsive chemistry illustrations with useful explanations, image credits and zoom links",()=>{
  const view=render(<ChemistryReferenceDiagrams topicId="a2-mixtures-separations"/>);
  expect(screen.getByRole("region",{name:"Chemistry reference diagrams"})).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(2);
  expect(screen.getByText("Simple distillation apparatus")).toBeInTheDocument();
  expect(screen.getAllByRole("link",{name:/full-size diagram/i})).toHaveLength(2);
  expect(view.container.querySelectorAll(".spark-chem-reference-figure")).toHaveLength(2);
  expect(screen.getByText("CC0 1.0")).toBeInTheDocument();
});

test("failed remote images show a source fallback instead of broken icons",()=>{
  render(<ChemistryReferenceDiagrams topicId="a3-atomic-structure"/>);
  fireEvent.error(screen.getByRole("img"));
  expect(screen.getByRole("status")).toHaveTextContent("Diagram unavailable");
  expect(screen.getByRole("link",{name:"Open source image"})).toHaveAttribute("href",expect.stringContaining("commons.wikimedia.org"));
});

test("does not clutter topics without approved illustrations",()=>{
  const view=render(<ChemistryReferenceDiagrams topicId="a6-mole-concept"/>);
  expect(view.container).toBeEmptyDOMElement();
});
