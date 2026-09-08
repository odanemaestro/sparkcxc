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
  asDifference, compile, equivalent, flipRelation, isFactorised, isFullyFactorised,
  normalise, numbersIn, precisionOf, proportionality, relationOf, value,
} from "./algebra.js";
import { checkQuestionAnswer } from "../../lib/answerCheck.js";
import { markWritten } from "./reasoning.js";
import { checkProse, checkLabelledValue, checkContainsPoint } from "./prose.js";

const UNIT_WORDS = [
  "cm", "mm", "m", "km", "kg", "g", "ml", "l", "s", "min", "h", "hr", "hrs",
  "degrees", "degree", "deg", "units", "unit", "sq", "square", "cubic",
];

// ---------------------------------------------------------------------------
// answer furniture
//
// A student writes "Ans 4080.00" or "so x < 7" or "$4,080." and means exactly
// what the mark scheme means. None of that decoration is mathematics, and an
// examiner does not see it at all. Stripping it before any comparison is the
// single cheapest correctness fix in the marker: measured against the whole
// bank, a trailing full stop alone was costing 434 marks and a leading "Ans"
// was costing 690.
// ---------------------------------------------------------------------------

/**
 * "Answer:", "Ans", "Final answer", "Soln". These words are never the opening
 * of a real mathematical answer, so they come off unconditionally.
 */
const STRONG_ANSWER_LABEL =
  /^\s*(?:the\s+)?(?:final\s+|required\s+)?(?:ans|answer|soln|solution)\b\s*(?:is\b|are\b|[=:])?\s*/i;

/**
 * "Result", "Value". These can genuinely start an answer ("value for money"),
 * so they come off only when followed by a separator or by something that
 * already looks like an answer.
 */
const WEAK_ANSWER_LABEL =
  /^\s*(?:the\s+)?(?:result|value)\b\s*(?:is\b|are\b|[=:])?\s*/i;

/** Connectives a student leads with. "because" and "since" are deliberately
 *  absent: they are load-bearing inside a written reason. */
const LEADING_CONNECTIVE =
  /^\s*(?:so|therefore|hence|thus|then|which\s+gives|giving|=>|->|=)\s*[:,]?\s+/i;

/** Sentence punctuation at the very end. A full stop with no digit after it is
 *  never a decimal point, so this cannot damage 4080.00. */
const TRAILING_PUNCTUATION = /[\s.;,!]+$/u;

/** Quotation marks wrapped around the whole answer. */
const WRAPPING_QUOTES = /^\s*["'“‘]\s*(.+?)\s*["'”’]\s*$/u;

/**
 * Remove the presentation a student puts around an answer, keeping the
 * mathematics. `keepLeading` is set for written-reason marking, where a
 * leading "therefore" is part of the sentence being judged.
 */
export function stripAnswerFurniture(raw, { keepLeading = false } = {}) {
  let s = String(raw ?? "").replace(/[−–—]/g, "-").trim();
  if (!s) return "";
  for (let pass = 0; pass < 3; pass += 1) {
    const before = s;
    const trimmed = s.replace(TRAILING_PUNCTUATION, "").trim();
    if (trimmed) s = trimmed;
    if (!keepLeading) {
      const strong = s.match(STRONG_ANSWER_LABEL);
      if (strong && strong[0].trim()) {
        const rest = s.slice(strong[0].length).trim();
        if (rest) s = rest;
      }
      const weak = s.match(WEAK_ANSWER_LABEL);
      if (weak && weak[0].trim()) {
        const rest = s.slice(weak[0].length).trim();
        const explicit = /[=:]\s*$/.test(weak[0]) || /\b(is|are)\s*$/i.test(weak[0]);
        // Only drop an ambiguous label when what is left still reads like an
        // answer, so "value for money" is not shortened to "for money".
        if (rest && (explicit || /^[\d(+\-.]/.test(rest) || /^[A-Za-z]\s*[=<>]/.test(rest))) {
          s = rest;
        }
      }
      const connective = s.match(LEADING_CONNECTIVE);
      if (connective) {
        const rest = s.slice(connective[0].length).trim();
        if (rest) s = rest;
      }
    }
    if (s === before) break;
  }
  const quoted = s.match(WRAPPING_QUOTES);
  if (quoted && quoted[1]) s = quoted[1];
  return s;
}

/** Strip currency, units and thousands separators, keeping the number. */
export function stripDressing(raw) {
  let s = normalise(stripAnswerFurniture(raw))
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

/** Comparison for two pieces of typed mathematics that should be identical. */
function sameText(a, b) {
  const tidy = t => normalise(stripAnswerFurniture(t)).toLowerCase().replace(/\s+/g, "");
  return Boolean(tidy(a)) && tidy(a) === tidy(b);
}

/**
 * Did the author of the question already say this form is acceptable?
 *
 * `accepted` is the mark scheme's own list of equally correct answers. It has
 * to be honoured by every checker, not only by the general one, or an authored
 * alternative is silently ignored by a typed check such as `fraction`.
 */
export function sameAsAccepted(raw, spec = {}) {
  const list = Array.isArray(spec.accepted) ? spec.accepted : [];
  return list.some(alt => (alt || alt === 0) && sameText(raw, String(alt)));
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

  // Accuracy asked for is a floor, not an exact width.
  //
  // A candidate who writes 23.25 where one decimal place was requested has
  // answered the question; a candidate who writes 23 has not. CXC penalises
  // over-precision at most once across a whole paper, never part by part, so
  // extra figures are correct here and merely noted. Set `dpExact` on the rare
  // part where the rounding itself is the thing being marked.
  if (typeof spec.dp === "number" || typeof spec.sf === "number") {
    const p = precisionOf(bare);
    if (typeof spec.dp === "number" && p.dp < spec.dp) {
      return { ok: false, why: `give the answer to ${spec.dp} decimal place${spec.dp === 1 ? "" : "s"}`,
               got, precisionOnly: true };
    }
    if (typeof spec.dp === "number" && p.dp > spec.dp && spec.dpExact === true) {
      return { ok: false, why: `give the answer to exactly ${spec.dp} decimal place${spec.dp === 1 ? "" : "s"}`,
               got, precisionOnly: true };
    }
    if (typeof spec.sf === "number" && p.sf < spec.sf) {
      return { ok: false, why: `give the answer to ${spec.sf} significant figures`,
               got, precisionOnly: true };
    }
    if ((typeof spec.dp === "number" && p.dp > spec.dp)
        || (typeof spec.sf === "number" && p.sf > spec.sf)) {
      return { ok: true, why: "correct, though more figures than the question asked for",
               got, overPrecise: true };
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
  // "Factorise COMPLETELY" is a different demand from "factorise". A bracket
  // that still holds a common factor, or a grouping that was never closed into
  // a single product, is worth the method mark and not the accuracy mark.
  if (spec.requireFullyFactorised && !isFullyFactorised(s)) {
    return { ok: false, got: s, formOnly: true,
             why: isFactorised(s)
               ? "correct, but not factorised completely: one of the brackets can still be factorised"
               : "correct, but not yet written as a single product of factors" };
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
  // An authored alternative form settles the question before any form rule.
  // "86/13" and "6 8/13" are the same answer and the bank says so.
  if (sameAsAccepted(s, spec)) return { ok: true, why: "correct", got };
  const target = typeof spec.value === "number" ? spec.value : value(String(spec.value));
  if (got === null) return { ok: false, why: "no fraction could be read", got: null };
  if (!near(got, target, 1e-9)) return { ok: false, why: "not the required value", got };
  const form = readFractionForm(s);
  if (!form) {
    if (spec.requireFraction) {
      return { ok: false, why: "write the answer as a fraction", got, formOnly: true };
    }
    return { ok: true, why: "correct", got };
  }
  if (spec.simplified !== false && !isLowestTerms(form)) {
    return { ok: false, why: "correct, but not in its lowest terms", got, formOnly: true };
  }
  return { ok: true, why: "correct", got };
}

/**
 * The shape of a fraction, whichever of the two shapes it was written in.
 *
 * "86/13" and "6 8/13" are the same number written two ways, and a CSEC
 * examiner takes either unless the question names one of them. Reading only
 * "a/b" made the improper form the single accepted answer, so a candidate who
 * finished the arithmetic and then wrote the mixed number lost the accuracy
 * mark for the last, cosmetic step.
 */
function readFractionForm(raw) {
  const s = String(raw ?? "").trim();
  // "6 8/13" as the candidate typed it, and "(6+8/13)" as the parser rewrites
  // it on the way in. Both are the same mixed number and both have to be read
  // here, because this function runs after that rewrite.
  const mixed = s.match(/^\s*(-?)\(?\s*(\d+)\s*[+\s]\s*(\d+)\s*\/\s*(\d+)\s*\)?\s*$/);
  if (mixed) {
    const sign = mixed[1] === "-" ? -1 : 1;
    return { whole: sign * Number(mixed[2]), num: Number(mixed[3]), den: Number(mixed[4]) };
  }
  const simple = s.match(/^\s*(-?\d+)\s*\/\s*(\d+)\s*$/);
  if (simple) return { whole: 0, num: Number(simple[1]), den: Number(simple[2]) };
  return null;
}

/**
 * Is the fraction in its lowest terms?
 *
 * The numerator and denominator must share no factor, and a mixed number must
 * also have carried every whole one out of its fractional part: "5 21/13" is
 * the right value written in a form no examiner accepts as complete.
 */
function isLowestTerms({ whole, num, den }) {
  if (!den) return false;
  if (gcd(num, den) !== 1) return false;
  if (whole !== 0 && Math.abs(num) >= den) return false;
  return true;
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
  return numbersIn(expandPlusMinus(raw).replace(/[[\]()]/g, " "));
}

/**
 * "±4" and "+/-4" are one token that names two values, and it is the notation
 * CSEC uses for the roots of x^2 = 16. Written out, the pair marks correctly
 * against any checker that reads a list.
 */
export function expandPlusMinus(raw) {
  return String(raw ?? "")
    .replace(/(?:±|\+\s*\/\s*-|\+-)\s*(\d+(?:\.\d+)?(?:\s*\/\s*\d+)?)/g, "$1, -$1");
}

/**
 * The numbers in a response, but only when the response is a plain list of
 * values: "4 and -4", "{4, -4}", "x = 4, x = -4", "±4". Returns null the moment
 * anything algebraic appears, so this can never be used to compare expressions.
 */
export function plainNumberList(raw) {
  const s = expandPlusMinus(raw)
    .replace(/[{}[\]()]/g, " ")
    .replace(/\b(?:and|or|x|y|n|is|are|the|values?|roots?|solutions?)\b/gi, " ")
    .replace(/[=;,]/g, " ")
    .trim();
  if (/[A-Za-z]/.test(s)) return null;
  const nums = numbersIn(s);
  return nums.length ? nums : null;
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



/**
 * A method mark for working that arrives at any one of several acceptable
 * intermediate results, however the candidate got there.
 *
 * This is the checker that replaces "the literal number 720 must appear".
 * A discount can be found as 720 and subtracted, or applied as a 0.85
 * multiplier in one step; both are correct method and an examiner rewards
 * both, so both are listed and any one of them earns the mark. The tolerance
 * is relative, so a candidate who carried an extra figure still matches.
 */
export function checkReachesValue(raw, spec = {}) {
  const wanted = (Array.isArray(spec.values) ? spec.values : [spec.values])
    .map(Number).filter(Number.isFinite);
  if (!wanted.length) return { ok: false, why: "the mark scheme has no target value", got: null };
  const rel = Number.isFinite(Number(spec.relTolerance)) ? Math.abs(Number(spec.relTolerance)) : 5e-3;
  const abs = Number.isFinite(Number(spec.tolerance)) ? Math.abs(Number(spec.tolerance)) : 1e-6;
  const seen = [...new Set([...numbersIn(raw), ...literalNumbersIn(raw)])];
  const hit = wanted.find(w => seen.some(g => near(g, w, Math.max(abs, Math.abs(w) * rel))));
  return {
    ok: hit !== undefined,
    why: hit !== undefined
      ? "the working reaches a correct intermediate result"
      : "the working does not reach any of the results this method produces",
    got: seen,
    reached: hit,
  };
}

/** Numbers exactly as written, without evaluating fractions. */
function literalNumbersIn(raw) {
  const source = String(raw ?? "").replace(/(\d),(?=\d{3}\b)/g, "$1");
  return (source.match(/-?\d+(?:\.\d+)?/g) || []).map(Number).filter(Number.isFinite);
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
  const cleaned = stripAnswerFurniture(raw);
  // "Factorise COMPLETELY" is a stricter demand than the general checker knows
  // about: 4(m^2 - 25n^2) is a correct factorisation and an incomplete one.
  if (spec.requireFullyFactorised === true && !isFullyFactorised(cleaned)) {
    return {
      ok: false, formOnly: true, got: cleaned,
      why: isFactorised(cleaned)
        ? "correct, but not factorised completely: one of the brackets can still be factorised"
        : "correct, but not yet written as a single product of factors",
    };
  }
  const status = checkQuestionAnswer(cleaned, question);
  const stripped = stripDressing(raw);
  let got = value(stripped);
  if (got === null) {
    const values = numbersIn(raw);
    if (values.length === 1 && Number.isFinite(values[0])) got = values[0];
  }
  if (status === "correct") return { ok: true, why: "correct", got };

  // A part with two answers in one box is a set, not a sequence. "4 and -4",
  // "-4 and 4", "x = 4, x = -4" and "±4" are the same answer, and an examiner
  // reads all four the same way. Only applied when both sides are plain lists
  // of numbers, so no algebraic answer can slip through this route.
  const mine = plainNumberList(cleaned);
  const theirs = plainNumberList(String(question.answer ?? ""));
  if (mine && theirs && mine.length === theirs.length && mine.length >= 2) {
    const tol = Number.isFinite(Number(spec.tolerance)) ? Math.abs(Number(spec.tolerance)) : 1e-6;
    const a = [...mine].sort((x, y) => x - y);
    const b = [...theirs].sort((x, y) => x - y);
    if (a.every((v, i) => near(v, b[i], Math.max(tol, Math.abs(b[i]) * 1e-9)))) {
      return { ok: true, why: "correct", got };
    }
  }

  return {
    ok: false,
    why: status === "uncertain" ? "the response could not be verified as equivalent"
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
      .replace(/[\s.,;!]+$/u, "")
      .trim();
    const stripped = stripLabel(text);
    for (const value of [text, stripped]) {
      const v = String(value || "").trim();
      if (v && !out.includes(v)) out.push(v);
    }
    // A worked line often runs prose straight into mathematics: "At a point of
    // intersection the two y-values are equal, so x^2 + 2x - 5". Drop leading
    // words one at a time and keep whatever first parses, so the expression is
    // found however much English is in front of it.
    const tokens = String(text || "").trim().split(/\s+/);
    for (let i = 1; i < tokens.length && i <= 14; i += 1) {
      const tail = tokens.slice(i).join(" ").trim();
      if (!tail || !/[\d)A-Za-z]/.test(tail)) continue;
      if (!/^[-+(\d.]|^[A-Za-z]\^?\d*\s*[-+*/^]/.test(tail)) continue;
      if (!out.includes(tail) && compile(tail)) out.push(tail);
    }
  };
  // A candidate joins the parts of a multi-statement answer with "and" as
  // readily as with a semicolon, and "3x + 2y = 32 and 5x + 4y = 58" is the
  // same pair of equations either way.
  for (const line of String(raw ?? "").split(/[;\n]+|\s+and\s+/i)) {
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
  reachesValue: checkReachesValue,
  prose: checkProse,
  labelledValue: checkLabelledValue,
  containsPoint: checkContainsPoint,
};

/**
 * Checkers that judge a sentence rather than a value. A leading "therefore" is
 * part of what is being judged there, so only trailing punctuation is removed.
 */
const SENTENCE_CHECKS = new Set(["written", "reasonConcept", "prose"]);

/** Run whichever checker the spec names. Unknown types fail closed. */
export function check(raw, spec) {
  const fn = CHECKERS[spec?.type];
  if (!fn) return { ok: false, why: `unknown check type ${spec?.type}`, got: null };

  const text = stripAnswerFurniture(raw, { keepLeading: SENTENCE_CHECKS.has(spec.type) });

  // An authored alternative outranks every form rule: if the mark scheme lists
  // this exact answer as acceptable, it is acceptable.
  if (sameAsAccepted(text, spec)) return { ok: true, why: "correct", got: text };

  try {
    return fn(text, spec);
  } catch (err) {
    return { ok: false, why: "the response could not be read", got: null, error: String(err) };
  }
}
