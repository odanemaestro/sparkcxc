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

function greetingForHour(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function ForwardArrow() {
  return (
    <svg className="spark-dashboard-v2-forward-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M5 10h9M10.5 5.5 15 10l-4.5 4.5" />
    </svg>
  );
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
  const greeting = greetingForHour(new Date().getHours());
  const headline = recommendation
    ? focusTitle
      ? <>{greeting}, {firstName}. Pick up <span>{focusTitle}</span> in {subjectLabel}.</>
      : <>{greeting}, {firstName}. Continue <span>{subjectLabel}</span> today.</>
    : <>{greeting}, {firstName}. Choose your <span>first subject</span> to begin.</>;
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
        <h1 id="spark-dashboard-next-title">{headline}</h1>
        <p className="spark-dashboard-v2-hero-detail">
          {focus?.detail || (recommendation
            ? "Continue from where you left off and build your progress with one focused session."
            : "Add the subjects you are studying and SPARK will build your learning plan around them.")}
        </p>
        <div className="spark-dashboard-v2-hero-actions">
          <button type="button" className="spark-dashboard-v2-primary" onClick={activate}>
            <Icon name="featureBook" size={18}/><span>{actionLabel}</span>
            <ForwardArrow />
          </button>
          {recommendation && onManageSubjects && (
            <button type="button" className="spark-dashboard-v2-secondary" onClick={onManageSubjects}>
              <Icon name="subjects" size={18}/><span>View my subjects</span>
            </button>
          )}
        </div>
      </div>

      <div className="spark-dashboard-v2-hero-aside">
        <div
          id="spark-dashboard-weekly-highlight"
          className="spark-dashboard-v2-weekly-slot"
          aria-live="polite"
        />
        <div className="spark-dashboard-v2-streak" aria-label={streakCount + " day study streak"}>
          <span className="spark-dashboard-v2-streak-icon" aria-hidden="true"><Icon name="progress" size={22}/></span>
          <div>
            <strong>{streakCount} day streak</strong>
            <span>{streakCount > 0 ? "Study today to reach " + (streakCount + 1) + " days." : "Start your streak with one learning activity today."}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
