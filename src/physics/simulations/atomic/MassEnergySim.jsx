import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildMassEnergyModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

const sci=value=>{
  if(!Number.isFinite(value)||value===0)return '0';
  const exp=Math.floor(Math.log10(Math.abs(value)));
  const coeff=(value/10**exp).toFixed(2);
  return `${coeff} × 10^${exp}`;
};

export default function MassEnergySim({ onEvidence }) {
  const [mass,setMass]=useState(2);
  const clock=useSimulationClock({duration:3.5,loop:false});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildMassEnergyModel({massMicrogram:mass}),[mass]);
  const progress=Math.max(0,Math.min(1,clock.time/3.5));
  const energyShown=model.energyJ*progress;

  useDerivedTasks(mark,{
    run:progress>=.98,
    small:mass<=1,
    large:mass>=10,
  });

  const tasks=[
    {id:'run',label:'Run the mass-to-energy conversion animation.'},
    {id:'small',label:'Try a mass change of 1 μg or less.'},
    {id:'large',label:'Try a mass change of at least 10 μg and compare the energy released.'},
  ];

  return <SimFrame
    title="Mass-energy conversion"
    intro="Convert a very small mass change into nuclear energy using E = mc²."
    prediction={{
      question:'Why can a tiny mass change correspond to a large amount of energy?',
      options:[
        {id:'c2',label:'because the mass is multiplied by the square of the speed of light'},
        {id:'massalone',label:'because mass is already measured in joules'},
        {id:'charge',label:'because electric charge is squared'},
      ],
      answer:'c2',
    }}
    tasks={tasks}
    done={done}
    observation={`${mass} μg = ${sci(model.massKg)} kg, corresponding to ${sci(model.energyJ)} J.`}
    explanation={<p>Einstein’s relation is <strong>E = mc²</strong>. The mass change must be converted to kilograms before substitution. Because <strong>c²</strong> is extremely large, even a tiny mass change can correspond to substantial energy.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <Playback clock={clock} stepSize={.05} showSpeed={false}/>
    <div className="psim-controls">
      <SimSlider id="e3-mass-energy" label="Mass change" value={mass} min={.1} max={20} step={.1} unit=" μg" dp={1} onChange={v=>{setMass(v);clock.reset();}}/>
    </div>

    <svg className="psim-mass-energy-stage" viewBox="0 0 720 280" role="img" aria-label="Mass converting to nuclear energy">
      <circle className="psim-mass-orb" cx="160" cy="140" r={30+mass*1.2}/>
      <text className="psim-atomic-label mass-label" x="160" y="146" textAnchor="middle">Δm</text>
      <path className="psim-energy-arrow" d="M 220 140 H 470"/>
      {Array.from({length:7},(_,i)=><circle key={i} className="psim-energy-spark" cx={510+Math.cos(i/7*Math.PI*2)*(20+45*progress)} cy={140+Math.sin(i/7*Math.PI*2)*(20+45*progress)} r={5+3*progress}/>)}
      <text className="psim-atomic-label" x="580" y="144" textAnchor="middle">{sci(energyShown)} J</text>
    </svg>

    <Readouts items={[
      ['Mass in kilograms',`${sci(model.massKg)} kg`,'good'],
      ['Energy released',`${sci(model.energyJ)} J`],
      ['Speed of light','3.0 × 10^8 m s⁻¹'],
    ]}/>
    <div className="psim-equation">E = mc²</div>
    <LiveText>Mass change {mass} micrograms. Energy {sci(model.energyJ)} joules.</LiveText>
  </SimFrame>;
}
