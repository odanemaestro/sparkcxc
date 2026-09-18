import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { buildHeatingCurveLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

const stageAt=(energyKJ,massKg)=>buildHeatingCurveLabModel({energyKJ,massKg});
function particles(phase,fraction=0){
  if(phase.includes('solid')) return Array.from({length:24},(_,i)=>({x:250+(i%6)*34,y:122+Math.floor(i/6)*30}));
  if(phase==='melting') return Array.from({length:24},(_,i)=>({x:230+(i%6)*38+(i%2?fraction*8:0),y:118+Math.floor(i/6)*32}));
  if(phase.includes('liquid')) return Array.from({length:24},(_,i)=>({x:224+((i*47)%246),y:112+((i*31)%112)}));
  if(phase==='boiling') return Array.from({length:24},(_,i)=>({x:220+((i*53)%252),y:96+((i*37)%132)-fraction*18}));
  return Array.from({length:24},(_,i)=>({x:210+((i*61)%270),y:78+((i*43)%142)}));
}

export default function HeatingCurveSim({ onEvidence }) {
  const [energy,setEnergy]=useState(0),[mass,setMass]=useState(.25),[seen,setSeen]=useState(()=>new Set(['solid warming']));
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>stageAt(energy,mass),[energy,mass]),dots=useMemo(()=>particles(model.phase,model.fractionChanged||0),[model]);
  const x=70+energy/800*580,yTemp=245-Math.max(-20,Math.min(120,model.temperatureC+20))/140*174;
  useDerivedTasks(mark,{melt:seen.has('melting'),liquid:seen.has('liquid warming'),boil:seen.has('boiling')});
  const changeEnergy=value=>{setEnergy(value);setSeen(prev=>new Set(prev).add(stageAt(value,mass).phase));};
  const tasks=[{id:'melt',label:'Move into the melting plateau and observe that temperature stays constant.'},{id:'liquid',label:'Move into liquid warming and observe the temperature rising again.'},{id:'boil',label:'Move into the boiling plateau and observe another constant-temperature phase change.'}];
  return <SimFrame
    title="Heating curve explorer"
    intro="Add energy to a sample and connect warming regions with particle kinetic energy and plateaux with changes of state."
    prediction={{question:'During a phase change at constant pressure, added energy can increase while the temperature…',options:[{id:'constant',label:'stays constant'},{id:'alwaysrises',label:'must always rise'},{id:'falls',label:'must fall'}],answer:'constant'}}
    tasks={tasks}
    done={done}
    observation={`Current stage: ${model.phase}. Temperature = ${fmt(model.temperatureC,1)} °C.${model.fractionChanged!=null?` About ${fmt(model.fractionChanged*100,1)}% of this phase change is complete.`:''}`}
    explanation={<p>In a warming region, added energy increases average particle kinetic energy and temperature. During melting or boiling, energy changes the particle arrangement, so the temperature remains constant until the phase change is complete.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <div className="psim-controls">
      <SimSlider id="b3-heating-energy" label="Energy added" value={energy} min={0} max={800} step={5} unit=" kJ" dp={0} onChange={changeEnergy}/>
      <SimSlider id="b3-heating-mass" label="Sample mass" value={mass} min={.1} max={.5} step={.05} unit=" kg" dp={2} onChange={v=>{setMass(v);setSeen(new Set([stageAt(energy,v).phase]));}}/>
    </div>
    <div className="psim-heating-layout">
      <svg className="psim-heating-graph" viewBox="0 0 720 300" role="img" aria-label="Heating curve with current energy and temperature marker">
        <line className="psim-graph-axis" x1="70" y1="245" x2="660" y2="245"/><line className="psim-graph-axis" x1="70" y1="38" x2="70" y2="245"/>
        <polyline className="psim-heating-line" points="70,232 132,206 256,206 344,82 526,82 648,54"/>
        <circle className="psim-heating-marker" cx={x} cy={yTemp} r="8"/>
        <text className="psim-thermal-label" x="70" y="272">energy added</text><text className="psim-thermal-label" x="82" y="52">temperature</text>
        <text className="psim-thermal-label" x="190" y="198" textAnchor="middle">melting</text><text className="psim-thermal-label" x="436" y="74" textAnchor="middle">boiling</text>
      </svg>
      <svg className="psim-particle-box" viewBox="0 0 520 280" role="img" aria-label={`Particle model for ${model.phase}`}>
        <rect className="psim-particle-container" x="40" y="44" width="440" height="190" rx="14"/>
        {dots.map((p,i)=><circle key={i} className={`psim-thermal-particle ${model.phase.replace(/\s+/g,'-')}`} cx={p.x} cy={p.y} r="7"/>)}
        <text className="psim-thermal-label" x="260" y="264" textAnchor="middle">{model.phase}</text>
      </svg>
    </div>
    <Readouts items={[['Stage',model.phase,'good'],['Temperature',`${fmt(model.temperatureC,1)} °C`],['Phase fraction',model.fractionChanged==null?'Not changing phase':`${fmt(model.fractionChanged*100,1)}%`]]}/>
    <LiveText>{model.phase}. Temperature {fmt(model.temperatureC,1)} degrees Celsius.</LiveText>
  </SimFrame>;
}
