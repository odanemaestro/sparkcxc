import React, { useMemo, useState } from "react";
import InformationTechnologyPaper1Exam from "./InformationTechnologyPaper1Exam";
import InformationTechnologyPaper2Exam from "./InformationTechnologyPaper2Exam";
import "./informationTechnologyPractice.css";

const P1_ACTIVE_KEYS = ["spark-it-paper1-active-v3", "spark-it-paper1-active-v2", "spark-it-paper1-active-v1"];
const P1_RESULTS = "spark-it-paper1-results-v1";
const P2_ACTIVE_KEYS = ["spark-it-paper2-active-v2", "spark-it-paper2-active-v1"];
const P2_RESULTS = "spark-it-paper2-results-v1";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readFirst(keys) {
  for (const key of keys) {
    const value = readJson(key, null);
    if (value) return value;
  }
  return null;
}

export default function InformationTechnologyPracticeHub({ onBack }) {
  const [mode, setMode] = useState("home");
  const [fresh, setFresh] = useState(false);
  const snapshot = useMemo(() => ({
    p1Active: readFirst(P1_ACTIVE_KEYS),
    p1Latest: readJson(P1_RESULTS, [])[0],
    p2Active: readFirst(P2_ACTIVE_KEYS),
    p2Latest: readJson(P2_RESULTS, [])[0],
  }), [mode]);

  if (mode === "paper1") return <InformationTechnologyPaper1Exam startFresh={fresh} onExit={() => setMode("home")}/>;
  if (mode === "paper2") return <InformationTechnologyPaper2Exam startFresh={fresh} onExit={() => setMode("home")}/>;

  return (
    <main className="it-practice-hub">
      <section className="it-practice-hero">
        <div>
          <div className="it-practice-eyebrow">CSEC Information Technology practice</div>
          <h1>Practise under examination conditions.</h1>
          <p>SPARK includes nine complete Paper 01 simulations and nine complete Paper 02 simulations, with original questions modelled on the current CSEC format, language and syllabus coverage.</p>
        </div>
        <button className="it-practice-back" type="button" onClick={onBack}>← Change subject</button>
      </section>

      <section className="it-practice-mode-grid">
        <article className="it-practice-mode-card">
          <div className="it-practice-mode-icon">PAPER 01</div>
          <div className="it-practice-label">Multiple-choice examination</div>
          <h2>Paper 1 Simulator</h2>
          <p>Answer 60 multiple-choice questions in 1 hour 15 minutes. Every paper follows the required 35 / 15 / 10 section distribution and includes a mixture of text, tables, diagrams, spreadsheets, databases, flowcharts and code where appropriate.</p>
          <div className="it-practice-specs">9 full papers <span>·</span> 540 questions <span>·</span> 75 minutes</div>
          <div className="it-practice-actions">
            {snapshot.p1Active?.paperId && <button className="it-practice-primary" type="button" onClick={() => { setFresh(false); setMode("paper1"); }}>Resume paper</button>}
            <button className={snapshot.p1Active?.paperId ? "it-practice-secondary" : "it-practice-primary"} type="button" onClick={() => { setFresh(true); setMode("paper1"); }}>{snapshot.p1Active?.paperId ? "New paper instructions" : "View instructions"}</button>
          </div>
        </article>

        <article className="it-practice-mode-card">
          <div className="it-practice-mode-icon">PAPER 02</div>
          <div className="it-practice-label">Structured examination</div>
          <h2>Paper 2 Simulator</h2>
          <p>Answer four compulsory structured questions in 2 hours. Questions use realistic scenarios, worksheet extracts, database structures, network diagrams, algorithms and other stimulus material, followed by guided marking.</p>
          <div className="it-practice-specs">9 full papers <span>·</span> 36 structured questions <span>·</span> 90 marks</div>
          <div className="it-practice-actions">
            {snapshot.p2Active?.paperId && <button className="it-practice-primary" type="button" onClick={() => { setFresh(false); setMode("paper2"); }}>Resume paper</button>}
            <button className={snapshot.p2Active?.paperId ? "it-practice-secondary" : "it-practice-primary"} type="button" onClick={() => { setFresh(true); setMode("paper2"); }}>{snapshot.p2Active?.paperId ? "New paper instructions" : "View instructions"}</button>
          </div>
        </article>
      </section>

      <section className="it-practice-integrity">
        <div>
          <div className="it-practice-label">Exam blueprint</div>
          <h2>Built around the current CSEC Information Technology structure.</h2>
          <p>Paper 01 uses 35 items from Sections 1 to 3, 15 from Sections 4 to 6 and 10 from Sections 7 to 8. Paper 02 uses four compulsory questions and preserves the 35 Theory, 30 Productivity Tools and 25 Problem-Solving and Programming mark allocation.</p>
        </div>
        <div className="it-practice-stats">
          <div><strong>540</strong><span>Paper 1 MCQs</span></div>
          <div><strong>36</strong><span>Paper 2 questions</span></div>
          <div><strong>18</strong><span>full simulations</span></div>
        </div>
      </section>

      {(snapshot.p1Latest || snapshot.p2Latest) && (
        <section className="it-practice-results">
          {snapshot.p1Latest && <div><span>Latest Paper 1</span><strong>{snapshot.p1Latest.score}/60</strong><small>{snapshot.p1Latest.percent}%</small></div>}
          {snapshot.p2Latest && <div><span>Latest Paper 2</span><strong>{snapshot.p2Latest.score}/90</strong><small>{snapshot.p2Latest.percent}%</small></div>}
        </section>
      )}
    </main>
  );
}
