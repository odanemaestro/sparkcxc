import React, { useMemo, useState } from 'react';
import { SimFrame, SimToggle, Playback, Readouts, LiveText, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildRadiationModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

const ABSORBERS=[{x:250,label:'paper'},{x:395,label:'aluminium'},{x:545,label:'lead'}];

export default function RadiationPropertiesSim({ onEvidence }) {
  const [type,setType]=useState('alpha'),[visited,setVisited]=useState(()=>new Set(['alpha']));
  const clock=useSimulationClock({duration:4,loop:true});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildRadiationModel({type}),[type]);
  const changeType=v=>{setType(v);setVisited(p=>new Set(p).add(v));};
  useDerivedTasks(mark,{animate:clock.time>.08,compare:visited.size===3});
  const tasks=[{id:'animate',label:'Play or step a radiation track toward the absorber barriers.'},{id:'compare',label:'Compare alpha, beta and gamma.'}];
  const stopX=type==='alpha'?250:type==='beta'?395:650,dash=type==='gamma'?'0':type==='beta'?'8 6':'2 4';

  return <SimFrame title="Radiation properties"
    intro="Compare alpha, beta and gamma by charge, ionising ability, penetration and absorber."
    prediction={{question:'Which radiation is the most strongly ionising but least penetrating?',options:[{id:'alpha',label:'alpha'},{id:'beta',label:'beta'},{id:'gamma',label:'gamma'}],answer:'alpha'}}
    tasks={tasks} done={done}
    observation={`${type} radiation has charge ${model.charge}, ${model.ionising} ionising ability and ${model.penetrating} penetration.`}
    explanation={<p>Alpha is strongly ionising and weakly penetrating. Beta is intermediate. Gamma is uncharged, weakly ionising and highly penetrating.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(t=>t.id)})}>
    <SimToggle label="Radiation" value={type} onChange={changeType} options={[{value:'alpha',label:'Alpha'},{value:'beta',label:'Beta'},{value:'gamma',label:'Gamma'}]}/>
    <Playback clock={clock} stepSize={.05} timeLabel={false}/>
    <svg className="psim-atomic-stage" viewBox="0 0 720 300" role="img" aria-label={`${type} radiation penetration model`}>
      <circle className="psim-source-dot" cx="76" cy="142" r="12"/>
      <line className={`psim-radiation-track ${type}`} x1="88" y1="142" x2={stopX} y2="142" style={{strokeDasharray:dash}}/>
      {ABSORBERS.map((a,i)=><g key={a.label}><rect className={`psim-absorber absorber-${i}`} x={a.x} y="70" width="18" height="144" rx="3"/><text className="psim-atomic-label" x={a.x+9} y="238" textAnchor="middle">{a.label}</text></g>)}
    </svg>
    <Readouts items={[['Relative charge',String(model.charge),'good'],['Relative mass',String(model.relativeMass)],['Ionising ability',model.ionising],['Penetration',model.penetrating],['Typical absorber',model.absorber]]}/>
    <LiveText>{type} radiation. Ionising ability {model.ionising}. Penetration {model.penetrating}.</LiveText>
  </SimFrame>;
}
