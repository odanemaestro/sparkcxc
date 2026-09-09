import React, { useCallback, useEffect, useMemo, useState } from "react";
import { rewardLevelForPoints, weeklyAchievementBadges, weeklyScoreBreakdown } from "../../rewards/sparkRewards";

function safeNumber(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 4h8v3.8c0 3-1.8 5.3-4 5.3s-4-2.3-4-5.3V4Z" />
      <path d="M8 6H5.5v1.2c0 2.1 1.2 3.6 3.1 4.1M16 6h2.5v1.2c0 2.1-1.2 3.6-3.1 4.1M12 13.1V17M8.7 20h6.6M10 17h4" />
    </svg>
  );
}

export default function SparkRewardsPanel({
  supabase,
  viewerUserId,
  viewerRole,
  subjectUserId = null,
  subjectName = "",
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLeaders, setShowLeaders] = useState(false);
  const [savingPreference, setSavingPreference] = useState(false);

  const load = useCallback(async () => {
    if (!supabase || !viewerUserId) return;
    setLoading(true);
    setError("");
    const { data: payload, error: rpcError } = await supabase.rpc("spark_get_rewards_dashboard", {
      p_student_id: subjectUserId || null,
    });
    if (rpcError) {
      console.error("Failed to load SPARK Rewards:", rpcError);
      setError("SPARK Rewards are getting ready. Apply the rewards database migration to activate this card.");
      setData(null);
    } else {
      setData(payload || null);
    }
    setLoading(false);
  }, [supabase, viewerUserId, subjectUserId]);

  useEffect(() => { load(); }, [load]);

  const winner = data?.winner || null;
  const subject = data?.subject || null;
  const leaders = Array.isArray(data?.leaders) ? data.leaders : [];
  const level = useMemo(() => rewardLevelForPoints(subject?.lifetime_points), [subject?.lifetime_points]);
  const badges = useMemo(() => weeklyAchievementBadges(subject || {}), [subject]);
  const breakdown = useMemo(() => weeklyScoreBreakdown(subject || {}), [subject]);
  const canChangePrivacy = viewerRole === "student" && subjectUserId && String(subjectUserId) === String(viewerUserId);

  const updatePrivacy = async () => {
    if (!canChangePrivacy || !supabase || savingPreference) return;
    const nextVisible = !Boolean(data?.preferences?.leaderboard_visible);
    setSavingPreference(true);
    const { error: rpcError } = await supabase.rpc("spark_set_reward_preferences", {
      p_leaderboard_visible: nextVisible,
    });
    if (rpcError) {
      console.error("Failed to update SPARK Rewards privacy:", rpcError);
    } else {
      await load();
    }
    setSavingPreference(false);
  };

  const subjectLabel = viewerRole === "parent" && subjectName ? `${subjectName}'s week` : "Your week";

  return (
    <section className="spark-rewards-card" aria-label="SPARK Rewards">
      <div className="spark-rewards-hero">
        <div className="spark-rewards-trophy"><TrophyIcon /></div>
        <div className="spark-rewards-winner-copy">
          <span className="spark-rewards-eyebrow">SPARK OF THE WEEK</span>
          {loading ? (
            <strong className="spark-rewards-loading">Loading this week's leader…</strong>
          ) : winner ? (
            <>
              <strong>{winner.display_name || "Anonymous SPARK"}</strong>
              <span>
                {safeNumber(winner.study_days)} study day{safeNumber(winner.study_days) === 1 ? "" : "s"}
                {safeNumber(winner.skills_improved) > 0 ? ` · ${safeNumber(winner.skills_improved)} skill${safeNumber(winner.skills_improved) === 1 ? "" : "s"} improved` : ""}
                {` · ${safeNumber(winner.weekly_points)} weekly points`}
              </span>
            </>
          ) : (
            <>
              <strong>No weekly leader yet</strong>
              <span>Study activity this week will determine the first SPARK.</span>
            </>
          )}
        </div>
        <button type="button" className="spark-rewards-leaders-button" onClick={() => setShowLeaders(current => !current)} disabled={loading || !!error} aria-expanded={showLeaders}>
          {showLeaders ? "Hide leaders" : "View weekly leaders"}
        </button>
      </div>

      {error && <div className="spark-rewards-setup-note">{error}</div>}

      {!error && subject && (
        <div className="spark-rewards-personal">
          <div className="spark-rewards-personal-main">
            <div>
              <span className="spark-rewards-personal-label">{subjectLabel}</span>
              <strong>{safeNumber(subject.weekly_points)} <small>/100</small></strong>
              <span className="spark-rewards-personal-rank">
                {safeNumber(subject.rank) > 0 ? `#${safeNumber(subject.rank)} of ${safeNumber(subject.total_participants)} active learners` : "Not ranked yet this week · Complete a learning activity to join"}
              </span>
            </div>
            <div className="spark-rewards-level-block">
              <span>Level {level.level}</span>
              <strong>{level.name}</strong>
              <div className="spark-rewards-level-track" aria-label={`${level.progressPercent}% progress to next level`}>
                <i style={{width:`${level.progressPercent}%`}} />
              </div>
              <small>{level.points} lifetime SPARK Points · {level.next ? `${level.pointsToNext} points to ${level.next.name}` : "Highest SPARK level reached"}</small>
            </div>
          </div>

          {badges.length > 0 && (
            <div className="spark-rewards-badges" aria-label="Weekly achievements">
              {badges.map(badge => <span key={badge.key}>{badge.icon} {badge.label}</span>)}
            </div>
          )}

          {canChangePrivacy && (
            <button type="button" className="spark-rewards-privacy" onClick={updatePrivacy} disabled={savingPreference} aria-pressed={Boolean(data?.preferences?.leaderboard_visible)}>
              <span className={`spark-rewards-switch ${data?.preferences?.leaderboard_visible ? "is-on" : ""}`} aria-hidden="true"><i /></span>
              <span>
                <strong>{data?.preferences?.leaderboard_visible ? "Name visible on leaderboard" : "Leaderboard name hidden"}</strong>
                <small>{data?.preferences?.leaderboard_visible ? "Others see your first name and last initial." : "If you place, others see Anonymous SPARK."}</small>
              </span>
            </button>
          )}
        </div>
      )}

      {!error && showLeaders && (
        <div className="spark-rewards-expanded">
          <div className="spark-rewards-leaderboard">
            <div className="spark-rewards-section-title"><strong>Weekly leaders</strong><span>Balanced learning, not just highest marks</span></div>
            {leaders.length ? leaders.map((leader, index) => (
              <div className={`spark-rewards-leader-row ${leader.is_subject ? "is-subject" : ""}`} key={`${leader.rank}-${leader.display_name}-${index}`}>
                <b>#{leader.rank}</b>
                <span className="spark-rewards-leader-name">{leader.is_subject ? (viewerRole === "student" ? "You" : viewerRole === "parent" ? (subjectName || "Your student") : leader.display_name) : leader.display_name}</span>
                <span>{safeNumber(leader.study_days)}d</span>
                <strong>{safeNumber(leader.weekly_points)} pts</strong>
              </div>
            )) : <p className="spark-rewards-empty">No students have earned weekly points yet.</p>}
          </div>

          {subject && (
            <div className="spark-rewards-breakdown">
              <div className="spark-rewards-section-title"><strong>How the weekly score works</strong><span>Every category has a cap so grinding one activity cannot dominate.</span></div>
              {breakdown.map(([label, points, max]) => (
                <div className="spark-rewards-breakdown-row" key={label}>
                  <span>{label}</span>
                  <div><i style={{width:`${Math.min(100, Math.round((points / max) * 100))}%`}} /></div>
                  <b>{points}/{max}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
