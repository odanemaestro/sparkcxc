import React, { useMemo } from "react";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { buildGenericSubjectProgressReport, summarizeSubjectProgress } from "../../subjects/subjectProgress";
import "./subjectProgressDetail.css";

function SkillList({ title, rows = [], empty }) {
  return <Card className="spark-subject-progress-skill-card"><h3>{title}</h3>{rows.length ? <div className="spark-subject-progress-skill-list">{rows.map(row => <div key={`${title}-${row.skill}`}><span>{row.skill}</span><strong>{Math.round(Number(row.score || 0))}%</strong></div>)}</div> : <p>{empty}</p>}</Card>;
}

export default function SubjectProgressDetail({ subject, rows = [], onOpenSubject, onOpenReport }) {
  const summary = useMemo(() => summarizeSubjectProgress(rows, { subjectId: subject?.id, totalTopics: subject?.stats?.topics || 0 }), [rows, subject]);
  const report = useMemo(() => buildGenericSubjectProgressReport({ subject, rows }, { period: "term" }), [rows, subject]);
  const assessments = report.exams || [];
  const supportsLabs = Boolean(subject?.capabilities?.labs);
  const finalMetric = supportsLabs
    ? { value: summary.labsCompleted || 0, label: "Labs explored" }
    : subject?.id === "mathematics"
      ? { value: summary.skillsTracked || 0, label: "Skills tracked" }
      : { value: summary.topicsPractised || 0, label: "Topics practised" };
  const detailDescription = supportsLabs
    ? "Review lesson coverage, practice performance, labs and assessments recorded in SPARK."
    : "Review lesson coverage, practice performance and assessments recorded in SPARK.";

  return <div className="spark-subject-progress-detail">
    <div className="spark-subject-progress-detail-head">
      <div><span className="section-kicker">{subject?.name || "Subject"}</span><h1>{subject?.shortName || subject?.name || "Subject"} progress</h1><p>{detailDescription}</p></div>
      <div className="spark-subject-progress-detail-actions">{onOpenSubject && <button type="button" className="spark-dashboard-card-action" onClick={() => onOpenSubject(subject)}><span>Open subject</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span></button>}{onOpenReport && <button type="button" className="spark-dashboard-card-action" onClick={() => onOpenReport(subject)}><span>View report</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span></button>}</div>
    </div>

    <div className="spark-subject-progress-metrics">
      <Card><strong>{summary.lessonsCompleted}/{summary.totalTopics}</strong><span>Topic lessons completed</span></Card>
      <Card><strong>{summary.lessonPercent}%</strong><span>Lesson coverage</span></Card>
      <Card><strong>{summary.practiceAttempts || 0}</strong><span>Practice results</span></Card>
      <Card><strong>{summary.practiceAttempts ? `${summary.practiceAverage}%` : "—"}</strong><span>Practice average</span></Card>
      <Card><strong>{summary.assessments ?? summary.checkpoints ?? 0}</strong><span>Assessments</span></Card>
      <Card><strong>{finalMetric.value}</strong><span>{finalMetric.label}</span></Card>
    </div>

    <Card className="spark-subject-progress-coverage-card">
      <div className="spark-subject-progress-coverage-head"><div><span className="section-kicker">COURSE COVERAGE</span><h3>Lesson progress</h3></div><strong>{summary.lessonPercent}%</strong></div>
      <ProgressBar value={summary.lessonsCompleted} max={Math.max(1, summary.totalTopics)} />
      <p>{summary.lessonsCompleted} of {summary.totalTopics} topic lessons are marked complete.</p>
    </Card>

    <Card className="spark-subject-progress-insight"><span className="section-kicker">SPARK INSIGHT</span><p>{report.summary?.insight}</p></Card>

    <div className="spark-subject-progress-two-col">
      <SkillList title="Strongest recorded areas" rows={report.strongestSkills || []} empty="Complete topic tests to establish stronger areas." />
      <SkillList title="Areas needing attention" rows={report.weakestSkills || []} empty="No priority areas have been identified yet." />
    </div>

    <Card className="spark-subject-progress-assessments">
      <div className="spark-subject-progress-assessment-head"><div><span className="section-kicker">RECENT ASSESSMENTS</span><h3>Topic tests, checkpoints and full papers</h3></div></div>
      {assessments.length ? <div className="spark-subject-progress-assessment-list">{assessments.slice(0, 8).map(item => <div key={item.id}><div><strong>{item.label}</strong><span>{item.completedAt ? new Date(item.completedAt).toLocaleString([], { dateStyle:"medium", timeStyle:"short" }) : "Recorded in SPARK"}</span></div><b>{item.percent}%</b></div>)}</div> : <p>No assessment results have been recorded for this subject yet.</p>}
    </Card>
  </div>;
}
