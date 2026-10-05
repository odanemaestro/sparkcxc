import {
  ENGLISH_A_PAPER1_DURATION_SECONDS,
  englishAPaper1Questions,
} from "../data/englishAPaper1Bank";

export { ENGLISH_A_PAPER1_DURATION_SECONDS };

export function buildEnglishAPaper1() {
  const paper = [...englishAPaper1Questions];
  const moduleCounts = [1,2,3].map(module => ({
    module,
    rows:paper.filter(question => Number(question.module) === module),
  }));

  for (const entry of moduleCounts) {
    const discrete = entry.rows.filter(question => question.kind === "discrete").length;
    const comprehension = entry.rows.filter(question => question.kind === "comprehension").length;
    if (entry.rows.length !== 20 || discrete !== 5 || comprehension !== 15) {
      throw new Error(`English A Paper 01 Module ${entry.module} must contain 5 discrete and 15 reading-comprehension items.`);
    }
  }

  if (paper.length !== 60) {
    throw new Error("English A Paper 01 requires exactly 60 questions.");
  }

  return paper.map((question,index) => ({...question,examPosition:index + 1}));
}

export function gradeEnglishAPaper1(paper, answers = {}) {
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
  return {
    rows,
    score,
    of:paper?.length || 0,
    answeredCount:rows.filter(row => row.answered).length,
    percent:paper?.length ? Math.round((score / paper.length) * 100) : 0,
    modules:[1,2,3].map(module => {
      const moduleRows = rows.filter(row => Number(row.question.module) === module);
      return {
        module,
        earned:moduleRows.filter(row => row.correct).length,
        of:moduleRows.length,
      };
    }),
  };
}

export function englishAExamStorageKey(userId) {
  return `spark-english-a-paper1-${userId || "anonymous"}-v1`;
}

export function readEnglishAExamState(userId) {
  try {
    return JSON.parse(localStorage.getItem(englishAExamStorageKey(userId)) || "null");
  } catch {
    return null;
  }
}

export function saveEnglishAExamState(userId,state) {
  const key = englishAExamStorageKey(userId);
  if (!state) localStorage.removeItem(key);
  else localStorage.setItem(key,JSON.stringify(state));
}

export function formatEnglishAExamTime(totalSeconds) {
  const safe = Math.max(0,Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
