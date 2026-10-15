import React,{useState} from "react";
import {fnhMarkStudyPractice,fnhPracticeAnswerText,fnhStudyPracticeForTopic} from "../data/fnhStudyPracticeBank";
import "./fnhStudyPractice.css";

// These questions are student study checks, NOT official scored examinations.
// Results are intentionally local to this lesson component: no RPC, parent
// report, progress notification, exam score or unverified CXC answer key.
const letters=["A","B","C","D"];
const initialResponse=question=>question?.type==="multi"?[]:
  question?.type==="order"?["C","A","D","B"]:
  question?.type==="number"?"":null;

export default function FnhStudyPractice({topicId}){
 const questions=fnhStudyPracticeForTopic(topicId);
 const [index,setIndex]=useState(0);
 const [responses,setResponses]=useState({});
 const [checks,setChecks]=useState({});
 const [hintVisible,setHintVisible]=useState({});
 const current=questions[index];
 if(!current)return null;
 const response=Object.prototype.hasOwnProperty.call(responses,current.id)
   ?responses[current.id]:initialResponse(current);
 const checked=checks[current.id]||null;
 const completed=questions.filter(q=>Boolean(checks[q.id])).length;
 const correct=fnhMarkStudyPractice(current,response);
 const setResponse=value=>setResponses(prev=>({...prev,[current.id]:value}));
 const toggleMulti=letter=>setResponse(response.includes(letter)
   ?response.filter(value=>value!==letter):[...response,letter]);
 const move=(at,direction)=>{
  const to=at+direction;
  if(to<0||to>=response.length)return;
  const next=[...response];[next[at],next[to]]=[next[to],next[at]];
  setResponse(next);
 };
 const hasResponse=current.type==="multi"?response.length>0
  :current.type==="order"?response.length===4
  :current.type==="number"?String(response).trim().length>0
  :Boolean(response);
 const check=()=>{if(hasResponse&&!checked)setChecks(prev=>({...prev,[current.id]:{correct}}));};
 const retry=()=>{
  setResponses(prev=>({...prev,[current.id]:initialResponse(current)}));
  setChecks(prev=>{const next={...prev};delete next[current.id];return next;});
  setHintVisible(prev=>({...prev,[current.id]:false}));
 };
 const changeQuestion=next=>setIndex(Math.max(0,Math.min(questions.length-1,next)));
 const resetAll=()=>{setResponses({});setChecks({});setHintVisible({});setIndex(0);};
 return <section id="fnh-lesson-practice" className="fnh-study-practice" aria-label="Interactive FNH lesson questions">
  <header className="fnh-study-practice-heading">
    <div><small>INTERACTIVE EXAM PRACTICE</small><h3>Try it like a CSEC candidate</h3>
      <p>Original SPARK questions inspired by past-paper topics and wording. Practise, check the reason, and try again.</p></div>
    <span className="fnh-study-practice-position">{index+1} / {questions.length}</span>
  </header>
  <div className="fnh-study-practice-progress" aria-label={`${completed} of ${questions.length} checked`}>
    {questions.map((q,i)=><button type="button" key={q.id}
      aria-label={`Go to practice question ${i+1}${checks[q.id]?", reviewed":""}`}
      aria-current={index===i?"step":undefined}
      className={`${index===i?"current":""} ${checks[q.id]?"reviewed":""}`}
      onClick={()=>changeQuestion(i)}>{i+1}</button>)}
    <span>{completed} reviewed</span>
  </div>
  <div className="fnh-study-practice-question">
    <div className="fnh-study-practice-meta">
      <span>{current.type==="multi"?"SELECT ALL THAT APPLY":
        current.type==="order"?"PUT IN ORDER":
        current.type==="number"?"WORK IT OUT":"CHOOSE ONE ANSWER"}</span>
      <span>Question {index+1}</span>
    </div>
    <h4>{current.prompt}</h4>
    {current.type==="single"&&<fieldset className="fnh-study-practice-options">
      <legend>Choose the best answer</legend>
      {current.options.map((text,i)=><label key={letters[i]} className={response===letters[i]?"selected":""}>
        <input type="radio" name={`fnh-study-${topicId}-${current.id}`} value={letters[i]}
          checked={response===letters[i]} disabled={Boolean(checked)}
          onChange={()=>setResponse(letters[i])}/>
        <b aria-hidden="true">{letters[i]}.</b><span>{text}</span>
      </label>)}
    </fieldset>}
    {current.type==="multi"&&<fieldset className="fnh-study-practice-options">
      <legend>Choose every correct statement</legend>
      {current.options.map((text,i)=><label key={letters[i]} className={response.includes(letters[i])?"selected":""}>
        <input type="checkbox" checked={response.includes(letters[i])} disabled={Boolean(checked)}
          onChange={()=>toggleMulti(letters[i])}/>
        <b aria-hidden="true">{letters[i]}.</b><span>{text}</span>
      </label>)}
    </fieldset>}
    {current.type==="number"&&<label className="fnh-study-practice-numeric">
      <span>Enter your calculated answer</span>
      <div><input type="number" step="any" inputMode="decimal" value={response}
        disabled={Boolean(checked)} onChange={e=>setResponse(e.target.value)}
        aria-label="Calculated answer"/><span>{current.unit}</span></div>
      <small>Show the working in your notebook before checking.</small>
    </label>}
    {current.type==="order"&&<div className="fnh-study-practice-order">
      <p>Use the arrow buttons to arrange the steps from first to last.</p>
      <ol>{response.map((letter,i)=><li key={letter}>
        <span className="fnh-study-practice-rank">{i+1}</span>
        <span>{current.options[letters.indexOf(letter)]}</span>
        <div><button type="button" aria-label={`Move step ${i+1} up`}
            disabled={Boolean(checked)||i===0} onClick={()=>move(i,-1)}>↑</button>
          <button type="button" aria-label={`Move step ${i+1} down`}
            disabled={Boolean(checked)||i===response.length-1} onClick={()=>move(i,1)}>↓</button>
        </div></li>)}</ol>
    </div>}
    {!checked&&<div className="fnh-study-practice-actions">
      <button type="button" className="fnh-study-practice-hint"
        aria-expanded={Boolean(hintVisible[current.id])}
        onClick={()=>setHintVisible(old=>({...old,[current.id]:!old[current.id]}))}>
        {hintVisible[current.id]?"Hide hint":"Need a hint?"}
      </button>
      <button type="button" className="fnh-study-practice-check"
        disabled={!hasResponse} onClick={check}>Check my answer</button>
    </div>}
    {hintVisible[current.id]&&!checked&&<p className="fnh-study-practice-hint-text">{current.hint}</p>}
    {checked&&<div className={`fnh-study-practice-feedback ${checked.correct?"is-correct":"needs-review"}`}
      role="status" aria-live="polite">
      <strong>{checked.correct?"Well reasoned!":"Review this one, then try again."}</strong>
      {!checked.correct&&<p><b>Answer:</b> {fnhPracticeAnswerText(current)}</p>}
      <p>{current.explanation}</p>
      <small>This is a learning check only. It does not change Paper 1 or Paper 2 scores or your parent's report.</small>
      <button type="button" className="fnh-study-practice-hint" onClick={retry}>Try this question again</button>
    </div>}
  </div>
  <footer className="fnh-study-practice-footer">
    <button type="button" className="fnh-study-practice-secondary"
      disabled={index===0} onClick={()=>changeQuestion(index-1)}>← Previous</button>
    <span>{completed} of {questions.length} checked</span>
    {index<questions.length-1
      ?<button type="button" className="fnh-study-practice-secondary" onClick={()=>changeQuestion(index+1)}>Next question →</button>
      :<button type="button" className="fnh-study-practice-secondary" onClick={resetAll}>Practise again ↻</button>}
  </footer>
 </section>;
}
