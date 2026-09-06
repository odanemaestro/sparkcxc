// ============================================================================
// algebra.js - parse and compare the plain-text mathematics students type.
//
// Two expressions are treated as equal when they agree numerically at many
// random points, which is how STACK, Numbas and WeBWorK decide equivalence.
// It means (2x + 3)(x - 5) and 2x^2 - 7x - 15 both mark correct without any
// symbolic algebra system, and a student who expands, factorises or reorders
// their answer is not punished for it.
// ============================================================================

const CONSTANTS = { pi: Math.PI, PI: Math.PI, e: Math.E };

const FUNCTIONS = {
  sqrt: Math.sqrt, abs: Math.abs, sin: null, cos: null, tan: null,
  asin: null, acos: null, atan: null, log: Math.log10, ln: Math.log,
};

// Trigonometric input in this subject is always in degrees.
const DEG = Math.PI / 180;
FUNCTIONS.sin = x => Math.sin(x * DEG);
FUNCTIONS.cos = x => Math.cos(x * DEG);
FUNCTIONS.tan = x => Math.tan(x * DEG);
FUNCTIONS.asin = x => Math.asin(x) / DEG;
FUNCTIONS.acos = x => Math.acos(x) / DEG;
FUNCTIONS.atan = x => Math.atan(x) / DEG;
FUNCTIONS.bearing = (north, east) => (Math.atan2(east, north) / DEG + 360) % 360;

/** Everything a student might type for the same operator. */
export function normalise(raw) {
  let s = String(raw ?? "").trim();
  if (!s) return "";
  s = s
    .replace(/[−–—]/g, "-")     // minus, en dash, em dash
    .replace(/[×∗]/g, "*")           // times
    .replace(/[÷]/g, "/")                 // divide
    .replace(/√/g, "sqrt")
    .replace(/π/g, "pi")
    .replace(/≤/g, "<=").replace(/≥/g, ">=")
    .replace(/°/g, "")                    // degrees are implied
    .replace(/\\vec\{([^}]*)\}/g, "$1")
    .replace(/[,\s]+/g, m => (/,/.test(m) ? "," : " "))
    .replace(/\s*\^\s*/g, "^");
  // a mixed number: "2 1/3" -> "(2+1/3)"
  s = s.replace(/(^|[\s(=+\-*/])(\d+)\s+(\d+)\s*\/\s*(\d+)/g,
                (_, pre, w, n, d) => `${pre}(${w}+${n}/${d})`);
  // students write "48 tan 34" and "sin 68", not "tan(34)" - supply the
  // brackets so the usual exam shorthand parses
  s = s.replace(/\b(sqrt|sin|cos|tan|asin|acos|atan|log|ln|abs)\s*(-?\d+(?:\.\d+)?|[A-Za-z])(?![\w(])/g,
                (_, fn, arg) => `${fn}(${arg})`);
  return s;
}

/**
 * Split an expression into tokens. A regular expression cannot do this job:
 * the "(" in sin(x) belongs to the function name while the "(" in 3(x+1)
 * means multiply, and the two look identical to a pattern that cannot see
 * what came before it. So read the string once, left to right, and label
 * each piece.
 *
 * An unknown run of letters is a product of single letters, which is how
 * "xy" means x times y while "sqrt" stays a single name.
 */
const NAMES = Object.keys(FUNCTIONS).concat(Object.keys(CONSTANTS))
  .filter(n => n.length > 1)
  .sort((a, b) => b.length - a.length);

function splitWord(word, out) {
  let rest = word;
  while (rest.length) {
    const name = NAMES.find(n => rest.startsWith(n));
    if (name) {
      out.push({ t: name in FUNCTIONS ? "fn" : "var", v: name });
      rest = rest.slice(name.length);
    } else {
      out.push({ t: "var", v: rest[0] });
      rest = rest.slice(1);
    }
  }
}

function tokenise(s) {
  const out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i += 1; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j += 1;
      // Three-figure bearings such as 068 are decimal values, not legacy
      // octal literals. Strip redundant leading zeros before compilation.
      out.push({ t: "num", v: s.slice(i, j).replace(/^0+(?=\d)/, "") });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < s.length && /[A-Za-z0-9_]/.test(s[j])) j += 1;
      const word = s.slice(i, j);
      i = j;
      if (word in FUNCTIONS) out.push({ t: "fn", v: word });
      else if (word in CONSTANTS) out.push({ t: "var", v: word });
      else if (word.length === 1) out.push({ t: "var", v: word });
      else splitWord(word, out);
      continue;
    }
    if (c === "(") { out.push({ t: "(", v: "(" }); i += 1; continue; }
    if (c === ")") { out.push({ t: ")", v: ")" }); i += 1; continue; }
    if (s.startsWith("**", i)) { out.push({ t: "op", v: "**" }); i += 2; continue; }
    if (/^[<>!=]=/.test(s.slice(i))) {
      out.push({ t: "op", v: s.slice(i, i + 2) });
      i += 2;
      continue;
    }
    out.push({ t: "op", v: c });
    i += 1;
  }
  return out;
}

/** Insert the multiplication signs people leave out: 2x, 3(x+1), (a)(b), xy. */
function explicitMultiplication(s) {
  const tk = tokenise(s);
  const out = [];
  for (let i = 0; i < tk.length; i += 1) {
    const a = tk[i];
    const b = tk[i + 1];
    out.push(a.v);
    if (!b) break;
    const endsValue = a.t === "num" || a.t === "var" || a.t === ")";
    const startsValue = b.t === "num" || b.t === "var" || b.t === "fn"
      || b.t === "(";
    if (endsValue && startsValue) out.push("*");
  }
  return out.join("");
}

const CACHE = new Map();

/** Compile an expression to a function of its variables. Returns null if it
 *  cannot be parsed - a wrong answer, not a crash. */
export function compile(raw) {
  const key = String(raw);
  if (CACHE.has(key)) return CACHE.get(key);
  let fn = null;
  try {
    let s = normalise(raw);
    if (!s) throw new Error("empty");
    // an equation such as "y = 2x + 3": grade the right-hand side
    const eq = s.split("=");
    if (eq.length === 2) s = eq[1];
    else if (eq.length > 2) throw new Error("too many = signs");
    s = explicitMultiplication(s).replace(/\^/g, "**");
    if (/[^0-9A-Za-z_.+\-*/()><=!, ]/.test(s)) throw new Error("bad character");
    const names = [...new Set(s.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [])];
    const vars = names.filter(n => !(n in FUNCTIONS) && !(n in CONSTANTS));
    const args = vars.join(",");
    // eslint-disable-next-line no-new-func
    const body = new Function("__f", "__c", args,
      `"use strict";const{${Object.keys(FUNCTIONS).join(",")}}=__f;` +
      `const{${Object.keys(CONSTANTS).join(",")}}=__c;` +
      `return (${s});`);
    fn = { vars, call: values => body(FUNCTIONS, CONSTANTS, ...vars.map(v => values[v])) };
  } catch {
    fn = null;
  }
  CACHE.set(key, fn);
  return fn;
}

/** Numeric value of an expression with no variables, or null. */
export function value(raw) {
  const f = compile(raw);
  if (!f || f.vars.length) return null;
  try {
    const v = f.call({});
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

function samplePoints(vars, count, rng) {
  const points = [];
  for (let i = 0; i < count; i += 1) {
    const p = {};
    vars.forEach((v, j) => { p[v] = (rng() * 8 - 4) + 0.5137 * (j + 1); });
    points.push(p);
  }
  return points;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Are two expressions the same function?
 * Compared at 40 pseudo-random points; the seed is fixed so marking is
 * deterministic and a re-mark always gives the same result.
 */
export function equivalent(a, b, { tolerance = 1e-7 } = {}) {
  const fa = compile(a);
  const fb = compile(b);
  if (!fa || !fb) return false;
  const vars = [...new Set([...fa.vars, ...fb.vars])];
  if (!vars.length) {
    const va = value(a);
    const vb = value(b);
    return va !== null && vb !== null && Math.abs(va - vb) <= tolerance * Math.max(1, Math.abs(vb));
  }
  const rng = mulberry32(0x5EED);
  let compared = 0;
  for (const point of samplePoints(vars, 40, rng)) {
    let x;
    let y;
    try { x = fa.call(point); } catch { continue; }
    try { y = fb.call(point); } catch { continue; }
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    compared += 1;
    if (Math.abs(x - y) > tolerance * Math.max(1, Math.abs(y))) return false;
  }
  return compared >= 8;
}

/**
 * If b is a constant multiple of a, return that constant; otherwise null.
 *
 * This is what makes equations and inequalities markable.  "2x + 4 = 10" and
 * "x + 2 = 5" are the same equation, and "3(x - 2) < x + 8" and "x < 7" are
 * the same inequality - in each case one side minus the other differs only by
 * a factor.  A negative factor is exactly the case where an inequality flips,
 * which is the slip CSEC candidates make most often, so the sign is returned
 * rather than thrown away.
 */
export function proportionality(a, b, { tolerance = 1e-7 } = {}) {
  const fa = compile(a);
  const fb = compile(b);
  if (!fa || !fb) return null;
  const vars = [...new Set([...fa.vars, ...fb.vars])];
  const rng = mulberry32(0xC0FFEE);
  const points = vars.length ? samplePoints(vars, 24, rng) : [{}];
  let k = null;
  let compared = 0;
  for (const point of points) {
    let x;
    let y;
    try { x = fa.call(point); y = fb.call(point); } catch { continue; }
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (Math.abs(x) < 1e-9 && Math.abs(y) < 1e-9) continue;
    if (Math.abs(x) < 1e-9 || Math.abs(y) < 1e-9) return null;
    const r = y / x;
    if (k === null) k = r;
    else if (Math.abs(r - k) > tolerance * Math.max(1, Math.abs(k))) return null;
    compared += 1;
  }
  return compared >= 3 && k !== null && Math.abs(k) > 1e-9 ? k : null;
}

/** Split "lhs = rhs" into the single expression lhs - rhs. */
export function asDifference(raw) {
  const s = normalise(raw);
  const rel = s.split(/<=|>=|!=|[<>=\u2264\u2265]/);
  if (rel.length !== 2) return null;
  const left = rel[0].trim();
  const right = rel[1].trim();
  if (!left || !right) return null;
  return `(${left}) - (${right})`;
}

/** The relation in a statement: one of = < <= > >=, or null. */
export function relationOf(raw) {
  const s = normalise(raw);
  if (/<=|\u2264/.test(s)) return "<=";
  if (/>=|\u2265/.test(s)) return ">=";
  if (/</.test(s)) return "<";
  if (/>/.test(s)) return ">";
  if (/=/.test(s)) return "=";
  return null;
}

const FLIP = { "<": ">", ">": "<", "<=": ">=", ">=": "<=", "=": "=" };
export const flipRelation = r => FLIP[r] || r;

/** Is the expression written as a product of factors (not expanded)? */
export function isFactorised(raw) {
  const s = normalise(raw).replace(/\s/g, "");
  // A monomial times a bracket, for example 3b(2a - 5b), is already a
  // product of factors. The older check only recognised a bare numeral.
  const monomialTimesBracket = /^-?\d*\*?[A-Za-z]*(\^\d+)?[A-Za-z]*(\^\d+)?\*?\(/;
  if (!/\)\s*\(/.test(s) && !monomialTimesBracket.test(s)) return false;
  // a trailing "+ 3" outside every bracket means it is not a single product
  const outside = s.replace(/\([^()]*\)/g, "");
  return !/[+\-](?![^(]*\))/.test(outside.replace(/^-/, ""));
}

/** Every number a student wrote, in order - used to find method evidence. */
export function numbersIn(raw) {
  // CXC commonly prints thousands using spaces (625 000 000). Join those
  // groups before scanning so a written value is treated as one number.
  const s = normalise(raw)
    .replace(/,(?=\d{3}\b)/g, "")
    .replace(/(\d) (?=\d{3}(?!\d))/g, "$1")
    .replace(/(\d) (?=\d{3}(?!\d))/g, "$1");
  return (s.match(/-?\d+(?:\.\d+)?(?:\s*\/\s*\d+)?/g) || [])
    .map(t => {
      const parts = t.split("/");
      return parts.length === 2
        ? Number(parts[0]) / Number(parts[1])
        : Number(t);
    })
    .filter(Number.isFinite);
}

/** Decimal places and significant figures a student actually wrote. */
export function precisionOf(raw) {
  const m = String(raw).match(/-?\d+(?:\.(\d+))?/);
  if (!m) return { dp: null, sf: null };
  const dp = m[1] ? m[1].length : 0;
  const digits = m[0].replace(/[-.]/g, "").replace(/^0+/, "");
  return { dp, sf: digits.replace(/0+$/, "").length || digits.length };
}
