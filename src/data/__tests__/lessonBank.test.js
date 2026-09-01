// ============================================================================
// Done by: Odane Robinson
//
// Automated content QA for the question bank. Every check here corresponds
// to a REAL bug that was found by manual audit and fixed by hand - this
// suite exists so none of those bug classes can silently come back the
// next time someone edits the content (e.g. by regenerating variants or
// hand-editing a topic file) without a test failing.
//
// Bugs this suite specifically guards against:
//   - algebra.factor answers that are algebraically valid but not fully
//     factorised (e.g. "8(6x + 2)" instead of "16(3x + 1)") - 212 of 560
//     variants had this exact bug.
//   - "Inequalities" answers computed from different numbers than the ones
//     printed in the question (every single one of 20 had this bug).
//   - "Construction & Loci" answers that just echo the given number back
//     instead of actually answering "what geometric locus...?".
//   - "most popular category" questions with a genuine tie for the max,
//     where the answer silently picked only one winner.
// It also does general structural QA (every referenced diagram file
// exists, every question has the fields the UI depends on, every SVG is
// well-formed XML) that isn't tied to one specific historical bug but
// would have caught several of the diagram issues found this session.
// ============================================================================
import fs from "fs";
import path from "path";
import { Fraction } from "../../lib/fraction";

const PUBLIC_DIR = path.join(__dirname, "..", "..", "..", "public");
const QB_DIR = path.join(PUBLIC_DIR, "question-bank");

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const manifest = readJSON(path.join(QB_DIR, "manifest.json"));

function loadTopic(area, topic) {
  const areaEntry = manifest.areas.find(a => a.name === area);
  const topicEntry = areaEntry?.topics.find(t => t.name === topic);
  if (!topicEntry) throw new Error(`Topic not found in manifest: ${area} / ${topic}`);
  return readJSON(path.join(QB_DIR, "topics", topicEntry.file));
}

function allQuestions() {
  const out = [];
  for (const area of manifest.areas) {
    for (const topic of area.topics) {
      out.push(...loadTopic(area.name, topic.name).map(q => ({ ...q, __area: area.name, __topic: topic.name })));
    }
  }
  return out;
}

describe("question bank - structural integrity", () => {
  test("manifest total_questions matches the sum of every topic file's actual length", () => {
    let total = 0;
    for (const area of manifest.areas) {
      for (const topic of area.topics) {
        const qs = loadTopic(area.name, topic.name);
        expect(qs.length).toBe(topic.count); // per-topic count matches manifest
        total += qs.length;
      }
    }
    expect(total).toBe(manifest.total_questions);
  });

  test("every question has the fields the UI depends on", () => {
    for (const q of allQuestions()) {
      expect(typeof q.id).toBe("string");
      expect(q.id.length).toBeGreaterThan(0);
      expect(typeof q.question).toBe("string");
      expect(q.question.trim().length).toBeGreaterThan(0);
      expect(typeof q.answer).toBe("string");
      expect(q.answer.trim().length).toBeGreaterThan(0);
    }
  });

  test("every referenced diagram image file actually exists on disk", () => {
    const missing = [];
    for (const q of allQuestions()) {
      if (q.image) {
        const p = path.join(PUBLIC_DIR, q.image.replace(/^\//, ""));
        if (!fs.existsSync(p)) missing.push(q.image);
      }
    }
    expect(missing).toEqual([]);
  });

  test("question ids are unique across the whole bank", () => {
    const ids = allQuestions().map(q => q.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect([...new Set(dupes)]).toEqual([]);
  });
});

describe("public/cxc2025 diagrams - well-formed XML", () => {
  const dir = path.join(PUBLIC_DIR, "cxc2025");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".svg"));

  test("at least the expected diagrams are present", () => {
    expect(files.length).toBeGreaterThanOrEqual(12);
  });

  test.each(files)("%s parses as well-formed XML", (file) => {
    const xml = fs.readFileSync(path.join(dir, file), "utf8");
    const doc = new DOMParser().parseFromString(xml, "image/svg+xml");
    const parserError = doc.querySelector("parsererror");
    expect(parserError).toBeNull();
  });
});

describe("regression guard - algebra.factor must be FULLY factorised", () => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  test("every 'Factorise ax + b' style answer has no remaining common factor", () => {
    const bad = [];
    for (const q of allQuestions()) {
      const qm = q.question.match(/^Factorise\s+(-?\d+)x\s*([+-])\s*(\d+)\.$/);
      if (!qm) continue;
      const a = parseInt(qm[1], 10);
      const b = (qm[2] === "+" ? 1 : -1) * parseInt(qm[3], 10);

      const am = q.answer.match(/^(-?\d+)\((-?\d*)x\s*([+-])\s*(\d+)\)$/);
      if (!am) { bad.push({ id: q.id, reason: "answer doesn't match expected factored form", q }); continue; }
      const g = parseInt(am[1], 10);
      const innerA = am[2] === "" ? 1 : am[2] === "-" ? -1 : parseInt(am[2], 10);
      const innerB = (am[3] === "+" ? 1 : -1) * parseInt(am[4], 10);

      const algebraicallyValid = g * innerA === a && g * innerB === b;
      const fullyFactored = gcd(Math.abs(innerA), Math.abs(innerB)) === 1;
      if (!algebraicallyValid || !fullyFactored) {
        bad.push({ id: q.id, question: q.question, answer: q.answer });
      }
    }
    expect(bad).toEqual([]);
  });
});

describe("regression guard - Inequalities answers match the printed equation", () => {
  test("every 'Solve ax < c' / 'Solve ax > c' answer is the correct boundary", () => {
    const bad = [];
    for (const q of allQuestions()) {
      const qm = q.question.match(/^Solve (\d+)x ([<>]) (\d+)\.$/);
      if (!qm) continue;
      const a = parseInt(qm[1], 10);
      const op = qm[2];
      const c = parseInt(qm[3], 10);
      const correct = new Fraction(c, a);

      const am = q.answer.match(/^x ([<>]) (-?\d+(?:\/\d+)?)$/);
      if (!am || am[1] !== op) { bad.push({ id: q.id, question: q.question, answer: q.answer }); continue; }
      const given = Fraction.parse(am[2]);
      if (!given.equals(correct)) bad.push({ id: q.id, question: q.question, answer: q.answer });
    }
    expect(bad).toEqual([]);
  });
});

describe("regression guard - Construction & Loci answers actually answer the question", () => {
  test("'what geometric locus...' answers describe a shape, not just the given number", () => {
    const bad = [];
    for (const q of allQuestions()) {
      if (!/What geometric locus describes all possible positions\?$/.test(q.question)) continue;
      // A bare number/unit answer (e.g. "5 units") doesn't answer "what
      // shape is this" - a real answer must contain a locus word.
      const describesShape = /circle|line|perpendicular|bisector|arc|locus/i.test(q.answer);
      if (!describesShape) bad.push({ id: q.id, question: q.question, answer: q.answer });
    }
    expect(bad).toEqual([]);
  });
});

describe("regression guard - 'most popular category' answers respect genuine ties", () => {
  test("when two+ categories share the max frequency, the answer names all of them", () => {
    const bad = [];
    for (const q of allQuestions()) {
      const qm = q.question.match(/^Four categories have frequencies \[([\d, ]+)\]\. Which category is most popular\?$/);
      if (!qm) continue;
      const freqs = qm[1].split(",").map(s => parseInt(s.trim(), 10));
      const max = Math.max(...freqs);
      const winners = freqs.reduce((acc, f, i) => (f === max ? [...acc, i + 1] : acc), []);
      if (winners.length > 1) {
        const allNamed = winners.every(w => q.answer.includes(`Category ${w}`));
        if (!allNamed) bad.push({ id: q.id, question: q.question, answer: q.answer, expectedWinners: winners });
      }
    }
    expect(bad).toEqual([]);
  });
});
