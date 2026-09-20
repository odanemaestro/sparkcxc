import React, { useMemo, useState } from "react";
import "./energyConversionExplorer.css";

const CHAINS=[
  {id:"fan",name:"Electric fan",input:"Electrical",steps:["Electrical","Kinetic"],waste:"Some energy is transferred as heat and sound."},
  {id:"torch",name:"Torch",input:"Chemical",steps:["Chemical","Electrical","Light"],waste:"Some energy is transferred as heat."},
  {id:"hydro",name:"Hydroelectric station",input:"Gravitational potential",steps:["Gravitational potential","Kinetic","Electrical"],waste:"Friction and electrical resistance transfer some energy to the surroundings as heat and sound."},
  {id:"brakes",name:"Car braking",input:"Kinetic",steps:["Kinetic","Heat"],waste:"Friction transfers the car's kinetic energy mainly to thermal energy in the brakes and surroundings."},
  {id:"speaker",name:"Loudspeaker",input:"Electrical",steps:["Electrical","Sound"],waste:"Some energy becomes heat."},
];

const VEHICLE_ACTIONS=[
  {action:"Keep tyres properly inflated",effect:"Reduces rolling resistance, so less fuel energy is required for the same journey."},
  {action:"Avoid sharp acceleration and braking",effect:"Reduces unnecessary energy transfers and fuel use."},
  {action:"Avoid unnecessary idling",effect:"Stops fuel being burnt while the vehicle is not moving."},
  {action:"Use public transport or car-pooling",effect:"Reduces the number of vehicles needed to move the same number of people."},
];

function Chain({item}){
  return <div className="spark-conversion-chain">
    {item.steps.map((step,i)=><React.Fragment key={step+i}><article><span>{i===0?"INPUT":i===item.steps.length-1?"OUTPUT":"TRANSFER"}</span><strong>{step}</strong></article>{i<item.steps.length-1&&<b aria-hidden="true">→</b>}</React.Fragment>)}
  </div>;
}

function EfficiencyPanel(){
  const [input,setInput]=useState(100);
  const [useful,setUseful]=useState(10);
  const safeInput=Math.max(1,Number(input)||0);
  const safeUseful=Math.min(safeInput,Math.max(0,Number(useful)||0));
  const wasted=safeInput-safeUseful;
  const efficiency=Math.round((safeUseful/safeInput)*1000)/10;
  return <div className="spark-efficiency-panel">
    <div className="spark-efficiency-controls">
      <label>Input energy, J<input type="number" min="1" value={input} onChange={e=>setInput(e.target.value)}/></label>
      <label>Useful output, J<input type="number" min="0" value={useful} onChange={e=>setUseful(e.target.value)}/></label>
    </div>
    <div className="spark-efficiency-results">
      <article><span>Useful</span><strong>{safeUseful} J</strong></article>
      <article><span>Transferred to surroundings</span><strong>{wasted} J</strong></article>
      <article><span>Efficiency</span><strong>{efficiency}%</strong></article>
    </div>
    <p>Efficiency = useful energy output ÷ total energy input × 100%. Energy is conserved even when some output is less useful.</p>
  </div>;
}

function NuclearPanel(){
  return <div className="spark-nuclear-compare">
    <article><span>THE SUN</span><h4>Nuclear fusion</h4><p>Hydrogen nuclei combine to form heavier nuclei. A small decrease in mass is associated with energy release.</p><strong>Fusion joins light nuclei.</strong></article>
    <article><span>NUCLEAR POWER STATION</span><h4>Nuclear fission</h4><p>Heavy nuclei such as uranium split into smaller nuclei and release energy.</p><strong>Fission splits heavy nuclei.</strong></article>
  </div>;
}

function VehiclePanel(){
  return <div className="spark-vehicle-energy">
    <div className="spark-vehicle-actions">{VEHICLE_ACTIONS.map((item,i)=><article key={item.action}><span>{i+1}</span><div><b>{item.action}</b><p>{item.effect}</p></div></article>)}</div>
    <aside><strong>Exhaust and pollution</strong><p>Carbon monoxide reduces the blood's oxygen-carrying capacity by binding strongly to haemoglobin. Nitrogen oxides and unburnt hydrocarbons also contribute to air pollution.</p><p>Catalytic converters change selected harmful exhaust gases into less harmful products. Electric vehicles produce no tailpipe exhaust while driving, although total environmental impact also depends on how electricity and materials are produced.</p></aside>
  </div>;
}

export default function EnergyConversionExplorer(){
  const [view,setView]=useState("chains");
  const [chainId,setChainId]=useState("torch");
  const chain=useMemo(()=>CHAINS.find(item=>item.id===chainId)||CHAINS[0],[chainId]);

  return <section className="spark-energy-conversion">
    <header><span>ENERGY INTER-CONVERSION</span><h3>Track energy from input to output without losing the total</h3><p>Energy changes form and moves between stores, but the total energy in a closed system is conserved.</p></header>
    <div className="spark-conversion-tabs">{[["chains","Conversion chains"],["efficiency","Efficiency"],["nuclear","Nuclear"],["vehicles","Vehicles"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-conversion-stage">
      {view==="chains"&&<div><div className="spark-chain-picker">{CHAINS.map(item=><button type="button" key={item.id} className={chainId===item.id?"active":""} onClick={()=>setChainId(item.id)}>{item.name}</button>)}</div><Chain item={chain}/><p className="spark-chain-note">{chain.waste}</p></div>}
      {view==="efficiency"&&<EfficiencyPanel/>}
      {view==="nuclear"&&<NuclearPanel/>}
      {view==="vehicles"&&<VehiclePanel/>}
    </div>
    <div className="spark-conversion-summary"><strong>Law of conservation of energy</strong><span>Energy cannot be created or destroyed. It changes form or is transferred between the system and its surroundings.</span></div>
  </section>;
}

export { CHAINS, VEHICLE_ACTIONS };
