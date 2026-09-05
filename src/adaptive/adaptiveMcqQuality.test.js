import fs from "fs";
import path from "path";
import { adaptiveQuestionType, buildAdaptiveSession, sessionFormatPlan } from "./adaptiveEngine";

function loadIntegratedMcqs() {
  const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/question-bank/manifest.json"), "utf8"));
  const values = [];
  for (const area of manifest.areas || []) {
    for (const topic of area.topics || []) {
      const file = path.join(process.cwd(), "public/question-bank/topics", topic.file);
      const items = JSON.parse(fs.readFileSync(file, "utf8"));
      values.push(...items.filter(item => /^CSEC-M-P1-/.test(String(item.id || ""))));
    }
  }
  return values;
}

describe("Adaptive Paper 1 multiple-choice expansion", () => {
  test("integrates all 210 supplied original MCQ items with unique IDs", () => {
    const items = loadIntegratedMcqs();
    expect(items).toHaveLength(210);
    expect(new Set(items.map(item => item.id)).size).toBe(210);
  });

  test("every supplied MCQ has four options and one answer-key match", () => {
    for (const item of loadIntegratedMcqs()) {
      expect(adaptiveQuestionType(item)).toBe("multiple_choice");
      expect(item.options).toHaveLength(4);
      const correct = item.options.filter(option => option.is_correct);
      expect(correct).toHaveLength(1);
      expect(correct[0].key).toBe(item.answer);
    }
  });

  test("variant-pool families prevent easy/medium/hard parallels from looking unrelated", () => {
    const variants = loadIntegratedMcqs().filter(item => item.source_bank === "CSEC Paper 1 Archetype Variant Pool");
    expect(variants).toHaveLength(150);
    const families = new Map();
    for (const item of variants) families.set(item.variant_family, (families.get(item.variant_family) || 0) + 1);
    expect(families.size).toBe(50);
    expect([...families.values()].every(count => count === 3)).toBe(true);
  });

  test("10-question sessions target 50/40/30 percent MCQ as mastery rises", () => {
    expect(sessionFormatPlan(10, { skill: { score: 30 } }).filter(x => x === "multiple_choice")).toHaveLength(5);
    expect(sessionFormatPlan(10, { skill: { score: 65 } }).filter(x => x === "multiple_choice")).toHaveLength(4);
    expect(sessionFormatPlan(10, { skill: { score: 90 } }).filter(x => x === "multiple_choice")).toHaveLength(3);
  });

  test("the engine produces the planned 4/6 format mix when both pools are available", () => {
    const questions = [];
    for (const difficulty of ["Easy", "Medium", "Hard"]) {
      for (let i = 0; i < 12; i += 1) {
        questions.push({ id: "mcq-" + difficulty + "-" + i, subtopic: "Skill", difficulty, question_type: "multiple_choice", options: ["1","2","3","4"], variant_family: "m-" + difficulty + "-" + i });
        questions.push({ id: "typed-" + difficulty + "-" + i, subtopic: "Skill", difficulty, question_type: "short_answer", variant_family: "t-" + difficulty + "-" + i });
      }
    }
    const session = buildAdaptiveSession(questions, { Skill: { score: 65, attempts: 4, level: "Developing" } }, { count: 10 });
    expect(session).toHaveLength(10);
    expect(session.filter(item => adaptiveQuestionType(item) === "multiple_choice")).toHaveLength(4);
    expect(new Set(session.map(item => item.id)).size).toBe(10);
  });
});
