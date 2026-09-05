// ============================================================================
// reasoning.js - marking sentences.
//
// "Describe FULLY the transformation", "Give a reason for your answer",
// "State the type of correlation", "Explain why the median is a better
// average here."  These carry real marks in CSEC and are the parts most
// online systems quietly drop.
//
// They are markable because CXC's own scheme is a checklist, not an essay
// judgement.  "Describe fully" a rotation is three separate marks: the word
// rotation, the angle and direction, the centre.  Miss the centre and you lose
// one mark - which is exactly what this file does.
//
// Spelling is forgiven (a candidate who writes "reflexion" knows what a
// reflection is), synonyms are accepted, and anything the checklist cannot
// settle is handed to the student to self-mark against the scheme rather than
// being marked wrong by silence.
// ============================================================================

const SYNONYMS = [
  ["rotation", "rotate", "rotated", "turn", "turned", "rotaton", "roatation"],
  ["reflection", "reflect", "reflected", "reflexion", "mirror", "refelction"],
  ["translation", "translate", "translated", "shift", "shifted", "slide", "slid"],
  ["enlargement", "enlarge", "enlarged", "dilation", "scale factor", "stretched"],
  ["clockwise", "cw"],
  ["anticlockwise", "anti-clockwise", "counterclockwise", "counter-clockwise", "acw", "ccw"],
  ["centre", "center", "about the point", "about"],
  ["positive", "direct"],
  ["negative", "inverse", "indirect"],
  ["correlation", "relationship", "association"],
  ["median", "middle value"],
  ["mean", "average"],
  ["outlier", "extreme value", "extreme values", "anomaly"],
  ["congruent", "congruency", "identical"],
  ["similar", "similarity", "same shape"],
  ["parallel", "same gradient", "same slope"],
  ["perpendicular", "at right angles", "right angle", "90"],
  ["increase", "increases", "increasing", "rises", "rise", "grows", "goes up"],
  ["decrease", "decreases", "decreasing", "falls", "fall", "drops", "goes down"],
  ["because", "since", "as", "so", "therefore", "hence"],
  ["skewed", "skew", "not symmetrical", "asymmetric"],
  ["angle in a semicircle", "angle in semi circle", "angle in a semi-circle"],
  ["alternate", "alternate angles", "z angles"],
  ["corresponding", "corresponding angles", "f angles"],
  ["cyclic quadrilateral", "opposite angles in a cyclic quadrilateral"],
  ["tangent", "tangent to the circle"],
  ["radius", "radii"],
];

const CANONICAL = new Map();
SYNONYMS.forEach(group => group.forEach(w => CANONICAL.set(w, group[0])));

function tidy(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/°/g, " degrees ")
    .replace(/[^a-z0-9\-.,()/ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Rewrite every synonym to one canonical word, longest phrase first. */
export function canonicalise(s) {
  let t = ` ${tidy(s)} `;
  const phrases = [...CANONICAL.keys()].sort((a, b) => b.length - a.length);
  for (const p of phrases) {
    const canon = CANONICAL.get(p);
    if (p === canon) continue;
    t = t.split(` ${p} `).join(` ${canon} `);
  }
  return t.trim();
}

/** Edit distance, capped - only used to forgive a typo, never a wrong word. */
function editDistance(a, b, cap = 2) {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
      best = Math.min(best, row[j]);
    }
    if (best > cap) return cap + 1;
    prev = row;
  }
  return prev[b.length];
}

/** Does the answer contain this word or phrase, allowing a spelling slip? */
export function mentions(answer, phrase) {
  const text = canonicalise(answer);
  const want = canonicalise(phrase);
  if (!want) return false;
  if (text.includes(want)) return true;
  if (want.includes(" ")) return false;
  const cap = want.length <= 4 ? 0 : want.length <= 7 ? 1 : 2;
  if (!cap) return false;
  return text.split(" ").some(w => editDistance(w, want, cap) <= cap);
}

/** Every number in the answer, so "90" and "(0, 0)" can be checked. */
export function numbers(answer) {
  return (String(answer).match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
}

/**
 * Mark a written answer against a checklist.
 *
 * concepts: [{
 *   id, marks, description,
 *   any:  ["rotation"],              // at least one of these must appear
 *   all:  ["clockwise", "90"],       // every one of these must appear
 *   none: ["reflection"],            // none of these may appear
 *   numbers: [90],                   // these values must be written
 *   pair: [0, 0],                    // this coordinate pair must appear
 * }]
 */
export function markWritten(answer, concepts = [], { partial = true } = {}) {
  const text = String(answer ?? "").trim();
  const lines = concepts.map((c, i) => {
    const marks = c.marks ?? 1;
    const code = c.code || `B${i + 1}`;
    if (!text) {
      return { id: c.id, code, marks: 0, of: marks, awarded: false,
               description: c.description, why: "nothing written" };
    }
    const anyOk = !c.any || c.any.some(p => mentions(text, p));
    const allOk = !c.all || c.all.every(p => mentions(text, p));
    const noneOk = !c.none || !c.none.some(p => mentions(text, p));
    const nums = numbers(text);
    const numsOk = !c.numbers || c.numbers.every(n =>
      nums.some(g => Math.abs(g - n) < 1e-6));
    const pairOk = !c.pair || hasPair(text, c.pair);
    const awarded = anyOk && allOk && noneOk && numsOk && pairOk;
    return {
      id: c.id, code, marks: awarded ? marks : 0, of: marks, awarded,
      description: c.description,
      why: awarded ? "correct"
        : !noneOk ? "the answer names the wrong transformation"
          : !anyOk ? `the answer does not say ${describe(c.any)}`
            : !allOk ? `the answer is missing ${describe(c.all.filter(p => !mentions(text, p)))}`
              : !numsOk ? "the value required is not stated"
                : "the point required is not stated",
    };
  });
  const marks = lines.reduce((s, l) => s + l.marks, 0);
  const of = lines.reduce((s, l) => s + l.of, 0);
  return {
    marks: partial ? marks : (marks === of ? of : 0),
    of,
    criteria: lines,
    complete: marks === of,
    feedback: writtenFeedback(lines, marks, of),
  };
}

function hasPair(text, pair) {
  const t = tidy(text);
  const m = t.match(/\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g) || [];
  return m.some(g => {
    const n = (g.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    return n.length === 2 && n[0] === pair[0] && n[1] === pair[1];
  });
}

function describe(list = []) {
  const words = list.map(w => `"${w}"`);
  if (words.length <= 1) return words[0] || "the required word";
  return `${words.slice(0, -1).join(", ")} or ${words[words.length - 1]}`;
}

function writtenFeedback(lines, marks, of) {
  if (marks === of) return "Full marks.";
  const missing = lines.filter(l => !l.awarded);
  const got = lines.filter(l => l.awarded);
  const head = got.length
    ? `${marks} of ${of}: you have ${got.map(l => l.description).join(" and ")}.`
    : `0 of ${of}.`;
  return `${head} Still needed: ${missing.map(l => l.description).join("; ")}.`;
}

// ---------------------------------------------------------------------------
// ready-made checklists for the phrases CSEC repeats
// ---------------------------------------------------------------------------

export const RUBRICS = {
  /** "Describe fully the transformation..." - the classic three-mark answer. */
  rotation: ({ angle, direction, centre }) => [
    { id: "name", marks: 1, description: "names the transformation as a rotation",
      any: ["rotation"], none: ["reflection", "translation", "enlargement"] },
    { id: "angle", marks: 1, description: `states ${angle}° ${direction}`,
      numbers: [angle], any: [direction] },
    { id: "centre", marks: 1, description: `states the centre (${centre[0]}, ${centre[1]})`,
      any: ["centre"], pair: centre },
  ],
  reflection: ({ mirror }) => [
    { id: "name", marks: 1, description: "names the transformation as a reflection",
      any: ["reflection"], none: ["rotation", "translation", "enlargement"] },
    { id: "mirror", marks: 1, description: `states the mirror line ${mirror}`,
      all: [mirror] },
  ],
  translation: ({ x, y }) => [
    { id: "name", marks: 1, description: "names the transformation as a translation",
      any: ["translation"], none: ["rotation", "reflection", "enlargement"] },
    { id: "vector", marks: 1, description: `states the vector (${x}, ${y})`,
      numbers: [x, y] },
  ],
  enlargement: ({ factor, centre }) => [
    { id: "name", marks: 1, description: "names the transformation as an enlargement",
      any: ["enlargement"], none: ["rotation", "reflection", "translation"] },
    { id: "factor", marks: 1, description: `states the scale factor ${factor}`,
      numbers: [factor] },
    { id: "centre", marks: 1, description: `states the centre (${centre[0]}, ${centre[1]})`,
      any: ["centre"], pair: centre },
  ],
  correlation: ({ kind, strength = null }) => [
    { id: "kind", marks: 1, description: `states ${kind} correlation`,
      all: [kind, "correlation"] },
    ...(strength ? [{ id: "strength", marks: 1,
      description: `describes it as ${strength}`, any: [strength] }] : []),
  ],
  circleTheorem: ({ theorem }) => [
    { id: "reason", marks: 1, description: `gives the reason: ${theorem}`,
      any: [theorem] },
  ],
};

// ---------------------------------------------------------------------------
// the honest fallback
// ---------------------------------------------------------------------------

/**
 * Some answers a checklist genuinely cannot settle - "explain why the company
 * should choose plan B".  Rather than mark them wrong, hand the student the
 * mark scheme and ask them to mark themselves, and flag it for the teacher.
 *
 * Self-marking against a visible scheme is a real revision technique, not a
 * cop-out: it is what a candidate does with a past paper and a mark scheme.
 */
export function selfMark(answer, scheme) {
  return {
    needsSelfMark: true,
    marks: 0,
    of: scheme.marks ?? 1,
    answer: String(answer ?? ""),
    modelAnswer: scheme.modelAnswer,
    points: scheme.points || [],
    instruction: "Compare your answer with the mark scheme and award yourself "
      + "a mark for each point you made. Your teacher can review this.",
  };
}

/** Apply the student's own self-award, bounded by the scheme. */
export function applySelfMark(result, claimed) {
  const marks = Math.max(0, Math.min(Number(claimed) || 0, result.of));
  return { ...result, marks, needsSelfMark: false, selfMarked: true,
           flaggedForReview: marks === result.of };
}
