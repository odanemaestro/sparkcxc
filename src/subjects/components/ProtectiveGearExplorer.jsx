import React,{useMemo,useState} from "react";
import "./protectiveGearExplorer.css";

const TASKS=[
  {id:"welding",task:"Arc welding",hazards:"Intense visible light, ultraviolet and infrared radiation, sparks and hot metal",ppe:"Welding helmet or shield with the correct filter shade, worn with suitable primary eye protection and other task PPE",exam:"CSEC may phrase this as goggles or a welding mask. Ordinary sunglasses are not welding eye protection."},
  {id:"electrical",task:"Electrical work",hazards:"Shock, arc flash, burns and contact with energized parts",ppe:"De-energize and verify whenever possible. Energized work is for qualified workers using voltage-rated insulating gloves and other PPE selected for the voltage and arc hazard.",exam:"The bank uses rubber gloves and rubber-soled boots to represent electrical insulation. Real electrical gloves must be rated, tested and maintained for the voltage."},
  {id:"construction",task:"Construction work",hazards:"Falling or flying objects and impact to the head",ppe:"Appropriate hard hat or safety helmet selected for the site hazard",exam:"Hard hats protect the head from falling or flying objects."},
  {id:"grinding",task:"Grinding",hazards:"Flying metal fragments, sparks and particles",ppe:"Safety glasses or goggles with suitable impact protection, with a face shield where the risk assessment requires it",exam:"CSEC highlights goggles for eye protection from flying particles."},
  {id:"bleach",task:"Handling bleach",hazards:"Chemical splash and skin or eye irritation or burns",ppe:"Chemical-resistant gloves and eye or face protection as required by the product label or safety data sheet",exam:"The bank chooses rubber gloves from the listed items, but glove material should match the chemical."},
  {id:"chainsaw",task:"Chainsaw operation",hazards:"Moving chain, flying debris, high noise, falling material and foot injury",ppe:"Eye and face protection, hearing protection, cut-resistant leg protection, protective footwear and other site PPE",exam:"The bank lists goggles, ear muffs and gloves. Real chainsaw PPE is broader."},
  {id:"pesticide",task:"Pesticide application",hazards:"Skin, eye and inhalation exposure to pesticide product",ppe:"Wear the exact PPE required by the pesticide label, which can include chemical-resistant gloves, protective clothing, eye protection and a properly selected respirator",exam:"A generic mask is not a substitute for a label-required respirator."},
  {id:"noise",task:"Loud machinery",hazards:"Permanent hearing damage from hazardous noise exposure",ppe:"Properly selected ear muffs or ear plugs when noise cannot be adequately controlled by quieter equipment or engineering measures",exam:"CSEC identifies ear muffs as hearing protection."},
  {id:"lab",task:"Heating chemicals in a laboratory",hazards:"Chemical splashes, broken glass and hot material",ppe:"Safety goggles, plus lab clothing and gloves when the specific chemical or procedure requires them",exam:"CSEC expects safety goggles for eye protection."},
  {id:"factory",task:"Handling heavy objects",hazards:"Crushing injury to feet",ppe:"Protective footwear with suitable toe protection for the hazard",exam:"The bank refers to steel-toed boots."},
];

function SelectorView(){
  const [id,setId]=useState("welding");
  const item=TASKS.find(t=>t.id===id);
  return <div className="spark-ppe-selector">
    <div className="spark-ppe-buttons">{TASKS.map(t=><button type="button" key={t.id} className={id===t.id?"active":""} onClick={()=>setId(t.id)}>{t.task}</button>)}</div>
    <article><span>{item.task.toUpperCase()}</span><div><b>Hazard</b><p>{item.hazards}</p></div><div><b>Protective gear</b><p>{item.ppe}</p></div><aside><strong>CSEC note</strong><p>{item.exam}</p></aside></article>
  </div>;
}

function HierarchyView(){
  const levels=[
    ["1","Remove the hazard","Eliminate the dangerous process or energy source where possible."],
    ["2","Use safer design or substitution","Replace the hazard or isolate it through engineering."],
    ["3","Engineering controls","Guards, ventilation, barriers and interlocks reduce exposure."],
    ["4","Administrative controls","Procedures, training, restricted access and work scheduling reduce risk."],
    ["5","PPE","Protective gear reduces the harm that reaches the worker, but it depends on correct selection, fit, condition and use."],
  ];
  return <div className="spark-ppe-hierarchy">{levels.map(([n,title,text])=><article key={n}><span>{n}</span><div><b>{title}</b><p>{text}</p></div></article>)}</div>;
}

function ElectricalView(){
  return <div className="spark-ppe-electrical">
    <div className="spark-ppe-flow"><article><span>FIRST CHOICE</span><h4>De-energize</h4><p>Disconnect, lock or tag as required, and verify the circuit is de-energized before work.</p></article><div>→</div><article><span>IF ENERGIZED WORK IS JUSTIFIED</span><h4>Qualified worker only</h4><p>Use special work practices, insulated tools and PPE selected for the voltage and arc hazard.</p></article><div>→</div><article><span>INSULATING PPE</span><h4>Voltage-rated, inspected equipment</h4><p>Electrical protective gloves and sleeves are rated and periodically tested. Ordinary household rubber gloves are not equivalent.</p></article></div>
  </div>;
}

function PesticideView(){
  return <div className="spark-ppe-pesticide">
    <div className="spark-ppe-label"><span>PESTICIDE LABEL</span><strong>Read PPE requirements before mixing, loading or applying</strong></div>
    <div className="spark-ppe-label-arrow">↓</div>
    <div className="spark-ppe-options"><article><b>Hands</b><p>Use the chemical-resistant glove type specified on the label.</p></article><article><b>Body</b><p>Long sleeves, long pants, coveralls or a chemical-resistant suit as specified.</p></article><article><b>Eyes and face</b><p>Use goggles or a face shield when required.</p></article><article><b>Breathing</b><p>If a respirator is required, use the correct approved type with fit testing and training.</p></article></div>
  </div>;
}

function WeldingView(){
  return <div className="spark-ppe-welding">
    <svg viewBox="0 0 820 430" role="img" aria-label="Welder wearing helmet with filtered lens and safety eye protection">
      <circle className="pw-head" cx="410" cy="130" r="75"/>
      <path className="pw-helmet" d="M320 70Q410 20 500 70V220Q410 270 320 220Z"/>
      <rect className="pw-filter" x="350" y="95" width="120" height="70" rx="8"/>
      <path className="pw-body" d="M315 245Q410 205 505 245L565 390H255Z"/>
      <path className="pw-arc" d="M610 280L655 245M620 305L680 305M602 330L655 365"/>
      <circle className="pw-spark" cx="635" cy="225" r="7"/><circle className="pw-spark" cx="690" cy="270" r="6"/><circle className="pw-spark" cx="660" cy="350" r="6"/>
      <text className="pw-label" x="410" y="185" textAnchor="middle">filtered lens</text>
      <text className="pw-label" x="410" y="410" textAnchor="middle">helmet shields eyes and face from radiant energy and sparks</text>
    </svg>
    <p>The filter shade must match the welding process and arc intensity. A welding helmet is not simply dark glass or sunglasses.</p>
  </div>;
}

function InspectView(){
  const checks=[
    ["Correct item","Does the PPE match the specific hazard?"],
    ["Correct fit","Does it fit the user and stay in the protective position?"],
    ["Condition","Is it cracked, torn, contaminated, scratched or otherwise damaged?"],
    ["Rating","Does electrical, respiratory or chemical PPE have the required rating or approval?"],
    ["Training","Does the worker know how to put it on, use it, remove it and maintain it?"],
    ["Limitations","Does the worker know what the PPE does not protect against?"],
  ];
  return <div className="spark-ppe-inspect">{checks.map(([title,text],i)=><article key={title}><span>{i+1}</span><div><b>{title}</b><p>{text}</p></div></article>)}</div>;
}

export default function ProtectiveGearExplorer(){
  const [view,setView]=useState("selector");
  const summary=useMemo(()=>({
    selector:"Protective gear must match the hazard rather than the job title alone.",
    hierarchy:"PPE is the last layer of protection after hazards have been removed, isolated or controlled where possible.",
    electrical:"Electrical work should be de-energized when possible. Energized work requires qualified people and rated protective equipment.",
    pesticide:"Pesticide PPE is product-specific and must follow the label.",
    welding:"Welding eye and face protection must filter hazardous radiant energy and protect against sparks and impact.",
    inspect:"PPE works only when it is suitable, intact, correctly fitted and correctly used.",
  })[view],[view]);

  return <section className="spark-protective-gear">
    <header><span>PROTECTIVE GEAR</span><h3>Match PPE to the hazard and know its limits</h3><p>Personal protective equipment reduces exposure when hazards cannot be fully eliminated or controlled. Correct selection depends on the task, material, energy source and level of risk.</p></header>
    <div className="spark-ppe-tabs">{[["selector","Match the PPE"],["hierarchy","Control hierarchy"],["electrical","Electrical work"],["pesticide","Pesticides"],["welding","Welding"],["inspect","PPE check"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-ppe-stage">
      {view==="selector"&&<SelectorView/>}
      {view==="hierarchy"&&<HierarchyView/>}
      {view==="electrical"&&<ElectricalView/>}
      {view==="pesticide"&&<PesticideView/>}
      {view==="welding"&&<WeldingView/>}
      {view==="inspect"&&<InspectView/>}
    </div>
    <div className="spark-ppe-summary"><strong>{summary}</strong><span>Ordinary clothing or household gloves should never be assumed to provide specialised electrical, chemical, respiratory or impact protection.</span></div>
  </section>;
}

export { TASKS };
