import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { CSEC_2027_SOURCE_PAPERS } from "./csec2027Data";
import { buildCanonicalPaper2Response, gradeRichPaper2Part } from "./paper2RichGrader";
import fs from "fs";
import path from "path";

const regular = PAPER2_QUESTION_BANK.flatMap(question =>
  (question.parts || []).map(part => ({ source: "paper2", question, part }))
);
const future = CSEC_2027_SOURCE_PAPERS.flatMap(paper =>
  (paper.questions || []).flatMap(question =>
    (question.parts || []).map(part => ({ source: "2027", paper, question, part }))
  )
);

const perpendicularBisectors = [...regular, ...future].filter(({ part }) =>
  part?.responseSchema?.type === "construction" &&
  part?.responseSchema?.construction?.construction === "perpendicularBisector"
);

describe("SPARK V5.4.1.2 complete perpendicular-bisector review models", () => {
  test("finds every active perpendicular-bisector construction across both Paper 2 systems", () => {
    expect(perpendicularBisectors.some(item => item.source === "paper2")).toBe(true);
    expect(perpendicularBisectors.some(item => item.source === "2027")).toBe(true);
    expect(perpendicularBisectors.length).toBeGreaterThanOrEqual(4);
  });

  test("both compass crossings are visibly inside the construction pad", () => {
    for (const { source, question, part } of perpendicularBisectors) {
      const response = buildCanonicalPaper2Response(part);
      const objects = Array.isArray(response?.objects) ? response.objects : [];
      const circles = objects.filter(item => item.kind === "circle");
      const ruled = objects.find(item => item.kind === "segment" && !item.constructionGuide);
      const pad = part.responseSchema.pad || {};
      const units = Number(pad.unitsPerCm || 40);
      const xMax = Number(pad.width || 560) / units;
      const yMax = Number(pad.height || 340) / units;
      const endpoints = ruled ? [
        { x: Number(ruled.x1), y: Number(ruled.y1) },
        { x: Number(ruled.x2), y: Number(ruled.y2) },
      ] : [];

      expect({ source, question: question.question_id, part: part.id, circles: circles.length, endpoints: endpoints.length }).toEqual(
        expect.objectContaining({ circles: 2, endpoints: 2 })
      );

      for (const point of endpoints) {
        expect(point.x).toBeGreaterThanOrEqual(0.35);
        expect(point.x).toBeLessThanOrEqual(xMax - 0.35);
        expect(point.y).toBeGreaterThanOrEqual(0.35);
        expect(point.y).toBeLessThanOrEqual(yMax - 0.35);
      }
    }
  });

  test("the ruled line still passes through the midpoint and is perpendicular to AB", () => {
    for (const { part } of perpendicularBisectors) {
      const [A, B] = part.responseSchema.construction.args;
      const response = buildCanonicalPaper2Response(part);
      const ruled = response.objects.find(item => item.kind === "segment" && !item.constructionGuide);
      const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
      const ab = { x: B.x - A.x, y: B.y - A.y };
      const line = { x: ruled.x2 - ruled.x1, y: ruled.y2 - ruled.y1 };
      const cross = line.x * (mid.y - ruled.y1) - line.y * (mid.x - ruled.x1);
      const dot = ab.x * line.x + ab.y * line.y;
      expect(Math.abs(cross)).toBeLessThan(1e-8);
      expect(Math.abs(dot)).toBeLessThan(1e-8);
    }
  });

  test("every adjusted canonical perpendicular bisector still earns full construction credit", () => {
    for (const { part } of perpendicularBisectors) {
      const response = buildCanonicalPaper2Response(part);
      const result = gradeRichPaper2Part(response, part);
      expect(result.marks).toBe(Number(part.marks || 0));
      expect(result.maxMarks).toBe(Number(part.marks || 0));
    }
  });

  test("source contains the viewport-aware model guard", () => {
    const rich = fs.readFileSync(path.join(__dirname, "paper2RichGrader.js"), "utf8");
    expect(rich).toContain("SPARK_V5412_PERPENDICULAR_BISECTOR_MODEL");
    expect(rich).toContain("maxVisibleOffset");
    expect(rich).toContain("Rule the perpendicular through the two visible compass crossings.");
  });
});
