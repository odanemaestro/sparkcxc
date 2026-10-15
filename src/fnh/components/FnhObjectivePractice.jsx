import React,{useMemo,useState} from "react";
import {FNH_OBJECTIVES} from "../data/fnhCourse";
import "./fnhObjectivePractice.css";

export default function FnhObjectivePractice({topic}){
  const codes=topic?.metadata?.syllabus?.objectiveCodes||[];
  const prompts=useMemo(()=>FNH_OBJECTIVES.filter(row=>codes.includes(row.code)),[codes.join("|")]);
  const [index,setIndex]=useState(0);
  const [response,setResponse]=useState("");
  const [show,setShow]=useState(false);
  const current=prompts[Math.min(index,prompts.length-1)];
  const select=next=>{setIndex(next);setResponse("");setShow(false);};
  if(!current)return null;
  return <section id="fnh-lesson-reflect" className="fnh-objective-practice" aria-label="Check your FNH understanding">
    <div className="fnh-objective-practice-head">
      <div><small>PRACTISE WITH YOUR TEACHER</small><h3>Can you explain this objective?</h3></div>
      <span>{index+1} / {prompts.length}</span>
    </div>
    <p className="fnh-objective-practice-code">{current.code} · {current.objective}</p>
    <p className="fnh-objective-practice-question">{current.question}</p>
    <label>Write your answer
      <textarea rows={4} value={response} onChange={e=>setResponse(e.target.value)}
        placeholder="Try answering in your own words before checking the explanation."/>
    </label>
    {show&&<div className="fnh-objective-practice-answer" aria-label="Model explanation">
      <h4>What a strong answer should explain</h4>
      <p>{current.explanation}</p>
      <p><strong>Caribbean example:</strong> {current.example}</p>
      <small>Compare the main ideas with what you wrote. This practice does not award examination marks.</small>
    </div>}
    <div className="fnh-objective-practice-controls">
      <button type="button" className="fnh-objective-practice-secondary"
        disabled={index===0} onClick={()=>select(index-1)}>Previous objective</button>
      <button type="button" className="fnh-objective-practice-primary"
        onClick={()=>setShow(v=>!v)}>{show?"Hide explanation":"Check answer"}</button>
      <button type="button" className="fnh-objective-practice-secondary"
        disabled={index===prompts.length-1} onClick={()=>select(index+1)}>Next objective</button>
    </div>
  </section>;
}
