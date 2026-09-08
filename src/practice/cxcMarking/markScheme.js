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

import { compile, equivalent, numbersIn } from "./algebra.js";
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
  return anyWrongAmong(ecf.uses || [], earlier);
}

function anyWrongAmong(ids, earlier) {
  return (ids || []).some(id => earlier?.[id] && earlier[id].correct === false);
}

/**
 * The method-mark half of follow-through.
 *
 * A candidate whose part (b)(i) came out as 4180 instead of 4080 then writes
 * "12.5% of 4180 = 522.50". The mark scheme's method mark is looking for 510,
 * the VAT on the right figure, and will never find it. An examiner does not
 * care: the step is right on the candidate's own number, so the method mark
 * stands.
 *
 * Three kinds of evidence count, and any one of them is enough:
 *   1. the candidate quoted their own earlier value in this step;
 *   2. the step recomputed on their own value appears, when the scheme says
 *      how this step is derived (`followThroughFormula`);
 *   3. the whole part's follow-through target appears, because a candidate who
 *      writes only "4180 + 522.50 = 4702.50" has still shown the method.
 */
function followThroughMethodResult(c, text, earlier) {
  const ids = c.followThroughUses || [];
  if (!ids.length) return null;

  const own = ids
    .map(id => earlier?.[id]?.value)
    .filter(v => v !== null && v !== undefined && Number.isFinite(Number(v)))
    .map(Number);
  if (!own.length) return null;

  const candidates = [...own];
  if (c.followThroughFormula) {
    const derived = carryForward({ uses: ids, variables: c.ecf?.variables,
                                   formula: c.followThroughFormula }, earlier);
    if (derived !== null) candidates.push(derived);
  }
  if (c.ecf) {
    const target = carryForward(c.ecf, earlier);
    if (target !== null) candidates.push(target);
  }

  const result = check(text, { type: "reachesValue", values: candidates, relTolerance: 5e-3 });
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
    const kind = (c.kind || code[0]).toUpperCase();
    const text = fieldText(response, c.field);

    // ---- 1. the canonical judgement -------------------------------------
    let result = c.check ? check(text, c.check) : { ok: false, why: "no check defined", got: null };
    const canonicalOk = Boolean(result.ok);
    let ecfUsed = false;
    let ecfTarget = null;

    // ---- 2. follow-through on a method mark ------------------------------
    // The candidate's own earlier value, used correctly, is correct method.
    if (!result.ok && c.followThroughUses?.length
        && anyWrongAmong(c.followThroughUses, earlier)) {
      const followed = followThroughMethodResult(c, text, earlier);
      if (followed) {
        result = followed;
        ecfUsed = true;
        carried = true;
      }
    }

    // ---- 3. error carried forward on an accuracy mark --------------------
    // Re-derive what the answer should have been from the candidate's own
    // earlier answers, and mark against that instead.
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
        }
      }
    }
    if (ecfUsed) finalCriterionCanonical = false;

    // ---- 4. dependencies, considered last --------------------------------
    //
    // Order matters more here than anywhere else in the file. The dependency
    // used to be tested first, which meant a method mark that failed because
    // the candidate was following through took the accuracy mark down with it
    // and the follow-through code below was never reached. Measured against
    // the bank, that single ordering blocked 61 of the 88 parts that declare
    // follow-through.
    //
    // A dependency is also advisory by default. A right answer stands on its
    // own evidence; only a criterion that explicitly sets `strictDepends` is
    // withheld when its method mark was not earned, and even then never when
    // follow-through rescued it.
    const deps = c.depends || (kind === "A" ? impliedDepends(criteria, c) : []);
    const depsMet = !deps.length || deps.every(d => awarded[d] === true);
    if (!depsMet && c.strictDepends === true && !ecfUsed) {
      const blocked = deps.filter(d => awarded[d] !== true);
      lines.push({ code, marks: 0, of: marks, kind, awarded: false,
        profile: c.profile,
        description: c.description,
        why: `not available - it depends on ${deps.join(" and ")}`,
        dependencyBlocked: true, blocked });
      awarded[code] = false;
      if ((kind === "A" || kind === "B") && (c.field || "answer") === "answer") {
        finalCriterionCanonical = false;
      }
      continue;
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
      profile: c.profile,
      description: c.description, why: result.why, got: result.got,
      nearMiss: Boolean(result.nearMiss),
      precisionOnly: Boolean(result.precisionOnly),
      formOnly: Boolean(result.formOnly),
      unitMissing: Boolean(result.unitMissing),
      overPrecise: Boolean(result.overPrecise),
      dependencySoft: !depsMet,
    });
  }

  // -------------------------------------------------------------------------
  // A correct final answer implies the method.
  //
  // This is the convention that decides more marks than any other on an
  // ordinary numerical part: a candidate who writes only the right answer
  // scores the part. Working is required only where the question demands it,
  // which is what `requireWorking` records. Without this rule, 345 of the 574
  // typed parts in the bank awarded nothing at all for a completely correct
  // answer, which is not how any examiner marks.
  // -------------------------------------------------------------------------
  if (part.requireWorking !== true) {
    const accuracy = lines.filter(l => l.kind === "A" || l.kind === "B");
    const answerIsRight = accuracy.length > 0 && accuracy.every(l => l.awarded);
    if (answerIsRight) {
      for (const line of lines) {
        if (line.kind !== "M" || line.awarded) continue;
        line.awarded = true;
        line.marks = line.of;
        line.impliedByAnswer = true;
        line.dependencyBlocked = false;
        line.why = "implied by a correct final answer";
        total += line.of;
        awarded[line.code] = true;
      }
    }
  }

  const cap = part.marks ?? criteria.reduce((s, c) => s + (c.marks ?? 1), 0);
  return {
    id: part.id,
    marks: Math.min(total, cap),
    of: cap,
    criteria: lines,
    ecf: carried,
    value: finalValue ?? readValue(response, part),
    values: readValues(response),
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

/**
 * The one number a later part follows through from.
 *
 * It is the first value in the answer, not the last. "(1, -4)" is the minimum
 * point of a parabola and the axis of symmetry follows from its x-coordinate;
 * evaluating the whole string as an expression returns -4, because a comma
 * between two numbers is a comma operator, and every rule that read it got the
 * wrong coordinate.
 */
function readValue(response, part) {
  const text = fieldText(response, "answer");
  const values = numbersIn(text);
  if (values.length && Number.isFinite(values[0])) return values[0];
  const r = check(text, { type: "numeric", value: 0, tolerance: Infinity });
  return r.got;
}

/** Every value in the answer, so a rule can follow through from a component. */
function readValues(response) {
  return numbersIn(fieldText(response, "answer")).filter(Number.isFinite);
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
    values: readValues(response),
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
    if (lines.some(l => l.ecf)) {
      return "Full marks - your working follows correctly from your earlier answer.";
    }
    if (lines.some(l => l.impliedByAnswer)) {
      return "Full marks. Your answer is correct, so the method marks are awarded with it. "
        + "In the examination, still show your working: it is what rescues the method marks "
        + "when the arithmetic goes wrong.";
    }
    if (lines.some(l => l.overPrecise)) {
      return "Full marks. Your value is correct, though you gave more figures than the "
        + "question asked for.";
    }
    return "Full marks.";
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
