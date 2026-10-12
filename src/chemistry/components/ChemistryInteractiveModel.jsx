import React, { useMemo, useState } from "react";
import "./chemistryInteractiveModel.css";

function Panel({ title, children }) {
  return (
    <section className="chem-model" aria-label={title}>
      <div className="chem-model-head">
        <span>Interactive chemistry</span>
        <h4>{title}</h4>
      </div>
      <div className="chem-model-body">{children}</div>
    </section>
  );
}

function Slider({ label, value, min, max, step=1, onChange, suffix="" }) {
  return (
    <label className="chem-slider">
      <span>{label}<b>{value}{suffix}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={event=>onChange(Number(event.target.value))}/>
    </label>
  );
}

function ParticleStates() {
  const [energy,setEnergy]=useState(30);
  const state=energy<34?"solid":energy<68?"liquid":"gas";
  const count=20;
  const points=Array.from({length:count},(_,i)=>{
    if(state==="solid"){
      const col=i%5,row=Math.floor(i/5);
      return {x:24+col*28,y:26+row*28};
    }
    if(state==="liquid"){
      const col=i%5,row=Math.floor(i/5);
      return {x:20+col*29+(row%2)*6,y:54+row*22};
    }
    const x=18+((i*47)%225),y=18+((i*73)%135);
    return {x,y};
  });
  return <Panel title="Particle states explorer">
    <Slider label="Particle energy" value={energy} min={0} max={100} onChange={setEnergy} suffix="%"/>
    <div className="chem-state-readout"><strong>{state.toUpperCase()}</strong><span>{state==="solid"?"Closely packed, fixed positions":state==="liquid"?"Close together, able to flow":"Far apart, rapid random motion"}</span></div>
    <svg viewBox="0 0 270 170" className="chem-sim-svg" role="img" aria-label={state+" particle model"}>
      <rect x="1" y="1" width="268" height="168" rx="16"/>
      {points.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="7"/>)}
    </svg>
  </Panel>;
}

const SEPARATIONS=[
  ["insoluble solid + liquid","Filtration","Particle size"],
  ["soluble solid + solvent","Crystallisation","Solubility / volatility"],
  ["solvent from solution","Simple distillation","Boiling point"],
  ["miscible liquids","Fractional distillation","Boiling point"],
  ["immiscible liquids","Separating funnel","Density / immiscibility"],
  ["coloured dissolved substances","Paper chromatography","Different mobility"],
];

function SeparationLab(){
  const [choice,setChoice]=useState(0);
  const row=SEPARATIONS[choice];
  return <Panel title="Separation method lab">
    <label className="chem-select-label">Mixture
      <select value={choice} onChange={e=>setChoice(Number(e.target.value))}>
        {SEPARATIONS.map((item,i)=><option key={item[0]} value={i}>{item[0]}</option>)}
      </select>
    </label>
    <div className="chem-result-grid"><div><span>Best method</span><strong>{row[1]}</strong></div><div><span>Property used</span><strong>{row[2]}</strong></div></div>
  </Panel>;
}

function AtomBuilder(){
  const [protons,setProtons]=useState(11);
  const [neutrons,setNeutrons]=useState(12);
  const [electrons,setElectrons]=useState(11);
  const charge=protons-electrons;
  const shells=[Math.min(electrons,2),Math.min(Math.max(electrons-2,0),8),Math.min(Math.max(electrons-10,0),8),Math.max(electrons-18,0)].filter((v,i)=>v>0||i===0);
  return <Panel title="Atom and ion builder">
    <div className="chem-grid-3">
      <Slider label="Protons" value={protons} min={1} max={20} onChange={setProtons}/>
      <Slider label="Neutrons" value={neutrons} min={0} max={24} onChange={setNeutrons}/>
      <Slider label="Electrons" value={electrons} min={0} max={20} onChange={setElectrons}/>
    </div>
    <div className="chem-result-grid">
      <div><span>Atomic number</span><strong>{protons}</strong></div>
      <div><span>Mass number</span><strong>{protons+neutrons}</strong></div>
      <div><span>Charge</span><strong>{charge===0?"0":charge>0?`+${charge}`:charge}</strong></div>
      <div><span>Electron arrangement</span><strong>{shells.join(", ")}</strong></div>
    </div>
  </Panel>;
}

function PeriodicTrends(){
  const [group,setGroup]=useState("II");
  const [position,setPosition]=useState(2);
  const names=group==="II"?["Be","Mg","Ca","Sr","Ba"]:["F2","Cl2","Br2","I2"];
  const trend=group==="II"
    ? `Reactivity generally increases down Group II. ${names[position-1]} is ${position===1?"near the top":"below "+names[0]}.`
    : `Oxidising power generally decreases down Group VII. ${names[position-1]} is ${position===1?"the strongest shown":"weaker than "+names[0]}.`;
  return <Panel title="Periodic trends explorer">
    <div className="chem-choice-row">
      <button className={group==="II"?"active":""} onClick={()=>{setGroup("II");setPosition(2)}}>Group II</button>
      <button className={group==="VII"?"active":""} onClick={()=>{setGroup("VII");setPosition(2)}}>Group VII</button>
    </div>
    <Slider label="Position down the group" value={position} min={1} max={names.length} onChange={setPosition}/>
    <div className="chem-explain"><strong>{names[position-1]}</strong><p>{trend}</p></div>
  </Panel>;
}

function Bonding(){
  const [kind,setKind]=useState("ionic");
  const copy={
    ionic:["Ionic","electron transfer","giant lattice of oppositely charged ions","conducts when molten or aqueous"],
    covalent:["Covalent","shared electron pairs","molecules or giant covalent structures","usually poor conductor unless structure provides mobile electrons"],
    metallic:["Metallic","positive ions + delocalised electrons","giant metallic lattice","good electrical conductor"],
  }[kind];
  return <Panel title="Bonding builder">
    <div className="chem-choice-row">
      {["ionic","covalent","metallic"].map(item=><button key={item} className={kind===item?"active":""} onClick={()=>setKind(item)}>{item}</button>)}
    </div>
    <div className="chem-result-grid">
      <div><span>Bonding</span><strong>{copy[0]}</strong></div>
      <div><span>Electron idea</span><strong>{copy[1]}</strong></div>
      <div><span>Typical structure</span><strong>{copy[2]}</strong></div>
      <div><span>Conductivity clue</span><strong>{copy[3]}</strong></div>
    </div>
  </Panel>;
}

function MoleLab(){
  const [mass,setMass]=useState(10);
  const [molar,setMolar]=useState(40);
  const moles=molar?mass/molar:0;
  return <Panel title="Mole and concentration calculator">
    <div className="chem-grid-2">
      <Slider label="Mass" value={mass} min={1} max={100} onChange={setMass} suffix=" g"/>
      <Slider label="Molar mass" value={molar} min={1} max={200} onChange={setMolar} suffix=" g mol⁻¹"/>
    </div>
    <div className="chem-equation-box"><span>n = m ÷ M</span><strong>{moles.toFixed(3)} mol</strong></div>
  </Panel>;
}

function PhLab(){
  const [ph,setPh]=useState(7);
  const label=ph<7?"acidic":ph>7?"alkaline":"neutral";
  return <Panel title="pH and neutralisation lab">
    <Slider label="pH" value={ph} min={0} max={14} onChange={setPh}/>
    <div className={`chem-ph-band ${label}`}><strong>{label}</strong><span>{ph<3?"strongly acidic":ph<7?"weakly to moderately acidic":ph===7?"neutral":ph>11?"strongly alkaline":"weakly to moderately alkaline"}</span></div>
    <p className="chem-model-note">Strength and concentration are different ideas. pH alone does not tell you the concentration without more information.</p>
  </Panel>;
}

function RedoxLab(){
  const [reaction,setReaction]=useState("zinc");
  const data=reaction==="zinc"
    ? {eq:"Zn + Cu²⁺ → Zn²⁺ + Cu",ox:"Zn loses electrons",red:"Cu²⁺ gains electrons"}
    : {eq:"Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂",ox:"Br⁻ loses electrons",red:"Cl₂ gains electrons"};
  return <Panel title="Electron-transfer explorer">
    <div className="chem-choice-row"><button className={reaction==="zinc"?"active":""} onClick={()=>setReaction("zinc")}>Zn/Cu²⁺</button><button className={reaction==="halogen"?"active":""} onClick={()=>setReaction("halogen")}>Cl₂/Br⁻</button></div>
    <div className="chem-equation-box"><span>{data.eq}</span></div>
    <div className="chem-result-grid"><div><span>Oxidation</span><strong>{data.ox}</strong></div><div><span>Reduction</span><strong>{data.red}</strong></div></div>
  </Panel>;
}

function ElectrolysisLab(){
  const [electrolyte,setElectrolyte]=useState("moltenNaCl");
  const data={
    moltenNaCl:{name:"Molten sodium chloride",cathode:"Na⁺ + e⁻ → Na",anode:"2Cl⁻ → Cl₂ + 2e⁻"},
    aqCuSO4:{name:"Aqueous copper(II) sulfate, inert electrodes",cathode:"Cu²⁺ + 2e⁻ → Cu",anode:"oxygen is formed from water/OH⁻ under school conditions"},
    brine:{name:"Concentrated sodium chloride",cathode:"hydrogen is formed",anode:"chlorine is formed"},
  }[electrolyte];
  return <Panel title="Electrolysis lab">
    <label className="chem-select-label">Electrolyte<select value={electrolyte} onChange={e=>setElectrolyte(e.target.value)}><option value="moltenNaCl">Molten sodium chloride</option><option value="aqCuSO4">Aqueous copper(II) sulfate</option><option value="brine">Concentrated sodium chloride</option></select></label>
    <div className="chem-result-grid"><div><span>Cathode, reduction</span><strong>{data.cathode}</strong></div><div><span>Anode, oxidation</span><strong>{data.anode}</strong></div></div>
  </Panel>;
}

function RatesLab(){
  const [temp,setTemp]=useState(25);
  const [concentration,setConcentration]=useState(1);
  const [area,setArea]=useState(1);
  const [catalyst,setCatalyst]=useState(false);
  const relative=((temp+273)/298)*concentration*area*(catalyst?1.8:1);
  return <Panel title="Reaction-rate simulator">
    <div className="chem-grid-3">
      <Slider label="Temperature" value={temp} min={10} max={80} onChange={setTemp} suffix=" °C"/>
      <Slider label="Relative concentration" value={concentration} min={0.5} max={2} step={0.1} onChange={setConcentration} suffix="×"/>
      <Slider label="Relative surface area" value={area} min={0.5} max={2} step={0.1} onChange={setArea} suffix="×"/>
    </div>
    <label className="chem-check"><input type="checkbox" checked={catalyst} onChange={e=>setCatalyst(e.target.checked)}/> Catalyst present</label>
    <div className="chem-equation-box"><span>Illustrative relative rate</span><strong>{relative.toFixed(2)}×</strong></div>
    <p className="chem-model-note">This is a teaching model for trends, not a kinetic law for a specific reaction.</p>
  </Panel>;
}

function EnergeticsLab(){
  const [delta,setDelta]=useState(-40);
  const exo=delta<0;
  const reactY=exo?70:130,prodY=exo?130:70;
  return <Panel title="Energy-profile and calorimetry lab">
    <Slider label="ΔH" value={delta} min={-100} max={100} onChange={setDelta} suffix=" kJ mol⁻¹"/>
    <svg viewBox="0 0 320 180" className="chem-sim-svg" role="img" aria-label={exo?"Exothermic energy profile":"Endothermic energy profile"}>
      <path d={`M25 ${reactY} C90 ${reactY-5},105 20,160 30 C220 42,230 ${prodY},295 ${prodY}`} className="chem-energy-line"/>
      <line x1="25" y1={reactY} x2="85" y2={reactY}/><line x1="240" y1={prodY} x2="295" y2={prodY}/>
      <text x="28" y={reactY-8}>Reactants</text><text x="238" y={prodY-8}>Products</text>
    </svg>
    <div className="chem-state-readout"><strong>{exo?"EXOTHERMIC":"ENDOTHERMIC"}</strong><span>{exo?"Products are lower in energy; heat is released.":"Products are higher in energy; heat is absorbed."}</span></div>
  </Panel>;
}

function OrganicBuilder(){
  const [family,setFamily]=useState("alkane");
  const [n,setN]=useState(3);
  const formula=family==="alkane"?`C${n}H${2*n+2}`:family==="alkene"?`C${n}H${2*n}`:family==="alcohol"?`C${n}H${2*n+1}OH`:`C${Math.max(1,n)}H${Math.max(1,2*n-1)}COOH`;
  return <Panel title="Organic structure builder">
    <div className="chem-choice-row">{["alkane","alkene","alcohol","acid"].map(f=><button key={f} className={family===f?"active":""} onClick={()=>setFamily(f)}>{f}</button>)}</div>
    <Slider label="Carbon count" value={n} min={family==="alkene"?2:1} max={6} onChange={setN}/>
    <div className="chem-equation-box"><span>Molecular pattern</span><strong>{formula}</strong></div>
  </Panel>;
}

function OrganicReactions(){
  const [family,setFamily]=useState("alkene");
  const copy={
    alkane:["Alkane","substitution with halogens","combustion"],
    alkene:["Alkene","addition at C=C","bromine water decolourisation"],
    alcohol:["Alcohol","combustion / oxidation / esterification","-OH functional group"],
    acid:["Carboxylic acid","acid reactions / esterification","-COOH functional group"],
  }[family];
  return <Panel title="Organic reaction map">
    <div className="chem-choice-row">{Object.keys({alkane:1,alkene:1,alcohol:1,acid:1}).map(f=><button key={f} className={family===f?"active":""} onClick={()=>setFamily(f)}>{f}</button>)}</div>
    <div className="chem-result-grid"><div><span>Family</span><strong>{copy[0]}</strong></div><div><span>Characteristic reaction</span><strong>{copy[1]}</strong></div><div><span>Key clue</span><strong>{copy[2]}</strong></div></div>
  </Panel>;
}

function PolymerLab(){
  const [kind,setKind]=useState("addition");
  return <Panel title="Polymer builder">
    <div className="chem-choice-row"><button className={kind==="addition"?"active":""} onClick={()=>setKind("addition")}>Addition</button><button className={kind==="condensation"?"active":""} onClick={()=>setKind("condensation")}>Condensation</button></div>
    <div className="chem-explain"><strong>{kind==="addition"?"Unsaturated monomers join directly":"Bifunctional monomers join and eliminate a small molecule"}</strong><p>{kind==="addition"?"Typical CSEC example: polyalkenes such as poly(ethene).":"Typical CSEC examples: polyesters and polyamides."}</p></div>
  </Panel>;
}

function ReactivityLab(){
  const [x,setX]=useState(5);
  const series=["K","Ca","Na","Mg","Al","Zn","Fe","Sn","Pb","H","Cu","Ag"];
  const metal=series[x];
  return <Panel title="Reactivity-series investigation">
    <Slider label="Position" value={x} min={0} max={series.length-1} onChange={setX}/>
    <div className="chem-equation-box"><span>Selected</span><strong>{metal}</strong></div>
    <p className="chem-model-note">{x<series.indexOf("H")?`${metal} is above hydrogen, so it can generally displace H₂ from dilute non-oxidising acids if other conditions allow.`:`${metal} is at or below hydrogen, so it does not normally release H₂ from dilute non-oxidising acids.`}</p>
  </Panel>;
}

function CorrosionLab(){
  const [water,setWater]=useState(true),[oxygen,setOxygen]=useState(true),[salt,setSalt]=useState(false);
  const rust=water&&oxygen;
  return <Panel title="Corrosion investigation">
    <div className="chem-choice-row"><label><input type="checkbox" checked={water} onChange={e=>setWater(e.target.checked)}/> Water</label><label><input type="checkbox" checked={oxygen} onChange={e=>setOxygen(e.target.checked)}/> Oxygen</label><label><input type="checkbox" checked={salt} onChange={e=>setSalt(e.target.checked)}/> Salt</label></div>
    <div className="chem-state-readout"><strong>{rust?"RUSTING CONDITIONS PRESENT":"RUSTING LIMITED"}</strong><span>{rust?(salt?"Salt increases conductivity and can speed corrosion.":"Both oxygen and water are present."):"Iron rusting requires both oxygen and water."}</span></div>
  </Panel>;
}

function GasLab(){
  const [gas,setGas]=useState("H2");
  const data={
    H2:["Hydrogen","lighted splint","squeaky pop"],
    O2:["Oxygen","glowing splint","splint relights"],
    CO2:["Carbon dioxide","limewater","turns milky"],
    NH3:["Ammonia","damp red litmus","turns blue"],
    H2O:["Water","anhydrous copper(II) sulfate","white solid turns blue"],
  }[gas];
  return <Panel title="Gas preparation and testing lab">
    <div className="chem-choice-row">{Object.keys({H2:1,O2:1,CO2:1,NH3:1,H2O:1}).map(k=><button key={k} className={gas===k?"active":""} onClick={()=>setGas(k)}>{k}</button>)}</div>
    <div className="chem-result-grid"><div><span>Gas</span><strong>{data[0]}</strong></div><div><span>Test</span><strong>{data[1]}</strong></div><div><span>Positive result</span><strong>{data[2]}</strong></div></div>
  </Panel>;
}

function WaterLab(){
  const [hardness,setHardness]=useState("temporary");
  return <Panel title="Water treatment explorer">
    <div className="chem-choice-row"><button className={hardness==="temporary"?"active":""} onClick={()=>setHardness("temporary")}>Temporary hardness</button><button className={hardness==="permanent"?"active":""} onClick={()=>setHardness("permanent")}>Permanent hardness</button></div>
    <div className="chem-explain"><strong>{hardness==="temporary"?"Can be reduced by boiling":"Not removed by simple boiling"}</strong><p>{hardness==="temporary"?"Associated mainly with dissolved hydrogencarbonates.":"Commonly associated with dissolved sulfates or other salts requiring a different softening method."}</p></div>
  </Panel>;
}

function QualitativeLab(){
  const [unknown,setUnknown]=useState("Cu2+");
  const data={
    "Cu2+":["NaOH: light-blue precipitate","excess NH3: deep-blue solution"],
    "Fe2+":["NaOH: green precipitate","precipitate can darken on standing"],
    "Fe3+":["NaOH: red-brown precipitate","insoluble in excess"],
    "NH4+":["add NaOH and warm","ammonia evolves; damp red litmus turns blue"],
    "Cl-":["acidify then add silver ions","white precipitate; soluble in dilute ammonia"],
  }[unknown];
  return <Panel title="Qualitative-analysis decision lab">
    <div className="chem-choice-row">{Object.keys({"Cu2+":1,"Fe2+":1,"Fe3+":1,"NH4+":1,"Cl-":1}).map(k=><button key={k} className={unknown===k?"active":""} onClick={()=>setUnknown(k)}>{k}</button>)}</div>
    <div className="chem-result-grid"><div><span>First step</span><strong>{data[0]}</strong></div><div><span>Confirmation</span><strong>{data[1]}</strong></div></div>
  </Panel>;
}

export default function ChemistryInteractiveModel({ model }) {
  switch(model?.type){
    case "chemistry-particle-states": return <ParticleStates/>;
    case "chemistry-separation": return <SeparationLab/>;
    case "chemistry-atom-builder": return <AtomBuilder/>;
    case "chemistry-periodic-trends": return <PeriodicTrends/>;
    case "chemistry-bonding": return <Bonding/>;
    case "chemistry-mole": return <MoleLab/>;
    case "chemistry-ph": return <PhLab/>;
    case "chemistry-redox": return <RedoxLab/>;
    case "chemistry-electrolysis": return <ElectrolysisLab/>;
    case "chemistry-rates": return <RatesLab/>;
    case "chemistry-energetics": return <EnergeticsLab/>;
    case "chemistry-fractional-distillation": return <SeparationLab/>;
    case "chemistry-organic-builder": return <OrganicBuilder/>;
    case "chemistry-organic-reactions": return <OrganicReactions/>;
    case "chemistry-polymers": return <PolymerLab/>;
    case "chemistry-metals": return <ReactivityLab/>;
    case "chemistry-reactivity": return <ReactivityLab/>;
    case "chemistry-corrosion": return <CorrosionLab/>;
    case "chemistry-gases": return <GasLab/>;
    case "chemistry-water": return <WaterLab/>;
    case "chemistry-qualitative": return <QualitativeLab/>;
    default:return null;
  }
}
