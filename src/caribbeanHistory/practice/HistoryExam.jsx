import React, { useEffect, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { PoaQuestionNavigator } from "../../principlesOfAccounts/practice/PoaExamLayout";
import { useSavedPracticeState } from "../../routing/usePracticeRouteState";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { HISTORY_ID } from "../data/historyCourse";

const newAttempt = choices => ({
  id: globalThis.crypto?.randomUUID?.() || String(Date.now()),
  phase: "setup", deadline: null, index: 0, choices, answers: {}, flags: {},
});

export function historyGroups(paper) {
  return [...new Set(paper.questions.map(question => question.group))].sort((a, b) => a - b);
}

export function requiredQuestionCount(paper) {
  if (paper.paper === 1 || paper.allQuestions) return paper.questions.length;
  return paper.questionCount ?? historyGroups(paper).length;
}

const choiceKey = (paper, question) => paper.questionCount ? question.id : question.group;

export function historySelectedQuestions(paper, choices) {
  return paper.paper === 1 || paper.allQuestions ? paper.questions : paper.questions.filter(question => choices[choiceKey(paper, question)] === question.id);
}

function selectionComplete(paper, questions) {
  return questions.length === requiredQuestionCount(paper) &&
    (!paper.questionCount || new Set(questions.map(question => question.group)).size === historyGroups(paper).length);
}

export function historyScore(paper, answers) {
  if (paper.paper !== 1 || !paper.questions.every(q => Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < q.options.length)) return null;
  return paper.questions.reduce((score, question) => score + Number(answers[question.id] === "ABCD"[question.answerIndex]), 0);
}

const markerKey = (question, marker) => `${question.id}-map-${marker}`;
const figureSrc = figure => `${process.env.PUBLIC_URL || ""}/${figure.src}`;

function readAttempt(data, fallback, paper) {
  if (!data || typeof data.id !== "string" || !["setup", "exam", "review"].includes(data.phase)) return fallback;
  const choices = {
    ...Object.fromEntries(paper.questions.map(question => [choiceKey(paper, question), question.id])
      .filter(([key, id]) => data.choices?.[key] === id)),
    ...fallback.choices,
  };
  const questions = historySelectedQuestions(paper, choices);
  if (data.phase !== "setup" && (!Number.isFinite(data.deadline) || !selectionComplete(paper, questions))) return fallback;
  if (data.phase === "setup" && questions.length > requiredQuestionCount(paper)) return fallback;
  const answerIds = paper.paper === 1 ? questions.map(q => q.id) : questions.flatMap(q => [
    ...q.parts.map(p => p.id),
    ...q.parts.filter(p => p.drawing).map(p => `${p.id}:drawing`),
    ...(q.figure?.markers || []).map(marker => markerKey(q, marker)),
  ]);
  const answers = Object.fromEntries(answerIds.filter(id => typeof data.answers?.[id] === "string").map(id => [id, data.answers[id]]));
  const flags = Object.fromEntries(questions.filter(q => data.flags?.[q.id] === true).map(q => [q.id, true]));
  const index = Number.isInteger(data.index) && data.index >= 0 && data.index < questions.length ? data.index : 0;
  return { ...fallback, id: data.id, phase: data.phase, deadline: data.deadline, choices, answers, flags, index };
}

function clock(seconds) {
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(value => String(value).padStart(2, "0")).join(":");
}

function MapFigure({ question, answers, onAnswer }) {
  const [selected, setSelected] = useState(question.figure.markers[0]);
  const markers = question.figure.markers;
  const image = <img src={`${process.env.PUBLIC_URL || ""}/${question.figure.src}`} alt={question.figure.alt} />;
  return <>
    {onAnswer && <div className="ch-map-controls">
      <p id="ch-map-instructions">Choose A or B, then tap or click the map. You can also describe each position in your written answer for part (a).</p>
      {markers.map(marker => <button className="secondary" key={marker} type="button" aria-pressed={marker === selected}
        onClick={() => setSelected(marker)}>{answers[markerKey(question, marker)] ? "Move" : "Place"} {marker}</button>)}
    </div>}
    <div className="ch-figure-scroll" tabIndex={0} role="region" aria-label="Scrollable map">
      <div className="ch-map-image">
        {onAnswer ? <button className="ch-map-target" type="button" tabIndex={-1} aria-describedby="ch-map-instructions"
          aria-label={`Place marker ${selected} on the map`} onClick={event => {
            if (!event.detail) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const point = [(event.clientX - bounds.left) / bounds.width, (event.clientY - bounds.top) / bounds.height];
            onAnswer(markerKey(question, selected), point.map(value => (value * 100).toFixed(2)).join(","));
          }}>{image}</button> : image}
        {markers.map(marker => {
          const [left, top] = (answers[markerKey(question, marker)] || "").split(",").map(Number);
          if (![left, top].every(value => Number.isFinite(value) && value >= 0 && value <= 100)) return null;
          return <span key={marker} className="ch-map-marker" style={{ left: `${left}%`, top: `${top}%` }}>{marker}</span>;
        })}
      </div>
    </div>
  </>;
}

function SourceTable({ table }) {
  const { caption, columnGroup, columns, rowHeading, rows } = table;
  return <div className="ch-figure-scroll ch-table-scroll" tabIndex={0} role="region" aria-label="Source data">
    <table>
      <caption>{caption}</caption>
      {columnGroup && <><colgroup span={1} /><colgroup span={columns.length} /></>}
      <thead>
        {columnGroup && <tr>
          <th scope="col" rowSpan={2}>{rowHeading}</th>
          <th scope="colgroup" colSpan={columns.length}>{columnGroup}</th>
        </tr>}
        <tr>
          {!columnGroup && <th scope="col">{rowHeading}</th>}
          {columns.map((column, index) => <th key={index} scope="col">{column}</th>)}
        </tr>
      </thead>
      <tbody>{rows.map(([heading, ...values], index) => <tr key={index}>
        <th scope="row">{heading}</th>
        {values.map((value, index) => <td key={index}>{value}</td>)}
      </tr>)}</tbody>
    </table>
  </div>;
}

function QuestionContent({ question, answers, onAnswer, sourceFirst = false }) {
  const prompt = question.prompt && <p className="ch-question-text">{question.prompt}</p>;
  return <>
    {!sourceFirst && prompt}
    {question.source && <blockquote className="ch-exam-source">{question.source}</blockquote>}
    {question.table && <SourceTable table={question.table} />}
    {question.tables?.map(table => <SourceTable key={table.caption} table={table} />)}
    {question.figure && <figure className="ch-exam-figure">
      {question.figure.markers && answers ? <MapFigure key={question.id} question={question} answers={answers} onAnswer={onAnswer} /> :
      <div className={question.figure.wide ? "ch-figure-scroll" : undefined} tabIndex={question.figure.wide ? 0 : undefined} role={question.figure.wide ? "region" : undefined} aria-label={question.figure.wide ? "Scrollable map" : undefined}>
        <img src={`${process.env.PUBLIC_URL || ""}/${question.figure.src}`} alt={question.figure.alt} />
      </div>}
      {question.figure.caption && <figcaption>{question.figure.caption}</figcaption>}
    </figure>}
    {question.figures?.map(figure => <ExamFigure key={figure.src} figure={figure} />)}
    {sourceFirst && prompt}
  </>;
}

function ExamFigure({ figure }) {
  const src = figureSrc(figure);
  return <figure className="ch-exam-figure geo-exam-figure">
    <div className={figure.wide ? "ch-figure-scroll" : undefined} tabIndex={figure.wide ? 0 : undefined}
      role={figure.wide ? "region" : undefined} aria-label={figure.wide ? "Scrollable examination figure" : undefined}>
      <img src={src} alt={figure.alt} />
    </div>
    {figure.caption && <figcaption>{figure.caption}</figcaption>}
    <a href={src} target="_blank" rel="noreferrer">Open figure at full size</a>
  </figure>;
}

export default function HistoryExam({ paper, userId, supabase, onBack, subjectId = HISTORY_ID, subjectName = "Caribbean History", renderDrawing }) {
  const key = `spark:${subjectId}:exam:v1:${userId || "guest"}:${paper.id}`;
  const compulsory = paper.questions.find(question => question.compulsory);
  const createAttempt = () => newAttempt(compulsory ? { [choiceKey(paper, compulsory)]: compulsory.id } : {});
  const [attempt, setAttempt] = useSavedPracticeState(key, createAttempt, { decode: (data, fallback) => readAttempt(data, fallback, paper) });
  const [now, setNow] = useState(Date.now);
  const [confirmation, setConfirmation] = useState("");
  const chooseQuestions = paper.paper !== 1 && !paper.allQuestions;
  const groups = chooseQuestions ? historyGroups(paper) : [];
  const questions = historySelectedQuestions(paper, attempt.choices);
  const questionCount = requiredQuestionCount(paper);
  const multiplePerSection = Boolean(paper.questionCount);
  const current = questions[attempt.index];
  const active = attempt.phase === "exam";
  const review = attempt.phase === "review";
  const remaining = Math.max(0, Math.ceil((attempt.deadline - Math.max(now, Date.now())) / 1000));
  const score = historyScore(paper, attempt.answers);
  const total = paper.totalMarks || (paper.paper === 1 ? questions.length : groups.length * 25);
  const answered = question => paper.paper === 1 ? Boolean(attempt.answers[question.id]) :
    question.parts.some(part => attempt.answers[part.id]?.trim() || attempt.answers[`${part.id}:drawing`]) ||
    (question.figure?.markers || []).some(marker => attempt.answers[markerKey(question, marker)]);
  const answer = (id, value) => setAttempt(previous => ({ ...previous, answers: { ...previous.answers, [id]: value } }));
  const go = index => {
    setAttempt(previous => ({ ...previous, index }));
    document.getElementById("ch-question")?.focus();
  };

  useEffect(() => {
    if (!active) return;
    const tick = () => setNow(Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    if (active && remaining === 0) {
      setConfirmation("");
      setAttempt(previous => ({ ...previous, phase: "review" }));
    }
  }, [active, remaining, setAttempt]);

  useEffect(() => {
    if (!review || !supabase || !userId) return;
    recordSubjectActivity({ supabase, activity: {
      subjectId, activityKey: `exam:${paper.id}:${attempt.id}`,
      activityType: "exam", title: paper.title, completed: true, score, maxScore: total,
      metadata: { paper: paper.paper === 3 ? "032" : `0${paper.paper}`, paper_id: paper.id, source: paper.year ? "historical" : "spark-practice", scorePublicationAllowed: score !== null },
    } }).catch(() => {});
  }, [review, supabase, userId, subjectId, paper, attempt.id, score, total]);

  return <main className={`poa-practice poa-exam oa-practice ch-exam${subjectId === "geography" ? " geo-exam" : ""}`}>
    <button className="poa-back" type="button" onClick={() => active ? setConfirmation("exit") : onBack()}><BackArrowIcon />{active ? "Exit examination" : "Back to paper selection"}</button>
    <header className="poa-exam-heading">
      <div className="poa-exam-title"><h1>{subjectName}</h1><h2>{paper.title}</h2>
        <p>{paper.duration} minutes · {total} marks · {chooseQuestions ? "Answer " : ""}{questionCount} questions</p>
      </div>
      <div className="poa-exam-timer" role="timer" aria-live="off"><span>{active ? "Time remaining" : review ? "Status" : "Duration"}</span><strong>{active ? clock(remaining) : review ? "Submitted" : `${paper.duration} minutes`}</strong></div>
    </header>
    {attempt.phase === "setup" ? <section className="poa-library-card oa-exam-instructions">
      <h2>Examination instructions</h2>
      {paper.paper === 1 ? <p>Answer all questions. Choose one option for each question.</p> : !chooseQuestions ?
        <p>Answer all questions. Use the maps and figures where indicated.</p> : <>
        <p>{paper.selectionInstructions || (compulsory ? "Question 1 is compulsory. Choose one question from each of Sections B, C and D." : `Choose one question from each ${paper.id.endsWith("2028") ? "module" : "section"}.`)} You can read the tasks before you start the timer.</p>
        {multiplePerSection && <p role="status">{questions.length - 1} of {questionCount - 1} additional questions selected</p>}
        {groups.map(group => <fieldset key={group} className="oa-question-selection">
          <legend>{paper.id.endsWith("2028") ? `Module ${group}` : `Section ${"ABCD"[group - 1]}`}{paper.sectionNames?.[group] && ` · ${paper.sectionNames[group]}`}</legend>
          {paper.questions.filter(question => question.group === group).map(question => {
            const choice = choiceKey(paper, question);
            const checked = attempt.choices[choice] === question.id;
            return <div key={question.id}>
              <label><input type={multiplePerSection ? "checkbox" : "radio"} name={`group-${group}`} checked={checked}
                disabled={Boolean(question.compulsory) || (multiplePerSection && !checked && questions.length >= questionCount)}
                onChange={event => {
                  const selected = event.target.checked;
                  setAttempt(previous => ({ ...previous, choices: { ...previous.choices, [choice]: selected ? question.id : undefined } }));
                }} />
                <span>Question {question.number}{question.title && ` · ${question.title}`}</span>
              </label>
              <details className="ch-question-preview"><summary>Read question {question.number}</summary>
                <QuestionContent question={question} />
                {question.parts.map(part => <React.Fragment key={part.id}>
                  <p className="ch-question-text">{part.label} {part.prompt} <strong>[{part.marks} {part.marks === 1 ? "mark" : "marks"}]</strong></p>
                  {part.figures?.map(figure => <ExamFigure key={figure.src} figure={figure} />)}
                  {part.table && <SourceTable table={part.table} />}
                  {part.background && <ExamFigure figure={part.background} />}
                </React.Fragment>)}
              </details>
            </div>;
          })}
        </fieldset>)}
      </>}
      <p>Answers are saved on this device. Leaving the examination keeps the timer running.</p>
      <button className="oa-primary" type="button" disabled={chooseQuestions && !selectionComplete(paper, questions)}
        onClick={() => { const start = Date.now(); setNow(start); setAttempt(previous => ({ ...previous, phase: "exam", deadline: start + paper.duration * 60_000 })); }}>Start examination</button>
    </section> : <>
      {review && <section className="poa-library-card oa-result">
        <h2>{score === null ? "Review your answers" : `Your score: ${score} / ${total}`}</h2>
        <p>{paper.paper !== 1 ? paper.year ? "Your answers are saved for review." : "Use the guidance under each part to check your response." : score === null ? "Your choices are saved for review." : "Check the correct options below."}</p>
        <button className="secondary" type="button" onClick={() => setConfirmation("restart")}>Try this paper again</button>
      </section>}
      <div className="poa-exam-toolbar"><span>{questions.filter(answered).length}/{questions.length} answered · {Object.values(attempt.flags).filter(Boolean).length} flagged</span>
        {active && <button className="oa-primary" type="button" onClick={() => setConfirmation("submit")}>Submit paper</button>}
      </div>
      <div className="poa-exam-layout oa-exam-layout">
        <PoaQuestionNavigator questions={questions.map(question => ({ ...question, displayNumber: question.number, answered: answered(question), flagged: attempt.flags[question.id] }))} currentId={current.id}
          onSelect={id => go(questions.findIndex(question => question.id === id))} />
        <section className="poa-answer-sheet oa-answer-sheet" id="ch-question" aria-labelledby="ch-question-heading" tabIndex={-1}>
          <div className="oa-question-heading">
            <h2 id="ch-question-heading">Question {current.number}{current.title && <small>{current.title}</small>}</h2>
            {active && <button className="secondary" type="button" aria-pressed={Boolean(attempt.flags[current.id])}
              onClick={() => setAttempt(previous => ({ ...previous, flags: { ...previous.flags, [current.id]: !previous.flags[current.id] } }))}>{attempt.flags[current.id] ? "Flagged for review" : "Flag for review"}</button>}
          </div>
          <QuestionContent question={current} sourceFirst={paper.paper === 1} answers={attempt.answers} onAnswer={active ? answer : undefined} />
          {paper.paper === 1 ? <fieldset className="oa-options"><legend>Choose one answer</legend>
            {current.options.map((option, index) => {
              const letter = "ABCD"[index];
              const selected = attempt.answers[current.id] === letter;
              const figure = current.optionFigures?.[index];
              return <label key={letter} className={`oa-option${selected ? " selected" : ""}`}>
                <input type="radio" name={current.id} checked={selected} disabled={review} onChange={() => answer(current.id, letter)} />
                <span><strong>{letter}.</strong> {figure
                  ? <img className="geo-option-figure" src={figureSrc(figure)} alt={figure.alt} />
                  : option}</span>
              </label>;
            })}
            {review && Number.isInteger(current.answerIndex) && <p className="oa-answer-review"><strong>Answer {"ABCD"[current.answerIndex]}</strong> · {current.options[current.answerIndex]}</p>}
            {review && current.reviewNote && <p className="oa-answer-review">{current.reviewNote}</p>}
          </fieldset> : current.parts.map(part => <section className="oa-part" key={part.id}>
            <label htmlFor={part.id}><span>{part.label && `${part.label} `}{part.prompt || "Your response"}</span>{part.marks != null && <strong>[{part.marks} {part.marks === 1 ? "mark" : "marks"}]</strong>}</label>
            {part.figures?.map(figure => <ExamFigure key={figure.src} figure={figure} />)}
            {part.table && <SourceTable table={part.table} />}
            {part.drawing && renderDrawing?.({
              part, readOnly: review, value: attempt.answers[`${part.id}:drawing`],
              onChange: value => answer(`${part.id}:drawing`, value),
            })}
            <textarea id={part.id} rows={part.marks >= 16 ? 12 : 5} maxLength={32000} value={attempt.answers[part.id] || ""} readOnly={review} onChange={event => answer(part.id, event.target.value)} />
            {review && part.guidance && <div className="oa-answer-review"><h3>Answer guidance</h3><p>{part.guidance}</p></div>}
          </section>)}
          <footer className="oa-question-actions">
            <button type="button" className="secondary" disabled={attempt.index === 0} onClick={() => go(attempt.index - 1)}><BackArrowIcon />Previous question</button>
            {attempt.index + 1 < questions.length
              ? <button className="oa-primary" type="button" onClick={() => go(attempt.index + 1)}>Next question<ForwardArrowIcon /></button>
              : active && <button className="oa-primary" type="button" onClick={() => setConfirmation("submit")}>Submit paper</button>}
          </footer>
        </section>
      </div>
    </>}
    <ConfirmModal open={Boolean(confirmation)} title={confirmation === "exit" ? "Leave this examination?" : confirmation === "restart" ? "Start a new attempt?" : "Submit your answers?"}
      message={confirmation === "exit" ? "Your answers are saved here and the timer will keep running." : confirmation === "restart" ? "A new attempt replaces the answers saved for this paper on this device." : `You have answered ${questions.filter(answered).length} of ${questions.length} questions. You can review your answers after submitting.`}
      confirmLabel={confirmation === "exit" ? "Exit examination" : confirmation === "restart" ? "Start new attempt" : "Submit paper"}
      onClose={() => setConfirmation("")} onConfirm={() => {
      setConfirmation("");
      if (confirmation === "exit") onBack();
      else if (confirmation === "restart") setAttempt(createAttempt());
      else setAttempt(previous => ({ ...previous, phase: "review" }));
    }} />
  </main>;
}
