// ============================================================================
// profiles.js - which of CXC's three reporting dimensions a mark belongs to.
//
// CXC does not report Paper 2 as a single total. It reports three profile
// dimensions, and from the syllabus effective May and June 2027 they are
// Conceptual Knowledge (30 per cent), Algorithmic Knowledge (40 per cent) and
// Reasoning (30 per cent). Under the syllabus in force to 2026 the same three
// ideas are called Knowledge, Comprehension and Reasoning.
//
// A practice paper that cannot say "your reasoning marks are the weak ones" is
// throwing away the most useful thing it knows. The engine already carries a
// `profile` field on every criterion and threads it through to the feedback;
// nothing had ever set it. This is what sets it.
// ============================================================================

export const PROFILES = ["conceptual", "algorithmic", "reasoning"];

export const PROFILE_LABELS = {
  conceptual: "Conceptual knowledge",
  algorithmic: "Algorithmic knowledge",
  reasoning: "Reasoning",
};

export const PROFILE_DESCRIPTIONS = {
  conceptual: "Recalling a fact, a formula, a definition or a theorem, and reading a value.",
  algorithmic: "Carrying out a procedure correctly and accurately.",
  reasoning: "Justifying, explaining, proving, interpreting and deciding.",
};

/** The syllabus weighting each dimension carries. */
export const PROFILE_WEIGHTS = { conceptual: 0.3, algorithmic: 0.4, reasoning: 0.3 };

/**
 * Prompts whose demand makes the whole part a reasoning part.
 *
 * These are the verbs CXC uses when the mark is for the argument rather than
 * the arithmetic: justifying, explaining, generalising a pattern, working an
 * inverse problem, deciding between options and saying why. The generalisation
 * and inverse-problem patterns matter most, because they are what the
 * Investigation question is made of.
 */
const REASONING_PROMPT = new RegExp([
  "explain", "justify", "show that", "show clearly", "prove",
  "describe fully", "describe, in words", "describe the", "describe, in",
  "give a reason", "giving a reason", "state the reason", "giving your reason",
  "why", "determine whether", "state whether", "comment on", "interpret",
  "deduce", "hence state", "hence, determine", "hence determine",
  "what does .{0,40} tell",
  // generalising a pattern, and the inverse problem that follows it
  "write an expression, in terms of", "expression for the nth", "nth term",
  "nth statement", "in terms of n",
  "determine the (?:design|figure|statement) number",
  "number of the (?:design|figure|statement)",
  "can never be", "cannot be", "is not possible",
  // choosing between options and saying which
  "maximum profit", "minimum cost", "better buy", "best buy",
  "should be made", "should the", "greatest number of",
  // relationships between objects
  "geometrical relationship", "relationship between", "type of quadrilateral",
  "type of relation", "one-to-one",
].join("|"), "i");

/** Prompts that ask only for a stated fact. */
const RECALL_PROMPT =
  /\b(state|write down|name|copy and complete|read off|from the graph, state)\b/i;

/** Checks that are, by their nature, judgements about reasoning. */
const REASONING_CHECKS = new Set(["written", "reasonConcept", "prose"]);

/** Checks that are, by their nature, evidence of a procedure. */
const PROCEDURE_CHECKS = new Set([
  "contains", "containsLiteral", "method", "calculation", "reachesValue",
  "algebraTransition", "containsEquivalentExpression", "containsInequality",
]);

/**
 * Which dimension does this criterion belong to?
 *
 * A single CSEC part is normally split across dimensions rather than belonging
 * wholly to one: a three-mark calculation is typically one mark for knowing
 * what to do and two for doing it accurately. The rules below follow that,
 * applied in order.
 *
 *   1. A written, theorem-reason or prose judgement is reasoning, always.
 *   2. A part whose wording asks the candidate to explain, justify, prove,
 *      describe fully or decide and say why is reasoning throughout: the
 *      question is testing the argument, not the arithmetic.
 *   3. A method mark that names a rule ("uses the cosine rule") is conceptual.
 *      Recalling the right rule is knowledge; carrying it out is not.
 *   4. The first method mark of a part is conceptual for the same reason: it
 *      is the mark for knowing which step to take.
 *   5. Every later method mark, and every accuracy mark that follows one, is
 *      algorithmic.
 *   6. A part with no method marks at all that asks the candidate to state,
 *      name, write down or read off is conceptual.
 *   7. Everything else is algorithmic.
 *
 * Rule 4 is the one that most affects the totals, and it is the one a
 * mathematics specialist should review first. The syllabus weighting the
 * result should land near is 30 per cent conceptual, 40 algorithmic and 30
 * reasoning; `profileMixReport` measures the distance from it.
 */
export function profileFor(criterion = {}, part = {}) {
  if (criterion.profile) return criterion.profile;

  const kind = String(criterion.kind || criterion.code || "A")[0].toUpperCase();
  const checkType = criterion.check?.type;
  const optionTypes = (criterion.check?.options || []).map(o => o?.type);
  const prompt = String(part.prompt || "");

  if (REASONING_CHECKS.has(checkType) || optionTypes.some(t => REASONING_CHECKS.has(t))) {
    return "reasoning";
  }
  if (REASONING_PROMPT.test(prompt)) return "reasoning";

  if (kind === "M") {
    if (checkType === "method") return "conceptual";
    const methods = (part.criteria || []).filter(
      c => String(c.kind || c.code || "")[0]?.toUpperCase() === "M");
    const first = methods[0];
    if (first && (first === criterion || first.code === criterion.code)) return "conceptual";
    return "algorithmic";
  }

  if (PROCEDURE_CHECKS.has(checkType)) return "algorithmic";

  const hasMethodMark = (part.criteria || []).some(
    c => String(c.kind || c.code || "")[0]?.toUpperCase() === "M");
  if (!hasMethodMark && RECALL_PROMPT.test(prompt)) return "conceptual";
  return "algorithmic";
}

/** The dimension a rich workspace belongs to, by the kind of work it asks for. */
export function profileForSchema(schemaType) {
  switch (schemaType) {
    case "written": return "reasoning";
    case "table": return "algorithmic";
    case "graph": return "algorithmic";
    case "construction":
    case "construction_triangle": return "algorithmic";
    default: return "algorithmic";
  }
}

/** Tag every criterion on a part. */
export function tagProfiles(part) {
  const criteria = part.criteria || [];
  if (!criteria.length) return part;
  return { ...part, criteria: criteria.map(c => ({ ...c, profile: profileFor(c, part) })) };
}

/**
 * How far the bank's profile mix sits from the syllabus weighting.
 *
 * Reported rather than enforced. A mix that is short on reasoning is usually a
 * statement about the questions rather than about the tagging, and the answer
 * to it is to write more reasoning questions, not to relabel the marks.
 */
export function profileMixReport(bank) {
  const totals = { conceptual: 0, algorithmic: 0, reasoning: 0 };
  for (const question of bank || []) {
    for (const part of question.parts || []) {
      if (part.responseSchema) {
        totals[profileForSchema(part.responseSchema.type)] += Number(part.marks || 0);
        continue;
      }
      for (const criterion of part.criteria || []) {
        const profile = criterion.profile || profileFor(criterion, part);
        totals[profile] = (totals[profile] || 0) + Number(criterion.marks || 0);
      }
    }
  }
  const all = PROFILES.reduce((s, p) => s + totals[p], 0) || 1;
  return {
    totals,
    share: Object.fromEntries(PROFILES.map(p => [p, totals[p] / all])),
    target: PROFILE_WEIGHTS,
    worstGap: Math.max(...PROFILES.map(p => Math.abs(totals[p] / all - PROFILE_WEIGHTS[p]))),
  };
}

/** Empty profile totals, ready to accumulate into. */
export function emptyProfileTotals() {
  return Object.fromEntries(PROFILES.map(p => [p, { marks: 0, of: 0 }]));
}

/** Add one marked criterion to a running profile total. */
export function accumulateProfile(totals, criterion) {
  const profile = criterion?.profile;
  if (!profile || !totals[profile]) return totals;
  totals[profile].of += Number(criterion.maxMarks ?? criterion.of ?? 0);
  totals[profile].marks += Number(criterion.marks || 0);
  return totals;
}

/** Percentages, and the dimension that most needs work. */
export function summariseProfiles(totals, labels = PROFILE_LABELS) {
  const rows = PROFILES.map(profile => {
    const { marks, of } = totals[profile] || { marks: 0, of: 0 };
    return {
      profile,
      label: labels?.[profile] || PROFILE_LABELS[profile],
      description: PROFILE_DESCRIPTIONS[profile],
      marks, of,
      percent: of ? Math.round((marks / of) * 1000) / 10 : null,
    };
  });
  const scored = rows.filter(r => r.of > 0 && r.percent !== null);
  const weakest = scored.length
    ? scored.reduce((a, b) => (b.percent < a.percent ? b : a))
    : null;
  return { rows, weakest };
}
