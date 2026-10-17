import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {buildPobPaper1} from "../data/pobPaper1Original";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT,verifyPobSpecimenCheckpoint} from "../data/pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20,verifyPobSpecimenCheckpoint11to20} from "../data/pobCxcSpecimenP1Checkpoint11to20";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30,verifyPobSpecimenCheckpoint21to30} from "../data/pobCxcSpecimenP1Checkpoint21to30";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40,verifyPobSpecimenCheckpoint31to40} from "../data/pobCxcSpecimenP1Checkpoint31to40";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50,verifyPobSpecimenCheckpoint41to50} from "../data/pobCxcSpecimenP1Checkpoint41to50";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60,verifyPobSpecimenCheckpoint51to60} from "../data/pobCxcSpecimenP1Checkpoint51to60";
import {POB_CXC_2019_SPECIMEN_P1_FULL,verifyPobFullSpecimen} from "../data/pobCxcSpecimenP1Full";
import {scorePobSpecimen} from "../data/pobSpecimenScoring";
import {POB_PAPER2_ORIGINAL_01} from "../data/pobPaper2Original";
import {buildPob2026JanHistoricalPaper,verifyPob2026JanHistoricalPaper} from "../data/pobHistorical2026JanP2RealPaper";
import {checkPobCalculation,inspectPobCalculationEvidence} from "../data/pobCalculationFeedback";
import {restorePobAttempt,pobRemainingSeconds} from "../data/pobAttemptRecovery";
import {pobPaper2Completion,nextIncompletePobQuestion} from "../data/pobPaper2Progress";
import {getPobP2FeedbackGuide} from "../data/pobPaper2FeedbackGuides";
import {inspectPobShortAnswer} from "../data/pobShortAnswerFeedback";
import {inspectPobExtendedResponse} from "../data/pobExtendedResponseFeedback";
import {reviewPobPaper2} from "../data/pobRubricReview";
import {startServerExamAttempt,submitServerExamAttempt} from "../../grading/serverExamAttempt";
import ServerMarkingReview from "../../grading/ServerMarkingReview";
import {assessPobPartEvidence} from "../data/pobAssessmentEvidence";
import PobSbaWorkspace from "./PobSbaWorkspace";
import PobHistoricalArchive from "./PobHistoricalArchive";
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

export function PobPaper1Exam({userId,supabase,onBack,paperOverride=null}){
 const paper=useMemo(()=>paperOverride||buildPobPaper1(),[paperOverride]);
 const isSpecimen=Boolean(paperOverride);
 const questions=paper.questions;
 const maxScore=questions.length;
 const durationMinutes=paper.timeLimitMinutes||75;
 const key=storage(userId,paper.id);
 const [attempt,setAttempt]=useState(()=>{
   const saved=safeRead(key);
   return restorePobAttempt(saved,paper.id,questions.length)||startState(paper.id);
 });
 const [remaining,setRemaining]=useState(()=>pobRemainingSeconds(attempt,durationMinutes*60));
 const [confirm,setConfirm]=useState(false);
 const recorded=useRef(new Set());
 const exam=attempt.phase==="exam",review=attempt.phase==="review";
 const index=Math.max(0,Math.min(questions.length-1,attempt.index||0));
 const current=questions[index];
 const score=useMemo(()=>questions.filter(q=>attempt.answers[q.id]===q.answer).length,[questions,attempt.answers]);
 const specimenScores=useMemo(()=>isSpecimen?scorePobSpecimen(questions,attempt.answers):null,[isSpecimen,questions,attempt.answers]);
 const disputedCount=specimenScores?.disputedQuestionNumbers.length||0;
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
     activityType:"exam",title:isSpecimen?"Principles of Business: "+paper.title:"Principles of Business: Original Paper 01",completed:true,
     score,maxScore,percent:Math.round(100*score/maxScore),
     metadata:{source:isSpecimen?"cxc-official-specimen":"spark-original",historical:false,paper:"01",duration_minutes:durationMinutes,
       question_count:questions.length,specimen_question_numbers:isSpecimen?questions.map(q=>q.number):null,
       section_distribution:isSpecimen?null:[5,6,5,4,7,7,6,7,7,6],
       cxc_published_key_score:isSpecimen?score:null,
       cxc_published_key_max:isSpecimen?maxScore:null,
       uncontested_score:isSpecimen?specimenScores.uncontestedScore:null,
       uncontested_max:isSpecimen?specimenScores.uncontestedMax:null,
       disputed_specimen_questions:isSpecimen?specimenScores.disputedQuestionNumbers:[],
       completed_at:new Date().toISOString()}
   }}).catch(()=>{recorded.current.delete(attempt.attemptId)});
 },[review,attempt.attemptId,score,userId,supabase,paper.id,questions.length,isSpecimen,maxScore,durationMinutes,specimenScores]);
 const start=()=>{
   if(isSpecimen){
     const verification=paper.id===POB_CXC_2019_SPECIMEN_P1_CHECKPOINT.id
       ?verifyPobSpecimenCheckpoint(paper)
       :paper.id===POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20.id
       ?verifyPobSpecimenCheckpoint11to20(paper)
       :paper.id===POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30.id
       ?verifyPobSpecimenCheckpoint21to30(paper)
       :paper.id===POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40.id
       ?verifyPobSpecimenCheckpoint31to40(paper)
       :paper.id===POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50.id
       ?verifyPobSpecimenCheckpoint41to50(paper)
       :paper.id===POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60.id
       ?verifyPobSpecimenCheckpoint51to60(paper)
       :paper.id===POB_CXC_2019_SPECIMEN_P1_FULL.id
       ?verifyPobFullSpecimen(paper)
       :{valid:false};
     if(!verification.valid)return;
   }
   setRemaining(durationMinutes*60);
   setAttempt({...startState(paper.id),phase:"exam",deadline:Date.now()+durationMinutes*60*1000});
 };
 const finish=()=>{update({phase:"review",submittedAt:Date.now(),reason:"student"});setConfirm(false)};
 const restart=()=>{setAttempt(startState(paper.id));setConfirm(false)};
 return <main className="pob-exam"><div className="pob-exam-shell">
   <div className="pob-exam-nav"><button type="button" onClick={onBack}>← Practice home</button><span>CSEC PRINCIPLES OF BUSINESS · PAPER 01</span></div>
   {attempt.phase==="instructions"?<section className="pob-exam-card pob-exam-intro">
     <span className="pob-exam-kicker">{isSpecimen?(maxScore===60?"CXC OFFICIAL SPECIMEN · FULL 60-QUESTION PRACTICE":"CXC OFFICIAL SPECIMEN · TEN-QUESTION CHECKPOINT"):"SPARK ORIGINAL PRACTICE"}</span>
     <h1>{isSpecimen?paper.title:"Paper 1: Multiple-choice examination"}</h1>
     <p>{isSpecimen?(maxScore===60?"The complete CXC 2019 specimen Paper 1 contains 60 questions over 75 minutes. This is a source-key-checked practice simulation, not an official examination or certified grade.":"Ten CXC specimen questions checked against the printed CXC answer key. This is a 13-minute checkpoint, not the full 60-question paper."):"60 questions, 75 minutes, one mark each. The questions follow the official syllabus distribution: 20 from organisational principles, 20 from promotion and logistics and 20 from finance, government and technology."}</p>
     <p>{isSpecimen?"Source: CXC Principles of Business syllabus, 2019 specimen Paper 01, PDF pages "+paper.sourcePages[0]+"–"+paper.sourcePages[paper.sourcePages.length-1]+"; CXC key, PDF page 86. Practice scores are not official examination grades.":"This is an original SPARK practice paper, not a historical CXC examination."}</p>
     {isSpecimen&&questions.some(q=>q.sourceKeyAcademicReview)&&<p role="note"><strong>Academic review notice:</strong> Some answers in CXC’s printed specimen key are disputed. This practice shows the published CXC key comparison and a separate learning score that excludes disputed items. Affected questions are explained and flagged during review.</p>}
     <div className="pob-exam-facts"><span>{maxScore} questions</span><span>{durationMinutes} minutes</span><span>{maxScore} marks</span></div>
     <button type="button" className="pob-primary" onClick={start}>Start examination</button>
   </section>:<>
     <header className="pob-exam-card pob-exam-status">
       <div><strong>{review?"Your paper is complete":"Paper 1 in progress"}</strong><span>{answered} of {questions.length} answered · {flagged} flagged</span></div>
       <div className="pob-timer" role="timer" aria-label="Time remaining">{review?"Submitted":clock(remaining)}</div>
     </header>
     {review&&<section className="pob-exam-card pob-exam-result" role="status">
       <span>{disputedCount?"Published CXC specimen key comparison":"Your result"}</span><strong>{score} / {maxScore}</strong><p>{Math.round(100*score/maxScore)}% correct. Review every explanation, especially questions you missed.</p>
       {disputedCount>0&&<p role="note"><strong>Uncontested learning score: {specimenScores.uncontestedScore} / {specimenScores.uncontestedMax} ({specimenScores.uncontestedPercent}%).</strong> Questions {specimenScores.disputedQuestionNumbers.join(", ")} are excluded from this learning score because their printed CXC answers need academic clarification. The published-key comparison above is preserved for source accuracy, not presented as an undisputed grade.</p>}
       <button type="button" onClick={restart}>Start a fresh attempt</button>
     </section>}
     <div className="pob-exam-layout">
       <article className="pob-exam-card pob-exam-question">
         <div className="pob-question-head"><span>Question {index+1} of {maxScore}</span><span>{isSpecimen?"CXC specimen Q"+current.number+" · Section "+current.section:"Section "+current.section}</span></div>
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
           {current.sourceKeyAcademicReview&&<p role="note"><strong>CXC source-key review:</strong> {current.keyConcern}</p>}
         </div>}
         <div className="pob-exam-controls">
           <button type="button" className="secondary" disabled={index===0} onClick={()=>update({index:index-1})}>Previous</button>
           {!review&&<button type="button" className="secondary" aria-pressed={!!attempt.flags[current.id]} onClick={()=>update({flags:{...attempt.flags,[current.id]:!attempt.flags[current.id]}})}>{attempt.flags[current.id]?"Unflag":"Flag for review"}</button>}
           <button type="button" className="pob-primary" disabled={index===questions.length-1} onClick={()=>update({index:index+1})}>Next question</button>
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
       <h2>Submit your paper?</h2><p>You answered {answered} of {maxScore} questions. Unanswered questions earn zero marks. You can review every explanation after submission.</p>
       <div className="pob-exam-controls"><button type="button" className="secondary" onClick={()=>setConfirm(false)}>Keep working</button><button type="button" className="pob-primary" onClick={finish}>Submit and review</button></div>
     </div></div>}
   </>}
 </div></main>;
}

export function PobPaper2Exam({onBack,userId,supabase,paperOverride=null}){
 const paper=useMemo(()=>paperOverride||POB_PAPER2_ORIGINAL_01,[paperOverride]);
 const historical=Boolean(paperOverride);
 // Browser flag exposes an internal request path, never permission to grade.
 // The protected database RPC and worker must independently authorize it.
 const historicalCanary=historical&&process.env.REACT_APP_POB_HISTORICAL_JAN2026_MARKING==="true"
   &&process.env.REACT_APP_SERVER_MARKING==="true";
 const serverBacked=!historical||historicalCanary;
 const key=storage(userId,paper.id);
 const [attempt,setAttempt]=useState(()=>{const saved=safeRead(key);return restorePobAttempt(saved,paper.id,paper.questions.length)||startState(paper.id)});
 const [remaining,setRemaining]=useState(()=>pobRemainingSeconds(attempt,(paper.timeLimitMinutes||120)*60));
 const [confirm,setConfirm]=useState(false);
 const recorded=useRef(new Set());
 const submittedToServer=useRef(new Set());
 const [savedServerId,setSavedServerId]=useState(null);
 const exam=attempt.phase==="exam",review=attempt.phase==="review";
 const question=paper.questions[Math.max(0,Math.min(4,attempt.index||0))];
 const rubricReview=useMemo(()=>reviewPobPaper2(attempt.answers,paper),[attempt.answers,paper]);
 const completion=pobPaper2Completion(paper.questions,attempt.answers);
 const answered=completion.reduce((sum,row)=>sum+row.answered,0);
 const nextIncomplete=nextIncompletePobQuestion(paper.questions,attempt.answers,attempt.index||0);
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
   const id=attempt.serverAttemptId;
   if(!serverBacked||!review||!id||!supabase?.rpc||submittedToServer.current.has(id))return;
   submittedToServer.current.add(id);
   let active=true;
   submitServerExamAttempt({supabase,attemptId:id,responses:attempt.answers,
     score:null,maxScore:100,metadata:historicalCanary
       ?{paper_id:paper.id,source_sha256:paper.sourceSha256,source:"historical-cxc",grading_status:"server-pending"}
       :{paper_id:paper.id,source:"spark-original",grading_status:"server-pending"}})
     .then(result=>{if(active&&result.available)setSavedServerId(id);if(!result.available)submittedToServer.current.delete(id);})
     .catch(()=>{submittedToServer.current.delete(id);});
   return()=>{active=false;};
 },[serverBacked,historicalCanary,review,attempt.serverAttemptId,attempt.answers,supabase,paper.id,paper.sourceSha256]);
 useEffect(()=>{
   if(historical||!review||!userId||!supabase?.rpc||recorded.current.has(attempt.attemptId))return;
   recorded.current.add(attempt.attemptId);
   recordSubjectActivity({supabase,activity:{
     subjectId:SUBJECT,activityKey:"practice:pob-paper2:"+paper.id+":"+attempt.attemptId,
     activityType:"exam",title:"Principles of Business: Original Paper 02",
     completed:true,score:null,maxScore:100,percent:null,
     metadata:{source:"spark-original",historical:false,paper:"02",answered_parts:answered,
       duration_minutes:120,marking_status:"not-automatically-graded"}
   }}).catch(()=>recorded.current.delete(attempt.attemptId));
 },[historical,review,userId,supabase,attempt.attemptId,answered,paper.id]);
 const start=async()=>{
   setSavedServerId(null);
   setRemaining(120*60);
   const active={...startState(paper.id),phase:"exam",deadline:Date.now()+(paper.timeLimitMinutes||120)*60*1000};
   setAttempt(active);
   if(!serverBacked)return; // Unapproved historical sitting stays offline and unscored.
   const saved=await startServerExamAttempt({supabase,subjectId:SUBJECT,paper:"02",
     durationSeconds:7200,bankVersion:historicalCanary?paper.bankVersion:paper.id,
     rubricVersion:historicalCanary?"pob-historical-2026-jan-p2-rubric-v1":"pob-original-p2-rubric-v1",
     graderVersion:"online-v1",metadata:historicalCanary
       ?{paper_id:paper.id,source_sha256:paper.sourceSha256,source:"historical-cxc"}
       :{paper_id:paper.id,source:"spark-original"}});
   if(saved.available)setAttempt(old=>old.attemptId===active.attemptId?{...old,serverAttemptId:saved.attempt_id}:old);
 };
 const finish=()=>{update({phase:"review",submittedAt:Date.now()});setConfirm(false)};
 return <main className="pob-exam"><div className="pob-exam-shell">
  <div className="pob-exam-nav"><button type="button" onClick={onBack}>← Practice home</button><span>CSEC PRINCIPLES OF BUSINESS · PAPER 02</span></div>
  {attempt.phase==="instructions"?<section className="pob-exam-card pob-exam-intro">
   <span className="pob-exam-kicker">{historical?"HISTORICAL CXC SOURCE · UNSCORED PREVIEW":"SPARK ORIGINAL STRUCTURED PRACTICE"}</span><h1>{historical?paper.title:"Paper 2: Business decisions"}</h1>
   <p>Five compulsory 20-mark questions, 100 marks, 2 hours. Read each business scenario carefully and use complete sentences, calculations and relevant Caribbean examples.</p>
   <p>{historical?(historicalCanary?"This historical sitting is eligible for a limited server-side practice marking check. SPARK saves your responses locally and requests two automated rubric assessments only when the trusted server authorizes the attempt. Any result is a practice estimate, not an official CXC grade.":"This is a transcription-based preview of an original historical paper. SPARK saves your responses locally and displays its internally proposed answer guidance. No numerical score, official CXC mark or live grading job is created until this sitting passes calibration."):"SPARK saves your responses on this device and shows the marking scheme after submission. Where online marking is enabled, SPARK also checks written answers against the rubric using two independent automated passes. Uncertain results are shown as ranges rather than guessed grades."}</p>
   <button type="button" className="pob-primary" onClick={start}>Start Paper 2</button></section>:<>
   <header className="pob-exam-card pob-exam-status"><div><strong>{review?"Paper 2 submitted":"Paper 2 in progress"}</strong><span>{answered} of {paper.questions.reduce((n,q)=>n+q.items.length,0)} parts answered</span></div><span className="pob-timer" role="timer">{review?"Review":clock(remaining)}</span></header>

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
       {review&&checkPobCalculation(id,attempt.answers[id])&&<div className="pob-p2-calculation" role="status"><strong>Calculation check</strong><p>{checkPobCalculation(id,attempt.answers[id]).message}</p><p>Expected calculation: {checkPobCalculation(id,attempt.answers[id]).working}</p>{inspectPobCalculationEvidence(id,attempt.answers[id])&&<div className="pob-p2-method-check">
         <strong>Method evidence</strong>
         <p>{inspectPobCalculationEvidence(id,attempt.answers[id]).expectedOperationShown
           ?"Your written working includes the expected operation and numbers."
           :"The expected calculation method was not clearly identified in your response."}</p>
         <p>{inspectPobCalculationEvidence(id,attempt.answers[id]).methodGuidance}</p>
       </div>}
       <small>These are diagnostic checks, not marks. Your explanations, units and full rubric still require assessment.</small></div>}
       {review&&inspectPobShortAnswer(id,attempt.answers[id])&&<div className="pob-p2-calculation">
         <strong>Written-answer concept check</strong>
         <p>{inspectPobShortAnswer(id,attempt.answers[id]).message}</p>
         {inspectPobShortAnswer(id,attempt.answers[id]).observed.length>0&&<p>Possible concepts identified: {inspectPobShortAnswer(id,attempt.answers[id]).observed.join("; ")}.</p>}
         {inspectPobShortAnswer(id,attempt.answers[id]).notIdentified.length>0&&<p>Check whether your response addresses: {inspectPobShortAnswer(id,attempt.answers[id]).notIdentified.join("; ")}.</p>}
         <small>Unrecognised wording may still be correct. No marks are assigned by this check.</small>
       </div>}
       {review&&inspectPobExtendedResponse(id,attempt.answers[id])&&<div className="pob-p2-calculation">
         <strong>Extended-answer writing review</strong>
         <p>{inspectPobExtendedResponse(id,attempt.answers[id]).message}</p>
         <ul>{inspectPobExtendedResponse(id,attempt.answers[id]).checks.map((check,i)=><li key={i}>{check.label}: {check.seen?"Possible evidence identified":"Review whether your answer addresses this"}</li>)}</ul>
         {inspectPobExtendedResponse(id,attempt.answers[id]).guidance&&<p>{inspectPobExtendedResponse(id,attempt.answers[id]).guidance}</p>}
         <small>Hints only. Equivalent responses may use different language. No marks are awarded.</small>
       </div>}
       {review&&rubricReview.questions.flatMap(q=>q.parts).find(part=>part.id===id)?.status==="graded-listing"&&<div className="pob-p2-calculation" role="status"><strong>Automatically checked listing question</strong><p>{rubricReview.questions.flatMap(q=>q.parts).find(part=>part.id===id)?.assessedMarks} of {item.marks} marks based on distinct valid terms. Only listing questions use this automatic rule.</p></div>}
       {review&&rubricReview.questions.flatMap(q=>q.parts).find(part=>part.id===id)?.status==="partially-graded-calculation"&&<div className="pob-p2-calculation" role="status"><strong>Verified calculation result: 1 mark</strong><p>Your working, final result and unit/context match the numerical-result criterion. Other method, explanation and interpretation marks are still pending assessment. This is not a final part or paper score.</p></div>}
       {review&&<details className="pob-p2-criteria"><summary>{historical?"View provisional SPARK answer guidance (not graded)":"View SPARK marking guidance"}</summary>
         <p>{item.modelAnswer}</p>
         <ul>{item.criteria.map((criterion,i)=><li key={i}><strong>{criterion.marks} mark{criterion.marks===1?"":"s"}</strong>: {criterion.rule} {assessPobPartEvidence(id,attempt.answers[id])?.signals[i]?.matched?"(Possible supporting concept found; not graded)":""}</li>)}</ul>
         {getPobP2FeedbackGuide(id)&&<div className="pob-p2-guide"><strong>How to strengthen your response</strong><p>{getPobP2FeedbackGuide(id).guidance}</p><strong>Common mistakes</strong><ul>{getPobP2FeedbackGuide(id).pitfalls.map((point,i)=><li key={i}>{point}</li>)}</ul><strong>Acceptable approaches</strong><ul>{getPobP2FeedbackGuide(id).alternatives.map((point,i)=><li key={i}>{point}</li>)}</ul></div>}
         <small>Other equivalent correct explanations may also deserve credit. {historical?"This is an internally authored draft, not an official CXC scheme or a grade.":"This is marking guidance, not a final automatically assigned grade."}</small>
       </details>}
     </div>;
   })}
   <div className="pob-exam-controls"><button type="button" className="secondary" disabled={question.number===1} onClick={()=>update({index:question.number-2})}>Previous</button>
   <button type="button" className="pob-primary" disabled={question.number===5} onClick={()=>update({index:question.number})}>Next question</button></div>
   {!review&&<button type="button" className="pob-primary pob-exam-submit" onClick={()=>setConfirm(true)}>Submit Paper 2</button>}
   {review&&<button type="button" className="secondary" onClick={()=>setAttempt(startState(paper.id))}>Start another attempt</button>}
   </section>
   {review&&savedServerId&&<ServerMarkingReview supabase={supabase} attemptId={savedServerId} autoStart/>}
   {review&&<section className="pob-exam-card pob-review-note"><h2>Response review</h2><p><strong>Rubric coverage:</strong> {rubricReview.answeredParts} of {rubricReview.totalParts} responses submitted. {rubricReview.availableMarks} marks available. {rubricReview.markStatus==="unanswered"?"No written responses were supplied.":rubricReview.confirmedMarks+" marks have been verified on strict listing or calculation-result criteria. Remaining written criteria require reliable subject-aware assessment; no final Paper 2 grade has been assigned."}</p><p>Question overview: select an incomplete or answered question above to review your work and the marking criteria.</p><ol>{paper.questions.map(q=>{const completed=q.items.filter(part=>String(attempt.answers[q.id+":"+part.id]||"").trim()).length;return <li key={q.id}>Question {q.number}: {completed} of {q.items.length} parts answered, {q.marks} marks available</li>})}</ol><p>Your answers have been preserved in this browser. The mark-by-mark criteria show what a complete answer should demonstrate. No score has been invented for free-text responses.</p></section>}
   {confirm&&!review&&<div className="pob-confirm-overlay"><div className="pob-exam-card pob-confirm" role="dialog" aria-modal="true" aria-label="Confirm Paper 2 submission">
    <h2>Finish Paper 2?</h2><p>{answered} of {paper.questions.reduce((n,q)=>n+q.items.length,0)} parts have responses. You can view the model answers and criteria after submitting.</p>
    <div className="pob-exam-controls"><button type="button" className="secondary" onClick={()=>setConfirm(false)}>Keep working</button>
    <button type="button" className="pob-primary" onClick={finish}>Submit responses</button></div>
   </div></div>}
  </>}
 </div></main>;
}

const POB_2026_HISTORICAL_PREVIEW=buildPob2026JanHistoricalPaper();
const POB_2026_HISTORICAL_PREVIEW_VALID=verifyPob2026JanHistoricalPaper(POB_2026_HISTORICAL_PREVIEW).valid;

export default function PobPracticeHub({userId,supabase,onBack}){
 const [mode,setMode]=useState("home");
 if(mode==="paper1")return <PobPaper1Exam userId={userId} supabase={supabase} onBack={()=>setMode("home")}/>;
 if(mode==="specimen"||mode==="specimenFull")return <PobPaper1Exam paperOverride={POB_CXC_2019_SPECIMEN_P1_FULL} userId={userId} supabase={supabase} onBack={()=>setMode("home")}/>;
 if(mode==="paper2")return <PobPaper2Exam userId={userId} supabase={supabase} onBack={()=>setMode("home")}/>;
 if(mode==="historical2026janp2"&&POB_2026_HISTORICAL_PREVIEW_VALID)return <PobPaper2Exam paperOverride={POB_2026_HISTORICAL_PREVIEW} userId={userId} supabase={supabase} onBack={()=>setMode("home")}/>;
 if(mode==="archive")return <PobHistoricalArchive userId={userId} supabase={supabase} onBack={()=>setMode("home")} onOpenJanuary2026={()=>setMode("historical2026janp2")}/>;
 if(mode==="sba")return <PobSbaWorkspace onBack={()=>setMode("home")}/>;
 return <main className="pob-exam"><div className="pob-exam-shell">
   {onBack&&<div className="pob-exam-nav"><button type="button" onClick={onBack}>← Choose another subject</button></div>}
   <header className="pob-exam-card pob-exam-intro"><span className="pob-exam-kicker">SPARK CSEC PRINCIPLES OF BUSINESS</span>
     <h1>Practise business thinking</h1><p>Take a full timed practice paper, work through business scenarios or plan your SBA research. Original questions are clearly labelled. The January 2026 historical Paper 2 supports experimental AI-assisted marking, and the wider historical archive provides written-answer guidance and Paper 1 answer-sheet practice.</p></header>
   <div className="pob-practice-options">
    <article className="pob-exam-card"><small>60 questions · 75 minutes</small><h2>Paper 1</h2><p>Original multiple-choice practice across all ten syllabus sections with instant explanations after submission.</p><button type="button" className="pob-primary" onClick={()=>setMode("paper1")}>Open Paper 1</button></article>
    <article className="pob-exam-card"><small>60 questions · 75 minutes · one complete examination</small><h2>2019 CXC specimen Paper 1</h2><p>Complete the original 60-question specimen in one timed sitting, using the same question navigator and review as SPARK's other subjects. Marking follows the published specimen key; disputed answers are identified and excluded from the uncontested learning score.</p><button type="button" className="pob-primary" onClick={()=>setMode("specimenFull")}>Start 2019 specimen Paper 1</button></article>
    <article className="pob-exam-card"><small>5 compulsory questions · 120 minutes</small><h2>Paper 2</h2><p>Original business scenarios, written-response space and detailed marking criteria. Where secure online marking is enabled, extended responses receive rubric-based automated practice assessment.</p><button type="button" className="pob-primary" onClick={()=>setMode("paper2")}>Open Paper 2</button></article>
    {POB_2026_HISTORICAL_PREVIEW_VALID&&<article className="pob-exam-card"><small>January 2026 · 5 original questions · 32 parts · 120 minutes</small><h2>Historical Paper 2 · January 2026</h2><p>Practise the original 2026 questions and case studies in a timed examination. Write original source questions and receive AI-assisted practice marking through the secure SPARK grading pilot. Results are practice estimates, not official CXC marks.</p><button type="button" className="pob-primary" onClick={()=>setMode("historical2026janp2")}>Preview historical Paper 2</button></article>}
    <article className="pob-exam-card"><small>46 historical sources · 20 Paper 1 · 26 Paper 2</small><h2>Historical Paper Archive</h2><p>Browse every supplied sitting. Practise historical Paper 1 answer sheets with provisional scoring, review historical Paper 2 written marking schemes, and open the scored January 2026 examination. Source gaps and unverified question wording are labelled clearly.</p><button type="button" className="pob-primary" onClick={()=>setMode("archive")}>Browse all 46 historical papers</button></article>
    <article className="pob-exam-card"><small>Research project · 40 marks</small><h2>Business research SBA</h2><p>Plan your research, draft report sections and review the official 40-mark criteria without inventing grades.</p><button type="button" className="pob-primary" onClick={()=>setMode("sba")}>Open research workspace</button></article>
   </div>
 </div></main>;
}
