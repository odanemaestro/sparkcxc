import FnhNavArrow from "./FnhNavArrow";
import React,{useEffect,useMemo,useRef,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {FNH_PAPER2_FORMAT,fnhGetPaper2Set} from "../data/fnhPaper2Bank";
import {fnhPartMarkingScheme,fnhSelfAssessmentMark,fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
import {fnhWorkedSupplement} from "../data/fnhPaper2WorkedAnswerSupplements";
import FnhHistoricalDiagram from "./FnhHistoricalDiagram";
import FnhFoodLabelDesigner from "./FnhFoodLabelDesigner";
import "./fnhPractice.css";


const SECONDS=FNH_PAPER2_FORMAT.minutes*60;
const saveKey=(user,key)=>`spark:fnh:paper2:${user||"guest"}:${key}`;
const make=key=>({id:key,attemptId:`${Date.now()}-${Math.random().toString(36).slice(2)}`,
  phase:"instructions",index:0,answers:{},selfReview:{},deadline:null,submittedAt:null});
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

export default function FnhPaper2Exam({onBack,supabase,userId,setNumber=1,historicalPaper=null}){
  const selected=fnhGetPaper2Set(setNumber);
  const paperId=historicalPaper?.id||`FNH-SPARK-P2-ORIGINAL-0${selected.number}`;
  const paper=historicalPaper?.questions||selected.questions;
  const historical=Boolean(historicalPaper);
  const examMinutes=historical?historicalPaper.writingMinutes:FNH_PAPER2_FORMAT.minutes;
  const durationSeconds=examMinutes*60;
  const examLabel=historical?`May/June ${historicalPaper.year} historical Paper 2`:selected.label;
  const totalParts=paper.reduce((total,q)=>total+q.items.length,0);
  const [attempt,setAttempt]=useState(()=>{
    try{
      const value=JSON.parse(localStorage.getItem(saveKey(userId,paperId))||"null");
      return value?.id===paperId&&["exam","review"].includes(value.phase)?value:make(paperId);
    }catch{return make(paperId);}
  });
  const [remaining,setRemaining]=useState(durationSeconds);
  const [modal,setModal]=useState("");
  const recorded=useRef(new Set());

  const index=Math.max(0,Math.min(5,Number(attempt.index)||0));
  const question=paper[index];
  const review=attempt.phase==="review",exam=attempt.phase==="exam";
  const [workedByQuestion,setWorkedByQuestion]=useState({});
  useEffect(()=>{
    if(!review||!historical)return undefined;
    let active=true;
    import("../data/fnhPaper2UploadedWorkedReference").then(module=>{
      if(active)setWorkedByQuestion(module.FNH_P2_UPLOADED_WORKED_REFERENCE[String(historicalPaper.year)]||{});
    }).catch(()=>{if(active)setWorkedByQuestion({});});
    return()=>{active=false;};
  },[review,historical,historicalPaper?.year]);
  const evidence=useMemo(()=>fnhPaper2EvidenceSummary(paper,attempt.answers),[paper,attempt.answers]);
  const selfScore=useMemo(()=>fnhSelfAssessmentTotal(paper,attempt.selfReview||{},attempt.answers),[paper,attempt.selfReview,attempt.answers]);
  const answered=paper.reduce((sum,q)=>sum+q.items.filter(item=>String(attempt.answers[`${q.id}:${item.id}`]||"").trim()).length,0);
  const update=patch=>setAttempt(old=>({...old,...patch}));
  const togglePoint=(key,id)=>setAttempt(old=>{const review=old.selfReview||{};const chosen=review[key]||[];
    return {...old,selfReview:{...review,[key]:chosen.includes(id)?chosen.filter(point=>point!==id):[...chosen,id]}};
  });
  useEffect(()=>{try{localStorage.setItem(saveKey(userId,paperId),JSON.stringify(attempt));}catch{}},[attempt,userId,paperId]);
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
    // Open responses are currently self-reviewed. Record completion without inventing an automatically graded percentage.
    recordSubjectActivity({supabase,activity:{
      subjectId:"food-nutrition-and-health",
      activityKey:`practice:fnh-paper2:${paperId}:${attempt.attemptId}`,
      activityType:"exam",title:`Food, Nutrition and Health Paper 02 · ${examLabel}`,
      completed:true,score:null,maxScore:96,percent:null,
      metadata:{source:historical?"historical_user_supplied_pdf":"fnh_paper2_original_v1",paper:"02",paper_id:paperId,
        historical,year:historicalPaper?.year||null,marking_scheme:historical?"spark_reference_explanations":"spark_original",
        provisional:true,spark_scoring_status:"self_review_only",question_count:6,total_marks:96,
        duration_minutes:examMinutes,answered_parts:answered,at:new Date().toISOString()},
    }}).catch(e=>console.warn("FNH Paper 2 completion could not be saved",e));
  },[review,userId,supabase,attempt.attemptId,answered,paperId,examLabel,examMinutes,historical,historicalPaper?.year]);
  const start=()=>{setAttempt({...make(paperId),phase:"exam",deadline:Date.now()+durationSeconds*1000});setRemaining(durationSeconds);setModal("");};
  const submit=()=>{update({phase:"review",submittedAt:Date.now()});setModal("");};
  return <main className="fnh-exam fnh-p2"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button type="button" className="fnh-outline" onClick={()=>exam?setModal("exit"):onBack?.()}><FnhNavArrow direction="left"/> {exam?"Exit examination":"Back to paper selection"}</button><span>CSEC FOOD, NUTRITION AND HEALTH · PAPER 02{historical?` · ${historicalPaper.year} MAY/JUNE`:""}</span></div>
    {attempt.phase==="instructions"?<section className="fnh-exam-card fnh-instructions">
      <small>{historical?`${historicalPaper.year} MAY/JUNE · TECHNICAL PROFICIENCY`:`ORIGINAL PRACTICE SET ${selected.number}`}</small><h1>Paper 2 examination instructions</h1>
      <p>Read the instructions. The timer begins only when you select Start examination.</p>
      <div className="fnh-exam-stats"><div><strong>6</strong><span>Compulsory questions</span></div><div><strong>{examMinutes} minutes</strong><span>Duration</span></div><div><strong>96 marks</strong><span>Maximum score</span></div><div><strong>16</strong><span>Marks per question</span></div></div>
      <h2>Instructions to candidates</h2><ol>
        <li>Answer all six questions. Each question carries 16 marks.</li>
        <li>Read the situation before answering the parts of each question.</li>
        <li>Use examples, explanations and calculations wherever a question asks.</li>
        {historical?<li>Answer every part according to the marks shown in the original paper.</li>:<li>Questions test knowledge (6 marks each) and use of knowledge (10 marks each).</li>}
        <li>Your responses and original deadline are saved if you leave and return.</li>
        <li>The examination submits automatically when the time expires.</li>
        <li>After submission, your answer appears beside model marking points and explanations.</li>
      </ol>
      <p className="fnh-exam-note">{historical?"Original questions have been transcribed from the supplied examination scan. The correct-answer explanations were written by SPARK and are not an official CXC marking scheme.":"SPARK currently provides marking points for self-review. Your written answers are not automatically graded yet."}</p>
      <button type="button" className="fnh-primary" onClick={start}>Start examination</button>
    </section>:<div className="fnh-session">
      <header className="fnh-exam-card fnh-session-heading"><div><small>{review?"ANSWER REVIEW · OPEN RESPONSE":"PAPER 02 · LIVE PRACTICE"}</small><h1>Food, Nutrition and Health</h1><p>{review?"Compare your answer with SPARK example points. Tick only ideas you actually wrote. This is self-check practice, not a grade.":`Question ${index+1} of 6 · ${answered}/${totalParts} parts answered`}</p></div><div className="fnh-timer"><span>{review?"Self-check · not graded":"Time remaining"}</span><strong>{review?`${selfScore.checked}/${selfScore.maximum}`:clock(remaining)}</strong></div></header>
      <div className="fnh-exam-layout">
        <section className="fnh-exam-card fnh-question">
          <div className="fnh-question-head"><h2>Question {question.number}: {question.title}</h2><span className="fnh-p2-marks">16 marks</span></div>
          <p className="fnh-p2-context">{question.context}</p>
          {question.diagramId&&<FnhHistoricalDiagram type={question.diagramId}/>}
          <div className="fnh-p2-parts">{question.items.map(part=>{
            const key=`${question.id}:${part.id}`,text=attempt.answers[key]||"";
            return <div className="fnh-p2-part" key={part.id}>
              <div className="fnh-p2-prompt"><b>({part.id}) {part.prompt}</b><span>{part.marks} marks</span></div>
              {historicalPaper?.year===2018&&question.number===6&&part.id==="d-i"
                ?<FnhFoodLabelDesigner key={key} value={text} disabled={review}
                  onChange={next=>update({answers:{...attempt.answers,[key]:next}})}/>
                :<label><span className="fnh-p2-answer-label">Your response</span><textarea aria-label={`Question ${question.number} part ${part.id} answer`} rows={part.marks>=6?7:part.marks>=4?5:3}
                value={text} disabled={review}
                onChange={event=>update({answers:{...attempt.answers,[key]:event.target.value}})} placeholder="Write your answer here…"/></label>}
              {review&&<div className="fnh-p2-model-answer">
                <strong>SPARK example answer points ({part.marks} possible marks, not an official CXC marking scheme)</strong>
                <p>{fnhPartMarkingScheme(part).rule}</p>
                <div className="fnh-p2-marking-points">{fnhPartMarkingScheme(part).points.map(point=><label key={point.id}>
                  <input type="checkbox" disabled={!String(text).trim()} checked={Boolean((attempt.selfReview?.[key]||[]).includes(point.id))}
                    onChange={()=>togglePoint(key,point.id)} aria-label={`My response includes marking point ${Number(point.id)+1} for question ${question.number} part ${part.id}`}/>
                  <span>{point.text}</span>
                </label>)}</div>
                {historical&&fnhWorkedSupplement(historicalPaper.year,question.number,part.id)&&<details className="fnh-p2-worked-reference"><summary>Additional worked-answer guidance</summary><p>{fnhWorkedSupplement(historicalPaper.year,question.number,part.id)}</p><small>Course reference only. Equivalent correct answers can earn credit; these examples do not add automatic marks.</small></details>}
                <p><b>Explanation:</b> {part.explanation}</p>
                <p><b>Your own check:</b> {fnhSelfAssessmentMark(part,attempt.selfReview?.[key]||[],text)} / {part.marks} possible points. This is not a marked result.</p>
                <small>{fnhPartMarkingScheme(part).note} Your self-check is practice feedback, not an official examination mark.</small>
              </div>}
            </div>;
          })}</div>
        {review&&historical&&workedByQuestion[String(question.number)]&&<details className="fnh-p2-worked-reference"><summary>Full worked answers and accepted examples for Question {question.number}</summary><p className="fnh-p2-worked-preformatted">{workedByQuestion[String(question.number)]}</p><small>Supplementary worked examples provided for practice. Use the existing mark-by-mark rubric to award credit. Other valid answers may earn marks; this reference does not automatically grade writing.</small></details>}
          <div className="fnh-question-actions"><button type="button" className="fnh-outline" disabled={index===0} onClick={()=>update({index:index-1})}>Previous</button><button type="button" className="fnh-outline" disabled={index===5} onClick={()=>update({index:index+1})}>Next</button>{exam&&<button type="button" className="fnh-primary" onClick={()=>setModal("submit")}>Submit Paper 2</button>}{review&&<button type="button" className="fnh-primary" onClick={()=>setModal("restart")}>Start new attempt</button>}</div>
        </section>
        <aside className="fnh-exam-card fnh-navigation"><h2>Question navigator</h2><p>{answered} of {totalParts} parts answered</p><div className="fnh-nav-grid fnh-p2-nav">{evidence.map((row,i)=><button type="button" className={`${index===i?"active":""} ${row.answers.every(v=>v.answered)?"answered":""}`} key={row.id} aria-label={`Question ${i+1}`} onClick={()=>update({index:i})}>Q{i+1}</button>)}</div><p>{historical?`Six compulsory historical questions, 16 marks each.`:"Six questions. Each carries 6 knowledge and 10 application marks."}</p>{review&&<div className="fnh-self-review-summary"><strong>{selfScore.checked} / {selfScore.maximum} points you selected yourself</strong><p>{selfScore.reviewedParts} of {selfScore.totalParts} parts checked against the model answers.</p><small>Not a grade, percentage or verified CXC mark. SPARK has not automatically assessed your written responses.</small></div>}</aside>
      </div>
    </div>}
    {modal&&<div className="fnh-modal-layer"><section className="fnh-modal" role="dialog" aria-modal="true" aria-label={modal==="submit"?"Submit examination":modal==="exit"?"Exit examination":"Restart examination"}><h2>{modal==="exit"?"Save and exit?":modal==="submit"?"Submit your six answers?":"Start another attempt?"}</h2><p>{modal==="exit"?"Your answers and timer deadline will be preserved.":modal==="submit"?"Your written answers will be locked and the marking points shown.":"The new attempt replaces the current responses."}</p><div><button type="button" className="fnh-outline" onClick={()=>setModal("")}>Cancel</button><button type="button" className="fnh-primary" onClick={()=>modal==="exit"?onBack?.():modal==="submit"?submit():start()}>{modal==="exit"?"Save and exit":modal==="submit"?"Submit now":"Start again"}</button></div></section></div>}
  </div></main>;
}
