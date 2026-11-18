import React, { useEffect, useRef, useState } from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";
import "./studentSubjectEnrollment.css";
import { readSparkHashRoute, subscribeSparkRoute } from "../../routing/sparkRoutingV270";

function announcedSubjectId(route) {
  return route.path === "/dashboard/subjects"
    ? String(route.params.get("subject") || "").trim().toLowerCase()
    : "";
}

function subjectStats(subject) {
  const stats = subject?.stats || {};
  const parts = [];
  if (Number(stats.sections || 0) > 0) parts.push(`${Number(stats.sections)} section${Number(stats.sections) === 1 ? "" : "s"}`);
  if (Number(stats.topics || 0) > 0) parts.push(`${Number(stats.topics)} topics`);
  if (Number(stats.objectives || 0) > 0) parts.push(`${Number(stats.objectives)} objectives`);
  return parts.join(" · ");
}

export default function StudentSubjectEnrollment({
  subjects = [],
  enrolledSubjectIds = [],
  busySubjectId = "",
  enrollmentAvailable = true,
  onToggle,
  onOpenSubject,
}) {
  const [announcedId, setAnnouncedId] = useState(() => announcedSubjectId(readSparkHashRoute()));
  const announcedCard = useRef(null);
  const announcedSubject = subjects.find(subject => String(subject.id).toLowerCase() === announcedId);
  const enrolled = new Set((enrolledSubjectIds || []).map(id => String(id || "").toLowerCase()));
  const enrolledCount = subjects.filter(subject => enrolled.has(String(subject.id || "").toLowerCase())).length;

  useEffect(() => subscribeSparkRoute(route => setAnnouncedId(announcedSubjectId(route))), []);

  useEffect(() => {
    const card = announcedCard.current;
    if (!card) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    card.scrollIntoView?.({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    card.focus({ preventScroll: true });
  }, [announcedSubject?.id]);

  return (
    <div className="spark-subject-enrollment">
      <div className="spark-subject-enrollment-intro">
        <div>
          <span className="section-kicker">MY SUBJECTS</span>
          <h1>Choose what you want to study</h1>
          <p>Your dashboard, progress, flashcards and reports are built from the subjects you enroll in. You can change your subjects later without losing completed work.</p>
        </div>
        <span className="spark-subject-enrollment-count">{enrolledCount} enrolled</span>
      </div>

      {!enrollmentAvailable && (
        <Card className="spark-subject-enrollment-note">
          <Icon name="insight" size={18}/>
          <div><strong>Subject enrollment is waiting for the latest SPARK database update.</strong><span>Your existing learning remains visible until that update is applied.</span></div>
        </Card>
      )}

      <div className="spark-subject-enrollment-grid">
        {subjects.map(subject => {
          const id = String(subject.id || "").toLowerCase();
          const isEnrolled = enrolled.has(id);
          const busy = busySubjectId === id;
          const isAnnounced = id === announcedId;
          return (
            <Card
              key={subject.id}
              ref={isAnnounced ? announcedCard : null}
              tabIndex={isAnnounced ? -1 : undefined}
              data-subject-id={id}
              className={`spark-subject-enrollment-card ${isEnrolled ? "enrolled" : "available"}${isAnnounced ? " is-announced" : ""}`}
            >
              <div className="spark-subject-enrollment-card-head">
                <div className={`spark-subject-overview-mark ${subject.id}`} aria-hidden="true">{subject.mark || subject.shortName?.slice(0, 1) || "•"}</div>
                <div><h2>{subject.name}</h2><span>{subjectStats(subject) || "CSEC course"}</span></div>
                <Badge c={isEnrolled ? "teal" : "slate"}>{isEnrolled ? "Enrolled" : "Available"}</Badge>
              </div>
              <p>{subject.description}</p>
              <div className="spark-subject-enrollment-actions">
                {isEnrolled && onOpenSubject && (
                  subject.capabilities?.study !== false || subject.routes?.study || subject.implementation === "generic"
                ) && (
                  <button type="button" className="spark-dashboard-card-action" onClick={() => onOpenSubject(subject)}>
                    <span>Open subject</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
                  </button>
                )}
                <button
                  type="button"
                  className={`spark-subject-enrollment-toggle ${isEnrolled ? "leave" : "join"}`}
                  disabled={busy || !enrollmentAvailable}
                  onClick={() => onToggle?.(subject, !isEnrolled)}
                >
                  {busy ? "Saving…" : isEnrolled ? "Leave subject" : "Enroll"}
                </button>
              </div>
              {isEnrolled && <small className="spark-subject-enrollment-preserve">Leaving removes the subject from your dashboard. Your saved progress is kept.</small>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
