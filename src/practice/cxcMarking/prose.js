// ============================================================================
// prose.js - marking the sentences that carry a third of Paper 2.
//
// 200 of the 574 typed parts in the bank have an answer that is a sentence
// rather than a value, and they are worth 550 marks. "Describe FULLY the
// single transformation", "give a reason", "state TWO geometrical
// relationships", "explain why the number of tiles can never be 30". These are
// the Reasoning marks, and they were being decided by string equality, so
//
//     "A reflection in the x-axis (y = 0)"   scored 3 of 3
//     "reflection in the x axis"             scored 0 of 3
//     "Reflection in the line y = 0"         scored 0 of 3
//
// all three of which an examiner marks the same way.
//
// What replaces it is the thing CXC actually prints: a checklist of ideas. A
// candidate earns a mark for each idea they express, in whatever words they
// use, and loses a mark for an idea they leave out. Wrong answers are held out
// by contrast sets (a reflection is not a rotation) and by matching polarity,
// so "parallel" never marks the same as "not parallel".
// ============================================================================

import { canonicalise, mentions } from "./reasoning.js";
import { compile, normalise, numbersIn } from "./algebra.js";

// ---------------------------------------------------------------------------
// vocabulary
// ---------------------------------------------------------------------------

/** Words that carry no meaning for marking. */
const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being", "of", "in",
  "on", "to", "at", "by", "for", "with", "from", "that", "this", "these", "those",
  "it", "its", "and", "or", "but", "as", "into", "onto", "under", "over", "then",
  "there", "their", "you", "your", "we", "our", "will", "would", "can", "could",
  "has", "have", "had", "do", "does", "did", "so", "if", "when", "which", "who",
  "each", "every", "any", "some", "all", "both", "one", "two", "three", "also",
  "give", "given", "gives", "state", "stated", "answer", "part", "value", "values",
  "because", "since", "therefore", "hence", "thus", "about", "same",
]);

/**
 * Groups whose members exclude one another. If the mark scheme's answer names
 * one member, an answer naming a different member of the same group is wrong,
 * however many other words it happens to share.
 */
const CONTRASTS = [
  ["reflection", "rotation", "translation", "enlargement"],
  ["parallel", "perpendicular"],
  ["increase", "decrease"],
  ["clockwise", "anticlockwise"],
  ["mean", "median", "mode"],
  ["positive", "negative"],
  ["trapezium", "parallelogram", "rhombus", "kite", "square", "rectangle"],
  ["one-to-one", "many-to-one", "one-to-many", "many-to-many"],
  ["odd", "even"],
  ["maximum", "minimum"],
  ["greater", "less", "smaller", "larger"],
  ["yes", "no"],
  ["alternate", "corresponding", "co-interior", "vertically opposite"],
  ["acute", "obtuse", "reflex"],
  ["similar", "congruent"],
  ["profit", "loss"],
];

/** Words that reverse the meaning of the sentence around them. */
const NEGATIONS = ["not", "never", "cannot", "no", "neither", "nor", "without", "un"];

// ---------------------------------------------------------------------------
// tokens
// ---------------------------------------------------------------------------

function words(text) {
  return canonicalise(text)
    .replace(/[()]/g, " ")
    .replace(/\b(\w+)-(\w+)\b/g, "$1 $2 $1-$2")   // x-axis counts as both forms
    .split(/[^a-z0-9./^=<>-]+/)
    .map(w => (/^-\d/.test(w) ? w.replace(/[-.]+$/g, "") : w.replace(/^[-.]+|[-.]+$/g, "")))
    .filter(Boolean);
}

/** The words in a piece of text that a mark actually depends on. */
export function contentTokens(text) {
  const seen = new Set();
  const out = [];
  for (const w of words(text)) {
    if (STOPWORDS.has(w)) continue;
    if (w.length < 2 && !/\d/.test(w)) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    out.push(w);
  }
  return out;
}

/** Is the sentence a negative statement? */
function polarityOf(text) {
  const w = new Set(words(text));
  return NEGATIONS.some(n => w.has(n)) ? "negative" : "positive";
}

/**
 * Is this particular word negated where it stands?
 *
 * A blanket search for "not" anywhere in the response is too blunt: a correct
 * answer often contains a negative clause on its way to a positive conclusion
 * ("the origin is the only point that does not move, so it is an
 * enlargement"). What matters is whether the negation attaches to the word the
 * mark depends on, so only the two words before it are examined.
 */
function locallyNegated(text, token) {
  const w = words(text);
  for (let i = 0; i < w.length; i += 1) {
    if (w[i] !== token) continue;
    for (let back = 1; back <= 3 && i - back >= 0; back += 1) {
      if (NEGATIONS.includes(w[i - back])) return true;
    }
  }
  return false;
}

/** Every contrast word the text names. */
function contrastsIn(text) {
  const t = ` ${canonicalise(text)} `;
  const found = [];
  for (const group of CONTRASTS) {
    for (const member of group) {
      if (t.includes(` ${member} `) || t.includes(`${member} `) || t.includes(` ${member}`)) {
        found.push({ group, member });
        break;
      }
    }
  }
  return found;
}

/** A number written by the candidate, matched by value rather than by string. */
function numberPresent(target, text) {
  const values = numbersIn(text);
  const want = Number(target);
  if (!Number.isFinite(want)) return false;
  return values.some(v => Math.abs(v - want) <= Math.max(1e-9, Math.abs(want) * 1e-9));
}

/**
 * Does the candidate's answer express this idea?
 *
 * A token counts as present when the word appears, when a synonym of it
 * appears, when a small spelling slip of it appears, or, for a number, when
 * the same value appears anywhere in the answer.
 */
export function tokenPresent(token, answer) {
  if (/^-?\d+(?:\.\d+)?$/.test(token)) return numberPresent(token, answer);
  if (mentions(answer, token)) return true;
  // a token such as "y=0" is written by hand as "y = 0"
  if (/[=<>]/.test(token)) {
    const tidy = t => normalise(t).replace(/\s+/g, "").toLowerCase();
    return tidy(answer).includes(tidy(token));
  }
  // "x-axis", "x axis" and "xaxis" are the same thing to an examiner.
  if (token.includes("-")) {
    const forms = [token.replace(/-/g, " "), token.replace(/-/g, "")];
    if (forms.some(f => mentions(answer, f))) return true;
  }
  // singular and plural, and the commonest English endings
  const stems = [token.replace(/(ies)$/, "y"), token.replace(/(es|s)$/, ""),
                 `${token}s`, `${token}es`, token.replace(/e$/, "ing")];
  return stems.some(s => s.length > 2 && mentions(answer, s));
}

// ---------------------------------------------------------------------------
// the checker
// ---------------------------------------------------------------------------

/**
 * Mark one idea from a mark scheme against what the candidate wrote.
 *
 * spec: {
 *   type: "prose",
 *   key:      "the mark scheme's wording of this idea",
 *   mustHave: ["reflection"],        // every one of these is required
 *   forbid:   ["rotation"],          // none of these may appear
 *   quorum:   0.6,                   // share of the remaining ideas needed
 *   polarity: "positive" | "negative"
 * }
 */
export function checkProse(raw, spec = {}) {
  const answer = String(raw ?? "").trim();
  if (!answer) return { ok: false, why: "nothing written", got: null };

  const key = String(spec.key ?? "");
  const must = spec.mustHave || [];
  const forbid = spec.forbid || [];

  const wrong = forbid.find(f => tokenPresent(f, answer));
  if (wrong) {
    return { ok: false, got: answer,
             why: `the answer says "${wrong}", which is not what this question needs` };
  }

  // A negative statement has to stay negative. "The lines are not parallel" and
  // "the lines are parallel" share every content word and mean the opposite
  // things, so this is checked before anything is counted.
  const wantedPolarity = spec.polarity || polarityOf(key);
  if (wantedPolarity === "negative" && polarityOf(answer) !== "negative") {
    return { ok: false, got: answer,
             why: "the answer needs to say that this is not the case" };
  }

  const missingMust = must.filter(m => !tokenPresent(m, answer));
  if (missingMust.length) {
    return { ok: false, got: answer,
             why: `the answer does not mention ${quote(missingMust)}` };
  }

  if (wantedPolarity === "positive") {
    const negated = must.find(m => locallyNegated(answer, m));
    if (negated) {
      return { ok: false, got: answer,
               why: `the answer denies "${negated}", which is what this question needs` };
    }
  }

  const supporting = (spec.tokens || contentTokens(key)).filter(t => !must.includes(t));
  if (!supporting.length) return { ok: true, why: "correct", got: answer };

  const matched = supporting.filter(t => tokenPresent(t, answer));
  const quorum = Number.isFinite(Number(spec.quorum)) ? Number(spec.quorum) : 0.6;
  const need = Math.max(1, Math.ceil(supporting.length * quorum));
  const ok = matched.length >= need;
  return {
    ok, got: answer,
    matched: matched.length, of: supporting.length,
    why: ok ? "correct"
      : `the answer is missing ${quote(supporting.filter(t => !matched.includes(t)).slice(0, 4))}`,
  };
}

function quote(list = []) {
  const q = list.map(w => `"${w}"`);
  if (q.length <= 1) return q[0] || "the required idea";
  return `${q.slice(0, -1).join(", ")} and ${q[q.length - 1]}`;
}

// ---------------------------------------------------------------------------
// labelled values
// ---------------------------------------------------------------------------

/**
 * Mark one labelled quantity out of an answer that states several.
 *
 * "width 4.5 cm, length 17.5 cm" is two marks, not one, and a candidate who
 * gets the width right and the length wrong has earned one of them. Marking
 * the whole line as a single string gives them nothing.
 *
 * The label is looked for first, and the number taken from just after it, so
 * "length 17.5 cm, width 4.5 cm" marks correctly even though the order is
 * reversed. When the candidate writes no labels at all, the values are matched
 * by position instead, which is what an examiner does with a bare pair.
 */
export function checkLabelledValue(raw, spec = {}) {
  const answer = String(raw ?? "");
  const target = Number(spec.value);
  if (!Number.isFinite(target)) {
    return { ok: false, why: "the mark scheme has no value for this quantity", got: null };
  }
  const tol = Number.isFinite(Number(spec.tolerance)) ? Math.abs(Number(spec.tolerance)) : 1e-6;
  const near = v => Math.abs(v - target) <= Math.max(tol, Math.abs(target) * 1e-9);

  const label = String(spec.label ?? "").trim().toLowerCase();
  if (label) {
    // Look inside the candidate's own clause for this quantity, so a value
    // belonging to a different quantity in the same answer is never used.
    const stem = label.slice(0, Math.min(4, label.length));
    for (const clause of ideasIn(answer)) {
      const tidy = canonicalise(clause);
      if (!tidy.split(/[^a-z0-9]+/).some(w => w.startsWith(stem))) continue;
      const values = numbersIn(clause);
      if (!values.length) continue;
      const hit = values.find(near);
      return hit !== undefined
        ? { ok: true, why: "correct", got: hit }
        : { ok: false, why: `the ${label} is not the required value`, got: values[0] };
    }
  }

  const values = numbersIn(answer);
  const index = Number.isInteger(spec.index) ? spec.index : null;
  if (index !== null && values.length > index && Number.isFinite(values[index])) {
    return near(values[index])
      ? { ok: true, why: "correct", got: values[index] }
      : { ok: false, why: `the ${label || "value"} is not the required value`, got: values[index] };
  }
  const anywhere = values.find(near);
  return anywhere !== undefined
    ? { ok: true, why: "correct", got: anywhere }
    : { ok: false, why: `the ${label || "value"} is not stated`, got: values.length ? values : null };
}

/**
 * Is this point among the points the candidate wrote?
 *
 * Order does not matter: a candidate who lists the two intersection points the
 * other way round has found the same two points.
 */
export function checkContainsPoint(raw, spec = {}) {
  const want = (spec.value || []).map(Number);
  if (want.length !== 2 || want.some(v => !Number.isFinite(v))) {
    return { ok: false, why: "the mark scheme has no point", got: null };
  }
  const tol = Number.isFinite(Number(spec.tolerance)) ? Math.abs(Number(spec.tolerance)) : 1e-6;
  const pairs = [...String(raw ?? "").matchAll(/\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g)]
    .map(m => [Number(m[1]), Number(m[2])]);
  const hit = pairs.find(p => Math.abs(p[0] - want[0]) <= Math.max(tol, Math.abs(want[0]) * 1e-9)
    && Math.abs(p[1] - want[1]) <= Math.max(tol, Math.abs(want[1]) * 1e-9));
  return {
    ok: Boolean(hit),
    why: hit ? "correct" : `the point (${want[0]}, ${want[1]}) is not among the points you gave`,
    got: hit || (pairs.length ? pairs : null),
  };
}

// ---------------------------------------------------------------------------
// building a checklist from a mark scheme's answer
// ---------------------------------------------------------------------------

/** Split a key answer into the separate ideas it states. */
export function ideasIn(answer) {
  const text = String(answer ?? "").trim();
  if (!text) return [];
  for (const splitter of [/\s*;\s*/, /\s*,\s+(?=[a-z(\d-])/i, /\s+and\s+(?=[a-z(\d-])/i]) {
    const parts = splitOutsideBrackets(text, splitter);
    if (parts.length > 1) return parts;
  }
  return [text];
}

/**
 * Split on a separator, but never inside brackets, so a coordinate such as
 * "(0, 0)" survives whole. The separator is matched against the untouched
 * string, which is what lets it use a lookahead: an earlier version tested it
 * against a growing prefix, where a lookahead can never match, and every
 * comma-separated and "and"-separated answer silently stayed in one piece.
 */
function splitOutsideBrackets(text, separator) {
  const source = String(text ?? "");
  const scanner = new RegExp(separator.source, `${separator.flags.replace(/g/g, "")}g`);
  const depths = depthMap(source);
  const chunks = [];
  let cut = 0;
  let m = scanner.exec(source);
  while (m) {
    if (m[0].length && depths[m.index] === 0) {
      const piece = source.slice(cut, m.index);
      if (piece.trim()) chunks.push(piece);
      cut = m.index + m[0].length;
      scanner.lastIndex = cut;
    } else if (scanner.lastIndex === m.index) {
      scanner.lastIndex += 1;
    }
    m = scanner.exec(source);
  }
  const tail = source.slice(cut);
  if (tail.trim()) chunks.push(tail);
  return chunks.map(c => c.trim()).filter(Boolean);
}

/** Bracket nesting depth at every character position. */
function depthMap(text) {
  const out = new Array(text.length).fill(0);
  let depth = 0;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === ")" || ch === "]" || ch === "}") depth = Math.max(0, depth - 1);
    out[i] = depth;
    if (ch === "(" || ch === "[" || ch === "{") depth += 1;
  }
  return out;
}

/** Is this clause mathematics rather than a sentence? */
export function looksMathematical(clause) {
  const bare = stripClauseLabel(clause);
  if (!bare) return false;
  if (/^[-+]?\d+(?:\.\d+)?$/.test(bare)) return true;
  // A word means prose. Variables are single letters and the function names
  // are known, so anything else that runs three letters together is English:
  // "19th term" is an answer in words, not an expression in t, e, r and m.
  const withoutFunctions = bare.replace(/\b(sqrt|sin|cos|tan|asin|acos|atan|log|ln|abs|pi)\b/gi, " ");
  if (/[A-Za-z]{3}/.test(withoutFunctions)) return false;
  if (/[<>]=?|=/.test(bare)) return true;
  return Boolean(compile(bare)) && /[\d^*/+-]/.test(bare);
}

/** The units a plain quantity is allowed to carry. */
const UNIT_TAIL =
  /^(?:cm|mm|m|km|kg|g|ml|l|litres?|units?|square\s+units?|cubic\s+units?|marks?|days?|hours?|hrs?|minutes?|mins?|seconds?|degrees?|dollars?)(?:\^?[23]|[²³])?$/i;

/** Is this a number with at most a unit, rather than an algebraic expression? */
export function isPlainQuantity(text) {
  const s = String(text ?? "").trim().replace(/^[$£€]\s*/, "").replace(/[%°]/g, "").trim();
  const m = s.match(/^-?\d+(?:\.\d+)?\s*(.*)$/);
  if (!m) return false;
  const tail = m[1].trim();
  return !tail || UNIT_TAIL.test(tail);
}

/** "shaded n^2" -> "n^2", "width 4.5 cm" -> "4.5 cm", "notebook $6.00" -> "$6.00". */
export function stripClauseLabel(clause) {
  const s = String(clause ?? "").trim();
  const m = s.match(/^((?:[A-Za-z][A-Za-z-]*\s+){1,3})(.+)$/);
  if (!m) return s;
  const rest = m[2].trim();
  return /^[$(-]?\d|^[a-z]\s*[=<>]/i.test(rest) ? rest : s;
}

/**
 * Build a mark scheme for a written answer.
 *
 * Transformations get the checklist CXC prints for them, because "describe
 * fully" is three separate marks and a candidate who names the transformation
 * but forgets the centre should get one of them. Everything else is split into
 * the ideas the model answer states, one criterion each, so the marks divide
 * the way the answer divides.
 *
 * Returns null when the answer is not prose at all, so the caller keeps
 * whatever numeric or algebraic checker it already had.
 */
export function buildProseCriteria(part) {
  const answer = String(part.answer ?? "").trim();
  const marks = Number(part.marks || 0);
  if (!answer || marks < 1) return null;

  const transformation = transformationCriteria(answer, marks);
  if (transformation) return transformation;

  const clauses = ideasIn(answer);

  // An answer that states several things is several marks. "width 4.5 cm,
  // length 17.5 cm", "x = 5; not in the domain" and "3x + 2y = 32;
  // 5x + 4y = 58" each divide cleanly, and a candidate who gets one of the two
  // deserves one of the two marks.
  if (clauses.length > 1 && marks >= clauses.length) {
    return clauseCriteria(clauses, marks, part);
  }

  // Not enough marks to divide, but the answer still states several things.
  // Judge each of them and require all, so a candidate who writes them in a
  // different order, or joins them with "and" instead of a semicolon, is not
  // marked wrong for punctuation.
  if (clauses.length > 1) {
    const perClause = clauseCriteria(clauses, clauses.length, part);
    return [{
      kind: "B", code: "B1", marks, field: "all", depends: [],
      profile: perClause.every(c => c.profile === "reasoning") ? "reasoning" : "algorithmic",
      description: `states ${clauses.length} required statements`,
      check: { type: "allOf", options: perClause.map(c => c.check) },
    }];
  }

  if (!/[A-Za-z]{3}/.test(answer)) return null;          // a single value, not a sentence
  if (looksMathematical(answer)) return null;            // a single expression

  return [proseCriterion(answer, marks, 0)];
}

/** One criterion per clause, each with the checker its own content calls for. */
function clauseCriteria(clauses, marks, part) {
  const share = distribute(marks, clauses.length);
  const tolerance = Number.isFinite(Number(part.tolerance)) ? Number(part.tolerance) : 0.011;
  return clauses.map((clause, index) => {
    const bare = stripClauseLabel(clause);
    const label = clause.slice(0, clause.length - bare.length).trim().replace(/[^A-Za-z ]/g, "").trim();
    const values = numbersIn(bare);

    // a bare quantity, labelled or not. "4n" is an expression, not a quantity,
    // so a trailing letter only counts when it is a unit.
    if (isPlainQuantity(bare) && values.length === 1) {
      return {
        kind: "B", code: `B${index + 1}`, marks: share[index], field: "answer", depends: [],
        profile: "algorithmic",
        description: label ? `states the ${label}` : `states ${bare}`,
        check: { type: "labelledValue", label, value: values[0], index, tolerance },
      };
    }

    // a relation the candidate has to reproduce
    if (/[<>]=?/.test(bare)) {
      return {
        kind: "B", code: `B${index + 1}`, marks: share[index], field: "all", depends: [],
        profile: "algorithmic",
        description: `states ${trim(bare)}`,
        check: { type: "containsInequality", value: bare },
      };
    }
    if (/=/.test(bare) && looksMathematical(bare)) {
      return {
        kind: "B", code: `B${index + 1}`, marks: share[index], field: "all", depends: [],
        profile: "algorithmic",
        description: `states ${trim(bare)}`,
        check: { type: "anyOf", options: [
          { type: "equation", value: bare },
          { type: "containsEquivalentExpression", value: bare.split("=").pop().trim() },
        ]},
      };
    }

    // a coordinate pair is a point: "(-2, -5) and (3, 10)" is two marks, and
    // each point has to be found wherever the candidate wrote it.
    const point = bare.match(/^\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)$/);
    if (point) {
      return {
        kind: "B", code: `B${index + 1}`, marks: share[index], field: "answer", depends: [],
        profile: "algorithmic",
        description: `states the point (${point[1]}, ${point[2]})`,
        check: { type: "containsPoint", value: [Number(point[1]), Number(point[2])], tolerance },
      };
    }

    // an algebraic expression, possibly labelled: "unshaded 4n"
    if (looksMathematical(bare)) {
      return {
        kind: "B", code: `B${index + 1}`, marks: share[index], field: "all", depends: [],
        profile: "algorithmic",
        description: label ? `gives the expression for the ${label}` : `gives ${trim(bare)}`,
        check: { type: "containsEquivalentExpression", value: bare },
      };
    }

    return proseCriterion(clause, share[index], index);
  });
}

function proseCriterion(idea, marks, index) {
  const tokens = contentTokens(idea);
  const contrast = contrastsIn(idea);
  const mustHave = tokens.filter(t => contrast.some(c => c.member === t)
    || /^-?\d+(?:\.\d+)?$/.test(t));
  const forbid = contrast.flatMap(c => c.group.filter(m => m !== c.member));
  const prose = {
    type: "prose",
    key: idea,
    tokens,
    mustHave,
    forbid,
    polarity: polarityOf(idea),
    quorum: tokens.length <= 3 ? 1 : 0.6,
  };
  // "the 19th term" is a short answer whose whole content is one number. A
  // candidate who writes "19" has answered it, and an examiner accepts that.
  const values = numbersIn(idea);
  const check = (tokens.length <= 4 && values.length === 1 && !forbid.length)
    ? { type: "anyOf", options: [prose, { type: "containsValue", value: values[0] }] }
    : prose;
  return {
    kind: "B",
    code: `B${index + 1}`,
    marks,
    // A written judgement reads the answer box. The working box is where a
    // candidate reasons out loud, and a contrast word used along the way
    // ("the origin is the only point that does not move") is not their answer.
    field: "answer",
    depends: [],
    profile: "reasoning",
    description: describeIdea(idea),
    check,
  };
}

/** Spread `total` marks over `count` ideas, earlier ideas taking the remainder. */
function distribute(total, count) {
  const base = Math.floor(total / count);
  const extra = total - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < extra ? 1 : 0));
}

function describeIdea(idea) {
  const short = String(idea).replace(/\s+/g, " ").trim();
  return short.length <= 60 ? `states that ${short}` : "states the required point";
}

// ---------------------------------------------------------------------------
// transformations: the checklist CXC prints
// ---------------------------------------------------------------------------

const TRANSFORMATIONS = ["reflection", "rotation", "translation", "enlargement"];

function transformationCriteria(answer, marks) {
  const canon = canonicalise(answer);
  const name = TRANSFORMATIONS.find(t => canon.includes(t));
  if (!name) return null;
  // "(x, y) maps to (y, -x)" is a rule, not a description; leave it alone.
  if (/maps to|->|→/.test(answer)) return null;

  const others = TRANSFORMATIONS.filter(t => t !== name);
  const ideas = [{
    description: `names the transformation as ${anArticle(name)} ${name}`,
    profile: "conceptual",
    check: { type: "prose", key: name, tokens: [name], mustHave: [name], forbid: others,
             polarity: "positive", quorum: 1 },
  }];

  const detail = answer.replace(new RegExp(`^\\s*an?\\s+${name}\\b[ ,]*`, "i"), "").trim();
  if (detail && detail.toLowerCase() !== name) {
    const check = transformationDetailCheck(detail);
    if (check) {
      ideas.push({
        description: describeTransformationDetail(name, detail),
        profile: "conceptual",
        check,
      });
    }
  }

  const share = distribute(marks, ideas.length);
  return ideas.map((idea, index) => ({
    kind: "B", code: `B${index + 1}`, marks: share[index], field: "answer", depends: [],
    profile: idea.profile, description: idea.description, check: idea.check,
  }));
}

/**
 * The judgement on the second half of a "describe fully" answer.
 *
 * A mark scheme habitually names the same thing twice, once in words and once
 * in symbols inside brackets: "in the x-axis (y = 0)", "90 degrees clockwise
 * (that is, -90)". The two spellings are alternatives an examiner accepts
 * either of, not two separate things a candidate has to write. Requiring both
 * is what made "reflection in the x axis" score two marks out of three.
 *
 * So the detail is split at its brackets, each piece becomes its own idea, and
 * matching any one of them earns the mark. Inside a single piece the ordinary
 * quorum applies, which is what still stops "in the line" on its own from
 * counting as a mirror line.
 */
function transformationDetailCheck(detail) {
  const groups = [];
  const outside = detail.replace(/\([^)]*\)/g, " ").trim();
  if (outside) groups.push(outside);
  for (const match of detail.matchAll(/\(([^)]*)\)/g)) {
    const inner = String(match[1] || "").trim();
    if (inner) groups.push(inner);
  }
  if (!groups.length) groups.push(detail);

  const options = groups
    .map(group => transformationDetailSpec(group))
    .filter(Boolean);
  if (!options.length) return null;
  if (options.length === 1) return options[0];
  return { type: "anyOf", options };
}

/** One spelling of the detail, judged on its own content words. */
function transformationDetailSpec(phrase) {
  const tokens = contentTokens(phrase);
  if (!tokens.length) return null;
  return {
    type: "prose",
    key: phrase,
    tokens,
    // A number in a mirror line, a vector or a scale factor is the detail
    // itself, so it is compulsory rather than merely supporting.
    mustHave: numbersAmong(tokens),
    forbid: [],
    polarity: "positive",
    quorum: tokens.length <= 3 ? 1 : 0.5,
  };
}

function describeTransformationDetail(name, detail) {
  if (name === "reflection") return `gives the mirror line (${trim(detail)})`;
  if (name === "rotation") return `gives the angle, direction and centre (${trim(detail)})`;
  if (name === "translation") return `gives the vector (${trim(detail)})`;
  return `gives the centre and scale factor (${trim(detail)})`;
}

function trim(s) {
  const t = String(s).replace(/\s+/g, " ").trim();
  return t.length <= 48 ? t : `${t.slice(0, 45)}...`;
}

function numbersAmong(tokens) {
  return tokens.filter(t => /^-?\d+(?:\.\d+)?$/.test(t));
}

function anArticle(word) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}
