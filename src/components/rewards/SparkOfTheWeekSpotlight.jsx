import React, { useId, useMemo } from "react";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { rewardLevelForPoints, weeklyAchievementBadges, weeklyScoreBreakdown } from "../../rewards/sparkRewards";

function safeNumber(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

export default function SparkOfTheWeekSpotlight({ rewards }) {
  const titleId = useId().replace(/:/g, "") + "-spotlight";
  const {
    data,
    loading,
    error,
    savingPreference,
    setLeaderboardVisible,
    showLeaders,
    setShowLeaders,
  } = rewards || {};

  const winner = data?.winner || null;
  const subject = data?.subject || null;
  const leaders = Array.isArray(data?.leaders) ? data.leaders : [];
  const youLead = Boolean(winner?.is_subject);
  const weeklyPoints = Math.max(0, Math.min(100, Math.round(safeNumber(subject?.weekly_points))));
  const rank = safeNumber(subject?.rank);
  const participants = safeNumber(subject?.total_participants || data?.total_participants);
  const studyDays = safeNumber(winner?.study_days);
  const skillsImproved = safeNumber(winner?.skills_improved);
  const level = useMemo(() => rewardLevelForPoints(subject?.lifetime_points), [subject?.lifetime_points]);
  const badges = useMemo(() => weeklyAchievementBadges(subject || {}), [subject]);
  const breakdown = useMemo(() => weeklyScoreBreakdown(subject || {}), [subject]);

  let name;
  let note = "";
  if (loading) name = "Loading this week's leader…";
  else if (error) {
    name = "Coming soon";
    note = "SPARK of the Week will appear here once SPARK Rewards are switched on.";
  } else if (winner) {
    name = winner.display_name || "Anonymous SPARK";
    if (youLead) note = "You lead SPARK this week. Keep going to hold the spot.";
  } else {
    name = "No leader yet this week";
    note = "The first learner to complete a learning activity takes the spot.";
  }

  const updatePrivacy = async () => {
    if (!subject || !setLeaderboardVisible || savingPreference) return;
    await setLeaderboardVisible(!Boolean(data?.preferences?.leaderboard_visible));
  };

  return (
    <>
      <section className={"ssh-card ssh-spotlight" + (youLead ? " is-you" : "")} aria-labelledby={titleId} aria-busy={loading || undefined}>
        <div className="ssh-spotlight-leader">
          <span className="ssh-spotlight-mark" aria-hidden="true"><Icon name="trophy" size={28} strokeWidth={1.7} /></span>
          <h2 id={titleId} className="ssh-eyebrow ssh-eyebrow--reward">SPARK of the Week</h2>
          <p className={"ssh-spotlight-name" + (loading ? " is-loading" : "")}>
            <span>{name}</span>
            {youLead && !loading && <span className="ssh-you-chip">That's you</span>}
          </p>
          {note && <p className="ssh-spotlight-meta">{note}</p>}
          {!loading && !error && winner && (
            <ul className="ssh-leader-stats" aria-label="This week's leader">
              <li><strong>{studyDays}</strong><span>study day{studyDays === 1 ? "" : "s"}</span></li>
              <li><strong>{skillsImproved}</strong><span>skill{skillsImproved === 1 ? "" : "s"} improved</span></li>
              <li><strong>{safeNumber(winner.weekly_points)}</strong><span>weekly points</span></li>
            </ul>
          )}
        </div>

        {!loading && !error && subject && (
          <div className="ssh-spotlight-you">
            <div className="ssh-week">
              <div className="ssh-week-row">
                <span>Your week</span>
                <strong>{weeklyPoints}<small> / 100 points</small></strong>
              </div>
              <div className="ssh-meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={weeklyPoints} aria-label="Your weekly SPARK points">
                <i style={{ width:weeklyPoints + "%" }} />
              </div>
              <p className="ssh-week-rank">
                {rank > 0 ? "#" + rank + " of " + participants + " active learners" : "Not ranked yet this week · Complete a learning activity to join"}
              </p>
            </div>

            <div className="ssh-spotlight-reward-summary">
              <div className="ssh-spotlight-level">
                <span>Level {level.level}</span>
                <strong>{level.name}</strong>
                <small>{level.points} lifetime points</small>
              </div>
              <div className="ssh-spotlight-badges">
                <span className="ssh-spotlight-reward-label">This week's badges</span>
                <div>
                  {badges.length
                    ? badges.slice(0, 3).map(badge => <span className="ssh-spotlight-badge" key={badge.key}><Icon name={badge.icon} size={14}/><b>{badge.label}</b></span>)
                    : <span className="ssh-spotlight-badge is-empty">No badges yet</span>}
                </div>
              </div>
            </div>

            <div className="ssh-spotlight-actions">
              <button type="button" className="ssh-text-btn ssh-spotlight-link" onClick={() => setShowLeaders?.(true)}>
                <span>Weekly leaders</span>
                <Icon name="arrowRight" size={16} />
              </button>
            </div>

            <button
              type="button"
              className="spark-rewards-privacy ssh-spotlight-privacy-full"
              onClick={updatePrivacy}
              disabled={savingPreference}
              aria-pressed={Boolean(data?.preferences?.leaderboard_visible)}
            >
              <span className={"spark-rewards-switch " + (data?.preferences?.leaderboard_visible ? "is-on" : "")} aria-hidden="true"><i /></span>
              <span>
                <strong>{data?.preferences?.leaderboard_visible ? "Name visible on leaderboard" : "Leaderboard name hidden"}</strong>
                <small>{data?.preferences?.leaderboard_visible ? "Others see your first name and last initial." : "If you place, others see Anonymous SPARK."}</small>
              </span>
            </button>
          </div>
        )}
      </section>

      {!error && showLeaders && (
        <Modal
          onClose={() => setShowLeaders?.(false)}
          maxWidth={760}
          className="spark-weekly-leaders-modal"
          showClose
          closeLabel="Close weekly leaders"
        >
          <div className="spark-weekly-leaders-modal-head">
            <div className="spark-weekly-leaders-modal-icon"><Icon name="trophy" size={24} /></div>
            <div>
              <h2>Weekly leaders</h2>
              <p>Balanced learning across the week, not just the highest marks.</p>
            </div>
          </div>

          <div className="spark-weekly-leaders-modal-grid">
            <section className="spark-weekly-leaders-panel" aria-label="Leaderboard">
              <div className="spark-weekly-leaders-panel-head">
                <div>
                  <span className="spark-weekly-leaders-kicker">THIS WEEK</span>
                  <h3>Top learners</h3>
                </div>
                <span className="spark-weekly-leaders-count">{leaders.length} active</span>
              </div>
              <div className="spark-weekly-leaders-columns" aria-hidden="true">
                <span>Rank</span><span>Learner</span><span>Days</span><span>Points</span>
              </div>
              <div className="spark-rewards-leaderboard">
                {leaders.length ? leaders.map((leader,index) => (
                  <div className={"spark-rewards-leader-row " + (leader.is_subject ? "is-subject" : "")} key={(leader.rank || index) + "-" + (leader.display_name || index)}>
                    <b>#{leader.rank}</b>
                    <span className="spark-rewards-leader-name">{leader.is_subject ? "You" : leader.display_name}</span>
                    <span>{safeNumber(leader.study_days)}d</span>
                    <strong>{safeNumber(leader.weekly_points)} pts</strong>
                  </div>
                )) : <p className="spark-rewards-empty">No students have earned weekly points yet.</p>}
              </div>
            </section>

            <section className="spark-weekly-score-panel" aria-label="Weekly score breakdown">
              <div className="spark-rewards-breakdown">
                <div className="spark-rewards-section-title"><strong>How the weekly score works</strong><span>Every category has a cap so one activity cannot dominate.</span></div>
                {breakdown.map(([label,points,max]) => (
                  <div className="spark-rewards-breakdown-row" key={label}>
                    <span>{label}</span>
                    <div aria-hidden="true"><i style={{width:Math.min(100,Math.round((points/max)*100)) + "%"}} /></div>
                    <b>{points}/{max}</b>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Modal>
      )}
    </>
  );
}
