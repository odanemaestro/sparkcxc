import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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

function FoodChainSvg({kind}){
  const marine=kind==="marine";
  return <ReviewedScienceDiagram site="EnvironmentEnergyExplorer.jsx:34"><svg className="spark-env-foodchain-svg" viewBox="0 0 960 360" role="img" aria-label={marine?"Marine food chain from phytoplankton to zooplankton to small fish to shark":"Land food chain from grass to grasshopper to lizard to hawk"}>
    <defs>
      <marker id={"env-arrow-"+kind} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path className="env-arrow-head" d="M0 0L10 5L0 10Z"/>
      </marker>
    </defs>
    <circle className="env-sun" cx="65" cy="62" r="32"/>
    <path className="env-sun-ray" d="M65 8V25M65 99V116M11 62H28M102 62H119M27 24L39 36M91 88L103 100M27 100L39 88M91 36L103 24"/>
    <text className="env-small" x="65" y="135" textAnchor="middle">light energy</text>

    <g transform="translate(135 145)">
      {marine?
        <><circle className="env-phyto" cx="70" cy="70" r="28"/><circle className="env-phyto" cx="42" cy="95" r="17"/><circle className="env-phyto" cx="96" cy="103" r="20"/></>
        :<><path className="env-grass" d="M35 125Q55 65 75 125M65 125Q85 45 95 125M100 125Q125 60 130 125M120 125Q155 80 155 125"/><line className="env-ground" x1="20" y1="128" x2="170" y2="128"/></>}
      <text className="env-organism-label" x="90" y="165" textAnchor="middle">{marine?"Phytoplankton":"Grass"}</text>
      <text className="env-energy-label" x="90" y="188" textAnchor="middle">10 000</text>
    </g>

    <path className="env-flow" d="M320 215H375" markerEnd={"url(#env-arrow-"+kind+")"}/>

    <g transform="translate(375 145)">
      {marine?
        <><ellipse className="env-zoo" cx="85" cy="85" rx="48" ry="24"/><circle className="env-zoo-eye" cx="112" cy="80" r="4"/><path className="env-zoo-leg" d="M60 105L45 130M82 108L78 135M103 105L115 130"/></>
        :<><ellipse className="env-insect-body" cx="82" cy="88" rx="42" ry="18"/><circle className="env-insect-head" cx="126" cy="80" r="15"/><path className="env-insect-leg" d="M55 100L30 130M78 105L62 137M100 103L120 135M125 66L145 48"/></>}
      <text className="env-organism-label" x="85" y="165" textAnchor="middle">{marine?"Zooplankton":"Grasshopper"}</text>
      <text className="env-energy-label" x="85" y="188" textAnchor="middle">1 000</text>
    </g>

    <path className="env-flow" d="M550 215H605" markerEnd={"url(#env-arrow-"+kind+")"}/>

    <g transform="translate(600 145)">
      {marine?
        <><path className="env-fish" d="M32 88Q88 43 145 88Q88 133 32 88Z"/><path className="env-fish-tail" d="M32 88L0 60V116Z"/><circle className="env-fish-eye" cx="125" cy="80" r="4"/></>
        :<><path className="env-lizard" d="M35 95Q83 55 135 88Q105 110 68 108Q38 108 20 126"/><circle className="env-lizard-eye" cx="122" cy="83" r="3"/><path className="env-lizard-leg" d="M72 105L55 130M95 101L112 126"/></>}
      <text className="env-organism-label" x="85" y="165" textAnchor="middle">{marine?"Small fish":"Lizard"}</text>
      <text className="env-energy-label" x="85" y="188" textAnchor="middle">100</text>
    </g>

    <path className="env-flow" d="M775 215H820" markerEnd={"url(#env-arrow-"+kind+")"}/>

    <g transform="translate(780 145)">
      {marine?
        <><path className="env-shark" d="M25 90Q90 35 165 83Q118 132 45 112L7 135L20 100Z"/><path className="env-shark-fin" d="M94 54L120 12L130 65"/><circle className="env-fish-eye" cx="146" cy="79" r="4"/></>
        :<><path className="env-hawk" d="M15 95Q70 42 100 80Q130 42 185 95Q143 80 115 108L100 128L85 108Q57 80 15 95Z"/><circle className="env-hawk-eye" cx="105" cy="86" r="3"/></>}
      <text className="env-organism-label" x="100" y="165" textAnchor="middle">{marine?"Shark":"Hawk"}</text>
      <text className="env-energy-label" x="100" y="188" textAnchor="middle">10</text>
    </g>
    <text className="env-caption" x="480" y="338" textAnchor="middle">arrows show the direction of energy transfer, from food to consumer</text>
  </svg></ReviewedScienceDiagram>;
}

function EnergyPyramidSvg(){
  return <ReviewedScienceDiagram site="EnvironmentEnergyExplorer.jsx:86"><svg className="spark-env-pyramid-svg" viewBox="0 0 700 480" role="img" aria-label="Pyramid of energy with producer 10000, primary consumer 1000, secondary consumer 100 and tertiary consumer 10 relative energy units">
    <path className="env-pyramid-level producer" d="M60 370H640L575 455H125Z"/>
    <path className="env-pyramid-level primary" d="M125 285H575L520 365H180Z"/>
    <path className="env-pyramid-level secondary" d="M180 200H520L465 280H235Z"/>
    <path className="env-pyramid-level tertiary" d="M235 115H465L415 195H285Z"/>
    <text className="env-pyramid-text" x="350" y="160" textAnchor="middle">Tertiary consumer · 10</text>
    <text className="env-pyramid-text" x="350" y="246" textAnchor="middle">Secondary consumer · 100</text>
    <text className="env-pyramid-text" x="350" y="331" textAnchor="middle">Primary consumer · 1 000</text>
    <text className="env-pyramid-text" x="350" y="417" textAnchor="middle">Producer · 10 000</text>
    <path className="env-heat-arrow" d="M540 345Q620 305 645 260"/><text className="env-small" x="620" y="240" textAnchor="middle">energy to surroundings</text>
    <text className="env-caption" x="350" y="75" textAnchor="middle">energy available decreases at successive trophic levels</text>
  </svg></ReviewedScienceDiagram>;
}

function ChainView(){
  const [kind,setKind]=useState("land");
  const chain=CHAINS[kind];
  return <div className="spark-env-chain-view">
    <div className="spark-env-chain-picker">{Object.entries(CHAINS).map(([key,item])=><button type="button" key={key} className={kind===key?"active":""} onClick={()=>setKind(key)}>{item.label}</button>)}</div>
    <FoodChainSvg kind={kind}/>
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
    <EnergyPyramidSvg/>
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
