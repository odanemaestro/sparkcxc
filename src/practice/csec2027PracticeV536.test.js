import fs from "fs";
import path from "path";
import { CSEC_2027_MODULE1_PAPERS } from "./csec2027Data";
import { calculateCsec2027ModuleMark } from "./Paper2027ModuleExam";
import { isFactorised, numbersIn } from "./cxcMarking/algebra";

function canonicalResponse(part) {
  if (part.responseSchema?.type === "table") {
    const cells = {};
    for (const row of part.responseSchema.rows || []) {
      for (const cell of row || []) {
        if (cell && typeof cell === "object" && !Array.isArray(cell) && cell.key) {
          cells[cell.key] = String(cell.answer ?? "");
        }
      }
    }
    return { cells };
  }
  return { answer: String(part.answer ?? ""), working: String(part.solution ?? "") };
}

describe("SPARK CSEC 2027 syllabus practice V5.3.6", () => {
  test("loads the three completed Module 1 practice papers", () => {
    expect(CSEC_2027_MODULE1_PAPERS).toHaveLength(3);
    for (const paper of CSEC_2027_MODULE1_PAPERS) {
      expect(paper.questions).toHaveLength(3);
      expect(paper.questions.reduce((sum, question) => sum + Number(question.marks || 0), 0)).toBe(30);
      expect(paper.questions[1].topic).toMatch(/Investigation/i);
      expect(paper.durationSeconds).toBe(50 * 60);
    }
  });

  test("every supplied 2027 model response earns 30 out of 30", () => {
    for (const paper of CSEC_2027_MODULE1_PAPERS) {
      const answers = {};
      for (const question of paper.questions) {
        answers[question.question_id] = {};
        for (const part of question.parts) answers[question.question_id][part.id] = canonicalResponse(part);
      }
      const grade = calculateCsec2027ModuleMark(answers, paper.questions);
      expect(grade.score).toBe(30);
      expect(grade.maxScore).toBe(30);
      expect(grade.percent).toBe(100);
    }
  });

  test("investigation tables become direct-entry auto-graded workspaces", () => {
    for (const paper of CSEC_2027_MODULE1_PAPERS) {
      const part = paper.questions[1].parts[0];
      expect(part.responseSchema?.type).toBe("table");
      const editable = part.responseSchema.rows.flat().filter(cell => cell && typeof cell === "object" && cell.key);
      // Preserve every authored table blank while respecting the supplied
      // mark allocation. Paper A contains one exploratory blank with no mark
      // specification, so it stays editable but does not block completion.
      expect(editable.length).toBeGreaterThanOrEqual(5);
      expect(editable.reduce((sum, cell) => sum + Number(cell.marks || 0), 0)).toBe(6);
      expect(editable.filter(cell => Number(cell.marks || 0) === 0).every(cell => cell.required === false)).toBe(true);
    }
  });

  test("2027 grading fixes accept monomial factorisation and spaced thousands", () => {
    expect(isFactorised("3b(2a - 5b)")).toBe(true);
    expect(numbersIn("25 000 x 25 000 = 625 000 000")).toEqual(expect.arrayContaining([25000, 25000, 625000000]));
  });

  test("Practice Hub exposes a separate 2027 syllabus area", () => {
    const hub = fs.readFileSync(path.join(__dirname, "PracticeHub.jsx"), "utf8");
    expect(hub).toContain("2027 Syllabus Practice");
    expect(hub).toContain('setMode("2027")');
    expect(hub).toContain("Syllabus2027Hub");
  });
});
