import { getDueFlashcards } from "../learning/flashcards";

const DAY_MS = 24 * 60 * 60 * 1000;

function asDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : new Date(value.getTime());
  const raw = String(value);
  const dateOnly = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function inRange(value, start, end) {
  const date = asDate(value);
  if (!date) return false;
  return date >= start && date <= end;
}

const DISPLAY_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDisplayDate(value) {
  const date = asDate(value);
  if (!date) return "";
  return `${date.getDate()} ${DISPLAY_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function average(values) {
  const nums = values.map(Number).filter(Number.isFinite);
  return nums.length ? nums.reduce((sum, value) => sum + value, 0) / nums.length : 0;
}

function roundedAverage(values) {
  const nums = values.map(Number).filter(Number.isFinite);
  return nums.length ? Math.round(nums.reduce((sum, value) => sum + value, 0) / nums.length) : 0;
}

function attemptPercent(attempt) {
  const explicit = Number(attempt?.percent);
  if (Number.isFinite(explicit)) return explicit;
  const score = Number(attempt?.score);
  const max = Number(attempt?.max_score);
  return Number.isFinite(score) && Number.isFinite(max) && max > 0 ? (score / max) * 100 : 0;
}

function is2027Attempt(attempt) {
  return Boolean(attempt?.metadata?.format === "2027" || attempt?.metadata?.csec_2027 || attempt?.metadata?.paper2027);
}

function bookingDate(booking) {
  if (!booking?.session_date) return null;
  const time = String(booking.start_time || "12:00:00").slice(0, 8);
  return asDate(`${booking.session_date}T${time}`);
}

export function reportPeriodDefinition(key = "month", nowValue = new Date(), custom = {}) {
  const now = asDate(nowValue) || new Date();
  const end = new Date(now);
  let start;
  let label;

  if (key === "week") {
    start = new Date(now);
    const daysSinceMonday = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - daysSinceMonday);
    label = "This week";
  } else if (key === "term") {
    // SPARK uses three four-month academic reporting terms:
    // Jan-Apr, May-Aug, Sep-Dec. This keeps reports predictable in Jamaica
    // without pretending the app knows a school's exact internal term dates.
    const month = now.getMonth();
    const termStartMonth = month <= 3 ? 0 : month <= 7 ? 4 : 8;
    start = new Date(now.getFullYear(), termStartMonth, 1);
    label = "Current term";
  } else if (key === "custom") {
    const requestedStart = asDate(custom.start);
    const requestedEnd = asDate(custom.end);
    start = requestedStart || new Date(now.getFullYear(), now.getMonth(), 1);
    if (requestedEnd) end.setTime(requestedEnd.getTime());
    if (start > end) {
      const swap = new Date(start);
      start = new Date(end);
      end.setTime(swap.getTime());
    }
    label = `${formatDisplayDate(start)} to ${formatDisplayDate(end)}`;
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    label = "This month";
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return { key, start, end, label };
}

function filterByDate(items, field, start, end) {
  return (items || []).filter(item => inRange(item?.[field], start, end));
}

function skillScore(row) {
  const value = Number(row?.mastery_score);
  return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
}

function cleanSkillName(value) {
  return String(value || "").trim() || "Mathematics";
}

export function buildLearningSummary(data = {}, nowValue = new Date()) {
  const now = asDate(nowValue) || new Date();
  const skills = [...(data.skills || data.progress || [])];
  const examAttempts = [...(data.examAttempts || [])];
  const questionAttempts = [...(data.questionAttempts || data.attempts || [])];
  const lessons = [...(data.lessons || [])];
  const bookings = [...(data.bookings || [])];
  const milestones = [...(data.milestones || [])];
  const flashcardProgress = [...(data.flashcardProgress || [])];

  const paper1Attempts = examAttempts.filter(a => a.paper_type === "paper1");
  const paper2Attempts = examAttempts.filter(a => a.paper_type === "paper2" && !is2027Attempt(a));
  const paper2027Attempts = examAttempts.filter(is2027Attempt);
  const overallExamAverage = roundedAverage(examAttempts.map(attemptPercent));
  const paper1Average = roundedAverage(paper1Attempts.map(attemptPercent));
  const paper2Average = roundedAverage(paper2Attempts.map(attemptPercent));
  const paper2027Average = roundedAverage(paper2027Attempts.map(attemptPercent));

  const validQuestionAttempts = questionAttempts.filter(item => typeof item?.correct === "boolean");
  const questionAccuracy = validQuestionAttempts.length
    ? Math.round((validQuestionAttempts.filter(item => item.correct).length / validQuestionAttempts.length) * 100)
    : 0;

  const sortedSkills = skills
    .map(row => ({ ...row, score: skillScore(row), skill: cleanSkillName(row.skill) }))
    .sort((a, b) => a.score - b.score);
  const weakestSkills = sortedSkills.slice(0, 3);
  const strongestSkills = [...sortedSkills].sort((a, b) => b.score - a.score).slice(0, 3);
  const mastery = sortedSkills.length ? Math.round(average(sortedSkills.map(item => item.score))) : 0;

  const currentStart = new Date(now.getTime() - 29 * DAY_MS);
  const previousStart = new Date(now.getTime() - 59 * DAY_MS);
  const currentExams = examAttempts.filter(item => inRange(item.completed_at, currentStart, now));
  const previousExams = examAttempts.filter(item => inRange(item.completed_at, previousStart, new Date(currentStart.getTime() - 1)));
  const currentAverage = roundedAverage(currentExams.map(attemptPercent));
  const previousAverage = roundedAverage(previousExams.map(attemptPercent));
  const trendDelta = currentExams.length && previousExams.length ? currentAverage - previousAverage : 0;

  const week = reportPeriodDefinition("week", now);
  const weeklyExams = filterByDate(examAttempts, "completed_at", week.start, week.end);
  const weeklyLessons = lessons.filter(item => inRange(item.completed_at || item.updated_at || item.created_at, week.start, week.end));
  const weeklyQuestions = questionAttempts.filter(item => inRange(item.attempted_at || item.created_at, week.start, week.end));
  const weeklyMilestones = milestones.filter(item => inRange(item.created_at, week.start, week.end));
  const weeklyTutorSessions = bookings.filter(item => {
    const date = bookingDate(item);
    return date && date >= week.start && date <= week.end && item.status === "completed";
  });

  const dueFlashcards = getDueFlashcards(flashcardProgress, "all", now).length;

  const upcomingBooking = bookings
    .map(item => ({ item, date: bookingDate(item) }))
    .filter(entry => entry.date && entry.date >= now && !["cancelled", "declined", "expired"].includes(entry.item.status))
    .sort((a, b) => a.date - b.date)[0] || null;

  const weakest = weakestSkills[0];
  const strongest = strongestSkills[0];
  const learnerName = String(data.learnerName || "").trim();
  const learnerPossessive = learnerName ? `${learnerName}${/s$/i.test(learnerName) ? "'" : "'s"}` : "your";
  const learnerSubject = learnerName || "you";
  let insight = learnerName
    ? `SPARK is building a clearer picture of ${learnerPossessive} learning as ${learnerSubject} completes lessons, practice and exams.`
    : "SPARK is building a clearer picture of your learning as you complete lessons, practice and exams.";
  if (examAttempts.length || skills.length) {
    const parts = [];
    if (trendDelta > 0) parts.push(learnerName
      ? `${learnerPossessive} recent exam average is up ${trendDelta} percentage point${trendDelta === 1 ? "" : "s"}.`
      : `Your recent exam average is up ${trendDelta} percentage point${trendDelta === 1 ? "" : "s"}.`);
    if (trendDelta < 0) parts.push(learnerName
      ? `${learnerPossessive} recent exam average is ${Math.abs(trendDelta)} percentage point${Math.abs(trendDelta) === 1 ? "" : "s"} below the previous period.`
      : `Your recent exam average is ${Math.abs(trendDelta)} percentage point${Math.abs(trendDelta) === 1 ? "" : "s"} below the previous period.`);
    if (strongest?.skill) parts.push(learnerName
      ? `The topic “${strongest.skill}” is currently one of ${learnerPossessive} strongest areas.`
      : `The topic “${strongest.skill}” is currently one of your strongest areas.`);
    if (weakest?.skill && weakest.score < 80) parts.push(learnerName
      ? `The topic “${weakest.skill}” needs the most attention for ${learnerName} right now.`
      : `The topic “${weakest.skill}” needs the most attention right now.`);
    insight = parts.join(" ") || (learnerName
      ? `${learnerPossessive} current Mathematics mastery is ${mastery}%${examAttempts.length ? ` and the full-paper average is ${overallExamAverage}%` : ""}.`
      : `Your current Mathematics mastery is ${mastery}%${examAttempts.length ? ` and your full-paper average is ${overallExamAverage}%` : ""}.`);
  }

  const recommendations = [];
  if (weakest?.skill) recommendations.push(`Review ${weakest.skill}, then complete a short targeted practice set.`);
  if (dueFlashcards > 0) recommendations.push(`Review ${dueFlashcards} flashcard${dueFlashcards === 1 ? "" : "s"} that ${dueFlashcards === 1 ? "is" : "are"} due.`);
  if (examAttempts.length === 0) recommendations.push("Complete a full practice paper to establish an exam-performance baseline.");
  else if (paper2Attempts.length && paper1Attempts.length && paper2Average < paper1Average) recommendations.push("Prioritize Paper 2 working and written-response practice this week.");
  else recommendations.push("Complete another timed practice session to keep your exam technique sharp.");

  return {
    mastery,
    skillCount: sortedSkills.length,
    examCount: examAttempts.length,
    paper1Count: paper1Attempts.length,
    paper2Count: paper2Attempts.length,
    paper2027Count: paper2027Attempts.length,
    overallExamAverage,
    paper1Average,
    paper2Average,
    paper2027Average,
    questionAttemptCount: validQuestionAttempts.length,
    questionAccuracy,
    strongestSkills,
    weakestSkills,
    trendDelta,
    currentAverage,
    previousAverage,
    dueFlashcards,
    upcomingBooking: upcomingBooking?.item || null,
    insight,
    recommendations: recommendations.slice(0, 3),
    weekly: {
      lessons: weeklyLessons.length,
      questions: weeklyQuestions.length,
      exams: weeklyExams.length,
      average: roundedAverage(weeklyExams.map(attemptPercent)),
      tutorSessions: weeklyTutorSessions.length,
      milestones: weeklyMilestones.length,
    },
  };
}

export function buildProgressReport(data = {}, options = {}) {
  const now = asDate(options.now) || new Date();
  const period = reportPeriodDefinition(options.period || "month", now, options.custom || {});
  const examAttempts = filterByDate(data.examAttempts || [], "completed_at", period.start, period.end);
  const questionAttempts = (data.questionAttempts || data.attempts || []).filter(item => inRange(item.attempted_at || item.created_at, period.start, period.end));
  const lessons = (data.lessons || []).filter(item => inRange(item.completed_at || item.updated_at || item.created_at, period.start, period.end));
  const milestones = filterByDate(data.milestones || [], "created_at", period.start, period.end);
  const bookings = (data.bookings || []).filter(item => {
    const date = bookingDate(item);
    return date && date >= period.start && date <= period.end && item.status === "completed";
  });
  const flashcardReviewEvents = (data.flashcardReviewEvents || []).filter(item => inRange(item.reviewed_at || item.created_at, period.start, period.end));
  // Backward-compatible fallback for accounts created before review events were
  // introduced. This counts distinct cards with a latest review in the period.
  const legacyFlashcardReviews = (data.flashcardProgress || []).filter(item => inRange(item.last_reviewed_at || item.updated_at, period.start, period.end));

  const summary = buildLearningSummary({
    ...data,
    examAttempts,
    questionAttempts,
    lessons,
    milestones,
    // Period reports describe completed tutoring during that period. Upcoming
    // bookings remain a dashboard concern rather than a historical report item.
    bookings,
  }, now);

  const validQuestions = questionAttempts.filter(item => typeof item?.correct === "boolean");
  const correctQuestions = validQuestions.filter(item => item.correct === true).length;
  const questionAccuracy = validQuestions.length ? Math.round((correctQuestions / validQuestions.length) * 100) : 0;
  const examAverage = roundedAverage(examAttempts.map(attemptPercent));

  return {
    generatedAt: now.toISOString(),
    period,
    summary,
    activity: {
      lessonsCompleted: lessons.length,
      questionsAttempted: validQuestions.length,
      questionAccuracy,
      hasQuestionAccuracy: validQuestions.length > 0,
      examsCompleted: examAttempts.length,
      examAverage,
      hasExamAverage: examAttempts.length > 0,
      tutorSessions: bookings.length,
      flashcardsReviewed: flashcardReviewEvents.length || legacyFlashcardReviews.length,
      milestones: milestones.length,
    },
    exams: examAttempts.slice(0, 10).map(attempt => ({
      id: attempt.id,
      label: is2027Attempt(attempt) ? "CSEC 2027 Paper 2" : attempt.paper_type === "paper2" ? "Paper 2" : "Paper 1",
      percent: Math.round(attemptPercent(attempt)),
      score: Number(attempt.score || 0),
      maxScore: Number(attempt.max_score || 0),
      completedAt: attempt.completed_at,
    })),
    milestones: milestones.slice(0, 8),
    strongestSkills: summary.strongestSkills,
    weakestSkills: summary.weakestSkills,
    recommendations: summary.recommendations,
    goal: data.goal || null,
    studyCircle: data.studyCircle || null,
  };
}

export const progressAnalyticsInternals = {
  attemptPercent,
  is2027Attempt,
  bookingDate,
  roundedAverage,
};
