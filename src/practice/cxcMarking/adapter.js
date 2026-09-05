// Derive examiner-style M/A/B schemes from the audited Paper 2 bank.
// Rich graph/construction/table workspaces keep their dedicated rubrics.

import { numbersIn } from "./algebra.js";
import { paper2EcfRule } from "./ecfRules.js";

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

/** Intermediate numerical evidence that is literally shown in the worked solution. */
export function intermediates(part, questionOrStem) {
  const question = questionOrStem && typeof questionOrStem === "object" ? questionOrStem : null;
  const stem = question ? question.stem : questionOrStem;
  const ecf = question ? paper2EcfRule(question.question_id, part.id) : null;
  // Earlier answers are not method evidence for this part unless the curated
  // ECF rule says this part genuinely depends on them. This prevents a worked
  // solution's optional checking sentence from becoming a compulsory M mark.
  const known = [
    ...givens(part, stem),
    ...(question ? priorAnswerNumbers(question, part, ecf?.uses || []) : []),
  ];
  const finals = finalNumbers(part);
  const seen = [];
  for (const n of literalNumbers(part.solution || "")) {
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
  const ecf = paper2EcfRule(question?.question_id, part.id);
  const prior = priorAnswerNumbers(question, part, ecf?.uses || []);
  const seen = [];
  for (const value of literalNumbers(part.solution || "")) {
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

function addFollowThroughMetadata(question, part, criteria) {
  const rule = paper2EcfRule(question.question_id, part.id);
  if (!rule) return criteria;

  const earlier = Object.fromEntries(
    (question.parts || []).map(candidate => [candidate.id, finalNumbers(candidate)])
  );
  const canonicalDependencies = (rule.uses || [])
    .flatMap(id => earlier[id] || [])
    .filter(Number.isFinite);

  let accuracyIndex = -1;
  for (let i = criteria.length - 1; i >= 0; i -= 1) {
    if (criteria[i].kind === "A" || criteria[i].kind === "B") {
      accuracyIndex = i;
      break;
    }
  }

  return criteria.map((criterion, index) => {
    const next = { ...criterion };
    if (index === accuracyIndex) next.ecf = rule;

    if (criterion.kind === "M" && ["contains", "containsLiteral"].includes(criterion.check?.type)) {
      const wanted = (Array.isArray(criterion.check.value) ? criterion.check.value : [criterion.check.value])
        .map(Number).filter(Number.isFinite);
      const referencesEarlierAnswer = wanted.some(w => canonicalDependencies.some(d =>
        Math.abs(w - d) <= Math.max(0.15, Math.abs(d) * 0.002)
      ));
      if (referencesEarlierAnswer) next.followThroughUses = [...(rule.uses || [])];
    }
    return next;
  });
}

/** Upgrade one typed part. Rich workspaces are deliberately left untouched. */
export function upgradePaper2Part(part, question) {
  if (part.responseSchema || part.criteria) return part;

  const marks = Number(part.marks || 0);
  const mids = intermediates(part, question);
  const method = methodNamed(part.solution);
  const calculation = calculationEvidence(part, question);
  const specialSymbolic = symbolicCriteria(part, marks);
  const reasonConcept = asksForReason(part) ? theoremConcept(part) : null;
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
  } else if (specialSymbolic) {
    criteria.push(...specialSymbolic);
  } else if (marks <= 1 || !supportsMethodMarks(part)) {
    criteria.push({
      kind: "B", marks, field: "answer", depends: [],
      description: description(part), check: finalAnswerCheck(part),
    });
  } else {
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
        description: midIndex === 0 ? "shows a required intermediate calculation" : "continues the method to the next required result",
        check: { type: "containsLiteral", value: [mid] },
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
    // keep the existing independent-answer behaviour rather than inventing a step.
    if (!criteria.length) {
      criteria.push({
        kind: "B", marks, field: "answer", depends: [],
        description: description(part), check: finalAnswerCheck(part),
      });
    } else {
      const used = criteria.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
      criteria.push({
        kind: "A", marks: Math.max(1, marks - used), field: "answer",
        depends: [],
        description: description(part), check: finalAnswerCheck(part),
      });
    }
  }

  let numbered = numberCriteria(criteria);
  // Accuracy marks depend on the last preceding method mark. Method marks may
  // themselves be sequential when the stored working contains multiple steps.
  numbered = numbered.map((criterion, index) => {
    if (criterion.kind !== "A") {
      if (criterion.kind === "M" && index > 0 && !criterion.depends?.length) {
        const prior = [...numbered.slice(0, index)].reverse().find(item => item.kind === "M");
        return prior ? { ...criterion, depends: [prior.code] } : { ...criterion, depends: [] };
      }
      return { ...criterion, depends: criterion.depends || [] };
    }
    const prior = [...numbered.slice(0, index)].reverse().find(item => item.kind === "M");
    return { ...criterion, depends: prior ? [prior.code] : [] };
  });
  numbered = addFollowThroughMetadata(question, part, numbered);

  const total = numbered.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
  if (total !== marks) throw new Error(`Paper 2 part ${question?.question_id || "?"}/${part.id}: mark scheme totals ${total}, expected ${marks}`);

  return {
    ...part,
    criteria: numbered,
    grading_mode: "CXC_MAB_ECF",
    mark_scheme_source: "derived_from_worked_solution",
  };
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

  for (const question of bank || []) {
    for (const rawPart of question.parts || []) {
      parts += 1;
      totalMarks += Number(rawPart.marks || 0);
      if (rawPart.responseSchema) {
        richParts += 1;
        continue;
      }
      typedParts += 1;
      const part = rawPart.criteria ? rawPart : upgradePaper2Part(rawPart, question);
      const methods = (part.criteria || []).filter(criterion => criterion.kind === "M");
      if (methods.length) methodParts += 1;
      methodMarks += methods.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
      if ((part.criteria || []).some(criterion => criterion.ecf)) ecfParts += 1;
    }
  }

  return { parts, richParts, typedParts, methodParts, methodMarks, totalMarks, ecfParts };
}
