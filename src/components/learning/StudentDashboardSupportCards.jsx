import React, { useMemo } from "react";
import Icon from "../ui/Icon";
import { dashboardAchievementMeta } from "./dashboardAchievementMeta";
import { formatRelativeDay, listWithMore } from "../../learning/studentHomeModel";

function bookingDate(booking) {
  if (!booking?.session_date) return null;
  const time = String(booking.start_time || "12:00").slice(0, 5);
  const date = new Date(booking.session_date + "T" + time);
  return Number.isNaN(date.getTime()) ? null : date;
}

function sessionFromBookings(bookings = []) {
  const next = [...bookings]
    .map(booking => ({ booking, date:bookingDate(booking) }))
    .filter(item => item.date && item.date.getTime() >= Date.now())
    .sort((a,b) => a.date.getTime() - b.date.getTime())[0];
  if (!next) return null;
  return {
    id:next.booking.id,
    subject:next.booking.subject || "Tutoring session",
    tutorName:next.booking.tutors?.name || "",
    month:next.date.toLocaleDateString([], {month:"short"}),
    day:String(next.date.getDate()),
    dateLabel:next.date.toLocaleDateString([], {weekday:"short",day:"numeric",month:"short"}),
    timeLabel:next.date.toLocaleTimeString([], {hour:"numeric",minute:"2-digit"}),
    statusKey:next.booking.status === "confirmed" ? "confirmed" : "pending",
    statusLabel:next.booking.status === "confirmed" ? "Confirmed" : "Pending",
  };
}

export default function StudentDashboardSupportCards({
  flashcardSubjects = [],
  upcomingBookings = [],
  recentActivity = [],
  onOpenFlashcards,
  onOpenProgress,
  nextSession,
  upcomingCount,
  onOpenBookings,
  onFindTutor,
}) {
  const recentAchievements = useMemo(() => (recentActivity || []).slice(0, 3), [recentActivity]);
  const flashcardNames = flashcardSubjects.map(subject => subject.shortName || subject.name).filter(Boolean);
  const flashcardCopy = flashcardNames.length
    ? "Keep key ideas fresh in " + listWithMore(flashcardNames,3) + "."
    : "Flashcards will appear here when one of your enrolled subjects supports them.";
  const session = nextSession === undefined ? sessionFromBookings(upcomingBookings) : nextSession;
  const sessionTotal = Number.isFinite(Number(upcomingCount)) ? Number(upcomingCount) : (upcomingBookings || []).length;
  const moreSessions = session ? Math.max(0, sessionTotal - 1) : 0;

  return (
    <section className="ssh-card ssh-support" aria-label="Tutoring, flashcards and recent achievements">
      <div className="ssh-support-block" id="ssh-upcoming" tabIndex={-1} aria-labelledby="ssh-upcoming-title">
        <div className="ssh-support-head">
          <h2 id="ssh-upcoming-title" className="ssh-eyebrow">UPCOMING TUTORING</h2>
          {onOpenBookings && <button type="button" className="ssh-text-btn" onClick={onOpenBookings}><span>My bookings</span><Icon name="chevronRight" size={15}/></button>}
        </div>
        {session ? (
          <div className="ssh-session">
            <div className="ssh-date-tile" aria-hidden="true"><span>{session.month}</span><strong>{session.day}</strong></div>
            <div className="ssh-session-copy">
              <p className="ssh-session-title">{session.subject}</p>
              {session.tutorName && <p className="ssh-session-tutor">with {session.tutorName}</p>}
              <p className="ssh-session-time"><Icon name="clock" size={14}/><span>{session.dateLabel} · {session.timeLabel}</span></p>
              <p className={"ssh-status is-" + (session.statusKey === "confirmed" ? "track" : "pending")}>
                <span className="ssh-status-dot" aria-hidden="true" />
                <span>{session.statusLabel}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="ssh-support-empty">
            <p>No tutoring sessions booked.</p>
            {onFindTutor && <button type="button" className="ssh-btn ssh-btn--secondary ssh-btn--small" onClick={onFindTutor}><span>Find a tutor</span></button>}
          </div>
        )}
        {moreSessions > 0 && <p className="ssh-support-more">{moreSessions} more session{moreSessions === 1 ? "" : "s"} booked</p>}
      </div>

      <div className="ssh-support-block" aria-labelledby="ssh-flashcards-title">
        <div className="ssh-support-head"><h2 id="ssh-flashcards-title" className="ssh-eyebrow">FLASHCARDS</h2></div>
        <p className="ssh-support-copy">{flashcardCopy}</p>
        {onOpenFlashcards && (
          <button type="button" className="ssh-btn ssh-btn--secondary ssh-btn--small" onClick={onOpenFlashcards}>
            <Icon name="flashcards" size={16}/><span>Review flashcards</span>
          </button>
        )}
      </div>

      <div className="ssh-support-block" aria-labelledby="ssh-achievements-title">
        <div className="ssh-support-head">
          <h2 id="ssh-achievements-title" className="ssh-eyebrow">RECENT ACHIEVEMENTS</h2>
          {onOpenProgress && <button type="button" className="ssh-text-btn" onClick={onOpenProgress} aria-label="View all progress"><span>View all</span><Icon name="chevronRight" size={15}/></button>}
        </div>
        {recentAchievements.length ? (
          <ul className="ssh-activity">
            {recentAchievements.map(item => {
              const meta = dashboardAchievementMeta(item.title);
              return (
                <li key={item.id || item.subjectId + ":" + item.title + ":" + item.at}>
                  <span className="spark-achievement-svg ssh-activity-icon" aria-hidden="true"><Icon name={meta.icon} size={16}/></span>
                  <span className="ssh-activity-copy">
                    <span className="ssh-activity-title">{meta.title}{item.percent != null ? " · " + item.percent + "%" : ""}</span>
                    <span className="ssh-activity-meta">{item.subjectName}{item.at ? " · " + formatRelativeDay(item.at) : ""}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : <p className="ssh-support-copy">Your completed lessons, practice results and milestones will appear here.</p>}
      </div>
    </section>
  );
}
