import React, { useCallback, useEffect, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import ProgressBar from "../ui/ProgressBar";
import Icon from "../ui/Icon";

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

export default function StudentGoalCard({ userId, supabase, currentPercent = 0, hasCurrentData = true, currentLabel = "Current full-paper average", showToast, onGoalChange }) {
  const [goal, setGoal] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [target, setTarget] = useState(75);
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!userId) return;
    const [goalResult, suggestionResult] = await Promise.all([
      supabase.from("spark_student_goals").select("*").eq("student_id", userId).eq("status", "active").order("created_at", { ascending: false }).limit(1),
      supabase.from("spark_goal_suggestions").select("*").eq("student_id", userId).eq("status", "pending").order("created_at", { ascending: false }).limit(4),
    ]);
    const nextGoal = goalResult.data?.[0] || null;
    setGoal(nextGoal);
    setSuggestions(suggestionResult.data || []);
    if (nextGoal) {
      setTarget(Number(nextGoal.target_percent || 75));
      setDate(nextGoal.target_date || "");
    } else {
      setTarget(75);
      setDate("");
    }
    onGoalChange?.(nextGoal);
  }, [userId, supabase, onGoalChange]);

  useEffect(() => { load(); }, [load]);

  // A goal notification can be opened while the Student is already on the
  // Overview. Refresh immediately so a newly suggested goal appears without
  // requiring a page reload or tab change.
  useEffect(() => {
    const handleGoalNotification = event => {
      if (event?.detail?.scope !== "student" || event?.detail?.anchor !== "student-goal") return;
      load();
    };
    window.addEventListener("spark:dashboard-notification-target", handleGoalNotification);
    return () => window.removeEventListener("spark:dashboard-notification-target", handleGoalNotification);
  }, [load]);

  const save = async () => {
    if (isPastDate(date)) {
      showToast?.("Choose today or a future date for your goal.", "error");
      return;
    }
    setSaving(true);
    const payload = {
      student_id: userId,
      title: `Reach ${clampPercent(target)}% in CSEC Mathematics`,
      target_percent: clampPercent(target),
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
    showToast?.("Your learning goal was saved.");
    setEditing(false);
    load();
  };

  const respondToSuggestion = async (suggestion, accepted) => {
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

  const progress = goal?.target_percent && hasCurrentData ? Math.min(100, Math.round((Number(currentPercent || 0) / Number(goal.target_percent)) * 100)) : 0;
  const currentValueText = hasCurrentData ? `${Math.round(Number(currentPercent || 0))}%` : "—";

  return (
    <Card className="spark-goal-card" data-notification-anchor="student-goal">
      <div className="spark-card-heading-row">
        <div className="spark-card-title-with-icon">
          <span className="spark-feature-icon compact"><Icon name="goal" size={19}/></span>
          <div><span className="section-kicker">MY GOAL</span><h3>Keep a target in sight</h3></div>
        </div>
        {!editing && <button className="spark-text-action" onClick={() => setEditing(true)}>{goal ? "Edit" : "Set goal"}</button>}
      </div>

      {suggestions.length > 0 && (
        <div className="spark-goal-suggestion">
          <strong>A parent suggested a goal</strong>
          <span>Reach {suggestions[0].target_percent}%{suggestions[0].target_date ? ` by ${new Date(`${suggestions[0].target_date}T00:00:00`).toLocaleDateString()}` : ""}.</span>
          {suggestions[0].message && <p>{suggestions[0].message}</p>}
          <div><button disabled={saving} onClick={() => respondToSuggestion(suggestions[0], false)}>Not now</button><button disabled={saving} onClick={() => respondToSuggestion(suggestions[0], true)}>Accept goal</button></div>
        </div>
      )}

      {editing ? (
        <div className="spark-goal-form">
          <label><span>Target Mathematics average</span><div className="spark-goal-target"><input type="range" min="50" max="100" step="1" value={target} onChange={event => setTarget(event.target.value)}/><strong>{target}%</strong></div></label>
          <label><span>Target date <small>(optional)</small></span><input type="date" value={date} onChange={event => setDate(event.target.value)}/></label>
          <div className="spark-goal-actions"><Btn v="outline" onClick={() => setEditing(false)}>Cancel</Btn><Btn disabled={saving} onClick={save}>{saving ? "Saving…" : "Save goal"}</Btn></div>
        </div>
      ) : goal ? (
        <div className="spark-goal-current">
          <div className="spark-goal-score-row"><div><strong>{currentValueText}</strong><span>{currentLabel}</span></div><div><strong>{goal.target_percent}%</strong><span>Target{goal.target_date ? ` · ${new Date(`${goal.target_date}T00:00:00`).toLocaleDateString()}` : ""}</span></div></div>
          <ProgressBar value={progress} max={100}/>
          <p>{!hasCurrentData ? "Complete some learning or a full practice paper to establish your starting point." : currentPercent >= Number(goal.target_percent) ? "Target reached. Excellent work. Set a new goal when you're ready." : `${Math.max(0, Number(goal.target_percent) - Number(currentPercent || 0))} percentage points to go.`}</p>
        </div>
      ) : (
        <div className="spark-goal-empty"><p>Set a realistic target and SPARK will keep it visible alongside your progress.</p><Btn v="outline" onClick={() => setEditing(true)}>Set my goal</Btn></div>
      )}
    </Card>
  );
}
