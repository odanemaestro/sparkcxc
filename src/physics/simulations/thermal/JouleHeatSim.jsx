import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildJouleLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

export default function JouleHeatSim({ onEvidence }) {
  const [mass,setMass]=useState(2),[height,setHeight]=useState(5),[efficiency,setEfficiency]=useState(.92);
  const clock=useSimulationClock({duration:3.2,loop:false});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildJouleLabModel({massKg:mass,heightM:height,efficiency}),[mass,height,efficiency]);
  const progress=Math.max(0,Math.min(1,clock.time/3.2));
  const weightY=54+progress*160,paddleAngle=progress*900;
  useDerivedTasks(mark,{run:progress>=.98,mass:Math.abs(mass-2)>=1,height:Math.abs(height-5)>=2,loss:efficiency<=.8});
  const tasks=[
    {id:'run',label:'Run one complete falling-mass energy transfer.'},
    {id:'mass',label:'Change the falling mass and compare the mechanical work.'},
    {id:'height',label:'Change the drop height and compare the work done.'},
    {id:'loss',label:'Reduce the transfer efficiency to show that some energy warms the apparatus and surroundings.'},
  ];
  return <SimFrame
    title="Joule work-to-heat lab"
    intro="Follow gravitational potential energy from a falling mass into paddle motion and a small temperature rise of the water."
    prediction={{question:'If the falling mass and drop height are both increased, the mechanical work transferred to the apparatus…',options:[{id:'increases',label:'increases'},{id:'decreases',label:'decreases'},{id:'same',label:'stays the same'}],answer:'increases'}}
    tasks={tasks}
    done={done}
    observation={`Mechanical work = ${fmt(model.workJ,1)} J. About ${fmt(model.toWaterJ,1)} J reaches the water, giving a calculated rise of ${fmt(model.temperatureRiseC,3)} °C.`}
    explanation={<p>The falling mass loses gravitational potential energy. Ideally that work becomes thermal energy, but a real apparatus also warms the paddle, container and surroundings. Energy is transferred, not destroyed.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <Playback clock={clock} stepSize={0.05} showSpeed={false}/>
    <div className="psim-controls">
      <SimSlider id="b1-joule-mass" label="Falling mass" value={mass} min={.5} max={5} step={.5} unit=" kg" dp={1} onChange={v=>{setMass(v);clock.reset();}}/>
      <SimSlider id="b1-joule-height" label="Drop height" value={height} min={1} max={10} step={.5} unit=" m" dp={1} onChange={v=>{setHeight(v);clock.reset();}}/>
      <SimSlider id="b1-joule-eff" label="Energy reaching water" value={Math.round(efficiency*100)} min={60} max={100} step={1} unit="%" dp={0} onChange={v=>setEfficiency(v/100)}/>
    </div>
    <svg className="psim-thermal-stage" viewBox="0 0 720 300" role="img" aria-label="Falling mass driving paddles in water">
      <line className="psim-rope" x1="122" y1="36" x2="122" y2={weightY}/>
      <rect className="psim-weight" x="92" y={weightY} width="60" height="42" rx="7"/>
      <text className="psim-thermal-label" x="122" y={weightY+26} textAnchor="middle">{fmt(mass,1)} kg</text>
      <rect className="psim-water-vessel" x="372" y="76" width="206" height="166" rx="14"/>
      <rect className="psim-water-fill" x="386" y="126" width="178" height="102" rx="7"/>
      <line className="psim-rope" x1="122" y1="36" x2="474" y2="36"/>
      <line className="psim-rope" x1="474" y1="36" x2="474" y2="132"/>
      <g transform={`translate(474 170) rotate(${paddleAngle})`}><line className="psim-paddle" x1="-44" y1="0" x2="44" y2="0"/><line className="psim-paddle" x1="0" y1="-34" x2="0" y2="34"/></g>
      <rect className="psim-thermometer" x="528" y="92" width="16" height="104" rx="8"/>
      <rect className="psim-thermometer-level" x="533" y={186-Math.min(80,18+model.temperatureRiseC*120)} width="6" height={Math.min(80,18+model.temperatureRiseC*120)} rx="3"/>
      <text className="psim-thermal-label" x="122" y="270" textAnchor="middle">falling mass</text>
      <text className="psim-thermal-label" x="474" y="270" textAnchor="middle">paddle + water</text>
    </svg>
    <Readouts items={[['Mechanical work',`${fmt(model.workJ,1)} J`,'good'],['Energy to water',`${fmt(model.toWaterJ,1)} J`],['Other transfers',`${fmt(model.otherJ,1)} J`],['Water temperature rise',`${fmt(model.temperatureRiseC,3)} °C`]]}/>
    <div className="psim-equation">W = mgh = {fmt(mass,1)} × 10 × {fmt(height,1)} = {fmt(model.workJ,1)} J</div>
    <LiveText>Mechanical work {fmt(model.workJ,1)} joules. Water receives {fmt(model.toWaterJ,1)} joules.</LiveText>
  </SimFrame>;
}
