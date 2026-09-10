import React from "react";
import Card from "../ui/Card";
import Icon from "../ui/Icon";
import InsightText from "./InsightText";

function DashboardCardAction({ label, onClick }) {
  return (
    <button type="button" className="spark-dashboard-card-action" onClick={onClick}>
      <span>{label}</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
    </button>
  );
}

export default function ParentOverviewIntelligence({
  child,
  summary,
  learnerModel,
  onOpenReport,
}) {
  const priorities = learnerModel?.hasEvidence ? learnerModel.prioritySkills?.slice(0, 3) || [] : [];

  return (
    <div className="spark-parent-intelligence">
      <Card className="spark-insight-card parent">
        <div className="spark-insight-icon"><Icon name="insight" size={22}/></div>
        <div><span className="section-kicker">SPARK INSIGHT</span><p><InsightText text={summary?.insight}/></p></div>
        {summary?.trendDelta !== 0 && <span className={`spark-trend-chip ${summary.trendDelta > 0 ? "up" : "down"}`}>{summary.trendDelta > 0 ? "+" : ""}{summary.trendDelta}% recent trend</span>}
      </Card>

      <div className="spark-weekly-snapshot">
        <div><strong>{summary?.weekly?.lessons || 0}</strong><span>Lessons this week</span></div>
        <div><strong>{summary?.weekly?.questions || 0}</strong><span>Questions attempted</span></div>
        <div><strong>{summary?.weekly?.exams || 0}</strong><span>Practice exams</span></div>
        <div><strong>{summary?.weekly?.exams ? `${summary.weekly.average}%` : "—"}</strong><span>Weekly exam average</span></div>
        <div><strong>{summary?.weekly?.tutorSessions || 0}</strong><span>Tutor sessions</span></div>
      </div>

      {priorities.length > 0 && <Card className="spark-parent-learner-model-card">
        <div className="spark-card-heading-row"><div><span className="section-kicker">LEARNER MODEL</span><h3>What SPARK is seeing</h3></div><span className="spark-model-explainer">Based on recent learning activity</span></div>
        <div className="spark-parent-learner-list">{priorities.map(item => <div key={item.skill} className="spark-parent-learner-row">
          <div><strong>{item.skill}</strong><span>{item.confidenceLabel} confidence · {item.trendLabel}{item.commonError ? ` · Recurring issue: ${item.commonError.label}` : ""}</span></div>
          <strong>{item.mastery}%</strong>
        </div>)}</div>
        <p className="spark-model-recommendation">Next priority: {priorities[0].recommendation}</p>
      </Card>}

      <Card className="spark-report-cta-card parent">
        <div className="spark-card-title-with-icon"><span className="spark-feature-icon"><Icon name="report" size={22}/></span><div><span className="section-kicker">PROGRESS REPORT</span><h3>{child?.name ? `${child.name}'s Mathematics report` : "Shareable progress summary"}</h3><p>View a polished Mathematics report, download it as PDF, or email it securely to your verified Parent account email.</p></div></div>
        <DashboardCardAction label="Generate report" onClick={onOpenReport} />
      </Card>
    </div>
  );
}
