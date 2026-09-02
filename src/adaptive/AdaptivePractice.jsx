// ============================================================================
// Adaptive CSEC Mathematics practice screen
// Done by: Odane Robinson
//
// QA fix: this used to grade every short-answer question with an EXACT
// string match after trim/lowercase, so a mathematically correct but
// differently-formatted response ("0.75" for "3/4", "5" for "x = 5", a set
// in a different order, etc.) was marked wrong. It now uses checkAnswer()
// (src/lib/answerCheck.js), a small equivalence checker that understands
// fractions, decimals, currency, degrees, sets, coordinate/vector tuples,
// and multi-root answers.
//
// For anything checkAnswer() can't confidently parse either way (free-text
// explanations, geometric constructions, full written proofs), rather than
// guess it returns "uncertain" - and instead of forcing an automatic
// verdict the UI shows the worked solution and asks the student to
// self-assess ("Did you get this right?"), which is more honest than a
// fragile string comparison for that kind of answer anyway.
// ============================================================================
import React, { useEffect, useState } from "react";
import { loadQuestionManifest, loadQuestionSet } from "./questionBank";
import { buildAdaptiveSession, skillMastery } from "./adaptiveEngine";
import { fetchAttempts, upsertSkillProgress } from "./persistence";
import { checkAnswer } from "../lib/answerCheck";
import ReportQuestionButton from "../components/ui/ReportQuestionButton";
import "./adaptive.css";

export default function AdaptivePractice({ supabase, userId, setView, backLabel = "← Back to Study" }) {
  const [manifest, setManifest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [verdict, setVerdict] = useState(null); // "correct" | "incorrect" | "uncertain" | null
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
    setQuestions(usable);

    const combinedAttempts = [...savedAttempts, ...attempts];
    const stats = {};
    qs.forEach(q => {
      const a = combinedAttempts.filter(x => x.skill === q.subtopic);
      stats[q.subtopic] = skillMastery(a);
    });

    setSession(buildAdaptiveSession(usable, stats, { count: 10 }));
    setIndex(0);
    setAnswer("");
    setSubmitted(false);
    setVerdict(null);
    setSelfAssessed(false);
    setScore(0);
  }

  const q = session[index];

  async function submit() {
    if (!q || submitted) return;

    const result = checkAnswer(answer, q.answer);
    // "uncertain" starts out ungraded - the student self-assesses against
    // the worked solution (see confirmSelfAssessment below) instead of us
    // asserting a verdict a plain comparison can't actually back up.
    const correct = result === "correct";
    const marks = Number(q.marks || 1);
    const earned = correct ? marks : 0;

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
    setVerdict(result);
    setLastCorrect(correct);

    if (result === "uncertain") {
      // Don't record or save anything yet - wait for the student's own
      // self-assessment (confirmSelfAssessment), since we don't actually
      // know whether this attempt was correct.
      return;
    }

    await finalizeAttempt(attempt);
  }

  // Called when the student self-assesses an "uncertain" answer (one
  // checkAnswer() couldn't confidently parse) against the worked solution.
  async function confirmSelfAssessment(wasCorrect) {
    if (!q) return;
    const marks = Number(q.marks || 1);
    const earned = wasCorrect ? marks : 0;
    setLastCorrect(wasCorrect);
    setSelfAssessed(true);
    await finalizeAttempt({
      questionId: q.id,
      skill: q.subtopic,
      correct: wasCorrect,
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
      setAnswer("");
      setSubmitted(false);
      setVerdict(null);
      setSelfAssessed(false);
    } else {
      await recordCompletedSession();
      await start();
    }
  }

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
          <h2>{q.question}</h2>
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

          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Enter your answer"
          />

          {!submitted ? (
            <button onClick={submit}>Check answer</button>
          ) : verdict === "uncertain" && !selfAssessed ? (
            <>
              <h3>Compare your answer to the worked solution</h3>
              <details open>
                <summary>Worked solution</summary>
                <p>{q.worked_solution}</p>
              </details>
              <p>This answer format requires self-checking. Compare your answer with the worked solution, then record whether your answer is correct:</p>
              <button onClick={() => confirmSelfAssessment(true)}>My answer is correct</button>
              <button onClick={() => confirmSelfAssessment(false)}>My answer is incorrect</button>
            </>
          ) : (
            <>
              <h3>{verdict === "uncertain" ? (lastCorrect ? "Marked correct" : "Marked incorrect") : (lastCorrect ? "Correct!" : "Not quite")}</h3>
              <details open>
                <summary>Worked solution</summary>
                <p>{q.worked_solution}</p>
              </details>
              <details>
                <summary>Hints</summary>
                <ol>{q.hints?.map((h, i) => <li key={i}>{h}</li>)}</ol>
              </details>
              <details>
                <summary>Common mistakes</summary>
                <ul>{q.common_mistakes?.map((m, i) => <li key={i}>{m}</li>)}</ul>
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
