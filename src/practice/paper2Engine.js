import { checkAnswer } from "../lib/answerCheck";
import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";

export const PAPER2_DURATION_SECONDS = 160 * 60;
export const PAPER2_QUESTION_COUNT = 10;
export const PAPER2_TOTAL_MARKS = 100;
export const PAPER2_TEMPLATE_COUNT = PAPER2_QUESTION_BANK.length;

function hashSeed(seed) {
  let h = 2166136261;
  const text = String(seed || "paper2");
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFromSeed(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, rng) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getPaper2Bank() {
  return PAPER2_QUESTION_BANK;
}

export function buildPaper2Exam(options = {}) {
  const seed = options.seed || `${Date.now()}-${Math.random()}`;
  const rng = rngFromSeed(seed);
  const used = new Set(options.previouslyUsedQuestionIds || []);
  const questions = [];

  for (let qn = 1; qn <= PAPER2_QUESTION_COUNT; qn += 1) {
    const candidates = shuffle(PAPER2_QUESTION_BANK.filter(q => q.question_number === qn), rng);
    const unseen = candidates.filter(q => !used.has(q.question_id));
    const pick = (unseen.length ? unseen : candidates)[0];
    questions.push(pick);
  }

  return {
    id: `paper2-${seed}`,
    seed,
    durationSeconds: PAPER2_DURATION_SECONDS,
    totalMarks: PAPER2_TOTAL_MARKS,
    blueprint: "CSEC Paper 02 structured-response pattern",
    questions,
  };
}

export function validatePaper2Exam(exam) {
  const questions = exam?.questions || [];
  const ids = questions.map(q => q.question_id);
  const positions = questions.map(q => q.question_number);
  const marks = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0);
  const partMarksOk = questions.every(q => (q.parts || []).reduce((sum, part) => sum + Number(part.marks || 0), 0) === Number(q.marks));
  const sectionsOk = questions.slice(0, 7).every(q => q.section === "I") && questions.slice(7).every(q => q.section === "II");
  return {
    valid: questions.length === PAPER2_QUESTION_COUNT &&
      new Set(ids).size === PAPER2_QUESTION_COUNT &&
      positions.every((n, i) => n === i + 1) &&
      marks === PAPER2_TOTAL_MARKS && sectionsOk && partMarksOk,
    uniqueCount: new Set(ids).size,
    marks,
    partMarksOk,
  };
}

function cleanExpression(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[−–-]/g, "-")
    .replace(/×/g, "*")
    .replace(/\s+/g, "")
    .replace(/\*+/g, "*")
    .replace(/^\((.*)\)$/g, "$1");
}

function parseLooseNumber(value) {
  const cleaned = String(value ?? "")
    .trim()
    .replace(/[$,]/g, "")
    .replace(/[°%]/g, "")
    .replace(/\b(cm|m|km|units?|m²|m³|cm²|cm³)\b/gi, "")
    .trim();
  const fraction = cleaned.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (fraction && Number(fraction[2]) !== 0) return Number(fraction[1]) / Number(fraction[2]);
  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const n = Number(match[0]);
  return Number.isFinite(n) ? n : null;
}

export function gradePaper2Part(userInput, part) {
  const user = String(userInput ?? "").trim();
  if (!user) return { status: "blank", correct: false, marks: 0 };

  const accepted = [part.answer, ...(part.accepted || [])].filter(v => v !== undefined && v !== null).map(String);

  if (Number.isFinite(Number(part.tolerance))) {
    const userNumber = parseLooseNumber(user);
    const expectedNumber = parseLooseNumber(part.answer);
    if (userNumber !== null && expectedNumber !== null) {
      const correct = Math.abs(userNumber - expectedNumber) <= Number(part.tolerance);
      return { status: correct ? "correct" : "incorrect", correct, marks: correct ? part.marks : 0 };
    }
  }

  if (part.answerType === "expression" || part.answerType === "ordered") {
    const normalized = cleanExpression(user);
    const correct = accepted.some(answer => cleanExpression(answer) === normalized);
    return { status: correct ? "correct" : "incorrect", correct, marks: correct ? part.marks : 0 };
  }

  const correct = accepted.some(answer => {
    if (checkAnswer(user, answer) === "correct") return true;
    return cleanExpression(user) === cleanExpression(answer);
  });
  return { status: correct ? "correct" : "incorrect", correct, marks: correct ? part.marks : 0 };
}

export function calculatePaper2Mark(answers = {}, questions = []) {
  let score = 0;
  let answeredParts = 0;
  let correctParts = 0;
  let totalParts = 0;
  const perQuestion = {};

  questions.forEach(question => {
    let questionScore = 0;
    let questionAnswered = 0;
    let questionCorrect = 0;
    const partResults = {};
    (question.parts || []).forEach(part => {
      totalParts += 1;
      const value = answers?.[question.question_id]?.[part.id] ?? "";
      const result = gradePaper2Part(value, part);
      partResults[part.id] = result;
      if (result.status !== "blank") {
        answeredParts += 1;
        questionAnswered += 1;
      }
      if (result.correct) {
        correctParts += 1;
        questionCorrect += 1;
        score += part.marks;
        questionScore += part.marks;
      }
    });
    perQuestion[question.question_id] = {
      score: questionScore,
      marks: question.marks,
      answeredParts: questionAnswered,
      correctParts: questionCorrect,
      totalParts: question.parts?.length || 0,
      parts: partResults,
    };
  });

  return {
    score,
    percent: Math.round((score / PAPER2_TOTAL_MARKS) * 100),
    answeredParts,
    correctParts,
    totalParts,
    perQuestion,
  };
}

export function isPaper2QuestionComplete(question, answers = {}) {
  const response = answers?.[question.question_id] || {};
  return (question.parts || []).every(part => String(response[part.id] ?? "").trim() !== "");
}
