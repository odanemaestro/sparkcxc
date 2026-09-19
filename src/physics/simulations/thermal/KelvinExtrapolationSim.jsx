import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildKelvinGraphModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

export default function KelvinExtrapolationSim({ onEvidence }) {
  const [slope,setSlope]=useState(.35),clock=useSimulationClock({duration:3.2,loop:false}),{done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildKelvinGraphModel({slope}),[slope]);
  const left=86,right=658,top=38,bottom=248,minC=-300,maxC=120,maxValue=.72*393;
  const xy=(c,value)=>({x:left+(c-minC)/(maxC-minC)*(right-left),y:bottom-value/maxValue*(bottom-top)});
  const start=xy(-273,0),end=xy(120,slope*(120+273)),zero=xy(0,0),minus100=xy(-100,0),plus100=xy(100,0);
  const reveal=Math.max(0,Math.min(1,clock.time/3.2)),lineEnd={x:start.x+(end.x-start.x)*reveal,y:start.y+(end.y-start.y)*reveal};
  useDerivedTasks(mark,{run:reveal>=.98,slope:Math.abs(slope-.35)>=.15});
  const tasks=[{id:'run',label:'Reveal the full extrapolated gas-law trend.'},{id:'slope',label:'Change the relative pressure scale and confirm the intercept remains at −273 °C.'}];
  return <SimFrame
    title="Kelvin extrapolation"
    intro="Follow an idealised pressure-temperature line backwards to the Celsius temperature corresponding to zero kelvin."
    prediction={{question:'The extrapolated zero-pressure intercept for an ideal gas trend is approximately…',options:[{id:'minus273',label:'−273 °C'},{id:'zero',label:'0 °C'},{id:'minus100',label:'−100 °C'}],answer:'minus273'}}
    tasks={tasks}
    done={done}
    observation="Changing the graph scale changes the steepness but not the Celsius intercept. The extrapolated intercept remains at approximately −273 °C, corresponding to 0 K."
    explanation={<p>The line is an <strong>idealised extrapolation</strong>. Real gases condense before zero pressure or zero volume is physically reached. The Celsius temperature corresponding to absolute zero is approximately <strong>−273 °C = 0 K</strong>.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <Playback clock={clock} stepSize={.08} showSpeed={false}/>
    <div className="psim-controls"><SimSlider id="b2-kelvin-slope" label="Relative pressure scale" value={slope} min={.15} max={.7} step={.05} dp={2} onChange={v=>{setSlope(v);clock.reset();}}/></div>
    <svg className="psim-kelvin-stage" viewBox="0 0 720 310" role="img" aria-label="Idealised relative gas pressure against Celsius temperature extrapolated to minus 273 degrees Celsius">
      <line className="psim-graph-axis" x1={left} y1={bottom} x2={right} y2={bottom}/>
      <line className="psim-graph-axis" x1={left} y1={top} x2={left} y2={bottom}/>
      {[minus100,zero,plus100].map((p,i)=><line key={i} className="psim-graph-grid" x1={p.x} y1={top} x2={p.x} y2={bottom}/>)}
      <line className="psim-kelvin-line" x1={start.x} y1={start.y} x2={lineEnd.x} y2={lineEnd.y}/>
      {model.points.map((p,i)=>{const q=xy(p.c,p.value);return <circle key={i} className="psim-kelvin-point" cx={q.x} cy={q.y} r="5"/>})}
      <line className="psim-kelvin-intercept" x1={start.x} y1={bottom-11} x2={start.x} y2={bottom+11}/>
      <text className="psim-kelvin-intercept-label" x={start.x} y={bottom+34} textAnchor="middle">−273</text>
      <text className="psim-thermal-label" x={minus100.x} y={bottom+34} textAnchor="middle">−100</text>
      <text className="psim-thermal-label" x={zero.x} y={bottom+34} textAnchor="middle">0</text>
      <text className="psim-thermal-label" x={plus100.x} y={bottom+34} textAnchor="middle">100</text>
      <text className="psim-thermal-label" x={right-2} y={bottom+52} textAnchor="end">temperature / °C</text>
      <text className="psim-thermal-label" x={left+2} y={top-10}>relative pressure</text>
    </svg>
    <Readouts items={[['Extrapolated intercept','−273 °C','good'],['Absolute zero','0 K'],['Reference conversion','27 °C = 300 K']]}/>
    <div className="psim-equation">T(K) = θ(°C) + 273</div>
    <LiveText>Extrapolated intercept minus 273 degrees Celsius, equal to zero kelvin.</LiveText>
  </SimFrame>;
}
