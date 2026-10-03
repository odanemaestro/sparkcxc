import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
    <ReviewedScienceDiagram site="PestVectorExplorer.jsx:48"><svg viewBox="0 0 980 520" role="img" aria-label="Standing water in containers supporting mosquito breeding near a home">
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
    </svg></ReviewedScienceDiagram>
  );
}

function RoutesScene() {
  const routes=[
    {
      key:"fly",
      title:"Housefly",
      source:"faeces or garbage",
      carrier:"fly body and legs",
      exposure:"uncovered food",
      note:"mechanical transfer can contribute to intestinal infections",
    },
    {
      key:"mosquito",
      title:"Aedes mosquito",
      source:"infected person",
      carrier:"mosquito vector",
      exposure:"another person",
      note:"may transmit dengue, Zika and chikungunya viruses",
    },
    {
      key:"rat",
      title:"Rat or infected animal",
      source:"infected urine",
      carrier:"wet soil or water",
      exposure:"human skin or mucous membranes",
      note:"Leptospira bacteria can enter during exposure to contaminated water or soil",
    },
    {
      key:"cockroach",
      title:"Cockroach",
      source:"waste or contaminated surface",
      carrier:"cockroach body",
      exposure:"food or preparation surface",
      note:"microorganisms can be transferred onto food-handling areas",
    },
  ];

  return (
    <div className="spark-pest-route-visuals">
      {routes.map(route=>(
        <article key={route.key} className={"pv-route-card "+route.key}>
          <ReviewedScienceDiagram site="PestVectorExplorer.jsx:118"><svg className="pv-route-svg" viewBox="0 0 720 210" role="img" aria-label={route.title+" disease transmission route"}>
            <defs>
              <marker id={"pv-route-arrow-"+route.key} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0L9 4.5L0 9Z" className="pv-route-arrow-head"/>
              </marker>
            </defs>

            <g className="pv-route-node source">
              <rect x="20" y="55" width="180" height="95" rx="16"/>
              <text x="110" y="88" textAnchor="middle">SOURCE</text>
              <text className="pv-route-node-text" x="110" y="118" textAnchor="middle">{route.source}</text>
            </g>

            <path className="pv-route-flow" d="M210 102H278" markerEnd={"url(#pv-route-arrow-"+route.key+")"}/>

            <g className="pv-route-node carrier">
              <rect x="288" y="55" width="180" height="95" rx="16"/>
              <text x="378" y="88" textAnchor="middle">{route.key==="mosquito"?"VECTOR":"CARRIER"}</text>
              <text className="pv-route-node-text" x="378" y="118" textAnchor="middle">{route.carrier}</text>
            </g>

            <path className="pv-route-flow" d="M478 102H546" markerEnd={"url(#pv-route-arrow-"+route.key+")"}/>

            <g className="pv-route-node exposure">
              <rect x="556" y="55" width="145" height="95" rx="16"/>
              <text x="628" y="88" textAnchor="middle">EXPOSURE</text>
              <text className="pv-route-node-text" x="628" y="118" textAnchor="middle">{route.exposure}</text>
            </g>

            <text className="pv-route-title" x="20" y="28">{route.title}</text>
            <text className="pv-route-note" x="360" y="188" textAnchor="middle">{route.note}</text>
          </svg></ReviewedScienceDiagram>
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
