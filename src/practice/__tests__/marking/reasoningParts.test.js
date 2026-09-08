// ============================================================================
// reasoningParts.test.js
//
// The bank was 17 points short of the syllabus weighting for Reasoning, and
// paper2ReasoningParts.js is the pilot that starts closing it. Three things
// have to hold, and none of them is obvious enough to leave unchecked.
//
//   1. Every entry still applies. Each one hangs off a question and takes its
//      marks from a named part of that question, so an edit to the host can
//      silently orphan it.
//   2. No question changed its total. A reasoning mark that inflates the paper
//      is not a reasoning mark, it is a bug in the blueprint.
//   3. The new parts mark like an examiner: full marks for the idea in any
//      wording, partial marks for half the idea, nothing for the wrong idea.
// ============================================================================

import {
  PAPER2_REASONING_PARTS, applyPaper2ReasoningPartsWithReport,
} from "../../paper2ReasoningParts";
import { PAPER2_QUESTION_BANK_V2 } from "../../paper2QuestionBankV2";
import { PAPER2_QUESTION_BANK_EJ } from "../../paper2QuestionBankEJ";
import { applyPaper2ContentFixes } from "../../paper2ContentFixes";
import { buildPaper2Exam, validatePaper2Exam } from "../../paper2Engine";
import { profileMixReport } from "../../cxcMarking/profiles.js";
import { BANK, findPart, mark } from "../../marking/examinerHarness";

describe("every reasoning part is still attached to its question", () => {
  const { bank, report } = applyPaper2ReasoningPartsWithReport(
    applyPaper2ContentFixes([...PAPER2_QUESTION_BANK_V2, ...PAPER2_QUESTION_BANK_EJ]));

  test("no entry has been orphaned by an edit to its host", () => {
    expect(report.filter(r => !r.applied).map(r => `${r.id}: ${r.problem}`)).toEqual([]);
  });

  test("no host question changed its total", () => {
    const hosts = new Set(PAPER2_REASONING_PARTS.map(e => e.question));
    const wrong = bank
      .filter(q => hosts.has(q.question_id))
      .filter(q => (q.parts || []).reduce((s, p) => s + Number(p.marks || 0), 0) !== Number(q.marks))
      .map(q => q.question_id);
    expect(wrong).toEqual([]);
  });

  test("the marks taken and the marks added balance in every entry", () => {
    const unbalanced = PAPER2_REASONING_PARTS.filter(entry => {
      const funds = Array.isArray(entry.funds) ? entry.funds : [entry.funds];
      const freed = funds.reduce((sum, f) => sum + (f.from - f.to), 0);
      return freed !== entry.part.marks;
    }).map(e => e.id);
    expect(unbalanced).toEqual([]);
  });

  test("every entry states why the part it takes from was over-marked", () => {
    expect(PAPER2_REASONING_PARTS.filter(e => !e.because || e.because.length < 40)
      .map(e => e.id)).toEqual([]);
  });
});

describe("the new parts mark their own answers", () => {
  for (const entry of PAPER2_REASONING_PARTS) {
    test(`${entry.id} (${entry.question}) awards full marks for its model answer`, () => {
      const part = findPart(entry.question, entry.part.id);
      const result = mark(entry.question, entry.part.id,
        String(part.answer), String(part.solution));
      expect([entry.id, result.marks]).toEqual([entry.id, Number(part.marks)]);
    });
  }

  test("every new part is tagged as reasoning", () => {
    const untagged = [];
    for (const entry of PAPER2_REASONING_PARTS) {
      const part = findPart(entry.question, entry.part.id);
      const reasoning = (part.criteria || [])
        .filter(c => c.profile === "reasoning")
        .reduce((sum, c) => sum + Number(c.marks || 0), 0);
      if (!reasoning) untagged.push(entry.id);
    }
    expect(untagged).toEqual([]);
  });
});

describe("a reason is marked on its idea, not its wording", () => {
  // The left column is what a student might reasonably write, the right is
  // what an examiner gives it. Everything with a zero is a wrong idea, not a
  // clumsy one: a marker that awards any of these is generous, not lenient.
  const CASES = [
    ["p2g-q1", "d", "Pay cash. The hire purchase costs $1,135 more.", 1],
    ["p2g-q1", "d", "Cash is cheaper by 1135 dollars", 1],
    ["p2g-q1", "d", "He should use hire purchase because it is cheaper", 0],

    ["p2-q1-v3", "c", "the hire purchase price is larger so the same difference is a smaller percentage", 1],
    ["p2-q1-v3", "c", "because 16.67 is already correct", 0],

    ["p2-q6-v4", "d", "4 times bigger, since area uses the radius squared", 2],
    ["p2-q6-v4", "d", "four times as big", 1],
    ["p2-q6-v4", "d", "twice as big because the radius is doubled", 0],

    ["p2g-q5", "c2", "we do not know the actual values, only the classes, so we use the midpoints", 1],
    ["p2g-q5", "c2", "because the mean was rounded to 1 decimal place", 0],

    ["p2-q3-v1", "d", "5.00 cm since reflections preserve length", 2],
    ["p2-q3-v1", "d", "5 cm, the length stays the same", 2],
    ["p2-q3-v1", "d", "5.00 cm", 1],
    ["p2-q3-v1", "d", "10 cm because it is doubled", 0],

    ["p2-q4-v1", "d", "No it has no inverse function as it is many-to-one", 2],
    ["p2-q4-v1", "d", "No", 0],
    ["p2-q4-v1", "d", "Yes, g has an inverse function", 0],

    ["p2-q10-v1", "b2", "not singular, the determinant is 7 which is not 0", 1],
    ["p2-q10-v1", "b2", "M is singular", 0],

    ["p2e-q2", "d", "at x = 11/3 both sides are equal so the strict inequality is not satisfied", 1],
    ["p2e-q2", "d", "because 11/3 is not an integer", 0],

    ["p2f-q2", "a2", "the original denominator is 0 when x = 4 so it is undefined", 1],
    ["p2f-q2", "a2", "because 4 is not in the answer", 0],

    ["p2e-q4", "b2", "6^2 + 7^2 = 85 but 9^2 = 81 so Pythagoras does not hold", 1],
    ["p2e-q4", "b2", "because the angle measured 51 degrees", 0],
  ];

  for (const [question, part, written, expected] of CASES) {
    test(`${question} (${part}) "${written}" scores ${expected}`, () => {
      expect(mark(question, part, written).marks).toBe(expected);
    });
  }
});

describe("the paper a student actually sits carries the reasoning marks", () => {
  // The bank average is not what reaches a student. They sit ten questions out
  // of 160, so the mix is decided when the paper is assembled. Before the
  // builder was taught the weighting it chose on topic alone, and a paper
  // could be built entirely from the most procedural templates in the bank.
  function reasoningShare(seed) {
    const exam = buildPaper2Exam({ seed });
    expect(validatePaper2Exam(exam).valid).toBe(true);
    return profileMixReport(exam.questions).share.reasoning;
  }

  test("a freshly built paper carries far more reasoning than the bank average", () => {
    const bankShare = profileMixReport(BANK).share.reasoning;
    const papers = Array.from({ length: 12 }, (_, i) => reasoningShare(`weighting-${i}`));
    const mean = papers.reduce((a, b) => a + b, 0) / papers.length;
    expect(mean).toBeGreaterThan(bankShare * 1.5);
    expect(Math.min(...papers)).toBeGreaterThan(bankShare);
  });

  test("the weighting never costs a student a repeated question", () => {
    const seen = new Set();
    let repeats = 0;
    for (let i = 0; i < 12; i += 1) {
      const exam = buildPaper2Exam({ seed: `repeat-${i}`, previouslyUsedQuestionIds: [...seen] });
      for (const question of exam.questions) {
        if (seen.has(question.question_id)) repeats += 1;
        seen.add(question.question_id);
      }
    }
    expect(repeats).toBe(0);
    expect(seen.size).toBe(120);
  });
});
