import fs from "fs";
import path from "path";
import { CSEC_2027_FULL_PAPERS, CSEC_2027_SOURCE_PAPERS, getCsec2027Paper } from "./csec2027Data";
import { calculateCsec2027ModuleMark } from "./Paper2027ModuleExam";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";
import { precisionOf } from "./cxcMarking/algebra";
import { checkParallel } from "./cxcMarking/geometry";

function canonicalResponse(part) {
  if (part.responseSchema) return buildCanonicalPaper2Response(part);
  return { answer: String(part.answer ?? ""), working: String(part.solution ?? "") };
}
function canonicalAnswers(paper) {
  return Object.fromEntries(paper.questions.map(question => [
    question.question_id,
    Object.fromEntries(question.parts.map(part => [part.id, canonicalResponse(part)])),
  ]));
}

describe("SPARK CSEC 2027 Paper D and UI polish V5.3.9", () => {
  test("Paper D is available in every 2027 practice mode", () => {
    expect(CSEC_2027_SOURCE_PAPERS.map(p => p.letter)).toEqual(["A", "B", "C", "D"]);
    expect(CSEC_2027_FULL_PAPERS).toHaveLength(4);
    expect(getCsec2027Paper("module1", "D").questions.map(q => q.question_number)).toEqual([1,2,3]);
    expect(getCsec2027Paper("module2", "D").questions.map(q => q.question_number)).toEqual([4,5,6]);
    expect(getCsec2027Paper("module3", "D").questions.map(q => q.question_number)).toEqual([7,8,9]);
  });

  test("Paper D canonical responses earn the full 90 marks and profile", () => {
    const paper = getCsec2027Paper("full", "D");
    const grade = calculateCsec2027ModuleMark(canonicalAnswers(paper), paper.questions, paper.profile);
    expect(grade.score).toBe(90);
    expect(grade.maxScore).toBe(90);
    expect(grade.profile.CK.marks).toBe(27);
    expect(grade.profile.AK.marks).toBe(36);
    expect(grade.profile.R.marks).toBe(27);
  });

  test("2027 hub advertises Papers A through D", () => {
    const hub = fs.readFileSync(path.join(__dirname, "Syllabus2027Hub.jsx"), "utf8");
    expect(hub).toContain("Papers A–D available");
  });

  test("decimal trailing zero counts as a significant figure", () => {
    expect(precisionOf("38.0")).toEqual({ dp: 1, sf: 3 });
  });

  test("parallel construction reports arcs, line and accuracy independently", () => {
    const A = { x: 0, y: 0 };
    const B = { x: 10, y: 0 };
    const P = { x: 0, y: 5 };
    const work = {
      segments: [{ a: { x: -5, y: 5 }, b: { x: 10, y: 5 } }],
      arcs: [{ cx: A.x, cy: A.y, r: 5 }, { cx: P.x, cy: P.y, r: 5 }],
    };
    const result = checkParallel(work, P, A, B, { tol: 0.6 });
    expect(result.arcsShown).toBe(true);
    expect(result.lineDrawn).toBe(true);
    expect(result.accurate).toBe(true);
    expect(result.ok).toBe(true);
  });
});
