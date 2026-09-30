import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { readSparkHashRoute, subscribeSparkRoute, writeSparkNestedRoute } from "../../routing/sparkRoutingV270";
import {
  SOCIAL_STUDIES_COURSE,
  SOCIAL_STUDIES_LESSONS,
  SOCIAL_STUDIES_LESSON_BY_ID,
  socialStudiesLessonsForSection,
  socialStudiesSection,
} from "../data/socialStudiesCourse";
import SocialStudiesInteractiveActivity from "./SocialStudiesInteractiveActivity";
import SocialStudiesSbaToolkit from "./SocialStudiesSbaToolkit";
import "../socialStudies.css";

const SUBJECT_ID="social-studies";
const STUDY_PATH="/study/social-studies";

function parseRoute(){
  const route=readSparkHashRoute();
  if(route.path!==STUDY_PATH) return {sectionId:null,lessonId:null};
  const sectionId=String(route.params.get("section") || "");
  const lessonId=String(route.params.get("topic") || route.params.get("lesson") || "");
  return {
    sectionId:socialStudiesSection(sectionId)?.id || SOCIAL_STUDIES_LESSON_BY_ID[lessonId]?.sectionId || null,
    lessonId:SOCIAL_STUDIES_LESSON_BY_ID[lessonId]?.id || null,
  };
}

function PracticeCheck({ questions=[] , onComplete }){
  const [index,setIndex]=useState(0);
  const [choice,setChoice]=useState(null);
  const [checked,setChecked]=useState(false);
  const [score,setScore]=useState(0);
  useEffect(()=>{setIndex(0);setChoice(null);setChecked(false);setScore(0);},[questions]);

  if(!questions.length) return null;
  const q=questions[index];
  const correct=choice===q.answer;
  const last=index===questions.length-1;

  const check=()=>{
    if(choice==null || checked) return;
    setChecked(true);
    if(correct) setScore(value=>value+1);
  };
  const next=()=>{
    if(last){
      const finalScore=score+(checked && correct ? 0 : correct ? 1 : 0);
      onComplete?.({score:finalScore,total:questions.length});
      return;
    }
    setIndex(value=>value+1);
    setChoice(null);
    setChecked(false);
  };

  return <div className="ss-practice-check">
    <div className="ss-practice-progress">Question {index+1} of {questions.length}</div>
    <h4>{q.prompt}</h4>
    <div className="ss-practice-options">
      {q.choices.map((option,optionIndex)=><button
        type="button"
        key={option}
        disabled={checked}
        className={[
          choice===optionIndex ? "selected" : "",
          checked && optionIndex===q.answer ? "correct" : "",
          checked && choice===optionIndex && !correct ? "wrong" : "",
        ].filter(Boolean).join(" ")}
        onClick={()=>setChoice(optionIndex)}
      >
        <span>{String.fromCharCode(65+optionIndex)}</span>{option}
      </button>)}
    </div>
    {!checked ? <button type="button" className="ss-primary" disabled={choice==null} onClick={check}>Check answer</button> :
      <div className={`ss-inline-answer ${correct ? "correct" : "wrong"}`}>
        <strong>{correct ? "Correct." : "Not quite."}</strong> {q.explanation}
        <button type="button" className="ss-primary" onClick={next}>{last ? "Finish check" : "Next question"}</button>
      </div>}
  </div>;
}

function LessonView({ lesson, completed, onBack, onComplete, onActivity, saving }){
  const [examOpen,setExamOpen]=useState(false);
  const [examAnswer,setExamAnswer]=useState("");
  useEffect(()=>{setExamOpen(false);setExamAnswer("");window.scrollTo?.(0,0);},[lesson.id]);

  return <main className="ss-course">
    <div className="ss-shell">
      <button type="button" className="ss-back" onClick={onBack}><BackArrowIcon/><span>Back to course</span></button>
      <header className="ss-lesson-hero">
        <div className="ss-eyebrow">{lesson.sectionId} · Objectives {lesson.objectiveCodes.join(", ")}</div>
        <h1>{lesson.title}</h1>
        <p>{lesson.introduction}</p>
        <div className="ss-objective-chips">{lesson.objectiveCodes.map(code=><span key={code}>CXC {code}</span>)}</div>
      </header>

      <section className="ss-panel ss-objectives-panel">
        <div className="ss-panel-label">What CXC expects</div>
        <h2>Lesson goals</h2>
        <ul>{lesson.objectives.map(item=><li key={item}>{item}</li>)}</ul>
      </section>

      <section className="ss-panel">
        <div className="ss-panel-label">Learn it</div>
        <h2>Teacher notes</h2>
        <div className="ss-note-stack">
          {lesson.noteSections.map((section,index)=><article key={section.title || index}>
            <h3>{section.title}</h3>
            {(section.paragraphs || []).map((paragraph,i)=><p key={i}>{paragraph}</p>)}
            {section.bullets?.length>0 && <ul>{section.bullets.map(point=><li key={point}>{point}</li>)}</ul>}
          </article>)}
        </div>
      </section>

      <section className="ss-panel">
        <div className="ss-panel-label">Caribbean context</div>
        <h2>See it in real life</h2>
        <div className="ss-example-grid">{lesson.examples.map((example,index)=><article key={index}><span>{index+1}</span><p>{example}</p></article>)}</div>
      </section>

      {lesson.visual && lesson.interactive?.type!=="map-spotter" && lesson.interactive?.type!=="family-tree" && <figure className="ss-source-visual ss-panel">
        <img src={lesson.visual.imageUrl} alt={lesson.visual.title}/>
        <figcaption>{lesson.visual.attribution} <a href={lesson.visual.sourceUrl} target="_blank" rel="noreferrer">Source and licence</a></figcaption>
      </figure>}

      <SocialStudiesInteractiveActivity
        activity={lesson.interactive}
        visual={lesson.visual}
        onComplete={({score,total})=>onActivity?.({score,total})}
      />

      <section className="ss-panel">
        <div className="ss-panel-label">Know the language</div>
        <h2>Key terms</h2>
        <div className="ss-term-grid">
          {lesson.vocabulary.map(item=><article key={item.term}><strong>{item.term}</strong><p>{item.definition}</p>{item.example && <small>{item.example}</small>}</article>)}
        </div>
      </section>

      <section className="ss-panel">
        <div className="ss-panel-label">Practise it</div>
        <h2>Immediate check</h2>
        <PracticeCheck questions={lesson.practice} onComplete={({score,total})=>onActivity?.({score,total,kind:"lesson-check"})}/>
      </section>

      <section className="ss-panel ss-exam-panel">
        <div className="ss-exam-head">
          <div><div className="ss-panel-label">Exam it</div><h2>Write like a CXC candidate</h2></div>
          <span>{lesson.exam.marks} marks</span>
        </div>
        <p className="ss-exam-prompt">{lesson.exam.prompt}</p>
        <textarea value={examAnswer} onChange={e=>setExamAnswer(e.target.value)} placeholder="Plan and write your answer here before opening the guide."/>
        <button type="button" className="ss-secondary" onClick={()=>setExamOpen(value=>!value)}>{examOpen ? "Hide marking guide" : "Show marking guide"}</button>
        {examOpen && <div className="ss-marking-guide"><strong>A strong answer should:</strong><ol>{lesson.exam.guide.map(point=><li key={point}>{point}</li>)}</ol></div>}
      </section>

      <Card className="ss-key-points">
        <div className="ss-panel-label">Before you leave</div>
        <h2>Remember these</h2>
        <ul>{lesson.keyPoints.map(point=><li key={point}>{point}</li>)}</ul>
      </Card>

      <section className="ss-source-list">
        <strong>Lesson sources and further reading</strong>
        <div>{lesson.sources.map((source,index)=><a key={source.url+index} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}</div>
      </section>

      <div className="ss-complete-row">
        <button type="button" className={completed ? "ss-primary done" : "ss-primary"} disabled={saving || completed} onClick={onComplete}>
          {completed ? "✓ Lesson complete" : saving ? "Saving…" : "Mark lesson complete"}
        </button>
        <span>{completed ? "This lesson is recorded in your Social Studies progress." : "Complete the lesson when you can explain the key ideas without the notes."}</span>
      </div>
    </div>
  </main>;
}

export default function SocialStudiesSubjectView({ supabase, userId, onBack, showToast }){
  const routed=parseRoute();
  const [activeSectionId,setActiveSectionId]=useState(routed.sectionId);
  const [activeLessonId,setActiveLessonId]=useState(routed.lessonId);
  const [completedIds,setCompletedIds]=useState(new Set());
  const [saving,setSaving]=useState(false);
  const [toolkitOpen,setToolkitOpen]=useState(false);

  useEffect(()=>{
    let cancelled=false;
    if(!userId) return undefined;
    supabase.from("spark_subject_progress")
      .select("topic_id,activity_key,activity_type,completed")
      .eq("user_id",userId)
      .eq("subject_id",SUBJECT_ID)
      .eq("completed",true)
      .then(({data,error})=>{
        if(cancelled) return;
        if(error){
          if(!["42P01","PGRST205"].includes(error.code)) console.warn("Could not load Social Studies progress",error);
          return;
        }
        setCompletedIds(new Set((data || []).filter(row=>row.activity_type==="lesson").map(row=>String(row.topic_id || "").trim()).filter(Boolean)));
      });
    return ()=>{cancelled=true;};
  },[supabase,userId]);

  useEffect(()=>subscribeSparkRoute(()=>{
    const next=parseRoute();
    setActiveSectionId(next.sectionId);
    setActiveLessonId(next.lessonId);
  }),[]);

  const openLesson=useCallback(lesson=>{
    setActiveSectionId(lesson.sectionId);
    setActiveLessonId(lesson.id);
    writeSparkNestedRoute(STUDY_PATH,{section:lesson.sectionId,topic:lesson.id});
    window.scrollTo?.(0,0);
  },[]);

  const goHome=useCallback(()=>{
    setActiveSectionId(null);
    setActiveLessonId(null);
    writeSparkNestedRoute(STUDY_PATH,{});
    window.scrollTo?.(0,0);
  },[]);

  const activeLesson=activeLessonId ? SOCIAL_STUDIES_LESSON_BY_ID[activeLessonId] : null;

  const recordPractice=useCallback(async (lesson,{score=0,total=1,kind="interactive"}={})=>{
    if(!lesson) return;
    const percent=total>0 ? Math.round(score/total*100) : 0;
    const activityKey=`${kind}:${lesson.id}`;
    const result=await recordSubjectActivity({
      supabase,
      silent:true,
      activity:{
        subjectId:SUBJECT_ID,
        activityKey,
        activityType:"practice",
        sectionId:lesson.sectionId,
        topicId:lesson.id,
        title:`${lesson.title} ${kind==="interactive" ? "interactive" : "lesson check"}`,
        completed:true,
        score,
        maxScore:total,
        percent,
        metadata:{source:"social_studies_course_v1",kind,at:new Date().toISOString()},
      },
    });
    if(result?.error) console.warn("Could not save Social Studies practice",result.error);
  },[supabase]);

  const markComplete=useCallback(async lesson=>{
    if(!lesson || saving || completedIds.has(lesson.id)) return;
    setSaving(true);
    try{
      const result=await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:SUBJECT_ID,
          activityKey:`lesson:${lesson.id}`,
          activityType:"lesson",
          sectionId:lesson.sectionId,
          topicId:lesson.id,
          title:lesson.title,
          completed:true,
          metadata:{source:"social_studies_course_v1",objective_codes:lesson.objectiveCodes,at:new Date().toISOString()},
        },
      });
      if(result?.error) throw result.error;
      setCompletedIds(current=>new Set([...current,lesson.id]));
      showToast?.(`${lesson.title} completed.`,"success");
    }catch(error){
      console.error("Could not save Social Studies completion",error);
      showToast?.(error?.message || "Could not mark this lesson complete.","error");
    }finally{
      setSaving(false);
    }
  },[completedIds,saving,showToast,supabase]);

  if(toolkitOpen){
    return <SocialStudiesSbaToolkit
      onBack={()=>{setToolkitOpen(false);window.scrollTo?.(0,0);}}
      onComplete={async ({score,total})=>{
        const result=await recordSubjectActivity({
          supabase,
          silent:true,
          activity:{
            subjectId:SUBJECT_ID,
            activityKey:"tool:sba-research-lab",
            activityType:"practice",
            sectionId:"research-skills",
            topicId:"sba-research-toolkit",
            title:"Social Studies Research & SBA toolkit",
            completed:true,
            score,
            maxScore:total,
            percent:total>0 ? Math.round(score/total*100) : 0,
            metadata:{source:"social_studies_course_v1",kind:"research-toolkit",at:new Date().toISOString()},
          },
        });
        if(result?.error) console.warn("Could not save Social Studies research toolkit progress",result.error);
        else showToast?.("Research & SBA toolkit completed.","success");
      }}
    />;
  }

  if(activeLesson){
    return <LessonView
      lesson={activeLesson}
      completed={completedIds.has(activeLesson.id)}
      saving={saving}
      onBack={goHome}
      onComplete={()=>markComplete(activeLesson)}
      onActivity={result=>recordPractice(activeLesson,result)}
    />;
  }

  const completedCount=SOCIAL_STUDIES_LESSONS.filter(lesson=>completedIds.has(lesson.id)).length;
  const percent=Math.round(completedCount/SOCIAL_STUDIES_LESSONS.length*100);

  return <main className="ss-course">
    <div className="ss-shell">
      <button type="button" className="ss-back" onClick={onBack}><BackArrowIcon/><span>Back to Study</span></button>

      <header className="ss-course-hero">
        <div className="ss-eyebrow">CSEC Social Studies · CXC 14/G/SYLL 22</div>
        <h1>Know your society. Read the evidence. Explain it clearly.</h1>
        <p>{SOCIAL_STUDIES_COURSE.description}</p>
        <div className="ss-course-meta">
          <span><strong>{SOCIAL_STUDIES_LESSONS.length}</strong> lessons</span>
          <span><strong>4</strong> syllabus units</span>
          <span><strong>Paper 01 + 02</strong> exam preparation</span>
          <span><strong>SBA</strong> research skills throughout</span>
        </div>
        <div className="ss-course-hero-actions">
          <button type="button" className="ss-primary" onClick={()=>{setToolkitOpen(true);window.scrollTo?.(0,0);}}>Open Research & SBA toolkit</button>
        </div>
      </header>

      <section className="ss-progress-card">
        <div><span>Course progress</span><strong>{completedCount} of {SOCIAL_STUDIES_LESSONS.length} lessons</strong></div>
        <b>{percent}%</b>
        <ProgressBar value={completedCount} max={SOCIAL_STUDIES_LESSONS.length}/>
      </section>

      <section className="ss-section-grid">
        {SOCIAL_STUDIES_COURSE.sections.map(section=>{
          const lessons=socialStudiesLessonsForSection(section.id);
          const done=lessons.filter(lesson=>completedIds.has(lesson.id)).length;
          return <article className="ss-section-card" key={section.id}>
            <div className="ss-section-number">{section.id}</div>
            <div className="ss-section-copy">
              <span>{section.subtitle}</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <div className="ss-section-progress"><span>{done}/{lessons.length} complete</span><ProgressBar value={done} max={lessons.length}/></div>
            </div>
            <div className="ss-lesson-list">
              {lessons.map((lesson,index)=><button type="button" key={lesson.id} onClick={()=>openLesson(lesson)}>
                <span className="ss-lesson-index">{String(index+1).padStart(2,"0")}</span>
                <span><strong>{lesson.title}</strong><small>Objectives {lesson.objectiveCodes.join(", ")}</small></span>
                <em>{completedIds.has(lesson.id) ? "✓" : "→"}</em>
              </button>)}
            </div>
          </article>;
        })}
      </section>

      <section className="ss-source-list ss-course-source">
        <strong>Primary syllabus source</strong>
        <a href={SOCIAL_STUDIES_COURSE.source.url} target="_blank" rel="noreferrer">{SOCIAL_STUDIES_COURSE.source.label}</a>
        <span>Course mapped to the syllabus effective for examinations from May–June 2025.</span>
      </section>
    </div>
  </main>;
}
