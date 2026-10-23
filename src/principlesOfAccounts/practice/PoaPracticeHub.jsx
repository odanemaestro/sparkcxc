import React, { useEffect, useRef, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import FnhPaper1Exam from "../../fnh/practice/FnhPaper1Exam";
import { POA_PAPER1 } from "../data/poaPaper1";
import {
  POA_PAPER2,
  POA_PAPER2_ID,
  POA_PAPER2_BANK_VERSION,
  POA_PAPER2_RUBRIC_VERSION,
} from "../data/poaPaper2";
import { reviewPoaPaper2V2 } from "../poaMarkingV2";
import {
  startServerExamAttempt,
  submitServerExamAttempt,
  localExamDeadline,
  readServerExamV2Result,
} from "../../grading/serverExamAttempt";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import manifest from "../../../public/principles-of-accounts/manifest.json";
import AccountingWorkspace from "../components/AccountingWorkspace";
import PoaHistoricalExam from "./PoaHistoricalExam";
import { getPoaHistoricalPaper, getPoaPaperSource, POA_SPECIMEN_PAPERS } from "../data/poaHistoricalPapers";
import { hasCompletePoaText } from "../data/poaPrintedPapers";
import "./poaPractice.css";
const CONFIG = Object.freeze({
  number: 1,
  label: "Accounting foundations and applications",
  subjectId: "principles-of-accounts",
  subjectName: "Principles of Accounts",
  source: "poa_original_paper1_v1",
  paperId: "POA-ORIGINAL-01-01",
  questions: POA_PAPER1.map((q) => ({ ...q, answer: "ABCD"[q.answerIndex] })),
});
const freshAttempt = () => ({
  phase: "instructions",
  id: crypto.randomUUID(),
  responses: {},
  index: 0,
  deadline: null,
  serverId: null,
});
function readAttempt(key) {
  try {
    const a = JSON.parse(localStorage.getItem(key));
    if (
      a &&
      ["exam", "review"].includes(a.phase) &&
      a.responses &&
      typeof a.responses === "object" &&
      !Array.isArray(a.responses) &&
      Number.isInteger(a.index) &&
      a.index >= 0 &&
      a.index < 5 &&
      Number.isFinite(a.deadline)
    )
      return a;
  } catch {}
  return freshAttempt();
}
const formatTime = (s) =>
  `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
function Paper2Exam({ userId, supabase, onBack }) {
  const key = `spark-poa-paper2-v1:${userId || "guest"}`;
  const [attempt, setAttempt] = useState(() => readAttempt(key)),
    [seconds, setSeconds] = useState(10800),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [receipt, setReceipt] = useState(""),
    [confirm, setConfirm] = useState(false),
    [exitConfirm, setExitConfirm] = useState(false),
    [serverResult, setServerResult] = useState(null);
  const submitting = useRef(false);
  const question = POA_PAPER2[attempt.index];
  const review = attempt.phase === "review";
  const feedback = review ? reviewPoaPaper2V2(attempt.responses) : null;
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(attempt));
    } catch {
      setError(
        "This browser cannot save your answers. Copy your working before leaving.",
      );
    }
  }, [attempt, key]);
  const begin = async () => {
    setBusy(true);
    setError("");
    const server = await startServerExamAttempt({
      supabase,
      subjectId: "principles-of-accounts",
      paper: "02",
      mode: "timed",
      durationSeconds: 10800,
      bankVersion: POA_PAPER2_BANK_VERSION,
      rubricVersion: POA_PAPER2_RUBRIC_VERSION,
      graderVersion: "marking-reconciliation-v2",
      metadata: { paper_id: POA_PAPER2_ID, source: "poa-original-paper2-v1" },
    });
    setAttempt({
      ...freshAttempt(),
      phase: "exam",
      deadline: localExamDeadline(server) || Date.now() + 10800000,
      serverId: server.attempt_id || server.id || null,
    });
    if (!server.available && supabase?.rpc)
      setError(
        "Your answers are saved on this device. Connect to SPARK to submit them for marking.",
      );
    setBusy(false);
  };
  const submit = async (snapshot = attempt) => {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setConfirm(false);
    setAttempt((a) => ({ ...a, phase: "review" }));
    if (snapshot.serverId) {
      const result = await submitServerExamAttempt({
        supabase,
        attemptId: snapshot.serverId,
        responses: snapshot.responses,
        score: null,
        maxScore: 100,
        metadata: {
          subject: "principles-of-accounts",
          paper: "02",
          paper_id: POA_PAPER2_ID,
          source: "poa-original-paper2-v1",
          provisional: true,
          unresolved_marks: 100,
          scorePublicationAllowed: false,
        },
      });
      setReceipt(
        result.available
          ? "Submission saved on SPARK. Your grading result is pending."
          : "Server submission failed. Your answers remain saved here; use Retry server submission.",
      );
      if (result.available) {
        try {
          const saved = await recordSubjectActivity({
            supabase,
            activity: {
              subjectId: "principles-of-accounts",
              activityKey: `exam:poa-paper2:${snapshot.id}`,
              activityType: "exam",
              title: "Principles of Accounts Paper 02",
              completed: true,
              score: null,
              maxScore: 100,
              metadata: {
                paper: "02",
                paper_id: POA_PAPER2_ID,
                provisional: true,
                unresolved_marks: 100,
                scorePublicationAllowed: false,
                source: "poa-original-paper2-v1",
              },
            },
          });
          if (saved?.error)
            setError("Submission saved, but progress could not be updated.");
        } catch {
          setError("Submission saved, but progress could not be updated.");
        }
      }
    } else
      setReceipt(
        "Offline practice saved on this device. No server grade was submitted.",
      );
    setBusy(false);
    submitting.current = false;
  };
  const submitRef = useRef(submit);
  submitRef.current = submit;
  useEffect(() => {
    if (attempt.phase !== "exam") return;
    const tick = () => {
      const left = Math.max(
        0,
        Math.ceil((attempt.deadline - Date.now()) / 1000),
      );
      setSeconds(left);
      if (!left) submitRef.current();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [attempt.phase, attempt.deadline]);
  useEffect(() => {
    window.scrollTo?.({ top: 0, behavior: "instant" });
  }, [attempt.index, attempt.phase]);
  return (
    <main className="poa-practice">
      <button className="poa-back" type="button" onClick={() => attempt.phase === "exam" ? setExitConfirm(true) : onBack()}>
        <BackArrowIcon /> {attempt.phase === "exam" ? "Exit examination" : "Back to Accounts practice"}
      </button>
      {exitConfirm && <section aria-label="Exit examination"><h2>Save and exit?</h2><p>Your answers will be saved. The timer will keep running while you’re away.</p><div className="poa-actions"><button type="button" onClick={onBack}>Save and exit</button><button type="button" className="secondary" onClick={() => setExitConfirm(false)}>Keep working</button></div></section>}
      <header>
        <span className="poa-eyebrow">SPARK original · Paper 02</span>
        <h1>Principles of Accounts</h1>
        <p>Five compulsory questions · 20 marks each · 3 hours · 100 marks.</p>
      </header>
      <p role="alert">{error}</p>
      {attempt.phase === "instructions" ? (
        <section>
          <h2>Before you begin</h2>
          <p>
            Complete all five questions. Show your working in the provided
            space, then enter the labelled values. Each checkpoint is worth one
            mark so partial knowledge can be identified. Enter negative amounts
            for losses or overdrafts. Use the stated precision, or two decimal
            places where appropriate.
          </p>
          <p>
            This is an original SPARK practice paper. You can review numerical
            answers after submission. A final exam result appears separately
            when SPARK has completed grading.
          </p>
          <button type="button" disabled={busy} onClick={begin}>
            {busy ? "Starting…" : "Start Paper 2"}
          </button>
        </section>
      ) : (
        <>
          <div className="poa-exam-status">
            <strong>
              {review
                ? "Submitted · practice feedback"
                : `Time remaining ${formatTime(seconds)}`}
            </strong>
            <span>
              {
                Object.values(attempt.responses).filter((r) =>
                  String(r?.answer ?? "").trim(),
                ).length
              }
              /100 checkpoints answered
            </span>
          </div>
          <nav className="poa-question-nav" aria-label="Paper 2 questions">
            {POA_PAPER2.map((q, i) => (
              <button
                type="button"
                key={q.id}
                aria-current={attempt.index === i ? "step" : undefined}
                onClick={() => setAttempt({ ...attempt, index: i })}
              >
                Question {i + 1}
              </button>
            ))}
          </nav>
          <section>
            <h2>
              {question.number}. {question.title} <small>(20 marks)</small>
            </h2>
            <p>{question.scenario}</p>
            <div className="poa-answer-grid">
              {question.checkpoints.map((c) => {
                const current = attempt.responses[c.id] || {};
                const decision = feedback?.evidence.find(
                  (e) => e.criterionId === c.id,
                );
                return (
                  <div key={c.id}>
                    <label>
                      {c.label} <small>(1 mark)</small>
                      <input
                        disabled={review}
                        inputMode="decimal"
                        value={current.answer || ""}
                        onChange={(e) =>
                          setAttempt({
                            ...attempt,
                            responses: {
                              ...attempt.responses,
                              [c.id]: { ...current, answer: e.target.value },
                            },
                          })
                        }
                      />
                    </label>
                    {review && (
                      <p className="poa-check-feedback">
                        {decision?.marks === 1
                          ? "Matches the practice checkpoint"
                          : decision
                            ? "Does not match this checkpoint"
                            : "No numerical decision"}{" "}
                        · Worked value: {c.expected}. {c.solution}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <label>
              Show your working for this question
              <textarea
                rows="8"
                disabled={review}
                value={
                  attempt.responses[question.checkpoints[0].id]?.working || ""
                }
                onChange={(e) => {
                  const id = question.checkpoints[0].id;
                  setAttempt({
                    ...attempt,
                    responses: {
                      ...attempt.responses,
                      [id]: {
                        ...attempt.responses[id],
                        working: e.target.value,
                      },
                    },
                  });
                }}
              />
            </label>
            <p>
              Your working is saved alongside your numerical responses.
              Automatic practice checks currently compare numerical values.
            </p>
          </section>
          <div className="poa-actions">
            {attempt.index > 0 && (
              <button
                type="button"
                className="secondary"
                onClick={() =>
                  setAttempt({ ...attempt, index: attempt.index - 1 })
                }
              >
                <BackArrowIcon /> Previous question
              </button>
            )}
            {attempt.index < 4 && (
              <button
                type="button"
                className="secondary"
                onClick={() =>
                  setAttempt({ ...attempt, index: attempt.index + 1 })
                }
              >
                Next question <ForwardArrowIcon />
              </button>
            )}
            {!review && (
              <button
                type="button"
                disabled={busy}
                onClick={() => setConfirm(true)}
              >
                Submit Paper 2
              </button>
            )}
          </div>
          {confirm && (
            <section
              className="poa-submit-confirm"
              aria-label="Confirm submission"
            >
              <h2>Submit your responses?</h2>
              <p>
                You will be able to review your answers but cannot edit this
                attempt after submission.
              </p>
              <button type="button" disabled={busy} onClick={() => submit()}>
                Submit now
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setConfirm(false)}
              >
                Keep working
              </button>
            </section>
          )}
          {review && (
            <section aria-live="polite">
              <h2>Practice feedback</h2>
              <p>
                {feedback.candidateMarks} matching numerical checkpoints out of
                100. This is practice feedback; a final score has not been
                published.
              </p>
              <p>{receipt || "Your responses are saved on this device."}</p>
              {attempt.serverId && (
                <>
                  <button
                    disabled={busy}
                    type="button"
                    onClick={() => submit()}
                  >
                    Retry server submission
                  </button>
                  <button
                    disabled={busy}
                    className="secondary"
                    type="button"
                    onClick={async () => {
                      setBusy(true);
                      const result = await readServerExamV2Result({
                        supabase,
                        attemptId: attempt.serverId,
                      });
                      if (result.available) setServerResult(result);
                      else
                        setError(
                          "Could not load your grading result. Please try again.",
                        );
                      setBusy(false);
                    }}
                  >
                    Check grading result
                  </button>
                </>
              )}
              {serverResult && (
                <p role="status">
                  {serverResult.status === "verified" &&
                  typeof serverResult.score === "number" &&
                  typeof serverResult.maxMarks === "number"
                    ? `SPARK graded result: ${serverResult.score} / ${serverResult.maxMarks}`
                    : serverResult.status === "not-eligible"
                      ? "Automatic grading is not yet available for this paper. Your submitted responses are saved."
                      : `Grading status: ${serverResult.status}. A final score is not yet available.`}
                </p>
              )}
              <details>
                <summary>Start another attempt</summary>
                <p>
                  This replaces the local saved attempt. Review or copy your
                  working first.
                </p>
                <button disabled={busy} type="button" onClick={begin}>
                  Start a new Paper 2 attempt
                </button>
              </details>
            </section>
          )}
        </>
      )}
    </main>
  );
}
export default function PoaPracticeHub({ userId, supabase, onBack }) {
  const [mode, setMode] = useState("home"),
    [source, setSource] = useState(null),
    [paper, setPaper] = useState("all");
  if (mode === "paper1")
    return (
      <FnhPaper1Exam
        key={userId || "guest"}
        supabase={supabase}
        userId={userId}
        practiceConfig={CONFIG}
        onBack={() => setMode("home")}
      />
    );
  if (mode === "paper2")
    return (
      <Paper2Exam
        key={userId}
        supabase={supabase}
        userId={userId}
        onBack={() => setMode("home")}
      />
    );
  if (source)
    return (
      <PoaHistoricalExam
        key={source.id + userId}
        source={source}
        paper={getPoaHistoricalPaper(source.id)}
        supabase={supabase}
        userId={userId}
        onBack={() => setSource(null)}
      />
    );
  const sources = manifest
    .filter(
      (s) =>
        s.paper && !s.duplicateOf && hasCompletePoaText(getPoaHistoricalPaper(s.id)) && (paper === "all" || s.paper === paper),
    )
    .sort((a, b) => b.year - a.year || a.paper.localeCompare(b.paper));
  return (
    <main className="poa-practice">
      <button type="button" className="poa-back" onClick={onBack}>
        <BackArrowIcon /> Back to practice subjects
      </button>
      <header>
        <span className="poa-eyebrow">CSEC · Principles of Accounts</span>
        <h1>Put your accounting skills to work</h1>
        <p>
          Choose a practice paper or open the accounting tools.
        </p>
      </header>
      <div className="poa-practice-choices">
        <section>
          <h2>Paper 1</h2>
          <p>
            Original practice: 60 multiple-choice questions in 90 minutes.
            Review your answers and explanations when you finish.
          </p>
          <button type="button" onClick={() => setMode("paper1")}>
            Open Paper 1 <ForwardArrowIcon />
          </button>
        </section>
        <section>
          <h2>Paper 2</h2>
          <p>
            Original practice: five questions in 3 hours.
            Show your working, then review the worked answers.
          </p>
          <button type="button" onClick={() => setMode("paper2")}>
            Open Paper 2 <ForwardArrowIcon />
          </button>
        </section>
      </div>
      {POA_SPECIMEN_PAPERS.some(hasCompletePoaText) && <section>
        <h2>Syllabus specimen papers</h2>
        <p>Try the syllabus specimen papers, then review your answers and worked solutions.</p>
        <div className="poa-actions">{POA_SPECIMEN_PAPERS.filter(hasCompletePoaText).map((specimen) => <button key={specimen.id} type="button" className="secondary" onClick={() => setSource(getPoaPaperSource(specimen))}>Open specimen Paper {specimen.paper}</button>)}</div>
      </section>}
      <section>
        <h2>Past papers</h2>
        <p>Choose a paper to practise. You can save your answers and come back to them later.</p>
        <label>
          Filter paper
          <select value={paper} onChange={(e) => setPaper(e.target.value)}>
            <option value="all">All papers</option>
            <option value="1">Paper 1</option>
            <option value="2">Paper 2</option>
          </select>
        </label>
        <ul className="poa-paper-list">
          {sources.map((s) => (
            <li key={s.id}>
              <span>
                <strong>
                  {s.year} · {s.sitting === "JAN" ? "January" : "May/June"} ·
                  Paper 0{s.paper}
                </strong>
                <small>{s.paper === "1" ? "Multiple choice" : "Structured questions"}</small>
              </span>
              <button
                type="button"
                className="secondary"
                onClick={() => setSource(s)}
              >
                Open past paper <ForwardArrowIcon />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <details className="poa-lesson-tools"><summary>Accounting tools</summary><AccountingWorkspace key={userId || "guest"} userId={userId} /></details>
    </main>
  );
}
