import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";
import { SubjectChangeButton } from "../../subjects/SubjectSelectionView";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { SOCIAL_STUDIES_COURSE, socialStudiesFlashcards } from "../data/socialStudiesCourse";
import "../socialStudies.css";

const ALL_CARDS=socialStudiesFlashcards();

export default function SocialStudiesFlashcardsPanel({ supabase, userId, onChangeSubject, showToast }){
  const [sectionId,setSectionId]=useState("all");
  const [index,setIndex]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const [reviewed,setReviewed]=useState(new Set());

  useEffect(()=>{
    let cancelled=false;
    if(!userId) return undefined;
    supabase.from("spark_subject_progress")
      .select("activity_key,completed")
      .eq("user_id",userId)
      .eq("subject_id","social-studies")
      .eq("activity_type","flashcard_review")
      .eq("completed",true)
      .then(({data,error})=>{
        if(cancelled) return;
        if(!error) setReviewed(new Set((data || []).map(row=>String(row.activity_key || ""))));
      });
    return ()=>{cancelled=true;};
  },[supabase,userId]);

  const cards=useMemo(()=>sectionId==="all" ? ALL_CARDS : ALL_CARDS.filter(card=>card.sectionId===sectionId),[sectionId]);
  const current=cards[Math.min(index,cards.length-1)] || null;
  const reviewedInSelection=cards.filter(card=>reviewed.has(`flashcard:${card.id}`)).length;

  useEffect(()=>{setIndex(0);setRevealed(false);},[sectionId]);

  const markReviewed=useCallback(async card=>{
    if(!card) return;
    const activityKey=`flashcard:${card.id}`;
    if(reviewed.has(activityKey)) return;
    setReviewed(currentSet=>new Set([...currentSet,activityKey]));
    const result=await recordSubjectActivity({
      supabase,
      silent:true,
      activity:{
        subjectId:"social-studies",
        activityKey,
        activityType:"flashcard_review",
        sectionId:card.sectionId,
        topicId:card.lessonId,
        title:`${card.lessonTitle} flashcard`,
        completed:true,
        metadata:{source:"social_studies_flashcards_v1",at:new Date().toISOString()},
      },
    });
    if(result?.error){
      setReviewed(currentSet=>{const next=new Set(currentSet);next.delete(activityKey);return next;});
      showToast?.("Card opened, but review progress could not be saved.","error");
    }
  },[reviewed,showToast,supabase]);

  const reveal=()=>{
    if(!current) return;
    setRevealed(true);
    markReviewed(current);
  };

  const move=direction=>{
    setIndex(value=>{
      const next=Math.max(0,Math.min(cards.length-1,value+(direction==="next" ? 1 : -1)));
      return next;
    });
    setRevealed(false);
  };

  return <section className="ss-flashcards">
    <header className="ss-flashcards-head">
      <div>
        <span className="ss-eyebrow">CSEC Social Studies</span>
        <h1>Flashcards</h1>
        <p>Definitions, concepts and exam-ready ideas from every Social Studies unit.</p>
      </div>
      <SubjectChangeButton onClick={onChangeSubject}/>
    </header>

    <div className="ss-flashcard-stats">
      <article><strong>{ALL_CARDS.length}</strong><span>Total cards</span></article>
      <article><strong>{reviewed.size}</strong><span>Reviewed</span></article>
      <article><strong>{SOCIAL_STUDIES_COURSE.sections.length}</strong><span>Units</span></article>
    </div>

    <nav className="ss-flashcard-filters" aria-label="Filter Social Studies flashcards">
      <button type="button" className={sectionId==="all" ? "active" : ""} onClick={()=>setSectionId("all")}>All review</button>
      {SOCIAL_STUDIES_COURSE.sections.map(section=><button type="button" key={section.id} className={sectionId===section.id ? "active" : ""} onClick={()=>setSectionId(section.id)}>{section.id} {section.title}</button>)}
    </nav>

    <div className="ss-flashcard-progress">
      <div><span>{reviewedInSelection} of {cards.length} reviewed</span><strong>{cards.length ? Math.round(reviewedInSelection/cards.length*100) : 0}%</strong></div>
      <ProgressBar value={reviewedInSelection} max={Math.max(cards.length,1)}/>
    </div>

    {current && <div className="ss-flashcard-stage">
      <div className="ss-flashcard-counter">{index+1} of {cards.length}</div>
      <button type="button" className={`ss-flashcard ${revealed ? "revealed" : ""}`} onClick={reveal}>
        <span>{current.lessonTitle}</span>
        <strong>{revealed ? current.back : current.front}</strong>
        <small>{revealed ? "Answer" : "Tap to reveal"}</small>
      </button>
      <div className="ss-flashcard-nav">
        <button type="button" disabled={index===0} onClick={()=>move("previous")}>← Previous</button>
        <button type="button" disabled={index>=cards.length-1} onClick={()=>move("next")}>Next →</button>
      </div>
    </div>}
  </section>;
}
