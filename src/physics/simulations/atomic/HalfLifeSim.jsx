import React, { useMemo, useState } from 'react';
import { SimFrame, SimSlider, Playback, Readouts, LiveText, fmt, useDerivedTasks, useTaskChecklist } from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildHalfLifeModel } from '../../atomic/interactives/eAtomicInteractiveModels.mjs';

export default function HalfLifeSim({ onEvidence }) {
  const [initial,setInitial]=useState(1600);
  const [halfLife,setHalfLife]=useState(2);
  const [elapsed,setElapsed]=useState(6);
  const clock=useSimulationClock({duration:4,loop:false});
  const {done,mark}=useTaskChecklist();

  const model=useMemo(()=>buildHalfLifeModel({initial,elapsed,halfLife}),[initial,elapsed,halfLife]);
  const animatedElapsed=Math.min(elapsed,Math.max(0,clock.time/4)*elapsed);
  const animated=useMemo(()=>buildHalfLifeModel({initial,elapsed:animatedElapsed,halfLife}),[initial,animatedElapsed,halfLife]);

  const points=Array.from({length:37},(_,i)=>{
    const t=i;
    const r=buildHalfLifeModel({initial,elapsed:t,halfLife});
    return {t,remaining:r.remaining};
  });
  const max=initial;

  useDerivedTasks(mark,{
    run:clock.time>=3.9,
    one:Math.abs(elapsed-halfLife)<.001,
    three:elapsed>=3*halfLife,
  });

  const tasks=[
    {id:'run',label:'Run one complete half-life animation.'},
    {id:'one',label:'Set elapsed time equal to exactly one half-life and confirm that half remains.'},
    {id:'three',label:'Set elapsed time to at least three half-lives and observe repeated halving.'},
  ];

  return <SimFrame
    title="Half-life explorer"
    intro="Change the half-life and elapsed time, then follow repeated halving of the activity or number of undecayed nuclei."
    prediction={{
      question:'After three half-lives, what fraction of the original sample remains?',
      options:[{id:'eighth',label:'1/8'},{id:'third',label:'1/3'},{id:'quarter',label:'1/4'}],
      answer:'eighth',
    }}
    tasks={tasks}
    done={done}
    observation={`Elapsed time = ${fmt(elapsed,1)} h, equal to ${fmt(model.halfLives,2)} half-lives. Remaining activity = ${fmt(model.remaining,1)} Bq.`}
    explanation={<p>After each half-life, the amount remaining halves. After <strong>n</strong> half-lives, the fraction remaining is <strong>(1/2)ⁿ</strong>.</p>}
    onComplete={()=>onEvidence?.({result:'completed',tasks:tasks.map(task=>task.id)})}
  >
    <Playback clock={clock} stepSize={.05} showSpeed={false}/>
    <div className="psim-controls">
      <SimSlider id="e3-half-initial" label="Initial activity" value={initial} min={100} max={3200} step={100} unit=" Bq" dp={0} onChange={v=>{setInitial(v);clock.reset();}}/>
      <SimSlider id="e3-half-life" label="Half-life" value={halfLife} min={1} max={12} step={1} unit=" h" dp={0} onChange={v=>{setHalfLife(v);clock.reset();}}/>
      <SimSlider id="e3-half-elapsed" label="Elapsed time" value={elapsed} min={0} max={36} step={1} unit=" h" dp={0} onChange={v=>{setElapsed(v);clock.reset();}}/>
    </div>

    <svg className="psim-half-life-chart" viewBox="0 0 760 330" role="img" aria-label="Exponential half-life curve">
      <line className="psim-graph-axis" x1="64" y1="276" x2="718" y2="276"/>
      <line className="psim-graph-axis" x1="64" y1="40" x2="64" y2="276"/>
      <polyline className="psim-half-life-line" points={points.map(p=>`${64+p.t/36*640},${276-p.remaining/max*210}`).join(' ')}/>
      <circle className="psim-half-life-marker" cx={64+animatedElapsed/36*640} cy={276-animated.remaining/max*210} r="8"/>
      <text className="psim-atomic-label" x="610" y="312">elapsed time / h</text>
      <text className="psim-atomic-label" x="78" y="58">activity</text>
    </svg>

    <Readouts items={[
      ['Half-lives elapsed',fmt(model.halfLives,2),'good'],
      ['Activity remaining',`${fmt(model.remaining,1)} Bq`],
      ['Fraction remaining',fmt(model.remaining/initial,4)],
    ]}/>
    <LiveText>{fmt(model.halfLives,2)} half-lives elapsed. {fmt(model.remaining,1)} becquerels remain.</LiveText>
  </SimFrame>;
}
