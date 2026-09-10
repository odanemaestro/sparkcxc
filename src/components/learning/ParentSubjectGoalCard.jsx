import React, { useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
import { buildOverallGoalMetric } from "../../subjects/subjectProgress";

function isPastDate(value) {
  if (!value) return false;
  const selected = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
}

export default function ParentSubjectGoalCard({
  child,
  subjects = [],
  goal = null,
  supabase,
  showToast,
}) {
  const metric = useMemo(() => buildOverallGoalMetric(subjects), [subjects]);
  const [suggesting, setSuggesting] = useState(false);
  const [target, setTarget] = useState(goal?.target_percent || 75);
  const [date, setDate] = useState(goal?.target_date || "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSuggesting(false);
    setTarget(goal?.target_percent || 75);
    setDate(goal?.target_date || "");
    setMessage("");
  }, [child?.id, goal?.id, goal?.target_percent, goal?.target_date]);

  const suggestGoal = async () => {
    if (!child?.id || !subjects.length) return;
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
    showToast?.("Overall learning goal suggestion sent. Your child can accept or decline it.");
    setSuggesting(false);
    setMessage("");
  };

  return (
    <Card className="spark-parent-goal-card spark-parent-overall-goal-card" data-notification-anchor="parent-goal">
      <div className="spark-card-heading-row">
        <div className="spark-card-title-with-icon"><span className="spark-feature-icon compact"><Icon name="goal" size={19}/></span><div><span className="section-kicker">LEARNING GOAL</span><h3>{goal ? `${goal.target_percent}% overall target` : "No overall goal yet"}</h3></div></div>
        {subjects.length > 0 && <button className="spark-text-action" onClick={() => {
          setTarget(goal?.target_percent || 75);
          setDate(goal?.target_date || "");
          setSuggesting(value => !value);
        }}>{suggesting ? "Close" : "Suggest goal"}</button>}
      </div>

      {!subjects.length ? (
        <p>When {child?.name || "your child"} enrolls in a subject, you can suggest one overall learning target.</p>
      ) : goal ? (
        <>
          <p>{child?.name || "Your child"} is working toward {goal.target_percent}% overall{goal.target_date ? ` by ${new Date(`${goal.target_date}T00:00:00`).toLocaleDateString()}` : ""}. Current overall performance: {metric.hasData ? `${metric.value}%` : "not established yet"}.</p>
          {metric.contributors.length > 0 && <div className="spark-goal-contributors">{metric.contributors.map(item => <span key={item.subjectId}><strong>{item.subjectName}</strong> {item.value}%</span>)}</div>}
        </>
      ) : (
        <p>You can suggest one overall target across the enrolled subjects where {child?.name || "your child"} has assessment evidence. Your child stays in control and chooses whether to accept it.</p>
      )}

      {suggesting && <div className="spark-parent-goal-form"><label>Overall target<input type="number" min="1" max="100" value={target} onChange={event => setTarget(event.target.value)}/><span>%</span></label><label>Target date<input type="date" value={date} onChange={event => setDate(event.target.value)}/></label><label className="wide">Encouragement <small>(optional)</small><textarea rows="2" value={message} maxLength={240} onChange={event => setMessage(event.target.value)} placeholder="Keep going. You're making good progress."/></label><Btn disabled={saving} onClick={suggestGoal}>{saving ? "Sending…" : "Send suggestion"}</Btn></div>}
    </Card>
  );
}
