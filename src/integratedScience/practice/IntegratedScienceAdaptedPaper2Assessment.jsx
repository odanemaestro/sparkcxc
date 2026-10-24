import React,{useState} from "react";
import {useSavedPracticeState} from "../../routing/usePracticeRouteState";
import {GuidedStomaFigure,GuidedFlowerFigure} from "./ScienceGuidedDiagramPractice";
import {guidedDiagramForSource,readGuidedDiagramAnswers} from "./scienceGuidedDiagramMarking";
import {ADAPTED_BIOLOGY_P2_ID,ADAPTED_BIOLOGY_P2_RUBRIC,ADAPTED_BIOLOGY_P2_QUESTIONS,
 ADAPTED_BIOLOGY_P2_MARKS,gradeAdaptedBiologyPaper2} from "./integratedScienceAdaptedPaper2";

const INPUT_STYLE={width:"100%",minWidth:0,minHeight:40,borderRadius:8,padding:"8px 12px",
 border:"1px solid var(--spark-border, #b9c7d9)",background:"var(--spark-surface, transparent)",color:"inherit"};
export default function IntegratedScienceAdaptedPaper2Assessment({onExit,userId}){
 const prefix=`spark:is:adapted-biology:${userId||"guest"}:`;
 const [stage,setStage]=useSavedPracticeState(prefix+"stage","instructions",{decode:raw=>["instructions","exam","review"].includes(raw)?raw:"instructions"});
 const [index,setIndex]=useSavedPracticeState(prefix+"index",0,{decode:raw=>Number.isInteger(raw)&&raw>=0&&raw<ADAPTED_BIOLOGY_P2_QUESTIONS.length?raw:0});
 const [answers,setAnswers]=useSavedPracticeState(prefix+"answers",{});
 const question=ADAPTED_BIOLOGY_P2_QUESTIONS[index];
 const result=stage==="review"?gradeAdaptedBiologyPaper2(answers):null;
 const guide=question.id==="stoma-identification"
  ?guidedDiagramForSource("IS-M1-P2-21",1,0)
  :question.id==="flower-identification"
  ?guidedDiagramForSource("IS-M1-P2-27",0,0):null;
 const current=answers[question.id]||{};
 const selected=guide?readGuidedDiagramAnswers(current):null;
 const save=(field,value)=>setAnswers(previous=>({
  ...previous,[question.id]:{...(previous[question.id]||{}),[field]:value}
 }));
 const exit=()=>{if(onExit)onExit();};
 return <main className="is-exam-root">
  <div className="is-exam-shell">
   <button type="button" className="is-exam-secondary is-exam-page-back" onClick={exit}>← Back to Paper 2 selection</button>
   <header className="is-exam-library-hero">
    <div>
     <span className="is-exam-eyebrow">SPARK · ADAPTED PAPER 02</span>
     <h1>Biology diagrams and magnification</h1>
     <p>Original SPARK diagrams, clear labelling tasks and deterministic marking. This is a separate adapted assessment, not the historical 105-mark Paper 2.</p>
    </div>
    <div className="is-exam-hero-spec"><strong>3</strong><span>questions</span>
     <strong>{ADAPTED_BIOLOGY_P2_MARKS}</strong><span>marks</span>
     <strong>V1</strong><span>adapted</span></div>
   </header>
   {stage==="instructions"&&<section className="is-exam-instructions-card">
    <h2>Assessment instructions</h2>
    <p>Answer all three questions. For the first two, select the correct biological structure for each letter on the prepared diagram. For the last, calculate magnification using the stated dimensions.</p>
    <p>Your answers are marked only after submission. Every correct diagram label earns one mark, and the calculation earns a mark for the method and a mark for the answer with ×.</p>
    <p><strong>Scoring distinction:</strong> this adapted score is separate from the historical exam and is not an authoritative V2 server score. It cannot approve the historical drawing criteria.</p>
    <p style={{opacity:.75,fontSize:".85rem"}}>Assessment ID: {ADAPTED_BIOLOGY_P2_ID} · Rubric: {ADAPTED_BIOLOGY_P2_RUBRIC}</p>
    <button type="button" className="is-exam-primary" onClick={()=>setStage("exam")}>Start adapted assessment</button>
   </section>}
   {stage==="exam"&&<section className="is-exam-instructions-card">
    <p className="is-exam-eyebrow">Question {index+1} of {ADAPTED_BIOLOGY_P2_QUESTIONS.length} · {question.maxMarks} marks</p>
    <h2>{question.title}</h2>
    <p>{question.instruction}</p>
    {guide&&<>
     {guide.id==="stoma"?<GuidedStomaFigure/>:<GuidedFlowerFigure/>}
     <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(215px,1fr))",gap:12,margin:"16px 0"}}>
      {guide.slots.map(slot=><label key={slot.id} style={{display:"flex",flexDirection:"column",gap:5}}>
       <strong>Part {slot.id}</strong>
       <select aria-label={"Part "+slot.id} style={INPUT_STYLE}
        value={selected[slot.id]||""} onChange={e=>save(slot.id,e.target.value)}>
        <option value="">Select a structure</option>
        {guide.options.map(option=><option key={option} value={option}>{option}</option>)}
       </select>
      </label>)}
     </div>
    </>}
    {!guide&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(215px,1fr))",gap:14,margin:"16px 0"}}>
     <label>Calculation and working
      <input aria-label="Magnification working" style={INPUT_STYLE} placeholder="Show your division"
       value={current.working||""} onChange={e=>save("working",e.target.value)}/>
     </label>
     <label>Magnification
      <input aria-label="Magnification answer" style={INPUT_STYLE} placeholder="Include ×"
       value={current.answer||""} onChange={e=>save("answer",e.target.value)}/>
     </label>
    </div>}
    <div className="is-exam-library-actions" style={{display:"flex",flexWrap:"wrap",gap:12}}>
     <button type="button" className="is-exam-secondary" disabled={index===0}
      onClick={()=>setIndex(i=>Math.max(0,i-1))}>Previous question</button>
     {index<ADAPTED_BIOLOGY_P2_QUESTIONS.length-1
      ?<button type="button" className="is-exam-primary" onClick={()=>setIndex(i=>i+1)}>Next question</button>
      :<button type="button" className="is-exam-primary" onClick={()=>setStage("review")}>Submit adapted assessment</button>}
    </div>
   </section>}
   {stage==="review"&&<section className="is-exam-instructions-card">
    <h2>Adapted Paper 2 result</h2>
    <p role="status"><strong>{result.score}/{result.maxMarks} marks ({result.percent}%)</strong></p>
    <p>This score comes from the separate adapted rubric. It does not replace a historical drawing mark or constitute server-authoritative V2 scoring.</p>
    {ADAPTED_BIOLOGY_P2_QUESTIONS.map((item,i)=>{
     const row=result.rows[i];
     return <div key={item.id} style={{padding:"14px 0",borderTop:"1px solid var(--spark-border, #b9c7d9)"}}>
      <h3>{i+1}. {item.title}: {row.score}/{row.maxMarks}</h3>
      {row.marking.rows?.length>0
       ?<p>{row.marking.rows.map(r=>r.id+": "+(r.correct?"Correct":"Correct answer: "+r.expected)).join(" · ")}</p>
       :<p>Working: {row.marking.methodCorrect?"Correct":"Incorrect or missing"} · Magnification with ×: {row.marking.answerCorrect?"Correct":"Incorrect or missing"}</p>}
     </div>;
    })}
    <div className="is-exam-library-actions" style={{display:"flex",flexWrap:"wrap",gap:12}}>
     <button type="button" className="is-exam-primary" onClick={()=>{setAnswers({});setIndex(0);setStage("instructions");}}>Try another attempt</button>
     <button type="button" className="is-exam-secondary" onClick={exit}>Back to Paper 2 selection</button>
    </div>
   </section>}
  </div>
 </main>;
}
