// ============================================================================
// SPARK student home model V1
// Pure helpers behind the student dashboard overview: the next learning step,
// subject attention status and small display formatters.
// ============================================================================

const DAY_MS = 24 * 60 * 60 * 1000;

export const SUBJECT_ATTENTION_AVERAGE = 60;
export const SUBJECT_IDLE_DAYS = 14;

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function validDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function firstNameFrom(name = "") {
  return String(name || "").trim().split(/\s+/)[0] || "";
}

export function greetingForHour(hour = new Date().getHours()) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function subjectDisplayName(subject = {}) {
  return subject.shortName || subject.name || "Subject";
}

export function subjectLessonStats(subject = {}) {
  const progress = subject.progress || {};
  const total = Math.max(0, safeNumber(progress.totalTopics || subject.stats?.topics));
  const completed = Math.max(0, safeNumber(progress.lessonsCompleted));
  const displayCompleted = total > 0 ? Math.min(completed, total) : completed;
  const rawPercent = Number.isFinite(Number(progress.lessonPercent))
    ? Number(progress.lessonPercent)
    : (total ? Math.round((completed / total) * 100) : 0);
  return { total, completed: displayCompleted, percent: Math.min(100, Math.max(0, Math.round(rawPercent))) };
}

export function daysBetween(earlier, later = new Date()) {
  const a = validDate(earlier);
  const b = validDate(later);
  if (!a || !b) return null;
  return Math.max(0, Math.round((startOfDay(b) - startOfDay(a)) / DAY_MS));
}

export function formatRelativeDay(value, now = new Date()) {
  const date = validDate(value);
  if (!date) return "";
  const days = daysBetween(date, now);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return days + " days ago";
  return date.toLocaleDateString([], { day: "numeric", month: "short" });
}

export function subjectHomeStatus(subject = {}, { now = new Date() } = {}) {
  const progress = subject.progress || {};
  const { total } = subjectLessonStats(subject);

  if (!progress.active) {
    return { key:"new", label:"Not started", detail:total ? "" : "Ready when you are", severity:0 };
  }

  const attempts = safeNumber(progress.practiceAttempts);
  const average = Math.round(safeNumber(progress.practiceAverage));
  const idleDays = daysBetween(progress.latestAt, now);

  if (attempts > 0 && average < SUBJECT_ATTENTION_AVERAGE) {
    return { key:"attention", label:"Needs attention", detail:"Practice average is " + average + "%", severity:200 - average };
  }
  if (idleDays != null && idleDays >= SUBJECT_IDLE_DAYS) {
    return { key:"attention", label:"Needs attention", detail:"No activity for " + idleDays + " days", severity:100 + Math.min(idleDays,99) / 100 };
  }
  return {
    key:"track",
    label:"On track",
    detail:progress.latestAt ? "Last active " + formatRelativeDay(progress.latestAt, now).toLowerCase() : "",
    severity:0,
  };
}

const STATUS_ORDER = { attention:0, track:1, new:2 };

export function sortSubjectsForHome(summaries = [], { now = new Date() } = {}) {
  return (summaries || [])
    .map((subject, index) => ({ subject, index, status:subjectHomeStatus(subject, { now }) }))
    .sort((a,b) => (STATUS_ORDER[a.status.key] - STATUS_ORDER[b.status.key])
      || (b.status.severity - a.status.severity)
      || (a.index - b.index));
}

export function attentionSubjects(summaries = [], options = {}) {
  return sortSubjectsForHome(summaries, options).filter(item => item.status.key === "attention");
}


const GENERIC_RECOMMENDATION_TITLES = [
  /^continue learning$/i,
  /^continue$/i,
  /^keep learning$/i,
  /^start learning$/i,
  /^practise$/i,
  /^practice$/i,
  /^review$/i,
];

function isGenericRecommendationTitle(value = "") {
  const title = String(value || "").trim();
  if (!title) return true;
  return GENERIC_RECOMMENDATION_TITLES.some(pattern => pattern.test(title));
}

function cleanTargetLabel(value = "") {
  return String(value || "")
    .replace(/\s*\|\s*(learn|practise it|practice|review)$/i, "")
    .replace(/\s+targeted practice$/i, "")
    .trim();
}

function specificActionTitle(recommendation = {}) {
  const targetLabel = cleanTargetLabel(recommendation?.target?.label);
  const skill = String(recommendation?.skill || "").trim();
  const kind = String(recommendation?.target?.kind || recommendation?.targetActivityType || recommendation?.actionType || "").toLowerCase();

  if (targetLabel) {
    if (kind.includes("flashcard")) return "Review " + targetLabel.replace(/\s+flashcards$/i, "");
    if (kind.includes("lab")) return "Complete " + targetLabel;
    if (kind.includes("exam") || kind.includes("checkpoint") || kind.includes("quiz")) return "Practise " + targetLabel;
    if (kind.includes("lesson") || kind.includes("study")) return "Review " + targetLabel;
    return targetLabel;
  }

  if (skill) {
    if (kind.includes("flashcard")) return "Review " + skill;
    if (kind.includes("lab")) return "Apply " + skill + " in a lab";
    if (kind.includes("exam") || kind.includes("checkpoint") || kind.includes("quiz") || kind.includes("practice")) return "Practise " + skill;
    return "Review " + skill;
  }

  return "";
}

function fallbackReason(subject = {}) {
  const progress = subject?.progress || {};
  const attempts = Number(progress.practiceAttempts || 0);
  const average = Number(progress.practiceAverage || 0);

  if (attempts > 0 && Number.isFinite(average)) {
    if (average < 60) return "Your recent practice suggests this area needs more work.";
    if (average < 75) return "A short review now will help strengthen your recent practice.";
    return "Build on your recent work with one focused activity.";
  }

  if (progress.active) return "Complete one focused activity so SPARK can refine your next recommendation.";
  return "Complete one lesson or practice activity so SPARK can give you a more specific recommendation.";
}

export function recommendationDisplay({ subject = {}, intelligence = null, recommendation = null } = {}) {
  const rec = recommendation || intelligence?.recommendation || null;

  if (rec) {
    const rawTitle = String(rec.title || "").trim();
    const title = isGenericRecommendationTitle(rawTitle)
      ? (specificActionTitle(rec) || rawTitle || "Continue learning")
      : rawTitle;

    const targetLabel = cleanTargetLabel(rec?.target?.label);
    let detail = String(rec.detail || "").trim();

    if (!detail || /^build on your latest work\.?$/i.test(detail) || /^complete the recommended activity/i.test(detail)) {
      detail = fallbackReason(subject);
    }

    if (targetLabel && detail && !detail.toLowerCase().includes(targetLabel.toLowerCase())) {
      detail += " Next: " + targetLabel + ".";
    }

    return {
      title:title || specificActionTitle(rec) || "Continue learning",
      detail,
      summary:detail,
      targetLabel,
      specific:!isGenericRecommendationTitle(title),
    };
  }

  return {
    title:subject?.progress?.active ? "Continue " + subjectDisplayName(subject) : "Start " + subjectDisplayName(subject),
    detail:fallbackReason(subject),
    summary:fallbackReason(subject),
    targetLabel:"",
    specific:false,
  };
}

export function nextStepActionLabel(recommendation = {}) {
  const kind = String(recommendation?.target?.kind || recommendation?.targetActivityType || recommendation?.actionType || "").toLowerCase();
  if (kind.includes("flashcard")) return "Review flashcards";
  if (kind.includes("lab")) return "Open the lab";
  if (kind.includes("sba")) return "Open SBA review";
  if (kind.includes("lesson") || kind.includes("study")) return "Open the lesson";
  if (kind.includes("assessment") || kind.includes("exam") || kind.includes("checkpoint")) return "Start the check";
  return "Start practice";
}

function minutesLabel(minutes) {
  const value = Math.round(safeNumber(minutes));
  return value > 0 ? "About " + value + " min" : "";
}

export function buildStudentNextStep({ summaries = [], intelligenceBySubject = {}, recentActivity = [] } = {}) {
  const subjects = (summaries || []).filter(Boolean);
  if (!subjects.length) {
    return {
      kind:"choose", subject:null, label:"Get started", title:"Choose your subjects",
      detail:"Pick the subjects you are studying and SPARK will build your dashboard around them.",
      meta:"", actionLabel:"Choose subjects",
    };
  }

  const recommended = subjects
    .map((subject,index) => {
      const intelligence = intelligenceBySubject?.[subject.id];
      const recommendation = intelligence?.recommendation;
      if (!intelligence?.hasEvidence || !recommendation?.title || !recommendation?.target) return null;
      return { subject, intelligence, recommendation, index, score:safeNumber(recommendation.score,-Infinity) };
    })
    .filter(Boolean)
    .sort((a,b) => (b.score - a.score) || (a.index - b.index))[0];

  if (recommended) {
    const { subject, intelligence, recommendation } = recommended;
    const display = recommendationDisplay({ subject, intelligence, recommendation });
    return {
      kind:"recommendation", subject, intelligence, recommendation,
      label:"Next up in " + subjectDisplayName(subject),
      title:display.title, detail:display.detail,
      meta:minutesLabel(recommendation.expectedMinutes),
      actionLabel:nextStepActionLabel(recommendation),
    };
  }

  const latest = (recentActivity || []).find(item => subjects.some(subject => subject.id === item?.subjectId));
  if (latest) {
    const subject = subjects.find(item => item.id === latest.subjectId);
    return {
      kind:"continue", subject, label:"Pick up where you left off",
      title:"Continue " + subjectDisplayName(subject),
      detail:latest.title ? "Last time: " + latest.title + "." : "Your lessons and practice are ready.",
      meta:"", actionLabel:"Continue",
    };
  }

  const active = subjects.find(subject => subject.progress?.active);
  const subject = active || subjects[0];
  return {
    kind:active ? "continue" : "start",
    subject,
    label:active ? "Pick up where you left off" : "Your first step",
    title:active ? "Continue " + subjectDisplayName(subject) : "Start " + subjectDisplayName(subject),
    detail:active ? "Your lessons and practice are ready." : "Begin with the first lesson. SPARK will suggest your next step as you learn.",
    meta:"",
    actionLabel:active ? "Continue" : "Start learning",
  };
}

export function listWithMore(names = [], visible = 3) {
  const clean = (names || []).filter(Boolean);
  if (clean.length <= 1) return clean[0] || "";
  if (clean.length <= visible) return clean.slice(0,-1).join(", ") + " and " + clean[clean.length - 1];
  const rest = clean.length - visible;
  return clean.slice(0,visible).join(", ") + " and " + rest + " more";
}

export function countActivitiesSince(recentActivity = [], days = 7, now = new Date()) {
  const threshold = now.getTime() - days * DAY_MS;
  return (recentActivity || []).filter(item => {
    const date = validDate(item?.at);
    return date && date.getTime() >= threshold;
  }).length;
}
