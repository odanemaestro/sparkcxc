import React from "react";
import NativeBackButton from "./NativeBackButton";
import { readRecentSubject, rememberRecentSubject } from "./recentSubject";
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

function SubjectRow({ subject, onSelect, recent = false }) {
  const name = subject.shortName || subject.name;
  return (
    <button type="button" className={`spark-native-course-row${recent ? " is-recent" : ""}`}
      onClick={() => onSelect(subject)} aria-label={`Open ${name}`}>
      <span className="spark-native-course-mark" aria-hidden="true">
        {subjectMarks[subject.id] || String(name || "?").slice(0, 2).toUpperCase()}
      </span>
      <span className="spark-native-course-title">{name}</span>
      <Chevron />
    </button>
  );
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
  userId,
}) {
  const heading = headings[capability] || title || "Subjects";
  const count = subjects.length;
  // Look up only in the live, enrolled list. Never resurrect removed subjects.
  const recent = readRecentSubject({ userId, capability, subjects });
  const remaining = recent ? subjects.filter(subject => subject.id !== recent.id) : subjects;
  const selectSubject = subject => {
    rememberRecentSubject({ userId, capability, subjectId: subject.id });
    onSelect?.(subject);
  };

  return (
    <section className={`spark-native-course-picker${embedded ? " is-embedded" : ""}`} aria-label={heading}>
      <header className="spark-native-course-heading">
        {embedded && onBack && <NativeBackButton onClick={onBack} label="Back to previous screen"/>}
        <div className="spark-native-course-heading-copy">
          <h1>{heading}</h1>
          <span className="spark-native-course-count">{count} {count === 1 ? "subject" : "subjects"}</span>
        </div>
      </header>

      {recent && count > 1 && (
        <div className="spark-native-course-recent">
          <h2>Recently opened</h2>
          <div className="spark-native-course-list">
            <SubjectRow subject={recent} onSelect={selectSubject} recent />
          </div>
        </div>
      )}

      <div className="spark-native-course-list" role="group" aria-label={recent && count > 1 ? "Other subjects" : "Subjects"}>
        {allOption && (
          <button type="button" className="spark-native-course-row" onClick={onSelectAll}>
            <span className="spark-native-course-mark is-all" aria-hidden="true">A</span>
            <span className="spark-native-course-title">All subjects</span>
            <Chevron />
          </button>
        )}
        {(recent && count > 1 ? remaining : subjects).map(subject => (
          <SubjectRow key={subject.id} subject={subject} onSelect={selectSubject} />
        ))}
        {!subjects.length && !allOption && <p className="spark-native-course-empty">No subjects here yet.</p>}
      </div>
    </section>
  );
}
