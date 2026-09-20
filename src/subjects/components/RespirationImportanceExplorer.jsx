import React,{useMemo,useState} from "react";
import "./respirationImportanceExplorer.css";

const USES=[
  ["Muscle contraction","ATP supplies energy for muscle fibres to contract."],
  ["Active transport","Cells use ATP to move substances against concentration gradients."],
  ["Growth and repair","Energy supports synthesis of new cell material."],
  ["Keeping warm","Some energy released during respiration becomes heat."],
  ["Cell processes","ATP powers many reactions and movements inside living cells."],
];

function EquationView(){
  return <div className="spark-respiration-equation">
    <div className="spark-respiration-word"><span>Glucose</span><b>+</b><span>Oxygen</span><b>→</b><span>Carbon dioxide</span><b>+</b><span>Water</span><b>+</b><span>Energy</span></div>
    <div className="spark-respiration-balanced">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy</div>
    <div className="spark-respiration-cell-flow"><article><span>GLUCOSE</span><strong>chemical energy in food</strong></article><b>→</b><article><span>MITOCHONDRIA</span><strong>aerobic respiration</strong></article><b>→</b><article><span>ATP</span><strong>usable cellular energy transfer</strong></article></div>
  </div>;
}

function UsesView(){
  return <div className="spark-respiration-uses">{USES.map(([name,text],i)=><article key={name}><span>{i+1}</span><div><b>{name}</b><p>{text}</p></div></article>)}</div>;
}

function EvidenceView(){
  const [caseId,setCaseId]=useState("co2");
  const cases={
    co2:{
      title:"Germinating seeds and limewater",
      steps:["Living germinating seeds are placed in flask A","Gas leaving the flask passes into limewater","The limewater turns milky","Carbon dioxide was produced by respiration"],
      control:"A matching flask with boiled, dead seeds acts as the control because those seeds do not respire.",
    },
    indicator:{
      title:"Woodlice and bicarbonate indicator",
      steps:["Indicator begins red","Living woodlice respire","Carbon dioxide concentration rises","The indicator becomes yellow"],
      control:"The colour change shows that respiration adds carbon dioxide to the air around the organisms.",
    },
    heat:{
      title:"Germinating seeds in an insulated flask",
      steps:["Germinating seeds respire","Temperature rises over time","Some chemical energy is transferred as heat","Respiration is an exothermic process"],
      control:"A control using dead or non-respiring material helps show that the temperature rise is due to living respiration.",
    },
  };
  const item=cases[caseId];
  return <div className="spark-respiration-evidence"><div className="spark-respiration-evidence-buttons">{Object.entries(cases).map(([key,val])=><button type="button" key={key} className={caseId===key?"active":""} onClick={()=>setCaseId(key)}>{val.title}</button>)}</div><article><h4>{item.title}</h4>{item.steps.map((step,i)=><div key={step}><span>{i+1}</span><p>{step}</p></div>)}<strong>{item.control}</strong></article></div>;
}

function FuelView(){
  return <div className="spark-respiration-fuels">
    <article><span>CARBOHYDRATE</span><strong>about 17 kJ/g</strong><p>Common immediate source of respiratory substrate after digestion and absorption.</p></article>
    <article><span>PROTEIN</span><strong>about 17 kJ/g</strong><p>Primarily needed for growth and repair, but it can also provide energy.</p></article>
    <article><span>FAT</span><strong>about 38 kJ/g</strong><p>Releases roughly twice as much energy per gram as carbohydrate or protein.</p></article>
  </div>;
}

export default function RespirationImportanceExplorer(){
  const [view,setView]=useState("equation");
  const summary=useMemo(()=>({
    equation:"Respiration is a cellular process, not the same as breathing.",
    uses:"ATP transfers energy from respiration to energy-requiring cell processes.",
    evidence:"Respiration can be demonstrated by carbon dioxide production and heat release.",
    fuels:"Different food groups release different amounts of energy when metabolised.",
  })[view],[view]);

  return <section className="spark-respiration-importance">
    <header><span>RESPIRATION AND ENERGY</span><h3>Connect the breakdown of food with ATP and the work of living cells</h3><p>Respiration releases energy from food in living cells. It occurs in plants and animals, day and night, and aerobic respiration takes place mainly in mitochondria.</p></header>
    <div className="spark-respiration-tabs">{[["equation","Aerobic equation"],["uses","Uses of energy"],["evidence","Evidence"],["fuels","Energy per gram"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-respiration-stage">
      {view==="equation"&&<EquationView/>}
      {view==="uses"&&<UsesView/>}
      {view==="evidence"&&<EvidenceView/>}
      {view==="fuels"&&<FuelView/>}
    </div>
    <div className="spark-respiration-summary"><strong>{summary}</strong><span>Breathing moves air into and out of lungs. Respiration is the chemical process that releases energy from food inside living cells.</span></div>
  </section>;
}

export { USES };
