import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { gradePaper2Part } from "./paper2Engine";
import { paper2EcfRuleCount } from "./cxcMarking/ecfRules";
import { carryForward } from "./cxcMarking/markScheme";

function canonicalResponse(part) {
  return {
    working: String(part.solution ?? ""),
    answer: String(part.answer ?? ""),
  };
}

function rememberCanonicalState(earlier, part) {
  // Build earlier-part state through the real V5.3 grader rather than coercing
  // part.answer with Number(). This matters for perfectly valid canonical
  // answers such as 3/2 and coordinate answers such as (1, -4), where the
  // criterion's captureIndex deliberately carries only the required x-value.
  const result = gradePaper2Part(canonicalResponse(part), part, earlier);
  if (result.value === null || result.value === undefined || !Number.isFinite(Number(result.value))) return;

  const state = { value: Number(result.value), correct: true };
  earlier[part.id] = state;
  const short = String(part.label || "").replace(/[()\s]/g, "").trim();
  if (short) earlier[short] = state;
}

describe("Paper 2 error carried forward V5.3", () => {
  test("keeps 43 curated base-bank rules and validates every combined-bank ECF formula", () => {
    expect(paper2EcfRuleCount()).toBe(43);
    let criteriaCount = 0;
    let finiteCount = 0;

    for (const question of PAPER2_QUESTION_BANK) {
      const earlier = {};
      for (const part of question.parts || []) {
        for (const criterion of part.criteria || []) {
          if (!criterion.ecf) continue;
          criteriaCount += 1;
          const target = carryForward(criterion.ecf, earlier);
          expect(target).not.toBeNull();
          expect(Number.isFinite(Number(target))).toBe(true);
          finiteCount += 1;
        }
        rememberCanonicalState(earlier, part);
      }
    }

    expect(criteriaCount).toBe(91);
    expect(finiteCount).toBe(91);
  });

  test("canonical fraction and coordinate responses expose the numeric value needed by ECF", () => {
    const gradientQuestion = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2e-q3");
    const gradientPart = gradientQuestion.parts.find(item => item.id === "c");
    const gradient = gradePaper2Part(canonicalResponse(gradientPart), gradientPart, {});
    expect(gradient.value).toBeCloseTo(1.5, 8);

    const graphQuestion = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2e-q8");
    const minimumPart = graphQuestion.parts.find(item => item.id === "c");
    const minimum = gradePaper2Part(canonicalResponse(minimumPart), minimumPart, {});
    expect(minimum.value).toBeCloseTo(1, 8);
  });

  test("one wrong cost price does not get punished again in the next two parts", () => {
    const question = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2-q1-v1");
    const earlier = {};
    const b1 = question.parts.find(item => item.id === "b1");
    const b2 = question.parts.find(item => item.id === "b2");
    const b3 = question.parts.find(item => item.id === "b3");

    const first = gradePaper2Part({
      working: "The selling price is 125% of cost, so 4500 x 100 / 125 = 3500",
      answer: "3500",
    }, b1, earlier);
    earlier.b1 = { value: first.value, correct: first.canonicalCorrect };
    expect(first.marks).toBe(1);
    expect(first.correct).toBe(false);

    const second = gradePaper2Part({
      working: "Using my cost price, 3500 x 1.4 = 4900",
      answer: "4900",
    }, b2, earlier);
    earlier.b2 = { value: second.value, correct: second.canonicalCorrect };
    expect(second.marks).toBe(2);
    expect(second.ecf).toBe(true);
    expect(second.canonicalCorrect).toBe(false);

    const third = gradePaper2Part({
      working: "Increase = 4900 - 4500 = 400. 400 / 4500 x 100 = 8.89",
      answer: "8.89",
    }, b3, earlier);
    expect(third.marks).toBe(2);
    expect(third.ecf).toBe(true);
    expect(third.canonicalCorrect).toBe(false);
  });

  test("ECF supports multi-character part ids and equation templates", () => {
    const multiId = PAPER2_QUESTION_BANK.flatMap(question => (question.parts || []).flatMap(part => (part.criteria || []).map(criterion => ({ question, part, criterion }))))
      .find(item => item.criterion.ecf?.uses?.some(id => String(id).length > 1));
    expect(multiId).toBeTruthy();

    const templated = PAPER2_QUESTION_BANK.flatMap(question => (question.parts || []).flatMap(part => (part.criteria || []).map(criterion => criterion.ecf)))
      .find(ecf => ecf?.template);
    expect(templated).toBeTruthy();
  });
});
