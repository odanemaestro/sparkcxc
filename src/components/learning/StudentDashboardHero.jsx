import React, { useMemo } from "react";
import Icon from "../ui/Icon";

function clampPercent(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0;
}

function pickRecommendation(subjects = [], subjectInsights = {}) {
  const active = subjects.filter(subject => subject?.progress?.active);
  const source = active.length ? active : subjects;
  if (!source.length) return null;
  return [...source].sort((a, b) => {
    const aInsight = subjectInsights?.[a.id] ? 0 : 1;
    const bInsight = subjectInsights?.[b.id] ? 0 : 1;
    if (aInsight !== bInsight) return aInsight - bInsight;
    return clampPercent(a?.progress?.lessonPercent) - clampPercent(b?.progress?.lessonPercent);
  })[0];
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function ForwardArrow() {
  return (
    <svg className="spark-consultant-forward" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
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
    () => pickRecommendation(subjects, subjectInsights),
    [subjects, subjectInsights]
  );
  const firstName = String(learnerName || "").trim().split(/\s+/)[0] || "there";
  const subjectName = recommendation?.shortName || recommendation?.name || "your subjects";
  const focus = recommendation ? subjectInsights?.[recommendation.id] : null;
  const focusTitle = String(focus?.title || "").trim();
  const streakCount = Math.max(0, Number(streak) || 0);

  const headline = recommendation
    ? focusTitle
      ? <>Continue <span>{focusTitle}</span> in {subjectName}.</>
      : <>Keep moving in <span>{subjectName}</span>.</>
    : <>Choose your <span>first subject</span> to begin.</>;

  const actionLabel = recommendation
    ? focusTitle ? "Continue learning" : "Continue " + subjectName
    : "Choose my subjects";

  const activate = () => {
    if (recommendation && onOpenSubject) onOpenSubject(recommendation);
    else onManageSubjects?.();
  };

  return (
    <section className="spark-consultant-hero" aria-labelledby="spark-consultant-next-title">
      <div className="spark-consultant-hero-copy">
        <p className="spark-consultant-greeting">{greeting()}, {firstName}.</p>
        <h1 id="spark-consultant-next-title">{headline}</h1>
        <p className="spark-consultant-hero-detail">
          {focus?.detail || (recommendation
            ? "Pick up from where you left off with one focused learning session."
            : "Add the subjects you are studying and SPARK will organize your dashboard around them.")}
        </p>
        <div className="spark-consultant-hero-actions">
          <button type="button" className="spark-consultant-primary" onClick={activate}>
            <span className="spark-consultant-primary-icon" aria-hidden="true"><Icon name="featureBook" size={18}/></span>
            <span>{actionLabel}</span>
            <ForwardArrow />
          </button>
          {recommendation && onManageSubjects && (
            <button type="button" className="spark-consultant-secondary" onClick={onManageSubjects}>
              View my subjects
            </button>
          )}
        </div>
      </div>

      <div className="spark-consultant-hero-side">
        <div id="spark-dashboard-weekly-highlight" className="spark-consultant-weekly-slot" aria-live="polite" />
        <div className="spark-consultant-streak" aria-label={streakCount + " day study streak"}>
          <span className="spark-consultant-streak-icon" aria-hidden="true"><Icon name="progress" size={21}/></span>
          <div>
            <strong>{streakCount} day streak</strong>
            <span>{streakCount > 0 ? "Study today to reach " + (streakCount + 1) + " days." : "Start your streak with one learning activity today."}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
