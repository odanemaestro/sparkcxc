import React,{useEffect,useState} from "react";
import {FNH_PRACTICAL_WORKBOOK,FNH_SBA_GUIDELINES} from "../data/fnhPracticalWorkbook";
import "./fnhPractice.css";

const storageKey=userId=>`spark:fnh:sba-workbook:${userId||"guest"}`;
export default function FnhPracticalWorkbook({userId,onBack}){
  const [entries,setEntries]=useState(()=>{
    try{return JSON.parse(localStorage.getItem(storageKey(userId))||"{}");}catch{return {};}
  });
  const [selected,setSelected]=useState(FNH_PRACTICAL_WORKBOOK[0].id);
  const current=FNH_PRACTICAL_WORKBOOK.find(row=>row.id===selected)||FNH_PRACTICAL_WORKBOOK[0];
  const value=entries[current.id]||{notes:"",plannedDate:"",reflection:"",checks:{}};
  const update=(patch)=>setEntries(previous=>({...previous,[current.id]:{
    ...(previous[current.id]||{notes:"",plannedDate:"",reflection:"",checks:{}}),...patch
  }}));
  useEffect(()=>{try{localStorage.setItem(storageKey(userId),JSON.stringify(entries));}catch{}},[entries,userId]);
  const prepared=FNH_PRACTICAL_WORKBOOK.filter(row=>entries[row.id]?.notes?.trim()).length;
  return <main className="fnh-exam fnh-workbook"><div className="fnh-exam-container">
    <div className="fnh-exam-top"><button type="button" className="fnh-outline" onClick={onBack}>← Back to FNH practice</button></div>
    <header className="fnh-exam-card fnh-library-hero">
      <small>FOOD, NUTRITION AND HEALTH · PRACTICAL SKILLS</small>
      <h1>SBA practical workbook</h1>
      <p>Prepare for your assessed food and nutrition practicals. Record plans, safe methods and reflections. Your teacher must observe practical work and award the official assessment marks.</p>
      <div className="fnh-library-facts"><span>16 practical tasks</span><span>3 moderation assignments</span><span>{prepared} with plans started</span></div>
    </header>
    <section className="fnh-exam-card fnh-sba-guidance">
      <h2>What your workbook needs</h2>
      <div className="fnh-sba-checklist">{FNH_SBA_GUIDELINES.workbook.map((item,i)=><p key={i}><span aria-hidden="true">✓</span>{item}</p>)}</div>
      <p>For moderation, the first and third assignments are marked by your teacher. The second uses a teacher and second examiner. Keep dated records and follow your centre's instructions.</p>
    </section>
    <div className="fnh-sba-layout">
      <nav aria-label="Practical tasks" className="fnh-exam-card fnh-sba-tasks">
        <h2>Practical activities</h2>
        {FNH_PRACTICAL_WORKBOOK.map(task=><button type="button" key={task.id} aria-current={selected===task.id?"step":undefined} onClick={()=>setSelected(task.id)} className={selected===task.id?"active":""}>
          <b>{task.number}. {task.title}</b><small>{task.term}</small>
        </button>)}
      </nav>
      <section className="fnh-exam-card fnh-sba-detail">
        <small>ACTIVITY {current.number} · SYLLABUS {current.objectiveCode}</small>
        <h2>{current.title}</h2>
        <p>{current.brief}</p><p><b>Suggested timing:</b> {current.term}</p>
        {current.exemplar&&<p><b>CXC exemplar:</b> {current.exemplar==="sandwiches"?"Cold-sandwich preparation and service":"Using eggs for aerating, setting, enriching and emulsifying"}.</p>}
        <div className="fnh-sba-evidence">
          <h3>Prepare your evidence</h3>
          {current.evidence.map((item,index)=><label key={index}>
            <input type="checkbox" checked={Boolean(value.checks[index])}
              onChange={event=>update({checks:{...value.checks,[index]:event.target.checked}})}/>
            <span>{item}</span>
          </label>)}
        </div>
        <label className="fnh-sba-field">Planned date
          <input type="date" value={value.plannedDate} onChange={event=>update({plannedDate:event.target.value})}/>
        </label>
        <label className="fnh-sba-field">Production plan and ingredient quantities
          <textarea rows={6} value={value.notes} onChange={event=>update({notes:event.target.value})}
            placeholder="List ingredients, quantities, equipment, sequence, safety checks and timing."/>
        </label>
        <label className="fnh-sba-field">What I learned and would improve
          <textarea rows={5} value={value.reflection} onChange={event=>update({reflection:event.target.value})}
            placeholder="Record what worked, any problems and the practical changes you would make."/>
        </label>
        <p className="fnh-exam-note" role="status">Workbook draft saved on this device. Checking a box does not replace an assessor's observation or official SBA mark.</p>
      </section>
    </div>
  </div></main>;
}
