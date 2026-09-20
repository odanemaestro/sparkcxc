import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SparkLoader from "../../components/ui/SparkLoader";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { loadIntegratedScienceModule } from "../data/integratedScienceBank";
import { BankTable, TrustedBankSvg } from "./IntegratedScienceQuestionRenderer";
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
    return (
      <>
        <div className="is-p2-graph-response" style={{minHeight:config.height || 300}}>
          <span className="is-p2-y-label">{config.y || "y-axis"}</span>
          <span className="is-p2-x-label">{config.x || "x-axis"}</span>
        </div>
        <textarea
          disabled={disabled}
          className="is-p2-lines-response"
          rows={3}
          value={responses[base] || ""}
          onChange={event => onChange(base,event.target.value)}
          placeholder="Record plotted values, scale notes or graph working here."
        />
      </>
    );
  }

  if (type === "drawing") {
    return (
      <>
        <div className="is-p2-drawing-response" style={{minHeight:config.height || 220}}>
          <span>Use this space as your drawing / diagram guide.</span>
        </div>
        <textarea
          disabled={disabled}
          className="is-p2-lines-response"
          rows={3}
          value={responses[base] || ""}
          onChange={event => onChange(base,event.target.value)}
          placeholder="Record labels or notes for your drawing here."
        />
      </>
    );
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

function MarkScheme({ item }) {
  const scheme = item.markScheme;
  if (!scheme) return null;

  return (
    <div className="is-p2-mark-scheme">
      <strong>Mark scheme</strong>
      <ul>{(scheme.points || []).map((point,index) => <li key={index}>{point}</li>)}</ul>
      {scheme.guidance && <p><b>Guidance:</b> {scheme.guidance}</p>}
      {Array.isArray(scheme.alternatives) && scheme.alternatives.length > 0 && (
        <p><b>Accept also:</b> {scheme.alternatives.join("; ")}</p>
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
  const [selfMarks,setSelfMarks] = useState(initial?.selfMarks || {});
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

  useEffect(() => {
    if (!active?.questionIds?.length) return;
    saveIntegratedScienceExamState(userId,"paper2",{
      ...active,currentIndex,responses,selfMarks,
    });
  },[active,currentIndex,responses,selfMarks,userId]);

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
      ...next,currentIndex,responses,selfMarks,
    });

    try {
      await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:"integrated-science",
          activityKey:"exam:integrated-science-paper2",
          activityType:"exam",
          title:"Integrated Science Paper 02",
          completed:true,
          maxScore:105,
          metadata:{
            source:"integrated_science_exam_simulator",
            paper:"02",
            questions:paper.map(question => question.id),
            structure:"two questions per module; practical 20 + structured 15",
            timed_out:Boolean(timedOut),
            self_mark_pending:true,
            at:completedAt,
          },
        },
      });
    } catch (error) {
      console.warn("Could not save Integrated Science Paper 02 completion",error);
    }

    goTop();
  },[active,currentIndex,paper,responses,selfMarks,supabase,userId]);

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
      selfMarks:{},
      createdAt:new Date().toISOString(),
    };

    submitGuard.current = false;
    setActive(next);
    setResponses({});
    setSelfMarks({});
    setCurrentIndex(0);
    setRemaining(INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS);
    saveIntegratedScienceExamState(userId,"paper2",next);
    goTop();
  }

  function begin() {
    const now = Date.now();
    const next = {
      ...active,
      phase:"exam",
      startedAt:new Date(now).toISOString(),
      endsAt:now + INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS * 1000,
    };

    submitGuard.current = false;
    setActive(next);
    setRemaining(INTEGRATED_SCIENCE_PAPER2_DURATION_SECONDS);
    goTop();
  }

  async function saveSelfMarkedScore() {
    const score = paper.reduce((sum,question) => {
      const value = Number(selfMarks[question.id]);
      return sum + (Number.isFinite(value) ? Math.max(0,Math.min(Number(question.totalMarks || 0),value)) : 0);
    },0);

    const percent = Math.round((score / 105) * 100);

    try {
      await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:"integrated-science",
          activityKey:"exam:integrated-science-paper2",
          activityType:"exam",
          title:"Integrated Science Paper 02",
          completed:true,
          score,
          maxScore:105,
          percent,
          metadata:{
            source:"integrated_science_exam_simulator",
            paper:"02",
            questions:paper.map(question => question.id),
            self_marked:true,
            self_marks:selfMarks,
            at:new Date().toISOString(),
          },
        },
      });

      setActive(current => ({...current,selfMarkedScore:score,selfMarkedPercent:percent}));
    } catch (error) {
      console.warn("Could not save Integrated Science Paper 02 score",error);
    }
  }

  function startAnother() {
    saveIntegratedScienceExamState(userId,"paper2",null);
    setActive(null);
    setResponses({});
    setSelfMarks({});
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
              <p>A fresh six-question structured paper is generated with two compulsory questions from each syllabus module.</p>
            </div>
            <div className="is-exam-hero-spec">
              <strong>6</strong><span>questions</span>
              <strong>150</strong><span>minutes</span>
              <strong>105</strong><span>marks</span>
            </div>
          </header>

          <section className="is-exam-marking-note">
            <strong>How marking works</strong>
            <p>After submission, SPARK opens the authored mark schemes. Review each response, award the marks earned for each question, and save the final Paper 2 score.</p>
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
              <span>The authored mark schemes open for review. Use them to score each question and save the final Paper 2 result.</span>
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
            <strong>Mark your paper against the scheme.</strong>
            <p>Paper 02 contains written, graphical and drawing responses. Review each question against its mark scheme, enter the marks earned for that question, then save the final score.</p>
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
              <small>Module {item.module} <Separator /> {item.totalMarks} marks</small>
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
              {part.context && <p className="is-p2-context">{part.context}</p>}
              {part.svg && <TrustedBankSvg svg={part.svg} />}
              {part.table && <BankTable table={part.table} />}

              {(part.items || []).map((item,itemIndex) => (
                <div className="is-p2-subquestion" key={`${partIndex}-${itemIndex}`}>
                  <div className="is-p2-subquestion-prompt">
                    <strong>{item.label}</strong>
                    <span>{item.prompt}</span>
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

                  {review && <MarkScheme item={item} />}
                </div>
              ))}
            </section>
          ))}
        </article>

        {review && (
          <section className="is-p2-self-score">
            <label>
              <span>Marks earned for Question {currentIndex + 1}</span>
              <input
                type="number"
                min="0"
                max={question.totalMarks}
                value={selfMarks[question.id] ?? ""}
                onChange={event => setSelfMarks(current => ({...current,[question.id]:event.target.value}))}
              />
              <b>/ {question.totalMarks}</b>
            </label>
          </section>
        )}

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
            <button type="button" className="is-exam-primary" onClick={saveSelfMarkedScore}>Save Paper 2 score</button>
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
              <p>All six questions will be locked. The mark schemes will then open for review and scoring.</p>
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
