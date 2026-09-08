import fs from "fs";
import path from "path";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";
import {
  PAPER2_QUESTION_COUNT,
  PAPER2_TOTAL_MARKS,
  buildPaper2Exam,
  calculatePaper2Mark,
  validatePaper2Exam,
} from "./paper2Engine";

function canonicalAnswers(questions) {
  return Object.fromEntries((questions || []).map(question => [
    question.question_id,
    Object.fromEntries((question.parts || []).map(part => [
      part.id,
      part.responseSchema
        ? buildCanonicalPaper2Response(part)
        : { answer: String(part.answer ?? ""), working: String(part.solution ?? "") },
    ])),
  ]));
}

describe("SPARK V5.4.1 examiner-marking integration", () => {
  test("standard Paper 2 is one ten-question compulsory paper, not Section I/II", () => {
    const source = fs.readFileSync(path.join(__dirname, "Paper2Exam.jsx"), "utf8");
    expect(source).toContain("SPARK_V541_EXAMINER_MARKING_INTEGRATION");
    expect(source).not.toContain("Section I");
    expect(source).not.toContain("Section II");
    expect(source).not.toContain("current.section");
    expect(PAPER2_QUESTION_COUNT).toBe(10);
    expect(PAPER2_TOTAL_MARKS).toBe(100);
  });

  test("the legacy bank cannot silently build an invalid 2027 hybrid paper", () => {
    expect(() => buildPaper2Exam({ blueprint: "2027", seed: "v541-guard" }))
      .toThrow(/dedicated CSEC 2027 practice module/i);
  });

  test("a canonical standard paper earns every mark and every mark reaches the live profile totals", () => {
    const exam = buildPaper2Exam({ seed: "v541-profile-completeness" });
    expect(validatePaper2Exam(exam).valid).toBe(true);

    const grade = calculatePaper2Mark(canonicalAnswers(exam.questions), exam.questions);
    expect(grade.score).toBe(PAPER2_TOTAL_MARKS);
    expect(grade.available).toBe(PAPER2_TOTAL_MARKS);

    const profileAvailable = grade.profiles.rows.reduce((sum, row) => sum + Number(row.of || 0), 0);
    const profileEarned = grade.profiles.rows.reduce((sum, row) => sum + Number(row.marks || 0), 0);
    expect(profileAvailable).toBe(PAPER2_TOTAL_MARKS);
    expect(profileEarned).toBe(PAPER2_TOTAL_MARKS);
    expect(grade.profiles.rows.map(row => row.label)).toEqual([
      "Knowledge",
      "Comprehension",
      "Reasoning",
    ]);
  });

  test("profile summary is present and clearly described as practice feedback", () => {
    const source = fs.readFileSync(path.join(__dirname, "Paper2Exam.jsx"), "utf8");
    expect(source).toContain("How your marks divide");
    expect(source).toContain("practice feedback, not a predicted CXC grade");
  });
});
