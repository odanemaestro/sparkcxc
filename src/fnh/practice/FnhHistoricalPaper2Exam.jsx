import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";

import {fnhPartMarkingScheme,fnhSelfAssessmentMark,fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
import FnhHistoricalDiagram from "./FnhHistoricalDiagram";
import "./fnhPractice.css";


const key=(user,paper)=>`spark:fnh:historical-p2:${user||"guest"}:${paper.id}`;
const blank=paper=>({paperId:paper.id,attemptId:`${Date.now()}-${Math.random().toString(36).slice(2)}`,
  phase:"instructions",answers:{},partB:[],active:1,deadline:null,selfReview:{},submittedAt:null});
const clock=s=>[Math.floor(s/3600),Math.floor((s%3600)/60),s%60].map(x=>String(Math.max(0,x)).padStart(2,"0")).join(":");
const goTop=()=>{try{window.scrollTo?.({top:0,left:0,behavior:"instant"});}catch{}};

export function fnhHistoricalExamStructure(paper,selected=[]){
  const selectedSet=new Set((selected||[]).map(Number));
  return {
    requiredPartA:3,
    requiredPartB:2,
    selectedPartB:paper.sectionBAvailable.filter(n=>selectedSet.has(n)),
    paperQuestions:paper.questions.filter(q=>q.section==="A"||(q.section==="B"&&selectedSet.has(q.number))),
    totalPotentialMarks:(3+paper.sectionBAvailable.filter(n=>selectedSet.has(n)).length)*16,
  };
}
export default function FnhHistoricalPaper2Exam({paper:PAPER,onBack,supabase,userId}){
  const EXAM_SECONDS=(PAPER.readingMinutes+PAPER.writingMinutes)*60;
  const [attempt,setAttempt]=useState(()=>{
    try{const data=JSON.parse(localStorage.getItem(key(userId,PAPER))||"null");
      return data?.paperId===PAPER.id&&["exam","review"].includes(data.phase)?data:blank(PAPER);
    }catch{return blank(PAPER);}
  });
  const [remaining,setRemaining]=useState(EXAM_SECONDS);
  const [modal,setModal]=useState("");
  const recorded=useRef(new Set());
  const exam=attempt.phase==="exam",review=attempt.phase==="review";
  const [workedByQuestion,setWorkedByQuestion]=useState({});
  useEffect(()=>{
    if(!review)return undefined;
    let live=true;
    import("../data/fnhPaper2UploadedWorkedReference").then(module=>{
      if(live)setWorkedByQuestion(module.FNH_P2_UPLOADED_WORKED_REFERENCE[String(PAPER.year)]||{});
    }).catch(()=>{if(live)setWorkedByQuestion({});});
    return()=>{live=false;};
  },[review,PAPER.year]);
  const structure=useMemo(()=>fnhHistoricalExamStructure(PAPER,attempt.partB),[attempt.partB]);
  const question=PAPER.questions.find(q=>q.number===attempt.active)||PAPER.questions[0];
  const visible=structure.paperQuestions;
  const selfScore=useMemo(()=>fnhSelfAssessmentTotal(visible,attempt.selfReview||{},attempt.answers),[visible,attempt.selfReview,attempt.answers]);
  const answered=visible.reduce((n,q)=>n+q.items.filter(p=>String(attempt.answers[`${q.id}:${p.id}`]||"").trim()).length,0);
  const totalParts=visible.reduce((n,q)=>n+q.items.length,0);
  const update=patch=>setAttempt(previous=>({...previous,...patch}));
  useEffect(()=>{try{localStorage.setItem(key(userId,PAPER),JSON.stringify(attempt));}catch{}},[attempt,userId]);
  useEffect(()=>{
    if(!exam)return undefined;
    const tick=()=>{
      const left=Math.max(0,Math.ceil((attempt.deadline-Date.now())/1000));
      setRemaining(left);
      if(left===0)update({phase:"review",submittedAt:Date.now()});
    };
    tick();const interval=setInterval(tick,1000);return()=>clearInterval(interval);
  },[exam,attempt.deadline]);
  useEffect(()=>{goTop();},[attempt.active,attempt.phase]);
  useEffect(()=>{
    if(!review||!userId||!supabase?.rpc||recorded.current.has(attempt.attemptId))return;
    recorded.current.add(attempt.attemptId);
    recordSubjectActivity({supabase,activity:{
      subjectId:"food-nutrition-and-health",
      activityKey:`practice:fnh-historical:${PAPER.id}:${attempt.attemptId}`,
      activityType:"practice",title:`${PAPER.subjectAtExamination} · May/June ${PAPER.year} Paper 02`,
      completed:true,score:null,maxScore:80,percent:null,
      metadata:{paper:"02",source:"historical_user_supplied_pdf",year:PAPER.year,session:"May/June",
        paper_id:PAPER.id,selected_part_b:attempt.partB,marking_scheme:"spark_explanatory",
        teacher_mark_required:true,at:new Date().toISOString()},
    }}).catch(error=>console.warn("Historical FNH result could not be saved",error));
  },[review,attempt.attemptId,attempt.partB,supabase,userId]);
  const selectPartB=number=>setAttempt(old=>{
    if(old.phase==="review")return old;
    const existing=old.partB||[];
    const next=existing.includes(number)?existing.filter(x=>x!==number):existing.length>=2?existing:[...existing,number];
    return {...old,partB:next,active:old.active===number&&!next.includes(number)?1:old.active};
  });
  const togglePoint=(partKey,id)=>setAttempt(old=>{
    const selected=old.selfReview?.[partKey]||[];
    return {...old,selfReview:{...old.selfReview,[partKey]:selected.includes(id)?selected.filter(p=>p!==id):[...selected,id]}};
  });
  const submit=()=>{update({phase:"review",submittedAt:Date.now()});setModal("");};
  const start=()=>{setAttempt({...blank(PAPER),phase:"exam",deadline:Date.now()+EXAM_SECONDS*1000});setRemaining(EXAM_SECONDS);setModal("");};
  const nextQuestion=delta=>{
    const index=visible.findIndex(q=>q.number===question.number);
    const next=visible[index+delta];
    if(next)update({active:next.number});
  };
  const partBChoices=<div className="fnh-historical-part-b">
    <h3>Part B: Select TWO questions</h3>
    <p>Select two of Questions 4, 5, 6 and 7. You must answer all three Part A questions and two from Part B.</p>
    <div className="fnh-historical-part-options">{PAPER.questions.filter(q=>q.section==="B").map(q=>
      <label key={q.number}><input type="checkbox" checked={(attempt.partB||[]).includes(q.number)}
        disabled={review||(!(attempt.partB||[]).includes(q.number)&&(attempt.partB||[]).length===2)}
        onChange={()=>selectPartB(q.number)}/><span><b>Question {q.number}</b>{q.title}</span></label>)}</div>
    <p role="status">{structure.selectedPartB.length}/2 Part B questions selected</p>
  </div>;
  if(attempt.phase==="instructions")return <main className="fnh-exam fnh-historical-exam">
    <div className="fnh-exam-container">
      <div className="fnh-exam-top"><button type="button" className="fnh-outline" onClick={onBack}>← Back to Paper 2 archive</button></div>
      <section className="fnh-exam-card fnh-instructions">
        <small>{PAPER.year} MAY/JUNE · {PAPER.subjectAtExamination.toUpperCase()} · GENERAL PROFICIENCY</small>
        <h1>Paper 2 examination instructions</h1>
        <p>This historical examination uses the {PAPER.year} General Proficiency format, not the current Food, Nutrition and Health examination structure.</p>
        <div className="fnh-exam-stats"><div><strong>5</strong><span>Questions to answer</span></div><div><strong>{PAPER.writingMinutes} min</strong><span>Writing time</span></div><div><strong>{PAPER.readingMinutes?`${PAPER.readingMinutes} min`:"Included"}</strong><span>{PAPER.readingMinutes?"Additional reading time":"Reading and planning"}</span></div><div><strong>80 marks</strong><span>Total</span></div></div>
        <h2>Original directions</h2><ol>
          <li>Part A has three compulsory questions. Answer all three.</li>
          <li>Part B has four questions. Select and answer two.</li>
          <li>Answer five questions altogether. Each carries 16 marks.</li>
          {PAPER.readingMinutes>0?<li>{PAPER.readingMinutes} minutes are allowed in addition to {PAPER.writingMinutes} minutes for writing. Writing may begin during reading time.</li>:<li>Time for reading and planning answers is included within the {PAPER.writingMinutes}-minute examination period.</li>}
          <li>Your timer starts when you select Start examination. Answers are saved in this browser.</li>
          <li>After submission, compare your responses with the model answers and marking points.</li>
        </ol>
        <p className="fnh-exam-note">Questions and mark allocations are transcribed from the supplied {PAPER.year} paper. The reference answers are SPARK explanations, not an official CXC mark scheme.</p>
        <button type="button" className="fnh-primary" onClick={start}>Start examination</button>
      </section>
    </div>
  </main>;
  return <main className="fnh-exam fnh-p2 fnh-historical-exam"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button type="button" className="fnh-outline" onClick={()=>exam?setModal("exit"):onBack?.()}>← {exam?"Exit examination":"Back to Paper 2 archive"}</button><span>{PAPER.year} MAY/JUNE · HISTORICAL PAPER 02</span></div>
    <header className="fnh-exam-card fnh-session-heading"><div><small>{review?"HISTORICAL PAPER · ANSWER REVIEW":`${PAPER.year} GENERAL PROFICIENCY · EXAMINATION`}</small>
      <h1>{PAPER.subjectAtExamination}</h1><p>{review?"Review all compulsory and selected optional questions.":`Question ${question.number} · ${answered}/${totalParts} parts answered`}</p></div>
      <div className="fnh-timer"><span>{review?"Self-checked marks":"Time remaining"}</span><strong>{review?`${selfScore.checked}/80`:clock(remaining)}</strong></div>
    </header>
    <div className="fnh-exam-layout">
      <section className="fnh-exam-card fnh-question">
        {partBChoices}
        <div className="fnh-question-head"><h2>Question {question.number}: {question.title}</h2><span className="fnh-p2-marks">16 marks · Part {question.section}</span></div>
        <p className="fnh-p2-context">{question.context}</p>
        {question.diagramId&&<FnhHistoricalDiagram type={question.diagramId}/> }
        <div className="fnh-p2-parts">{question.items.map(part=>{
          const partKey=`${question.id}:${part.id}`,answer=attempt.answers[partKey]||"",scheme=fnhPartMarkingScheme(part);
          return <section className="fnh-p2-part" key={part.id}>
            <div className="fnh-p2-prompt"><b>({part.id}) {part.prompt}</b><span>{part.marks} marks</span></div>
            <label><span className="fnh-p2-answer-label">Your answer</span><textarea rows={part.marks>=5?6:part.marks>=3?4:3} value={answer} disabled={review}
              aria-label={`Question ${question.number}, part ${part.id} answer`}
              onChange={e=>update({answers:{...attempt.answers,[partKey]:e.target.value}})}
              placeholder="Write your answer here…"/></label>
            {review&&<div className="fnh-p2-model-answer">
              <strong>Correct answer and marking points ({part.marks} marks)</strong>
              <p>{scheme.rule}</p>
              <div className="fnh-p2-marking-points">{scheme.points.map(point=><label key={point.id}>
                <input type="checkbox" disabled={!String(answer).trim()}
                  checked={Boolean((attempt.selfReview?.[partKey]||[]).includes(point.id))}
                  aria-label={`My answer includes point ${Number(point.id)+1} for question ${question.number}, part ${part.id}`}
                  onChange={()=>togglePoint(partKey,point.id)}/><span>{point.text}</span>
              </label>)}</div>
              <p><b>Explanation:</b> {part.explanation}</p><p><b>Self-check:</b> {fnhSelfAssessmentMark(part,attempt.selfReview?.[partKey]||[],answer)} / {part.marks}</p>
              <small>{scheme.note} A teacher must judge written explanations for an assessed score.</small>
            </div>}
          </section>;
        })}</div>
        {review&&workedByQuestion[String(question.number)]&&<details className="fnh-p2-worked-reference"><summary>Full worked answers and accepted examples for Question {question.number}</summary><p className="fnh-p2-worked-preformatted">{workedByQuestion[String(question.number)]}</p><small>Supplementary worked examples provided for practice. Use the existing mark-by-mark rubric to award credit. Other valid answers may earn marks; this reference does not automatically grade writing.</small></details>}
        <div className="fnh-question-actions"><button type="button" className="fnh-outline" disabled={visible[0]?.number===question.number} onClick={()=>nextQuestion(-1)}>Previous</button>
          <button type="button" className="fnh-outline" disabled={visible[visible.length-1]?.number===question.number} onClick={()=>nextQuestion(1)}>Next</button>
          {exam&&<button type="button" className="fnh-primary" onClick={()=>setModal((attempt.partB||[]).length===2?"submit":"select")}>Submit Paper 2</button>}
          {review&&<button type="button" className="fnh-primary" onClick={()=>setModal("restart")}>Start another attempt</button>}
        </div>
      </section>
      <aside className="fnh-exam-card fnh-navigation"><h2>Question navigator</h2>
        <p>Part A: 3 compulsory · Part B: {structure.selectedPartB.length} of 2 selected.</p>
        <div className="fnh-nav-grid fnh-p2-nav">{visible.map(q=><button key={q.id} type="button" className={q.number===question.number?"active":""}
          aria-current={q.number===question.number?"step":undefined} onClick={()=>update({active:q.number})}>Q{q.number}</button>)}</div>
        {review&&<div className="fnh-self-review-summary"><strong>{selfScore.checked} / 80 self-checked marks</strong>
          <p>Teacher assessment is required for final marks. Only your selected five questions count.</p></div>}
      </aside>
    </div>
    {modal&&<div className="fnh-modal-layer"><section className="fnh-modal" role="dialog" aria-modal="true" aria-label="Examination action">
      <h2>{modal==="select"?"Select two Part B questions":modal==="submit"?`Submit the ${PAPER.year} Paper 2?`:modal==="exit"?"Save and exit?":"Start a new attempt?"}</h2>
      <p>{modal==="select"?"Select exactly two questions from Part B before submitting.":modal==="submit"?"Your answers will be locked and the model answers shown.":modal==="exit"?"Your answers and the original deadline will remain saved on this device.":"Your saved responses will be replaced."}</p>
      <div><button type="button" className="fnh-outline" onClick={()=>setModal("")}>Cancel</button>
      <button type="button" className="fnh-primary" onClick={()=>modal==="exit"?onBack?.():modal==="submit"?submit():modal==="restart"?start():setModal("")}>
        {modal==="exit"?"Save and exit":modal==="submit"?"Submit now":modal==="restart"?"Start new attempt":"Choose questions"}</button></div>
    </section></div>}
  </div></main>;
}
