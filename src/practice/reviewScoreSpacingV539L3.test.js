import fs from "fs";
import path from "path";

const read = name => fs.readFileSync(path.join(__dirname, name), "utf8");

describe("SPARK V5.3.9L3 review score spacing", () => {
  const p1 = read("Paper1Exam.jsx");
  const p2 = read("Paper2Exam.jsx");
  const p2027 = read("Paper2027ModuleExam.jsx");
  const css = read("practiceExam.css");

  test("Paper 1 review labels its percentage as a distinct final-score metric", () => {
    expect(p1).toContain('Paper 1 submitted');
    expect(p1).toContain('className="paper-result-score-detail"');
    expect(p1).toContain('<strong>{result.percent}%</strong>');
    expect(p1).toContain('<span>Final score</span>');
    expect(p1).not.toContain('<p>{result.percent}%</p>');
  });

  test("standard Paper 2 keeps final score in its own summary tile", () => {
    expect(p2).toContain('className="paper-result-summary paper2-result-summary"');
    expect(p2).toContain('<div><strong>{grade.percent}%</strong><span>final score</span></div>');
  });

  test("2027 Paper 2 separates percentage, metric label and paper identity", () => {
    expect(p2027).toContain('className="paper-score-percent-value"');
    expect(p2027).toContain('<strong>{grade.percent}%</strong>');
    expect(p2027).toContain('<span>Final score</span>');
    expect(p2027).toContain('className="paper-score-paper-name">Practice Paper {paper.letter}</div>');
    expect(p2027).not.toContain('<div className="paper-score-percent"><strong>{grade.percent}%</strong><span>Practice Paper {paper.letter}</span></div>');
  });

  test("shared result summaries vertically separate values and labels", () => {
    expect(css).toContain('.paper-result-summary>div{');
    expect(css).toContain('flex-direction:column;');
    expect(css).toContain('gap:5px;');
  });

  test("2027 score and paper name have both whitespace and a divider", () => {
    expect(css).toContain('SPARK V5.3.9L3 REVIEW SCORE SPACING');
    expect(css).toContain('.paper-score-percent{');
    expect(css).toContain('gap:20px;');
    expect(css).toContain('.paper-score-paper-name{');
    expect(css).toContain('border-left:1px solid rgba(255,255,255,.18);');
  });

  test("mobile review keeps the identity readable instead of forcing one line", () => {
    expect(css).toContain('.paper-score-paper-name{padding-left:14px;white-space:normal}');
  });
});
