import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
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
  return <span className={`spark-le-status ${String(value || "").toLowerCase()}`}>{value || "unknown"}</span>;
}

export default function LearningEngineAdminPanel({ supabase, showToast }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

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

  async function updateStrategy(strategyId, action, rolloutPercent = null) {
    if (!strategyId || busyId) return;
    if (action === "promote") {
      const ok = window.confirm(
        "Promote this candidate to champion? Existing champion assignments will move to the new champion the next time SPARK resolves a strategy. This does not change marking or answer keys."
      );
      if (!ok) return;
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
            ? "Learning strategy promoted to champion."
            : action === "pause"
              ? "Candidate rollout paused."
              : "Candidate rollout updated."
        );
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
          <p>Compare recommendation strategies using aggregate outcomes. SPARK may test a candidate on a small stable cohort, but promotion always requires an administrator.</p>
        </div>
        <button type="button" className="spark-le-refresh" onClick={load} disabled={loading}>Refresh</button>
      </div>

      <Card className="spark-le-guardrail">
        <strong>Guardrails</strong>
        <p>Strategy tests can only make small recommendation-ranking changes. They cannot change canonical answers, marking schemes, awarded marks or learner evidence. Before-and-after outcome deltas are signals, not proof that a recommendation caused improvement.</p>
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
                  <p>{champion.description}</p>
                </div>
                <strong className="spark-le-rollout">{Math.round(Number(champion.rollout_percent || 0))}% traffic</strong>
              </div>
              <div className="spark-le-metrics">
                <Metric label="Started" value={champion.started_count || 0}/>
                <Metric label="Completed" value={champion.completed_count || 0}/>
                <Metric label="Completion" value={`${Number(champion.completion_rate || 0).toFixed(1)}%`}/>
                <Metric label="Adjusted outcome" value={formatDelta(champion.adjusted_outcome_delta)}/>
                <Metric label="Evidence" value={champion.confidence_band || "insufficient"}/>
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
                  <p>{row.description}</p>
                </div>
                <strong className="spark-le-rollout">{Math.round(Number(row.rollout_percent || 0))}% traffic</strong>
              </div>

              <div className="spark-le-metrics">
                <Metric label="Started" value={row.started_count || 0}/>
                <Metric label="Completed" value={row.completed_count || 0}/>
                <Metric label="Completion" value={`${Number(row.completion_rate || 0).toFixed(1)}%`}/>
                <Metric label="Raw outcome" value={formatDelta(row.average_outcome_delta)}/>
                <Metric label="Adjusted outcome" value={formatDelta(row.adjusted_outcome_delta)}/>
                <Metric label="Evidence" value={row.confidence_band || "insufficient"}/>
              </div>

              <div className="spark-le-review-note">
                {row.eligible_for_review
                  ? "Minimum evidence gate reached. Promotion is still a manual decision and the server will compare this candidate with the current champion."
                  : `Not ready for promotion. SPARK requires at least 30 completed outcomes, at least 7 days of observation and no active safety flag.`}
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
                        {percent}% rollout
                      </button>
                    ))}
                    <button
                      type="button"
                      className="promote"
                      onClick={() => updateStrategy(row.strategy_id,"promote")}
                      disabled={busyId === row.strategy_id || !row.eligible_for_review}
                    >
                      Promote to champion
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => updateStrategy(row.strategy_id,"resume",10)} disabled={busyId === row.strategy_id}>Resume at 10%</button>
                )}
              </div>
            </Card>
          ))}
        </>
      )}
    </section>
  );
}