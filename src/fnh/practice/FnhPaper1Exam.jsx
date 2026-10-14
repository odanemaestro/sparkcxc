import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {FNH_PAPER1_FORMAT,fnhGetPaper1Set} from "../data/fnhPaper1Bank";
import "./fnhPractice.css";


const SECONDS=FNH_PAPER1_FORMAT.minutes*60;
const storeKey=(userId,paperId)=>`spark:fnh:paper1:${userId||"guest"}:${paperId}`;
const time=s=>[Math.floor(s/3600),Math.floor((s%3600)/60),s%60].map(v=>String(Math.max(0,v)).padStart(2,"0")).join(":");
const goTop=()=>{try{window.scrollTo?.({top:0,left:0,behavior:"instant"});}catch{}};
const makeNew=paperId=>({paperId,attemptId:`${Date.now()}-${Math.random().toString(36).slice(2)}`,
  phase:"instructions",answers:{},flags:{},index:0,deadline:null,submittedAt:null});

export default function FnhPaper1Exam({supabase,userId,onBack,setNumber=1}){
  const selected=fnhGetPaper1Set(setNumber);
  const paperId=`FNH-SPARK-P1-ORIGINAL-0${selected.number}`;
  const questions=selected.questions;
  const [attempt,setAttempt]=useState(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem(storeKey(userId,paperId))||"null");
      return saved?.paperId===paperId&&["exam","review"].includes(saved.phase)?saved:makeNew(paperId);
    }catch{return makeNew(paperId);}
  });
  const [clock,setClock]=useState(SECONDS);
  const [modal,setModal]=useState("");
  const reported=useRef(new Set());

  const index=Math.min(questions.length-1,Math.max(0,Number(attempt.index)||0));
  const current=questions[index];
  const review=attempt.phase==="review";
  const exam=attempt.phase==="exam";
  const score=useMemo(()=>questions.reduce((n,q)=>n+Number(Boolean(attempt.answers[q.id])&&attempt.answers[q.id]===q.answer),0),[questions,attempt.answers]);
  const answered=questions.filter(q=>Boolean(attempt.answers[q.id])).length;
  const flagged=questions.filter(q=>Boolean(attempt.flags[q.id])).length;
  const change=patch=>setAttempt(old=>({...old,...patch}));
  useEffect(()=>{
    try{localStorage.setItem(storeKey(userId,paperId),JSON.stringify(attempt));}catch{}
  },[attempt,userId,paperId]);
  useEffect(()=>{
    if(!exam)return undefined;
    const tick=()=>{
      const left=Math.max(0,Math.ceil((Number(attempt.deadline)-Date.now())/1000));
      setClock(left);
      if(left<=0)change({phase:"review",submittedAt:Date.now()});
    };
    tick();
    const t=setInterval(tick,1000);
    return()=>clearInterval(t);
  },[exam,attempt.deadline]);
  useEffect(()=>{goTop();},[index,attempt.phase]);
  useEffect(()=>{
    if(!review||!userId||!supabase?.rpc||reported.current.has(attempt.attemptId))return;
    reported.current.add(attempt.attemptId);
    recordSubjectActivity({supabase,activity:{
      subjectId:"food-nutrition-and-health",activityKey:`exam:fnh-paper1:${paperId}:${attempt.attemptId}`,
      activityType:"exam",title:`Food, Nutrition and Health Paper 01 · ${selected.label}`,
      completed:true,score,maxScore:questions.length,percent:Math.round(100*score/questions.length),
      metadata:{source:"fnh_paper1_original_v1",paper:"01",paper_id:paperId,
        question_count:60,duration_minutes:90,source_verified:true,historical:false,
        profile_knowledge:30,profile_use_of_knowledge:30,at:new Date().toISOString()},
    }}).catch(error=>console.warn("FNH Paper 1 progress could not be saved",error));
  },[review,attempt.attemptId,questions.length,score,supabase,userId,paperId,selected.label]);
  const begin=()=>{
    setModal("");
    setClock(SECONDS);
    setAttempt({...makeNew(paperId),phase:"exam",deadline:Date.now()+SECONDS*1000});
  };
  const submit=()=>{change({phase:"review",submittedAt:Date.now()});setModal("");};
  const selected=q=>attempt.answers[q.id];
  const answer=q=>q.options["ABCD".indexOf(q.answer)]||"";
  return <main className="fnh-exam">
    <div className="fnh-exam-container">
      <div className="fnh-exam-top">
        <button type="button" className="fnh-outline" onClick={()=>exam?setModal("exit"):onBack?.()}>← {exam?"Exit examination":"Back to paper selection"}</button>
        <span>CSEC FOOD, NUTRITION AND HEALTH · PAPER 01</span>
      </div>
      {attempt.phase==="instructions"?<section className="fnh-exam-card fnh-instructions">
        <small>ORIGINAL PRACTICE SET {selected.number}</small>
        <h1>Paper 1 examination instructions</h1>
        <p>Read the instructions carefully. Your time starts when you select <strong>Start examination</strong>.</p>
        <div className="fnh-exam-stats"><div><strong>60</strong><span>Questions</span></div><div><strong>90 minutes</strong><span>Duration</span></div><div><strong>60 marks</strong><span>Total marks</span></div><div><strong>4 choices</strong><span>Per question</span></div></div>
        <h2>Instructions to candidates</h2>
        <ol>
          <li>Answer all 60 multiple-choice questions. Choose one best answer for each item.</li>
          <li>Each correct response earns one mark. There is no negative marking.</li>
          <li>Use the question navigator and Flag for review to revisit questions.</li>
          <li>Use the space and time wisely. Read all four options before answering.</li>
          <li>Your answers and deadline are saved on this device while the examination is running.</li>
          <li>The examination submits automatically when the 90-minute period ends.</li>
          <li>After submission, review your chosen answer, the correct choice and the explanation.</li>
        </ol>
        <p className="fnh-exam-note">This is an original SPARK practice examination, not an official CXC past paper.</p>
        <button type="button" className="fnh-primary" onClick={begin}>Start examination</button>
      </section>:<div className="fnh-session">
        <header className="fnh-exam-card fnh-session-heading">
          <div><small>{review?"SUBMITTED · ANSWER REVIEW":"PAPER 01 · LIVE PRACTICE"}</small><h1>Food, Nutrition and Health</h1><p>{review?`Your result: ${score} / 60`:`Question ${index+1} of 60 · Answered ${answered}/60 · Flagged ${flagged}`}</p></div>
          <div className="fnh-timer" role="timer" aria-live="off"><span>{review?"Completed":"Time remaining"}</span><strong>{review?`${Math.round(score/60*100)}%`:time(clock)}</strong></div>
        </header>
        <div className="fnh-exam-layout">
          <section className="fnh-exam-card fnh-question" aria-label="Question">
            <div className="fnh-question-head"><h2>Question {index+1} of 60</h2>{exam&&<button type="button" className="fnh-outline" aria-pressed={Boolean(attempt.flags[current.id])} onClick={()=>change({flags:{...attempt.flags,[current.id]:!attempt.flags[current.id]}})}>{attempt.flags[current.id]?"Flagged":"Flag for review"}</button>}</div>
            <p className="fnh-question-stem">{current.stem}</p>
            <fieldset disabled={review} className="fnh-answer-options"><legend>Select one answer</legend>{current.options.map((option,i)=>{
              const letter="ABCD"[i],chosen=selected(current)===letter;
              return <label key={letter} className={`fnh-option ${review&&current.answer===letter?"correct":""} ${review&&chosen&&letter!==current.answer?"incorrect":""}`}>
                <input type="radio" name={current.id} value={letter} checked={chosen} onChange={()=>change({answers:{...attempt.answers,[current.id]:letter}})}/><b>{letter}.</b> <span>{option}</span>
              </label>;
            })}</fieldset>
            {review&&<section className="fnh-review-details" aria-label="Answer review">
              <div><strong>Your answer</strong><p>{selected(current)?`${selected(current)}. ${current.options["ABCD".indexOf(selected(current))]}`:"Not answered"}</p></div>
              <div><strong>Correct answer</strong><p>{current.answer}. {answer(current)}</p></div>
              <div className="fnh-review-explanation"><strong>Explanation</strong><p>{current.explanation}</p><small>Syllabus objective: {current.objectiveCode}</small></div>
            </section>}
            <div className="fnh-question-actions">
              <button type="button" className="fnh-outline" disabled={index===0} onClick={()=>change({index:index-1})}>Previous</button>
              <button type="button" className="fnh-outline" disabled={index===59} onClick={()=>change({index:index+1})}>Next</button>
              {exam&&<button type="button" className="fnh-primary" onClick={()=>setModal("submit")}>Submit Paper 1</button>}
              {review&&<button type="button" className="fnh-primary" onClick={()=>setModal("restart")}>Start new attempt</button>}
            </div>
          </section>
          <aside className="fnh-exam-card fnh-navigation" aria-label="Question navigator">
            <h2>Questions</h2><p>{answered} answered · {flagged} flagged</p>
            <div className="fnh-nav-grid">{questions.map((q,i)=><button type="button" key={q.id} className={`${index===i?"active":""} ${selected(q)?"answered":""} ${attempt.flags[q.id]?"flagged":""}`} aria-label={`Question ${i+1}${selected(q)?" answered":""}`} aria-current={index===i?"step":undefined} onClick={()=>change({index:i})}>{i+1}</button>)}</div>
          </aside>
        </div>
      </div>}
      {modal&&<div className="fnh-modal-layer"><section className="fnh-modal" role="dialog" aria-modal="true" aria-label={modal==="exit"?"Exit examination":modal==="submit"?"Submit examination":"Restart examination"}>
        <h2>{modal==="exit"?"Save and exit?":modal==="submit"?"Submit this examination?":"Start a new attempt?"}</h2>
        <p>{modal==="exit"?"Your answers and remaining time will be saved until the deadline.":modal==="submit"?"You will no longer be able to change your responses.":"A new attempt will clear the saved answers from this device."}</p>
        <div><button type="button" className="fnh-outline" onClick={()=>setModal("")}>Cancel</button><button type="button" className="fnh-primary" onClick={()=>modal==="exit"?onBack?.():modal==="submit"?submit():begin()}>{modal==="exit"?"Save and exit":modal==="submit"?"Submit now":"Start new attempt"}</button></div>
      </section></div>}
    </div>
  </main>;
}
