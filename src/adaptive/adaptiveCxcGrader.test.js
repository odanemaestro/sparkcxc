import fs from "fs";
import path from "path";
import { adaptiveQuestionUsesWorking, gradeAdaptiveResponse } from "./adaptiveCxcGrader";
import { skillMastery } from "./adaptiveEngine";

function isMultipleChoice(question) {
  const type = String(question?.question_type || question?.response_mode || "").toLowerCase();
  return type === "multiple_choice" || type === "mcq" || Array.isArray(question?.options);
}

describe("Adaptive Practice CXC-style marking", () => {
  test("accepts equivalent fractions and decimals", () => {
    const q = { id: "equivalent", marks: 1, question: "Write one half as a number.", answer: "1/2", worked_solution: "1/2 = 0.5" };
    expect(gradeAdaptiveResponse(q, { answer: "0.5" }).marks).toBe(1);
  });

  test("keeps saved partial-credit marks in mastery after reload", () => {
    const mastery = skillMastery([
      { marks: 4, marks_earned: 2, correct: false },
      { marks: 4, marksEarned: 4, correct: true },
    ]);
    expect(mastery.score).toBe(75);
  });

  test("awards method credit when the final answer is wrong", () => {
    const q = {
      id: "partial",
      marks: 3,
      question: "Calculate the area of a triangle with base 8 cm and height 5 cm.",
      answer: "20 cm^2",
      worked_solution: "Area = 1/2 x 8 x 5 = 20 cm^2.",
    };
    expect(adaptiveQuestionUsesWorking(q)).toBe(true);
    const result = gradeAdaptiveResponse(q, { working: "Area = 1/2 x 8 x 5", answer: "21 cm^2" });
    expect(result.marks).toBeGreaterThan(0);
    expect(result.marks).toBeLessThan(3);
  });

  test("all non-MCQ adaptive model responses receive full marks with model working", () => {
    const dir = path.join(process.cwd(), "public", "question-bank", "topics");
    const files = fs.readdirSync(dir).filter(name => name.endsWith(".json"));
    let checked = 0;
    const failures = [];

    for (const name of files) {
      const questions = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
      for (const q of questions) {
        if (isMultipleChoice(q)) continue;
        const result = gradeAdaptiveResponse(q, { working: q.worked_solution || "", answer: q.answer || "" });
        checked += 1;
        if (result.marks !== Number(q.marks || 1) || result.needsSelfAssessment) {
          failures.push({ id: q.id, marks: q.marks, got: result.marks, answer: q.answer, feedback: result.feedback });
          if (failures.length >= 12) break;
        }
      }
      if (failures.length >= 12) break;
    }

    expect(checked).toBeGreaterThan(12000);
    expect(failures).toEqual([]);
  });
});
