import React,{useEffect,useState} from "react";
import FnhPaper1Exam from "./FnhPaper1Exam";
import FnhPaper2Exam from "./FnhPaper2Exam";
import FnhPracticalWorkbook from "./FnhPracticalWorkbook";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalPaperFormat} from "../data/fnhPastPaperInventory";
import {FNH_PAPER1_PRACTICE_SETS} from "../data/fnhPaper1Bank";
import {FNH_PAPER2_PRACTICE_SETS} from "../data/fnhPaper2Bank";
import "./fnhPractice.css";

const scrollTop=()=>{try{window.scrollTo?.({top:0,left:0,behavior:"instant"});}catch{}};

function FnhPaperLibrary({paper,onBack,onStart}){
  const [tab,setTab]=useState("practice");
  const [year,setYear]=useState("all");
  const isPaper1=paper===1;
  const years=FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===paper).filter(p=>year==="all"||String(p.year)===year)
    .sort((a,b)=>b.year-a.year);
  return <main className="fnh-exam fnh-practice-library"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button className="fnh-outline" type="button" onClick={onBack}>← Back to Food, Nutrition and Health practice</button></div>
    <header className="fnh-exam-card fnh-library-hero"><small>CSEC FOOD, NUTRITION AND HEALTH · PAPER {isPaper1?"01":"02"}</small>
      <h1>{isPaper1?"Paper 1: Multiple choice":"Paper 2: Structured questions"}</h1>
      <p>Choose a practice set or browse the supplied historical examination sources. Each ready paper starts with instructions and an examination timer.</p>
      <div className="fnh-library-facts"><span>{isPaper1?"60 questions":"6 compulsory questions"}</span><span>{isPaper1?"90 minutes":"150 minutes"}</span><span>{isPaper1?"60 marks":"96 marks"}</span></div>
    </header>
    <div className="fnh-library-tabs" role="group" aria-label="Choose practice or past papers">
      <button type="button" className={tab==="practice"?"active":""} aria-pressed={tab==="practice"} onClick={()=>setTab("practice")}>Practice sets</button>
      <button type="button" className={tab==="past"?"active":""} aria-pressed={tab==="past"} onClick={()=>setTab("past")}>Past papers</button>
    </div>
    {tab==="practice"?<div className="fnh-original-sets">
      {(isPaper1?FNH_PAPER1_PRACTICE_SETS:FNH_PAPER2_PRACTICE_SETS).map(set=>
        <section className="fnh-exam-card fnh-library-paper" key={set.number}>
          <span className="fnh-library-eyebrow">SPARK ORIGINAL PRACTICE</span>
          <h2>{set.label}</h2>
          <p>{isPaper1?"60 different syllabus-based multiple-choice questions, four choices each, with correct answers and explanations.":"Six compulsory structured questions with question-specific marking points and answer review."}</p>
          <p>{isPaper1?"1 hour 30 minutes · 60 marks":"2 hours 30 minutes · 96 marks"}</p>
          <button className="fnh-primary" type="button" onClick={()=>onStart(set.number)}>Select practice paper <span aria-hidden="true">→</span></button>
        </section>)}
    </div>:<>
      <div className="fnh-library-archive-intro"><div><h2>Historical Paper {paper} sources</h2><p>The supplied scans are recorded by year. Original wording, diagrams and answer keys are checked before a past paper is released for exam simulation.</p></div>
        <label>Year <select value={year} onChange={e=>setYear(e.target.value)}><option value="all">All years</option>{FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===paper).map(p=><option key={p.id} value={p.year}>{p.year}</option>)}</select></label>
      </div>
      <div className="fnh-library-archive-grid">{years.map(source=><article key={source.id} className="fnh-exam-card fnh-archive-card">
        <small>HISTORICAL SOURCE · MAY/JUNE</small><h3>{source.year} Paper {paper}</h3>
        <p>{fnhHistoricalPaperFormat(source)?.subject} · {source.sourceFormat==="scanned-image"?"Scanned pages":"Text-layer source"}</p>
        <span className="fnh-archive-status">Question and marking checks pending</span>
      </article>)}</div>
    </>}
  </div></main>;
}

export default function FnhPracticeHub({supabase,userId,onBack}){
  const [view,setView]=useState("home");
  const [selectedPaper1Set,setSelectedPaper1Set]=useState(1);
  const [selectedPaper2Set,setSelectedPaper2Set]=useState(1);
  useEffect(()=>{scrollTop();},[view]);
  if(view==="paper1"||view==="paper2")return <FnhPaperLibrary paper={view==="paper1"?1:2}
    onBack={()=>setView("home")} onStart={number=>{if(view==="paper1")setSelectedPaper1Set(number);else setSelectedPaper2Set(number);setView(view==="paper1"?"exam1":"exam2");}}/>;
  if(view==="exam1")return <FnhPaper1Exam key={selectedPaper1Set} setNumber={selectedPaper1Set} supabase={supabase} userId={userId} onBack={()=>setView("paper1")}/>;
  if(view==="exam2")return <FnhPaper2Exam key={selectedPaper2Set} setNumber={selectedPaper2Set} supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="workbook")return <FnhPracticalWorkbook userId={userId} onBack={()=>setView("home")}/>;
  return <main className="fnh-exam fnh-practice-home"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button className="fnh-outline" type="button" onClick={onBack}>← Back to practice</button></div>
    <header className="fnh-exam-card fnh-library-hero"><small>CSEC FOOD, NUTRITION AND HEALTH</small><h1>Choose an examination paper</h1><p>Practise Caribbean food and nutrition knowledge, food safety, meal planning and practical decision-making in a CSEC-style test.</p></header>
    <section className="fnh-library-choices" aria-label="Choose Food Nutrition and Health examination">
      <button type="button" onClick={()=>setView("paper1")}>
        <span className="fnh-choice-number">01</span><span><small>MULTIPLE CHOICE</small><strong>Paper 1</strong><span>60 questions · 90 minutes · Practice sets and historical sources</span></span><b aria-hidden="true">→</b>
      </button>
      <button type="button" onClick={()=>setView("paper2")}>
        <span className="fnh-choice-number">02</span><span><small>STRUCTURED RESPONSE</small><strong>Paper 2</strong><span>6 questions · 150 minutes · Model marking review</span></span><b aria-hidden="true">→</b>
      </button>
    </section>
    <section className="fnh-exam-card fnh-library-paper"><span className="fnh-library-eyebrow">PRACTICAL SKILLS</span>
      <h2>SBA practical workbook</h2><p>Plan 16 practical food activities, record evidence and prepare for three moderated assignments. All competency marks require teacher assessment.</p>
      <button type="button" className="fnh-primary" onClick={()=>setView("workbook")}>Open workbook →</button>
    </section>
  </div></main>;
}
