import React, { useEffect, useState } from "react";
import AdaptivePractice from "../adaptive/AdaptivePractice";
import Paper1Exam from "./Paper1Exam";
import Paper2Exam from "./Paper2Exam";
import { syncLocalPracticeResults } from "./persistence";
import "./practiceExam.css";

const PAPER1_ACTIVE_KEY = "spark-paper1-active-v1";
const PAPER1_RESULTS_KEY = "spark-paper1-results-v1";
const PAPER2_ACTIVE_KEY = "spark-paper2-active-v2";
const PAPER2_RESULTS_KEY = "spark-paper2-results-v2";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export default function PracticeHub({ supabase, userId, setView }) {
  const [mode, setMode] = useState("home");
  const [examIntent, setExamIntent] = useState("resume");

  const paper1Active = readJson(PAPER1_ACTIVE_KEY, null);
  const paper1Results = readJson(PAPER1_RESULTS_KEY, []);
  const paper1Latest = paper1Results[0];
  const paper2Active = readJson(PAPER2_ACTIVE_KEY, null);
  const paper2Results = readJson(PAPER2_RESULTS_KEY, []);
  const paper2Latest = paper2Results[0];

  useEffect(() => {
    if (!supabase || !userId) return;
    const storedPaper1Results = readJson(PAPER1_RESULTS_KEY, []);
    const storedPaper2Results = readJson(PAPER2_RESULTS_KEY, []);
    syncLocalPracticeResults({ supabase, userId, paper1Results: storedPaper1Results, paper2Results: storedPaper2Results }).catch(() => {});
  }, [supabase, userId]);

  if (mode === "adaptive") {
    return <AdaptivePractice supabase={supabase} userId={userId} setView={() => setMode("home")} backLabel="← Back to Practice" />;
  }

  if (mode === "paper1") {
    return <Paper1Exam onExit={() => setMode("home")} startFresh={examIntent === "new"} supabase={supabase} userId={userId} />;
  }

  if (mode === "paper2") {
    return <Paper2Exam onExit={() => setMode("home")} startFresh={examIntent === "new"} supabase={supabase} userId={userId} />;
  }

  return (
    <main className="practice-hub">
      <section className="practice-hero">
        <div>
          <div className="practice-eyebrow">CSEC Mathematics practice</div>
          <h1>Practise under examination conditions.</h1>
          <p>Select a full Paper 1 or Paper 2 examination, or practise a selected topic.</p>
        </div>
        <button className="practice-back" type="button" onClick={() => setView?.("dashboard")}>Back to dashboard</button>
      </section>

      <section className="practice-mode-grid practice-mode-grid-three">
        <article className="practice-mode-card paper-mode-card">
          <div className="practice-mode-icon" aria-hidden="true">60</div>
          <div className="practice-mode-label">Paper 1 examination</div>
          <h2>Paper 1 Simulator</h2>
          <p>Answer 60 multiple-choice questions in 1 hour 30 minutes. Questions are selected to reflect the topic coverage and question types used in CSEC Mathematics Paper 01.</p>
          <div className="practice-specs">
            <span>60 questions</span><span>90 minutes</span><span>60 marks</span><span>Multiple choice</span>
          </div>
          <div className="practice-card-actions">
            {paper1Active?.questionIds?.length === 60 && <button type="button" className="practice-primary" onClick={() => { setExamIntent("resume"); setMode("paper1"); }}>Resume paper</button>}
            <button type="button" className={paper1Active?.questionIds?.length === 60 ? "practice-secondary" : "practice-primary"} onClick={() => { setExamIntent("new"); setMode("paper1"); }}>Start new paper</button>
          </div>
        </article>

        <article className="practice-mode-card paper2-mode-card">
          <div className="practice-mode-icon paper2-mode-icon" aria-hidden="true">02</div>
          <div className="practice-mode-label">Paper 2 examination</div>
          <h2>Paper 2 Simulator</h2>
          <p>Answer 10 compulsory structured questions in 2 hours 40 minutes. The paper follows the Section I and Section II mark allocation used in CSEC Mathematics Paper 02. Answers are marked when the paper is submitted.</p>
          <div className="practice-specs">
            <span>10 questions</span><span>160 minutes</span><span>100 marks</span><span>Auto-graded</span>
          </div>
          <div className="practice-card-actions">
            {paper2Active?.exam?.questions?.length === 10 && <button type="button" className="practice-primary" onClick={() => { setExamIntent("resume"); setMode("paper2"); }}>Resume paper</button>}
            <button type="button" className={paper2Active?.exam?.questions?.length === 10 ? "practice-secondary" : "practice-primary"} onClick={() => { setExamIntent("new"); setMode("paper2"); }}>Start new paper</button>
          </div>
        </article>

        <article className="practice-mode-card adaptive-mode-card">
          <div className="practice-mode-icon adaptive-icon" aria-hidden="true">◎</div>
          <div className="practice-mode-label">Topic practice</div>
          <h2>Adaptive Practice</h2>
          <p>Select a topic and answer questions based on your recent performance.</p>
          <div className="practice-specs">
            <span>Topic focused</span><span>Worked solutions</span><span>Immediate feedback</span>
          </div>
          <div className="practice-card-actions"><button type="button" className="practice-secondary" onClick={() => setMode("adaptive")}>Open adaptive practice</button></div>
        </article>
      </section>

      <section className="practice-integrity-card">
        <div>
          <div className="practice-mode-label">Question selection</div>
          <h2>No question is repeated within the same paper.</h2>
          <p>Paper 1 excludes duplicate and equivalent question variants. Paper 2 selects one question for each examination position and gives priority to questions not used in your recent attempts.</p>
        </div>
        <div className="practice-integrity-stats practice-integrity-stats-four">
          <div><strong>1,675</strong><span>Paper 1 records</span></div>
          <div><strong>60</strong><span>Paper 2 questions</span></div>
          <div><strong>10</strong><span>Paper 2 positions</span></div>
          <div><strong>100</strong><span>Paper 2 marks</span></div>
        </div>
      </section>

      {(paper1Latest || paper2Latest) && (
        <section className="practice-results-grid">
          {paper1Latest && <div className="practice-last-result"><div><span>Latest Paper 1</span><strong>{paper1Latest.score}/60</strong></div><div><span>Percentage</span><strong>{paper1Latest.percent}%</strong></div><div><span>Completed</span><strong>{new Date(paper1Latest.completedAt).toLocaleDateString()}</strong></div></div>}
          {paper2Latest && <div className="practice-last-result"><div><span>Latest Paper 2</span><strong>{paper2Latest.score}/100</strong></div><div><span>Percentage</span><strong>{paper2Latest.percent}%</strong></div><div><span>Completed</span><strong>{new Date(paper2Latest.completedAt).toLocaleDateString()}</strong></div></div>}
        </section>
      )}
    </main>
  );
}
