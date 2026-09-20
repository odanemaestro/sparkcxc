import React, { useMemo, useState } from "react";
import Card from "../ui/Card";
import { explanationForIntelligence } from "../../learning/learnerIntelligenceV2";
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
        <strong>{state.skill}</strong>
        <span>{state.trendLabel} Â· {state.evidenceCount} evidence item{state.evidenceCount === 1 ? "" : "s"}</span>
      </div>
      <div className="spark-li-focus-scores">
        <b>{state.masteryPercent}%</b>
        <span>{Math.round(state.retention * 100)}% retained</span>
      </div>
    </div>
  );
}

export default function LearnerIntelligencePanel({
  intelligence,
  supabase,
  onStartRecommendation,
  readOnly = false,
}) {
  const [starting, setStarting] = useState(false);
  const [started, setStarted] = useState(false);
  const focus = intelligence?.focus;
  const recommendation = intelligence?.recommendation;
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

  async function startRecommendation() {
    if (!recommendation || starting) return;
    setStarting(true);
    const result = await recordLearnerRecommendation({ supabase, intelligence });
    if (result?.error) console.warn("Could not record SPARK recommendation", result.error);
    setStarted(true);
    setStarting(false);
    onStartRecommendation?.(recommendation);
  }

  const calibration = focus?.calibration;
  const priorities = intelligence.prioritySkills?.slice(0, 3) || [];

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

      {recommendation && (
        <section className="spark-li-next">
          <div className="spark-li-next-copy">
            <span className="section-kicker">NEXT BEST ACTION</span>
            <h4>{recommendation.title}</h4>
            <p>{recommendation.detail}</p>
            <div className="spark-li-why">
              <strong>Why SPARK suggests this</strong>
              <ul>{(recommendation.why || []).map((item, index) => <li key={index}>{item}</li>)}</ul>
            </div>
          </div>
          {!readOnly && onStartRecommendation && (
            <button
              type="button"
              className="spark-li-action"
              onClick={startRecommendation}
              disabled={starting}
            >
              {starting ? "Startingâ€¦" : started ? "Open recommended activity" : "Start recommended activity"}
            </button>
          )}
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
        <span> Scored assessments carry more evidence than completion actions. Older evidence gradually loses influence. SPARK recommendations can change as new results are recorded, but the learner model never changes an answer key or awarded mark.</span>
      </div>
    </Card>
  );
}