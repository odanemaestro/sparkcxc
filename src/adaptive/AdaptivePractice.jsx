// ============================================================================
// Adaptive CSEC Mathematics practice screen
// Done by: Odane Robinson
//
// V5.3.4 uses the same CXC-style marking core as Paper 2 for written
// Adaptive Practice answers. It separates working from the final answer,
// awards M/A/B partial credit where the stored worked solution provides
// reliable evidence, and keeps the shared answer checker for equivalent
// fractions, decimals, algebra, units, precision and required answer forms.
// Unclear free-text responses retain the self-assessment fallback.
// ============================================================================
import React, { useEffect, useState } from "react";
import { loadQuestionManifest, loadQuestionSet } from "./questionBank";
import { buildAdaptiveSession, skillMastery } from "./adaptiveEngine";
import { fetchAttempts, upsertSkillProgress } from "./persistence";
import { adaptiveQuestionUsesWorking, gradeAdaptiveResponse } from "./adaptiveCxcGrader";
import ReportQuestionButton from "../components/ui/ReportQuestionButton";
import MathText from "../practice/MathText";
import "./adaptive.css";

function isAdaptiveMultipleChoice(question) {
  const type = String(question?.question_type || question?.response_mode || "").toLowerCase();
  return type === "multiple_choice" || type === "mcq" || Array.isArray(question?.options);
}
function adaptiveOptionKey(option, index) {
  if (typeof option === "string") return String.fromCharCode(65 + index);
  return String(option?.key || String.fromCharCode(65 + index)).toUpperCase();
}
function adaptiveOptionText(option) {
  return typeof option === "string" ? option : String(option?.text || "");
}
function AdaptiveStimulus({ stimulus }) {
  if (!stimulus) return null;
  return (
    <div className="adaptive-stimulus">
      {stimulus.label && <MathText as="p" prose className="adaptive-stimulus-label">{stimulus.label}</MathText>}
      {stimulus.kind === "figure" && stimulus.svg ? (
        <div className="adaptive-stimulus-figure" role="img" aria-label={stimulus.alt || "Question diagram"} dangerouslySetInnerHTML={{ __html: stimulus.svg }} />
      ) : stimulus.kind === "table" && Array.isArray(stimulus.headers) ? (
        <div className="adaptive-stimulus-table-wrap"><table className="adaptive-stimulus-table"><thead><tr>{stimulus.headers.map((cell, i) => <th key={i}><MathText>{cell}</MathText></th>)}</tr></thead><tbody>{(stimulus.rows || []).map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}><MathText>{cell}</MathText></td>)}</tr>)}</tbody></table></div>
      ) : stimulus.text ? (
        <MathText as="div" prose className="adaptive-stimulus-text">{stimulus.text}</MathText>
      ) : null}
    </div>
  );
}

export default function AdaptivePractice({ supabase, userId, setView, backLabel = "← Back to Study" }) {
  const [manifest, setManifest] = useState(null);
  const [session, setSession] = useState([]);
  const [index, setIndex] = useState(0);
  const [working, setWorking] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [verdict, setVerdict] = useState(null); // "correct" | "incorrect" | "uncertain" | null
  const [gradeResult, setGradeResult] = useState(null);
  const [selfAssessed, setSelfAssessed] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [savedAttempts, setSavedAttempts] = useState([]);
  const [dbMessage, setDbMessage] = useState("");
  const requestedSkill = new URLSearchParams(window.location.search).get("skill");

  useEffect(() => {
    loadQuestionManifest().then(m => {
      setManifest(m);
      const area = m.areas?.[0];
      setSelectedArea(area?.name || "");
      setSelectedTopic(area?.topics?.[0]?.name || "");
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!supabase || !userId) return undefined;
    fetchAttempts(supabase, userId).then(({ data, error }) => {
      if (cancelled) return;
      if (error) {
        console.warn("Could not load CSEC learning history:", error);
        return;
      }
      setSavedAttempts(data || []);
    });
    return () => { cancelled = true; };
  }, [supabase, userId]);

  useEffect(() => {
    if (manifest && requestedSkill) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifest, requestedSkill]);

  const area = manifest?.areas?.find(a => a.name === selectedArea);

  async function start() {
    const qs = await loadQuestionSet(selectedArea, selectedTopic);
    const targeted = requestedSkill ? qs.filter(q => q.subtopic === requestedSkill || q.topic === requestedSkill) : qs;
    const usable = targeted.length ? targeted : qs;

    const combinedAttempts = [...savedAttempts, ...attempts];
    const stats = {};
    qs.forEach(q => {
      const a = combinedAttempts.filter(x => x.skill === q.subtopic);
      stats[q.subtopic] = skillMastery(a);
    });

    setSession(buildAdaptiveSession(usable, stats, { count: 10 }));
    setIndex(0);
    setWorking("");
    setAnswer("");
    setSubmitted(false);
    setVerdict(null);
    setGradeResult(null);
    setSelfAssessed(false);
    setScore(0);
  }

  const q = session[index];
  const mcq = isAdaptiveMultipleChoice(q);
  const selectedMcqOption = mcq
    ? (q?.options || []).find((option, optionIndex) => adaptiveOptionKey(option, optionIndex) === String(answer).toUpperCase())
    : null;

  async function submit() {
    if (!q || submitted) return;

    const marks = Number(q.marks || 1);
    const result = mcq
      ? (() => {
          const correct = String(answer).trim().toUpperCase() === String(q.answer || "").trim().toUpperCase();
          return { status: correct ? "correct" : "incorrect", correct, marks: correct ? marks : 0, of: marks, criteria: [], needsSelfAssessment: false };
        })()
      : gradeAdaptiveResponse(q, { answer, working });
    const earned = Number(result.marks || 0);
    const correct = earned >= marks;

    const attempt = {
      questionId: q.id,
      skill: q.subtopic,
      correct,
      marks,
      marksEarned: earned,
      difficulty: q.difficulty,
      selfAssessed: false,
    };

    setSubmitted(true);
    setVerdict(result.status);
    setGradeResult(result);
    setLastCorrect(correct);

    if (result.needsSelfAssessment) {
      return;
    }

    await finalizeAttempt(attempt);
  }

  // Called when the student self-assesses an "uncertain" answer (one
  // checkAnswer() couldn't confidently parse) against the worked solution.
  async function confirmSelfAssessment(wasCorrect) {
    if (!q) return;
    const marks = Number(q.marks || 1);
    const earned = wasCorrect ? Number(gradeResult?.selfAssessmentCorrectMarks ?? marks) : Number(gradeResult?.marks || 0);
    const fullyCorrect = earned >= marks;
    setLastCorrect(fullyCorrect);
    setSelfAssessed(true);
    setGradeResult(previous => previous ? { ...previous, marks: earned, correct: fullyCorrect, status: fullyCorrect ? "correct" : "incorrect" } : previous);
    await finalizeAttempt({
      questionId: q.id,
      skill: q.subtopic,
      correct: fullyCorrect,
      marks,
      marksEarned: earned,
      difficulty: q.difficulty,
      selfAssessed: true,
    });
  }

  async function finalizeAttempt(attempt) {
    const { correct, marksEarned: earned } = attempt;
    setAttempts(prev => [...prev, attempt]);
    setScore(s => s + earned);

    if (supabase && userId) {
      const { error: attemptError } = await supabase.from("csec_question_attempts").insert({
        user_id: userId,
        question_id: q.id,
        skill: q.subtopic,
        topic: q.topic,
        curriculum_area: q.curriculum_area,
        difficulty: q.difficulty,
        correct,
        marks: attempt.marks,
        marks_earned: earned,
        selected_answer: answer,
        self_assessed: attempt.selfAssessed,
        attempted_at: new Date().toISOString()
      });

      if (attemptError) {
        console.error("Could not save CSEC attempt:", attemptError);
        setDbMessage("Your answer was marked, but we couldn't save your progress.");
      } else {
        const nextAttempts = [...savedAttempts, ...attempts, attempt];
        setSavedAttempts(prev => [...prev, attempt]);
        const skillAttempts = nextAttempts.filter(x => x.skill === q.subtopic);
        const mastery = skillMastery(skillAttempts);
        const { error: progressError } = await upsertSkillProgress(supabase, {
          userId,
          skill: q.subtopic,
          attempts: mastery.attempts,
          correctAttempts: skillAttempts.filter(x => x.correct).length,
          masteryScore: mastery.score,
          masteryLevel: mastery.level
        });
        if (progressError) {
          console.error("Could not update CSEC skill mastery:", progressError);
          setDbMessage("Answer saved. Skill mastery could not be updated.");
        } else {
          setDbMessage(`Progress saved: ${q.subtopic} is now ${mastery.score}% (${mastery.level}).`);
        }
      }
    }
  }

  async function recordCompletedSession() {
    if (!supabase || !userId || session.length === 0) return;
    const totalMarks = session.reduce((sum, item) => sum + Number(item.marks || 1), 0);
    const practiceTitle = requestedSkill || selectedTopic || selectedArea || "CSEC Mathematics";
    // The database limits repeat alerts for the same practice topic each day.
    const { error } = await supabase.rpc("spark_record_student_milestone", {
      p_event_type: "adaptive_session_completed",
      p_title: practiceTitle,
      p_score: score,
      p_max_score: totalMarks,
      p_skill: requestedSkill || selectedTopic || null,
      p_metadata: {
        curriculum_area: selectedArea || null,
        topic: selectedTopic || null,
        requested_skill: requestedSkill || null,
        question_count: session.length
      }
    });
    if (error) console.warn("Could not save Adaptive Practice milestone:", error);
  }

  async function next() {
    if (index + 1 < session.length) {
      setIndex(i => i + 1);
      setWorking("");
      setAnswer("");
      setSubmitted(false);
      setVerdict(null);
      setGradeResult(null);
      setSelfAssessed(false);
    } else {
      await recordCompletedSession();
      await start();
    }
  }

  useEffect(() => {
    if (!q) return undefined;
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [index, q]);

  if (!manifest) return <div>Loading CSEC practice…</div>;

  return (
    <main className="csec-adaptive-practice">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <h1>CSEC Mathematics Topic Practice</h1>
        <button type="button" onClick={() => setView?.("lesson")}>{backLabel}</button>
      </div>
      <p>Questions are selected from the topics identified for further practice.</p>
      {dbMessage && <p role="status" className="csec-db-message">{dbMessage}</p>}

      <label>
        Area
        <select value={selectedArea} onChange={e => {
          const a = manifest.areas.find(x => x.name === e.target.value);
          setSelectedArea(e.target.value);
          setSelectedTopic(a?.topics?.[0]?.name || "");
        }}>
          {manifest.areas.map(a => <option key={a.name}>{a.name}</option>)}
        </select>
      </label>

      <label>
        Topic
        <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
          {area?.topics?.map(t => <option key={t.name}>{t.name}</option>)}
        </select>
      </label>

      <button onClick={start}>Start practice</button>

      {q && (
        <section aria-live="polite">
          <p>Question {index + 1} of {session.length} · {q.difficulty} · {q.marks} marks</p>
          <AdaptiveStimulus stimulus={q.stimulus} />
          <MathText as="h2" className="adaptive-question-math">{q.question}</MathText>
          <ReportQuestionButton
            supabase={supabase}
            userId={userId}
            questionId={q.id}
            questionSource="adaptive_bank"
            questionText={q.question}
            topic={q.topic}
            area={q.curriculum_area}
          />

          {q.diagram && (
            <div className="csec-question-diagram" aria-label={q.diagram.aria_label}>
              <div className="diagram-placeholder">
                {q.diagram.type.replaceAll("_", " ")}
              </div>
            </div>
          )}
          {mcq ? (
            <div className="adaptive-mcq-options" role="radiogroup" aria-label="Answer choices">
              {(q.options || []).map((option, optionIndex) => {
                const key = adaptiveOptionKey(option, optionIndex);
                const selected = String(answer).toUpperCase() === key;
                const correctKey = String(q.answer || "").toUpperCase();
                const stateClass = submitted
                  ? (key === correctKey ? " correct" : (selected ? " incorrect" : ""))
                  : (selected ? " selected" : "");
                return (
                  <button
                    type="button"
                    key={key}
                    className={`adaptive-mcq-option${stateClass}`}
                    role="radio"
                    aria-checked={selected}
                    disabled={submitted}
                    onClick={() => setAnswer(key)}
                  >
                    <span className="adaptive-mcq-key">({key})</span>
                    <MathText as="span" className="adaptive-mcq-option-text">{adaptiveOptionText(option)}</MathText>
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              {adaptiveQuestionUsesWorking(q) && (
                <label className="csec-adaptive-response-field">
                  Your working
                  <textarea
                    value={working}
                    onChange={e => setWorking(e.target.value)}
                    disabled={submitted}
                    placeholder="Show the steps you used"
                  />
                </label>
              )}
              <label className="csec-adaptive-response-field">
                Final answer
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  disabled={submitted}
                  placeholder="Enter your final answer"
                />
              </label>
            </>
          )}

          {!submitted ? (
            <button onClick={submit} disabled={!String(answer).trim()}>Check answer</button>
          ) : verdict === "uncertain" && !selfAssessed ? (
            <>
              <h3>Compare your answer to the worked solution</h3>
              <details open>
                <summary>Worked solution</summary>
                <MathText as="p" prose className="adaptive-solution-math">{q.worked_solution}</MathText>
              </details>
              <p>This answer format requires self-checking. Compare your answer with the worked solution, then record whether your answer is correct:</p>
              <button onClick={() => confirmSelfAssessment(true)}>My answer is correct</button>
              <button onClick={() => confirmSelfAssessment(false)}>My answer is incorrect</button>
            </>
          ) : (
            <>
              <h3>{lastCorrect ? "Correct!" : Number(gradeResult?.marks || 0) > 0 ? `Partial credit: ${gradeResult.marks}/${q.marks}` : "Not quite"}</h3>
              {gradeResult?.criteria?.length > 0 && (
                <div className="csec-adaptive-mark-breakdown">
                  <strong>Mark breakdown</strong>
                  <ul>
                    {gradeResult.criteria.map((criterion, criterionIndex) => (
                      <li key={`${criterion.code || "mark"}-${criterionIndex}`} className={criterion.awarded ? "is-earned" : "is-missed"}>
                        <span>{criterion.code || `Mark ${criterionIndex + 1}`}</span>
                        <span>{criterion.description || criterion.why || "Marking criterion"}</span>
                        <b>{criterion.marks || 0}/{criterion.of || 0}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {mcq && !lastCorrect && selectedMcqOption?.misconception?.remediation_hint && (
                <p className="adaptive-mcq-review"><strong>Review point:</strong> {selectedMcqOption.misconception.remediation_hint}</p>
              )}
              <details open>
                <summary>Worked solution</summary>
                <MathText as="p" prose className="adaptive-solution-math">{q.worked_solution}</MathText>
              </details>
              <details>
                <summary>Hints</summary>
                <ol>{q.hints?.map((h, i) => <MathText as="li" prose className="adaptive-hint-math" key={i}>{h}</MathText>)}</ol>
              </details>
              <details>
                <summary>Common mistakes</summary>
                <ul>{q.common_mistakes?.map((m, i) => <MathText as="li" prose className="adaptive-mistake-math" key={i}>{m}</MathText>)}</ul>
              </details>
              <button onClick={next}>Next question</button>
            </>
          )}

          <p>Session score: {score}</p>
        </section>
      )}
    </main>
  );
}
