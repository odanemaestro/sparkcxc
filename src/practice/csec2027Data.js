import paperA from "./data/csec2027/csec-p2027-practice-A.json";
import paperB from "./data/csec2027/csec-p2027-practice-B.json";
import paperC from "./data/csec2027/csec-p2027-practice-C.json";
import paperD from "./data/csec2027/csec-p2027-practice-D.json";

export const CSEC_2027_MODULE_DURATION_SECONDS = 50 * 60;
export const CSEC_2027_FULL_DURATION_SECONDS = 150 * 60;
export const CSEC_2027_MODULE_MARKS = 30;
export const CSEC_2027_FULL_MARKS = 90;
export const CSEC_2027_MODULE_QUESTIONS = 3;
export const CSEC_2027_FULL_QUESTIONS = 9;
export const CSEC_2027_RESULTS_KEY = "spark-csec-2027-results-v2";
export const CSEC_2027_LEGACY_RESULTS_KEY = "spark-csec-2027-module1-results-v1";

export const CSEC_2027_MODULES = {
  1: {
    module: 1,
    key: "module1",
    shortTitle: "Fundamentals",
    title: "Module 1 - Fundamentals of Secondary-Level Mathematics",
    description: "Computation, consumer arithmetic, the compulsory investigation, algebra, sets and measurement.",
    questionNumbers: [1, 2, 3],
  },
  2: {
    module: 2,
    key: "module2",
    shortTitle: "Intermediate",
    title: "Module 2 - Intermediate Secondary-Level Mathematics",
    description: "Statistics, matrices, geometric construction, trigonometry, coordinate geometry, functions and graphs.",
    questionNumbers: [4, 5, 6],
  },
  3: {
    module: 3,
    key: "module3",
    shortTitle: "Higher Concepts",
    title: "Module 3 - Higher Concepts in Secondary-Level Mathematics",
    description: "Vectors and matrices, circle theorems, bearings, cumulative frequency and travel graphs.",
    questionNumbers: [7, 8, 9],
  },
};

export const CSEC_2027_PRACTICE_MODES = [
  { key: "module1", label: "Module 1", subtitle: "Fundamentals", questions: 3, marks: 30, durationMinutes: 50, module: 1 },
  { key: "module2", label: "Module 2", subtitle: "Intermediate", questions: 3, marks: 30, durationMinutes: 50, module: 2 },
  { key: "module3", label: "Module 3", subtitle: "Higher Concepts", questions: 3, marks: 30, durationMinutes: 50, module: 3 },
  { key: "full", label: "Full Paper 2", subtitle: "Modules 1–3", questions: 9, marks: 90, durationMinutes: 150, module: null },
];

function answerTypeForCell(spec = {}) {
  if (spec.type === "expression") return "expression";
  if (spec.type === "text") return "text";
  return undefined;
}

function normaliseTablePart(part) {
  const cells = part.table?.cells || {};
  const profileQueue = constructionProfiles(part);
  let profileIndex = 0;
  const rows = (part.table?.rows || []).map(row => row.map(cell => {
    if (!cell || typeof cell !== "object" || Array.isArray(cell) || !cell.key) return cell;
    const spec = cells[cell.key] || {};
    const marks = Number(spec.marks || 0);
    const profile = marks > 0 ? profileQueue[profileIndex] : undefined;
    profileIndex += Math.max(0, marks);
    return {
      key: cell.key,
      answer: spec.value,
      answerType: answerTypeForCell(spec),
      accepted: Array.isArray(spec.any) ? spec.any : [],
      tolerance: spec.tolerance,
      marks,
      profile,
      required: Boolean(cells[cell.key]),
      description: spec.description,
      placeholder: "?",
      label: spec.description || `Table entry ${cell.key}`,
    };
  }));
  return {
    ...part,
    responseSchema: {
      type: "table",
      caption: part.table?.caption,
      headers: part.table?.headers || [],
      rows,
      explicitCellMarks: true,
      profile: part.profile || {},
    },
  };
}

function constructionProfiles(part) {
  const profile = part.profile || {};
  const ordered = [];
  Object.entries(profile).forEach(([name, marks]) => {
    for (let i = 0; i < Number(marks || 0); i += 1) ordered.push(name);
  });
  return ordered;
}

function normaliseConstructionPart(part) {
  return {
    ...part,
    responseSchema: {
      type: "construction",
      pad: part.pad || {},
      construction: { ...(part.construction || {}), marks: Number(part.marks || 0) },
      allowedTools: ["segment", "circle"],
      toolPolicy: "ruler_compasses_only",
      criterionProfiles: constructionProfiles(part),
      profile: part.profile || {},
    },
  };
}

function graphCriteria(part) {
  const spec = part.graph || {};
  const profile = part.profile || {};
  const pointMarks = Number(spec.pointMarks || 0);
  const curveMarks = Number(spec.curveMarks || 0);
  const criteria = [];
  if (pointMarks > 0) {
    criteria.push({
      kind: "graph_points",
      marks: pointMarks,
      points: (spec.points || []).map(point => [Number(point.x), Number(point.y)]),
      tolerance: spec.tolerance,
      proportional: true,
      profile: Number(profile.AK || 0) >= pointMarks ? "AK" : Object.keys(profile)[0],
      label: "Plots the required points accurately",
    });
  }
  if (curveMarks > 0) {
    criteria.push({
      kind: "graph_curve",
      marks: curveMarks,
      minimumPoints: Math.max(2, (spec.points || []).length),
      referencePoints: (spec.points || []).map(point => [Number(point.x), Number(point.y)]),
      tolerance: spec.tolerance,
      increasing: (spec.points || []).every((point, index, list) => index === 0 || Number(point.y) >= Number(list[index - 1].y)),
      profile: Number(profile.CK || 0) >= curveMarks ? "CK" : Object.keys(profile).find(key => key !== "AK") || "CK",
      label: "Joins the plotted points with the required smooth curve",
    });
  }
  return criteria;
}

function normaliseGraphPart(part) {
  const grid = part.grid || {};
  const minorPerStep = Math.max(1, Number(grid.minorPerStep || 1));
  return {
    ...part,
    responseSchema: {
      type: "graph",
      graph: {
        ...grid,
        mode: "curve",
        snapX: Number(grid.xStep || 1) / minorPerStep,
        snapY: Number(grid.yStep || 1) / minorPerStep,
      },
      criteria: graphCriteria(part),
      sourceCurve: part.graph?.curve || null,
      profile: part.profile || {},
    },
  };
}

function normaliseWrittenPart(part) {
  return {
    ...part,
    responseSchema: {
      type: "written",
      rubric: part.rubric || [],
      profile: part.profile || {},
    },
  };
}

function normalisePart(part) {
  if (part?.responseType === "table" && part?.table) return normaliseTablePart(part);
  if (part?.responseType === "construction") return normaliseConstructionPart(part);
  if (part?.responseType === "graph") return normaliseGraphPart(part);
  if (part?.responseType === "written") return normaliseWrittenPart(part);
  return part;
}

function normaliseQuestion(question) {
  return {
    ...question,
    parts: (question.parts || []).map(normalisePart),
  };
}

function normaliseSourcePaper(raw, letter) {
  return {
    ...raw,
    letter,
    sourcePaperId: raw.paper_id,
    questions: (raw.questions || []).map(normaliseQuestion),
  };
}

const SOURCE_PAPERS = [
  normaliseSourcePaper(paperA, "A"),
  normaliseSourcePaper(paperB, "B"),
  normaliseSourcePaper(paperC, "C"),
  normaliseSourcePaper(paperD, "D"),
];

function modeMeta(modeKey) {
  return CSEC_2027_PRACTICE_MODES.find(mode => mode.key === modeKey) || CSEC_2027_PRACTICE_MODES[0];
}

function makePracticePaper(source, modeKey) {
  const meta = modeMeta(modeKey);
  const questions = meta.module
    ? source.questions.filter(question => Number(question.module) === meta.module)
    : source.questions;
  const profile = meta.module ? { CK: 9, AK: 12, R: 9 } : { CK: 27, AK: 36, R: 27 };
  const moduleInfo = meta.module ? CSEC_2027_MODULES[meta.module] : null;
  return {
    ...source,
    paper_id: `${source.sourcePaperId}-${modeKey}`,
    id: `${source.sourcePaperId}-${modeKey}`,
    modeKey,
    scope: meta.module ? "module" : "full",
    module: meta.module,
    moduleInfo,
    title: meta.module ? `${meta.label} Practice Paper ${source.letter}` : `Full 2027 Paper 2 - Practice Paper ${source.letter}`,
    durationSeconds: meta.durationMinutes * 60,
    durationMinutes: meta.durationMinutes,
    totalMarks: meta.marks,
    marks: meta.marks,
    questionCount: meta.questions,
    questions,
    profile,
  };
}

export const CSEC_2027_SOURCE_PAPERS = SOURCE_PAPERS;

export const CSEC_2027_PAPERS_BY_MODE = Object.fromEntries(
  CSEC_2027_PRACTICE_MODES.map(mode => [mode.key, SOURCE_PAPERS.map(source => makePracticePaper(source, mode.key))]),
);

export const CSEC_2027_MODULE1_PAPERS = CSEC_2027_PAPERS_BY_MODE.module1;
export const CSEC_2027_MODULE2_PAPERS = CSEC_2027_PAPERS_BY_MODE.module2;
export const CSEC_2027_MODULE3_PAPERS = CSEC_2027_PAPERS_BY_MODE.module3;
export const CSEC_2027_FULL_PAPERS = CSEC_2027_PAPERS_BY_MODE.full;

export function getCsec2027Papers(modeKey = "module1") {
  return CSEC_2027_PAPERS_BY_MODE[modeKey] || CSEC_2027_MODULE1_PAPERS;
}

export function getCsec2027Paper(modeKey = "module1", letter = "A") {
  const wanted = String(letter || "A").toUpperCase();
  const papers = getCsec2027Papers(modeKey);
  return papers.find(paper => paper.letter === wanted) || papers[0];
}

export function getCsec2027Module1Paper(letter) {
  return getCsec2027Paper("module1", letter);
}

export function csec2027ActiveKey(letter, modeKey = "module1") {
  return `spark-csec-2027-${String(modeKey || "module1")}-${String(letter || "A").toLowerCase()}-active-v2`;
}

export function legacyCsec2027Module1ActiveKey(letter) {
  return `spark-csec-2027-module1-${String(letter || "A").toLowerCase()}-active-v1`;
}
