import React,{useMemo,useState} from "react";
import {POB_SBA_SPEC,POB_SBA_PROJECT_IDEAS,evaluatePobSbaDraft} from "../data/pobSbaSpec";
import "../components/pobLearningTools.css";
import "./pobSbaWorkspace.css";

const empty=()=>Object.fromEntries(POB_SBA_SPEC.researchStages.map(s=>[s.id,""]));
const countWords=text=>String(text||"").trim().split(/\s+/).filter(Boolean).length;
const exportText=(sections)=>{
 const output=["SPARK PRINCIPLES OF BUSINESS | RESEARCH DRAFT",
   "Practice workspace, not an official CXC submission.",
   ...POB_SBA_SPEC.researchStages.map(s=>"\n"+s.title.toUpperCase()+"\n"+String(sections[s.id]||""))].join("\n");
 const blob=new Blob([output],{type:"text/plain;charset=utf-8"});
 const url=URL.createObjectURL(blob);
 try{
  const link=document.createElement("a");
  link.href=url;link.download="SPARK_POB_research_draft.txt";
  document.body.appendChild(link);link.click();link.remove();
 }finally{URL.revokeObjectURL(url);}
};
export default function PobSbaWorkspace({onBack}){
 const [sections,setSections]=useState(empty),[selected,setSelected]=useState("topic");
 const wordCount=useMemo(()=>POB_SBA_SPEC.researchStages
   .filter(x=>!["toc","bibliography"].includes(x.id))
   .reduce((n,x)=>n+countWords(sections[x.id]),0),[sections]);
 const report=evaluatePobSbaDraft({sections,wordCount});
 const field=POB_SBA_SPEC.researchStages.find(x=>x.id===selected)||POB_SBA_SPEC.researchStages[0];
 return <main className="pob-sba-workspace">
  <div className="pob-sba-shell">
    {onBack&&<button type="button" className="pob-sba-back" onClick={onBack}>← Back to Principles of Business practice</button>}
    <header className="pob-sba-header">
      <span>CSEC PRINCIPLES OF BUSINESS · SCHOOL-BASED ASSESSMENT</span>
      <h1>Business research workspace</h1>
      <p>Plan a real research project, collect evidence, interpret your findings and prepare a well-organised report. Use the official 40-mark criteria as guidance.</p>
      <div className="pob-sba-facts">
        <span>40-mark criteria</span><span>10 report areas</span><span>1,000-word recommended maximum</span>
      </div>
    </header>
    <section className="pob-sba-warning">
      <strong>Research must be real.</strong>
      <p>Do not invent survey responses or interviews. The workspace is for drafting and feedback, not official submission or certification. Drafts are held only in this open tab until you export them.</p>
    </section>
    <div className="pob-sba-layout">
      <nav className="pob-sba-sidebar" aria-label="Research report sections">
        {POB_SBA_SPEC.researchStages.map(item=><button type="button" key={item.id}
          aria-current={selected===item.id?"step":undefined}
          className={selected===item.id?"active":""} onClick={()=>setSelected(item.id)}>
          <span>{item.title}</span><small>{item.marks} mark{item.marks!==1?"s":""}{sections[item.id]?.trim()?" · Drafted":""}</small>
        </button>)}
      </nav>
      <section className="pob-sba-editor pob-tool-card">
        <span className="pob-sba-eyebrow">Research report · {field.marks} available marks</span>
        <h2>{field.title}</h2>
        <p>{field.check}</p>
        {field.id==="topic"&&<div className="pob-sba-ideas">
          <strong>Example research ideas</strong>
          {POB_SBA_PROJECT_IDEAS.map(item=><button type="button" key={item.title}
            onClick={()=>setSections(prev=>({...prev,topic:item.title+". Research question: "+item.question}))}>{item.title}</button>)}
        </div>}
        <label className="pob-sba-response"><span>Your draft for this section</span>
          <textarea rows={11} value={sections[field.id]} onChange={event=>setSections(prev=>({...prev,[field.id]:event.target.value}))}
            placeholder="Write your own research, observations or sourced evidence here."/>
        </label>
        <div className="pob-sba-editor-status"><span>{countWords(sections[field.id])} words in this section</span>
          <span>{report.checks.find(x=>x.id===field.id)?.complete?"Draft started":"Add your research"}</span></div>
        <p className="pob-sba-tip">SPARK checks whether the section has been started. Completing a box does not automatically earn its official marks.</p>
      </section>
    </div>
    <footer className="pob-sba-summary pob-tool-card">
      <div><strong>Draft progress: {report.completed} of {report.total} sections started</strong>
        <p role="status">{wordCount} words counted in the report draft (excluding contents and bibliography). {report.aboveDeductionThreshold?"The draft exceeds 1,100 words; review the syllabus's stated penalty rule.":report.aboveRecommendedLimit?"The draft exceeds the recommended 1,000-word maximum.":"Keep the writing focused and let tables or appendices hold supporting evidence where appropriate."}</p></div>
      <button type="button" disabled={!report.completed} onClick={()=>exportText(sections)}>Export research draft</button>
    </footer>
  </div>
 </main>;
}
