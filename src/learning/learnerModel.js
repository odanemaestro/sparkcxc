import { applyPrerequisiteRisk } from "./prerequisiteGraph";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, Number(value) || 0));

function probability(value, fallback = 0.5) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return clamp(numeric > 1 ? numeric / 100 : numeric);
}

function confidenceLabel(value) {
  const score = probability(value, 0);
  if (score >= 0.72) return "High";
  if (score >= 0.42) return "Medium";
  return "Low";
}

function trendLabel(value) {
  const score = Number(value) || 0;
  if (score >= 0.025) return "Improving";
  if (score <= -0.025) return "Needs attention";
  return "Steady";
}

function titleFromCode(code) {
  const raw = String(code || "").split("::").pop() || "";
  return raw
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function subjectIdFromRow(row = {}) {
  if (row.subject_id) return String(row.subject_id).toLowerCase();
  const skill = String(row.skill || "").toLowerCase();
  if (skill.startsWith("physics ::")) return "physics";
  if (skill.startsWith("information technology ::")) return "information-technology";
  return "mathematics";
}

function displaySkill(raw) {
  const value = String(raw || "Unclassified skill");
  return value.includes("::") ? value.split("::").slice(1).join("::").trim() : value;
}

function topMisconception(counts, labels = {}) {
  const entries = Object.entries(counts || {})
    .map(([code, count]) => ({ code, count: Number(count) || 0 }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
  if (!entries.length) return null;
  const first = entries[0];
  return {
    ...first,
    label: labels?.[first.code] || titleFromCode(first.code),
  };
}

function derivedRetention(row, masteryProbability) {
  // Retention must continue to change even on days when the student has not
  // produced new evidence. Recompute it from the last meaningful practice
  // timestamp and stored stability instead of trusting a stale persisted value.
  if (row.last_practised_at) {
    const last = new Date(row.last_practised_at).getTime();
    if (Number.isFinite(last)) {
      const ageDays = Math.max(0, (Date.now() - last) / 86400000);
      const stability = Math.max(4, Number(row.stability_days || (14 + masteryProbability * 60)));
      return clamp(Math.exp(-ageDays / stability));
    }
  }
  const explicit = Number(row.retention_probability);
  if (Number.isFinite(explicit)) return probability(explicit, 1);
  return 0.82;
}

function confidenceBias(studentConfidence, mastery) {
  if (studentConfidence == null) return "unknown";
  const gap = studentConfidence - mastery;
  if (gap >= 15) return "overconfident";
  if (gap <= -15) return "underconfident";
  return "well-calibrated";
}

function recommendationForState(state) {
  if (state.prerequisiteRisk >= 0.3 && state.prerequisiteWeaknesses?.length) {
    return `Review ${state.prerequisiteWeaknesses[0].term} first, then return to this skill.`;
  }
  if (state.commonError) return `Correct the recurring ${state.commonError.label.toLowerCase()} pattern, then do a short targeted practice set.`;
  if (state.retentionRisk >= 0.4 && state.mastery >= 65) return "Use a short spaced review now, then confirm the skill with one exam-style question.";
  return recommendationForMastery(state.masteryProbability, state.modelConfidenceProbability);
}

export function normalizeLearnerState(row = {}) {
  const masteryProbability = probability(row.mastery_probability ?? row.mastery_score, 0.5);
  const modelConfidenceProbability = probability(row.model_confidence ?? row.confidence, 0);
  const trendScore = Number(row.trend_score) || 0;
  const commonError = topMisconception(row.misconception_counts, row.misconception_labels);
  const mastery = Math.round(masteryProbability * 100);
  const modelConfidence = Math.round(modelConfidenceProbability * 100);
  const retentionProbability = derivedRetention(row, masteryProbability);
  const retention = Math.round(retentionProbability * 100);
  const retentionRisk = clamp(1 - retentionProbability);
  const effectiveMasteryProbability = Number.isFinite(Number(row.effective_mastery))
    ? probability(row.effective_mastery, masteryProbability * retentionProbability)
    : masteryProbability * retentionProbability;
  const effectiveMastery = Math.round(effectiveMasteryProbability * 100);
  const studentConfidenceProbability = row.self_confidence == null ? null : probability(row.self_confidence, 0);
  const studentConfidence = studentConfidenceProbability == null ? null : Math.round(studentConfidenceProbability * 100);
  const calibrationGap = studentConfidence == null ? null : Math.round(studentConfidence - mastery);
  const evidenceCount = Math.max(0, Number(row.evidence_count) || 0);
  const recencyPenalty = row.last_practised_at
    ? Math.min(18, Math.max(0, (Date.now() - new Date(row.last_practised_at).getTime()) / 86400000) * 0.35)
    : 8;
  const fallbackPriority = Math.round(
    (100 - effectiveMastery) * 0.52 +
    (100 - modelConfidence) * 0.18 +
    Math.max(0, -trendScore * 100) * 0.12 +
    retentionRisk * 100 * 0.18
  );
  const subjectId = subjectIdFromRow(row);
  const rawSkill = String(row.skill || "Unclassified skill");

  return {
    subjectId,
    rawSkill,
    skill: displaySkill(rawSkill),
    mastery,
    masteryProbability,
    effectiveMastery,
    effectiveMasteryProbability,
    retention,
    retentionProbability,
    retentionRisk,
    stabilityDays: Math.max(0, Number(row.stability_days) || 0),
    modelConfidence,
    modelConfidenceProbability,
    confidence: modelConfidence,
    confidenceProbability: modelConfidenceProbability,
    confidenceLabel: confidenceLabel(modelConfidenceProbability),
    studentConfidence,
    studentConfidenceProbability,
    calibrationGap,
    confidenceBias: confidenceBias(studentConfidence, mastery),
    evidenceCount,
    scoredEvidenceCount: Math.max(0, Number(row.scored_evidence_count) || 0),
    trendScore,
    trendLabel: trendLabel(trendScore),
    lastPractisedAt: row.last_practised_at || row.last_evidence_at || null,
    lastSource: row.last_source || null,
    commonError,
    recommendation: row.recommended_action || null,
    priorityScore: Number.isFinite(Number(row.priority_score)) ? Math.round(Number(row.priority_score)) : fallbackPriority,
    prerequisiteRisk: Math.max(0, Math.min(1, Number(row.prerequisite_risk) || 0)),
    prerequisiteWeaknesses: [],
    modelVersion: row.model_version || "li-v1",
    recencyPenalty,
  };
}

export function recommendationForMastery(mastery, confidence = 0) {
  const score = probability(mastery, 0.5);
  const certainty = probability(confidence, 0);
  if (certainty < 0.2) return "Build a stronger baseline with a lesson and a short practice set.";
  if (score < 0.45) return "Review the lesson, then do targeted Adaptive Practice and related flashcards.";
  if (score < 0.60) return "Use targeted Adaptive Practice and flashcards before moving to harder questions.";
  if (score < 0.75) return "Mix targeted practice with harder questions to make the skill more reliable.";
  if (score < 0.85) return "Use spaced review and exam-style questions to strengthen consistency.";
  return "Maintain this skill with spaced review while SPARK shifts attention to weaker areas.";
}

function preferV2Rows(rows = []) {
  const grouped = new Map();
  for (const row of rows || []) {
    const subjectId = subjectIdFromRow(row);
    const rawSkill = String(row.skill || "Unclassified skill");
    const key = `${subjectId}::${rawSkill.toLowerCase()}`;
    const current = grouped.get(key);
    const currentVersion = String(current?.model_version || "");
    const candidateVersion = String(row?.model_version || "");
    if (!current || candidateVersion.includes("v2") || !currentVersion.includes("v2")) grouped.set(key, row);
  }
  return [...grouped.values()];
}

function readinessForSubject(states = []) {
  const withEvidence = states.filter(item => item.evidenceCount > 0 || item.modelConfidence > 0);
  if (!withEvidence.length) {
    return {
      score:0, confidence:0, breadth:0, label:"Building baseline",
      components:{ knowledge:0, retention:0, paper1:null, paper2:null, consistency:0, breadth:0 },
    };
  }

  const exam1 = withEvidence.find(item => /\bpaper\s*1\b/i.test(item.skill));
  const exam2 = withEvidence.find(item => /\bpaper\s*2\b/i.test(item.skill));
  const knowledgeRows = withEvidence.filter(item => !/\bpaper\s*[12]\b/i.test(item.skill));
  const basis = knowledgeRows.length ? knowledgeRows : withEvidence;
  const knowledge = basis.reduce((sum,item)=>sum+item.effectiveMastery,0)/basis.length;
  const confidence = withEvidence.reduce((sum,item)=>sum+item.modelConfidence,0)/withEvidence.length;
  const retention = basis.reduce((sum,item)=>sum+item.retention,0)/basis.length;
  const now = Date.now();
  const recent = basis.filter(item => {
    const value = item.lastPractisedAt ? new Date(item.lastPractisedAt).getTime() : NaN;
    return Number.isFinite(value) && now-value <= 14*86400000;
  }).length;
  const consistency = basis.length ? Math.round(recent/basis.length*100) : 0;
  const breadth = Math.min(100, basis.length * 8);
  const paper1 = exam1?.effectiveMastery ?? null;
  const paper2 = exam2?.effectiveMastery ?? null;

  // A missing full-paper result is not treated as mastery. We use a conservative
  // fraction of current knowledge until SPARK has direct exam evidence.
  const paper1Contribution = paper1 == null ? knowledge*0.60 : paper1;
  const paper2Contribution = paper2 == null ? knowledge*0.60 : paper2;

  const score = Math.round(
    knowledge*0.35 +
    retention*0.15 +
    confidence*0.10 +
    paper1Contribution*0.125 +
    paper2Contribution*0.125 +
    consistency*0.10 +
    breadth*0.05
  );
  const evidenceConfidence = Math.round(Math.min(100,
    confidence*0.65 + (paper1 != null ? 15 : 0) + (paper2 != null ? 15 : 0) + Math.min(5,basis.length)*1
  ));

  return {
    score,
    confidence:evidenceConfidence,
    breadth:Math.round(breadth),
    label:score>=80?"Strong":score>=65?"Developing well":score>=45?"Building":"Needs attention",
    components:{
      knowledge:Math.round(knowledge),
      retention:Math.round(retention),
      paper1:paper1 == null ? null : Math.round(paper1),
      paper2:paper2 == null ? null : Math.round(paper2),
      consistency,
      breadth:Math.round(breadth),
    },
  };
}

function buildSubjectProfile(subjectId, states) {
  const scoped = states.filter(item=>item.subjectId===subjectId);
  const prioritySkills=[...scoped]
    .filter(item=>(item.evidenceCount>0||item.modelConfidence>0) && (item.effectiveMastery<82||item.modelConfidence<50||item.trendLabel==="Needs attention"||item.retentionRisk>=0.35))
    .sort((a,b)=>b.priorityScore-a.priorityScore || a.effectiveMastery-b.effectiveMastery)
    .slice(0,5);
  const strongSkills=[...scoped]
    .filter(item=>item.effectiveMastery>=80&&item.modelConfidence>=45&&item.retentionRisk<0.45)
    .sort((a,b)=>b.effectiveMastery-a.effectiveMastery||b.modelConfidence-a.modelConfidence)
    .slice(0,3);
  return {
    subjectId,
    skills:scoped,
    focus:prioritySkills[0]||null,
    prioritySkills,
    strongSkills,
    retentionRisks:[...scoped].filter(item=>item.retentionRisk>=0.35).sort((a,b)=>b.retentionRisk-a.retentionRisk).slice(0,4),
    readiness:readinessForSubject(scoped),
    hasEvidence:scoped.some(item=>item.evidenceCount>0||item.modelConfidence>0),
  };
}

export function buildLearnerModelProfile(rows = []) {
  let skills = preferV2Rows(rows).map(normalizeLearnerState);
  skills = applyPrerequisiteRisk(skills).map(state=>({
    ...state,
    priorityScore:Math.round(state.priorityScore + (state.prerequisiteRisk||0)*10),
  }));
  skills = skills.map(state=>({...state,recommendation:state.recommendation||recommendationForState(state)}));
  const subjectIds=[...new Set(skills.map(item=>item.subjectId))];
  const subjects=Object.fromEntries(subjectIds.map(subjectId=>[subjectId,buildSubjectProfile(subjectId,skills)]));
  const prioritySkills=[...skills]
    .filter(item=>(item.evidenceCount>0||item.modelConfidence>0) && (item.effectiveMastery<82||item.modelConfidence<50||item.trendLabel==="Needs attention"||item.retentionRisk>=0.35))
    .sort((a,b)=>b.priorityScore-a.priorityScore||a.effectiveMastery-b.effectiveMastery)
    .slice(0,8);
  const strongSkills=[...skills]
    .filter(item=>item.effectiveMastery>=80&&item.modelConfidence>=45&&item.retentionRisk<0.45)
    .sort((a,b)=>b.effectiveMastery-a.effectiveMastery||b.modelConfidence-a.modelConfidence)
    .slice(0,5);
  const focus=prioritySkills[0]||null;
  const readinessBySubject=Object.fromEntries(Object.entries(subjects).map(([id,value])=>[id,value.readiness]));
  const calibrationInsights=skills
    .filter(item=>item.studentConfidence!=null&&item.confidenceBias!=="well-calibrated")
    .sort((a,b)=>Math.abs(b.calibrationGap||0)-Math.abs(a.calibrationGap||0))
    .slice(0,3);
  return {
    skills,
    focus,
    prioritySkills,
    strongSkills,
    weakSkillSignals:prioritySkills.map(item=>({skill:item.skill,score:item.effectiveMastery,subjectId:item.subjectId})),
    retentionRisks:[...skills].filter(item=>item.retentionRisk>=0.35).sort((a,b)=>b.retentionRisk-a.retentionRisk).slice(0,5),
    calibrationInsights,
    readinessBySubject,
    subjects,
    hasEvidence:skills.some(item=>item.evidenceCount>0||item.modelConfidence>0),
    modelVersion:skills.some(item=>String(item.modelVersion).includes("v2"))?"li-v2.0":"li-v1",
  };
}

export function flashcardEvidenceForRating(rating) {
  switch (rating) {
    case "again": return { correct:false, weight:0.40, helpUsed:false, observedScore:0.10, studentConfidence:0.25 };
    case "hard": return { correct:false, weight:0.24, helpUsed:false, observedScore:0.45, studentConfidence:0.45 };
    case "got_it": return { correct:true, weight:0.32, helpUsed:false, observedScore:0.82, studentConfidence:0.75 };
    case "easy": return { correct:true, weight:0.40, helpUsed:false, observedScore:0.96, studentConfidence:0.95 };
    default: return { correct:true, weight:0.20, helpUsed:false, observedScore:0.70, studentConfidence:0.60 };
  }
}

export function learnerModelWeakSkills(profile, fallback = []) {
  return profile?.hasEvidence && profile?.weakSkillSignals?.length
    ? profile.weakSkillSignals
    : fallback;
}

export function learnerSubjectFocus(profile, subjectId) {
  return profile?.subjects?.[subjectId]?.focus || null;
}
