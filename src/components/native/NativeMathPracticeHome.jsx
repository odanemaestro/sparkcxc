import React from "react";
import "./nativeMathPracticeHome.css";

const paperOneReady = active => active?.questionIds?.length === 60;
const paperTwoReady = active => active?.exam?.questions?.length === 10;

function ArrowLeft() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ExamRow({ type, title, detail, active, onResume, onStart }) {
  return (
    <article className="spark-native-exam-row" aria-label={title}>
      <div className="spark-native-exam-row-main">
        <span className="spark-native-exam-monogram" aria-hidden="true">{type}</span>
        <div>
          <h3>{title}</h3>
          <p>{detail}</p>
        </div>
      </div>
      <div className="spark-native-exam-actions">
        {active && (
          <button type="button" className="spark-native-exam-primary" onClick={onResume}>
            Resume
          </button>
        )}
        <button type="button" className={active ? "spark-native-exam-secondary" : "spark-native-exam-primary"} onClick={onStart}>
          {active ? "Start new" : "Start paper"}
        </button>
      </div>
    </article>
  );
}

function CompactAction({ title, detail, onClick }) {
  return (
    <button type="button" className="spark-native-practice-action" onClick={onClick}>
      <span>
        <strong>{title}</strong>
        <small>{detail}</small>
      </span>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  );
}

function ResultRow({ label, result, total }) {
  if (!result) return null;
  const score = Number.isFinite(result.score) ? `${result.score}/${total}` : null;
  const percentage = Number.isFinite(result.percent) ? `${result.percent}%` : score;
  return (
    <div className="spark-native-practice-result">
      <span>{label}</span>
      <strong>{percentage || "Completed"}</strong>
    </div>
  );
}

/** Native-only Mathematics launcher. Exams and grading remain in PracticeHub. */
export default function NativeMathPracticeHome({
  paper1Active,
  paper2Active,
  paper1Latest,
  paper2Latest,
  onBack,
  onPaper1,
  onPaper2,
  onAdaptive,
  on2027,
}) {
  return (
    <main className="spark-native-math-practice">
      <header className="spark-native-math-heading">
        <button type="button" className="spark-native-math-back" onClick={onBack}>
          <ArrowLeft />
          <span>Subjects</span>
        </button>
        <h1>Mathematics</h1>
        <p>Practice</p>
      </header>
      <section className="spark-native-practice-section" aria-labelledby="spark-native-full-papers">
        <h2 id="spark-native-full-papers">Full papers</h2>
        <div className="spark-native-exam-list">
          <ExamRow type="1" title="Paper 1" detail="60 questions · 90 min" active={paperOneReady(paper1Active)}
            onResume={() => onPaper1("resume")} onStart={() => onPaper1("new")} />
          <ExamRow type="2" title="Paper 2" detail="10 questions · 160 min" active={paperTwoReady(paper2Active)}
            onResume={() => onPaper2("resume")} onStart={() => onPaper2("new")} />
        </div>
      </section>
      <section className="spark-native-practice-section" aria-labelledby="spark-native-other-practice">
        <h2 id="spark-native-other-practice">More practice</h2>
        <div className="spark-native-practice-links">
          <CompactAction title="Adaptive practice" detail="Practise a topic" onClick={onAdaptive}/>
          <CompactAction title="2027 syllabus" detail="Updated examination format" onClick={on2027}/>
        </div>
      </section>
      {(paper1Latest || paper2Latest) && (
        <section className="spark-native-practice-section" aria-label="Recent results">
          <h2>Recent results</h2>
          <div className="spark-native-practice-results">
            <ResultRow label="Paper 1" result={paper1Latest} total={60}/>
            <ResultRow label="Paper 2" result={paper2Latest} total={100}/>
          </div>
        </section>
      )}
      <details className="spark-native-practice-details">
        <summary>About these exams</summary>
        <p>Paper 1 contains 60 multiple-choice questions worth 60 marks. Paper 2 contains 10 compulsory structured questions worth 100 marks. Your answers are marked after submission.</p>
        <p>Questions are selected to reduce repeats within a paper. Exam timers continue while the attempt is active.</p>
      </details>
    </main>
  );
}
