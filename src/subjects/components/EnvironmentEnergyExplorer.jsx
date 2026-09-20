import React,{useMemo,useState} from "react";
import "./environmentEnergyExplorer.css";

const CHAINS={
  land:{
    label:"Land chain",
    organisms:[
      {name:"Grass",role:"Producer",level:1,energy:10000},
      {name:"Grasshopper",role:"Primary consumer",level:2,energy:1000},
      {name:"Lizard",role:"Secondary consumer",level:3,energy:100},
      {name:"Hawk",role:"Tertiary consumer",level:4,energy:10},
    ],
  },
  marine:{
    label:"Marine chain",
    organisms:[
      {name:"Phytoplankton",role:"Producer",level:1,energy:10000},
      {name:"Zooplankton",role:"Primary consumer",level:2,energy:1000},
      {name:"Small fish",role:"Secondary consumer",level:3,energy:100},
      {name:"Shark",role:"Tertiary consumer",level:4,energy:10},
    ],
  },
};

const ECOLOGY_TERMS=[
  ["Population","Organisms of the same species living in the same area at the same time."],
  ["Community","All the populations of different species living in an area at the same time."],
  ["Habitat","The place where an organism lives."],
  ["Ecosystem","A community of organisms together with the non-living environment."],
];

function ChainView(){
  const [kind,setKind]=useState("land");
  const chain=CHAINS[kind];
  return <div className="spark-env-chain-view">
    <div className="spark-env-chain-picker">{Object.entries(CHAINS).map(([key,item])=><button type="button" key={key} className={kind===key?"active":""} onClick={()=>setKind(key)}>{item.label}</button>)}</div>
    <div className="spark-env-chain">
      {chain.organisms.map((item,i)=><React.Fragment key={item.name}>
        <article>
          <span>TROPHIC LEVEL {item.level}</span>
          <h4>{item.name}</h4>
          <b>{item.role}</b>
          <small>{item.energy.toLocaleString()} relative energy units</small>
        </article>
        {i<chain.organisms.length-1&&<div className="spark-env-arrow" aria-label="energy flows to">→</div>}
      </React.Fragment>)}
    </div>
    <p>Food-chain arrows point from the organism eaten to the organism that eats it. They show the direction of energy transfer.</p>
  </div>;
}

function EnergyView(){
  const levels=[
    {name:"Producer",energy:10000,width:100},
    {name:"Primary consumer",energy:1000,width:70},
    {name:"Secondary consumer",energy:100,width:45},
    {name:"Tertiary consumer",energy:10,width:25},
  ];
  return <div className="spark-env-energy">
    <div className="spark-env-pyramid">
      {levels.slice().reverse().map(item=><div key={item.name} style={{width:`${item.width}%`}}><span>{item.name}</span><b>{item.energy.toLocaleString()}</b></div>)}
    </div>
    <aside>
      <strong>Why energy decreases</strong>
      <p>Only a small fraction, often approximated as 10%, is transferred to the next trophic level.</p>
      <p>Energy is transferred to the surroundings as heat during respiration. Energy also remains in uneaten parts and waste.</p>
      <b>A pyramid of energy is always widest at the producer level.</b>
    </aside>
  </div>;
}

function NumbersView(){
  return <div className="spark-env-numbers">
    <article className="tree"><span>BIRDS</span><div style={{width:"30%"}}>few</div><span>CATERPILLARS</span><div style={{width:"90%"}}>many</div><span>MANGO TREE</span><div style={{width:"18%"}}>one large producer</div></article>
    <aside><strong>Pyramids of numbers can be inverted or irregular</strong><p>One large mango tree can support many caterpillars, which support fewer birds. Number does not account for organism size.</p><p>This is why a pyramid of numbers is not always widest at the base.</p></aside>
  </div>;
}

function DisturbanceView(){
  const [caseId,setCaseId]=useState("shark");
  const cases={
    shark:{
      title:"Too many sharks are caught",
      steps:["Shark population falls","Predation on small fish decreases","Small fish increase at first","Other parts of the food web may then change"],
      note:"Removing a top predator can upset ecological balance.",
    },
    pesticide:{
      title:"Pesticide kills zooplankton",
      steps:["Zooplankton decrease","Less phytoplankton is eaten","Phytoplankton increase","Small fish lose a food source and decrease"],
      note:"A change at one trophic level can affect levels above and below it.",
    },
    frog:{
      title:"Disease kills frogs",
      steps:["Frogs decrease","Snakes lose a major food source","Snake numbers decrease","Grasshoppers may increase because fewer are eaten"],
      note:"Food-web effects depend on which feeding links are lost.",
    },
  };
  const item=cases[caseId];
  return <div className="spark-env-disturbance">
    <div className="spark-env-disturbance-buttons">{Object.entries(cases).map(([key,val])=><button type="button" key={key} className={caseId===key?"active":""} onClick={()=>setCaseId(key)}>{val.title}</button>)}</div>
    <article><h4>{item.title}</h4>{item.steps.map((step,i)=><div key={step}><span>{i+1}</span><p>{step}</p></div>)}<strong>{item.note}</strong></article>
  </div>;
}

function TermsView(){
  return <div className="spark-env-terms">{ECOLOGY_TERMS.map(([term,definition],i)=><article key={term}><span>{i+1}</span><div><b>{term}</b><p>{definition}</p></div></article>)}</div>;
}

export default function EnvironmentEnergyExplorer(){
  const [view,setView]=useState("chain");
  const summary=useMemo(()=>({
    chain:"Energy enters most ecosystems through producers and moves through feeding relationships.",
    energy:"Energy decreases at each trophic level because much is transferred to the surroundings or remains in material not eaten.",
    numbers:"Pyramids of numbers describe organism counts, not the amount of energy.",
    disturbance:"Changing one population can affect several connected populations.",
    terms:"Use ecology terms precisely when explaining energy transfer in an ecosystem.",
  })[view],[view]);

  return <section className="spark-environment-energy">
    <header><span>ENERGY IN THE ENVIRONMENT</span><h3>Track energy through organisms and predict what happens when a food web changes</h3><p>Producers capture light energy, consumers obtain energy by feeding, and decomposers break down dead material while nutrients are recycled.</p></header>
    <div className="spark-env-tabs">{[["chain","Food chains"],["energy","Energy pyramid"],["numbers","Pyramid of numbers"],["disturbance","Population change"],["terms","Ecology terms"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-env-stage">
      {view==="chain"&&<ChainView/>}
      {view==="energy"&&<EnergyView/>}
      {view==="numbers"&&<NumbersView/>}
      {view==="disturbance"&&<DisturbanceView/>}
      {view==="terms"&&<TermsView/>}
    </div>
    <div className="spark-env-summary"><strong>{summary}</strong><span>Bacteria and fungi act as decomposers, breaking down dead organisms and returning nutrients to the environment.</span></div>
  </section>;
}

export { CHAINS,ECOLOGY_TERMS };
