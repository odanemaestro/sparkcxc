import React, { useId, useMemo } from "react";
import { rewardLevelForPoints, weeklyAchievementBadges, weeklyScoreBreakdown } from "../../rewards/sparkRewards";
import useSparkRewardsDashboard from "../../rewards/useSparkRewardsDashboard";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";

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
  rewards = null,
  variant = "full",
  id,
}) {
  const ownRewards = useSparkRewardsDashboard({
    supabase,
    viewerUserId,
    subjectUserId,
    enabled: !rewards,
  });
  const state = rewards || ownRewards;
  const { data, loading, error, savingPreference, setLeaderboardVisible, showLeaders, setShowLeaders } = state;

  const winner = data?.winner || null;
  const subject = data?.subject || null;
  const leaders = Array.isArray(data?.leaders) ? data.leaders : [];
  const level = useMemo(() => rewardLevelForPoints(subject?.lifetime_points), [subject?.lifetime_points]);
  const badges = useMemo(() => weeklyAchievementBadges(subject || {}), [subject]);
  const breakdown = useMemo(() => weeklyScoreBreakdown(subject || {}), [subject]);
  const canChangePrivacy = viewerRole === "student" && subjectUserId && String(subjectUserId) === String(viewerUserId);
  const headingId = useId().replace(/:/g, "") + "-rewards-title";

  const updatePrivacy = async () => {
    if (!canChangePrivacy || savingPreference) return;
    await setLeaderboardVisible(!Boolean(data?.preferences?.leaderboard_visible));
  };

  const subjectLabel = viewerRole === "parent" && subjectName ? subjectName + "'s week" : "Your week";

  const levelBlock = (
    <div className="spark-rewards-level-block">
      <span>Level {level.level}</span>
      <strong>{level.name}</strong>
      <div className="spark-rewards-level-track" role="img" aria-label={level.progressPercent + "% progress to next level"}>
        <i style={{width:level.progressPercent + "%"}} />
      </div>
      <small>{level.points} lifetime SPARK Points · {level.next ? level.pointsToNext + " points to " + level.next.name : "Highest SPARK level reached"}</small>
    </div>
  );

  const badgeList = badges.length > 0 && (
    <div className="spark-rewards-badges" aria-label="Weekly achievements">
      {badges.map(badge => <span key={badge.key}><Icon name={badge.icon} size={18}/><b>{badge.label}</b></span>)}
    </div>
  );

  const privacyToggle = canChangePrivacy && (
    <button type="button" className="spark-rewards-privacy" onClick={updatePrivacy} disabled={savingPreference} aria-pressed={Boolean(data?.preferences?.leaderboard_visible)}>
      <span className={"spark-rewards-switch " + (data?.preferences?.leaderboard_visible ? "is-on" : "")} aria-hidden="true"><i /></span>
      <span>
        <strong>{data?.preferences?.leaderboard_visible ? "Name visible on leaderboard" : "Leaderboard name hidden"}</strong>
        <small>{data?.preferences?.leaderboard_visible ? "Others see your first name and last initial." : "If you place, others see Anonymous SPARK."}</small>
      </span>
    </button>
  );

  const leaderboard = (
    <div className="spark-rewards-leaderboard">
      {leaders.length ? leaders.map((leader,index) => (
        <div className={"spark-rewards-leader-row " + (leader.is_subject ? "is-subject" : "")} key={(leader.rank || index) + "-" + (leader.display_name || index)}>
          <b>#{leader.rank}</b>
          <span className="spark-rewards-leader-name">
            {leader.is_subject
              ? (viewerRole === "student" ? "You" : viewerRole === "parent" ? (subjectName || "Your student") : leader.display_name)
              : leader.display_name}
          </span>
          <span>{safeNumber(leader.study_days)}d</span>
          <strong>{safeNumber(leader.weekly_points)} pts</strong>
        </div>
      )) : <p className="spark-rewards-empty">No students have earned weekly points yet.</p>}
    </div>
  );

  const breakdownBlock = subject && (
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
  );

  const leadersModal = !error && showLeaders && (
    <Modal
      onClose={() => setShowLeaders(false)}
      maxWidth={760}
      className="spark-weekly-leaders-modal"
      showClose
      closeLabel="Close weekly leaders"
    >
      <div className="spark-weekly-leaders-modal-head">
        <div className="spark-weekly-leaders-modal-icon"><TrophyIcon /></div>
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
          {leaderboard}
        </section>
        <section className="spark-weekly-score-panel" aria-label="Weekly score breakdown">
          {breakdownBlock}
        </section>
      </div>
    </Modal>
  );

  if (variant === "details") {
    return (
      <>
        <section className="spark-rewards-card spark-rewards-card--details" aria-labelledby={headingId} id={id}>
          <div className="spark-rewards-details-head">
            <div>
              <h2 id={headingId}>SPARK Rewards</h2>
              <p>Your level, this week's badges and how weekly points are earned.</p>
            </div>
            <button type="button" className="spark-rewards-leaders-button" onClick={() => setShowLeaders(true)} disabled={loading || !!error}>
              View weekly leaders
            </button>
          </div>

          {error && <div className="spark-rewards-setup-note">SPARK Rewards will appear here once they are switched on.</div>}
          {!error && loading && <p className="spark-rewards-details-loading" role="status">Loading your rewards…</p>}
          {!error && !loading && subject && (
            <div className="spark-rewards-details-body">
              <div className="spark-rewards-details-progress">
                {levelBlock}
                <div className="spark-rewards-details-badges">
                  <span className="spark-rewards-details-label">This week's badges</span>
                  {badgeList || <p className="spark-rewards-empty">Complete learning activities to earn this week's first badge.</p>}
                </div>
                {privacyToggle}
              </div>
              {breakdownBlock}
            </div>
          )}
        </section>
        {leadersModal}
      </>
    );
  }

  return (
    <>
      <section className="spark-rewards-card" aria-label="SPARK Rewards" id={id}>
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
                  {safeNumber(winner.skills_improved) > 0 ? " · " + safeNumber(winner.skills_improved) + " skill" + (safeNumber(winner.skills_improved) === 1 ? "" : "s") + " improved" : ""}
                  {" · " + safeNumber(winner.weekly_points) + " weekly points"}
                </span>
              </>
            ) : (
              <>
                <strong>No weekly leader yet</strong>
                <span>Study activity this week will determine the first SPARK.</span>
              </>
            )}
          </div>
          <button type="button" className="spark-rewards-leaders-button" onClick={() => setShowLeaders(true)} disabled={loading || !!error}>
            View weekly leaders
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
                  {safeNumber(subject.rank) > 0 ? "#" + safeNumber(subject.rank) + " of " + safeNumber(subject.total_participants) + " active learners" : "Not ranked yet this week · Complete a learning activity to join"}
                </span>
              </div>
              {levelBlock}
            </div>
            {badgeList}
            {privacyToggle}
          </div>
        )}
      </section>
      {leadersModal}
    </>
  );
}
