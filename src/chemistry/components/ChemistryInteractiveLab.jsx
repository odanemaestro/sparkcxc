import React, { createContext, useContext, useMemo, useState } from "react";
import "./chemistryInteractiveLab.css";

const clamp=(value,min,max)=>Math.min(max,Math.max(min,Number(value)||0));
const pct=value=>Math.round(clamp(value,0,1)*100);

const ResetLab = createContext(()=>{});
const validNumber=(value,min=0)=>value!==""&&Number.isFinite(Number(value))&&Number(value)>=min;

function LabFrame({title,children,onComplete,ready,completeLabel="Record activity"}){
  const [recorded,setRecorded]=useState(false);
  const [explored,setExplored]=useState(false);
  const reset=useContext(ResetLab);
  const canRecord=ready??explored;
  return <section className="chem-lab">
    <header><h3>{title}</h3><button type="button" className="chem-lab-reset" onClick={reset}>Reset lab</button></header>
    <div className="chem-lab-body" onChangeCapture={()=>setExplored(true)} onClickCapture={e=>{if(e.target.closest('button'))setExplored(true)}}>{children}</div>
    <footer>
      <span className="chem-lab-hint" role="status">{recorded?"Saved for this activity.":canRecord?"Ready to record your exploration.":"Use the controls to explore before recording."}</span>
      <button type="button" className="chem-lab-record" disabled={recorded||!canRecord} onClick={()=>{
        onComplete?.({score:1,maxScore:1,completed:true});
        setRecorded(true);
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
      <svg viewBox="0 0 110 105" className={"chem-particle-box chem-state-"+state} role="img" aria-label={state+" particle model"}>
        <rect x="2" y="2" width="106" height="101" rx="8"/>
        {positions.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3.5" style={{"--delay":`${-i*.27}s`, "--duration":`${Math.max(.4,3-energy/40)}s`}}/>)}
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
  const [solved,setSolved]=useState([]);
  const item=separationCases[index];
  const options=["filtration","crystallisation","fractional distillation","separating funnel","paper chromatography"];
  return <LabFrame title="Separation method selector" onComplete={onComplete} ready={solved.length===separationCases.length}>
    <p>Choose a method for each mixture. Correctly separate all five mixtures to record the activity. <b>{solved.length} / 5 solved</b></p>
    <p><b>Mixture:</b> {item.mix}</p>
    <div className="chem-choice-grid">{options.map(option=><button type="button" key={option} aria-pressed={choice===option} className={choice===option?"selected":""} onClick={()=>{setChoice(option);setChecked(false)}}>{option}</button>)}</div>
    <div className="chem-lab-actions"><button type="button" className="chem-lab-check-action" onClick={()=>{setChecked(true);if(choice===item.answer)setSolved(previous=>previous.includes(index)?previous:[...previous,index])}} disabled={!choice}>Check</button><button type="button" className="chem-lab-next-action" onClick={()=>{setIndex((index+1)%separationCases.length);setChoice("");setChecked(false)}}>Next mixture</button></div>
    {checked&&<div role="status"><p className={choice===item.answer?"chem-ok":"chem-no"}>{choice===item.answer?"Correct. ":`Try ${item.answer}. `}{item.why}</p>{choice===item.answer&&<p className="chem-observation">{["Residue: sand on the filter paper. Filtrate: water in the receiver.","Concentrate the solution, cool it, then filter and dry the salt crystals.","Collect the ethanol-rich fraction first; the higher-boiling water remains longer.","Drain the lower water layer first, then collect the oil separately.","Separated dye spots appear above the solvent baseline."][index]}</p>}</div>}
  </LabFrame>;
}

function PeriodicTrends({onComplete}){
  const [group,setGroup]=useState("II");
  const [position,setPosition]=useState(1);
  const down=position/4;
  const reactivity=group==="II"?pct(.28+.68*down):pct(.92-.72*down);
  const elements=group==="II"?["beryllium","magnesium","calcium","strontium","barium"]:["fluorine","chlorine","bromine","iodine","astatine"];
  return <LabFrame title="Periodic trend explorer" onComplete={onComplete}>
    <div className="chem-lab-row">
      <label>Group<select value={group} onChange={e=>setGroup(e.target.value)}><option>II</option><option>VII</option></select></label>
      <label>Move down the group<input type="range" min="0" max="4" value={position} onChange={e=>setPosition(Number(e.target.value))}/></label>
    </div>
    <div className="chem-meter"><span style={{width:reactivity+"%"}}/></div>
    <p><b>Selected element:</b> {elements[position]}</p><p><b>Illustrative reactivity index:</b> {reactivity} / 100. This shows the trend, not a measured percentage.</p>
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
    <div className="chem-choice-grid">{Object.keys(data).map(item=><button type="button" key={item} aria-pressed={type===item} className={type===item?"selected":""} onClick={()=>setType(item)}>{item}</button>)}</div>
    <ul>{data[type].map(line=><li key={line}>{line}</li>)}</ul>
    <svg viewBox="0 0 360 120" className="chem-bond-svg" role="img" aria-label={type+" bonding model"}>
      {type==="ionic"&&<><circle cx="110" cy="60" r="30"/><circle cx="250" cy="60" r="30"/><text x="110" y="67" textAnchor="middle">Na⁺</text><text x="250" y="67" textAnchor="middle">Cl⁻</text><path d="M145 60h70"/><path d="M180 53v-15" className="chem-bond-label-leader"/><text className="chem-bond-annotation" x="180" y="18" textAnchor="middle"><tspan x="180">electrostatic</tspan><tspan x="180" dy="13">attraction</tspan></text></>}
      {type==="covalent"&&<><circle cx="145" cy="60" r="34"/><circle cx="215" cy="60" r="34"/><circle cx="176" cy="54" r="4"/><circle cx="184" cy="66" r="4"/><text x="95" y="66">H</text><text x="250" y="66">H</text></>}
      {type==="metallic"&&Array.from({length:8},(_,i)=><g key={i}><circle cx={45+(i%4)*85} cy={35+Math.floor(i/4)*52} r="18"/><text x={45+(i%4)*85} y={41+Math.floor(i/4)*52} textAnchor="middle">M⁺</text></g>)}
      {type==="metallic"&&Array.from({length:12},(_,i)=><text key={"electron"+i} className="chem-free-electron" x={20+(i%6)*58} y={62+Math.floor(i/6)*48}>e⁻</text>)}
    </svg>
  </LabFrame>;
}

function MoleCalculator({onComplete}){
  const [mass,setMass]=useState(20),[molarMass,setMolarMass]=useState(40);
  const [changed,setChanged]=useState(false);
  const valid=validNumber(mass)&&validNumber(molarMass)&&Number(molarMass)>0&&Number.isFinite(Number(mass)/Number(molarMass));
  const moles=valid?Number(mass)/Number(molarMass):null;
  return <LabFrame title="Mole relationship explorer" onComplete={onComplete} ready={valid&&changed}>
    <div className="chem-choice-grid">{[["Mg",24],["NaCl",58.5],["CaCO₃",100]].map(([name,value])=><button type="button" key={name} onClick={()=>{setMolarMass(value);setChanged(true)}}>Use {name}</button>)}</div>
    <div className="chem-lab-row"><label>Mass / g<input type="number" min="0" step="any" value={mass} aria-invalid={!validNumber(mass)} onChange={e=>{setMass(e.target.value);setChanged(true)}}/></label><label>Molar mass / g mol⁻¹<input type="number" min="0.001" step="any" value={molarMass} aria-invalid={!validNumber(molarMass)||Number(molarMass)<=0} onChange={e=>{setMolarMass(e.target.value);setChanged(true)}}/></label></div>
    {valid?<div className="chem-result" role="status"><span>n = {mass} ÷ {molarMass}</span><strong>{moles.toFixed(3)} mol</strong></div>:<p role="alert" className="chem-no">Enter a non-negative mass and a molar mass greater than zero.</p>}
    <p>Use the balanced equation next if the question asks about a different reactant or product.</p>
  </LabFrame>;
}

function TitrationLab({onComplete}){
  const [burette,setBurette]=useState(0);
  const [trials,setTrials]=useState([]);
  const endpoint=24.6;
  const atEndpoint=burette>=endpoint&&burette<=endpoint+.05001;
  const colour=burette<24.4?"#d946ef":burette<endpoint?"#f5b5ed":"#f4f9fc";
  const concordant=trials.filter(t=>t.accepted);
  const add=volume=>setBurette(value=>Math.min(35,Math.round((value+volume)*100)/100));
  return <LabFrame title="Acid-base titration lab" onComplete={onComplete} ready={concordant.length>=2}>
    <p>Add hydrochloric acid to 25.0 cm³ of alkali with phenolphthalein. Stop at the first permanent loss of pink. Obtain two titres within 0.10 cm³.</p>
    <div className="chem-lab-two"><div><label className="chem-lab-slider">Burette volume added <strong>{burette.toFixed(2)} cm³</strong><input type="range" min="0" max="35" step=".05" value={burette} onChange={e=>setBurette(Number(e.target.value))}/></label><div className="chem-lab-actions">{[5,1,.05].map(v=><button type="button" key={v} disabled={burette>=35} onClick={()=>add(v)}>Add {v===.05?"one drop":`${v} cm³`}</button>)}</div><p>Initial burette reading: 0.00 cm³. Read the bottom of the meniscus at eye level. This teaching model changes colour at {endpoint.toFixed(2)} cm³.</p></div><div className="chem-flask" role="img" aria-label={burette<endpoint?"Pink alkali in flask":"Colourless solution in flask"} style={{"--liquid":colour}}><div/></div></div>
    <p role="status">{atEndpoint?"Endpoint reached. Record the titre and repeat to check agreement.":burette<endpoint?"Pink indicator: alkali remains. Add dropwise near the endpoint.":"Colourless, but the endpoint was overshot. Record this as a rough run and repeat."}</p>
    <div className="chem-lab-actions"><button type="button" disabled={burette===0} onClick={()=>{setTrials(previous=>[...previous,{volume:burette,accepted:atEndpoint}]);setBurette(0)}}>Record titre and refill</button></div>
    {trials.length>0&&<div className="chem-table-wrap"><table><caption>Titration notebook</caption><thead><tr><th>Run</th><th>Titre / cm³</th><th>Observation</th></tr></thead><tbody>{trials.map((trial,i)=><tr key={i}><td>{i+1}</td><td>{trial.volume.toFixed(2)}</td><td>{trial.accepted?"Endpoint":"Rough run"}</td></tr>)}</tbody></table></div>}
    {concordant.length>=2&&<p className="chem-ok" role="status">Concordant mean titre: {(concordant.reduce((sum,t)=>sum+t.volume,0)/concordant.length).toFixed(2)} cm³.</p>}
  </LabFrame>;
}

function RedoxLab({onComplete}){
  const [direction,setDirection]=useState("oxidation");
  const [transferred,setTransferred]=useState(false);
  return <LabFrame title="Redox electron tracker" onComplete={onComplete} ready={transferred}>
    <div className="chem-choice-grid">{["oxidation","reduction"].map(value=><button type="button" key={value} aria-pressed={direction===value} className={direction===value?"selected":""} onClick={()=>{setDirection(value);setTransferred(false)}}>{value=== "oxidation"?"Oxidation":"Reduction"}</button>)}</div>
    <div className="chem-result"><strong>{direction==="oxidation"?(transferred?"Zn²⁺":"Zn"):(transferred?"Cu":"Cu²⁺")}</strong><span>{transferred?(direction==="oxidation"?"2 electrons released":"2 electrons received"):"Transfer two electrons to complete the half-equation."}</span></div>
    <div className="chem-lab-actions"><button type="button" disabled={transferred} onClick={()=>setTransferred(true)}>{direction==="oxidation"?"Release 2 electrons":"Receive 2 electrons"}</button></div>
    {direction==="oxidation"?<p><b>Zn → Zn²⁺ + 2e⁻</b><br/>Electrons are lost and the oxidation number increases from 0 to +2.</p>:<p><b>Cu²⁺ + 2e⁻ → Cu</b><br/>Electrons are gained and the oxidation number decreases from +2 to 0.</p>}
    <p>Remember: the oxidising agent is reduced, while the reducing agent is oxidised.</p>
  </LabFrame>;
}

function ElectrolysisLab({onComplete}){
  const [electrolyte,setElectrolyte]=useState("CuSO4-aq"),[electrode,setElectrode]=useState("inert");
  const [powered,setPowered]=useState(false),[seconds,setSeconds]=useState(0);
  const result=electrolyte==="molten-PbBr2"
    ? {cathode:"Pb²⁺ + 2e⁻ → Pb",anode:"2Br⁻ → Br₂ + 2e⁻"}
    : electrode==="copper"
      ? {cathode:"Cu²⁺ + 2e⁻ → Cu",anode:"Cu → Cu²⁺ + 2e⁻"}
      : {cathode:"Cu²⁺ + 2e⁻ → Cu",anode:"oxygen forms from hydroxide/water at the inert anode"};
  return <LabFrame title="Electrolysis simulator" onComplete={onComplete} ready={seconds>0}>
    <div className="chem-lab-row"><label>Electrolyte<select value={electrolyte} onChange={e=>{setElectrolyte(e.target.value);setElectrode("inert");setPowered(false);setSeconds(0)}}><option value="CuSO4-aq">aqueous copper(II) sulfate</option><option value="molten-PbBr2">molten lead(II) bromide</option></select></label><label>Electrodes<select value={electrode} onChange={e=>{setElectrode(e.target.value);setPowered(false);setSeconds(0)}} disabled={electrolyte==="molten-PbBr2"}><option value="inert">inert</option><option value="copper">copper</option></select></label></div>
    <div className="chem-lab-actions"><button type="button" aria-pressed={powered} onClick={()=>setPowered(!powered)}>{powered?"Switch power off":"Switch power on"}</button><button type="button" disabled={!powered} onClick={()=>setSeconds(value=>value+30)}>Run for 30 seconds</button></div>
    <svg className="chem-cell-svg" viewBox="0 0 360 170" role="img" aria-label={`Electrolysis cell, power ${powered?"on":"off"}, ${seconds} seconds elapsed`}><path d="M40 60v90h280V60"/><rect className="chem-cell-liquid" x="43" y="80" width="274" height="67"/><path d="M90 110V25h180v85"/><rect className="chem-cell-electrode" x="80" y="55" width="20" height="65"/><rect className="chem-cell-electrode" x="260" y="55" width="20" height="65"/><text x="65" y="45">−</text><text x="285" y="45">+</text><text x="140" y="18">DC supply</text>{seconds>0&&<><rect className="chem-deposit" x="76" y="85" width="28" height="38"/>{electrode==="inert"&&[0,1,2].map(i=><circle className="chem-gas-bubble" key={i} cx={290+i*6} cy={105-i*12} r="4"/>)}</>}</svg>
    <p role="status">{seconds===0?"Switch on the supply and run the experiment to observe products.":`${seconds} s elapsed. ${electrolyte==="molten-PbBr2"?"Lead collects at the cathode; bromine forms at the anode.":electrode==="copper"?"Copper deposits at the cathode; the copper anode dissolves. The solution concentration stays approximately constant.":"Copper deposits at the cathode; oxygen bubbles form at the anode. The blue solution becomes paler."}`} {powered?"Power on.":"Power off."}</p>
    <div className="chem-electrodes"><div><b>− Cathode</b><span>Reduction</span><code>{result.cathode}</code></div><div><b>+ Anode</b><span>Oxidation</span><code>{result.anode}</code></div></div>
  </LabFrame>;
}

function RateLab({onComplete}){
  const [temperature,setTemperature]=useState(25),[concentration,setConcentration]=useState(1),[area,setArea]=useState(1),[catalyst,setCatalyst]=useState(false);
  const [runs,setRuns]=useState([]);
  const rate=2**((temperature-25)/10)*concentration*Math.sqrt(area)*(catalyst?1.8:1);
  return <LabFrame title="Rate of reaction lab" onComplete={onComplete} ready={runs.length>=2}>
    <p>Run a baseline, change one variable, then run again. Compare the curves. This illustrative model assumes a fixed amount of limiting reactant and excess acid, giving the same final gas volume. It is not measured experimental data.</p>
    <div className="chem-lab-grid"><label>Temperature / °C<input type="range" min="10" max="70" value={temperature} onChange={e=>setTemperature(Number(e.target.value))}/><strong>{temperature}</strong></label><label>Relative concentration<input type="range" min=".5" max="2" step=".1" value={concentration} onChange={e=>setConcentration(Number(e.target.value))}/><strong>{concentration.toFixed(1)}×</strong></label><label>Relative surface area<input type="range" min=".5" max="4" step=".1" value={area} onChange={e=>setArea(Number(e.target.value))}/><strong>{area.toFixed(1)}×</strong></label><label className="chem-check"><input type="checkbox" checked={catalyst} onChange={e=>setCatalyst(e.target.checked)}/> catalyst present</label></div>
    <p>Illustrative relative rate index: <b>{rate.toFixed(2)}</b>. Explain each change using collision frequency or activation energy.</p>
    <div className="chem-lab-actions"><button type="button" disabled={runs.length>=4} onClick={()=>setRuns(previous=>[...previous,{rate,temperature,concentration,area,catalyst}])}>Run experiment</button><button type="button" disabled={!runs.length} onClick={()=>setRuns([])}>Clear comparisons</button></div>
    {runs.length>0&&<><svg className="chem-rate-graph" viewBox="0 0 380 220" role="img" aria-label="Gas volume against time for recorded experiments"><path d="M45 15v165h315"/>{[0,25,50,75,100].map(v=><g key={v}><text x="36" y={184-v*1.5} textAnchor="end">{v}</text><path className="chem-graph-grid" d={`M45 ${180-v*1.5}H355`}/></g>)}{[0,30,60,90,120].map(t=><text key={t} x={45+t*2.5} y="196" textAnchor="middle">{t}</text>)}<text x="200" y="215" textAnchor="middle">Time / s</text><text x="15" y="105" transform="rotate(-90 15 105)" textAnchor="middle">Gas volume / cm³</text>{runs.map((run,i)=><polyline key={i} className={`chem-run-${i}`} points={Array.from({length:61},(_,j)=>`${45+j*5},${180-150*(1-Math.exp(-run.rate*j*2/30))}`).join(" ")}/>)}</svg><div className="chem-table-wrap"><table><caption>Experiment comparison</caption><thead><tr><th>Run</th><th>°C</th><th>Concentration</th><th>Area</th><th>Catalyst</th><th>Rate index</th></tr></thead><tbody>{runs.map((r,i)=><tr key={i}><th>Run {i+1}</th><td>{r.temperature}</td><td>{r.concentration}×</td><td>{r.area}×</td><td>{r.catalyst?"Yes":"No"}</td><td>{r.rate.toFixed(2)}</td></tr>)}</tbody></table></div><p>Curves 1–4 use solid, dashed, dotted and dash-dot lines. Faster reactions have steeper initial gradients and reach the same final volume sooner.</p></>}
  </LabFrame>;
}

function CalorimetryLab({onComplete}){
  const [mass,setMass]=useState(50),[deltaT,setDeltaT]=useState(8.4);
  const [changed,setChanged]=useState(false);
  const valid=validNumber(mass)&&Number(mass)>0&&validNumber(deltaT,-Infinity)&&Number.isFinite(Number(mass)*4.18*Number(deltaT));
  const q=Number(mass)*4.18*Number(deltaT);
  return <LabFrame title="Calorimetry and energy-profile lab" onComplete={onComplete} ready={valid&&changed}>
    <div className="chem-lab-row"><label>Solution mass / g<input type="number" min="0.1" step="any" value={mass} onChange={e=>{setMass(e.target.value);setChanged(true)}}/></label><label>Temperature change / °C<input type="number" step=".1" value={deltaT} onChange={e=>{setDeltaT(e.target.value);setChanged(true)}}/></label></div>
    {valid?<><div className="chem-result" role="status"><span>q(solution) = mcΔT, c = 4.18 J g⁻¹ °C⁻¹</span><strong>{q.toFixed(0)} J</strong></div><p>Heat of reaction for this sample: <b>{(-q).toFixed(0)} J</b>, assuming negligible heat loss.</p><svg className="chem-energy-svg" viewBox="0 0 360 150" role="img" aria-label={q>0?"Exothermic profile: products lower than reactants":q<0?"Endothermic profile: products higher than reactants":"No measured energy change"}><path d="M30 15v110h305"/><path className="chem-energy-curve" d={`M40 ${q>0?65:100}H95Q165 -20 235 ${q>0?100:q<0?65:100}H320`}/><text x="40" y={q>0?55:90}>Reactants</text><text x="245" y={q>0?90:q<0?55:90}>Products</text><text x="170" y="145">Reaction progress</text></svg><p>{q>0?"The solution warms and gains heat. The reaction releases heat and is exothermic.":q<0?"The solution cools and loses heat. The reaction absorbs heat and is endothermic.":"No temperature change is measured. This alone does not prove no reaction occurred."}</p></>:<p role="alert" className="chem-no">Enter a solution mass greater than zero and a finite temperature change.</p>}
  </LabFrame>;
}

function OrganicBuilder({onComplete}){
  const [family,setFamily]=useState("alkane"),[carbons,setCarbons]=useState(3);
  const formula=family==="alkane"?`C${carbons}H${2*carbons+2}`:family==="alkene"?`C${carbons}H${2*carbons}`:family==="alcohol"?`C${carbons}H${2*carbons+2}O`:`C${carbons}H${2*carbons}O2`;
  return <LabFrame title="Organic structure builder" onComplete={onComplete}>
    <div className="chem-lab-row"><label>Family<select value={family} onChange={e=>setFamily(e.target.value)}><option value="alkane">alkane</option><option value="alkene">alkene</option><option value="alcohol">alcohol</option><option value="acid">alkanoic acid</option></select></label><label>Carbon atoms<input type="range" min="2" max="6" value={carbons} onChange={e=>setCarbons(Number(e.target.value))}/><strong>{carbons}</strong></label></div>
    <div className="chem-result"><span>Molecular formula</span><strong>{formula}</strong></div>
    <svg className="chem-chain-svg" viewBox="0 0 420 100" role="img" aria-label={`${carbons}-carbon ${family} condensed structure`}>
      {Array.from({length:carbons},(_,i)=><g key={i}>{i>0&&<><path d={`M${35+(i-1)*65+22} 45h21`}/>{family==="alkene"&&i===1&&<path d="M57 53h21"/>}</>}<text x={35+i*65} y="49" textAnchor="middle">{family==="acid"&&i===carbons-1?"COOH":family==="alcohol"&&i===carbons-1?"CH₂OH":family==="alkene"&&i===0?"CH₂":family==="alkene"&&i===1?(carbons===2?"CH₂":"CH"):i===0||i===carbons-1?"CH₃":"CH₂"}</text></g>)}
      <text x="210" y="88" textAnchor="middle">Condensed straight-chain structure</text>
    </svg>
    <p>Use the functional group to predict reactions. For isomer questions, keep the molecular formula fixed while changing connectivity.</p>
  </LabFrame>;
}

function ReactivityLab({onComplete}){
  const metals=["Mg","Zn","Fe","Cu"];
  const [metal,setMetal]=useState("Zn"),[solution,setSolution]=useState("Cu");
  const rank={Mg:4,Zn:3,Fe:2,Cu:1};
  const displaces=rank[metal]>rank[solution];
  const [tested,setTested]=useState(false);
  return <LabFrame title="Metal reactivity lab" onComplete={onComplete} ready={tested}>
    <div className="chem-lab-row"><label>Metal strip<select value={metal} onChange={e=>{setMetal(e.target.value);setTested(false)}}>{metals.map(x=><option key={x}>{x}</option>)}</select></label><label>Ions in solution<select value={solution} onChange={e=>{setSolution(e.target.value);setTested(false)}}>{metals.map(x=><option key={x}>{x}</option>)}</select></label></div>
    <div className="chem-lab-actions"><button type="button" onClick={()=>setTested(true)}>Place strip in solution</button></div>
    {tested&&<div role="status"><p className={displaces?"chem-ok":"chem-no"}>{metal===solution?"No net reaction.":displaces?`${metal} is more reactive than ${solution}, so displacement is expected.`:`${metal} is less reactive than ${solution}, so it cannot displace ${solution} ions.`}</p><p>{displaces?`${solution} deposits on the strip while ${metal} dissolves as ions.`:"No displacement deposit is expected."}</p>{displaces&&<p><b>{metal}(s) + {solution}²⁺(aq) → {metal}²⁺(aq) + {solution}(s)</b></p>}</div>}
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
  const [stage,setStage]=useState(0);
  const observation=stage===0?"No reagent added.":stage===1?qaData[ion][reagent].split(/,| dissolves/)[0]:qaData[ion][reagent];
  const dissolved=stage===2&&qaData[ion][reagent].includes("dissolves");
  const precipitate=ion==="Cu²⁺"?"#85c6e9":ion==="Fe²⁺"?"#709c79":ion==="Fe³⁺"?"#aa593d":"#e2e8f0";
  return <LabFrame title="Qualitative analysis lab" onComplete={onComplete} ready={stage===2}>
    <div className="chem-lab-row"><label>Cation sample<select value={ion} onChange={e=>{setIon(e.target.value);setStage(0)}}>{Object.keys(qaData).map(x=><option key={x}>{x}</option>)}</select></label><label>Reagent<select value={reagent} onChange={e=>{setReagent(e.target.value);setStage(0)}}><option value="naoh">aqueous sodium hydroxide</option><option value="nh3">aqueous ammonia</option></select></label></div>
    <div className="chem-lab-actions"><button type="button" disabled={stage!==0} onClick={()=>setStage(1)}>Add a few drops</button><button type="button" disabled={stage!==1} onClick={()=>setStage(2)}>Add reagent in excess</button><button type="button" onClick={()=>setStage(0)}>Fresh sample</button></div>
    <svg className="chem-test-tube" viewBox="0 0 100 160" role="img" aria-label={observation}><path d="M25 10v110a25 25 0 0 0 50 0V10"/><path className="chem-sample-liquid" style={{fill:dissolved&&ion==="Cu²⁺"?"#244dcc":ion==="Cu²⁺"?"#b0dff5":"#f3f7ff"}} d="M28 70h44v50a22 22 0 0 1-44 0Z"/>{stage>0&&!dissolved&&<path style={{fill:precipitate}} d="M28 114h44v6a22 22 0 0 1-44 0Z"/>}</svg>
    <div className="chem-result" role="status"><span>Observation</span><strong>{observation}</strong></div>
    <p>In the exam, record the observation before stating the inference.</p>
  </LabFrame>;
}

function LabContent({model,onComplete}){
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

export default function ChemistryInteractiveLab({model,onComplete}){
  const [reset,setReset]=useState(0);
  // Reset every local state, including completion, when the activity changes.
  return <ResetLab.Provider value={()=>setReset(value=>value+1)}><LabContent key={`${model?.id||""}:${model?.type}:${reset}`} model={model} onComplete={onComplete}/></ResetLab.Provider>;
}
