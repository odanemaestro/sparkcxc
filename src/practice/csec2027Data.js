import paperA from "./data/csec2027/csec-p2027-practice-A.json";
import paperB from "./data/csec2027/csec-p2027-practice-B.json";
import paperC from "./data/csec2027/csec-p2027-practice-C.json";

export const CSEC_2027_MODULE1_DURATION_SECONDS = 50 * 60;
export const CSEC_2027_MODULE1_MARKS = 30;
export const CSEC_2027_MODULE1_QUESTIONS = 3;
export const CSEC_2027_RESULTS_KEY = "spark-csec-2027-module1-results-v1";

function answerTypeForCell(spec = {}) {
  if (spec.type === "expression") return "expression";
  if (spec.type === "text") return "text";
  return undefined;
}

function normaliseTablePart(part) {
  if (part?.responseType !== "table" || !part?.table) return part;
  const cells = part.table.cells || {};
  const rows = (part.table.rows || []).map(row => row.map(cell => {
    if (!cell || typeof cell !== "object" || Array.isArray(cell) || !cell.key) return cell;
    const spec = cells[cell.key] || {};
    return {
      key: cell.key,
      answer: spec.value,
      answerType: answerTypeForCell(spec),
      accepted: Array.isArray(spec.any) ? spec.any : [],
      tolerance: spec.tolerance,
      marks: Number(spec.marks || 0),
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
      caption: part.table.caption,
      headers: part.table.headers || [],
      rows,
      explicitCellMarks: true,
    },
  };
}

function normaliseQuestion(question) {
  return {
    ...question,
    parts: (question.parts || []).map(normaliseTablePart),
  };
}

function normalisePaper(raw, letter) {
  return {
    ...raw,
    letter,
    id: raw.paper_id,
    durationSeconds: CSEC_2027_MODULE1_DURATION_SECONDS,
    totalMarks: CSEC_2027_MODULE1_MARKS,
    questions: (raw.questions || []).map(normaliseQuestion),
  };
}

export const CSEC_2027_MODULE1_PAPERS = [
  normalisePaper(paperA, "A"),
  normalisePaper(paperB, "B"),
  normalisePaper(paperC, "C"),
];

export function getCsec2027Module1Paper(letter) {
  const wanted = String(letter || "A").toUpperCase();
  return CSEC_2027_MODULE1_PAPERS.find(paper => paper.letter === wanted) || CSEC_2027_MODULE1_PAPERS[0];
}

export function csec2027ActiveKey(letter) {
  return `spark-csec-2027-module1-${String(letter || "A").toLowerCase()}-active-v1`;
}
