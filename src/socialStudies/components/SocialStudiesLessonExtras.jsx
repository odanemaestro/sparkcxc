import React,{useEffect,useState} from "react";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import SocialStudiesInteractiveActivity from "./SocialStudiesInteractiveActivity";
import {SOCIAL_STUDIES_LESSON_BY_ID} from "../data/socialStudiesCourse";
import "../socialStudies.css";
import "../socialStudiesSharedReader.css";

function QuickCheck({questions=[],onComplete}){
 const [index,setIndex]=useState(0),[choice,setChoice]=useState(null);
 const [checked,setChecked]=useState(false),[score,setScore]=useState(0);
 useEffect(()=>{setIndex(0);setChoice(null);setChecked(false);setScore(0)},[questions]);
 if(!questions.length)return null;
 const question=questions[index],correct=choice===question.answer;
 const last=index===questions.length-1;
 const next=()=>{
   if(last){onComplete?.({score:score+(checked&&correct?0:correct?1:0),total:questions.length});return;}
   setIndex(x=>x+1);setChoice(null);setChecked(false);
 };
 return <div className="ss-practice-check">
  <span className="ss-practice-progress">Question {index+1} of {questions.length}</span>
  <h4>{question.prompt}</h4>
  <div className="ss-practice-options">
   {question.choices.map((option,i)=><button type="button" key={i}
     aria-pressed={choice===i} disabled={checked}
     className={[choice===i?"selected":"",checked&&i===question.answer?"correct":"",checked&&choice===i&&!correct?"wrong":""].filter(Boolean).join(" ")}
     onClick={()=>setChoice(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}
  </div>
  {!checked?<button className="ss-primary" type="button" disabled={choice===null} onClick={()=>{setChecked(true);if(correct)setScore(n=>n+1)}}>Check answer</button>:
   <div className={`ss-inline-answer ${correct?"correct":"wrong"}`} role="status">
    <strong>{correct?"Correct.":"Not quite."}</strong> {question.explanation}
    <button className="ss-primary" type="button" onClick={next}>{last?"Finish check":"Next question"}</button>
   </div>}
 </div>;
}

export default function SocialStudiesLessonExtras({topic,supabase}){
 const lesson=SOCIAL_STUDIES_LESSON_BY_ID[topic?.id];
 const [answer,setAnswer]=useState(""),[showGuide,setShowGuide]=useState(false);
 if(!lesson)return null;
 const record=async ({score=0,total=1,kind="interactive"}={})=>{
   const pct=total>0?Math.round(score/total*100):0;
   const result=await recordSubjectActivity({
     supabase,silent:true,
     activity:{
       subjectId:"social-studies",
       activityKey:`${kind}:${lesson.id}`,
       activityType:"practice",
       sectionId:lesson.sectionId,topicId:lesson.id,
       title:`${lesson.title} ${kind==="interactive"?"interactive":"lesson check"}`,
       completed:true,score,maxScore:total,percent:pct,
       metadata:{source:"social_studies_course_v1",kind,at:new Date().toISOString()}
     }
   });
   if(result?.error)console.warn("Could not save Social Studies activity",result.error);
 };
 return <div className="ss-shared-extras">
   <section className="ss-shared-section" id="social-studies-explore" aria-labelledby="ss-shared-explore-title">
     <div className="ss-shared-section-heading">
       <span className="ss-shared-section-kicker">APPLY WHAT YOU LEARNED</span>
       <h3 id="ss-shared-explore-title">Caribbean examples and activities</h3>
       <p>Explore a real-life situation, then try the interactive activity.</p>
     </div>
     <div className="ss-shared-examples">
       {lesson.examples.map((example,i)=><p key={i}><span aria-hidden="true">{String(i+1).padStart(2,"0")}</span>{example}</p>)}
     </div>
     {lesson.visual && lesson.interactive?.type!=="map-spotter" && lesson.interactive?.type!=="family-tree" &&
       <figure className="ss-source-visual ss-shared-visual">
         <img src={lesson.visual.imageUrl} alt={lesson.visual.title}/>
         <figcaption>{lesson.visual.attribution} <a href={lesson.visual.sourceUrl} target="_blank" rel="noreferrer">Source and licence</a></figcaption>
       </figure>}
     <SocialStudiesInteractiveActivity activity={lesson.interactive} visual={lesson.visual}
       onComplete={({score,total})=>record({score,total})}/>
     {lesson.vocabulary.length>0&&<details className="ss-shared-disclosure">
       <summary>Key terms <span>{lesson.vocabulary.length} definitions</span></summary>
       <dl>{lesson.vocabulary.map(row=><div key={row.term}>
         <dt>{row.term}</dt><dd>{row.definition}{row.example&&<p>{row.example}</p>}</dd>
       </div>)}</dl>
     </details>}
   </section>

   <section className="ss-shared-section" id="social-studies-practice" aria-labelledby="ss-shared-practice-title">
     <div className="ss-shared-section-heading">
       <span className="ss-shared-section-kicker">EXAM PRACTICE</span>
       <h3 id="ss-shared-practice-title">Check your understanding</h3>
       <p>Try these original lesson checks, then practise a written CSEC response.</p>
     </div>
     <QuickCheck questions={lesson.practice} onComplete={({score,total})=>record({score,total,kind:"lesson-check"})}/>
     <div className="ss-shared-essay">
       <div className="ss-shared-essay-heading"><h4>Written response</h4><span>{lesson.exam.marks} marks</span></div>
       <p>{lesson.exam.prompt}</p>
       <label htmlFor="social-studies-exam-answer">Your response</label>
       <textarea id="social-studies-exam-answer" value={answer} onChange={e=>setAnswer(e.target.value)}
         placeholder="Plan and write your answer before opening the marking guide."/>
       <button type="button" className="ss-secondary" aria-expanded={showGuide}
         onClick={()=>setShowGuide(open=>!open)}>{showGuide?"Hide marking guide":"Show marking guide"}</button>
       {showGuide&&<div className="ss-marking-guide" role="region" aria-label="Suggested marking guide">
         <strong>A strong answer should:</strong>
         <ol>{lesson.exam.guide.map(point=><li key={point}>{point}</li>)}</ol>
       </div>}
       <small>Use the marking guide for learning. Your draft is not automatically given an official CXC mark.</small>
     </div>
   </section>
   {lesson.sources.length>0&&<details className="ss-shared-disclosure ss-shared-sources">
     <summary>Sources and further reading</summary>
     <div className="ss-shared-source-links">
       {lesson.sources.map((source,i)=><a key={source.url+i} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}
     </div>
   </details>}
 </div>;
}
