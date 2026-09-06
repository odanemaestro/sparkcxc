import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MathText from "./MathText";
import Paper2ResponseInput from "./Paper2ResponseInput";
import { FormulaModal } from "./Paper2Exam";
import {
  gradeCxcPaper2Part,
  hasPaper2CxcPartResponse,
  hasPaper2FinalAnswer,
  normalizePaper2TypedResponse,
  paper2PartUsesWorking,
  paper2ResponseSummary,
  paper2WorkingSummary,
} from "./paper2CxcGrader";
import { isPaper2PartComplete } from "./paper2RichGrader";
import {
  CSEC_2027_MODULE1_DURATION_SECONDS,
  CSEC_2027_MODULE1_MARKS,
  CSEC_2027_RESULTS_KEY,
  csec2027ActiveKey,
} from "./csec2027Data";
import "./practiceExam.css";

const SYMBOLS = ["√", "π", "°", "×", "÷", "≤", "≥", "≠", "²", "³", "θ", "≈", "(", ")"];

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* local persistence is optional */ }
}

function formatClock(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatDuration(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return secs ? `${mins} min ${secs} sec` : `${mins} min`;
}

function questionTableCellText(cell) {
  if (cell === null || cell === undefined) return "";
  if (typeof cell !== "object" || Array.isArray(cell)) return cell;
  return cell.display ?? cell.text ?? cell.value ?? "";
}

function QuestionTable({ table }) {
  if (!table) return null;
  return (
    <div className="paper2-table-wrap">
      {table.caption && <div className="paper2027-table-caption"><MathText>{table.caption}</MathText></div>}
      <table className="paper2-data-table">
        <thead><tr>{(table.headers || []).map((header, index) => <th key={`${String(questionTableCellText(header))}-${index}`}><MathText>{questionTableCellText(header)}</MathText></th>)}</tr></thead>
        <tbody>{(table.rows || []).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}><MathText>{questionTableCellText(cell)}</MathText></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function QuestionDiagram({ diagram }) {
  if (!diagram?.svg) return null;
  return (
    <figure className="paper2-diagram paper2027-diagram" role="img" aria-label={diagram.alt || "Question diagram"} dangerouslySetInnerHTML={{ __html: diagram.svg }} />
  );
}

function totalPartCount(paper) {
  return (paper?.questions || []).reduce((sum, question) => sum + (question.parts || []).length, 0);
}

function answeredPartCount(paper, answers) {
  return (paper?.questions || []).reduce((sum, question) => (
    sum + (question.parts || []).filter(part => hasPaper2CxcPartResponse(answers?.[question.question_id]?.[part.id], part)).length
  ), 0);
}

export function calculateCsec2027ModuleMark(answers = {}, questions = []) {
  let score = 0;
  let answeredParts = 0;
  let correctParts = 0;
  let totalParts = 0;
  const perQuestion = {};

  for (const question of questions) {
    const earlier = {};
    let questionScore = 0;
    const partResults = {};
    for (const part of question.parts || []) {
      totalParts += 1;
      const response = answers?.[question.question_id]?.[part.id];
      const result = gradeCxcPaper2Part(response, part, earlier);
      partResults[part.id] = result;
      if (result.status !== "blank") answeredParts += 1;
      if (result.correct) correctParts += 1;
      const earned = Number(result.marks || 0);
      score += earned;
      questionScore += earned;
      const state = {
        value: result.value ?? null,
        correct: result.canonicalCorrect !== undefined ? result.canonicalCorrect : result.correct,
      };
      earlier[part.id] = state;
      const short = String(part.label || "").replace(/[()\s]/g, "").trim();
      if (short) earlier[short] = state;
    }
    perQuestion[question.question_id] = { score: questionScore, marks: Number(question.marks || 0), parts: partResults };
  }

  const totalMarks = questions.reduce((sum, question) => sum + Number(question.marks || 0), 0) || CSEC_2027_MODULE1_MARKS;
  return {
    score,
    maxScore: totalMarks,
    percent: Math.round((score / totalMarks) * 100),
    answeredParts,
    correctParts,
    totalParts,
    perQuestion,
  };
}

function isQuestionComplete(question, answers) {
  const response = answers?.[question.question_id] || {};
  return (question.parts || []).every(part => {
    const value = response[part.id];
    if (part.responseSchema) return isPaper2PartComplete(part, value);
    return hasPaper2FinalAnswer(value, part);
  });
}

export default function Paper2027ModuleExam({ paper, onExit, startFresh = false }) {
  const activeKey = csec2027ActiveKey(paper.letter);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [remaining, setRemaining] = useState(CSEC_2027_MODULE1_DURATION_SECONDS);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activePartKey, setActivePartKey] = useState(null);
  const inputRefs = useRef({});
  const submittedRef = useRef(false);

  useEffect(() => {
    if (startFresh) {
      localStorage.removeItem(activeKey);
      return;
    }
    const saved = readJson(activeKey, null);
    if (!saved || saved.paperId !== paper.paper_id) return;
    setAnswers(saved.answers || {});
    setFlags(saved.flags || []);
    setCurrentIndex(Math.min(2, Math.max(0, Number(saved.currentIndex || 0))));
    setDeadline(saved.deadline || Date.now() + CSEC_2027_MODULE1_DURATION_SECONDS * 1000);
    setStarted(true);
  }, [activeKey, paper.paper_id, startFresh]);

  useEffect(() => {
    if (!started || submitted) return undefined;
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    return () => window.cancelAnimationFrame(frame);
  }, [currentIndex, started, submitted]);

  useEffect(() => {
    if (!submitted) return undefined;
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    return () => window.cancelAnimationFrame(frame);
  }, [reviewIndex, submitted]);

  useEffect(() => {
    if (!showNavigator) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = event => { if (event.key === "Escape") setShowNavigator(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showNavigator]);

  useEffect(() => {
    if (!started || !deadline || submitted) return undefined;
    const tick = () => setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [started, deadline, submitted]);

  useEffect(() => {
    if (!started || submitted || !deadline) return;
    writeJson(activeKey, { paperId: paper.paper_id, answers, flags, currentIndex, deadline });
  }, [activeKey, paper.paper_id, started, submitted, answers, flags, currentIndex, deadline]);

  const current = paper.questions[currentIndex];
  const completeIds = useMemo(() => paper.questions.filter(question => isQuestionComplete(question, answers)).map(question => question.question_id), [paper.questions, answers]);
  const completeSet = useMemo(() => new Set(completeIds), [completeIds]);
  const flaggedSet = useMemo(() => new Set(flags), [flags]);
  const partsAnswered = answeredPartCount(paper, answers);
  const partsTotal = totalPartCount(paper);
  const progress = partsTotal ? Math.round((partsAnswered / partsTotal) * 100) : 0;

  const finalize = useCallback((wasTimedOut = false) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const grade = calculateCsec2027ModuleMark(answers, paper.questions);
    const usedSeconds = wasTimedOut
      ? CSEC_2027_MODULE1_DURATION_SECONDS
      : Math.min(CSEC_2027_MODULE1_DURATION_SECONDS, Math.max(0, CSEC_2027_MODULE1_DURATION_SECONDS - remaining));
    const record = {
      id: `${paper.paper_id}-${Date.now()}`,
      paperId: paper.paper_id,
      paperLetter: paper.letter,
      module: 1,
      completedAt: new Date().toISOString(),
      usedSeconds,
      score: grade.score,
      maxScore: grade.maxScore,
      percent: grade.percent,
      completedCount: completeIds.length,
      timedOut: wasTimedOut,
    };
    const results = readJson(CSEC_2027_RESULTS_KEY, []);
    writeJson(CSEC_2027_RESULTS_KEY, [record, ...results].slice(0, 30));
    localStorage.removeItem(activeKey);
    setTimedOut(wasTimedOut);
    setSubmitted(true);
    setShowSubmit(false);
    setReviewIndex(0);
  }, [activeKey, answers, completeIds.length, paper.letter, paper.paper_id, paper.questions, remaining]);

  useEffect(() => {
    if (started && remaining === 0 && !submitted) finalize(true);
  }, [started, remaining, submitted, finalize]);

  function beginPaper() {
    const nextDeadline = Date.now() + CSEC_2027_MODULE1_DURATION_SECONDS * 1000;
    setDeadline(nextDeadline);
    setRemaining(CSEC_2027_MODULE1_DURATION_SECONDS);
    setStarted(true);
  }

  function setPartResponse(questionId, partId, value) {
    if (submitted) return;
    setAnswers(previous => ({
      ...previous,
      [questionId]: { ...(previous[questionId] || {}), [partId]: value },
    }));
  }

  function insertSymbol(symbol) {
    const fallbackPart = current.parts.find(part => !part.responseSchema) || current.parts[0];
    const bits = activePartKey?.split(":") || [];
    const questionId = bits[0] || current.question_id;
    const partId = bits[1] || fallbackPart.id;
    const field = bits[2] === "working" ? "working" : "answer";
    if (questionId !== current.question_id) return;
    const part = current.parts.find(item => item.id === partId);
    if (!part || part.responseSchema) return;
    const response = normalizePaper2TypedResponse(answers?.[questionId]?.[partId]);
    const key = `${questionId}:${partId}:${field}`;
    const input = inputRefs.current[key];
    const oldValue = String(response[field] ?? "");
    const start = input?.selectionStart ?? oldValue.length;
    const end = input?.selectionEnd ?? oldValue.length;
    const next = `${oldValue.slice(0, start)}${symbol}${oldValue.slice(end)}`;
    setPartResponse(questionId, partId, { ...response, [field]: next });
    window.requestAnimationFrame(() => {
      const target = inputRefs.current[key];
      if (!target) return;
      target.focus();
      target.setSelectionRange(start + symbol.length, start + symbol.length);
    });
  }

  function goToQuestion(index) {
    setCurrentIndex(index);
    setShowNavigator(false);
  }

  function toggleFlag() {
    setFlags(previous => previous.includes(current.question_id)
      ? previous.filter(id => id !== current.question_id)
      : [...previous, current.question_id]);
  }

  if (!started && !submitted) {
    return (
      <main className="paper-start-shell paper2-start-shell paper2027-start-shell">
        <button className="paper-text-button" type="button" onClick={onExit}>← 2027 Syllabus Practice</button>
        <section className="paper-start-card paper2-start-card paper2027-start-card">
          <div className="paper2027-badge">2027 syllabus</div>
          <div className="paper-start-kicker">CSEC Mathematics · Module 1</div>
          <h1>Practice Paper {paper.letter}</h1>
          <p className="paper2-start-sub">Three compulsory structured questions built for the revised examination format.</p>
          <div className="paper-start-rule" />
          <div className="paper-start-meta paper2-start-meta">
            <div><span>Time</span><strong>50 minutes</strong></div>
            <div><span>Questions</span><strong>3 compulsory</strong></div>
            <div><span>Marks</span><strong>30</strong></div>
            <div><span>Module</span><strong>Fundamentals</strong></div>
          </div>
          <div className="paper2027-profile-strip" aria-label="Assessment profile">
                        <span><b>Conceptual Knowledge (CK)</b><strong>9</strong></span>
            <span><b>Algorithmic Knowledge (AK)</b><strong>12</strong></span>
            <span><b>Reasoning (R)</b><strong>9</strong></span>
          </div>
          <div className="paper2-instructions">
            <h2>Instructions</h2>
            <ul>
              <li>Answer all three questions.</li>
              <li>Show all working clearly. Method and reasoning marks are awarded from the steps you show.</li>
              <li>Give non-exact numerical answers to 3 significant figures, or angles to 1 decimal place, unless the question states otherwise.</li>
              <li>Question 2 is the compulsory Module 1 investigation.</li>
            </ul>
          </div>
          <div className="paper2027-source-note">SPARK 2027 syllabus practice · Module 1 only. Papers A, B and C currently cover the completed 30-mark Module 1 section.</div>
          <div className="paper2-start-actions paper2027-start-actions">
            <button type="button" className="practice-secondary" onClick={() => setShowFormula(true)}>View formula sheet</button>
            <button type="button" className="practice-primary" onClick={beginPaper}>{startFresh ? "Start Paper" : "Begin Paper"}</button>
          </div>
        </section>
        {showFormula && <FormulaModal onClose={() => setShowFormula(false)} />}
      </main>
    );
  }

  if (submitted) {
    const grade = calculateCsec2027ModuleMark(answers, paper.questions);
    const reviewQuestion = paper.questions[reviewIndex];
    const questionGrade = grade.perQuestion[reviewQuestion.question_id];
    return (
      <main className="paper-results-shell paper2-results-shell paper2027-results-shell">
        <section className="paper-score-hero paper2-score-hero">
          <div>
            <div className="paper-result-kicker">2027 Module 1 submitted</div>
            <h1>{grade.score}<span>/{grade.maxScore}</span></h1>
            <p>{timedOut ? "Time expired and SPARK submitted your paper." : `You used ${formatDuration(CSEC_2027_MODULE1_DURATION_SECONDS - remaining)}.`}</p>
          </div>
          <div className="paper-score-percent"><strong>{grade.percent}%</strong><span>Practice Paper {paper.letter}</span></div>
        </section>

        <section className="paper2027-result-summary">
          {paper.questions.map(question => {
            const result = grade.perQuestion[question.question_id];
            return <div key={question.question_id}><span>Question {question.question_number}</span><strong>{result.score}/{question.marks}</strong><small>{question.question_number === 2 ? "Investigation" : question.topic}</small></div>;
          })}
        </section>

        <section className="paper-review-shell paper2-review-shell">
          <div className="paper2-review-head">
            <div><span>Module 1 · Question {reviewQuestion.question_number}</span><h2>{reviewQuestion.topic}</h2></div>
            <strong>{questionGrade.score}/{reviewQuestion.marks} marks</strong>
          </div>
          {reviewQuestion.stem && <MathText as="p" className="paper2-stem">{reviewQuestion.stem}</MathText>}
          <div className="paper2-review-parts">
            {reviewQuestion.parts.map(part => {
              const result = questionGrade.parts[part.id];
              const response = answers?.[reviewQuestion.question_id]?.[part.id];
              const working = paper2WorkingSummary(response, part);
              return (
                <article className="paper2-review-part" key={part.id}>
                  <div className="paper2-review-part-head"><strong>{part.label}</strong><span>{result.marks}/{part.marks} marks</span></div>
                  <MathText as="p">{part.prompt}</MathText>
                  <QuestionDiagram diagram={part.diagram} />
                  <div className="paper2-your-response"><span>Your response</span><div>{paper2ResponseSummary(response, part)}</div></div>
                  {working && <div className="paper2-your-response"><span>Your working</span><div>{working}</div></div>}
                  {(result.criteria || []).length > 0 && (
                    <div className="paper2-mark-breakdown">
                      {result.criteria.map((criterion, index) => (
                        <div key={`${criterion.code || "criterion"}-${index}`} className={criterion.earned ? "earned" : "missed"}>
                          <span><b>{criterion.code || criterion.kind || "Mark"}</b>{criterion.label || criterion.description || "Mark-scheme criterion"}{criterion.why && <small>{criterion.why}</small>}</span>
                          <strong>{criterion.marks}/{criterion.maxMarks || 0}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="paper2-worked-solution"><span>Worked solution</span><MathText as="p">{part.solution}</MathText></div>
                </article>
              );
            })}
          </div>
          <div className="paper2-review-nav paper2027-review-nav">
            <button type="button" disabled={reviewIndex === 0} onClick={() => setReviewIndex(index => Math.max(0, index - 1))}>Previous</button>
            <div>{paper.questions.map((question, index) => <button type="button" key={question.question_id} className={`${index === reviewIndex ? "active " : ""}${grade.perQuestion[question.question_id].score === question.marks ? "marked" : ""}`} onClick={() => setReviewIndex(index)}>{question.question_number}</button>)}</div>
            <button type="button" disabled={reviewIndex === 2} onClick={() => setReviewIndex(index => Math.min(2, index + 1))}>Next</button>
          </div>
        </section>

        <div className="paper-result-actions">
          <button type="button" className="practice-secondary" onClick={onExit}>Back to 2027 Practice</button>
        </div>
      </main>
    );
  }

  return (
    <main className="paper-exam-shell paper2-exam-shell paper2027-exam-shell">
      <header className="paper-exam-header paper2-exam-header">
        <div className="paper2-brand-wrap">
          <button type="button" className="paper2-back-control" onClick={onExit}>← Practice</button>
          <div className="paper-exam-brand"><strong>SPARK</strong><div><span>CSEC Mathematics · 2027</span><b>Module 1 · Paper {paper.letter}</b></div></div>
        </div>
        <div className={`paper-timer ${remaining <= 300 ? "is-low" : ""}`}><span>Time remaining</span><strong>{formatClock(remaining)}</strong></div>
        <div className="paper2-header-actions">
          <button type="button" className="paper2-formula-control" onClick={() => setShowFormula(true)}>Formula sheet</button>
          <button type="button" className="paper-nav-toggle" aria-expanded={showNavigator} onClick={() => setShowNavigator(true)}>Questions {currentIndex + 1}/3</button>
          <button type="button" className="paper-submit-top" onClick={() => setShowSubmit(true)}>Submit module</button>
        </div>
      </header>
      <div className="paper-progress-line"><span style={{ width: `${progress}%` }} /></div>

      <div className="paper-exam-layout paper2-exam-layout">
        <section className="paper-question-card paper2-question-card">
          <div className="paper-question-topline">
            <div><span>Module 1</span><strong>Question {current.question_number} of 3</strong></div>
            <button type="button" className={`paper-flag ${flaggedSet.has(current.question_id) ? "is-flagged" : ""}`} onClick={toggleFlag}>{flaggedSet.has(current.question_id) ? "Flagged" : "Flag for review"}</button>
          </div>
          <div className="paper2-question-meta paper2027-question-meta">
            <span>{current.topic}</span><b>{current.marks} marks</b>
          </div>
          {current.stem && <MathText as="p" className="paper2-stem paper2027-stem">{current.stem}</MathText>}

          <div className="paper2-symbol-toolbar">
            <span>Mathematical symbols</span>
            <div>{SYMBOLS.map(symbol => <button type="button" key={symbol} onClick={() => insertSymbol(symbol)}>{symbol}</button>)}</div>
          </div>

          <section className="paper2-parts-list">
            {current.parts.map(part => {
              const rawResponse = answers?.[current.question_id]?.[part.id];
              const typedResponse = normalizePaper2TypedResponse(rawResponse);
              const usesWorking = paper2PartUsesWorking(part);
              const answerKey = `${current.question_id}:${part.id}:answer`;
              const workingKey = `${current.question_id}:${part.id}:working`;
              return (
                <article className="paper2-part-card" key={part.id}>
                  <div className="paper2-part-heading"><strong>{part.label}</strong><span>{part.marks} {part.marks === 1 ? "mark" : "marks"}</span></div>
                  <MathText as="p">{part.prompt}</MathText>
                  <QuestionDiagram diagram={part.diagram} />
                  {!part.responseSchema && <QuestionTable table={part.table} />}
                  {part.responseSchema ? (
                    <Paper2ResponseInput part={part} value={rawResponse} onChange={value => setPartResponse(current.question_id, part.id, value)} />
                  ) : (
                    <>
                      {usesWorking && (
                        <div className="paper2-working-editor">
                          <label htmlFor={`paper2027-working-${current.question_id}-${part.id}`}>Working</label>
                          <textarea
                            id={`paper2027-working-${current.question_id}-${part.id}`}
                            ref={element => { inputRefs.current[workingKey] = element; }}
                            rows={4}
                            value={typedResponse.working}
                            onFocus={() => setActivePartKey(workingKey)}
                            onChange={event => setPartResponse(current.question_id, part.id, { ...typedResponse, working: event.target.value })}
                            placeholder="Show your main mathematical steps"
                            spellCheck="false"
                          />
                          <small className="paper2-working-note">The revised paper requires working to be shown clearly. Method and reasoning marks use the steps entered here.</small>
                        </div>
                      )}
                      <label className="paper2-final-answer-label" htmlFor={`paper2027-answer-${current.question_id}-${part.id}`}>Final answer</label>
                      <div className={`paper2-answer-field ${part.answerType === "text" ? "paper2-written-answer-field" : ""}`}>
                        {part.prefix && <span className="paper2-affix"><MathText>{part.prefix}</MathText></span>}
                        {part.answerType === "text" ? (
                          <textarea
                            id={`paper2027-answer-${current.question_id}-${part.id}`}
                            ref={element => { inputRefs.current[answerKey] = element; }}
                            rows={3}
                            autoComplete="off"
                            spellCheck="true"
                            value={typedResponse.answer}
                            onFocus={() => setActivePartKey(answerKey)}
                            onChange={event => setPartResponse(current.question_id, part.id, { ...typedResponse, answer: event.target.value })}
                            placeholder="Enter your response"
                          />
                        ) : (
                          <input
                            id={`paper2027-answer-${current.question_id}-${part.id}`}
                            ref={element => { inputRefs.current[answerKey] = element; }}
                            type="text"
                            autoComplete="off"
                            spellCheck="false"
                            value={typedResponse.answer}
                            onFocus={() => setActivePartKey(answerKey)}
                            onChange={event => setPartResponse(current.question_id, part.id, { ...typedResponse, answer: event.target.value })}
                            placeholder={part.answerType === "expression" ? "Enter expression" : "Enter answer"}
                          />
                        )}
                        {part.suffix && <span className="paper2-affix"><MathText>{part.suffix}</MathText></span>}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </section>

          <div className="paper2-auto-save"><span>✓</span> Answers save automatically on this device.</div>
          <div className="paper-question-actions paper2027-question-actions">
            <button type="button" className="practice-secondary" disabled={currentIndex === 0} onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}>Previous</button>
            <span className="paper-answer-state">{isQuestionComplete(current, answers) ? "Question complete" : "Complete all parts when you can"}</span>
            <button type="button" className="practice-primary" disabled={currentIndex === 2} onClick={() => goToQuestion(Math.min(2, currentIndex + 1))}>Next question</button>
          </div>
        </section>

        <aside className="paper-navigator paper2-navigator paper-navigator-desktop">
          <div className="paper-navigator-title"><strong>Module 1</strong><span>{completeIds.length}/3 fully answered</span></div>
          <div className="paper2-nav-section"><div className="paper2-nav-section-head"><span>Fundamentals</span><b>30 marks</b></div><div className="paper-nav-grid paper2-nav-grid paper2027-nav-grid">{paper.questions.map((question, index) => <button type="button" key={question.question_id} className={`${index === currentIndex ? "current " : ""}${completeSet.has(question.question_id) ? "answered " : ""}${flaggedSet.has(question.question_id) ? "flagged" : ""}`} onClick={() => goToQuestion(index)}>{question.question_number}</button>)}</div></div>
          <div className="paper2027-nav-profile" aria-label="Assessment profile">
            <span><b>Conceptual Knowledge (CK)</b><strong>9</strong></span>
            <span><b>Algorithmic Knowledge (AK)</b><strong>12</strong></span>
            <span><b>Reasoning (R)</b><strong>9</strong></span>
          </div>
          <button type="button" className="paper-submit-side" onClick={() => setShowSubmit(true)}>Submit Module 1</button>
        </aside>
      </div>

      {showNavigator && (
        <div className="paper-nav-drawer-backdrop" role="presentation" onMouseDown={() => setShowNavigator(false)}>
          <section className="paper-nav-drawer" role="dialog" aria-modal="true" aria-label="Question navigator" onMouseDown={event => event.stopPropagation()}>
            <div className="paper-nav-drawer-head"><div><span>2027 Module 1</span><strong>Questions</strong></div><button type="button" onClick={() => setShowNavigator(false)} aria-label="Close question navigator">×</button></div>
            <div className="paper-nav-grid paper2-nav-grid paper2027-drawer-grid">{paper.questions.map((question, index) => <button type="button" key={question.question_id} className={`${index === currentIndex ? "current " : ""}${completeSet.has(question.question_id) ? "answered " : ""}${flaggedSet.has(question.question_id) ? "flagged" : ""}`} onClick={() => goToQuestion(index)}>{question.question_number}</button>)}</div>
            <div className="paper-nav-drawer-status"><span>{completeIds.length} complete</span><span>{3 - completeIds.length} remaining</span></div>
            <button type="button" className="paper-drawer-submit" onClick={() => { setShowNavigator(false); setShowSubmit(true); }}>Submit Module 1</button>
          </section>
        </div>
      )}

      {showFormula && <FormulaModal onClose={() => setShowFormula(false)} />}

      {showSubmit && (        <div className="paper-modal-backdrop" role="presentation" onMouseDown={() => setShowSubmit(false)}>
          <section className="paper-submit-modal" role="dialog" aria-modal="true" aria-label="Submit Module 1" onMouseDown={event => event.stopPropagation()}>
            <div className="paper-submit-icon">✓</div>
            <h2>Submit Module 1?</h2>
            <p>You have fully answered {completeIds.length} of 3 questions. Once submitted, your responses are marked and this attempt cannot be changed.</p>
            <div className="paper-modal-actions"><button type="button" className="practice-secondary" onClick={() => setShowSubmit(false)}>Keep working</button><button type="button" className="practice-primary" onClick={() => finalize(false)}>Submit module</button></div>
          </section>
        </div>
      )}
    </main>
  );
}
