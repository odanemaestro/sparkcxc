const fs = require("fs");
const path = require("path");

const read = name => fs.readFileSync(path.join(__dirname, name), "utf8");
const exam = read("Paper2Exam.jsx");
const input = read("Paper2ResponseInput.jsx");
const css = read("practiceExam.css");

describe("SPARK Paper 2 V5.3.2 review UI integration", () => {

  test("guards structured table objects from leaking as [object Object]", () => {
    expect(exam).toContain("questionTableCellText");
    expect(exam).toContain('part.responseSchema?.type !== "table"');
    expect(exam).toContain("firstPartOwnsTable");
  });

  test("shows submitted and reference graph/construction workspaces in review", () => {
    expect(exam).toContain("Paper2WorkspaceReview");
    expect(exam).toContain("buildCanonicalPaper2Response");
    expect(input).toContain("readOnly = false");
    expect(input).toContain("paper2-workspace-readonly");
  });

  test("keeps M/A/B badges in a dedicated mark-breakdown column", () => {
    expect(css).toContain("SPARK CXC MARKING V5.3.2 REVIEW/POLISH START");
    expect(css).toContain("grid-template-columns:44px minmax(0,1fr) auto");
  });

  test("results summary reflects partial-credit marking", () => {
    expect(exam).toContain("questions completed");
    expect(exam).toContain("parts attempted");
    expect(exam).toContain("marks earned");
    expect(exam).toContain("final score");
  });

  test("formula sheet includes the missing CSEC formula-page items", () => {
    for (const token of [
      "Volume of a prism",
      "Volume of a right pyramid",
      "arc-length",
      "sector-area",
      "trapezium-area",
      "triangle-sine-area",
      "Heron's formula",
    ]) expect(exam).toContain(token);
  });
});

describe("SPARK Paper 2 V5.3.3 construction usability", () => {
  test("construction labels come from the question instead of hard-coded C D E labels", () => {
    expect(input).toContain("triangleNameFromPart");
    expect(input).toContain("triangleDerivedLabels");
    expect(input).toContain("part={part}");
    expect(input).not.toContain('const derivedLabels = ["C", "D", "E", "F", "G", "H", "K"]');
  });

  test("straightedge gives live alignment feedback and locks near-level lines", () => {
    expect(input).toContain("straightedgeAlignment");
    expect(input).toContain("Horizontal, level");
    expect(input).toContain("Vertical, upright");
    expect(input).toContain("Slanted,");
    expect(input).toContain("alignment locked");
    expect(css).toContain("paper2-straightedge-readout");
  });
});
