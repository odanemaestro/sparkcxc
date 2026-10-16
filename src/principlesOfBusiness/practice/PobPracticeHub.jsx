import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {buildPobPaper1} from "../data/pobPaper1Original";
import {POB_PAPER2_ORIGINAL_01} from "../data/pobPaper2Original";
import {checkPobCalculation} from "../data/pobCalculationFeedback";
import {restorePobAttempt,pobRemainingSeconds} from "../data/pobAttemptRecovery";
import {getPobP2FeedbackGuide} from "../data/pobPaper2FeedbackGuides";
import PobSbaWorkspace from "./PobSbaWorkspace";
import "./pobPractice.css";

const SUBJECT="principles-of-business";
const LETTERS="ABCD";
const clock=seconds=>[Math.floor(seconds/3600),Math.floor((seconds%3600)/60),seconds%60]
  .map(n=>String(Math.max(0,n)).padStart(2,"0")).join(":");
const safeRead=key=>{try{return JSON.parse(window.localStorage.getItem(key)||"null")}catch{return null}};
const safeWrite=(key,value)=>{try{window.localStorage.setItem(key,JSON.stringify(value))}catch{}};
const startState=paperId=>({paperId,attemptId:String(Date.now())+"-"+Math.random().toString(36).slice(2),
  phase:"instructions",index:0,answers:{},flags:{},deadline:null,submittedAt:null,reason:null});
const storage=(user,paper)=>"spark:pob:"+String(user||"guest")+":"+paper;
const toTop=()=>{try{window.scrollTo?.({top:0,behavior:"instant"})}catch{}};

export function PobPaper1Exam({userId,supabase,onBack}){
 const paper=useMemo(()=>buildPobPaper1(),[]);
 const questions=paper.questions;
 const key=storage(userId,paper.id);
 const [attempt,setAttempt]=useState(()=>{
   const saved=safeRead(key);
   return restorePobAttempt(saved,paper.id,questions.length)||startState(paper.id);
 });
 const [remaining,setRemaining]=useState(()=>pobRemainingSeconds(attempt,paper.timeLimitMinutes*60));
 const [confirm,setConfirm]=useState(false);
 const recorded=useRef(new Set());
 const exam=attempt.phase==="exam",review=attempt.phase==="review";
 const index=Math.max(0,Math.min(questions.length-1,attempt.index||0));
 const current=questions[index];
 const score=useMemo(()=>questions.filter(q=>attempt.answers[q.id]===q.answer).length,[questions,attempt.answers]);
 const answered=questions.filter(q=>Boolean(attempt.answers[q.id])).length;
 const flagged=questions.filter(q=>attempt.flags[q.id]).length;
 const update=patch=>setAttempt(old=>({...old,...patch}));
 useEffect(()=>safeWrite(key,attempt),[key,attempt]);
 useEffect(()=>{
   if(!exam)return;
   const tick=()=>{
     const left=Math.max(0,Math.ceil((Number(attempt.deadline)-Date.now())/1000));
     setRemaining(left);
     if(left<=0)setAttempt(old=>old.phase==="exam"?({...old,phase:"review",submittedAt:Date.now(),reason:"timer"}):old);
   };
   tick();const interval=setInterval(tick,1000);return()=>clearInterval(interval);
 },[exam,attempt.deadline]);
 useEffect(()=>{toTop()},[index,attempt.phase]);
 useEffect(()=>{
   if(!review||!supabase?.rpc||!userId||recorded.current.has(attempt.attemptId))return;
   recorded.current.add(attempt.attemptId);
   recordSubjectActivity({supabase,activity:{
     subjectId:SUBJECT,activityKey:"exam:pob-paper1:"+paper.id+":"+attempt.attemptId,
     activityType:"exam",title:"Principles of Business: Original Paper 01",completed:true,
     score,maxScore:60,percent:Math.round(100*score/60),
     metadata:{source:"spark-original",historical:false,paper:"01",duration_minutes:75,
       question_count:questions.length,section_distribution:[5,6,5,4,7,7,6,7,7,6],
       completed_at:new Date().toISOString()}
   }}).catch(()=>{recorded.current.delete(attempt.attemptId)});
 },[review,attempt.attemptId,score,userId,supabase,paper.id,questions.length]);
 const start=()=>{setRemaining(75*60);setAttempt({...startState(paper.id),phase:"exam",deadline:Date.now()+75*60*1000})};
 const finish=()=>{update({phase:"review",submittedAt:Date.now(),reason:"student"});setConfirm(false)};
 const restart=()=>{setAttempt(startState(paper.id));setConfirm(false)};
 return <main className="pob-exam"><div className="pob-exam-shell">
   <div className="pob-exam-nav"><button type="button" onClick={onBack}>← Practice home</button><span>CSEC PRINCIPLES OF BUSINESS · PAPER 01</span></div>
   {attempt.phase==="instructions"?<section className="pob-exam-card pob-exam-intro">
     <span className="pob-exam-kicker">SPARK ORIGINAL PRACTICE</span>
     <h1>Paper 1: Multiple-choice examination</h1>
     <p>60 questions, 75 minutes, one mark each. The questions follow the official syllabus distribution: 20 from organisational principles, 20 from promotion and logistics and 20 from finance, government and technology.</p>
     <p>This is an original SPARK practice paper, not a historical CXC examination.</p>
     <div className="pob-exam-facts"><span>60 questions</span><span>1 hour 15 minutes</span><span>60 marks</span></div>
     <button type="button" className="pob-primary" onClick={start}>Start examination</button>
   </section>:<>
     <header className="pob-exam-card pob-exam-status">
       <div><strong>{review?"Your paper is complete":"Paper 1 in progress"}</strong><span>{answered} of {questions.length} answered · {flagged} flagged</span></div>
       <div className="pob-timer" role="timer" aria-label="Time remaining">{review?"Submitted":clock(remaining)}</div>
     </header>
     {review&&<section className="pob-exam-card pob-exam-result" role="status">
       <span>Your result</span><strong>{score} / 60</strong><p>{Math.round(100*score/60)}% correct. Review every explanation, especially questions you missed.</p>
       <button type="button" onClick={restart}>Start a fresh attempt</button>
     </section>}
     <div className="pob-exam-layout">
       <article className="pob-exam-card pob-exam-question">
         <div className="pob-question-head"><span>Question {index+1} of 60</span><span>Section {current.section}</span></div>
         <h1>{current.stem}</h1>
         <fieldset disabled={review}><legend className="pob-visually-hidden">Choose one answer</legend>
           {current.options.map((option,i)=>{
             const letter=LETTERS[i],chosen=attempt.answers[current.id]===letter;
             return <label className={"pob-exam-option "+(chosen?"selected ":"")+(review&&letter===current.answer?"correct":review&&chosen?"incorrect":"")} key={letter}>
               <input type="radio" checked={chosen} onChange={()=>update({answers:{...attempt.answers,[current.id]:letter}})} name={current.id} value={letter}/>
               <b>{letter}</b><span>{option}</span>
             </label>;
           })}
         </fieldset>
         {review&&<div className="pob-exam-feedback">
           <strong>{attempt.answers[current.id]===current.answer?"Correct.":"Answer: "+current.answer+". "+current.options[LETTERS.indexOf(current.answer)]}</strong>
           <p>{current.explanation}</p>
         </div>}
         <div className="pob-exam-controls">
           <button type="button" className="secondary" disabled={index===0} onClick={()=>update({index:index-1})}>Previous</button>
           {!review&&<button type="button" className="secondary" aria-pressed={!!attempt.flags[current.id]} onClick={()=>update({flags:{...attempt.flags,[current.id]:!attempt.flags[current.id]}})}>{attempt.flags[current.id]?"Unflag":"Flag for review"}</button>}
           <button type="button" className="pob-primary" disabled={index===59} onClick={()=>update({index:index+1})}>Next question</button>
         </div>
       </article>
       <aside className="pob-exam-card pob-exam-navigator">
         <h2>Question navigator</h2><p>Choose any question. Your answers are saved on this device during the attempt.</p>
         <div className="pob-exam-number-grid">{questions.map((question,i)=><button key={question.id} type="button"
           title={"Question "+(i+1)+(attempt.flags[question.id]?", flagged":"")}
           aria-current={index===i?"step":undefined}
           className={(i===index?"active ":"")+(attempt.answers[question.id]?"answered ":"")+(attempt.flags[question.id]?"flagged":"")}
           onClick={()=>update({index:i})}>{i+1}</button>)}</div>
         {!review&&<button type="button" className="pob-primary pob-exam-submit" onClick={()=>setConfirm(true)}>Submit Paper 1</button>}
       </aside>
     </div>
     {confirm&&!review&&<div className="pob-confirm-overlay" role="presentation"><div className="pob-exam-card pob-confirm" role="dialog" aria-modal="true" aria-label="Confirm examination submission">
       <h2>Submit your paper?</h2><p>You answered {answered} of 60 questions. Unanswered questions earn zero marks. You can review every explanation after submission.</p>
       <div className="pob-exam-controls"><button type="button" className="secondary" onClick={()=>setConfirm(false)}>Keep working</button><button type="button" className="pob-primary" onClick={finish}>Submit and review</button></div>
     </div></div>}
   </>}
 </div></main>;
}

export function PobPaper2Exam({onBack,userId,supabase}){
 const paper=POB_PAPER2_ORIGINAL_01;
 const key=storage(userId,paper.id);
 const [attempt,setAttempt]=useState(()=>{const saved=safeRead(key);return restorePobAttempt(saved,paper.id,paper.questions.length)||startState(paper.id)});
 const [remaining,setRemaining]=useState(()=>pobRemainingSeconds(attempt,120*60));
 const [confirm,setConfirm]=useState(false);
 const recorded=useRef(new Set());
 const exam=attempt.phase==="exam",review=attempt.phase==="review";
 const question=paper.questions[Math.max(0,Math.min(4,attempt.index||0))];
 const answered=paper.questions.reduce((n,q)=>n+q.items.filter(part=>String(attempt.answers[q.id+":"+part.id]||"").trim()).length,0);
 const update=patch=>setAttempt(old=>({...old,...patch}));
 useEffect(()=>safeWrite(key,attempt),[key,attempt]);
 useEffect(()=>{
   if(!exam)return;
   const tick=()=>{const left=Math.max(0,Math.ceil((attempt.deadline-Date.now())/1000));setRemaining(left);
     if(left<=0)setAttempt(old=>old.phase==="exam"?{...old,phase:"review",submittedAt:Date.now(),reason:"timer"}:old)};
   tick();const interval=setInterval(tick,1000);return()=>clearInterval(interval);
 },[exam,attempt.deadline]);
 useEffect(toTop,[attempt.phase,attempt.index]);
 useEffect(()=>{
   if(!review||!userId||!supabase?.rpc||recorded.current.has(attempt.attemptId))return;
   recorded.current.add(attempt.attemptId);
   recordSubjectActivity({supabase,activity:{
     subjectId:SUBJECT,activityKey:"practice:pob-paper2:"+paper.id+":"+attempt.attemptId,
     activityType:"exam",title:"Principles of Business: Original Paper 02",
     completed:true,score:null,maxScore:100,percent:null,
     metadata:{source:"spark-original",historical:false,paper:"02",answered_parts:answered,
       duration_minutes:120,marking_status:"not-automatically-graded"}
   }}).catch(()=>recorded.current.delete(attempt.attemptId));
 },[review,userId,supabase,attempt.attemptId,answered,paper.id]);
 const start=()=>{setRemaining(120*60);setAttempt({...startState(paper.id),phase:"exam",deadline:Date.now()+120*60*1000})};
 const finish=()=>{update({phase:"review",submittedAt:Date.now()});setConfirm(false)};
 return <main className="pob-exam"><div className="pob-exam-shell">
  <div className="pob-exam-nav"><button type="button" onClick={onBack}>← Practice home</button><span>CSEC PRINCIPLES OF BUSINESS · PAPER 02</span></div>
  {attempt.phase==="instructions"?<section className="pob-exam-card pob-exam-intro">
   <span className="pob-exam-kicker">SPARK ORIGINAL STRUCTURED PRACTICE</span><h1>Paper 2: Business decisions</h1>
   <p>Five compulsory 20-mark questions, 100 marks, 2 hours. Read each business scenario carefully and use complete sentences, calculations and relevant Caribbean examples.</p>
   <p>SPARK will save your written responses on this device and show the marking scheme after submission. This initial build does not award an unreliable automated mark to extended answers.</p>
   <button type="button" className="pob-primary" onClick={start}>Start Paper 2</button></section>:<>
   <header className="pob-exam-card pob-exam-status"><div><strong>{review?"Paper 2 submitted":"Paper 2 in progress"}</strong><span>{answered} of 25 parts answered</span></div><span className="pob-timer" role="timer">{review?"Review":clock(remaining)}</span></header>
   <nav className="pob-exam-card pob-paper2-nav" aria-label="Paper 2 question navigator">{paper.questions.map((q,i)=>{const completed=q.items.filter(part=>String(attempt.answers[q.id+":"+part.id]||"").trim()).length;return <button key={q.id} className={q.id===question.id?"active":""} type="button" aria-current={q.id===question.id?"step":undefined} aria-label={"Question "+(i+1)+": "+completed+" of "+q.items.length+" parts answered"} onClick={()=>update({index:i})}>Question {i+1} <span className="pob-p2-count">{completed}/{q.items.length}</span></button>})}</nav>
   <section className="pob-exam-card pob-p2-question"><div className="pob-question-head"><span>Question {question.number}</span><span>20 marks</span></div><h1>{question.title}</h1><p>{question.context}</p>
   {question.items.map(item=>{
     const id=question.id+":"+item.id;
     return <div className="pob-p2-part" key={id}>
       <label htmlFor={id}><strong>({item.id}) {item.prompt}</strong><span>{item.marks} marks</span></label>
       <textarea id={id} rows={Math.max(3,Math.ceil(item.marks/2)+2)}
         disabled={review} value={attempt.answers[id]||""}
         onChange={e=>update({answers:{...attempt.answers,[id]:e.target.value}})}
         placeholder="Write your reasoning, examples or calculations in complete sentences."/>
       {review&&checkPobCalculation(id,attempt.answers[id])&&<div className="pob-p2-calculation" role="status"><strong>Calculation check</strong><p>{checkPobCalculation(id,attempt.answers[id]).message}</p><p>Expected calculation: {checkPobCalculation(id,attempt.answers[id]).working}</p><small>Numerical feedback only. No marks are awarded by this check.</small></div>}
       {review&&<details className="pob-p2-criteria"><summary>View SPARK marking guidance</summary>
         <p>{item.modelAnswer}</p>
         <ul>{item.criteria.map((criterion,i)=><li key={i}><strong>{criterion.marks} mark{criterion.marks===1?"":"s"}</strong>: {criterion.rule}</li>)}</ul>
         {getPobP2FeedbackGuide(id)&&<div className="pob-p2-guide"><strong>How to strengthen your response</strong><p>{getPobP2FeedbackGuide(id).guidance}</p><strong>Common mistakes</strong><ul>{getPobP2FeedbackGuide(id).pitfalls.map((point,i)=><li key={i}>{point}</li>)}</ul><strong>Acceptable approaches</strong><ul>{getPobP2FeedbackGuide(id).alternatives.map((point,i)=><li key={i}>{point}</li>)}</ul></div>}
         <small>Other equivalent correct explanations may also deserve credit. This is marking guidance, not a final automatically assigned grade.</small>
       </details>}
     </div>;
   })}
   <div className="pob-exam-controls"><button type="button" className="secondary" disabled={question.number===1} onClick={()=>update({index:question.number-2})}>Previous</button>
   <button type="button" className="pob-primary" disabled={question.number===5} onClick={()=>update({index:question.number})}>Next question</button></div>
   {!review&&<button type="button" className="pob-primary pob-exam-submit" onClick={()=>setConfirm(true)}>Submit Paper 2</button>}
   {review&&<button type="button" className="secondary" onClick={()=>setAttempt(startState(paper.id))}>Start another attempt</button>}
   </section>
   {review&&<section className="pob-exam-card pob-review-note"><h2>Response review</h2><p>Question overview: select an incomplete or answered question above to review your work and the marking criteria.</p><ol>{paper.questions.map(q=>{const completed=q.items.filter(part=>String(attempt.answers[q.id+":"+part.id]||"").trim()).length;return <li key={q.id}>Question {q.number}: {completed} of {q.items.length} parts answered, {q.marks} marks available</li>})}</ol><p>Your answers have been preserved in this browser. The mark-by-mark criteria show what a complete answer should demonstrate. No score has been invented for free-text responses.</p></section>}
   {confirm&&!review&&<div className="pob-confirm-overlay"><div className="pob-exam-card pob-confirm" role="dialog" aria-modal="true" aria-label="Confirm Paper 2 submission">
    <h2>Finish Paper 2?</h2><p>{answered} of 25 parts have responses. You can view the model answers and criteria after submitting.</p>
    <div className="pob-exam-controls"><button type="button" className="secondary" onClick={()=>setConfirm(false)}>Keep working</button>
    <button type="button" className="pob-primary" onClick={finish}>Submit responses</button></div>
   </div></div>}
  </>}
 </div></main>;
}

export default function PobPracticeHub({userId,supabase,onBack}){
 const [mode,setMode]=useState("home");
 if(mode==="paper1")return <PobPaper1Exam userId={userId} supabase={supabase} onBack={()=>setMode("home")}/>;
 if(mode==="paper2")return <PobPaper2Exam userId={userId} supabase={supabase} onBack={()=>setMode("home")}/>;
 if(mode==="sba")return <PobSbaWorkspace onBack={()=>setMode("home")}/>;
 return <main className="pob-exam"><div className="pob-exam-shell">
   {onBack&&<div className="pob-exam-nav"><button type="button" onClick={onBack}>← Choose another subject</button></div>}
   <header className="pob-exam-card pob-exam-intro"><span className="pob-exam-kicker">SPARK CSEC PRINCIPLES OF BUSINESS</span>
     <h1>Practise business thinking</h1><p>Take a full timed practice paper, work through business scenarios or plan your SBA research. Original questions are clearly labelled, and historical source papers remain unavailable until verified.</p></header>
   <div className="pob-practice-options">
    <article className="pob-exam-card"><small>60 questions · 75 minutes</small><h2>Paper 1</h2><p>Original multiple-choice practice across all ten syllabus sections with instant explanations after submission.</p><button type="button" className="pob-primary" onClick={()=>setMode("paper1")}>Open Paper 1</button></article>
    <article className="pob-exam-card"><small>5 compulsory questions · 120 minutes</small><h2>Paper 2</h2><p>Original business scenarios, written-response space and detailed marking criteria. Extended responses are not yet automatically scored.</p><button type="button" className="pob-primary" onClick={()=>setMode("paper2")}>Open Paper 2</button></article>
    <article className="pob-exam-card"><small>Research project · 40 marks</small><h2>Business research SBA</h2><p>Plan your research, draft report sections and review the official 40-mark criteria without inventing grades.</p><button type="button" className="pob-primary" onClick={()=>setMode("sba")}>Open research workspace</button></article>
   </div>
 </div></main>;
}
