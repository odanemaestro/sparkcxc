import {
  answerEvidenceForSelfAssessment,
  canonicalOptionKey,
  gradeCanonicalResponse,
  resolveCanonicalOption,
  terminalCalculationCandidate,
  validateCanonicalQuestion,
} from "./answerIntelligence";

describe("SPARK V5.6.1 canonical grading gateway", () => {
  test("resolves an MCQ whose stored answer is the value rather than the selected letter", () => {
    const q = {
      id: "live-f5",
      marks: 1,
      answer: "13",
      correct_option_index: 1,
      options: ["A) 8", "B) 13", "C) 15", "D) 17"],
    };
    expect(canonicalOptionKey(q)).toBe("B");
    expect(gradeCanonicalResponse(q, { answer: "B" }).status).toBe("correct");
  });

  test("refuses to guess when authored MCQ answer sources conflict", () => {
    const q = {
      id: "conflict",
      marks: 1,
      answer: "13",
      correct_option_index: 0,
      options: ["A) 8", "B) 13", "C) 15", "D) 17"],
    };
    const resolved = resolveCanonicalOption(q);
    expect(resolved.valid).toBe(false);
    expect(resolved.error).toBe("canonical_conflict");
    const grade = gradeCanonicalResponse(q, { answer: "B" });
    expect(grade.status).toBe("uncertain");
    expect(grade.answerEvidence.error_code).toBe("canonical_conflict");
  });

  test("extracts a scalar final result from a clear calculation chain without deciding correctness itself", () => {
    const response = "f(7) = 3(7) - 4 = 17, then g(17) = 17^2 + 2 = 289 + 2 = 291";
    expect(terminalCalculationCandidate(response, "291")).toBe("291");
  });

  test("does not collapse a multi-root/equation answer into its last equality", () => {
    expect(terminalCalculationCandidate("x = 2 or x = 4", "x = 2 or x = 4")).toBeNull();
    expect(terminalCalculationCandidate("x^2 - x - 6 = 0", "x^2 - x - 6 = 0")).toBeNull();
  });

  test("auto-grades the live composite-functions calculation ending in 291", () => {
    const q = {
      id: "SPARK-CSECQ-FUNC-001",
      question: "Given f(x) = 3x - 4 and g(x) = x^2 + 2, calculate g(f(7)).",
      marks: 1,
      answer: "291",
      worked_solution: "f(7) = 17. Therefore g(f(7)) = 17^2 + 2 = 291.",
    };
    const response = "f(7) = 3(7) - 4 = 17, then g(17) = 17^2 + 2 = 289 + 2 = 291";
    const grade = gradeCanonicalResponse(q, { answer: response });
    expect(grade.status).toBe("correct");
    expect(grade.marks).toBe(1);
    expect(grade.needsSelfAssessment).toBe(false);
  });

  test("preserves equivalent fraction and decimal grading", () => {
    const q = { id: "fraction", question: "Give the probability.", marks: 1, answer: "1/2" };
    expect(gradeCanonicalResponse(q, { answer: "0.5" }).status).toBe("correct");
    expect(gradeCanonicalResponse(q, { answer: "2/4" }).status).toBe("correct");
  });

  test("does not become generous: a genuinely wrong value remains wrong", () => {
    const q = { id: "number", question: "Calculate the value.", marks: 1, answer: "13" };
    const grade = gradeCanonicalResponse(q, { answer: "12" });
    expect(grade.status).toBe("incorrect");
    expect(grade.marks).toBe(0);
    expect(grade.answerEvidence.error_code).toBe("wrong_value");
  });

  test("required mathematical form is still enforced", () => {
    const q = {
      id: "factor",
      question: "Factorise completely.",
      marks: 1,
      answer: "(x-2)(x+3)",
      requiredForm: "factorised",
    };
    expect(gradeCanonicalResponse(q, { answer: "(x+3)(x-2)" }).status).toBe("correct");
    expect(gradeCanonicalResponse(q, { answer: "x^2+x-6" }).status).toBe("incorrect");
  });

  test("canonical validation accepts the authored answer and authored alternatives", () => {
    const q = {
      id: "money",
      question: "Calculate the amount paid.",
      marks: 1,
      answer: "4080.00",
      accepted_answers: ["4080", "$4,080.00"],
      tolerance: 0.011,
    };
    expect(validateCanonicalQuestion(q)).toMatchObject({ valid: true, kind: "typed" });
  });

  test("self-assessment changes only answer evidence, not the canonical key", () => {
    const evidence = answerEvidenceForSelfAssessment({
      status: "uncertain",
      error_code: "grader_uncertain",
      error_label: "Answer format needs grader review",
    }, false);
    expect(evidence).toMatchObject({
      status: "incorrect",
      self_assessed: true,
      error_code: "self_assessed_incorrect",
    });
  });
});
