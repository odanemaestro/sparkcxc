import fs from "fs";
import path from "path";
import { buildPaper1Exam, structuralFingerprint, validatePaper1Exam } from "./paper1Engine";

function makeQuestion(paper, position, variant, repeat = "") {
  return {
    question_id: `${paper}-Q${String(position).padStart(2, "0")}-${variant}`,
    paper,
    year: 2020 + variant,
    sitting: "MJ",
    question_number: position,
    topic: position <= 10 ? "Number Theory and Computation" : position <= 20 ? "Algebra" : "Geometry and Transformations",
    subtopic: `Skill ${String.fromCharCode(65 + (position % 26))}${String.fromCharCode(65 + Math.floor(position / 26))}`,
    stem: `Find value ${variant * 100 + position} for item ${position}`,
    option_a: "1",
    option_b: "2",
    option_c: "3",
    option_d: "4",
    correct_option: "A",
    record_status: "Full transcription",
    verification_confidence: "High",
    repeat_group_id: repeat,
    diagram_required: position % 7 === 0,
    diagram_type: position % 7 === 0 ? "Geometry" : "",
  };
}

describe("Paper 1 exam engine", () => {
  const bank = [];
  for (let variant = 1; variant <= 4; variant += 1) {
    for (let position = 1; position <= 60; position += 1) {
      bank.push(makeQuestion(`Paper ${variant}`, position, variant));
    }
  }

  test("creates 60 unique questions in historical positions", () => {
    const exam = buildPaper1Exam(bank, { seed: "alpha" });
    const validation = validatePaper1Exam(exam);
    expect(validation.valid).toBe(true);
    expect(validation.questionCount).toBe(60);
    expect(validation.uniqueIds).toBe(60);
    expect(validation.positions).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
  });

  test("prefers unseen questions when previous IDs are supplied", () => {
    const first = buildPaper1Exam(bank, { seed: "first" });
    const second = buildPaper1Exam(bank, {
      seed: "second",
      previouslyUsedQuestionIds: first.questions.map(q => q.question_id),
    });
    const overlap = second.questions.filter(q => first.questions.some(x => x.question_id === q.question_id));
    expect(overlap).toHaveLength(0);
  });

  test("normalizes number-only variants into one structural shape", () => {
    const a = makeQuestion("A", 1, 1);
    const b = { ...a, stem: "Find value 999 for item 1" };
    expect(structuralFingerprint(a)).toBe(structuralFingerprint(b));
  });

  test("builds repeated valid papers from the real bank", () => {
    const realBank = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/practice-exam/questions.json"), "utf8"));
    const byPaper = new Map();
    realBank.forEach(q => {
      const rows = byPaper.get(q.paper) || [];
      rows.push(q);
      byPaper.set(q.paper, rows);
    });
    for (let i = 0; i < 100; i += 1) {
      const exam = buildPaper1Exam(realBank, { seed: `real-${i}` });
      expect(validatePaper1Exam(exam).valid).toBe(true);
      const template = new Map((byPaper.get(exam.templatePaper) || []).map(q => [q.question_number, q]));
      const topicMatches = exam.questions.filter(q => template.get(q.question_number)?.topic === q.topic).length;
      expect(topicMatches).toBeGreaterThanOrEqual(50);
    }
  });
});
