import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { PAPER2_QUESTION_BANK_V2 } from "./paper2QuestionBankV2";
import { gradePaper2Part } from "./paper2Engine";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";
import { paper2MarkingCoverage } from "./cxcMarking/adapter";

function stateFrom(result) {
  return {
    value: result.value ?? null,
    correct: result.canonicalCorrect !== undefined ? result.canonicalCorrect : result.correct,
  };
}

describe("Paper 2 CXC M/A/B marking V5.3", () => {
  test("combines the audited bank with Papers E-J and preserves mark structure", () => {
    const coverage = paper2MarkingCoverage(PAPER2_QUESTION_BANK);
    expect(PAPER2_QUESTION_BANK).toHaveLength(160);
    expect(coverage).toEqual({
      parts: 630,
      richParts: 56,
      typedParts: 574,
      methodParts: 406,
      methodMarks: 536,
      totalMarks: 1600,
      ecfParts: 88,
      proseParts: 26,
    });

    for (let position = 1; position <= 10; position += 1) {
      expect(PAPER2_QUESTION_BANK.filter(question => question.question_number === position)).toHaveLength(16);
    }
    for (const question of PAPER2_QUESTION_BANK) {
      expect(question.parts.reduce((sum, part) => sum + Number(part.marks || 0), 0)).toBe(question.marks);
      for (const part of question.parts) {
        if (part.responseSchema) continue;
        expect(part.criteria.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0)).toBe(part.marks);
      }
    }
  });

  test("every model script earns every available mark", () => {
    let earned = 0;
    let available = 0;

    for (const question of PAPER2_QUESTION_BANK) {
      const earlier = {};
      for (const part of question.parts) {
        const response = part.responseSchema
          ? buildCanonicalPaper2Response(part)
          : { answer: String(part.answer ?? ""), working: String(part.solution ?? "") };
        const result = gradePaper2Part(response, part, earlier);
        earned += Number(result.marks || 0);
        available += Number(part.marks || 0);
        expect(result.marks).toBe(part.marks);
        const state = stateFrom(result);
        earlier[part.id] = state;
        const short = String(part.label || "").replace(/[()\s]/g, "").trim();
        if (short) earlier[short] = state;
      }
    }

    expect(earned).toBe(1600);
    expect(available).toBe(1600);
  });

  test("legacy primitive canonical answers keep the existing full-credit contract", () => {
    for (const question of PAPER2_QUESTION_BANK) {
      for (const part of question.parts) {
        expect(gradePaper2Part(part.answer, part).correct).toBe(true);
      }
    }
  });

  test("method marks survive an arithmetic slip while dependent accuracy marks do not", () => {
    const question = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2-q9-v3");
    const part = question.parts.find(item => item.id === "a");

    const result = gradePaper2Part({
      working: "Using the cosine rule, KM^2 = 9^2 + 14^2 - 2(9)(14)cos 68 = 182.60",
      answer: "13.0",
    }, part);

    expect(result.marks).toBe(2);
    expect(result.maxMarks).toBe(4);
    expect(result.criteria.filter(item => item.code.startsWith("M") && item.earned)).toHaveLength(2);
    expect(result.criteria.find(item => item.code === "A1").earned).toBe(false);
  });

  // A correct final answer earns an ordinary numerical part, working or not.
  // That is the CXC convention: the method mark exists to rescue a candidate
  // whose answer is wrong, not to withhold marks from one whose answer is
  // right. Working is required only where the question demands it, and those
  // parts are the subject of the next test.
  test("a correct final answer earns the part even with no working shown", () => {
    const question = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2-q9-v3");
    const part = question.parts.find(item => item.id === "a");
    const result = gradePaper2Part({ answer: part.answer, working: "" }, part);
    expect(result.marks).toBe(part.marks);
    expect(result.criteria.filter(item => item.impliedByAnswer).length).toBeGreaterThan(0);
    expect(result.criteria.some(item => item.dependencyBlocked)).toBe(false);
  });

  test("a question that demands the working does not award it from the answer alone", () => {
    const question = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2e-q9");
    const part = question.parts.find(item => item.id === "a");
    expect(part.requireWorking).toBe(true);
    const result = gradePaper2Part({ answer: part.answer, working: "" }, part);
    expect(result.marks).toBeLessThan(part.marks);
  });

  test("an in-progress pre-V5.3 question object still grades through the legacy checker", () => {
    const rawQuestion = PAPER2_QUESTION_BANK_V2.find(item => item.question_id === "p2-q2-v1");
    const rawPart = rawQuestion.parts.find(item => item.id === "a");
    const result = gradePaper2Part({ answer: rawPart.answer, working: "old saved attempt" }, rawPart);
    expect(result.correct).toBe(true);
    expect(result.marks).toBe(rawPart.marks);
  });
});
