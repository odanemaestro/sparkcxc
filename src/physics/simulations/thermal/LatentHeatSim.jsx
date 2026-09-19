import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildLatentHeatFusionLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

export default function LatentHeatSim({ onEvidence }) {
  const [voltage,setVoltage]=useState(12),[current,setCurrent]=useState(2),[timeS,setTimeS]=useState(300),[melted,setMelted]=useState(.02),[background,setBackground]=useState(0);
  const clock=useSimulationClock({duration:4,loop:false});
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildLatentHeatFusionLabModel({voltageV:voltage,currentA:current,timeS,massMeltedKg:melted,backgroundMassKg:background}),[voltage,current,timeS,melted,background]);
  const progress=Math.max(0,Math.min(1,clock.time/4)),waterLevel=30+progress*70;
  useDerivedTasks(mark,{run:progress>=.98,correction:background>=.003,electrical:Math.abs(voltage-12)>=4||Math.abs(current-2)>=1});
  const tasks=[
    {id:'run',label:'Run one complete melting trial.'},
    {id:'correction',label:'Apply a non-zero background-melting correction and compare the corrected mass.'},
    {id:'electrical',label:'Change the electrical input substantially and compare the calculated latent heat.'},
  ];
  return <SimFrame title="Latent heat of fusion experiment"
    intro="Use electrical energy to melt ice at constant temperature, then correct for melting caused by the surroundings."
    prediction={{question:'During melting at the melting point, the temperature of the substance…',options:[{id:'constant',label:'stays constant'},{id:'rises',label:'keeps rising continuously'},{id:'falls',label:'must fall'}],answer:'constant'}}
    tasks={tasks} done={done}
    observation={`Electrical energy = ${fmt(model.energyJ,0)} J. Corrected melted mass = ${fmt(model.correctedMassKg*1000,1)} g, giving Lf = ${fmt(model.specificLatentHeatJPerKg,0)} J kg⁻¹.`}
    explanation={<p>For a phase change at constant temperature, <strong>E = mL</strong>. Electrical energy is <strong>E = VIt</strong>. A background correction removes melting caused by the surroundings.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}>
    <Playback clock={clock} stepSize={.05} showSpeed={false}/>
    <div className="psim-controls">
      <SimSlider id="b3-latent-voltage" label="Voltage" value={voltage} min={4} max={24} step={1} unit=" V" dp={0} onChange={v=>{setVoltage(v);clock.reset();}}/>
      <SimSlider id="b3-latent-current" label="Current" value={current} min={.5} max={5} step={.5} unit=" A" dp={1} onChange={v=>{setCurrent(v);clock.reset();}}/>
      <SimSlider id="b3-latent-time" label="Heating time" value={timeS} min={60} max={600} step={30} unit=" s" dp={0} onChange={v=>{setTimeS(v);clock.reset();}}/>
      <SimSlider id="b3-latent-mass" label="Measured melted mass" value={Math.round(melted*1000)} min={5} max={60} step={1} unit=" g" dp={0} onChange={v=>setMelted(v/1000)}/>
      <SimSlider id="b3-latent-background" label="Background melted mass" value={Math.round(background*1000)} min={0} max={15} step={1} unit=" g" dp={0} onChange={v=>setBackground(v/1000)}/>
    </div>
    <svg className="psim-thermal-stage" viewBox="0 0 720 320" role="img" aria-label="Ice melting experiment with an electric heater and collected melt water">
      <rect className="psim-ice-container" x="190" y="54" width="228" height="164" rx="16"/>
      <rect className="psim-ice-block" x="214" y="78" width="180" height={Math.max(40,112-progress*54)} rx="10"/>
      <rect className="psim-heater-element" x="250" y="118" width="108" height="16" rx="8"/>
      <path className="psim-melt-stream" d="M 306 218 V 256"/>
      <rect className="psim-collector" x="262" y="252" width="88" height="44" rx="6"/>
      <rect className="psim-collected-water" x="270" y={290-waterLevel*.28} width="72" height={waterLevel*.28} rx="3"/>
      <text className="psim-thermal-label" x="304" y="40" textAnchor="middle">ice at melting point</text>
      <text className="psim-thermal-label" x="510" y="100">temperature stays constant</text>
    </svg>
    <Readouts items={[['Electrical energy',`${fmt(model.energyJ,0)} J`,'good'],['Raw melted mass',`${fmt(model.rawMassKg*1000,1)} g`],['Background correction',`${fmt(model.backgroundMassKg*1000,1)} g`],['Corrected mass',`${fmt(model.correctedMassKg*1000,1)} g`],['Specific latent heat',`${fmt(model.specificLatentHeatJPerKg,0)} J kg⁻¹`]]}/>
    <div className="psim-equation">L = VIt/m</div>
    <LiveText>Corrected melted mass {fmt(model.correctedMassKg*1000,1)} grams.</LiveText>
  </SimFrame>;
}
