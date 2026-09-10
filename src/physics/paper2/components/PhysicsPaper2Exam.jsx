import React, { useEffect, useMemo, useRef, useState } from "react";
import MathText from "../../../practice/MathText";
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
import { markPhysicsPaper2 } from "../physicsPaper2Marking";
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

function ResponseTable({ table, value = {}, disabled, onChange }) {
  if (!table) return null;
  return <div className="phy-p2-table-wrap" tabIndex="0" aria-label={`${table.caption || "Response table"}, scroll horizontally if needed`}>
    <table className="phy-p2-table phy-p2-response-table">
      {table.caption && <caption>{table.caption}</caption>}
      <thead><tr>{(table.headers || []).map((header, index) => <th key={`${header}-${index}`} scope="col"><MathText prose>{header}</MathText></th>)}</tr></thead>
      <tbody>{(table.rows || []).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => {
        const key = `${rowIndex}:${cellIndex}`;
        return <td key={cellIndex}>{cell !== "" ? <MathText prose>{cell}</MathText> : <input
          type="text"
          disabled={disabled}
          value={value[key] || ""}
          aria-label={`${table.headers?.[cellIndex] || `column ${cellIndex + 1}`}, row ${rowIndex + 1}`}
          onChange={event => onChange({ ...value, [key]: event.target.value })}
        />}</td>;
      })}</tr>)}</tbody>
    </table>
  </div>;
}

function snap(value, step) {
  const useStep = Number(step) || 1;
  return Math.round(value / useStep) * useStep;
}

function trimNumber(value) {
  return String(Math.round(Number(value) * 1000) / 1000);
}

function GraphWorkspace({ grid, value = {}, disabled, onChange }) {
  const svgRef = useRef(null);
  const [tool, setTool] = useState("point");
  if (!grid) return null;
  const W = 620, H = 440, L = 72, R = 24, T = 22, B = 68;
  const plotW = W - L - R, plotH = H - T - B;
  const xToPx = x => L + ((x - grid.xMin) / (grid.xMax - grid.xMin)) * plotW;
  const yToPx = y => T + plotH - ((y - grid.yMin) / (grid.yMax - grid.yMin)) * plotH;
  const xMajor = Math.round((grid.xMax - grid.xMin) / grid.xStep);
  const yMajor = Math.round((grid.yMax - grid.yMin) / grid.yStep);
  const minor = grid.minorPerStep || 5;
  const graph = { points: value.points || [], line: value.line || [] };

  function coordinateFromEvent(event) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const px = (event.clientX - rect.left) * (W / rect.width);
    const py = (event.clientY - rect.top) * (H / rect.height);
    if (px < L || px > W - R || py < T || py > H - B) return null;
    const rawX = grid.xMin + ((px - L) / plotW) * (grid.xMax - grid.xMin);
    const rawY = grid.yMin + ((T + plotH - py) / plotH) * (grid.yMax - grid.yMin);
    const x = Math.max(grid.xMin, Math.min(grid.xMax, snap(rawX, grid.xStep / minor)));
    const y = Math.max(grid.yMin, Math.min(grid.yMax, snap(rawY, grid.yStep / minor)));
    return { x: Number(x.toFixed(6)), y: Number(y.toFixed(6)) };
  }

  function onGraphClick(event) {
    if (disabled) return;
    const point = coordinateFromEvent(event);
    if (!point) return;
    if (tool === "point") onChange({ ...graph, points: [...graph.points, point].slice(-20) });
    else onChange({ ...graph, line: graph.line.length >= 2 ? [point] : [...graph.line, point] });
  }

  const linePoints = graph.line.length === 2 ? graph.line : [];
  const gridLines = [];
  for (let i = 0; i <= xMajor * minor; i += 1) {
    const xValue = grid.xMin + i * (grid.xStep / minor);
    gridLines.push(<line key={`v-${i}`} x1={xToPx(xValue)} y1={T} x2={xToPx(xValue)} y2={T + plotH} className={i % minor === 0 ? "major" : "minor"}/>);
  }
  for (let i = 0; i <= yMajor * minor; i += 1) {
    const yValue = grid.yMin + i * (grid.yStep / minor);
    gridLines.push(<line key={`h-${i}`} x1={L} y1={yToPx(yValue)} x2={L + plotW} y2={yToPx(yValue)} className={i % minor === 0 ? "major" : "minor"}/>);
  }

  return <div className="phy-p2-graph-workspace">
    <div className="phy-p2-graph-toolbar">
      <span>Graph tools</span>
      <button type="button" className={tool === "point" ? "active" : ""} disabled={disabled} onClick={() => setTool("point")}>Plot points</button>
      <button type="button" className={tool === "line" ? "active" : ""} disabled={disabled} onClick={() => setTool("line")}>Best-fit line</button>
      <button type="button" disabled={disabled || (!graph.points.length && !graph.line.length)} onClick={() => onChange({ points: [], line: [] })}>Clear graph</button>
    </div>
    <p className="phy-p2-graph-help">Click the grid using Plot points. For the best-fit line, choose Best-fit line and click two points. The graph is reviewed against the mark scheme after submission.</p>
    <svg ref={svgRef} className="phy-p2-grid" viewBox={`0 0 ${W} ${H}`} onClick={onGraphClick} role="img" aria-label={`Interactive graph. Horizontal axis ${grid.xLabel}. Vertical axis ${grid.yLabel}.`}>
      <g className="phy-p2-grid-lines">{gridLines}</g>
      <line x1={L} y1={T + plotH} x2={L + plotW} y2={T + plotH} className="axis"/>
      <line x1={L} y1={T} x2={L} y2={T + plotH} className="axis"/>
      {Array.from({ length: xMajor + 1 }, (_, i) => {
        const valueX = grid.xMin + i * grid.xStep;
        return <text key={`xl-${i}`} x={xToPx(valueX)} y={T + plotH + 22} textAnchor="middle">{trimNumber(valueX)}</text>;
      })}
      {Array.from({ length: yMajor + 1 }, (_, i) => {
        const valueY = grid.yMin + i * grid.yStep;
        return <text key={`yl-${i}`} x={L - 10} y={yToPx(valueY) + 4} textAnchor="end">{trimNumber(valueY)}</text>;
      })}
      <text x={L + plotW / 2} y={H - 10} textAnchor="middle" className="axis-label">{grid.xLabel}</text>
      <text x={18} y={T + plotH / 2} textAnchor="middle" className="axis-label" transform={`rotate(-90 18 ${T + plotH / 2})`}>{grid.yLabel}</text>
      {graph.points.map((point, index) => <circle key={`p-${index}`} cx={xToPx(point.x)} cy={yToPx(point.y)} r="5" className="student-point"/>)}
      {linePoints.length === 2 && <line x1={xToPx(linePoints[0].x)} y1={yToPx(linePoints[0].y)} x2={xToPx(linePoints[1].x)} y2={yToPx(linePoints[1].y)} className="student-line"/>}
    </svg>
    <div className="phy-p2-graph-status"><span>{graph.points.length} point{graph.points.length === 1 ? "" : "s"} plotted</span><span>{linePoints.length === 2 ? "Best-fit line drawn" : "Best-fit line not complete"}</span></div>
  </div>;
}

function Diagram({ diagram }) {
  if (!diagram?.svg) return null;
  return <figure className="phy-p2-diagram">
    <div className="phy-p2-diagram-art" role="img" aria-label={diagram.alt || diagram.label || "Physics diagram"} dangerouslySetInnerHTML={{ __html: diagram.svg }}/>
    {diagram.label && <figcaption>{diagram.label}</figcaption>}
  </figure>;
}

function PartResponse({ question, part, response, disabled, onChange }) {
  const update = patch => onChange({ ...response, ...patch });
  const answerLabel = part.answerType === "value" ? "Answer" : (part.responseType === "graph" || part.responseType === "table" ? "Calculations or notes" : "Your response");
  return <div className="phy-p2-response-area">
    {part.given?.length ? <div className="phy-p2-given"><strong>Given</strong>{part.given.map((item, index) => <MathText key={index} as="div" prose>{item}</MathText>)}</div> : null}
    {part.blanks?.length ? <div className="phy-p2-blanks">{part.blanks.map((line, index) => <MathText key={index} as="div" prose>{line}</MathText>)}</div> : null}
    {part.responseType === "table" && <ResponseTable table={part.table} value={response.table || {}} disabled={disabled} onChange={table => update({ table })}/>} 
    {part.responseType === "graph" && <GraphWorkspace grid={part.grid} value={response.graph || {}} disabled={disabled} onChange={graph => update({ graph })}/>} 
    <label className="phy-p2-answer-field"><span>{answerLabel}</span>{part.answerType === "value" ? <input type="text" disabled={disabled} value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder="Include the unit where required"/> : <textarea disabled={disabled} rows={part.responseType ? 3 : 5} value={response.answer || ""} onChange={event => update({ answer: event.target.value })} placeholder="Enter your answer clearly"/>}</label>
    {part.answerType === "value" && <label className="phy-p2-answer-field"><span>Working</span><textarea disabled={disabled} rows={3} value={response.working || ""} onChange={event => update({ working: event.target.value })} placeholder="Show your working where appropriate"/></label>}
  </div>;
}

function CriterionReview({ row, award, onAward }) {
  const { criterion, mode, earned, possible } = row;
  if (mode === "automatic") return <div className={`phy-p2-criterion ${earned === possible ? "pass" : "miss"}`}>
    <div><strong>{criterion.code}</strong><span>{criterion.description}</span></div><b>{earned}/{possible} auto</b>
  </div>;
  return <div className="phy-p2-criterion manual">
    <div><strong>{criterion.code}</strong><span>{criterion.description}</span></div>
    <label><span className="sr-only">Marks awarded for {criterion.code}</span><select value={award ?? ""} onChange={event => onAward(event.target.value === "" ? null : Number(event.target.value))}>
      <option value="">Review</option>{Array.from({ length: possible + 1 }, (_, value) => <option key={value} value={value}>{value}/{possible}</option>)}
    </select></label>
  </div>;
}

function ReviewPanel({ paper, question, responses, manualAwards, onManualAward }) {
  const result = markPhysicsPaper2(paper, responses, manualAwards);
  return <div className="phy-p2-review-question">
    {(question.parts || []).map(part => {
      const key = physicsPaper2PartKey(question.question_id, part.id);
      const response = responses[key] || {};
      const rows = result.criteria.filter(row => row.question.question_id === question.question_id && row.part.id === part.id);
      return <section key={key} className="phy-p2-review-part">
        <div className="phy-p2-review-answer"><span>Model answer</span><MathText as="p" prose>{part.answer || part.solution || "Use the mark scheme below."}</MathText>{part.markerNote && <small><strong>Marker's note:</strong> <MathText prose>{part.markerNote}</MathText></small>}</div>
        <div className="phy-p2-review-response"><span>Your response</span><p>{response.answer || response.working || (responseHasContent(response) ? "Graph or table response recorded." : "No response recorded.")}</p></div>
        <div className="phy-p2-criteria-list">{rows.map(row => <CriterionReview key={row.id} row={row} award={manualAwards[row.id]} onAward={value => onManualAward(row.id, value)}/>)}</div>
      </section>;
    })}
  </div>;
}

function PaperLibrary({ userId, active, onResume, onStart, onBack }) {
  const results = readPhysicsPaper2Results(userId);
  return <main className="phy-p2-root"><div className="phy-p2-shell">
    <header className="phy-p2-library-hero"><div><button type="button" className="phy-p2-back" onClick={onBack}>← Physics practice</button><div className="phy-p2-eyebrow">CSEC Physics Paper 02</div><h1>Paper 2 Simulator</h1><p>Choose one of four complete 100-mark practice papers. Each paper contains six compulsory questions and runs for 2 hours 30 minutes.</p></div><div className="phy-p2-hero-spec"><strong>4</strong><span>complete papers</span><strong>150</strong><span>minutes</span><strong>100</strong><span>marks</span></div></header>
    {active?.paperId && getPhysicsPaper2Paper(active.paperId) && <section className="phy-p2-resume-card"><div><span className="phy-p2-eyebrow">IN PROGRESS</span><h2>{physicsPaper2PaperName(getPhysicsPaper2Paper(active.paperId))}</h2><p>{active.phase === "review" ? "Your paper is submitted. Continue the mark-scheme self-review." : "Your answers and remaining time are saved on this device."}</p></div><button type="button" className="phy-p2-primary" onClick={onResume}>{active.phase === "review" ? "Continue review" : "Resume paper"}</button></section>}
    <section className="phy-p2-paper-grid">{PHYSICS_PAPER2_PAPERS.map(paper => {
      const coverage = physicsPaper2MarkingCoverage(paper);
      const isActive = active?.paperId === paper.paper_id;
      const anotherActive = Boolean(active?.paperId && !isActive);
      return <article key={paper.paper_id} className={`phy-p2-paper-card ${isActive ? "is-active" : ""}`}><div className="phy-p2-paper-number">{physicsPaper2PaperLetter(paper)}</div><div><span className="phy-p2-eyebrow">PRACTICE PAPER</span><h2>{physicsPaper2PaperName(paper)}</h2><p>{physicsPaper2Topics(paper).join(" · ")}</p><div className="phy-p2-paper-meta"><span>6 questions</span><span>100 marks</span><span>{coverage.autoMarks} auto-check marks</span><span>{coverage.manualMarks} self-review marks</span></div></div><button type="button" className="phy-p2-primary" disabled={anotherActive} onClick={() => isActive ? onResume() : onStart(paper.paper_id)}>{isActive ? (active.phase === "review" ? "Continue review" : "Resume paper") : anotherActive ? "Finish current paper first" : "Start paper"}</button></article>;
    })}</section>
    <section className="phy-p2-marking-note"><strong>How marking works</strong><p>Numerical criteria with reliable machine checks are marked automatically. Written explanations, tables, diagrams and graph-quality marks are reviewed by the student against the worked solution and criterion-by-criterion mark scheme. SPARK does not pretend those marks can be judged reliably from a typed string.</p></section>
    {results.length > 0 && <section className="phy-p2-recent"><div><span className="phy-p2-eyebrow">RECENT RESULTS</span><h2>Completed Paper 2 practice</h2></div><div className="phy-p2-result-list">{results.slice(0, 4).map(result => <div key={result.id}><span>{physicsPaper2PaperName(result.paperNumber)}</span><strong>{result.score}/100</strong><small>{result.percent}% · {new Date(result.completedAt).toLocaleDateString()}</small></div>)}</div></section>}
  </div></main>;
}

export default function PhysicsPaper2Exam({ userId, onBack, onActivity }) {
  const initialActive = useMemo(() => readPhysicsPaper2Active(userId), [userId]);
  const [active, setActive] = useState(initialActive);
  const [currentIndex, setCurrentIndex] = useState(initialActive?.currentIndex || 0);
  const [responses, setResponses] = useState(initialActive?.responses || {});
  const [manualAwards, setManualAwards] = useState(initialActive?.manualAwards || {});
  const [remaining, setRemaining] = useState(() => initialActive?.endsAt ? Math.max(0, Math.round((initialActive.endsAt - Date.now()) / 1000)) : PHYSICS_PAPER2_DURATION_MINUTES * 60);
  const [libraryOpen, setLibraryOpen] = useState(!initialActive?.paperId);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const paper = getPhysicsPaper2Paper(active?.paperId);
  const phase = active?.phase || null;

  useEffect(() => {
    if (!active?.paperId) return;
    const snapshot = { ...active, currentIndex, responses, manualAwards };
    savePhysicsPaper2Active(userId, snapshot);
  }, [userId, active, currentIndex, responses, manualAwards]);

  useEffect(() => {
    if (!paper || phase !== "exam") return undefined;
    const tick = () => {
      const seconds = Math.max(0, Math.round((Number(active.endsAt) - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) setActive(previous => ({ ...previous, phase: "review", submittedAt: new Date().toISOString() }));
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [paper, phase, active?.endsAt]);

  function startPaper(paperId) {
    if (active?.paperId && active.paperId !== paperId) return;
    if (active?.paperId === paperId) { setLibraryOpen(false); return; }
    const now = Date.now();
    const next = { paperId, phase: "exam", startedAt: new Date(now).toISOString(), endsAt: now + PHYSICS_PAPER2_DURATION_MINUTES * 60 * 1000, currentIndex: 0, responses: {}, manualAwards: {} };
    setActive(next); setCurrentIndex(0); setResponses({}); setManualAwards({}); setRemaining(PHYSICS_PAPER2_DURATION_MINUTES * 60); setLibraryOpen(false);
  }

  if (!paper || libraryOpen) return <PaperLibrary userId={userId} active={active} onResume={() => setLibraryOpen(false)} onStart={startPaper} onBack={onBack}/>;

  const question = paper.questions[currentIndex];
  const result = markPhysicsPaper2(paper, responses, manualAwards);
  const answeredParts = paper.questions.flatMap(q => q.parts.map(part => responses[physicsPaper2PartKey(q.question_id, part.id)])).filter(responseHasContent).length;
  const totalParts = paper.questions.reduce((sum, q) => sum + q.parts.length, 0);

  function setPartResponse(partId, value) {
    const key = physicsPaper2PartKey(question.question_id, partId);
    setResponses(previous => ({ ...previous, [key]: value }));
  }

  function submitPaper() {
    setShowSubmitConfirm(false);
    setActive(previous => ({ ...previous, phase: "review", submittedAt: new Date().toISOString() }));
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  function setManualAward(id, value) {
    setManualAwards(previous => {
      const next = { ...previous };
      if (value == null) delete next[id]; else next[id] = value;
      return next;
    });
  }

  function finishReview() {
    const final = markPhysicsPaper2(paper, responses, manualAwards);
    if (!final.reviewComplete || final.marks == null) return;
    const completedAt = new Date().toISOString();
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
      manualEarned: final.manualEarned,
      manualPossible: final.manualPossible,
      completedAt,
    };
    savePhysicsPaper2Result(userId, stored);
    savePhysicsPaper2Active(userId, null);
    onActivity?.({ type: "physics_paper2_exam", paperId: paper.paper_id, paperNumber, paperLabel: stored.paperLabel, score: stored.score, maxScore: stored.maxScore, percent: stored.percent, at: completedAt });
    setActive(null); setResponses({}); setManualAwards({}); setCurrentIndex(0); setLibraryOpen(true);
  }

  return <main className="phy-p2-root"><div className="phy-p2-shell">
    <header className="phy-p2-exam-head">
      <div><button type="button" className="phy-p2-back" onClick={() => setLibraryOpen(true)}>← Paper 2 library</button><span className="phy-p2-eyebrow">CSEC Physics · Paper 02</span><h1>{physicsPaper2PaperName(paper)}</h1><p>{phase === "review" ? "Mark-scheme review" : `${answeredParts}/${totalParts} parts have a recorded response`}</p></div>
      <div className={`phy-p2-timer ${remaining <= 600 && phase === "exam" ? "warning" : ""}`}><span>{phase === "review" ? "Submitted" : "Time remaining"}</span><strong>{phase === "review" ? "REVIEW" : formatTime(remaining)}</strong></div>
    </header>

    {phase === "review" && <section className="phy-p2-review-summary">
      <div><span>Automatically checked</span><strong>{result.automaticEarned}/{result.automaticPossible}</strong></div>
      <div><span>Self-review completed</span><strong>{result.manualReviewed}/{result.manualCriteria}</strong></div>
      <div><span>Final Paper 2 score</span><strong>{result.reviewComplete ? `${result.marks}/100` : "Pending"}</strong></div>
      <p>Use the model answers and marking criteria to award only the manual marks your response actually earns. Your final score is saved only after every manual criterion has been reviewed.</p>
    </section>}

    <nav className="phy-p2-question-nav" aria-label="Paper 2 questions">{paper.questions.map((item, index) => {
      const hasAnswer = item.parts.some(part => responseHasContent(responses[physicsPaper2PartKey(item.question_id, part.id)] || {}));
      return <button key={item.question_id} type="button" className={`${index === currentIndex ? "active" : ""} ${hasAnswer ? "answered" : ""}`} onClick={() => setCurrentIndex(index)}><span>Q{item.question_number}</span><small>{item.marks} marks</small></button>;
    })}</nav>

    <article className="phy-p2-question-card">
      <div className="phy-p2-question-heading"><div><span className="phy-p2-eyebrow">SECTION {question.section}</span><h2>Question {question.question_number}</h2><p>{question.topic}</p></div><strong>{question.marks} marks</strong></div>
      <MathText as="p" prose className="phy-p2-stem">{question.stem}</MathText>
      <SourceTable table={question.stimulus}/>
      <Diagram diagram={question.diagram}/>
      <div className="phy-p2-parts">{question.parts.map(part => {
        const key = physicsPaper2PartKey(question.question_id, part.id);
        return <section key={key} className="phy-p2-part"><div className="phy-p2-part-head"><strong>{part.label}</strong><MathText as="div" prose>{part.prompt}</MathText><b>{part.marks} {part.marks === 1 ? "mark" : "marks"}</b></div>
          <PartResponse question={question} part={part} response={responses[key] || {}} disabled={phase === "review"} onChange={value => setPartResponse(part.id, value)}/>
        </section>;
      })}</div>
      {phase === "review" && <ReviewPanel paper={paper} question={question} responses={responses} manualAwards={manualAwards} onManualAward={setManualAward}/>} 
    </article>

    <footer className="phy-p2-exam-footer"><button type="button" className="phy-p2-secondary" disabled={currentIndex === 0} onClick={() => { setCurrentIndex(index => Math.max(0, index - 1)); window.scrollTo?.({ top: 0, behavior: "smooth" }); }}>← Previous</button><span>Question {currentIndex + 1} of {paper.questions.length}</span>{currentIndex < paper.questions.length - 1 ? <button type="button" className="phy-p2-primary" onClick={() => { setCurrentIndex(index => Math.min(paper.questions.length - 1, index + 1)); window.scrollTo?.({ top: 0, behavior: "smooth" }); }}>Next question →</button> : phase === "exam" ? <button type="button" className="phy-p2-primary" onClick={() => setShowSubmitConfirm(true)}>Submit paper</button> : <button type="button" className="phy-p2-primary" disabled={!result.reviewComplete} onClick={finishReview}>Finish review & save result</button>}</footer>
    {phase === "review" && !result.reviewComplete && <p className="phy-p2-review-reminder">Review all {result.manualCriteria - result.manualReviewed} remaining manual criterion{result.manualCriteria - result.manualReviewed === 1 ? "" : "s"} before saving the final score.</p>}
    {showSubmitConfirm && phase === "exam" && <div className="phy-p2-modal-backdrop" role="presentation" onMouseDown={() => setShowSubmitConfirm(false)}><section className="phy-p2-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="phy-p2-submit-title" onMouseDown={event => event.stopPropagation()}><span className="phy-p2-eyebrow">SUBMIT PAPER</span><h2 id="phy-p2-submit-title">Submit {physicsPaper2PaperName(paper)}?</h2><p>You will move to mark-scheme review and will not be able to change your responses after submission.</p><div className="phy-p2-confirm-actions"><button type="button" className="phy-p2-secondary" onClick={() => setShowSubmitConfirm(false)}>Return to paper</button><button type="button" className="phy-p2-primary" onClick={submitPaper}>Submit paper</button></div></section></div>}
  </div></main>;
}
