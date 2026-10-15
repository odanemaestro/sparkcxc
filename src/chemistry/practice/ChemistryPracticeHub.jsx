import React,{useEffect,useMemo,useState} from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import ChemistryPaper1Exam,{CHEMISTRY_PAPER1_SOURCES} from "./ChemistryPaper1Exam";
import ChemistryPaper2Exam from "./ChemistryPaper2Exam";
import {CHEMISTRY_HISTORICAL_PAPERS,CHEMISTRY_PAPER2_PRACTICE_SETS} from "../data/chemistryPaper2Bank";
import {CHEMISTRY_HISTORICAL_COVERAGE} from "../data/chemistryHistoricalCoverage";
import {buildChemistryHistoricalExam} from "../data/chemistryHistoricalExam";
import {CHEMISTRY_HISTORICAL_OPTION_RULES} from "../data/chemistryHistoricalPaperSelection";
import "../../integratedScience/practice/integratedSciencePractice.css";
import "./chemistryPractice.css";

const timeLabel=(paper)=>paper==="paper1"?"75 minutes":"150 minutes";
const titleLabel=(paper)=>paper==="paper1"?"Chemistry Paper 1":"Chemistry Paper 2";
const goTop=()=>window.scrollTo?.({top:0,left:0,behavior:"instant"});

function PaperCard({eyebrow,title,details,onClick,disabled=false,footer=null,indicator=null}){
  return <article className="chem-library-paper">
    <div className="chem-library-card-head">
      <span className="chem-library-eyebrow">{eyebrow}</span>
      {indicator&&<span className="chem-library-indicator">{indicator}</span>}
    </div>
    <h3>{title}</h3>
    <p>{details}</p>
    {footer}
    <button type="button" className="chem-library-open" onClick={onClick} disabled={disabled}>
      {disabled?"Unavailable":"Select paper"} <ForwardArrowIcon/>
    </button>
  </article>;
}

function ChemistryPaperLibrary({paperType,onBack,onStartPaper1,onStartPaper2,onStartHistorical}){
  const [tab,setTab]=useState("practice");
  const [query,setQuery]=useState("");
  const [session,setSession]=useState("all");
  const [sectionC,setSectionC]=useState({});
  const coverage=useMemo(()=>Object.fromEntries(CHEMISTRY_HISTORICAL_COVERAGE.papers.map(row=>[row.sourceId,row])),[]);
  const isPaper1=paperType==="paper1";
  const pastPaperRows=useMemo(()=>isPaper1
    ?CHEMISTRY_PAPER1_SOURCES.map(code=>({
      id:code,code,year:Number(code.slice(0,4)),session:code.endsWith("JAN")?"January":"May/June"
    }))
    :CHEMISTRY_HISTORICAL_PAPERS,[isPaper1]);
  const matches=pastPaperRows.filter(paper=>{
    const search=`${paper.year} ${paper.session} ${paper.code||paper.id} ${(paper.topics||[]).join(" ")}`.toLowerCase();
    return search.includes(query.toLowerCase().trim())&&(session==="all"||paper.session===session);
  });
  return <main className="is-practice-shell chem-practice-shell chem-library">
    <div className="chem-library-container">
      <button type="button" className="chem-library-back" onClick={onBack}><BackArrowIcon/> Back to Chemistry practice</button>
      <header className="chem-library-hero">
        <span className="chem-library-eyebrow">CSEC CHEMISTRY · {isPaper1?"PAPER 01":"PAPER 02"}</span>
        <h1>{titleLabel(paperType)}</h1>
        <p>{isPaper1
          ?"Choose a 60-question practice set or a historical Paper 1. Read the instructions before starting."
          :"Choose a 100-mark practice set or a historical Paper 2. Read the instructions before starting."}</p>
        <div className="chem-library-facts">
          <span>{timeLabel(paperType)}</span>
          <span>{isPaper1?"Multiple choice":"Structured questions"}</span>
          <span>{isPaper1?"4 practice sets":"6 practice sets"}</span>
        </div>
      </header>
      <div className="chem-library-tabs" role="group" aria-label="Choose paper type">
        <button type="button" className={tab==="practice"?"active":""} aria-pressed={tab==="practice"} onClick={()=>setTab("practice")}>Practice sets</button>
        <button type="button" className={tab==="historical"?"active":""} aria-pressed={tab==="historical"} onClick={()=>setTab("historical")}>Past papers</button>
      </div>
      {tab==="practice"?<>
        <div className="chem-library-section-heading">
          <h2>Choose a practice set</h2>
          <p>Select any set. The timer starts after you read the instructions and select Start examination.</p>
        </div>
        <section className="chem-library-grid" aria-label={isPaper1?"Paper 1 practice sets":"Paper 2 practice sets"}>
          {isPaper1?Array.from({length:4},(_,index)=><PaperCard key={index}
            eyebrow={`SET ${index+1}`}
            title={`Practice set ${index+1}`}
            details="60 questions · 60 marks · 75 minutes"
            onClick={()=>onStartPaper1(`practice-0${index+1}`)}
          />):CHEMISTRY_PAPER2_PRACTICE_SETS.map((paper,index)=><PaperCard key={paper.id}
            eyebrow={`SET ${index+1}`}
            title={`Practice set ${index+1}`}
            details="6 questions · 100 marks · 150 minutes"
            onClick={()=>onStartPaper2(index)}
          />)}
        </section>
      </>:<>
        <div className="chem-library-section-heading">
          <h2>Choose a past paper</h2>
          <p>Select the year and examination session. You will see an instruction sheet before the test begins.</p>
        </div>
        <div className="chem-library-filters">
          <label htmlFor="chem-library-search">Search papers
            <input id="chem-library-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Year or topic"/>
          </label>
          <label htmlFor="chem-library-session">Session
            <select id="chem-library-session" value={session} onChange={e=>setSession(e.target.value)}>
              <option value="all">All sessions</option><option value="January">January</option><option value="May/June">May/June</option>
            </select>
          </label>
        </div>
        <section className="chem-library-grid" aria-label={isPaper1?"Paper 1 past papers":"Paper 2 past papers"}>
          {matches.map(paper=>{
            const originalId=paper.id;
            const optionRule=!isPaper1?CHEMISTRY_HISTORICAL_OPTION_RULES[originalId]:null;
            const chosen=sectionC[originalId]||optionRule?.alternatives?.[0]||null;
            const historical=!isPaper1?buildChemistryHistoricalExam(originalId,chosen):null;
            const coverageRow=!isPaper1?coverage[originalId]:null;
            const isPartial=isPaper1&&paper.code==="2010-MJ"||!isPaper1&&!historical?.complete;
            return <PaperCard key={originalId}
              eyebrow={paper.session.toUpperCase()}
              title={`${paper.year} ${paper.session}`}
              details={isPaper1
                ?`${paper.code==="2010-MJ"?"55 available":"60"} questions · 75 minutes`
                :`${historical?.questions.length||coverageRow?.draftedQuestions||0} questions · ${historical?.totalMarks||coverageRow?.draftMarks||0} marks · 150 minutes`}
              indicator={isPartial?"Partial paper":null}
              disabled={!isPaper1&&!historical}
              onClick={()=>isPaper1?onStartPaper1(paper.code):historical&&onStartHistorical(historical)}
              footer={optionRule?<label className="chem-library-option" htmlFor={`chem-option-${originalId}`}>
                Section C option
                <select id={`chem-option-${originalId}`} value={chosen} onChange={e=>setSectionC(previous=>({...previous,[originalId]:Number(e.target.value)}))}>
                  {optionRule.alternatives.map(number=><option key={number} value={number}>Question {number}</option>)}
                </select>
              </label>:null}
            />;
          })}
          {matches.length===0&&<p className="chem-library-empty">No papers match your filters.</p>}
        </section>
      </>}
    </div>
  </main>;
}

export default function ChemistryPracticeHub({supabase,userId,onBack}){
  const [mode,setMode]=useState("home");
  const [paper1Source,setPaper1Source]=useState(null);
  const [paperIndex,setPaperIndex]=useState(0);
  const [historicalPaper,setHistoricalPaper]=useState(null);
  useEffect(()=>{goTop();},[mode,paper1Source,paperIndex,historicalPaper?.id]);

  const startPaper1=source=>{setPaper1Source(source);setMode("paper1-exam");};
  const startPaper2=index=>{setPaperIndex(index);setMode("paper2-exam");};
  const startHistorical=paper=>{setHistoricalPaper(paper);setMode("historical-exam");};
  if(mode==="library-paper1"||mode==="library-paper2")return <ChemistryPaperLibrary
    paperType={mode==="library-paper1"?"paper1":"paper2"} onBack={()=>setMode("home")}
    onStartPaper1={startPaper1} onStartPaper2={startPaper2} onStartHistorical={startHistorical}/>;
  if(mode==="paper1-exam"&&paper1Source)return <ChemistryPaper1Exam key={paper1Source} sourceId={paper1Source}
    supabase={supabase} userId={userId} onBack={()=>setMode("library-paper1")}
    onChooseAnother={()=>setMode("library-paper1")}/>;
  if(mode==="paper2-exam")return <ChemistryPaper2Exam key={`practice-${paperIndex}`}
    supabase={supabase} userId={userId} paperIndex={paperIndex}
    onBack={()=>setMode("library-paper2")}/>;
  if(mode==="historical-exam"&&historicalPaper)return <ChemistryPaper2Exam key={historicalPaper.id}
    supabase={supabase} userId={userId} historicalPaper={historicalPaper}
    onBack={()=>setMode("library-paper2")}/>;

  return <main className="is-practice-shell chem-practice-shell chem-practice-home">
    <div className="chem-library-container">
      <button type="button" className="chem-library-back" onClick={onBack}><BackArrowIcon/> Back to practice</button>
      <header className="chem-library-hero">
        <span className="chem-library-eyebrow">CSEC CHEMISTRY</span>
        <h1>Chemistry practice exams</h1>
        <p>Choose Paper 1 or Paper 2. Each paper has practice sets, historical papers, examination instructions and an answer review.</p>
      </header>
      <section className="chem-library-entry-grid" aria-label="Choose examination paper">
        <button type="button" className="chem-library-entry" onClick={()=>setMode("library-paper1")}>
          <span className="chem-library-entry-number">01</span>
          <span className="chem-library-entry-copy">
            <small>Multiple choice</small>
            <strong>Chemistry Paper 1</strong>
            <span>4 practice sets · Historical papers · 75 minutes</span>
          </span>
          <span className="chem-library-entry-arrow" aria-hidden="true"><ForwardArrowIcon/></span>
        </button>
        <button type="button" className="chem-library-entry" onClick={()=>setMode("library-paper2")}>
          <span className="chem-library-entry-number">02</span>
          <span className="chem-library-entry-copy">
            <small>Structured examination</small>
            <strong>Chemistry Paper 2</strong>
            <span>6 practice sets · Historical papers · 150 minutes</span>
          </span>
          <span className="chem-library-entry-arrow" aria-hidden="true"><ForwardArrowIcon/></span>
        </button>
      </section>
    </div>
  </main>;
}
