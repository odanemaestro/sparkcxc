import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MathText from "../../../practice/MathText";
import Paper2ResponseInput from "../../../practice/Paper2ResponseInput";
import "../../../practice/practiceExam.css";
import {
  PHYSICS_PAPER2_PAPERS,
  PHYSICS_PAPER2_DURATION_MINUTES,
  getPhysicsPaper2Paper,
  physicsPaper2MarkingCoverage,
  physicsPaper2PaperNumber,
  physicsPaper2PaperLetter,
  physicsPaper2PaperName,
  physicsPaper2PartKey,
  physicsPaper2Topics,
  readPhysicsPaper2Active,
  readPhysicsPaper2Results,
  savePhysicsPaper2Active,
  savePhysicsPaper2Result,
} from "../physicsPaper2Bank";
import { markPhysicsPaper2, modelResponsesForPhysicsPaper2 } from "../physicsPaper2Marking";
import "./physicsPaper2.css";

function formatTime(totalSeconds) {
  const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function responseHasContent(response = {}) {
  if (String(response.answer || "").trim() || String(response.working || "").trim()) return true;
  if (Object.values(response.table || {}).some(value => String(value || "").trim())) return true;
  if ((response.graph?.points || []).length || (response.graph?.line || []).length) return true;
  if (["axisXLabel","axisYLabel","axisXMin","axisXMax","axisXStep","axisYMin","axisYMax","axisYStep"].some(key => String(response.graph?.[key] ?? "").trim())) return true;
  return false;
}

function SourceTable({ table }) {
  if (!table) return null;
  return <div className="phy-p2-table-wrap" tabIndex="0" aria-label={`${table.caption || "Data table"}, scroll horizontally if needed`}>
    <table className="phy-p2-table">
      {table.caption && <caption>{table.caption}</caption>}
      <thead><tr>{(table.headers || []).map((header, index) => <th key={`${header}-${index}`} scope="col"><MathText prose>{header}</MathText></th>)}</tr></thead>
      <tbody>{(table.rows || []).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}><MathText prose>{cell || "—"}</MathText></td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function physicsResponseSchema(part) {
  if (part?.responseType === "table" && part.table) {
    const headers = part.table.headers || [];
    let blankCount = 0;
    const rows = (part.table.rows || []).map((row, rowIndex) => row.map((cell, cellIndex) => {
      if (cell !== "") return cell;
      blankCount += 1;
      return {
        key: `${rowIndex}:${cellIndex}`,
        label: `${headers[cellIndex] || `Column ${cellIndex + 1}`}, row ${rowIndex + 1}`,
        placeholder: "?",
      };
    }));
    return { type: "table", headers, rows, blankCount };
  }
  if (part?.responseType === "graph" && part.grid) {
    return {
      type: "graph",
      graph: {
        xMin: Number(part.grid.xMin), xMax: Number(part.grid.xMax),
        yMin: Number(part.grid.yMin), yMax: Number(part.grid.yMax),
        xStep: Number(part.grid.xStep), yStep: Number(part.grid.yStep),
        minorPerStep: Number(part.grid.minorPerStep || 5),
        xLabel: part.grid.xLabel, yLabel: part.grid.yLabel,
        mode: "scatter_line",
        tools: ["point", "line"],
        axisSetupMode: "custom",
        allowCustomAxes: true,
        requireAxisSetup: true,
      },
    };
  }
  return null;
}

function toSharedWorkspaceValue(part, response = {}) {
  if (part?.responseType === "table") return { cells: response.table || {} };
  if (part?.responseType === "graph") return {
    points: response.graph?.points || [],
    linePoints: response.graph?.line || [],
    axisXLabel: response.graph?.axisXLabel ?? "",
    axisYLabel: response.graph?.axisYLabel ?? "",
    axisXMin: response.graph?.axisXMin ?? "",
    axisXMax: response.graph?.axisXMax ?? "",
    axisXStep: response.graph?.axisXStep ?? "",
    axisYMin: response.graph?.axisYMin ?? "",
    axisYMax: response.graph?.axisYMax ?? "",
    axisYStep: response.graph?.axisYStep ?? "",
  };
  return {};
}

function fromSharedWorkspaceValue(part, response = {}, shared = {}) {
  if (part?.responseType === "table") return { ...response, table: shared.cells || {} };
  if (part?.responseType === "graph") return { ...response, graph: {
    points: shared.points || [],
    line: shared.linePoints || [],
    axisXLabel: shared.axisXLabel ?? "",
    axisYLabel: shared.axisYLabel ?? "",
    axisXMin: shared.axisXMin ?? "",
    axisXMax: shared.axisXMax ?? "",
    axisXStep: shared.axisXStep ?? "",
    axisYMin: shared.axisYMin ?? "",
    axisYMax: shared.axisYMax ?? "",
    axisYStep: shared.axisYStep ?? "",
  } };
  return response;
}

function PhysicsResponseWorkspace({ part, response = {}, onChange = () => {}, readOnly = false }) {
  const responseSchema = physicsResponseSchema(part);
  if (!responseSchema) return null;
  const sharedPart = { ...part, responseSchema };
  return <div className="phy-p2-shared-workspace">
    <Paper2ResponseInput
      part={sharedPart}
      value={toSharedWorkspaceValue(part, response)}
      onChange={value => onChange(fromSharedWorkspaceValue(part, response, value))}
      readOnly={readOnly}
    />
  </div>;
}

function Diagram({ diagram }) {
  if (!diagram?.svg) return null;
  return <figure className="phy-p2-diagram">
    <div className="phy-p2-diagram-art" role="img" aria-label={diagram.alt || diagram.label || "Physics diagram"} dangerouslySetInnerHTML={{ __html: diagram.svg }}/>
    {diagram.label && <figcaption>{diagram.label}</figcaption>}
  </figure>;
}

function PartResponse({ part, response, disabled, onChange }) {
  const update = patch => onChange({ ...response, ...patch });
  const visualResponse = part.responseType === "table" || part.responseType === "graph";
  return <div className="phy-p2-response-area">
    {part.given?.length ? <div className="phy-p2-given"><strong>Given</strong>{part.given.map((item, index) => <MathText key={index} as="div" prose>{item}</MathText>)}</div> : null}
    {part.blanks?.length ? <div className="phy-p2-blanks">{part.blanks.map((line, index) => <MathText key={index} as="div" prose>{line}</MathText>)}</div> : null}
    {visualResponse ? <PhysicsResponseWorkspace part={part} response={response} onChange={onChange}/> : <>
      <label className="phy-p2-answer-field"><span>{part.answerType === "value" ? "Answer" : "Your response"}</span>{part.answerType === "value" ? <input type="text" disabled={disabled} value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder="Include the unit where required"/> : <textarea disabled={disabled} rows={5} value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder="Enter your answer clearly"/>}</label>
      {part.answerType === "value" && <label className="phy-p2-answer-field"><span>Working</span><textarea disabled={disabled} rows={3} value={response.working || ""} onChange={event => update({ working: event.target.value })} placeholder="Show your working where appropriate"/></label>}
    </>}
  </div>;
}

function CriterionReview({ row }) {
  const { criterion, earned, possible, why } = row;
  const state = earned === possible ? "pass" : earned > 0 ? "partial" : "miss";
  return <div className={`phy-p2-criterion ${state}`}>
    <div><strong>{criterion.code}</strong><MathText as="span" prose>{criterion.description}</MathText>{why && <small>{why}</small>}</div>
    <b>{earned}/{possible}</b>
  </div>;
}

function workedSolutionText(part) {
  const solution = String(part?.solution || "").trim();
  if (!solution) return "";
  return solution.split(/\n\s*Marker's note\.?/i)[0].trim();
}

function reviewState({ earned, possible, hasResponse }) {
  if (possible > 0 && earned >= possible) return { className: "is-correct", label: "Correct" };
  if (earned > 0) return { className: "is-partial", label: "Partial credit" };
  if (!hasResponse) return { className: "is-blank", label: "No response" };
  return { className: "is-incorrect", label: "Incorrect" };
}

function ReviewPanel({ result, question, responses, modelResponses }) {
  const questionRows = result.criteria.filter(row => row.question.question_id === question.question_id);
  const questionEarned = questionRows.reduce((sum, row) => sum + Number(row.earned || 0), 0);
  const questionPossible = questionRows.reduce((sum, row) => sum + Number(row.possible || 0), 0);
  return <div className="phy-p2-review-question">
    <div className="phy-p2-review-question-score"><div><span>Answer review</span><small>Compare each submitted response with the mark scheme.</small></div><strong>{questionEarned}/{questionPossible}</strong></div>
    {(question.parts || []).map(part => {
      const key = physicsPaper2PartKey(question.question_id, part.id);
      const response = responses[key] || {};
      const modelResponse = modelResponses?.[key] || {};
      const rows = questionRows.filter(row => row.part.id === part.id);
      const partEarned = rows.reduce((sum, row) => sum + Number(row.earned || 0), 0);
      const partPossible = rows.reduce((sum, row) => sum + Number(row.possible || 0), 0);
      const hasResponse = responseHasContent(response);
      const state = reviewState({ earned: partEarned, possible: partPossible, hasResponse });
      const finalAnswer = String(response.answer || "").trim();
      const working = String(response.working || "").trim();
      const workedSolution = workedSolutionText(part);
      const modelAnswer = part.answer || part.modelResponse || workedSolution || "Use the mark scheme below.";
      return <section key={key} className={`phy-p2-review-part ${state.className}`}>
        <div className="phy-p2-review-part-head"><strong>{part.label}</strong><span>{state.label} · {partEarned}/{partPossible}</span></div>
        <MathText as="p" prose className="phy-p2-review-prompt">{part.prompt}</MathText>
        {part.given?.length ? <div className="phy-p2-given"><strong>Given</strong>{part.given.map((item, index) => <MathText key={index} as="div" prose>{item}</MathText>)}</div> : null}
        {(part.responseType === "table" || part.responseType === "graph") && <div className="paper2-workspace-review-grid phy-p2-workspace-review-grid">
          <section><span>{part.responseType === "table" ? "Your table" : "Your graph"}</span><PhysicsResponseWorkspace part={part} response={response} readOnly/></section>
          <section className="paper2-model-review phy-p2-model-review"><span>{part.responseType === "table" ? "Correct table" : "Correct graph"}</span><PhysicsResponseWorkspace part={part} response={modelResponse} readOnly/></section>
        </div>}
        {part.responseType !== "table" && part.responseType !== "graph" && <div className="phy-p2-review-answer-grid">
          <div><span>Your final answer</span>{finalAnswer ? <MathText as="div" prose>{finalAnswer}</MathText> : <strong className="phy-p2-no-response">{hasResponse ? "Response recorded" : "No response recorded"}</strong>}</div>
          <div><span>Mark-scheme answer</span><MathText as="div" prose>{modelAnswer}</MathText></div>
        </div>}
        {(part.responseType === "table" || part.responseType === "graph") && <div className="phy-p2-visual-mark-scheme"><span>Mark-scheme answer</span><MathText as="div" prose>{modelAnswer}</MathText></div>}
        {working && <div className="phy-p2-review-working"><span>Your working</span><MathText as="div" prose>{working}</MathText></div>}
        {workedSolution && <div className="phy-p2-worked-solution"><span>Worked solution</span><MathText as="div" prose>{workedSolution}</MathText></div>}
        {part.markerNote && <div className="phy-p2-marker-guidance"><span>Marker guidance</span><MathText as="div" prose>{part.markerNote}</MathText></div>}
        {rows.length > 0 && <div className="phy-p2-criteria-list"><span className="phy-p2-review-breakdown-label">Mark breakdown</span>{rows.map(row => <CriterionReview key={row.id} row={row}/>)}</div>}
      </section>;
    })}
  </div>;
}

const PHYSICS_CONSTANTS = Object.freeze([
  { symbol: "c", name: "Speed of light in free space", value: "3.00 × 10^8 m s^-1" },
  { symbol: "μ₀", name: "Permeability of free space", value: "4π × 10^-7 H m^-1" },
  { symbol: "ε₀", name: "Permittivity of free space", value: "8.85 × 10^-12 F m^-1" },
  { symbol: "e", name: "Elementary charge", value: "1.60 × 10^-19 C" },
  { symbol: "h", name: "The Planck constant", value: "6.63 × 10^-34 J s" },
  { symbol: "u", name: "Unified atomic mass constant", value: "1.66 × 10^-27 kg" },
  { symbol: "mₑ", name: "Rest mass of electron", value: "9.11 × 10^-31 kg" },
  { symbol: "mₚ", name: "Rest mass of proton", value: "1.67 × 10^-27 kg" },
  { symbol: "g", name: "Acceleration of free fall", value: "9.81 m s^-2" },
  { symbol: "Atm", name: "1 Atmosphere", value: "1.00 × 10^5 N m^-2" },
  { symbol: "N_A", name: "Avogadro’s number", value: "6.02 × 10^23 per mole" },
]);

function PhysicsConstantsModal({ onClose }) {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = event => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(<div className="phy-p2-modal-backdrop phy-p2-constants-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="phy-p2-constants-modal" role="dialog" aria-modal="true" aria-labelledby="phy-p2-constants-title" onMouseDown={event => event.stopPropagation()}>
      <div className="phy-p2-constants-head"><div><span className="phy-p2-eyebrow">REFERENCE</span><h2 id="phy-p2-constants-title">Physical Constants</h2></div><button type="button" onClick={onClose} aria-label="Close Physical Constants">×</button></div>
      <p className="phy-p2-constants-note">Use any value stated in a question in preference to this reference.</p>
      <div className="phy-p2-constants-list">{PHYSICS_CONSTANTS.map(item => <div key={item.symbol} className="phy-p2-constant-row"><div><MathText as="strong">{item.symbol}</MathText><span>{item.name}</span></div><MathText as="b">{item.value}</MathText></div>)}</div>
    </section>
  </div>, document.body);
}

function PhysicsPaper2Instructions({ paper, onBack, onBegin, onShowConstants }) {
  return <main className="phy-p2-root"><div className="phy-p2-shell">
    <button type="button" className="phy-p2-back" onClick={onBack}>← Paper 2 library</button>
    <section className="phy-p2-instructions-card">
      <div className="phy-p2-eyebrow">CSEC Physics · Paper 02</div>
      <h1>{physicsPaper2PaperName(paper)}</h1>
      <p className="phy-p2-instructions-sub">A full structured practice examination completed and marked within SPARK.</p>
      <div className="phy-p2-instructions-rule" />
      <div className="phy-p2-instructions-meta">
        <div><span>Time</span><strong>{Math.floor(PHYSICS_PAPER2_DURATION_MINUTES / 60)} h {PHYSICS_PAPER2_DURATION_MINUTES % 60} min</strong></div>
        <div><span>Questions</span><strong>{paper.questions.length} compulsory</strong></div>
        <div><span>Marks</span><strong>100</strong></div>
        <div><span>Coverage</span><strong>Full syllabus</strong></div>
      </div>
      <div className="phy-p2-instructions-sheet">
        <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
        <ol>
          <li>Answer all {paper.questions.length} compulsory structured questions.</li>
          <li>Enter an answer for every part. Show your working where a calculation or explanation requires it.</li>
          <li>For tables, enter values directly in the blank cells. For graphs, label both axes, choose a suitable scale, plot the points and draw the required best-fit line.</li>
          <li>Include units where required and follow any stated instruction about significant figures or decimal places.</li>
          <li>Use the Physical Constants reference when needed. If a question supplies a value, use the value stated in the question.</li>
          <li>SPARK saves your responses while you work. The paper is submitted automatically when the time expires.</li>
          <li>After submission, your score is saved and you receive a question-by-question review with your response, the mark-scheme answer and mark breakdown.</li>
        </ol>
      </div>
      <div className="phy-p2-instructions-note"><strong>How your paper is marked</strong><span>Numerical answers use unit-aware checks. Written, table and graph responses are checked against the authored Physics mark scheme, including method and follow-through criteria where applicable.</span></div>
      <div className="phy-p2-instructions-actions"><button type="button" className="phy-p2-secondary" onClick={onShowConstants}>Physical Constants</button><button type="button" className="phy-p2-primary" onClick={onBegin}>Start examination</button></div>
    </section>
  </div></main>;
}

function PaperLibrary({ userId, active, onResume, onStart, onBack }) {
  const results = readPhysicsPaper2Results(userId);
  return <main className="phy-p2-root"><div className="phy-p2-shell">
    <header className="phy-p2-library-hero"><div><button type="button" className="phy-p2-back" onClick={onBack}>← Physics practice</button><div className="phy-p2-eyebrow">CSEC Physics Paper 02</div><h1>Paper 2 Simulator</h1><p>Choose one of four complete 100-mark practice papers. Each paper contains six compulsory questions and runs for 2 hours 30 minutes.</p></div><div className="phy-p2-hero-spec"><strong>4</strong><span>complete papers</span><strong>150</strong><span>minutes</span><strong>100</strong><span>marks</span></div></header>
    {active?.paperId && getPhysicsPaper2Paper(active.paperId) && <section className="phy-p2-resume-card"><div><span className="phy-p2-eyebrow">IN PROGRESS</span><h2>{physicsPaper2PaperName(getPhysicsPaper2Paper(active.paperId))}</h2><p>{active.phase === "review" ? "Your paper is submitted and the result is saved. Continue your answer review." : active.phase === "instructions" ? "Your paper is selected. Review the instructions before the timer starts." : "Your answers and remaining time are saved on this device."}</p></div><button type="button" className="phy-p2-primary" onClick={onResume}>{active.phase === "review" ? "Continue review" : active.phase === "instructions" ? "View instructions" : "Resume paper"}</button></section>}
    <section className="phy-p2-paper-grid">{PHYSICS_PAPER2_PAPERS.map(paper => {
      const coverage = physicsPaper2MarkingCoverage(paper);
      const isActive = active?.paperId === paper.paper_id;
      const anotherActive = Boolean(active?.paperId && !isActive);
      return <article key={paper.paper_id} className={`phy-p2-paper-card ${isActive ? "is-active" : ""}`}><div className="phy-p2-paper-number">{physicsPaper2PaperLetter(paper)}</div><div><span className="phy-p2-eyebrow">PRACTICE PAPER</span><h2>{physicsPaper2PaperName(paper)}</h2><p>{physicsPaper2Topics(paper).join(" · ")}</p><div className="phy-p2-paper-meta"><span>6 questions</span><span>100 marks</span><span>{coverage.autoMarks} automatically marked points</span><span>Immediate final review</span></div></div><button type="button" className="phy-p2-primary" disabled={anotherActive} onClick={() => isActive ? onResume() : onStart(paper.paper_id)}>{isActive ? (active.phase === "review" ? "Continue review" : active.phase === "instructions" ? "View instructions" : "Resume paper") : anotherActive ? "Finish current paper first" : "View instructions"}</button></article>;
    })}</section>
    <section className="phy-p2-marking-note"><strong>How marking works</strong><p>SPARK marks the complete paper when you submit it. Numerical answers use unit-aware checks, while written, table and graph responses are checked against the authored mark scheme. You then receive your score and a question-by-question final review, in the same flow as Mathematics.</p></section>
    {results.length > 0 && <section className="phy-p2-recent"><div><span className="phy-p2-eyebrow">RECENT RESULTS</span><h2>Completed Paper 2 practice</h2></div><div className="phy-p2-result-list">{results.slice(0, 4).map(result => <div key={result.id}><span>{physicsPaper2PaperName(result.paperNumber)}</span><strong>{result.score}/100</strong><small>{result.percent}% · {new Date(result.completedAt).toLocaleDateString()}</small></div>)}</div></section>}
  </div></main>;
}

export default function PhysicsPaper2Exam({ userId, onBack, onActivity }) {
  const initialActive = useMemo(() => readPhysicsPaper2Active(userId), [userId]);
  const [active, setActive] = useState(initialActive);
  const [currentIndex, setCurrentIndex] = useState(initialActive?.currentIndex || 0);
  const [responses, setResponses] = useState(initialActive?.responses || {});
  const [remaining, setRemaining] = useState(() => initialActive?.endsAt ? Math.max(0, Math.round((initialActive.endsAt - Date.now()) / 1000)) : PHYSICS_PAPER2_DURATION_MINUTES * 60);
  const [libraryOpen, setLibraryOpen] = useState(!initialActive?.paperId);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showConstants, setShowConstants] = useState(false);
  const submissionGuardRef = useRef(Boolean(initialActive?.resultId));
  const paper = getPhysicsPaper2Paper(active?.paperId);
  const phase = active?.phase || null;
  const modelResponses = useMemo(() => paper ? modelResponsesForPhysicsPaper2(paper) : {}, [paper]);

  const persistSubmission = React.useCallback(({ submittedAt, timedOut = false } = {}) => {
    if (!paper || submissionGuardRef.current) return null;
    submissionGuardRef.current = true;
    const completedAt = submittedAt || new Date().toISOString();
    try {
      const final = markPhysicsPaper2(paper, responses);
      const paperNumber = physicsPaper2PaperNumber(paper);
      const stored = {
        id: `${paper.paper_id}:${completedAt}`,
        paperId: paper.paper_id,
        paperNumber,
        paperLabel: physicsPaper2PaperLetter(paper),
        score: final.marks,
        maxScore: final.of,
        percent: Math.round(final.marks / final.of * 100),
        automaticEarned: final.automaticEarned,
        automaticPossible: final.automaticPossible,
        manualEarned: 0,
        manualPossible: 0,
        timedOut: Boolean(timedOut),
        completedAt,
      };
      savePhysicsPaper2Result(userId, stored);
      setActive(previous => previous ? {
        ...previous,
        phase: "review",
        submittedAt: completedAt,
        timedOut: Boolean(timedOut),
        resultId: stored.id,
        resultSaved: true,
      } : previous);
      onActivity?.({ type: "physics_paper2_exam", paperId: paper.paper_id, paperNumber, paperLabel: stored.paperLabel, score: stored.score, maxScore: stored.maxScore, percent: stored.percent, at: completedAt });
      return stored;
    } catch (error) {
      submissionGuardRef.current = false;
      throw error;
    }
  }, [paper, responses, userId, onActivity]);

  useEffect(() => {
    if (!active?.paperId) return;
    const snapshot = { ...active, currentIndex, responses };
    savePhysicsPaper2Active(userId, snapshot);
  }, [userId, active, currentIndex, responses]);

  useEffect(() => {
    if (!paper || phase !== "exam") return undefined;
    const tick = () => {
      const seconds = Math.max(0, Math.round((Number(active.endsAt) - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) persistSubmission({ timedOut: true });
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [paper, phase, active?.endsAt, persistSubmission]);

  useEffect(() => {
    if (!paper || phase !== "review" || active?.resultId || submissionGuardRef.current) return;
    persistSubmission({ submittedAt: active?.submittedAt || new Date().toISOString(), timedOut: Boolean(active?.timedOut) });
  }, [paper, phase, active?.resultId, active?.submittedAt, active?.timedOut, persistSubmission]);

  function startPaper(paperId) {
    if (active?.paperId && active.paperId !== paperId) return;
    if (active?.paperId === paperId) { setLibraryOpen(false); return; }
    const next = { paperId, phase: "instructions", currentIndex: 0, responses: {} };
    submissionGuardRef.current = false;
    setActive(next); setCurrentIndex(0); setResponses({}); setRemaining(PHYSICS_PAPER2_DURATION_MINUTES * 60); setLibraryOpen(false);
  }

  function beginPaper() {
    if (!paper || phase !== "instructions") return;
    const now = Date.now();
    submissionGuardRef.current = false;
    setActive(previous => previous ? { ...previous, phase: "exam", startedAt: new Date(now).toISOString(), endsAt: now + PHYSICS_PAPER2_DURATION_MINUTES * 60 * 1000, currentIndex: 0, responses: previous.responses || {} } : previous);
    setCurrentIndex(0);
    setRemaining(PHYSICS_PAPER2_DURATION_MINUTES * 60);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  function startAnotherPaper() {
    savePhysicsPaper2Active(userId, null);
    submissionGuardRef.current = false;
    setActive(null); setResponses({}); setCurrentIndex(0); setRemaining(PHYSICS_PAPER2_DURATION_MINUTES * 60); setLibraryOpen(true);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  if (!paper || libraryOpen) return <PaperLibrary userId={userId} active={active} onResume={() => setLibraryOpen(false)} onStart={startPaper} onBack={onBack}/>;

  if (phase === "instructions") return <><PhysicsPaper2Instructions paper={paper} onBack={() => setLibraryOpen(true)} onBegin={beginPaper} onShowConstants={() => setShowConstants(true)}/>{showConstants && <PhysicsConstantsModal onClose={() => setShowConstants(false)}/>}</>;

  const question = paper.questions[currentIndex];
  const result = markPhysicsPaper2(paper, responses);
  const answeredParts = paper.questions.flatMap(q => q.parts.map(part => responses[physicsPaper2PartKey(q.question_id, part.id)])).filter(responseHasContent).length;
  const totalParts = paper.questions.reduce((sum, q) => sum + q.parts.length, 0);

  function setPartResponse(partId, value) {
    const key = physicsPaper2PartKey(question.question_id, partId);
    setResponses(previous => ({ ...previous, [key]: value }));
  }

  function submitPaper() {
    setShowSubmitConfirm(false);
    persistSubmission({ timedOut: false });
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }


  return <main className="phy-p2-root"><div className="phy-p2-shell">
    <header className="phy-p2-exam-head">
      <div><button type="button" className="phy-p2-back" onClick={() => setLibraryOpen(true)}>← Paper 2 library</button><span className="phy-p2-eyebrow">CSEC Physics · Paper 02</span><h1>{physicsPaper2PaperName(paper)}</h1><p>{phase === "review" ? "Mark-scheme review" : `${answeredParts}/${totalParts} parts have a recorded response`}</p></div>
      <div className="phy-p2-header-tools"><button type="button" className="phy-p2-constants-control" onClick={() => setShowConstants(true)}>Physical Constants</button><div className={`phy-p2-timer ${remaining <= 600 && phase === "exam" ? "warning" : ""}`}><span>{phase === "review" ? "Submitted" : "Time remaining"}</span><strong>{phase === "review" ? "REVIEW" : formatTime(remaining)}</strong></div></div>
    </header>

    {phase === "review" && <section className="phy-p2-review-summary">
      <div><span>Marks earned</span><strong>{result.marks}/{result.of}</strong></div>
      <div><span>Questions</span><strong>{paper.questions.length} submitted</strong></div>
      <div><span>Final Paper 2 score</span><strong>{Math.round((result.marks / result.of) * 100)}%</strong></div>
      <p>Your paper has been marked and the result is saved. Review each question below to compare your response with the model answer and see how each mark was awarded.</p>
    </section>}

    <nav className="phy-p2-question-nav" aria-label="Paper 2 questions">{paper.questions.map((item, index) => {
      const hasAnswer = item.parts.some(part => responseHasContent(responses[physicsPaper2PartKey(item.question_id, part.id)] || {}));
      const reviewRows = phase === "review" ? result.criteria.filter(row => row.question.question_id === item.question_id) : [];
      const reviewEarned = reviewRows.reduce((sum, row) => sum + Number(row.earned || 0), 0);
      return <button key={item.question_id} type="button" className={`${index === currentIndex ? "active" : ""} ${hasAnswer ? "answered" : ""}`} onClick={() => setCurrentIndex(index)}><span>Q{item.question_number}</span><small>{phase === "review" ? `${reviewEarned}/${item.marks} marks` : `${item.marks} marks`}</small></button>;
    })}</nav>

    <article className={`phy-p2-question-card ${phase === "review" ? "is-review" : ""}`}>
      <div className="phy-p2-question-heading"><div><span className="phy-p2-eyebrow">SECTION {question.section}</span><h2>Question {question.question_number}</h2><p>{question.topic}</p></div><strong>{question.marks} marks</strong></div>
      <MathText as="p" prose className="phy-p2-stem">{question.stem}</MathText>
      {phase === "exam" ? <>
        {!(question.stimulus?.kind === "table" && question.parts?.[0]?.responseType === "table") && <SourceTable table={question.stimulus}/>}
        <Diagram diagram={question.diagram}/>
        <div className="phy-p2-parts">{question.parts.map(part => {
          const key = physicsPaper2PartKey(question.question_id, part.id);
          return <section key={key} className="phy-p2-part"><div className="phy-p2-part-head"><strong>{part.label}</strong><MathText as="div" prose>{part.prompt}</MathText><b>{part.marks} {part.marks === 1 ? "mark" : "marks"}</b></div>
            <PartResponse question={question} part={part} response={responses[key] || {}} disabled={false} onChange={value => setPartResponse(part.id, value)}/>
          </section>;
        })}</div>
      </> : <>
        <ReviewPanel result={result} question={question} responses={responses} modelResponses={modelResponses}/>
        {(question.stimulus || question.diagram) && <details className="phy-p2-review-reference">
          <summary>View original question data and diagram</summary>
          <div className="phy-p2-review-reference-body"><SourceTable table={question.stimulus}/><Diagram diagram={question.diagram}/></div>
        </details>}
      </>}
    </article>

    <footer className="phy-p2-exam-footer"><button type="button" className="phy-p2-secondary" disabled={currentIndex === 0} onClick={() => { setCurrentIndex(index => Math.max(0, index - 1)); window.scrollTo?.({ top: 0, behavior: "smooth" }); }}>← Previous</button><span>Question {currentIndex + 1} of {paper.questions.length}</span>{currentIndex < paper.questions.length - 1 ? <button type="button" className="phy-p2-primary" onClick={() => { setCurrentIndex(index => Math.min(paper.questions.length - 1, index + 1)); window.scrollTo?.({ top: 0, behavior: "smooth" }); }}>Next question →</button> : phase === "exam" ? <button type="button" className="phy-p2-primary" onClick={() => setShowSubmitConfirm(true)}>Submit paper</button> : <button type="button" className="phy-p2-secondary" disabled>Review complete</button>}</footer>
    {phase === "review" && <div className="phy-p2-result-actions"><button type="button" className="phy-p2-secondary" onClick={onBack}>Back to Physics practice</button><button type="button" className="phy-p2-primary" onClick={startAnotherPaper}>Start another Paper 2</button></div>}
    {showConstants && <PhysicsConstantsModal onClose={() => setShowConstants(false)}/>}
    {showSubmitConfirm && phase === "exam" && <div className="phy-p2-modal-backdrop" role="presentation" onMouseDown={() => setShowSubmitConfirm(false)}><section className="phy-p2-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="phy-p2-submit-title" onMouseDown={event => event.stopPropagation()}><span className="phy-p2-eyebrow">SUBMIT PAPER</span><h2 id="phy-p2-submit-title">Submit {physicsPaper2PaperName(paper)}?</h2><p>SPARK will grade and save your result immediately, then open your final answer review. You will not be able to change your responses after submission.</p><div className="phy-p2-confirm-actions"><button type="button" className="phy-p2-secondary" onClick={() => setShowSubmitConfirm(false)}>Return to paper</button><button type="button" className="phy-p2-primary" onClick={submitPaper}>Submit paper</button></div></section></div>}
  </div></main>;
}
