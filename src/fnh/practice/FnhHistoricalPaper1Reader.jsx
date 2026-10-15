import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import React,{useEffect,useMemo,useState} from "react";
import {fnhHistoricalPaper1Reader} from "../data/fnhHistoricalPaper1ReleaseGate";
import FnhPaper1HistoricalDiagram from "./FnhPaper1HistoricalDiagram";
import "./fnhHistoricalPaper1Reader.css";

const CHOICES=["A","B","C","D"];
const storageKey=(id,userId)=>"spark:fnh:historical-p1:source-reader:"+(userId||"guest")+":"+id;
function readSaved(id,userId){
 try{
  const raw=JSON.parse(localStorage.getItem(storageKey(id,userId))||"{}");
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return {};
  return Object.fromEntries(Object.entries(raw).filter(([n,a])=>
   /^\d{1,2}$/.test(n)&&Number(n)>=1&&Number(n)<=60&&CHOICES.includes(a)));
 }catch{return {};}
}
export default function FnhHistoricalPaper1Reader({sourceId,userId,onBack}){
 const source=useMemo(()=>fnhHistoricalPaper1Reader(sourceId),[sourceId]);
 const [selected,setSelected]=useState(()=>readSaved(sourceId,userId));
 const [position,setPosition]=useState(0);
 const questions=source?.questions||[];
 const question=questions[position];
 const answered=questions.filter(q=>CHOICES.includes(selected[q.number])).length;
 useEffect(()=>{
  setSelected(readSaved(sourceId,userId));
  setPosition(0);
 },[sourceId,userId]);
 useEffect(()=>{
  try{localStorage.setItem(storageKey(sourceId,userId),JSON.stringify(selected));}catch{}
 },[sourceId,userId,selected]);
 useEffect(()=>{
  try{window.scrollTo?.({top:0,left:0,behavior:"instant"});}catch{}
 },[sourceId,position]);
 const choose=value=>setSelected(old=>({...old,[question.number]:value}));
 const clear=()=>setSelected(old=>{
  const next={...old};
  delete next[question.number];
  return next;
 });
 const nextUnanswered=()=>{
  const next=questions.findIndex((q,i)=>i>position&&!selected[q.number]);
  const wrap=questions.findIndex(q=>!selected[q.number]);
  setPosition(next>=0?next:wrap>=0?wrap:position);
 };
 if(!source)return <main className="fnh-exam fnh-source-reader">
  <div className="fnh-exam-container">
   <button type="button" className="fnh-outline" onClick={onBack}><BackArrowIcon/> Back to historical papers</button>
   <section className="fnh-exam-card"><h1>Source not available for review</h1>
    <p>The supplied file has not passed the source identity and question-content checks.</p></section>
  </div>
 </main>;
 return <main className="fnh-exam fnh-source-reader"><div className="fnh-exam-container">
  <div className="fnh-exam-top"><button type="button" className="fnh-outline" onClick={onBack}><BackArrowIcon/> Back to Paper 1 sources</button>
   <span>{source.year} · Historical question review</span>
  </div>
  <header className="fnh-exam-card fnh-source-reader-header">
   <small>{source.qualification.toUpperCase()} · {source.paperTitle.toUpperCase()}</small>
   <h1>{source.year} Paper 1: Question review</h1>
   <p>Practise the questions at your own pace. Your choices are saved on this device. This paper does not currently provide scored results.</p>
   
   <div className="fnh-source-reader-statline">
    <span>{questions.length} questions available to review</span>
    <span>{answered} selections saved</span>
    <span>Practice mode</span>
   </div>
   {(source.excludedNumbers.length>0||source.missingSourceQuestions.length>0)&&
    <div className="fnh-source-reader-note" role="note">
     {source.excludedNumbers.length>0&&<p>Some questions are unavailable:
      {" "}{source.excludedNumbers.join(", ")}.</p>}
     {source.missingSourceQuestions.length>0&&<p>Questions unavailable:
      {" "}{source.missingSourceQuestions.join(", ")}.</p>}
    </div>}
  </header>
  {question&&<div className="fnh-source-reader-layout">
   <section className="fnh-exam-card fnh-source-reader-question" aria-labelledby="fnh-source-question-title">
    <div className="fnh-source-reader-overline"><span>Original Question {question.number} of {source.sourceQuestionCount}</span>
     {question.sourcePage&&<span>Supplied PDF page {question.sourcePage}</span>}</div>
    <h2 id="fnh-source-question-title" className="fnh-source-reader-stem">{question.stem}</h2>
    {question.diagramId&&<FnhPaper1HistoricalDiagram type={question.diagramId}/>}
    {question.sourceContext&&<p className="fnh-source-reader-context">{question.sourceContext}</p>}
    <fieldset className="fnh-source-reader-options">
     <legend>Choose your answer</legend>
     {question.options.map((option,index)=>{
      const letter=CHOICES[index];
      return <label key={letter} className={selected[question.number]===letter?"is-selected":""}>
       <input type="radio" name={"fnh-source-"+sourceId+"-"+question.number}
        checked={selected[question.number]===letter} onChange={()=>choose(letter)}/>
       <span className="fnh-source-reader-letter" aria-hidden="true">{letter}</span>
       <span>{option}</span>
      </label>;
     })}
    </fieldset>
    <div className="fnh-source-reader-navigation">
     <button type="button" className="fnh-outline" disabled={position===0}
      onClick={()=>setPosition(n=>Math.max(0,n-1))}><BackArrowIcon/> Previous</button>
     <button type="button" className="fnh-outline" disabled={!selected[question.number]} onClick={clear}>
      Clear choice
     </button>
     <button type="button" className="fnh-primary" disabled={position>=questions.length-1}
      onClick={()=>setPosition(n=>Math.min(questions.length-1,n+1))}>Next question <ForwardArrowIcon/></button>
    </div>
    <p className="fnh-source-reader-footnote">
     This paper is for question practice only. Selections do not affect your scores or progress report.
    </p>
   </section>
   <aside className="fnh-exam-card fnh-source-reader-navigator" aria-label="Question navigation">
    <div className="fnh-source-reader-nav-head"><h2>Questions</h2>
     <span>{answered}/{questions.length} selected</span></div>
    <button type="button" className="fnh-outline" disabled={answered===questions.length}
     onClick={nextUnanswered}>Next unanswered</button>
    <div className="fnh-source-reader-nav-grid">
     {questions.map((q,i)=><button type="button" key={q.number}
      className={(i===position?"active ":"")+(selected[q.number]?"answered":"")}
      aria-current={i===position?"step":undefined}
      aria-label={"Go to question "+q.number+(selected[q.number]?", selected":"")}
      onClick={()=>setPosition(i)}>{q.number}</button>)}
    </div>
    <p>Outlined: selected. Filled: current question.</p>
   </aside>
  </div>}
 </div></main>;
}
