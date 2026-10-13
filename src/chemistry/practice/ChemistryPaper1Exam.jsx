import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import "./chemistryPractice.css";

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
function Minutes({seconds}){return <span role="timer" aria-live="off">{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,"0")}</span>;}
export default function ChemistryPaper1Exam({onBack,supabase,userId}){
  const [source,setSource]=useState("practice-01");
  const savedAttempt=useRef(null);
  const [paper,setPaper]=useState(null),[error,setError]=useState(""),[loading,setLoading]=useState(false);
  const [answers,setAnswers]=useState({}),[active,setActive]=useState(0),[submitted,setSubmitted]=useState(false),[remaining,setRemaining]=useState(4500);
  const exam=paper?.questions||[];
  const current=exam[active];
  const isPractice=source.startsWith("practice-");
  useEffect(()=>{
    if(typeof window!=="undefined")window.scrollTo?.({top:0,left:0,behavior:"instant"});
  },[source,active,submitted]);
  useEffect(()=>{
    let cancelled=false;
    savedAttempt.current=null;
    setLoading(true);setError("");setPaper(null);setAnswers({});setSubmitted(false);setActive(0);setRemaining(4500);
    getJSON(isPractice?`practice-sets/${source}.json`:`papers/${source}.json`)
      .then(result=>{if(!cancelled)setPaper(result);})
      .catch(err=>{if(!cancelled)setError(err.message);})
      .finally(()=>{if(!cancelled)setLoading(false);});
    return()=>{cancelled=true;};
  },[source,isPractice]);
  useEffect(()=>{
    if(!paper||submitted||!exam.length||(!isPractice&&source==="2010-MJ"))return;
    const tick=setInterval(()=>setRemaining(t=>Math.max(0,t-1)),1000);
    return()=>clearInterval(tick);
  },[paper,submitted,exam.length,isPractice,source]);
  useEffect(()=>{if(remaining===0&&paper&&!submitted)setSubmitted(true);},[remaining,paper,submitted]);
  const scores=useMemo(()=>exam.reduce((n,q)=>n+Number(answers[q.id]===q.answer),0),[exam,answers]);
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
        available_questions:exam.length,complete_historical_paper:isFullPaper,
        provisional_key:true,at:new Date().toISOString()},
    }}).catch(error=>console.warn("Could not save Chemistry Paper 01 result",error));
  },[submitted,paper,exam.length,userId,supabase,source,scores]);
  const flagged=exam.filter(q=>q.flags?.length).length;
  const diagrams=paper?.diagrams||{};
  const stimuli=Object.fromEntries((paper?.stimuli||[]).map(s=>[s.id,s]));
  const image=(key)=>{const row=diagrams[key];return row?.svg?root+row.svg:null;};
  const renderFigure=(key)=>{const src=image(key);return src?<img className="chem-p1-diagram" src={src} alt={diagrams[key]?.alt||"Chemistry examination diagram"}/>:null;};
  return <main className="is-practice-shell chem-practice-shell"><div className="is-practice-home-shell">
    <div className="is-practice-top-actions"><button type="button" className="is-back-button" onClick={onBack}>← Back to Chemistry practice</button></div>
    <header className="is-practice-hero"><div><span>CSEC CHEMISTRY PAPER 01</span><h1>Multiple-choice practice</h1><p>Four choices per item, 75 minutes for a complete practice paper. Original source questions and marking should be reviewed before high-stakes use.</p></div></header>
    <section className="chem-p1-picker-card" aria-label="Choose your Chemistry Paper 1">
      <div className="chem-p1-picker-copy"><strong>Choose a paper</strong><p>Work through a full practice set or revise questions from a particular year.</p></div>
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
    {loading?<p>Loading Chemistry questions…</p>:null}
    {error?<div className="chem-p1-load-error" role="alert"><strong>Paper 1 bank unavailable</strong><p>{error}</p><button type="button" onClick={()=>setSource(current=>current==="practice-01"?"practice-02":"practice-01")}>Try another set</button></div>:null}
    {paper?<section className="chem-p1-exam">
      <div className="chem-p1-exam-bar"><strong>{exam.length} questions</strong><strong><Minutes seconds={remaining}/></strong><span>Answered {Object.keys(answers).length}/{exam.length}</span></div>
      {!isPractice&&source==="2010-MJ"?<p role="status">Only Questions 1–55 are available from the supplied 2010 paper. This is revision only, not a complete exam simulation.</p>:null}
      {flagged>0?<p role="status">{flagged} question(s) have recorded source/answer ambiguities; their keys are provisional.</p>:null}
      {submitted?<section aria-label="Paper 1 results">
        <h2>Practice review: {scores}/{exam.length} ({exam.length?Math.round(scores/exam.length*100):0}%)</h2>
        <p>These are provisional, source-supplied answer keys. Review the explanation and any flagged ambiguity before relying on your result.</p>
        {exam.map((q,i)=>{
          const selected=answers[q.id];
          const correct=q.answer;
          return <article key={q.id} className="chem-p1-review">
            <h3>Question {i+1}: {selected===correct?"Correct":selected?"Incorrect":"Not answered"}</h3>
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
        <h2>Question {active+1} of {exam.length}</h2>
        {current.stimulus&&stimuli[current.stimulus]?<div className="chem-p1-stimulus"><p>{stimuli[current.stimulus].text}</p>{(stimuli[current.stimulus].diagrams||[]).map(d=><React.Fragment key={d}>{renderFigure(d)}</React.Fragment>)}</div>:null}
        <p>{current.stem}</p>
        {current.stem_after?<p>{current.stem_after}</p>:null}
        {current.statements?<div>{Array.isArray(current.statements)?current.statements.map((line,i)=><p key={i}>{typeof line==="string"?line:JSON.stringify(line)}</p>):String(current.statements)}</div>:null}
        {current.diagrams?.map?.(d=><React.Fragment key={d}>{renderFigure(d)}</React.Fragment>)}
        <fieldset><legend>Select one answer</legend>{labels.map(letter=><label key={letter} className="chem-p1-choice"><input type="radio" name={current.id} checked={answers[current.id]===letter} onChange={()=>setAnswers(a=>({...a,[current.id]:letter}))}/><strong>{letter}.</strong> {current.options[letter]}{current.option_table?.rows?.[letter]?<span className="chem-p1-tabular-answer">{(current.option_table.columns||[]).map((heading,i)=><span key={i}><strong>{heading}: </strong>{current.option_table.rows[letter][i]}</span>)}</span>:null}{current.option_diagrams?.[letter]?renderFigure(current.option_diagrams[letter]):null}</label>)}</fieldset>
        <div className="chem-p1-actions"><button disabled={active===0} onClick={()=>setActive(v=>v-1)}>Previous</button><button disabled={active===exam.length-1} onClick={()=>setActive(v=>v+1)}>Next</button><button onClick={()=>{if(window.confirm("Submit and review your answers?"))setSubmitted(true);}}>Submit paper</button></div>
        <nav className="chem-p1-nav" aria-label="Go to question">{exam.map((q,i)=><button type="button" key={q.id} aria-label={`Question ${i+1}${answers[q.id]?" answered":""}`} aria-current={active===i?"step":undefined} onClick={()=>setActive(i)}>{i+1}</button>)}</nav>
      </section>:null}
    </section>:null}
  </div></main>;
}
