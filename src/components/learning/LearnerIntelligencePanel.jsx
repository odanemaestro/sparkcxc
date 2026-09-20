import React, { useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import { buildCrossSubjectNextBestAction } from "../../learning/nextBestAction";
import {
  recordLearningRecommendation,
  startLearningRecommendation,
} from "../../learning/learningIntelligenceV2";
import "./learnerIntelligenceV2.css";

function subjectLabel(id) {
  if (id === "information-technology") return "Information Technology";
  if (id === "physics") return "Physics";
  return "Mathematics";
}

function confidenceCopy(item) {
  if (!item) return null;
  if (item.confidenceBias === "overconfident") {
    return `Your confidence is about ${Math.abs(item.calibrationGap || 0)} points higher than your demonstrated mastery in ${item.skill}.`;
  }
  if (item.confidenceBias === "underconfident") {
    return `Your demonstrated performance in ${item.skill} is stronger than your self-ratings suggest.`;
  }
  return null;
}

export default function LearnerIntelligencePanel({
  userId,
  supabase,
  learnerModel,
  actionEffectiveness = {},
  onNavigate,
}) {
  const action = useMemo(() => buildCrossSubjectNextBestAction({
    profile: learnerModel,
    actionEffectivenessBySubject: actionEffectiveness,
  }), [learnerModel, actionEffectiveness]);
  const [recommendationId, setRecommendationId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!learnerModel?.hasEvidence || !action?.actionKey || !supabase || !userId) return undefined;
    recordLearningRecommendation({ supabase, action }).then(({ data, error }) => {
      if (!cancelled && !error) setRecommendationId(data || null);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [action?.actionKey, learnerModel?.hasEvidence, supabase, userId]);

  const readiness = Object.entries(learnerModel?.readinessBySubject || {});
  const retention = learnerModel?.retentionRisks?.[0] || null;
  const calibration = learnerModel?.calibrationInsights?.[0] || null;
  const misconception = learnerModel?.prioritySkills?.find(item => item.commonError) || null;

  async function startAction() {
    if (recommendationId) {
      try { await startLearningRecommendation({ supabase, recommendationId }); } catch {}
    }
    onNavigate?.(action);
  }

  if (!learnerModel?.hasEvidence) {
    return (
      <Card className="li-v2-panel li-v2-empty">
        <span className="section-kicker">SPARK LEARNER MODEL</span>
        <h3>SPARK is building your learning picture</h3>
        <p>Complete lessons, practice questions, flashcards, labs or assessments. SPARK will use that evidence to work out what you know, what may be fading, and what to do next.</p>
      </Card>
    );
  }

  return (
    <section className="li-v2-stack" aria-label="SPARK learner intelligence">
      <Card className="li-v2-panel li-v2-next">
        <div className="li-v2-head">
          <div>
            <span className="section-kicker">NEXT BEST STEP</span>
            <h3>{action.title}</h3>
          </div>
          <span className="li-v2-subject-chip">{subjectLabel(action.subjectId)}</span>
        </div>
        <p>{action.explanation}</p>
        <div className="li-v2-reasons">
          {(action.reasons || []).slice(0, 3).map(reason => <span key={reason}>{reason}</span>)}
        </div>
        <div className="li-v2-actions">
          <Btn onClick={startAction}>{action.cta}</Btn>
          <small>SPARK chose this from your current mastery, retention, confidence, prerequisites and recent error patterns.</small>
        </div>
      </Card>

      <div className="li-v2-grid">
        <Card className="li-v2-panel">
          <span className="section-kicker">EXAM READINESS</span>
          <div className="li-v2-readiness-list">
            {readiness.length ? readiness.map(([subjectId, row]) => (
              <div key={subjectId}>
                <span>{subjectLabel(subjectId)}</span>
                <strong>{row.score}%</strong>
                <small>{row.label} · {row.confidence}% model confidence</small>
              </div>
            )) : <p>SPARK needs more assessment evidence before estimating readiness.</p>}
          </div>
        </Card>

        <Card className="li-v2-panel">
          <span className="section-kicker">WHAT SPARK HAS LEARNED</span>
          <div className="li-v2-insight-list">
            {retention && <div><strong>Retention risk</strong><span>{retention.skill} may be starting to fade. Current retention estimate: {retention.retention}%.</span></div>}
            {calibration && <div><strong>Confidence calibration</strong><span>{confidenceCopy(calibration)}</span></div>}
            {misconception && <div><strong>Recurring error</strong><span>{misconception.skill}: {misconception.commonError.label}.</span></div>}
            {!retention && !calibration && !misconception && <div><strong>Stable pattern</strong><span>No major retention, confidence or misconception warning is strong enough yet.</span></div>}
          </div>
        </Card>
      </div>
    </section>
  );
}
