import React, { useState } from "react";
import "./exercisePhysiologyExplorer.css";

const RECOVERY = {
  minutes:[0,1,2,3,4,5,6],
  pulse:[140,124,108,94,84,76,72],
};

const FITNESS = [
  {name:"Andre",resting:60,recovery:2},
  {name:"Bianca",resting:75,recovery:5},
  {name:"Carl",resting:82,recovery:8},
  {name:"Dana",resting:70,recovery:4},
];

const VIEWS = {
  acute:{
    label:"During exercise",
    title:"Working muscles demand faster transport and gas exchange",
    note:"Heart rate and breathing rate rise because active muscles respire faster and need more oxygen and glucose while producing more carbon dioxide and heat.",
  },
  recovery:{
    label:"Recovery graph",
    title:"Pulse rate falls back towards the resting level after exercise",
    note:"The CSEC practice data show a pulse of 140 beats per minute immediately after exercise, returning to the resting value of 72 beats per minute after six minutes.",
  },
  fitness:{
    label:"Fitness comparison",
    title:"Resting pulse and recovery time provide useful fitness clues",
    note:"A stronger trained heart often pumps more blood per beat, so a fit person may have a lower resting heart rate and recover more quickly after the same standardised exercise.",
  },
  longterm:{
    label:"Long-term effects",
    title:"Regular exercise changes several body systems",
    note:"Training improves cardiovascular efficiency, muscle function and energy balance and reduces the risk of several non-communicable diseases.",
  },
};

function AcuteScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Physiological responses during exercise">
      <g transform="translate(355 80)">
        <circle className="ex-head" cx="135" cy="65" r="48" />
        <path className="ex-body" d="M135 115V285M135 165L40 235M135 165L235 210M135 285L55 410M135 285L240 390" />
        <path className="ex-motion" d="M20 205Q-20 225 20 250M245 180Q290 195 265 235M25 390Q-5 420 30 440M245 365Q285 390 255 430" />
      </g>
      <g transform="translate(80 75)">
        <path className="ex-heart" d="M100 75Q55 28 25 78Q10 128 100 195Q190 128 175 78Q145 28 100 75Z" />
        <path className="ex-pulse" d="M15 250H60L82 210L112 305L142 240L165 260H205" />
        <text className="ex-label" x="105" y="345" textAnchor="middle">heart rate rises</text>
      </g>
      <g transform="translate(700 75)">
        <path className="ex-lungs" d="M90 55Q25 75 20 175Q60 220 100 185V65ZM110 65V185Q150 220 190 175Q185 75 120 55Z" />
        <path className="ex-breath" d="M105 20V-20M75 0L105-25L135 0" />
        <text className="ex-label" x="105" y="345" textAnchor="middle">breathing rate rises</text>
      </g>
      <path className="ex-flow-arrow" d="M260 250H355M625 250H700" />
      <text className="ex-small" x="490" y="475" textAnchor="middle">more oxygen + glucose to muscles, faster removal of carbon dioxide and heat</text>
    </svg>
  );
}

function RecoveryGraph() {
  const px=m=>90+(m/6)*790;
  const py=p=>420-((p-60)/90)*340;
  const path=RECOVERY.pulse.map((p,i)=>(i?"L":"M")+px(RECOVERY.minutes[i]).toFixed(1)+" "+py(p).toFixed(1)).join(" ");
  return (
    <svg viewBox="0 0 960 520" role="img" aria-label="Pulse recovery after exercise using CSEC practice data">
      <line className="ex-axis" x1="90" y1="80" x2="90" y2="420"/>
      <line className="ex-axis" x1="90" y1="420" x2="880" y2="420"/>
      {[60,80,100,120,140].map(v=>(
        <g key={v}>
          <line className="ex-grid" x1="90" y1={py(v)} x2="880" y2={py(v)}/>
          <text className="ex-tick" x="75" y={py(v)+5} textAnchor="end">{v}</text>
        </g>
      ))}
      {RECOVERY.minutes.map(m=>(
        <g key={m}>
          <line className="ex-grid" x1={px(m)} y1="80" x2={px(m)} y2="420"/>
          <text className="ex-tick" x={px(m)} y="448" textAnchor="middle">{m}</text>
        </g>
      ))}
      <path className="ex-recovery-line" d={path}/>
      {RECOVERY.pulse.map((p,i)=><circle key={i} className="ex-point" cx={px(RECOVERY.minutes[i])} cy={py(p)} r="7"/>)}
      <line className="ex-rest-line" x1="90" y1={py(72)} x2="880" y2={py(72)}/>
      <text className="ex-small" x="725" y={py(72)-10}>resting pulse 72 bpm</text>
      <text className="ex-axis-label" x="485" y="490" textAnchor="middle">Time after exercise / minutes</text>
      <text className="ex-axis-label" x="24" y="250" textAnchor="middle" transform="rotate(-90 24 250)">Pulse rate / beats per minute</text>
    </svg>
  );
}

function FitnessTable() {
  return (
    <div className="spark-exercise-fitness">
      <div className="spark-exercise-table-wrap">
        <table>
          <thead><tr><th>Student</th><th>Resting pulse</th><th>Recovery time</th></tr></thead>
          <tbody>{FITNESS.map(row=><tr key={row.name}><td>{row.name}</td><td>{row.resting} bpm</td><td>{row.recovery} min</td></tr>)}</tbody>
        </table>
      </div>
      <div className="spark-exercise-fitness-result">
        <strong>Best fitness evidence in this dataset</strong>
        <span>Andre has the lowest resting pulse, 60 beats per minute, and the shortest recovery time, 2 minutes.</span>
      </div>
    </div>
  );
}

function LongTermScene() {
  const items=[
    ["Heart","Training strengthens the heart and increases stroke volume, so the heart can pump more blood per beat."],
    ["Resting pulse","A trained person often has a lower resting heart rate because each beat pumps more blood."],
    ["Muscles","Regular activity improves strength, endurance and muscle tone."],
    ["Energy balance","Exercise increases energy use and helps reduce excess fat storage when energy intake and output are balanced."],
    ["Disease risk","Regular physical activity lowers the risk of Type 2 diabetes, hypertension, cardiovascular disease and obesity."],
    ["Recovery","Improved cardiorespiratory fitness is often associated with faster recovery after a standard exercise task."],
  ];
  return (
    <div className="spark-exercise-longterm">
      {items.map(([title,text],index)=><article key={title}><span>{index+1}</span><div><b>{title}</b><p>{text}</p></div></article>)}
    </div>
  );
}

export default function ExercisePhysiologyExplorer() {
  const [view,setView]=useState("acute");
  const info=VIEWS[view];

  return (
    <section className="spark-exercise-physiology">
      <header>
        <span>EXERCISE PHYSIOLOGY</span>
        <h3>What changes during exercise and recovery?</h3>
        <p>Use pulse data and body-system responses to connect exercise with respiration, transport and long-term fitness.</p>
      </header>

      <div className="spark-exercise-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{item.label}</button>
        ))}
      </div>

      <div className={view==="fitness"||view==="longterm" ? "spark-exercise-stage cards" : "spark-exercise-stage"}>
        {view==="acute" && <AcuteScene/>}
        {view==="recovery" && <RecoveryGraph/>}
        {view==="fitness" && <FitnessTable/>}
        {view==="longterm" && <LongTermScene/>}
      </div>

      <div className="spark-exercise-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
