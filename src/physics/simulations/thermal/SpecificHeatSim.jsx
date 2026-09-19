import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildSpecificHeatLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

export default function SpecificHeatSim({ onEvidence }) {
  const [power,setPower]=useState(48),[timeS,setTimeS]=useState(300),[mass,setMass]=useState(.8),[deltaT,setDeltaT]=useState(16);
  const clock=useSimulationClock({duration:4,loop:false});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildSpecificHeatLabModel({powerW:power,timeS,massKg:mass,deltaTC:deltaT}),[power,timeS,mass,deltaT]);
  const progress=Math.max(0,Math.min(1,clock.time/4)),shownTemp=20+deltaT*progress;
  useDerivedTasks(mark,{run:progress>=.98,power:Math.abs(power-48)>=20,mass:Math.abs(mass-.8)>=.3});
  const tasks=[
    {id:'run',label:'Run one complete heating trial and watch the temperature rise.'},
    {id:'power',label:'Change the heater power substantially and compare the electrical energy supplied.'},
    {id:'mass',label:'Change the sample mass substantially and compare the calculated specific heat capacity.'},
  ];
  return <SimFrame title="Specific heat experiment"
    intro="Supply measured electrical energy to a known mass, observe the temperature rise, and calculate the specific heat capacity."
    prediction={{question:'For the same energy input and material, increasing the sample mass makes the temperature rise…',options:[{id:'smaller',label:'smaller'},{id:'larger',label:'larger'},{id:'same',label:'the same'}],answer:'smaller'}}
    tasks={tasks} done={done}
    observation={`Electrical energy = ${fmt(model.energyJ,0)} J. Using m = ${fmt(mass,2)} kg and ΔT = ${fmt(deltaT,1)} °C gives c = ${fmt(model.specificHeat,0)} J kg⁻¹ K⁻¹.`}
    explanation={<p>For sensible heating, <strong>E = mcΔT</strong>. In an electrical method, <strong>E = Pt</strong>, so <strong>c = Pt/(mΔT)</strong>.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}>
    <Playback clock={clock} stepSize={.05} showSpeed={false}/>
    <div className="psim-controls">
      <SimSlider id="b3-shc-power" label="Heater power" value={power} min={20} max={120} step={4} unit=" W" dp={0} onChange={v=>{setPower(v);clock.reset();}}/>
      <SimSlider id="b3-shc-time" label="Heating time" value={timeS} min={60} max={600} step={30} unit=" s" dp={0} onChange={v=>{setTimeS(v);clock.reset();}}/>
      <SimSlider id="b3-shc-mass" label="Sample mass" value={mass} min={.2} max={2} step={.1} unit=" kg" dp={1} onChange={v=>{setMass(v);clock.reset();}}/>
      <SimSlider id="b3-shc-dt" label="Temperature rise" value={deltaT} min={4} max={40} step={1} unit=" °C" dp={0} onChange={setDeltaT}/>
    </div>
    <svg className="psim-thermal-stage" viewBox="0 0 720 310" role="img" aria-label={`Specific heat experiment showing a heated block at ${fmt(shownTemp,1)} degrees Celsius`}>
      <rect className="psim-shc-block" x="250" y="86" width="220" height="154" rx="18"/>
      <rect className="psim-heater-element" x="278" y="186" width="164" height="18" rx="9"/>
      <path className="psim-heater-lead" d="M 278 195 H 196 V 244"/><path className="psim-heater-lead" d="M 442 195 H 524 V 244"/>
      <circle className="psim-power-terminal" cx="196" cy="244" r="8"/><circle className="psim-power-terminal" cx="524" cy="244" r="8"/>
      <rect className="psim-thermometer" x="388" y="54" width="18" height="118" rx="9"/>
      <rect className="psim-thermometer-level" x="394" y={158-Math.min(88,24+progress*58)} width="6" height={Math.min(88,24+progress*58)} rx="3"/>
      <text className="psim-thermal-label" x="360" y="276" textAnchor="middle">insulated sample</text>
    </svg>
    <Readouts items={[['Electrical energy',`${fmt(model.energyJ,0)} J`,'good'],['Temperature',`${fmt(shownTemp,1)} °C`],['Temperature rise',`${fmt(deltaT,1)} K`],['Specific heat capacity',`${fmt(model.specificHeat,0)} J kg⁻¹ K⁻¹`]]}/>
    <div className="psim-equation">c = Pt/(mΔT)</div>
    <LiveText>Calculated specific heat capacity {fmt(model.specificHeat,0)} joules per kilogram kelvin.</LiveText>
  </SimFrame>;
}
