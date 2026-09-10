import { reportPeriodDefinition, buildProgressReport } from "../insights/progressAnalytics";
import { SECTION_A_TOPICS } from "../physics/mechanics/sectionAMechanics.mjs";
import { MECHANICS_INTERACTIVES } from "../physics/mechanics/interactives/mechanicsInteractiveRegistry.mjs";
import { readPhysicsMechanicsProgress } from "../physics/mechanics/physicsMechanicsProgress.mjs";
import { SECTION_B_TOPICS } from "../physics/thermal/sectionBThermal.mjs";
import { THERMAL_INTERACTIVES } from "../physics/thermal/interactives/bThermalInteractiveRegistry.mjs";
import { readPhysicsThermalProgress } from "../physics/thermal/physicsThermalProgress.mjs";
import { SECTION_C_TOPICS } from "../physics/waves/sectionCWaves.mjs";
import { WAVES_INTERACTIVES } from "../physics/waves/interactives/cWavesInteractiveRegistry.mjs";
import { readPhysicsWavesProgress } from "../physics/waves/physicsWavesProgress.mjs";
import { SECTION_D_TOPICS } from "../physics/electricity/sectionDElectricity.mjs";
import { ELECTRICITY_INTERACTIVES } from "../physics/electricity/interactives/dElectricityInteractiveRegistry.mjs";
import { readPhysicsElectricityProgress } from "../physics/electricity/physicsElectricityProgress.mjs";
import { SECTION_E_TOPICS } from "../physics/atomic/sectionEAtomic.mjs";
import { ATOMIC_INTERACTIVES } from "../physics/atomic/interactives/eAtomicInteractiveRegistry.mjs";
import { readPhysicsAtomicProgress } from "../physics/atomic/physicsAtomicProgress.mjs";
import { readPhysicsCourseProgress } from "../physics/course/physicsCourseProgress.mjs";

export const SUBJECT_PROGRESS_VERSION = 1;

const SECTION_TITLES = Object.freeze({
  A: "Mechanics",
  B: "Thermal Physics and Kinetic Theory",
  C: "Waves and Optics",
  D: "Electricity and Magnetism",
  E: "The Physics of the Atom",
});

const PHYSICS_TOPIC_LIST = Object.freeze([
  ...SECTION_A_TOPICS,
  ...SECTION_B_TOPICS,
  ...SECTION_C_TOPICS,
  ...SECTION_D_TOPICS,
  ...SECTION_E_TOPICS,
]);

const PHYSICS_TOPIC_MAP = new Map(PHYSICS_TOPIC_LIST.map(topic => [topic.id, topic]));
const PHYSICS_LAB_LIST = Object.freeze([
  ...MECHANICS_INTERACTIVES,
  ...THERMAL_INTERACTIVES,
  ...WAVES_INTERACTIVES,
  ...ELECTRICITY_INTERACTIVES,
  ...ATOMIC_INTERACTIVES,
]);
const PHYSICS_LAB_MAP = new Map(PHYSICS_LAB_LIST.map(lab => [lab.id, lab]));

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}


function subjectIdLabel(value) {
  const id = String(value || "").trim();
  if (!id) return "Subject";
  return id
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function rowDate(row) {
  const value = row?.updated_at || row?.occurred_at || row?.created_at || row?.metadata?.at || null;
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function inPeriod(row, period) {
  const date = rowDate(row);
  return Boolean(date && date >= period.start && date <= period.end);
}

export function physicsTopicTitle(topicId) {
  return PHYSICS_TOPIC_MAP.get(String(topicId || ""))?.title || String(topicId || "Physics");
}

export function subjectRows(rows, subjectId) {
  return (rows || []).filter(row => String(row?.subject_id || "").toLowerCase() === String(subjectId || "").toLowerCase());
}

function localResultRow(subjectId, section, topic, key, result) {
  if (!result || typeof result !== "object") return null;
  const score = safeNumber(result.score);
  const maxScore = safeNumber(result.maxScore);
  const percent = Number.isFinite(Number(result.percent))
    ? safeNumber(result.percent)
    : maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return {
    subject_id: subjectId,
    activity_key: key,
    activity_type: key.startsWith("checkpoint:") ? "section_checkpoint" : "topic_quiz",
    section_id: section,
    topic_id: topic || null,
    title: key.startsWith("checkpoint:")
      ? `Section ${section} ${SECTION_TITLES[section] || "Physics"} checkpoint`
      : `${topic} ${physicsTopicTitle(topic)} topic test`,
    completed: true,
    score,
    max_score: maxScore,
    percent,
    best_percent: Math.max(percent, safeNumber(result.best_percent || result.bestPercent)),
    attempt_count: Math.max(1, safeNumber(result.attempt_count || result.attemptCount, 1)),
    updated_at: result.at || result.updated_at || null,
    metadata: { source: "physics_local_progress_v1", at: result.at || null },
  };
}

export function readLocalPhysicsSubjectRows(userId) {
  const mechanics = readPhysicsMechanicsProgress(userId);
  const course = readPhysicsCourseProgress(userId);
  const thermal = readPhysicsThermalProgress(userId);
  const waves = readPhysicsWavesProgress(userId);
  const electricity = readPhysicsElectricityProgress(userId);
  const atomic = readPhysicsAtomicProgress(userId);
  const rows = [];

  for (const topic of SECTION_A_TOPICS) {
    if (mechanics[`lesson:${topic.id}`]) rows.push({
      subject_id: "physics", activity_key: `lesson:${topic.id}`, activity_type: "lesson",
      section_id: "A", topic_id: topic.id, title: `${topic.id} ${topic.title}`,
      completed: true, score: null, max_score: null, percent: null, best_percent: null,
      attempt_count: 0, updated_at: null, metadata: { source: "physics_local_progress_v1" },
    });
  }
  for (const lab of MECHANICS_INTERACTIVES) {
    if (mechanics[`lab:${lab.id}`]) rows.push({
      subject_id: "physics", activity_key: `lab:${lab.id}`, activity_type: "lab",
      section_id: String(lab.topic || "A1").slice(0, 1), topic_id: lab.topic || null,
      title: lab.title || lab.id, completed: true, score: null, max_score: null, percent: null,
      best_percent: null, attempt_count: 0, updated_at: null, metadata: { source: "physics_local_progress_v1" },
    });
  }

  const sectionConfigs = [
    ["B", SECTION_B_TOPICS, THERMAL_INTERACTIVES, thermal],
    ["C", SECTION_C_TOPICS, WAVES_INTERACTIVES, waves],
    ["D", SECTION_D_TOPICS, ELECTRICITY_INTERACTIVES, electricity],
    ["E", SECTION_E_TOPICS, ATOMIC_INTERACTIVES, atomic],
  ];

  for (const [section, topics, labs, progress] of sectionConfigs) {
    for (const topic of topics) {
      if (course[`lesson:${topic.id}`]) rows.push({
        subject_id: "physics", activity_key: `lesson:${topic.id}`, activity_type: "lesson",
        section_id: section, topic_id: topic.id, title: `${topic.id} ${topic.title}`,
        completed: true, score: null, max_score: null, percent: null, best_percent: null,
        attempt_count: 0, updated_at: null, metadata: { source: "physics_local_progress_v1" },
      });
      const quiz = progress[`quiz:${topic.id}`];
      const quizRow = localResultRow("physics", section, topic.id, `quiz:${topic.id}`, quiz);
      if (quizRow) {
        quizRow.best_percent = Math.max(safeNumber(progress[`quiz:${topic.id}:best`]), safeNumber(quizRow.percent));
        rows.push(quizRow);
      }
    }
    for (const lab of labs) {
      if (progress[`lab:${lab.id}`]) rows.push({
        subject_id: "physics", activity_key: `lab:${lab.id}`, activity_type: "lab",
        section_id: section, topic_id: lab.topic || null, title: lab.title || lab.id,
        completed: true, score: null, max_score: null, percent: null, best_percent: null,
        attempt_count: 0, updated_at: null, metadata: { source: "physics_local_progress_v1" },
      });
    }
    const checkpoint = localResultRow("physics", section, null, `checkpoint:${section}`, progress[`checkpoint:${section}`]);
    if (checkpoint) {
      checkpoint.best_percent = Math.max(safeNumber(progress[`checkpoint:${section}:best`]), safeNumber(checkpoint.percent));
      rows.push(checkpoint);
    }
  }

  return rows;
}

function activityPayloadFromPhysicsEvent(event = {}) {
  const section = String(event.section || event.topic || "A").slice(0, 1).toUpperCase();
  const topic = event.topic ? String(event.topic) : null;
  const type = String(event.type || "");
  if (type === "physics_completion") {
    const key = String(event.key || "");
    const [kind, rawId] = key.split(":");
    const activityType = kind === "lab" ? "lab" : "lesson";
    const topicId = activityType === "lesson" ? rawId : (event.topic || PHYSICS_LAB_MAP.get(rawId)?.topic || null);
    return {
      subjectId: "physics", activityKey: key || `${activityType}:${topicId || rawId}`,
      activityType, sectionId: section, topicId,
      title: activityType === "lesson" ? `${topicId} ${physicsTopicTitle(topicId)}` : (PHYSICS_LAB_MAP.get(rawId)?.title || rawId || "Physics lab"),
      completed: Boolean(event.completed), score: null, maxScore: null, percent: null,
      metadata: { source: "physics", event_type: type },
    };
  }
  if (type === "physics_lesson_completion") {
    return {
      subjectId: "physics", activityKey: `lesson:${topic}`, activityType: "lesson", sectionId: section, topicId: topic,
      title: `${topic} ${physicsTopicTitle(topic)}`, completed: Boolean(event.completed),
      score: null, maxScore: null, percent: null, metadata: { source: "physics", event_type: type },
    };
  }
  if (type === "physics_lab_completion") {
    const labId = String(event.lab || "");
    return {
      subjectId: "physics", activityKey: `lab:${labId}`, activityType: "lab", sectionId: section, topicId: topic,
      title: PHYSICS_LAB_MAP.get(labId)?.title || labId || "Physics lab", completed: Boolean(event.completed),
      score: null, maxScore: null, percent: null, metadata: { source: "physics", event_type: type },
    };
  }
  if (type === "physics_topic_quiz") {
    const score = safeNumber(event.score);
    const maxScore = safeNumber(event.maxScore);
    const percent = Number.isFinite(Number(event.percent)) ? safeNumber(event.percent) : maxScore > 0 ? Math.round(score / maxScore * 100) : 0;
    return {
      subjectId: "physics", activityKey: `quiz:${topic}`, activityType: "topic_quiz", sectionId: section, topicId: topic,
      title: `${topic} ${physicsTopicTitle(topic)} topic test`, completed: true, score, maxScore, percent,
      metadata: { source: "physics", event_type: type },
    };
  }
  if (type === "physics_paper2_exam") {
    const score = safeNumber(event.score);
    const maxScore = safeNumber(event.maxScore, 100);
    const percent = Number.isFinite(Number(event.percent)) ? safeNumber(event.percent) : maxScore > 0 ? Math.round(score / maxScore * 100) : 0;
    const paperId = String(event.paperId || `paper-${event.paperNumber || "2"}`);
    const paperNumber = Number(event.paperNumber || 0);
    const paperLabel = String(event.paperLabel || (paperNumber >= 1 && paperNumber <= 26 ? String.fromCharCode(64 + paperNumber) : "")).trim();
    return {
      subjectId: "physics", activityKey: `paper2:${paperId}`, activityType: "exam", sectionId: null, topicId: null,
      title: `Physics Paper 2 Practice Paper ${paperLabel}`.trim(), completed: true, score, maxScore, percent,
      metadata: { source: "physics", event_type: type, paper_id: paperId, paper_number: paperNumber || null, paper_label: paperLabel || null },
    };
  }
  if (type === "physics_mechanics_checkpoint" || type === "physics_section_checkpoint") {
    const checkpointSection = type === "physics_mechanics_checkpoint" ? "A" : section;
    const score = safeNumber(event.score);
    const maxScore = safeNumber(event.maxScore);
    const percent = Number.isFinite(Number(event.percent)) ? safeNumber(event.percent) : maxScore > 0 ? Math.round(score / maxScore * 100) : 0;
    return {
      subjectId: "physics", activityKey: `checkpoint:${checkpointSection}`, activityType: "section_checkpoint",
      sectionId: checkpointSection, topicId: null,
      title: `Section ${checkpointSection} ${SECTION_TITLES[checkpointSection] || "Physics"} checkpoint`,
      completed: true, score, maxScore, percent,
      metadata: { source: "physics", event_type: type },
    };
  }
  return null;
}

export async function recordSubjectActivity({ supabase, activity, silent = false }) {
  if (!activity || !supabase?.rpc) return { data: null, error: null, skipped: true };
  const subjectId = String(activity.subjectId || activity.subject_id || "").trim().toLowerCase();
  const activityKey = String(activity.activityKey || activity.activity_key || "").trim();
  const activityType = String(activity.activityType || activity.activity_type || "").trim().toLowerCase();
  if (!subjectId || !activityKey || !activityType) return { data: null, error: null, skipped: true };
  return supabase.rpc("spark_record_subject_progress", {
    p_subject_id: subjectId,
    p_activity_key: activityKey,
    p_activity_type: activityType,
    p_section_id: activity.sectionId ?? activity.section_id ?? null,
    p_topic_id: activity.topicId ?? activity.topic_id ?? null,
    p_title: activity.title || activityKey,
    p_completed: Boolean(activity.completed),
    p_score: activity.score ?? null,
    p_max_score: activity.maxScore ?? activity.max_score ?? null,
    p_percent: activity.percent ?? null,
    p_metadata: activity.metadata || {},
    p_silent: Boolean(silent),
  });
}

export async function recordPhysicsSubjectActivity({ supabase, event }) {
  const payload = activityPayloadFromPhysicsEvent(event);
  return recordSubjectActivity({ supabase, activity: payload });
}

export async function syncPhysicsLocalProgress({ supabase, userId }) {
  if (!supabase?.rpc || !userId) return { data: null, error: null, skipped: true };
  const rows = readLocalPhysicsSubjectRows(userId);
  if (!rows.length) return { data: [], error: null, skipped: true };
  const payload = rows.map(row => ({
    activity_key: row.activity_key,
    activity_type: row.activity_type,
    section_id: row.section_id,
    topic_id: row.topic_id,
    title: row.title,
    completed: row.completed,
    score: row.score,
    max_score: row.max_score,
    percent: row.percent,
    best_percent: row.best_percent,
    attempt_count: row.attempt_count,
    occurred_at: row.updated_at,
    metadata: row.metadata || {},
  }));
  return supabase.rpc("spark_sync_subject_progress", { p_subject_id: "physics", p_rows: payload });
}

export function mergeSubjectProgressRows(remoteRows = [], localRows = []) {
  const map = new Map();
  for (const row of [...remoteRows, ...localRows]) {
    const key = `${row.subject_id}:${row.activity_key}`;
    const current = map.get(key);
    if (!current) {
      map.set(key, row);
      continue;
    }
    const currentDate = rowDate(current)?.getTime() || 0;
    const nextDate = rowDate(row)?.getTime() || 0;
    const merged = nextDate >= currentDate ? { ...current, ...row } : { ...row, ...current };
    merged.best_percent = Math.max(safeNumber(current.best_percent), safeNumber(row.best_percent), safeNumber(current.percent), safeNumber(row.percent));
    merged.attempt_count = Math.max(safeNumber(current.attempt_count), safeNumber(row.attempt_count));
    merged.completed = Boolean(current.completed || row.completed);
    map.set(key, merged);
  }
  return [...map.values()];
}

export function summarizeSubjectProgress(rows = [], options = {}) {
  const subjectId = options.subjectId || null;
  const scoped = subjectId ? subjectRows(rows, subjectId) : [...rows];
  const lessons = scoped.filter(row => row.activity_type === "lesson" && row.completed);
  const labs = scoped.filter(row => row.activity_type === "lab" && row.completed);
  const quizzes = scoped.filter(row => row.activity_type === "topic_quiz" && (safeNumber(row.attempt_count) > 0 || row.percent != null));
  const checkpoints = scoped.filter(row => row.activity_type === "section_checkpoint" && (safeNumber(row.attempt_count) > 0 || row.percent != null));
  const exams = scoped.filter(row => row.activity_type === "exam" && (safeNumber(row.attempt_count) > 0 || row.percent != null));
  const practiceRows = scoped.filter(row => row.activity_type === "practice" && (safeNumber(row.attempt_count) > 0 || row.percent != null));
  const assessed = [...quizzes, ...checkpoints, ...exams, ...practiceRows];
  const practiceAverage = assessed.length
    ? Math.round(assessed.reduce((sum, row) => sum + safeNumber(row.percent ?? row.best_percent), 0) / assessed.length)
    : 0;
  const topicsPractised = new Set(quizzes.map(row => row.topic_id).filter(Boolean)).size;
  const totalTopics = Math.max(0, safeNumber(options.totalTopics));
  const lessonPercent = totalTopics ? Math.min(100, Math.round(lessons.length / totalTopics * 100)) : 0;
  const latest = [...scoped].sort((a, b) => (rowDate(b)?.getTime() || 0) - (rowDate(a)?.getTime() || 0))[0] || null;
  const practiceAttempts = assessed.reduce((sum, row) => sum + Math.max(1, safeNumber(row.attempt_count, 1)), 0);
  return {
    subjectId,
    active: scoped.length > 0,
    lessonsCompleted: lessons.length,
    totalTopics,
    lessonPercent,
    labsCompleted: labs.length,
    topicTests: quizzes.length,
    topicsPractised,
    checkpoints: checkpoints.length,
    exams: exams.length,
    assessments: checkpoints.length + exams.length,
    practiceSessions: practiceRows.length,
    practiceAttempts,
    practiceAverage,
    latestAt: rowDate(latest)?.toISOString() || null,
    rows: scoped,
  };
}

export function mathematicsDashboardSummary({ done = 0, totalTopics = 0, learningSummary = {} } = {}) {
  const completed = Math.max(0, safeNumber(done));
  const total = Math.max(0, safeNumber(totalTopics));
  const examCount = Math.max(0, safeNumber(learningSummary.examCount));
  const questionCount = Math.max(0, safeNumber(learningSummary.questionAttemptCount));
  const skillCount = Math.max(0, safeNumber(learningSummary.skillCount));
  const practiceAverage = examCount > 0
    ? safeNumber(learningSummary.overallExamAverage)
    : questionCount > 0
      ? safeNumber(learningSummary.questionAccuracy)
      : skillCount > 0
        ? safeNumber(learningSummary.mastery)
        : 0;
  return {
    subjectId: "mathematics",
    active: completed > 0 || questionCount > 0 || examCount > 0 || skillCount > 0,
    lessonsCompleted: completed,
    totalTopics: total,
    lessonPercent: total ? Math.round(completed / total * 100) : 0,
    labsCompleted: 0,
    topicTests: 0,
    topicsPractised: 0,
    checkpoints: examCount,
    exams: examCount,
    assessments: examCount,
    practiceSessions: 0,
    practiceAttempts: questionCount + examCount,
    practiceAverage,
    latestAt: null,
  };
}

export function buildSubjectDashboardSummaries({ subjects = [], mathematics, subjectProgressRows = [], discoverFromProgress = true } = {}) {
  const enabled = (subjects || []).filter(subject => subject.enabled !== false);
  const knownIds = new Set(enabled.map(subject => String(subject.id || "").toLowerCase()).filter(Boolean));
  const discoveredIds = discoverFromProgress ? [...new Set((subjectProgressRows || [])
    .map(row => String(row?.subject_id || "").trim().toLowerCase())
    .filter(id => id && id !== "mathematics" && !knownIds.has(id)))] : [];
  const discovered = discoveredIds.map(id => {
    const scoped = subjectRows(subjectProgressRows, id);
    const topicCount = new Set(scoped.map(row => row.topic_id).filter(Boolean)).size;
    return {
      id,
      name: subjectIdLabel(id),
      shortName: subjectIdLabel(id),
      mark: subjectIdLabel(id).slice(0, 1),
      enabled: true,
      studyView: "study",
      capabilities: { progress: true },
      stats: { topics: topicCount },
      discoveredFromProgress: true,
    };
  });
  return [...enabled, ...discovered].map(subject => {
    if (subject.id === "mathematics") return { ...subject, progress: mathematicsDashboardSummary(mathematics) };
    return {
      ...subject,
      progress: summarizeSubjectProgress(subjectProgressRows, {
        subjectId: subject.id,
        totalTopics: subject.stats?.topics || 0,
      }),
    };
  });
}

export function buildOverallGoalMetric(subjectSummaries = []) {
  const contributors = (subjectSummaries || []).filter(item => {
    const attempts = safeNumber(item?.progress?.practiceAttempts);
    const average = Number(item?.progress?.practiceAverage);
    return attempts > 0 && Number.isFinite(average);
  }).map(item => ({
    subjectId: item.id,
    subjectName: item.shortName || item.name || subjectIdLabel(item.id),
    value: Math.max(0, Math.min(100, Math.round(safeNumber(item.progress.practiceAverage)))),
  }));
  const value = contributors.length
    ? Math.round(contributors.reduce((sum, item) => sum + item.value, 0) / contributors.length)
    : 0;
  return {
    hasData: contributors.length > 0,
    value,
    subjectCount: contributors.length,
    contributors,
  };
}

export function summarizeAllSubjects(subjectSummaries = []) {
  const enabled = (subjectSummaries || []).filter(Boolean);
  const active = enabled.filter(item => item.progress?.active);
  const goalMetric = buildOverallGoalMetric(enabled);
  const lessonsCompleted = active.reduce((sum, item) => sum + safeNumber(item.progress?.lessonsCompleted), 0);
  const totalTopics = enabled.reduce((sum, item) => sum + safeNumber(item.progress?.totalTopics || item.stats?.topics), 0);
  const practiceAttempts = active.reduce((sum, item) => sum + safeNumber(item.progress?.practiceAttempts), 0);
  const practiceAverage = goalMetric.value;
  const checkpoints = active.reduce((sum, item) => sum + safeNumber(item.progress?.checkpoints), 0);
  const exams = active.reduce((sum, item) => sum + safeNumber(item.progress?.exams), 0);
  const assessments = active.reduce((sum, item) => sum + safeNumber(item.progress?.assessments ?? item.progress?.checkpoints), 0);
  const labsCompleted = active.reduce((sum, item) => sum + safeNumber(item.progress?.labsCompleted), 0);
  const lessonPercent = totalTopics ? Math.min(100, Math.round(lessonsCompleted / totalTopics * 100)) : 0;
  return {
    activeSubjects: enabled.length,
    subjectsWithActivity: active.length,
    lessonsCompleted,
    totalTopics,
    lessonPercent,
    practiceAttempts,
    practiceAverage,
    checkpoints,
    exams,
    assessments,
    labsCompleted,
    overallPerformance: goalMetric.value,
    hasOverallPerformance: goalMetric.hasData,
    performanceSubjectCount: goalMetric.subjectCount,
    performanceContributors: goalMetric.contributors,
  };
}

function progressTopicLabel(row) {
  const topicId = String(row?.topic_id || "").trim();
  if (String(row?.subject_id || "").toLowerCase() === "physics" && topicId) {
    return `${topicId} ${physicsTopicTitle(topicId)}`;
  }
  const rawTitle = String(row?.title || "").replace(/\s+topic test$/i, "").trim();
  if (rawTitle) return rawTitle;
  return topicId || "Recorded topic";
}

function reportSkillRows(rows, direction = "strong") {
  const quizzes = rows.filter(row => row.activity_type === "topic_quiz" && row.topic_id && (row.best_percent != null || row.percent != null));
  const mapped = quizzes.map(row => ({
    skill: progressTopicLabel(row),
    score: safeNumber(row.best_percent ?? row.percent),
  }));
  mapped.sort((a, b) => direction === "strong" ? b.score - a.score : a.score - b.score);
  return mapped.slice(0, 3);
}

export function buildRecentSubjectActivity({ subjectProgressRows = [], mathematicsMilestones = [], subjects = null } = {}, limit = 12) {
  const subjectList = Array.isArray(subjects) ? subjects : null;
  const subjectNames = new Map((subjectList || []).map(subject => [String(subject.id || "").toLowerCase(), subject.shortName || subject.name || subject.id]));
  const allowedSubjectIds = subjectList == null ? null : new Set(subjectList.map(subject => String(subject?.id || "").toLowerCase()).filter(Boolean));
  const rows = (subjectProgressRows || []).filter(row => allowedSubjectIds == null || allowedSubjectIds.has(String(row?.subject_id || "").toLowerCase()));
  const eventKeys = new Set(rows
    .filter(row => row?.id != null && row?.occurred_at)
    .map(row => `${row.subject_id}:${row.activity_key}`));
  const genericRows = rows
    .filter(row => {
      if (!rowDate(row)) return false;
      if (row?.metadata?.backfilled && !row?.metadata?.at) return false;
      if (row?.id == null && eventKeys.has(`${row.subject_id}:${row.activity_key}`)) return false;
      return true;
    })
    .map(row => ({
      id: `${row.subject_id}:${row.activity_key}:${row.updated_at || row.created_at || ""}`,
      subjectId: row.subject_id,
      subjectName: subjectNames.get(row.subject_id) || subjectIdLabel(row.subject_id),
      title: row.title || row.activity_key || "Learning activity",
      type: row.activity_type || "other",
      percent: row.percent == null ? null : Math.round(safeNumber(row.percent)),
      at: row.updated_at || row.occurred_at || row.created_at || row?.metadata?.at || null,
    }));
  const mathematicsRows = (allowedSubjectIds == null || allowedSubjectIds.has("mathematics") ? mathematicsMilestones || [] : []).map(row => ({
    id: `mathematics:${row.id || row.created_at || row.title}`,
    subjectId: "mathematics",
    subjectName: subjectNames.get("mathematics") || "Mathematics",
    title: row.title || row.skill || "Mathematics learning activity",
    type: row.event_type || "milestone",
    percent: row.percent == null ? null : Math.round(safeNumber(row.percent)),
    at: row.created_at || null,
  }));
  return [...genericRows, ...mathematicsRows]
    .filter(item => item.at && !Number.isNaN(new Date(item.at).getTime()))
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, Math.max(1, safeNumber(limit, 12)));
}

export function buildGenericSubjectProgressReport({ subject, rows = [], events = [] } = {}, options = {}) {
  const now = options.now ? new Date(options.now) : new Date();
  const period = reportPeriodDefinition(options.period || "month", now, options.custom || {});
  const scoped = subjectRows(rows, subject?.id);
  const scopedEvents = subjectRows(events, subject?.id);
  const periodEvents = scopedEvents.filter(row => inPeriod(row, period));
  const fallbackPeriodRows = scoped.filter(row => {
    if (row?.metadata?.backfilled && !row?.metadata?.at) return false;
    return inPeriod(row, period);
  });
  const periodRows = periodEvents.length ? periodEvents : fallbackPeriodRows;
  const summary = summarizeSubjectProgress(scoped, { subjectId: subject?.id, totalTopics: subject?.stats?.topics || 0 });
  const periodSummary = summarizeSubjectProgress(periodRows, { subjectId: subject?.id, totalTopics: subject?.stats?.topics || 0 });
  const strongestSkills = reportSkillRows(scoped, "strong");
  const weakestSkills = reportSkillRows(scoped, "weak").filter(item => item.score < 80);
  const subjectName = subject?.name || subject?.shortName || "Subject";
  let insight = `SPARK is building a clearer ${subject?.shortName || "subject"} progress picture as lessons and practice are completed.`;
  if (summary.practiceAttempts > 0) {
    insight = `${subject?.shortName || subjectName} practice is averaging ${summary.practiceAverage}%. ${summary.lessonsCompleted} of ${summary.totalTopics || "the available"} topic lessons are marked complete.`;
  } else if (summary.lessonsCompleted > 0) {
    insight = `${summary.lessonsCompleted} ${subject?.shortName || subjectName} topic lesson${summary.lessonsCompleted === 1 ? " is" : "s are"} marked complete. Complete topic practice to add assessment evidence.`;
  }
  const recommendations = [];
  if (weakestSkills[0]) recommendations.push(`Review ${weakestSkills[0].skill}, then complete another targeted topic test.`);
  if (summary.lessonsCompleted < summary.totalTopics) recommendations.push(`Continue the next incomplete ${subject?.shortName || "subject"} lesson.`);
  if (!summary.checkpoints) recommendations.push("Complete a section checkpoint to establish a broader assessment baseline.");
  if (!recommendations.length) recommendations.push("Keep a balanced mix of lessons, topic practice and section checkpoints.");
  const assessments = periodRows
    .filter(row => ["topic_quiz", "section_checkpoint", "exam", "practice"].includes(row.activity_type) && row.percent != null)
    .sort((a, b) => (rowDate(b)?.getTime() || 0) - (rowDate(a)?.getTime() || 0))
    .slice(0, 10)
    .map(row => ({
      id: `${row.subject_id}:${row.activity_key}`,
      label: row.title || row.activity_key,
      percent: Math.round(safeNumber(row.percent)),
      score: safeNumber(row.score),
      maxScore: safeNumber(row.max_score),
      completedAt: row.updated_at || row.occurred_at || row.created_at || null,
    }));
  return {
    subjectId: subject?.id,
    subjectName,
    generatedAt: now.toISOString(),
    period,
    metrics: [
      { label: "Lesson coverage", value: `${summary.lessonPercent}%` },
      { label: "Practice average", value: summary.practiceAttempts ? `${summary.practiceAverage}%` : "N/A" },
      { label: "Topic tests", value: String(summary.topicTests) },
      { label: "Assessments", value: String(summary.assessments ?? summary.checkpoints) },
    ],
    assessmentLabel: "Recent practice and assessments",
    emptyAssessmentCopy: "No scored practice or assessment results in this reporting period.",
    activityLabels: {
      questionsAttempted: "Practice results",
      questionAccuracy: "Practice average",
      examsCompleted: "Section checkpoints",
      examAverage: "Assessment average",
    },
    summary: {
      mastery: summary.practiceAverage,
      skillCount: summary.topicTests,
      examCount: summary.checkpoints,
      insight,
    },
    activity: {
      lessonsCompleted: periodSummary.lessonsCompleted,
      questionsAttempted: periodSummary.practiceAttempts,
      questionAccuracy: periodSummary.practiceAverage,
      hasQuestionAccuracy: periodSummary.practiceAttempts > 0,
      examsCompleted: periodSummary.assessments ?? periodSummary.checkpoints,
      examAverage: periodSummary.practiceAverage,
      hasExamAverage: periodSummary.practiceAttempts > 0,
      tutorSessions: 0,
      flashcardsReviewed: 0,
      milestones: periodRows.length,
      labsCompleted: periodSummary.labsCompleted,
    },
    exams: assessments,
    milestones: periodRows.slice(0, 8).map(row => ({
      id: `${row.subject_id}:${row.activity_key}`,
      title: row.title || row.activity_key,
      created_at: row.updated_at || row.occurred_at || row.created_at || now.toISOString(),
      metadata: { subject_id: row.subject_id },
    })),
    strongestSkills,
    weakestSkills,
    recommendations: recommendations.slice(0, 4),
    goal: null,
    studyCircle: null,
  };
}

export function buildAllSubjectsProgressReport({ subjectSources = [], goal = null } = {}, options = {}) {
  const reports = subjectSources.map(source => source.kind === "mathematics"
    ? { ...buildProgressReport(source.data || {}, options), subjectId: source.subject.id, subjectName: source.subject.name }
    : buildGenericSubjectProgressReport({ subject: source.subject, rows: source.rows || [], events: source.events || [] }, options));
  const active = reports.filter(report => (report.activity?.lessonsCompleted || 0) + (report.activity?.questionsAttempted || 0) + (report.activity?.examsCompleted || 0) + (report.activity?.milestones || 0) > 0);
  const now = options.now ? new Date(options.now) : new Date();
  const period = reportPeriodDefinition(options.period || "month", now, options.custom || {});
  const lessons = active.reduce((sum, report) => sum + safeNumber(report.activity?.lessonsCompleted), 0);
  const practice = active.reduce((sum, report) => sum + safeNumber(report.activity?.questionsAttempted), 0);
  const assessments = active.reduce((sum, report) => sum + safeNumber(report.activity?.examsCompleted), 0);
  const strongestSkills = active.flatMap(report => (report.strongestSkills || []).map(item => ({ ...item, skill: `${report.subjectName}: ${item.skill}` }))).sort((a,b)=>safeNumber(b.score)-safeNumber(a.score)).slice(0,3);
  const weakestSkills = active.flatMap(report => (report.weakestSkills || []).map(item => ({ ...item, skill: `${report.subjectName}: ${item.skill}` }))).sort((a,b)=>safeNumber(a.score)-safeNumber(b.score)).slice(0,3);
  const avgValues = active.map(report => safeNumber(report.activity?.examAverage || report.summary?.mastery)).filter(value => value > 0);
  const overallAverage = avgValues.length ? Math.round(avgValues.reduce((a,b)=>a+b,0)/avgValues.length) : 0;
  return {
    subjectId: "all",
    subjectName: "All subjects",
    generatedAt: now.toISOString(),
    period,
    metrics: [
      { label: "Active subjects", value: String(active.length) },
      { label: "Lessons completed", value: String(lessons) },
      { label: "Practice activity", value: String(practice) },
      { label: "Assessment average", value: avgValues.length ? `${overallAverage}%` : "N/A" },
    ],
    assessmentLabel: "Recent assessments across subjects",
    emptyAssessmentCopy: "No assessment results in this reporting period.",
    activityLabels: {
      questionsAttempted: "Practice activity",
      questionAccuracy: "Recorded average",
      examsCompleted: "Assessments completed",
      examAverage: "Assessment average",
    },
    summary: {
      mastery: overallAverage,
      skillCount: strongestSkills.length + weakestSkills.length,
      examCount: assessments,
      insight: active.length
        ? `Learning activity is recorded across ${active.length} subject${active.length === 1 ? "" : "s"}. Use the subject selector to review each course in detail.`
        : "Complete learning activities in SPARK to build a cross-subject progress picture.",
    },
    activity: {
      lessonsCompleted: lessons,
      questionsAttempted: practice,
      questionAccuracy: overallAverage,
      hasQuestionAccuracy: avgValues.length > 0,
      examsCompleted: assessments,
      examAverage: overallAverage,
      hasExamAverage: avgValues.length > 0,
      tutorSessions: Math.max(0, ...active.map(report => safeNumber(report.activity?.tutorSessions))),
      flashcardsReviewed: active.reduce((sum, report) => sum + safeNumber(report.activity?.flashcardsReviewed), 0),
      milestones: active.reduce((sum, report) => sum + safeNumber(report.activity?.milestones), 0),
    },
    exams: active.flatMap(report => (report.exams || []).map(item => ({ ...item, label: `${report.subjectName}: ${item.label}` }))).sort((a,b)=>new Date(b.completedAt||0)-new Date(a.completedAt||0)).slice(0,10),
    milestones: active.flatMap(report => report.milestones || []).sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0)).slice(0,8),
    strongestSkills,
    weakestSkills,
    recommendations: active.flatMap(report => report.recommendations || []).slice(0,4),
    goal: goal || null,
    studyCircle: null,
  };
}

export const subjectProgressInternals = {
  activityPayloadFromPhysicsEvent,
  SECTION_TITLES,
  PHYSICS_TOPIC_LIST,
  PHYSICS_LAB_LIST,
};
