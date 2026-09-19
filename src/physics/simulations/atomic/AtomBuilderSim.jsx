import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Readouts, LiveText, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { buildAtomModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

function electronDots(count){
  const shells=[2,8,8,18],out=[];let left=count,index=0;
  while(left>0&&index<shells.length){const n=Math.min(left,shells[index]);for(let i=0;i<n;i++)out.push({shell:index+1,angle:2*Math.PI*i/n});left-=n;index++;}
  return out;
}

export default function AtomBuilderSim({ onEvidence }) {
  const [A,setA]=useState(23),[Z,setZ]=useState(11),[charge,setCharge]=useState(0),[seen,setSeen]=useState(()=>new Set(['neutral']));
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildAtomModel({A,Z,charge}),[A,Z,charge]);
  useDerivedTasks(mark,{neutral:seen.has('neutral'),cation:seen.has('cation'),anion:seen.has('anion')});
  const changeCharge=v=>{setCharge(v);setSeen(p=>new Set(p).add(v===0?'neutral':v>0?'cation':'anion'));};
  const changeZ=v=>{setZ(v);if(v>A)setA(v);};
  const tasks=[
    {id:'neutral',label:'Build a neutral atom.'},
    {id:'cation',label:'Make a positive ion and observe that it has fewer electrons than protons.'},
    {id:'anion',label:'Make a negative ion and observe that it has more electrons than protons.'},
  ];
  const electrons=electronDots(Math.max(0,model.electrons));
  return <SimFrame title="Atom and ion builder"
    intro="Change mass number, atomic number and ionic charge, then compare protons, neutrons and electrons."
    prediction={{question:'A positive ion has…',options:[{id:'fewer',label:'fewer electrons than protons'},{id:'more',label:'more electrons than protons'},{id:'equal',label:'equal numbers of electrons and protons'}],answer:'fewer'}}
    tasks={tasks} done={done}
    observation={`Protons = ${model.protons}, neutrons = ${model.neutrons}, electrons = ${model.electrons}.`}
    explanation={<p><strong>Mass number A = protons + neutrons.</strong> Atomic number Z gives the number of protons. Ion charge changes the number of electrons, not the number of protons.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(t=>t.id)})}>
    <div className="psim-controls">
      <SimSlider id="e2-A" label="Mass number A" value={A} min={Z} max={40} step={1} dp={0} onChange={setA}/>
      <SimSlider id="e2-Z" label="Atomic number Z" value={Z} min={1} max={20} step={1} dp={0} onChange={changeZ}/>
      <SimSlider id="e2-charge" label="Ion charge" value={charge} min={-3} max={3} step={1} dp={0} onChange={changeCharge}/>
    </div>
    <svg className="psim-atom-stage" viewBox="0 0 520 420" role="img" aria-label={`Atom with ${model.protons} protons, ${model.neutrons} neutrons and ${model.electrons} electrons`}>
      {[1,2,3,4].map(s=><circle key={s} className="psim-electron-shell" cx="260" cy="210" r={48+s*33}/>)}
      <circle className="psim-atom-nucleus" cx="260" cy="210" r="44"/>
      <text className="psim-atomic-label nucleus-text" x="260" y="204" textAnchor="middle">{model.protons} p</text>
      <text className="psim-atomic-label nucleus-text" x="260" y="225" textAnchor="middle">{model.neutrons} n</text>
      {electrons.map((e,i)=>{const r=48+e.shell*33,x=260+Math.cos(e.angle)*r,y=210+Math.sin(e.angle)*r;return <circle key={i} className="psim-electron" cx={x} cy={y} r="7"/>;})}
    </svg>
    <Readouts items={[['Protons',String(model.protons),'good'],['Neutrons',String(model.neutrons)],['Electrons',String(model.electrons)],['Net charge',String(charge)]]}/>
    <LiveText>{model.protons} protons, {model.neutrons} neutrons, {model.electrons} electrons.</LiveText>
  </SimFrame>;
}
