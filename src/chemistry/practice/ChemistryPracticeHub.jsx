import React,{useMemo,useState} from "react";
import ChemistryPaper2Exam from "./ChemistryPaper2Exam";
import {CHEMISTRY_HISTORICAL_PAPERS,CHEMISTRY_PAPER2_PRACTICE_SETS,chemistryPaper2BankStats} from "../data/chemistryPaper2Bank";
import {CHEMISTRY_PAPER2_SOURCE_AUDIT,CHEMISTRY_PAPER2_SOURCE_AUDIT_SUMMARY} from "../data/chemistryPaper2SourceAudit";
import {CHEMISTRY_HISTORICAL_COVERAGE} from "../data/chemistryHistoricalCoverage";
import "./chemistryPractice.css";
import "../../integratedScience/practice/integratedSciencePractice.css";

function HistoricalArchive({onBack}){
  const sourceById=useMemo(()=>Object.fromEntries(CHEMISTRY_PAPER2_SOURCE_AUDIT.map(row=>[row.id,row])),[]);
  const coverageById=useMemo(()=>Object.fromEntries(CHEMISTRY_HISTORICAL_COVERAGE.papers.map(row=>[row.sourceId,row])),[]);
  const [query,setQuery]=useState("");
  const [session,setSession]=useState("all");
  const rows=useMemo(()=>CHEMISTRY_HISTORICAL_PAPERS.filter(paper=>{
    const matchSession=session==="all"||paper.session===session;
    const hay=`${paper.year} ${paper.session} ${paper.topics.join(" ")}`.toLowerCase();
    return matchSession&&hay.includes(query.toLowerCase());
  }),[query,session]);
  return <main className="is-practice-shell chem-practice-shell"><div className="is-practice-home-shell">
    <div className="is-practice-top-actions"><button type="button" className="is-back-button" onClick={onBack}><span aria-hidden="true">←</span>Back to practice modes</button></div>
    <header className="is-practice-hero"><div><span>CSEC CHEMISTRY PAPER 02</span><h1>Historical source archive</h1><p>All {CHEMISTRY_PAPER2_SOURCE_AUDIT_SUMMARY.suppliedPapers} supplied Paper 02 scans, covering {CHEMISTRY_PAPER2_SOURCE_AUDIT_SUMMARY.suppliedPages} pages, are accounted for here. Historical questions are promoted to learner practice only after page-by-page wording, value, marking and SVG-figure QA. {CHEMISTRY_HISTORICAL_COVERAGE.totals.draftedQuestions} of {CHEMISTRY_HISTORICAL_COVERAGE.totals.expectedQuestions} historical questions are currently drafted, with {CHEMISTRY_HISTORICAL_COVERAGE.totals.approvedQuestions} approved for practice.</p></div></header>
    <section className="chem-archive-filters"><label>Search<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="year or topic"/></label><label>Session<select value={session} onChange={e=>setSession(e.target.value)}><option value="all">All sessions</option><option>January</option><option>May/June</option></select></label></section>
    <section className="chem-archive-list">{rows.map(paper=>{
      const source=sourceById[paper.id];
      const coverage=coverageById[paper.id];
      return <article key={paper.id} className="chem-archive-card">
        <div><span>{paper.session}</span><h2>{paper.year} Chemistry Paper 02</h2><p>{paper.questionCount} questions · {source?.pages || "?"} source pages · {coverage?.draftedQuestions||0}/{coverage?.expectedQuestions||paper.questionCount} questions drafted</p></div>
        <div className="chem-archive-tags">{paper.topics.map(topic=><span key={topic}>{topic.replaceAll("-"," ")}</span>)}</div>
        <div className="chem-archive-status"><b>Scan inventoried</b><small>Questions and diagrams are not yet cleared for student practice. The original marking scheme was not supplied.</small></div>
      </article>;
    })}</section>
  </div></main>;
}

export default function ChemistryPracticeHub({supabase,userId,onBack}){
  const [mode,setMode]=useState("home");
  const [paperIndex,setPaperIndex]=useState(0);
  const stats=chemistryPaper2BankStats();

  if(mode==="paper2")return <ChemistryPaper2Exam supabase={supabase} userId={userId} paperIndex={paperIndex} onBack={()=>setMode("home")}/>;
  if(mode==="archive")return <HistoricalArchive onBack={()=>setMode("home")}/>;

  return <main className="is-practice-shell chem-practice-shell"><div className="is-practice-home-shell">
    <div className="is-practice-top-actions"><button type="button" className="is-back-button" onClick={onBack}><span aria-hidden="true">←</span>Back</button></div>
    <header className="is-practice-hero"><div><span>CSEC CHEMISTRY PRACTICE</span><h1>Choose a practice mode</h1><p>Work through full current-format Paper 02 simulations or check the list of supplied historical Paper 02 scans. Historical questions are not yet released for student practice.</p></div></header>

    <section className="is-practice-mode-list">
      <button type="button" className="is-practice-section-card" onClick={()=>{setPaperIndex(0);setMode("paper2");}}>
        <span className="is-practice-section-code">02</span>
        <span className="is-practice-section-copy"><span>FULL EXAMINATION SIMULATOR</span><strong>Chemistry Paper 2</strong><small><span>6 compulsory questions</span><span className="is-inline-separator">·</span><span>2 hours 30 minutes</span><span className="is-inline-separator">·</span><span>100 marks</span><span className="is-inline-separator">·</span><span>automatic marking review</span></small></span>
        <span className="is-practice-section-arrow" aria-hidden="true">→</span>
      </button>

      <button type="button" className="is-practice-section-card" onClick={()=>setMode("archive")}>
        <span className="is-practice-section-code">PP</span>
        <span className="is-practice-section-copy"><span>HISTORICAL SOURCE BANK</span><strong>Past Paper 2 archive</strong><small><span>{stats.historicalPapers} supplied papers</span><span className="is-inline-separator">·</span><span>2005-2025</span><span className="is-inline-separator">·</span><span>January and May/June sessions</span></small></span>
        <span className="is-practice-section-arrow" aria-hidden="true">→</span>
      </button>
    </section>

    <section className="chem-practice-paper-picker">
      <div><span>SPARK PAPER 02 SETS</span><h2>Six complete practice papers</h2><p>Each set follows the current six-question, 100-mark format and uses question styles repeatedly seen in the supplied archive.</p></div>
      <div className="chem-practice-set-grid">{CHEMISTRY_PAPER2_PRACTICE_SETS.map((paper,index)=><button key={paper.id} type="button" onClick={()=>{setPaperIndex(index);setMode("paper2");}}><span>Set {index+1}</span><strong>100 marks</strong><small>150 minutes</small></button>)}</div>
    </section>

    <section className="is-practice-exam-note"><strong>CXC Paper 02 structure</strong><p>One compulsory data-analysis question, two structured questions and three extended-response questions. All questions are compulsory.</p></section>
  </div></main>;
}
