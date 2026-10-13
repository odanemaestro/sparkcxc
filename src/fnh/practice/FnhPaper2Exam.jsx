import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {FNH_PAPER2_FORMAT,FNH_PAPER2_ORIGINAL_SET_ONE} from "../data/fnhPaper2Bank";
import "./fnhPractice.css";

const KEY="FNH-SPARK-P2-ORIGINAL-01";
const SECONDS=FNH_PAPER2_FORMAT.minutes*60;
const saveKey=user=>`spark:fnh:paper2:${user||"guest"}:${KEY}`;
const make=()=>({id:KEY,attemptId:`${Date.now()}-${Math.random().toString(36).slice(2)}`,
  phase:"instructions",index:0,answers:{},deadline:null,submittedAt:null});
const clock=s=>[Math.floor(s/3600),Math.floor((s%3600)/60),s%60].map(x=>String(Math.max(0,x)).padStart(2,"0")).join(":");
const top=()=>{try{window.scrollTo?.({top:0,left:0,behavior:"instant"});}catch{}};

export function fnhPaper2EvidenceSummary(questions,answers){
  return questions.map(question=>({
    id:question.id,maximum:question.marks,
    answers:question.items.map(part=>({
      id:part.id,maximum:part.marks,answered:Boolean(String(answers[`${question.id}:${part.id}`]||"").trim()),
      requiresReview:true,modelPoints:part.modelPoints,
    })),
  }));
}

export default function FnhPaper2Exam({onBack,supabase,userId}){
  const [attempt,setAttempt]=useState(()=>{
    try{
      const value=JSON.parse(localStorage.getItem(saveKey(userId))||"null");
      return value?.id===KEY&&["exam","review"].includes(value.phase)?value:make();
    }catch{return make();}
  });
  const [remaining,setRemaining]=useState(SECONDS);
  const [modal,setModal]=useState("");
  const recorded=useRef(new Set());
  const paper=FNH_PAPER2_ORIGINAL_SET_ONE;
  const index=Math.max(0,Math.min(5,Number(attempt.index)||0));
  const question=paper[index];
  const review=attempt.phase==="review",exam=attempt.phase==="exam";
  const evidence=useMemo(()=>fnhPaper2EvidenceSummary(paper,attempt.answers),[paper,attempt.answers]);
  const answered=paper.reduce((sum,q)=>sum+q.items.filter(item=>String(attempt.answers[`${q.id}:${item.id}`]||"").trim()).length,0);
  const update=patch=>setAttempt(old=>({...old,...patch}));
  useEffect(()=>{try{localStorage.setItem(saveKey(userId),JSON.stringify(attempt));}catch{}},[attempt,userId]);
  useEffect(()=>{
    if(!exam)return undefined;
    const tick=()=>{
      const left=Math.max(0,Math.ceil((attempt.deadline-Date.now())/1000));
      setRemaining(left);
      if(left===0)update({phase:"review",submittedAt:Date.now()});
    };
    tick();const interval=setInterval(tick,1000);return()=>clearInterval(interval);
  },[exam,attempt.deadline]);
  useEffect(()=>top(),[index,attempt.phase]);
  useEffect(()=>{
    if(!review||!userId||!supabase?.rpc||recorded.current.has(attempt.attemptId))return;
    recorded.current.add(attempt.attemptId);
    // Open responses require human assessment. Record completion, not a fabricated percentage.
    recordSubjectActivity({supabase,activity:{
      subjectId:"food-nutrition-and-health",
      activityKey:`practice:fnh-paper2:${KEY}:${attempt.attemptId}`,
      activityType:"practice",title:"Food, Nutrition and Health Paper 02 · Original Set 1",
      completed:true,score:null,maxScore:96,percent:null,
      metadata:{source:"fnh_paper2_original_v1",paper:"02",paper_id:KEY,
        provisional:true,pending_teacher_review:true,question_count:6,total_marks:96,
        duration_minutes:150,answered_parts:answered,at:new Date().toISOString()},
    }}).catch(e=>console.warn("FNH Paper 2 completion could not be saved",e));
  },[review,userId,supabase,attempt.attemptId,answered]);
  const start=()=>{setAttempt({...make(),phase:"exam",deadline:Date.now()+SECONDS*1000});setRemaining(SECONDS);setModal("");};
  const submit=()=>{update({phase:"review",submittedAt:Date.now()});setModal("");};
  return <main className="fnh-exam fnh-p2"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button type="button" className="fnh-outline" onClick={()=>exam?setModal("exit"):onBack?.()}>← {exam?"Exit examination":"Back to paper selection"}</button><span>CSEC FOOD, NUTRITION AND HEALTH · PAPER 02</span></div>
    {attempt.phase==="instructions"?<section className="fnh-exam-card fnh-instructions">
      <small>ORIGINAL PRACTICE SET 1</small><h1>Paper 2 examination instructions</h1>
      <p>Read the instructions. The timer begins only when you select Start examination.</p>
      <div className="fnh-exam-stats"><div><strong>6</strong><span>Compulsory questions</span></div><div><strong>150 minutes</strong><span>Duration</span></div><div><strong>96 marks</strong><span>Maximum score</span></div><div><strong>16</strong><span>Marks per question</span></div></div>
      <h2>Instructions to candidates</h2><ol>
        <li>Answer all six questions. Each question carries 16 marks.</li>
        <li>Read the situation before answering the parts of each question.</li>
        <li>Use examples, explanations and calculations wherever a question asks.</li>
        <li>Questions test knowledge (6 marks each) and use of knowledge (10 marks each).</li>
        <li>Your responses and original deadline are saved if you leave and return.</li>
        <li>The examination submits automatically when the time expires.</li>
        <li>After submission, your answer appears beside model marking points and explanations.</li>
      </ol>
      <p className="fnh-exam-note">Extended responses require a teacher or examiner to award marks. SPARK will not invent an automatic mark where evidence needs judgement.</p>
      <button type="button" className="fnh-primary" onClick={start}>Start examination</button>
    </section>:<div className="fnh-session">
      <header className="fnh-exam-card fnh-session-heading"><div><small>{review?"ANSWER REVIEW · OPEN RESPONSE":"PAPER 02 · LIVE PRACTICE"}</small><h1>Food, Nutrition and Health</h1><p>{review?"Your answers are ready for marking-scheme review.":`Question ${index+1} of 6 · ${answered}/24 parts answered`}</p></div><div className="fnh-timer"><span>{review?"Marking":"Time remaining"}</span><strong>{review?"Review":clock(remaining)}</strong></div></header>
      <div className="fnh-exam-layout">
        <section className="fnh-exam-card fnh-question">
          <div className="fnh-question-head"><h2>Question {question.number}: {question.title}</h2><span className="fnh-p2-marks">16 marks</span></div>
          <p className="fnh-p2-context">{question.context}</p>
          <div className="fnh-p2-parts">{question.items.map(part=>{
            const key=`${question.id}:${part.id}`,text=attempt.answers[key]||"";
            return <div className="fnh-p2-part" key={part.id}>
              <div className="fnh-p2-prompt"><b>({part.id}) {part.prompt}</b><span>{part.marks} marks</span></div>
              <label><span className="fnh-p2-answer-label">Your response</span><textarea aria-label={`Question ${question.number} part ${part.id} answer`} rows={part.marks>=6?7:part.marks>=4?5:3}
                value={text} disabled={review}
                onChange={event=>update({answers:{...attempt.answers,[key]:event.target.value}})} placeholder="Write your answer here…"/></label>
              {review&&<div className="fnh-p2-model-answer"><strong>Correct answer: marking points</strong><ol>{part.modelPoints.map((point,i)=><li key={i}>{point}</li>)}</ol><p><b>Explanation:</b> {part.explanation}</p><small>Full marks require the number of relevant points, correct application and clear reasoning. A teacher must assess the response.</small></div>}
            </div>;
          })}</div>
          <div className="fnh-question-actions"><button type="button" className="fnh-outline" disabled={index===0} onClick={()=>update({index:index-1})}>Previous</button><button type="button" className="fnh-outline" disabled={index===5} onClick={()=>update({index:index+1})}>Next</button>{exam&&<button type="button" className="fnh-primary" onClick={()=>setModal("submit")}>Submit Paper 2</button>}{review&&<button type="button" className="fnh-primary" onClick={()=>setModal("restart")}>Start new attempt</button>}</div>
        </section>
        <aside className="fnh-exam-card fnh-navigation"><h2>Question navigator</h2><p>{answered} of 24 parts answered</p><div className="fnh-nav-grid fnh-p2-nav">{evidence.map((row,i)=><button type="button" className={`${index===i?"active":""} ${row.answers.every(v=>v.answered)?"answered":""}`} key={row.id} aria-label={`Question ${i+1}`} onClick={()=>update({index:i})}>Q{i+1}</button>)}</div><p>Six questions. Each carries 6 knowledge and 10 application marks.</p></aside>
      </div>
    </div>}
    {modal&&<div className="fnh-modal-layer"><section className="fnh-modal" role="dialog" aria-modal="true" aria-label={modal==="submit"?"Submit examination":modal==="exit"?"Exit examination":"Restart examination"}><h2>{modal==="exit"?"Save and exit?":modal==="submit"?"Submit your six answers?":"Start another attempt?"}</h2><p>{modal==="exit"?"Your answers and timer deadline will be preserved.":modal==="submit"?"Your written answers will be locked and the marking points shown.":"The new attempt replaces the current responses."}</p><div><button type="button" className="fnh-outline" onClick={()=>setModal("")}>Cancel</button><button type="button" className="fnh-primary" onClick={()=>modal==="exit"?onBack?.():modal==="submit"?submit():start()}>{modal==="exit"?"Save and exit":modal==="submit"?"Submit now":"Start again"}</button></div></section></div>}
  </div></main>;
}
