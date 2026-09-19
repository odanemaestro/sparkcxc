import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, SimToggle, Readouts, LiveText, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { buildNuclearEquationModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

export default function NuclearEquationSim({ onEvidence }) {
  const [mode,setMode]=useState('alpha');
  const [A,setA]=useState(226);
  const [Z,setZ]=useState(88);
  const [visited,setVisited]=useState(()=>new Set(['alpha']));
  const {done,mark}=useTaskChecklist();

  const daughter=useMemo(()=>buildNuclearEquationModel({mode,A,Z}),[mode,A,Z]);
  const emitted=mode==='alpha'?{A:4,Z:2,symbol:'α'}:{A:0,Z:-1,symbol:'β⁻'};
  const massBalanced=A===daughter.A+emitted.A;
  const chargeBalanced=Z===daughter.Z+emitted.Z;

  useDerivedTasks(mark,{
    alpha:visited.has('alpha'),
    beta:visited.has('beta'),
    conserve:massBalanced&&chargeBalanced,
  });

  const changeMode=value=>{
    setMode(value);
    setVisited(previous=>new Set(previous).add(value));
    if(value==='alpha'&&A<4)setA(4);
    if(value==='alpha'&&Z<2)setZ(2);
  };
  const changeZ=value=>{setZ(value);if(value>A)setA(value);};

  const tasks=[
    {id:'alpha',label:'Balance an alpha-decay equation.'},
    {id:'beta',label:'Balance a beta-minus decay equation.'},
    {id:'conserve',label:'Confirm that both mass number and atomic number are conserved.'},
  ];

  return <SimFrame
    title="Nuclear equation balancer"
    intro="Change the parent nuclide and decay mode, then track mass number and atomic number through the nuclear equation."
    prediction={{
      question:'In beta-minus decay, the daughter nucleus has…',
      options:[
        {id:'sameA',label:'the same mass number and atomic number increased by 1'},
        {id:'lowerA',label:'mass number reduced by 4 and atomic number reduced by 2'},
        {id:'sameZ',label:'the same mass number and the same atomic number'},
      ],
      answer:'sameA',
    }}
    tasks={tasks}
    done={done}
    observation={`Parent ${A}/${Z} gives daughter ${daughter.A}/${daughter.Z} by ${mode==='alpha'?'alpha':'beta-minus'} decay. Mass-number balance: ${massBalanced?'yes':'no'}. Atomic-number balance: ${chargeBalanced?'yes':'no'}.`}
    explanation={<p>Nuclear equations conserve both <strong>mass number A</strong> and <strong>atomic number Z</strong>. Alpha decay emits <strong>⁴₂α</strong>. Beta-minus decay emits <strong>⁰₋₁β</strong>, so A is unchanged while Z increases by 1 in the daughter.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <SimToggle
      label="Decay mode"
      value={mode}
      onChange={changeMode}
      options={[{value:'alpha',label:'Alpha decay'},{value:'beta',label:'Beta-minus decay'}]}
    />
    <div className="psim-controls">
      <SimSlider id="e3-nuclear-A" label="Parent mass number A" value={A} min={mode==='alpha'?4:1} max={240} step={1} dp={0} onChange={setA}/>
      <SimSlider id="e3-nuclear-Z" label="Parent atomic number Z" value={Z} min={mode==='alpha'?2:1} max={100} step={1} dp={0} onChange={changeZ}/>
    </div>

    <div className="psim-nuclear-equation" aria-label="Balanced nuclear equation">
      <div className="psim-nuclide-box">
        <span className="psim-nuclide-top">{A}</span><span className="psim-nuclide-bottom">{Z}</span><strong>X</strong>
      </div>
      <span className="psim-nuclear-arrow">→</span>
      <div className="psim-nuclide-box">
        <span className="psim-nuclide-top">{daughter.A}</span><span className="psim-nuclide-bottom">{daughter.Z}</span><strong>Y</strong>
      </div>
      <span className="psim-nuclear-plus">+</span>
      <div className="psim-nuclide-box emitted">
        <span className="psim-nuclide-top">{emitted.A}</span><span className="psim-nuclide-bottom">{emitted.Z}</span><strong>{emitted.symbol}</strong>
      </div>
    </div>

    <Readouts items={[
      ['Daughter A',String(daughter.A),'good'],
      ['Daughter Z',String(daughter.Z)],
      ['Mass number conserved',massBalanced?'Yes':'No'],
      ['Atomic number conserved',chargeBalanced?'Yes':'No'],
    ]}/>
    <LiveText>{mode==='alpha'?'Alpha':'Beta-minus'} decay. Daughter mass number {daughter.A}, atomic number {daughter.Z}.</LiveText>
  </SimFrame>;
}
