import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { CSEC_2027_SOURCE_PAPERS } from "./csec2027Data";
import { buildCanonicalPaper2Response, gradeRichPaper2Part } from "./paper2RichGrader";
import fs from "fs";
import path from "path";

const allConstructionParts = [
  ...PAPER2_QUESTION_BANK.flatMap(question => (question.parts || []).map(part => ({ source: "paper2", question, part }))),
  ...CSEC_2027_SOURCE_PAPERS.flatMap(paper => (paper.questions || []).flatMap(question => (question.parts || []).map(part => ({ source: "2027", paper, question, part })))),
].filter(item => ["construction", "construction_triangle"].includes(item.part?.responseSchema?.type));

const allTableParts = [
  ...PAPER2_QUESTION_BANK.flatMap(question => (question.parts || []).map(part => ({ source: "paper2", question, part }))),
  ...CSEC_2027_SOURCE_PAPERS.flatMap(paper => (paper.questions || []).flatMap(question => (question.parts || []).map(part => ({ source: "2027", paper, question, part })))),
].filter(item => item.part?.responseSchema?.type === "table");

describe("SPARK V5.3.9L2 all Paper 2 construction and table review coverage", () => {
  test("finds active construction questions in both Paper 2 systems", () => {
    expect(allConstructionParts.some(item => item.source === "paper2")).toBe(true);
    expect(allConstructionParts.some(item => item.source === "2027")).toBe(true);
    expect(allConstructionParts.length).toBeGreaterThanOrEqual(8);
  });

  test("every active construction model contains visible compass evidence", () => {
    for (const { source, question, part } of allConstructionParts) {
      const response = buildCanonicalPaper2Response(part);
      const objects = Array.isArray(response?.objects) ? response.objects : [];
      const circles = objects.filter(item => item.kind === "circle");
      const segments = objects.filter(item => item.kind === "segment");
      expect({ source, question: question.question_id, part: part.id, circles: circles.length }).toEqual(
        expect.objectContaining({ circles: expect.any(Number) })
      );
      expect(circles.length).toBeGreaterThanOrEqual(2);
      expect(segments.length).toBeGreaterThanOrEqual(1);
      expect(circles.every(item => item.constructionGuide === true)).toBe(true);
    }
  });

  test("every active canonical construction still earns full credit", () => {
    for (const { source, question, part } of allConstructionParts) {
      const response = buildCanonicalPaper2Response(part);
      const result = gradeRichPaper2Part(response, part);
      expect({ source, question: question.question_id, part: part.id, marks: result.marks, max: result.maxMarks }).toEqual(
        expect.objectContaining({ marks: Number(part.marks || 0), max: Number(part.marks || 0) })
      );
    }
  });

  test("finds active table questions in both Paper 2 systems", () => {
    expect(allTableParts.some(item => item.source === "paper2")).toBe(true);
    expect(allTableParts.some(item => item.source === "2027")).toBe(true);
  });

  test("both review renderers use the shared read-only rich workspace", () => {
    const regular = fs.readFileSync(path.join(__dirname, "Paper2Exam.jsx"), "utf8");
    const paper2027 = fs.readFileSync(path.join(__dirname, "Paper2027ModuleExam.jsx"), "utf8");
    expect(regular).toContain('<Paper2ResponseInput part={part} value={response} readOnly />');
    expect(paper2027).toContain('<Paper2ResponseInput part={part} value={response} readOnly />');
  });

  test("review tables are independently horizontally scrollable", () => {
    const input = fs.readFileSync(path.join(__dirname, "Paper2ResponseInput.jsx"), "utf8");
    const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");
    expect(input).toContain('aria-label={readOnly ? "Scrollable table review" : undefined}');
    expect(css).toContain('.paper2-table-workspace.paper2-workspace-readonly{pointer-events:auto}');
    expect(css).toContain('overflow-x:auto!important');
    expect(css).toContain('width:max-content');
  });
});
