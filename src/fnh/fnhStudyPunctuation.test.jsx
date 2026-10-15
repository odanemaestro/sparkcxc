import React from "react";
import { render, screen } from "@testing-library/react";
import FnhReferenceMedia from "./components/FnhReferenceMedia";
import { FNH_TOPICS, fnhLocalStructure } from "./data/fnhCourse";

describe("FNH study wording and punctuation", () => {
  test("uses the approved heading for visual references", () => {
    render(<FnhReferenceMedia topicId="water-digestion-evidence" />);
    expect(screen.getByRole("heading", { name: "Examples and visual guides" })).toBeInTheDocument();
    expect(screen.queryByText("Real examples and visual guides")).not.toBeInTheDocument();
  });

  test("uses colons for objective note headings, never em dashes", () => {
    const sections = FNH_TOPICS.flatMap(topic => topic.metadata?.lesson?.sections || []);
    expect(sections.length).toBeGreaterThan(20);
    expect(sections[0].title).toMatch(/^S1\.1: /);
    expect(sections.some(section => /^S\d+\.\d+ —/.test(section.title))).toBe(false);
  });

  test("the full local FNH study structure contains no em dash characters", () => {
    const structure = fnhLocalStructure();
    expect(structure.topics.length).toBe(25);
    expect(JSON.stringify(structure)).not.toContain("—");
  });
});
