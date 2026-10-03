import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useMemo, useState } from "react";
import "./energyConceptExplorer.css";

const FORMS=[
  {id:"kinetic",name:"Kinetic energy",cue:"movement",example:"A moving bus or bicycle",detail:"An object possesses kinetic energy when it is moving."},
  {id:"gravitational",name:"Gravitational potential energy",cue:"height",example:"A coconut high in a tree",detail:"Energy is stored because of position in a gravitational field."},
  {id:"elastic",name:"Elastic potential energy",cue:"stretch or compression",example:"A stretched rubber band",detail:"Energy is stored when an elastic object is stretched or compressed."},
  {id:"chemical",name:"Chemical energy",cue:"chemical store",example:"Food, fuels and batteries",detail:"Chemical energy is stored in substances and can be transferred during chemical reactions."},
  {id:"sound",name:"Sound energy",cue:"vibrations",example:"A ringing bell",detail:"Sound carries energy through vibrations travelling in a medium."},
  {id:"light",name:"Light energy",cue:"radiation",example:"Sunlight",detail:"Light transfers energy by electromagnetic radiation."},
];

const SCENARIOS=[
  {name:"Book on a high shelf",forms:["gravitational"],why:"It is raised above the ground, so it has gravitational potential energy."},
  {name:"Plane flying high above the ground",forms:["kinetic","gravitational"],why:"It is moving and it is at a height, so it has both kinetic and gravitational potential energy."},
  {name:"Battery in a toy car",forms:["chemical"],why:"The battery stores chemical energy, which can later be transferred electrically."},
  {name:"Stretched spring",forms:["elastic"],why:"The spring stores elastic potential energy because it is deformed."},
];

function EnergyScale(){
  return (
    <div className="spark-energy-scale">
      <article><strong>1 joule</strong><span>1 J</span><p>The SI unit of energy and work.</p></article>
      <div className="spark-energy-scale-arrow" aria-hidden="true">× 1000</div>
      <article><strong>1 kilojoule</strong><span>1 kJ = 1000 J</span><p>The prefix kilo means one thousand.</p></article>
    </div>
  );
}

function WorkMechanismDiagram(){
  return (
    <ReviewedScienceDiagram site="EnergyConceptExplorer.jsx:32"><svg className="spark-work-mechanism-svg" viewBox="0 0 980 430" role="img" aria-label="Mechanical work comparison showing a force moving a box through a distance and a force on a wall with zero displacement">
      <defs>
        <marker id="work-force-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="ew-arrow-head"/>
        </marker>
      </defs>

      <g className="ew-panel work-done" transform="translate(45 55)">
        <rect className="ew-panel-bg" x="0" y="0" width="420" height="300" rx="20"/>
        <text className="ew-title" x="210" y="38" textAnchor="middle">Mechanical work is done</text>
        <line className="ew-ground" x1="45" y1="225" x2="375" y2="225"/>
        <rect className="ew-box" x="110" y="155" width="90" height="70" rx="8"/>
        <path className="ew-force-arrow" d="M65 190H105" markerEnd="url(#work-force-arrow)"/>
        <text className="ew-label" x="66" y="172">force, F</text>
        <path className="ew-displacement-arrow" d="M210 260H335" markerEnd="url(#work-force-arrow)"/>
        <text className="ew-label" x="272" y="286" textAnchor="middle">distance moved, d</text>
        <rect className="ew-box ghost" x="285" y="155" width="90" height="70" rx="8"/>
        <text className="ew-small" x="210" y="118" textAnchor="middle">force acts and the object moves</text>
        <text className="ew-formula" x="210" y="328" textAnchor="middle">Work = force × distance</text>
      </g>

      <g className="ew-panel no-work" transform="translate(515 55)">
        <rect className="ew-panel-bg" x="0" y="0" width="420" height="300" rx="20"/>
        <text className="ew-title" x="210" y="38" textAnchor="middle">No mechanical work on the wall</text>
        <line className="ew-ground" x1="45" y1="225" x2="375" y2="225"/>
        <rect className="ew-wall" x="285" y="75" width="55" height="150"/>
        <g className="ew-person">
          <circle cx="125" cy="122" r="25"/>
          <path d="M125 147V205M125 165L182 175M125 205L95 245M125 205L155 245"/>
        </g>
        <path className="ew-force-arrow" d="M185 175H278" markerEnd="url(#work-force-arrow)"/>
        <text className="ew-label" x="232" y="157" textAnchor="middle">push force</text>
        <path className="ew-zero-displacement" d="M285 260H340"/>
        <text className="ew-label" x="312" y="286" textAnchor="middle">displacement = 0</text>
        <text className="ew-small" x="210" y="70" textAnchor="middle">the wall does not move</text>
        <text className="ew-formula" x="210" y="328" textAnchor="middle">Work = F × 0 = 0 J</text>
      </g>

      <text className="ew-caption" x="490" y="410" textAnchor="middle">For mechanical work, the force must cause displacement in the direction of the force.</text>
    </svg></ReviewedScienceDiagram>
  );
}

function ScenarioView(){
  const [index,setIndex]=useState(0);
  const current=SCENARIOS[index];
  return (
    <div className="spark-energy-scenarios">
      <div className="spark-energy-scenario-buttons">
        {SCENARIOS.map((item,i)=><button type="button" key={item.name} className={index===i?"active":""} onClick={()=>setIndex(i)}>{item.name}</button>)}
      </div>
      <article className="spark-energy-scenario-card">
        <span>ENERGY PRESENT</span>
        <h4>{current.forms.map(id=>FORMS.find(item=>item.id===id)?.name).join(" + ")}</h4>
        <p>{current.why}</p>
      </article>
    </div>
  );
}

export default function EnergyConceptExplorer(){
  const [view,setView]=useState("forms");
  const title=useMemo(()=>({
    forms:"Recognise energy from what the object is doing or how energy is stored",
    work:"Energy is the capacity to do work",
    units:"Energy and work are measured in joules",
    scenarios:"One object can possess more than one form of energy",
  })[view],[view]);

  return (
    <section className="spark-energy-concept">
      <header>
        <span>CONSERVATION OF ENERGY</span>
        <h3>Build the energy vocabulary used throughout Module 2</h3>
        <p>Energy is the capacity to do work. Identify the form or store from the situation, then state the unit correctly.</p>
      </header>

      <div className="spark-energy-tabs">
        {[
          ["forms","Forms"],
          ["work","Energy and work"],
          ["units","Units"],
          ["scenarios","Examples"],
        ].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}
      </div>

      <div className="spark-energy-stage">
        {view==="forms"&&<div className="spark-energy-forms">{FORMS.map((item,i)=><article key={item.id}><span>{i+1}</span><div><b>{item.name}</b><strong>{item.cue}</strong><p>{item.detail}</p><small>{item.example}</small></div></article>)}</div>}

        {view==="work"&&<div className="spark-energy-work-view">
          <WorkMechanismDiagram/>
          <div className="spark-energy-work">
            <article><span>ENERGY</span><h4>Capacity to do work</h4><p>Energy describes the ability of a system or object to cause change or do work.</p></article>
            <div className="spark-energy-work-arrow" aria-hidden="true">→</div>
            <article><span>WORK</span><h4>Force causes movement</h4><p>Mechanical work is done when a force moves an object through a distance in the direction of the force.</p><strong>Work = force × distance</strong></article>
            <div className="spark-energy-work-example"><b>No displacement, no mechanical work on the object.</b><p>Pushing against a wall that does not move does not transfer mechanical energy to the wall by work.</p></div>
          </div>
        </div>}

        {view==="units"&&<EnergyScale/>}
        {view==="scenarios"&&<ScenarioView/>}
      </div>

      <div className="spark-energy-summary"><strong>{title}</strong><span>Do not confuse energy with force, power, mass or volume. Energy and work use the joule, J.</span></div>
    </section>
  );
}

export { FORMS, SCENARIOS };
