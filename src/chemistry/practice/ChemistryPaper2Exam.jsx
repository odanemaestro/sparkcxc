import React,{useCallback,useEffect,useMemo,useRef,useState}from"react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {gradeChemistryPaper2} from "./chemistryPaper2Grader";
import "./chemistryPractice.css";
import "../../integratedScience/practice/integratedScienceExam.css";

const DURATION=150*60;
const storageKey=(userId,paperId)=>`spark-chemistry-p2:${userId||"guest"}:${paperId}`;
const goTop=()=>window.scrollTo?.({top:0,behavior:"smooth"});
const fmt=seconds=>{const s=Math.max(0,Number(seconds||0));const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),r=s%60;return h?`${h}:${String(m).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${m}:${String(r).padStart(2,"0")}`;};

function readState(userId,paperId){
  try{return JSON.parse(localStorage.getItem(storageKey(userId,paperId))||"null");}catch{return null;}
}
function saveState(userId,paperId,state){
  try{localStorage.setItem(storageKey(userId,paperId),JSON.stringify(state));}catch{}
}
function clearState(userId,paperId){
  try{localStorage.removeItem(storageKey(userId,paperId));}catch{}
}
const keyFor=(qid,p,i,s="")=>`${qid}:${p}:${i}${s?`:${s}`:""}`;

function TableFigure({table}){
  if(!table)return null;
  return <div className="is-bank-table-wrap">
    {table.title&&<div className="is-bank-table-title">{table.title}</div>}
    <table className="is-bank-table">
      {table.headers&&<thead><tr>{table.headers.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>}
      <tbody>{(table.rows||[]).map((row,r)=><tr key={r}>{row.map((cell,c)=><td key={c}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function TrustedSvg({svg,label="Chemistry diagram"}){
  if(!svg)return null;
  return <div className="is-bank-svg" role="img" aria-label={label} dangerouslySetInnerHTML={{__html:svg}}/>;
}

function GraphResponse({base,item,responses,onChange,disabled}){
  const raw=String(responses[`${base}:points`]||"");
  const points=raw.split(/\n|;/).map(line=>{
    const m=line.match(/(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/);
    return m?{x:Number(m[1]),y:Number(m[2])}:null;
  }).filter(Boolean);
  const xMin=Number(responses[`${base}:xMin`]??0),xMax=Number(responses[`${base}:xMax`]??10);
  const yMin=Number(responses[`${base}:yMin`]??0),yMax=Number(responses[`${base}:yMax`]??10);
  const valid=xMax>xMin&&yMax>yMin;
  const W=600,H=330,L=66,R=24,T=24,B=58,pw=W-L-R,ph=H-T-B;
  const sx=x=>L+(x-xMin)/(xMax-xMin)*pw,sy=y=>T+(yMax-y)/(yMax-yMin)*ph;
  const serialize=rows=>rows.map(p=>`${Number(p.x.toFixed(3))}, ${Number(p.y.toFixed(3))}`).join("\n");
  const add=e=>{
    if(disabled||!valid)return;
    const box=e.currentTarget.getBoundingClientRect();
    const lx=(e.clientX-box.left)/box.width*W,ly=(e.clientY-box.top)/box.height*H;
    if(lx<L||lx>W-R||ly<T||ly>H-B)return;
    const x=xMin+(lx-L)/pw*(xMax-xMin),y=yMax-(ly-T)/ph*(yMax-yMin);
    onChange(`${base}:points`,serialize([...points,{x,y}]));
  };
  const ticks=(a,b)=>Array.from({length:11},(_,i)=>a+(b-a)*i/10);
  const style=responses[`${base}:connection`]||"smooth";
  return <div className="is-p2-graph-workspace">
    <div className="is-p2-graph-fields">
      <label><span>x-axis label</span><input disabled={disabled} value={responses[`${base}:xLabel`]||""} onChange={e=>onChange(`${base}:xLabel`,e.target.value)} placeholder={item.response?.x||"x-axis"}/></label>
      <label><span>y-axis label</span><input disabled={disabled} value={responses[`${base}:yLabel`]||""} onChange={e=>onChange(`${base}:yLabel`,e.target.value)} placeholder={item.response?.y||"y-axis"}/></label>
    </div>
    <div className="is-p2-graph-scale-grid">
      {["xMin","xMax","yMin","yMax"].map((field,i)=><label key={field}><span>{["x minimum","x maximum","y minimum","y maximum"][i]}</span><input disabled={disabled} inputMode="decimal" value={responses[`${base}:${field}`]??(field.endsWith("Min")?"0":"10")} onChange={e=>onChange(`${base}:${field}`,e.target.value)}/></label>)}
    </div>
    <div className="is-p2-graph-toolbar"><label><span>Graph style</span><select disabled={disabled} value={style} onChange={e=>onChange(`${base}:connection`,e.target.value)}><option value="smooth">Smooth curve</option><option value="straight">Straight lines</option><option value="best-fit">Best-fit line</option><option value="points">Points only</option></select></label></div>
    <svg className="is-p2-graph-response" viewBox={`0 0 ${W} ${H}`} onClick={add} role="img" aria-label="Chemistry graph response">
      <rect x={L} y={T} width={pw} height={ph} fill="none" stroke="currentColor"/>
      {valid&&ticks(xMin,xMax).map((v,i)=>{const x=L+i*pw/10;return <React.Fragment key={"x"+i}><line x1={x} x2={x} y1={T} y2={H-B} stroke="currentColor" opacity=".12"/><text x={x} y={H-B+20} textAnchor="middle" className="is-p2-graph-tick">{Number(v.toFixed(2))}</text></React.Fragment>})}
      {valid&&ticks(yMin,yMax).map((v,i)=>{const y=H-B-i*ph/10;return <React.Fragment key={"y"+i}><line x1={L} x2={W-R} y1={y} y2={y} stroke="currentColor" opacity=".12"/><text x={L-8} y={y+4} textAnchor="end" className="is-p2-graph-tick">{Number(v.toFixed(2))}</text></React.Fragment>})}
      {valid&&style!=="points"&&points.length>1&&<polyline points={points.map(p=>`${sx(p.x)},${sy(p.y)}`).join(" ")} fill="none" className="is-p2-graph-line"/>}
      {valid&&points.map((p,i)=><circle key={i} cx={sx(p.x)} cy={sy(p.y)} r="4.5" className="is-p2-graph-point"/>)}
      <text x={L+pw/2} y={H-8} textAnchor="middle" className="is-p2-graph-axis-label">{responses[`${base}:xLabel`]||item.response?.x||"x-axis"}</text>
      <text x="17" y={T+ph/2} textAnchor="middle" transform={`rotate(-90 17 ${T+ph/2})`} className="is-p2-graph-axis-label">{responses[`${base}:yLabel`]||item.response?.y||"y-axis"}</text>
    </svg>
    <div className="is-p2-graph-actions"><span>{points.length} point{points.length===1?"":"s"} plotted. Click the grid to add a point.</span>{!disabled&&<button type="button" className="is-exam-secondary" onClick={()=>onChange(`${base}:points`,serialize(points.slice(0,-1)))} disabled={!points.length}>Undo point</button>}{!disabled&&<button type="button" className="is-exam-secondary" onClick={()=>onChange(`${base}:points`,"")} disabled={!points.length}>Clear graph</button>}</div>
  </div>;
}

function Response({question,partIndex,itemIndex,item,responses,onChange,disabled}){
  const base=keyFor(question.id,partIndex,itemIndex);
  if(item.response?.type==="table"){
    const t=item.response.table||{};
    return <div className="is-bank-table-wrap"><table className="is-bank-table">{t.headers&&<thead><tr>{t.headers.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>}<tbody>{(t.rows||[]).map((row,r)=><tr key={r}>{row.map((cell,c)=><td key={c}>{String(cell??"")===""?<input disabled={disabled} value={responses[`${base}:r${r}c${c}`]||""} onChange={e=>onChange(`${base}:r${r}c${c}`,e.target.value)}/>:cell}</td>)}</tr>)}</tbody></table></div>;
  }
  if(item.response?.type==="graph")return <GraphResponse base={base} item={item} responses={responses} onChange={onChange} disabled={disabled}/>;
  return <textarea disabled={disabled} className={item.response?.type==="calculation"?"is-p2-calculation-response":"is-p2-lines-response"} rows={item.response?.lines||5} value={responses[base]||""} onChange={e=>onChange(base,e.target.value)} placeholder={item.response?.type==="calculation"?"Show your working and final answer.":"Write your answer here."}/>;
}

function MarkScheme({item,evaluation}){
  return <div className="is-p2-mark-scheme">
    <strong>SPARK marking review</strong>
    {evaluation&&<div className="is-p2-auto-score"><b>{evaluation.score}/{evaluation.maxMarks} marks</b><span>Estimated from the authored Chemistry marking points</span></div>}
    {evaluation?.criteria?.length>0&&<ul className="is-p2-auto-criteria">{evaluation.criteria.map(row=><li key={row.id}><b>{row.marks}/{row.maxMarks}</b> {row.label}</li>)}</ul>}
    <ul>{(item.markScheme?.points||[]).map((point,i)=><li key={i}>{point}</li>)}</ul>
    {item.markScheme?.explanation&&<p><b>Explanation:</b> {item.markScheme.explanation}</p>}
    {item.markScheme?.guidance&&<p><b>Marking guidance:</b> {item.markScheme.guidance}</p>}
  </div>;
}

function Navigator({paper,currentIndex,setCurrentIndex,responses,review,onSubmit}){
  return <aside className="is-exam-navigator is-exam-navigator-desktop">
    <div className="is-exam-navigator-head"><strong>Question navigator</strong><span>6 compulsory questions</span></div>
    <div className="is-exam-nav-grid">{paper.questions.map((q,i)=>{
      const answered=Object.keys(responses).some(k=>k.startsWith(q.id+":")&&String(responses[k]||"").trim());
      return <button key={q.id} type="button" className={[i===currentIndex?"active":"",answered?"answered":""].filter(Boolean).join(" ")} onClick={()=>{setCurrentIndex(i);goTop()}}>{i+1}</button>;
    })}</div>
    {!review&&<button type="button" className="is-exam-primary is-exam-submit-side" onClick={onSubmit}>Submit paper</button>}
  </aside>;
}

export default function ChemistryPaper2Exam({paper,supabase,userId,onBack}){
  const saved=useMemo(()=>readState(userId,paper.id),[paper.id,userId]);
  const [phase,setPhase]=useState(saved?.phase||"instructions");
  const [responses,setResponses]=useState(saved?.responses||{});
  const [currentIndex,setCurrentIndex]=useState(saved?.currentIndex||0);
  const [endsAt,setEndsAt]=useState(saved?.endsAt||null);
  const [remaining,setRemaining]=useState(()=>saved?.endsAt?Math.max(0,Math.round((saved.endsAt-Date.now())/1000)):DURATION);
  const [confirm,setConfirm]=useState(false);
  const submitGuard=useRef(phase==="review");
  const review=phase==="review";
  const result=useMemo(()=>gradeChemistryPaper2(paper,responses),[paper,responses]);

  useEffect(()=>{saveState(userId,paper.id,{phase,responses,currentIndex,endsAt})},[currentIndex,endsAt,paper.id,phase,responses,userId]);
  useEffect(()=>{
    if(phase!=="exam"||!endsAt)return;
    const tick=()=>{const next=Math.max(0,Math.round((endsAt-Date.now())/1000));setRemaining(next);if(next===0&&!submitGuard.current)submit(true)};
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[endsAt,phase]);

  const change=useCallback((key,value)=>setResponses(prev=>({...prev,[key]:value})),[]);
  const submit=useCallback(async(timedOut=false)=>{
    if(submitGuard.current)return;
    submitGuard.current=true;setPhase("review");setConfirm(false);
    try{
      if(supabase&&userId)await recordSubjectActivity({supabase,activity:{
        subjectId:"chemistry",activityKey:`exam:${paper.id}:${Date.now()}`,activityType:"assessment",
        sectionId:"paper-02",topicId:null,title:paper.title,completed:true,score:result.score,maxScore:result.maxScore,percent:result.percent,
        metadata:{paper:"02",paperId:paper.id,timedOut,graderVersion:result.graderVersion,questionCount:paper.questions.length,at:new Date().toISOString()}
      }});
    }catch(error){console.warn("Could not save Chemistry Paper 02 result",error);}
    goTop();
  },[paper.id,paper.questions.length,paper.title,result.graderVersion,result.maxScore,result.percent,result.score,supabase,userId]);

  const start=()=>{
    submitGuard.current=false;
    const end=Date.now()+DURATION*1000;setEndsAt(end);setRemaining(DURATION);setResponses({});setCurrentIndex(0);setPhase("exam");goTop();
  };
  const resume=()=>{submitGuard.current=false;if(!endsAt)setEndsAt(Date.now()+remaining*1000);setPhase("exam");goTop()};
  const fresh=()=>{clearState(userId,paper.id);setResponses({});setCurrentIndex(0);setEndsAt(null);setRemaining(DURATION);setPhase("instructions");submitGuard.current=false;goTop()};

  if(phase==="instructions")return <main className="is-exam-root is-exam-shell chemistry-exam">
    <button type="button" className="is-exam-secondary" onClick={onBack}>Back</button>
    <section className="is-exam-instructions-card">
      <span className="is-exam-kicker">CSEC CHEMISTRY</span>
      <h1>Paper 02</h1>
      <p className="is-exam-instructions-sub">{paper.title}</p>
      <div className="is-exam-instructions-rule"/>
      <div className="is-exam-instructions-meta"><div><span>Time</span><strong>2 hours 30 minutes</strong></div><div><span>Questions</span><strong>6 compulsory</strong></div><div><span>Marks</span><strong>100</strong></div><div><span>Paper</span><strong>Structured and data analysis</strong></div></div>
      <div className="is-exam-instructions-sheet"><h2>Instructions</h2><ol><li>Answer all six questions.</li><li>Question 1 is a data-analysis question. Questions 2 and 3 are structured. Questions 4 to 6 are extended-response questions.</li><li>Show all working for calculations and include units.</li><li>Use the interactive graph workspace when a graph is required.</li><li>Review the entire paper before submitting.</li></ol></div>
      <div className="is-exam-instructions-actions">{saved?.phase==="exam"&&saved?.endsAt>Date.now()&&<button type="button" className="is-exam-secondary" onClick={resume}>Resume paper</button>}<button type="button" className="is-exam-primary" onClick={start}>Start new Paper 02</button></div>
    </section>
  </main>;

  const q=paper.questions[currentIndex];
  const evalQ=result.questions[currentIndex];

  return <main className="is-exam-root is-exam-shell chemistry-exam">
    <header className="is-exam-head">
      <div><span className="is-exam-kicker">CSEC CHEMISTRY · PAPER 02</span><h1>{review?"Paper review":paper.title}</h1><p>{review?`${result.score}/${result.maxScore} marks · ${result.percent}% · provisional automatic review`:`Question ${currentIndex+1} of ${paper.questions.length}`}</p></div>
      <div className={`is-exam-timer ${remaining<600?"warning":""}`}><span>{review?"Submitted":"Time remaining"}</span><strong>{review?"Review":fmt(remaining)}</strong></div>
    </header>
    {review&&<section className="is-exam-review-summary"><div><span>Score</span><strong>{result.score}/{result.maxScore}</strong></div><div><span>Percentage</span><strong>{result.percent}%</strong></div><div><span>Questions</span><strong>{paper.questions.length}</strong></div><p>{result.note}</p></section>}
    <div className="is-exam-layout">
      <div className="is-exam-main">
        <article className="is-p2-question">
          <div className="is-p2-question-heading"><div><span className="is-exam-kicker">{q.kind?.replace("-"," ")}</span><h2>Question {q.number}</h2><p>{q.title}</p></div><strong>{q.totalMarks} marks</strong></div>
          {(q.parts||[]).map((part,p)=><section className="is-p2-part" key={p}>
            <h3>{part.label}</h3>
            {part.context&&<p className="is-p2-context">{part.context}</p>}
            <TrustedSvg svg={part.svg} label={part.figure||q.title}/>
            <TableFigure table={part.table}/>
            {(part.items||[]).map((item,i)=>{
              const evaluation=evalQ?.items?.find(row=>row.partIndex===p&&row.itemIndex===i);
              return <div className="is-p2-subquestion" key={i}>
                <div className="is-p2-subquestion-prompt"><strong>{item.label}</strong><span>{item.prompt}</span><b>[{item.marks}]</b></div>
                {item.svg&&<TrustedSvg svg={item.svg} label={item.label}/>}
                {item.table&&<TableFigure table={item.table}/>}
                <div className="is-p2-response-area"><Response question={q} partIndex={p} itemIndex={i} item={item} responses={responses} onChange={change} disabled={review}/>{review&&<MarkScheme item={item} evaluation={evaluation}/>}</div>
              </div>;
            })}
          </section>)}
        </article>
        <footer className="is-exam-footer"><button type="button" className="is-exam-secondary" disabled={currentIndex===0} onClick={()=>{setCurrentIndex(i=>Math.max(0,i-1));goTop()}}>Previous</button><span>Question {currentIndex+1} of {paper.questions.length}</span><button type="button" className="is-exam-primary" disabled={currentIndex===paper.questions.length-1} onClick={()=>{setCurrentIndex(i=>Math.min(paper.questions.length-1,i+1));goTop()}}>Next</button></footer>
        {!review&&<div className="is-exam-submit-strip"><div><strong>Ready to finish?</strong><span>You can still return to any question before submitting.</span></div><button type="button" className="is-exam-primary" onClick={()=>setConfirm(true)}>Submit paper</button></div>}
        {review&&<div className="is-exam-result-actions"><button type="button" className="is-exam-secondary" onClick={onBack}>Back to Chemistry practice</button><button type="button" className="is-exam-primary" onClick={fresh}>Start new Paper 02</button></div>}
      </div>
      <Navigator paper={paper} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} responses={responses} review={review} onSubmit={()=>setConfirm(true)}/>
    </div>
    {confirm&&<div className="is-exam-modal-backdrop"><div className="is-exam-modal"><h2>Submit Paper 02?</h2><p>Your answers will be locked and SPARK will show the item-level marking review.</p><div><button className="is-exam-secondary" onClick={()=>setConfirm(false)}>Keep working</button><button className="is-exam-primary" onClick={()=>submit(false)}>Submit paper</button></div></div></div>}
  </main>;
}
