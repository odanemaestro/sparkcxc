import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MathText from "./MathText";
import {
  PAPER1_DURATION_SECONDS,
  buildPaper1Exam,
  loadPaper1Bank,
  loadPaper1Diagrams,
  scorePaper1,
  validatePaper1Exam,
} from "./paper1Engine";
import { paper1ResultToAttempt, savePracticeExamAttempt } from "./persistence";
import "./practiceExam.css";

const ACTIVE_KEY = "spark-paper1-active-v1";
const USED_KEY = "spark-paper1-used-question-ids-v1";
const RESULTS_KEY = "spark-paper1-results-v1";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage is optional */ }
}

function safeSvgMarkup(svg) {
  return String(svg || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "");
}

function SvgFigure({ svg, className = "" }) {
  if (!svg) return null;
  return <div className={`paper-svg-wrap ${className}`.trim()} dangerouslySetInnerHTML={{ __html: safeSvgMarkup(svg) }} />;
}

function formatClock(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function createSeed() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function Option({ letter, text, svg, selected, onSelect, reviewState }) {
  const reviewClass = reviewState === "correct" ? " is-correct" : reviewState === "wrong" ? " is-wrong" : "";
  return (
    <button type="button" className={`paper-option${selected ? " is-selected" : ""}${reviewClass}`} onClick={onSelect} disabled={Boolean(reviewState)}>
      <span className="paper-option-letter">{letter}</span>
      <span className="paper-option-content">
        {svg ? <SvgFigure svg={svg} className="paper-option-svg" /> : <MathText>{text}</MathText>}
      </span>
    </button>
  );
}

export default function Paper1Exam({ onExit, startFresh = false, supabase, userId }) {
  const [bank, setBank] = useState([]);
  const [diagrams, setDiagrams] = useState({});
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [remaining, setRemaining] = useState(PAPER1_DURATION_SECONDS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [result, setResult] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const submittedRef = useRef(false);

  useEffect(() => {
    let alive = true;
    Promise.all([loadPaper1Bank(), loadPaper1Diagrams()])
      .then(([questionBank, diagramBank]) => {
        if (!alive) return;
        setBank(questionBank);
        setDiagrams(diagramBank);

        const saved = !startFresh ? readJson(ACTIVE_KEY, null) : null;
        if (saved?.questionIds?.length === 60) {
          const map = new Map(questionBank.map(q => [q.question_id, q]));
          const restored = saved.questionIds.map(id => map.get(id)).filter(Boolean);
          if (restored.length === 60) {
            setExam({
              id: saved.id,
              seed: saved.seed,
              templatePaper: saved.templatePaper,
              durationSeconds: PAPER1_DURATION_SECONDS,
              questions: restored,
            });
            setAnswers(saved.answers || {});
            setFlags(saved.flags || []);
            setCurrentIndex(Math.min(59, Math.max(0, saved.currentIndex || 0)));
            setDeadline(saved.deadline || Date.now() + PAPER1_DURATION_SECONDS * 1000);
            setStarted(true);
            setLoading(false);
            return;
          }
        }

        const used = readJson(USED_KEY, []);
        const freshExam = buildPaper1Exam(questionBank, { seed: createSeed(), previouslyUsedQuestionIds: used });
        const validation = validatePaper1Exam(freshExam);
        if (!validation.valid) throw new Error("The generated paper failed the uniqueness check.");
        setExam(freshExam);
        setAnswers({});
        setFlags([]);
        setCurrentIndex(0);
        setDeadline(null);
        setStarted(false);
        localStorage.removeItem(ACTIVE_KEY);
        setLoading(false);
      })
      .catch(err => {
        if (!alive) return;
        setError(err.message || "Could not prepare the practice paper.");
        setLoading(false);
      });
    return () => { alive = false; };
  }, [startFresh]);

  useEffect(() => {
    if (!started || !deadline || result) return undefined;
    const tick = () => setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [started, deadline, result]);

  const finalize = useCallback((timedOut = false) => {
    if (!exam || submittedRef.current) return;
    submittedRef.current = true;
    const scored = scorePaper1(exam.questions, answers);
    const usedSeconds = timedOut ? PAPER1_DURATION_SECONDS : Math.min(PAPER1_DURATION_SECONDS, Math.max(0, PAPER1_DURATION_SECONDS - remaining));
    const completed = {
      id: exam.id,
      score: scored.correct,
      correct: scored.correct,
      unanswered: scored.unanswered,
      answeredCount: scored.total - scored.unanswered,
      percent: scored.percent,
      completedAt: new Date().toISOString(),
      usedSeconds,
      timedOut,
      templatePaper: exam.templatePaper,
      questionIds: exam.questions.map(q => q.question_id),
    };

    const existingUsed = readJson(USED_KEY, []);
    const nextUsed = [...new Set([...existingUsed, ...completed.questionIds])];
    writeJson(USED_KEY, nextUsed);
    const pastResults = readJson(RESULTS_KEY, []);
    writeJson(RESULTS_KEY, [completed, ...pastResults].slice(0, 20));
    const attempt = paper1ResultToAttempt(completed);
    void savePracticeExamAttempt({ supabase, userId, attempt }).catch(() => {});
    localStorage.removeItem(ACTIVE_KEY);
    setResult({ ...scored, usedSeconds, timedOut });
    setReviewIndex(0);
    setShowSubmit(false);
  }, [exam, answers, remaining, supabase, userId]);

  useEffect(() => {
    if (started && remaining === 0 && !result) finalize(true);
  }, [started, remaining, result, finalize]);

  useEffect(() => {
    if (!started || !exam || result || !deadline) return;
    writeJson(ACTIVE_KEY, {
      id: exam.id,
      seed: exam.seed,
      templatePaper: exam.templatePaper,
      questionIds: exam.questions.map(q => q.question_id),
      answers,
      flags,
      currentIndex,
      deadline,
    });
  }, [started, exam, answers, flags, currentIndex, deadline, result]);

  useEffect(() => {
    if (!started || result || showSubmit) return undefined;
    const onKey = event => {
      const key = event.key.toUpperCase();
      if (["A", "B", "C", "D"].includes(key)) {
        const q = exam?.questions?.[currentIndex];
        if (q) setAnswers(prev => ({ ...prev, [q.question_id]: key }));
      } else if (event.key === "ArrowRight") {
        setCurrentIndex(i => Math.min(59, i + 1));
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex(i => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, result, showSubmit, exam, currentIndex]);

  const answeredCount = Object.keys(answers).filter(id => answers[id]).length;
  const flagged = useMemo(() => new Set(flags), [flags]);
  const current = exam?.questions?.[currentIndex];
  const questionDiagram = current?.diagram_asset_id ? diagrams[current.diagram_asset_id] : "";
  const hasOptionSvgs = Boolean(current?.option_a_svg || current?.option_b_svg || current?.option_c_svg || current?.option_d_svg);
  const showMainDiagram = Boolean(questionDiagram) && !hasOptionSvgs;

  function beginPaper() {
    const nextDeadline = Date.now() + PAPER1_DURATION_SECONDS * 1000;
    setDeadline(nextDeadline);
    setRemaining(PAPER1_DURATION_SECONDS);
    setStarted(true);
  }

  function selectAnswer(letter) {
    if (!current || result) return;
    setAnswers(prev => ({ ...prev, [current.question_id]: letter }));
  }

  function toggleFlag() {
    if (!current) return;
    setFlags(prev => prev.includes(current.question_id) ? prev.filter(id => id !== current.question_id) : [...prev, current.question_id]);
  }

  function startAnother() {
    const used = readJson(USED_KEY, []);
    const next = buildPaper1Exam(bank, { seed: createSeed(), previouslyUsedQuestionIds: used });
    const validation = validatePaper1Exam(next);
    if (!validation.valid) {
      setError("The new paper failed the uniqueness check. Please try again.");
      return;
    }
    submittedRef.current = false;
    setExam(next);
    setAnswers({});
    setFlags([]);
    setCurrentIndex(0);
    setDeadline(null);
    setRemaining(PAPER1_DURATION_SECONDS);
    setStarted(false);
    setResult(null);
    setReviewIndex(0);
    localStorage.removeItem(ACTIVE_KEY);
  }

  if (loading) {
    return <main className="paper-loading"><div className="paper-loader"/><h1>Preparing Paper 1</h1><p>Selecting 60 questions for your examination.</p></main>;
  }

  if (error) {
    return <main className="paper-loading"><h1>Paper 1 is unavailable</h1><p>{error}</p><button className="practice-primary" onClick={onExit}>Back to Practice</button></main>;
  }

  if (!started && exam && !result) {
    return (
      <main className="paper-start-shell">
        <button className="paper-text-button" type="button" onClick={onExit}>Back to Practice</button>
        <section className="paper-start-card">
          <div className="paper-start-kicker">CSEC Mathematics</div>
          <h1>Paper 1 Practice Examination</h1>
          <div className="paper-start-rule"/>
          <div className="paper-start-meta">
            <div><span>Time</span><strong>1 hour 30 minutes</strong></div>
            <div><span>Questions</span><strong>60 multiple choice</strong></div>
            <div><span>Marks</span><strong>60 total</strong></div>
          </div>
          <div className="paper-instructions">
            <h2>Instructions</h2>
            <p><strong>Answer ALL questions.</strong> Select one answer for each question. Solutions are shown only after the paper is submitted.</p>
            <p>The time allowed is 1 hour 30 minutes. Your answers are saved while the examination is in progress.</p>
          </div>
          <div className="paper-blueprint-note">
            This paper follows the topic and question-position pattern of a real historical Paper 1. Duplicate and known repeated questions are blocked inside the paper.
          </div>
          <button className="paper-start-button" type="button" onClick={beginPaper}>Start Paper</button>
        </section>
      </main>
    );
  }

  if (result && exam) {
    const row = result.rows[reviewIndex];
    const q = row.question;
    const reviewDiagram = q.diagram_asset_id ? diagrams[q.diagram_asset_id] : "";
    const hasReviewOptionSvgs = Boolean(q.option_a_svg || q.option_b_svg || q.option_c_svg || q.option_d_svg);
    return (
      <main className="paper-results-shell">
        <section className="paper-score-hero">
          <div>
            <div className="paper-result-kicker">Paper submitted</div>
            <h1>{result.correct}<span>/60</span></h1>
            <p>{result.percent}%</p>
          </div>
          <div className="paper-result-summary">
            <div><strong>{result.correct}</strong><span>Correct</span></div>
            <div><strong>{result.incorrect}</strong><span>Incorrect</span></div>
            <div><strong>{result.unanswered}</strong><span>Unanswered</span></div>
            <div><strong>{formatClock(result.usedSeconds)}</strong><span>Time used</span></div>
          </div>
        </section>

        <section className="paper-topic-results">
          <div className="paper-section-heading">
            <div><span>Performance by topic</span><h2>Review your performance by topic.</h2></div>
          </div>
          <div className="paper-topic-grid">
            {result.topics.map(topic => (
              <div className="paper-topic-row" key={topic.topic}>
                <div><strong>{topic.topic}</strong><span>{topic.correct} of {topic.total}</span></div>
                <div className="paper-topic-track"><span style={{ width: `${topic.percent}%` }}/></div>
                <b>{topic.percent}%</b>
              </div>
            ))}
          </div>
        </section>

        <section className="paper-review-shell">
          <div className="paper-review-head">
            <div><span>Answer review</span><h2>Question {reviewIndex + 1} of 60</h2></div>
            <div className={`paper-review-status ${row.correct ? "correct" : "incorrect"}`}>{row.correct ? "Correct" : row.unanswered ? "Unanswered" : "Incorrect"}</div>
          </div>

          <div className="paper-question-copy"><MathText as="div">{q.stem}</MathText></div>
          {reviewDiagram && !hasReviewOptionSvgs && <SvgFigure svg={reviewDiagram} />}
          <div className={`paper-options ${hasReviewOptionSvgs ? "has-option-figures" : ""}`}>
            {["A", "B", "C", "D"].map(letter => {
              const isCorrect = q.correct_option === letter;
              const isWrongSelection = row.selected === letter && !isCorrect;
              return (
                <Option
                  key={letter}
                  letter={letter}
                  text={q[`option_${letter.toLowerCase()}`]}
                  svg={q[`option_${letter.toLowerCase()}_svg`]}
                  selected={row.selected === letter}
                  onSelect={() => {}}
                  reviewState={isCorrect ? "correct" : isWrongSelection ? "wrong" : "review"}
                />
              );
            })}
          </div>

          <div className="paper-solution-box">
            <div><span>Correct answer</span><strong>{q.correct_option}. <MathText>{q.correct_answer}</MathText></strong></div>
            {q.worked_solution && <p><MathText>{q.worked_solution}</MathText></p>}
            <small>Source: {q.year} {q.sitting}, Question {q.question_number}</small>
          </div>

          <div className="paper-review-controls">
            <button type="button" disabled={reviewIndex === 0} onClick={() => setReviewIndex(i => Math.max(0, i - 1))}>Previous</button>
            <div className="paper-review-dots">
              {result.rows.map((r, i) => <button key={r.question.question_id} className={`${i === reviewIndex ? "active " : ""}${r.correct ? "correct" : "incorrect"}`} onClick={() => setReviewIndex(i)} aria-label={`Review question ${i + 1}`}>{i + 1}</button>)}
            </div>
            <button type="button" disabled={reviewIndex === 59} onClick={() => setReviewIndex(i => Math.min(59, i + 1))}>Next</button>
          </div>
        </section>

        <div className="paper-result-actions">
          <button type="button" className="practice-secondary" onClick={onExit}>Back to Practice</button>
          <button type="button" className="practice-primary" onClick={startAnother}>Start another Paper 1</button>
        </div>
      </main>
    );
  }

  if (!current) return null;

  const selected = answers[current.question_id] || "";
  const unanswered = 60 - answeredCount;

  return (
    <main className="paper-exam-shell">
      <header className="paper-exam-header">
        <div className="paper-exam-brand">
          <button type="button" className="paper-exit" onClick={onExit}>Exit</button>
          <div><span>CSEC Mathematics</span><strong>Paper 1 Simulation</strong></div>
        </div>
        <div className={`paper-timer ${remaining <= 600 ? "is-low" : ""}`}>
          <span>Time remaining</span>
          <strong>{formatClock(remaining)}</strong>
        </div>
        <button type="button" className="paper-submit-top" onClick={() => setShowSubmit(true)}>Submit paper</button>
      </header>

      <div className="paper-progress-line"><span style={{ width: `${(answeredCount / 60) * 100}%` }}/></div>

      <div className="paper-exam-layout">
        <section className="paper-question-card">
          <div className="paper-question-topline">
            <div>
              <span className="paper-question-number">Question {currentIndex + 1}</span>
              <span className="paper-question-count">of 60</span>
            </div>
            <button type="button" className={`paper-flag ${flagged.has(current.question_id) ? "is-flagged" : ""}`} onClick={toggleFlag}>
              {flagged.has(current.question_id) ? "Flagged" : "Flag for review"}
            </button>
          </div>

          <div className="paper-question-copy"><MathText as="div">{current.stem}</MathText></div>
          {showMainDiagram && <SvgFigure svg={questionDiagram} />}

          <div className={`paper-options ${hasOptionSvgs ? "has-option-figures" : ""}`}>
            {["A", "B", "C", "D"].map(letter => (
              <Option
                key={letter}
                letter={letter}
                text={current[`option_${letter.toLowerCase()}`]}
                svg={current[`option_${letter.toLowerCase()}_svg`]}
                selected={selected === letter}
                onSelect={() => selectAnswer(letter)}
              />
            ))}
          </div>

          <div className="paper-question-actions">
            <button type="button" className="paper-prev" disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}>Previous</button>
            <div className="paper-answer-state">{selected ? `Answer ${selected} selected` : "No answer selected"}</div>
            <button type="button" className="paper-next" disabled={currentIndex === 59} onClick={() => setCurrentIndex(i => Math.min(59, i + 1))}>Next question</button>
          </div>
        </section>

        <aside className="paper-navigator">
          <div className="paper-nav-head">
            <div><strong>Question navigator</strong><span>{answeredCount} answered, {unanswered} remaining</span></div>
          </div>
          <div className="paper-nav-grid">
            {exam.questions.map((q, i) => {
              const isAnswered = Boolean(answers[q.question_id]);
              const isFlagged = flagged.has(q.question_id);
              return (
                <button
                  key={q.question_id}
                  type="button"
                  className={`${i === currentIndex ? "current " : ""}${isAnswered ? "answered " : ""}${isFlagged ? "flagged" : ""}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Question ${i + 1}${isAnswered ? ", answered" : ""}${isFlagged ? ", flagged" : ""}`}
                >{i + 1}</button>
              );
            })}
          </div>
          <div className="paper-nav-legend">
            <span><i className="answered"/>Answered</span>
            <span><i className="flagged"/>Flagged</span>
            <span><i/>Not answered</span>
          </div>
          <button type="button" className="paper-submit-side" onClick={() => setShowSubmit(true)}>Submit paper</button>
        </aside>
      </div>

      {showSubmit && (
        <div className="paper-modal-backdrop" role="presentation" onMouseDown={() => setShowSubmit(false)}>
          <div className="paper-submit-modal" role="dialog" aria-modal="true" aria-labelledby="submit-paper-title" onMouseDown={e => e.stopPropagation()}>
            <div className="paper-submit-icon">✓</div>
            <h2 id="submit-paper-title">Submit your Paper 1?</h2>
            <p>You answered {answeredCount} of 60 questions. {unanswered ? `${unanswered} question${unanswered === 1 ? " is" : "s are"} still unanswered.` : "Every question has an answer."}</p>
            <div className="paper-modal-actions">
              <button type="button" className="practice-secondary" onClick={() => setShowSubmit(false)}>Continue exam</button>
              <button type="button" className="practice-primary" onClick={() => finalize(false)}>Submit now</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
