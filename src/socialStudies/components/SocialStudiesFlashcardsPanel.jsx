import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";
import { SubjectChangeButton } from "../../subjects/SubjectSelectionView";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import { SOCIAL_STUDIES_COURSE, socialStudiesFlashcards } from "../data/socialStudiesCourse";
import "../socialStudies.css";
import "../../subjects/genericSubjectFlashcards.css";

const ALL_CARDS=socialStudiesFlashcards();

export default function SocialStudiesFlashcardsPanel({ supabase, userId, onChangeSubject, showToast }){
  const [sectionId,setSectionId]=useState("all");
  const [index,setIndex]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const [reviewed,setReviewed]=useState(new Set());
  const [dragX,setDragX]=useState(0);
  const [dragging,setDragging]=useState(false);
  const [settling,setSettling]=useState(false);
  const dragRef=useRef({pointerId:null,startX:0,lastX:0,lastTime:0,velocity:0,dragged:false});
  const suppressRevealRef=useRef(false);

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

  useEffect(()=>{setIndex(0);setRevealed(false);setDragX(0);},[sectionId]);

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

  const move=useCallback(direction=>{
    if(!cards.length) return false;
    const nextIndex=direction==="next"
      ? Math.min(cards.length-1,index+1)
      : Math.max(0,index-1);
    if(nextIndex===index) return false;
    setIndex(nextIndex);
    setRevealed(false);
    return true;
  },[cards.length,index]);

  const beginDrag=useCallback(event=>{
    if(!current) return;
    if(event.pointerType==="mouse" && event.button!==0) return;
    const now=performance.now();
    dragRef.current={
      pointerId:event.pointerId,
      startX:event.clientX,
      lastX:event.clientX,
      lastTime:now,
      velocity:0,
      dragged:false,
    };
    setSettling(false);
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  },[current]);

  const moveDrag=useCallback(event=>{
    const state=dragRef.current;
    if(state.pointerId!==event.pointerId) return;

    const rawDelta=event.clientX-state.startX;
    const atStart=index===0 && rawDelta>0;
    const atEnd=index>=cards.length-1 && rawDelta<0;
    const delta=(atStart || atEnd) ? rawDelta*0.24 : rawDelta;
    const now=performance.now();
    const elapsed=Math.max(1,now-state.lastTime);

    state.velocity=(event.clientX-state.lastX)/elapsed;
    state.lastX=event.clientX;
    state.lastTime=now;
    if(Math.abs(rawDelta)>7) state.dragged=true;
    setDragX(delta);
  },[cards.length,index]);

  const finishDrag=useCallback(event=>{
    const state=dragRef.current;
    if(state.pointerId!==event.pointerId) return;

    const rawDelta=event.clientX-state.startX;
    const direction=rawDelta<0 ? "next" : "previous";
    const shouldMove=Math.abs(rawDelta)>64 || Math.abs(state.velocity)>0.45;
    const moved=shouldMove ? move(direction) : false;

    suppressRevealRef.current=state.dragged;
    dragRef.current.pointerId=null;
    setDragging(false);
    setSettling(!moved);
    setDragX(0);

    window.setTimeout(()=>{
      suppressRevealRef.current=false;
      setSettling(false);
    },moved ? 0 : 260);
  },[move]);

  const cancelDrag=useCallback(event=>{
    if(dragRef.current.pointerId!==event.pointerId) return;
    suppressRevealRef.current=dragRef.current.dragged;
    dragRef.current.pointerId=null;
    setDragging(false);
    setSettling(true);
    setDragX(0);
    window.setTimeout(()=>{
      suppressRevealRef.current=false;
      setSettling(false);
    },260);
  },[]);

  return <section className="spark-generic-flashcards">
    <header className="spark-generic-flashcards-head">
      <div>
        <span className="section-kicker">CSEC SOCIAL STUDIES</span>
        <h1>Flashcards</h1>
        <p>Definitions, concepts and exam-ready ideas from every Social Studies unit.</p>
      </div>
      <SubjectChangeButton onClick={onChangeSubject}/>
    </header>

    <div className="spark-generic-flashcards-summary">
      <div><strong>{ALL_CARDS.length}</strong><span>Total cards</span></div>
      <div><strong>{reviewed.size}</strong><span>Reviewed</span></div>
      <div><strong>{SOCIAL_STUDIES_COURSE.sections.length}</strong><span>Units</span></div>
    </div>

    <nav className="spark-generic-flashcards-sections" aria-label="Filter Social Studies flashcards">
      <button type="button" className={sectionId==="all" ? "active" : ""} onClick={()=>setSectionId("all")}>All review</button>
      {SOCIAL_STUDIES_COURSE.sections.map(section=><button type="button" key={section.id} className={sectionId===section.id ? "active" : ""} onClick={()=>setSectionId(section.id)}>{section.id} {section.title}</button>)}
    </nav>

    <div className="spark-generic-flashcard-progress-row">
      <div><span>{reviewedInSelection} of {cards.length} reviewed</span><strong>{cards.length ? Math.round(reviewedInSelection/cards.length*100) : 0}%</strong></div>
      <ProgressBar value={reviewedInSelection} max={Math.max(cards.length,1)}/>
    </div>

    {current && <div className="spark-generic-flashcard-stage">
      <div className="spark-generic-flashcard-count">{index+1} of {cards.length}</div>
      <button
        key={current.id}
        type="button"
        className={`spark-generic-flashcard ${revealed ? "revealed" : ""} ${dragging ? "is-dragging" : ""} ${settling ? "is-settling" : ""}`}
        style={{"--spark-generic-flashcard-drag-x":`${dragX}px`}}
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={cancelDrag}
        onClick={event=>{
          if(suppressRevealRef.current){
            event.preventDefault();
            return;
          }
          reveal();
        }}
        onKeyDown={event=>{
          if(event.key==="ArrowLeft"){
            event.preventDefault();
            move("previous");
          }else if(event.key==="ArrowRight"){
            event.preventDefault();
            move("next");
          }
        }}
        aria-label={revealed ? `Flashcard answer: ${current.back}` : `Flashcard question: ${current.front}. Reveal answer.`}
      >
        <span className="spark-generic-flashcard-topic">{current.lessonTitle}</span>
        <div className="spark-generic-flashcard-copy">{revealed ? current.back : current.front}</div>
        <span className="spark-generic-flashcard-hint">{revealed ? "Answer" : "Tap to reveal the answer"}</span>
      </button>
      <div className="spark-generic-flashcard-nav">
        <button type="button" disabled={index===0} onClick={()=>move("previous")}>← Previous</button>
        <button type="button" disabled={index>=cards.length-1} onClick={()=>move("next")}>Next →</button>
      </div>
    </div>}
  </section>;
}
