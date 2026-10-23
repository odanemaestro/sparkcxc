import React, { useEffect, useRef, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import { startServerExamAttempt, submitServerExamAttempt, localExamDeadline, readServerExamV2Result, readServerExamClock } from "../../grading/serverExamAttempt";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import AccountingWorkspace from "../components/AccountingWorkspace";
import PoaQuestionText from "./PoaQuestionText";
import PoaDrawingPad from "./PoaDrawingPad";
import { getPoaPrintedQuestions } from "../data/poaPrintedPapers";
import { reviewHistoricalAccountingFigures } from "./poaHistoricalFeedback";
import { historicalAttemptKey, historicalBankVersion, historicalRubricVersion, freshHistoricalAttempt,
  restoreHistoricalAttempt, answerHasContent, historicalChoiceIsValid, reviewHistoricalPaper1, historicalSubmissionResponses } from "./poaHistoricalAttempts";

const time = (seconds) => [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map((n) => String(n).padStart(2, "0")).join(":");

function AnswerSections({ sections = [], response, onChange, disabled }) {
  return sections.map((section) => <div className="poa-historical-part" key={section.id}>
    <h3>{section.label}{Number.isFinite(section.maxMarks) && <small> ({section.maxMarks} marks)</small>}</h3>
    {section.instructions && <p>{section.instructions}</p>}
    {section.kind === "table" && Array.isArray(section.rows) && Array.isArray(section.columns)
      ? <div className="poa-table-scroll"><table><caption>{section.label}</caption><thead><tr>{section.columns.map((column, c) => <th scope="col" key={c}>{typeof column === "string" ? column : column.label}</th>)}</tr></thead>
        <tbody>{section.rows.map((row, r) => <tr key={r}>{section.columns.map((column, c) => {
          const rowLabel = typeof row === "string" ? row : row.label || row[0] || `Line ${r + 1}`;
          const columnLabel = typeof column === "string" ? column : column.label;
          const id = `${section.id}:${r}:${c}`;
          return c === 0 ? <th scope="row" key={c}>{rowLabel}</th> : <td key={c}><input aria-label={`${section.label}, ${rowLabel}, ${columnLabel}`} disabled={disabled}
            value={response.cells?.[id] || ""} onChange={(e) => onChange({ ...response, cells: { ...response.cells, [id]: e.target.value } })}/></td>;
        })}</tr>)}</tbody></table></div>
      : <label>{section.kind === "calculation" ? "Answer and calculation" : "Your answer"}<textarea rows={section.kind === "calculation" ? 3 : 5} disabled={disabled}
        value={response.parts?.[section.id] || ""} onChange={(e) => onChange({ ...response, parts: { ...response.parts, [section.id]: e.target.value } })}/></label>}
  </div>);
}

export default function PoaHistoricalExam({ source, paper, userId, supabase, onBack }) {
  const key = historicalAttemptKey(userId, paper.id);
  const [attempt, setAttempt] = useState(() => restoreHistoricalAttempt(key, paper));
  const [seconds, setSeconds] = useState(paper.durationMinutes * 60), [busy, setBusy] = useState(false);
  const [error, setError] = useState(""), [receipt, setReceipt] = useState(""), [confirm, setConfirm] = useState(false), [serverResult, setServerResult] = useState(null);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [clockPending, setClockPending] = useState(() => attempt.phase === "exam" && attempt.mode === "timed" && !!attempt.serverId);
  const legacyKey = `spark-poa-source-work-v1:${userId || "guest"}:${source.id}`;
  const [legacyNotebook] = useState(() => { try { return localStorage.getItem(legacyKey) || ""; } catch { return ""; } });
  const submitting = useRef(false), submitRef = useRef(null);
  const question = paper.questions[attempt.index], isPaper1 = source.paper === "1", review = attempt.phase === "review", exam = attempt.phase === "exam";
  const response = attempt.responses[String(question.number)] || {};
  const feedback = review && isPaper1 ? reviewHistoricalPaper1(paper, attempt.responses) : null;
  const decision = feedback?.decisions.find((d) => d.number === question.number);
  const figures = review && !isPaper1 ? reviewHistoricalAccountingFigures(question, response) : [];
  const answered = paper.questions.filter((q) => isPaper1 ? !!attempt.responses[String(q.number)]?.answer : answerHasContent(attempt.responses[String(q.number)])).length;
  const title = source.sitting === "SPECIMEN" ? `Syllabus specimen · Paper 0${source.paper}` : `${source.year} ${source.sitting === "JAN" ? "January" : "May/June"} · Paper 0${source.paper}`;
  const printedQuestion = getPoaPrintedQuestions(paper.id).find((item) => item.number === question.number);
  const inlineAnswerSheet = !isPaper1 && printedQuestion?.blocks.some((block) => block.answerSpace);
  const earlierWorksheet = inlineAnswerSheet && question.answerSections?.some((section) => answerHasContent(response.parts?.[section.id]) || Object.keys(response.cells || {}).some((id) => id.startsWith(`${section.id}:`)));
  const visibleFigures = inlineAnswerSheet ? figures.filter((figure) => figure.value !== null) : figures;
  const metadata = { subject: "principles-of-accounts", paper: `0${source.paper}`, paper_id: paper.id,
    source: "poa-historical-text-v1", source_sha256: paper.sourceSha256,
    selected_questions: attempt.selectedQuestions, provisional: true, scorePublicationAllowed: false,
    unresolved_marks: paper.maxMarks, historical: source.sitting !== "SPECIMEN", specimen: source.sitting === "SPECIMEN" };
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(attempt)); } catch { setError("This browser cannot save your answers. Export them before leaving this page."); } }, [attempt, key]);
  useEffect(() => { window.scrollTo?.({ top: 0, behavior: "instant" }); }, [attempt.index, attempt.phase]);
  const begin = async (mode) => {
    if (busy) return;
    setBusy(true); setError(""); setReceipt(""); setServerResult(null);
    const server = await startServerExamAttempt({ supabase, subjectId: "principles-of-accounts", paper: `0${source.paper}`, mode,
      durationSeconds: paper.durationMinutes * 60, bankVersion: historicalBankVersion(paper), rubricVersion: historicalRubricVersion(paper),
      graderVersion: "marking-reconciliation-v2", metadata: { ...metadata, selected_questions: [] } });
    const selected = paper.choicePolicy?.type === "all" || !paper.choicePolicy ? paper.questions.map((q) => q.number) : paper.choicePolicy.compulsory || [];
    setAttempt({ ...freshHistoricalAttempt(paper), phase: "exam", mode, selectedQuestions: selected,
    page: paper.questions[0].page || paper.questions[0].sourcePages?.[0] || 1,
      deadline: mode === "timed" ? localExamDeadline(server) || Date.now() + paper.durationMinutes * 60000 : null,
      serverId: server.attempt_id || server.id || null });
    setSeconds(paper.durationMinutes * 60);
    if (!server.available && supabase?.rpc) setError("Your answers are saved on this device. Connect to SPARK to submit them for marking.");
    setBusy(false);
  };
  const submit = async (snapshot = attempt) => {
    if (submitting.current || snapshot.serverSubmitted) return;
    submitting.current = true; setBusy(true); setConfirm(false); setError("");
    setAttempt((a) => ({ ...a, phase: "review", submittedAt: a.submittedAt || Date.now() }));
    try {
      const saved = snapshot.serverId ? await submitServerExamAttempt({ supabase, attemptId: snapshot.serverId,
        responses: historicalSubmissionResponses(snapshot, paper), score: null, maxScore: paper.maxMarks,
        metadata: { ...metadata, selected_questions: snapshot.selectedQuestions, selection_valid: historicalChoiceIsValid(paper, snapshot.selectedQuestions) } }) : { available: false };
      if (saved.available) {
        setAttempt((a) => ({ ...a, serverSubmitted: true }));
        setReceipt(isPaper1 ? "Your answers are saved on SPARK." : "Your responses are saved on SPARK. A final grading result is pending.");
        const progress = await recordSubjectActivity({ supabase, activity: { subjectId: "principles-of-accounts", activityKey: `exam:poa-historical:${paper.id}:${snapshot.id}`,
          activityType: "exam", title: `Principles of Accounts ${title}`, completed: true, score: null, maxScore: paper.maxMarks, metadata } });
        if (progress?.error) setError("Your submission is saved, but progress could not be updated.");
      } else setReceipt(snapshot.serverId ? "SPARK could not save this submission. Your answers remain here; retry when connected." : "Your completed practice is saved on this device. Export a copy to keep your answers.");
    } catch { setError("The submission could not finish. Your answers are saved here; retry when connected."); }
    finally { setBusy(false); submitting.current = false; }
  };
  submitRef.current = submit;
  useEffect(() => {
    if (!exam || attempt.mode !== "timed" || !attempt.serverId) { setClockPending(false); return; }
    let live = true;
    readServerExamClock({ supabase, attemptId: attempt.serverId }).then((clock) => {
      if (!live) return;
      const deadline = localExamDeadline(clock);
      if (clock.available && deadline !== null) setAttempt((a) => ({ ...a, deadline }));
    }).finally(() => { if (live) setClockPending(false); });
    return () => { live = false; };
  }, [exam, attempt.mode, attempt.serverId, supabase]);
  useEffect(() => {
    if (!exam || attempt.mode !== "timed" || clockPending) return;
    const tick = () => { const left = Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000)); setSeconds(left); if (!left) submitRef.current(); };
    tick(); const interval = setInterval(tick, 1000); return () => clearInterval(interval);
  }, [exam, attempt.mode, attempt.deadline, clockPending]);
  const chooseQuestion = (index) => {
    setNavigatorOpen(false);
    setAttempt((a) => ({ ...a, index, page: paper.questions[index].page || paper.questions[index].sourcePages?.[0] || a.page }));
  };
  const changeResponse = (value) => setAttempt((a) => ({ ...a, responses: { ...a.responses, [String(question.number)]: value } }));
  const exportAnswers = () => {
    const content = { paper: title, paperId: paper.id, sourceSha256: paper.sourceSha256, exportedAt: new Date().toISOString(),
      phase: attempt.phase, selectedQuestions: attempt.selectedQuestions, responses: attempt.responses, flags: attempt.flags };
    const url = URL.createObjectURL(new Blob([JSON.stringify(content, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = `${paper.id}-answers.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <main className="poa-practice poa-historical-exam">
    <button type="button" className="poa-back" onClick={() => exam ? setExitConfirm(true) : onBack()}><BackArrowIcon/> {exam ? "Exit examination" : "Back to past papers"}</button>
    {exitConfirm && <section aria-label="Exit examination"><h2>Save and exit?</h2><p>Your answers will be saved.{attempt.mode === "timed" ? " The timer will keep running while you’re away." : " Come back whenever you’re ready."}</p><div className="poa-actions"><button type="button" onClick={onBack}>Save and exit</button><button type="button" className="secondary" onClick={() => setExitConfirm(false)}>Keep working</button></div></section>}
    <header><h1>Principles of Accounts</h1><h2>{title}</h2><p>{paper.durationMinutes} minutes · {paper.maxMarks} marks · {paper.questionCount} questions{paper.choicePolicy?.type !== "all" ? ` · answer ${paper.requiredQuestionCount}` : " · answer all questions"}.</p></header>
    <p role="alert">{error}</p>
    {legacyNotebook && <details><summary>Your saved notebook</summary><p>Your earlier notes are here. You can copy them into the relevant answers below.</p><pre className="poa-legacy-notebook">{legacyNotebook}</pre></details>}
    {attempt.phase === "instructions" ? <>
      <section><h2>Before you begin</h2><p>Read each question carefully and complete your answers in the spaces provided. Your work is saved as you go.</p>
        {paper.choicePolicy?.type === "section-choice" && <p>Answer questions {paper.choicePolicy.compulsory.join(", ")} and choose {paper.choicePolicy.choose} from questions {paper.choicePolicy.from.join(", ")}. Select the optional questions you want SPARK to retain for submission.</p>}
        <p>Choose practice to work at your own pace, or timed practice to sit the paper under exam conditions. You can review your answers after submitting.</p>
        <div className="poa-actions"><button type="button" disabled={busy} onClick={() => begin("practice")}>{busy ? "Starting…" : "Start practice"}</button><button type="button" className="secondary" disabled={busy} onClick={() => begin("timed")}>Start timed practice</button></div>
      </section>
    </> : <>
      <div className="poa-exam-status"><strong>{review ? "Submitted · review your work" : attempt.mode === "timed" ? `Time remaining ${time(seconds)}` : "Practice · no time limit"}</strong><span>{answered}/{paper.questionCount} answered · {Object.values(attempt.flags).filter(Boolean).length} flagged</span></div>
      <details className="poa-question-overview" open={navigatorOpen} onToggle={(e) => setNavigatorOpen(e.currentTarget.open)}><summary>Question navigator · current question {question.number}</summary>
      <nav className={`poa-question-nav ${isPaper1 ? "poa-mcq-nav" : ""}`} aria-label="Historical paper questions">{paper.questions.map((q, index) => <button type="button" key={q.number}
        aria-current={attempt.index === index ? "step" : undefined} aria-label={`Question ${q.number}${answerHasContent(attempt.responses[String(q.number)]) ? ", answered" : ", unanswered"}${attempt.flags[q.number] ? ", flagged" : ""}`}
        data-answered={answerHasContent(attempt.responses[String(q.number)]) || undefined} onClick={() => chooseQuestion(index)}>{isPaper1 ? q.number : `Question ${q.number}`}{attempt.flags[q.number] && <span className="poa-flag-dot" aria-hidden="true"/>}</button>)}</nav></details>
      <div className="poa-native-exam-body">
        <section className="poa-answer-sheet" aria-label={`Answer sheet for question ${question.number}`}>
          <h2>Question {question.number}{question.maxMarks && <small> ({question.maxMarks} marks)</small>}</h2>
          {!review && <button type="button" className="secondary" aria-pressed={!!attempt.flags[question.number]} onClick={() => setAttempt((a) => ({ ...a, flags: { ...a.flags, [question.number]: !a.flags[question.number] } }))}>{attempt.flags[question.number] ? "Remove flag" : "Flag for review"}</button>}
          {paper.choicePolicy?.type === "section-choice" && <label className="poa-inline-check"><input type="checkbox" disabled={review || paper.choicePolicy.compulsory.includes(question.number)} checked={attempt.selectedQuestions.includes(question.number)}
            onChange={(e) => setAttempt((a) => ({ ...a, selectedQuestions: e.target.checked ? [...a.selectedQuestions, question.number] : a.selectedQuestions.filter((n) => n !== question.number) }))}/>{paper.choicePolicy.compulsory.includes(question.number) ? "Compulsory question" : "Include this optional question in my submission"}</label>}
          {printedQuestion && <PoaQuestionText question={printedQuestion} response={response} onChange={inlineAnswerSheet ? changeResponse : undefined} disabled={review}/>}
          {isPaper1 && printedQuestion?.sourceIncomplete && <p>There are no answer choices on this copy. Go on to the next question.</p>}
          {!isPaper1 && (printedQuestion?.requiresDrawing || printedQuestion?.blocks.some((block) => block.responseKind === "drawing")) && <PoaDrawingPad key={question.number} response={response} onChange={changeResponse} disabled={review}/>}
          {isPaper1 ? !printedQuestion?.sourceIncomplete && <fieldset disabled={review}><legend>Choose your answer</legend><div className="poa-native-mcq-options">{"ABCD".split("").map((option, index) => {
            const content = printedQuestion?.options[index];
            const id = `poa-option-${question.number}-${option}`;
            return <div className="poa-native-mcq-option" key={option} data-selected={response.answer === option || undefined}>
              <input id={id} type="radio" name={`poa-answer-${question.number}`} value={option} checked={response.answer === option} aria-labelledby={`${id}-label ${id}-content`} onChange={() => changeResponse({ ...response, answer: option })}/>
              <label id={`${id}-label`} htmlFor={id}>{printedQuestion?.sourceOptionLabels?.[index] || option}</label>
              <div id={`${id}-content`} onClick={() => !review && changeResponse({ ...response, answer: option })}>{typeof content === "string" ? <label htmlFor={id}>{content}</label> : content?.blocks ? <PoaQuestionText question={content}/> : null}</div>
            </div>;
          })}</div></fieldset>
            : !inlineAnswerSheet && <AnswerSections sections={question.answerSections} response={response} disabled={review} onChange={changeResponse}/>}
          {earlierWorksheet && <details><summary>Your earlier worksheet answers</summary><AnswerSections sections={question.answerSections} response={response} disabled onChange={changeResponse}/></details>}
          {!isPaper1 && <label>{question.answerSections?.length ? "Additional working" : "Your answer and working"}<textarea rows={14} disabled={review} value={response.working || ""} onChange={(e) => changeResponse({ ...response, working: e.target.value })}/></label>}
          {review && isPaper1 && <div className="poa-worked-feedback"><h3>Practice explanation</h3>{decision.worked && <p>Your choice: {decision.selected || "Unanswered"}. Worked choice: {decision.answer}. {decision.matches ? "Your choice matches." : "Review the reasoning below."}</p>}<p>{decision.explanation}</p></div>}
          {review && !isPaper1 && (question.modelSolution || question.workedSolution) && <details className="poa-worked-feedback"><summary>View SPARK worked solution</summary>{(Array.isArray(question.modelSolution || question.workedSolution) ? question.modelSolution || question.workedSolution : [question.modelSolution || question.workedSolution]).map((line, i) => <p key={i}>{line}</p>)}</details>}
          {!!visibleFigures.length && <details className="poa-worked-feedback"><summary>Check individual figures</summary><p>Use these comparisons to trace your calculations. They check individual figures; a full answer also needs the correct method, layout and explanation.</p><ul>{visibleFigures.map((figure) => <li key={figure.id}><strong>{figure.label}</strong>: {figure.value === null ? "No numerical answer entered" : figure.matches ? "Your figure matches" : `Your figure ${figure.entered} differs`}. Worked value: {figure.expected}. {figure.working}</li>)}</ul></details>}
          <div className="poa-actions"><button type="button" className="secondary" disabled={attempt.index === 0} onClick={() => chooseQuestion(attempt.index - 1)}><BackArrowIcon/> Previous question</button><button type="button" className="secondary" disabled={attempt.index === paper.questionCount - 1} onClick={() => chooseQuestion(attempt.index + 1)}>Next question <ForwardArrowIcon/></button></div>
        </section>
      </div>
      {!review && <div className="poa-actions"><button type="button" disabled={busy} onClick={() => setConfirm(true)}>Submit paper</button><button type="button" className="secondary" onClick={exportAnswers}>Export my answers</button></div>}
      {confirm && <section className="poa-submit-confirm" aria-label="Confirm historical submission"><h2>Submit this paper?</h2><p>{answered} of {paper.questionCount} questions contain an answer or working. You can review this attempt after submission; your answers will be locked.</p>
        {!historicalChoiceIsValid(paper, attempt.selectedQuestions) && <p role="alert">Your optional question selection does not match the printed instructions. Select exactly {paper.choicePolicy.choose} optional questions before submitting.</p>}
        <div className="poa-actions"><button type="button" disabled={busy || !historicalChoiceIsValid(paper, attempt.selectedQuestions)} onClick={() => submit()}>Submit now</button><button type="button" className="secondary" onClick={() => setConfirm(false)}>Keep working</button></div></section>}
      {review && <section className="poa-historical-review"><h2>Review your attempt</h2>
        {!historicalChoiceIsValid(paper, attempt.selectedQuestions) && <p className="poa-source-warning">Time expired before a valid optional question selection was saved. All your responses were retained for review; no paper total can be published from this selection.</p>}
        {feedback && <p>{feedback.checked ? `Practice check: ${feedback.matching} of ${feedback.checked} checked answers correct. Review the explanations for each question.` : "Your answers are saved. Worked feedback isn’t available for this paper yet."}</p>}
        <p>{receipt || (attempt.serverSubmitted ? "Your submission is saved on SPARK." : "Your responses are saved on this device.")}</p>
        <div className="poa-actions"><button type="button" className="secondary" onClick={exportAnswers}>Export my answers</button>{attempt.serverId && !attempt.serverSubmitted && <button type="button" disabled={busy} onClick={() => submit()}>Retry server submission</button>}{attempt.serverId && <button type="button" className="secondary" disabled={busy} onClick={async () => { setBusy(true); const result = await readServerExamV2Result({ supabase, attemptId: attempt.serverId }); if (result.available) setServerResult(result); else setError("Could not load your grading result. Try again when connected."); setBusy(false); }}>Check grading result</button>}</div>
        {serverResult && <p role="status">{serverResult.status === "verified" && Number.isFinite(serverResult.score) && Number.isFinite(serverResult.maxMarks) ? `SPARK graded result: ${serverResult.score} / ${serverResult.maxMarks}` : serverResult.status === "not-eligible" ? "Automatic grading is not available for this paper yet. Your responses remain saved." : `Grading status: ${serverResult.status}. A final score is not yet available.`}</p>}
        <details><summary>Start another attempt</summary><p>Export your answers first. Starting again replaces this device’s saved attempt for this paper.</p><div className="poa-actions"><button type="button" disabled={busy} onClick={() => begin("practice")}>Start new practice</button><button type="button" className="secondary" disabled={busy} onClick={() => begin("timed")}>Start new timed practice</button></div></details>
      </section>}
      {!isPaper1 && <details className="poa-lesson-tools"><summary>Open accounting tools</summary><AccountingWorkspace userId={userId}/></details>}
    </>}
  </main>;
}
