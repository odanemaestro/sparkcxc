import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import ProgressBar from "../ui/ProgressBar";
import Icon from "../ui/Icon";
import { buildOverallGoalMetric } from "../../subjects/subjectProgress";

function clampPercent(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(1, Math.min(100, Math.round(number))) : 75;
}

function isPastDate(value) {
  if (!value) return false;
  const selected = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
}

export default function StudentGoalCard({
  userId,
  supabase,
  subjects = [],
  showToast,
  onGoalChange,
  onManageSubjects,
}) {
  const [goal, setGoal] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [editing, setEditing] = useState(false);
  const [target, setTarget] = useState(75);
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const metric = useMemo(() => buildOverallGoalMetric(subjects), [subjects]);

  const load = useCallback(async () => {
    if (!userId || !supabase) return;
    const [goalResult, suggestionResult] = await Promise.all([
      supabase.from("spark_student_goals").select("*").eq("student_id", userId).eq("status", "active").order("created_at", { ascending: false }).limit(1),
      supabase.from("spark_goal_suggestions").select("*").eq("student_id", userId).eq("status", "pending").order("created_at", { ascending: false }).limit(1),
    ]);
    if (goalResult.error) {
      console.error("Could not load student goal:", goalResult.error);
      return;
    }
    const nextGoal = goalResult.data?.[0] || null;
    setGoal(nextGoal);
    setSuggestion(suggestionResult.error ? null : suggestionResult.data?.[0] || null);
    onGoalChange?.(nextGoal);
  }, [userId, supabase, onGoalChange]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    setTarget(Number(goal?.target_percent || 75));
    setDate(goal?.target_date || "");
    setEditing(false);
  }, [goal?.id, goal?.target_percent, goal?.target_date]);

  useEffect(() => {
    const handleGoalNotification = event => {
      if (event?.detail?.scope !== "student" || event?.detail?.anchor !== "student-goal") return;
      load();
    };
    window.addEventListener("spark:dashboard-notification-target", handleGoalNotification);
    return () => window.removeEventListener("spark:dashboard-notification-target", handleGoalNotification);
  }, [load]);

  const save = async () => {
    if (!userId) return;
    if (!subjects.length) {
      showToast?.("Choose at least one subject before setting your learning goal.", "error");
      return;
    }
    if (isPastDate(date)) {
      showToast?.("Choose today or a future date for your goal.", "error");
      return;
    }
    setSaving(true);
    const value = clampPercent(target);
    const payload = {
      student_id: userId,
      title: `Reach ${value}% overall in SPARK`,
      target_percent: value,
      target_date: date || null,
      status: "active",
      updated_at: new Date().toISOString(),
    };
    let error;
    if (goal?.id) {
      ({ error } = await supabase.from("spark_student_goals").update(payload).eq("id", goal.id).eq("student_id", userId));
    } else {
      ({ error } = await supabase.from("spark_student_goals").insert(payload));
    }
    setSaving(false);
    if (error) {
      console.error("Could not save student goal:", error);
      showToast?.("Could not save your goal. Please try again.", "error");
      return;
    }
    showToast?.("Overall learning goal saved.");
    setEditing(false);
    load();
  };

  const respondToSuggestion = async accepted => {
    if (!suggestion?.id) return;
    setSaving(true);
    const { error } = await supabase.rpc("spark_respond_goal_suggestion", {
      p_suggestion_id: suggestion.id,
      p_status: accepted ? "accepted" : "declined",
    });
    setSaving(false);
    if (error) {
      console.error("Could not respond to goal suggestion:", error);
      showToast?.("Could not update that goal suggestion. Please try again.", "error");
      return;
    }
    showToast?.(accepted ? "Goal suggestion accepted." : "Goal suggestion declined.");
    load();
  };

  const progress = goal?.target_percent && metric.hasData
    ? Math.min(100, Math.round((metric.value / Number(goal.target_percent)) * 100))
    : 0;

  return (
    <Card className="spark-goal-card spark-overall-goal-card" data-notification-anchor="student-goal">
      <div className="spark-card-heading-row">
        <div className="spark-card-title-with-icon">
          <span className="spark-feature-icon compact"><Icon name="goal" size={19}/></span>
          <div><span className="section-kicker">MY GOAL</span><h3>{goal ? `${goal.target_percent}% overall target` : "Set an overall learning target"}</h3></div>
        </div>
        {!editing && subjects.length > 0 && <button className="spark-text-action" onClick={() => setEditing(true)}>{goal ? "Edit" : "Set goal"}</button>}
      </div>

      {suggestion && (
        <div className="spark-goal-suggestion">
          <strong>A parent suggested an overall learning goal</strong>
          <span>Reach {suggestion.target_percent}%{suggestion.target_date ? ` by ${new Date(`${suggestion.target_date}T00:00:00`).toLocaleDateString()}` : ""}.</span>
          {suggestion.message && <p>{suggestion.message}</p>}
          <div><button disabled={saving} onClick={() => respondToSuggestion(false)}>Not now</button><button disabled={saving} onClick={() => respondToSuggestion(true)}>Accept goal</button></div>
        </div>
      )}

      {!subjects.length ? (
        <div className="spark-goal-empty">
          <p>Choose the subjects you are studying first. Your overall goal will then follow your progress across the subjects where you build assessment evidence.</p>
          {onManageSubjects && <Btn v="outline" onClick={onManageSubjects}>Choose my subjects</Btn>}
        </div>
      ) : editing ? (
        <div className="spark-goal-form">
          <label><span>Target overall performance</span><div className="spark-goal-target"><input type="range" min="1" max="100" step="1" value={target} onChange={event => setTarget(event.target.value)}/><strong>{target}%</strong></div></label>
          <label><span>Target date <small>(optional)</small></span><input type="date" value={date} onChange={event => setDate(event.target.value)}/></label>
          <div className="spark-goal-actions"><Btn v="outline" onClick={() => setEditing(false)}>Cancel</Btn><Btn disabled={saving} onClick={save}>{saving ? "Saving…" : "Save goal"}</Btn></div>
        </div>
      ) : goal ? (
        <div className="spark-goal-current">
          <div className="spark-goal-score-row"><div><strong>{metric.hasData ? `${metric.value}%` : "—"}</strong><span>Current overall performance</span></div><div><strong>{goal.target_percent}%</strong><span>Goal{goal.target_date ? ` · ${new Date(`${goal.target_date}T00:00:00`).toLocaleDateString()}` : ""}</span></div></div>
          <ProgressBar value={progress} max={100}/>
          {metric.contributors.length > 0 && <div className="spark-goal-contributors" aria-label="Subjects contributing to overall performance">{metric.contributors.map(item => <span key={item.subjectId}><strong>{item.subjectName}</strong> {item.value}%</span>)}</div>}
          <p>{!metric.hasData ? "Complete scored practice or assessments to establish your overall starting point." : metric.value >= Number(goal.target_percent) ? "Target reached. Set a new goal when you're ready." : `${Math.max(0, Number(goal.target_percent) - metric.value)} percentage points to go. Each participating subject contributes equally.`}</p>
        </div>
      ) : (
        <div className="spark-goal-empty"><p>Set one SPARK-wide target. Only enrolled subjects with assessment evidence contribute, and each participating subject counts equally.</p><Btn v="outline" onClick={() => setEditing(true)}>Set my goal</Btn></div>
      )}
    </Card>
  );
}
