import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SparkLoader from "../../components/ui/SparkLoader";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { buildAttemptProvenance } from "../../grading/attemptProvenance";
import { readServerExamClock, startServerExamAttempt, submitServerExamAttempt } from "../../grading/serverExamAttempt";
import { loadIntegratedScienceModule } from "../data/integratedScienceBank";
import { BankTable, TrustedBankSvg } from "./IntegratedScienceQuestionRenderer";
import IntegratedScienceText from "../components/IntegratedScienceText";
import { gradeIntegratedSciencePaper2, INTEGRATED_SCIENCE_P2_GRADER_VERSION } from "./integratedSciencePaper2Grader";
import {
  buildIntegratedSciencePaper2,
  formatIntegratedScienceExamTime,
  INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS,
  readIntegratedScienceExamState,
  saveIntegratedScienceExamState,
} from "./integratedScienceExamModel";

function goTop() {
  window.scrollTo?.({top:0,behavior:"smooth"});
}

function resolvePaper(modules,paperIds) {
  const byId = new Map(
    (modules || []).flatMap(module => module.paper02 || []).map(question => [question.id,question])
  );
  return (paperIds || []).map(id => byId.get(id)).filter(Boolean);
}

function responseKey(questionId,partIndex,itemIndex,suffix="") {
  return `${questionId}:${partIndex}:${itemIndex}${suffix ? `:${suffix}` : ""}`;
}

function Separator() {
  return <span className="is-meta-separator" aria-hidden="true">&middot;</span>;
}

function parseGraphPoints(value){
  return String(value || "").split(/\n|;/).map(line=>{
    const match=line.match(/(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/);
    return match ? {x:Number(match[1]),y:Number(match[2])} : null;
  }).filter(point=>point && Number.isFinite(point.x) && Number.isFinite(point.y));
}

function parseGraphBars(value){
  return String(value || "").split(/\n|;/).map(line=>{
    const match=line.trim().match(/^(.+?)\s*[,=:]\s*(-?\d+(?:\.\d+)?)$/);
    return match ? {label:match[1].trim(),value:Number(match[2])} : null;
  }).filter(Boolean);
}

function GraphPlotter({base,config,prompt="",responses,onChange,disabled}){
  const pointsText=responses[`${base}:points`] || "";
  const defaultType=/bar chart/i.test(prompt) ? "bar" : "line";
  const chartType=responses[`${base}:chartType`] || defaultType;
  const points=parseGraphPoints(pointsText);
  const bars=parseGraphBars(pointsText);
  const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
  const minX=xs.length?Math.min(0,...xs):0,maxX=xs.length?Math.max(1,...xs):1;
  const minY=ys.length?Math.min(0,...ys):0,maxY=ys.length?Math.max(1,...ys):1;
  const sx=x=>50+(x-minX)/Math.max(1e-9,maxX-minX)*500;
  const sy=y=>260-(y-minY)/Math.max(1e-9,maxY-minY)*210;
  const maxBar=Math.max(1,...bars.map(row=>row.value));
  return <div className="is-p2-graph-workspace">
    <div className="is-p2-graph-fields">
      <label><span>Graph type</span><select disabled={disabled} value={chartType} onChange={e=>onChange(`${base}:chartType`,e.target.value)}><option value="line">Line / curve</option><option value="bar">Bar chart</option></select></label>
      <label><span>x-axis label</span><input disabled={disabled} value={responses[`${base}:xLabel`] || ""} onChange={e=>onChange(`${base}:xLabel`,e.target.value)} placeholder={config.x || "x-axis"}/></label>
      <label><span>y-axis label</span><input disabled={disabled} value={responses[`${base}:yLabel`] || ""} onChange={e=>onChange(`${base}:yLabel`,e.target.value)} placeholder={config.y || "y-axis"}/></label>
      <label><span>Scale</span><input disabled={disabled} value={responses[`${base}:scale`] || ""} onChange={e=>onChange(`${base}:scale`,e.target.value)} placeholder="e.g. x: 1 square = 1 week; y: 1 square = 5 cm"/></label>
    </div>
    <svg className="is-p2-graph-response" viewBox="0 0 600 300" role="img" aria-label="Student graph plot">
      <rect x="50" y="30" width="500" height="230" fill="none" stroke="currentColor"/>
      {Array.from({length:11},(_,i)=><line key={`v${i}`} x1={50+i*50} x2={50+i*50} y1="30" y2="260" stroke="currentColor" opacity=".16"/>)}
      {Array.from({length:11},(_,i)=><line key={`h${i}`} x1="50" x2="550" y1={30+i*23} y2={30+i*23} stroke="currentColor" opacity=".16"/>)}
      {chartType==="bar" ? bars.map((row,index)=>{
        const band=500/Math.max(1,bars.length);
        const h=row.value/maxBar*210;
        return <g key={`${row.label}-${index}`}><rect x={50+index*band+band*.18} y={260-h} width={band*.64} height={Math.max(1,h)} className="is-exam-graph-bar"/><text x={50+index*band+band*.5} y="278" textAnchor="middle" fontSize="10">{row.label}</text></g>;
      }) : <>
        {points.map((point,index)=><circle key={index} cx={sx(point.x)} cy={sy(point.y)} r="4" className="is-exam-graph-point"/>)}
        {points.length>1 && <polyline points={points.map(point=>`${sx(point.x)},${sy(point.y)}`).join(" ")} fill="none" className="is-exam-graph-line"/>}
      </>}
    </svg>
    <textarea disabled={disabled} rows={4} value={pointsText} onChange={e=>onChange(`${base}:points`,e.target.value)} placeholder={chartType==="bar" ? "Enter each category and value, one per line, for example:\nA, 12\nB, 25" : "Enter plotted coordinates, one per line, for example:\n1, 2\n2, 5\n3, 11"}/>
    <textarea disabled={disabled} rows={2} value={responses[base] || ""} onChange={e=>onChange(base,e.target.value)} placeholder="Optional graph notes or working."/>
  </div>;
}

function readStrokes(value){
  try{
    const parsed=JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  }catch{return [];}
}

function DrawingPad({base,responses,onChange,disabled}){
  const svgRef=useRef(null);
  const drawingRef=useRef(false);
  const strokes=readStrokes(responses[`${base}:strokes`]);
  const updateStrokes=next=>onChange(`${base}:strokes`,JSON.stringify(next));
  const pointFromEvent=event=>{
    const box=svgRef.current?.getBoundingClientRect();
    if(!box) return null;
    return {x:Math.max(0,Math.min(600,(event.clientX-box.left)/box.width*600)),y:Math.max(0,Math.min(300,(event.clientY-box.top)/box.height*300))};
  };
  const down=event=>{
    if(disabled) return;
    const point=pointFromEvent(event); if(!point) return;
    drawingRef.current=true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateStrokes([...strokes,[point]]);
  };
  const move=event=>{
    if(disabled || !drawingRef.current) return;
    const point=pointFromEvent(event); if(!point) return;
    const next=strokes.map((stroke,index)=>index===strokes.length-1?[...stroke,point]:stroke);
    updateStrokes(next);
  };
  const up=()=>{drawingRef.current=false;};
  return <div className="is-p2-drawing-workspace">
    <svg ref={svgRef} className="is-p2-drawing-response" viewBox="0 0 600 300" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="img" aria-label="Student drawing canvas">
      <rect x="1" y="1" width="598" height="298" fill="none" stroke="currentColor" opacity=".35"/>
      {strokes.map((stroke,index)=><polyline key={index} points={stroke.map(point=>`${point.x},${point.y}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>)}
    </svg>
    {!disabled && <button type="button" className="is-exam-primary" onClick={()=>updateStrokes([])}>Clear drawing</button>}
    <textarea disabled={disabled} rows={3} value={responses[base] || ""} onChange={e=>onChange(base,e.target.value)} placeholder="Add the labels and brief notes that belong on your drawing."/>
  </div>;
}

function BoundResponse({ questionId, partIndex, itemIndex, item, responses, onChange, disabled }) {
  const config = item.response || {};
  const type = config.type || "lines";
  const base = responseKey(questionId,partIndex,itemIndex);

  if (type === "labels") {
    return (
      <div className="is-p2-label-responses">
        {(config.keys || []).map(label => (
          <label key={label}>
            <span>{label}</span>
            <input
              disabled={disabled}
              value={responses[`${base}:${label}`] || ""}
              onChange={event => onChange(`${base}:${label}`,event.target.value)}
            />
          </label>
        ))}
      </div>
    );
  }

  if (type === "table") {
    const table = config.table || {};
    return (
      <div className="is-bank-table-wrap">
        {table.title && <div className="is-bank-table-title">{table.title}</div>}
        <table className="is-bank-table">
          {Array.isArray(table.headers) && (
            <thead>
              <tr>{table.headers.map((cell,index) => <th key={index}>{cell}</th>)}</tr>
            </thead>
          )}
          <tbody>
            {(table.rows || []).map((row,rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell,cellIndex) => (
                  <td key={cellIndex}>
                    {String(cell ?? "") === "" ? (
                      <input
                        disabled={disabled}
                        value={responses[`${base}:r${rowIndex}c${cellIndex}`] || ""}
                        onChange={event => onChange(`${base}:r${rowIndex}c${cellIndex}`,event.target.value)}
                      />
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "graph") {
    return <GraphPlotter base={base} config={config} prompt={item.prompt || ""} responses={responses} onChange={onChange} disabled={disabled}/>;
  }

  if (type === "drawing") {
    return <DrawingPad base={base} responses={responses} onChange={onChange} disabled={disabled}/>;
  }

  return (
    <textarea
      disabled={disabled}
      className={type === "calculation" ? "is-p2-calculation-response" : "is-p2-lines-response"}
      rows={Math.max(3,Number(config.lines || 4))}
      value={responses[base] || ""}
      onChange={event => onChange(base,event.target.value)}
      aria-label={`${item.label || "Question"} response`}
    />
  );
}

function MarkScheme({ item, evaluation }) {
  const scheme = item.markScheme;
  if (!scheme) return null;

  return (
    <div className="is-p2-mark-scheme">
      <strong>SPARK marking review</strong>
      {evaluation && <div className="is-p2-auto-score"><b>{evaluation.score}/{evaluation.maxMarks} marks</b><span>{evaluation.confidence === "high" ? "High-confidence structured check" : "Estimated from the authored marking points"}</span></div>}
      {evaluation?.criteria?.length > 0 && <ul className="is-p2-auto-criteria">{evaluation.criteria.map(row => <li key={row.id}><b>{row.marks}/{row.maxMarks}</b> <IntegratedScienceText>{row.label}</IntegratedScienceText></li>)}</ul>}
      <ul>{(scheme.points || []).map((point,index) => <li key={index}><IntegratedScienceText>{point}</IntegratedScienceText></li>)}</ul>
      {scheme.guidance && <p><b>Guidance:</b> <IntegratedScienceText>{scheme.guidance}</IntegratedScienceText></p>}
      {Array.isArray(scheme.alternatives) && scheme.alternatives.length > 0 && (
        <p><b>Accept also:</b> <IntegratedScienceText>{scheme.alternatives.join("; ")}</IntegratedScienceText></p>
      )}
    </div>
  );
}

export default function IntegratedSciencePaper2Exam({ supabase, userId, onBack }) {
  const initial = useMemo(
    () => readIntegratedScienceExamState(userId,"paper2"),
    [userId]
  );

  const [modules,setModules] = useState(null);
  const [loadError,setLoadError] = useState(null);
  const [active,setActive] = useState(initial);
  const [currentIndex,setCurrentIndex] = useState(initial?.currentIndex || 0);
  const [responses,setResponses] = useState(initial?.responses || {});
  const [remaining,setRemaining] = useState(() =>
    initial?.endsAt
      ? Math.max(0,Math.round((Number(initial.endsAt) - Date.now()) / 1000))
      : INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS
  );
  const [confirmSubmit,setConfirmSubmit] = useState(false);
  const [showExitConfirm,setShowExitConfirm] = useState(false);
  const submitGuard = useRef(Boolean(initial?.submittedAt));

  useEffect(() => {
    let cancelled = false;
    Promise.all([1,2,3].map(loadIntegratedScienceModule))
      .then(data => { if (!cancelled) setModules(data); })
      .catch(error => { if (!cancelled) setLoadError(error); });
    return () => { cancelled = true; };
  },[]);

  const paper = useMemo(
    () => resolvePaper(modules,active?.questionIds),
    [active?.questionIds,modules]
  );

  const phase = active?.phase || null;
  const review = phase === "review";
  const result = useMemo(() => gradeIntegratedSciencePaper2(paper,responses),[paper,responses]);

  useEffect(() => {
    if (!active?.questionIds?.length) return;
    saveIntegratedScienceExamState(userId,"paper2",{
      ...active,currentIndex,responses,
    });
  },[active,currentIndex,responses,userId]);

  const submit = useCallback(async ({timedOut=false}={}) => {
    if (!paper.length || submitGuard.current) return;
    submitGuard.current = true;

    const completedAt = new Date().toISOString();
    const next = {
      ...active,
      phase:"review",
      submittedAt:completedAt,
      timedOut:Boolean(timedOut),
    };

    setActive(next);
    saveIntegratedScienceExamState(userId,"paper2",{
      ...next,currentIndex,responses,result,
    });

    try {
      if(active?.serverAttemptId){
        await submitServerExamAttempt({
          supabase,attemptId:active.serverAttemptId,responses,score:result.score,maxScore:result.maxScore,
          metadata:{subject:"integrated-science",paper:"02",client_timed_out:Boolean(timedOut)},
        });
      }
      await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:"integrated-science",
          activityKey:"exam:integrated-science-paper2",
          activityType:"exam",
          title:"Integrated Science Paper 02",
          completed:true,
          score:result.score,
          maxScore:result.maxScore,
          percent:result.percent,
          metadata:{
            source:"integrated_science_exam_simulator",
            paper:"02",
            questions:paper.map(question => question.id),
            structure:"two questions per module; practical 20 + structured 15",
            timed_out:Boolean(timedOut),
            grading_mode:"spark_automatic_estimate",
            grader_version:INTEGRATED_SCIENCE_P2_GRADER_VERSION,
            bank_version:"integrated-science-v1.2.0",
            provisional_grading:Boolean(result.provisional),
            low_confidence_items:result.lowConfidence,
            attempt_provenance:buildAttemptProvenance({
              subjectId:"integrated-science",paper:"02",mode:"timed",
              bankVersion:"integrated-science-v1.2.0",rubricVersion:"item-mark-schemes-v1",
              graderVersion:INTEGRATED_SCIENCE_P2_GRADER_VERSION,
              startedAt:active?.startedAt || null,submittedAt:completedAt,responses,
            }),
            at:completedAt,
          },
        },
      });
    } catch (error) {
      console.warn("Could not save Integrated Science Paper 02 completion",error);
    }

    goTop();
  },[active,currentIndex,paper,responses,result,supabase,userId]);

  useEffect(() => {
    if (phase !== "exam" || !active?.endsAt) return undefined;

    const tick = () => {
      const seconds = Math.max(0,Math.round((Number(active.endsAt) - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) submit({timedOut:true});
    };

    tick();
    const interval = window.setInterval(tick,1000);
    return () => window.clearInterval(interval);
  },[active?.endsAt,phase,submit]);

  useEffect(() => {
    if (phase !== "exam" || !active?.serverAttemptId) return undefined;
    let cancelled=false;
    const syncClock=async()=>{
      const clock=await readServerExamClock({supabase,attemptId:active.serverAttemptId});
      if(cancelled || !clock?.available) return;
      const deadline=Date.parse(clock.deadline_at);
      const serverNow=Date.parse(clock.server_now);
      if(Number.isFinite(deadline)&&Number.isFinite(serverNow)){
        const seconds=Math.max(0,Math.round((deadline-serverNow)/1000));
        setRemaining(seconds);
        if(clock.expired || seconds===0) submit({timedOut:true});
      }
    };
    syncClock();
    const interval=window.setInterval(syncClock,30000);
    return ()=>{cancelled=true;window.clearInterval(interval);};
  },[active?.serverAttemptId,phase,submit,supabase]);

  if (loadError) {
    return (
      <main className="is-exam-root">
        <div className="is-exam-shell">
          <div className="is-empty-bank">
            <h1>Paper 02 could not be loaded.</h1>
            <p>{loadError.message}</p>
            <button type="button" className="is-exam-primary" onClick={onBack}>Back to practice</button>
          </div>
        </div>
      </main>
    );
  }

  if (!modules) {
    return <SparkLoader variant="section" label="Loading Integrated Science Paper 02" />;
  }

  function createPaper() {
    const generated = buildIntegratedSciencePaper2(modules);
    const next = {
      phase:"instructions",
      questionIds:generated.map(question => question.id),
      currentIndex:0,
      responses:{},
      createdAt:new Date().toISOString(),
    };

    submitGuard.current = false;
    setActive(next);
    setResponses({});
    setCurrentIndex(0);
    setRemaining(INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS);
    saveIntegratedScienceExamState(userId,"paper2",next);
    goTop();
  }

  async function begin() {
    const now = Date.now();
    const server=await startServerExamAttempt({
      supabase,subjectId:"integrated-science",paper:"02",mode:"timed",
      durationSeconds:INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS,
      bankVersion:"integrated-science-v1.2.0",rubricVersion:"item-mark-schemes-v1",
      graderVersion:INTEGRATED_SCIENCE_P2_GRADER_VERSION,
      metadata:{question_ids:active?.questionIds || []},
    });
    const serverDeadline=server?.available && server.deadline_at ? Date.parse(server.deadline_at) : null;
    const serverStarted=server?.available && server.started_at ? server.started_at : new Date(now).toISOString();
    const next = {
      ...active,
      phase:"exam",
      startedAt:serverStarted,
      endsAt:Number.isFinite(serverDeadline) ? serverDeadline : now + INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS * 1000,
      serverAttemptId:server?.available ? server.attempt_id : null,
    };

    submitGuard.current = false;
    setActive(next);
    setRemaining(INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS);
    goTop();
  }


  function startAnother() {
    saveIntegratedScienceExamState(userId,"paper2",null);
    setActive(null);
    setResponses({});
    setCurrentIndex(0);
    submitGuard.current = false;
    goTop();
  }

  if (!active?.questionIds?.length) {
    return (
      <main className="is-exam-root">
        <div className="is-exam-shell">
          <header className="is-exam-library-hero">
            <div>
              <button type="button" className="is-exam-primary is-exam-back" onClick={onBack}>
                <span aria-hidden="true">{"\u2190"}</span>
                Integrated Science practice
              </button>
              <span className="is-exam-eyebrow">CSEC INTEGRATED SCIENCE PAPER 02</span>
              <h1>Paper 2 Simulator</h1>
              <p>A fresh six-question structured paper is generated with two compulsory questions from each syllabus module. This simulator follows the format effective for May-June 2027 examinations.</p>
            </div>
            <div className="is-exam-hero-spec">
              <strong>6</strong><span>questions</span>
              <strong>150</strong><span>minutes</span>
              <strong>105</strong><span>marks</span>
            </div>
          </header>

          <section className="is-exam-marking-note">
            <strong>How marking works</strong>
            <p>After submission, SPARK grades the paper automatically against the authored item-level marking schemes and opens a question-by-question review.</p>
          </section>

          <div className="is-exam-library-actions">
            <button type="button" className="is-exam-primary" onClick={createPaper}>Generate practice paper</button>
          </div>
        </div>
      </main>
    );
  }

  if (phase === "instructions") {
    return (
      <main className="is-exam-root">
        <div className="is-exam-shell">
          <button type="button" className="is-exam-primary is-exam-page-back" onClick={onBack}>
            <span aria-hidden="true">{"\u2190"}</span>
            Back to practice
          </button>

          <section className="is-exam-instructions-card">
            <span className="is-exam-eyebrow">
              CSEC INTEGRATED SCIENCE <Separator /> PAPER 02
            </span>
            <h1>Integrated Science Paper 2</h1>
            <p className="is-exam-instructions-sub">A complete six-question structured practice examination completed within SPARK.</p>

            <div className="is-exam-instructions-rule" />

            <div className="is-exam-instructions-meta">
              <div><span>Time</span><strong>2 h 30 min</strong></div>
              <div><span>Questions</span><strong>6 compulsory</strong></div>
              <div><span>Marks</span><strong>105</strong></div>
              <div><span>Coverage</span><strong>All 3 modules</strong></div>
            </div>

            <div className="is-exam-instructions-sheet">
              <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
              <ol>
                <li>The examination has three sections, one for each module. Each section contains two compulsory questions.</li>
                <li>The first question in each module is practical/investigative and is worth 20 marks.</li>
                <li>The second question in each module is worth 15 marks.</li>
                <li>Answer all six questions. You may use a silent, non-programmable calculator.</li>
                <li>SPARK saves typed responses while you work and submits automatically when time expires.</li>
              </ol>
            </div>

            <div className="is-exam-instructions-note">
              <strong>After submission</strong>
              <span>SPARK grades the paper automatically, then opens the authored mark schemes and its criterion-by-criterion estimate for review.</span>
            </div>

            <div className="is-exam-instructions-actions">
              <button type="button" className="is-exam-primary" onClick={begin}>Start examination</button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const question = paper[currentIndex];

  function updateResponse(key,value) {
    if (review) return;
    setResponses(current => ({...current,[key]:value}));
  }

  function goTo(index) {
    setCurrentIndex(Math.max(0,Math.min(5,index)));
    goTop();
  }

  return (
    <main className="is-exam-root">
      <div className="is-exam-shell">
        <header className="is-exam-head">
          <div>
            <button type="button" className="is-exam-primary is-exam-back" onClick={() => setShowExitConfirm(true)}>Exit</button>
            <span className="is-exam-eyebrow">
              CSEC INTEGRATED SCIENCE <Separator /> PAPER 02
            </span>
            <h1>Integrated Science Paper 2</h1>
            <p>{review ? "Mark-scheme review" : `Question ${currentIndex + 1} of 6`} <Separator /> Module {question.module} <Separator /> {question.totalMarks} marks</p>
          </div>

          <div className={`is-exam-timer ${remaining <= 900 && !review ? "warning" : ""}`}>
            <span>{review ? "Submitted" : "Time remaining"}</span>
            <strong>{review ? "REVIEW" : formatIntegratedScienceExamTime(remaining)}</strong>
          </div>
        </header>

        {review && (
          <section className="is-p2-review-note">
            <strong>SPARK has marked your paper.</strong>
            <p>Your estimated score is <b>{result.score}/{result.maxScore}</b> ({result.percent}%). Structured answers are checked directly against the authored scheme. Written, graph and drawing judgements are estimated where the available evidence is less precise. You do not need to mark your own work.</p>
          </section>
        )}

        <nav className="is-p2-question-nav" aria-label="Paper 02 questions">
          {paper.map((item,index) => (
            <button
              key={item.id}
              type="button"
              className={index === currentIndex ? "active" : ""}
              onClick={() => goTo(index)}
            >
              <span>Q{index + 1}</span>
              <small>Module {item.module} <Separator /> {review ? `${result.questions[index]?.score ?? 0}/${item.totalMarks}` : `${item.totalMarks} marks`}</small>
            </button>
          ))}
        </nav>

        <article className={`is-p2-question is-p2-exam-question ${review ? "is-review" : ""}`}>
          <div className="is-p2-question-heading">
            <div>
              <span className="is-exam-eyebrow">MODULE {question.module}</span>
              <h2>Question {currentIndex + 1}</h2>
              <p>{question.kind === "practical" ? "Practical / investigative" : "Structured"} question</p>
            </div>
            <strong>{question.totalMarks} marks</strong>
          </div>

          {(question.parts || []).map((part,partIndex) => (
            <section key={`${question.id}-${partIndex}`} className="is-p2-part">
              <h3>{part.label}</h3>
              {part.context && <p className="is-p2-context"><IntegratedScienceText>{part.context}</IntegratedScienceText></p>}
              {part.svg && <TrustedBankSvg svg={part.svg} />}
              {part.table && <BankTable table={part.table} />}

              {(part.items || []).map((item,itemIndex) => (
                <div className="is-p2-subquestion" key={`${partIndex}-${itemIndex}`}>
                  <div className="is-p2-subquestion-prompt">
                    <strong>{item.label}</strong>
                    <span><IntegratedScienceText>{item.prompt}</IntegratedScienceText></span>
                    <b>{item.marks} mark{item.marks === 1 ? "" : "s"}</b>
                  </div>

                  {item.svg && <TrustedBankSvg svg={item.svg} />}
                  {item.table && <BankTable table={item.table} />}

                  <div className="is-p2-response-area">
                    <BoundResponse
                      questionId={question.id}
                      partIndex={partIndex}
                      itemIndex={itemIndex}
                      item={item}
                      responses={responses}
                      onChange={updateResponse}
                      disabled={review}
                    />
                  </div>

                  {review && <MarkScheme item={item} evaluation={result.questions[currentIndex]?.items?.find(row => row.partIndex===partIndex && row.itemIndex===itemIndex)} />}
                </div>
              ))}
            </section>
          ))}
        </article>


        <footer className="is-exam-footer">
          <button type="button" className="is-exam-primary" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}>
            <span aria-hidden="true">{"\u2190"}</span>
            Previous
          </button>

          <span>Question {currentIndex + 1} of 6</span>

          {currentIndex < 5 ? (
            <button type="button" className="is-exam-primary" onClick={() => goTo(currentIndex + 1)}>
              Next question
              <span aria-hidden="true">{"\u2192"}</span>
            </button>
          ) : !review ? (
            <button type="button" className="is-exam-primary" onClick={() => setConfirmSubmit(true)}>Submit paper</button>
          ) : (
            <button type="button" className="is-exam-primary" disabled>Score saved automatically</button>
          )}
        </footer>

        {review && (
          <div className="is-exam-result-actions">
            <button type="button" className="is-exam-primary" onClick={onBack}>
              <span aria-hidden="true">{"\u2190"}</span>
              Back to Integrated Science practice
            </button>
            <button type="button" className="is-exam-primary" onClick={startAnother}>Start another Paper 2</button>
          </div>
        )}

        {showExitConfirm && !review && (
          <div className="is-exam-modal-backdrop" onMouseDown={() => setShowExitConfirm(false)}>
            <section className="is-exam-modal" role="dialog" aria-modal="true" aria-labelledby="is-p2-exit-title" onMouseDown={event => event.stopPropagation()}>
              <span className="is-exam-eyebrow">EXIT EXAMINATION</span>
              <h2 id="is-p2-exit-title">Exit Integrated Science Paper 02?</h2>
              <p>Your typed responses and question position are saved. The examination timer continues to run while you are away.</p>
              <div>
                <button type="button" className="is-exam-secondary" onClick={() => setShowExitConfirm(false)}>Continue examination</button>
                <button type="button" className="is-exam-primary" onClick={onBack}>Exit</button>
              </div>
            </section>
          </div>
        )}

        {confirmSubmit && !review && (
          <div className="is-exam-modal-backdrop" onMouseDown={() => setConfirmSubmit(false)}>
            <section className="is-exam-modal" role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
              <span className="is-exam-eyebrow">SUBMIT PAPER</span>
              <h2>Submit Integrated Science Paper 02?</h2>
              <p>All six questions will be locked. SPARK will grade the paper automatically and open the mark schemes for review.</p>
              <div>
                <button type="button" className="is-exam-secondary" onClick={() => setConfirmSubmit(false)}>Return to paper</button>
                <button type="button" className="is-exam-primary" onClick={() => {setConfirmSubmit(false);submit({timedOut:false});}}>Submit paper</button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
