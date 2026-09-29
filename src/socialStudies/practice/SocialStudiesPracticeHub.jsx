import React, { useMemo, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ProgressBar from "../../components/ui/ProgressBar";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import {
  SOCIAL_STUDIES_COURSE,
  SOCIAL_STUDIES_LESSONS,
  socialStudiesPracticeQuestions,
} from "../data/socialStudiesCourse";
import "../socialStudies.css";

const ALL_QUESTIONS=socialStudiesPracticeQuestions();
const RESEARCH_LESSONS=new Set([
  "a1-family-foundations","a1-roles-changing-family","a1-parenthood-research",
  "a1-family-social-issues","a2-cohesion-control-interaction","a2-parties-information-decisions",
  "a2-election-outcomes-data","b1-population-foundations","b1-population-data",
  "b1-environment-data-action"
]);

function shuffled(items){
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function QuizSession({ title, questions, onExit, onFinish }){
  const [index,setIndex]=useState(0);
  const [choice,setChoice]=useState(null);
  const [checked,setChecked]=useState(false);
  const [answers,setAnswers]=useState([]);
  const current=questions[index];
  const score=answers.filter(item=>item.correct).length;
  const progress=Math.round(index/questions.length*100);

  if(!current) return null;

  const check=()=>{
    if(choice==null || checked) return;
    setChecked(true);
  };
  const next=()=>{
    const result={questionId:current.id,choice,correct:choice===current.answer};
    const nextAnswers=[...answers,result];
    if(index===questions.length-1){
      onFinish(nextAnswers);
      return;
    }
    setAnswers(nextAnswers);
    setIndex(value=>value+1);
    setChoice(null);
    setChecked(false);
    window.scrollTo?.(0,0);
  };

  return <main className="ss-practice-page">
    <div className="ss-practice-shell">
      <header className="ss-practice-session-head">
        <button type="button" className="ss-back" onClick={onExit}><BackArrowIcon/><span>Exit practice</span></button>
        <div><span>{title}</span><strong>Question {index+1} of {questions.length}</strong></div>
        <b>{score}/{answers.length}</b>
      </header>
      <ProgressBar value={index} max={questions.length}/>
      <article className="ss-question-card">
        <div className="ss-question-meta"><span>{current.sectionId}</span><span>{current.lessonTitle}</span></div>
        <h1>{current.prompt}</h1>
        <div className="ss-question-options">
          {current.choices.map((option,optionIndex)=><button
            type="button"
            key={option}
            disabled={checked}
            className={[
              choice===optionIndex ? "selected" : "",
              checked && optionIndex===current.answer ? "correct" : "",
              checked && choice===optionIndex && optionIndex!==current.answer ? "wrong" : "",
            ].filter(Boolean).join(" ")}
            onClick={()=>setChoice(optionIndex)}
          >
            <span>{String.fromCharCode(65+optionIndex)}</span><strong>{option}</strong>
          </button>)}
        </div>
        {!checked
          ? <button type="button" className="ss-primary" disabled={choice==null} onClick={check}>Check answer</button>
          : <div className={`ss-question-feedback ${choice===current.answer ? "correct" : "wrong"}`}>
              <strong>{choice===current.answer ? "Correct." : `Answer: ${String.fromCharCode(65+current.answer)}.`}</strong>
              <p>{current.explanation}</p>
              <button type="button" className="ss-primary" onClick={next}>{index===questions.length-1 ? "See results" : "Next question"}</button>
            </div>}
      </article>
      <div className="ss-practice-foot">Progress {progress}%</div>
    </div>
  </main>;
}

function Results({ title, answers, total, onAgain, onHome, examPrompt }){
  const score=answers.filter(item=>item.correct).length;
  const percent=Math.round(score/total*100);
  return <main className="ss-practice-page">
    <div className="ss-practice-shell">
      <section className="ss-results-card">
        <span className="ss-eyebrow">Practice complete</span>
        <h1>{percent}%</h1>
        <p>{score} of {total} correct in {title}.</p>
        <ProgressBar value={score} max={total}/>
        <div className="ss-results-actions">
          <button type="button" className="ss-primary" onClick={onAgain}>Try another set</button>
          <button type="button" className="ss-secondary" onClick={onHome}>Back to Social Studies practice</button>
        </div>
      </section>
      {examPrompt && <section className="ss-panel ss-exam-panel">
        <div className="ss-panel-label">Paper 02 extension</div>
        <h2>Now switch from recognition to writing</h2>
        <p className="ss-exam-prompt">{examPrompt.prompt}</p>
        <div className="ss-marking-guide"><strong>Plan around:</strong><ol>{examPrompt.guide.map(point=><li key={point}>{point}</li>)}</ol></div>
      </section>}
    </div>
  </main>;
}

export default function SocialStudiesPracticeHub({ supabase, userId, onBack }){
  const [mode,setMode]=useState("home");
  const [sectionId,setSectionId]=useState("A1");
  const [session,setSession]=useState([]);
  const [answers,setAnswers]=useState([]);
  const [sessionTitle,setSessionTitle]=useState("");

  const start=(kind,section=sectionId)=>{
    let pool=ALL_QUESTIONS;
    let count=10;
    let title="Social Studies practice";
    if(kind==="section"){
      pool=ALL_QUESTIONS.filter(item=>item.sectionId===section);
      count=Math.min(10,pool.length);
      const meta=SOCIAL_STUDIES_COURSE.sections.find(item=>item.id===section);
      title=`${section} · ${meta?.title || "Topic practice"}`;
    }else if(kind==="challenge"){
      count=Math.min(20,pool.length);
      title="20-question CSEC challenge";
    }else if(kind==="research"){
      pool=ALL_QUESTIONS.filter(item=>RESEARCH_LESSONS.has(item.lessonId));
      count=Math.min(12,pool.length);
      title="SBA and research skills lab";
    }
    setSession(shuffled(pool).slice(0,count));
    setSessionTitle(title);
    setAnswers([]);
    setMode("quiz");
  };

  const finish=async finalAnswers=>{
    setAnswers(finalAnswers);
    setMode("results");
    const score=finalAnswers.filter(item=>item.correct).length;
    const total=finalAnswers.length;
    const percent=total ? Math.round(score/total*100) : 0;
    const key=`practice:${Date.now()}`;
    const result=await recordSubjectActivity({
      supabase,
      activity:{
        subjectId:"social-studies",
        activityKey:key,
        activityType:"practice",
        sectionId:sessionTitle.startsWith("A1") || sessionTitle.startsWith("A2") || sessionTitle.startsWith("B1") || sessionTitle.startsWith("B2") ? sessionTitle.slice(0,2) : null,
        topicId:null,
        title:sessionTitle,
        completed:true,
        score,
        maxScore:total,
        percent,
        metadata:{source:"social_studies_practice_v1",question_ids:finalAnswers.map(item=>item.questionId),at:new Date().toISOString()},
      },
    });
    if(result?.error) console.warn("Could not save Social Studies practice attempt",result.error);
  };

  const examPrompt=useMemo(()=>{
    const question=session.find(item=>!answers.find(answer=>answer.questionId===item.id && answer.correct)) || session[0];
    const lesson=question ? SOCIAL_STUDIES_LESSONS.find(item=>item.id===question.lessonId) : null;
    return lesson?.exam || null;
  },[answers,session]);

  if(mode==="quiz") return <QuizSession title={sessionTitle} questions={session} onExit={()=>setMode("home")} onFinish={finish}/>;
  if(mode==="results") return <Results title={sessionTitle} answers={answers} total={session.length} examPrompt={examPrompt} onAgain={()=>start(sessionTitle.includes("research") ? "research" : sessionTitle.includes("20-question") ? "challenge" : "section",sectionId)} onHome={()=>setMode("home")}/>;

  return <main className="ss-practice-page">
    <div className="ss-practice-shell">
      <header className="ss-practice-hero">
        <div>
          <span className="ss-eyebrow">CSEC Social Studies practice</span>
          <h1>Practise the thinking CXC actually tests.</h1>
          <p>Use topic practice for recall and application, the challenge for mixed revision, or the research lab for source, questionnaire and data skills.</p>
        </div>
        <button type="button" className="ss-back" onClick={onBack}><BackArrowIcon/><span>Change subject</span></button>
      </header>

      <section className="ss-practice-modes">
        <article>
          <span>01</span><h2>Unit practice</h2>
          <p>Ten focused questions from one syllabus unit with immediate explanations.</p>
          <select value={sectionId} onChange={e=>setSectionId(e.target.value)}>
            {SOCIAL_STUDIES_COURSE.sections.map(section=><option key={section.id} value={section.id}>{section.id} · {section.title}</option>)}
          </select>
          <button type="button" className="ss-primary" onClick={()=>start("section")}>Start unit practice</button>
        </article>
        <article>
          <span>02</span><h2>20-question challenge</h2>
          <p>Mixed questions across family, governance, population, resources and regional development.</p>
          <button type="button" className="ss-primary" onClick={()=>start("challenge")}>Start challenge</button>
        </article>
        <article>
          <span>03</span><h2>SBA and research skills lab</h2>
          <p>Source reliability, questionnaires, interviews, data interpretation and evidence-based conclusions.</p>
          <button type="button" className="ss-primary" onClick={()=>start("research")}>Practise research skills</button>
        </article>
      </section>

      <section className="ss-practice-bank-note">
        <strong>{ALL_QUESTIONS.length} original questions available now</strong>
        <p>These are syllabus-aligned SPARK questions, not reproduced CXC past-paper items. Past-paper integration can be added separately when authorised material is supplied.</p>
      </section>
    </div>
  </main>;
}
