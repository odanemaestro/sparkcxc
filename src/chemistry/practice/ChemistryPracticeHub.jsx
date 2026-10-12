import React,{useMemo,useState}from"react";
import {CHEMISTRY_PAPER2_PRACTICE_PAPERS}from"../data/chemistryPaper2PracticeBank";
import {CHEMISTRY_PAPER2_SOURCES}from"../data/chemistryPaper2Sources";
import ChemistryPaper2Exam from"./ChemistryPaper2Exam";
import "./chemistryPractice.css";

function Back({onClick,children="Back"}){return <button type="button" className="chem-practice-back" onClick={onClick}>← <span>{children}</span></button>}

function SourceLibrary({onBack}){
  return <main className="chem-practice-shell">
    <Back onClick={onBack} children="Back to Chemistry practice"/>
    <header className="chem-practice-hero"><span>CSEC CHEMISTRY</span><h1>Historical Paper 02 source library</h1><p>All uploaded Paper 02 sittings are indexed here. Each source is being transcribed into the structured question bank with source-page provenance, SPARK mark schemes, explanations and exact visual redraws.</p></header>
    <section className="chem-source-grid">
      {CHEMISTRY_PAPER2_SOURCES.slice().sort((a,b)=>b.year-a.year||a.sitting.localeCompare(b.sitting)).map(source=><article key={source.id} className="chem-source-card"><span>{source.sitting}</span><strong>{source.year}</strong><small>{source.questions} questions · {source.format==="legacy"?"historical format":"2 h 30 min format"}</small><em>Source indexed</em></article>)}
    </section>
  </main>;
}

function QuestionBank({onBack}){
  const [section,setSection]=useState("all");
  const all=useMemo(()=>CHEMISTRY_PAPER2_PRACTICE_PAPERS.flatMap(p=>p.questions.map(q=>({...q,paperTitle:p.title}))),[]);
  const rows=useMemo(()=>section==="all"?all:all.filter(q=>(q.objectives||[]).some(o=>o.startsWith(section))),[all,section]);
  return <main className="chem-practice-shell">
    <Back onClick={onBack} children="Back to Chemistry practice"/>
    <header className="chem-practice-hero"><span>CSEC CHEMISTRY</span><h1>Paper 02 question bank</h1><p>Practise structured, data-analysis and extended-response questions by syllabus section. Each question includes an item-level marking scheme and worked explanation.</p></header>
    <div className="chem-bank-filter"><label>Section<select value={section} onChange={e=>setSection(e.target.value)}><option value="all">All sections</option><option value="A">Section A · Principles of Chemistry</option><option value="B">Section B · Organic Chemistry</option><option value="C">Section C · Inorganic Chemistry</option></select></label><strong>{rows.length} questions</strong></div>
    <section className="chem-question-list">{rows.map(q=><article key={q.id}><div><span>{q.kind?.replace("-"," ")}</span><h2>{q.title}</h2><p>{q.paperTitle}</p></div><div><strong>{q.totalMarks} marks</strong><small>{(q.objectives||[]).join(" · ")}</small></div></article>)}</section>
  </main>;
}

export default function ChemistryPracticeHub({supabase,userId,onBack}){
  const [mode,setMode]=useState("home");
  const [paper,setPaper]=useState(null);

  if(mode==="exam"&&paper)return <ChemistryPaper2Exam paper={paper} supabase={supabase} userId={userId} onBack={()=>{setPaper(null);setMode("papers")}}/>;
  if(mode==="sources")return <SourceLibrary onBack={()=>setMode("home")}/>;
  if(mode==="bank")return <QuestionBank onBack={()=>setMode("home")}/>;

  if(mode==="papers")return <main className="chem-practice-shell">
    <Back onClick={()=>setMode("home")} children="Back to Chemistry practice"/>
    <header className="chem-practice-hero"><span>CSEC CHEMISTRY · PAPER 02</span><h1>Full examination practice</h1><p>Each SPARK paper follows the current CSEC structure: one data-analysis question, two structured questions and three extended-response questions. All six questions are compulsory.</p></header>
    <section className="chem-paper-grid">{CHEMISTRY_PAPER2_PRACTICE_PAPERS.map((item,index)=><article key={item.id} className="chem-paper-card"><div className="chem-paper-number">{String(index+1).padStart(2,"0")}</div><div><span>FULL PAPER 02</span><h2>{item.title}</h2><p>6 compulsory questions · 2 hours 30 minutes · 100 marks</p><ul><li>1 data-analysis question</li><li>2 structured questions</li><li>3 extended-response questions</li></ul></div><button type="button" onClick={()=>{setPaper(item);setMode("exam")}}>Start paper →</button></article>)}</section>
  </main>;

  return <main className="chem-practice-shell">
    <Back onClick={onBack}/>
    <header className="chem-practice-hero">
      <div><span>CSEC CHEMISTRY PRACTICE</span><h1>Practise Chemistry the way CXC asks it.</h1><p>Work through full Paper 02 simulations, focus on structured questions by syllabus section, and review the historical source library.</p></div>
      <div className="chem-practice-stat"><strong>{CHEMISTRY_PAPER2_PRACTICE_PAPERS.length}</strong><span>full SPARK Paper 02 simulations</span></div>
    </header>
    <section className="chem-mode-grid">
      <button type="button" className="chem-mode-card" onClick={()=>setMode("papers")}><span className="chem-mode-code">02</span><div><small>EXAM SIMULATOR</small><strong>Full Paper 02</strong><p>2 hours 30 minutes · 6 compulsory questions · 100 marks · item-level review</p></div><i>→</i></button>
      <button type="button" className="chem-mode-card" onClick={()=>setMode("bank")}><span className="chem-mode-code">QB</span><div><small>FOCUSED PRACTICE</small><strong>Question bank</strong><p>Filter structured, data-analysis and extended-response questions by syllabus section.</p></div><i>→</i></button>
      <button type="button" className="chem-mode-card" onClick={()=>setMode("sources")}><span className="chem-mode-code">28</span><div><small>HISTORICAL SOURCES</small><strong>Past Paper 02 library</strong><p>28 uploaded sittings indexed from 2005 to 2025 for historical question-bank coverage.</p></div><i>→</i></button>
    </section>
    <section className="chem-practice-note"><strong>CXC Paper 02 structure</strong><p>One compulsory data-analysis question, two structured questions and three extended-response questions. The current syllabus allocates 100 raw marks to Paper 02.</p></section>
  </main>;
}
