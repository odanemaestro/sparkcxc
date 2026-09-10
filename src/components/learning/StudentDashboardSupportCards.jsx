import React, { useMemo } from "react";
import Card from "../ui/Card";
import Icon from "../ui/Icon";

function DashboardCardAction({ label, onClick }) {
  if (!onClick) return null;
  return (
    <button type="button" className="spark-dashboard-card-action" onClick={onClick}>
      <span>{label}</span>
      <span className="spark-dashboard-card-action-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg>
      </span>
    </button>
  );
}

function bookingDate(booking) {
  if (!booking?.session_date) return null;
  const time = String(booking.start_time || "12:00").slice(0, 5);
  const date = new Date(`${booking.session_date}T${time}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatUpcoming(bookings = []) {
  const next = [...bookings]
    .map(booking => ({ booking, date: bookingDate(booking) }))
    .filter(item => item.date && item.date.getTime() >= Date.now())
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  if (!next) return "No upcoming tutor session";
  return next.date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function weekActivityCount(recentActivity = []) {
  const threshold = Date.now() - (7 * 24 * 60 * 60 * 1000);
  return recentActivity.filter(item => {
    const date = new Date(item?.at || "");
    return !Number.isNaN(date.getTime()) && date.getTime() >= threshold;
  }).length;
}

export default function StudentDashboardSupportCards({
  flashcardSubjects = [],
  upcomingBookings = [],
  recentActivity = [],
  onOpenFlashcards,
  onOpenProgress,
}) {
  const recentAchievements = useMemo(() => (recentActivity || []).slice(0, 3), [recentActivity]);
  const weeklyCount = weekActivityCount(recentActivity);
  const flashcardNames = flashcardSubjects.map(subject => subject.shortName || subject.name).filter(Boolean);
  const flashcardCopy = flashcardNames.length > 1
    ? `Review flashcards across ${flashcardNames.slice(0, -1).join(", ")} and ${flashcardNames[flashcardNames.length - 1]}.`
    : flashcardNames.length === 1
      ? `Review ${flashcardNames[0]} flashcards and keep key ideas fresh.`
      : "Flashcards will appear here when one of your enrolled subjects supports them.";

  return (
    <div className="spark-dashboard-support-grid">
      <Card className="spark-flashcard-overview-card">
        <div className="spark-card-title-with-icon">
          <span className="spark-feature-icon compact"><Icon name="flashcards" size={19}/></span>
          <div><span className="section-kicker">FLASHCARDS</span><h3>Quick review</h3></div>
        </div>
        <p>{flashcardCopy}</p>
        <DashboardCardAction label="Open flashcards" onClick={onOpenFlashcards} />
      </Card>

      <Card className="spark-upcoming-card">
        <div className="spark-card-title-with-icon">
          <span className="spark-feature-icon compact"><Icon name="calendar" size={19}/></span>
          <div><span className="section-kicker">UPCOMING</span><h3>What’s next</h3></div>
        </div>
        <div className="spark-upcoming-line"><span>Next tutor session</span><strong>{formatUpcoming(upcomingBookings)}</strong></div>
        <div className="spark-upcoming-line"><span>Recent momentum</span><strong>{weeklyCount} learning activit{weeklyCount === 1 ? "y" : "ies"} in the last 7 days</strong></div>
      </Card>

      <Card className="spark-achievement-card">
        <div className="spark-card-heading-row">
          <div><span className="section-kicker">RECENT ACHIEVEMENTS</span><h3>Momentum</h3></div>
          <DashboardCardAction label="View progress" onClick={onOpenProgress} />
        </div>
        {recentAchievements.length ? (
          <div className="spark-achievement-list">
            {recentAchievements.map(item => (
              <div key={item.id || `${item.subjectId}:${item.title}:${item.at}`}>
                <Icon name="spark" size={15}/>
                <span><strong>{item.subjectName}</strong> · {item.title}{item.percent != null ? ` · ${item.percent}%` : ""}</span>
              </div>
            ))}
          </div>
        ) : <p className="spark-muted">Your completed lessons, practice results and milestones will appear here.</p>}
      </Card>
    </div>
  );
}
