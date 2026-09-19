import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { buildRadiationLabModel } from '../../thermal/interactives/bThermalInteractiveModels.mjs';

const LABELS={'dull-black':'Dull black','dull-white':'Dull white','shiny-metal':'Shiny metal'};

export default function RadiationSurfacesSim({ onEvidence }) {
  const [temperature,setTemperature]=useState(80),[selected,setSelected]=useState('dull-black'),[visited,setVisited]=useState(()=>new Set(['dull-black']));
  const {done,mark}=useTaskChecklist();
  const model=useMemo(()=>buildRadiationLabModel({temperatureC:temperature}),[temperature]);
  useDerivedTasks(mark,{surfaces:visited.size===3,temperature:Math.abs(temperature-80)>=40});
  const tasks=[
    {id:'surfaces',label:'Inspect all three surfaces at the same temperature.'},
    {id:'temperature',label:'Change the common temperature substantially and compare the relative emission again.'},
  ];
  const choose=surface=>{setSelected(surface);setVisited(prev=>new Set(prev).add(surface));};
  const strongest=[...model.surfaces].sort((a,b)=>b.relativeIndex-a.relativeIndex)[0];
  return <SimFrame title="Radiation surface comparison"
    intro="Compare otherwise identical surfaces at the same temperature and identify which emits thermal radiation most strongly."
    prediction={{question:'At the same temperature, which surface is the strongest thermal emitter?',options:[{id:'black',label:'dull black'},{id:'white',label:'dull white'},{id:'shiny',label:'shiny metal'}],answer:'black'}}
    tasks={tasks} done={done}
    observation={`${LABELS[strongest.surface]} is the strongest relative emitter in this model. Shiny metal has the lowest relative emissivity.`}
    explanation={<p>A good absorber of thermal radiation is also a good emitter. Dull black surfaces are strong emitters, while shiny polished metal surfaces are weak emitters and good reflectors.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}>
    <div className="psim-controls">
      <SimSlider id="b4-radiation-temp" label="Surface temperature" value={temperature} min={20} max={180} step={5} unit=" °C" dp={0} onChange={setTemperature}/>
    </div>
    <div className="psim-radiation-grid" role="group" aria-label="Thermal radiation surfaces">
      {model.surfaces.map(surface=>(
        <button key={surface.surface} type="button" className={selected===surface.surface?'active':''} aria-pressed={selected===surface.surface} onClick={()=>choose(surface.surface)}>
          <span className={`psim-radiation-surface ${surface.surface}`}>
            {Array.from({length:5},(_,i)=><i key={i} style={{transform:`translateX(${18+i*10}px) scaleX(${.45+surface.relativeIndex*.75})`}}/>)}
          </span>
          <strong>{LABELS[surface.surface]}</strong>
          <em>Relative emission {fmt(surface.relativeIndex,2)}</em>
        </button>
      ))}
    </div>
    <Readouts items={[['Common temperature',`${temperature} °C`],['Selected surface',LABELS[selected],'good'],['Strongest emitter',LABELS[strongest.surface]]]}/>
    <LiveText>{LABELS[selected]} selected at {temperature} degrees Celsius.</LiveText>
  </SimFrame>;
}
