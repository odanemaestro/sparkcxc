import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import EnglishAPaper1Question from "./EnglishAPaper1Question";
import {
  buildEnglishAPaper1,
  formatEnglishAExamTime,
  gradeEnglishAPaper1,
  ENGLISH_A_PAPER1_DURATION_SECONDS,
  readEnglishAExamState,
  saveEnglishAExamState,
} from "./englishAExamModel";
import { ENGLISH_A_MODULES } from "../data/englishAPaper1Bank";
import "../../integratedScience/practice/integratedScienceExam.css";
import "./englishAExam.css";

function goTop() {
  window.scrollTo?.({top:0,behavior:"smooth"});
}

function Separator() {
  return <span className="is-meta-separator" aria-hidden="true">&middot;</span>;
}

export default function EnglishAPaper1Exam({ supabase, userId, onBack }) {
  const initial = useMemo(() => readEnglishAExamState(userId), [userId]);
  const [active,setActive] = useState(initial);
  const [currentIndex,setCurrentIndex] = useState(initial?.currentIndex || 0);
  const [answers,setAnswers] = useState(initial?.answers || {});
  const [flags,setFlags] = useState(initial?.flags || {});
  const [remaining,setRemaining] = useState(() =>
    initial?.endsAt
      ? Math.max(0,Math.round((Number(initial.endsAt) - Date.now()) / 1000))
      : ENGLISH_A_PAPER1_DURATION_SECONDS
  );
  const [showNavigator,setShowNavigator] = useState(false);
  const [confirmSubmit,setConfirmSubmit] = useState(false);
  const [showExitConfirm,setShowExitConfirm] = useState(false);
  const submitGuard = useRef(Boolean(initial?.submittedAt));

  const paper = useMemo(() => buildEnglishAPaper1(), []);
  const result = useMemo(() => gradeEnglishAPaper1(paper,answers), [answers,paper]);
  const phase = active?.phase || null;
  const review = phase === "review";

  useEffect(() => {
    if (!active) return;
    saveEnglishAExamState(userId,{...active,currentIndex,answers,flags});
  },[active,answers,currentIndex,flags,userId]);

  const submit = useCallback(async ({timedOut=false}={}) => {
    if (!paper.length || submitGuard.current) return;
    submitGuard.current = true;

    const completedAt = new Date().toISOString();
    const final = gradeEnglishAPaper1(paper,answers);
    const next = {
      ...active,
      phase:"review",
      submittedAt:completedAt,
      timedOut:Boolean(timedOut),
      result:{score:final.score,maxScore:60,percent:final.percent},
    };

    setActive(next);
    saveEnglishAExamState(userId,{...next,currentIndex,answers,flags});

    try {
      await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:"english-a",
          activityKey:"exam:english-a-paper1-v1",
          activityType:"exam",
          title:"English A Paper 01",
          completed:true,
          score:final.score,
          maxScore:60,
          percent:final.percent,
          metadata:{
            source:"english_a_exam_simulator_v1",
            syllabus:"CXC 01/G/SYLL 25",
            paper:"01",
            module_distribution:{"1":20,"2":20,"3":20},
            discrete_items:15,
            reading_comprehension_items:45,
            questions:paper.map(question => question.id),
            timed_out:Boolean(timedOut),
            at:completedAt,
          },
        },
      });
    } catch (error) {
      console.warn("Could not save English A Paper 01 result",error);
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

  function createPaper() {
    const now = new Date().toISOString();
    const next = {
      phase:"instructions",
      questionIds:paper.map(question => question.id),
      currentIndex:0,
      answers:{},
      flags:{},
      createdAt:now,
    };
    submitGuard.current = false;
    setActive(next);
    setAnswers({});
    setFlags({});
    setCurrentIndex(0);
    setRemaining(ENGLISH_A_PAPER1_DURATION_SECONDS);
    saveEnglishAExamState(userId,next);
    goTop();
  }

  function begin() {
    const now = Date.now();
    const next = {
      ...active,
      phase:"exam",
      startedAt:new Date(now).toISOString(),
      endsAt:now + ENGLISH_A_PAPER1_DURATION_SECONDS * 1000,
    };
    submitGuard.current = false;
    setActive(next);
    setRemaining(ENGLISH_A_PAPER1_DURATION_SECONDS);
    goTop();
  }

  function startAnother() {
    saveEnglishAExamState(userId,null);
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
                <span aria-hidden="true">{"←"}</span>
                English A practice
              </button>
              <span className="is-exam-eyebrow">CSEC ENGLISH A PAPER 01</span>
              <h1>Paper 1 Simulator</h1>
              <p>A complete 60-item examination built to the revised English A Paper 01 blueprint, with 20 questions from each discourse module.</p>
            </div>
            <div className="is-exam-hero-spec">
              <strong>60</strong><span>questions</span>
              <strong>90</strong><span>minutes</span>
              <strong>60</strong><span>marks</span>
            </div>
          </header>

          <section className="is-exam-marking-note">
            <strong>2027 examination structure</strong>
            <p>Each module contains 5 discrete language items and 15 reading-comprehension items. The comprehension questions are based on two stimuli in each module.</p>
          </section>

          <div className="is-exam-library-actions">
            <button type="button" className="is-exam-primary" onClick={createPaper}>Prepare practice paper</button>
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
            <span aria-hidden="true">{"←"}</span>
            Back to English A practice
          </button>

          <section className="is-exam-instructions-card">
            <span className="is-exam-eyebrow">CSEC ENGLISH A <Separator /> PAPER 01</span>
            <h1>English A Paper 1</h1>
            <p className="is-exam-instructions-sub">A 60-item multiple-choice practice examination covering Informative, Literary and Persuasive Discourse.</p>
            <div className="is-exam-instructions-rule" />

            <div className="is-exam-instructions-meta">
              <div><span>Time</span><strong>1 h 30 min</strong></div>
              <div><span>Items</span><strong>60</strong></div>
              <div><span>Marks</span><strong>60</strong></div>
              <div><span>Coverage</span><strong>3 modules</strong></div>
            </div>

            <div className="is-exam-instructions-sheet">
              <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
              <ol>
                <li>This test consists of 60 items. You have 1 hour and 30 minutes to answer them.</li>
                <li>Each item has four suggested answers lettered A, B, C and D. Choose the best answer.</li>
                <li>Questions 1–20 cover Informative Discourse, 21–40 Literary Discourse, and 41–60 Persuasive Discourse.</li>
                <li>Each module contains 5 discrete items and 15 reading-comprehension items.</li>
                <li>You may change an answer at any time before submitting the paper.</li>
                <li>Use Flag for review if you want to return to a question later.</li>
                <li>SPARK saves your answers while you work and submits automatically if time expires.</li>
              </ol>
            </div>

            <div className="is-exam-instructions-note">
              <strong>After submission</strong>
              <span>SPARK marks the paper and opens an item-by-item review with the correct answer and a short explanation.</span>
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
            {!review && <button type="button" className="is-exam-primary is-exam-back" onClick={() => setShowExitConfirm(true)}>Exit</button>}
            {review && <button type="button" className="is-exam-primary is-exam-back" onClick={onBack}>English A practice</button>}
            <span className="is-exam-eyebrow">CSEC ENGLISH A <Separator /> PAPER 01</span>
            <h1>English A Paper 1</h1>
            <p>
              {review ? "Answer review" : result.answeredCount + "/60 answered"}
              {!review && <> <Separator /> {flaggedCount} flagged</>}
            </p>
          </div>

          <div className="is-exam-head-actions">
            <button type="button" className="is-exam-nav-toggle" aria-expanded={showNavigator} onClick={() => setShowNavigator(true)}>
              Questions {currentIndex + 1}/60
            </button>
            <div className={"is-exam-timer " + (remaining <= 600 && !review ? "warning" : "")}>
              <span>{review ? "Submitted" : "Time remaining"}</span>
              <strong>{review ? "REVIEW" : formatEnglishAExamTime(remaining)}</strong>
            </div>
          </div>
        </header>

        {review && (
          <>
            <section className="is-exam-review-summary">
              <div><span>Marks earned</span><strong>{result.score}/60</strong></div>
              <div><span>Answered</span><strong>{result.answeredCount}/60</strong></div>
              <div><span>Final Paper 1 score</span><strong>{result.percent}%</strong></div>
              <p>Your result is saved. Review each question to see the correct answer and explanation.</p>
            </section>
            <section className="is-exam-module-breakdown">
              {result.modules.map(module => (
                <div key={module.module}>
                  <span>Module {module.module}: {ENGLISH_A_MODULES[module.module]}</span>
                  <strong>{module.earned}/{module.of}</strong>
                </div>
              ))}
            </section>
          </>
        )}

        <div className="is-exam-layout">
          <div className="is-exam-main">
            <article className={"is-exam-question-card " + (review ? "is-review" : "")}>
              <div className="is-exam-question-heading">
                <div>
                  <span className="is-exam-eyebrow">MODULE {question.module} <Separator /> {ENGLISH_A_MODULES[question.module]}</span>
                  <h2>Question {currentIndex + 1}</h2>
                </div>
                <div className="is-exam-question-tools">
                  <strong>1 mark</strong>
                  {!review && (
                    <button type="button" className={"is-exam-flag " + (flagged ? "active" : "")} aria-pressed={flagged}
                      onClick={() => setFlags(current => ({...current,[question.id]:!current[question.id]}))}>
                      {flagged ? "Flagged" : "Flag for review"}
                    </button>
                  )}
                </div>
              </div>

              <EnglishAPaper1Question
                question={question}
                selectedAnswer={selected}
                onAnswer={letter => !review && setAnswers(current => ({...current,[question.id]:letter}))}
                revealFeedback={review}
              />
            </article>

            <footer className="is-exam-footer">
              <button type="button" className="is-exam-primary" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}>
                <span aria-hidden="true">{"←"}</span> Previous
              </button>
              <span>Question {currentIndex + 1} of 60</span>
              {currentIndex < 59 ? (
                <button type="button" className="is-exam-primary" onClick={() => goTo(currentIndex + 1)}>
                  Next question <span aria-hidden="true">{"→"}</span>
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
                <button type="button" className="is-exam-primary" onClick={onBack}><span aria-hidden="true">{"←"}</span> Back to English A practice</button>
                <button type="button" className="is-exam-primary" onClick={startAnother}>Start another Paper 1</button>
              </div>
            )}
          </div>

          <aside className="is-exam-navigator is-exam-navigator-desktop" aria-label="Question navigator">
            <div className="is-exam-navigator-head">
              <strong>Question navigator</strong>
              <span>{review ? result.answeredCount + " answered" : result.answeredCount + " answered, " + (60 - result.answeredCount) + " remaining"}</span>
            </div>
            <nav className="is-exam-nav-grid" aria-label="Paper 1 questions">
              {paper.map((item,index) => {
                const answer = answers[item.id];
                const row = review ? result.rows[index] : null;
                const state = review ? (row?.correct ? "correct" : row?.answered ? "wrong" : "blank") : (answer ? "answered" : "blank");
                return (
                  <button type="button" key={item.id}
                    className={(index === currentIndex ? "active " : "") + state + (flags[item.id] ? " flagged" : "")}
                    onClick={() => goTo(index)}>
                    {index + 1}
                  </button>
                );
              })}
            </nav>
            <div className="is-exam-nav-legend">
              {!review ? (
                <><span><i className="answered" /> Answered</span><span><i className="flagged" /> Flagged</span></>
              ) : (
                <><span><i className="correct" /> Correct</span><span><i className="wrong" /> Incorrect</span></>
              )}
            </div>
            {!review && <button type="button" className="is-exam-primary is-exam-submit-side" onClick={() => setConfirmSubmit(true)}>Submit Paper 1</button>}
          </aside>
        </div>

        <button type="button" className="is-exam-mobile-nav" onClick={() => setShowNavigator(true)}>Questions {currentIndex + 1}/60</button>

        {showNavigator && (
          <div className="is-exam-drawer-backdrop" onMouseDown={() => setShowNavigator(false)}>
            <section className="is-exam-drawer" onMouseDown={event => event.stopPropagation()}>
              <header>
                <div><strong>Question navigator</strong><span>{result.answeredCount}/60 answered</span></div>
                <button type="button" onClick={() => setShowNavigator(false)}>Close</button>
              </header>
              <div className="is-exam-nav-grid">
                {paper.map((item,index) => (
                  <button key={item.id} type="button"
                    className={(index === currentIndex ? "active " : "") + (answers[item.id] ? "answered" : "blank") + (flags[item.id] ? " flagged" : "")}
                    onClick={() => goTo(index)}>
                    {index + 1}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {showExitConfirm && !review && (
          <div className="is-exam-modal-backdrop" onMouseDown={() => setShowExitConfirm(false)}>
            <section className="is-exam-modal" role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
              <span className="is-exam-eyebrow">EXIT EXAMINATION</span>
              <h2>Exit English A Paper 01?</h2>
              <p>Your answers and question position are saved. The timer continues to run while you are away.</p>
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
              <h2>Submit English A Paper 01?</h2>
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
