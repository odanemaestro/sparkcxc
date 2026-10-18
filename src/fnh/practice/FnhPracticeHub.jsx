import FnhNavArrow from "./FnhNavArrow";
import React,{useEffect,useState} from "react";
import FnhPaper1Exam from "./FnhPaper1Exam";
import FnhHistoricalPaper1Reader from "./FnhHistoricalPaper1Reader";
import FnhPaper2Exam from "./FnhPaper2Exam";
import FnhPracticalWorkbook from "./FnhPracticalWorkbook";
import FnhHistorical2005Paper2Exam from "./FnhHistorical2005Paper2Exam";
import FnhHistorical2006Paper2Exam from "./FnhHistorical2006Paper2Exam";
import FnhHistorical2008Paper2Exam from "./FnhHistorical2008Paper2Exam";
import FnhHistorical2009Paper2Exam from "./FnhHistorical2009Paper2Exam";
import FnhHistorical2010Paper2Exam from "./FnhHistorical2010Paper2Exam";
import FnhHistorical2011Paper2Exam from "./FnhHistorical2011Paper2Exam";
import FnhHistorical2012Paper2Exam from "./FnhHistorical2012Paper2Exam";
import FnhHistorical2013Paper2Exam from "./FnhHistorical2013Paper2Exam";
import FnhHistorical2014Paper2Exam from "./FnhHistorical2014Paper2Exam";
import FnhHistorical2015Paper2Exam from "./FnhHistorical2015Paper2Exam";
import FnhHistorical2016Paper2Exam from "./FnhHistorical2016Paper2Exam";
import FnhHistorical2017Paper2Exam from "./FnhHistorical2017Paper2Exam";
import FnhHistorical2018Paper2Exam from "./FnhHistorical2018Paper2Exam";
import FnhHistorical2019Paper2Exam from "./FnhHistorical2019Paper2Exam";
import FnhHistorical2021Paper2Exam from "./FnhHistorical2021Paper2Exam";
import FnhHistorical2022Paper2Exam from "./FnhHistorical2022Paper2Exam";
import FnhHistorical2024Paper2Exam from "./FnhHistorical2024Paper2Exam";
import FnhHistorical2026Paper2Exam from "./FnhHistorical2026Paper2Exam";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalPaperFormat,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {FNH_PAPER1_PRACTICE_SETS} from "../data/fnhPaper1Bank";
import {FNH_PAPER2_PRACTICE_SETS} from "../data/fnhPaper2Bank";
import {fnhHistoricalPaper1Reader} from "../data/fnhHistoricalPaper1ReleaseGate";
import "./fnhPractice.css";

const scrollTop=()=>{try{window.scrollTo?.({top:0,left:0,behavior:"instant"});}catch{}};

function FnhPaperLibrary({paper,onBack,onStart,onStartHistorical,onReviewHistorical,tab,onTabChange}){
  const [year,setYear]=useState("all");
  const isPaper1=paper===1;
  const years=FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===paper&&!(paper===1&&p.year===2021)).filter(p=>year==="all"||String(p.year)===year)
    .sort((a,b)=>b.year-a.year);
  return <main className="fnh-exam fnh-practice-library"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button className="fnh-outline" type="button" onClick={onBack}><FnhNavArrow direction="left"/> Back to Food, Nutrition and Health practice</button></div>
    <header className="fnh-exam-card fnh-library-hero"><small>CSEC FOOD, NUTRITION AND HEALTH · PAPER {isPaper1?"01":"02"}</small>
      <h1>{isPaper1?"Paper 1: Multiple choice":"Paper 2: Structured questions"}</h1>
      <p>Choose a practice set or browse the supplied historical examination sources. Each ready paper starts with instructions and an examination timer.</p>
      <div className="fnh-library-facts"><span>{isPaper1?"SPARK practice: 60 questions":"SPARK practice: 6 questions"}</span><span>{isPaper1?"90-minute original sets":"150-minute original sets"}</span><span>Historical formats vary by year</span></div>
    </header>
    <div className="fnh-library-tabs" role="group" aria-label="Choose practice or past papers">
      <button type="button" className={tab==="practice"?"active":""} aria-pressed={tab==="practice"} onClick={()=>onTabChange("practice")}>Practice sets</button>
      <button type="button" className={tab==="past"?"active":""} aria-pressed={tab==="past"} onClick={()=>onTabChange("past")}>Past papers</button>
    </div>
    {tab==="practice"?<div className="fnh-original-sets">
      {(isPaper1?FNH_PAPER1_PRACTICE_SETS:FNH_PAPER2_PRACTICE_SETS).map(set=>
        <section className="fnh-exam-card fnh-library-paper" key={set.number}>
          <span className="fnh-library-eyebrow">SPARK ORIGINAL PRACTICE</span>
          <h2>{set.label}</h2>
          <p>{isPaper1?"60 different syllabus-based multiple-choice questions, four choices each, with correct answers and explanations.":"Six compulsory structured questions with question-specific marking points and answer review."}</p>
          <p>{isPaper1?"1 hour 30 minutes · 60 marks":"2 hours 30 minutes · 96 marks"}</p>
          <button className="fnh-primary" type="button" onClick={()=>onStart(set.number)}>Select practice paper <FnhNavArrow/></button>
        </section>)}
    </div>:<>
      <div className="fnh-library-archive-intro"><div><h2>Historical Paper {paper} sources</h2><p>Browse past papers by year. Papers with verified marking are available as timed examinations.</p></div>
        <label>Year <select value={year} onChange={e=>setYear(e.target.value)}><option value="all">All years</option>{FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===paper&&!(paper===1&&p.year===2021)).map(p=><option key={p.id} value={p.year}>{p.year}</option>)}</select></label>
      </div>
      <div className="fnh-library-archive-grid">{years.map(source=><article key={source.id} className="fnh-exam-card fnh-archive-card">
        <small>HISTORICAL SOURCE · MAY/JUNE</small><h3>{source.year} Paper {paper}</h3>
        <p>{fnhHistoricalPaperFormat(source)?.subject || "Food, Nutrition and Health"} · May/June</p>
        {fnhHistoricalSimulatorReady(source.id)?<>
          <p>Original questions transcribed and checked</p>
          <button type="button" className="fnh-primary" onClick={()=>onStartHistorical(source.id)}>Start examination <FnhNavArrow/></button>
        </>:source.paper===1&&fnhHistoricalPaper1Reader(source.id)?.questions.length>0?<>
          <p>Read and practise the original questions from this source. No marks are awarded until the answer-key review is complete.</p>
          {source.id==="FNH-P1-2004-MJ"&&<p>Questions 46–47: possible choices found in other examination years, but the original scan does not show their options.</p>}
          {source.id==="FNH-P1-2005-MJ"&&<p>The supplied scan ends at Question 53; Questions 54–60 are missing.</p>}
          <button type="button" className="fnh-outline" onClick={()=>onReviewHistorical(source.id)}>Practise questions and review score <FnhNavArrow/></button>
        </>:<p>Question and marking checks pending</p>}
      </article>)}</div>
    </>}
  </div></main>;
}

export default function FnhPracticeHub({supabase,userId,onBack}){
  // Keep the chosen FNH paper on refresh within this browser session.
  // Exam answers and deadlines remain managed by the individual exam screens.
  const sessionKey=`spark:fnh:practice-navigation:${userId||"guest"}`;
  const savedNavigation=(()=>{
    try{return JSON.parse(sessionStorage.getItem(sessionKey)||"null")||{};}catch{return {};}
  })();
  const allowedViews=new Set(["home","paper1","paper2","exam1","exam2","review-p1","workbook",
    ...[2005,2006,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2021,2022,2024,2026].map(year=>`historical-${year}-p2`)]);
  const [view,setView]=useState(()=>allowedViews.has(savedNavigation.view)?savedNavigation.view:"home");
  const [selectedPaper1Set,setSelectedPaper1Set]=useState(()=>Number(savedNavigation.selectedPaper1Set)||1);
  const [selectedPaper2Set,setSelectedPaper2Set]=useState(()=>Number(savedNavigation.selectedPaper2Set)||1);
  const [selectedHistoricalP1,setSelectedHistoricalP1]=useState(()=>savedNavigation.selectedHistoricalP1||null);
  const [paperLibraryTabs,setPaperLibraryTabs]=useState(()=>savedNavigation.paperLibraryTabs||{1:"practice",2:"practice"});
  useEffect(()=>{
    try{sessionStorage.setItem(sessionKey,JSON.stringify({view,selectedPaper1Set,selectedPaper2Set,selectedHistoricalP1,paperLibraryTabs}));}catch{}
  },[sessionKey,view,selectedPaper1Set,selectedPaper2Set,selectedHistoricalP1,paperLibraryTabs]);
  useEffect(()=>{scrollTop();},[view]);
  if(view==="paper1"||view==="paper2")return <FnhPaperLibrary paper={view==="paper1"?1:2}
    tab={paperLibraryTabs[view==="paper1"?1:2]} onTabChange={next=>setPaperLibraryTabs(old=>({...old,[view==="paper1"?1:2]:next}))}
    onReviewHistorical={id=>{setSelectedHistoricalP1(id);setView("review-p1");}}
    onBack={()=>setView("home")} onStart={number=>{if(view==="paper1")setSelectedPaper1Set(number);else setSelectedPaper2Set(number);setView(view==="paper1"?"exam1":"exam2");}} onStartHistorical={id=>{if(id==="FNH-P2-2005-MJ")setView("historical-2005-p2");
    if(id==="FNH-P2-2006-MJ")setView("historical-2006-p2");
    if(id==="FNH-P2-2008-MJ")setView("historical-2008-p2");
    if(id==="FNH-P2-2009-MJ")setView("historical-2009-p2");
    if(id==="FNH-P2-2010-MJ")setView("historical-2010-p2");
    if(id==="FNH-P2-2011-MJ")setView("historical-2011-p2");
    if(id==="FNH-P2-2012-MJ")setView("historical-2012-p2");
    if(id==="FNH-P2-2013-MJ")setView("historical-2013-p2");
    if(id==="FNH-P2-2014-MJ")setView("historical-2014-p2");
    if(id==="FNH-P2-2015-MJ")setView("historical-2015-p2");
    if(id==="FNH-P2-2016-MJ")setView("historical-2016-p2");
    if(id==="FNH-P2-2017-MJ")setView("historical-2017-p2");
    if(id==="FNH-P2-2018-MJ")setView("historical-2018-p2");
    if(id==="FNH-P2-2019-MJ")setView("historical-2019-p2");
    if(id==="FNH-P2-2021-MJ")setView("historical-2021-p2");
    if(id==="FNH-P2-2022-MJ")setView("historical-2022-p2");
    if(id==="FNH-P2-2024-MJ")setView("historical-2024-p2");
    if(id==="FNH-P2-2026-MJ")setView("historical-2026-p2");}}/>;
  if(view==="review-p1")return <FnhHistoricalPaper1Reader key={selectedHistoricalP1}
    sourceId={selectedHistoricalP1} userId={userId} onBack={()=>setView("paper1")}/>;
  if(view==="exam1")return <FnhPaper1Exam key={selectedPaper1Set} setNumber={selectedPaper1Set} supabase={supabase} userId={userId} onBack={()=>setView("paper1")}/>;
  if(view==="exam2")return <FnhPaper2Exam key={selectedPaper2Set} setNumber={selectedPaper2Set} supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2005-p2")return <FnhHistorical2005Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2006-p2")return <FnhHistorical2006Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2008-p2")return <FnhHistorical2008Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2009-p2")return <FnhHistorical2009Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2010-p2")return <FnhHistorical2010Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2011-p2")return <FnhHistorical2011Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2012-p2")return <FnhHistorical2012Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2013-p2")return <FnhHistorical2013Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2014-p2")return <FnhHistorical2014Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2015-p2")return <FnhHistorical2015Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2016-p2")return <FnhHistorical2016Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2017-p2")return <FnhHistorical2017Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2018-p2")return <FnhHistorical2018Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2019-p2")return <FnhHistorical2019Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2021-p2")return <FnhHistorical2021Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2022-p2")return <FnhHistorical2022Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2024-p2")return <FnhHistorical2024Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="historical-2026-p2")return <FnhHistorical2026Paper2Exam supabase={supabase} userId={userId} onBack={()=>setView("paper2")}/>;
  if(view==="workbook")return <FnhPracticalWorkbook userId={userId} onBack={()=>setView("home")}/>;
  return <main className="fnh-exam fnh-practice-home"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button className="fnh-outline" type="button" onClick={onBack}><FnhNavArrow direction="left"/> Back to practice</button></div>
    <header className="fnh-exam-card fnh-library-hero"><small>CSEC FOOD, NUTRITION AND HEALTH</small><h1>Choose an examination paper</h1><p>Practise Caribbean food and nutrition knowledge, food safety, meal planning and practical decision-making in a CSEC-style test.</p></header>
    <section className="fnh-library-choices" aria-label="Choose Food Nutrition and Health examination">
      <button type="button" onClick={()=>setView("paper1")}>
        <span className="fnh-choice-number">01</span><span><small>MULTIPLE CHOICE</small><strong>Paper 1</strong><span>60 questions · 90 minutes · Practice sets and historical sources</span></span><FnhNavArrow/>
      </button>
      <button type="button" onClick={()=>setView("paper2")}>
        <span className="fnh-choice-number">02</span><span><small>STRUCTURED RESPONSE</small><strong>Paper 2</strong><span>6 questions · 150 minutes · Model marking review</span></span><FnhNavArrow/>
      </button>
    </section>
    <section className="fnh-exam-card fnh-library-paper"><span className="fnh-library-eyebrow">PRACTICAL SKILLS</span>
      <h2>SBA practical workbook</h2><p>Plan 16 practical food activities, record evidence and prepare for three moderated assignments. All competency marks require teacher assessment.</p>
      <button type="button" className="fnh-primary" onClick={()=>setView("workbook")}>Open workbook <FnhNavArrow/></button>
    </section>
  </div></main>;
}
