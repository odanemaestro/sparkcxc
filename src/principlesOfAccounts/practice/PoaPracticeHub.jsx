import React, { useEffect, useRef, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import ConfirmModal from "../../components/ui/ConfirmModal";
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
import { PoaExamHeader, PoaQuestionNavigator } from "./PoaExamLayout";
import { usePracticeRouteState } from "../../routing/usePracticeRouteState";
import "./poaPractice.css";
import "./poaLayout.css";
const CONFIG = Object.freeze({
  number: 1,
  label: "Accounting foundations and applications",
  subjectId: "principles-of-accounts",
  subjectName: "Principles of Accounts",
  source: "poa_original_paper1_v1",
  paperId: "POA-ORIGINAL-01-01",
  questions: POA_PAPER1.map((q) => ({ ...q, answer: "ABCD"[q.answerIndex] })),
});
const SUBJECT = "principles-of-accounts";
const POA_VIEWS = new Set(["home", "library", "paper1", "paper2", "historical", "workspace"]);
const POA_SOURCES = manifest.filter((s) => s.paper && !s.duplicateOf && hasCompletePoaText(getPoaHistoricalPaper(s.id)));
const POA_SOURCE_BY_ID = new Map([
  ...POA_SOURCES.map((s) => [s.id, s]),
  ...POA_SPECIMEN_PAPERS.filter(hasCompletePoaText).map((p) => [p.id, getPoaPaperSource(p)]),
]);
const routeSelection = (allowed, fallback) => ({
  decode: (raw) => allowed.includes(raw) ? raw : fallback,
  replace: true,
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
              activityKey: `exam:poa-v2:${snapshot.serverId}`,
              activityType: "exam",
              title: "Principles of Accounts Paper 02",
              completed: true,
              score: null,
              maxScore: 100,
              metadata: {
                paper: "02",
                paper_id: POA_PAPER2_ID,
                server_attempt_id: snapshot.serverId,
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
    <main className="poa-practice poa-exam">
      <button className="poa-back" data-spark-action="nav" type="button" onClick={() => attempt.phase === "exam" ? setExitConfirm(true) : onBack()}>
        <BackArrowIcon /> {attempt.phase === "exam" ? "Exit examination" : "Back to Accounts practice"}
      </button>
      <PoaExamHeader
        paperTitle="Paper 2 · Practice set 1"
        description="Five compulsory questions · 20 marks each · 3 hours · 100 marks"
        summary={attempt.phase === "instructions" ? "Five compulsory questions · 20 marks each · 100 marks" : `${Object.values(attempt.responses).filter((r) => String(r?.answer ?? "").trim()).length}/100 checkpoints answered · Five questions`}
        timeLabel={attempt.phase === "instructions" ? "Duration" : review ? "Status" : "Time remaining"}
        timeValue={attempt.phase === "instructions" ? "3 hours" : review ? "Submitted" : formatTime(seconds)}
      />
      {error && <p role="alert" className="poa-error">{error}</p>}
      <ConfirmModal
        open={exitConfirm}
        onClose={() => setExitConfirm(false)}
        onConfirm={onBack}
        title="Save and exit?"
        message="Your answers will be saved. The timer will keep running while you’re away."
        confirmLabel="Save and exit"
        cancelLabel="Keep working"
      />
      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => submit()}
        title="Submit your responses?"
        message="You can review your answers after submission, but you will not be able to edit this attempt."
        confirmLabel="Submit now"
        cancelLabel="Keep working"
        busy={busy}
      />
      {attempt.phase === "instructions" ? (
        <section className="poa-exam-instructions">
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
          <button type="button" data-spark-action="exam" disabled={busy} onClick={begin}>
            {busy ? "Starting…" : "Start Paper 2"}
          </button>
        </section>
      ) : (
        <div className="poa-exam-layout">
          <div className="poa-exam-content">
          <section className="poa-native-exam-body">
            <div className="poa-question-heading">
              <h2>{question.number}. {question.title}</h2>
              <span>20 marks</span>
            </div>
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
                data-spark-action="nav"
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
                data-spark-action="forward"
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
                data-spark-action="exam"
                disabled={busy}
                onClick={() => setConfirm(true)}
              >
                Submit Paper 2
              </button>
            )}
          </div>
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
                    data-spark-action="exam"
                    onClick={() => submit()}
                  >
                    Retry server submission
                  </button>
                  <button
                    disabled={busy}
                    className="secondary"
                    type="button"
                    data-spark-action="nav"
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
                <button disabled={busy} type="button" data-spark-action="exam" onClick={begin}>
                  Start a new Paper 2 attempt
                </button>
              </details>
            </section>
          )}
          </div>
          <PoaQuestionNavigator
            questions={POA_PAPER2.map((q) => ({
              id: q.id,
              label: `Question ${q.number}`,
              answered: q.checkpoints.some((checkpoint) => {
                const response = attempt.responses[checkpoint.id];
                return String(response?.answer ?? "").trim() || String(response?.working ?? "").trim();
              }),
            }))}
            currentId={question.id}
            onSelect={(id) => setAttempt((current) => ({ ...current, index: POA_PAPER2.findIndex((q) => q.id === id) }))}
          />
        </div>
      )}
    </main>
  );
}
export default function PoaPracticeHub({ userId, supabase, onBack }) {
  const [mode, setMode] = usePracticeRouteState(SUBJECT, "view", "home", {
    decode: (raw) => POA_VIEWS.has(raw) ? raw : "home",
  });
  const [sourceId, setSourceId] = usePracticeRouteState(SUBJECT, "source", null, {
    decode: (raw) => POA_SOURCE_BY_ID.has(raw) ? raw : null,
    replace: true,
  });
  const [libraryPaper, setLibraryPaper] = usePracticeRouteState(SUBJECT, "paper", "1", routeSelection(["1", "2"], "1"));
  const [tab1, setTab1] = usePracticeRouteState(SUBJECT, "tab1", "practice", routeSelection(["practice", "past"], "practice"));
  const [tab2, setTab2] = usePracticeRouteState(SUBJECT, "tab2", "practice", routeSelection(["practice", "past"], "practice"));
  const validYears = (paper) => ["all", ...POA_SOURCES.filter((s) => s.paper === paper).map((s) => String(s.year))];
  const [year1, setYear1] = usePracticeRouteState(SUBJECT, "year1", "all", routeSelection(validYears("1"), "all"));
  const [year2, setYear2] = usePracticeRouteState(SUBJECT, "year2", "all", routeSelection(validYears("2"), "all"));
  const [sitting1, setSitting1] = usePracticeRouteState(SUBJECT, "session1", "all", routeSelection(["all", "JAN", "MJ"], "all"));
  const [sitting2, setSitting2] = usePracticeRouteState(SUBJECT, "session2", "all", routeSelection(["all", "JAN", "MJ"], "all"));
  const libraryTabs = { 1: tab1, 2: tab2 };
  const filters = { 1: { year: year1, sitting: sitting1 }, 2: { year: year2, sitting: sitting2 } };
  const source = POA_SOURCE_BY_ID.get(sourceId);
  const openSource = (selected) => { setSourceId(selected.id); setMode("historical"); };
  const setLibraryTab = (tab) => (libraryPaper === "1" ? setTab1 : setTab2)(tab);
  useEffect(() => {
    window.scrollTo?.({ top: 0, left: 0, behavior: "instant" });
  }, [mode, source?.id]);
  if (mode === "paper1")
    return (
      <div className="poa-original-paper1">
      <FnhPaper1Exam
        key={userId || "guest"}
        supabase={supabase}
        userId={userId}
        practiceConfig={CONFIG}
        onBack={() => setMode("library")}
      />
      </div>
    );
  if (mode === "paper2")
    return (
      <Paper2Exam
        key={userId}
        supabase={supabase}
        userId={userId}
        onBack={() => setMode("library")}
      />
    );
  if (mode === "historical" && source)
    return (
      <PoaHistoricalExam
        key={source.id + userId}
        source={source}
        paper={getPoaHistoricalPaper(source.id)}
        supabase={supabase}
        userId={userId}
        onBack={() => setMode("library")}
      />
    );
  const sources = POA_SOURCES.filter((s) => s.paper === libraryPaper)
    .sort((a, b) => b.year - a.year || a.sitting.localeCompare(b.sitting));
  if (mode === "workspace") return (
    <main className="poa-practice poa-practice-shell">
      <button type="button" className="poa-back" data-spark-action="nav" onClick={() => setMode("home")}>
        <BackArrowIcon /> Back to Accounts practice
      </button>
      <header className="poa-library-header">
        <h1>Accounting tools</h1>
        <p>Work through a ledger, cash book, reconciliation or financial statement at your own pace.</p>
      </header>
      <AccountingWorkspace key={userId || "guest"} userId={userId} />
    </main>
  );
  if (mode === "library") {
    const isPaper1 = libraryPaper === "1";
    const tab = libraryTabs[libraryPaper];
    const filter = filters[libraryPaper];
    const years = [...new Set(sources.map((s) => s.year))];
    const matches = sources.filter((s) =>
      (filter.year === "all" || String(s.year) === filter.year) &&
      (filter.sitting === "all" || s.sitting === filter.sitting),
    );
    const specimens = POA_SPECIMEN_PAPERS.filter((p) => String(p.paper) === libraryPaper && hasCompletePoaText(p));
    const updateFilter = (next) => {
      if (next.year !== undefined) (isPaper1 ? setYear1 : setYear2)(next.year);
      if (next.sitting !== undefined) (isPaper1 ? setSitting1 : setSitting2)(next.sitting);
    };
    return (
      <main className="poa-practice poa-practice-shell">
        <button type="button" className="poa-back" data-spark-action="nav" onClick={() => setMode("home")}>
          <BackArrowIcon /> Back to Accounts practice
        </button>
        <header className="poa-library-header">
          <h1>Paper {libraryPaper}: {isPaper1 ? "Multiple choice" : "Structured questions"}</h1>
          <p>Choose a practice set or a past paper. Read the instructions before starting your examination.</p>
          <div className="poa-library-meta">
            <span>{isPaper1 ? "60 multiple-choice questions" : "Written answers and working"}</span>
            <span>{isPaper1 ? "90 minutes" : "3 hours"}</span>
          </div>
        </header>
        <div className="poa-library-tabs" role="group" aria-label="Choose practice or past papers">
          <button type="button" className={tab === "practice" ? "active" : ""} data-spark-action="nav" aria-pressed={tab === "practice"} onClick={() => setLibraryTab("practice")}>Practice sets</button>
          <button type="button" className={tab === "past" ? "active" : ""} data-spark-action="nav" aria-pressed={tab === "past"} onClick={() => setLibraryTab("past")}>Past papers</button>
        </div>
        {tab === "practice" ? (
          <>
            <div className="poa-library-section-heading">
              <h2>Choose a practice set</h2>
              <p>Your timer starts after the instructions.</p>
            </div>
            <section className="poa-library-grid" aria-label={`Paper ${libraryPaper} practice sets`}>
              <article className="poa-library-card">
                <h3>Practice set 1</h3>
                <p>{isPaper1 ? "60 syllabus-based multiple-choice questions with an answer review and explanations." : "Five compulsory questions. Show your working, enter your answers, then review the worked solutions."}</p>
                <p className="poa-library-meta">{isPaper1 ? "60 marks · 90 minutes" : "100 marks · 3 hours"}</p>
                <button type="button" data-spark-action="forward" onClick={() => setMode(isPaper1 ? "paper1" : "paper2")}>
                  Select practice paper <ForwardArrowIcon />
                </button>
              </article>
              {specimens.map((specimen) => <article className="poa-library-card" key={specimen.id}>
                <h3>Syllabus specimen paper</h3>
                <p>Practise the specimen questions, then review your answers and worked solutions.</p>
                <p className="poa-library-meta">Paper {libraryPaper} · {isPaper1 ? "Multiple choice" : "Structured questions"}</p>
                <button type="button" className="secondary" data-spark-action="forward" onClick={() => openSource(getPoaPaperSource(specimen))}>
                  Select specimen paper <ForwardArrowIcon />
                </button>
              </article>)}
            </section>
          </>
        ) : (
          <>
            <div className="poa-library-section-heading">
              <h2>Choose a past paper</h2>
              <p>Find an examination by year and session.</p>
            </div>
            <div className="poa-library-filters">
              <label htmlFor="poa-library-year">Year
                <select id="poa-library-year" value={filter.year} onChange={(e) => updateFilter({ year: e.target.value })}>
                  <option value="all">All years</option>
                  {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              </label>
              <label htmlFor="poa-library-session">Session
                <select id="poa-library-session" value={filter.sitting} onChange={(e) => updateFilter({ sitting: e.target.value })}>
                  <option value="all">All sessions</option>
                  <option value="JAN">January</option>
                  <option value="MJ">May/June</option>
                </select>
              </label>
            </div>
            <section className="poa-library-grid" aria-label={`Paper ${libraryPaper} past papers`}>
              {matches.map((s) => <article className="poa-library-card" key={s.id}>
                <h3>{s.year} {s.sitting === "JAN" ? "January" : "May/June"}</h3>
                <p className="poa-library-meta">Paper {libraryPaper} · {isPaper1 ? "Multiple choice" : "Structured questions"}</p>
                <p>Read the original questions, save your answers and review your work when you finish.</p>
                <button type="button" className="secondary" data-spark-action="forward" onClick={() => openSource(s)}>
                  Select past paper <ForwardArrowIcon />
                </button>
              </article>)}
              {matches.length === 0 && <p className="poa-library-empty">No papers match these filters. Try another year or session.</p>}
            </section>
          </>
        )}
      </main>
    );
  }
  return (
    <main className="poa-practice poa-practice-shell">
      <button type="button" className="poa-back" data-spark-action="nav" onClick={onBack}>
        <BackArrowIcon /> Back to practice subjects
      </button>
      <header className="poa-library-header">
        <h1>Principles of Accounts practice</h1>
        <p>Choose Paper 1 or Paper 2 for practice sets, past papers and an answer review.</p>
      </header>
      <section className="poa-paper-choices" aria-label="Choose an examination paper">
        {["1", "2"].map((paper) => <button
          type="button"
          key={paper}
          className="poa-paper-choice"
          data-spark-action="forward"
          aria-label={`Open Paper ${paper}`}
          onClick={() => { setLibraryPaper(paper); setMode("library"); }}
        >
          <span className="poa-paper-choice-number" aria-hidden="true">0{paper}</span>
          <span className="poa-paper-choice-copy">
            <strong>Paper {paper}</strong>
            <span>{paper === "1" ? "Multiple choice · 90 minutes" : "Structured questions · 3 hours"}</span>
            <small>Practice sets and past papers</small>
          </span>
          <ForwardArrowIcon />
        </button>)}
      </section>
      <section className="poa-workspace-entry">
        <div><h2>Accounting tools</h2><p>Practise with a ledger, cash book, trial balance and more.</p></div>
        <button type="button" className="secondary" data-spark-action="forward" onClick={() => setMode("workspace")}>Open accounting tools <ForwardArrowIcon /></button>
      </section>
    </main>
  );
}
