// ============================================================================
// examinerHarness.js - the measurements the marking suite asserts against.
//
// Every function here marks the whole bank under one scenario and returns a
// number. The tests that use them assert thresholds, so a change that makes
// the marker less like an examiner fails immediately and says by how much.
//
// It lives beside the code rather than inside a __tests__ folder because the
// test runner treats every file in such a folder as a suite of its own, and a
// file of helpers has no tests in it to run. Nothing in the application
// imports this module, so it never reaches the production bundle.
// ============================================================================

import { PAPER2_QUESTION_BANK } from "../paper2QuestionBank";
import { gradeCxcPaper2Part } from "../paper2CxcGrader";
import { buildCanonicalPaper2Response } from "../paper2RichGrader";
import { carryForward } from "../cxcMarking/markScheme.js";

export const BANK = PAPER2_QUESTION_BANK;

export function typedParts() {
  const out = [];
  for (const question of BANK) {
    for (const part of question.parts || []) {
      if (part.responseSchema) continue;
      out.push({ question, part });
    }
  }
  return out;
}

export function findPart(questionId, partId) {
  const question = BANK.find(q => q.question_id === questionId);
  if (!question) throw new Error(`no question ${questionId}`);
  const part = (question.parts || []).find(p => p.id === partId);
  if (!part) throw new Error(`no part ${questionId}/${partId}`);
  return part;
}

export function mark(questionId, partId, answer, working = "", earlier = {}) {
  return gradeCxcPaper2Part({ answer, working }, findPart(questionId, partId), earlier);
}

/** The response a candidate who reproduces the mark scheme would give. */
export function modelResponse(part) {
  return part.responseSchema
    ? buildCanonicalPaper2Response(part)
    : { answer: String(part.answer ?? ""), working: String(part.solution ?? "") };
}

/** Mark every part of every question, threading follow-through as the app does. */
export function markWholeBank(responseFor) {
  let awarded = 0;
  let available = 0;
  const losses = [];
  for (const question of BANK) {
    const earlier = {};
    for (const part of question.parts || []) {
      const response = responseFor(part, question);
      const result = response === undefined
        ? { marks: Number(part.marks || 0) }
        : gradeCxcPaper2Part(response, part, earlier);
      const got = Number(result.marks || 0);
      const of = Number(part.marks || 0);
      awarded += got;
      available += of;
      if (got < of) {
        losses.push({
          question_id: question.question_id, part: part.id, of, got,
          requireWorking: Boolean(part.requireWorking),
          why: (result.criteria || []).filter(c => !c.marks).map(c => c.why).join(" | "),
        });
      }
      const state = {
        value: result.value ?? null,
        values: result.values || [],
        correct: result.canonicalCorrect !== undefined ? result.canonicalCorrect : result.correct,
      };
      earlier[part.id] = state;
      const short = String(part.label || "").replace(/[()\s]/g, "").trim();
      if (short) earlier[short] = state;
    }
  }
  return { awarded, available, losses };
}

/**
 * The follow-through probe.
 *
 * For every part that declares a rule, rebuild the earlier state as if the
 * parts it depends on had been answered with a plausible wrong value, work out
 * what the follow-through answer should be, and submit it. The criterion that
 * carries the rule must be awarded: that is the whole point of the convention.
 */
export function probeFollowThrough() {
  const rows = [];
  for (const question of BANK) {
    for (const target of question.parts || []) {
      if (target.responseSchema) continue;
      const criterion = (target.criteria || []).find(c => c.ecf);
      if (!criterion) continue;

      const uses = criterion.ecf.uses || [];
      const earlier = {};
      const perturbed = {};
      for (const part of question.parts || []) {
        if (part.id === target.id) break;
        const first = (String(part.answer ?? "").replace(/(\d),(?=\d{3}\b)/g, "$1")
          .match(/-?\d+(?:\.\d+)?/) || [])[0];
        const canonical = Number(first);
        const short = String(part.label || "").replace(/[()\s]/g, "").trim();
        const isDependency = uses.includes(part.id) || uses.includes(short);
        let value = canonical;
        let correct = true;
        if (isDependency && Number.isFinite(canonical)) {
          value = Number((canonical * 1.1 + 1).toFixed(4));
          correct = false;
          perturbed[part.id] = value;
        }
        const state = { value: Number.isFinite(value) ? value : null, correct };
        earlier[part.id] = state;
        if (short) earlier[short] = state;
      }

      const expected = carryForward(criterion.ecf, earlier);
      if (expected === null) {
        rows.push({ question_id: question.question_id, part: target.id,
          resolved: false, awarded: false });
        continue;
      }
      const shown = String(Math.round(expected * 1e6) / 1e6);
      const working = `${Object.values(perturbed).join(" ")} gives ${shown}`;
      const result = gradeCxcPaper2Part({ answer: shown, working }, target, earlier);
      const line = (result.criteria || []).find(c => c.code === criterion.code);
      rows.push({
        question_id: question.question_id, part: target.id,
        resolved: true,
        awarded: Boolean(line && line.marks > 0),
        marks: Number(result.marks || 0), of: Number(target.marks || 0),
      });
    }
  }
  return rows;
}
