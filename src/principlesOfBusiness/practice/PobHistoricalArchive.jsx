import React,{useEffect,useMemo,useState} from "react";
import {POB_HISTORICAL_REVIEW_BANKS,getPobHistoricalReviewBank} from "../data/pobHistoricalArchiveRegistry";
import "./pobHistoricalArchive.css";
import PobHistoricalPaper1Preview from "./PobHistoricalPaper1Preview";
import {startServerExamAttempt,submitServerExamAttempt} from "../../grading/serverExamAttempt";
import ServerMarkingReview from "../../grading/ServerMarkingReview";
import {defaultPobArchiveSelection,validatePobArchiveSelection,
  pobArchiveBankVersion,POB_ARCHIVE_RUBRIC_VERSION} from "../../grading/pobArchiveExaminer";

const sortPapers=(a,b)=>b.source.year-a.source.year||a.paper-b.paper||
 (a.source.sitting==="JAN"?-1:1)-(b.source.sitting==="JAN"?-1:1);
const answerChoice=row=>{
 const option=row.proposedOption||row.answer||row.correctOption||row.correctAnswer||null;
 return /^[ABCD]$/.test(String(option||""))?option:null;
};
const getMcqs=bank=>{
 const rows=Array.isArray(bank.questions)?bank.questions:Array.isArray(bank.entries)?bank.entries:Array.isArray(bank.proposedEntries)?bank.proposedEntries:[];
 return rows.filter(q=>Number.isInteger(q.number)).sort((a,b)=>a.number-b.number);
};
const sourceMissing=(row,bank)=>row?.sourceQuestionPresent===false||
 /missing|disputed|academic-dispute|uncertain/i.test(String(row?.status||row?.academicStatus||""))||
 Boolean(row?.dispute||row?.disputeType||row?.uncertainty||row?.issue||
         bank?.answerReviewNotes?.[row?.number]);
const key=(id)=>"spark:pob:archive:answers:"+id;
const read=id=>{try{return JSON.parse(window.localStorage.getItem(key(id))||"{}")}catch{return {}}};
const save=(id,value)=>{try{window.localStorage.setItem(key(id),JSON.stringify(value))}catch{}};

function HistoricalPaper1({record}){
 if(record.id==="POB-P1-2023-JAN")return <PobHistoricalPaper1Preview record={record}/>;
 const mcqs=useMemo(()=>getMcqs(record.bank),[record]);
 const [answers,setAnswers]=useState(()=>read(record.id));
 const [submitted,setSubmitted]=useState(false);
 useEffect(()=>{setAnswers(read(record.id));setSubmitted(false)},[record.id]);
 useEffect(()=>save(record.id,answers),[record.id,answers]);
 const gradable=mcqs.filter(q=>!sourceMissing(q,record.bank)&&answerChoice(q));
 const correct=gradable.filter(q=>answers[q.number]===answerChoice(q)).length;
 const answered=mcqs.filter(q=>answers[q.number]).length;
 return <section className="pob-archive-exam" aria-label="Historical Paper 1 practice">
   <h3>Paper 1 · Source-text incomplete</h3>
   <p>This historical paper does not yet contain the original question text and four answer choices in SPARK. An answer key alone is not a simulated examination. The answer sheet below is an optional reference tool for students who already have the printed question booklet.</p>
   <div className="pob-archive-summary"><span>{mcqs.length} entries in reference answer sheet</span><span>{answered} answered</span><span>{gradable.length} provisional key entries</span></div>
   {!mcqs.length?<p>The answer-key source for this paper needs further review.</p>:<details className="pob-archive-reference"><summary>Use optional answer sheet with your own original paper</summary>
     <div className="pob-archive-mcq-grid">{mcqs.map(row=>{
       const missing=sourceMissing(row,record.bank),choice=answers[row.number]||"",right=answerChoice(row);
       return <fieldset key={row.number} className={"pob-archive-mcq"+(missing?" is-missing":"")}>
         <legend>Question {row.number}</legend>
         {missing?<p>Missing or academically disputed source answer. Excluded from your provisional score.</p>:
         <div className="pob-archive-choices">{["A","B","C","D"].map(option=><label key={option}>
           <input type="radio" name={record.id+"-"+row.number} value={option}
             checked={choice===option} disabled={submitted}
             onChange={()=>setAnswers(prev=>({...prev,[row.number]:option}))}/>
           {option}
         </label>)}</div>}
         {submitted&&!missing&&<div className="pob-archive-answer">
           <strong>{right?"SPARK key: "+right:"Key under review"}</strong>
           {right&&<p>{choice===right?"Matches the SPARK answer.":choice?"Different from the SPARK key.":"No answer provided."}</p>}
           <p>{row.explanation||"No additional answer explanation recorded."}</p>
           {(row.uncertainty||row.disputeDetail||row.disputeType)&&<small>Flagged for academic review: {row.uncertainty||row.disputeDetail||row.disputeType}</small>}
         </div>}
       </fieldset>;
     })}</div>
     <div className="pob-archive-actions">
       {!submitted?<button type="button" className="pob-primary" onClick={()=>setSubmitted(true)}>Check answers against SPARK key</button>
       :<><strong role="status">Provisional score: {correct} / {gradable.length}</strong>
         <button type="button" className="secondary" onClick={()=>setSubmitted(false)}>Edit my answers</button></>}
     </div>
     <small>This score compares your selections with SPARK's provisional key, not an independently authenticated CXC marking key. Original stem/option verification and disputed items remain under review.</small>
   </details>}
 </section>;
}

function HistoricalPaper2({record,onOpenJanuary2026,supabase,userId}){
 const paper=record.bank,questions=Array.isArray(paper.questions)?paper.questions:[];
 const [answers,setAnswers]=useState(()=>read(record.id));
 const [submitted,setSubmitted]=useState(false);
 const [selected,setSelected]=useState(()=>defaultPobArchiveSelection(paper));
 const [serverAttemptId,setServerAttemptId]=useState(null);
 const [gradingBusy,setGradingBusy]=useState(false);
 const [gradingError,setGradingError]=useState("");
 useEffect(()=>{setAnswers(read(record.id));setSubmitted(false);
   setSelected(defaultPobArchiveSelection(paper));setServerAttemptId(null);setGradingError("");
 },[record.id,paper]);
 useEffect(()=>save(record.id,answers),[record.id,answers]);
 const selectionValid=validatePobArchiveSelection(paper,selected);
 const openQuestionCount=questions.length;
 const scoreEnabled=process.env.REACT_APP_SERVER_MARKING==="true" &&
   process.env.REACT_APP_POB_HISTORICAL_ARCHIVE_MARKING==="true";
 const gradeWithServer=async()=>{
  if(!selectionValid||gradingBusy||serverAttemptId)return;
  setGradingBusy(true);setGradingError("");
  try{
   const started=await startServerExamAttempt({supabase,subjectId:"principles-of-business",
     paper:"02",mode:"timed",durationSeconds:7200,
     bankVersion:pobArchiveBankVersion(record.id),
     rubricVersion:POB_ARCHIVE_RUBRIC_VERSION,graderVersion:"online-v1",
     metadata:{paper_id:record.id,source_sha256:record.source.sourceSha256,
       selected_questions:selected,source:"historical-cxc-archive"}});
   if(!started.available||!started.attempt_id)throw new Error("Historical attempt could not start");
   const snapshot={};
   for(const q of questions.filter(q=>selected.includes(q.number)))
     for(const part of (q.parts||q.items||[])){
       const id="Q"+q.number+":"+part.id;
       snapshot[record.id+":"+id]=String(answers[id]||"");
     }
   const result=await submitServerExamAttempt({
     supabase,attemptId:started.attempt_id,responses:snapshot,
     score:null,maxScore:100,metadata:{source:"historical-archive-practice",
       grading_status:"server-pending"}});
   if(!result.available)throw new Error("Historical answers could not be submitted");
   setServerAttemptId(started.attempt_id);
  }catch{
   setGradingError("Online marking could not be requested. Your answers are saved; please try again.");
  }finally{setGradingBusy(false);}
 };
 if(record.id==="POB-P2-2026-JAN")return <div className="pob-archive-exam">
  <h3>January 2026 Paper 2 · Full timed examination</h3>
  <p>This sitting has its original question text, written-response fields, a 100-mark SPARK examiner and a live AI-assisted practice-marking pilot.</p>
  <button type="button" className="pob-primary" onClick={onOpenJanuary2026}>Open timed January 2026 Paper 2</button>
 </div>;
 const parts=questions.reduce((n,q)=>n+(q.parts||q.items||[]).length,0);
 const total=questions.reduce((n,q)=>n+Number(q.marks||0),0);
 return <section className="pob-archive-exam" aria-label="Historical Paper 2 answer-bank review">
  <h3>Paper 2 · Written-answer practice and marking guide</h3>
  <p>This paper's SPARK-authored model answers and mark allocations are available. Where an exact printed question is not transcribed, use the corresponding original paper alongside this answer space. Some questions use SPARK-authored summaries rather than the original wording. This paper is not a complete source-faithful simulation until those prompts, figures and tables have been transcribed.</p>
  <div className="pob-archive-summary"><span>{questions.length} offered questions</span><span>{parts} answer parts</span><span>{total} offered marks</span><span>100 candidate marks</span></div>
  {openQuestionCount>5&&<div className="pob-archive-optional" aria-label="Original Paper 2 optional question selection">
    <strong>Choose the questions required by this sitting</strong>
    <p>The original rules require Questions 1, 2, 3 and one from each optional pair.</p>
    {[ [4,5],[6,7],...(openQuestionCount===9?[[8,9]]:[])].map(pair=><label key={pair[0]}>
      Question {pair[0]} or {pair[1]}
      <select value={selected.find(n=>pair.includes(n))||pair[0]}
        disabled={submitted}
        onChange={event=>setSelected(previous=>previous.filter(n=>!pair.includes(n))
           .concat(Number(event.target.value)).sort((a,b)=>a-b))}>
        {pair.map(n=><option key={n} value={n}>Question {n}</option>)}
      </select>
    </label>)}
  </div>}
  {questions.length?<>
   {questions.filter(q=>selected.includes(q.number)).map(q=><details className="pob-archive-question" key={q.number} open={q.number===1?true:undefined}>
     <summary>Question {q.number} · {q.marks||"?"} marks</summary>
     {(q.parts||q.items||[]).map(part=>{
       const id="Q"+q.number+":"+part.id;
       const exact=part.prompt||part.sourceQuestion||null;
       const prompt=exact||part.sourcePromptSummary||null;
       return <div className="pob-archive-written" key={id}>
         <label htmlFor={record.id+id}><strong>({part.id})</strong> {prompt||"Answer this part using the printed question paper."} <span>{part.marks} marks</span></label>
         {!exact&&<p className="pob-archive-small" role="note">SPARK question summary only. Original printed wording and any accompanying figures have not been verified here.</p>}
         <textarea id={record.id+id} rows={3} value={answers[id]||""} disabled={submitted}
           placeholder="Write your answer in complete sentences."
           onChange={e=>setAnswers(prev=>({...prev,[id]:e.target.value}))}/>
         {submitted&&<div className="pob-archive-scheme">
           <strong>SPARK model answer</strong><p>{part.modelAnswer||"Model answer is still being authored."}</p>
           <strong>Marking criteria</strong><ul>{(part.criteria||[]).map((criterion,i)=><li key={i}>
             {criterion.marks} mark{criterion.marks===1?"":"s"}: {criterion.rule}
           </li>)}</ul>
           <small>Credit equivalent correct ideas and explanations. This is a SPARK-authored guide, not an official CXC marking scheme.</small>
         </div>}
       </div>
     })}
   </details>)}
   <div className="pob-archive-actions">
     {!submitted?<button type="button" className="pob-primary" disabled={!selectionValid} onClick={()=>setSubmitted(true)}>Submit responses and view marking scheme</button>
       :<><p role="status">Your answers have been saved. SPARK's answer guidance is shown under each question.</p>
         <button type="button" className="secondary" onClick={()=>setSubmitted(false)}>Edit responses</button></>}
   </div>
   {submitted&&scoreEnabled&&<div className="pob-archive-scoring">
      <strong>Experimental AI-assisted Paper 2 examiner</strong>
      <p>Scores are provisional SPARK practice estimates. The original booklet and some question wording still require independent verification. Two automated assessments check each criterion; disagreement is shown as an uncertain score range.</p>
      {!serverAttemptId&&<button type="button" className="pob-primary"
       disabled={gradingBusy||!supabase?.rpc||!userId} onClick={gradeWithServer}>
       {gradingBusy?"Sending responses…":"Request detailed AI practice marking"}
      </button>}
      {gradingError&&<p role="status">{gradingError}</p>}
      {serverAttemptId&&<ServerMarkingReview supabase={supabase} attemptId={serverAttemptId} autoStart/>}
    </div>}
   <small>{scoreEnabled?"This sitting is a pilot assessment using internally authored criteria, not an official CXC grade.":"This sitting currently offers SPARK model answers and rubrics. Online numerical marking is unavailable until the archive pilot is deployed."}</small>
  </>:<p>No question-level marking guidance is available in this archive entry.</p>}
 </section>;
}

export default function PobHistoricalArchive({onBack,onOpenJanuary2026,supabase,userId}){
 const [kind,setKind]=useState("all"),[query,setQuery]=useState("");
 const records=useMemo(()=>POB_HISTORICAL_REVIEW_BANKS.slice().sort(sortPapers),[]);
 const filtered=records.filter(record=>(kind==="all"||record.paper===Number(kind))&&
   (record.label.toLowerCase().includes(query.toLowerCase())||record.id.toLowerCase().includes(query.toLowerCase())));
 const [selected,setSelected]=useState(null);
 const record=getPobHistoricalReviewBank(selected);
 useEffect(()=>{try{window.scrollTo?.({top:0,behavior:"instant"})}catch{}},[selected]);
 return <main className="pob-exam"><div className="pob-exam-shell pob-archive">
  <div className="pob-exam-nav"><button type="button" onClick={record?()=>setSelected(null):onBack}>← {record?"All historical papers":"Practice home"}</button><span>PRINCIPLES OF BUSINESS · HISTORICAL ARCHIVE</span></div>
  <header className="pob-exam-card pob-exam-intro"><span className="pob-exam-kicker">CSEC PRINCIPLES OF BUSINESS</span>
   <h1>{record?record.label:"Historical past papers"}</h1>
   <p>{record?"Original source identity preserved. SPARK-produced answer guidance is provided for practice.":"Browse all 46 supplied historical source papers. Completed source-backed examinations are marked clearly; incomplete papers show reference material rather than misleading empty simulations."}</p>
  </header>
  {record?<><div className="pob-archive-source"><strong>{record.source.filename}</strong><span>{record.source.pages} source pages · {record.source.year}</span>
   {record.source.reclassifiedFromPaper1&&<p>This original is Paper 2 although the supplied filename says Paper 1.</p>}
   {record.id==="POB-P1-2018-MJ"&&<p>The supplied scan omits original questions 53–57. SPARK does not invent these questions.</p>}
   {record.id==="POB-P2-2024-JAN"&&<p>Only a two-page typed transcription was supplied for this sitting; it is not the full original printed booklet.</p>}
  </div>
  {record.paper===1?<HistoricalPaper1 key={record.id} record={record}/>:<HistoricalPaper2 key={record.id} record={record} onOpenJanuary2026={onOpenJanuary2026} supabase={supabase} userId={userId}/>}
  <button type="button" className="secondary pob-archive-return" onClick={()=>setSelected(null)}>Back to all 46 historical papers</button>
  </>:<>
    <div className="pob-archive-toolbar"><label htmlFor="pob-archive-search">Find a historical sitting
      <input id="pob-archive-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by year or paper…"/>
    </label><label htmlFor="pob-archive-kind">Paper type
      <select id="pob-archive-kind" value={kind} onChange={e=>setKind(e.target.value)}>
       <option value="all">All 46 historical sources</option><option value="1">Paper 1 · 20 sources</option><option value="2">Paper 2 · 26 sources</option>
      </select>
    </label></div>
    <p className="pob-archive-small">{filtered.length} source papers shown. Select any sitting to view its practice answers and marking guidance.</p>
    <div className="pob-archive-list">{filtered.map(record=><button key={record.id} className="pob-archive-tile" type="button" onClick={()=>setSelected(record.id)}>
      <span><strong>{record.label}</strong><small>{record.source.pages} pages · {record.id==="POB-P1-2023-JAN"?"Full 60-question source paper":record.paper===1?"Answer-key reference · source text incomplete":"Written answers and mark schemes"}</small></span>
      <span className="pob-archive-arrow" aria-hidden="true">→</span>
    </button>)}</div>
  </>}
 </div></main>;
}
