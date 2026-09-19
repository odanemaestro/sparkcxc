import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Readouts, LiveText, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { buildIsotopeModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

export default function IsotopeExplorerSim({ onEvidence }) {
  const [Z,setZ]=useState(6),[N1,setN1]=useState(6),[N2,setN2]=useState(8);
  const {done,mark}=useTaskChecklist();
  const a=useMemo(()=>buildIsotopeModel({Z,N:N1}),[Z,N1]),b=useMemo(()=>buildIsotopeModel({Z,N:N2}),[Z,N2]);
  useDerivedTasks(mark,{different:N1!==N2,sameProtons:a.Z===b.Z,compare:Math.abs(N1-N2)>=2});
  const tasks=[
    {id:'different',label:'Give the two atoms different neutron numbers.'},
    {id:'sameProtons',label:'Confirm both isotopes keep the same proton number.'},
    {id:'compare',label:'Separate the neutron numbers by at least two and compare the mass numbers.'},
  ];
  return <SimFrame title="Isotope explorer"
    intro="Keep proton number fixed while changing neutron number, then compare the resulting mass numbers."
    prediction={{question:'Isotopes of the same element have the same number of…',options:[{id:'protons',label:'protons'},{id:'neutrons',label:'neutrons'},{id:'nucleons',label:'nucleons'}],answer:'protons'}}
    tasks={tasks} done={done}
    observation={`Both isotopes have Z = ${Z}. Their mass numbers are ${a.A} and ${b.A}.`}
    explanation={<p>Isotopes are atoms of the same element with the <strong>same proton number</strong> but different neutron numbers, so their mass numbers are different.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(t=>t.id)})}>
    <div className="psim-controls">
      <SimSlider id="e2-iso-Z" label="Protons Z" value={Z} min={1} max={20} step={1} dp={0} onChange={setZ}/>
      <SimSlider id="e2-iso-N1" label="Isotope 1 neutrons" value={N1} min={0} max={24} step={1} dp={0} onChange={setN1}/>
      <SimSlider id="e2-iso-N2" label="Isotope 2 neutrons" value={N2} min={0} max={24} step={1} dp={0} onChange={setN2}/>
    </div>
    <div className="psim-isotope-grid">
      {[a,b].map((iso,i)=><div key={i} className="psim-isotope-card"><span className="psim-nuclide-A">{iso.A}</span><span className="psim-nuclide-Z">{iso.Z}</span><strong>X</strong><em>{i===0?N1:N2} neutrons</em></div>)}
    </div>
    <Readouts items={[['Same proton number',String(Z),'good'],['Isotope 1 mass number',String(a.A)],['Isotope 2 mass number',String(b.A)]]}/>
    <LiveText>Same atomic number {Z}. Mass numbers {a.A} and {b.A}.</LiveText>
  </SimFrame>;
}
