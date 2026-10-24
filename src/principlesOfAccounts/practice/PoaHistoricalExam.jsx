import React, { useEffect, useRef, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { startServerExamAttempt, submitServerExamAttempt, localExamDeadline, readServerExamV2Result, readServerExamClock } from "../../grading/serverExamAttempt";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import AccountingWorkspace from "../components/AccountingWorkspace";
import PoaQuestionText from "./PoaQuestionText";
import PoaDrawingPad from "./PoaDrawingPad";
import { PoaExamHeader, PoaQuestionNavigator } from "./PoaExamLayout";
import "./poaPractice.css";
import "./poaLayout.css";
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
  const [selectionNotice, setSelectionNotice] = useState(false);
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
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(attempt)); } catch { setError("This browser cannot save your answers. Copy your work before leaving this page."); } }, [attempt, key]);
  useEffect(() => { window.scrollTo?.({ top: 0, behavior: "instant" }); }, [attempt.index, attempt.phase]);
  const begin = async (mode) => {
    if (busy) return;
    setBusy(true); setError(""); setReceipt(""); setServerResult(null); setSelectionNotice(false);
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
        const progress = await recordSubjectActivity({ supabase, activity: { subjectId: "principles-of-accounts", activityKey: isPaper1 ? `exam:poa-historical:${paper.id}:${snapshot.id}` : `exam:poa-v2:${snapshot.serverId}`,
          activityType: "exam", title: `Principles of Accounts ${title}`, completed: true, score: null, maxScore: paper.maxMarks, metadata: { ...metadata, server_attempt_id: snapshot.serverId } } });
        if (progress?.error) setError("Your submission is saved, but progress could not be updated.");
      } else setReceipt(snapshot.serverId ? "SPARK could not save this submission. Your answers remain here; retry when connected." : "Your completed practice is saved on this device. You can return to this paper to review it.");
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
    setAttempt((a) => ({ ...a, index, page: paper.questions[index].page || paper.questions[index].sourcePages?.[0] || a.page }));
  };
  const changeResponse = (value) => setAttempt((a) => ({ ...a, responses: { ...a.responses, [String(question.number)]: value } }));
  const selectionValid = historicalChoiceIsValid(paper, attempt.selectedQuestions);
  return <main className="poa-practice poa-exam poa-historical-exam">
    <div className="poa-exam-topbar"><button type="button" className="poa-back" data-spark-action="nav" onClick={() => exam ? setExitConfirm(true) : onBack()}><BackArrowIcon/> {exam ? "Exit examination" : "Back to past papers"}</button></div>
    <PoaExamHeader paperTitle={title}
      description={`${paper.durationMinutes} minutes · ${paper.maxMarks} marks · ${paper.questionCount} questions${paper.choicePolicy?.type !== "all" ? ` · answer ${paper.requiredQuestionCount}` : " · answer all questions"}`}
      summary={attempt.phase === "instructions" ? undefined : `${answered}/${paper.questionCount} answered · ${Object.values(attempt.flags).filter(Boolean).length} flagged`}
      timeLabel={attempt.phase === "instructions" ? undefined : review ? "Attempt" : attempt.mode === "timed" ? "Time remaining" : "Practice"}
      timeValue={attempt.phase === "instructions" ? undefined : review ? "Submitted" : attempt.mode === "timed" ? time(seconds) : "No time limit"}/>
    {error && <p role="alert">{error}</p>}
    {legacyNotebook && <details><summary>Your saved notebook</summary><p>Your earlier notes are here. You can copy them into the relevant answers below.</p><pre className="poa-legacy-notebook">{legacyNotebook}</pre></details>}
    {attempt.phase === "instructions" ? <>
      <section className="poa-exam-instructions"><h2>Before you begin</h2><p>Read each question carefully and complete your answers in the spaces provided. Your work is saved as you go.</p>
        {paper.choicePolicy?.type === "section-choice" && <p>Answer questions {paper.choicePolicy.compulsory.join(", ")} and choose {paper.choicePolicy.choose} from questions {paper.choicePolicy.from.join(", ")}. Select the optional questions you want SPARK to retain for submission.</p>}
        <p>Choose practice to work at your own pace, or timed practice to sit the paper under exam conditions. You can review your answers after submitting.</p>
        <div className="poa-actions"><button type="button" data-spark-action="forward" disabled={busy} onClick={() => begin("practice")}>{busy ? "Starting…" : "Start practice"}</button><button type="button" data-spark-action="exam" disabled={busy} onClick={() => begin("timed")}>Start timed practice</button></div>
      </section>
    </> : <>
      <div className="poa-exam-layout"><div className="poa-exam-content">
      <div className="poa-native-exam-body">
        <section className="poa-answer-sheet" aria-label={`Answer sheet for question ${question.number}`}>
          <div className="poa-question-heading"><h2>Question {question.number}{question.maxMarks && <small> ({question.maxMarks} marks)</small>}</h2>
          {!review && <button type="button" className="secondary" data-spark-action="nav" aria-pressed={!!attempt.flags[question.number]} onClick={() => setAttempt((a) => ({ ...a, flags: { ...a.flags, [question.number]: !a.flags[question.number] } }))}>{attempt.flags[question.number] ? "Remove flag" : "Flag for review"}</button>}</div>
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
          <div className="poa-question-actions poa-actions"><button type="button" className="secondary" data-spark-action="nav" disabled={attempt.index === 0} onClick={() => chooseQuestion(attempt.index - 1)}><BackArrowIcon/> Previous question</button><button type="button" className="secondary" data-spark-action="nav" disabled={attempt.index === paper.questionCount - 1} onClick={() => chooseQuestion(attempt.index + 1)}>Next question <ForwardArrowIcon/></button></div>
        </section>
      </div>
      {!review && <div className="poa-exam-submit-strip poa-actions"><span>Your answers are saved as you work.</span><button type="button" data-spark-action="exam" disabled={busy} onClick={() => selectionValid ? setConfirm(true) : setSelectionNotice(true)}>Submit paper</button></div>}
      {selectionNotice && !selectionValid && <p role="alert">Your optional question selection does not match the printed instructions. Select exactly {paper.choicePolicy.choose} optional questions before submitting.</p>}
      {review && <section className="poa-historical-review"><h2>Review your attempt</h2>
        {!historicalChoiceIsValid(paper, attempt.selectedQuestions) && <p className="poa-source-warning">Time expired before a valid optional question selection was saved. All your responses were retained for review; no paper total can be published from this selection.</p>}
        {feedback && <p>{feedback.checked ? `Practice check: ${feedback.matching} of ${feedback.checked} checked answers correct. Review the explanations for each question.` : "Your answers are saved. Worked feedback isn’t available for this paper yet."}</p>}
        <p>{receipt || (attempt.serverSubmitted ? "Your submission is saved on SPARK." : "Your responses are saved on this device.")}</p>
        {attempt.serverId && <div className="poa-actions">{!attempt.serverSubmitted && <button type="button" disabled={busy} onClick={() => submit()}>Retry server submission</button>}<button type="button" className="secondary" data-spark-action="nav" disabled={busy} onClick={async () => { setBusy(true); const result = await readServerExamV2Result({ supabase, attemptId: attempt.serverId }); if (result.available) setServerResult(result); else setError("Could not load your grading result. Try again when connected."); setBusy(false); }}>Check grading result</button></div>}
        {serverResult && <p role="status">{serverResult.status === "verified" && Number.isFinite(serverResult.score) && Number.isFinite(serverResult.maxMarks) ? `SPARK practice score: ${serverResult.score} / ${serverResult.maxMarks}` : serverResult.status === "not-eligible" ? "Your responses are saved. Grading is not available for this attempt." : "Your responses are saved. Your final score is still being checked."}</p>}
        <details><summary>Start another attempt</summary><p>Review your answers before starting again. A new attempt replaces this device’s saved attempt for this paper.</p><div className="poa-actions"><button type="button" data-spark-action="forward" disabled={busy} onClick={() => begin("practice")}>Start new practice</button><button type="button" data-spark-action="exam" disabled={busy} onClick={() => begin("timed")}>Start new timed practice</button></div></details>
      </section>}
      {!isPaper1 && <details className="poa-lesson-tools"><summary>Open accounting tools</summary><AccountingWorkspace userId={userId}/></details>}
      </div><PoaQuestionNavigator label="Historical paper questions" currentId={String(question.number)}
        questions={paper.questions.map((q) => ({ id: String(q.number), label: `Question ${q.number}`,
          answered: isPaper1 ? !!attempt.responses[String(q.number)]?.answer : answerHasContent(attempt.responses[String(q.number)]), flagged: !!attempt.flags[q.number] }))}
        onSelect={(id) => chooseQuestion(paper.questions.findIndex((q) => String(q.number) === String(id)))}/></div>
    </>}
    <ConfirmModal open={exitConfirm} onClose={() => setExitConfirm(false)} onConfirm={() => { setExitConfirm(false); onBack(); }}
      title="Save and exit?" message={`Your answers will be saved.${attempt.mode === "timed" ? " The timer will keep running while you’re away." : " Come back whenever you’re ready."}`}
      confirmLabel="Save and exit" cancelLabel="Keep working"/>
    <ConfirmModal open={confirm && selectionValid} onClose={() => setConfirm(false)} onConfirm={() => submit()} busy={busy}
      title="Submit this paper?" message={`${answered} of ${paper.questionCount} questions ${isPaper1 ? "have an answer" : "contain an answer or working"}. You can review this attempt after submission; your answers will be locked.`}
      confirmLabel="Submit now" cancelLabel="Keep working"/>
  </main>;
}
