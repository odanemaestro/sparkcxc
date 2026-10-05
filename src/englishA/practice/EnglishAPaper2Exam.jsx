import React, { useEffect, useMemo, useRef, useState } from "react";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { buildAttemptProvenance } from "../../grading/attemptProvenance";
import ServerMarkingReview from "../../grading/ServerMarkingReview";
import { localExamDeadline, readServerExamClock, startServerExamAttempt, submitServerExamAttempt } from "../../grading/serverExamAttempt";
import {
  ENGLISH_A_PAPER2_DURATION_SECONDS,
  ENGLISH_A_PAPER2_MODULES,
  buildEnglishAPaper2,
  englishAPaper2Sets,
} from "../data/englishAPaper2Bank";
import { countEnglishWords, gradeEnglishAPaper2 } from "./englishAPaper2Grader";
import "../../integratedScience/practice/integratedScienceExam.css";
import "./englishAExam.css";

const storageKey = userId => `spark-english-a-paper2-${userId || "anonymous"}-v2`;

function readState(userId) {
  try { return JSON.parse(localStorage.getItem(storageKey(userId)) || "null"); }
  catch { return null; }
}

function saveState(userId,state) {
  if (!state) localStorage.removeItem(storageKey(userId));
  else localStorage.setItem(storageKey(userId),JSON.stringify(state));
}

function formatTime(totalSeconds) {
  const safe=Math.max(0,Math.floor(Number(totalSeconds)||0));
  const h=Math.floor(safe/3600),m=Math.floor((safe%3600)/60),s=safe%60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function requiredTasks(paper,choiceId) {
  return paper.tasks.filter(task => !task.choiceGroup || task.id === choiceId);
}

function Stimulus({ stimulus }) {
  if (!stimulus) return null;
  return (
    <section className="ea-p2-stimulus">
      {stimulus.title && <h3>{stimulus.title}</h3>}
      {(stimulus.paragraphs || []).map((paragraph,index) => <p key={index}>{paragraph}</p>)}
      {stimulus.situation && (
        <ul>{stimulus.situation.map((item,index) => <li key={index}>{item}</li>)}</ul>
      )}
      {stimulus.role && <p><strong>Role:</strong> {stimulus.role}</p>}
    </section>
  );
}

export default function EnglishAPaper2Exam({ supabase, userId, onBack }) {
  const initial=useMemo(() => readState(userId),[userId]);
  const [phase,setPhase]=useState(initial?.phase || "library");
  const [setId,setSetId]=useState(initial?.setId || englishAPaper2Sets[0].id);
  const [answers,setAnswers]=useState(initial?.answers || {});
  const [choiceId,setChoiceId]=useState(initial?.choiceId || "");
  const [currentIndex,setCurrentIndex]=useState(initial?.currentIndex || 0);
  const [endsAt,setEndsAt]=useState(initial?.endsAt || null);
  const [serverAttemptId,setServerAttemptId]=useState(initial?.serverAttemptId || null);
  const [startedAt,setStartedAt]=useState(initial?.startedAt || null);
  const [remaining,setRemaining]=useState(() => initial?.endsAt ? Math.max(0,Math.round((initial.endsAt-Date.now())/1000)) : ENGLISH_A_PAPER2_DURATION_SECONDS);
  const submitGuard=useRef(false);
  const latestSubmit=useRef(null);
  latestSubmit.current=submit;
  const starting=useRef(false);

  const paper=useMemo(() => buildEnglishAPaper2(setId),[setId]);
  const visibleTasks=useMemo(() => requiredTasks(paper,choiceId),[paper,choiceId]);
  const result=useMemo(() => gradeEnglishAPaper2(paper,answers,choiceId),[answers,choiceId,paper]);
  const task=visibleTasks[Math.min(currentIndex,Math.max(0,visibleTasks.length-1))] || null;

  useEffect(() => {
    window.scrollTo?.({top:0,left:0,behavior:"auto"});
  },[phase]);

  useEffect(() => {
    if (phase === "library") return;
    saveState(userId,{phase,setId,answers,choiceId,currentIndex,endsAt,serverAttemptId,startedAt});
  },[answers,choiceId,currentIndex,endsAt,phase,setId,serverAttemptId,startedAt,userId]);

  useEffect(() => {
    if (phase !== "exam" || !endsAt) return undefined;
    const tick=() => {
      const seconds=Math.max(0,Math.round((endsAt-Date.now())/1000));
      setRemaining(seconds);
      if (seconds===0 && !submitGuard.current) latestSubmit.current(true);
    };
    tick();
    const id=window.setInterval(tick,1000);
    return () => window.clearInterval(id);
  },[phase,endsAt]);

  useEffect(() => {
    if(phase!=="exam" || !serverAttemptId) return undefined;
    let cancelled=false;
    const syncClock=async()=>{
      const clock=await readServerExamClock({supabase,attemptId:serverAttemptId});
      if(cancelled || !clock?.available) return;
      const deadline=localExamDeadline(clock);
      if(deadline!==null){
        const seconds=Math.max(0,Math.round((deadline-Date.now())/1000));
        setEndsAt(deadline);
        setRemaining(seconds);
        if(clock.expired || seconds===0) latestSubmit.current(true);
      }
    };
    syncClock();
    const id=window.setInterval(syncClock,30000);
    return ()=>{cancelled=true;window.clearInterval(id);};
  },[phase,serverAttemptId,supabase]);

  function prepare(id) {
    submitGuard.current=false;
    setSetId(id);
    setAnswers({});
    setChoiceId("");
    setCurrentIndex(0);
    setEndsAt(null);
    setServerAttemptId(null);
    setStartedAt(null);
    setRemaining(ENGLISH_A_PAPER2_DURATION_SECONDS);
    setPhase("instructions");
    saveState(userId,{phase:"instructions",setId:id,answers:{},choiceId:"",currentIndex:0,endsAt:null});
    window.scrollTo?.(0,0);
  }

  async function begin() {
    if(starting.current) return;
    starting.current=true;
    submitGuard.current=false;
    const server=await startServerExamAttempt({
      supabase,subjectId:"english-a",paper:"02",mode:"timed",durationSeconds:ENGLISH_A_PAPER2_DURATION_SECONDS,
      bankVersion:"english-a-paper2-v1",rubricVersion:"CXC-01-G-SYLL-25",graderVersion:"english-a-rubric-v2",
      metadata:{paper_id:paper.id,selected_creative_prompt:choiceId || null},
    });
    const serverDeadline=server?.available ? localExamDeadline(server) : null;
    const finish=Number.isFinite(serverDeadline) ? serverDeadline : Date.now()+ENGLISH_A_PAPER2_DURATION_SECONDS*1000;
    setEndsAt(finish);
    setRemaining(ENGLISH_A_PAPER2_DURATION_SECONDS);
    setServerAttemptId(server?.available ? server.attempt_id : null);
    setStartedAt(server?.available ? server.started_at : new Date(finish-ENGLISH_A_PAPER2_DURATION_SECONDS*1000).toISOString());
    setPhase("exam");
    starting.current=false;
    window.scrollTo?.(0,0);
  }

  function updateAnswer(key,value) {
    if (submitGuard.current || phase !== "exam") return;
    if (endsAt && Date.now() >= Number(endsAt)) {
      submit(true);
      return;
    }
    setAnswers(current => ({...current,[key]:value}));
  }

  async function submit(timedOut=false) {
    if (submitGuard.current) return;
    submitGuard.current=true;
    setPhase("review");
    const completedAt=new Date().toISOString();
    const responses=requiredTasks(paper,choiceId);
    try {
      if(serverAttemptId){
        await submitServerExamAttempt({
          supabase,attemptId:serverAttemptId,responses:answers,score:result.score,maxScore:result.maxScore,
            metadata:{subject:"english-a",paper:"02",paper_id:paper.id,selected_creative_prompt:choiceId || null,client_timed_out:Boolean(timedOut)},
        });
      }
      await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:"english-a",
          activityKey:`exam:english-a-paper2:${paper.id}`,
          activityType:"exam",
          title:`English A Paper 02 - ${paper.title}`,
          completed:true,
          score:result.score,
          maxScore:result.maxScore,
          percent:result.percent,
          metadata:{
            source:"english_a_paper2_simulator_v1",
            syllabus:"CXC 01/G/SYLL 25",
            paper:"02",
            paper_id:paper.id,
            timed_out:Boolean(timedOut),
            submitted_at:completedAt,
            response_word_counts:Object.fromEntries(responses.map(item => [item.id,countEnglishWords(answers[item.id])])),
            selected_creative_prompt:choiceId || null,
            provisional_grading:true,
            module_scores:result.modules,
            attempt_provenance:buildAttemptProvenance({
              subjectId:"english-a",paper:"02",mode:"timed",bankVersion:"english-a-paper2-v1",
              rubricVersion:"CXC-01-G-SYLL-25",graderVersion:"english-a-rubric-v2",
              startedAt:startedAt || (endsAt ? new Date(Number(endsAt)-ENGLISH_A_PAPER2_DURATION_SECONDS*1000).toISOString() : null),
              submittedAt:completedAt,responses:answers,
            }),
          },
        },
      });
    } catch (error) {
      console.warn("Could not save English A Paper 02 completion",error);
    }
    window.scrollTo?.(0,0);
  }

  function reset() {
    saveState(userId,null);
    submitGuard.current=false;
    setPhase("library");
    setAnswers({});
    setChoiceId("");
    setCurrentIndex(0);
    setEndsAt(null);
    setServerAttemptId(null);
    setStartedAt(null);
    setRemaining(ENGLISH_A_PAPER2_DURATION_SECONDS);
    window.scrollTo?.({top:0,left:0,behavior:"auto"});
  }

  if (phase==="library") {
    return (
      <main className="ea-practice-shell">
        <div className="ea-practice-home">
          <header className="ea-practice-hero">
            <div>
              <span className="ea-practice-eyebrow">CSEC ENGLISH A PAPER 02</span>
              <h1>Paper 2 Simulator</h1>
              <p>Choose a full original SPARK paper built to the revised three-module structure. Each paper carries 120 marks and allows 2 hours 45 minutes.</p>
            </div>
            <button type="button" className="ea-practice-back" onClick={onBack}>← English A practice</button>
          </header>
          <div className="ea-p2-paper-grid">
            {englishAPaper2Sets.map(set => (
              <article className="ea-practice-card" key={set.id}>
                <span className="ea-practice-eyebrow">FULL PRACTICE PAPER</span>
                <h2>{set.title}</h2>
                <p>{set.description}</p>
                <div className="ea-practice-specs">
                  <span>3 modules</span><span>120 marks</span><span>165 minutes</span><span>6 responses</span>
                </div>
                <button type="button" className="ea-practice-primary" onClick={() => prepare(set.id)}>Prepare {set.title}</button>
              </article>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (phase==="instructions") {
    return (
      <main className="is-exam-root"><div className="is-exam-shell">
        <button type="button" className="is-exam-primary is-exam-page-back" onClick={() => setPhase("library")}>← Back to Paper 2 library</button>
        <section className="is-exam-instructions-card">
          <span className="is-exam-eyebrow">CSEC ENGLISH A · PAPER 02</span>
          <h1>{paper.title}</h1>
          <p className="is-exam-instructions-sub">Original SPARK practice mapped to CXC 01/G/SYLL 25.</p>
          <div className="is-exam-instructions-meta">
            <div><span>Time</span><strong>2 h 45 min</strong></div>
            <div><span>Marks</span><strong>120</strong></div>
            <div><span>Modules</span><strong>3</strong></div>
            <div><span>Responses</span><strong>6</strong></div>
          </div>
          <div className="is-exam-instructions-sheet">
            <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
            <ol>
              <li>Complete two questions from each module.</li>
              <li>Each 10-mark summary question has TWO parts: a 3-mark analysis response and a 7-mark summary response. The summary is limited to 50 words and should use THREE points in your own words as far as possible.</li>
              <li>Module 1 also contains a compulsory 30-mark informative exposition.</li>
              <li>Module 2 also requires ONE 30-mark short story chosen from two prompts.</li>
              <li>Module 3 also contains a compulsory 30-mark persuasive response.</li>
              <li>Write in Standard English. Where a creative task permits dialogue, dialect may be used naturally.</li>
              <li>Your responses are saved while you work. After submission, SPARK produces a detailed CXC-style practice estimate and explains the evidence behind each scoring dimension.</li>
            </ol>
          </div>
          <section className="ea-p2-instruction-choice">
            <strong>Choose your Module 2 short-story question</strong>
            <p>You will answer ONE of the two creative-writing prompts. You may read both before choosing.</p>
            <div>
              {paper.tasks.filter(item => item.choiceGroup === "M2-creative").map(item => (
                <button
                  type="button"
                  key={item.id}
                  className={choiceId === item.id ? "selected" : ""}
                  onClick={() => setChoiceId(item.id)}
                >
                  <span>{item.title}</span>
                  <small>{item.instructions}</small>
                </button>
              ))}
            </div>
          </section>
          <div className="is-exam-instructions-actions"><button type="button" className="is-exam-primary" disabled={!choiceId} onClick={begin}>Start examination</button></div>
        </section>
      </div></main>
    );
  }

  if (phase==="review") {
    const completed=requiredTasks(paper,choiceId);
    return (
      <main className="ea-practice-shell"><div className="ea-practice-home">
        <header className="ea-practice-hero"><div><span className="ea-practice-eyebrow">PAPER 02 REVIEW</span><h1>{paper.title}</h1><p>SPARK gives a detailed practice estimate using task fulfilment, stimulus coverage, organisation, register, language and mechanics. Extended-writing marks are automated practice estimates and may differ from official examination marking.</p></div><button className="ea-practice-back" type="button" onClick={onBack}>← English A practice</button></header>

        <section className="ea-p2-score-summary">
          <div><span>Estimated score</span><strong>{result.score}/{result.maxScore}</strong></div>
          <div><span>Estimated percentage</span><strong>{result.percent}%</strong></div>
          {result.modules.map(row => <div key={row.module}><span>Module {row.module}</span><strong>{row.score}/{row.max}</strong></div>)}
        </section>

        <section className="ea-p2-grading-note">
          <strong>How this mark was produced</strong>
          <p>{result.note}</p>
        </section>
        <ServerMarkingReview supabase={supabase} attemptId={serverAttemptId}/>

        {completed.map(item => {
          const row=result.rows.find(entry => entry.task.id===item.id);
          return (
            <section className="ea-p2-review-card" key={item.id}>
              <div className="ea-p2-review-head"><div><span>Module {item.module}: {ENGLISH_A_PAPER2_MODULES[item.module]}</span><h2>{item.title}</h2></div><strong>{row?.score ?? 0}/{row?.maxMarks ?? item.rubric?.marks ?? 0}</strong></div>
              <p className="ea-p2-review-prompt">{item.instructions}</p>
              {item.kind === "summary" ? (
                <>
                  <div className="ea-p2-review-response"><strong>Part (a) · 3 marks</strong><p>{answers[`${item.id}:analysis`] || "No response submitted."}</p></div>
                  <div className="ea-p2-review-response"><strong>Part (b) summary · {countEnglishWords(answers[item.id])}/50 words</strong><p>{answers[item.id] || "No response submitted."}</p></div>
                </>
              ) : (
                <div className="ea-p2-review-response"><strong>Your response · {countEnglishWords(answers[item.id])} words</strong><p>{answers[item.id] || "No response submitted."}</p></div>
              )}

              {row?.dimensions?.length > 0 && (
                <div className="ea-p2-dimension-grid">
                  {row.dimensions.map(dimension => (
                    <div key={dimension.id}>
                      <span>{dimension.label}</span>
                      <strong>{dimension.score}/{dimension.max}</strong>
                      {Array.isArray(dimension.evidence) && dimension.evidence.length > 0 && (
                        <small>{dimension.evidence.map(entry => typeof entry === "string" ? entry : entry?.covered ? entry.line : "").filter(Boolean).slice(0,3).join(" · ")}</small>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {row?.feedback?.length > 0 && (
                <div className="ea-p2-feedback">
                  <strong>Examiner-style feedback</strong>
                  <ul>{row.feedback.map((note,index) => <li key={index}>{note}</li>)}</ul>
                </div>
              )}

              <div className="ea-p2-rubric"><strong>Task rubric</strong><ul>{(item.rubric?.criteria || []).map((criterion,index) => <li key={index}>{criterion}</li>)}</ul></div>
            </section>
          );
        })}
        <div className="ea-p2-review-actions"><button className="ea-practice-primary" type="button" onClick={reset}>Start another Paper 2</button></div>
      </div></main>
    );
  }

  const moduleLabel=task ? `Module ${task.module}: ${ENGLISH_A_PAPER2_MODULES[task.module]}` : "";
  const wordCount=countEnglishWords(answers[task?.id]);
  const answeredCount=requiredTasks(paper,choiceId).filter(item =>
    String(answers[item.id]||"").trim() ||
    (item.kind === "summary" && String(answers[`${item.id}:analysis`]||"").trim())
  ).length;

  return (
    <main className="is-exam-root"><div className="is-exam-shell is-exam-paper-shell">
      <header className="is-exam-head">
        <div><button type="button" className="is-exam-primary is-exam-back" onClick={onBack}>Exit</button><span className="is-exam-eyebrow">CSEC ENGLISH A · PAPER 02</span><h1>{paper.title}</h1><p>{answeredCount}/6 required responses started</p></div>
        <div className="is-exam-timer"><span>Time remaining</span><strong>{formatTime(remaining)}</strong></div>
      </header>

      {task && (
        <article className="ea-p2-task-card">
          <div className="ea-p2-task-head"><div><span className="ea-practice-eyebrow">{moduleLabel}</span><h2>{task.title}</h2></div><strong>{task.rubric?.marks || 0} marks</strong></div>
          {task.kind !== "summary" && <p className="ea-p2-task-instructions">{task.instructions}</p>}
          {task.kind === "summary" && <p className="ea-p2-task-instructions">Read the extract carefully, then answer BOTH parts.</p>}
          <Stimulus stimulus={task.stimulus} />
          {task.kind === "summary" ? (
            <>
              <div className="ea-p2-response-head"><span>Part (a) · 3 marks</span><strong>Analysis</strong></div>
              <p className="ea-p2-part-prompt">{task.analysisPrompt}</p>
              <textarea
                className="ea-p2-short-response"
                value={answers[`${task.id}:analysis`] || ""}
                onChange={event => updateAnswer(`${task.id}:analysis`,event.target.value)}
                placeholder="Write your Part (a) response here..."
                aria-label={`Part a response for ${task.title}`}
              />

              <div className="ea-p2-response-head"><span>Part (b) · 7 marks</span><strong>{wordCount}/50 words</strong></div>
              <p className="ea-p2-part-prompt">{task.summaryPrompt}</p>
              <textarea
                value={answers[task.id] || ""}
                onChange={event => updateAnswer(task.id,event.target.value)}
                placeholder="Write your 50-word summary here..."
                aria-label={`Summary response for ${task.title}`}
              />
              {wordCount > 50 && <div className="ea-p2-word-warning">This summary is {wordCount - 50} word{wordCount - 50 === 1 ? "" : "s"} over the 50-word limit.</div>}
            </>
          ) : (
            <>
              <div className="ea-p2-response-head"><span>Your response</span><strong>{wordCount} words</strong></div>
              <textarea
                value={answers[task.id] || ""}
                onChange={event => updateAnswer(task.id,event.target.value)}
                placeholder="Write your response here..."
                aria-label={`Response for ${task.title}`}
              />
              {task.wordRange && wordCount > 0 && (wordCount < task.wordRange[0] || wordCount > task.wordRange[1]) && <div className="ea-p2-word-note">Suggested length: {task.wordRange[0]}-{task.wordRange[1]} words.</div>}
            </>
          )}
        </article>
      )}

      <footer className="ea-p2-nav">
        <button type="button" className="ea-practice-back" disabled={currentIndex===0} onClick={() => {setCurrentIndex(i=>Math.max(0,i-1));window.scrollTo?.(0,0);}}>← Previous</button>
        <span>Response {currentIndex+1} of {visibleTasks.length}</span>
        {currentIndex < visibleTasks.length-1
          ? <button type="button" className="ea-practice-primary" onClick={() => {setCurrentIndex(i=>Math.min(visibleTasks.length-1,i+1));window.scrollTo?.(0,0);}}>Next →</button>
          : <button type="button" className="ea-practice-primary" disabled={!choiceId} onClick={() => submit(false)}>Submit Paper 2</button>}
      </footer>
    </div></main>
  );
}
