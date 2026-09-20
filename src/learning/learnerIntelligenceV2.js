// ============================================================================
// SPARK Learner Intelligence V2
//
// This layer turns recorded learning evidence into a transparent learner model.
// It NEVER changes canonical answers, mark schemes or awarded marks.
// ============================================================================

const DAY_MS = 86400000;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, Number(value) || 0));
const pct = value => Math.round(clamp(value) * 100);
const safeNumber = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const normalized = value => String(value ?? "").trim().toLowerCase();

export const LEARNER_INTELLIGENCE_VERSION = "spark-learner-v2.0";

export const EVIDENCE_WEIGHTS = Object.freeze({
  exam: 1.00,
  section_checkpoint: 0.88,
  topic_quiz: 0.72,
  practice: 0.68,
  adaptive: 0.68,
  lab: 0.34,
  flashcard_review: 0.24,
  flashcard: 0.24,
  sba_review: 0.16,
  lesson: 0.12,
  other: 0.10,
});

const PREREQUISITES = Object.freeze({
  mathematics: {
    "quadratics": ["algebra", "factorisation"],
    "trigonometry": ["pythagoras", "algebra"],
    "graphs": ["algebra", "coordinates"],
    "vectors": ["coordinates", "pythagoras"],
    "statistics": ["fractions", "percentages"],
  },
  physics: {
    "A2": ["A1"],
    "A3": ["A1"],
    "A4": ["A1", "A2"],
    "A5": ["A1", "A4"],
    "A6": ["A1", "A4"],
    "B2": ["B1"],
    "B3": ["B1", "B2"],
    "C2": ["C1"],
    "C3": ["C1", "C2"],
    "D2": ["D1"],
    "D3": ["D1", "D2"],
    "E2": ["E1"],
  },
  "information-technology": {
    "spreadsheet": ["computer-fundamentals"],
    "database": ["computer-fundamentals"],
    "web": ["word-processing"],
    "programming": ["problem-solving"],
    "sba": ["word", "spreadsheet", "database", "web", "programming"],
  },
});

function rowDate(row = {}) {
  const value = row.completed_at || row.occurred_at || row.first_recorded_at || row.updated_at || row.created_at || row.metadata?.at;
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysSince(value, now = new Date()) {
  if (!value) return 999;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 999;
  return Math.max(0, (now.getTime() - date.getTime()) / DAY_MS);
}

function titleFromKey(value) {
  return String(value || "")
    .replace(/^lesson:|^lab:|^flashcard:|^checkpoint:|^paper[12]:|^sba:/i, "")
    .replace(/[:_-]+/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim() || "Learning skill";
}

function skillKeyForRow(row = {}) {
  const explicit = row.metadata?.skill || row.metadata?.objective || row.metadata?.subtopic;
  return String(explicit || row.topic_id || row.section_id || row.title || row.activity_key || "general").trim();
}

const IT_PROFILE_SKILL_MAX = Object.freeze({
  "Theory": 35,
  "Productivity Tools": 30,
  "Problem-Solving and Programming": 25,
});

function hasExplicitSkillScope(row = {}) {
  return Boolean(
    row?.metadata?.skill ||
    row?.metadata?.objective ||
    row?.metadata?.subtopic ||
    row?.topic_id ||
    row?.section_id
  );
}

function informationTechnologyProfileEvidence(row = {}) {
  if (normalized(row?.subject_id) !== "information-technology") return [];
  if (normalized(row?.activity_type) !== "exam") return [];

  const profiles = row?.metadata?.profiles;
  if (!profiles || typeof profiles !== "object") return [];

  return Object.entries(IT_PROFILE_SKILL_MAX)
    .map(([skill, max]) => {
      const earned = Number(profiles?.[skill]);
      if (!Number.isFinite(earned)) return null;
      const percent = Math.max(0, Math.min(100, Math.round((earned / max) * 100)));
      return {
        ...row,
        percent,
        best_percent:percent,
        metadata:{
          ...(row.metadata || {}),
          skill,
          profile_name:skill,
          profile_earned:earned,
          profile_max:max,
          source:`${row?.metadata?.source || "information_technology_practice"}:profile`,
        },
      };
    })
    .filter(Boolean);
}

function evidenceScore(row = {}) {
  const percent = Number(row.percent ?? row.best_percent);
  if (Number.isFinite(percent)) return clamp(percent / 100);
  if (row.completed === false) return 0.25;
  switch (normalized(row.activity_type)) {
    case "lesson": return 0.62; // exposure, not mastery
    case "lab": return 0.70; // meaningful exploration, still not an exam result
    case "flashcard":
    case "flashcard_review": return 0.66;
    case "sba_review": return 0.60;
    default: return row.completed ? 0.64 : 0.50;
  }
}

function evidenceWeight(row = {}) {
  const type = normalized(row.activity_type);
  const base = EVIDENCE_WEIGHTS[type] ?? EVIDENCE_WEIGHTS.other;
  const attempts = Math.max(1, safeNumber(row.attempt_count, 1));
  const attemptBoost = Math.min(1.35, 1 + Math.log2(attempts) * 0.08);
  const source = normalized(row.metadata?.source);
  const canonicalBoost = source.includes("paper") || type === "exam" ? 1.08 : 1;
  return base * attemptBoost * canonicalBoost;
}

function misconceptionForRows(rows = []) {
  const counts = {};
  const labels = {};
  for (const row of rows) {
    const metadata = row?.metadata || {};
    const candidates = [
      metadata.misconception,
      metadata.misconception_code,
      metadata.error_code,
      metadata.error,
      metadata.common_error,
    ].filter(Boolean);

    // Different evidence producers may expose the same misconception through
    // more than one metadata alias. A single learner event must count once.
    const seenInRow = new Set();

    for (const raw of candidates) {
      const code = String(typeof raw === "object" ? (raw.code || raw.label || "") : raw).trim();
      if (!code || seenInRow.has(code)) continue;
      seenInRow.add(code);
      counts[code] = (counts[code] || 0) + 1;
      if (typeof raw === "object" && raw.label) labels[code] = raw.label;
    }
  }
  const winner = Object.entries(counts).sort((a,b) => b[1] - a[1])[0];
  return winner ? { code:winner[0], count:winner[1], label:labels[winner[0]] || titleFromKey(winner[0]) } : null;
}

function trendForEvidence(items = []) {
  const scored = items
    .filter(item => Number.isFinite(item.score))
    .sort((a,b) => a.at - b.at);
  if (scored.length < 3) return 0;
  const cut = Math.max(1, Math.floor(scored.length / 2));
  const older = scored.slice(0, cut);
  const newer = scored.slice(cut);
  const avg = list => list.reduce((sum,item) => sum + item.score, 0) / Math.max(1, list.length);
  return clamp((avg(newer) - avg(older)), -1, 1);
}

function confidenceFromEvidence(totalWeight, sourceCount, lastDate, now) {
  const volume = 1 - Math.exp(-Math.max(0, totalWeight) / 2.8);
  const diversity = Math.min(1, sourceCount / 3);
  const recency = Math.exp(-daysSince(lastDate, now) / 90);
  return clamp(volume * 0.64 + diversity * 0.20 + recency * 0.16);
}

function retentionForState(mastery, confidence, lastDate, now) {
  const elapsed = daysSince(lastDate, now);
  const halfLife = 9 + mastery * 34 + confidence * 24;
  const retention = mastery * Math.pow(0.5, elapsed / Math.max(5, halfLife));
  return {
    retention: clamp(retention),
    retentionRisk: clamp(1 - retention),
    daysSincePractice: Math.round(elapsed),
    halfLifeDays: Math.round(halfLife),
  };
}

function calibrationForState(state = {}) {
  if (state.studentConfidence === null || state.studentConfidence === undefined) return null;
  const student = Number(state.studentConfidence);
  if (!Number.isFinite(student)) return null;
  const difference = student - state.mastery;
  if (difference >= 0.18) {
    return {
      key: "overconfident",
      label: "Confidence is running ahead of performance",
      detail: "Your self-rating is higher than the evidence SPARK has recorded. A short check will help confirm what is secure.",
    };
  }
  if (difference <= -0.18) {
    return {
      key: "underconfident",
      label: "Your results are stronger than your self-rating",
      detail: "The evidence suggests you may know this material better than you think. Try a harder question before reviewing again.",
    };
  }
  return {
    key: "calibrated",
    label: "Confidence matches the evidence",
    detail: "Your self-rating is broadly consistent with your recent performance.",
  };
}

export function buildSkillStateFromEvidence(skill, rows = [], options = {}) {
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());
  const relevant = (rows || []).filter(Boolean);
  let alpha = 2;
  let beta = 2;
  let totalWeight = 0;
  const sources = new Set();
  const evidence = [];

  for (const row of relevant) {
    const score = evidenceScore(row);
    const weight = evidenceWeight(row);
    alpha += score * weight * 3;
    beta += (1 - score) * weight * 3;
    totalWeight += weight;
    sources.add(normalized(row.activity_type) || "other");
    evidence.push({ score, weight, at: rowDate(row)?.getTime() || 0 });
  }

  const mastery = clamp(alpha / (alpha + beta));
  const lastDate = relevant.map(rowDate).filter(Boolean).sort((a,b) => b-a)[0] || null;
  const modelConfidence = confidenceFromEvidence(totalWeight, sources.size, lastDate, now);
  const retention = retentionForState(mastery, modelConfidence, lastDate, now);
  const trend = trendForEvidence(evidence);
  const commonError = misconceptionForRows(relevant);
  const studentConfidenceValue = relevant
    .map(row => Number(row?.metadata?.student_confidence ?? row?.metadata?.confidence))
    .filter(Number.isFinite)
    .slice(-1)[0];

  const state = {
    skill: String(skill || "General"),
    mastery,
    masteryPercent: pct(mastery),
    modelConfidence,
    modelConfidencePercent: pct(modelConfidence),
    studentConfidence: Number.isFinite(studentConfidenceValue) ? clamp(studentConfidenceValue > 1 ? studentConfidenceValue / 100 : studentConfidenceValue) : null,
    trend,
    trendLabel: trend >= 0.08 ? "Improving" : trend <= -0.08 ? "Needs attention" : "Steady",
    evidenceCount: relevant.length,
    evidenceWeight: Number(totalWeight.toFixed(2)),
    sourceCount: sources.size,
    lastPractisedAt: lastDate?.toISOString() || null,
    commonError,
    ...retention,
  };
  state.calibration = calibrationForState(state);
  state.priorityScore = Math.round(
    (1 - state.mastery) * 46 +
    state.retentionRisk * 25 +
    (1 - state.modelConfidence) * 16 +
    Math.max(0, -state.trend) * 13
  );
  return state;
}

export function prerequisiteRisks(subjectId, skillState, allStates = []) {
  const graph = PREREQUISITES[subjectId] || {};
  const key = String(skillState?.skill || "");
  const normalizedKey = normalized(key);
  const direct = graph[key] || Object.entries(graph).find(([candidate]) => normalizedKey.includes(normalized(candidate)))?.[1] || [];
  if (!direct.length) return [];
  return direct.map(prereq => {
    const state = allStates.find(item => normalized(item.skill).includes(normalized(prereq)));
    return state ? { skill: state.skill, masteryPercent: state.masteryPercent } : { skill: titleFromKey(prereq), masteryPercent: null };
  }).filter(item => item.masteryPercent == null || item.masteryPercent < 65);
}

function actionForState(subjectId, state, prerequisiteRisk = []) {
  if (!state) {
    return {
      actionType: "lesson",
      targetActivityType: "lesson",
      title: "Build a baseline",
      detail: "SPARK needs a little more evidence before it can personalise this subject.",
      why: ["There is not enough scored evidence yet.", "Start with one lesson and a short practice set."],
    };
  }
  if (prerequisiteRisk.length) {
    return {
      actionType: "prerequisite_review",
      targetActivityType: "lesson",
      title: `Review ${prerequisiteRisk[0].skill} first`,
      detail: `${state.skill} may be difficult because a supporting skill is not secure yet.`,
      why: [
        `${state.skill} currently has ${state.masteryPercent}% estimated mastery.`,
        `${prerequisiteRisk[0].skill} is a prerequisite and needs attention.`,
      ],
    };
  }
  if (state.commonError && state.commonError.count >= 2) {
    return {
      actionType: "targeted_practice",
      targetActivityType: "topic_quiz",
      title: `Fix the ${state.commonError.label.toLowerCase()} pattern`,
      detail: `SPARK has seen the same error more than once in ${state.skill}.`,
      why: [
        `${state.commonError.label} has appeared ${state.commonError.count} times.`,
        `Targeted questions will test whether that specific error has been corrected.`,
      ],
    };
  }
  if (state.modelConfidencePercent < 35) {
    return {
      actionType: "baseline",
      targetActivityType: "topic_quiz",
      title: `Give SPARK a better baseline for ${state.skill}`,
      detail: "A short scored activity will make the recommendation more reliable.",
      why: [
        `Model confidence is only ${state.modelConfidencePercent}%.`,
        `${state.evidenceCount} useful evidence item${state.evidenceCount === 1 ? "" : "s"} are currently available.`,
      ],
    };
  }
  if (state.masteryPercent >= 62 && state.retentionRisk >= 0.42) {
    return {
      actionType: "flashcards",
      targetActivityType: "flashcard_review",
      title: `Refresh ${state.skill}`,
      detail: "The skill was stronger before, but the evidence is becoming old enough that recall may be fading.",
      why: [
        `Estimated mastery is ${state.masteryPercent}%.`,
        `It has been about ${state.daysSincePractice} day${state.daysSincePractice === 1 ? "" : "s"} since meaningful practice.`,
      ],
    };
  }
  if (state.masteryPercent < 45) {
    const labFriendly = ["physics", "information-technology"].includes(subjectId);
    return {
      actionType: labFriendly ? "lesson_or_lab" : "lesson",
      targetActivityType: labFriendly ? "lab" : "lesson",
      title: labFriendly ? `Rebuild ${state.skill} with a lesson or practical` : `Review ${state.skill} before harder questions`,
      detail: "The current evidence suggests the foundation needs strengthening first.",
      why: [
        `Estimated mastery is ${state.masteryPercent}%.`,
        state.trendLabel === "Needs attention" ? "Recent evidence is moving in the wrong direction." : "A foundation activity is more useful than simply increasing difficulty.",
      ],
    };
  }
  if (state.masteryPercent < 76) {
    return {
      actionType: "targeted_practice",
      targetActivityType: "topic_quiz",
      title: `Do a short targeted set on ${state.skill}`,
      detail: "The foundation is there. The next step is making the skill more reliable.",
      why: [
        `Estimated mastery is ${state.masteryPercent}%.`,
        `Model confidence is ${state.modelConfidencePercent}%, so scored practice can sharpen the estimate.`,
      ],
    };
  }
  return {
    actionType: "assessment",
    targetActivityType: "section_checkpoint",
    title: `Test ${state.skill} under exam-style conditions`,
    detail: "The skill looks secure enough to verify with broader, harder evidence.",
    why: [
      `Estimated mastery is ${state.masteryPercent}%.`,
      `Retention is ${pct(state.retention)}%, so SPARK can now test transfer rather than repeat basic review.`,
    ],
  };
}

function groupRowsBySkill(rows = [], subjectId = "") {
  const grouped = new Map();

  const add = row => {
    const key = skillKeyForRow(row);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  };

  for (const row of rows || []) {
    if (subjectId && normalized(row.subject_id) && normalized(row.subject_id) !== normalized(subjectId)) continue;

    const profileRows = informationTechnologyProfileEvidence(row);
    if (profileRows.length) {
      profileRows.forEach(add);
      continue;
    }

    // A full Paper 01/Paper 02 result is valuable assessment evidence for
    // readiness, but its paper title is not a learner skill. Only an exam row
    // with an actual topic/section/skill scope may create a skill state.
    if (normalized(row.activity_type) === "exam" && !hasExplicitSkillScope(row)) {
      continue;
    }

    add(row);
  }
  return grouped;
}

function assessmentAverage(rows = []) {
  const values = rows
    .filter(row => ["topic_quiz","section_checkpoint","exam","practice"].includes(normalized(row.activity_type)))
    .map(row => Number(row.percent ?? row.best_percent))
    .filter(Number.isFinite);
  return values.length ? values.reduce((a,b) => a+b,0) / values.length : null;
}

function lessonCoverage(rows = [], totalTopics = 0) {
  const completed = new Set(rows.filter(row => normalized(row.activity_type) === "lesson" && row.completed).map(row => row.topic_id || row.activity_key)).size;
  return totalTopics > 0 ? clamp(completed / totalTopics) : completed > 0 ? 0.5 : 0;
}

export function buildSubjectLearnerIntelligence({
  subject,
  rows = [],
  now = new Date(),
} = {}) {
  const subjectId = normalized(subject?.id);
  const scoped = (rows || []).filter(row => !subjectId || !row.subject_id || normalized(row.subject_id) === subjectId);
  const groups = groupRowsBySkill(scoped, subjectId);
  const states = [...groups.entries()].map(([skill, skillRows]) => buildSkillStateFromEvidence(skill, skillRows, { now }));
  const usefulStates = states.filter(state => state.evidenceCount > 0);
  const priorities = [...usefulStates].sort((a,b) => b.priorityScore - a.priorityScore || a.masteryPercent - b.masteryPercent);
  const focus = priorities[0] || null;
  const prereqs = prerequisiteRisks(subjectId, focus, usefulStates);
  const recommendation = actionForState(subjectId, focus, prereqs);

  const avg = key => usefulStates.length
    ? usefulStates.reduce((sum,state) => sum + Number(state[key] || 0), 0) / usefulStates.length
    : 0;
  const mastery = avg("mastery");
  const retention = avg("retention");
  const modelConfidence = avg("modelConfidence");
  const assessment = assessmentAverage(scoped);
  const coverage = lessonCoverage(scoped, Number(subject?.stats?.topics || 0));
  const breadth = Number(subject?.stats?.topics || 0) > 0
    ? clamp(new Set(scoped.map(skillKeyForRow)).size / Number(subject.stats.topics))
    : usefulStates.length ? Math.min(1, usefulStates.length / 8) : 0;
  const readiness = clamp(
    coverage * 0.18 +
    mastery * 0.30 +
    retention * 0.18 +
    (assessment == null ? mastery : assessment / 100) * 0.24 +
    breadth * 0.10
  );

  return {
    version: LEARNER_INTELLIGENCE_VERSION,
    subjectId,
    subjectName: subject?.name || subject?.shortName || "Subject",
    generatedAt: (now instanceof Date ? now : new Date(now)).toISOString(),
    hasEvidence: scoped.length > 0,
    states: usefulStates,
    focus,
    prioritySkills: priorities.slice(0, 5),
    strongSkills: [...usefulStates].filter(state => state.masteryPercent >= 80).sort((a,b) => b.masteryPercent-a.masteryPercent).slice(0,3),
    recommendation: {
      ...recommendation,
      skill: focus?.skill || null,
      baselineMastery: focus?.masteryPercent ?? null,
      readinessPercent: pct(readiness),
      prerequisiteRisks: prereqs,
    },
    metrics: {
      masteryPercent: pct(mastery),
      retentionPercent: pct(retention),
      modelConfidencePercent: pct(modelConfidence),
      readinessPercent: pct(readiness),
      assessmentAverage: assessment == null ? null : Math.round(assessment),
      coveragePercent: pct(coverage),
      breadthPercent: pct(breadth),
    },
  };
}

export function buildLearnerIntelligenceFromSkillStates({
  subject,
  learnerStates = [],
  summary = {},
  now = new Date(),
} = {}) {
  const states = (learnerStates || []).map(row => {
    const mastery = clamp((row.mastery_probability ?? row.mastery_score ?? 50) > 1 ? Number(row.mastery_probability ?? row.mastery_score) / 100 : Number(row.mastery_probability ?? row.mastery_score ?? 0.5));
    const modelConfidence = clamp((row.confidence ?? 0) > 1 ? Number(row.confidence) / 100 : Number(row.confidence || 0));
    const last = row.last_practised_at || null;
    const retention = retentionForState(mastery, modelConfidence, last, now instanceof Date ? now : new Date(now));
    const misconceptionCounts = row.misconception_counts || {};
    const winner = Object.entries(misconceptionCounts).sort((a,b)=>Number(b[1])-Number(a[1]))[0];
    const state = {
      skill: String(row.skill || "Mathematics"),
      mastery,
      masteryPercent:pct(mastery),
      modelConfidence,
      modelConfidencePercent:pct(modelConfidence),
      studentConfidence: row.student_confidence == null ? null : clamp(Number(row.student_confidence) > 1 ? Number(row.student_confidence)/100 : Number(row.student_confidence)),
      trend:safeNumber(row.trend_score),
      trendLabel:safeNumber(row.trend_score)>=0.08?"Improving":safeNumber(row.trend_score)<=-0.08?"Needs attention":"Steady",
      evidenceCount:Math.max(0,safeNumber(row.evidence_count)),
      lastPractisedAt:last,
      commonError:winner?{code:winner[0],count:Number(winner[1])||0,label:row.misconception_labels?.[winner[0]]||titleFromKey(winner[0])}:null,
      ...retention,
    };
    state.calibration=calibrationForState(state);
    state.priorityScore=Math.round((1-mastery)*46+state.retentionRisk*25+(1-modelConfidence)*16+Math.max(0,-state.trend)*13);
    return state;
  });
  const priorities=[...states].sort((a,b)=>b.priorityScore-a.priorityScore);
  const focus=priorities[0]||null;
  const subjectId=normalized(subject?.id||"mathematics");
  const prereqs=prerequisiteRisks(subjectId,focus,states);
  const recommendation=actionForState(subjectId,focus,prereqs);
  const avg=key=>states.length?states.reduce((s,x)=>s+Number(x[key]||0),0)/states.length:0;
  const coverage=clamp(Number(summary.lessonPercent||summary.coveragePercent||0)/100);
  const assessment=Number(summary.mastery ?? summary.practiceAverage);
  const readiness=clamp(coverage*.18+avg("mastery")*.30+avg("retention")*.18+(Number.isFinite(assessment)?assessment/100:avg("mastery"))*.24+Math.min(1,states.length/12)*.10);
  return {
    version:LEARNER_INTELLIGENCE_VERSION,
    subjectId,
    subjectName:subject?.name||"Mathematics",
    generatedAt:(now instanceof Date?now:new Date(now)).toISOString(),
    hasEvidence:states.length>0,
    states,
    focus,
    prioritySkills:priorities.slice(0,5),
    strongSkills:[...states].filter(s=>s.masteryPercent>=80).sort((a,b)=>b.masteryPercent-a.masteryPercent).slice(0,3),
    recommendation:{...recommendation,skill:focus?.skill||null,baselineMastery:focus?.masteryPercent??null,readinessPercent:pct(readiness),prerequisiteRisks:prereqs},
    metrics:{
      masteryPercent:pct(avg("mastery")),
      retentionPercent:pct(avg("retention")),
      modelConfidencePercent:pct(avg("modelConfidence")),
      readinessPercent:pct(readiness),
      assessmentAverage:Number.isFinite(assessment)?Math.round(assessment):null,
      coveragePercent:pct(coverage),
      breadthPercent:Math.round(Math.min(1,states.length/12)*100),
    },
  };
}

export function explanationForIntelligence(intelligence = {}) {
  const focus = intelligence.focus;
  if (!focus) return "SPARK needs a little more learning evidence before it can make a strong recommendation.";
  const pieces = [
    `${focus.skill} is the current priority at ${focus.masteryPercent}% estimated mastery.`,
    `SPARK is ${focus.modelConfidencePercent}% confident in that estimate.`,
  ];
  if (focus.daysSincePractice < 999) pieces.push(`The last meaningful evidence was about ${focus.daysSincePractice} day${focus.daysSincePractice===1?"":"s"} ago.`);
  if (focus.commonError) pieces.push(`The most repeated error signal is ${focus.commonError.label.toLowerCase()}.`);
  return pieces.join(" ");
}