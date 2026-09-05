// ============================================================================
// markScheme.js - CXC-style partial credit.
//
// A CSEC Paper 02 part is not right or wrong; it is worth 2, 3, 4 or 5 marks
// awarded against named criteria:
//
//   M  a method mark - for a correct method, whatever the arithmetic does next
//   A  an accuracy mark - for a correct value, and it DEPENDS on its M mark:
//      an answer that is right by luck after a wrong method earns nothing
//   B  an independent mark - for a correct statement standing on its own
//
// and by the convention that decides more marks than any other:
//
//   ECF  error carried forward.  A candidate whose part (a) is wrong, but who
//        then uses their own wrong value correctly, gets full marks for part
//        (b).  Marking without it punishes one slip four times over, which is
//        the single biggest reason online tests feel unfair next to a real
//        examiner.
//
// A scheme is plain JSON - no functions - so it can sit in the same bank file
// as the question, be reviewed by a human, and be sent over the wire.
// ============================================================================

import { compile, equivalent } from "./algebra.js";
import { check } from "./checkers.js";

/** Where in a response a criterion looks. */
function fieldText(response, field) {
  if (response == null) return "";
  if (typeof response === "string") return response;
  switch (field) {
    case "working":
      return String(response.working ?? "");
    case "all":
      return [response.answer, response.working].filter(Boolean).join(" \n ");
    case "answer":
    default:
      return String(response.answer ?? response.value ?? "");
  }
}

/**
 * Recompute what a criterion's answer SHOULD be given what the student
 * actually wrote earlier.  `formula` is an ordinary expression in which the
 * ids of earlier parts are the variables:
 *
 *   { uses: ["a"], formula: "2*pi*a" }
 *
 * Returns null when any of the earlier values is missing or unreadable, in
 * which case there is nothing to carry forward and the mark is simply lost.
 */
export function carryForward(ecf, earlier) {
  if (!ecf || !ecf.formula) return null;

  const uses = ecf.uses || [];
  const aliases = ecf.variables || {};
  const placeholders = "pqrstuvwxyzabcdefghijklmno".split("");
  const placeholderSource = {};
  let formula = String(ecf.formula);

  // Part ids such as b1 are one logical variable but the algebra parser reads
  // an unknown alphanumeric name as multiplied symbols. Replace any part id
  // used directly in the formula with a safe one-letter placeholder first.
  uses.forEach((id, index) => {
    const letter = placeholders[index];
    if (!letter) return;
    const escaped = String(id).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|[^A-Za-z0-9_])${escaped}(?![A-Za-z0-9_])`, "g");
    if (pattern.test(formula)) {
      formula = formula.replace(pattern, `$1${letter}`);
      placeholderSource[letter] = id;
    }
  });

  const fn = compile(formula);
  if (!fn) return null;
  const values = {};

  for (const variable of fn.vars) {
    const sourceId = placeholderSource[variable] || aliases[variable] || variable;
    const prev = earlier?.[sourceId];
    if (!prev || prev.value === null || prev.value === undefined
        || !Number.isFinite(Number(prev.value))) return null;
    values[variable] = Number(prev.value);
  }

  // Every declared dependency must exist even if the formula used an alias.
  for (const id of uses) {
    const prev = earlier?.[id];
    if (!prev || prev.value === null || prev.value === undefined
        || !Number.isFinite(Number(prev.value))) return null;
  }

  try {
    const out = fn.call(values);
    return Number.isFinite(out) ? out : null;
  } catch {
    return null;
  }
}

/** Was the student's earlier answer wrong? Only then is ECF in play. */
function anyEarlierWrong(ecf, earlier) {
  return (ecf.uses || []).some(id => earlier?.[id] && earlier[id].correct === false);
}

function followThroughMethodResult(c, text, earlier) {
  const ids = c.followThroughUses || [];
  if (!ids.length) return null;
  const values = ids
    .map(id => earlier?.[id]?.value)
    .filter(value => value !== null && value !== undefined && Number.isFinite(Number(value)))
    .map(Number);
  if (!values.length) return null;
  const checkerType = c.check?.type === "containsLiteral" ? "containsLiteral" : "contains";
  const result = check(text, { type: checkerType, value: values, needAll: true });
  if (!result.ok) return null;
  return { ...result, why: "uses your earlier answer consistently" };
}

/**
 * Mark one part.
 *
 * @param response  what the student produced: a string, or
 *                  { answer, working, points, arcs, table, ... }
 * @param part      { id, marks, criteria: [...], answer? }
 * @param earlier   { partId: { value, correct } } for parts already marked
 */
export function markPart(response, part, earlier = {}) {
  const criteria = part.criteria || [];
  if (!criteria.length) return markWholePart(response, part);

  const awarded = {};      // code -> boolean
  const lines = [];
  let total = 0;
  let carried = false;
  let finalValue = null;
  let finalCriterionCanonical = true;

  for (const c of criteria) {
    const marks = c.marks ?? 1;
    const code = c.code || `${c.type === "method" ? "M" : "A"}${lines.length + 1}`;
    const kind = code[0].toUpperCase();
    const text = fieldText(response, c.field);

    // an A mark is dependent: no method, no accuracy
    const deps = c.depends || (kind === "A" ? impliedDepends(criteria, c) : []);
    const blocked = deps.filter(d => awarded[d] === false || awarded[d] === undefined
      ? awarded[d] !== true : false);
    if (deps.length && !deps.every(d => awarded[d] === true)) {
      lines.push({ code, marks: 0, of: marks, kind, awarded: false,
        description: c.description,
        why: `not available - it depends on ${deps.join(" and ")}`,
        dependencyBlocked: true, blocked });
      awarded[code] = false;
      continue;
    }

    let result = c.check ? check(text, c.check) : { ok: false, why: "no check defined", got: null };
    const canonicalOk = Boolean(result.ok);

    // A derived method mark can contain the canonical result of an earlier
    // part. If that earlier result was wrong, accept the candidate's own value
    // in the same step instead. This is the method-mark side of follow-through.
    if (!result.ok && c.followThroughUses?.length &&
        c.followThroughUses.some(id => earlier?.[id]?.correct === false)) {
      const followed = followThroughMethodResult(c, text, earlier);
      if (followed) result = followed;
    }

    // error carried forward: re-derive the target from the student's own
    // earlier answers and mark against that instead
    let ecfUsed = false;
    let ecfTarget = null;
    if (!result.ok && c.ecf && anyEarlierWrong(c.ecf, earlier)) {
      const target = carryForward(c.ecf, earlier);
      if (target !== null) {
        const carriedValue = c.ecf.template
          ? String(c.ecf.template).replace(/\{v\}/g, String(target))
          : target;
        const spec = c.check?.type === "sparkAnswer"
          ? { ...c.check, answer: String(carriedValue), accepted: [] }
          : { ...c.check, value: carriedValue };
        if (spec.type !== "sparkAnswer") delete spec.accepted;
        const alt = check(text, spec);
        if (alt.ok) {
          result = { ...alt, why: "correct, following through from your earlier answer" };
          ecfUsed = true;
          ecfTarget = carriedValue;
          carried = true;
          finalCriterionCanonical = false;
        }
      }
    }

    if ((kind === "A" || kind === "B") && (c.field || "answer") === "answer" && !canonicalOk) {
      finalCriterionCanonical = false;
    }
    if (result.ok) total += marks;
    awarded[code] = result.ok;
    if (c.captures !== false && result.got !== null && result.got !== undefined) {
      if (Array.isArray(result.got) && Number.isInteger(Number(c.captureIndex))) {
        const captured = Number(result.got[Number(c.captureIndex)]);
        if (Number.isFinite(captured)) finalValue = captured;
      } else if (Number.isFinite(Number(result.got))) {
        finalValue = Number(result.got);
      }
    }

    lines.push({
      code, kind, marks: result.ok ? marks : 0, of: marks,
      awarded: result.ok, ecf: ecfUsed, ecfTarget,
      description: c.description, why: result.why, got: result.got,
      nearMiss: Boolean(result.nearMiss),
      precisionOnly: Boolean(result.precisionOnly),
      formOnly: Boolean(result.formOnly),
      unitMissing: Boolean(result.unitMissing),
    });
  }

  const cap = part.marks ?? criteria.reduce((s, c) => s + (c.marks ?? 1), 0);
  return {
    id: part.id,
    marks: Math.min(total, cap),
    of: cap,
    criteria: lines,
    ecf: carried,
    value: finalValue ?? readValue(response, part),
    correct: Math.min(total, cap) === cap,
    canonicalCorrect: Math.min(total, cap) === cap && finalCriterionCanonical && !carried,
    feedback: feedbackFor(lines, cap, total),
  };
}

/** A marks depend on the M marks written before them, unless told otherwise. */
function impliedDepends(criteria, c) {
  const before = criteria.slice(0, criteria.indexOf(c));
  const ms = before.filter(x => (x.code || "").toUpperCase().startsWith("M"))
    .map(x => x.code);
  return ms.length ? [ms[ms.length - 1]] : [];
}

function readValue(response, part) {
  const text = fieldText(response, "answer");
  const r = check(text, { type: "numeric", value: 0, tolerance: Infinity });
  return r.got;
}

/** A part with no criteria: all or nothing against `part.answer`. */
function markWholePart(response, part) {
  const text = fieldText(response, "answer");
  const spec = part.check || { type: "numeric", value: part.answer };
  const r = check(text, spec);
  const cap = part.marks ?? 1;
  return {
    id: part.id,
    marks: r.ok ? cap : 0,
    of: cap,
    criteria: [],
    ecf: false,
    value: r.got,
    correct: r.ok,
    canonicalCorrect: r.ok,
    feedback: r.ok ? "Correct." : capitalise(r.why) + ".",
  };
}

function capitalise(s) {
  return String(s || "").charAt(0).toUpperCase() + String(s || "").slice(1);
}

/** Feedback in an examiner's voice: what was earned, then the first thing lost. */
function feedbackFor(lines, cap, total) {
  if (!lines.length) return "";
  if (total >= cap) {
    const c = lines.find(l => l.ecf);
    return c ? "Full marks - your working follows correctly from your earlier answer."
      : "Full marks.";
  }
  const got = lines.filter(l => l.awarded);
  const lost = lines.filter(l => !l.awarded);
  const first = lost[0];
  const parts = [];
  if (got.length) {
    parts.push(`${total} of ${cap}: ${got.map(l => l.code).join(" ")} for ${
      got.map(l => l.description).filter(Boolean).join("; ") || "correct work"}.`);
  } else {
    parts.push(`0 of ${cap}.`);
  }
  if (first) {
    if (first.dependencyBlocked) {
      parts.push(`${first.code} (${first.description}) could not be awarded because the method mark it depends on was not earned.`);
    } else if (first.precisionOnly) {
      parts.push(`Your value is right but ${first.why}.`);
    } else if (first.formOnly) {
      parts.push(capitalise(first.why) + ".");
    } else if (first.nearMiss) {
      parts.push(`${first.code}: ${first.why} - check whether you rounded partway through.`);
    } else if (first.unitMissing) {
      parts.push(capitalise(first.why) + ".");
    } else {
      parts.push(`${first.code} (${first.description}) was not earned: ${first.why}.`);
    }
  }
  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// a whole question
// ---------------------------------------------------------------------------

/**
 * Mark every part of a question in order, threading each part's value forward
 * so a later part can be marked ECF against it.
 *
 * @param responses { partId: response }
 * @param question  { question_id, marks, parts: [...] }
 */
export function markQuestion(responses, question) {
  const earlier = {};
  const parts = [];
  let total = 0;
  for (const part of question.parts || []) {
    const res = markPart(responses?.[part.id], part, earlier);
    earlier[part.id] = {
      value: res.value,
      correct: res.canonicalCorrect !== undefined ? res.canonicalCorrect : res.correct,
    };
    // short ids too, so a scheme can say uses: ["a"] rather than the full id
    const short = String(part.label || "").replace(/[()\s]/g, "").trim();
    if (short) earlier[short] = earlier[part.id];
    parts.push(res);
    total += res.marks;
  }
  const of = question.marks ?? parts.reduce((s, p) => s + p.of, 0);
  return {
    question_id: question.question_id,
    marks: total,
    of,
    parts,
    ecf: parts.some(p => p.ecf),
    summary: `${total} / ${of}`,
  };
}

/** Mark a whole paper. */
export function markPaper(responses, paper) {
  const questions = (paper.questions || []).map(q => markQuestion(responses?.[q.question_id], q));
  const marks = questions.reduce((s, q) => s + q.marks, 0);
  const of = questions.reduce((s, q) => s + q.of, 0);
  return {
    marks, of, questions,
    percentage: of ? Math.round((marks / of) * 1000) / 10 : 0,
    grade: cxcGrade(of ? marks / of : 0),
  };
}

/** The CXC profile bands, as a rough indication only. */
export function cxcGrade(fraction) {
  const pc = fraction * 100;
  if (pc >= 75) return "I";
  if (pc >= 60) return "II";
  if (pc >= 45) return "III";
  if (pc >= 30) return "IV";
  return "V";
}

// ---------------------------------------------------------------------------
// authoring helpers - terse constructors so a bank stays readable
// ---------------------------------------------------------------------------

export const M = (marks, description, check, extra = {}) =>
  ({ code: extra.code || "M", kind: "M", marks, description, check, field: "all", ...extra });
export const A = (marks, description, check, extra = {}) =>
  ({ code: extra.code || "A", kind: "A", marks, description, check, field: "answer", ...extra });
export const B = (marks, description, check, extra = {}) =>
  ({ code: extra.code || "B", kind: "B", marks, description, check, field: "answer",
     depends: [], ...extra });

/** Number the criteria M1 M2 A1 A2 B1 ... the way a mark scheme is printed. */
export function numberCriteria(criteria) {
  const seen = { M: 0, A: 0, B: 0 };
  return criteria.map(c => {
    const kind = (c.kind || c.code || "A")[0].toUpperCase();
    seen[kind] = (seen[kind] || 0) + 1;
    return { ...c, code: `${kind}${seen[kind]}` };
  });
}

/** Fix up implied dependencies once, at authoring time, so the JSON is explicit. */
export function compileScheme(part) {
  const criteria = numberCriteria(part.criteria || []);
  const withDeps = criteria.map(c => ({
    ...c,
    depends: c.depends !== undefined ? c.depends
      : (c.code.startsWith("A") ? impliedDepends(criteria, c) : []),
  }));
  const sum = withDeps.reduce((s, c) => s + (c.marks ?? 1), 0);
  if (part.marks !== undefined && sum !== part.marks) {
    throw new Error(`part ${part.id}: criteria total ${sum} but part is worth ${part.marks}`);
  }
  return { ...part, marks: part.marks ?? sum, criteria: withDeps };
}
