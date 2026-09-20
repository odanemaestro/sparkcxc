import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SparkLoader from "../../components/ui/SparkLoader";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { loadIntegratedScienceModule } from "../data/integratedScienceBank";
import { IntegratedSciencePaper1Question } from "./IntegratedScienceQuestionRenderer";
import {
  buildIntegratedSciencePaper1,
  formatIntegratedScienceExamTime,
  gradeIntegratedSciencePaper1,
  INTEGRATED_SCIENCE_PAPER1_DURATION_SECONDS,
  readIntegratedScienceExamState,
  saveIntegratedScienceExamState,
} from "./integratedScienceExamModel";

function goTop() {
  window.scrollTo?.({top:0,behavior:"smooth"});
}

function resolvePaper(modules,paperIds) {
  const byId = new Map(
    (modules || []).flatMap(module => module.paper01 || []).map(question => [question.id,question])
  );
  return (paperIds || []).map(id => byId.get(id)).filter(Boolean);
}

function Separator() {
  return <span className="is-meta-separator" aria-hidden="true">&middot;</span>;
}

export default function IntegratedSciencePaper1Exam({ supabase, userId, onBack }) {
  const initial = useMemo(
    () => readIntegratedScienceExamState(userId,"paper1"),
    [userId]
  );

  const [modules,setModules] = useState(null);
  const [loadError,setLoadError] = useState(null);
  const [active,setActive] = useState(initial);
  const [currentIndex,setCurrentIndex] = useState(initial?.currentIndex || 0);
  const [answers,setAnswers] = useState(initial?.answers || {});
  const [flags,setFlags] = useState(initial?.flags || {});
  const [remaining,setRemaining] = useState(() =>
    initial?.endsAt
      ? Math.max(0,Math.round((Number(initial.endsAt) - Date.now()) / 1000))
      : INTEGRATED_SCIENCE_PAPER1_DURATION_SECONDS
  );
  const [showNavigator,setShowNavigator] = useState(false);
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

  const result = useMemo(
    () => gradeIntegratedSciencePaper1(paper,answers),
    [answers,paper]
  );

  const phase = active?.phase || null;
  const review = phase === "review";

  useEffect(() => {
    if (!active?.questionIds?.length) return;
    saveIntegratedScienceExamState(userId,"paper1",{
      ...active,
      currentIndex,
      answers,
      flags,
    });
  },[active,answers,currentIndex,flags,userId]);

  const submit = useCallback(async ({timedOut=false}={}) => {
    if (!paper.length || submitGuard.current) return;
    submitGuard.current = true;

    const completedAt = new Date().toISOString();
    const final = gradeIntegratedSciencePaper1(paper,answers);
    const next = {
      ...active,
      phase:"review",
      submittedAt:completedAt,
      timedOut:Boolean(timedOut),
      result:{score:final.score,maxScore:60,percent:final.percent},
    };

    setActive(next);
    saveIntegratedScienceExamState(userId,"paper1",{
      ...next,currentIndex,answers,flags,
    });

    try {
      await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:"integrated-science",
          activityKey:"exam:integrated-science-paper1",
          activityType:"exam",
          title:"Integrated Science Paper 01",
          completed:true,
          score:final.score,
          maxScore:60,
          percent:final.percent,
          metadata:{
            source:"integrated_science_exam_simulator",
            paper:"01",
            questions:paper.map(question => question.id),
            module_distribution:{"1":20,"2":20,"3":20},
            timed_out:Boolean(timedOut),
            at:completedAt,
          },
        },
      });
    } catch (error) {
      console.warn("Could not save Integrated Science Paper 01 result",error);
    }

    goTop();
  },[active,answers,currentIndex,flags,paper,supabase,userId]);

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
            <h1>Paper 01 could not be loaded.</h1>
            <p>{loadError.message}</p>
            <button type="button" className="is-exam-primary" onClick={onBack}>Back to practice</button>
          </div>
        </div>
      </main>
    );
  }

  if (!modules) {
    return <SparkLoader variant="section" label="Loading Integrated Science Paper 01" />;
  }

  function createPaper() {
    const generated = buildIntegratedSciencePaper1(modules);
    const next = {
      phase:"instructions",
      questionIds:generated.map(question => question.id),
      currentIndex:0,
      answers:{},
      flags:{},
      createdAt:new Date().toISOString(),
    };

    submitGuard.current = false;
    setActive(next);
    setAnswers({});
    setFlags({});
    setCurrentIndex(0);
    setRemaining(INTEGRATED_SCIENCE_PAPER1_DURATION_SECONDS);
    saveIntegratedScienceExamState(userId,"paper1",next);
    goTop();
  }

  function begin() {
    const now = Date.now();
    const next = {
      ...active,
      phase:"exam",
      startedAt:new Date(now).toISOString(),
      endsAt:now + INTEGRATED_SCIENCE_PAPER1_DURATION_SECONDS * 1000,
    };

    submitGuard.current = false;
    setActive(next);
    setRemaining(INTEGRATED_SCIENCE_PAPER1_DURATION_SECONDS);
    goTop();
  }

  function startAnother() {
    saveIntegratedScienceExamState(userId,"paper1",null);
    setActive(null);
    setAnswers({});
    setFlags({});
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
              <span className="is-exam-eyebrow">CSEC INTEGRATED SCIENCE PAPER 01</span>
              <h1>Paper 1 Simulator</h1>
              <p>A fresh 60-item practice examination is generated from the full question bank, with 20 questions from each syllabus module.</p>
            </div>
            <div className="is-exam-hero-spec">
              <strong>60</strong><span>questions</span>
              <strong>75</strong><span>minutes</span>
              <strong>60</strong><span>marks</span>
            </div>
          </header>

          <section className="is-exam-marking-note">
            <strong>How marking works</strong>
            <p>Each correct answer earns one mark. SPARK marks the paper immediately after submission and opens a complete answer review with the authored explanation for every item.</p>
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
              CSEC INTEGRATED SCIENCE <Separator /> PAPER 01
            </span>
            <h1>Integrated Science Paper 1</h1>
            <p className="is-exam-instructions-sub">A complete 60-item multiple-choice practice examination completed and marked within SPARK.</p>

            <div className="is-exam-instructions-rule" />

            <div className="is-exam-instructions-meta">
              <div><span>Time</span><strong>1 h 15 min</strong></div>
              <div><span>Items</span><strong>60</strong></div>
              <div><span>Marks</span><strong>60</strong></div>
              <div><span>Coverage</span><strong>All 3 modules</strong></div>
            </div>

            <div className="is-exam-instructions-sheet">
              <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
              <ol>
                <li>This test consists of 60 items. You have 1 hour and 15 minutes to answer them.</li>
                <li>Each item has four suggested answers lettered A, B, C and D. Choose the best answer.</li>
                <li>The paper contains 20 questions from each of the three syllabus modules.</li>
                <li>You may change an answer at any time before submitting the paper.</li>
                <li>If you cannot answer an item, move on and return to it later. Use Flag for review when useful.</li>
                <li>SPARK saves your answers while you work and submits the paper automatically when time expires.</li>
              </ol>
            </div>

            <div className="is-exam-instructions-note">
              <strong>After submission</strong>
              <span>Your score is saved. SPARK then opens an item-by-item review showing your choice, the correct answer and the authored explanation.</span>
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
  const selected = answers[question.id] || null;
  const flagged = Boolean(flags[question.id]);
  const flaggedCount = Object.values(flags).filter(Boolean).length;

  function goTo(index) {
    setCurrentIndex(Math.max(0,Math.min(59,index)));
    setShowNavigator(false);
    goTop();
  }

  return (
    <main className="is-exam-root">
      <div className="is-exam-shell is-exam-paper-shell">
        <header className="is-exam-head">
          <div>
            <button type="button" className="is-exam-primary is-exam-back" onClick={() => setShowExitConfirm(true)}>Exit</button>
            <span className="is-exam-eyebrow">
              CSEC INTEGRATED SCIENCE <Separator /> PAPER 01
            </span>
            <h1>Integrated Science Paper 1</h1>
            <p>{review ? "Answer review" : `${result.answeredCount}/60 answered`}{!review && <> <Separator /> {flaggedCount} flagged</>}</p>
          </div>

          <div className="is-exam-head-actions">
            <button
              type="button"
              className="is-exam-nav-toggle"
              aria-expanded={showNavigator}
              onClick={() => setShowNavigator(true)}
            >
              Questions {currentIndex + 1}/60
            </button>
            <div className={`is-exam-timer ${remaining <= 600 && !review ? "warning" : ""}`}>
              <span>{review ? "Submitted" : "Time remaining"}</span>
              <strong>{review ? "REVIEW" : formatIntegratedScienceExamTime(remaining)}</strong>
            </div>
          </div>
        </header>

        {review && (
          <>
            <section className="is-exam-review-summary">
              <div><span>Marks earned</span><strong>{result.score}/60</strong></div>
              <div><span>Answered</span><strong>{result.answeredCount}/60</strong></div>
              <div><span>Final Paper 1 score</span><strong>{result.percent}%</strong></div>
              <p>Your result is saved. Use the question navigator to review each answer and explanation.</p>
            </section>

            <section className="is-exam-module-breakdown">
              {result.modules.map(module => (
                <div key={module.module}>
                  <span>Module {module.module}</span>
                  <strong>{module.earned}/{module.of}</strong>
                </div>
              ))}
            </section>
          </>
        )}

        <div className="is-exam-layout">
          <div className="is-exam-main">
            <article className={`is-exam-question-card ${review ? "is-review" : ""}`}>
              <div className="is-exam-question-heading">
                <div>
                  <span className="is-exam-eyebrow">MODULE {question.module}</span>
                  <h2>Question {currentIndex + 1}</h2>
                </div>

                <div className="is-exam-question-tools">
                  <strong>1 mark</strong>
                  {!review && (
                    <button
                      type="button"
                      className={`is-exam-flag ${flagged ? "active" : ""}`}
                      aria-pressed={flagged}
                      onClick={() => setFlags(current => ({...current,[question.id]:!current[question.id]}))}
                    >
                      {flagged ? "Flagged" : "Flag for review"}
                    </button>
                  )}
                </div>
              </div>

              <IntegratedSciencePaper1Question
                moduleData={modules[Number(question.module) - 1]}
                question={question}
                selectedAnswer={selected}
                onAnswer={letter => !review && setAnswers(current => ({...current,[question.id]:letter}))}
                revealFeedback={review}
                lockAfterAnswer={review}
                showMeta={false}
              />
            </article>

            <footer className="is-exam-footer">
              <button type="button" className="is-exam-primary" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}>
                <span aria-hidden="true">{"\u2190"}</span>
                Previous
              </button>

              <span>Question {currentIndex + 1} of 60</span>

              {currentIndex < 59 ? (
                <button type="button" className="is-exam-primary" onClick={() => goTo(currentIndex + 1)}>
                  Next question
                  <span aria-hidden="true">{"\u2192"}</span>
                </button>
              ) : !review ? (
                <button type="button" className="is-exam-primary" onClick={() => setConfirmSubmit(true)}>Submit paper</button>
              ) : (
                <button type="button" className="is-exam-secondary" disabled>Review complete</button>
              )}
            </footer>

            {!review && (
              <div className="is-exam-submit-strip">
                <div>
                  <strong>{result.answeredCount} answered</strong>
                  <span>{60 - result.answeredCount} unanswered <Separator /> {flaggedCount} flagged</span>
                </div>
                <button type="button" className="is-exam-primary" onClick={() => setConfirmSubmit(true)}>Submit Paper 1</button>
              </div>
            )}

            {review && (
              <div className="is-exam-result-actions">
                <button type="button" className="is-exam-primary" onClick={onBack}>
                  <span aria-hidden="true">{"\u2190"}</span>
                  Back to Integrated Science practice
                </button>
                <button type="button" className="is-exam-primary" onClick={startAnother}>Start another Paper 1</button>
              </div>
            )}
          </div>

          <aside className="is-exam-navigator is-exam-navigator-desktop" aria-label="Question navigator">
            <div className="is-exam-navigator-head">
              <strong>Question navigator</strong>
              <span>{review ? `${result.answeredCount} answered` : `${result.answeredCount} answered, ${60 - result.answeredCount} remaining`}</span>
            </div>

            <nav className="is-exam-nav-grid" aria-label="Paper 1 questions">
              {paper.map((item,index) => {
                const answer = answers[item.id];
                const row = review ? result.rows[index] : null;
                const state = review
                  ? row?.correct ? "correct" : row?.answered ? "wrong" : "blank"
                  : answer ? "answered" : "blank";

                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`${index === currentIndex ? "active" : ""} ${state} ${flags[item.id] ? "flagged" : ""}`}
                    onClick={() => goTo(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </nav>

            <div className="is-exam-nav-legend">
              {!review ? (
                <>
                  <span><i className="answered" /> Answered</span>
                  <span><i className="flagged" /> Flagged</span>
                </>
              ) : (
                <>
                  <span><i className="correct" /> Correct</span>
                  <span><i className="wrong" /> Incorrect</span>
                </>
              )}
            </div>

            {!review && (
              <button type="button" className="is-exam-primary is-exam-submit-side" onClick={() => setConfirmSubmit(true)}>Submit Paper 1</button>
            )}
          </aside>
        </div>

        <button type="button" className="is-exam-mobile-nav" onClick={() => setShowNavigator(true)}>
          Questions {currentIndex + 1}/60
        </button>

        {showNavigator && (
          <div className="is-exam-drawer-backdrop" onMouseDown={() => setShowNavigator(false)}>
            <section className="is-exam-drawer" onMouseDown={event => event.stopPropagation()}>
              <header>
                <div>
                  <strong>Question navigator</strong>
                  <span>{result.answeredCount}/60 answered</span>
                </div>
                <button type="button" onClick={() => setShowNavigator(false)}>Close</button>
              </header>

              <div className="is-exam-nav-grid">
                {paper.map((item,index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${index === currentIndex ? "active" : ""} ${answers[item.id] ? "answered" : "blank"} ${flags[item.id] ? "flagged" : ""}`}
                    onClick={() => goTo(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {showExitConfirm && !review && (
          <div className="is-exam-modal-backdrop" onMouseDown={() => setShowExitConfirm(false)}>
            <section className="is-exam-modal" role="dialog" aria-modal="true" aria-labelledby="is-p1-exit-title" onMouseDown={event => event.stopPropagation()}>
              <span className="is-exam-eyebrow">EXIT EXAMINATION</span>
              <h2 id="is-p1-exit-title">Exit Integrated Science Paper 01?</h2>
              <p>Your answers and question position are saved. The examination timer continues to run while you are away.</p>
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
              <h2>Submit Integrated Science Paper 01?</h2>
              <p>You answered {result.answeredCount} of 60 questions. Answers cannot be changed after submission.</p>
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
