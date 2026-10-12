import React, { useMemo, useState } from "react";
import "./chemistryInteractiveLab.css";

const clamp=(value,min,max)=>Math.min(max,Math.max(min,Number(value)||0));
const pct=value=>Math.round(clamp(value,0,1)*100);

function LabFrame({title,children,onComplete,completeLabel="Record activity"}){
  const [recorded,setRecorded]=useState(false);
  return <section className="chem-lab">
    <header><span className="chem-lab-kicker">Interactive lab</span><h3>{title}</h3></header>
    <div className="chem-lab-body">{children}</div>
    <footer>
      <button type="button" className="chem-lab-record" disabled={recorded} onClick={()=>{
        setRecorded(true);
        onComplete?.({score:1,maxScore:1,completed:true});
      }}>{recorded?"Activity recorded":completeLabel}</button>
    </footer>
  </section>;
}

function ParticleStates({onComplete}){
  const [energy,setEnergy]=useState(35);
  const state=energy<30?"solid":energy<70?"liquid":"gas";
  const positions=useMemo(()=>Array.from({length:22},(_,i)=>{
    const col=i%6,row=Math.floor(i/6);
    if(state==="solid") return {x:20+col*12,y:24+row*12};
    if(state==="liquid") return {x:16+col*13+(row%2)*5,y:52+row*9};
    return {x:8+((i*37)%88),y:8+((i*53)%82)};
  }),[state]);
  return <LabFrame title="Particle state explorer" onComplete={onComplete}>
    <div className="chem-lab-two">
      <div>
        <label className="chem-lab-slider">Particle energy <strong>{energy}%</strong>
          <input type="range" min="0" max="100" value={energy} onChange={e=>setEnergy(Number(e.target.value))}/>
        </label>
        <p><b>State:</b> {state}. {state==="solid"?"Particles vibrate around fixed positions.":state==="liquid"?"Particles stay close but move past one another.":"Particles are far apart and move rapidly in random directions."}</p>
      </div>
      <svg viewBox="0 0 110 105" className="chem-particle-box" role="img" aria-label={state+" particle model"}>
        <rect x="2" y="2" width="106" height="101" rx="8"/>
        {positions.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3.5"/>)}
      </svg>
    </div>
  </LabFrame>;
}

const separationCases=[
  {mix:"sand + water",answer:"filtration",why:"Sand is insoluble and its particles are large enough to be trapped by filter paper."},
  {mix:"salt + water, recover the salt",answer:"crystallisation",why:"Water is removed until the solution is concentrated, then crystals form on cooling."},
  {mix:"ethanol + water",answer:"fractional distillation",why:"The liquids are miscible and have different but fairly close boiling points."},
  {mix:"oil + water",answer:"separating funnel",why:"The liquids are immiscible and form layers with different densities."},
  {mix:"food dyes in ink",answer:"paper chromatography",why:"The dyes move differently because of different attractions and solubilities."},
];
function SeparationLab({onComplete}){
  const [index,setIndex]=useState(0),[choice,setChoice]=useState(""),[checked,setChecked]=useState(false);
  const item=separationCases[index];
  const options=["filtration","crystallisation","fractional distillation","separating funnel","paper chromatography"];
  return <LabFrame title="Separation method selector" onComplete={onComplete}>
    <p><b>Mixture:</b> {item.mix}</p>
    <div className="chem-choice-grid">{options.map(option=><button type="button" key={option} className={choice===option?"selected":""} onClick={()=>{setChoice(option);setChecked(false)}}>{option}</button>)}</div>
    <div className="chem-lab-actions"><button type="button" onClick={()=>setChecked(true)} disabled={!choice}>Check</button><button type="button" onClick={()=>{setIndex((index+1)%separationCases.length);setChoice("");setChecked(false)}}>Next mixture</button></div>
    {checked&&<p className={choice===item.answer?"chem-ok":"chem-no"}>{choice===item.answer?"Correct. ":"Not this time. "}{item.why}</p>}
  </LabFrame>;
}

function PeriodicTrends({onComplete}){
  const [group,setGroup]=useState("II");
  const [position,setPosition]=useState(1);
  const down=position/4;
  const reactivity=group==="II"?pct(.28+.68*down):pct(.92-.72*down);
  return <LabFrame title="Periodic trend explorer" onComplete={onComplete}>
    <div className="chem-lab-row">
      <label>Group<select value={group} onChange={e=>setGroup(e.target.value)}><option>II</option><option>VII</option></select></label>
      <label>Move down the group<input type="range" min="0" max="4" value={position} onChange={e=>setPosition(Number(e.target.value))}/></label>
    </div>
    <div className="chem-meter"><span style={{width:reactivity+"%"}}/></div>
    <p><b>Relative reactivity:</b> {reactivity}%</p>
    <p>{group==="II"?"Down Group II, outer electrons are farther from the nucleus and easier to remove, so metal reactivity increases.":"Down Group VII, attraction for an incoming electron becomes weaker, so oxidising power and reactivity decrease."}</p>
  </LabFrame>;
}

function BondingLab({onComplete}){
  const [type,setType]=useState("ionic");
  const data={
    ionic:["oppositely charged ions","high melting point","conducts when molten or aqueous"],
    covalent:["shared electron pairs","often low melting point for simple molecules","usually poor electrical conductor"],
    metallic:["positive ions + delocalised electrons","good conductor","malleable and ductile"],
  };
  return <LabFrame title="Bonding and structure builder" onComplete={onComplete}>
    <div className="chem-choice-grid">{Object.keys(data).map(item=><button type="button" key={item} className={type===item?"selected":""} onClick={()=>setType(item)}>{item}</button>)}</div>
    <ul>{data[type].map(line=><li key={line}>{line}</li>)}</ul>
    <svg viewBox="0 0 360 120" className="chem-bond-svg" role="img" aria-label={type+" bonding model"}>
      {type==="ionic"&&<><circle cx="110" cy="60" r="30"/><circle cx="250" cy="60" r="30"/><text x="110" y="67" textAnchor="middle">Na⁺</text><text x="250" y="67" textAnchor="middle">Cl⁻</text><path d="M145 60h70"/><text x="180" y="47" textAnchor="middle">electrostatic attraction</text></>}
      {type==="covalent"&&<><circle cx="145" cy="60" r="34"/><circle cx="215" cy="60" r="34"/><circle cx="176" cy="54" r="4"/><circle cx="184" cy="66" r="4"/><text x="95" y="66">H</text><text x="250" y="66">H</text></>}
      {type==="metallic"&&Array.from({length:8},(_,i)=><g key={i}><circle cx={45+(i%4)*85} cy={35+Math.floor(i/4)*52} r="18"/><text x={45+(i%4)*85} y={41+Math.floor(i/4)*52} textAnchor="middle">M⁺</text></g>)}
    </svg>
  </LabFrame>;
}

function MoleCalculator({onComplete}){
  const [mass,setMass]=useState(20),[molarMass,setMolarMass]=useState(40);
  const moles=mass/Math.max(.0001,molarMass);
  return <LabFrame title="Mole relationship explorer" onComplete={onComplete}>
    <div className="chem-lab-row"><label>Mass / g<input type="number" value={mass} onChange={e=>setMass(Number(e.target.value))}/></label><label>Molar mass / g mol⁻¹<input type="number" value={molarMass} onChange={e=>setMolarMass(Number(e.target.value))}/></label></div>
    <div className="chem-result"><span>n = m ÷ M</span><strong>{moles.toFixed(3)} mol</strong></div>
    <p>Use the balanced equation next if the question asks about a different reactant or product.</p>
  </LabFrame>;
}

function TitrationLab({onComplete}){
  const [burette,setBurette]=useState(0);
  const endpoint=24.6;
  const colour=burette<23.8?"#d946ef":burette<25.2?"#d1fae5":"#fef3c7";
  return <LabFrame title="Acid-base titration lab" onComplete={onComplete}>
    <div className="chem-lab-two"><div><label className="chem-lab-slider">Burette volume added <strong>{burette.toFixed(1)} cm³</strong><input type="range" min="0" max="35" step=".1" value={burette} onChange={e=>setBurette(Number(e.target.value))}/></label><p>Endpoint target: about {endpoint} cm³. Add solution slowly near the colour change and read the burette at eye level.</p></div><div className="chem-flask" style={{"--liquid":colour}}><div/></div></div>
    <p>{Math.abs(burette-endpoint)<.6?"You are at the endpoint region. Record the final burette reading and calculate the titre.":burette<endpoint?"The indicator still shows excess alkali. Continue carefully.":"You have passed the endpoint. In a real titration this rough run would be repeated."}</p>
  </LabFrame>;
}

function RedoxLab({onComplete}){
  const [direction,setDirection]=useState("oxidation");
  return <LabFrame title="Redox electron tracker" onComplete={onComplete}>
    <div className="chem-choice-grid"><button type="button" className={direction==="oxidation"?"selected":""} onClick={()=>setDirection("oxidation")}>Oxidation</button><button type="button" className={direction==="reduction"?"selected":""} onClick={()=>setDirection("reduction")}>Reduction</button></div>
    {direction==="oxidation"?<p><b>Zn → Zn²⁺ + 2e⁻</b><br/>Electrons are lost and the oxidation number increases from 0 to +2.</p>:<p><b>Cu²⁺ + 2e⁻ → Cu</b><br/>Electrons are gained and the oxidation number decreases from +2 to 0.</p>}
    <p>Remember: the oxidising agent is reduced, while the reducing agent is oxidised.</p>
  </LabFrame>;
}

function ElectrolysisLab({onComplete}){
  const [electrolyte,setElectrolyte]=useState("CuSO4-aq"),[electrode,setElectrode]=useState("inert");
  const result=electrolyte==="molten-PbBr2"
    ? {cathode:"Pb²⁺ + 2e⁻ → Pb",anode:"2Br⁻ → Br₂ + 2e⁻"}
    : electrode==="copper"
      ? {cathode:"Cu²⁺ + 2e⁻ → Cu",anode:"Cu → Cu²⁺ + 2e⁻"}
      : {cathode:"Cu²⁺ + 2e⁻ → Cu",anode:"oxygen forms from hydroxide/water at the inert anode"};
  return <LabFrame title="Electrolysis simulator" onComplete={onComplete}>
    <div className="chem-lab-row"><label>Electrolyte<select value={electrolyte} onChange={e=>setElectrolyte(e.target.value)}><option value="CuSO4-aq">aqueous copper(II) sulfate</option><option value="molten-PbBr2">molten lead(II) bromide</option></select></label><label>Electrodes<select value={electrode} onChange={e=>setElectrode(e.target.value)} disabled={electrolyte==="molten-PbBr2"}><option value="inert">inert</option><option value="copper">copper</option></select></label></div>
    <div className="chem-electrodes"><div><b>− Cathode</b><span>Reduction</span><code>{result.cathode}</code></div><div><b>+ Anode</b><span>Oxidation</span><code>{result.anode}</code></div></div>
  </LabFrame>;
}

function RateLab({onComplete}){
  const [temperature,setTemperature]=useState(25),[concentration,setConcentration]=useState(1),[area,setArea]=useState(1),[catalyst,setCatalyst]=useState(false);
  const rate=(temperature/25)*concentration*Math.sqrt(area)*(catalyst?1.8:1);
  return <LabFrame title="Rate of reaction lab" onComplete={onComplete}>
    <div className="chem-lab-grid"><label>Temperature / °C<input type="range" min="10" max="70" value={temperature} onChange={e=>setTemperature(Number(e.target.value))}/><strong>{temperature}</strong></label><label>Relative concentration<input type="range" min=".5" max="2" step=".1" value={concentration} onChange={e=>setConcentration(Number(e.target.value))}/><strong>{concentration.toFixed(1)}×</strong></label><label>Relative surface area<input type="range" min=".5" max="4" step=".1" value={area} onChange={e=>setArea(Number(e.target.value))}/><strong>{area.toFixed(1)}×</strong></label><label className="chem-check"><input type="checkbox" checked={catalyst} onChange={e=>setCatalyst(e.target.checked)}/> catalyst present</label></div>
    <div className="chem-meter"><span style={{width:Math.min(100,rate/7*100)+"%"}}/></div><p>Relative rate index: <b>{rate.toFixed(2)}</b>. Explain each change using collision frequency or activation energy.</p>
  </LabFrame>;
}

function CalorimetryLab({onComplete}){
  const [mass,setMass]=useState(50),[deltaT,setDeltaT]=useState(8.4);
  const q=mass*4.18*deltaT;
  return <LabFrame title="Calorimetry and energy-profile lab" onComplete={onComplete}>
    <div className="chem-lab-row"><label>Solution mass / g<input type="number" value={mass} onChange={e=>setMass(Number(e.target.value))}/></label><label>Temperature change / °C<input type="number" step=".1" value={deltaT} onChange={e=>setDeltaT(Number(e.target.value))}/></label></div>
    <div className="chem-result"><span>q = mcΔT, using c = 4.18 J g⁻¹ °C⁻¹</span><strong>{q.toFixed(0)} J</strong></div>
    <p>A positive temperature rise means the surroundings gained heat, so the reaction itself released heat and was exothermic.</p>
  </LabFrame>;
}

function OrganicBuilder({onComplete}){
  const [family,setFamily]=useState("alkane"),[carbons,setCarbons]=useState(3);
  const formula=family==="alkane"?`C${carbons}H${2*carbons+2}`:family==="alkene"?`C${carbons}H${2*carbons}`:family==="alcohol"?`C${carbons}H${2*carbons+1}OH`:`C${carbons-1}H${2*(carbons-1)+1}COOH`;
  return <LabFrame title="Organic structure builder" onComplete={onComplete}>
    <div className="chem-lab-row"><label>Family<select value={family} onChange={e=>setFamily(e.target.value)}><option value="alkane">alkane</option><option value="alkene">alkene</option><option value="alcohol">alcohol</option><option value="acid">alkanoic acid</option></select></label><label>Carbon atoms<input type="range" min="2" max="6" value={carbons} onChange={e=>setCarbons(Number(e.target.value))}/><strong>{carbons}</strong></label></div>
    <div className="chem-result"><span>Molecular formula</span><strong>{formula}</strong></div>
    <p>Use the functional group to predict reactions. For isomer questions, keep the molecular formula fixed while changing connectivity.</p>
  </LabFrame>;
}

function ReactivityLab({onComplete}){
  const metals=["Mg","Zn","Fe","Cu"];
  const [metal,setMetal]=useState("Zn"),[solution,setSolution]=useState("Cu");
  const rank={Mg:4,Zn:3,Fe:2,Cu:1};
  const displaces=rank[metal]>rank[solution];
  return <LabFrame title="Metal reactivity lab" onComplete={onComplete}>
    <div className="chem-lab-row"><label>Metal strip<select value={metal} onChange={e=>setMetal(e.target.value)}>{metals.map(x=><option key={x}>{x}</option>)}</select></label><label>Ions in solution<select value={solution} onChange={e=>setSolution(e.target.value)}>{metals.map(x=><option key={x}>{x}</option>)}</select></label></div>
    <p className={displaces?"chem-ok":"chem-no"}>{metal===solution?"No net reaction.":displaces?`${metal} is more reactive than ${solution}, so displacement is expected.`:`${metal} is less reactive than ${solution}, so it cannot displace ${solution} ions.`}</p>
  </LabFrame>;
}

const qaData={
  "Cu²⁺":{naoh:"light blue precipitate, insoluble in excess",nh3:"light blue precipitate dissolves in excess to give a deep blue solution"},
  "Fe²⁺":{naoh:"green precipitate, insoluble in excess",nh3:"green precipitate, insoluble in excess"},
  "Fe³⁺":{naoh:"red-brown precipitate, insoluble in excess",nh3:"red-brown precipitate, insoluble in excess"},
  "Al³⁺":{naoh:"white precipitate dissolves in excess",nh3:"white precipitate, insoluble in excess"},
  "Zn²⁺":{naoh:"white precipitate dissolves in excess",nh3:"white precipitate dissolves in excess"},
};
function QualitativeLab({onComplete}){
  const [ion,setIon]=useState("Cu²⁺"),[reagent,setReagent]=useState("naoh");
  return <LabFrame title="Qualitative analysis lab" onComplete={onComplete}>
    <div className="chem-lab-row"><label>Unknown cation<select value={ion} onChange={e=>setIon(e.target.value)}>{Object.keys(qaData).map(x=><option key={x}>{x}</option>)}</select></label><label>Reagent<select value={reagent} onChange={e=>setReagent(e.target.value)}><option value="naoh">aqueous sodium hydroxide</option><option value="nh3">aqueous ammonia</option></select></label></div>
    <div className="chem-result"><span>Observation</span><strong>{qaData[ion][reagent]}</strong></div>
    <p>In the exam, record the observation before stating the inference.</p>
  </LabFrame>;
}

export default function ChemistryInteractiveLab({model,onComplete}){
  const type=model?.type;
  const props={onComplete};
  if(type==="chemistry-particle-states") return <ParticleStates {...props}/>;
  if(type==="chemistry-separation") return <SeparationLab {...props}/>;
  if(type==="chemistry-periodic-trends") return <PeriodicTrends {...props}/>;
  if(type==="chemistry-bonding") return <BondingLab {...props}/>;
  if(type==="chemistry-mole-calculator") return <MoleCalculator {...props}/>;
  if(type==="chemistry-titration") return <TitrationLab {...props}/>;
  if(type==="chemistry-redox") return <RedoxLab {...props}/>;
  if(type==="chemistry-electrolysis") return <ElectrolysisLab {...props}/>;
  if(type==="chemistry-rate") return <RateLab {...props}/>;
  if(type==="chemistry-calorimetry") return <CalorimetryLab {...props}/>;
  if(type==="chemistry-organic-builder") return <OrganicBuilder {...props}/>;
  if(type==="chemistry-reactivity") return <ReactivityLab {...props}/>;
  if(type==="chemistry-qualitative-analysis") return <QualitativeLab {...props}/>;
  return null;
}
