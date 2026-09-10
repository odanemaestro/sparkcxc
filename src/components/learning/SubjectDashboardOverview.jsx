import React from "react";
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

  const strongest = [...active]
    .filter(item => Number(item.progress?.practiceAttempts || 0) > 0)
    .sort((a, b) => Number(b.progress?.practiceAverage || 0) - Number(a.progress?.practiceAverage || 0))[0];
  const next = [...active]
    .filter(item => Number(item.progress?.totalTopics || 0) > Number(item.progress?.lessonsCompleted || 0))
    .sort((a, b) => Number(a.progress?.lessonPercent || 0) - Number(b.progress?.lessonPercent || 0))[0];

  const learner = String(learnerName || "").trim();
  const owner = learner ? possessive(learner) : "your";
  const parts = [learner
    ? `${learner} has recorded learning activity in ${active.length} subject${active.length === 1 ? "" : "s"}.`
    : `You have recorded learning activity in ${active.length} subject${active.length === 1 ? "" : "s"}.`];
  if (strongest) parts.push(`${strongest.shortName} currently has ${owner} strongest recorded practice average at ${Math.round(Number(strongest.progress.practiceAverage || 0))}%.`);
  if (next && next.id !== strongest?.id) parts.push(`${next.shortName} has the most lesson coverage left to complete.`);
  return parts.join(" ");
}

function subjectMetricThird(progress) {
  const assessments = Number(progress?.assessments ?? progress?.checkpoints ?? 0);
  if (assessments > 0) return { value: assessments, label: "assessments" };
  const labs = Number(progress?.labsCompleted || 0);
  if (labs > 0) return { value: labs, label: "labs explored" };
  return { value: 0, label: "assessments" };
}

export default function SubjectDashboardOverview({
  summaries = [],
  onOpenSubject,
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

  return (
    <div className="spark-subject-dashboard-overview">
      {insight && <Card className="spark-subject-insight-card">
        <div className="spark-insight-icon"><Icon name="insight" size={22}/></div>
        <div className="spark-subject-insight-copy">
          <span className="section-kicker">SPARK INSIGHT</span>
          <p>{subjectInsight(summaries, learnerName)}</p>
        </div>
        {showAllProgressAction && onOpenProgress && <button type="button" className="spark-dashboard-card-action" onClick={() => onOpenProgress(null)}>
          <span>View all progress</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
        </button>}
      </Card>}

      <div className="spark-subject-overview-heading">
        <div><span className="section-kicker">{learnerName ? `${possessive(learnerName).toUpperCase()} SUBJECTS` : "YOUR SUBJECTS"}</span><h2>Progress by subject</h2></div>
        <span className="spark-subject-active-pill">{enrolledCount} enrolled</span>
      </div>

      {summaries.length ? <div className="spark-subject-overview-grid">
        {summaries.map(subject => {
          const progress = subject.progress || {};
          const total = Number(progress.totalTopics || subject.stats?.topics || 0);
          const completed = Number(progress.lessonsCompleted || 0);
          const percent = Number.isFinite(Number(progress.lessonPercent))
            ? Number(progress.lessonPercent)
            : (total ? Math.round(completed / total * 100) : 0);
          const third = subjectMetricThird(progress);
          const focus = subjectInsights?.[subject.id] || null;
          return (
            <Card key={subject.id} className="spark-subject-overview-card">
              <div className="spark-subject-overview-title-row">
                <div className={`spark-subject-overview-mark ${subject.id}`} aria-hidden="true">{subject.mark || subject.shortName?.slice(0, 1) || "•"}</div>
                <div><span>{subject.name}</span><small>{progress.active ? "Learning activity recorded" : "Ready when you are"}</small></div>
              </div>
              <div className="spark-subject-overview-progress-row"><span>{completed} of {total || 0} topic lessons complete</span><strong>{percent}%</strong></div>
              <ProgressBar value={completed} max={Math.max(1, total)} />
              <div className="spark-subject-overview-metrics">
                <div><strong>{progress.practiceAttempts || 0}</strong><span>practice results</span></div>
                <div><strong>{progress.practiceAttempts ? `${Math.round(Number(progress.practiceAverage || 0))}%` : "—"}</strong><span>practice average</span></div>
                <div><strong>{third.value}</strong><span>{third.label}</span></div>
                <div><strong>{progress.labsCompleted || 0}</strong><span>labs explored</span></div>
              </div>
              {focus && <div className="spark-subject-overview-focus"><span>Current focus</span><strong>{focus.title}</strong>{focus.detail && <small>{focus.detail}</small>}</div>}
              {(onOpenSubject || onOpenProgress) && <div className="spark-subject-overview-actions">
                {onOpenSubject && <button type="button" className="spark-dashboard-card-action" onClick={() => onOpenSubject(subject)}>
                  <span>Continue {subject.shortName}</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
                </button>}
                {onOpenProgress && <button type="button" className="spark-dashboard-card-action spark-dashboard-card-action-secondary" onClick={() => onOpenProgress(subject)}>
                  <span>View progress</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
                </button>}
              </div>}
            </Card>
          );
        })}
      </div> : <Card className="spark-subject-empty-card">
        <div className="spark-card-title-with-icon"><span className="spark-feature-icon compact"><Icon name="subjects" size={19}/></span><div><span className="section-kicker">GET STARTED</span><h3>Choose your subjects</h3><p>Enroll in the subjects you want to study and SPARK will build your dashboard around them.</p></div></div>
        {onManageSubjects && <button type="button" className="spark-dashboard-card-action" onClick={onManageSubjects}><span>Choose my subjects</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span></button>}
      </Card>}

      {summaries.length > 0 && reportCta && onOpenReport && <Card className="spark-report-cta-card spark-subject-report-cta">
        <div className="spark-card-title-with-icon"><span className="spark-feature-icon"><Icon name="report" size={22}/></span><div><span className="section-kicker">PROGRESS REPORTS</span><h3>Review any subject</h3><p>Open one report for all subjects or switch to a subject-specific report.</p></div></div>
        <button type="button" className="spark-dashboard-card-action" onClick={onOpenReport}><span>View progress report</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span></button>
      </Card>}
    </div>
  );
}
