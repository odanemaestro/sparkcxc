// ============================================================================
// adapter.js - turn a bank question into a question the marker can mark.
//
// Two things happen here, and keeping them apart matters.
//
// 1. DERIVATION. A part that carries no mark scheme gets one inferred from its
//    worked solution. This is a stopgap, not a design: a scheme no human has
//    read is not a mark scheme, and everything it produces is flagged
//    `provisional` and can only ever add marks, never withhold them.
//
// 2. NORMALISATION. Every part, authored or derived, is then put into the
//    shape the engine needs: follow-through wired to the parts it depends on,
//    accuracy requirements that match what the question actually asked for,
//    written answers marked as ideas rather than as strings, and every mark
//    tagged with the CXC profile dimension it belongs to.
//
// Rich graph, construction and table workspaces keep their own rubrics.
// ============================================================================

import { numbersIn } from "./algebra.js";
import { paper2EcfRule } from "./ecfRules.js";
import { buildProseCriteria } from "./prose.js";
import { tagProfiles } from "./profiles.js";

const CLOSE = (a, b) => Math.abs(a - b) <= Math.max(1e-6, Math.abs(b) * 1e-4);

function literalNumbers(value) {
  const source = String(value ?? "").replace(/(\d),(?=\d{3}\b)/g, "$1");
  return (source.match(/-?\d+(?:\.\d+)?/g) || []).map(Number).filter(Number.isFinite);
}

function givens(part, stem) {
  return literalNumbers(`${stem || ""} ${part.prompt || ""}`);
}

function finalNumbers(part) {
  return literalNumbers(String(part.answer ?? ""));
}

function priorAnswerNumbers(question, part, keepIds = []) {
  const keep = new Set(keepIds || []);
  const out = [];
  for (const candidate of question?.parts || []) {
    if (candidate.id === part.id) break;
    if (keep.has(candidate.id)) continue;
    out.push(...finalNumbers(candidate));
  }
  return out;
}

/**
 * The part of a worked solution that is working, with any closing check
 * removed. "Check: 3(6) + 2(7) = 32" is good teaching and terrible evidence:
 * it is optional, so nothing in it may become a compulsory method mark.
 */
function workingPartOf(solution) {
  return String(solution || "").split(/\bcheck\s*[:.]/i)[0];
}

/** Intermediate numerical evidence that is literally shown in the worked solution. */
export function intermediates(part, questionOrStem) {
  const question = questionOrStem && typeof questionOrStem === "object" ? questionOrStem : null;
  const stem = question ? question.stem : questionOrStem;
  const ecf = question ? resolveDependency(question, part) : null;
  // Earlier answers are not method evidence for this part unless the rule says
  // this part genuinely depends on them. This prevents a worked solution's
  // optional checking sentence from becoming a compulsory M mark.
  const known = [
    ...givens(part, stem),
    ...(question ? priorAnswerNumbers(question, part, ecf?.uses || []) : []),
  ];
  const finals = finalNumbers(part);
  const seen = [];
  for (const n of literalNumbers(workingPartOf(part.solution))) {
    if (!Number.isFinite(n) || Math.abs(n) < 1e-9) continue;
    if (known.some(k => CLOSE(n, k))) continue;
    if (finals.some(k => CLOSE(n, k))) continue;
    if (seen.some(k => CLOSE(n, k))) continue;
    // Small integers often come from powers, part counts and formula constants;
    // they are weak evidence on their own.
    if (Number.isInteger(n) && Math.abs(n) <= 4) continue;
    seen.push(n);
  }
  return seen;
}

/**
 * Every value a legitimate route to this step can produce.
 *
 * A 15 per cent discount can be found as the discount itself, or applied as a
 * 0.85 multiplier, or as 85 over 100. All three are correct method and an
 * examiner rewards all three, so a method mark that names only one of them is
 * marking the candidate's arithmetic style rather than their mathematics.
 */
function multiplierFamily(part, question) {
  const source = `${question?.stem || ""} ${part.prompt || ""}`;
  const percentages = [...source.matchAll(/(\d+(?:\.\d+)?)\s*%/g)]
    .map(m => Number(m[1])).filter(p => Number.isFinite(p) && p > 0 && p < 1000);
  const out = [];
  for (const p of percentages) {
    out.push(p / 100, (100 - p) / 100, (100 + p) / 100, 100 - p, 100 + p);
  }
  return [...new Set(out.filter(Number.isFinite))];
}

// Keep method-name detection conservative. A solution containing "sin 68" is
// not evidence that the candidate used the sine rule.
const METHOD_WORDS = [
  ["the cosine rule", ["cosine rule"]],
  ["the sine rule", ["sine rule"]],
  ["Pythagoras' theorem", ["pythagoras"]],
  ["the quadratic formula", ["quadratic formula", "b^2 - 4ac", "b² - 4ac"]],
  ["substitution", ["substitut"]],
  ["the reciprocal", ["reciprocal"]],
  ["a common denominator", ["common denominator", "lcm"]],
  ["completing the square", ["completing the square"]],
  ["the compound interest formula", ["compound interest"]],
  ["a matrix method", ["matrix method"]],
];

function methodNamed(solution) {
  const source = String(solution || "").toLowerCase();
  for (const [name, patterns] of METHOD_WORDS) {
    if (patterns.some(pattern => source.includes(pattern))) return { name, patterns };
  }
  return null;
}

function supportsMethodMarks(part) {
  if (part.answerType === "text") return false;
  const prompt = String(part.prompt || "");
  return /\b(calculate|determine|solve|evaluate|express|simplify|expand|factorise|show that|prove|find)\b/i.test(prompt)
    || Boolean(methodNamed(part.solution));
}

function calculationEvidence(part, question) {
  if (!/^(calculate|determine|solve|evaluate|express|simplify|expand|factorise|make|show that)\b/i.test(String(part.prompt || "").trim())) return [];
  const finals = finalNumbers(part);
  const ecf = resolveDependency(question, part);
  const prior = priorAnswerNumbers(question, part, ecf?.uses || []);
  const seen = [];
  for (const value of literalNumbers(workingPartOf(part.solution))) {
    if (finals.some(final => CLOSE(value, final))) continue;
    if (prior.some(previous => CLOSE(value, previous))) continue;
    if (seen.some(existing => CLOSE(value, existing))) continue;
    seen.push(value);
  }
  return seen.slice(0, 3);
}

function finalAnswerCheck(part) {
  return {
    type: "sparkAnswer",
    answer: String(part.answer ?? ""),
    accepted: (part.accepted || []).map(String),
    answerType: part.answerType,
    tolerance: Number.isFinite(Number(part.tolerance)) ? Number(part.tolerance) : undefined,
    decimalPlaces: Number.isInteger(part.decimalPlaces) ? part.decimalPlaces : undefined,
    significantFigures: Number.isInteger(part.significantFigures) ? part.significantFigures : undefined,
    requiredForm: part.requiredForm,
    requireFullyFactorised: part.requireFullyFactorised === true ? true : undefined,
  };
}

function theoremConcept(part) {
  const source = `${part.prompt || ""} ${part.solution || ""}`.toLowerCase();
  if (/alternate segment/.test(source) || (/tangent/.test(source) && /chord/.test(source) && /segment/.test(source))) return "alternate_segment";
  if (/cyclic/.test(source) && /opposite/.test(source)) return "cyclic_opposite_supplementary";
  if (/(angle at the centre|angle at the center|central angle)/.test(source) && /(circumference|inscribed)/.test(source)) return "angle_centre_twice_circumference";
  if (/vertically opposite/.test(source)) return "vertically_opposite_equal";
  if (/(co[- ]?interior|allied|same side interior)/.test(source)) return "cointerior_supplementary";
  if (/(radii|radius)/.test(source) && /(isosceles|base angles)/.test(source)) return "radii_form_isosceles";
  return null;
}

function asksForReason(part) {
  return /\b(give|giving|state)\b[^.]{0,50}\breason\b|\breason\s+for\s+your\s+answer\b/i.test(String(part.prompt || ""));
}

function symbolicCriteria(part, marks) {
  const prompt = String(part.prompt || "").trim();
  if (/^expand\b/i.test(prompt) && /\bsimplif/i.test(prompt) && marks >= 3) {
    return [
      {
        kind: "M", marks: 1, field: "working", depends: [],
        description: "shows a valid algebraic expansion or simplification step",
        check: { type: "algebraTransition", minTransitions: 1 },
      },
      {
        kind: "M", marks: 1, field: "working", depends: [],
        description: "reaches an expression equivalent to the simplified result in the working",
        check: { type: "containsEquivalentExpression", value: String(part.answer ?? "") },
      },
      {
        kind: "A", marks: marks - 2, field: "answer", depends: ["M2"],
        description: description(part), check: finalAnswerCheck(part),
      },
    ];
  }
  if (/^solve\b/i.test(prompt) && /inequal/i.test(prompt) && marks >= 2) {
    return [
      {
        kind: "M", marks: 1, field: "working", depends: [],
        description: "rearranges the inequality correctly",
        check: { type: "containsInequality", value: String(part.answer ?? "") },
      },
      {
        kind: "A", marks: marks - 1, field: "answer", depends: ["M1"],
        description: description(part), check: finalAnswerCheck(part),
      },
    ];
  }
  return null;
}

function description(part) {
  const answer = String(part.answer ?? "").trim();
  return answer && answer.length <= 36 ? `obtains ${answer}` : "obtains the required answer";
}

function numberCriteria(criteria) {
  const seen = { M: 0, A: 0, B: 0 };
  return criteria.map(item => {
    const kind = String(item.kind || item.code || "A")[0].toUpperCase();
    seen[kind] += 1;
    return { ...item, kind, code: `${kind}${seen[kind]}` };
  });
}

// ---------------------------------------------------------------------------
// follow-through
// ---------------------------------------------------------------------------

/**
 * How this part's answer follows from earlier parts of the same question.
 *
 * The rule lives on the part as `derivedFrom`, which is where a question
 * author can see it and edit it next to the answer it belongs to. The old
 * external lookup table is still consulted so the 43 rules already written
 * keep working during the migration, and a rule authored on a criterion is
 * honoured too.
 */
export function resolveDependency(question, part) {
  if (part?.derivedFrom) return part.derivedFrom;
  const curated = paper2EcfRule(question?.question_id, part?.id);
  if (curated) return curated;
  if (part?.ecf) return part.ecf;
  const authored = (part?.criteria || []).find(c => c.ecf);
  return authored ? authored.ecf : null;
}

/**
 * Wire follow-through into a part's criteria.
 *
 * The accuracy mark gets the rule, so a candidate whose earlier answer was
 * wrong is marked against what their own answer implies. Every method mark
 * gets the same dependency list, because a method mark that looks for the
 * canonical intermediate will never find it once the candidate is working
 * from their own figure, and that single omission was what stopped
 * follow-through firing on two thirds of the parts that declared it.
 */
function wireFollowThrough(question, part, criteria) {
  const rule = resolveDependency(question, part);
  if (!rule) return criteria;

  let accuracyIndex = -1;
  for (let i = criteria.length - 1; i >= 0; i -= 1) {
    if (criteria[i].kind === "A" || criteria[i].kind === "B") { accuracyIndex = i; break; }
  }

  return criteria.map((criterion, index) => {
    const next = { ...criterion };
    if (index === accuracyIndex && !next.ecf) next.ecf = rule;
    if (criterion.kind === "M") {
      next.followThroughUses = [...new Set([...(criterion.followThroughUses || []), ...(rule.uses || [])])];
      next.ecf = criterion.ecf || rule;
      if (part.followThroughFormula && !next.followThroughFormula) {
        next.followThroughFormula = part.followThroughFormula;
      }
    }
    return next;
  });
}

// ---------------------------------------------------------------------------
// normalisation applied to authored and derived schemes alike
// ---------------------------------------------------------------------------

/** Did the question actually ask for a stated accuracy? */
function requestedPrecision(part) {
  const prompt = `${part.prompt || ""}`;
  const dp = prompt.match(/(\d+)\s+decimal\s+places?/i);
  const sf = prompt.match(/(\d+)\s+significant\s+figures?/i);
  const nearest = /\bnearest\s+(cent|penny|whole number|degree|integer|dollar|metre|meter|cm|km|minute|hour|ten|hundred|thousand)\b/i.test(prompt);
  return {
    dp: dp ? Number(dp[1]) : null,
    sf: sf ? Number(sf[1]) : null,
    nearest,
  };
}

/**
 * Drop an accuracy requirement the question never made.
 *
 * "Calculate the cash price of the gas stove" does not ask for two decimal
 * places, so a candidate who writes $4,080 has answered it. The requirement
 * was in the mark scheme because the model answer happens to be written with
 * cents, and it was costing marks on money parts in one of the two banks while
 * the identical question in the other bank accepted the same answer.
 */
function relaxUnrequestedPrecision(part, criteria) {
  const asked = requestedPrecision(part);
  return criteria.map(criterion => {
    const check = criterion.check;
    if (!check || (check.dp === undefined && check.sf === undefined
                   && check.decimalPlaces === undefined && check.significantFigures === undefined)) {
      return criterion;
    }
    const next = { ...criterion, check: { ...check } };
    if (next.check.dp !== undefined && asked.dp === null && !asked.nearest) delete next.check.dp;
    if (next.check.sf !== undefined && asked.sf === null) delete next.check.sf;
    if (next.check.decimalPlaces !== undefined && asked.dp === null && !asked.nearest) {
      delete next.check.decimalPlaces;
    }
    if (next.check.significantFigures !== undefined && asked.sf === null) {
      delete next.check.significantFigures;
    }
    if (asked.dp !== null && next.check.dp === undefined && next.check.type === "numeric") {
      next.check.dp = asked.dp;
    }
    return next;
  });
}

/** Questions whose wording makes the working part of the answer. */
const DEMANDS_WORKING =
  /\b(show that|show clearly|showing your working|show all working|show your working|prove|hence show|show, using|by calculation, show)\b/i;

export function requiresWorking(part) {
  if (part.requireWorking !== undefined) return Boolean(part.requireWorking);
  return DEMANDS_WORKING.test(String(part.prompt || ""));
}

/**
 * Replace a string comparison on a written answer with a checklist of ideas.
 *
 * Only the final accuracy criterion is replaced, and only when it is judging a
 * sentence with the general string checker. Method marks are left alone, and a
 * part whose scheme already uses a written checklist is left alone entirely.
 */
function applyProseCriteria(part, criteria) {
  const alreadyWritten = criteria.some(c => ["written", "reasonConcept", "prose"].includes(c.check?.type));
  if (alreadyWritten) return criteria;

  let index = -1;
  for (let i = criteria.length - 1; i >= 0; i -= 1) {
    if (criteria[i].kind === "A" || criteria[i].kind === "B") { index = i; break; }
  }
  if (index < 0) return criteria;
  const target = criteria[index];
  if (target.check?.type !== "sparkAnswer") return criteria;

  const built = buildProseCriteria({ ...part, marks: target.marks ?? 1 });
  if (!built || !built.length) return criteria;

  // The prose checklist is generous about wording and strict about ideas. Keep
  // the original string comparison alongside it as a first, cheaper route, so
  // a candidate who reproduces the model answer exactly is never worse off.
  const replacement = built.map(c => ({
    ...c,
    kind: target.kind,
    // Each built criterion knows which box it should read. A written judgement
    // reads the answer; an algebraic clause may legitimately be found in the
    // working. Overriding that here was letting a contrast word inside a model
    // solution be read as the candidate's own conclusion.
    field: c.field || "answer",
    depends: [],
    check: built.length === 1
      ? { type: "anyOf", options: [target.check, c.check] }
      : c.check,
  }));
  return [...criteria.slice(0, index), ...replacement, ...criteria.slice(index + 1)];
}

/** Apply strictness only where the question demands the working. */
function applyStrictness(part, criteria) {
  const strict = requiresWorking(part);
  return criteria.map(c => ({
    ...c,
    strictDepends: c.strictDepends !== undefined ? c.strictDepends
      : (strict && (c.kind === "A" || c.kind === "B") && (c.depends || []).length > 0),
  }));
}

/** Renumber, re-derive dependencies and check the arithmetic of a scheme. */
function finaliseCriteria(part, question, rawCriteria, { provisional = false } = {}) {
  let numbered = numberCriteria(rawCriteria);
  numbered = numbered.map((criterion, index) => {
    if (criterion.kind !== "A") {
      if (criterion.kind === "M" && index > 0 && !criterion.depends?.length) {
        const prior = [...numbered.slice(0, index)].reverse().find(item => item.kind === "M");
        return prior ? { ...criterion, depends: [prior.code] } : { ...criterion, depends: [] };
      }
      return { ...criterion, depends: criterion.depends || [] };
    }
    if (criterion.depends !== undefined && criterion.depends !== null) return criterion;
    const prior = [...numbered.slice(0, index)].reverse().find(item => item.kind === "M");
    return { ...criterion, depends: prior ? [prior.code] : [] };
  });

  numbered = relaxUnrequestedPrecision(part, numbered);
  numbered = applyProseCriteria(part, numbered);
  numbered = numberCriteria(numbered);
  numbered = wireFollowThrough(question, part, numbered);
  numbered = applyStrictness(part, numbered);
  if (provisional) numbered = numbered.map(c => ({ ...c, provisional: true }));

  const total = numbered.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
  const marks = Number(part.marks || 0);
  if (total !== marks) {
    throw new Error(`Paper 2 part ${question?.question_id || "?"}/${part.id}: `
      + `mark scheme totals ${total}, expected ${marks}`);
  }
  return numbered;
}

// ---------------------------------------------------------------------------
// derivation, for parts that carry no authored scheme
// ---------------------------------------------------------------------------

function deriveCriteria(part, question) {
  const marks = Number(part.marks || 0);
  const mids = intermediates(part, question);
  const method = methodNamed(part.solution);
  const calculation = calculationEvidence(part, question);
  const specialSymbolic = symbolicCriteria(part, marks);
  const reasonConcept = asksForReason(part) ? theoremConcept(part) : null;
  const family = multiplierFamily(part, question);
  const criteria = [];

  if (reasonConcept && marks >= 2 && finalNumbers(part).length === 1) {
    criteria.push({
      kind: "B", marks: 1, field: "answer", depends: [],
      description: `states the required value ${String(part.answer ?? "").trim()}`,
      check: { type: "containsValue", value: finalNumbers(part)[0], tolerance: Number(part.tolerance || 1e-6) },
    });
    criteria.push({
      kind: "B", marks: marks - 1, field: "all", depends: [],
      description: "gives a valid mathematical reason",
      check: { type: "reasonConcept", concept: reasonConcept },
    });
    return criteria;
  }

  if (specialSymbolic) return specialSymbolic;

  if (marks <= 1 || !supportsMethodMarks(part)) {
    return [{
      kind: "B", marks, field: "answer", depends: [],
      description: description(part), check: finalAnswerCheck(part),
    }];
  }

  if (method && marks >= 3) {
    criteria.push({
      kind: "M", marks: 1, field: "all", depends: [],
      description: `uses ${method.name}`,
      check: { type: "method", any: method.patterns },
    });
  }

  const availableMethodSlots = Math.min(2 - criteria.length, Math.max(0, marks - 1 - criteria.length));
  for (const [midIndex, mid] of mids.slice(0, Math.max(0, availableMethodSlots)).entries()) {
    criteria.push({
      kind: "M", marks: 1, field: "all",
      depends: criteria.length ? [criteria[criteria.length - 1].code].filter(Boolean) : [],
      description: midIndex === 0 ? "shows a required intermediate calculation"
        : "continues the method to the next required result",
      // Any route that reaches this step counts, including the one-step
      // multiplier a stronger candidate uses.
      check: { type: "reachesValue", values: [mid, ...family], relTolerance: 5e-3 },
    });
  }

  if (!criteria.length && calculation.length >= 2) {
    criteria.push({
      kind: "M", marks: 1, field: "all", depends: [],
      description: "shows a valid numerical substitution",
      check: { type: "calculation", values: calculation.slice(0, 3) },
    });
  }

  // If there is no trustworthy method evidence in the stored worked solution,
  // keep the independent-answer behaviour rather than inventing a step.
  if (!criteria.length) {
    return [{
      kind: "B", marks, field: "answer", depends: [],
      description: description(part), check: finalAnswerCheck(part),
    }];
  }

  const used = criteria.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
  criteria.push({
    kind: "A", marks: Math.max(1, marks - used), field: "answer", depends: [],
    description: description(part), check: finalAnswerCheck(part),
  });
  return criteria;
}

// ---------------------------------------------------------------------------
// public interface
// ---------------------------------------------------------------------------

/** Upgrade one typed part. Rich workspaces are deliberately left untouched. */
export function upgradePaper2Part(part, question) {
  if (part.responseSchema) return part;

  const authored = Array.isArray(part.criteria) && part.criteria.length > 0;
  const base = authored ? part.criteria : deriveCriteria(part, question);
  const criteria = finaliseCriteria(part, question, base, { provisional: !authored });

  const upgraded = {
    ...part,
    criteria,
    requireWorking: requiresWorking(part),
    grading_mode: "CXC_MAB_ECF",
    mark_scheme_source: authored ? "authored" : "derived_from_worked_solution",
  };
  return tagProfiles(upgraded);
}

export function upgradePaper2Question(question) {
  return {
    ...question,
    parts: (question.parts || []).map(part => upgradePaper2Part(part, question)),
  };
}

export function upgradePaper2Bank(bank) {
  return (bank || []).map(upgradePaper2Question);
}

export function paper2MarkingCoverage(bank) {
  let parts = 0;
  let richParts = 0;
  let typedParts = 0;
  let methodParts = 0;
  let methodMarks = 0;
  let totalMarks = 0;
  let ecfParts = 0;
  let proseParts = 0;

  for (const question of bank || []) {
    for (const rawPart of question.parts || []) {
      parts += 1;
      totalMarks += Number(rawPart.marks || 0);
      if (rawPart.responseSchema) {
        richParts += 1;
        continue;
      }
      typedParts += 1;
      const part = upgradePaper2Part(rawPart, question);
      const methods = (part.criteria || []).filter(criterion => criterion.kind === "M");
      if (methods.length) methodParts += 1;
      methodMarks += methods.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
      if ((part.criteria || []).some(criterion => criterion.ecf)) ecfParts += 1;
      if ((part.criteria || []).some(criterion => criterion.check?.type === "prose"
        || criterion.check?.options?.some(o => o.type === "prose"))) proseParts += 1;
    }
  }

  return { parts, richParts, typedParts, methodParts, methodMarks, totalMarks, ecfParts, proseParts };
}

/**
 * Which parts depend on an earlier answer but declare no follow-through rule?
 *
 * A part is a candidate whenever an earlier part's answer appears in this
 * part's worked solution. Run in the test suite, this is what stops the
 * coverage gap reopening the next time somebody edits a bank.
 */
export function missingFollowThrough(bank) {
  const missing = [];
  for (const question of bank || []) {
    const seen = [];
    for (const part of question.parts || []) {
      const solutionNumbers = numbersIn(workingPartOf(part.solution));
      const dependsOn = seen.filter(prev => prev.values.some(
        v => Math.abs(v) > 1 && solutionNumbers.some(s => CLOSE(s, v))));
      if (dependsOn.length && !resolveDependency(question, part)) {
        missing.push({
          question_id: question.question_id,
          part: part.id,
          dependsOn: dependsOn.map(d => d.id),
        });
      }
      seen.push({ id: part.id, values: finalNumbers(part) });
    }
  }
  return missing;
}
