import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildConvectionLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

function loopPoint(t,clockwise=true){
  const p=clockwise?t:1-t,a=(p%1)*4;
  if(a<1) return {x:170+a*360,y:228};
  if(a<2) return {x:530,y:228-(a-1)*130};
  if(a<3) return {x:530-(a-2)*360,y:98};
  return {x:170,y:98+(a-3)*130};
}

export default function ConvectionSim({ onEvidence }) {
  const [bottom,setBottom]=useState(80),[top,setTop]=useState(30),[seen,setSeen]=useState(()=>new Set(['normal']));
  const clock=useSimulationClock({duration:5,loop:true});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildConvectionLabModel({bottomTempC:bottom,topTempC:top}),[bottom,top]);
  const mode=model.deltaC>0?'normal':model.deltaC<0?'reversed':'neutral',speed=Math.max(.18,model.currentStrength);
  const p1=loopPoint((clock.time/5*speed)%1,true),p2=loopPoint(((clock.time/5*speed)+.5)%1,true);
  useDerivedTasks(mark,{animate:clock.time>.08,reversed:seen.has('reversed'),neutral:seen.has('neutral')});
  const update=(b,t)=>{setBottom(b);setTop(t);const d=b-t;setSeen(prev=>new Set(prev).add(d>0?'normal':d<0?'reversed':'neutral'));};
  const tasks=[
    {id:'animate',label:'Play or step the convection current.'},
    {id:'reversed',label:'Make the top hotter than the bottom and observe the circulation state change.'},
    {id:'neutral',label:'Set the top and bottom to the same temperature and remove the density contrast.'},
  ];
  return <SimFrame title="Convection current explorer"
    intro="Change the vertical temperature difference and connect density changes with fluid circulation."
    prediction={{question:'When a fluid is heated from below, the warmer fluid usually…',options:[{id:'rises',label:'rises because it becomes less dense'},{id:'sinks',label:'sinks because it becomes more dense'},{id:'stays',label:'must remain stationary'}],answer:'rises'}}
    tasks={tasks} done={done}
    observation={`Temperature difference = ${fmt(model.deltaC,0)} °C. ${model.state}.`}
    explanation={<p>Heating causes most fluids to expand and become less dense. When heated from below, warmer fluid rises while cooler, denser fluid sinks, producing a convection current.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}>
    <Playback clock={clock} stepSize={.05} timeLabel={false}/>
    <div className="psim-controls">
      <SimSlider id="b4-convection-bottom" label="Bottom temperature" value={bottom} min={20} max={120} step={5} unit=" °C" dp={0} onChange={v=>update(v,top)}/>
      <SimSlider id="b4-convection-top" label="Top temperature" value={top} min={20} max={120} step={5} unit=" °C" dp={0} onChange={v=>update(bottom,v)}/>
    </div>
    <svg className="psim-thermal-stage" viewBox="0 0 720 320" role="img" aria-label={`Convection model: ${model.state}`}>
      <rect className="psim-convection-vessel" x="130" y="62" width="440" height="206" rx="20"/>
      <rect className="psim-hot-zone" x="154" y="222" width="392" height="30" rx="12"/>
      <rect className="psim-cool-zone" x="154" y="78" width="392" height="24" rx="12"/>
      <path className={`psim-convection-loop ${mode}`} d="M 170 228 H 530 V 98 H 170 Z"/>
      {mode!=='neutral'&&<><circle className="psim-convection-particle warm" cx={p1.x} cy={p1.y} r="8"/><circle className="psim-convection-particle cool" cx={p2.x} cy={p2.y} r="8"/></>}
      <text className="psim-thermal-label" x="350" y="44" textAnchor="middle">top: {top} °C</text>
      <text className="psim-thermal-label" x="350" y="298" textAnchor="middle">bottom: {bottom} °C</text>
      <text className="psim-thermal-label" x="350" y="168" textAnchor="middle">{model.state}</text>
    </svg>
    <Readouts items={[['Temperature difference',`${fmt(model.deltaC,0)} °C`,'good'],['Current strength',fmt(model.currentStrength,2)],['State',model.state]]}/>
    <LiveText>{model.state}. Temperature difference {fmt(model.deltaC,0)} degrees Celsius.</LiveText>
  </SimFrame>;
}
