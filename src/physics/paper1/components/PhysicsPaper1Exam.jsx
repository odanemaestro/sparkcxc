import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MathText from "../../../practice/MathText";
import {
  PHYSICS_PAPER1_DURATION_MINUTES,
  PHYSICS_PAPER1_MARKS,
  PHYSICS_PAPER1_PAPERS,
  getPhysicsPaper1Paper,
  gradePhysicsPaper1,
  physicsPaper1PaperLetter,
  physicsPaper1PaperName,
  physicsPaper1PaperNumber,
  readPhysicsPaper1Active,
  readPhysicsPaper1Results,
  savePhysicsPaper1Active,
  savePhysicsPaper1Result,
} from "../physicsPaper1Bank";
import "./physicsPaper1.css";

function formatTime(totalSeconds) {
  const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function goTop() {
  window.scrollTo?.({ top: 0, behavior: "smooth" });
}

function Figure({ stimulus }) {
  if (!stimulus?.svg) return null;
  return <figure className="phy-p1-figure">
    {stimulus.label && <figcaption>{stimulus.label}</figcaption>}
    <div className="phy-p1-figure-art" role="img" aria-label={stimulus.alt || "Physics figure"} dangerouslySetInnerHTML={{ __html: stimulus.svg }} />
  </figure>;
}

function Paper1Instructions({ paper, onBack, onBegin }) {
  return <main className="phy-p1-root"><div className="phy-p1-shell">
    <button type="button" className="phy-p1-back" onClick={onBack}>← Paper 1 library</button>
    <section className="phy-p1-instructions-card">
      <div className="phy-p1-eyebrow">CSEC Physics · Paper 01</div>
      <h1>{physicsPaper1PaperName(paper)}</h1>
      <p className="phy-p1-instructions-sub">A complete 60-item multiple-choice practice examination completed and marked within SPARK.</p>
      <div className="phy-p1-instructions-rule" />
      <div className="phy-p1-instructions-meta">
        <div><span>Time</span><strong>1 h 15 min</strong></div>
        <div><span>Items</span><strong>60</strong></div>
        <div><span>Marks</span><strong>60</strong></div>
        <div><span>Coverage</span><strong>Full syllabus</strong></div>
      </div>
      <div className="phy-p1-instructions-sheet">
        <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
        <ol>
          <li>This test consists of 60 items. You have 1 hour and 15 minutes to answer them.</li>
          <li>Each item has four suggested answers lettered A, B, C and D. Choose the best answer.</li>
          <li>You may change an answer at any time before submitting the paper.</li>
          <li>If you cannot answer an item, move on and return to it later. Use Flag for review when useful.</li>
          <li>Figures are not necessarily drawn to scale.</li>
          <li>You may use a silent, non-programmable calculator.</li>
          <li>SPARK saves your answers while you work and submits the paper automatically when time expires.</li>
        </ol>
      </div>
      <div className="phy-p1-sample"><span>Sample item</span><MathText as="p" prose>The SI unit of length is the</MathText><div className="phy-p1-sample-options"><b>A</b> metre <span>B second</span><span>C newton</span><span>D kilogram</span></div></div>
      <div className="phy-p1-instructions-note"><strong>After submission</strong><span>Your score is saved. SPARK then opens an item-by-item review showing your choice, the correct answer, the worked explanation and misconception feedback for a wrong choice.</span></div>
      <div className="phy-p1-instructions-actions"><button type="button" className="phy-p1-primary" onClick={onBegin}>Start examination</button></div>
    </section>
  </div></main>;
}

function PaperLibrary({ userId, active, onResume, onStart, onBack }) {
  const results = readPhysicsPaper1Results(userId);
  return <main className="phy-p1-root"><div className="phy-p1-shell">
    <header className="phy-p1-library-hero"><div><button type="button" className="phy-p1-back" onClick={onBack}>← Physics practice</button><div className="phy-p1-eyebrow">CSEC Physics Paper 01</div><h1>Paper 1 Simulator</h1><p>Choose one of two complete 60-item practice papers. Each paper runs for 1 hour 15 minutes and covers all five syllabus sections.</p></div><div className="phy-p1-hero-spec"><strong>2</strong><span>complete papers</span><strong>75</strong><span>minutes</span><strong>60</strong><span>marks</span></div></header>
    {active?.paperId && getPhysicsPaper1Paper(active.paperId) && <section className="phy-p1-resume-card"><div><span className="phy-p1-eyebrow">IN PROGRESS</span><h2>{physicsPaper1PaperName(getPhysicsPaper1Paper(active.paperId))}</h2><p>{active.phase === "review" ? "Your paper is submitted and the result is saved. Continue your answer review." : active.phase === "instructions" ? "Your paper is selected. Review the instructions before the timer starts." : "Your answers, flags and remaining time are saved on this device."}</p></div><button type="button" className="phy-p1-primary" onClick={onResume}>{active.phase === "review" ? "Continue review" : active.phase === "instructions" ? "View instructions" : "Resume paper"}</button></section>}
    <section className="phy-p1-paper-grid">{PHYSICS_PAPER1_PAPERS.map(paper => {
      const isActive = active?.paperId === paper.bank_id;
      const anotherActive = Boolean(active?.paperId && !isActive);
      return <article key={paper.bank_id} className={`phy-p1-paper-card ${isActive ? "is-active" : ""}`}><div className="phy-p1-paper-number">{physicsPaper1PaperLetter(paper)}</div><div><span className="phy-p1-eyebrow">PRACTICE PAPER</span><h2>{physicsPaper1PaperName(paper)}</h2><p>Mechanics · Thermal Physics · Waves and Optics · Electricity and Magnetism · Atomic Physics</p><div className="phy-p1-paper-meta"><span>60 items</span><span>75 minutes</span><span>50 KC · 10 UK</span><span>Immediate final review</span></div></div><button type="button" className="phy-p1-primary" disabled={anotherActive} onClick={() => isActive ? onResume() : onStart(paper.bank_id)}>{isActive ? (active.phase === "review" ? "Continue review" : active.phase === "instructions" ? "View instructions" : "Resume paper") : anotherActive ? "Finish current paper first" : "View instructions"}</button></article>;
    })}</section>
    <section className="phy-p1-marking-note"><strong>How marking works</strong><p>Each correct answer earns one mark. SPARK grades all 60 items immediately after submission, saves the result, and gives a complete answer review with worked explanations and targeted misconception feedback.</p></section>
    {results.length > 0 && <section className="phy-p1-recent"><div><span className="phy-p1-eyebrow">RECENT RESULTS</span><h2>Completed Paper 1 practice</h2></div><div className="phy-p1-result-list">{results.slice(0, 6).map(result => <div key={result.id}><span>{physicsPaper1PaperName(result.paperNumber)}</span><strong>{result.score}/60</strong><small>{result.percent}% · {new Date(result.completedAt).toLocaleDateString()}</small></div>)}</div></section>}
  </div></main>;
}

function ReviewBlock({ row }) {
  const { item, selected, correct } = row;
  const selectedOption = item.options.find(option => option.key === selected);
  const correctOption = item.options.find(option => option.key === item.answer);
  return <div className={`phy-p1-review-block ${correct ? "is-correct" : "is-wrong"}`}>
    <div className="phy-p1-review-head"><strong>{correct ? "Correct" : selected ? "Incorrect" : "Not answered"}</strong><span>{correct ? "1/1 mark" : "0/1 mark"}</span></div>
    <div className="phy-p1-review-answer-grid"><div><span>Your answer</span><MathText as="strong" prose>{selectedOption ? `${selected}. ${selectedOption.text}` : "No answer selected"}</MathText></div><div><span>Correct answer</span><MathText as="strong" prose>{`${item.answer}. ${correctOption?.text || ""}`}</MathText></div></div>
    {!correct && selectedOption?.misconception?.label && <div className="phy-p1-misconception"><span>Why this choice misses the mark</span><MathText as="p" prose>{selectedOption.misconception.label}</MathText></div>}
    <div className="phy-p1-solution"><span>Worked explanation</span>{(item.solution?.steps || []).map((step, index) => <MathText key={index} as="p" prose>{step}</MathText>)}</div>
  </div>;
}

export default function PhysicsPaper1Exam({ userId, onBack, onActivity }) {
  const initialActive = useMemo(() => readPhysicsPaper1Active(userId), [userId]);
  const [active, setActive] = useState(initialActive);
  const [currentIndex, setCurrentIndex] = useState(initialActive?.currentIndex || 0);
  const [answers, setAnswers] = useState(initialActive?.answers || {});
  const [flags, setFlags] = useState(initialActive?.flags || {});
  const [remaining, setRemaining] = useState(() => initialActive?.endsAt ? Math.max(0, Math.round((Number(initialActive.endsAt) - Date.now()) / 1000)) : PHYSICS_PAPER1_DURATION_MINUTES * 60);
  const [libraryOpen, setLibraryOpen] = useState(!initialActive?.paperId);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const submissionGuardRef = useRef(Boolean(initialActive?.resultId));
  const paper = getPhysicsPaper1Paper(active?.paperId);
  const phase = active?.phase || null;
  const result = useMemo(() => paper ? gradePhysicsPaper1(paper, answers) : null, [paper, answers]);

  const persistSubmission = useCallback(({ submittedAt, timedOut = false } = {}) => {
    if (!paper || submissionGuardRef.current) return null;
    submissionGuardRef.current = true;
    const completedAt = submittedAt || new Date().toISOString();
    try {
      const final = gradePhysicsPaper1(paper, answers);
      const paperNumber = physicsPaper1PaperNumber(paper);
      const stored = {
        id: `${paper.bank_id}:${completedAt}`,
        paperId: paper.bank_id,
        paperNumber,
        paperLabel: physicsPaper1PaperLetter(paper),
        score: final.score,
        maxScore: final.of,
        percent: final.percent,
        answeredCount: final.answeredCount,
        timedOut: Boolean(timedOut),
        completedAt,
      };
      savePhysicsPaper1Result(userId, stored);
      setActive(previous => previous ? { ...previous, phase: "review", submittedAt: completedAt, timedOut: Boolean(timedOut), resultId: stored.id, resultSaved: true } : previous);
      onActivity?.({ type: "physics_paper1_exam", paperId: paper.bank_id, paperNumber, paperLabel: stored.paperLabel, score: stored.score, maxScore: stored.maxScore, percent: stored.percent, at: completedAt });
      return stored;
    } catch (error) {
      submissionGuardRef.current = false;
      throw error;
    }
  }, [paper, answers, userId, onActivity]);

  useEffect(() => {
    if (!active?.paperId) return;
    savePhysicsPaper1Active(userId, { ...active, currentIndex, answers, flags });
  }, [userId, active, currentIndex, answers, flags]);

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
    const next = { paperId, phase: "instructions", currentIndex: 0, answers: {}, flags: {} };
    submissionGuardRef.current = false;
    setActive(next);
    setCurrentIndex(0);
    setAnswers({});
    setFlags({});
    setRemaining(PHYSICS_PAPER1_DURATION_MINUTES * 60);
    setLibraryOpen(false);
  }

  function beginPaper() {
    if (!paper || phase !== "instructions") return;
    const now = Date.now();
    submissionGuardRef.current = false;
    setActive(previous => previous ? { ...previous, phase: "exam", startedAt: new Date(now).toISOString(), endsAt: now + PHYSICS_PAPER1_DURATION_MINUTES * 60 * 1000, currentIndex: 0, answers: previous.answers || {}, flags: previous.flags || {} } : previous);
    setCurrentIndex(0);
    setRemaining(PHYSICS_PAPER1_DURATION_MINUTES * 60);
    goTop();
  }

  function startAnotherPaper() {
    savePhysicsPaper1Active(userId, null);
    submissionGuardRef.current = false;
    setActive(null);
    setAnswers({});
    setFlags({});
    setCurrentIndex(0);
    setRemaining(PHYSICS_PAPER1_DURATION_MINUTES * 60);
    setLibraryOpen(true);
    goTop();
  }

  if (!paper || libraryOpen) return <PaperLibrary userId={userId} active={active} onResume={() => setLibraryOpen(false)} onStart={startPaper} onBack={onBack} />;
  if (phase === "instructions") return <Paper1Instructions paper={paper} onBack={() => setLibraryOpen(true)} onBegin={beginPaper} />;

  const item = paper.items[currentIndex];
  const selected = answers[item.item_id] || "";
  const flagged = Boolean(flags[item.item_id]);
  const answeredCount = result?.answeredCount || 0;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const reviewRow = phase === "review" ? result?.items?.[currentIndex] : null;

  function chooseAnswer(key) {
    if (phase !== "exam") return;
    setAnswers(previous => ({ ...previous, [item.item_id]: key }));
  }

  function toggleFlag() {
    if (phase !== "exam") return;
    setFlags(previous => ({ ...previous, [item.item_id]: !previous[item.item_id] }));
  }

  function goTo(index) {
    setCurrentIndex(Math.max(0, Math.min(paper.items.length - 1, index)));
    setShowNavigator(false);
    goTop();
  }

  function submitPaper() {
    setShowSubmitConfirm(false);
    persistSubmission({ timedOut: false });
    goTop();
  }

  return <main className="phy-p1-root"><div className="phy-p1-shell phy-p1-exam-shell">
    <header className="phy-p1-exam-head"><div><button type="button" className="phy-p1-back" onClick={() => setLibraryOpen(true)}>← Paper 1 library</button><span className="phy-p1-eyebrow">CSEC Physics · Paper 01</span><h1>{physicsPaper1PaperName(paper)}</h1><p>{phase === "review" ? "Answer review" : `${answeredCount}/60 answered · ${flaggedCount} flagged`}</p></div><div className="phy-p1-exam-head-actions"><button type="button" className="phy-p1-nav-toggle" aria-expanded={showNavigator} onClick={() => setShowNavigator(true)}>Questions {currentIndex + 1}/60</button><div className={`phy-p1-timer ${remaining <= 600 && phase === "exam" ? "warning" : ""}`}><span>{phase === "review" ? "Submitted" : "Time remaining"}</span><strong>{phase === "review" ? "REVIEW" : formatTime(remaining)}</strong></div></div></header>

    {phase === "review" && <section className="phy-p1-review-summary"><div><span>Marks earned</span><strong>{result.score}/{result.of}</strong></div><div><span>Answered</span><strong>{result.answeredCount}/60</strong></div><div><span>Final Paper 1 score</span><strong>{result.percent}%</strong></div><p>Your result is saved. Use the question palette to review every choice, worked explanation and misconception note.</p></section>}

    {phase === "review" && <section className="phy-p1-section-breakdown">{result.sections.map(section => <div key={section.section}><span>Section {section.section}</span><strong>{section.earned}/{section.of}</strong><small>{section.sectionName} · {section.percent}%</small></div>)}</section>}

    <div className="phy-p1-exam-layout">
      <div className="phy-p1-exam-main">
        <article className={`phy-p1-question-card ${phase === "review" ? "is-review" : ""}`}>
          <div className="phy-p1-question-heading"><div><span className="phy-p1-eyebrow">SECTION {item.section}</span><h2>Question {item.position}</h2><p>{item.section_name}{item.subtopic ? ` · ${item.subtopic}` : ""}</p></div><div className="phy-p1-question-tools"><strong>1 mark</strong>{phase === "exam" && <button type="button" className={`phy-p1-flag ${flagged ? "active" : ""}`} aria-pressed={flagged} onClick={toggleFlag}>{flagged ? "Flagged" : "Flag for review"}</button>}</div></div>
          <Figure stimulus={item.stimulus} />
          <MathText as="p" prose className="phy-p1-stem">{item.stem}</MathText>
          <div className="phy-p1-options" role="group" aria-label={`Question ${item.position} answer choices`}>{item.options.map(option => {
            const isSelected = selected === option.key;
            const isCorrect = phase === "review" && option.key === item.answer;
            const isWrongSelection = phase === "review" && isSelected && option.key !== item.answer;
            return <button key={option.key} type="button" disabled={phase === "review"} aria-pressed={isSelected} className={`${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrongSelection ? "wrong" : ""}`} onClick={() => chooseAnswer(option.key)}><span className="phy-p1-option-key">{option.key}</span><MathText as="span" prose>{option.text}</MathText>{phase === "review" && isCorrect && <b>Correct</b>}{phase === "review" && isWrongSelection && <b>Your choice</b>}</button>;
          })}</div>
          {phase === "review" && reviewRow && <ReviewBlock row={reviewRow} />}
        </article>

        <footer className="phy-p1-exam-footer"><button type="button" className="phy-p1-secondary" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}>← Previous</button><span>Question {currentIndex + 1} of 60</span>{currentIndex < paper.items.length - 1 ? <button type="button" className="phy-p1-primary" onClick={() => goTo(currentIndex + 1)}>Next question →</button> : phase === "exam" ? <button type="button" className="phy-p1-primary" onClick={() => setShowSubmitConfirm(true)}>Submit paper</button> : <button type="button" className="phy-p1-secondary" disabled>Review complete</button>}</footer>

        {phase === "exam" && <div className="phy-p1-submit-strip"><div><strong>{answeredCount} answered</strong><span>{PHYSICS_PAPER1_MARKS - answeredCount} unanswered · {flaggedCount} flagged</span></div><button type="button" className="phy-p1-primary" onClick={() => setShowSubmitConfirm(true)}>Submit Paper 1</button></div>}
      </div>

      <aside className="phy-p1-navigator phy-p1-navigator-desktop" aria-label="Question navigator">
        <div className="phy-p1-navigator-head"><strong>Question navigator</strong><span>{phase === "review" ? `${result.answeredCount} answered` : `${answeredCount} answered, ${PHYSICS_PAPER1_MARKS - answeredCount} remaining`}</span></div>
        <nav className="phy-p1-question-nav" aria-label="Paper 1 questions">{paper.items.map((navItem, index) => {
          const hasAnswer = Boolean(answers[navItem.item_id]);
          const isFlagged = Boolean(flags[navItem.item_id]);
          const review = phase === "review" ? result.items[index] : null;
          const state = phase === "review" ? (review.correct ? "correct" : review.answered ? "wrong" : "blank") : hasAnswer ? "answered" : "";
          return <button key={navItem.item_id} type="button" aria-label={`Question ${navItem.position}${isFlagged ? ", flagged" : ""}${phase === "review" ? review.correct ? ", correct" : review.answered ? ", incorrect" : ", unanswered" : ""}`} className={`${index === currentIndex ? "active" : ""} ${state} ${isFlagged ? "flagged" : ""}`} onClick={() => goTo(index)}><span>{navItem.position}</span></button>;
        })}</nav>
        <div className="phy-p1-nav-legend">{phase === "review" ? <><span><i className="correct" />Correct</span><span><i className="wrong" />Incorrect</span><span><i />Unanswered</span></> : <><span><i className="answered" />Answered</span><span><i className="flagged" />Flagged</span><span><i />Not answered</span></>}</div>
        {phase === "exam" && <button type="button" className="phy-p1-primary phy-p1-submit-side" onClick={() => setShowSubmitConfirm(true)}>Submit paper</button>}
      </aside>
    </div>

    {showNavigator && <div className="phy-p1-nav-drawer-backdrop" role="presentation" onMouseDown={() => setShowNavigator(false)}><section className="phy-p1-nav-drawer" role="dialog" aria-modal="true" aria-label="Question navigator" onMouseDown={event => event.stopPropagation()}><div className="phy-p1-nav-drawer-head"><div><strong>Questions</strong><span>{phase === "review" ? `${result.answeredCount} answered` : `${answeredCount} answered, ${PHYSICS_PAPER1_MARKS - answeredCount} remaining`}</span></div><button type="button" onClick={() => setShowNavigator(false)} aria-label="Close question navigator">×</button></div><aside className="phy-p1-navigator phy-p1-navigator-drawer-panel"><nav className="phy-p1-question-nav" aria-label="Paper 1 questions">{paper.items.map((navItem, index) => {
      const hasAnswer = Boolean(answers[navItem.item_id]);
      const isFlagged = Boolean(flags[navItem.item_id]);
      const review = phase === "review" ? result.items[index] : null;
      const state = phase === "review" ? (review.correct ? "correct" : review.answered ? "wrong" : "blank") : hasAnswer ? "answered" : "";
      return <button key={navItem.item_id} type="button" aria-label={`Question ${navItem.position}${isFlagged ? ", flagged" : ""}${phase === "review" ? review.correct ? ", correct" : review.answered ? ", incorrect" : ", unanswered" : ""}`} className={`${index === currentIndex ? "active" : ""} ${state} ${isFlagged ? "flagged" : ""}`} onClick={() => goTo(index)}><span>{navItem.position}</span></button>;
    })}</nav><div className="phy-p1-nav-legend">{phase === "review" ? <><span><i className="correct" />Correct</span><span><i className="wrong" />Incorrect</span><span><i />Unanswered</span></> : <><span><i className="answered" />Answered</span><span><i className="flagged" />Flagged</span><span><i />Not answered</span></>}</div>{phase === "exam" && <button type="button" className="phy-p1-primary phy-p1-submit-side" onClick={() => { setShowNavigator(false); setShowSubmitConfirm(true); }}>Submit paper</button>}</aside></section></div>}

    {phase === "review" && <div className="phy-p1-result-actions"><button type="button" className="phy-p1-secondary phy-p1-back-practice" onClick={onBack}><span aria-hidden="true">←</span><span>Back to Physics practice</span></button><button type="button" className="phy-p1-primary" onClick={startAnotherPaper}>Start another Paper 1</button></div>}

    {showSubmitConfirm && phase === "exam" && <div className="phy-p1-modal-backdrop" role="presentation" onMouseDown={() => setShowSubmitConfirm(false)}><section className="phy-p1-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="phy-p1-submit-title" onMouseDown={event => event.stopPropagation()}><span className="phy-p1-eyebrow">SUBMIT PAPER</span><h2 id="phy-p1-submit-title">Submit {physicsPaper1PaperName(paper)}?</h2><p>You answered {answeredCount} of 60 items. {PHYSICS_PAPER1_MARKS - answeredCount > 0 ? `${PHYSICS_PAPER1_MARKS - answeredCount} item${PHYSICS_PAPER1_MARKS - answeredCount === 1 ? " is" : "s are"} unanswered. ` : ""}SPARK will grade and save your result immediately. Answers cannot be changed after submission.</p><div className="phy-p1-confirm-actions"><button type="button" className="phy-p1-secondary" onClick={() => setShowSubmitConfirm(false)}>Return to paper</button><button type="button" className="phy-p1-primary" onClick={submitPaper}>Submit paper</button></div></section></div>}
  </div></main>;
}
