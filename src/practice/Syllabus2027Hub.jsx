import React, { useState } from "react";
import Paper2027ModuleExam from "./Paper2027ModuleExam";
import {
  CSEC_2027_MODULE1_PAPERS,
  CSEC_2027_RESULTS_KEY,
  csec2027ActiveKey,
} from "./csec2027Data";
import "./practiceExam.css";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export default function Syllabus2027Hub({ onExit }) {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [startFresh, setStartFresh] = useState(false);
  const [results, setResults] = useState(() => readJson(CSEC_2027_RESULTS_KEY, []));

  if (selectedPaper) {
    return <Paper2027ModuleExam paper={selectedPaper} onExit={() => { setSelectedPaper(null); setResults(readJson(CSEC_2027_RESULTS_KEY, [])); }} startFresh={startFresh} />;
  }

  return (
    <main className="practice-hub paper2027-hub">
      <section className="practice-hero paper2027-hero">
        <div>
          <div className="practice-eyebrow">Effective May–June 2027</div>
          <h1>2027 Syllabus Practice</h1>
          <p>Prepare for the revised modular CSEC Mathematics examination with questions written specifically for the new structure and amended objectives.</p>
        </div>
        <button className="practice-back" type="button" onClick={onExit}>← Back to Practice</button>
      </section>

      <section className="paper2027-format-card">
        <div className="paper2027-format-copy">
          <div className="paper2027-badge">New examination format</div>
          <h2>Practice by module before the full 2027 papers arrive.</h2>
          <p>The revised regular examination has three modules. Paper 1 has 60 multiple-choice questions, 20 from each module. Paper 2 has nine compulsory structured questions, three from each module.</p>
        </div>
        <div className="paper2027-format-stats">
          <div><strong>3</strong><span>Modules</span></div>
          <div><strong>60</strong><span>Paper 1 items</span></div>
          <div><strong>9</strong><span>Paper 2 questions</span></div>
          <div><strong>90</strong><span>Paper 2 marks</span></div>
        </div>
      </section>

      <section className="paper2027-section-head">
        <div><span>Available now</span><h2>Module 1 Practice Papers</h2></div>
        <div className="paper2027-module-chip">Fundamentals · 30 marks</div>
      </section>

      <section className="paper2027-paper-grid">
        {CSEC_2027_MODULE1_PAPERS.map(paper => {
          const active = readJson(csec2027ActiveKey(paper.letter), null);
          const latest = results.find(result => result.paperId === paper.paper_id);
          return (
            <article className="paper2027-paper-card" key={paper.paper_id}>
              <div className="paper2027-paper-top"><span>Practice Paper</span><strong>{paper.letter}</strong></div>
              <h3>Module 1</h3>
              <p>Computation and consumer arithmetic, a compulsory investigation, then algebra, sets and measurement.</p>
              <div className="practice-specs paper2027-paper-specs">
                <span>3 questions</span><span>50 minutes</span><span>30 marks</span><span>Auto-graded</span>
              </div>
              <div className="paper2027-profile-mini" aria-label="Assessment profile">
                <span><b>Conceptual Knowledge (CK)</b><strong>9</strong></span>
                <span><b>Algorithmic Knowledge (AK)</b><strong>12</strong></span>
                <span><b>Reasoning (R)</b><strong>9</strong></span>
              </div>
              {latest && <div className="paper2027-latest"><span>Latest result</span><strong>{latest.score}/{latest.maxScore} · {latest.percent}%</strong></div>}
              <div className="practice-card-actions">
                {active?.paperId === paper.paper_id && <button type="button" className="practice-primary" onClick={() => { setStartFresh(false); setSelectedPaper(paper); }}>Resume paper</button>}
                <button type="button" className={active?.paperId === paper.paper_id ? "practice-secondary" : "practice-primary"} onClick={() => { setStartFresh(true); setSelectedPaper(paper); }}>Start new paper</button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="paper2027-coming-grid">
        <article><span>Coming next</span><h3>Module 2</h3><p>Three 30-mark structured-question sets for Intermediate Secondary Level Mathematics.</p></article>
        <article><span>Coming next</span><h3>Module 3</h3><p>Three 30-mark structured-question sets for Higher Concepts in Secondary Level Mathematics.</p></article>
        <article><span>When all modules are ready</span><h3>Full 2027 Paper 2</h3><p>Nine compulsory questions, 90 marks and 2 hours 30 minutes under full examination conditions.</p></article>
      </section>

      <section className="paper2027-note-card">
        <div><strong>Why this area is separate</strong><p>The current Paper 1 and Paper 2 simulators remain available for the earlier examination format. This section is specifically for the revised syllabus effective from 2027.</p></div>
        <span>41 amended objectives catalogued</span>
      </section>
    </main>
  );
}
