// ============================================================================
// paper2Blueprints.js - the shape of the paper, as CXC publishes it.
//
// The engine used to hard-code ten questions, 100 marks, 160 minutes, split
// into "Section I" and "Section II". The mark and topic allocation was right
// for the paper in force to 2026; the section split was not, and had not been
// since the format changed. CSEC Mathematics Paper 02 is ten compulsory
// structured questions with no sections at all.
//
// From the examinations of May and June 2027 the paper changes again: nine
// compulsory questions, 90 marks, 2 hours 30 minutes, organised into three
// modules with fixed allocations, and the profile dimensions are renamed.
//
// Both shapes are described here so both can be practised. A student sitting
// in January 2027 needs the old paper and one sitting in May 2027 needs the
// new one, and for a year the app has to build either.
//
// Sources:
//   CSEC Mathematics syllabus with specimen papers (format in force to 2026)
//   CSEC Mathematics syllabus amended October 2025, effective May/June 2027
// ============================================================================

export const PAPER2_BLUEPRINTS = {
  /** The paper as examined up to and including January 2027. */
  "2018": {
    id: "2018",
    label: "CSEC Mathematics Paper 02 (examinations to January 2027)",
    note: "Ten compulsory structured questions, 100 marks, 2 hours 40 minutes.",
    durationSeconds: 160 * 60,
    questionCount: 10,
    totalMarks: 100,
    profiles: { conceptual: 0.3, algorithmic: 0.4, reasoning: 0.3 },
    profileLabels: {
      conceptual: "Knowledge",
      algorithmic: "Comprehension",
      reasoning: "Reasoning",
    },
    positions: [
      { n: 1, marks: 9, group: "number", topic: "Number theory, consumer arithmetic and computation" },
      { n: 2, marks: 9, group: "algebra", topic: "Algebra" },
      { n: 3, marks: 9, group: "geometry", topic: "Geometry and trigonometry" },
      { n: 4, marks: 9, group: "relations", topic: "Relations, functions and graphs" },
      { n: 5, marks: 9, group: "statistics", topic: "Statistics" },
      { n: 6, marks: 9, group: "measurement", topic: "Measurement" },
      { n: 7, marks: 10, group: "investigation", topic: "Investigation" },
      { n: 8, marks: 12, group: "relations", topic: "Relations, functions and graphs" },
      { n: 9, marks: 12, group: "geometry", topic: "Geometry and trigonometry" },
      { n: 10, marks: 12, group: "vectors", topic: "Vectors and matrices" },
    ],
    /** The syllabus allocation each topic group carries, in marks. */
    topicTargets: {
      number: 9, algebra: 10, geometry: 21, relations: 20,
      statistics: 9, measurement: 9, investigation: 10, vectors: 12,
    },
    topicTolerance: 1,
  },

  /** The paper as examined from May and June 2027. */
  "2027": {
    id: "2027",
    label: "CSEC Mathematics Paper 02 (examinations from May 2027)",
    note: "Nine compulsory structured questions, three from each module, "
      + "90 marks, 2 hours 30 minutes.",
    durationSeconds: 150 * 60,
    questionCount: 9,
    totalMarks: 90,
    profiles: { conceptual: 0.3, algorithmic: 0.4, reasoning: 0.3 },
    profileLabels: {
      conceptual: "Conceptual knowledge",
      algorithmic: "Algorithmic knowledge",
      reasoning: "Reasoning",
    },
    positions: [
      { n: 1, module: 1, marks: 9, group: "number", topic: "Consumer arithmetic, number theory and computation" },
      { n: 2, module: 1, marks: 12, group: "algebra", topic: "Graphs, sets, measurement and algebra 1" },
      { n: 3, module: 1, marks: 9, group: "investigation", topic: "Investigation" },
      { n: 4, module: 2, marks: 12, group: "relations", topic: "Algebra 2 and relations, functions and graphs 1" },
      { n: 5, module: 2, marks: 9, group: "geometry", topic: "Geometry and trigonometry 1" },
      { n: 6, module: 2, marks: 9, group: "statistics", topic: "Statistics 1 and vectors and matrices 1" },
      { n: 7, module: 3, marks: 9, group: "vectors", topic: "Vectors and matrices 2" },
      { n: 8, module: 3, marks: 12, group: "relations", topic: "Relations, functions and graphs 2 and statistics 2" },
      { n: 9, module: 3, marks: 9, group: "geometry", topic: "Geometry and trigonometry 2" },
    ],
    topicTargets: {
      number: 9, algebra: 12, investigation: 9, relations: 24,
      geometry: 18, statistics: 9, vectors: 9,
    },
    topicTolerance: 3,
    moduleTargets: { 1: 30, 2: 30, 3: 30 },
  },
};

export const DEFAULT_PAPER2_BLUEPRINT = "2018";

export function paper2Blueprint(id = DEFAULT_PAPER2_BLUEPRINT) {
  return PAPER2_BLUEPRINTS[id] || PAPER2_BLUEPRINTS[DEFAULT_PAPER2_BLUEPRINT];
}

/** The topic group a question position belongs to under a blueprint. */
export function topicGroupFor(blueprint, questionNumber) {
  const position = (blueprint.positions || []).find(p => p.n === questionNumber);
  return position ? position.group : null;
}

/**
 * Does an assembled paper match its blueprint?
 *
 * Checks the things that make a practice paper a fair rehearsal: the right
 * number of questions in the right order, the right total, part marks that sum
 * to their question, and a topic spread within a mark or so of the syllabus.
 * There is deliberately no check on sections, because the paper has none.
 */
export function validateAgainstBlueprint(exam, blueprintId = DEFAULT_PAPER2_BLUEPRINT) {
  const blueprint = paper2Blueprint(blueprintId);
  const questions = exam?.questions || [];
  const ids = questions.map(q => q.question_id);
  const positions = questions.map(q => q.question_number);
  const marks = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0);

  const partMarksOk = questions.every(q =>
    (q.parts || []).reduce((sum, p) => sum + Number(p.marks || 0), 0) === Number(q.marks));

  const byTopic = {};
  const byModule = {};
  for (const q of questions) {
    const position = (blueprint.positions || []).find(p => p.n === q.question_number);
    if (!position) continue;
    byTopic[position.group] = (byTopic[position.group] || 0) + Number(q.marks || 0);
    if (position.module) {
      byModule[position.module] = (byModule[position.module] || 0) + Number(q.marks || 0);
    }
  }

  const tolerance = blueprint.topicTolerance ?? 1;
  const topicsOk = Object.entries(blueprint.topicTargets || {})
    .every(([group, target]) => Math.abs((byTopic[group] || 0) - target) <= tolerance);
  const modulesOk = Object.entries(blueprint.moduleTargets || {})
    .every(([module, target]) => (byModule[module] || 0) === target);

  const valid = questions.length === blueprint.questionCount
    && new Set(ids).size === blueprint.questionCount
    && positions.every((n, i) => n === i + 1)
    && marks === blueprint.totalMarks
    && partMarksOk && topicsOk && modulesOk;

  return {
    valid, blueprint: blueprint.id, marks, partMarksOk, topicsOk, modulesOk,
    uniqueCount: new Set(ids).size, byTopic, byModule,
  };
}

/**
 * An indicative band, not a predicted grade.
 *
 * The function this replaces mapped a percentage straight onto a CXC grade.
 * Three things were wrong with that: CXC grades run I to VI, the boundaries
 * are set by standard setting after each sitting rather than published as
 * fixed percentages, and Paper 2 is half of the certificate, so a Paper 2
 * percentage is not a grade at all.
 */
export function indicativeBand(fraction) {
  const pc = (Number(fraction) || 0) * 100;
  if (pc >= 75) {
    return { band: "Strong", pc,
      note: "comfortably inside the range that has historically produced Grade I or II" };
  }
  if (pc >= 60) {
    return { band: "Secure", pc,
      note: "inside the range that has historically produced Grade II or III" };
  }
  if (pc >= 45) {
    return { band: "Developing", pc,
      note: "inside the range that has historically produced Grade III" };
  }
  if (pc >= 30) {
    return { band: "Emerging", pc,
      note: "below the range that has historically produced a Grade III pass" };
  }
  return { band: "Early", pc, note: "a lot of ground still to cover" };
}
