// ============================================================================
// checkers.js - the primitive judgements a mark scheme is built from.
//
// Every checker takes the student's raw typing and a small serialisable spec,
// and returns { ok, why, got }.  `why` is written for the student, so it can
// be shown straight back to them; `got` is the value the checker managed to
// read, which the mark-scheme engine carries forward for error-carried-forward
// marking.
//
// Nothing here throws.  A response that cannot be parsed is a wrong answer.
// ============================================================================

import {
  asDifference, compile, equivalent, flipRelation, isFactorised, normalise,
  numbersIn, precisionOf, proportionality, relationOf, value,
} from "./algebra.js";
import { checkQuestionAnswer } from "../../lib/answerCheck.js";
import { markWritten } from "./reasoning.js";

const UNIT_WORDS = [
  "cm", "mm", "m", "km", "kg", "g", "ml", "l", "s", "min", "h", "hr", "hrs",
  "degrees", "degree", "deg", "units", "unit", "sq", "square", "cubic",
];

/** Strip currency, units and thousands separators, keeping the number. */
export function stripDressing(raw) {
  let s = normalise(raw)
    .replace(/^[$£€]\s*/, "")
    .replace(/\b(TT|JA|BB|EC|US|BD|G|XCD)\s*\$/gi, "")
    .replace(/(\d)[ ,](?=\d{3}\b)/g, "$1");
  const unit = new RegExp(`\\s*(${UNIT_WORDS.join("|")})\\s*(\\^?[23])?\\s*$`, "i");
  s = s.replace(unit, "").trim();
  return s;
}

/** The unit a student wrote, if any: "45 cm^2" -> "cm^2". */
export function unitOf(raw) {
  const m = normalise(raw).match(
    new RegExp(`(${UNIT_WORDS.join("|")})\\s*(\\^?[23])?\\s*$`, "i"));
  if (!m) return null;
  return (m[1] + (m[2] || "").replace("^", "")).toLowerCase();
}

function near(a, b, tol) {
  return Math.abs(a - b) <= tol;
}

/** Tolerance for a spec: explicit, or half a unit in the last place asked for. */
function toleranceFor(spec) {
  if (typeof spec.tolerance === "number") return spec.tolerance;
  if (typeof spec.dp === "number") return 0.5 * 10 ** -spec.dp + 1e-9;
  if (typeof spec.sf === "number") {
    const mag = Math.abs(Number(spec.value)) || 1;
    const place = Math.floor(Math.log10(mag)) - (spec.sf - 1);
    return 0.5 * 10 ** place + 1e-9;
  }
  return 1e-6;
}

// ---------------------------------------------------------------------------
// numeric
// ---------------------------------------------------------------------------

export function checkNumeric(raw, spec) {
  const bare = stripDressing(raw);
  let got = value(bare);
  if (got === null) {
    // Human-readable compound answers often finish with the required number,
    // for example "x > 11/3, so the smallest integer is 4".
    const seen = numbersIn(raw);
    if (seen.length) got = seen[seen.length - 1];
  }
  if (got === null) return { ok: false, why: "no number could be read", got: null };

  const target = typeof spec.value === "number" ? spec.value : value(String(spec.value));
  if (target === null) return { ok: false, why: "the mark scheme has no value", got };

  const tol = toleranceFor(spec);
  if (!near(got, target, tol)) {
    // was it right but rounded too early, or right to the wrong accuracy?
    if (near(got, target, Math.max(tol * 20, Math.abs(target) * 0.005))) {
      return { ok: false, why: "close, but not to the accuracy asked for",
               got, nearMiss: true };
    }
    return { ok: false, why: "not the required value", got };
  }

  if (spec.requireUnit) {
    const unit = unitOf(raw);
    if (!unit) return { ok: false, why: `the unit (${spec.requireUnit}) is missing`, got, unitMissing: true };
    if (unit !== String(spec.requireUnit).toLowerCase().replace("^", "")) {
      return { ok: false, why: `the unit should be ${spec.requireUnit}`, got, unitWrong: true };
    }
  }

  if (typeof spec.dp === "number" || typeof spec.sf === "number") {
    const p = precisionOf(bare);
    if (typeof spec.dp === "number" && p.dp !== spec.dp && !spec.dpAtLeast) {
      return { ok: false, why: `give the answer to ${spec.dp} decimal place${spec.dp === 1 ? "" : "s"}`,
               got, precisionOnly: true };
    }
    if (typeof spec.sf === "number" && p.sf < spec.sf) {
      return { ok: false, why: `give the answer to ${spec.sf} significant figures`,
               got, precisionOnly: true };
    }
  }
  return { ok: true, why: "correct", got };
}

// ---------------------------------------------------------------------------
// expression
// ---------------------------------------------------------------------------

export function checkExpression(raw, spec) {
  const s = String(raw ?? "").trim();
  if (!s) return { ok: false, why: "nothing written", got: null };
  const target = String(spec.value);
  if (!compile(s)) return { ok: false, why: "the expression could not be read", got: null };
  if (!equivalent(s, target)) {
    for (const alt of spec.accepted || []) {
      if (equivalent(s, alt)) return { ok: true, why: "correct", got: s };
    }
    return { ok: false, why: "not equivalent to the required expression", got: s };
  }
  if (spec.requireFactorised && !isFactorised(s)) {
    return { ok: false, why: "correct, but not written as a product of factors",
             got: s, formOnly: true };
  }
  if (spec.requireExpanded && isFactorised(s)) {
    return { ok: false, why: "correct, but the brackets have not been expanded",
             got: s, formOnly: true };
  }
  return { ok: true, why: "correct", got: s };
}

// ---------------------------------------------------------------------------
// fraction in lowest terms
// ---------------------------------------------------------------------------

function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); }

export function checkFraction(raw, spec) {
  const s = stripDressing(raw);
  const got = value(s);
  const target = typeof spec.value === "number" ? spec.value : value(String(spec.value));
  if (got === null) return { ok: false, why: "no fraction could be read", got: null };
  if (!near(got, target, 1e-9)) return { ok: false, why: "not the required value", got };
  const m = s.match(/^\s*(-?\d+)\s*\/\s*(\d+)\s*$/);
  if (!m) {
    if (spec.requireFraction) {
      return { ok: false, why: "write the answer as a fraction", got, formOnly: true };
    }
    return { ok: true, why: "correct", got };
  }
  if (spec.simplified !== false && gcd(Number(m[1]), Number(m[2])) !== 1) {
    return { ok: false, why: "correct, but not in its lowest terms", got, formOnly: true };
  }
  return { ok: true, why: "correct", got };
}

// ---------------------------------------------------------------------------
// coordinates, sets, ordered lists, matrices
// ---------------------------------------------------------------------------

/**
 * Every value in a response, in order.  It has to read prose as well as
 * notation, because "width 4.5 cm, length 17.5 cm" is how a student writes a
 * pair of answers and it is a perfectly good answer.
 */
function numberList(raw) {
  return numbersIn(String(raw ?? "").replace(/[[\]()]/g, " "));
}

export function checkCoordinate(raw, spec) {
  const got = numberList(raw);
  const want = spec.value.map(Number);
  const tol = toleranceFor(spec);
  if (got.length !== want.length) {
    return { ok: false, why: `expected ${want.length} coordinates`, got };
  }
  const ok = want.every((w, i) => near(got[i], w, tol));
  if (!ok && want.length === 2 && near(got[0], want[1], tol) && near(got[1], want[0], tol)) {
    return { ok: false, why: "the coordinates are the right pair but the wrong way round",
             got, swapped: true };
  }
  return { ok, why: ok ? "correct" : "not the required point", got };
}

export function checkSet(raw, spec) {
  const got = numberList(raw);
  const want = spec.value.map(Number);
  const tol = toleranceFor(spec);
  const used = new Set();
  const matched = want.every(w => {
    const i = got.findIndex((g, j) => !used.has(j) && near(g, w, tol));
    if (i < 0) return false;
    used.add(i);
    return true;
  });
  const ok = matched && got.length === want.length;
  return { ok, why: ok ? "correct"
    : matched ? "correct values, but extra ones as well" : "not the required values", got };
}

export function checkOrdered(raw, spec) {
  const got = numberList(raw);
  const want = spec.value.map(Number);
  const tol = toleranceFor(spec);
  const ok = got.length === want.length && want.every((w, i) => near(got[i], w, tol));
  if (!ok) {
    const sorted = [...got].sort((a, b) => a - b);
    const sw = [...want].sort((a, b) => a - b);
    if (sorted.length === sw.length && sw.every((w, i) => near(sorted[i], w, tol))) {
      return { ok: false, why: "the right values, but not in the required order", got, misordered: true };
    }
  }
  return { ok, why: ok ? "correct" : "not the required values", got };
}

export function checkMatrix(raw, spec) {
  const got = numberList(raw);
  const want = spec.value.flat().map(Number);
  const tol = toleranceFor(spec);
  const scale = spec.scalar ? value(String(spec.scalar)) : 1;
  const ok = got.length === want.length
    && want.every((w, i) => near(got[i] * (got.length === want.length ? 1 : scale), w, tol));
  return { ok, why: ok ? "correct" : "not the required matrix", got };
}

// ---------------------------------------------------------------------------
// equations and inequalities
// ---------------------------------------------------------------------------

/**
 * Split a compound response into mathematical clauses. Candidates routinely
 * write answers such as "x = 7/2, y = 3" or "x > 11/3, so the smallest
 * integer is 4". Each mark-scheme checker should be able to find its own
 * statement rather than rejecting the complete line.
 */
export function clausesOf(raw) {
  return String(raw ?? "")
    .split(/[;\n]|\band\b|\bso\b|,/)
    .map(t => t.trim())
    .filter(Boolean);
}

/**
 * Two equations are the same when one side minus the other differs only by a
 * constant factor, so "2x + 4 = 10", "x + 2 = 5" and "10 = 2x + 4" all mark
 * correct - which is right, because they are the same equation.
 */
export function checkEquation(raw, spec) {
  let mine = asDifference(raw);
  if (!mine) {
    for (const clause of clausesOf(raw)) {
      if (asDifference(clause) && relationOf(clause) === "=") {
        const hit = checkEquation(clause, spec);
        if (hit.ok) return hit;
      }
    }
  }
  const theirs = asDifference(String(spec.value));
  if (!mine) return { ok: false, why: "write your answer as an equation", got: null };
  if (!theirs) return { ok: false, why: "the mark scheme has no equation", got: mine };
  const k = proportionality(theirs, mine);
  if (k !== null) return { ok: true, why: "correct", got: raw };
  // an identity - "n(n + 2) + (n + 1) = n^2 + 3n + 1" - has a difference of
  // zero on both sides, so there is no ratio between them to find
  if (isIdenticallyZero(theirs) && isIdenticallyZero(mine)) {
    return { ok: true, why: "correct", got: raw };
  }
  return { ok: false, got: raw, why: "not equivalent to the required equation" };
}

/** Is this expression zero everywhere, rather than zero by coincidence? */
function isIdenticallyZero(expr) {
  const f = compile(expr);
  if (!f) return false;
  const points = f.vars.length
    ? [0.7321, 2.4142, -1.618, 3.1416].map(base =>
        Object.fromEntries(f.vars.map((v, i) => [v, base + i * 0.577])))
    : [{}];
  let seen = 0;
  for (const p of points) {
    let v;
    try { v = f.call(p); } catch { return false; }
    if (!Number.isFinite(v)) return false;
    if (Math.abs(v) > 1e-7) return false;
    seen += 1;
  }
  return seen > 0;
}

/**
 * An inequality has to match in two ways: the same boundary, and the same
 * direction.  Multiplying through by a negative number flips it, and forgetting
 * to flip is the mistake CSEC candidates make most, so it is checked rather
 * than glossed over: a negative factor is accepted only when the sign has
 * actually been reversed.
 */
export function checkInequality(raw, spec) {
  const theirs = asDifference(String(spec.value));
  const rTheirs = relationOf(String(spec.value));
  if (!theirs || !rTheirs) return { ok: false, why: "the mark scheme has no inequality", got: raw };

  const testOne = candidate => {
    const mine = asDifference(candidate);
    const rMine = relationOf(candidate);
    if (!mine || !rMine || !/[<>]/.test(rMine)) return null;
    const k = proportionality(theirs, mine);
    if (k === null) return { ok: false, why: "not equivalent to the required inequality", got: candidate };
    const want = k > 0 ? rTheirs : flipRelation(rTheirs);
    if (rMine !== want) {
      return {
        ok: false, got: candidate, flipped: true,
        why: k < 0
          ? "the inequality sign must be reversed when you multiply or divide by a negative number"
          : "the inequality sign points the wrong way",
      };
    }
    return { ok: true, why: "correct", got: candidate };
  };

  const whole = testOne(raw);
  if (whole?.ok) return whole;
  for (const clause of clausesOf(raw)) {
    const hit = testOne(clause);
    if (hit?.ok) return hit;
  }
  return whole || { ok: false, why: "write your answer as an inequality", got: null };
}

// ---------------------------------------------------------------------------
// combinators - one part, several acceptable shapes
// ---------------------------------------------------------------------------

/** Passes if any one of the sub-checks passes. */
export function checkAnyOf(raw, spec) {
  let last = { ok: false, why: "no check matched", got: null };
  for (const option of spec.options || []) {
    const r = check(raw, option);
    if (r.ok) return r;
    if (r.got !== null && r.got !== undefined) last = r;
  }
  return last;
}

/**
 * Strip a leading label from a clause: "shaded n^2" -> "n^2".
 *
 * Students label their answers, and so does a well-written mark scheme, but
 * the label is not the mathematics.  A run of leading words is dropped only
 * when what remains actually looks like an answer, so "not in the domain"
 * survives intact.
 */
export function stripLabel(text) {
  const m = String(text ?? "").match(/^\s*((?:[A-Za-z][A-Za-z-]{2,}\s+)+)(.*)$/);
  if (!m) return String(text ?? "").trim();
  const rest = m[2].trim();
  return (/[\d+\-*/^=<>(]/.test(rest) || rest.length <= 3)
    ? rest : String(text ?? "").trim();
}

/** Passes only if every sub-check passes - "write TWO equations". */
export function checkAllOf(raw, spec) {
  const clauses = String(raw ?? "").split(/[;\n]|\band\b/)
    .map(t => t.trim()).filter(Boolean)
    .flatMap(c => (stripLabel(c) === c ? [c] : [c, stripLabel(c)]));
  const results = (spec.options || []).map(option => {
    const hit = clauses.map(c => check(c, option)).find(r => r.ok);
    return hit || check(raw, option);
  });
  const ok = results.every(r => r.ok);
  return {
    ok, got: raw,
    why: ok ? "correct"
      : `${results.filter(r => r.ok).length} of ${results.length} parts of the answer are correct`,
    results,
  };
}

// ---------------------------------------------------------------------------
// evidence checkers - these are what make method marks possible
// ---------------------------------------------------------------------------

/**
 * Did the student's working contain this intermediate value?
 * This is how an M mark is awarded: CXC gives the method mark for a correct
 * substitution even when the final arithmetic goes wrong, and the evidence for
 * that substitution is the number sitting in the working.
 */
export function checkContains(raw, spec) {
  const tol = toleranceFor(spec);
  const wanted = (Array.isArray(spec.value) ? spec.value : [spec.value]).map(Number);
  const seen = numbersIn(raw);
  const found = wanted.filter(w => seen.some(g => near(g, w, Math.max(tol, Math.abs(w) * 1e-4))));
  const need = spec.needAll === false ? 1 : wanted.length;
  const ok = found.length >= need;
  return { ok, why: ok ? "the working shows the right substitution"
    : "the working does not show that step", got: seen, found };
}

/**
 * Like checkContains, but treats the numbers exactly as they were written.
 * This matters for method evidence such as 28/12, where the examiner may want
 * to see the literal intermediate 28 rather than the evaluated value 7/3.
 */
export function checkContainsLiteral(raw, spec) {
  const tol = toleranceFor(spec);
  const source = String(raw ?? "").replace(/(\d),(?=\d{3}\b)/g, "$1");
  const seen = (source.match(/-?\d+(?:\.\d+)?/g) || []).map(Number).filter(Number.isFinite);
  const wanted = (Array.isArray(spec.value) ? spec.value : [spec.value]).map(Number);
  const found = wanted.filter(w => seen.some(g => near(g, w, Math.max(tol, Math.abs(w) * 1e-4))));
  const need = spec.needAll === false ? 1 : wanted.length;
  const ok = found.length >= need;
  return { ok, why: ok ? "the working shows the right substitution"
    : "the working does not show that step", got: seen, found };
}

/**
 * Did the student use the named method - the words, or the shape of a formula?
 *
 * Both the raw text and the normalised text are searched, and each pattern is
 * tried in both forms too.  That matters more than it looks: normalising
 * rewrites "sin 60" as "sin(60)" and drops the degree sign, so a pattern that
 * matches what the student typed will not match what the parser sees, and the
 * other way round.  Trying all four combinations costs nothing and stops a
 * method mark being lost to punctuation.
 */
export function checkMethod(raw, spec) {
  const tidy = t => String(t).toLowerCase().replace(/\s+/g, " ").trim();
  const haystacks = [tidy(raw), tidy(normalise(raw))];
  const patterns = spec.any || [];
  const hit = patterns.find(p => {
    if (p instanceof RegExp) return haystacks.some(h => p.test(h));
    const forms = [tidy(p), tidy(normalise(p))];
    return haystacks.some(h => forms.some(f => f && h.includes(f)));
  });
  return { ok: Boolean(hit), why: hit ? "the correct method is shown"
    : "the method is not shown", got: hit || null };
}



/** A conservative method mark for an explicit numerical substitution. */
export function checkCalculation(raw, spec = {}) {
  const source = String(raw ?? "");
  const cleanThousands = source.replace(/(\d),(?=\d{3}\b)/g, "$1");
  const seen = (cleanThousands.match(/-?\d+(?:\.\d+)?/g) || []).map(Number).filter(Number.isFinite);
  const wanted = (spec.values || []).map(Number).filter(Number.isFinite);
  const tol = Number.isFinite(Number(spec.tolerance)) ? Math.abs(Number(spec.tolerance)) : 1e-3;
  const numbersOk = wanted.length >= 2 && wanted.every(w => seen.some(g => near(g, w, Math.max(tol, Math.abs(w) * 1e-4))));
  const operatorOk = /[×÷+\-*/^=]|\b(?:sqrt|sin|cos|tan)\b|√/i.test(source);
  return {
    ok: numbersOk && operatorOk,
    why: numbersOk && operatorOk ? "the working shows the correct substitution" : "the required substitution is not shown",
    got: seen,
  };
}

// ---------------------------------------------------------------------------
// SPARK final-answer compatibility
// ---------------------------------------------------------------------------

/**
 * Use SPARK's existing answer checker for the final A/B judgement. This keeps
 * all of the equivalence rules already used elsewhere in the platform: numeric
 * fractions and decimals, algebraic equivalence, equations, inequalities,
 * matrices, coordinates, required forms, tolerances and accepted alternatives.
 *
 * The lightweight parser in this module is still used to capture a numeric
 * value from a wrong response so that a later part can receive ECF credit.
 */
export function checkSparkAnswer(raw, spec = {}) {
  const question = {
    answer: spec.answer ?? spec.value ?? "",
    accepted: spec.accepted || [],
    answerType: spec.answerType,
    tolerance: spec.tolerance,
    decimalPlaces: spec.decimalPlaces,
    significantFigures: spec.significantFigures,
    requiredForm: spec.requiredForm,
  };
  const status = checkQuestionAnswer(raw, question);
  const stripped = stripDressing(raw);
  let got = value(stripped);
  if (got === null) {
    const values = numbersIn(raw);
    if (values.length === 1 && Number.isFinite(values[0])) got = values[0];
  }
  return {
    ok: status === "correct",
    why: status === "correct" ? "correct"
      : status === "uncertain" ? "the response could not be verified as equivalent"
      : "not the required answer",
    got,
  };
}

// ---------------------------------------------------------------------------
// written reasoning
// ---------------------------------------------------------------------------

/**
 * Deterministic checklist marking for short CXC reasoning responses. Each
 * criterion describes the concepts that must or must not appear. Synonyms and
 * small spelling slips are handled by reasoning.js.
 */
export function checkWritten(raw, spec = {}) {
  const result = markWritten(raw, [{
    id: spec.id || "written",
    code: spec.code || "B1",
    marks: 1,
    description: spec.description || "required mathematical statement",
    any: spec.any,
    all: spec.all,
    none: spec.none,
    numbers: spec.numbers,
    pair: spec.pair,
  }]);
  const line = result.criteria?.[0];
  return {
    ok: Boolean(line?.awarded),
    why: line?.why || result.feedback || "the required statement is not shown",
    got: String(raw ?? ""),
  };
}



// ---------------------------------------------------------------------------
// symbolic-working and theorem-reason evidence (V5.3.2)
// ---------------------------------------------------------------------------

function algebraCandidates(raw) {
  const out = [];
  const add = candidate => {
    let text = String(candidate ?? "").trim();
    if (!text) return;
    text = text
      .replace(/^\s*(?:also|then|therefore|hence|so|adding gives|giving|thus)\s*[:,-]?\s*/i, "")
      .trim();
    const stripped = stripLabel(text);
    for (const value of [text, stripped]) {
      const v = String(value || "").trim();
      if (v && !out.includes(v)) out.push(v);
    }
  };
  for (const line of String(raw ?? "").split(/[;\n]+/)) {
    add(line);
    // Worked solutions often finish a sentence with wording such as
    // "Adding gives ..." rather than another equals sign. Treat that
    // mathematical tail as its own candidate without requiring students to
    // mimic the mark-scheme prose.
    for (const match of line.matchAll(/(?:adding gives|therefore|hence|thus)\s+([^.;]+(?:\.[0-9]+)?)/gi)) {
      add(match[1]);
    }
    if (line.includes("=") && !/[<>]=?/.test(line)) {
      line.split("=").forEach(add);
    }
  }
  return out;
}

/** Award method credit for a genuine algebraic equality in the student's working. */
export function checkAlgebraTransition(raw, spec = {}) {
  let transitions = 0;
  for (const line of String(raw ?? "").split(/[;\n]+/)) {
    if (!line.includes("=") || /[<>]=?/.test(line)) continue;
    const pieces = line.split("=").map(t => stripLabel(t.trim())).filter(Boolean);
    for (let i = 0; i + 1 < pieces.length; i += 1) {
      if (compile(pieces[i]) && compile(pieces[i + 1]) && equivalent(pieces[i], pieces[i + 1])) {
        transitions += 1;
      }
    }
  }
  const need = Math.max(1, Number(spec.minTransitions || 1));
  return {
    ok: transitions >= need,
    why: transitions >= need ? "the working shows a valid algebraic transformation" : "the working does not show a valid algebraic transformation",
    got: transitions,
  };
}

/** Find an expression in the working that is algebraically equivalent to a target. */
export function checkContainsEquivalentExpression(raw, spec = {}) {
  const target = String(spec.value ?? "").trim();
  if (!target || !compile(target)) return { ok: false, why: "the mark scheme has no usable algebraic target", got: null };
  const candidates = algebraCandidates(raw);
  const hit = candidates.find(candidate => compile(candidate) && equivalent(candidate, target));
  return {
    ok: Boolean(hit),
    why: hit ? "the working reaches an equivalent simplified expression" : "the working does not reach the required equivalent expression",
    got: hit || null,
  };
}

/** Find any equivalent inequality in the student's working, not merely the final box. */
export function checkContainsInequality(raw, spec = {}) {
  const target = String(spec.value ?? "").trim();
  const candidates = [...String(raw ?? "").split(/[;\n]+/), ...clausesOf(raw)]
    .map(t => t.trim()).filter(Boolean);
  for (const candidate of candidates) {
    const result = checkInequality(candidate, { ...spec, value: target });
    if (result.ok) return { ...result, why: "the working rearranges the inequality correctly" };
  }
  return { ok: false, why: "the working does not show an equivalent inequality step", got: null };
}

/** A value may be embedded in a sentence such as "47°, by the alternate segment theorem". */
export function checkContainsValue(raw, spec = {}) {
  const target = Number(spec.value);
  if (!Number.isFinite(target)) return { ok: false, why: "the mark scheme has no numerical value", got: null };
  const tol = toleranceFor(spec);
  const values = numbersIn(raw);
  const hit = values.find(value => near(value, target, tol));
  return {
    ok: hit !== undefined,
    why: hit !== undefined ? "the required value is stated" : "the required value is not stated",
    got: hit !== undefined ? hit : (values.length ? values : null),
  };
}

function reasonText(raw) {
  return normalise(raw).toLowerCase().replace(/\s+/g, " ").trim();
}

/** Deterministic theorem/concept matching for short value-plus-reason responses. */
export function checkReasonConcept(raw, spec = {}) {
  const s = reasonText(raw);
  const concept = String(spec.concept || "");
  let ok = false;
  if (concept === "alternate_segment") {
    ok = /alternate segment/.test(s) ||
      (/tangent/.test(s) && /chord/.test(s) && /(equal|same)/.test(s) && /(segment|angle)/.test(s));
  } else if (concept === "cyclic_opposite_supplementary") {
    ok = /cyclic/.test(s) && /opposite/.test(s) && /(180|supplement|sum|add)/.test(s);
  } else if (concept === "angle_centre_twice_circumference") {
    ok = /(centre|center|central)/.test(s) && /(circumference|inscribed)/.test(s) && /(twice|double|2 times)/.test(s);
  } else if (concept === "vertically_opposite_equal") {
    ok = /vertically opposite/.test(s) && /(equal|same)/.test(s);
  } else if (concept === "cointerior_supplementary") {
    ok = /(co[- ]?interior|allied|same side interior)/.test(s) && /(180|supplement|sum|add)/.test(s);
  } else if (concept === "radii_form_isosceles") {
    ok = /(radii|radius)/.test(s) && /(equal|same)/.test(s) && /(isosceles|base angles)/.test(s);
  }
  return {
    ok,
    why: ok ? "a valid mathematical reason is given" : "the required mathematical reason is not stated",
    got: String(raw ?? ""),
  };
}

// ---------------------------------------------------------------------------
// dispatch
// ---------------------------------------------------------------------------

export const CHECKERS = {
  numeric: checkNumeric,
  equation: checkEquation,
  inequality: checkInequality,
  anyOf: checkAnyOf,
  allOf: checkAllOf,
  expression: checkExpression,
  fraction: checkFraction,
  coordinate: checkCoordinate,
  set: checkSet,
  ordered: checkOrdered,
  matrix: checkMatrix,
  contains: checkContains,
  containsLiteral: checkContainsLiteral,
  method: checkMethod,
  calculation: checkCalculation,
  algebraTransition: checkAlgebraTransition,
  containsEquivalentExpression: checkContainsEquivalentExpression,
  containsInequality: checkContainsInequality,
  containsValue: checkContainsValue,
  reasonConcept: checkReasonConcept,
  sparkAnswer: checkSparkAnswer,
  written: checkWritten,
};

/** Run whichever checker the spec names. Unknown types fail closed. */
export function check(raw, spec) {
  const fn = CHECKERS[spec?.type];
  if (!fn) return { ok: false, why: `unknown check type ${spec?.type}`, got: null };
  try {
    return fn(raw, spec);
  } catch (err) {
    return { ok: false, why: "the response could not be read", got: null, error: String(err) };
  }
}
