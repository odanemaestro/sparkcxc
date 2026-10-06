import React, { useId } from "react";
import Icon from "../ui/Icon";

function safeNumber(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

export default function SparkOfTheWeekSpotlight({ rewards, onOpenLeaderboard }) {
  const titleId = useId().replace(/:/g, "") + "-spotlight";
  const { data, loading, error } = rewards || {};
  const winner = data?.winner || null;
  const subject = data?.subject || null;
  const youLead = Boolean(winner?.is_subject);
  const weeklyPoints = Math.max(0, Math.min(100, Math.round(safeNumber(subject?.weekly_points))));
  const rank = safeNumber(subject?.rank);
  const participants = safeNumber(subject?.total_participants || data?.total_participants);
  const studyDays = safeNumber(winner?.study_days);
  const skillsImproved = safeNumber(winner?.skills_improved);

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

  return (
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

      {!loading && !error && (
        <div className="ssh-spotlight-you">
          {subject && (
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
          )}
          {onOpenLeaderboard && (
            <button type="button" className="ssh-text-btn ssh-spotlight-link" onClick={onOpenLeaderboard}>
              <span>Leaderboard and badges</span>
              <Icon name="arrowRight" size={16} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
