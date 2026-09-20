import React, { useState } from "react";
import "./pestVectorExplorer.css";

const VIEWS = {
  roles:{
    label:"Key terms",
    title:"Pathogen, vector, parasite and pest describe different roles",
    note:"A pathogen causes disease. A vector carries a pathogen between hosts. A parasite lives in or on a host and obtains resources at the host's expense. A pest is an organism that causes harm, contamination or nuisance.",
  },
  mosquito:{
    label:"Mosquito risk",
    title:"Standing water provides breeding sites for container-breeding mosquitoes",
    note:"Aedes mosquitoes commonly use water-filled containers. Old tyres, buckets, drums and other items that collect rainwater can increase mosquito numbers around homes.",
  },
  routes:{
    label:"Disease routes",
    title:"Pests and vectors spread pathogens by different routes",
    note:"Houseflies can mechanically transfer pathogens to food, infected rodents can contaminate water or soil with urine, and Aedes mosquitoes can transmit viruses such as dengue.",
  },
  home:{
    label:"Home risk check",
    title:"Food, waste, water and shelter influence household pest risk",
    note:"Uncovered food, poorly managed garbage and standing water create conditions that attract pests or support vector breeding.",
  },
};

function RolesScene() {
  const rows=[
    ["PATHOGEN","Disease-causing agent","Examples include disease-causing bacteria, viruses, fungi and parasites."],
    ["VECTOR","Carries a pathogen","A mosquito may transmit a pathogen from one host to another."],
    ["PARASITE","Lives in or on a host","Tapeworms and head lice obtain resources from a host and can cause harm."],
    ["PEST","Causes harm or contamination","Rats and cockroaches may damage property or contaminate food and surfaces."],
  ];
  return (
    <div className="spark-pest-role-grid">
      {rows.map(([term,title,text],index)=>(
        <article key={term}>
          <span>{index+1}</span>
          <div><b>{term}</b><strong>{title}</strong><p>{text}</p></div>
        </article>
      ))}
    </div>
  );
}

function MosquitoScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Standing water in containers supporting mosquito breeding near a home">
      <g transform="translate(45 100)">
        <path className="pv-house" d="M20 120L150 25L280 120V315H20Z"/>
        <rect className="pv-door" x="120" y="210" width="60" height="105" rx="5"/>
        <rect className="pv-window" x="50" y="155" width="55" height="55" rx="5"/>
        <text className="pv-label" x="150" y="365" textAnchor="middle">home</text>
      </g>
      <g transform="translate(385 155)">
        <ellipse className="pv-tyre" cx="95" cy="125" rx="85" ry="55"/>
        <ellipse className="pv-water" cx="95" cy="118" rx="48" ry="25"/>
        <path className="pv-larva" d="M65 115q12-18 24 0t24 0t24 0"/>
        <text className="pv-label" x="95" y="220" textAnchor="middle">old tyre holding rainwater</text>
      </g>
      <g transform="translate(665 110)">
        <path className="pv-bucket" d="M40 90H190L170 280H60Z"/>
        <ellipse className="pv-water" cx="115" cy="105" rx="70" ry="26"/>
        <path className="pv-larva" d="M80 105q12-18 24 0t24 0t24 0"/>
        <text className="pv-label" x="115" y="330" textAnchor="middle">uncovered water container</text>
      </g>
      <path className="pv-arrow" d="M570 260H645"/>
      <g className="pv-mosquito" transform="translate(600 95)">
        <ellipse cx="0" cy="0" rx="22" ry="9"/>
        <circle cx="28" cy="0" r="7"/>
        <path d="M-8-6Q-35-40-55-15M-8 6Q-35 40-55 15M5-8L25-35M5 8L25 35M30 0L58-8"/>
      </g>
      <text className="pv-small" x="490" y="485" textAnchor="middle">Standing water in containers gives mosquitoes a place to develop from egg to adult.</text>
    </svg>
  );
}

function RoutesScene() {
  const routes=[
    ["Housefly","Faeces or garbage → fly body/legs → uncovered food","Mechanical transfer can contribute to intestinal infections."],
    ["Aedes mosquito","Infected person → mosquito → another person","Aedes mosquitoes can transmit dengue, Zika and chikungunya viruses."],
    ["Rat or other infected animal","Urine → wet soil or water → human exposure","Leptospira bacteria can spread through urine from infected animals, including rodents."],
    ["Cockroach","Waste or contaminated surfaces → body → food/surfaces","Cockroaches can contaminate food and preparation areas with microorganisms."],
  ];
  return (
    <div className="spark-pest-route-grid">
      {routes.map(([name,path,text],index)=>(
        <article key={name}>
          <span>{index+1}</span>
          <b>{name}</b>
          <strong>{path}</strong>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function HomeScene() {
  const items=[
    {risk:"Old tyres holding rainwater",result:"Mosquito breeding site",kind:"water"},
    {risk:"Uncovered food",result:"Attracts flies, cockroaches and rodents",kind:"food"},
    {risk:"Garbage left for long periods",result:"Food and shelter for pests",kind:"waste"},
    {risk:"Pet food left outdoors",result:"May attract rodents",kind:"food"},
    {risk:"Uncovered water bowls or containers",result:"May become mosquito breeding sites",kind:"water"},
    {risk:"Clean, covered storage and regular waste removal",result:"Lower household pest risk",kind:"safe"},
  ];
  return (
    <div className="spark-pest-home-grid">
      {items.map(item=>(
        <article key={item.risk} className={item.kind}>
          <span>{item.kind==="safe" ? "LOWER RISK" : "RISK"}</span>
          <b>{item.risk}</b>
          <p>{item.result}</p>
        </article>
      ))}
    </div>
  );
}

export default function PestVectorExplorer() {
  const [view,setView]=useState("roles");
  const info=VIEWS[view];

  return (
    <section className="spark-pest-vector">
      <header>
        <span>PESTS, PARASITES AND VECTORS</span>
        <h3>Trace how household organisms contribute to disease risk</h3>
        <p>Separate the role of the pathogen from the organism that carries it, then identify environmental conditions that increase exposure.</p>
      </header>

      <div className="spark-pest-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key ? "active" : ""} onClick={()=>setView(key)}>{item.label}</button>
        ))}
      </div>

      <div className={view==="roles"||view==="routes"||view==="home" ? "spark-pest-stage cards" : "spark-pest-stage"}>
        {view==="roles" && <RolesScene/>}
        {view==="mosquito" && <MosquitoScene/>}
        {view==="routes" && <RoutesScene/>}
        {view==="home" && <HomeScene/>}
      </div>

      <div className="spark-pest-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
