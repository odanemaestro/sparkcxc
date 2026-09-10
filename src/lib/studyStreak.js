// SPARK V5.6.1.2
// A study day is a local calendar day on which the student completed or
// attempted meaningful learning activity. Multiple events on the same day
// count once. The streak remains alive through the current day when the most
// recent activity was yesterday, and extends as soon as the student studies
// today.

function localDayKey(value) {
  if (!value) return null;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
    return value.trim();
  }

  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addRows(days, rows, timestampFields) {
  for (const row of rows || []) {
    if (!row) continue;
    for (const field of timestampFields) {
      const key = localDayKey(row[field]);
      if (key) {
        days.add(key);
        break;
      }
    }
  }
}

export function collectStudyActivityDays({
  lessons = [],
  questionAttempts = [],
  examAttempts = [],
  flashcardReviewEvents = [],
  flashcardProgress = [],
  milestones = [],
  subjectProgress = [],
} = {}) {
  const days = new Set();

  // Completed lesson/topic work.
  addRows(days, lessons, ["completed_at", "updated_at", "created_at"]);
  // Adaptive/scored question activity.
  addRows(days, questionAttempts, ["attempted_at", "created_at"]);
  // Full Paper 1 / Paper 2 submissions.
  addRows(days, examAttempts, ["completed_at", "created_at"]);
  // Flashcard reviews. Review events preserve history; progress is a fallback
  // for installations where only each card's latest review is available.
  addRows(days, flashcardReviewEvents, ["reviewed_at", "created_at"]);
  addRows(days, flashcardProgress, ["last_reviewed_at", "updated_at"]);
  // Topic tests, Adaptive Practice completion and other learning milestones.
  addRows(days, milestones, ["created_at", "completed_at"]);
  // Subject-neutral progress, including Physics and future SPARK subjects.
  // A one-time local backfill can create a snapshot today even when the original
  // learning date was never stored. Do not turn that migration timestamp into a
  // fake study day. Real subject events, or backfills carrying their original
  // metadata.at timestamp, still count normally.
  const datedSubjectProgress = (subjectProgress || []).filter(row => {
    if (!row?.metadata?.backfilled) return true;
    return Boolean(row?.occurred_at || row?.metadata?.at);
  });
  addRows(days, datedSubjectProgress, ["occurred_at", "updated_at", "created_at", "first_recorded_at"]);

  return days;
}

export function computeStudyStreak(activity = {}, now = new Date()) {
  const days = activity instanceof Set ? activity : collectStudyActivityDays(activity);
  if (!days.size) return 0;

  const cursor = now instanceof Date ? new Date(now.getTime()) : new Date(now);
  if (Number.isNaN(cursor.getTime())) return 0;
  cursor.setHours(12, 0, 0, 0); // midday avoids DST/midnight edge cases

  const keyForCursor = () => localDayKey(cursor);

  // A streak earned through yesterday remains alive until the current day ends.
  if (!days.has(keyForCursor())) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(keyForCursor())) return 0;
  }

  let streak = 0;
  while (days.has(keyForCursor())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export { localDayKey as studyDayKey };
