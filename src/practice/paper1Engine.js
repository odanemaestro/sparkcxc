export const PAPER1_QUESTION_COUNT = 60;
export const PAPER1_DURATION_SECONDS = 90 * 60;

let bankPromise = null;
let diagramsPromise = null;

export function loadPaper1Bank() {
  if (!bankPromise) {
    bankPromise = fetch(`${process.env.PUBLIC_URL}/practice-exam/questions.json`)
      .then(r => {
        if (!r.ok) throw new Error("Could not load the Paper 1 question bank.");
        return r.json();
      })
      .catch(err => {
        bankPromise = null;
        throw err;
      });
  }
  return bankPromise;
}

export function loadPaper1Diagrams() {
  if (!diagramsPromise) {
    diagramsPromise = fetch(`${process.env.PUBLIC_URL}/practice-exam/diagrams.json`)
      .then(r => {
        if (!r.ok) throw new Error("Could not load the Paper 1 diagram bank.");
        return r.json();
      })
      .catch(err => {
        diagramsPromise = null;
        throw err;
      });
  }
  return diagramsPromise;
}

function hashSeed(seed) {
  let h = 2166136261;
  const text = String(seed || "spark-paper-1");
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function structuralFingerprint(question) {
  const normal = value => String(value || "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[−–-]/g, "-")
    .replace(/\$\s*\d+(?:[,.]\d+)*/g, "$#")
    .replace(/\b\d+(?:[,.]\d+)?\b/g, "#")
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9#π√∠≤≥<>+=*/^()\-' ]/g, "")
    .trim();

  return [
    normal(question.topic),
    normal(question.subtopic),
    normal(question.stem),
  ].join("|");
}

function explicitRepeatKey(question) {
  const repeat = String(question.repeat_group_id || "").trim();
  return repeat ? `repeat:${repeat}` : "";
}

function repeatKey(question) {
  return explicitRepeatKey(question) || `shape:${structuralFingerprint(question)}`;
}

function isUsableQuestion(question) {
  return Boolean(
    question &&
    question.question_id &&
    Number(question.question_number) >= 1 &&
    Number(question.question_number) <= PAPER1_QUESTION_COUNT &&
    ["A", "B", "C", "D"].includes(String(question.correct_option || "").toUpperCase()) &&
    question.stem &&
    question.option_a &&
    question.option_b &&
    question.option_c &&
    question.option_d &&
    question.record_status !== "Source gap"
  );
}

function fullPaperTemplates(bank) {
  const byPaper = new Map();
  bank.forEach(q => {
    if (!isUsableQuestion(q)) return;
    const rows = byPaper.get(q.paper) || [];
    rows.push(q);
    byPaper.set(q.paper, rows);
  });

  return [...byPaper.entries()]
    .map(([paper, rows]) => ({ paper, rows: rows.slice().sort((a, b) => a.question_number - b.question_number) }))
    .filter(x => x.rows.length === PAPER1_QUESTION_COUNT && x.rows.every((q, i) => Number(q.question_number) === i + 1));
}

function candidateScore(candidate, target, sourcePaperCounts, random, usedPreviously) {
  let score = random() * 22;
  if (candidate.topic === target.topic) score += 60;
  if (candidate.subtopic && candidate.subtopic === target.subtopic) score += 95;
  if (Boolean(candidate.diagram_required) === Boolean(target.diagram_required)) score += 14;
  if (candidate.diagram_type && candidate.diagram_type === target.diagram_type) score += 12;
  if (candidate.verification_confidence === "High") score += 5;
  if (candidate.paper === target.paper) score += 2;
  score -= (sourcePaperCounts.get(candidate.paper) || 0) * 8;
  if (usedPreviously) score -= 250;
  return score;
}

function chooseForSlot({ candidates, target, selectedIds, selectedRepeatKeys, selectedFingerprints, previousIds, previousRepeatKeys, sourcePaperCounts, random }) {
  const ranked = candidates
    .filter(q => !selectedIds.has(q.question_id))
    .filter(q => !selectedRepeatKeys.has(repeatKey(q)))
    .filter(q => !selectedFingerprints.has(structuralFingerprint(q)))
    .map(q => {
      const historicalRepeat = explicitRepeatKey(q);
      const previouslyUsed = previousIds.has(q.question_id) || (historicalRepeat && previousRepeatKeys.has(historicalRepeat));
      return {
        q,
        previouslyUsed,
        score: candidateScore(q, target, sourcePaperCounts, random, previouslyUsed),
      };
    })
    .sort((a, b) => b.score - a.score);

  const fresh = ranked.find(x => !x.previouslyUsed);
  return (fresh || ranked[0])?.q || null;
}

export function buildPaper1Exam(bank, options = {}) {
  const usable = bank.filter(isUsableQuestion);
  const templates = fullPaperTemplates(usable);
  if (!templates.length) throw new Error("No complete 60-question Paper 1 template is available.");

  const seed = options.seed || `${Date.now()}-${Math.random()}`;
  const random = mulberry32(hashSeed(seed));
  const requestedTemplate = options.templatePaper && templates.find(t => t.paper === options.templatePaper);
  const template = requestedTemplate || templates[Math.floor(random() * templates.length)];
  const byPosition = new Map();
  usable.forEach(q => {
    const pos = Number(q.question_number);
    const rows = byPosition.get(pos) || [];
    rows.push(q);
    byPosition.set(pos, rows);
  });

  const previousIds = new Set(options.previouslyUsedQuestionIds || []);
  const previousQuestions = usable.filter(q => previousIds.has(q.question_id));
  const previousRepeatKeys = new Set(previousQuestions.map(explicitRepeatKey).filter(Boolean));
  const selectedIds = new Set();
  const selectedRepeatKeys = new Set();
  const selectedFingerprints = new Set();
  const sourcePaperCounts = new Map();
  const questions = [];

  template.rows.forEach(target => {
    const candidates = byPosition.get(Number(target.question_number)) || [];
    const chosen = chooseForSlot({
      candidates,
      target,
      selectedIds,
      selectedRepeatKeys,
      selectedFingerprints,
      previousIds,
      previousRepeatKeys,
      sourcePaperCounts,
      random,
    });

    if (!chosen) {
      throw new Error(`Could not build a unique Question ${target.question_number}.`);
    }

    selectedIds.add(chosen.question_id);
    selectedRepeatKeys.add(repeatKey(chosen));
    selectedFingerprints.add(structuralFingerprint(chosen));
    sourcePaperCounts.set(chosen.paper, (sourcePaperCounts.get(chosen.paper) || 0) + 1);
    questions.push(chosen);
  });

  return {
    id: `paper1-${seed}`,
    seed,
    templatePaper: template.paper,
    durationSeconds: PAPER1_DURATION_SECONDS,
    questions,
  };
}

export function validatePaper1Exam(exam) {
  const questions = exam?.questions || [];
  const ids = questions.map(q => q.question_id);
  const repeats = questions.map(repeatKey);
  const fingerprints = questions.map(structuralFingerprint);
  const positions = questions.map(q => Number(q.question_number));

  return {
    valid: questions.length === PAPER1_QUESTION_COUNT &&
      new Set(ids).size === PAPER1_QUESTION_COUNT &&
      new Set(repeats).size === PAPER1_QUESTION_COUNT &&
      new Set(fingerprints).size === PAPER1_QUESTION_COUNT &&
      positions.every((n, i) => n === i + 1),
    questionCount: questions.length,
    uniqueIds: new Set(ids).size,
    uniqueRepeatKeys: new Set(repeats).size,
    uniqueFingerprints: new Set(fingerprints).size,
    positions,
  };
}

export function scorePaper1(questions, answers) {
  const rows = questions.map(q => {
    const selected = answers[q.question_id] || "";
    const correct = selected === q.correct_option;
    return { question: q, selected, correct, unanswered: !selected };
  });

  const correct = rows.filter(r => r.correct).length;
  const unanswered = rows.filter(r => r.unanswered).length;
  const topicMap = new Map();
  rows.forEach(row => {
    const topic = row.question.topic || "Unclassified";
    const stat = topicMap.get(topic) || { topic, correct: 0, total: 0 };
    stat.total += 1;
    if (row.correct) stat.correct += 1;
    topicMap.set(topic, stat);
  });

  return {
    correct,
    incorrect: rows.length - correct - unanswered,
    unanswered,
    total: rows.length,
    percent: rows.length ? Math.round((correct / rows.length) * 100) : 0,
    rows,
    topics: [...topicMap.values()]
      .map(x => ({ ...x, percent: Math.round((x.correct / x.total) * 100) }))
      .sort((a, b) => a.percent - b.percent || b.total - a.total),
  };
}
