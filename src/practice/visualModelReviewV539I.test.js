const fs = require("fs");
const path = require("path");

const read = name => fs.readFileSync(path.join(__dirname, name), "utf8");

const paper2027 = read("Paper2027ModuleExam.jsx");
const paper2 = read("Paper2Exam.jsx");
const responseInput = read("Paper2ResponseInput.jsx");
const richGrader = read("paper2RichGrader.js");
const syllabusHub = read("Syllabus2027Hub.jsx");
const css = read("practiceExam.css");

const visualTypeList = '["graph", "construction", "construction_triangle", "table", "tile_pattern"]';

describe("SPARK V5.3.9I visual model answer review", () => {
  test("2027 review renders the canonical completed visual beside the student response", () => {
    expect(paper2027).toContain("buildCanonicalPaper2Response(part)");
    expect(paper2027).toContain('import { FormulaModal } from "./Paper2Exam"');
    expect(paper2027).toMatch(/import\s*\{[^}]*\bbuildCanonicalPaper2Response\b[^}]*\}\s*from\s*["']\.\/paper2RichGrader["']/);
    expect(richGrader).toMatch(/export\s+function\s+buildCanonicalPaper2Response\s*\(/);
    expect(paper2027).toContain(visualTypeList);
    expect(paper2027).toContain("paper2027-workspace-review-grid");
    expect(paper2027).toContain("Correct ${noun}");
  });

  test("Paper 2 review renders the canonical completed visual beside the student response", () => {
    expect(paper2).toContain("buildCanonicalPaper2Response(part)");
    expect(paper2).toContain(visualTypeList);
    expect(paper2).toContain("paper2-model-review");
    expect(paper2).toContain("Correct ${noun}");
  });

  test("table and tile model answers are non-interactive in review mode", () => {
    expect(responseInput).toContain("function TableResponse({ schema, value, onChange, readOnly = false })");
    expect(responseInput).toContain("paper2-table-review-value");
    expect(responseInput).toContain('<TableResponse schema={schema} value={value} onChange={onChange} readOnly={readOnly} />');
    expect(responseInput).toContain("function TilePatternWorkspace({ value, onChange, readOnly = false })");
    expect(responseInput).toContain('<TilePatternWorkspace schema={schema} value={value} onChange={onChange} readOnly={readOnly} />');
  });

  test("2027 syllabus hub resets scroll position and uses the polished source note", () => {
    expect(syllabusHub).toContain("SPARK V5.3.9I1 TOP RESET");
    expect(syllabusHub).toMatch(/window\.scrollTo\(\{\s*top:\s*0,\s*left:\s*0,\s*behavior:\s*["']auto["']\s*\}\)/);
    expect(css).toContain("SPARK V5.3.9I1 2027 SYLLABUS UX");
    expect(css).toContain(".paper2027-start-card .paper2027-source-note");
  });
});
