// ============================================================================
// Done by: Odane Robinson
//
// Replaces a plain `trim().toLowerCase()` string comparison for grading
// short-answer questions. The question bank stores each answer as ONE
// canonical string (e.g. "3/4", "$1,200.00", "40%", "x = 5", "{1, 3, 5}"),
// but a student who is mathematically correct can type it in any number of
// equivalent ways ("0.75" for "3/4", "5" for "x = 5", extra spaces, a
// different but equal set order, etc.) - exact-string-match marks all of
// those wrong.
//
// checkAnswer() tries a sequence of increasingly specific equivalence
// checks (plain text, number, fraction/decimal, currency, degrees, sets,
// coordinate/vector tuples, and multi-root "x = a or x = b" style answers)
// and returns a definite "correct"/"incorrect" the moment one applies
// cleanly to BOTH sides. If nothing recognisable applies to either side
// (free-text explanations, geometric constructions, full written proofs),
// it returns "uncertain" rather than guessing - callers should fall back
// to asking the student to self-assess against the worked solution instead
// of asserting a verdict they can't actually back up.
// ============================================================================

const clean = (s) => String(s ?? "").trim();

// Strips a leading "x =", "y=", "θ =", etc. so "x = 5" compares equal to "5".
const stripVariablePrefix = (s) =>
  clean(s).replace(/^[a-zA-Zθαβγ]\s*=\s*/, "").trim();

// Parses a plain real number, tolerating "$", thousands separators, a
// trailing "%" or "°", and a trailing/leading variable assignment.
function parseNumber(raw) {
  let s = stripVariablePrefix(raw);
  s = s.replace(/[$,]/g, "").replace(/[°%]\s*$/, "").trim();
  if (s === "") return null;
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// Parses a simple fraction "a/b" (with optional leading variable
// assignment and surrounding whitespace) to an exact { num, den } pair,
// reduced to lowest terms. Returns null for anything else, including
// plain integers/decimals (parseNumber already handles those).
function parseFraction(raw) {
  const s = stripVariablePrefix(raw);
  const m = s.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
  if (!m) return null;
  let num = parseInt(m[1], 10);
  let den = parseInt(m[2], 10);
  if (den === 0) return null;
  if (den < 0) { num = -num; den = -den; }
  const g = gcd(Math.abs(num), den) || 1;
  return { num: num / g, den: den / g };
}

function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

// Parses a "{1, 2, 3}" style set (order-independent) into a sorted array
// of numbers, or a sorted array of trimmed strings if not all numeric.
function parseSet(raw) {
  const s = clean(raw);
  const m = s.match(/^\{(.*)\}$/);
  if (!m) return null;
  const inner = m[1].trim();
  const parts = inner === "" ? [] : inner.split(",").map(p => p.trim());
  const nums = parts.map(parseNumber);
  if (parts.length && nums.every(n => n !== null)) {
    return [...nums].sort((a, b) => a - b);
  }
  return [...parts.map(p => p.toLowerCase())].sort();
}

// Parses a coordinate/vector tuple: "(3, 4)", "3,4", or "3 4" -> [3, 4].
// Requires at least 2 components so it doesn't swallow a bare number.
function parseTuple(raw) {
  const s = clean(raw).replace(/^\(|\)$/g, "").trim();
  if (!s.includes(",") && !/\s/.test(s)) return null;
  const parts = s.split(/[,\s]+/).filter(Boolean);
  if (parts.length < 2) return null;
  const nums = parts.map(parseNumber);
  return nums.every(n => n !== null) ? nums : null;
}

// Parses "x = 2 or x = 3" / "2, 3" style multi-root answers into a sorted
// array of numbers. Used for quadratic-equation answers with two roots.
function parseRootList(raw) {
  const parts = clean(raw).split(/\bor\b|,/i).map(p => p.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const nums = parts.map(parseNumber);
  return nums.every(n => n !== null) ? [...nums].sort((a, b) => a - b) : null;
}

const numbersClose = (a, b, tol = 1e-6) =>
  Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

const arraysClose = (a, b) =>
  a.length === b.length && a.every((v, i) => numbersClose(v, b[i]));

/**
 * Compares a student's answer against the question bank's canonical
 * answer string. Returns one of:
 *   "correct"   - confidently equivalent
 *   "incorrect" - confidently NOT equivalent (both sides parsed the same
 *                 way, e.g. both numbers, but the values differ)
 *   "uncertain" - couldn't confidently parse/compare either side (free
 *                 text, proofs, geometric constructions, etc.) - the
 *                 caller should not present this as an automatic verdict.
 */
export function checkAnswer(userInput, expectedAnswer) {
  const userRaw = clean(userInput);
  const expectedRaw = clean(expectedAnswer);
  if (!userRaw) return "incorrect"; // an empty submission is never "correct"

  // 1) Fast path: identical after trim/lowercase (covers the vast majority
  //    of already-correctly-formatted answers without any parsing at all).
  if (userRaw.toLowerCase() === expectedRaw.toLowerCase()) return "correct";

  // 2) Multi-root answers, e.g. "x = 2 or x = 3".
  const userRoots = parseRootList(userRaw);
  const expectedRoots = parseRootList(expectedRaw);
  if (userRoots && expectedRoots) {
    return arraysClose(userRoots, expectedRoots) ? "correct" : "incorrect";
  }

  // 3) Sets, e.g. "{1, 3, 5}".
  const userSet = parseSet(userRaw);
  const expectedSet = parseSet(expectedRaw);
  if (userSet && expectedSet) {
    const same = userSet.length === expectedSet.length &&
      userSet.every((v, i) => v === expectedSet[i]);
    return same ? "correct" : "incorrect";
  }

  // 4) Coordinate/vector tuples, e.g. "(3, 4)".
  const userTuple = parseTuple(userRaw);
  const expectedTuple = parseTuple(expectedRaw);
  if (userTuple && expectedTuple) {
    return arraysClose(userTuple, expectedTuple) ? "correct" : "incorrect";
  }

  // 5) Fractions and/or plain numbers - the most common case (also covers
  //    "x = 5", "$1,200.00", "45°", "40%", with prefixes/symbols stripped).
  const userFrac = parseFraction(userRaw);
  const expectedFrac = parseFraction(expectedRaw);
  const userNum = userFrac ? userFrac.num / userFrac.den : parseNumber(userRaw);
  const expectedNum = expectedFrac ? expectedFrac.num / expectedFrac.den : parseNumber(expectedRaw);
  if (userNum !== null && expectedNum !== null) {
    return numbersClose(userNum, expectedNum) ? "correct" : "incorrect";
  }

  // Nothing recognisable applied to both sides with confidence.
  return "uncertain";
}
