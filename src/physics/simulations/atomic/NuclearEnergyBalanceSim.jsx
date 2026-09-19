import React, { useMemo, useState } from 'react';
import { SimFrame, Readouts, LiveText, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { buildNuclearEnergyBalance } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

const BENEFITS=[
  'Large energy output from a small amount of fuel',
  'Low direct greenhouse-gas emissions during electricity generation',
  'Reliable continuous electricity generation',
  'Radioisotopes have useful medical and industrial applications',
];

const RISKS=[
  'Long-lived radioactive waste requires secure management',
  'Serious accidents can release radioactive material',
  'Power stations have high construction and decommissioning costs',
  'Exposure to ionising radiation can damage living tissue',
];

export default function NuclearEnergyBalanceSim({ onEvidence }) {
  const [benefits,setBenefits]=useState(()=>new Set());
  const [risks,setRisks]=useState(()=>new Set());
  const {done,mark}=useTaskChecklist();

  const model=useMemo(()=>buildNuclearEnergyBalance({benefits:benefits.size,risks:risks.size}),[benefits,risks]);

  useDerivedTasks(mark,{
    benefit:benefits.size>=2,
    risk:risks.size>=2,
    balanced:model.balanced&&benefits.size>=2&&risks.size>=2,
  });

  const toggle=(setter,index)=>setter(previous=>{
    const next=new Set(previous);
    if(next.has(index))next.delete(index);else next.add(index);
    return next;
  });

  const tasks=[
    {id:'benefit',label:'Select at least two specific benefits or applications.'},
    {id:'risk',label:'Select at least two specific risks or disadvantages.'},
    {id:'balanced',label:'Build a balanced evidence set containing points on both sides.'},
  ];

  return <SimFrame
    title="Nuclear energy evidence balance"
    intro="Build a balanced evidence set by selecting specific benefits, applications, risks and disadvantages."
    prediction={{
      question:'A strong evaluation of nuclear energy should…',
      options:[
        {id:'balanced',label:'consider specific evidence for both benefits and risks'},
        {id:'onlyfor',label:'list only advantages'},
        {id:'onlyagainst',label:'list only disadvantages'},
      ],
      answer:'balanced',
    }}
    tasks={tasks}
    done={done}
    observation={model.balanced?`Balanced evidence set: ${benefits.size} points for and ${risks.size} points against.`:'Your evidence set is still one-sided. Add at least one point from the other side.'}
    explanation={<p>A sound evaluation uses <strong>specific evidence</strong>. Benefits may include reliable high-output electricity and useful radioisotopes. Risks include radioactive waste, accident consequences, cost and biological effects of ionising radiation.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <div className="psim-evidence-columns">
      <section className="psim-evidence-column benefit">
        <h4>Benefits and applications</h4>
        {BENEFITS.map((item,index)=><button type="button" key={item} className={benefits.has(index)?'selected':''} aria-pressed={benefits.has(index)} onClick={()=>toggle(setBenefits,index)}>{item}</button>)}
      </section>
      <section className="psim-evidence-column risk">
        <h4>Risks and disadvantages</h4>
        {RISKS.map((item,index)=><button type="button" key={item} className={risks.has(index)?'selected':''} aria-pressed={risks.has(index)} onClick={()=>toggle(setRisks,index)}>{item}</button>)}
      </section>
    </div>

    <div className="psim-balance-scale" aria-label="Evidence balance">
      <div className="psim-balance-beam" style={{transform:`rotate(${Math.max(-8,Math.min(8,(risks.size-benefits.size)*2))}deg)`}}/>
      <div className="psim-balance-pivot"/>
      <span className="left">{benefits.size}</span><span className="right">{risks.size}</span>
    </div>

    <Readouts items={[
      ['Evidence points for',String(model.benefits),'good'],
      ['Evidence points against',String(model.risks)],
      ['Balanced evaluation',model.balanced?'Yes':'Not yet'],
    ]}/>
    <LiveText>{benefits.size} benefits selected and {risks.size} risks selected.</LiveText>
  </SimFrame>;
}
