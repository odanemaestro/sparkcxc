import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./pestControlExplorer.css";

const VIEWS={
  cycle:{
    label:"Mosquito life cycle",
    title:"Control works best when you know which life stage is being targeted",
    note:"Mosquito eggs are laid near or on water, larvae and pupae develop in water, and adults leave the water to fly and feed.",
  },
  larvae:{
    label:"Larval control",
    title:"Source reduction removes the habitat before adults emerge",
    note:"Emptying, covering or removing water-holding containers is the main household strategy. Biological or approved larval controls may be used in suitable settings.",
  },
  adults:{
    label:"Adult control",
    title:"Barriers and targeted adult control reduce contact and biting",
    note:"Window screens, bed nets where appropriate, protective clothing and public-health insecticide measures can reduce exposure to adult mosquitoes.",
  },
  compare:{
    label:"Compare methods",
    title:"Every control method has strengths and limitations",
    note:"Mechanical, environmental, biological and chemical methods should be selected for the pest, life stage and setting while limiting harm to people and non-target organisms.",
  },
};

function LifeCycleScene(){
  const stages=[
    {x:110,y:250,label:"EGGS",sub:"near or on water"},
    {x:350,y:250,label:"LARVA",sub:"aquatic feeding stage"},
    {x:590,y:250,label:"PUPA",sub:"aquatic transition stage"},
    {x:830,y:250,label:"ADULT",sub:"flying stage"},
  ];
  return(
    <ReviewedScienceDiagram site="PestControlExplorer.jsx:35"><svg viewBox="0 0 960 500" role="img" aria-label="Mosquito life cycle from egg to larva pupa and adult">
      <path className="pc-water" d="M35 325Q160 300 285 325T535 325T785 325T925 325V440H35Z"/>
      {stages.map((s,i)=>(
        <g key={s.label}>
          <circle className={"pc-stage s"+i} cx={s.x} cy={s.y} r="72"/>
          <text className="pc-label" x={s.x} y={s.y-4} textAnchor="middle">{s.label}</text>
          <text className="pc-small" x={s.x} y={s.y+25} textAnchor="middle">{s.sub}</text>
          {i<stages.length-1&&<path className="pc-arrow" d={"M"+(s.x+78)+" "+s.y+"H"+(stages[i+1].x-78)}/>}
        </g>
      ))}
      <text className="pc-small dark" x="480" y="465" textAnchor="middle">larvae and pupae depend on water, adults are controlled above the water stage</text>
    </svg></ReviewedScienceDiagram>
  );
}

function LarvalScene(){
  const items=[
    ["1","Remove standing water","Empty tyres, buckets, tins and other containers before larvae can complete development."],
    ["2","Cover stored water","Tightly cover drums and tanks so adult mosquitoes cannot lay eggs inside."],
    ["3","Biological control","Larva-eating fish such as guppies may reduce larvae in suitable permanent water bodies."],
    ["4","Larval treatment","Where water cannot be removed, trained programmes may use approved larvicides."],
    ["5","Oil-film exam mechanism","A thin oil film can block larvae and pupae from reaching air at the water surface. This is a banked mechanism, not a reason to pour oil into drains or natural water bodies."],
  ];
  return <div className="spark-pest-control-list">{items.map(([n,t,x])=><article key={t}><span>{n}</span><div><b>{t}</b><p>{x}</p></div></article>)}</div>;
}

function AdultScene(){
  return(
    <div className="spark-adult-control-grid">
      {[
        ["Window and door screens","Physical barrier","Keeps adult mosquitoes outside living spaces when screens are intact."],
        ["Bed nets","Physical barrier","Reduces bites during sleep, especially for mosquitoes that bite at night."],
        ["Protective clothing and repellent","Personal protection","Reduces exposed skin and mosquito bites when used correctly."],
        ["Targeted insecticide","Chemical control","Public-health programmes may target adult mosquitoes during outbreaks. Repeated misuse can promote resistance and harm non-target organisms."],
        ["Fly swatter or trap","Mechanical control","Directly removes individual adult pests such as flies or rodents, depending on the tool."],
        ["Sanitation","Environmental control","Removing food waste and harbourage reduces flies, cockroaches and rodent populations."],
      ].map(([title,kind,text])=><article key={title}><span>{kind}</span><b>{title}</b><p>{text}</p></article>)}
    </div>
  );
}

function CompareScene(){
  const rows=[
    ["Environmental / sanitation","Remove water, food and shelter","Long-lasting prevention and little chemical exposure","Requires regular household and community action"],
    ["Mechanical","Screens, traps, fly swatters","Direct and targeted","May control only a small number of pests"],
    ["Biological","Guppies or other natural enemies","Can reduce larvae with little chemical use","Poorly selected organisms can affect non-target species"],
    ["Chemical","Approved larvicides or insecticides","Useful for rapid or targeted control","Resistance, contamination and non-target effects are possible"],
  ];
  return(
    <div className="spark-control-table-wrap">
      <table>
        <thead><tr><th>Method</th><th>Example</th><th>Strength</th><th>Limitation</th></tr></thead>
        <tbody>{rows.map(row=><tr key={row[0]}>{row.map((cell,i)=><td key={i}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function PestControlExplorer(){
  const [view,setView]=useState("cycle");
  const info=VIEWS[view];
  return(
    <section className="spark-pest-control">
      <header>
        <span>CONTROL OF PESTS AND VECTORS</span>
        <h3>Match the control method to the organism and life stage</h3>
        <p>Start with source reduction and sanitation, then compare physical, biological and chemical methods where they are appropriate.</p>
      </header>
      <div className="spark-pest-control-tabs">
        {Object.entries(VIEWS).map(([key,item])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{item.label}</button>)}
      </div>
      <div className={view==="cycle"?"spark-pest-control-stage":"spark-pest-control-stage cards"}>
        {view==="cycle"&&<LifeCycleScene/>}
        {view==="larvae"&&<LarvalScene/>}
        {view==="adults"&&<AdultScene/>}
        {view==="compare"&&<CompareScene/>}
      </div>
      <div className="spark-pest-control-summary"><strong>{info.title}</strong><span>{info.note}</span></div>
    </section>
  );
}
