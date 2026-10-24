import React, { useId, useRef, useState } from "react";

export function PoaExamHeader({ paperTitle, description, summary, timeLabel, timeValue }) {
  return <header className="poa-exam-heading">
    <div className="poa-exam-title">
      <h1>Principles of Accounts</h1>
      <h2>{paperTitle}</h2>
      {(summary || description) && <p>{summary || description}</p>}
    </div>
    {timeValue != null && <div className="poa-exam-timer" role="timer" aria-live="off" aria-label={`${timeLabel}: ${timeValue}`}>
      <span>{timeLabel}</span><strong>{timeValue}</strong>
    </div>}
  </header>;
}

export function PoaQuestionNavigator({ questions, currentId, onSelect, label = "Question navigator" }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const navigationId = useId();
  const current = questions.findIndex(question => String(question.id) === String(currentId));
  const answered = questions.filter(question => question.answered).length;
  const flagged = questions.filter(question => question.flagged).length;
  return <aside className="poa-exam-navigator" aria-label={label}>
    <div className="poa-navigation-heading">
      <h2>Questions</h2>
      <span>Question {current + 1} of {questions.length}</span>
      <button ref={toggleRef} type="button" className="secondary poa-navigation-toggle" aria-expanded={open} aria-controls={navigationId} onClick={() => setOpen(value => !value)}>
        {open ? "Hide questions" : "Show questions"}
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d={open ? "m5 12 5-5 5 5" : "m5 8 5 5 5-5"}/></svg>
      </button>
    </div>
    <div className="poa-navigation-content" data-open={open} id={navigationId}>
      <p>{answered}/{questions.length} answered · {flagged} flagged</p>
      <nav className="poa-question-nav" aria-label={label}>
        {questions.map((question, index) => <button type="button" key={question.id}
          aria-label={`${question.label || `Question ${index + 1}`}, ${question.answered ? "answered" : "unanswered"}${question.flagged ? ", flagged" : ""}`}
          aria-current={String(currentId) === String(question.id) ? "step" : undefined}
          data-answered={question.answered || undefined} data-flagged={question.flagged || undefined}
          onClick={() => { onSelect(question.id); setOpen(false); if (open) toggleRef.current?.focus(); }}>
          {index + 1}{question.flagged && <span className="poa-flag-dot" aria-hidden="true"/>}
        </button>)}
      </nav>
      <div className="poa-navigation-key" aria-hidden="true"><span><i/>Answered</span><span><i/>Flagged</span></div>
    </div>
  </aside>;
}
