import React,{useEffect,useMemo,useState} from "react";
import {buildPobHistoricalP1Exam} from "../data/pobHistoricalPaper1Batch1Exam";

const CHOICES=["A","B","C","D"];
const key=paperId=>"spark:pob:source-questions:"+paperId;
const read=paperId=>{try{return JSON.parse(localStorage.getItem(key(paperId))||"{}")}catch{return {}}};
const attemptKey=paperId=>key(paperId)+":attempt";
const readAttempt=paperId=>{try{const saved=JSON.parse(localStorage.getItem(attemptKey(paperId))||"null");return saved&&Number.isFinite(saved.deadline)&&saved.deadline>0?saved:null}catch{return null}};

export default function PobHistoricalPaper1Preview({record}){
 const paper=useMemo(()=>buildPobHistoricalP1Exam(record),[record]);
 const questions=paper.questions;
 const ready=questions.length===60&&questions.every(q=>q.options.length===4);
 const [initialAttempt]=useState(()=>readAttempt(record.id));
 const [started,setStarted]=useState(()=>Boolean(initialAttempt));
 const [index,setIndex]=useState(0);
 const [responses,setResponses]=useState(()=>read(record.id));
 const [review,setReview]=useState(()=>Boolean(initialAttempt?.review||initialAttempt?.deadline<=Date.now()));
 const [deadline,setDeadline]=useState(()=>initialAttempt?.deadline||0);
 const [remaining,setRemaining]=useState(()=>initialAttempt?Math.max(0,Math.ceil((initialAttempt.deadline-Date.now())/1000)):paper.timeLimitMinutes*60);
 useEffect(()=>{
  if(!started||review||!deadline)return;
  const interval=setInterval(()=>{const next=Math.max(0,Math.ceil((deadline-Date.now())/1000));setRemaining(next);if(next===0)setReview(true)},1000);
  return()=>clearInterval(interval);
 },[started,review,deadline]);
 useEffect(()=>{try{localStorage.setItem(key(record.id),JSON.stringify(responses))}catch{}},[responses,record.id]);
 useEffect(()=>{try{if(deadline)localStorage.setItem(attemptKey(record.id),JSON.stringify({deadline,review}));else localStorage.removeItem(attemptKey(record.id))}catch{}},[deadline,review,record.id]);
 useEffect(()=>{window.scrollTo?.({top:0,behavior:"instant"})},[index,review]);
 const current=questions[index];
 const correct=current;
 const disputed=!current.scoringEligible;
 const answered=questions.filter(q=>responses[q.number]).length;
 const clock=seconds=>String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0");
 const graded=questions.filter(q=>q.scoringEligible);
 const score=graded.filter(q=>responses[q.number]===q.answer).length;
 return <section className="pob-archive-exam pob-source-paper" aria-label="Source-backed historical Paper 1 question practice">
   {!started?<><h3>{record.source.year} {record.source.sitting==="JAN"?"January":"May/June"} · Paper 1 examination</h3>
     <p>All 60 question texts and four options from the supplied transcription are presented in printed order. The exam uses SPARK’s timed navigator, saved answers and end-of-paper review. Original diagram artwork and some source phrasing still require checking.</p>
     <p>Answers are provisional SPARK interpretations, not an official CXC key. Items with source-dependent figures, disputed keys or conflicting answer entries are excluded from the provisional score until verified.</p>
     <div className="pob-archive-summary"><span>60 transcribed questions</span><span>{paper.timeLimitMinutes} minutes</span><span>{paper.excluded} scoring exclusions pending source review</span><span>Question text and options included</span></div>
     <button type="button" disabled={!ready} className="pob-primary" onClick={()=>{setStarted(true);setDeadline(Date.now()+paper.timeLimitMinutes*60*1000);setRemaining(paper.timeLimitMinutes*60);setReview(false)}}>Start 60-question Paper 1</button>
   </>:<>
     <div className="pob-exam-status pob-source-status"><strong>{review?"Review your answers":"Source-backed question practice"}</strong><span>{answered} of 60 answered · {review?"Submitted":clock(remaining)}</span></div>
     {review&&<div className="pob-exam-result" role="status">
       <strong>{score} / {graded.length}</strong><p>Provisional answer comparison. Only SPARK-proposed, non-official answer explanations are used for the review.</p>
     </div>}
     <div className="pob-exam-layout">
       <article className="pob-exam-card pob-exam-question">
         <div className="pob-question-head"><span>Question {current.number} of 60</span><span>{record.source.year} {record.source.sitting==="JAN"?"January":"May/June"} · Paper 1</span></div>
         <h1>{current.stem}</h1>
         {(current.sourceReviewPending||current.sourceGraphicPending)&&<div className="pob-source-caveat" role="note"><strong>Original-source review pending</strong><p>{current.sourcePlaceholderNote||"This question depends on an original figure or source passage that needs verification."} It is excluded from the provisional score until checked against the supplied PDF.</p></div>}
         <fieldset disabled={review}><legend className="pob-visually-hidden">Choose one answer</legend>
         {current.options.map((label,i)=><label key={i} className={"pob-exam-option "+(responses[current.number]===CHOICES[i]?"selected ":"")}>
           <input type="radio" name={record.id+"-q"+current.number} value={CHOICES[i]}
             checked={responses[current.number]===CHOICES[i]}
             onChange={()=>setResponses(previous=>({...previous,[current.number]:CHOICES[i]}))}/>
           <b>{CHOICES[i]}</b><span>{label}</span>
         </label>)}</fieldset>
         {review&&<div className="pob-exam-feedback"><strong>{disputed?"Source or answer review required":correct?.answer?"SPARK suggested answer: "+correct.answer:"Proposed key not available"}</strong>
           <p>{current.reviewReason||correct?.explanation||"No verified explanation available yet."}</p>
           <small>SPARK-authored academic guidance, not a verified CXC score.</small>
         </div>}
         <div className="pob-exam-controls">
           <button type="button" className="secondary" disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button>
           <button type="button" className="pob-primary" disabled={index===59} onClick={()=>setIndex(i=>i+1)}>Next question</button>
         </div>
       </article>
       <aside className="pob-exam-card pob-exam-navigator">
         <h2>Question navigator</h2><div className="pob-exam-number-grid">
           {questions.map((q,i)=><button key={q.id} type="button" aria-current={index===i?"step":undefined}
             className={(index===i?"active ":"")+(responses[q.number]?"answered":"")}
             onClick={()=>setIndex(i)}>{q.number}</button>)}</div>
         {!review?<button type="button" className="pob-primary pob-exam-submit" onClick={()=>setReview(true)}>Submit and review</button>
           :<button type="button" className="pob-primary pob-exam-submit" onClick={()=>{setResponses({});setIndex(0);setReview(false);setStarted(false);setDeadline(0);setRemaining(paper.timeLimitMinutes*60)}}>Try again</button>}
       </aside>
     </div>
     <button type="button" className="secondary" onClick={()=>setStarted(false)}>Back to paper details</button>
   </>}
 </section>;
}
