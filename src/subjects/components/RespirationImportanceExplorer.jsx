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

function EvidenceDiagram({caseId}){
  if(caseId==="co2") return <svg className="spark-respiration-evidence-svg" viewBox="0 0 760 360" role="img" aria-label="Germinating seeds connected by a delivery tube to limewater">
    <path className="re-flask" d="M120 55V115L75 265Q68 300 105 300H285Q322 300 315 265L270 115V55Z"/>
    <path className="re-seed-bed" d="M98 225Q195 200 292 225V280H98Z"/>
    {[130,165,200,235,270].map((x,i)=><ellipse key={x} className="re-seed" cx={x} cy={235+(i%2)*20} rx="13" ry="9"/>)}
    <path className="re-delivery" d="M270 80H430Q475 80 475 135V220"/>
    <path className="re-test-tube" d="M430 135V285Q430 315 475 315Q520 315 520 285V135"/>
    <path className="re-limewater" d="M430 225H520V285Q520 315 475 315Q430 315 430 285Z"/>
    <circle className="re-cloud" cx="458" cy="255" r="18"/><circle className="re-cloud" cx="487" cy="265" r="20"/><circle className="re-cloud" cx="476" cy="244" r="16"/>
    <text className="re-label" x="195" y="335" textAnchor="middle">germinating seeds</text>
    <text className="re-label" x="475" y="335" textAnchor="middle">limewater turns milky</text>
    <text className="re-small" x="360" y="58" textAnchor="middle">CO₂ carried through delivery tube</text>
  </svg>;

  if(caseId==="indicator") return <svg className="spark-respiration-evidence-svg" viewBox="0 0 760 360" role="img" aria-label="Woodlice in a closed chamber with bicarbonate indicator changing from red to yellow">
    <rect className="re-chamber" x="105" y="55" width="550" height="235" rx="28"/>
    <rect className="re-indicator" x="145" y="225" width="470" height="40" rx="8"/>
    {[200,285,375,465,550].map((x,i)=><g key={x} transform={"translate("+x+" "+(145+(i%2)*22)+")"}>
      <ellipse className="re-woodlouse" cx="0" cy="0" rx="28" ry="16"/>
      {[-16,-8,0,8,16].map(v=><line key={v} className="re-woodlouse-segment" x1={v} y1="-13" x2={v} y2="13"/>)}
      <line className="re-leg" x1="-18" y1="12" x2="-28" y2="24"/><line className="re-leg" x1="18" y1="12" x2="28" y2="24"/>
    </g>)}
    <path className="re-co2-arrow" d="M365 180V220"/>
    <text className="re-label" x="380" y="116" textAnchor="middle">living woodlice respire</text>
    <text className="re-small" x="380" y="318" textAnchor="middle">bicarbonate indicator: red → yellow as CO₂ rises</text>
  </svg>;

  return <svg className="spark-respiration-evidence-svg" viewBox="0 0 760 360" role="img" aria-label="Insulated flask containing germinating seeds and a thermometer showing heat release">
    <path className="re-thermos" d="M180 55H420V295Q420 320 395 320H205Q180 320 180 295Z"/>
    <path className="re-insulation" d="M198 75H402V292Q402 303 390 303H210Q198 303 198 292Z"/>
    <path className="re-seed-bed" d="M215 220Q300 196 385 220V285H215Z"/>
    {[238,272,307,342,373].map((x,i)=><ellipse key={x} className="re-seed" cx={x} cy={232+(i%2)*20} rx="13" ry="9"/>)}
    <rect className="re-thermometer" x="292" y="38" width="16" height="190" rx="8"/>
    <circle className="re-thermometer-bulb" cx="300" cy="228" r="18"/>
    <rect className="re-mercury" x="297" y="98" width="6" height="130" rx="3"/>
    <path className="re-heat-arrow" d="M445 180Q520 140 585 110"/>
    <text className="re-label" x="610" y="105" textAnchor="middle">temperature rises</text>
    <text className="re-small" x="300" y="345" textAnchor="middle">insulated flask reduces heat exchange with surroundings</text>
  </svg>;
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
  return <div className="spark-respiration-evidence"><div className="spark-respiration-evidence-buttons">{Object.entries(cases).map(([key,val])=><button type="button" key={key} className={caseId===key?"active":""} onClick={()=>setCaseId(key)}>{val.title}</button>)}</div><article><h4>{item.title}</h4><EvidenceDiagram caseId={caseId}/>{item.steps.map((step,i)=><div key={step}><span>{i+1}</span><p>{step}</p></div>)}<strong>{item.control}</strong></article></div>;
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
