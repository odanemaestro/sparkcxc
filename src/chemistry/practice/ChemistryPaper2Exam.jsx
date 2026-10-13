import React, {useCallback,useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {BankTable,TrustedBankSvg} from "../../integratedScience/practice/IntegratedScienceQuestionRenderer";
import ScienceGraphEditor from "../../integratedScience/practice/ScienceGraphEditor";
import {CHEMISTRY_PAPER2_PRACTICE_SETS,CHEMISTRY_PAPER2_FORMAT} from "../data/chemistryPaper2Bank";
import {gradeChemistryPaper2,CHEMISTRY_P2_GRADER_VERSION} from "./chemistryPaper2Grader";
import "./chemistryPractice.css";
import "../../integratedScience/practice/integratedScienceExam.css";

const DURATION=CHEMISTRY_PAPER2_FORMAT.durationMinutes*60;
const keyFor=(q,p,i)=>`${q}:${p}:${i}`;
const storageKey=(userId,paperId)=>`spark:chemistry:paper2:${userId||"guest"}:${paperId}`;
const goTop=()=>window.scrollTo?.({top:0,behavior:"smooth"});
const timeText=s=>`${String(Math.floor(s/3600)).padStart(2,"0")}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

function DrawingPad({base,responses,onChange,disabled}){
  const ref=useRef(null);
  let strokes=[];
  try{strokes=JSON.parse(responses[`${base}:strokes`]||"[]");}catch{}
  if(!Array.isArray(strokes))strokes=[];
  const drawing=useRef(false);
  const update=next=>onChange(`${base}:strokes`,JSON.stringify(next));
  const point=e=>{
    const box=ref.current?.getBoundingClientRect();
    if(!box)return null;
    return {x:(e.clientX-box.left)/box.width*600,y:(e.clientY-box.top)/box.height*300};
  };
  const down=e=>{if(disabled)return;const p=point(e);if(!p)return;drawing.current=true;update([...strokes,[p]]);e.currentTarget.setPointerCapture?.(e.pointerId);};
  const move=e=>{if(disabled||!drawing.current)return;const p=point(e);if(!p)return;const next=strokes.map((s,i)=>i===strokes.length-1?[...s,p]:s);update(next);};
  const up=()=>{drawing.current=false;};
  return <div className="chem-p2-drawing-wrap">
    <svg ref={ref} className="is-p2-drawing-response" viewBox="0 0 600 300" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="img" aria-label="Chemistry drawing workspace">
      <rect x="1" y="1" width="598" height="298" fill="none" stroke="currentColor" opacity=".35"/>
      {strokes.map((stroke,index)=><polyline key={index} points={stroke.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>)}
    </svg>
    {!disabled&&<div className="is-p2-drawing-actions"><button type="button" className="is-exam-secondary" onClick={()=>update(strokes.slice(0,-1))} disabled={!strokes.length}>Undo stroke</button><button type="button" className="is-exam-secondary" onClick={()=>update([])} disabled={!strokes.length}>Clear drawing</button></div>}
    <textarea disabled={disabled} rows={3} value={responses[base]||""} onChange={e=>onChange(base,e.target.value)} placeholder="Add labels and notes for your drawing."/>
  </div>;
}

function ResponseInput({questionId,partIndex,itemIndex,item,responses,onChange,disabled}){
  const base=keyFor(questionId,partIndex,itemIndex);
  const type=item.response?.type||"lines";
  if(type==="table"){
    const table=item.response?.table||{};
    return <div className="is-bank-table-wrap">
      {table.title&&<div className="is-bank-table-title">{table.title}</div>}
      <table className="is-bank-table">
        <thead><tr>{(table.headers||[]).map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
        <tbody>{(table.rows||[]).map((row,r)=><tr key={r}>{row.map((cell,c)=><td key={c}>{String(cell??"")===""?<input disabled={disabled} value={responses[`${base}:r${r}c${c}`]||""} onChange={e=>onChange(`${base}:r${r}c${c}`,e.target.value)}/>:cell}</td>)}</tr>)}</tbody>
      </table>
    </div>;
  }
  if(type==="graph") return <ScienceGraphEditor base={base} responses={responses} onChange={onChange} disabled={disabled}/>;
  if(type==="drawing") return <DrawingPad base={base} responses={responses} onChange={onChange} disabled={disabled}/>;
  return <textarea disabled={disabled} className={type==="calculation"?"is-p2-calculation-response":"is-p2-lines-response"} rows={Math.max(3,Number(item.response?.lines||4))} value={responses[base]||""} onChange={e=>onChange(base,e.target.value)} aria-label={`${item.label||"Question"} response`}/>;
}

function ChemistryAnswerReview({item,evaluation,responses,base}){
  const type=item.response?.type||"lines";
  const table=item.response?.table;
  const points=item.markScheme?.points||[];
  const responseEntries=type==="table"?(table?.rows||[]).flatMap((row,r)=>row.map((cell,c)=>String(cell??"")===""?{key:`${base}:r${r}c${c}`,label:`Row ${r+1}, ${table?.headers?.[c]||`column ${c+1}`}`}:null).filter(Boolean)):[];
  const written=String(responses[base]||"").trim();
  let answerIndex=0;
  const modelRows=type==="table"?(table?.rows||[]).map(row=>row.map(cell=>{
    if(String(cell??"")!=="")return cell;
    const value=table?.answers?.[answerIndex++];
    return Array.isArray(value)?value.join(" / "):value??"Answer needs verification";
  })):[];
  return <section className="chem-p2-answer-review" aria-label="Answer review">
    <div className="chem-p2-review-heading"><strong>Answer review</strong>{evaluation&&<span>Estimated: {evaluation.score}/{evaluation.maxMarks} marks</span>}</div>
    <div className="chem-p2-review-grid">
      <div className="chem-p2-review-column">
        <h4>Your answer</h4>
        {type==="table"?responseEntries.length?<ul>{responseEntries.map(row=><li key={row.key}><b>{row.label}:</b> {responses[row.key]||"Not answered"}</li>)}</ul>:<p>No editable cells.</p>:
          <p>{written||((type==="graph"||type==="drawing")?"See your submitted work above.":"Not answered")}</p>}
      </div>
      <div className="chem-p2-review-column chem-p2-correct-answer">
        <h4>Correct answer</h4>
        {type==="table"&&modelRows.length?<div className="is-bank-table-wrap"><table className="is-bank-table"><thead><tr>{(table.headers||[]).map((head,i)=><th key={i}>{head}</th>)}</tr></thead><tbody>{modelRows.map((row,i)=><tr key={i}>{row.map((value,j)=><td key={j}>{value}</td>)}</tr>)}</tbody></table></div>:null}
        {type==="graph"&&Array.isArray(item.response?.points)&&item.response.points.length>0?<div className="chem-p2-expected-points"><strong>Expected graph points</strong><ul>{item.response.points.map((point,i)=><li key={i}>({point.x}, {point.y})</li>)}</ul></div>:null}
        {points.length?<ol>{points.map((point,i)=><li key={i}>{point}</li>)}</ol>:<p>Answer awaiting source verification.</p>}
      </div>
    </div>
    {item.explanation&&<div className="chem-p2-review-explanation"><strong>Explanation</strong><p>{item.explanation}</p></div>}
    {evaluation?.unassessedMarks>0&&<p className="chem-p2-review-caution">{evaluation.unassessedMarks} mark(s) need teacher or examiner review. They have not been counted as incorrect.</p>}
    {evaluation?.criteria?.length>0&&<details className="chem-p2-review-criteria"><summary>Mark breakdown</summary><ul>{evaluation.criteria.map(row=><li key={row.id}><b>{row.marks}/{row.maxMarks}</b> {row.label}</li>)}</ul></details>}
  </section>;
}

function PaperQuestion({question,responses,onChange,disabled,evaluation}){
  return <article className="chem-p2-question">
    <header><span>{question.kind.replace("-"," ")}</span><h2>{question.title}</h2><b>{question.totalMarks} marks</b></header>
    {question.context&&<p className="chem-p2-question-context">{question.context}</p>}
    {(question.sourceFigures||[]).map((figure,i)=>figure?.svg?<figure className="chem-p2-source-figure" key={i}><TrustedBankSvg svg={figure.svg}/>{figure.figure&&<figcaption>{figure.figure}</figcaption>}</figure>:null)}
    {(question.parts||[]).map((part,partIndex)=><section className="chem-p2-part" key={partIndex}>
      <div className="chem-p2-part-label">{part.label}</div>
      <div className="chem-p2-part-body">
        {part.context&&<p>{part.context}</p>}
        {part.svg&&<><TrustedBankSvg svg={part.svg}/>{part.figure&&<div className="is-bank-figure-caption">{part.figure}</div>}</>}
        {part.table&&<BankTable table={part.table}/>}
        {(part.items||[]).map((item,itemIndex)=>{
          const evalItem=evaluation?.items?.find(row=>row.partIndex===partIndex&&row.itemIndex===itemIndex);
          return <div className="chem-p2-item" key={itemIndex}>
            <div className="chem-p2-item-prompt"><b>{item.label}</b><span>{item.prompt}</span><em>[{item.marks}]</em></div>
            {item.svg&&<TrustedBankSvg svg={item.svg}/>}
            {item.table&&<BankTable table={item.table}/>}
            <ResponseInput questionId={question.id} partIndex={partIndex} itemIndex={itemIndex} item={item} responses={responses} onChange={onChange} disabled={disabled}/>
            {disabled&&<ChemistryAnswerReview item={item} evaluation={evalItem} responses={responses} base={keyFor(question.id,partIndex,itemIndex)}/>}
          </div>;
        })}
      </div>
    </section>)}
  </article>;
}

export default function ChemistryPaper2Exam({supabase,userId,onBack,paperIndex=0,historicalPaper=null}){
  const index=((Number(paperIndex)||0)%CHEMISTRY_PAPER2_PRACTICE_SETS.length+CHEMISTRY_PAPER2_PRACTICE_SETS.length)%CHEMISTRY_PAPER2_PRACTICE_SETS.length;
  const paper=historicalPaper||CHEMISTRY_PAPER2_PRACTICE_SETS[index];
  const duration=Number(paper.durationMinutes||CHEMISTRY_PAPER2_FORMAT.durationMinutes)*60;
  const initial=useMemo(()=>{
    try{const saved=JSON.parse(localStorage.getItem(storageKey(userId,paper.id))||"null");return saved?.paperId===paper.id?saved:null;}catch{return null;}
  },[paper.id,userId]);
  const [phase,setPhase]=useState(initial?.phase||"instructions");
  const [responses,setResponses]=useState(initial?.responses||{});
  const [current,setCurrent]=useState(initial?.current||0);
  const [endsAt,setEndsAt]=useState(initial?.endsAt||null);
  const [remaining,setRemaining]=useState(endsAt?Math.max(0,Math.round((endsAt-Date.now())/1000)):duration);
  const [confirmSubmit,setConfirmSubmit]=useState(false);
  const result=useMemo(()=>gradeChemistryPaper2(paper,responses),[paper,responses]);
  const submitted=phase==="review";

  useEffect(()=>{
    localStorage.setItem(storageKey(userId,paper.id),JSON.stringify({phase,responses,current,endsAt,paperId:paper.id}));
  },[phase,responses,current,endsAt,paper.id,userId]);

  const submit=useCallback(async({timedOut=false}={})=>{
    if(phase!=="exam")return;
    setPhase("review");setConfirmSubmit(false);goTop();
    try{
      await recordSubjectActivity({supabase,activity:{
        subjectId:"chemistry",activityKey:`exam:${paper.id}`,activityType:"exam",title:paper.title,completed:true,
        score:result.score,maxScore:result.maxScore,percent:result.percent,
        metadata:{source:paper.isHistorical?"chemistry_paper2_historical_draft":"chemistry_paper2_v1",paper:"02",paper_id:paper.id,historical:Boolean(paper.isHistorical),source_id:paper.sourceId||null,complete_historical_paper:Boolean(paper.isHistorical&&paper.complete),source_verified:!paper.isHistorical,timed_out:Boolean(timedOut),grader_version:CHEMISTRY_P2_GRADER_VERSION,provisional:Boolean(result.provisional||paper.isHistorical),at:new Date().toISOString()},
      }});
    }catch(error){console.warn("Could not save Chemistry Paper 02 result",error);}
  },[paper,phase,result,supabase]);

  useEffect(()=>{
    if(phase!=="exam"||!endsAt)return undefined;
    const tick=()=>{
      const left=Math.max(0,Math.round((endsAt-Date.now())/1000));setRemaining(left);
      if(left===0)submit({timedOut:true});
    };
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[endsAt,phase,submit]);

  function begin(){
    const deadline=Date.now()+duration*1000;
    setEndsAt(deadline);setRemaining(duration);setPhase("exam");goTop();
  }
  function restart(){
    localStorage.removeItem(storageKey(userId,paper.id));setResponses({});setCurrent(0);setEndsAt(null);setRemaining(duration);setPhase("instructions");goTop();
  }
  function update(key,value){if(!submitted)setResponses(prev=>({...prev,[key]:value}));}

  if(phase==="instructions")return <main className="is-exam-root chem-p2-root"><div className="is-exam-shell">
    <button type="button" className="is-exam-primary is-exam-page-back" onClick={onBack}><span aria-hidden="true">←</span>Back to Chemistry practice</button>
    <section className="is-exam-instructions-card">
      <span className="is-exam-eyebrow">CSEC CHEMISTRY · PAPER 02</span>
      <h1>{paper.title}</h1>
      <p className="is-exam-instructions-sub">A full current-format SPARK practice examination built from the syllabus and recurring structures in the supplied Chemistry Paper 02 archive.</p>
      <div className="is-exam-instructions-rule"/>
      <div className="is-exam-instructions-meta"><div><span>Time</span><strong>2 h 30 min</strong></div><div><span>Questions</span><strong>6 compulsory</strong></div><div><span>Marks</span><strong>100</strong></div><div><span>Calculator</span><strong>Non-programmable</strong></div></div>
      <div className="is-exam-instructions-sheet"><h2>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</h2><ol><li>Answer ALL six questions.</li><li>Question 1 is a compulsory data-analysis/investigative question.</li><li>Questions 2 and 3 are structured questions. Questions 4, 5 and 6 are extended-response questions.</li><li>Show all working for calculations and include units where appropriate.</li><li>SPARK saves your responses while you work and opens the authored mark schemes after submission.</li></ol></div>
      <div className="is-exam-instructions-actions"><button type="button" className="is-exam-primary" onClick={begin}>Start examination</button></div>
    </section>
  </div></main>;

  const q=paper.questions[current];
  const qEval=result.questions[current];
  return <main className="is-exam-root chem-p2-root"><div className="is-exam-shell">
    <header className="is-exam-head">
      <div><button type="button" className="is-exam-primary is-exam-back" onClick={onBack}>Exit</button><span className="is-exam-eyebrow">CSEC CHEMISTRY · PAPER 02</span><h1>{paper.title}</h1><p>{submitted?"Mark-scheme review":`Question ${current+1} of 6`} · {q.totalMarks} marks</p></div>
      <div className={`is-exam-timer ${remaining<=900&&!submitted?"warning":""}`}><span>{submitted?"Submitted":"Time remaining"}</span><strong>{submitted?"REVIEW":timeText(remaining)}</strong></div>
    </header>

    {submitted&&<section className="is-p2-review-note"><strong>SPARK has marked your Chemistry paper.</strong><p>Estimated score: <b>{result.score}/{result.maxScore}</b> ({result.percent}%). Authored mark schemes are shown below each item. Written, graph and drawing marks remain estimates where examiner judgement is needed.</p>{result.unassessedMarks>0&&<p><b>{result.unassessedMarks} marks still need visual or examiner judgement.</b> These are not automatically treated as incorrect.</p>}</section>}

    <nav className="is-p2-question-nav" aria-label="Chemistry Paper 02 questions">{paper.questions.map((row,i)=><button key={row.id} type="button" className={i===current?"active":""} onClick={()=>{setCurrent(i);goTop();}}><span>Q{i+1}</span><small>{submitted?`${result.questions[i]?.score||0}/${row.totalMarks}`:`${row.totalMarks} marks`}</small></button>)}</nav>

    <PaperQuestion question={q} responses={responses} onChange={update} disabled={submitted} evaluation={qEval}/>

    <div className="chem-p2-exam-footer"><div className="is-exam-bottom-nav"><button type="button" className="is-exam-secondary" disabled={current===0} onClick={()=>{setCurrent(v=>Math.max(0,v-1));goTop();}}>Previous</button><span>Question {current+1} of 6</span><button type="button" className="is-exam-secondary" disabled={current===5} onClick={()=>{setCurrent(v=>Math.min(5,v+1));goTop();}}>Next</button></div>

    {!submitted&&<div className="chem-p2-submit-row"><button type="button" className="is-exam-primary" onClick={()=>setConfirmSubmit(true)}>Submit Paper 02</button></div>}
    {submitted&&<div className="chem-p2-submit-row"><button type="button" className="is-exam-primary" onClick={restart}>Start another Paper 02</button><button type="button" className="is-exam-secondary" onClick={onBack}>Back to Chemistry practice</button></div>}
    </div>

    {confirmSubmit&&<div className="is-exam-confirm-layer" role="dialog" aria-modal="true" aria-label="Submit Chemistry Paper 02"><div className="is-exam-confirm-card"><h2>Submit your paper?</h2><p>You will move to the marking review and will no longer be able to edit your answers.</p><div><button type="button" className="is-exam-secondary" onClick={()=>setConfirmSubmit(false)}>Keep working</button><button type="button" className="is-exam-primary" onClick={()=>submit()}>Submit now</button></div></div></div>}
  </div></main>;
}
