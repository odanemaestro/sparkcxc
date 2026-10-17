import React,{useEffect,useMemo,useState} from "react";
import {POB_HISTORICAL_2023_JAN_P1_Q01_10} from "../data/pobHistorical2023JanP1Q01to10Draft";

const CHOICES=["A","B","C","D"];
const key=paperId=>"spark:pob:source-questions:"+paperId;
const read=paperId=>{try{return JSON.parse(localStorage.getItem(key(paperId))||"{}")}catch{return {}}};

export default function PobHistoricalPaper1Preview({record}){
 const questions=useMemo(()=>POB_HISTORICAL_2023_JAN_P1_Q01_10.questions,[]);
 const [started,setStarted]=useState(false);
 const [index,setIndex]=useState(0);
 const [responses,setResponses]=useState(()=>read(record.id));
 const [review,setReview]=useState(false);
 useEffect(()=>{try{localStorage.setItem(key(record.id),JSON.stringify(responses))}catch{}},[responses,record.id]);
 useEffect(()=>{window.scrollTo?.({top:0,behavior:"instant"})},[index,review]);
 const current=questions[index];
 const correct=record.bank.entries.find(item=>item.number===current.number);
 const disputed=Boolean(record.bank.answerReviewNotes?.[current.number]);
 const answered=questions.filter(q=>responses[q.number]).length;
 const graded=questions.filter(q=>!record.bank.answerReviewNotes?.[q.number]&&
   record.bank.entries.some(k=>k.number===q.number&&CHOICES.includes(k.answer)));
 const score=graded.filter(q=>responses[q.number]===record.bank.entries.find(k=>k.number===q.number)?.answer).length;
 return <section className="pob-archive-exam pob-source-paper" aria-label="Source-backed historical Paper 1 question practice">
   {!started?<><h3>January 2023 Paper 1 · Source question preview</h3>
     <p>The original question text and all four answer choices have been individually checked for Questions 1–10. The remaining 50 questions have not passed transcription checks and cannot be presented as a complete 60-question simulation yet.</p>
     <p>Answers are provisional SPARK interpretations, not a published CXC answer key. Questions needing academic review will be excluded from the learning score.</p>
     <div className="pob-archive-summary"><span>10 original questions available</span><span>60 in the full paper</span><span>Question text and options included</span></div>
     <button type="button" className="pob-primary" onClick={()=>setStarted(true)}>Practise original Questions 1–10</button>
   </>:<>
     <div className="pob-exam-status pob-source-status"><strong>{review?"Review your answers":"Source-backed question practice"}</strong><span>{answered} of 10 answered</span></div>
     {review&&<div className="pob-exam-result" role="status">
       <strong>{score} / {graded.length}</strong><p>Provisional answer comparison. The full 60-question examination is not yet available.</p>
     </div>}
     <div className="pob-exam-layout">
       <article className="pob-exam-card pob-exam-question">
         <div className="pob-question-head"><span>Question {current.number} of 10</span><span>2023 January · Paper 1</span></div>
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
           <button type="button" className="pob-primary" disabled={index===9} onClick={()=>setIndex(i=>i+1)}>Next question</button>
         </div>
       </article>
       <aside className="pob-exam-card pob-exam-navigator">
         <h2>Question navigator</h2><div className="pob-exam-number-grid">
           {questions.map((q,i)=><button key={q.id} type="button" aria-current={index===i?"step":undefined}
             className={(index===i?"active ":"")+(responses[q.number]?"answered":"")}
             onClick={()=>setIndex(i)}>{q.number}</button>)}</div>
         {!review?<button type="button" className="pob-primary pob-exam-submit" onClick={()=>setReview(true)}>Submit and review</button>
           :<button type="button" className="pob-primary pob-exam-submit" onClick={()=>{setResponses({});setIndex(0);setReview(false)}}>Try again</button>}
       </aside>
     </div>
     <button type="button" className="secondary" onClick={()=>setStarted(false)}>Back to paper details</button>
   </>}
 </section>;
}
