import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MathText from "./MathText";
import Paper2ResponseInput from "./Paper2ResponseInput";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";
import {
  hasPaper2CxcPartResponse,
  normalizePaper2TypedResponse,
  paper2PartUsesWorking,
  paper2ResponseSummary,
  paper2WorkingSummary,
} from "./paper2CxcGrader";
import {
  PAPER2_DURATION_SECONDS,
  PAPER2_TEMPLATE_COUNT,
  buildPaper2Exam,
  calculatePaper2Mark,
  isPaper2QuestionComplete,
  validatePaper2Exam,
} from "./paper2Engine";
import { paper2ResultToAttempt, savePracticeExamAttempt } from "./persistence";
import "./practiceExam.css";

const ACTIVE_KEY = "spark-paper2-active-v52";
const USED_KEY = "spark-paper2-used-question-ids-v52";
const RESULTS_KEY = "spark-paper2-results-v2";

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
  const hours = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatDuration(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  return h ? `${h} h ${m} min` : `${m} min`;
}

function createSeed() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const SYMBOLS = ["√", "π", "°", "×", "÷", "≤", "≥", "≠", "²", "³", "θ", "≈", "(", ")"];

function MathFraction({ numerator, denominator, ariaLabel }) {
  return (
    <span className="paper2-math-fraction" aria-label={ariaLabel || undefined}>
      <span className="paper2-math-numerator">{numerator}</span>
      <span className="paper2-math-denominator">{denominator}</span>
    </span>
  );
}

function FormulaExpression({ label, children }) {
  return (
    <div className="paper2-formula-expression">
      {label && <span className="paper2-formula-label">{label}</span>}
      <div className="paper2-formula-math">{children}</div>
    </div>
  );
}

const FORMULAE = [
  {
    title: "Solids",
    expressions: [
      <FormulaExpression key="prism-volume" label="Volume of a prism">V = Ah</FormulaExpression>,
      <FormulaExpression key="cylinder-volume" label="Volume of a cylinder">V = πr²h</FormulaExpression>,
      <FormulaExpression key="pyramid-volume" label="Volume of a right pyramid">V = ⅓Ah</FormulaExpression>,
    ],
  },
  {
    title: "Circle and sectors",
    expressions: [
      <FormulaExpression key="circumference" label="Circumference">C = 2πr</FormulaExpression>,
      <FormulaExpression key="arc-length" label="Arc length">S = <MathFraction numerator="θ" denominator="360" ariaLabel="theta divided by 360" /> × 2πr</FormulaExpression>,
      <FormulaExpression key="circle-area" label="Area of a circle">A = πr²</FormulaExpression>,
      <FormulaExpression key="sector-area" label="Area of a sector">A = <MathFraction numerator="θ" denominator="360" ariaLabel="theta divided by 360" /> × πr²</FormulaExpression>,
    ],
  },
  {
    title: "Plane figures",
    expressions: [
      <FormulaExpression key="trapezium-area" label="Area of a trapezium">A = ½(a + b)h</FormulaExpression>,
      <FormulaExpression key="triangle-area" label="Area of a triangle">A = ½bh</FormulaExpression>,
      <FormulaExpression key="triangle-sine-area" label="Area of a triangle">A = ½ab sin C</FormulaExpression>,
      <FormulaExpression key="heron" label="Heron's formula">A = √(s(s − a)(s − b)(s − c))</FormulaExpression>,
      <FormulaExpression key="semiperimeter" label="where">s = (a + b + c) ÷ 2</FormulaExpression>,
      <FormulaExpression key="pythagoras" label="Pythagoras">c² = a² + b²</FormulaExpression>,
    ],
  },
  {
    title: "Trigonometric ratios",
    expressions: [
      <FormulaExpression key="sin" label="Sine">sin θ = <MathFraction numerator="opposite" denominator="hypotenuse" ariaLabel="opposite divided by hypotenuse" /></FormulaExpression>,
      <FormulaExpression key="cos" label="Cosine">cos θ = <MathFraction numerator="adjacent" denominator="hypotenuse" ariaLabel="adjacent divided by hypotenuse" /></FormulaExpression>,
      <FormulaExpression key="tan" label="Tangent">tan θ = <MathFraction numerator="opposite" denominator="adjacent" ariaLabel="opposite divided by adjacent" /></FormulaExpression>,
    ],
  },
  {
    title: "Sine rule",
    expressions: [
      <FormulaExpression key="sine-rule"><MathFraction numerator="a" denominator="sin A" ariaLabel="a divided by sine A" /><span>=</span><MathFraction numerator="b" denominator="sin B" ariaLabel="b divided by sine B" /><span>=</span><MathFraction numerator="c" denominator="sin C" ariaLabel="c divided by sine C" /></FormulaExpression>,
    ],
  },
  {
    title: "Cosine rule",
    expressions: [
      <FormulaExpression key="cosine-rule">c² = a² + b² − 2ab cos C</FormulaExpression>,
    ],
  },
  {
    title: "Quadratic formula",
    expressions: [
      <FormulaExpression key="quadratic">x = <MathFraction numerator={<>−b ± √(b² − 4ac)</>} denominator="2a" ariaLabel="negative b plus or minus square root of b squared minus four a c, divided by two a" /></FormulaExpression>,
    ],
  },
  {
    title: "Coordinate geometry",
    expressions: [
      <FormulaExpression key="gradient" label="Gradient">m = <MathFraction numerator={<>y₂ − y₁</>} denominator={<>x₂ − x₁</>} ariaLabel="y two minus y one divided by x two minus x one" /></FormulaExpression>,
      <FormulaExpression key="distance" label="Distance">d = √((x₂ − x₁)² + (y₂ − y₁)²)</FormulaExpression>,
    ],
  },
];

export function FormulaModal({ onClose }) {
  return (
    <div className="paper-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="paper2-formula-modal" role="dialog" aria-modal="true" aria-label="Mathematics formula sheet" onMouseDown={event => event.stopPropagation()}>
        <div className="paper2-modal-head">
          <div><span>Reference</span><h2>Formula sheet</h2></div>
          <button type="button" onClick={onClose} aria-label="Close formula sheet">×</button>
        </div>
        <div className="paper2-formula-grid">
          {FORMULAE.map(({ title, expressions }) => (
            <article key={title}>
              <strong>{title}</strong>
              <div className="paper2-formula-list">{expressions}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
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
      <table className="paper2-data-table">
        <thead><tr>{table.headers.map((header, index) => <th key={`${String(questionTableCellText(header))}-${index}`}><MathText>{questionTableCellText(header)}</MathText></th>)}</tr></thead>
        <tbody>{table.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}><MathText>{questionTableCellText(cell)}</MathText></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function QuestionDiagram({ diagram }) {
  if (!diagram?.svg) return null;
  return (
    <figure className="paper2-diagram" role="img" aria-label={diagram.alt || "Question diagram"} dangerouslySetInnerHTML={{ __html: diagram.svg }} />
  );
}

function Paper2Stimulus({ stimulus }) {
  if (!stimulus) return null;
  return (
    <div className="paper2-stimulus">
      {stimulus.label && <MathText as="p" className="paper2-stimulus-label">{stimulus.label}</MathText>}
      {stimulus.kind === "figure" && stimulus.svg ? (
        <div className="paper2-stimulus-figure" role="img" aria-label={stimulus.alt || "Question diagram"} dangerouslySetInnerHTML={{ __html: stimulus.svg }} />
      ) : stimulus.kind === "table" && Array.isArray(stimulus.headers) ? (
        <QuestionTable table={stimulus} />
      ) : stimulus.text ? (
        <MathText as="div" prose className="paper2-stimulus-text">{stimulus.text}</MathText>
      ) : null}
    </div>
  );
}

// SPARK_V539L_PART_CONTEXT
function paper2DetachedStemPartId(question) {
  const parts = Array.isArray(question?.parts) ? question.parts : [];
  if (Number(question?.question_number) !== 1 || !question?.stem || parts.length < 2) return null;
  if (!/calculate\s+the\s+exact\s+value/i.test(String(parts[0]?.prompt || ""))) return null;
  const firstConsumerPart = parts.find(part => /^\(b\)/i.test(String(part?.label || "").trim()));
  return firstConsumerPart?.id || null;
}

function Paper2PartContext({ question, part }) {
  const targetPartId = paper2DetachedStemPartId(question);
  if (!targetPartId || String(part?.id) !== String(targetPartId)) return null;
  return (
    <div className="paper2-part-context" role="note" aria-label="Information for part b">
      <MathText as="p">{question.stem}</MathText>
    </div>
  );
}

function QuestionPrompt({ question }) {
  const firstPartOwnsTable = question?.parts?.[0]?.responseSchema?.type === "table";
  const detachedStemPartId = paper2DetachedStemPartId(question);
  return (
    <div className="paper2-question-copy">
      {question.stem && !detachedStemPartId && <MathText as="p" className="paper2-stem">{question.stem}</MathText>}
      <QuestionDiagram diagram={question.diagram} />
      <Paper2Stimulus stimulus={question.stimulus} />
      {!firstPartOwnsTable && <QuestionTable table={question.table} />}
    </div>
  );
}

function Paper2WorkspaceReview({ part, response }) {
  const type = part?.responseSchema?.type;
  const visualTypes = ["graph", "construction", "construction_triangle", "table", "tile_pattern"];
  if (!visualTypes.includes(type)) return null;
  const reference = buildCanonicalPaper2Response(part);
  const noun = type === "graph" ? "graph" : type === "table" ? "table" : type === "tile_pattern" ? "design" : "construction";
  return (
    <div className="paper2-workspace-review-grid">
      <section>
        <span>{`Your ${noun}`}</span>
        <Paper2ResponseInput part={part} value={response} readOnly />
      </section>
      <section className="paper2-model-review">
        <span>{`Correct ${noun}`}</span>
        <Paper2ResponseInput part={part} value={reference} readOnly />
      </section>
    </div>
  );
}

function answeredPartCount(exam, answers) {
  if (!exam) return 0;
  return exam.questions.reduce((sum, question) => sum + question.parts.filter(part => hasPaper2CxcPartResponse(answers?.[question.question_id]?.[part.id], part)).length, 0);
}

function totalPartCount(exam) {
  return exam?.questions?.reduce((sum, question) => sum + question.parts.length, 0) || 0;
}

export default function Paper2Exam({ onExit, startFresh = false, supabase, userId }) {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [remaining, setRemaining] = useState(PAPER2_DURATION_SECONDS);
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

  // SPARK V5.3.4: keep live and review question navigation at the top.
  useEffect(() => {
    if (!started || submitted) return undefined;
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [currentIndex, started, submitted]);

  useEffect(() => {
    if (!submitted) return undefined;
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reviewIndex, submitted]);

  useEffect(() => {
    if (!showNavigator) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = event => {
      if (event.key === "Escape") setShowNavigator(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showNavigator]);

  useEffect(() => {
    const saved = !startFresh ? readJson(ACTIVE_KEY, null) : null;
    if (saved?.exam?.questions?.length === 10 && validatePaper2Exam(saved.exam).valid) {
      setExam(saved.exam);
      setAnswers(saved.answers || {});
      setFlags(saved.flags || []);
      setCurrentIndex(Math.min(9, Math.max(0, saved.currentIndex || 0)));
      setDeadline(saved.deadline || Date.now() + PAPER2_DURATION_SECONDS * 1000);
      setStarted(true);
      return;
    }

    const used = readJson(USED_KEY, []);
    const fresh = buildPaper2Exam({ seed: createSeed(), previouslyUsedQuestionIds: used });
    if (!validatePaper2Exam(fresh).valid) throw new Error("Paper 2 generation failed validation.");
    setExam(fresh);
    localStorage.removeItem(ACTIVE_KEY);
  }, [startFresh]);

  useEffect(() => {
    if (!started || !deadline || submitted) return undefined;
    const tick = () => setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [started, deadline, submitted]);

  useEffect(() => {
    if (!started || submitted || !exam || !deadline) return;
    writeJson(ACTIVE_KEY, { exam, answers, flags, currentIndex, deadline });
  }, [started, submitted, exam, answers, flags, currentIndex, deadline]);

  const current = exam?.questions?.[currentIndex];
  const flaggedSet = useMemo(() => new Set(flags), [flags]);
  const completeIds = useMemo(() => exam ? exam.questions.filter(question => isPaper2QuestionComplete(question, answers)).map(question => question.question_id) : [], [exam, answers]);
  const completeSet = useMemo(() => new Set(completeIds), [completeIds]);
  const partsAnswered = answeredPartCount(exam, answers);
  const partsTotal = totalPartCount(exam);
  const progress = partsTotal ? Math.round((partsAnswered / partsTotal) * 100) : 0;

  const finalize = useCallback((wasTimedOut = false) => {
    if (!exam || submittedRef.current) return;
    submittedRef.current = true;
    const grade = calculatePaper2Mark(answers, exam.questions);
    const usedSeconds = wasTimedOut ? PAPER2_DURATION_SECONDS : Math.min(PAPER2_DURATION_SECONDS, Math.max(0, PAPER2_DURATION_SECONDS - remaining));
    const record = {
      id: exam.id,
      completedAt: new Date().toISOString(),
      usedSeconds,
      questionIds: exam.questions.map(question => question.question_id),
      completedCount: completeIds.length,
      answeredParts: grade.answeredParts,
      correctParts: grade.correctParts,
      totalParts: grade.totalParts,
      score: grade.score,
      percent: grade.percent,
      ecfParts: grade.ecfParts || 0,
      ecfMarks: grade.ecfMarks || 0,
      timedOut: wasTimedOut,
    };
    const previousUsed = readJson(USED_KEY, []);
    writeJson(USED_KEY, [...new Set([...previousUsed, ...record.questionIds])]);
    const results = readJson(RESULTS_KEY, []);
    writeJson(RESULTS_KEY, [record, ...results].slice(0, 20));
    const attempt = paper2ResultToAttempt(record);
    void savePracticeExamAttempt({ supabase, userId, attempt }).catch(() => {});
    localStorage.removeItem(ACTIVE_KEY);
    setTimedOut(wasTimedOut);
    setSubmitted(true);
    setShowSubmit(false);
    setReviewIndex(0);
  }, [exam, answers, remaining, completeIds, supabase, userId]);

  useEffect(() => {
    if (started && remaining === 0 && !submitted) finalize(true);
  }, [started, remaining, submitted, finalize]);

  function beginPaper() {
    const nextDeadline = Date.now() + PAPER2_DURATION_SECONDS * 1000;
    setDeadline(nextDeadline);
    setRemaining(PAPER2_DURATION_SECONDS);
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
    if (!current) return;
    const fallbackPart = current.parts.find(part => !part.responseSchema) || current.parts[0];
    const activeBits = activePartKey?.split(":") || [];
    const questionId = activeBits[0] || current.question_id;
    const partId = activeBits[1] || fallbackPart.id;
    const field = activeBits[2] === "working" ? "working" : "answer";
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

  function toggleFlag() {
    if (!current) return;
    setFlags(previous => previous.includes(current.question_id) ? previous.filter(id => id !== current.question_id) : [...previous, current.question_id]);
  }

  function goToQuestion(index) {
    setCurrentIndex(index);
    setShowNavigator(false);
  }

  function startAnother() {
    const used = readJson(USED_KEY, []);
    const fresh = buildPaper2Exam({ seed: createSeed(), previouslyUsedQuestionIds: used });
    submittedRef.current = false;
    setExam(fresh);
    setAnswers({});
    setFlags([]);
    setCurrentIndex(0);
    setDeadline(null);
    setRemaining(PAPER2_DURATION_SECONDS);
    setStarted(false);
    setSubmitted(false);
    setTimedOut(false);
    setReviewIndex(0);
    setActivePartKey(null);
    localStorage.removeItem(ACTIVE_KEY);
  }

  if (!exam) {
    return <main className="paper-loading"><div className="paper-loader"/><h1>Preparing Paper 2</h1><p>Selecting questions for your examination.</p></main>;
  }

  if (!started && !submitted) {
    return (
      <main className="paper-start-shell paper2-start-shell">
        <button className="paper-text-button" type="button" onClick={onExit}>← Back to Practice</button>
        <section className="paper-start-card paper2-start-card">
          <div className="paper-start-kicker">CSEC Mathematics</div>
          <h1>Paper 2 Practice Examination</h1>
          <p className="paper2-start-sub">A structured practice examination completed and marked within SPARK.</p>
          <div className="paper-start-rule"/>
          <div className="paper-start-meta paper2-start-meta">
            <div><span>Time</span><strong>2 h 40 min</strong></div>
            <div><span>Questions</span><strong>10 compulsory</strong></div>
            <div><span>Marks</span><strong>100</strong></div>
            <div><span>Sections</span><strong>I and II</strong></div>
          </div>
          <div className="paper2-instructions">
            <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
            <ol>
              <li>Answer ALL questions.</li>
              <li>Section I consists of Questions 1 to 7. Section II consists of Questions 8 to 10.</li>
              <li>Enter an answer for each part of each question. Marks are awarded by part.</li>
              <li>Where a Working box is provided, show the main steps of your method. A correct final answer alone does not automatically earn method-dependent accuracy marks.</li>
              <li>Where a question requires a graph, geometrical construction, transformation description or written mathematical reason, use the interactive response workspace provided. Open the How to use panel whenever you need help with the digital controls.</li>
              <li>SPARK awards method, accuracy and independent marks separately. If a later part correctly uses your own earlier numerical answer, eligible follow-through marks are awarded automatically.</li>
              <li>Where an answer is required to a stated degree of accuracy, give the answer as instructed.</li>
              <li>The time allowed is 2 hours 40 minutes. The paper is submitted automatically when the time expires.</li>
            </ol>
          </div>
          <div className="paper2-mab-legend" aria-label="Paper 2 marking guide">
            <strong>How your working is marked</strong>
            <div><b>M</b><span>Method mark for a valid mathematical method or substitution.</span></div>
            <div><b>A</b><span>Accuracy mark for the required result, normally linked to the method mark.</span></div>
            <div><b>B</b><span>Independent mark for a correct fact, statement or result.</span></div>
            <div><b>ECF</b><span>Error carried forward. A later part may still receive marks when you correctly use your own earlier value.</span></div>
          </div>
          <div className="paper2-bank-note">
            <strong>{PAPER2_TEMPLATE_COUNT} structured questions available</strong>
            <span>Each practice paper is assembled by examination position and question design so re-sits vary in structure while preserving the required Paper 2 topic mix and mark allocation.</span>
          </div>
          <div className="paper2-start-actions">
            <button type="button" className="practice-secondary" onClick={() => setShowFormula(true)}>View formula sheet</button>
            <button type="button" className="practice-primary" onClick={beginPaper}>Start examination</button>
          </div>
        </section>
        {showFormula && <FormulaModal onClose={() => setShowFormula(false)} />}
      </main>
    );
  }

  if (submitted) {
    const grade = calculatePaper2Mark(answers, exam.questions);
    const review = exam.questions[reviewIndex];
    const reviewGrade = grade.perQuestion[review.question_id];
    return (
      <main className="paper-results-shell paper2-results-shell">
        <section className="paper-score-hero paper2-score-hero">
          <div>
            <div className="paper-result-kicker">Paper 2 submitted</div>
            <h1>{grade.score}<span>/100</span></h1>
            <p>{timedOut ? "Time expired and SPARK submitted your paper." : `You used ${formatDuration(PAPER2_DURATION_SECONDS - remaining)}.`}</p>
          </div>
          <div className="paper-result-summary paper2-result-summary">
            <div><strong>{completeIds.length}/10</strong><span>questions completed</span></div>
            <div><strong>{partsAnswered}/{partsTotal}</strong><span>parts attempted</span></div>
            <div><strong>{grade.score}/100</strong><span>marks earned</span></div>
            <div><strong>{grade.percent}%</strong><span>final score</span></div>
          </div>
        </section>
        {grade.ecfParts > 0 && (
          <div className="paper2-ecf-summary">
            <strong>Follow-through credit applied</strong>
            <span>{grade.ecfMarks} mark{grade.ecfMarks === 1 ? "" : "s"} across {grade.ecfParts} part{grade.ecfParts === 1 ? "" : "s"} were awarded for correct work using an earlier answer.</span>
          </div>
        )}

        <section className="paper-review-shell paper2-review-shell">
          <div className="paper-review-head paper2-review-head">
            <div><span>Answer review</span><h2>Question {review.question_number}</h2><p>{review.topic}</p></div>
            <div className="paper2-source-chip">{reviewGrade.score}/{review.marks} marks</div>
          </div>
          <QuestionPrompt question={review} />
          <div className="paper2-review-parts">
            {review.parts.map(part => {
              const partGrade = reviewGrade.parts[part.id];
              const response = answers?.[review.question_id]?.[part.id] ?? "";
              const earned = Number(partGrade.marks || 0);
              const stateLabel = partGrade.ecf
                ? earned === part.marks ? "Full credit · ECF" : "Partial credit · ECF"
                : earned === part.marks ? "Correct" : earned > 0 ? "Partial credit" : partGrade.status === "blank" ? "No response" : "Incorrect";
              const stateClass = earned === part.marks ? "is-correct" : earned > 0 ? "is-partial" : "is-incorrect";
              return (
                <article className={`paper2-review-part ${stateClass}`} key={part.id}>
                  <Paper2PartContext question={review} part={part} />
                  <div className="paper2-review-part-head"><strong>{part.label}</strong><span>{stateLabel} · {earned}/{part.marks}</span></div>
                  <MathText as="p">{part.prompt}</MathText>
                  <QuestionDiagram diagram={part.responseSchema?.type === "graph" ? null : part.diagram} />
                  <Paper2Stimulus stimulus={part.stimulus} />
                  {part.responseSchema?.type !== "table" && <QuestionTable table={part.table} />}
                  <Paper2WorkspaceReview part={part} response={response} />
                  {paper2WorkingSummary(response, part) && (
                    <div className="paper2-review-working">
                      <span>Your working</span>
                      <MathText as="div" prose>{paper2WorkingSummary(response, part)}</MathText>
                    </div>
                  )}
                  <div className="paper2-review-answer-grid">
                    <div><span>Your final answer</span><strong>{paper2ResponseSummary(response, part)}</strong></div>
                    <div><span>Mark-scheme answer</span><MathText as="strong">{part.source_answer || part.answer}</MathText></div>
                  </div>
                  {partGrade.criteria?.length > 0 && (
                    <div className="paper2-rubric-breakdown">
                      <span>Mark breakdown</span>
                      {partGrade.criteria.map((criterion, index) => (
                        <div key={`${part.id}-criterion-${index}`} className={criterion.earned ? "earned" : "missed"}>
                          <b className="paper2-mark-code">{criterion.code || (criterion.earned ? "✓" : "○")}</b>
                          <span>
                            {criterion.label || "Rubric criterion"}
                            {criterion.ecf && <em className="paper2-ecf-badge">ECF</em>}
                            {criterion.ecf && criterion.ecfTarget !== null && criterion.ecfTarget !== undefined
                              ? <small>ECF target: {String(criterion.ecfTarget)} · Mark-scheme target: {String(part.source_answer || part.answer)}</small>
                              : criterion.why && <small>{criterion.why}</small>}
                          </span>
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
          <div className="paper2-review-nav">
            <button type="button" disabled={reviewIndex === 0} onClick={() => setReviewIndex(index => Math.max(0, index - 1))}>Previous</button>
            <div className="paper-review-number-group">{exam.questions.map((question, index) => {
              const questionGrade = grade.perQuestion[question.question_id];
              return <button type="button" key={question.question_id} title={`${questionGrade.score}/${question.marks} marks`} className={`${index === reviewIndex ? "active " : ""}${questionGrade.score === question.marks ? "marked" : ""}`} onClick={() => setReviewIndex(index)}>{question.question_number}</button>;
            })}</div>
            <button type="button" disabled={reviewIndex === 9} onClick={() => setReviewIndex(index => Math.min(9, index + 1))}>Next</button>
          </div>
        </section>

        <div className="paper-result-actions">
          <button type="button" className="practice-secondary" onClick={onExit}>Back to Practice</button>
          <button type="button" className="practice-primary" onClick={startAnother}>Start another Paper 2</button>
        </div>
      </main>
    );
  }

  return (
    <main className="paper-exam-shell paper2-exam-shell">
      <header className="paper-exam-header paper2-exam-header">
        <div className="paper2-brand-wrap">
          <button type="button" className="paper2-back-control" onClick={onExit}>← Practice</button>
          <div className="paper-exam-brand"><strong>SPARK</strong><div><span>CSEC Mathematics</span><b>Paper 2 Simulation</b></div></div>
        </div>
        <div className={`paper-timer ${remaining <= 600 ? "is-low" : ""}`}><span>Time remaining</span><strong>{formatClock(remaining)}</strong></div>
        <div className="paper2-header-actions">
          <button type="button" className="paper2-formula-control" onClick={() => setShowFormula(true)}>Formula sheet</button>
          <button type="button" className="paper-nav-toggle" aria-expanded={showNavigator} onClick={() => setShowNavigator(true)}>Questions {currentIndex + 1}/10</button>
          <button type="button" className="paper-submit-top" onClick={() => setShowSubmit(true)}>Submit paper</button>
        </div>
      </header>
      <div className="paper-progress-line"><span style={{ width: `${progress}%` }} /></div>

      <div className="paper-exam-layout paper2-exam-layout">
        <section className="paper-question-card paper2-question-card">
          <div className="paper-question-topline">
            <div><span>Section {current.section}</span><strong>Question {current.question_number} of 10</strong></div>
            <button type="button" className={`paper-flag ${flaggedSet.has(current.question_id) ? "is-flagged" : ""}`} onClick={toggleFlag}>{flaggedSet.has(current.question_id) ? "Flagged" : "Flag for review"}</button>
          </div>
          <div className="paper2-question-meta">
            <span>{current.topic}</span><b>{current.marks} marks</b><em>Practice examination question</em>
          </div>

          <QuestionPrompt question={current} />

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
                  <Paper2PartContext question={current} part={part} />
                  <div className="paper2-part-heading"><strong>{part.label}</strong><span>{part.marks} {part.marks === 1 ? "mark" : "marks"}</span></div>
				  <MathText as="p">{part.prompt}</MathText>
                  <QuestionDiagram diagram={part.responseSchema?.type === "graph" ? null : part.diagram} />
                  <Paper2Stimulus stimulus={part.stimulus} />
                  {part.responseSchema?.type !== "table" && <QuestionTable table={part.table} />}
					{part.inputHint && (
					  <small className="paper2-input-hint">
						Answer format: {part.inputHint}
					  </small>
					)}
					{part.responseSchema ? (
                     <Paper2ResponseInput
                       part={part}
                       value={answers?.[current.question_id]?.[part.id]}
                       onChange={value => setPartResponse(current.question_id, part.id, value)}
                     />
                   ) : (
                     <>
                       {usesWorking && (
                         <div className="paper2-working-editor">
                           <label htmlFor={`paper2-working-${current.question_id}-${part.id}`}>Working</label>
                           <textarea
                             id={`paper2-working-${current.question_id}-${part.id}`}
                             ref={element => { inputRefs.current[workingKey] = element; }}
                             rows={4}
                             value={typedResponse.working}
                             onFocus={() => setActivePartKey(workingKey)}
                             onChange={event => setPartResponse(current.question_id, part.id, { ...typedResponse, working: event.target.value })}
                             placeholder="Show your main mathematical steps"
                             spellCheck="false"
                           />
                           <small className="paper2-working-note">Method marks are awarded from the mathematical steps you show here. You may use the symbol toolbar above.</small>
                           {typedResponse.working.trim() && (
                             <div className="paper2-working-preview">
                               <span>Working preview</span>
                               <MathText as="div" prose>{typedResponse.working}</MathText>
                             </div>
                           )}
                         </div>
                       )}
                       <label className="paper2-final-answer-label" htmlFor={`paper2-answer-${current.question_id}-${part.id}`}>Final answer</label>
                       <div className={`paper2-answer-field ${part.responseType === "written" ? "paper2-written-answer-field" : ""}`}>
                         {part.prefix && <span className="paper2-affix"><MathText>{part.prefix}</MathText></span>}
                         {part.responseType === "written" ? (
                           <textarea
                             id={`paper2-answer-${current.question_id}-${part.id}`}
                             ref={element => { inputRefs.current[answerKey] = element; }}
                             rows={3}
                             autoComplete="off"
                             spellCheck="true"
                             value={typedResponse.answer}
                             onFocus={() => setActivePartKey(answerKey)}
                             onChange={event => setPartResponse(current.question_id, part.id, { ...typedResponse, answer: event.target.value })}
                             placeholder="Write your mathematical reason or explanation"
                           />
                         ) : (
                           <input
                             id={`paper2-answer-${current.question_id}-${part.id}`}
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
                       {typedResponse.answer.trim() && (
                         <div className="paper2-answer-preview">
                           <span>Math preview</span>
                           <MathText as="div">{typedResponse.answer}</MathText>
                         </div>
                       )}
                     </>
                   )}
                </article>
              );
            })}
          </section>

          <div className="paper2-auto-save"><span>✓</span> Answers save automatically on this device.</div>

          <div className="paper-question-actions paper2-question-actions">
            <button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex(index => Math.max(0, index - 1))}>Previous</button>
            <div className="paper-answer-state">{completeIds.length} of 10 complete · {partsAnswered}/{partsTotal} answer fields filled</div>
            <button type="button" className="paper-next" disabled={currentIndex === 9} onClick={() => setCurrentIndex(index => Math.min(9, index + 1))}>Next question</button>
          </div>
        </section>

        <aside className="paper-navigator paper2-navigator paper-navigator-desktop">
          <div className="paper-nav-head"><strong>Question navigator</strong><span>{completeIds.length}/10 fully answered</span></div>
          <div className="paper2-section-label"><span>Section I</span><b>64 marks</b></div>
          <div className="paper-nav-grid paper2-nav-grid">
            {exam.questions.slice(0, 7).map((question, index) => <button type="button" key={question.question_id} title={`${question.marks} marks`} className={`${completeSet.has(question.question_id) ? "answered " : ""}${flaggedSet.has(question.question_id) ? "flagged " : ""}${index === currentIndex ? "current" : ""}`} onClick={() => goToQuestion(index)}>{question.question_number}</button>)}
          </div>
          <div className="paper2-section-label"><span>Section II</span><b>36 marks</b></div>
          <div className="paper-nav-grid paper2-nav-grid paper2-nav-grid-small">
            {exam.questions.slice(7).map((question, offset) => {
              const index = offset + 7;
              return <button type="button" key={question.question_id} title={`${question.marks} marks`} className={`${completeSet.has(question.question_id) ? "answered " : ""}${flaggedSet.has(question.question_id) ? "flagged " : ""}${index === currentIndex ? "current" : ""}`} onClick={() => goToQuestion(index)}>{question.question_number}</button>;
            })}
          </div>
          <div className="paper-nav-legend"><span><i className="answered"/>Complete</span><span><i className="flagged"/>Flagged</span><span><i/>Incomplete</span></div>
          <div className="paper2-navigator-summary"><span>Paper total</span><strong>100 marks</strong><small>2 h 40 min</small></div>
          <button type="button" className="paper-submit-side" onClick={() => setShowSubmit(true)}>Submit Paper 2</button>
        </aside>
      </div>

      {showNavigator && (
        <div className="paper-nav-drawer-backdrop" role="presentation" onMouseDown={() => setShowNavigator(false)}>
          <div className="paper-nav-drawer" role="dialog" aria-modal="true" aria-label="Question navigator" onMouseDown={event => event.stopPropagation()}>
            <div className="paper-nav-drawer-head">
              <div><strong>Questions</strong><span>{completeIds.length}/10 fully answered</span></div>
              <button type="button" onClick={() => setShowNavigator(false)} aria-label="Close question navigator">×</button>
            </div>
            <aside className="paper-navigator paper2-navigator paper-navigator-drawer-panel">
              <div className="paper2-section-label"><span>Section I</span><b>64 marks</b></div>
              <div className="paper-nav-grid paper2-nav-grid">
                {exam.questions.slice(0, 7).map((question, index) => <button type="button" key={question.question_id} title={`${question.marks} marks`} className={`${completeSet.has(question.question_id) ? "answered " : ""}${flaggedSet.has(question.question_id) ? "flagged " : ""}${index === currentIndex ? "current" : ""}`} onClick={() => goToQuestion(index)}>{question.question_number}</button>)}
              </div>
              <div className="paper2-section-label"><span>Section II</span><b>36 marks</b></div>
              <div className="paper-nav-grid paper2-nav-grid paper2-nav-grid-small">
                {exam.questions.slice(7).map((question, offset) => {
                  const index = offset + 7;
                  return <button type="button" key={question.question_id} title={`${question.marks} marks`} className={`${completeSet.has(question.question_id) ? "answered " : ""}${flaggedSet.has(question.question_id) ? "flagged " : ""}${index === currentIndex ? "current" : ""}`} onClick={() => goToQuestion(index)}>{question.question_number}</button>;
                })}
              </div>
              <div className="paper-nav-legend"><span><i className="answered"/>Complete</span><span><i className="flagged"/>Flagged</span><span><i/>Incomplete</span></div>
              <div className="paper2-navigator-summary"><span>Paper total</span><strong>100 marks</strong><small>2 h 40 min</small></div>
              <button type="button" className="paper-drawer-submit" onClick={() => { setShowNavigator(false); setShowSubmit(true); }}>Submit Paper 2</button>
            </aside>
          </div>
        </div>
      )}

      {showSubmit && (
        <div className="paper-modal-backdrop">
          <section className="paper-submit-modal">
            <div className="paper-submit-icon">✓</div>
            <h2>Submit Paper 2?</h2>
            <p>You fully answered {completeIds.length} of 10 questions and filled {partsAnswered} of {partsTotal} answer fields. SPARK will grade the paper immediately.</p>
            <div className="paper-modal-actions"><button type="button" className="practice-secondary" onClick={() => setShowSubmit(false)}>Return to paper</button><button type="button" className="practice-primary" onClick={() => finalize(false)}>Submit paper</button></div>
          </section>
        </div>
      )}
      {showFormula && <FormulaModal onClose={() => setShowFormula(false)} />}
    </main>
  );
}
