import React, { useMemo, useState } from "react";
import Paper2027ModuleExam from "./Paper2027ModuleExam";
import {
  CSEC_2027_LEGACY_RESULTS_KEY,
  CSEC_2027_MODULES,
  CSEC_2027_PRACTICE_MODES,
  CSEC_2027_RESULTS_KEY,
  csec2027ActiveKey,
  getCsec2027Papers,
  legacyCsec2027Module1ActiveKey,
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

function allResults() {
  const current = readJson(CSEC_2027_RESULTS_KEY, []);
  const legacy = readJson(CSEC_2027_LEGACY_RESULTS_KEY, []);
  return [...current, ...legacy];
}

function paperDescription(paper) {
  if (paper.scope === "full") return "All three modules under full examination conditions, including construction, graph work and the compulsory investigation.";
  return paper.moduleInfo?.description || "Three compulsory structured questions from the selected module.";
}

function modeDescription(mode) {
  if (mode.key === "full") return "Sit all nine questions in the complete 2027 Paper 2 format.";
  return CSEC_2027_MODULES[mode.module]?.description || "Target one 30-mark module.";
}

export default function Syllabus2027Hub({ onExit }) {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [startFresh, setStartFresh] = useState(false);
  const [modeKey, setModeKey] = useState("module1");
  const [results, setResults] = useState(() => allResults());
  const mode = CSEC_2027_PRACTICE_MODES.find(item => item.key === modeKey) || CSEC_2027_PRACTICE_MODES[0];
  const papers = useMemo(() => getCsec2027Papers(modeKey), [modeKey]);

  if (selectedPaper) {
    return <Paper2027ModuleExam paper={selectedPaper} onExit={() => { setSelectedPaper(null); setResults(allResults()); }} startFresh={startFresh} />;
  }

  return (
    <main className="practice-hub paper2027-hub">
      <section className="practice-hero paper2027-hero">
        <div>
          <div className="practice-eyebrow">Effective May–June 2027</div>
          <h1>2027 Syllabus Practice</h1>
          <p>Prepare for the revised modular CSEC Mathematics examination with complete Module 1, Module 2, Module 3 and full Paper 2 practice.</p>
        </div>
        <button className="practice-back" type="button" onClick={onExit}>← Back to Practice</button>
      </section>

      <section className="paper2027-format-card">
        <div className="paper2027-format-copy">
          <div className="paper2027-badge">Complete 2027 Paper 2 practice</div>
          <h2>Practise one module or sit the full nine-question paper.</h2>
          <p>The revised examination is modular. Each module contains three compulsory Paper 2 questions worth 30 marks, and the full Paper 2 contains nine questions worth 90 marks.</p>
        </div>
        <div className="paper2027-format-stats">
          <div><strong>3</strong><span>Modules</span></div>
          <div><strong>9</strong><span>Paper 2 questions</span></div>
          <div><strong>90</strong><span>Paper 2 marks</span></div>
          <div><strong>2 h 30</strong><span>Full paper time</span></div>
        </div>
      </section>

      <section className="paper2027-section-head">
        <div><span>Choose your practice</span><h2>2027 Paper 2 modes</h2></div>
        <div className="paper2027-module-chip">Papers A, B and C available</div>
      </section>

      <section className="paper2027-mode-grid" aria-label="2027 practice modes">
        {CSEC_2027_PRACTICE_MODES.map(item => (
          <button type="button" key={item.key} className={`paper2027-mode-card ${item.key === modeKey ? "active" : ""}`} onClick={() => setModeKey(item.key)}>
            <span>{item.key === "full" ? "Full simulation" : `Module ${item.module}`}</span>
            <strong>{item.label}</strong>
            <small>{item.subtitle}</small>
            <p>{modeDescription(item)}</p>
            <div><b>{item.questions} questions</b><b>{item.marks} marks</b><b>{item.durationMinutes === 150 ? "2 h 30 min" : "50 min"}</b></div>
          </button>
        ))}
      </section>

      <section className="paper2027-section-head paper2027-paper-heading">
        <div><span>Available now</span><h2>{mode.label} Practice Papers</h2></div>
        <div className="paper2027-module-chip">{mode.subtitle} · {mode.marks} marks</div>
      </section>

      <section className="paper2027-paper-grid">
        {papers.map(paper => {
          const active = readJson(csec2027ActiveKey(paper.letter, paper.modeKey), null)
            || (paper.modeKey === "module1" ? readJson(legacyCsec2027Module1ActiveKey(paper.letter), null) : null);
          const latest = results.find(result => result.paperId === paper.paper_id || (paper.modeKey === "module1" && result.paperId === paper.sourcePaperId));
          return (
            <article className="paper2027-paper-card" key={paper.paper_id}>
              <div className="paper2027-paper-top"><span>Practice Paper</span><strong>{paper.letter}</strong></div>
              <h3>{mode.label}</h3>
              <p>{paperDescription(paper)}</p>
              <div className="practice-specs paper2027-paper-specs">
                <span>{paper.questionCount} questions</span><span>{paper.durationMinutes === 150 ? "2 h 30 min" : "50 minutes"}</span><span>{paper.totalMarks} marks</span><span>Auto-graded</span>
              </div>
              <div className="paper2027-profile-mini" aria-label="Assessment profile">
                <span><b>Conceptual Knowledge (CK)</b><strong>{paper.profile.CK}</strong></span>
                <span><b>Algorithmic Knowledge (AK)</b><strong>{paper.profile.AK}</strong></span>
                <span><b>Reasoning (R)</b><strong>{paper.profile.R}</strong></span>
              </div>
              {latest && <div className="paper2027-latest"><span>Latest result</span><strong>{latest.score}/{latest.maxScore} · {latest.percent}%</strong></div>}
              <div className="practice-card-actions">
                {active?.paperId && <button type="button" className="practice-primary" onClick={() => { setStartFresh(false); setSelectedPaper(paper); }}>Resume paper</button>}
                <button type="button" className={active?.paperId ? "practice-secondary" : "practice-primary"} onClick={() => { setStartFresh(true); setSelectedPaper(paper); }}>Start new paper</button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="paper2027-module-overview">
        {Object.values(CSEC_2027_MODULES).map(module => (
          <article key={module.module}>
            <span>Module {module.module}</span>
            <h3>{module.shortTitle}</h3>
            <p>{module.description}</p>
            <small>Questions {module.questionNumbers.join(", ")} · 30 marks · Conceptual Knowledge 9 · Algorithmic Knowledge 12 · Reasoning 9</small>
          </article>
        ))}
      </section>

      <section className="paper2027-note-card">
        <div><strong>Why this area is separate</strong><p>The existing Paper 1 and Paper 2 simulators remain available for the earlier examination format. This section is specifically for the revised syllabus effective from 2027.</p></div>
        <span>41 amended objectives catalogued</span>
      </section>
    </main>
  );
}
