import React, { useMemo } from "react";
import Card from "../ui/Card";
import Icon from "../ui/Icon";
import ProgressBar from "../ui/ProgressBar";
import { recommendationDisplay, sortSubjectsForHome, subjectLessonStats } from "../../learning/studentHomeModel";
import "./subjectDashboardOverview.css";

function possessive(name) {
  const value = String(name || "").trim();
  if (!value) return "your";
  return /s$/i.test(value) ? value + "’" : value + "’s";
}

function lessonPercent(subject) {
  const progress = subject?.progress || {};
  const total = Number(progress.totalTopics || subject?.stats?.topics || 0);
  const completed = Number(progress.lessonsCompleted || 0);
  const raw = Number.isFinite(Number(progress.lessonPercent))
    ? Number(progress.lessonPercent)
    : (total ? Math.round(completed / total * 100) : 0);
  return Math.min(100, Math.max(0, Math.round(raw || 0)));
}

function subjectMetricThird(progress) {
  return { value:Number(progress?.assessments ?? progress?.checkpoints ?? 0), label:"assessments" };
}

function subjectMetricFourth(subject, progress) {
  if (subject?.capabilities?.labs) return { value:Number(progress?.labsCompleted || 0), label:"labs explored" };
  if (subject?.id === "mathematics") return { value:Number(progress?.skillsTracked || 0), label:"skills tracked" };
  return { value:Number(progress?.topicsPractised || 0), label:"topics practised" };
}

function subjectMilestone(subject) {
  const { total, completed, percent } = subjectLessonStats(subject);

  if (total <= 0) {
    return {
      title:"Start your first lesson",
      detail:"Complete one lesson and SPARK will begin tracking your course progress.",
    };
  }

  if (percent >= 100 || completed >= total) {
    return {
      title:"Course lessons complete",
      detail:"Keep your knowledge fresh with practice, flashcards or an exam-style activity.",
    };
  }

  if (completed === 0) {
    return {
      title:"Complete your first lesson",
      detail:"One completed lesson will start your progress for this subject.",
    };
  }

  const milestones = [25, 50, 75, 100];
  const nextPercent = milestones.find(value => value > percent) || 100;
  const targetCompleted = Math.min(total, Math.ceil((nextPercent / 100) * total));
  const remaining = Math.max(1, targetCompleted - completed);

  return {
    title:remaining + " more lesson" + (remaining === 1 ? "" : "s") + " to reach " + nextPercent + "%",
    detail:"You have completed " + completed + " of " + total + " topic lessons.",
  };
}

function subjectInsight(summaries, learnerName = "") {
  const active = (summaries || []).filter(item => item.progress?.active);
  if (!active.length) {
    return learnerName
      ? learnerName + " has not recorded learning activity yet."
      : "Start a lesson or practice activity and SPARK will build your progress picture.";
  }
  const weakest = [...active].sort((a, b) => lessonPercent(a) - lessonPercent(b))[0];
  return learnerName
    ? possessive(learnerName) + " next opportunity is " + (weakest?.shortName || weakest?.name || "the subject with the most learning left") + "."
    : "Focus on " + (weakest?.shortName || weakest?.name || "the subject with the most learning left") + " next.";
}

function ActionArrow() {
  return <svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg>;
}


const SINGULAR_METRIC_LABELS = Object.freeze({
  assessments: "assessment",
  "labs explored": "lab explored",
  "skills tracked": "skill tracked",
  "topics practised": "topic practised",
  "practice results": "practice result",
});

function metricLabel(value, label) {
  return Number(value) === 1 ? (SINGULAR_METRIC_LABELS[label] || label) : label;
}

function canStudySubject(subject) {
  return subject?.capabilities?.study !== false || Boolean(subject?.routes?.study) || subject?.implementation === "generic";
}

function SubjectHomeRow({ subject, status, onOpenSubject, onOpenPractice, onOpenProgress }) {
  const progress = subject.progress || {};
  const { total, completed, percent } = subjectLessonStats(subject);
  const third = subjectMetricThird(progress);
  const fourth = subjectMetricFourth(subject, progress);
  const practiceResults = Number(progress.practiceAttempts || 0);
  const milestone = subjectMilestone(subject);
  const name = subject.name || subject.shortName || "Subject";
  const titleId = "ssh-subject-" + subject.id + "-title";
  const showStudy = onOpenSubject && canStudySubject(subject);
  const showPractice = onOpenPractice && subject.capabilities?.practice !== false && Boolean(subject.routes?.practice);

  return (
    <li className={"ssh-subject is-" + status.key} id={"ssh-subject-" + subject.id} aria-labelledby={titleId} tabIndex={-1}>
      <div className="ssh-subject-mark" aria-hidden="true">{subject.mark || subject.shortName?.slice(0, 1) || "•"}</div>
      <div className="ssh-subject-head">
        <div className="ssh-subject-heading">
          <h3 id={titleId}>{name}</h3>
          <p className={"ssh-status is-" + status.key}>
            <span className="ssh-status-dot" aria-hidden="true" />
            <span>{status.label}</span>
            {status.detail && <span className="ssh-status-detail">{status.detail}</span>}
          </p>
        </div>
        <p className="ssh-subject-percent"><strong>{percent}%</strong><span>complete</span></p>
      </div>

      <div className="ssh-subject-body">
        <div className="ssh-subject-progress">
          <div className="ssh-meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={name + " lesson completion"}>
            <i style={{ width: percent + "%" }} />
          </div>
          <p className="ssh-subject-caption">{completed} of {total || 0} topic lessons complete</p>
          {progress.active && (
            <ul className="ssh-facts" aria-label={name + " evidence"}>
              <li><strong>{practiceResults}</strong> {metricLabel(practiceResults, "practice results")}</li>
              <li>{practiceResults ? <><strong>{Math.round(Number(progress.practiceAverage || 0))}%</strong> practice average</> : "No practice average yet"}</li>
              <li><strong>{third.value}</strong> {metricLabel(third.value, third.label)}</li>
              <li><strong>{fourth.value}</strong> {metricLabel(fourth.value, fourth.label)}</li>
            </ul>
          )}
        </div>
        <div className="ssh-focus ssh-milestone">
          <p className="ssh-focus-label"><Icon name="flag" size={14} />Next milestone</p>
          <p className="ssh-focus-title">{milestone.title}</p>
          <p className="ssh-focus-detail">{milestone.detail}</p>
        </div>
      </div>

      {(showStudy || showPractice || onOpenProgress) && (
        <div className="ssh-subject-actions">
          {showStudy && (
            <button type="button" className="ssh-btn ssh-btn--tinted ssh-btn--small" onClick={() => onOpenSubject(subject)}>
              <span>{progress.active ? "Continue" : "Start"}</span>
            </button>
          )}
          {showPractice && (
            <button type="button" className="ssh-btn ssh-btn--secondary ssh-btn--small" onClick={() => onOpenPractice(subject)}>
              <span>Practise</span>
            </button>
          )}
          {onOpenProgress && (
            <button type="button" className="ssh-text-btn" onClick={() => onOpenProgress(subject)}>
              <span>View progress</span><Icon name="chevronRight" size={15} />
            </button>
          )}
        </div>
      )}
    </li>
  );
}

function SubjectHomePanel({
  summaries,
  onOpenSubject,
  onOpenPractice,
  onOpenProgress,
  onOpenReport,
  onManageSubjects,
  subjectInsights,
  learnerName,
}) {
  const ordered = sortSubjectsForHome(summaries, { now:new Date() });
  const attentionCount = ordered.filter(item => item.status.key === "attention").length;

  return (
    <section className="ssh-card ssh-subjects" aria-labelledby="ssh-subjects-title">
      <header className="ssh-section-head">
        <div>
          <h2 id="ssh-subjects-title" className="ssh-section-title">Your subjects</h2>
          {summaries.length > 0 && (
            <p className="ssh-section-sub">
              {summaries.length} enrolled{attentionCount ? " · " + attentionCount + " need" + (attentionCount === 1 ? "s" : "") + " attention" : ""}
            </p>
          )}
        </div>
        <div className="ssh-section-actions">
          {summaries.length > 0 && onOpenReport && <button type="button" className="ssh-text-btn" onClick={onOpenReport}><Icon name="report" size={16}/><span>Progress report</span></button>}
          {summaries.length > 0 && onOpenProgress && <button type="button" className="ssh-text-btn" onClick={() => onOpenProgress(null)}><Icon name="progress" size={16}/><span>All progress</span></button>}
          {onManageSubjects && <button type="button" className="ssh-text-btn" onClick={onManageSubjects}><Icon name="subjects" size={16}/><span>Manage subjects</span></button>}
        </div>
      </header>

      {summaries.length ? (
        <ol className="ssh-subject-list">
          {ordered.map(({subject,status}) => (
            <SubjectHomeRow
              key={subject.id}
              subject={subject}
              status={status}
              onOpenSubject={onOpenSubject}
              onOpenPractice={onOpenPractice}
              onOpenProgress={onOpenProgress}
            />
          ))}
        </ol>
      ) : (
        <div className="ssh-empty">
          <span className="ssh-empty-icon" aria-hidden="true"><Icon name="subjects" size={20}/></span>
          <div><h3>No subjects yet</h3><p>Your subjects, progress and next steps will appear here once you enroll.</p></div>
        </div>
      )}
    </section>
  );
}

export default function SubjectDashboardOverview({
  summaries = [],
  onOpenSubject,
  onOpenPractice,
  onOpenProgress,
  onOpenReport,
  subjectInsights = {},
  insight = true,
  reportCta = true,
  onManageSubjects,
  learnerName = "",
  showAllProgressAction = true,
  variant = "default",
}) {
  if (variant === "home") {
    return (
      <SubjectHomePanel
        summaries={summaries}
        onOpenSubject={onOpenSubject}
        onOpenPractice={onOpenPractice}
        onOpenProgress={onOpenProgress}
        onOpenReport={onOpenReport}
        onManageSubjects={onManageSubjects}
        subjectInsights={subjectInsights}
        learnerName={learnerName}
      />
    );
  }
  const sorted = useMemo(
    () => [...summaries].sort((a, b) => lessonPercent(a) - lessonPercent(b)),
    [summaries]
  );

  const totals = useMemo(() => summaries.reduce((acc, subject) => {
    const p = subject.progress || {};
    acc.lessons += Number(p.lessonsCompleted || 0);
    acc.practice += Number(p.practiceAttempts || 0);
    return acc;
  }, {lessons:0, practice:0}), [summaries]);

  return (
    <section className="spark-subject-dashboard-overview" aria-labelledby="spark-subject-overview-title">
      <div className="spark-subject-overview-heading">
        <div>
          <h2 id="spark-subject-overview-title">{learnerName ? possessive(learnerName) + " subjects" : "Your subjects"}</h2>
          <p>{insight ? subjectInsight(summaries, learnerName) : "Review subject progress and continue learning."}</p>
          {summaries.length > 0 && (
            <div className="spark-subject-overview-summary" aria-label="Learning totals">
              <span><strong>{summaries.length}</strong> enrolled</span>
              <span><strong>{totals.lessons}</strong> lessons completed</span>
              <span><strong>{totals.practice}</strong> practice results</span>
            </div>
          )}
        </div>
        <div className="spark-subject-overview-heading-actions">
          {onManageSubjects && <button type="button" className="spark-consultant-text-action" onClick={onManageSubjects}>Manage subjects</button>}
          {reportCta && onOpenReport && <button type="button" className="spark-consultant-text-action" onClick={onOpenReport}>Progress report</button>}
        </div>
      </div>

      {sorted.length ? (
        <div className="spark-subject-overview-grid">
          {sorted.map((subject, index) => {
            const progress = subject.progress || {};
            const total = Number(progress.totalTopics || subject.stats?.topics || 0);
            const completed = Number(progress.lessonsCompleted || 0);
            const displayCompleted = total > 0 ? Math.min(Math.max(0, completed), total) : Math.max(0, completed);
            const percent = lessonPercent(subject);
            const milestone = subjectMilestone(subject);
            const fourth = subjectMetricFourth(subject, progress);
            const canStudy = onOpenSubject && (subject.capabilities?.study !== false || subject.routes?.study || subject.implementation === "generic");
            const canPractice = onOpenPractice && subject.capabilities?.practice !== false && Boolean(subject.routes?.practice);

            return (
              <article key={subject.id} className={"spark-subject-overview-card" + (index === 0 ? " is-focus-next" : "")}>
                <div className="spark-subject-card-head">
                  <div className={"spark-subject-overview-mark " + subject.id} aria-hidden="true">
                    {subject.mark || subject.shortName?.slice(0, 2) || "•"}
                  </div>
                  <div className="spark-subject-card-title">
                    <strong>{subject.name}</strong>
                    <span>{displayCompleted} of {total || 0} topic lessons complete</span>
                  </div>
                  {index === 0 && summaries.length > 1 && <span className="spark-subject-focus-pill">Focus next</span>}
                </div>

                <div className="spark-subject-card-progress">
                  <div><span>Lesson completion</span><strong>{percent}%</strong></div>
                  <ProgressBar value={percent} max={100} />
                </div>

                <div className="spark-subject-card-evidence" aria-label={subject.name + " learning evidence"}>
                  <span><strong>{progress.practiceAttempts || 0}</strong> practice</span>
                  <span><strong>{progress.practiceAttempts ? Math.round(Number(progress.practiceAverage || 0)) + "%" : "—"}</strong> average</span>
                  <span><strong>{Number(progress.assessments ?? progress.checkpoints ?? 0)}</strong> assessments</span>
                  <span><strong>{fourth.value}</strong> {fourth.label}</span>
                </div>

                <div className="spark-subject-card-focus">
                  <span>Next milestone</span>
                  <strong>{milestone.title}</strong>
                  <small>{milestone.detail}</small>
                </div>

                <div className="spark-subject-card-actions">
                  {canPractice ? (
                    <button type="button" className="spark-dashboard-card-action" onClick={() => onOpenPractice(subject)}>
                      <span>Practise</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><ActionArrow /></span>
                    </button>
                  ) : canStudy ? (
                    <button type="button" className="spark-dashboard-card-action" onClick={() => onOpenSubject(subject)}>
                      <span>Continue</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><ActionArrow /></span>
                    </button>
                  ) : null}
                  {onOpenProgress && (
                    <button type="button" className="spark-consultant-text-action" onClick={() => onOpenProgress(subject)}>
                      View progress
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <Card className="spark-subject-empty-card">
          <div className="spark-card-title-with-icon">
            <span className="spark-feature-icon compact"><Icon name="subjects" size={19}/></span>
            <div><h3>Choose your subjects</h3><p>Enroll in the subjects you want to study and SPARK will build your dashboard around them.</p></div>
          </div>
          {onManageSubjects && <button type="button" className="spark-dashboard-card-action" onClick={onManageSubjects}><span>Choose my subjects</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><ActionArrow /></span></button>}
        </Card>
      )}

      {showAllProgressAction && onOpenProgress && summaries.length > 0 && (
        <button type="button" className="spark-subject-view-all" onClick={() => onOpenProgress(null)}>
          View all progress <span aria-hidden="true">→</span>
        </button>
      )}
    </section>
  );
}
