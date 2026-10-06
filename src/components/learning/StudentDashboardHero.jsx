import React, { useMemo } from "react";
import Icon from "../ui/Icon";

function pct(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0;
}

function subjectProgress(subject) {
  return pct(subject?.progress?.lessonPercent);
}

function chooseNextSubject(summaries = [], subjectInsights = {}) {
  const active = summaries.filter(subject => subject?.progress?.active);
  const source = active.length ? active : summaries;
  if (!source.length) return null;

  return [...source].sort((a, b) => {
    const ai = subjectInsights?.[a.id] ? 0 : 1;
    const bi = subjectInsights?.[b.id] ? 0 : 1;
    if (ai !== bi) return ai - bi;
    return subjectProgress(a) - subjectProgress(b);
  })[0];
}

export default function StudentDashboardHero({
  learnerName = "",
  streak = 0,
  subjects = [],
  subjectInsights = {},
  onOpenSubject,
  onManageSubjects,
}) {
  const recommendation = useMemo(
    () => chooseNextSubject(subjects, subjectInsights),
    [subjects, subjectInsights]
  );
  const focus = recommendation ? subjectInsights?.[recommendation.id] : null;
  const firstName = String(learnerName || "").trim().split(/\s+/)[0] || "there";
  const streakCount = Math.max(0, Number(streak) || 0);
  const subjectLabel = recommendation?.shortName || recommendation?.name || "your subjects";
  const focusTitle = String(focus?.title || "").trim();
  const headline = recommendation
    ? focusTitle
      ? <>Pick up <span>{focusTitle}</span> in {subjectLabel}.</>
      : <>Continue <span>{subjectLabel}</span> today.</>
    : <>Choose your <span>first subject</span> to begin.</>;
  const actionLabel = recommendation
    ? focusTitle ? "Continue: " + focusTitle : "Continue " + subjectLabel
    : "Choose my subjects";

  const activate = () => {
    if (recommendation && onOpenSubject) onOpenSubject(recommendation);
    else onManageSubjects?.();
  };

  return (
    <section className="spark-dashboard-v2-hero" aria-labelledby="spark-dashboard-next-title">
      <div className="spark-dashboard-v2-hero-copy">
        <p className="spark-dashboard-v2-eyebrow">Good {new Date().getHours()<12?"morning":new Date().getHours()<17?"afternoon":"evening"}, {firstName}.</p>
        <h1 id="spark-dashboard-next-title">{headline}</h1>
        <p className="spark-dashboard-v2-hero-detail">
          {focus?.detail || (recommendation
            ? "Continue from where you left off and build your progress with one focused session."
            : "Add the subjects you are studying and SPARK will build your learning plan around them.")}
        </p>
        <div className="spark-dashboard-v2-hero-actions">
          <button type="button" className="spark-dashboard-v2-primary" onClick={activate}>
            <Icon name="featureBook" size={18}/><span>{actionLabel}</span>
            <span aria-hidden="true">→</span>
          </button>
          {recommendation && onManageSubjects && (
            <button type="button" className="spark-dashboard-v2-secondary" onClick={onManageSubjects}>
              <Icon name="subjects" size={18}/><span>View my subjects</span>
            </button>
          )}
        </div>
      </div>

      <div className="spark-dashboard-v2-streak" aria-label={streakCount + " day study streak"}>
        <span className="spark-dashboard-v2-streak-icon" aria-hidden="true"><Icon name="progress" size={22}/></span>
        <div>
          <strong>{streakCount} day streak</strong>
          <span>{streakCount > 0 ? "Study today to reach " + (streakCount + 1) + " days." : "Start your streak with one learning activity today."}</span>
        </div>
      </div>
    </section>
  );
}
