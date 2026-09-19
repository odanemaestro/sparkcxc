import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildExpansionLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

export default function ThermalExpansionSim({ onEvidence }) {
  const [length,setLength]=useState(2),[deltaT,setDeltaT]=useState(80),clock=useSimulationClock({duration:3,loop:false}),{done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildExpansionLabModel({initialLengthM:length,temperatureRiseC:deltaT}),[length,deltaT]);
  const progress=Math.max(0,Math.min(1,clock.time/3)),extensionMm=model.extensionM*1000*progress,visualExtra=Math.min(62,extensionMm*9),left=102,baseWidth=430,right=left+baseWidth+visualExtra;
  useDerivedTasks(mark,{run:progress>=.98,length:Math.abs(length-2)>=2,temperature:Math.abs(deltaT-80)>=40});
  const tasks=[{id:'run',label:'Run the heating animation and watch the free end move.'},{id:'length',label:'Change the original length substantially and compare the extension.'},{id:'temperature',label:'Change the temperature rise substantially and compare the extension.'}];
  return <SimFrame
    title="Thermal expansion model"
    intro="Heat one solid specimen with its left end fixed and watch only the free end move."
    prediction={{question:'For the same material and temperature rise, a longer solid generally expands by…',options:[{id:'more',label:'a greater amount'},{id:'less',label:'a smaller amount'},{id:'same',label:'exactly the same amount'}],answer:'more'}}
    tasks={tasks}
    done={done}
    observation={`Calculated extension = ${fmt(model.extensionM*1000,3)} mm. The movement is enlarged visually so the small physical expansion can be seen clearly.`}
    explanation={<p>For linear expansion, <strong>ΔL = αLΔT</strong>. Expansion increases with the original length and with the temperature change. The diagram shows one specimen only: the left end is fixed and the right end moves.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <Playback clock={clock} stepSize={.05} showSpeed={false}/>
    <div className="psim-controls">
      <SimSlider id="b2-expansion-length" label="Initial length" value={length} min={.5} max={10} step={.5} unit=" m" dp={1} onChange={v=>{setLength(v);clock.reset();}}/>
      <SimSlider id="b2-expansion-dt" label="Temperature rise" value={deltaT} min={0} max={150} step={5} unit=" °C" dp={0} onChange={v=>{setDeltaT(v);clock.reset();}}/>
    </div>
    <svg className="psim-thermal-stage" viewBox="0 0 720 280" role="img" aria-label={`One heated solid specimen with calculated extension ${fmt(model.extensionM*1000,3)} millimetres`}>
      <rect className="psim-fixed-support" x="58" y="82" width="38" height="120" rx="5"/>
      <rect className="psim-expansion-bar" x={left} y="116" width={right-left} height="50" rx="9"/>
      <line className="psim-expansion-reference" x1={left+baseWidth} y1="94" x2={left+baseWidth} y2="190"/>
      <line className="psim-expansion-free-end" x1={right} y1="102" x2={right} y2="180"/>
      <path className="psim-heat-arrow" d="M 246 224 Q 294 186 342 224 Q 390 186 438 224"/>
      <text className="psim-thermal-label" x="77" y="220" textAnchor="middle">fixed end</text>
      <text className="psim-thermal-label" x={right} y="206" textAnchor="middle">free end</text>
      <text className="psim-thermal-label" x={left+baseWidth} y="82" textAnchor="middle">original end</text>
    </svg>
    <Readouts items={[['Extension',`${fmt(model.extensionM*1000,3)} mm`,'good'],['Final length',`${fmt(model.finalLengthM,5)} m`],['Temperature change',`${deltaT} K`]]}/>
    <div className="psim-equation">ΔL = αLΔT</div>
    <p className="psim-stage-note">The specimen is drawn with the extension exaggerated for visibility. There is no second moving bar.</p>
    <LiveText>Calculated extension {fmt(model.extensionM*1000,3)} millimetres.</LiveText>
  </SimFrame>;
}
