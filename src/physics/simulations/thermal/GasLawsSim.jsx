import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, SimToggle, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { buildGasLawLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

function particles(count,x,y,w,h){return Array.from({length:count},(_,i)=>({x:x+14+((i*47)%Math.max(20,w-28)),y:y+16+((i*71)%Math.max(20,h-32))}));}

export default function GasLawsSim({ onEvidence }) {
  const [law,setLaw]=useState('boyle'),[p,setP]=useState(100),[v1,setV1]=useState(300),[v2,setV2]=useState(150),[t1,setT1]=useState(27),[t2,setT2]=useState(127),[visited,setVisited]=useState(()=>new Set(['boyle']));
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildGasLawLabModel({law,p1KPa:p,v1Cm3:v1,v2Cm3:v2,t1C:t1,t2C:t2}),[law,p,v1,v2,t1,t2]);
  useDerivedTasks(mark,{laws:visited.size===3,boyle:visited.has('boyle')&&Math.abs(v2-v1)>=80,temperature:(visited.has('charles')||visited.has('pressure'))&&Math.abs(t2-t1)>=70});
  const changeLaw=next=>{setLaw(next);setVisited(prev=>new Set(prev).add(next));};
  const tasks=[{id:'laws',label:'Explore Boyle’s law, Charles’ law and the pressure law.'},{id:'boyle',label:'For Boyle’s law, make a substantial volume change and compare the pressure.'},{id:'temperature',label:'For a temperature law, make a substantial Celsius temperature change and inspect the kelvin values.'}];
  const state1W=214,state2W=law==='boyle'?90+model.v2Cm3/500*180:214,piston2X=598-state2W;
  return <SimFrame
    title="Gas-law explorer"
    intro="Compare pressure, volume and absolute temperature using the three gas-law relationships."
    prediction={{question:'In the gas laws that involve temperature, which temperature scale must be used?',options:[{id:'kelvin',label:'kelvin'},{id:'celsius',label:'degrees Celsius directly'},{id:'fahrenheit',label:'degrees Fahrenheit'}],answer:'kelvin'}}
    tasks={tasks}
    done={done}
    observation={law==='boyle'?`At constant temperature, reducing volume from ${v1} cm³ to ${v2} cm³ changes the pressure to ${fmt(model.p2KPa,1)} kPa.`:law==='charles'?`At constant pressure, changing temperature from ${model.t1K} K to ${model.t2K} K changes the volume to ${fmt(model.v2Cm3,1)} cm³.`:`At constant volume, changing temperature from ${model.t1K} K to ${model.t2K} K changes the pressure to ${fmt(model.p2KPa,1)} kPa.`}
    explanation={<p>Boyle’s law gives <strong>P₁V₁ = P₂V₂</strong> at constant temperature. Charles’ law gives <strong>V/T = constant</strong> at constant pressure. The pressure law gives <strong>P/T = constant</strong> at constant volume. Temperature must be in kelvin.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <SimToggle label="Gas law" value={law} onChange={changeLaw} options={[{value:'boyle',label:'Boyle'},{value:'charles',label:'Charles'},{value:'pressure',label:'Pressure law'}]}/>
    <div className="psim-controls">
      <SimSlider id="b2-gas-p" label="Initial pressure" value={p} min={50} max={300} step={10} unit=" kPa" dp={0} onChange={setP}/>
      <SimSlider id="b2-gas-v1" label="Initial volume" value={v1} min={100} max={500} step={10} unit=" cm³" dp={0} onChange={setV1}/>
      {law==='boyle'?<SimSlider id="b2-gas-v2" label="Final volume" value={v2} min={80} max={500} step={10} unit=" cm³" dp={0} onChange={setV2}/>:<><SimSlider id="b2-gas-t1" label="Initial temperature" value={t1} min={-50} max={100} step={1} unit=" °C" dp={0} onChange={setT1}/><SimSlider id="b2-gas-t2" label="Final temperature" value={t2} min={-20} max={200} step={1} unit=" °C" dp={0} onChange={setT2}/></>}
    </div>
    <svg className="psim-thermal-stage" viewBox="0 0 720 290" role="img" aria-label="Gas particles shown in two piston-cylinder states">
      <text className="psim-thermal-label" x="170" y="36" textAnchor="middle">State 1</text>
      <rect className="psim-gas-cylinder" x="64" y="82" width={state1W} height="126" rx="6"/>
      <line className="psim-piston" x1={64+state1W} y1="72" x2={64+state1W} y2="218"/>
      {particles(18,64,82,state1W,126).map((q,i)=><circle key={i} className="psim-gas-particle" cx={q.x} cy={q.y} r="4"/>)}
      <text className="psim-thermal-label" x="520" y="36" textAnchor="middle">State 2</text>
      <rect className="psim-gas-cylinder" x={piston2X} y="82" width={state2W} height="126" rx="6"/>
      <line className="psim-piston active" x1={piston2X} y1="72" x2={piston2X} y2="218"/>
      {particles(18,piston2X,82,state2W,126).map((q,i)=><circle key={i} className="psim-gas-particle active" cx={q.x} cy={q.y} r="4"/>)}
      <text className="psim-thermal-label" x="170" y="246" textAnchor="middle">{law==='boyle'?`${v1} cm³`:`${model.t1K} K`}</text>
      <text className="psim-thermal-label" x="520" y="246" textAnchor="middle">{law==='boyle'?`${fmt(model.v2Cm3,0)} cm³`:`${model.t2K} K`}</text>
    </svg>
    <Readouts items={law==='boyle'?[['Final pressure',`${fmt(model.p2KPa,1)} kPa`,'good'],['P₁V₁',`${fmt(p*v1,0)} kPa cm³`],['P₂V₂',`${fmt(model.p2KPa*v2,0)} kPa cm³`]]:law==='pressure'?[['T₁',`${model.t1K} K`],['T₂',`${model.t2K} K`],['Final pressure',`${fmt(model.p2KPa,2)} kPa`,'good'],['P₁/T₁',`${fmt(p/model.t1K,3)} kPa/K`],['P₂/T₂',`${fmt(model.p2KPa/model.t2K,3)} kPa/K`]]:[['T₁',`${model.t1K} K`],['T₂',`${model.t2K} K`],['Final volume',`${fmt(model.v2Cm3,1)} cm³`,'good']]}/>
    <LiveText>{law} law selected.</LiveText>
  </SimFrame>;
}
