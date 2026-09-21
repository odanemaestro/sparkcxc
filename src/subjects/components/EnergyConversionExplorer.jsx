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

function EnergyConversionDiagram({id}){
  if(id==="fan") return <svg className="spark-energy-conversion-svg" viewBox="0 0 820 360" role="img" aria-label="Electric fan energy conversion from electrical energy to kinetic energy with heat and sound transfers">
    <path className="ec-wire" d="M80 180H245"/>
    <rect className="ec-plug" x="55" y="155" width="55" height="50" rx="8"/>
    <circle className="ec-motor" cx="345" cy="180" r="55"/>
    {[0,90,180,270].map(a=><ellipse key={a} className="ec-fan-blade" cx="345" cy="180" rx="105" ry="28" transform={"rotate("+a+" 345 180)"}/>)}
    <circle className="ec-hub" cx="345" cy="180" r="28"/>
    <path className="ec-flow-arrow" d="M455 180H650"/>
    <path className="ec-motion" d="M655 120Q730 180 655 240"/>
    <text className="ec-label" x="155" y="145" textAnchor="middle">electrical energy</text>
    <text className="ec-label" x="345" y="310" textAnchor="middle">motor turns fan blades</text>
    <text className="ec-label useful" x="690" y="105">kinetic energy</text>
    <text className="ec-small" x="690" y="275" textAnchor="middle">some heat + sound</text>
  </svg>;

  if(id==="torch") return <svg className="spark-energy-conversion-svg" viewBox="0 0 820 360" role="img" aria-label="Torch energy conversion from chemical energy in a battery to electrical energy and light">
    <rect className="ec-torch" x="130" y="125" width="330" height="110" rx="35"/>
    <rect className="ec-battery" x="160" y="148" width="95" height="64" rx="8"/>
    <line className="ec-battery-mark" x1="205" y1="155" x2="205" y2="205"/>
    <line className="ec-battery-mark short" x1="225" y1="165" x2="225" y2="195"/>
    <path className="ec-wire" d="M255 180H365"/>
    <circle className="ec-lamp" cx="405" cy="180" r="34"/>
    <path className="ec-light-ray" d="M455 145L690 70M462 180H735M455 215L690 290"/>
    <text className="ec-label" x="205" y="105" textAnchor="middle">chemical energy</text>
    <text className="ec-label" x="315" y="250" textAnchor="middle">electrical transfer</text>
    <text className="ec-label useful" x="660" y="165" textAnchor="middle">light energy</text>
    <text className="ec-small" x="660" y="220" textAnchor="middle">some energy becomes heat</text>
  </svg>;

  if(id==="hydro") return <svg className="spark-energy-conversion-svg" viewBox="0 0 820 360" role="img" aria-label="Hydroelectric energy conversion from gravitational potential energy through moving water to electrical energy">
    <path className="ec-hill" d="M40 285L40 90H275L275 285Z"/>
    <path className="ec-reservoir" d="M45 105H260V175H45Z"/>
    <path className="ec-penstock" d="M245 165Q360 205 435 265"/>
    <circle className="ec-turbine" cx="455" cy="270" r="46"/>
    {[0,60,120].map(a=><line key={a} className="ec-turbine-blade" x1="455" y1="235" x2="455" y2="305" transform={"rotate("+a+" 455 270)"}/>)}
    <rect className="ec-generator" x="520" y="235" width="90" height="70" rx="12"/>
    <path className="ec-powerline" d="M610 270H760"/>
    <text className="ec-label" x="150" y="70" textAnchor="middle">gravitational potential</text>
    <text className="ec-label" x="350" y="220" textAnchor="middle">kinetic energy of water</text>
    <text className="ec-label useful" x="650" y="225" textAnchor="middle">electrical energy</text>
    <text className="ec-small" x="455" y="335" textAnchor="middle">turbine + generator</text>
  </svg>;

  if(id==="brakes") return <svg className="spark-energy-conversion-svg" viewBox="0 0 820 360" role="img" aria-label="Car braking converting kinetic energy mainly to thermal energy through friction">
    <path className="ec-car" d="M115 210L175 140H430L500 210H585V265H95V210Z"/>
    <circle className="ec-wheel" cx="205" cy="270" r="55"/><circle className="ec-wheel" cx="485" cy="270" r="55"/>
    <circle className="ec-disc" cx="485" cy="270" r="30"/>
    <path className="ec-brake-pad" d="M515 238Q548 270 515 302"/>
    <path className="ec-heat-wave" d="M545 220Q575 195 600 220T655 220"/>
    <path className="ec-heat-wave" d="M555 190Q585 165 610 190T665 190"/>
    <path className="ec-motion-arrow" d="M70 115H250"/>
    <text className="ec-label" x="160" y="96" textAnchor="middle">kinetic energy</text>
    <text className="ec-label useful" x="650" y="145" textAnchor="middle">thermal energy</text>
    <text className="ec-small" x="485" y="340" textAnchor="middle">friction between brake components</text>
  </svg>;

  return <svg className="spark-energy-conversion-svg" viewBox="0 0 820 360" role="img" aria-label="Loudspeaker converting electrical energy to vibrations and sound energy">
    <path className="ec-wire" d="M70 180H210"/>
    <rect className="ec-coil" x="210" y="135" width="90" height="90" rx="12"/>
    <path className="ec-speaker-cone" d="M300 145L500 90V270L300 215Z"/>
    <ellipse className="ec-speaker-rim" cx="500" cy="180" rx="24" ry="92"/>
    <path className="ec-sound-wave" d="M550 125Q620 180 550 235"/>
    <path className="ec-sound-wave" d="M595 95Q700 180 595 265"/>
    <path className="ec-sound-wave" d="M650 70Q780 180 650 290"/>
    <text className="ec-label" x="150" y="145" textAnchor="middle">electrical energy</text>
    <text className="ec-label" x="400" y="305" textAnchor="middle">cone vibrates</text>
    <text className="ec-label useful" x="680" y="180" textAnchor="middle">sound energy</text>
    <text className="ec-small" x="680" y="320" textAnchor="middle">some energy becomes heat</text>
  </svg>;
}

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
      {view==="chains"&&<div><div className="spark-chain-picker">{CHAINS.map(item=><button type="button" key={item.id} className={chainId===item.id?"active":""} onClick={()=>setChainId(item.id)}>{item.name}</button>)}</div><EnergyConversionDiagram id={chainId}/><Chain item={chain}/><p className="spark-chain-note">{chain.waste}</p></div>}
      {view==="efficiency"&&<EfficiencyPanel/>}
      {view==="nuclear"&&<NuclearPanel/>}
      {view==="vehicles"&&<VehiclePanel/>}
    </div>
    <div className="spark-conversion-summary"><strong>Law of conservation of energy</strong><span>Energy cannot be created or destroyed. It changes form or is transferred between the system and its surroundings.</span></div>
  </section>;
}

export { CHAINS, VEHICLE_ACTIONS };
