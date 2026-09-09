import fs from "fs";
import path from "path";

describe("SPARK V5.6.1 grading unification integration", () => {
  const adaptive = fs.readFileSync(path.join(process.cwd(), "src", "adaptive", "AdaptivePractice.jsx"), "utf8");
  const grader = fs.readFileSync(path.join(process.cwd(), "src", "adaptive", "adaptiveCxcGrader.js"), "utf8");
  const gateway = fs.readFileSync(path.join(process.cwd(), "src", "grading", "answerIntelligence.js"), "utf8");

  test("Adaptive Practice sends MCQ and typed answers through one gradeAdaptiveResponse path", () => {
    expect(adaptive).toContain("const result = gradeAdaptiveResponse(q, { answer, working });");
    expect(adaptive).not.toContain('String(answer).trim().toUpperCase() === String(q.answer || "").trim().toUpperCase()');
  });

  test("Adaptive answer adapter delegates to the canonical grading gateway", () => {
    expect(grader).toContain('from "../grading/answerIntelligence"');
    expect(grader).toContain("return gradeCanonicalResponse(question, response);");
  });

  test("gateway reuses Paper 2 CXC adapter and mark scheme rather than inventing a second short-answer engine", () => {
    expect(gateway).toContain('from "../practice/cxcMarking/adapter"');
    expect(gateway).toContain('from "../practice/cxcMarking/markScheme"');
    expect(gateway).toContain("upgradePaper2Part(part, wrapper)");
    expect(gateway).toContain("markPart({ answer, working }, part, {})");
  });

  test("Adaptive Practice records answer-model observations without changing the grade", () => {
    expect(adaptive).toContain("answerEvidence: result.answerEvidence || null");
    expect(adaptive).toContain("recordAnswerObservation");
    expect(gateway).toContain('supabase.rpc("spark_record_answer_observation"');
  });
});
