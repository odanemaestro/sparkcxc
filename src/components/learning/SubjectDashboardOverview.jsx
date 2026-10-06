import React, { useMemo } from "react";
import Card from "../ui/Card";
import Icon from "../ui/Icon";
import ProgressBar from "../ui/ProgressBar";
import "./subjectDashboardOverview.css";

function possessive(name) {
  const value = String(name || "").trim();
  if (!value) return "your";
  return /s$/i.test(value) ? `${value}’` : `${value}’s`;
}

function subjectInsight(summaries, learnerName = "") {
  const active = (summaries || []).filter(item => item.progress?.active);
  if (!active.length) return learnerName
    ? `${learnerName} has not recorded learning activity yet. SPARK will build ${possessive(learnerName)} progress picture as lessons and practice are completed.`
    : "Start a lesson or practice activity and SPARK will build your progress picture across subjects.";

  const weakest = [...active].sort((a, b) => lessonPercent(a) - lessonPercent(b))[0];
  return learnerName
    ? `${possessive(learnerName)} next opportunity is ${weakest?.shortName || weakest?.name || "the subject with the most learning left"}.`
    : `Focus on ${weakest?.shortName || weakest?.name || "the subject with the most learning left"} next. Your subjects are sorted by lesson completion so the biggest gap is easy to spot.`;
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
  return { value: Number(progress?.assessments ?? progress?.checkpoints ?? 0), label: "assessments" };
}

function subjectMetricFourth(subject, progress) {
  if (subject?.capabilities?.labs) return { value: Number(progress?.labsCompleted || 0), label: "labs" };
  if (subject?.id === "mathematics") return { value: Number(progress?.skillsTracked || 0), label: "skills" };
  return { value: Number(progress?.topicsPractised || 0), label: "topics practised" };
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
}) {
  const enrolledCount = summaries.length;
  const sorted = useMemo(
    () => [...summaries].sort((a, b) => lessonPercent(a) - lessonPercent(b)),
    [summaries]
  );

  const totals = useMemo(() => summaries.reduce((acc, subject) => {
    const p = subject.progress || {};
    acc.lessons += Number(p.lessonsCompleted || 0);
    acc.practice += Number(p.practiceAttempts || 0);
    return acc;
  }, { lessons:0, practice:0 }), [summaries]);

  return (
    <section className="spark-subject-dashboard-overview" aria-labelledby="spark-subject-overview-title">
      <div className="spark-subject-overview-heading">
        <div>
          <h2 id="spark-subject-overview-title">{learnerName ? `${possessive(learnerName)} subjects` : "Your subjects"}</h2>
          <p>{insight ? subjectInsight(summaries, learnerName) : "Review subject progress and continue learning."}</p>
          {summaries.length > 0 && <div className="spark-subject-overview-summary" aria-label="Learning totals">
            <span><strong>{enrolledCount}</strong> enrolled</span>
            <span><strong>{totals.lessons}</strong> lessons completed</span>
            <span><strong>{totals.practice}</strong> practice results</span>
          </div>}
        </div>
        <div className="spark-subject-overview-heading-actions">
          {onManageSubjects && <button type="button" className="spark-text-action" onClick={onManageSubjects}>Manage subjects</button>}
          {reportCta && onOpenReport && <button type="button" className="spark-text-action" onClick={onOpenReport}>Progress report</button>}
          {showAllProgressAction && onOpenProgress && <button type="button" className="spark-text-action" onClick={() => onOpenProgress(null)}>View all progress</button>}
        </div>
      </div>

      {sorted.length ? <div className="spark-subject-overview-list">
        {sorted.map((subject, index) => {
          const progress = subject.progress || {};
          const total = Number(progress.totalTopics || subject.stats?.topics || 0);
          const completed = Number(progress.lessonsCompleted || 0);
          const displayCompleted = total > 0 ? Math.min(Math.max(0, completed), total) : Math.max(0, completed);
          const percent = lessonPercent(subject);
          const third = subjectMetricThird(progress);
          const fourth = subjectMetricFourth(subject, progress);
          const focus = subjectInsights?.[subject.id] || null;
          const canStudy = onOpenSubject && (subject.capabilities?.study !== false || subject.routes?.study || subject.implementation === "generic");
          const canPractice = onOpenPractice && subject.capabilities?.practice !== false && Boolean(subject.routes?.practice);
          return (
            <div key={subject.id} className={`spark-subject-overview-row${index === 0 ? " is-focus-next" : ""}`}>
              <div className="spark-subject-overview-title-row">
                <div className={`spark-subject-overview-mark ${subject.id}`} aria-hidden="true">{subject.mark || subject.shortName?.slice(0, 1) || "•"}</div>
                <div>
                  <span>{subject.name}</span>
                  <small>{displayCompleted} of {total || 0} topic lessons complete</small>
                </div>
                {index === 0 && summaries.length > 1 && <span className="spark-subject-focus-pill">Focus next</span>}
              </div>

              <div className="spark-subject-overview-mastery">
                <strong>{percent}%</strong>
                <ProgressBar value={percent} max={100} />
              </div>

              <div className="spark-subject-overview-evidence" aria-label={`${subject.name} learning evidence`}>
                <span>{progress.practiceAttempts || 0} practice</span>
                <span>{progress.practiceAttempts ? `${Math.round(Number(progress.practiceAverage || 0))}% average` : "No practice average yet"}</span>
                <span>{third.value} {third.label}</span>
                <span>{fourth.value} {fourth.label}</span>
              </div>

              <div className="spark-subject-overview-next">
                {focus ? <><strong>{focus.title}</strong>{focus.detail && <span>{focus.detail}</span>}</> : <><strong>{progress.active ? "Continue learning" : "Ready when you are"}</strong><span>{progress.active ? "Build on your latest work." : "Start with a lesson or practice activity."}</span></>}
              </div>

              <div className="spark-subject-overview-actions">
                {canPractice ? <button type="button" className={`spark-dashboard-card-action${index === 0 ? "" : " spark-dashboard-card-action-secondary"}`} onClick={() => onOpenPractice(subject)}>
                  <span>Practise</span>
                  <span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
                </button> : canStudy && <button type="button" className={`spark-dashboard-card-action${index === 0 ? "" : " spark-dashboard-card-action-secondary"}`} onClick={() => onOpenSubject(subject)}>
                  <span>Continue</span>
                  <span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
                </button>}
              </div>
            </div>
          );
        })}
      </div> : <Card className="spark-subject-empty-card">
        <div className="spark-card-title-with-icon"><span className="spark-feature-icon compact"><Icon name="subjects" size={19}/></span><div><h3>Choose your subjects</h3><p>Enroll in the subjects you want to study and SPARK will build your dashboard around them.</p></div></div>
        {onManageSubjects && <button type="button" className="spark-dashboard-card-action" onClick={onManageSubjects}><span>Choose my subjects</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span></button>}
      </Card>}
    </section>
  );
}
