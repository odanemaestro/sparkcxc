const fs = require("fs");
const path = require("path");

const read = name => fs.readFileSync(path.join(__dirname, name), "utf8");

describe("SPARK CSEC 2027 V5.3.6B UI polish", () => {
  const exam2027 = read("Paper2027ModuleExam.jsx");
  const paper2 = read("Paper2Exam.jsx");
  const css = read("practiceExam.css");

  test("2027 practice exposes the same Formula sheet used by Paper 2", () => {
    expect(paper2).toContain("export function FormulaModal");
    expect(exam2027).toContain('import { FormulaModal } from "./Paper2Exam"');
    expect(exam2027).toContain(">Formula sheet</button>");
    expect(exam2027).toContain(">View formula sheet</button>");
    expect(exam2027).toContain("<FormulaModal onClose={() => setShowFormula(false)} />");
  });

  test("2027 desktop navigator has dedicated non-overlapping layout styles", () => {
    expect(css).toContain("SPARK CSEC 2027 NAVIGATOR + FORMULA SHEET POLISH V5.3.6B");
    expect(css).toContain(".paper2027-exam-shell .paper-navigator-title");
    expect(css).toContain(".paper2027-exam-shell .paper2-nav-section-head");
    expect(css).toContain("white-space:nowrap");
  });
});
