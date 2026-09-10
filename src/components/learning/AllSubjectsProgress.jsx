import React from "react";
import Card from "../ui/Card";
import SubjectDashboardOverview from "./SubjectDashboardOverview";
import "./subjectProgressDetail.css";

function ActivityList({ rows = [], learnerName = "" }) {
  if (!rows.length) return <p className="spark-all-subjects-empty">{learnerName ? `${learnerName}’s recent learning activity will appear here as enrolled subjects are studied and practised.` : "Recent learning activity will appear here as subjects are studied and practised."}</p>;
  return <div className="spark-all-subjects-activity-list">{rows.map(item => (
    <div key={item.id} className="spark-all-subjects-activity-row">
      <div>
        <span>{item.subjectName}</span>
        <strong>{item.title}</strong>
        <small>{new Date(item.at).toLocaleString([], { dateStyle:"medium", timeStyle:"short" })}</small>
      </div>
      {item.percent != null && <b>{item.percent}%</b>}
    </div>
  ))}</div>;
}

export default function AllSubjectsProgress({
  summary,
  summaries = [],
  recentActivity = [],
  onOpenSubject,
  onSelectSubject,
  onOpenReport,
  title = "All subjects progress",
  description = "Review learning activity across the subjects you are enrolled in.",
  learnerName = "",
}) {
  return <div className="spark-all-subjects-progress">
    <div className="spark-subject-progress-detail-head">
      <div><span className="section-kicker">ALL SUBJECTS</span><h1>{title}</h1><p>{description}</p></div>
      {onOpenReport && <button type="button" className="spark-dashboard-card-action" onClick={onOpenReport}><span>View report</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span></button>}
    </div>

    <div className="spark-subject-progress-metrics spark-all-subjects-metrics">
      <Card><strong>{summary?.activeSubjects || 0}</strong><span>Enrolled subjects</span></Card>
      <Card><strong>{summary?.lessonsCompleted || 0}</strong><span>Lessons completed</span></Card>
      <Card><strong>{summary?.practiceAttempts || 0}</strong><span>Practice results</span></Card>
      <Card><strong>{summary?.practiceAttempts ? `${summary.practiceAverage}%` : "—"}</strong><span>Practice average</span></Card>
      <Card><strong>{summary?.checkpoints || 0}</strong><span>Assessments</span></Card>
      <Card><strong>{summary?.labsCompleted || 0}</strong><span>Labs explored</span></Card>
    </div>

    <SubjectDashboardOverview
      summaries={summaries}
      onOpenSubject={onOpenSubject}
      onOpenProgress={onSelectSubject ? subject => onSelectSubject(subject?.id || "all") : undefined}
      insight
      reportCta={false}
      learnerName={learnerName}
      showAllProgressAction={false}
    />

    <Card className="spark-all-subjects-activity-card">
      <div className="spark-subject-progress-assessment-head"><div><span className="section-kicker">RECENT ACTIVITY</span><h3>{learnerName ? `Across ${learnerName}’s subjects` : "Across your subjects"}</h3></div></div>
      <ActivityList rows={recentActivity} learnerName={learnerName} />
    </Card>
  </div>;
}
