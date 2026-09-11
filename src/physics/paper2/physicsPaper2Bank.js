import paper1 from "./data/spark-phy-p02-practice-1.json";
import paper2 from "./data/spark-phy-p02-practice-2.json";
import paper3 from "./data/spark-phy-p02-practice-3.json";
import paper4 from "./data/spark-phy-p02-practice-4.json";

export const PHYSICS_PAPER2_BANK_VERSION = 1;
export const PHYSICS_PAPER2_DURATION_MINUTES = 150;
export const PHYSICS_PAPER2_MARKS = 100;

export const PHYSICS_PAPER2_PAPERS = Object.freeze([paper1, paper2, paper3, paper4]);

export function getPhysicsPaper2Paper(paperId) {
  return PHYSICS_PAPER2_PAPERS.find(paper => paper.paper_id === paperId) || null;
}

export function physicsPaper2PaperNumber(paper) {
  const match = String(paper?.paper_id || "").match(/practice-(\d+)$/i);
  return match ? Number(match[1]) : null;
}

export function physicsPaper2PaperLetter(paperOrNumber) {
  const number = typeof paperOrNumber === "number" ? paperOrNumber : physicsPaper2PaperNumber(paperOrNumber);
  return Number.isInteger(number) && number >= 1 && number <= 26 ? String.fromCharCode(64 + number) : "";
}

export function physicsPaper2PaperName(paperOrNumber) {
  const letter = physicsPaper2PaperLetter(paperOrNumber);
  return letter ? `Practice Paper ${letter}` : "Practice Paper";
}

export function physicsPaper2Topics(paper) {
  return (paper?.questions || []).map(question => question.topic).filter(Boolean);
}

export function physicsPaper2PartKey(questionId, partId) {
  return `${questionId}::${partId}`;
}

export function physicsPaper2Criteria(paper) {
  return (paper?.questions || []).flatMap(question => (question.parts || []).flatMap(part =>
    (part.criteria || []).map(criterion => ({ question, part, criterion }))
  ));
}

export function physicsPaper2MarkingCoverage(paper) {
  const criteria = physicsPaper2Criteria(paper);
  const totalMarks = criteria.reduce((sum, row) => sum + Number(row.criterion?.marks || 0), 0);
  const authoredManualMarks = criteria.reduce((sum, row) => sum + (!row.criterion?.check ? Number(row.criterion.marks || 0) : 0), 0);
  // Every criterion is now evaluated by SPARK on submission. `manual: true` in
  // the authored paper still records that the source mark scheme needs human
  // judgement on paper, but it no longer creates a student self-marking step.
  return { autoMarks: totalMarks, manualMarks: 0, totalMarks, authoredManualMarks };
}

export function validatePhysicsPaper2Paper(paper) {
  const errors = [];
  if (!paper || typeof paper !== "object") return ["Paper is missing."];
  if (paper.subject !== "Physics") errors.push("Subject must be Physics.");
  if (paper.duration_minutes !== PHYSICS_PAPER2_DURATION_MINUTES) errors.push("Duration must be 150 minutes.");
  if (paper.marks !== PHYSICS_PAPER2_MARKS) errors.push("Paper must total 100 marks.");
  if ((paper.questions || []).length !== 6) errors.push("Paper must contain six questions.");

  const ids = new Set();
  let paperMarks = 0;
  for (const question of paper.questions || []) {
    const partMarks = (question.parts || []).reduce((sum, part) => sum + Number(part.marks || 0), 0);
    paperMarks += Number(question.marks || 0);
    if (partMarks !== Number(question.marks || 0)) errors.push(`Question ${question.question_number} parts total ${partMarks}, expected ${question.marks}.`);
    const profileMarks = ["KC", "UK", "XS"].reduce((sum, key) => sum + Number(question.profile?.[key] || 0), 0);
    if (profileMarks !== Number(question.marks || 0)) errors.push(`Question ${question.question_number} profile totals ${profileMarks}, expected ${question.marks}.`);
    for (const part of question.parts || []) {
      const key = physicsPaper2PartKey(question.question_id, part.id);
      if (ids.has(key)) errors.push(`Duplicate part id ${key}.`);
      ids.add(key);
      const criterionMarks = (part.criteria || []).reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
      if (criterionMarks !== Number(part.marks || 0)) errors.push(`${key} criteria total ${criterionMarks}, expected ${part.marks}.`);
    }
    if (question.diagram?.svg) {
      if (/\bid\s*=\s*["']/i.test(question.diagram.svg)) errors.push(`Question ${question.question_number} diagram contains an id attribute.`);
      if (/marker-(start|mid|end)\s*=/i.test(question.diagram.svg)) errors.push(`Question ${question.question_number} diagram contains an SVG marker reference.`);
      if (!/currentColor/.test(question.diagram.svg)) errors.push(`Question ${question.question_number} diagram does not inherit currentColor.`);
      if (!question.diagram.alt) errors.push(`Question ${question.question_number} diagram is missing alt text.`);
    }
  }
  if (paperMarks !== PHYSICS_PAPER2_MARKS) errors.push(`Question marks total ${paperMarks}, expected 100.`);
  return errors;
}

export function validatePhysicsPaper2Bank(papers = PHYSICS_PAPER2_PAPERS) {
  return papers.flatMap(paper => validatePhysicsPaper2Paper(paper).map(error => `${paper.paper_id}: ${error}`));
}

export const PHYSICS_PAPER2_ACTIVE_KEY_PREFIX = "spark-physics-paper2-active-v1";
export const PHYSICS_PAPER2_RESULTS_KEY_PREFIX = "spark-physics-paper2-results-v1";

function userStorageKey(prefix, userId) {
  return `${prefix}:${String(userId || "guest")}`;
}

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function readPhysicsPaper2Active(userId) {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return readJson(userStorageKey(PHYSICS_PAPER2_ACTIVE_KEY_PREFIX, userId), null);
}

export function savePhysicsPaper2Active(userId, value) {
  if (typeof window === "undefined" || !window.localStorage) return;
  const key = userStorageKey(PHYSICS_PAPER2_ACTIVE_KEY_PREFIX, userId);
  if (value == null) window.localStorage.removeItem(key);
  else window.localStorage.setItem(key, JSON.stringify(value));
}

export function readPhysicsPaper2Results(userId) {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const rows = readJson(userStorageKey(PHYSICS_PAPER2_RESULTS_KEY_PREFIX, userId), []);
  return Array.isArray(rows) ? rows : [];
}

export function savePhysicsPaper2Result(userId, result) {
  if (typeof window === "undefined" || !window.localStorage || !result) return [];
  const key = userStorageKey(PHYSICS_PAPER2_RESULTS_KEY_PREFIX, userId);
  const previous = readPhysicsPaper2Results(userId).filter(row => row?.id !== result.id);
  const next = [result, ...previous].slice(0, 20);
  window.localStorage.setItem(key, JSON.stringify(next));
  return next;
}
