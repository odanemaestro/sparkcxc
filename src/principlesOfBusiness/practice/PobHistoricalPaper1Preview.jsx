import React,{useEffect,useMemo,useState} from "react";
import {POB_HIST_2023_JAN_FULL_60,verifyPobHistorical2023FullPaper} from "../data/pobHistorical2023JanP1Full";

const CHOICES=["A","B","C","D"];
const key=paperId=>"spark:pob:source-questions:"+paperId;
const read=paperId=>{try{return JSON.parse(localStorage.getItem(key(paperId))||"{}")}catch{return {}}};

export default function PobHistoricalPaper1Preview({record}){
 const questions=useMemo(()=>POB_HIST_2023_JAN_FULL_60.questions,[]);
 const ready=useMemo(()=>verifyPobHistorical2023FullPaper().valid,[]);
 const [started,setStarted]=useState(false);
 const [index,setIndex]=useState(0);
 const [responses,setResponses]=useState(()=>read(record.id));
 const [review,setReview]=useState(false);
 const [deadline,setDeadline]=useState(0);
 const [remaining,setRemaining]=useState(75*60);
 useEffect(()=>{
  if(!started||review||!deadline)return;
  const interval=setInterval(()=>{const next=Math.max(0,Math.ceil((deadline-Date.now())/1000));setRemaining(next);if(next===0)setReview(true)},1000);
  return()=>clearInterval(interval);
 },[started,review,deadline]);
 useEffect(()=>{try{localStorage.setItem(key(record.id),JSON.stringify(responses))}catch{}},[responses,record.id]);
 useEffect(()=>{window.scrollTo?.({top:0,behavior:"instant"})},[index,review]);
 const current=questions[index];
 const correct=record.bank.entries.find(item=>item.number===current.number);
 const disputed=Boolean(current.academicReview);
 const answered=questions.filter(q=>responses[q.number]).length;
 const clock=seconds=>String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0");
 const graded=questions.filter(q=>!q.academicReview&&
   record.bank.entries.some(k=>k.number===q.number&&CHOICES.includes(k.answer)));
 const score=graded.filter(q=>responses[q.number]===record.bank.entries.find(k=>k.number===q.number)?.answer).length;
 return <section className="pob-archive-exam pob-source-paper" aria-label="Source-backed historical Paper 1 question practice">
   {!started?<><h3>January 2023 · Paper 1 examination</h3>
     <p>The complete 60-question Paper 1 is available in its original order with question text and four options. The exam lasts 75 minutes and uses the same one-question-at-a-time layout and navigator as the other SPARK subjects.</p>
     <p>Answers are provisional SPARK interpretations, not a published CXC answer key. Questions needing academic review will be excluded from the learning score.</p>
     <div className="pob-archive-summary"><span>60 original questions</span><span>75 minutes</span><span>Question text and options included</span></div>
     <button type="button" disabled={!ready} className="pob-primary" onClick={()=>{setStarted(true);setDeadline(Date.now()+75*60*1000);setRemaining(75*60)}}>Start 60-question Paper 1</button>
   </>:<>
     <div className="pob-exam-status pob-source-status"><strong>{review?"Review your answers":"Source-backed question practice"}</strong><span>{answered} of 60 answered · {review?"Submitted":clock(remaining)}</span></div>
     {review&&<div className="pob-exam-result" role="status">
       <strong>{score} / {graded.length}</strong><p>Provisional answer comparison. Only SPARK-proposed, non-official answer explanations are used for the review.</p>
     </div>}
     <div className="pob-exam-layout">
       <article className="pob-exam-card pob-exam-question">
         <div className="pob-question-head"><span>Question {current.number} of 60</span><span>2023 January · Paper 1</span></div>
         <h1>{current.stem}</h1>
         <fieldset disabled={review}><legend className="pob-visually-hidden">Choose one answer</legend>
         {current.options.map((label,i)=><label key={i} className={"pob-exam-option "+(responses[current.number]===CHOICES[i]?"selected ":"")}>
           <input type="radio" name={record.id+"-q"+current.number} value={CHOICES[i]}
             checked={responses[current.number]===CHOICES[i]}
             onChange={()=>setResponses(previous=>({...previous,[current.number]:CHOICES[i]}))}/>
           <b>{CHOICES[i]}</b><span>{label}</span>
         </label>)}</fieldset>
         {review&&<div className="pob-exam-feedback"><strong>{disputed?"Academic review needed":correct?.answer?"SPARK suggested answer: "+correct.answer:"Proposed key not available"}</strong>
           <p>{correct?.explanation||"No verified explanation available yet."}</p>
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
           :<button type="button" className="pob-primary pob-exam-submit" onClick={()=>{setResponses({});setIndex(0);setReview(false);setStarted(false);setDeadline(0);setRemaining(75*60)}}>Try again</button>}
       </aside>
     </div>
     <button type="button" className="secondary" onClick={()=>setStarted(false)}>Back to paper details</button>
   </>}
 </section>;
}
