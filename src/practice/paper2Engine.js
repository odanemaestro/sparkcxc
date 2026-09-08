import { isPaper2PartComplete } from "./paper2RichGrader";
import { gradeCxcPaper2Part, hasPaper2FinalAnswer } from "./paper2CxcGrader";
import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import {
  DEFAULT_PAPER2_BLUEPRINT, indicativeBand, paper2Blueprint, validateAgainstBlueprint,
} from "./paper2Blueprints";
import {
  accumulateProfile, emptyProfileTotals, profileForSchema, summariseProfiles,
  PROFILES, PROFILE_WEIGHTS,
} from "./cxcMarking/profiles.js";

const DEFAULT_BLUEPRINT = paper2Blueprint(DEFAULT_PAPER2_BLUEPRINT);

export const PAPER2_DURATION_SECONDS = DEFAULT_BLUEPRINT.durationSeconds;
export const PAPER2_QUESTION_COUNT = DEFAULT_BLUEPRINT.questionCount;
export const PAPER2_TOTAL_MARKS = DEFAULT_BLUEPRINT.totalMarks;
export const PAPER2_TEMPLATE_COUNT = PAPER2_QUESTION_BANK.length;
export { PAPER2_BLUEPRINTS, DEFAULT_PAPER2_BLUEPRINT, indicativeBand } from "./paper2Blueprints";

function hashSeed(seed) {
  let h = 2166136261;
  const text = String(seed || "paper2");
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFromSeed(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, rng) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getPaper2Bank() {
  return PAPER2_QUESTION_BANK;
}

// SPARK_V55_PROFILE_WEIGHTED_BUILDER
// Repetition/design freshness remains the first selection tier. Profile
// weighting only ranks questions within the tier the builder was already
// willing to use, so balancing cannot re-introduce a previously used question.
const WEIGHTING_SLACK = 0.04;

function profileMarks(question) {
  const totals = { conceptual: 0, algorithmic: 0, reasoning: 0 };
  for (const part of question.parts || []) {
    if (part.responseSchema) {
      totals[profileForSchema(part.responseSchema.type)] += Number(part.marks || 0);
      continue;
    }
    for (const criterion of part.criteria || []) {
      const profile = criterion.profile || "algorithmic";
      totals[profile] = (totals[profile] || 0) + Number(criterion.marks || 0);
    }
  }
  return totals;
}

const BANK_AVERAGE = (() => {
  const totals = { conceptual: 0, algorithmic: 0, reasoning: 0 };
  for (const question of PAPER2_QUESTION_BANK) {
    const marks = profileMarks(question);
    for (const key of PROFILES) totals[key] += marks[key];
  }
  const count = PAPER2_QUESTION_BANK.length || 1;
  return Object.fromEntries(PROFILES.map(key => [key, totals[key] / count]));
})();

function distanceFromWeighting(running, candidate, positionsLeft, weights) {
  const marks = profileMarks(candidate);
  const totals = Object.fromEntries(PROFILES.map(key => [
    key, running[key] + marks[key] + positionsLeft * BANK_AVERAGE[key],
  ]));
  const all = PROFILES.reduce((sum, key) => sum + totals[key], 0) || 1;
  return PROFILES.reduce(
    (sum, key) => sum + Math.abs(totals[key] / all - (weights[key] ?? 0)), 0);
}

export function buildPaper2Exam(options = {}) {
  const requestedBlueprint = options.blueprint || DEFAULT_PAPER2_BLUEPRINT;
  // SPARK_V541_2027_ROUTE_GUARD
  // The legacy 160-template bank is the 10-question paper used through January
  // 2027. SPARK already has a separately authored 2027 module/paper system with
  // the correct nine-question, 90-mark structure. Silently selecting positions
  // 1-9 from this older bank would create an invalid 88-mark hybrid paper.
  if (requestedBlueprint === "2027") {
    throw new Error("The 2027 Paper 2 format is provided by SPARK's dedicated CSEC 2027 practice module, not the legacy Paper 2 bank.");
  }
  const blueprint = paper2Blueprint(requestedBlueprint);
  const seed = options.seed || `${Date.now()}-${Math.random()}`;
  const rng = rngFromSeed(seed);
  const used = new Set(options.previouslyUsedQuestionIds || []);
  const usedDesigns = new Set(
    PAPER2_QUESTION_BANK
      .filter(question => used.has(question.question_id))
      .map(question => `${question.question_number}::${question.design || question.question_id}`)
  );
  const questions = [];
  const weights = blueprint.profiles || PROFILE_WEIGHTS;
  const running = { conceptual: 0, algorithmic: 0, reasoning: 0 };

  for (let qn = 1; qn <= blueprint.questionCount; qn += 1) {
    const candidates = shuffle(PAPER2_QUESTION_BANK.filter(q => q.question_number === qn), rng);
    const unseen = candidates.filter(q => !used.has(q.question_id));
    const freshDesign = unseen.filter(q => !usedDesigns.has(`${qn}::${q.design || q.question_id}`));
    const tier = freshDesign.length ? freshDesign : unseen.length ? unseen : candidates;
    const left = blueprint.questionCount - qn;
    const scored = tier.map(q => ({ q, d: distanceFromWeighting(running, q, left, weights) }));
    const best = Math.min(...scored.map(item => item.d));
    // The prior shuffle makes selection among near-best candidates seed-driven.
    // This avoids the diversity collapse measured under strict minimisation.
    const pick = (scored.find(item => item.d <= best + WEIGHTING_SLACK) || scored[0]).q;

    const marks = profileMarks(pick);
    for (const key of PROFILES) running[key] += marks[key];
    questions.push(pick);
  }

  return {
    id: `paper2-${seed}`,
    seed,
    durationSeconds: blueprint.durationSeconds,
    totalMarks: blueprint.totalMarks,
    blueprint: blueprint.id,
    blueprintLabel: blueprint.label,
    questions,
  };
}

/**
 * Does an assembled paper match the examination it is rehearsing?
 *
 * The old check required questions 1 to 7 to be labelled Section I and 8 to 10
 * Section II. That split is from the pre-2018 format, where Section II was
 * optional and candidates chose two of three questions. CSEC Mathematics
 * Paper 02 has had no sections for years, so the paper is checked against the
 * thing the syllabus actually specifies: the number of questions, the total,
 * and the spread of marks across topics.
 */
export function validatePaper2Exam(exam, blueprintId = DEFAULT_PAPER2_BLUEPRINT) {
  const result = validateAgainstBlueprint(exam, blueprintId);
  return {
    ...result,
    // kept for callers written against the previous shape
    sectionsOk: true,
  };
}

export function gradePaper2Part(userInput, part, earlier = {}) {
  return gradeCxcPaper2Part(userInput, part, earlier);
}

export function calculatePaper2Mark(answers = {}, questions = [], options = {}) {
  const blueprint = paper2Blueprint(options.blueprint || DEFAULT_PAPER2_BLUEPRINT);
  let score = 0;
  let answeredParts = 0;
  let correctParts = 0;
  let totalParts = 0;
  let ecfParts = 0;
  let ecfMarks = 0;
  let impliedMethodMarks = 0;
  const perQuestion = {};
  // CXC reports Paper 2 by profile dimension, not as a single total. Keeping a
  // running total per dimension is what lets the review screen say which of
  // the three is the weak one, which is the most useful thing the marking
  // knows and the thing a bare percentage throws away.
  const profileTotals = emptyProfileTotals();

  questions.forEach(question => {
    let questionScore = 0;
    let questionAnswered = 0;
    let questionCorrect = 0;
    let questionEcf = 0;
    const partResults = {};
    const earlier = {};

    (question.parts || []).forEach(part => {
      totalParts += 1;
      const value = answers?.[question.question_id]?.[part.id] ?? "";
      const result = gradePaper2Part(value, part, earlier);
      partResults[part.id] = result;

      if (result.status !== "blank") {
        answeredParts += 1;
        questionAnswered += 1;
      }
      if (result.correct) {
        correctParts += 1;
        questionCorrect += 1;
      }
      if (result.ecf) {
        ecfParts += 1;
        questionEcf += 1;
        const carried = (result.criteria || []).filter(criterion => criterion.ecf)
          .reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
        ecfMarks += carried;
      }

      // SPARK_V541_RICH_PROFILE_TOTALS
      // Rich table/graph/construction workspaces remain on their specialised
      // deterministic graders, but their marks must still appear in the live
      // profile breakdown. Count the whole rich part once by workspace kind.
      if (part.responseSchema) {
        const profile = profileForSchema(part.responseSchema.type);
        if (profileTotals[profile]) {
          profileTotals[profile].of += Number(part.marks || 0);
          profileTotals[profile].marks += Number(result.marks || 0);
        }
      } else {
        for (const criterion of result.criteria || []) {
          accumulateProfile(profileTotals, criterion);
          if (criterion.impliedByAnswer) impliedMethodMarks += Number(criterion.marks || 0);
        }
      }

      score += Number(result.marks || 0);
      questionScore += Number(result.marks || 0);

      const state = {
        value: result.value ?? null,
        // A full ECF result is fully credited but it is still not the canonical
        // value. Keeping that distinction allows follow-through to continue
        // through another dependent part.
        correct: result.canonicalCorrect !== undefined ? result.canonicalCorrect : result.correct,
      };
      earlier[part.id] = state;
      const short = String(part.label || "").replace(/[()\s]/g, "").trim();
      if (short) earlier[short] = state;
    });

    perQuestion[question.question_id] = {
      score: questionScore,
      marks: question.marks,
      answeredParts: questionAnswered,
      correctParts: questionCorrect,
      totalParts: question.parts?.length || 0,
      ecfParts: questionEcf,
      parts: partResults,
    };
  });

  const available = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)
    || blueprint.totalMarks;

  return {
    score,
    available,
    percent: Math.round((score / available) * 100),
    answeredParts,
    correctParts,
    totalParts,
    ecfParts,
    ecfMarks,
    impliedMethodMarks,
    perQuestion,
    profiles: summariseProfiles(profileTotals, blueprint.profileLabels),
    band: indicativeBand(available ? score / available : 0),
    blueprint: blueprint.id,
  };
}

export function isPaper2QuestionComplete(question, answers = {}) {
  const response = answers?.[question.question_id] || {};
  return (question.parts || []).every(part => {
    const value = response[part.id];
    if (part.responseSchema) return isPaper2PartComplete(part, value);
    return hasPaper2FinalAnswer(value, part);
  });
}
