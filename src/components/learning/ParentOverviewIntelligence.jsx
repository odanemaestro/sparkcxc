import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
import InsightText from "./InsightText";

function DashboardCardAction({ label, onClick }) {
  return (
    <button type="button" className="spark-dashboard-card-action" onClick={onClick}>
      <span>{label}</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
    </button>
  );
}

function isPastDate(value) {
  if (!value) return false;
  const selected = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
}

export default function ParentOverviewIntelligence({
  child,
  summary,
  learnerModel,
  goal,
  supabase,
  showToast,
  onOpenReport,
}) {
  const [suggesting, setSuggesting] = useState(false);
  const [target, setTarget] = useState(goal?.target_percent || 75);
  const [date, setDate] = useState(goal?.target_date || "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTarget(goal?.target_percent || 75);
    setDate(goal?.target_date || "");
    setMessage("");
    setSuggesting(false);
  }, [child?.id, goal?.target_percent, goal?.target_date]);

  const suggestGoal = async () => {
    if (!child?.id) return;
    const targetNumber = Number(target);
    if (!Number.isFinite(targetNumber) || targetNumber < 1 || targetNumber > 100) {
      showToast?.("Choose a target between 1% and 100%.", "error");
      return;
    }
    if (isPastDate(date)) {
      showToast?.("Choose today or a future date for the suggested goal.", "error");
      return;
    }
    setSaving(true);
    const { error } = await supabase.rpc("spark_suggest_goal", {
      p_student_id: child.id,
      p_target_percent: Math.round(targetNumber),
      p_target_date: date || null,
      p_message: message.trim() || null,
    });
    setSaving(false);
    if (error) {
      console.error("Could not suggest goal:", error);
      showToast?.("Could not send that goal suggestion. Please try again.", "error");
      return;
    }
    showToast?.("Goal suggestion sent. Your child can accept or decline it.");
    setSuggesting(false);
    setMessage("");
  };

  const hasCurrentData = Boolean(summary?.examCount || summary?.skillCount);
  const currentValue = summary?.examCount ? summary.overallExamAverage : summary?.mastery || 0;
  const currentValueText = hasCurrentData ? `${currentValue}%` : "—";
  const currentLabel = summary?.examCount ? "Current full-paper average" : "Current mastery";
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
        <div className="spark-card-heading-row"><div><span className="section-kicker">LEARNER MODEL</span><h3>What SPARK is seeing</h3></div><span className="spark-model-explainer">Based on accumulated learning evidence</span></div>
        <div className="spark-parent-learner-list">{priorities.map(item => <div key={item.skill} className="spark-parent-learner-row">
          <div><strong>{item.skill}</strong><span>{item.confidenceLabel} confidence · {item.trendLabel}{item.commonError ? ` · Recurring issue: ${item.commonError.label}` : ""}</span></div>
          <strong>{item.mastery}%</strong>
        </div>)}</div>
        <p className="spark-model-recommendation">Next priority: {priorities[0].recommendation}</p>
      </Card>}

      <div className="spark-overview-two-col spark-parent-action-row">
        <Card className="spark-parent-goal-card" data-notification-anchor="parent-goal">
          <div className="spark-card-heading-row"><div className="spark-card-title-with-icon"><span className="spark-feature-icon compact"><Icon name="goal" size={19}/></span><div><span className="section-kicker">LEARNING GOAL</span><h3>{goal ? `${goal.target_percent}% target` : "No active goal yet"}</h3></div></div><button className="spark-text-action" onClick={() => setSuggesting(value => !value)}>{suggesting ? "Close" : "Suggest goal"}</button></div>
          {goal ? <p>{child?.name} is working toward {goal.target_percent}% in CSEC Mathematics{goal.target_date ? ` by ${new Date(`${goal.target_date}T00:00:00`).toLocaleDateString()}` : ""}. {currentLabel}: {currentValueText}.</p> : <p>You can suggest a target. Your child stays in control and chooses whether to accept it.</p>}
          {suggesting && <div className="spark-parent-goal-form"><label>Target<input type="number" min="1" max="100" value={target} onChange={event => setTarget(event.target.value)}/><span>%</span></label><label>Target date<input type="date" value={date} onChange={event => setDate(event.target.value)}/></label><label className="wide">Encouragement <small>(optional)</small><textarea rows="2" value={message} maxLength={240} onChange={event => setMessage(event.target.value)} placeholder="Keep going. You're making good progress."/></label><Btn disabled={saving} onClick={suggestGoal}>{saving ? "Sending…" : "Send suggestion"}</Btn></div>}
        </Card>

        <Card className="spark-report-cta-card parent">
          <div className="spark-card-title-with-icon"><span className="spark-feature-icon"><Icon name="report" size={22}/></span><div><span className="section-kicker">PROGRESS REPORT</span><h3>Shareable progress summary</h3><p>View a polished report, download it as PDF, or email it securely to your verified Parent account email.</p></div></div>
          <DashboardCardAction label="Generate report" onClick={onOpenReport} />
        </Card>
      </div>
    </div>
  );
}
