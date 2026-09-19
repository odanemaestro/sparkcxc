import React, { useMemo, useState } from 'react';
import { SimFrame, SimToggle, Playback, Readouts, LiveText, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildDeflectionModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

function pathFor(type,field){
  if(type==='gamma') return 'M 80 160 C 260 160 460 160 650 160';
  const alpha=type==='alpha';
  if(field==='electric') return alpha?'M 80 160 C 250 160 430 150 650 94':'M 80 160 C 250 160 430 170 650 226';
  return alpha?'M 80 160 C 250 160 430 135 650 88':'M 80 160 C 250 160 430 190 650 242';
}

export default function FieldDeflectionSim({ onEvidence }) {
  const [type,setType]=useState('alpha'),[field,setField]=useState('electric'),[visited,setVisited]=useState(()=>new Set(['alpha-electric']));
  const clock=useSimulationClock({duration:4,loop:true});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildDeflectionModel({type}),[type]);
  const note=()=>type==='gamma'?'Gamma is uncharged, so neither field deflects it.':field==='electric'?model.electric:model.magnetic;
  const changeType=v=>{setType(v);setVisited(p=>new Set(p).add(`${v}-${field}`));};
  const changeField=v=>{setField(v);setVisited(p=>new Set(p).add(`${type}-${v}`));};
  useDerivedTasks(mark,{animate:clock.time>.08,charges:[...visited].some(x=>x.startsWith('alpha'))&&[...visited].some(x=>x.startsWith('beta')),gamma:[...visited].some(x=>x.startsWith('gamma')),fields:[...visited].some(x=>x.endsWith('electric'))&&[...visited].some(x=>x.endsWith('magnetic'))});
  const tasks=[
    {id:'animate',label:'Play or step a particle through a field.'},
    {id:'charges',label:'Compare alpha and beta and observe opposite deflections.'},
    {id:'gamma',label:'Test gamma and confirm there is no deflection.'},
    {id:'fields',label:'Compare electric and magnetic fields.'},
  ];
  const path=pathFor(type,field);
  return <SimFrame title="Field deflection explorer"
    intro="Compare the paths of alpha, beta and gamma in electric and magnetic fields."
    prediction={{question:'Why do alpha and beta deflect in opposite directions in an electric field?',options:[{id:'charge',label:'they carry opposite electric charges'},{id:'mass',label:'they have exactly the same mass'},{id:'neutral',label:'both are neutral'}],answer:'charge'}}
    tasks={tasks} done={done}
    observation={`${type}: ${note()}. Relative deflection: ${model.relative}.`}
    explanation={<p>Alpha is positively charged and beta is negatively charged, so they deflect in opposite directions. Beta deflects more strongly because of its much smaller mass. Gamma is uncharged.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(t=>t.id)})}>
    <SimToggle label="Radiation" value={type} onChange={changeType} options={[{value:'alpha',label:'Alpha'},{value:'beta',label:'Beta'},{value:'gamma',label:'Gamma'}]}/>
    <SimToggle label="Field" value={field} onChange={changeField} options={[{value:'electric',label:'Electric'},{value:'magnetic',label:'Magnetic'}]}/>
    <Playback clock={clock} stepSize={.05} timeLabel={false}/>
    <svg className="psim-atomic-stage" viewBox="0 0 720 320" role="img" aria-label={`${type} in ${field} field`}>
      {field==='electric'?<><rect className="psim-field-plate positive" x="210" y="55" width="300" height="20" rx="5"/><rect className="psim-field-plate negative" x="210" y="245" width="300" height="20" rx="5"/><text className="psim-atomic-label" x="526" y="70">+</text><text className="psim-atomic-label" x="526" y="260">−</text></>:<>{Array.from({length:18},(_,i)=><circle key={i} className="psim-field-dot" cx={228+(i%6)*52} cy={84+Math.floor(i/6)*76} r="4"/>)}</>}
      <path className={`psim-deflection-path ${type}`} d={path}/><circle className="psim-alpha-particle" r="8"><animateMotion dur="4s" repeatCount="indefinite" path={path}/></circle>
    </svg>
    <Readouts items={[['Electric field',model.electric,'good'],['Magnetic field',model.magnetic],['Relative deflection',model.relative]]}/>
    <LiveText>{type} in {field} field: {note()}.</LiveText>
  </SimFrame>;
}
