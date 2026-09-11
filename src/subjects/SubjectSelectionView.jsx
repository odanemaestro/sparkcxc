import React from "react";
import Card from "../components/ui/Card";
import { T, FD, FB } from "../theme";
import "./subjectSelection.css";

function subjectMeta(subject, capability) {
  if (subject.id === "mathematics") {
    if (capability === "practice") return "Paper 1, Paper 2 and Adaptive Practice";
    if (capability === "flashcards") return "Spaced repetition across Mathematics topics";
    if (capability === "progress") return "Lessons, mastery and examination performance";
    const sections = subject.stats?.sections || 0;
    const topics = subject.stats?.topics || 0;
    return `${sections} sections · ${topics} topics`;
  }
  if (subject.id === "physics") {
    if (capability === "practice") return "Topic tests, structured practice and section checkpoints";
    if (capability === "flashcards") return `${subject.stats?.flashcards || 0} audited Physics flashcards`;
    if (capability === "progress") return "Lessons, topic practice, labs and section checkpoints";
    return `${subject.stats?.sections || 0} sections · ${subject.stats?.topics || 0} topics · ${subject.stats?.objectives || 0} objectives`;
  }
  return subject.description || "";
}

export default function SubjectSelectionView({
  eyebrow = "SPARK",
  title = "Choose a subject",
  description = "Select the subject you want to continue with.",
  subjects = [],
  capability = "study",
  onSelect,
  onBack,
  embedded = false,
  allOption = false,
  onSelectAll,
}) {
  return (
    <section className={`spark-subject-selection${embedded ? " embedded" : ""}`}>
      <div className="spark-subject-selection-inner">
        <header className="spark-subject-selection-header">
          <div>
            <div className="spark-subject-selection-eyebrow">{eyebrow}</div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {onBack && (
            <button type="button" className="spark-subject-selection-back" onClick={onBack}>
              Back
            </button>
          )}
        </header>

        <div className="spark-subject-selection-grid">
          {allOption && <Card className="spark-subject-selection-card" style={{ padding: 0, overflow: "hidden" }}>
            <button type="button" className="spark-subject-selection-card-button" onClick={() => onSelectAll?.()}>
              <div className="spark-subject-selection-mark" aria-hidden="true">◎</div>
              <div className="spark-subject-selection-copy">
                <span className="spark-subject-selection-status">Overview</span>
                <h2>All subjects</h2>
                <p>Review your learning activity across every subject you use in SPARK.</p>
                <div className="spark-subject-selection-action"><span>Open all progress</span><span aria-hidden="true">↗</span></div>
              </div>
            </button>
          </Card>}
          {subjects.map(subject => (
            <Card
              key={subject.id}
              className="spark-subject-selection-card"
              style={{ padding: 0, overflow: "hidden" }}
            >
              <button
                type="button"
                className="spark-subject-selection-card-button"
                onClick={() => onSelect?.(subject)}
              >
                <div className={`spark-subject-selection-mark ${subject.id}`} aria-hidden="true">
                  {subject.mark || subject.shortName?.slice(0, 1) || "•"}
                </div>
                <div className="spark-subject-selection-copy">
                  <span className="spark-subject-selection-status">Available</span>
                  <h2>{subject.name}</h2>
                  <p>{subjectMeta(subject, capability)}</p>
                  <div className="spark-subject-selection-action">
                    <span>Open {subject.shortName}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SubjectChangeButton({ onClick, children = "Change subject" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 42,
        padding: "0 14px",
        borderRadius: 10,
        border: `1px solid ${T.border}`,
        background: T.paper,
        color: T.ink,
        fontFamily: FB,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      ← {children}
    </button>
  );
}

export const subjectSelectionFonts = { FD, FB };
