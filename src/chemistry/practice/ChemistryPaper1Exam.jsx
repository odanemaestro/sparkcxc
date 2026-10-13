import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import "./chemistryPractice.css";
import "../../integratedScience/practice/integratedScienceExam.css";

const SOURCES=["2009-MJ","2010-MJ","2016-MJ","2017-MJ","2018-JAN","2018-MJ","2019-MJ","2020-JAN","2021-MJ","2023-MJ"];
const root=`${typeof window!=="undefined" && window.location.pathname.startsWith("/sparkcxc")?"/sparkcxc/":"/"}chemistry-paper1/`;
const getJSON=async path=>{
  const response=await fetch(root+path,{cache:"no-store"});
  const mime=response.headers?.get?.("content-type") || "";
  if(!response.ok || !mime.includes("json")){
    throw new Error("Chemistry Paper 1 questions are not installed yet. Import the reviewed question-bank ZIP into SPARK's public/chemistry-paper1 folder using tools/import-chemistry-paper1.py, then reload this page.");
  }
  try{
    const data=await response.json();
    if(!Array.isArray(data?.questions) || !data.questions.length)throw new Error("Empty question set");
    return data;
  }catch{
    throw new Error("Chemistry Paper 1 data could not be read. Reinstall the reviewed JSON question bank and reload the page.");
  }
};
const labels=["A","B","C","D"];
const EXAM_SECONDS=75*60;
const paperSessionKey=(userId,source)=>`spark:chemistry:paper1:${userId||"guest"}:${source}`;
const scrollTop=()=>window.scrollTo?.({top:0,left:0,behavior:"instant"});
function Minutes({seconds}){const left=Math.max(0,Number(seconds)||0);return <span role="timer" aria-live="off">{[Math.floor(left/3600),Math.floor((left%3600)/60),left%60].map(n=>String(n).padStart(2,"0")).join(":")}</span>;}
export default function ChemistryPaper1Exam({onBack,supabase,userId}){
  const [source,setSource]=useState("practice-01");
  const savedAttempt=useRef(null);
  const [paper,setPaper]=useState(null),[error,setError]=useState(""),[loading,setLoading]=useState(false);
  const [answers,setAnswers]=useState({});
  const [active,setActive]=useState(0);
  const [phase,setPhase]=useState("instructions");
  const [flaggedItems,setFlaggedItems]=useState({});
  const [endsAt,setEndsAt]=useState(null);
  const [remaining,setRemaining]=useState(EXAM_SECONDS);
  const submitted=phase==="review";
  const exam=paper?.questions||[];
  const current=exam[active];
  const isPractice=source.startsWith("practice-");
  useEffect(()=>{
    if(typeof window!=="undefined")window.scrollTo?.({top:0,left:0,behavior:"instant"});
  },[source,active,phase]);
  useEffect(()=>{
    let cancelled=false;
    savedAttempt.current=null;
    setLoading(true);setError("");setPaper(null);setAnswers({});setPhase("instructions");setFlaggedItems({});setActive(0);setEndsAt(null);setRemaining(EXAM_SECONDS);
    getJSON(isPractice?`practice-sets/${source}.json`:`papers/${source}.json`)
      .then(result=>{
        if(cancelled)return;
        setPaper(result);
        try{
          const saved=JSON.parse(localStorage.getItem(paperSessionKey(userId,source))||"null");
          if(saved&&saved.paperId===(result.paper_id||source)&&["exam","review"].includes(saved.phase)){
            setAnswers(saved.answers||{});
            setFlaggedItems(saved.flags||{});
            setActive(Math.min(result.questions.length-1,Math.max(0,Number(saved.active)||0)));
            setEndsAt(saved.endsAt||null);
            setRemaining(saved.phase==="review"?0:Math.max(0,Math.ceil((Number(saved.endsAt)-Date.now())/1000)));
            setPhase(saved.phase==="exam"&&(!saved.endsAt||saved.endsAt<=Date.now())?"review":saved.phase);
          }
        }catch{}
      })
      .catch(err=>{if(!cancelled)setError(err.message);})
      .finally(()=>{if(!cancelled)setLoading(false);});
    return()=>{cancelled=true;};
  },[source,isPractice,userId]);
  useEffect(()=>{
    if(!paper||!exam.length||!endsAt||phase!=="exam")return undefined;
    const tick=()=>{
      const left=Math.max(0,Math.ceil((endsAt-Date.now())/1000));
      setRemaining(left);
      if(left===0){setPhase("review");scrollTop();}
    };
    tick();
    const id=setInterval(tick,1000);
    return()=>clearInterval(id);
  },[paper,exam.length,endsAt,phase]);
  useEffect(()=>{
    if(!paper||!exam.length||loading)return;
    try{
      localStorage.setItem(paperSessionKey(userId,source),JSON.stringify({
        paperId:paper.paper_id||source,phase,answers,flags:flaggedItems,active,endsAt
      }));
    }catch{}
  },[paper,loading,userId,source,phase,answers,flaggedItems,active,endsAt,exam.length]);
  function beginExam(){
    const deadline=Date.now()+EXAM_SECONDS*1000;
    setAnswers({});setFlaggedItems({});setActive(0);
    setEndsAt(deadline);setRemaining(EXAM_SECONDS);
    setPhase("exam");scrollTop();
  }
  function submitExam(){
    if(phase!=="exam")return;
    if(!window.confirm("Submit this paper? You will no longer be able to change your answers."))return;
    setPhase("review");scrollTop();
  }
  function selectAnother(){
    try{localStorage.removeItem(paperSessionKey(userId,source));}catch{}
    setAnswers({});setFlaggedItems({});setEndsAt(null);
    setActive(0);setRemaining(EXAM_SECONDS);setPhase("instructions");scrollTop();
  }
  const scores=useMemo(()=>exam.reduce((n,q)=>n+Number(Boolean(answers[q.id])&&answers[q.id]===q.answer),0),[exam,answers]);
  // Use the same canonical subject progress and recommendation-outcome pipeline as Paper 02.
  useEffect(()=>{
    if(!submitted||!paper||!exam.length||!userId||!supabase?.rpc)return;
    const attemptKey=`${userId}:${source}:${paper.paper_id||source}`;
    if(savedAttempt.current===attemptKey)return;
    savedAttempt.current=attemptKey;
    const isFullPaper=exam.length===60;
    recordSubjectActivity({supabase,activity:{
      subjectId:"chemistry",
      activityKey:`${isFullPaper?"exam":"practice"}:chemistry-paper1:${source}`,
      activityType:isFullPaper?"exam":"practice",
      title:`Chemistry Paper 01 · ${source}`,
      completed:true,
      score:scores,maxScore:exam.length,percent:Math.round(100*scores/exam.length),
      metadata:{source:"chemistry_paper1_v1",paper:"01",paper_id:source,
        available_questions:exam.length,complete_historical_paper:!isPractice&&isFullPaper,
        provisional_key:true,at:new Date().toISOString()},
    }}).catch(error=>console.warn("Could not save Chemistry Paper 01 result",error));
  },[submitted,paper,exam.length,userId,supabase,source,scores]);
  const flagged=exam.filter(q=>q.flags?.length).length;
  const diagrams=paper?.diagrams||{};
  const stimuli=Object.fromEntries((paper?.stimuli||[]).map(s=>[s.id,s]));
  const image=(key)=>{const row=diagrams[key];return row?.svg?root+row.svg:null;};
  const renderFigure=(key)=>{const src=image(key);return src?<img className="chem-p1-diagram" src={src} alt={diagrams[key]?.alt||"Chemistry examination diagram"}/>:null;};
  const isPartial=!isPractice&&exam.length!==60;
  const paperLabel=isPractice?`Practice set ${Number(source.split("-").pop())}`:source.replace("-JAN"," January").replace("-MJ"," May/June");
  if(phase==="instructions"||!paper)return <main className="is-practice-shell chem-practice-shell chem-p1-intro">
    <div className="is-practice-home-shell">
      <div className="is-practice-top-actions"><button type="button" className="is-back-button" onClick={onBack}>← Back to Chemistry practice</button></div>
      <header className="is-practice-hero"><div><span>CSEC CHEMISTRY PAPER 01</span><h1>Choose your examination</h1><p>Select a practice paper or a historical paper, read the instructions and start when you are ready.</p></div></header>
      <section className="chem-p1-picker-card" aria-label="Choose your Chemistry Paper 1">
        <div className="chem-p1-picker-copy"><strong>Choose a paper</strong><p>Your timer starts only when you select Start examination.</p></div>
        <div className="chem-p1-picker-controls">
          <div className="chem-p1-mode-tabs" role="group" aria-label="Paper type">
            <button type="button" className={isPractice?"active":""} aria-pressed={isPractice} onClick={()=>setSource("practice-01")}>Practice sets</button>
            <button type="button" className={!isPractice?"active":""} aria-pressed={!isPractice} onClick={()=>setSource("2009-MJ")}>Past papers</button>
          </div>
          <label htmlFor="chem-p1-source">Paper</label>
          <select id="chem-p1-source" aria-label="Choose Chemistry Paper 1 set" value={source} onChange={e=>setSource(e.target.value)}>
            {isPractice?[1,2,3,4].map(n=><option key={n} value={`practice-0${n}`}>Practice set {n} · 60 questions</option>):SOURCES.map(id=><option key={id} value={id}>{id.replace("-"," ")}{id==="2010-MJ"?" · 55 questions only":""}</option>)}
          </select>
        </div>
      </section>
      {loading&&<p role="status">Loading Chemistry Paper 1 questions…</p>}
      {error&&<div className="chem-p1-load-error" role="alert"><strong>Paper 1 bank unavailable</strong><p>{error}</p><button type="button" onClick={()=>setSource(current=>current==="practice-01"?"practice-02":"practice-01")}>Try another set</button></div>}
      {paper&&<section className="is-exam-instructions-card chem-p1-instructions">
        <span className="is-exam-eyebrow">CSEC CHEMISTRY · PAPER 01</span>
        <h1>{paperLabel}</h1>
        <p className="is-exam-instructions-sub">Multiple-choice examination. Read the instructions before you begin.</p>
        <div className="is-exam-instructions-rule"/>
        <div className="is-exam-instructions-meta">
          <div><span>Time</span><strong>1 h 15 min</strong></div>
          <div><span>Questions</span><strong>{exam.length}</strong></div>
          <div><span>Marks</span><strong>{exam.length}</strong></div>
          <div><span>Question type</span><strong>Multiple choice</strong></div>
        </div>
        {isPartial&&<p className="chem-p1-partial-note" role="status">Only {exam.length} questions are available from this historical paper. This is a timed revision session, not a complete 60-question examination.</p>}
        <div className="is-exam-instructions-sheet">
          <h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2>
          <ol>
            <li>This paper contains {exam.length} multiple-choice questions. You have 1 hour and 15 minutes to complete the paper.</li>
            <li>Each question has four options labelled A, B, C and D. Choose the best answer.</li>
            <li>Each correct response earns one mark. No marks are deducted for incorrect answers.</li>
            <li>Use Next, Previous, or the question navigator to move between questions.</li>
            <li>You may change an answer before submitting. You can flag questions to return to later.</li>
            <li>Your responses are saved on this device while you work. Your paper submits automatically when time expires.</li>
          </ol>
        </div>
        <div className="is-exam-instructions-note"><strong>After submission</strong><span>View your score, selected answers, correct answers and explanations for each question.</span></div>
        <div className="is-exam-instructions-actions"><button type="button" className="is-exam-primary" onClick={beginExam}>Start examination</button></div>
      </section>}
    </div>
  </main>;
  return <main className="is-practice-shell chem-practice-shell chem-p1-session"><div className="is-practice-home-shell">
    <header className="chem-p1-exam-header">
      <div><button type="button" className="is-back-button" onClick={()=>{if(submitted||window.confirm("Exit this examination? Your current attempt will be cleared."))selectAnother();}}>← {submitted?"Choose another paper":"Exit examination"}</button>
        <span>CSEC CHEMISTRY · PAPER 01</span><h1>{paperLabel}</h1><p>{submitted?"Answer review":`Question ${active+1} of ${exam.length}`}</p>
      </div>
      <div className="chem-p1-exam-timer"><span>{submitted?"Submitted":"Time remaining"}</span><strong>{submitted?"REVIEW":<Minutes seconds={remaining}/>}</strong></div>
    </header>
    {paper?<section className="chem-p1-exam">
      <div className="chem-p1-exam-bar"><strong>{exam.length} questions</strong><span>Answered {Object.keys(answers).length}/{exam.length}</span><span>Flagged {Object.values(flaggedItems).filter(Boolean).length}</span></div>
      {!isPractice&&source==="2010-MJ"?<p role="status">Only 55 questions are available from this historical paper. This is a partial-paper simulation.</p>:null}
      {flagged>0?<p role="status">{flagged} question(s) have recorded source/answer ambiguities; their keys are provisional.</p>:null}
      {submitted?<section aria-label="Paper 1 results">
        <h2>Practice review: {scores}/{exam.length} ({exam.length?Math.round(scores/exam.length*100):0}%)</h2>
        <p>Compare your answers with the correct choices and explanations below.</p>
        <button type="button" className="chem-p1-try-again" onClick={selectAnother}>Choose another paper or try again</button>
        {exam.map((q,i)=>{
          const selected=answers[q.id];
          const correct=q.answer;
          return <article key={q.id} className="chem-p1-review">
            <h3>Question {i+1}: {selected&&selected===correct?"Correct":selected?"Incorrect":"Not answered"}</h3>
            {q.stimulus&&stimuli[q.stimulus]?<div className="chem-p1-stimulus"><p>{stimuli[q.stimulus].text}</p>{(stimuli[q.stimulus].diagrams||[]).map(d=><React.Fragment key={d}>{renderFigure(d)}</React.Fragment>)}</div>:null}
            <p>{q.stem}</p>{q.stem_after&&<p>{q.stem_after}</p>}
            {(q.diagrams||[]).map(d=><React.Fragment key={d}>{renderFigure(d)}</React.Fragment>)}
            <div className="chem-p1-review-answer-grid">
              <div><strong>Your answer</strong><p>{selected?`${selected}. ${q.options?.[selected]||""}`:"Not answered"}</p>{selected&&q.option_diagrams?.[selected]?renderFigure(q.option_diagrams[selected]):null}</div>
              <div><strong>Correct answer</strong><p>{correct&&q.options?.[correct]?`${correct}. ${q.options[correct]}`:"Answer key awaiting verification"}</p>{correct&&q.option_diagrams?.[correct]?renderFigure(q.option_diagrams[correct]):null}</div>
            </div>
            {q.explanation&&<div className="chem-p1-review-explanation"><strong>Explanation</strong><p>{q.explanation}</p></div>}
            {q.flags?.length?<p>Source accuracy note: {q.flags.join(" ")}</p>:null}
          </article>;
        })}
      </section>:current?<section className="chem-p1-question">
        <div className="chem-p1-question-heading"><h2>Question {active+1} of {exam.length}</h2><button type="button" className="chem-p1-flag" aria-pressed={Boolean(flaggedItems[current.id])} onClick={()=>setFlaggedItems(prev=>({...prev,[current.id]:!prev[current.id]}))}>{flaggedItems[current.id]?"Flagged":"Flag for review"}</button></div>
        {current.stimulus&&stimuli[current.stimulus]?<div className="chem-p1-stimulus"><p>{stimuli[current.stimulus].text}</p>{(stimuli[current.stimulus].diagrams||[]).map(d=><React.Fragment key={d}>{renderFigure(d)}</React.Fragment>)}</div>:null}
        <p>{current.stem}</p>
        {current.stem_after?<p>{current.stem_after}</p>:null}
        {current.statements?<div>{Array.isArray(current.statements)?current.statements.map((line,i)=><p key={i}>{typeof line==="string"?line:JSON.stringify(line)}</p>):String(current.statements)}</div>:null}
        {current.diagrams?.map?.(d=><React.Fragment key={d}>{renderFigure(d)}</React.Fragment>)}
        <fieldset><legend>Select one answer</legend>{labels.map(letter=><label key={letter} className="chem-p1-choice"><input type="radio" name={current.id} checked={answers[current.id]===letter} onChange={()=>setAnswers(a=>({...a,[current.id]:letter}))}/><strong>{letter}.</strong> {current.options[letter]}{current.option_table?.rows?.[letter]?<span className="chem-p1-tabular-answer">{(current.option_table.columns||[]).map((heading,i)=><span key={i}><strong>{heading}: </strong>{current.option_table.rows[letter][i]}</span>)}</span>:null}{current.option_diagrams?.[letter]?renderFigure(current.option_diagrams[letter]):null}</label>)}</fieldset>
        <div className="chem-p1-actions"><button disabled={active===0} onClick={()=>setActive(v=>v-1)}>Previous</button><button disabled={active===exam.length-1} onClick={()=>setActive(v=>v+1)}>Next</button><button onClick={submitExam}>Submit paper</button></div>
        <nav className="chem-p1-nav" aria-label="Go to question">{exam.map((q,i)=><button type="button" key={q.id} aria-label={`Question ${i+1}${answers[q.id]?" answered":""}${flaggedItems[q.id]?" flagged":""}`} className={`${answers[q.id]?"answered":""} ${flaggedItems[q.id]?"flagged":""}`} aria-current={active===i?"step":undefined} onClick={()=>setActive(i)}>{i+1}</button>)}</nav>
      </section>:null}
    </section>:null}
  </div></main>;
}
