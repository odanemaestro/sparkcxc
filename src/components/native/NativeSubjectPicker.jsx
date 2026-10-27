import React from "react";
import NativeBackButton from "./NativeBackButton";
import "./nativeSubjectPicker.css";

const subjectMarks = Object.freeze({
  mathematics: "M",
  physics: "P",
  chemistry: "C",
  "english-a": "EA",
  "integrated-science": "IS",
  "information-technology": "IT",
  "social-studies": "SS",
  "food-nutrition-and-health": "FN",
  "principles-of-business": "PB",
  "principles-of-accounts": "PA",
});

const headings = Object.freeze({
  study: "Study",
  practice: "Practice",
  flashcards: "Flashcards",
  progress: "Progress",
});

function Chevron() {
  return <svg className="spark-native-course-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m8 5 5 5-5 5" /></svg>;
}

export default function NativeSubjectPicker({
  subjects = [],
  capability = "study",
  title,
  onSelect,
  onBack,
  allOption = false,
  onSelectAll,
  embedded = false,
}) {
  const heading = headings[capability] || title || "Subjects";
  const count = subjects.length;
  return (
    <section className={`spark-native-course-picker${embedded ? " is-embedded" : ""}`} aria-label={heading}>
      <header className="spark-native-course-heading">
        {embedded && onBack && <NativeBackButton onClick={onBack} label="Back to previous screen"/>}
        <div className="spark-native-course-heading-copy">
          <h1>{heading}</h1>
          <span className="spark-native-course-count">{count} {count === 1 ? "subject" : "subjects"}</span>
        </div>
      </header>
      <div className="spark-native-course-list">
        {allOption && (
          <button type="button" className="spark-native-course-row" onClick={onSelectAll}>
            <span className="spark-native-course-mark is-all" aria-hidden="true">A</span>
            <span className="spark-native-course-title">All subjects</span>
            <Chevron />
          </button>
        )}
        {subjects.map(subject => (
          <button
            key={subject.id}
            type="button"
            className="spark-native-course-row"
            onClick={() => onSelect?.(subject)}
            aria-label={`Open ${subject.shortName || subject.name}`}
          >
            <span className="spark-native-course-mark" aria-hidden="true">
              {subjectMarks[subject.id] || String(subject.shortName || subject.name || "?").slice(0, 2).toUpperCase()}
            </span>
            <span className="spark-native-course-title">{subject.shortName || subject.name}</span>
            <Chevron />
          </button>
        ))}
        {!subjects.length && !allOption && (
          <p className="spark-native-course-empty">No subjects here yet.</p>
        )}
      </div>
    </section>
  );
}
