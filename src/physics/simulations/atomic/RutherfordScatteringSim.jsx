import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildScatteringModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

function pathFor(impact, deflection){
  const startX=54,nucleusX=390,nucleusY=160,offset=(impact-.5)*150,closestY=nucleusY+offset;
  const bend=(deflection/170)*150*(offset>=0?1:-1),endY=Math.max(34,Math.min(286,closestY+bend));
  return `M ${startX} ${closestY} Q 265 ${closestY} ${nucleusX-18} ${closestY} Q 450 ${closestY} 665 ${endY}`;
}

export default function RutherfordScatteringSim({ onEvidence }) {
  const [impact,setImpact]=useState(.75),[seen,setSeen]=useState(()=>new Set());
  const clock=useSimulationClock({duration:3.5,loop:true});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildScatteringModel({impact}),[impact]);
  useDerivedTasks(mark,{animate:clock.time>.08,near:seen.has('near'),far:seen.has('far')});
  const changeImpact=v=>{setImpact(v);if(v<=.25)setSeen(p=>new Set(p).add('near'));if(v>=.8)setSeen(p=>new Set(p).add('far'));};
  const tasks=[
    {id:'animate',label:'Play or step an alpha particle through the scattering model.'},
    {id:'near',label:'Use a small impact parameter and observe a large deflection.'},
    {id:'far',label:'Use a large impact parameter and observe a small deflection.'},
  ];
  const path=pathFor(impact,model.deflectionDeg);
  return <SimFrame title="Rutherford scattering model"
    intro="Send alpha particles past a tiny positive nucleus and connect impact parameter with the amount of scattering."
    prediction={{question:'A rare large-angle alpha-particle deflection suggests that most positive charge is…',options:[{id:'nucleus',label:'concentrated in a very small nucleus'},{id:'spread',label:'spread evenly through the whole atom'},{id:'electrons',label:'carried mainly by electrons'}],answer:'nucleus'}}
    tasks={tasks} done={done}
    observation={`Model deflection = ${model.deflectionDeg}°. ${model.conclusion}.`}
    explanation={<p>Most alpha particles pass through because atoms are mostly empty space. Large-angle deflections occur only when an alpha particle passes close to the small, concentrated, positively charged nucleus.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(t=>t.id)})}>
    <Playback clock={clock} stepSize={.05} timeLabel={false}/>
    <div className="psim-controls"><SimSlider id="e1-impact" label="Impact parameter" value={impact} min={0} max={1} step={.05} dp={2} onChange={changeImpact}/></div>
    <svg className="psim-atomic-stage" viewBox="0 0 720 320" role="img" aria-label={`Alpha particle scattering with ${model.deflectionDeg} degree deflection`}>
      <circle className="psim-nucleus" cx="390" cy="160" r="24"/><text className="psim-atomic-label" x="390" y="165" textAnchor="middle">+</text>
      <path className="psim-alpha-path" d={path}/><circle className="psim-alpha-particle" r="8"><animateMotion dur="3.5s" repeatCount="indefinite" path={path}/></circle>
      <text className="psim-atomic-label" x="54" y="294">incoming α</text><text className="psim-atomic-label" x="390" y="258" textAnchor="middle">positive nucleus</text>
    </svg>
    <Readouts items={[['Model deflection',`${model.deflectionDeg}°`,'good'],['Impact parameter',fmt(impact,2)],['Interpretation',model.conclusion]]}/>
    <LiveText>Impact parameter {fmt(impact,2)}. Deflection {model.deflectionDeg} degrees.</LiveText>
  </SimFrame>;
}
