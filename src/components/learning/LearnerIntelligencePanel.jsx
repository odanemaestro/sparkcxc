import React, { useMemo, useState } from "react";
import Card from "../ui/Card";
import { displaySkillLabel, explanationForIntelligence } from "../../learning/learnerIntelligenceV2";
import { recordLearnerRecommendation } from "../../learning/learnerIntelligencePersistence";
import "./learnerIntelligencePanel.css";

function Metric({ value, label, suffix = "%" }) {
  return <div className="spark-li-metric"><strong>{value == null ? "â€”" : `${value}${suffix}`}</strong><span>{label}</span></div>;
}

function FocusRow({ state }) {
  if (!state) return null;
  return (
    <div className="spark-li-focus-row">
      <div>
        <strong>{state.displaySkill || displaySkillLabel(state.skill)}</strong>
        <span>{state.trendLabel} | {state.evidenceCount} evidence item{state.evidenceCount === 1 ? "" : "s"}</span>
      </div>
      <div className="spark-li-focus-scores">
        <b>{state.masteryPercent}%</b>
        <span>{Math.round(state.retention * 100)}% retained</span>
      </div>
    </div>
  );
}

function TargetMeta({ recommendation }) {
  if (!recommendation) return null;
  return (
    <div className="spark-li-target-meta">
      {recommendation.target?.label && <span>{recommendation.target.label}</span>}
      {recommendation.expectedMinutes && <span>{recommendation.expectedMinutes} min</span>}
      {recommendation.exactTarget && <span>Exact activity</span>}
    </div>
  );
}

function LimiterCard({ item }) {
  return (
    <div className="spark-li-limiter">
      <div><strong>{item.label}</strong><span>{Math.round(item.value)}%</span></div>
      <div className="spark-li-limiter-bar" aria-hidden="true"><span style={{width:`${Math.max(4, Math.min(100, item.value))}%`}}/></div>
      <p>{item.detail}</p>
    </div>
  );
}

export default function LearnerIntelligencePanel({
  intelligence,
  supabase,
  onStartRecommendation,
  onRecommendationRecorded,
  readOnly = false,
}) {
  const [startingKey, setStartingKey] = useState("");
  const [selectedAlternative, setSelectedAlternative] = useState(0);
  const focus = intelligence?.focus;
  const plan = intelligence?.nextBestActionPlan;
  const primary = selectedAlternative > 0
    ? plan?.alternatives?.[selectedAlternative - 1] || intelligence?.recommendation
    : intelligence?.recommendation;
  const explanation = useMemo(() => explanationForIntelligence(intelligence), [intelligence]);

  if (!intelligence?.hasEvidence) {
    return (
      <Card className="spark-li-panel spark-li-empty">
        <span className="section-kicker">SPARK LEARNER MODEL</span>
        <h3>SPARK is building your learning picture</h3>
        <p>Complete a lesson, practical, flashcard review or scored activity. SPARK will use that evidence to estimate mastery, retention and what to do next.</p>
      </Card>
    );
  }

  async function startRecommendation(recommendation) {
    if (!recommendation || startingKey) return;
    const key = recommendation.recommendationKey || recommendation.title || "recommendation";
    setStartingKey(key);

    const result = await recordLearnerRecommendation({
      supabase,
      intelligence:{ ...intelligence, recommendation },
    });

    if (result?.error) console.warn("Could not record SPARK recommendation", result.error);
    if (result?.historyRow) onRecommendationRecorded?.(result.historyRow);
    setStartingKey("");
    onStartRecommendation?.(recommendation);
  }

  const calibration = focus?.calibration;
  const priorities = intelligence.prioritySkills?.slice(0, 3) || [];
  const limiters = plan?.readinessLimiters || [];
  const alternatives = plan?.alternatives || [];

  return (
    <Card className="spark-li-panel">
      <div className="spark-li-head">
        <div>
          <span className="section-kicker">SPARK LEARNER MODEL</span>
          <h3>{intelligence.subjectName} learning intelligence</h3>
          <p>{explanation}</p>
        </div>
        <div className="spark-li-readiness">
          <strong>{intelligence.metrics?.readinessPercent ?? 0}%</strong>
          <span>exam readiness</span>
        </div>
      </div>

      <div className="spark-li-metrics">
        <Metric value={intelligence.metrics?.masteryPercent} label="Estimated mastery" />
        <Metric value={intelligence.metrics?.retentionPercent} label="Estimated retention" />
        <Metric value={intelligence.metrics?.modelConfidencePercent} label="Model confidence" />
        <Metric value={intelligence.metrics?.coveragePercent} label="Lesson coverage" />
      </div>

      {primary && (
        <section className="spark-li-next">
          <div className="spark-li-next-copy">
            <span className="section-kicker">NEXT BEST ACTION</span>
            <h4>{primary.title}</h4>
            <p>{primary.detail}</p>
            <TargetMeta recommendation={primary}/>
            <div className="spark-li-why">
              <strong>Why SPARK suggests this</strong>
              <ul>{(primary.why || []).map((item, index) => <li key={index}>{item}</li>)}</ul>
            </div>
          </div>
          {!readOnly && onStartRecommendation && (
            <button
              type="button"
              className="spark-li-action"
              onClick={() => startRecommendation(primary)}
              disabled={Boolean(startingKey)}
            >
              {startingKey === (primary.recommendationKey || primary.title)
                ? "Openingâ€¦"
                : primary.expectedMinutes
                  ? `Start ${primary.expectedMinutes}-minute activity`
                  : "Start recommended activity"}
            </button>
          )}
        </section>
      )}

      {alternatives.length > 0 && !readOnly && (
        <section className="spark-li-alternatives">
          <div>
            <span className="section-kicker">OTHER USEFUL OPTIONS</span>
            <p>If the first suggestion does not fit right now, choose another useful next step.</p>
          </div>
          <div className="spark-li-alternative-buttons">
            <button
              type="button"
              className={selectedAlternative === 0 ? "active" : ""}
              onClick={() => setSelectedAlternative(0)}
            >
              Best match
            </button>
            {alternatives.map((item, index) => (
              <button
                type="button"
                className={selectedAlternative === index + 1 ? "active" : ""}
                onClick={() => setSelectedAlternative(index + 1)}
                key={item.recommendationKey || `${item.actionType}-${item.skill}`}
              >
                {item.target?.label || item.title}
              </button>
            ))}
          </div>
        </section>
      )}

      {limiters.length > 0 && (
        <section className="spark-li-limiters">
          <div className="spark-li-section-head">
            <div>
              <span className="section-kicker">WHAT IS LIMITING READINESS</span>
              <h4>Why the readiness score is not higher yet</h4>
            </div>
          </div>
          <div className="spark-li-limiter-grid">
            {limiters.map(item => <LimiterCard key={item.key} item={item}/>)}
          </div>
        </section>
      )}

      {calibration && calibration.key !== "calibrated" && (
        <section className={`spark-li-calibration ${calibration.key}`}>
          <strong>{calibration.label}</strong>
          <span>{calibration.detail}</span>
        </section>
      )}

      {priorities.length > 0 && (
        <section className="spark-li-priorities">
          <div className="spark-li-section-head">
            <div><span className="section-kicker">PRIORITY SKILLS</span><h4>Where SPARK is watching most closely</h4></div>
          </div>
          <div className="spark-li-focus-list">{priorities.map(state => <FocusRow key={state.skill} state={state}/>)}</div>
        </section>
      )}

      <div className="spark-li-footnote">
        <strong>How this works:</strong>
        <span> SPARK ranks useful next actions using mastery, retention, model confidence, repeated errors, prerequisite risk and recent recommendation outcomes. Scored assessments still carry more evidence than completion actions. The learner model never changes an answer key or awarded mark.</span>
      </div>
    </Card>
  );
}