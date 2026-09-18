import React, { useEffect, useMemo, useRef, useState } from "react";
import bank from "./itPaper2Data.json";
import InformationTechnologyQuestionVisual from "./InformationTechnologyQuestionVisual";
import {
  informationTechnologyResponseText,
  markInformationTechnologyPaper2,
} from "./itPaper2Marking";

const ACTIVE_KEY = "spark-it-paper2-active-v3";
const LEGACY_KEYS = ["spark-it-paper2-active-v2", "spark-it-paper2-active-v1"];
const RESULTS_KEY = "spark-it-paper2-results-v1";
const HISTORY_KEY = "spark-it-paper2-history-v2";
const DURATION = 120 * 60;

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readActive() {
  return readJson(ACTIVE_KEY, null) || LEGACY_KEYS.map(key => readJson(key, null)).find(Boolean) || null;
}

function clearActive() {
  localStorage.removeItem(ACTIVE_KEY);
  LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
}

function choosePaper() {
  const ids = bank.papers.map(item => item.id);
  let history = readJson(HISTORY_KEY, []).filter(id => ids.includes(id));
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

function partKey(questionNumber, partId) {
  return `${questionNumber}-${partId}`;
}

function asResponse(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  return { answer: String(value ?? "") };
}

function responseAnswered(part, value) {
  const response = asResponse(value);
  if (part.responseType === "ipo") {
    return Object.values(response.ipo || {}).some(item => String(item || "").trim());
  }
  if (part.responseType === "field-table") {
    return Object.values(response.table || {}).some(item => String(item || "").trim());
  }
  if (part.responseType === "pseudocode") return Boolean(String(response.pseudocode || response.answer || "").trim());
  return Boolean(String(response.answer || "").trim());
}

function ResponsePreview({ part, value }) {
  const response = asResponse(value);
  if (part.responseType === "ipo") {
    return <div className="it-response-preview-table">
      <div><strong>Input</strong><span>{response.ipo?.input || "No response"}</span></div>
      <div><strong>Process</strong><span>{response.ipo?.process || "No response"}</span></div>
      <div><strong>Output</strong><span>{response.ipo?.output || "No response"}</span></div>
    </div>;
  }
  if (part.responseType === "field-table") {
    return <div className="it-response-preview-table">
      {(part.responseSpec?.fields || []).map(field => <div key={field}><strong>{field}</strong><span>{response.table?.[field] || "No response"}</span></div>)}
    </div>;
  }
  return <p>{informationTechnologyResponseText(response) || "No answer entered."}</p>;
}

function PartResponseEditor({ part, value, onChange }) {
  const response = asResponse(value);
  const update = patch => onChange({ ...response, ...patch });

  if (part.responseType === "ipo") {
    const ipo = response.ipo || {};
    return <div className="it-fillable-table-wrap">
      <table className="it-fillable-response-table">
        <thead><tr><th>Input</th><th>Process</th><th>Output</th></tr></thead>
        <tbody><tr>
          {["input","process","output"].map(field => <td key={field}><textarea aria-label={`IPO ${field}`} value={ipo[field] || ""} onChange={event => update({ ipo: { ...ipo, [field]: event.target.value } })}/></td>)}
        </tr></tbody>
      </table>
      <small>Complete the IPO chart directly in the table.</small>
    </div>;
  }

  if (part.responseType === "field-table") {
    const table = response.table || {};
    return <div className="it-fillable-table-wrap">
      <table className="it-fillable-response-table compact">
        <thead><tr><th>Field</th><th>Data type</th></tr></thead>
        <tbody>{(part.responseSpec?.fields || []).map(field => <tr key={field}><th>{field}</th><td><input value={table[field] || ""} onChange={event => update({ table: { ...table, [field]: event.target.value } })} placeholder={`Enter data type for ${field}`}/></td></tr>)}</tbody>
      </table>
    </div>;
  }

  if (part.responseType === "formula") {
    return <div className="it-formula-answer-row">
      <span className="it-formula-cell">{part.responseSpec?.cell || "fx"}</span>
      <input className="it-formula-answer" value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder="= enter formula or function"/>
    </div>;
  }

  if (part.responseType === "query") {
    return <div className="it-query-answer">
      <span>Criteria</span>
      <input value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder={`Example format: Field="Value" AND Field2="Value"`}/>
    </div>;
  }

  if (part.responseType === "pseudocode") {
    return <textarea className="it-pseudocode-answer" value={response.pseudocode || response.answer || ""} onChange={event => update({ pseudocode: event.target.value, answer: "" })} placeholder={"Write language-neutral pseudocode here.\nUse one statement per line where possible."}/>;
  }

  if (part.responseType === "short") {
    return <input className="it-short-answer" value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder="Enter your answer"/>;
  }

  return <textarea value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder="Enter your answer here"/>;
}

export default function InformationTechnologyPaper2Exam({ onExit, startFresh = false, onActivity }) {
  const [phase, setPhase] = useState("instructions");
  const [active, setActive] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [grading, setGrading] = useState(null);
  const [remaining, setRemaining] = useState(DURATION);
  const [showExit, setShowExit] = useState(false);
  const submittedRef = useRef(false);

  const paper = useMemo(() => bank.papers.find(item => item.id === active?.paperId) || null, [active]);
  const question = paper?.questions?.[questionIndex] || null;

  useEffect(() => {
    if (startFresh) return;
    const saved = readActive();
    if (!saved?.paperId || !bank.papers.some(item => item.id === saved.paperId)) return;
    setActive(saved);
    setAnswers(saved.answers || {});
    setFlags(saved.flags || {});
    setQuestionIndex(Math.min(saved.questionIndex || 0, 3));
    setRemaining(Math.max(0, DURATION - Math.floor((Date.now() - saved.startedAt) / 1000)));
    setPhase(saved.phase === "marking" ? "exam" : (saved.phase || "exam"));
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
    if (phase === "exam" && remaining === 0 && active && !submittedRef.current) beginMarking(true);
  }, [remaining, phase, active]);

  function persist(next) {
    setActive(next);
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(next));
    LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
  }

  function start() {
    clearActive();
    const selected = choosePaper();
    const next = {
      paperId: selected.id,
      startedAt: Date.now(),
      answers: {},
      flags: {},
      questionIndex: 0,
      phase: "exam",
    };
    persist(next);
    setAnswers({});
    setFlags({});
    setGrading(null);
    setQuestionIndex(0);
    setRemaining(DURATION);
    submittedRef.current = false;
    setPhase("exam");
  }

  function updateAnswer(key, value) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    persist({ ...active, answers: next, flags, questionIndex, phase: "exam" });
  }

  function go(nextIndex) {
    setQuestionIndex(nextIndex);
    persist({ ...active, answers, flags, questionIndex: nextIndex, phase: "exam" });
  }

  function toggleFlag() {
    if (!question) return;
    const key = String(question.number);
    const nextFlags = { ...flags, [key]: !flags[key] };
    if (!nextFlags[key]) delete nextFlags[key];
    setFlags(nextFlags);
    persist({ ...active, answers, flags: nextFlags, questionIndex, phase: "exam" });
  }

  function saveAndExit() {
    persist({ ...active, answers, flags, questionIndex, phase: "exam" });
    setShowExit(false);
    onExit?.();
  }

  function beginMarking(timedOut = false) {
    if (!paper || submittedRef.current) return;
    submittedRef.current = true;
    const result = markInformationTechnologyPaper2(paper, answers);
    setGrading(result);
    persist({ ...active, answers, flags, questionIndex: 0, phase: "review", timedOut });
    setQuestionIndex(0);
    setPhase("marking");
  }

  function finishMarking() {
    if (!paper) return;
    const result = grading || markInformationTechnologyPaper2(paper, answers);
    const record = {
      paperId: paper.id,
      paperTitle: paper.title,
      score: result.marks,
      percent: Math.round((result.marks / 90) * 100),
      completedAt: new Date().toISOString(),
      answers,
      flags,
      marks: Object.fromEntries(Object.entries(result.parts).map(([key, value]) => [key, value.earned])),
      profiles: result.profiles,
      grading: result,
      timedOut: Boolean(active?.timedOut),
      durationSeconds: DURATION - remaining,
    };
    const results = readJson(RESULTS_KEY, []);
    localStorage.setItem(RESULTS_KEY, JSON.stringify([record, ...results].slice(0, 20)));
    try {
      onActivity?.({
        type: "it_paper2_exam",
        paperId: record.paperId,
        paperTitle: record.paperTitle,
        score: record.score,
        maxScore: 90,
        percent: record.percent,
        profiles: record.profiles,
        timedOut: record.timedOut,
        durationSeconds: record.durationSeconds,
        at: record.completedAt,
      });
    } catch (error) {
      console.warn("IT Paper 2 progress was not synced", error);
    }
    clearActive();
    setGrading(result);
    setPhase("result");
  }

  if (phase === "instructions") {
    return (
      <main className="it-exam">
        <section className="it-exam-instructions it-instruction-sheet">
          <div className="it-instruction-kicker">SPARK PRACTICE EXAMINATION</div>
          <div className="it-instruction-subject">CSEC Information Technology</div>
          <h1>Paper 02</h1>
          <div className="it-instruction-time">2 hours</div>

          <div className="it-instruction-grid">
            <div><strong>4</strong><span>compulsory questions</span></div>
            <div><strong>120</strong><span>minutes</span></div>
            <div><strong>90</strong><span>marks</span></div>
          </div>

          <section className="it-instruction-rules">
            <h2>Instructions</h2>
            <ol>
              <li>Answer <strong>ALL FOUR questions</strong>.</li>
              <li>Read each scenario and all accompanying tables, diagrams, worksheets, database structures, algorithms, forms or other stimulus carefully before answering the parts that follow.</li>
              <li>Enter each response in the answer area provided. Where SPARK provides a table, worksheet cell or IPO chart, enter the response directly in that structure.</li>
              <li>Where a calculation, formula, query, algorithm or pseudocode solution is required, show the information needed to earn the available marks.</li>
              <li>Programming questions use language-neutral logic. You are not required to reproduce one specific programming language unless the question explicitly provides code to interpret.</li>
              <li>You may move between the four questions. Use <strong>Flag question</strong> to mark a question for review.</li>
              <li>Use <strong>Exit paper</strong> if you need to leave. SPARK saves your responses, flags and position so that you can resume later. The examination timer continues from the original start time.</li>
              <li>When finished, select <strong>Submit paper</strong>. SPARK marks the response point-by-point using the authored mark scheme and its canonical-answer bank, including accepted equivalent wording and valid alternative forms.</li>
            </ol>
          </section>

          <section className="it-paper2-profile-table" aria-label="Paper 02 mark allocation">
            <div><strong>Question 1</strong><span>20 marks</span></div>
            <div><strong>Question 2</strong><span>20 marks</span></div>
            <div><strong>Question 3</strong><span>25 marks</span></div>
            <div><strong>Question 4</strong><span>25 marks</span></div>
          </section>

          <section className="it-instruction-note">
            <strong>Profile allocation</strong>
            <p>Each SPARK Paper 02 contains 35 Theory marks, 30 Productivity Tools marks and 25 Problem-Solving and Programming marks. SPARK rotates through nine complete practice papers before repeating a paper.</p>
          </section>

          <div className="it-practice-actions it-instruction-actions">
            <button className="it-practice-secondary" type="button" onClick={onExit}>Back to IT Practice</button>
            <button className="it-practice-primary" type="button" onClick={start}>Start Paper 2</button>
          </div>
        </section>
      </main>
    );
  }

  if (!paper) return null;

  if (phase === "result") {
    const result = grading || markInformationTechnologyPaper2(paper, answers);
    return (
      <main className="it-exam">
        <section className="it-result-hero">
          <div className="it-practice-eyebrow">{paper.title} complete</div>
          <h1>{result.marks}/90</h1>
          <p>{Math.round((result.marks / 90) * 100)}%</p>
          <div className="it-profile-results">
            <div><span>Theory</span><strong>{result.profiles.Theory}/35</strong></div>
            <div><span>Productivity Tools</span><strong>{result.profiles["Productivity Tools"]}/30</strong></div>
            <div><span>Problem-Solving & Programming</span><strong>{result.profiles["Problem-Solving and Programming"]}/25</strong></div>
          </div>
          <button className="it-practice-primary" type="button" onClick={onExit}>Back to IT Practice</button>
        </section>
      </main>
    );
  }

  if (phase === "marking") {
    const result = grading || markInformationTechnologyPaper2(paper, answers);
    const allParts = paper.questions.flatMap(item => item.parts.map(p => ({ questionNumber: item.number, ...p })));

    return (
      <main className="it-exam">
        <header className="it-exam-topbar">
          <div><strong>SPARK marking review</strong><span>{paper.title} · Marked point-by-point against the authored scheme</span></div>
          <div className="it-mark-total">{result.marks}/90</div>
        </header>
        <div className="it-mark-profile-strip">
          <span>Theory {result.profiles.Theory}/35</span>
          <span>Productivity Tools {result.profiles["Productivity Tools"]}/30</span>
          <span>Problem-Solving & Programming {result.profiles["Problem-Solving and Programming"]}/25</span>
        </div>
        <section className="it-marking-list">
          {allParts.map(item => {
            const key = partKey(item.questionNumber, item.id);
            const evaluation = result.parts[key];
            return (
              <article className="it-marking-item" key={key}>
                <div className="it-marking-head">
                  <strong>Question {item.questionNumber} ({item.id})</strong>
                  <span>{evaluation.earned}/{item.marks} · {item.profile}</span>
                </div>
                <p className="it-marking-prompt">{item.prompt}</p>
                <div className="it-your-answer"><strong>Your answer</strong><ResponsePreview part={item} value={answers[key]}/></div>
                <div className="it-auto-mark-summary">
                  <strong>SPARK mark: {evaluation.earned}/{item.marks}</strong>
                  <span>Canonical rule: {evaluation.rule}</span>
                </div>
                <div className="it-criterion-review">
                  {evaluation.criteria.map(row => (
                    <div className={row.correct ? "met" : "missed"} key={row.code}>
                      <span>{row.correct ? "✓" : "○"}</span>
                      <div><strong>{row.earned}/{row.marks} · {row.description}</strong><p>{row.why}</p></div>
                    </div>
                  ))}
                </div>
                <div className="it-mark-scheme"><strong>Authored mark scheme</strong><ul>{item.markScheme.map((point, i) => <li key={i}>{point}</li>)}</ul></div>
              </article>
            );
          })}
          <button className="it-practice-primary it-finish-marking" type="button" onClick={finishMarking}>Save result</button>
        </section>
      </main>
    );
  }

  if (!question) return null;

  const totalParts = paper.questions.reduce((sum, item) => sum + item.parts.length, 0);
  const answeredParts = paper.questions.reduce((sum, item) => sum + item.parts.filter(p => responseAnswered(p, answers[partKey(item.number, p.id)])).length, 0);
  const flaggedCount = paper.questions.filter(item => flags[String(item.number)]).length;
  const currentFlagged = Boolean(flags[String(question.number)]);

  return (
    <main className="it-exam">
      <header className="it-exam-topbar">
        <div>
          <strong>Paper 02</strong>
          <span>Question {question.number} of 4 · {question.totalMarks} marks · {paper.title}</span>
        </div>
        <div className="it-exam-top-actions">
          <button type="button" className="it-exit-paper" onClick={() => setShowExit(true)}>Exit paper</button>
          <div className={remaining < 600 ? "it-timer urgent" : "it-timer"}>{formatTime(remaining)}</div>
        </div>
      </header>

      <div className="it-exam-layout">
        <aside className="it-question-nav">
          <div className="it-nav-summary">
            <div><strong>{answeredParts}/{totalParts}</strong><span>parts answered</span></div>
            <div><strong>{flaggedCount}</strong><span>flagged</span></div>
          </div>
          <div className="it-p2-nav">
            {paper.questions.map((item, i) => (
              <button
                type="button"
                key={item.number}
                className={[
                  i === questionIndex ? "current" : "",
                  flags[String(item.number)] ? "flagged" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => go(i)}
              >
                <span>Question {item.number}{flags[String(item.number)] && <b className="it-nav-flag" aria-hidden="true">⚑</b>}</span>
                <span>{item.totalMarks} marks</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="it-question-card">
          <div className="it-question-heading-row">
            <div className="it-question-meta">Question {question.number} · {question.totalMarks} marks</div>
            <button type="button" className={`it-flag-question ${currentFlagged ? "active" : ""}`} onClick={toggleFlag} aria-pressed={currentFlagged}>
              <span aria-hidden="true">⚑</span>{currentFlagged ? "Flagged" : "Flag question"}
            </button>
          </div>

          <div className="it-scenario">{question.scenario}</div>
          <InformationTechnologyQuestionVisual visual={question.visual}/>

          <div className="it-structured-parts">
            {question.parts.map(p => {
              const key = partKey(question.number, p.id);
              return (
                <div className="it-structured-part" key={key}>
                  <div className="it-part-head"><strong>({p.id})</strong><span>{p.marks} mark{p.marks === 1 ? "" : "s"}</span></div>
                  <p>{p.prompt}</p>
                  <PartResponseEditor part={p} value={answers[key]} onChange={value => updateAnswer(key, value)}/>
                </div>
              );
            })}
          </div>

          <div className="it-exam-actions">
            <button className="it-practice-secondary" type="button" disabled={questionIndex === 0} onClick={() => go(questionIndex - 1)}>Previous</button>
            {questionIndex < 3
              ? <button className="it-practice-primary" type="button" onClick={() => go(questionIndex + 1)}>Next</button>
              : <button className="it-practice-primary" type="button" onClick={() => beginMarking(false)}>Submit paper</button>}
          </div>
          {questionIndex < 3 && <button type="button" className="it-submit-link" onClick={() => beginMarking(false)}>Submit paper now</button>}
        </section>
      </div>

      {showExit && (
        <div className="it-exit-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setShowExit(false); }}>
          <div className="it-exit-dialog" role="dialog" aria-modal="true" aria-labelledby="it-p2-exit-title">
            <div className="it-practice-eyebrow">Leave Paper 02?</div>
            <h2 id="it-p2-exit-title">Your progress will be saved.</h2>
            <p>You have answered {answeredParts} of {totalParts} parts and flagged {flaggedCount} question{flaggedCount === 1 ? "" : "s"}. You can return to IT Practice and resume this paper later. The examination timer continues from the original start time.</p>
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
