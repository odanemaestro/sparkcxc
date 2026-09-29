import React, { useEffect, useMemo, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ProgressBar from "../../components/ui/ProgressBar";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import {
  SOCIAL_STUDIES_COURSE,
  SOCIAL_STUDIES_LESSONS,
  socialStudiesPracticeQuestions,
} from "../data/socialStudiesCourse";
import {
  SOCIAL_STUDIES_EXAM_GUIDE,
  SOCIAL_STUDIES_PAPER1,
  SOCIAL_STUDIES_PAPER2,
} from "../data/socialStudiesExamBank";
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


function formatTime(seconds){
  const safe=Math.max(0,seconds);
  const hours=Math.floor(safe/3600);
  const minutes=Math.floor((safe%3600)/60);
  const secs=safe%60;
  return hours
    ? `${hours}:${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`
    : `${minutes}:${String(secs).padStart(2,"0")}`;
}

function Paper1Exam({ onExit, onComplete }){
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const [timeLeft,setTimeLeft]=useState(75*60);
  const current=SOCIAL_STUDIES_PAPER1[index];

  const finish=()=>{
    if(submitted) return;
    setSubmitted(true);
    const score=SOCIAL_STUDIES_PAPER1.reduce((total,item)=>total+(answers[item.id]===item.answer ? 1 : 0),0);
    onComplete?.(score,SOCIAL_STUDIES_PAPER1.length,answers);
    window.scrollTo?.(0,0);
  };

  useEffect(()=>{
    if(submitted) return undefined;
    if(timeLeft<=0){
      setSubmitted(true);
      const timedScore=SOCIAL_STUDIES_PAPER1.reduce((total,item)=>total+(answers[item.id]===item.answer ? 1 : 0),0);
      onComplete?.(timedScore,SOCIAL_STUDIES_PAPER1.length,answers);
      window.scrollTo?.(0,0);
      return undefined;
    }
    const timer=window.setInterval(()=>setTimeLeft(value=>Math.max(0,value-1)),1000);
    return ()=>window.clearInterval(timer);
  },[submitted,timeLeft,answers,onComplete]);

  const score=submitted
    ? SOCIAL_STUDIES_PAPER1.reduce((total,item)=>total+(answers[item.id]===item.answer ? 1 : 0),0)
    : 0;
  const answered=Object.keys(answers).length;
  const selected=answers[current.id];

  return <main className="ss-practice-page">
    <div className="ss-practice-shell">
      <header className="ss-practice-session-head ss-paper-head">
        <button type="button" className="ss-back" onClick={onExit}><BackArrowIcon/><span>Exit Paper 01</span></button>
        <div>
          <span>Paper 01 · General Proficiency</span>
          <strong>{submitted ? `Result ${score}/60` : `Question ${index+1} of 60`}</strong>
        </div>
        <b className={timeLeft<600 ? "urgent" : ""}>{submitted ? `${Math.round(score/60*100)}%` : formatTime(timeLeft)}</b>
      </header>

      <div className="ss-paper1-layout">
        <section>
          {submitted && <div className="ss-paper-summary">
            <span className="ss-eyebrow">Paper 01 complete</span>
            <h1>{score}/60</h1>
            <p>{Math.round(score/60*100)}% correct. Review each item and its explanation below.</p>
          </div>}

          <article className="ss-question-card ss-paper-question">
            <div className="ss-question-meta">
              <span>{current.sectionId.startsWith("A") ? "Section A" : "Section B"}</span>
              <span>Item {index+1}</span>
            </div>
            <h1>{current.prompt}</h1>
            <div className="ss-question-options">
              {current.choices.map((option,optionIndex)=><button
                type="button"
                key={option}
                disabled={submitted}
                className={[
                  selected===optionIndex ? "selected" : "",
                  submitted && optionIndex===current.answer ? "correct" : "",
                  submitted && selected===optionIndex && optionIndex!==current.answer ? "wrong" : "",
                ].filter(Boolean).join(" ")}
                onClick={()=>setAnswers(previous=>({...previous,[current.id]:optionIndex}))}
              >
                <span>{String.fromCharCode(65+optionIndex)}</span><strong>{option}</strong>
              </button>)}
            </div>
            {submitted && <div className={`ss-question-feedback ${selected===current.answer ? "correct" : "wrong"}`}>
              <strong>{selected===current.answer ? "Correct." : `Answer: ${String.fromCharCode(65+current.answer)}.`}</strong>
              <p>{current.explanation}</p>
            </div>}
            <div className="ss-paper-actions">
              <button type="button" className="ss-secondary" disabled={index===0} onClick={()=>{setIndex(value=>value-1);window.scrollTo?.(0,0);}}>Previous</button>
              {!submitted && index===59
                ? <button type="button" className="ss-primary" onClick={finish}>Submit Paper 01</button>
                : <button type="button" className="ss-primary" disabled={index===59} onClick={()=>{setIndex(value=>value+1);window.scrollTo?.(0,0);}}>Next</button>}
            </div>
          </article>
        </section>

        <aside className="ss-paper-nav">
          <div className="ss-paper-nav-top">
            <strong>{submitted ? "Review items" : "Question navigator"}</strong>
            <span>{answered}/60 answered</span>
          </div>
          <div className="ss-paper-nav-grid">
            {SOCIAL_STUDIES_PAPER1.map((item,itemIndex)=><button
              type="button"
              key={item.id}
              aria-label={`Go to question ${itemIndex+1}`}
              className={[
                itemIndex===index ? "active" : "",
                answers[item.id]!=null ? "answered" : "",
                submitted && answers[item.id]===item.answer ? "correct" : "",
                submitted && answers[item.id]!=null && answers[item.id]!==item.answer ? "wrong" : "",
              ].filter(Boolean).join(" ")}
              onClick={()=>{setIndex(itemIndex);window.scrollTo?.(0,0);}}
            >{itemIndex+1}</button>)}
          </div>
          {!submitted && <button type="button" className="ss-primary ss-paper-submit" onClick={finish}>Submit Paper 01</button>}
          <small>30 items from Section A and 30 from Section B. Recommended time: 1 hour 15 minutes.</small>
        </aside>
      </div>
    </div>
  </main>;
}

function Paper2Practice({ onExit, onComplete }){
  const [index,setIndex]=useState(0);
  const [responses,setResponses]=useState({});
  const [revealed,setRevealed]=useState({});
  const [completed,setCompleted]=useState(false);
  const current=SOCIAL_STUDIES_PAPER2[index];

  const setResponse=(key,value)=>setResponses(previous=>({...previous,[key]:value}));

  const finish=()=>{
    if(completed) return;
    setCompleted(true);
    onComplete?.();
    window.scrollTo?.(0,0);
  };

  return <main className="ss-practice-page">
    <div className="ss-practice-shell">
      <header className="ss-practice-session-head ss-paper-head">
        <button type="button" className="ss-back" onClick={onExit}><BackArrowIcon/><span>Exit Paper 02</span></button>
        <div>
          <span>Paper 02 · General Proficiency</span>
          <strong>Question {current.number} of 6 · {current.totalMarks} marks</strong>
        </div>
        <b>{current.type==="essay" ? "Essay" : "Structured"}</b>
      </header>

      {completed && <section className="ss-paper-summary">
        <span className="ss-eyebrow">Paper 02 practice complete</span>
        <h1>6 questions</h1>
        <p>Use the marking guides to check whether each response answers the command word, develops the point and uses relevant Caribbean examples.</p>
      </section>}

      <div className="ss-paper2-layout">
        <article className="ss-paper2-question">
          <div className="ss-question-meta">
            <span>Section {current.section}</span>
            <span>{current.heading}</span>
            <span>{current.totalMarks} marks</span>
          </div>
          <h1>{current.type==="essay" ? current.title : `Question ${current.number}`}</h1>
          <p className="ss-paper2-context">{current.context}</p>

          {current.data && <div className="ss-data-table-wrap ss-paper2-table">
            <table>
              <thead><tr>{current.data.columns.map(column=><th key={column}>{column}</th>)}</tr></thead>
              <tbody>{current.data.rows.map((row,rowIndex)=><tr key={rowIndex}>{row.map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>}

          {current.type==="structured" ? <div className="ss-paper2-parts">
            {current.parts.map((item,partIndex)=>{
              const key=`${current.id}:part:${partIndex}`;
              return <section className="ss-paper2-part" key={key}>
                <div><strong>{item.label}</strong><span>{item.marks} {item.marks===1 ? "mark" : "marks"}</span></div>
                <p>{item.prompt}</p>
                <textarea
                  value={responses[key] || ""}
                  onChange={event=>setResponse(key,event.target.value)}
                  placeholder="Write your response in complete sentences."
                />
                <button type="button" className="ss-secondary" onClick={()=>setRevealed(previous=>({...previous,[key]:!previous[key]}))}>
                  {revealed[key] ? "Hide marking guide" : "Show marking guide"}
                </button>
                {revealed[key] && <div className="ss-paper2-guide"><strong>Marking guide</strong>{item.guide.map(point=><p key={point}>{point}</p>)}</div>}
              </section>;
            })}
          </div> : <div className="ss-paper2-essay">
            <div className="ss-paper2-task-list">
              <strong>Your essay should:</strong>
              <ul>{current.tasks.map(task=><li key={task}>{task}</li>)}</ul>
            </div>
            <textarea
              value={responses[current.id] || ""}
              onChange={event=>setResponse(current.id,event.target.value)}
              placeholder="Plan briefly, then write your essay in organised paragraphs."
            />
            <button type="button" className="ss-secondary" onClick={()=>setRevealed(previous=>({...previous,[current.id]:!previous[current.id]}))}>
              {revealed[current.id] ? "Hide essay guide" : "Show essay guide"}
            </button>
            {revealed[current.id] && <div className="ss-paper2-guide">
              <strong>18 content marks + 4 organisation and development marks</strong>
              {current.guide.map(point=><p key={point}>{point}</p>)}
            </div>}
          </div>}

          <div className="ss-paper-actions">
            <button type="button" className="ss-secondary" disabled={index===0} onClick={()=>{setIndex(value=>value-1);window.scrollTo?.(0,0);}}>Previous</button>
            {index===5
              ? <button type="button" className="ss-primary" onClick={finish}>{completed ? "Paper 02 complete" : "Finish Paper 02 practice"}</button>
              : <button type="button" className="ss-primary" onClick={()=>{setIndex(value=>value+1);window.scrollTo?.(0,0);}}>Next question</button>}
          </div>
        </article>

        <aside className="ss-paper-nav">
          <div className="ss-paper-nav-top">
            <strong>Paper 02 navigator</strong>
            <span>100 marks total</span>
          </div>
          <div className="ss-paper2-nav-grid">
            {SOCIAL_STUDIES_PAPER2.map((item,itemIndex)=><button
              type="button"
              key={item.id}
              className={itemIndex===index ? "active" : ""}
              onClick={()=>{setIndex(itemIndex);window.scrollTo?.(0,0);}}
            >
              <span>Q{item.number}</span>
              <small>{item.type==="essay" ? "Essay" : "Structured"} · {item.totalMarks}</small>
            </button>)}
          </div>
          <small>Recommended time: 2 hours 40 minutes. Questions 1–4 are structured. Questions 5–6 are essays.</small>
        </aside>
      </div>
    </div>
  </main>;
}

export default function SocialStudiesPracticeHub({ supabase, userId, onBack }){
  const [mode,setMode]=useState("home");
  const [sectionId,setSectionId]=useState("A1");
  const [session,setSession]=useState([]);
  const [answers,setAnswers]=useState([]);
  const [sessionTitle,setSessionTitle]=useState("");

  const saveExamAttempt=async ({ paper, score=null, maxScore=null })=>{
    const percent=score!=null && maxScore ? Math.round(score/maxScore*100) : null;
    const result=await recordSubjectActivity({
      supabase,
      activity:{
        subjectId:"social-studies",
        activityKey:`${paper.toLowerCase().replace(/\s+/g,"-")}:${Date.now()}`,
        activityType:"practice",
        sectionId:null,
        topicId:null,
        title:`Social Studies ${paper}`,
        completed:true,
        score,
        maxScore,
        percent,
        metadata:{source:"social_studies_exam_style_v1",paper,at:new Date().toISOString()},
      },
    });
    if(result?.error) console.warn(`Could not save Social Studies ${paper} attempt`,result.error);
  };

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

  if(mode==="paper1") return <Paper1Exam
    onExit={()=>setMode("home")}
    onComplete={(score,total)=>saveExamAttempt({paper:"Paper 01",score,maxScore:total})}
  />;
  if(mode==="paper2") return <Paper2Practice
    onExit={()=>setMode("home")}
    onComplete={()=>saveExamAttempt({paper:"Paper 02"})}
  />;
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
        <article>
          <span>04</span><h2>Paper 01 exam practice</h2>
          <p>60 original multiple-choice items in the current CXC distribution, with 30 items from Section A and 30 from Section B.</p>
          <button type="button" className="ss-primary" onClick={()=>setMode("paper1")}>Start Paper 01</button>
        </article>
        <article>
          <span>05</span><h2>Paper 02 structured practice</h2>
          <p>Six compulsory questions using the current format, four structured questions and two essays, for 100 marks.</p>
          <button type="button" className="ss-primary" onClick={()=>setMode("paper2")}>Open Paper 02</button>
        </article>
      </section>

      <section className="ss-practice-bank-note">
        <strong>{ALL_QUESTIONS.length} topic questions + {SOCIAL_STUDIES_PAPER1.length} Paper 01 items + 6 Paper 02 questions</strong>
        <p>SPARK uses original questions. The exam sets follow the current CXC structure and the recurring command words, mark patterns and question style seen in the official specimen and historical papers indexed at the supplied archive.</p>
        <a href={SOCIAL_STUDIES_EXAM_GUIDE.archiveUrl} target="_blank" rel="noreferrer">Past-paper archive used as a style reference</a>
      </section>
    </div>
  </main>;
}
