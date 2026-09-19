import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildDecayModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

function seededActualSeries(initial,throws,probability,seed){
  let state=(seed>>>0)||1;
  const rand=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};
  let remaining=Math.max(0,Math.round(initial));
  const out=[remaining];
  for(let step=0;step<throws;step++){
    let decayed=0;
    for(let i=0;i<remaining;i++)if(rand()<probability)decayed++;
    remaining-=decayed;
    out.push(remaining);
  }
  return out;
}

export default function RandomDecaySim({ onEvidence }) {
  const [initial,setInitial]=useState(600);
  const [throws,setThrows]=useState(8);
  const [seed,setSeed]=useState(1);
  const clock=useSimulationClock({duration:5,loop:false});
  const {done,mark}=useTaskChecklist();

  const expected=useMemo(()=>buildDecayModel({initial,throws,probability:1/6}),[initial,throws]);
  const actual=useMemo(()=>seededActualSeries(initial,throws,1/6,seed),[initial,throws,seed]);
  const visibleStep=Math.min(throws,Math.floor(Math.max(0,clock.time/5)*Math.max(1,throws)));
  const max=Math.max(initial,1);

  useDerivedTasks(mark,{
    run:clock.time>=4.9,
    repeat:seed>=3,
    large:initial>=900,
  });

  const tasks=[
    {id:'run',label:'Run one complete random-decay trial.'},
    {id:'repeat',label:'Repeat the trial at least twice and compare the random outcomes.'},
    {id:'large',label:'Increase the starting population to at least 900 and compare the actual result with the expected trend.'},
  ];

  return <SimFrame
    title="Random radioactive decay"
    intro="Compare a seeded random decay trial with the expected large-sample trend. Individual decay events are unpredictable even though the overall pattern is stable."
    prediction={{
      question:'Which statement best describes radioactive decay?',
      options:[
        {id:'random',label:'Individual nuclei decay randomly, but large samples show a predictable statistical trend.'},
        {id:'scheduled',label:'Each nucleus decays at a precisely scheduled time.'},
        {id:'allatonce',label:'All nuclei in a sample decay together.'},
      ],
      answer:'random',
    }}
    tasks={tasks}
    done={done}
    observation={`After ${visibleStep} throws, this trial has ${actual[visibleStep]} nuclei remaining while the expected trend is ${fmt(expected.series[visibleStep],1)}.`}
    explanation={<p>Radioactive decay is <strong>random for individual nuclei</strong>. For a large sample, however, the fraction that decays in a given interval is statistically stable, so the overall decay curve becomes predictable.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <Playback clock={clock} stepSize={.05} showSpeed={false}/>
    <div className="psim-controls">
      <SimSlider id="e3-decay-initial" label="Starting population" value={initial} min={60} max={1200} step={60} dp={0} onChange={v=>{setInitial(v);clock.reset();}}/>
      <SimSlider id="e3-decay-throws" label="Number of throws" value={throws} min={2} max={14} step={1} dp={0} onChange={v=>{setThrows(v);clock.reset();}}/>
    </div>
    <button type="button" className="psim-btn" onClick={()=>{setSeed(s=>s+1);clock.reset();}}>Repeat random trial</button>

    <svg className="psim-decay-chart" viewBox="0 0 760 330" role="img" aria-label="Random radioactive decay bars compared with expected trend">
      <line className="psim-graph-axis" x1="64" y1="276" x2="718" y2="276"/>
      <line className="psim-graph-axis" x1="64" y1="40" x2="64" y2="276"/>
      {actual.map((value,i)=>{
        const x=80+i*(620/Math.max(1,throws));
        const h=value/max*200;
        const show=i<=visibleStep;
        return <g key={i} opacity={show?1:.18}>
          <rect className="psim-decay-bar" x={x-9} y={276-h} width="18" height={h}/>
          <circle className="psim-decay-expected" cx={x} cy={276-(expected.series[i]/max*200)} r="5"/>
        </g>;
      })}
      <text className="psim-atomic-label" x="86" y="310">throw number →</text>
      <text className="psim-atomic-label" x="78" y="58">number remaining</text>
    </svg>

    <Readouts items={[
      ['Trial number',String(seed),'good'],
      ['Current throw',String(visibleStep)],
      ['Actual remaining',String(actual[visibleStep])],
      ['Expected remaining',fmt(expected.series[visibleStep],1)],
    ]}/>
    <LiveText>Trial {seed}. Throw {visibleStep}. Actual remaining {actual[visibleStep]}. Expected {fmt(expected.series[visibleStep],1)}.</LiveText>
  </SimFrame>;
}
