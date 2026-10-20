// ============================================================================
// SPARK CSEC Integrated Science examination model
// Effective for examinations from 2027.
// ============================================================================

export const INTEGRATED_SCIENCE_PAPER1_DURATION_SECONDS = 75 * 60;
export const INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS = 150 * 60;
export const INTEGRATED_SCIENCE_PAPER1_MARKS = 60;
export const INTEGRATED_SCIENCE_PAPER2_MARKS = 105;

function shuffled(rows, random = Math.random) {
  const copy = [...rows];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

export function buildIntegratedSciencePaper1(modules, random = Math.random) {
  const selected = (modules || []).flatMap(moduleData => {
    const rows = Array.isArray(moduleData?.paper01) ? moduleData.paper01 : [];
    return shuffled(rows, random).slice(0, 20);
  });

  if (selected.length !== 60) {
    throw new Error("Integrated Science Paper 01 requires 20 questions from each of the three modules.");
  }

  return selected.map((question, index) => ({
    ...question,
    examPosition:index + 1,
  }));
}

export const INTEGRATED_SCIENCE_FIXED_PAPER_COUNT = 14;

/**
 * One of the 14 fixed Paper 02s registered for server marking: pair k uses
 * questions IS-Mm-P2-(2k-1) and IS-Mm-P2-(2k) from each module m, in the same
 * order and structure as a generated paper (practical 20 + structured 15 per
 * module, six questions, 105 marks). Returns null if the bank does not form
 * that paper, so the caller can fall back to a generated one.
 */
export function buildIntegratedScienceFixedPaper2(modules, pairNumber) {
  const k = Number(pairNumber);
  if (!Number.isInteger(k) || k < 1 || k > INTEGRATED_SCIENCE_FIXED_PAPER_COUNT) return null;
  const byId = new Map((modules || []).flatMap(m => m?.paper02 || []).map(q => [q.id, q]));
  const selected = [];
  for (const module of [1,2,3]) {
    const pair = [2*k-1, 2*k].map(n => byId.get(`IS-M${module}-P2-${String(n).padStart(2,"0")}`));
    if (pair.some(q => !q)) return null;
    const practical = pair.find(q => q.kind === "practical" && Number(q.totalMarks) === 20);
    const structured = pair.find(q => q.kind === "structured" && Number(q.totalMarks) === 15);
    if (!practical || !structured) return null;
    selected.push(practical, structured);
  }
  return {
    paperId:`is-fixed-source-pair-${String(k).padStart(2,"0")}`,
    questions:selected.map((question, index) => ({...question, examPosition:index + 1})),
  };
}

export function buildIntegratedSciencePaper2(modules, random = Math.random) {
  const selected = [];

  (modules || []).forEach(moduleData => {
    const rows = Array.isArray(moduleData?.paper02) ? moduleData.paper02 : [];
    const practical = shuffled(
      rows.filter(question => question.kind === "practical" && Number(question.totalMarks) === 20),
      random
    )[0];
    const structured = shuffled(
      rows.filter(question => question.kind === "structured" && Number(question.totalMarks) === 15),
      random
    )[0];

    if (!practical || !structured) {
      throw new Error(`Integrated Science Module ${moduleData?.module || "?"} does not contain a complete Paper 02 pair.`);
    }

    selected.push(practical, structured);
  });

  if (selected.length !== 6 || selected.reduce((sum, q) => sum + Number(q.totalMarks || 0), 0) !== 105) {
    throw new Error("Integrated Science Paper 02 must contain six questions worth 105 marks.");
  }

  return selected.map((question, index) => ({
    ...question,
    examPosition:index + 1,
  }));
}

export function gradeIntegratedSciencePaper1(paper, answers = {}) {
  const rows = (paper || []).map(question => {
    const selected = answers[question.id] || "";
    return {
      question,
      selected,
      answered:Boolean(selected),
      correct:Boolean(selected) && selected === question.answer,
    };
  });

  const score = rows.filter(row => row.correct).length;
  const moduleScores = [1,2,3].map(moduleNumber => {
    const moduleRows = rows.filter(row => Number(row.question.module) === moduleNumber);
    const earned = moduleRows.filter(row => row.correct).length;
    return { module:moduleNumber, earned, of:moduleRows.length };
  });

  return {
    rows,
    score,
    of:paper?.length || 0,
    answeredCount:rows.filter(row => row.answered).length,
    percent:paper?.length ? Math.round((score / paper.length) * 100) : 0,
    modules:moduleScores,
  };
}

export function integratedScienceExamStorageKey(userId, paper) {
  return `spark-integrated-science-${paper}-${userId || "anonymous"}-v1`;
}

export function readIntegratedScienceExamState(userId, paper) {
  try {
    return JSON.parse(localStorage.getItem(integratedScienceExamStorageKey(userId,paper)) || "null");
  } catch {
    return null;
  }
}

export function saveIntegratedScienceExamState(userId, paper, state) {
  const key = integratedScienceExamStorageKey(userId,paper);
  if (!state) localStorage.removeItem(key);
  else localStorage.setItem(key,JSON.stringify(state));
}

export function formatIntegratedScienceExamTime(totalSeconds) {
  const safe = Math.max(0,Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
