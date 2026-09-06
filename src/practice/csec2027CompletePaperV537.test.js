import fs from "fs";
import path from "path";
import {
  CSEC_2027_FULL_PAPERS,
  CSEC_2027_MODULE1_PAPERS,
  CSEC_2027_MODULE2_PAPERS,
  CSEC_2027_MODULE3_PAPERS,
  CSEC_2027_PRACTICE_MODES,
} from "./csec2027Data";
import { calculateCsec2027ModuleMark } from "./Paper2027ModuleExam";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";

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

describe("SPARK complete CSEC 2027 Paper 2 V5.3.7", () => {
  test("provides Module 1, Module 2, Module 3 and full-paper modes", () => {
    expect(CSEC_2027_PRACTICE_MODES.map(mode => mode.key)).toEqual(["module1", "module2", "module3", "full"]);
    for (const papers of [CSEC_2027_MODULE1_PAPERS, CSEC_2027_MODULE2_PAPERS, CSEC_2027_MODULE3_PAPERS]) {
      expect(papers).toHaveLength(3);
      for (const paper of papers) {
        expect(paper.questions).toHaveLength(3);
        expect(paper.totalMarks).toBe(30);
        expect(paper.durationSeconds).toBe(50 * 60);
        expect(paper.profile).toEqual({ CK: 9, AK: 12, R: 9 });
      }
    }
    for (const paper of CSEC_2027_FULL_PAPERS) {
      expect(paper.questions).toHaveLength(9);
      expect(paper.totalMarks).toBe(90);
      expect(paper.durationSeconds).toBe(150 * 60);
      expect(paper.profile).toEqual({ CK: 27, AK: 36, R: 27 });
      expect(paper.questions.map(question => question.module)).toEqual([1,1,1,2,2,2,3,3,3]);
    }
  });

  test("all three complete model papers earn 90 out of 90", () => {
    for (const paper of CSEC_2027_FULL_PAPERS) {
      const grade = calculateCsec2027ModuleMark(canonicalAnswers(paper), paper.questions, paper.profile);
      expect(grade.score).toBe(90);
      expect(grade.maxScore).toBe(90);
      expect(grade.percent).toBe(100);
      expect(grade.profile.CK.marks).toBe(27);
      expect(grade.profile.AK.marks).toBe(36);
      expect(grade.profile.R.marks).toBe(27);
    }
  });

  test("new authored response types are wired into SPARK workspaces", () => {
    const responseTypes = new Set();
    for (const paper of CSEC_2027_FULL_PAPERS) {
      for (const question of paper.questions) {
        for (const part of question.parts) if (part.responseSchema?.type) responseTypes.add(part.responseSchema.type);
      }
    }
    expect(responseTypes.has("table")).toBe(true);
    expect(responseTypes.has("construction")).toBe(true);
    expect(responseTypes.has("graph")).toBe(true);
    expect(responseTypes.has("written")).toBe(true);
  });

  test("the 2027 hub no longer advertises Module 2, Module 3 or full Paper 2 as coming next", () => {
    const hub = fs.readFileSync(path.join(__dirname, "Syllabus2027Hub.jsx"), "utf8");
    expect(hub).toContain("2027 Paper 2 modes");
    expect(hub).toContain("full Paper 2 practice");
    expect(hub).not.toContain("Coming next");
    expect(hub).not.toContain("When all modules are ready");
  });
});
