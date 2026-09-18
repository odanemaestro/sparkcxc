import React, { useEffect, useMemo, useRef, useState } from "react";
import bank from "./itPaper1Data.json";
import InformationTechnologyQuestionVisual from "./InformationTechnologyQuestionVisual";

const ACTIVE_KEY = "spark-it-paper1-active-v3";
const LEGACY_ACTIVE_KEYS = ["spark-it-paper1-active-v2", "spark-it-paper1-active-v1"];
const RESULTS_KEY = "spark-it-paper1-results-v1";
const HISTORY_KEY = "spark-it-paper1-history-v3";
const DURATION = 75 * 60;

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readActive() {
  const current = readJson(ACTIVE_KEY, null);
  if (current) return current;
  for (const key of LEGACY_ACTIVE_KEYS) {
    const legacy = readJson(key, null);
    if (legacy) return legacy;
  }
  return null;
}

function clearActive() {
  localStorage.removeItem(ACTIVE_KEY);
  LEGACY_ACTIVE_KEYS.forEach(key => localStorage.removeItem(key));
}

function choosePaper() {
  const ids = bank.papers.map(item => item.id);
  let history = readJson(HISTORY_KEY, []);
  history = history.filter(id => ids.includes(id));
  let available = ids.filter(id => !history.includes(id));
  if (!available.length) {
    history = [];
    available = [...ids];
  }
  const selectedId = available[Math.floor(Math.random() * available.length)];
  localStorage.setItem(HISTORY_KEY, JSON.stringify([...history, selectedId]));
  return bank.papers.find(item => item.id === selectedId);
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export default function InformationTechnologyPaper1Exam({ onExit, startFresh = false }) {
  const [phase, setPhase] = useState("instructions");
  const [active, setActive] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [remaining, setRemaining] = useState(DURATION);
  const [showExit, setShowExit] = useState(false);
  const submittedRef = useRef(false);

  const paper = useMemo(() => bank.papers.find(item => item.id === active?.paperId) || null, [active]);
  const questions = paper?.questions || [];
  const current = questions[index] || null;

  useEffect(() => {
    if (startFresh) {
      // Show the new-paper instruction sheet without destroying a resumable paper.
      // Existing progress is only replaced after the student presses Start Paper 1.
      return;
    }
    const saved = readActive();
    if (!saved?.paperId || !bank.papers.some(item => item.id === saved.paperId)) return;
    setActive(saved);
    setAnswers(saved.answers || {});
    setFlags(saved.flags || {});
    setIndex(Math.min(saved.index || 0, 59));
    setRemaining(Math.max(0, DURATION - Math.floor((Date.now() - saved.startedAt) / 1000)));
    setPhase(saved.phase || "exam");
  }, [startFresh]);

  useEffect(() => {
    if (phase !== "exam" || !active) return undefined;
    const timer = window.setInterval(() => {
      const next = Math.max(0, DURATION - Math.floor((Date.now() - active.startedAt) / 1000));
      setRemaining(next);
      if (next <= 0) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, active]);

  useEffect(() => {
    if (phase === "exam" && remaining === 0 && active && !submittedRef.current) submit(true);
  }, [remaining, phase, active]);

  function persist(next) {
    setActive(next);
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(next));
    LEGACY_ACTIVE_KEYS.forEach(key => localStorage.removeItem(key));
  }

  function start() {
    clearActive();
    const selected = choosePaper();
    const next = {
      paperId: selected.id,
      startedAt: Date.now(),
      answers: {},
      flags: {},
      index: 0,
      phase: "exam",
    };
    persist(next);
    setAnswers({});
    setFlags({});
    setIndex(0);
    setRemaining(DURATION);
    submittedRef.current = false;
    setPhase("exam");
  }

  function selectAnswer(value) {
    if (!current) return;
    const nextAnswers = { ...answers, [current.id]: value };
    setAnswers(nextAnswers);
    persist({ ...active, answers: nextAnswers, flags, index, phase: "exam" });
  }

  function go(nextIndex) {
    setIndex(nextIndex);
    persist({ ...active, answers, flags, index: nextIndex, phase: "exam" });
  }

  function toggleFlag() {
    if (!current) return;
    const nextFlags = { ...flags, [current.id]: !flags[current.id] };
    if (!nextFlags[current.id]) delete nextFlags[current.id];
    setFlags(nextFlags);
    persist({ ...active, answers, flags: nextFlags, index, phase: "exam" });
  }

  function saveAndExit() {
    persist({ ...active, answers, flags, index, phase: "exam" });
    setShowExit(false);
    onExit?.();
  }

  function submit(timedOut = false) {
    if (!paper || submittedRef.current) return;
    submittedRef.current = true;
    const score = questions.reduce((sum, item) => sum + (answers[item.id] === item.answer ? 1 : 0), 0);
    const result = {
      paperId: paper.id,
      paperTitle: paper.title,
      score,
      percent: Math.round((score / 60) * 100),
      completedAt: new Date().toISOString(),
      timedOut,
      answers,
      flags,
      durationSeconds: DURATION - remaining,
    };
    const results = readJson(RESULTS_KEY, []);
    localStorage.setItem(RESULTS_KEY, JSON.stringify([result, ...results].slice(0, 20)));
    clearActive();
    setPhase("result");
  }

  if (phase === "instructions") {
    return (
      <main className="it-exam">
        <section className="it-exam-instructions it-instruction-sheet">
          <div className="it-instruction-kicker">SPARK PRACTICE EXAMINATION</div>
          <div className="it-instruction-subject">CSEC Information Technology</div>
          <h1>Paper 01</h1>
          <div className="it-instruction-time">1 hour 15 minutes</div>

          <div className="it-instruction-grid">
            <div><strong>60</strong><span>multiple-choice questions</span></div>
            <div><strong>75</strong><span>minutes</span></div>
            <div><strong>60</strong><span>marks</span></div>
          </div>

          <section className="it-instruction-rules">
            <h2>Instructions</h2>
            <ol>
              <li>Answer <strong>ALL 60 questions</strong>.</li>
              <li>Select <strong>ONE</strong> answer, A, B, C or D, for each question.</li>
              <li>Read every table, diagram, spreadsheet extract, database structure, flowchart, code sample or other stimulus before choosing your answer.</li>
              <li>You may move between questions at any time. Use <strong>Flag question</strong> when you want to return to an item before submitting.</li>
              <li>The question navigator shows which items are answered and which are flagged.</li>
              <li>Use <strong>Exit paper</strong> if you need to leave. SPARK saves your answers, flags and current position so that you can resume later. The examination timer continues from the original start time.</li>
              <li>When you are satisfied with your responses, select <strong>Submit paper</strong>. Unanswered questions receive no mark.</li>
            </ol>
          </section>

          <section className="it-instruction-note">
            <strong>Paper coverage</strong>
            <p>Each SPARK Paper 01 follows the current course blueprint with 35 questions from Sections 1–3, 15 from Sections 4–6 and 10 from Sections 7–8. SPARK rotates through nine complete practice papers before repeating a paper.</p>
          </section>

          <div className="it-practice-actions it-instruction-actions">
            <button className="it-practice-secondary" type="button" onClick={onExit}>Back to IT Practice</button>
            <button className="it-practice-primary" type="button" onClick={start}>Start Paper 1</button>
          </div>
        </section>
      </main>
    );
  }

  if (!paper) return null;

  if (phase === "result") {
    const score = questions.reduce((sum, item) => sum + (answers[item.id] === item.answer ? 1 : 0), 0);
    return (
      <main className="it-exam">
        <section className="it-result-hero">
          <div className="it-practice-eyebrow">{paper.title} complete</div>
          <h1>{score}/60</h1>
          <p>{Math.round((score / 60) * 100)}%</p>
          <button className="it-practice-primary" type="button" onClick={onExit}>Back to IT Practice</button>
        </section>
        <section className="it-review-list">
          {questions.map((item, questionIndex) => {
            const chosen = answers[item.id];
            const correct = chosen === item.answer;
            return (
              <article className={`it-review-item ${correct ? "correct" : "incorrect"}`} key={item.id}>
                <div className="it-review-number">{questionIndex + 1}</div>
                <div>
                  <div className="it-review-title-row">
                    <h3>{item.stem}</h3>
                    {flags[item.id] && <span className="it-review-flag">Flagged</span>}
                  </div>
                  <InformationTechnologyQuestionVisual visual={item.visual}/>
                  <p>Your answer: <strong>{chosen || "Not answered"}</strong> · Correct answer: <strong>{item.answer}</strong></p>
                  <p>{item.explanation}</p>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    );
  }

  if (!current) return null;

  const answered = questions.filter(item => answers[item.id]).length;
  const flaggedCount = questions.filter(item => flags[item.id]).length;
  const currentFlagged = Boolean(flags[current.id]);

  return (
    <main className="it-exam">
      <header className="it-exam-topbar">
        <div>
          <strong>Paper 01</strong>
          <span>Question {index + 1} of 60 · {paper.title}</span>
        </div>
        <div className="it-exam-top-actions">
          <button type="button" className="it-exit-paper" onClick={() => setShowExit(true)}>Exit paper</button>
          <div className={remaining < 300 ? "it-timer urgent" : "it-timer"}>{formatTime(remaining)}</div>
        </div>
      </header>

      <div className="it-exam-layout">
        <aside className="it-question-nav">
          <div className="it-nav-summary">
            <div><strong>{answered}/60</strong><span>answered</span></div>
            <div><strong>{flaggedCount}</strong><span>flagged</span></div>
          </div>
          <div className="it-question-grid">
            {questions.map((item, i) => (
              <button
                type="button"
                key={item.id}
                className={[
                  i === index ? "current" : "",
                  answers[item.id] ? "answered" : "",
                  flags[item.id] ? "flagged" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => go(i)}
                aria-label={`Question ${i + 1}${flags[item.id] ? ", flagged" : ""}`}
              >
                {i + 1}
                {flags[item.id] && <span className="it-nav-flag" aria-hidden="true">⚑</span>}
              </button>
            ))}
          </div>
        </aside>

        <section className="it-question-card">
          <div className="it-question-heading-row">
            <div className="it-question-meta">Question {index + 1}</div>
            <button
              type="button"
              className={`it-flag-question ${currentFlagged ? "active" : ""}`}
              onClick={toggleFlag}
              aria-pressed={currentFlagged}
            >
              <span aria-hidden="true">⚑</span>{currentFlagged ? "Flagged" : "Flag question"}
            </button>
          </div>

          <h2>{current.stem}</h2>
          <InformationTechnologyQuestionVisual visual={current.visual}/>

          <div className="it-option-list">
            {current.options.map(option => (
              <button
                type="button"
                key={option.label}
                className={answers[current.id] === option.label ? "selected" : ""}
                onClick={() => selectAnswer(option.label)}
              >
                <span>{option.label}</span>
                <p>{option.text}</p>
              </button>
            ))}
          </div>

          <div className="it-exam-actions">
            <button className="it-practice-secondary" type="button" disabled={index === 0} onClick={() => go(index - 1)}>Previous</button>
            {index < 59
              ? <button className="it-practice-primary" type="button" onClick={() => go(index + 1)}>Next</button>
              : <button className="it-practice-primary" type="button" onClick={() => submit(false)}>Submit paper</button>}
          </div>
          {index < 59 && <button type="button" className="it-submit-link" onClick={() => submit(false)}>Submit paper now</button>}
        </section>
      </div>

      {showExit && (
        <div className="it-exit-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setShowExit(false); }}>
          <div className="it-exit-dialog" role="dialog" aria-modal="true" aria-labelledby="it-p1-exit-title">
            <div className="it-practice-eyebrow">Leave Paper 01?</div>
            <h2 id="it-p1-exit-title">Your progress will be saved.</h2>
            <p>You have answered {answered} of 60 questions and flagged {flaggedCount}. You can return to IT Practice and resume this paper later. The examination timer continues from the original start time.</p>
            <div className="it-practice-actions">
              <button type="button" className="it-practice-secondary" onClick={() => setShowExit(false)}>Continue paper</button>
              <button type="button" className="it-practice-primary" onClick={saveAndExit}>Save & exit</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
