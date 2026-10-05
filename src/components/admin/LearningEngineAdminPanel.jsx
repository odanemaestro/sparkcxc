import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import ConfirmModal from "../ui/ConfirmModal";
import "./learningEngineAdminPanel.css";

function Metric({ label, value }) {
  return <div className="spark-le-metric"><span>{label}</span><strong>{value}</strong></div>;
}

function formatDelta(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "Not enough data";
  return `${number > 0 ? "+" : ""}${number.toFixed(1)} pts`;
}

function StrategyStatus({ value }) {
  const labels={
    champion:"Current strategy",
    candidate:"Testing",
    paused:"Paused",
    retired:"Previous strategy",
  };
  const key=String(value || "").toLowerCase();
  return <span className={`spark-le-status ${key}`}>{labels[key] || "Unknown"}</span>;
}

function strategyDescription(row) {
  if (row?.status === "champion") {
    return "This is the recommendation system SPARK currently uses. It mainly uses each student's own progress and performance to decide what they should do next.";
  }
  return "This strategy gives a little more attention to topics a student may be starting to forget, topics they have not practised for a while, and areas where SPARK does not yet have enough evidence.";
}

function evidenceLabel(value) {
  const labels={
    insufficient:"Not enough yet",
    early:"Early evidence",
    moderate:"Moderate evidence",
    strong:"Strong evidence",
  };
  return labels[String(value || "").toLowerCase()] || value || "Not enough yet";
}

export default function LearningEngineAdminPanel({ supabase, showToast }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [promoteTarget, setPromoteTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("spark_admin_learning_strategy_dashboard_v3");
      if (error) {
        if (!["PGRST202","42883"].includes(error.code)) showToast?.(error.message || "Could not load Learning Engine data.");
        setRows([]);
      } else {
        setRows(data || []);
      }
    } catch (error) {
      console.warn("Could not load SPARK Learning Engine dashboard", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [showToast, supabase]);

  useEffect(() => { load(); }, [load]);

  const champion = useMemo(() => rows.find(row => row.status === "champion") || null, [rows]);
  const candidates = useMemo(() => rows.filter(row => ["candidate","paused"].includes(row.status)), [rows]);

  async function updateStrategy(strategyId, action, rolloutPercent = null, { confirmed = false } = {}) {
    if (!strategyId || busyId) return;
    if (action === "promote" && !confirmed) {
      const row = rows.find(item => item.strategy_id === strategyId) || null;
      setPromoteTarget(row || { strategy_id: strategyId, label: "this candidate" });
      return;
    }

    setBusyId(strategyId);
    try {
      const { error } = await supabase.rpc("spark_admin_set_learning_strategy_v3", {
        p_strategy_id:strategyId,
        p_action:action,
        p_rollout_percent:rolloutPercent,
      });
      if (error) {
        showToast?.(error.message || "Could not update the learning strategy.");
      } else {
        showToast?.(
          action === "promote"
            ? "This is now the main recommendation strategy."
            : action === "pause"
              ? "Testing has been paused."
              : "Test group size updated."
        );
        if (action === "promote") setPromoteTarget(null);
        await load();
      }
    } finally {
      setBusyId("");
    }
  }

  return (
    <section className="spark-le-admin">
      <div className="spark-le-heading">
        <div>
          <span className="section-kicker">SPARK LEARNING LOOP V3</span>
          <h2>Learning Engine</h2>
          <p>SPARK can test different ways of choosing what a student should do next. A new strategy may be tested with a small group first, but it will never become the main strategy unless an administrator approves it.</p>
        </div>
        <button type="button" className="spark-le-refresh" onClick={load} disabled={loading}>Refresh</button>
      </div>

      <Card className="spark-le-guardrail">
        <strong>Safety Rules</strong>
        <p>These tests can only make small changes to the order of recommendations. They cannot change correct answers, marking schemes, marks already awarded, student answers or learning records. Changes in results can help us judge a strategy, but they do not automatically prove that the strategy caused the improvement.</p>
      </Card>

      {loading ? (
        <Card className="spark-le-empty">Loading Learning Engine data...</Card>
      ) : rows.length === 0 ? (
        <Card className="spark-le-empty">Phase 3 database functions are not active yet. Run the Learning Loop V3 migration after the code tests pass.</Card>
      ) : (
        <>
          {champion && (
            <Card className="spark-le-strategy champion">
              <div className="spark-le-strategy-head">
                <div>
                  <div className="spark-le-title-row">
                    <h3>{champion.label}</h3>
                    <StrategyStatus value={champion.status}/>
                  </div>
                  <p>{strategyDescription(champion)}</p>
                </div>
                <strong className="spark-le-rollout">{Math.round(Number(champion.rollout_percent || 0))}% of students</strong>
              </div>
              <div className="spark-le-metrics">
                <Metric label="Started" value={champion.started_count || 0}/>
                <Metric label="Completed" value={champion.completed_count || 0}/>
                <Metric label="Completion" value={`${Number(champion.completion_rate || 0).toFixed(1)}%`}/>
                <Metric label="Result change" value={formatDelta(champion.adjusted_outcome_delta)}/>
                <Metric label="Evidence" value={evidenceLabel(champion.confidence_band)}/>
              </div>
            </Card>
          )}

          {candidates.map(row => (
            <Card key={row.strategy_id} className={`spark-le-strategy ${row.status}`}>
              <div className="spark-le-strategy-head">
                <div>
                  <div className="spark-le-title-row">
                    <h3>{row.label}</h3>
                    <StrategyStatus value={row.status}/>
                    {row.safety_flag && <span className="spark-le-safety">Safety flag: {row.safety_flag.replace(/_/g," ")}</span>}
                  </div>
                  <p>{strategyDescription(row)}</p>
                </div>
                <strong className="spark-le-rollout">{Math.round(Number(row.rollout_percent || 0))}% of students</strong>
              </div>

              <div className="spark-le-metrics">
                <Metric label="Started" value={row.started_count || 0}/>
                <Metric label="Completed" value={row.completed_count || 0}/>
                <Metric label="Completion" value={`${Number(row.completion_rate || 0).toFixed(1)}%`}/>
                <Metric label="Result change" value={formatDelta(row.average_outcome_delta)}/>
                <Metric label="Adjusted result" value={formatDelta(row.adjusted_outcome_delta)}/>
                <Metric label="Evidence" value={evidenceLabel(row.confidence_band)}/>
              </div>

              <div className="spark-le-review-note">
                {row.eligible_for_review
                  ? "There is now enough information for an administrator to review this strategy. It will not become the main strategy automatically."
                  : "There is not enough information to make this the main strategy yet. SPARK needs at least 30 completed results, at least 7 days of testing and no active safety concerns."}
              </div>

              <div className="spark-le-actions">
                {row.status === "candidate" ? (
                  <>
                    <button type="button" onClick={() => updateStrategy(row.strategy_id,"pause")} disabled={busyId === row.strategy_id}>Pause</button>
                    {[5,10,20].map(percent => (
                      <button
                        type="button"
                        key={percent}
                        className={Math.round(Number(row.rollout_percent || 0)) === percent ? "active" : ""}
                        onClick={() => updateStrategy(row.strategy_id,"set_rollout",percent)}
                        disabled={busyId === row.strategy_id}
                      >
                        Test with {percent}%
                      </button>
                    ))}
                    <button
                      type="button"
                      className="promote"
                      onClick={() => updateStrategy(row.strategy_id,"promote")}
                      disabled={busyId === row.strategy_id || !row.eligible_for_review}
                    >
                      Make main strategy
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => updateStrategy(row.strategy_id,"resume",10)} disabled={busyId === row.strategy_id}>Resume testing at 10%</button>
                )}
              </div>
            </Card>
          ))}
        </>
      )}

      <ConfirmModal
        open={Boolean(promoteTarget)}
        onClose={() => { if (!busyId) setPromoteTarget(null); }}
        onConfirm={() => updateStrategy(promoteTarget?.strategy_id, "promote", null, { confirmed: true })}
        title="Make this the main strategy?"
        message={`${promoteTarget?.label || "This strategy"} will become the recommendation strategy SPARK uses by default. Students will move to it the next time SPARK chooses a strategy for them. Correct answers, marking schemes and marks will not change.`}
        confirmLabel="Make main strategy"
        busy={Boolean(busyId)}
      />
    </section>
  );
}