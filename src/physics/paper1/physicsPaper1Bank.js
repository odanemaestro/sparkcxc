import paper1 from "./data/spark-phy-p01-practice-1.json";
import paper2 from "./data/spark-phy-p01-practice-2.json";
import paper3 from "./data/spark-phy-p01-practice-3.json";
import paper4 from "./data/spark-phy-p01-practice-4.json";
import paper5 from "./data/spark-phy-p01-practice-5.json";
import paper6 from "./data/spark-phy-p01-practice-6.json";
import paper7 from "./data/spark-phy-p01-practice-7.json";
import paper8 from "./data/spark-phy-p01-practice-8.json";
import paper9 from "./data/spark-phy-p01-practice-9.json";

export const PHYSICS_PAPER1_BANK_VERSION = 2;
export const PHYSICS_PAPER1_DURATION_MINUTES = 75;
export const PHYSICS_PAPER1_MARKS = 60;
export const PHYSICS_PAPER1_PAPERS = Object.freeze([paper1, paper2, paper3, paper4, paper5, paper6, paper7, paper8, paper9]);

export function getPhysicsPaper1Paper(paperId) {
  return PHYSICS_PAPER1_PAPERS.find(paper => paper.bank_id === paperId) || null;
}

export function physicsPaper1PaperNumber(paper) {
  const match = String(paper?.bank_id || "").match(/practice-(\d+)$/i);
  return match ? Number(match[1]) : null;
}

export function physicsPaper1PaperLetter(paperOrNumber) {
  const number = typeof paperOrNumber === "number" ? paperOrNumber : physicsPaper1PaperNumber(paperOrNumber);
  return Number.isInteger(number) && number >= 1 && number <= 26 ? String.fromCharCode(64 + number) : "";
}

export function physicsPaper1PaperName(paperOrNumber) {
  const letter = physicsPaper1PaperLetter(paperOrNumber);
  return letter ? `Practice Paper ${letter}` : "Practice Paper";
}

export function physicsPaper1AnswerKey(paper) {
  return Object.fromEntries((paper?.items || []).map(item => [item.item_id, item.answer]));
}

export function gradePhysicsPaper1(paper, answers = {}) {
  const items = (paper?.items || []).map(item => {
    const selected = String(answers[item.item_id] || "").trim().toUpperCase();
    const correct = selected === item.answer;
    return { item, selected, correct, answered: Boolean(selected) };
  });
  const score = items.filter(row => row.correct).length;
  const answeredCount = items.filter(row => row.answered).length;
  const of = items.length;
  const sections = ["A", "B", "C", "D", "E"].map(section => {
    const rows = items.filter(row => row.item.section === section);
    const earned = rows.filter(row => row.correct).length;
    return {
      section,
      sectionName: rows[0]?.item?.section_name || section,
      earned,
      of: rows.length,
      percent: rows.length ? Math.round(earned / rows.length * 100) : 0,
    };
  });
  return {
    score,
    of,
    percent: of ? Math.round(score / of * 100) : 0,
    answeredCount,
    unansweredCount: Math.max(0, of - answeredCount),
    items,
    sections,
  };
}

export function validatePhysicsPaper1Paper(paper) {
  const errors = [];
  if (!paper || typeof paper !== "object") return ["Paper is missing."];
  if (paper.subject !== "Physics") errors.push("Subject must be Physics.");
  if (paper.duration_minutes !== PHYSICS_PAPER1_DURATION_MINUTES) errors.push("Duration must be 75 minutes.");
  if (paper.item_count !== PHYSICS_PAPER1_MARKS) errors.push("Paper must contain 60 items.");
  if ((paper.items || []).length !== PHYSICS_PAPER1_MARKS) errors.push("Paper must contain 60 items.");

  const expectedSpread = { A: 17, B: 8, C: 9, D: 19, E: 7 };
  const spread = {};
  const ids = new Set();
  let kc = 0;
  let uk = 0;
  for (const [index, item] of (paper.items || []).entries()) {
    if (item.position !== index + 1) errors.push(`Item position ${item.position} is out of sequence.`);
    if (!item.item_id || ids.has(item.item_id)) errors.push(`Duplicate or missing item id at position ${item.position}.`);
    ids.add(item.item_id);
    spread[item.section] = (spread[item.section] || 0) + 1;
    if (item.profile === "KC") kc += 1;
    if (item.profile === "UK") uk += 1;
    const options = item.options || [];
    if (options.length !== 4 || options.map(option => option.key).join("") !== "ABCD") errors.push(`Item ${item.position} must have A to D options.`);
    const correct = options.filter(option => option.is_correct);
    if (correct.length !== 1 || correct[0]?.key !== item.answer) errors.push(`Item ${item.position} answer key does not match its marked option.`);
    if (paper.answer_key?.[String(item.position)] !== item.answer) errors.push(`Item ${item.position} does not match the paper answer key.`);
    if (!item.solution?.steps?.length || item.solution.answer_line !== correct[0]?.text) errors.push(`Item ${item.position} has an incomplete solution.`);
    for (const option of options.filter(option => !option.is_correct)) if (!option.misconception?.label) errors.push(`Item ${item.position}${option.key} is missing misconception feedback.`);
    if (item.stimulus?.svg) {
      if (/\bid\s*=\s*["']/i.test(item.stimulus.svg)) errors.push(`Item ${item.position} figure contains an SVG id.`);
      if (/marker-(start|mid|end)\s*=/i.test(item.stimulus.svg)) errors.push(`Item ${item.position} figure contains an SVG marker.`);
      if (!/currentColor/.test(item.stimulus.svg)) errors.push(`Item ${item.position} figure does not inherit currentColor.`);
      if (!item.stimulus.alt) errors.push(`Item ${item.position} figure is missing alt text.`);
    }
  }
  for (const [section, expected] of Object.entries(expectedSpread)) if ((spread[section] || 0) !== expected) errors.push(`Section ${section} has ${spread[section] || 0} items, expected ${expected}.`);
  if (kc !== 50 || uk !== 10) errors.push(`Profile split is KC ${kc}, UK ${uk}, expected KC 50, UK 10.`);
  return errors;
}

export function validatePhysicsPaper1Bank(papers = PHYSICS_PAPER1_PAPERS) {
  const errors = papers.flatMap(paper => validatePhysicsPaper1Paper(paper).map(error => `${paper.bank_id}: ${error}`));
  const stems = new Map();
  for (const paper of papers) for (const item of paper.items || []) {
    const key = String(item.stem || "").trim().toLowerCase().replace(/\s+/g, " ");
    stems.set(key, [...(stems.get(key) || []), `${paper.bank_id}#${item.position}`]);
  }
  for (const [stem, refs] of stems) if (stem && refs.length > 1) errors.push(`Repeated stem across papers: ${refs.join(", ")}.`);
  return errors;
}

export const PHYSICS_PAPER1_ACTIVE_KEY_PREFIX = "spark-physics-paper1-active-v1";
export const PHYSICS_PAPER1_RESULTS_KEY_PREFIX = "spark-physics-paper1-results-v1";

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

export function readPhysicsPaper1Active(userId) {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return readJson(userStorageKey(PHYSICS_PAPER1_ACTIVE_KEY_PREFIX, userId), null);
}

export function savePhysicsPaper1Active(userId, value) {
  if (typeof window === "undefined" || !window.localStorage) return;
  const key = userStorageKey(PHYSICS_PAPER1_ACTIVE_KEY_PREFIX, userId);
  if (value == null) window.localStorage.removeItem(key);
  else window.localStorage.setItem(key, JSON.stringify(value));
}

export function readPhysicsPaper1Results(userId) {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const rows = readJson(userStorageKey(PHYSICS_PAPER1_RESULTS_KEY_PREFIX, userId), []);
  return Array.isArray(rows) ? rows : [];
}

export function savePhysicsPaper1Result(userId, result) {
  if (typeof window === "undefined" || !window.localStorage || !result) return [];
  const key = userStorageKey(PHYSICS_PAPER1_RESULTS_KEY_PREFIX, userId);
  const previous = readPhysicsPaper1Results(userId).filter(row => row?.id !== result.id);
  const next = [result, ...previous].slice(0, 20);
  window.localStorage.setItem(key, JSON.stringify(next));
  return next;
}
