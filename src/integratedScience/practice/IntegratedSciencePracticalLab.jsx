import React, { useMemo, useState } from "react";
import IntegratedScienceText from "../components/IntegratedScienceText";

const GRAPH_DATA = Object.freeze([
  {x:10,y:42},
  {x:20,y:34},
  {x:30,y:27},
  {x:40,y:22},
  {x:50,y:19},
  {x:60,y:17},
]);

const VARIABLE_CHOICES = Object.freeze([
  "temperature of the water bath",
  "time taken for the reaction",
  "volume of enzyme solution",
  "type of enzyme",
]);

const EVALUATION_CHOICES = Object.freeze([
  "Repeat each reading and calculate a mean.",
  "Use a different stopwatch for every reading.",
  "Change two variables at the same time.",
  "Round every result to the nearest whole number before calculating.",
]);

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const round=(value,places=1)=>Number(Number(value).toFixed(places));

function SectionHeader({step,title,children}){
  return <header className="is-lab-section-head">
    <span>STATION {step}</span>
    <h2>{title}</h2>
    <p>{children}</p>
  </header>;
}

function GraphLab({done,onDone}){
  const [points,setPoints]=useState([]);
  const [xLabel,setXLabel]=useState("");
  const [yLabel,setYLabel]=useState("");
  const [message,setMessage]=useState("");
  const width=620,height=330,margin=54;
  const xMin=0,xMax=70,yMin=0,yMax=50;
  const toScreen=point=>({
    x:margin+(point.x-xMin)/(xMax-xMin)*(width-margin*2),
    y:height-margin-(point.y-yMin)/(yMax-yMin)*(height-margin*2),
  });
  const fromEvent=event=>{
    const svg=event.currentTarget;
    const rect=svg.getBoundingClientRect();
    const sx=(event.clientX-rect.left)/rect.width*width;
    const sy=(event.clientY-rect.top)/rect.height*height;
    const x=round(clamp((sx-margin)/(width-margin*2)*(xMax-xMin)+xMin,xMin,xMax)/10,0)*10;
    const y=round(clamp((height-margin-sy)/(height-margin*2)*(yMax-yMin)+yMin,yMin,yMax),0);
    return {x,y};
  };
  const check=()=>{
    const labelsOk=/distance/i.test(xLabel)&&/(time|seconds|s\b)/i.test(yLabel);
    const matched=GRAPH_DATA.filter(target=>points.some(point=>Math.abs(point.x-target.x)<=1&&Math.abs(point.y-target.y)<=1)).length;
    if(!labelsOk){setMessage("Label both axes with the quantity and unit. Use distance on x and time on y.");return;}
    if(matched<GRAPH_DATA.length){setMessage(`You have ${matched}/${GRAPH_DATA.length} required points in the correct positions. Plot all six readings.`);return;}
    setMessage("Graph complete. The plotted points show that the measured time decreases as distance increases.");
    onDone?.();
  };
  return <section className="is-lab-station">
    <SectionHeader step="1" title="Plot an experimental graph">Plot the results from a photosynthesis investigation. Label both axes, use the scale, and place every point.</SectionHeader>
    <div className="is-lab-axis-fields">
      <label><span>x-axis</span><input value={xLabel} onChange={e=>setXLabel(e.target.value)} placeholder="Distance / cm"/></label>
      <label><span>y-axis</span><input value={yLabel} onChange={e=>setYLabel(e.target.value)} placeholder="Time / s"/></label>
    </div>
    <div className="is-lab-data-table-wrap"><table className="is-lab-data-table"><thead><tr><th>Distance / cm</th>{GRAPH_DATA.map(row=><th key={row.x}>{row.x}</th>)}</tr></thead><tbody><tr><th>Time / s</th>{GRAPH_DATA.map(row=><td key={row.x}>{row.y}</td>)}</tr></tbody></table></div>
    <svg className="is-lab-graph" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive graph plotting workspace" onPointerDown={event=>{
      const point=fromEvent(event);
      setPoints(current=>{
        const exists=current.some(item=>item.x===point.x&&item.y===point.y);
        return exists?current.filter(item=>!(item.x===point.x&&item.y===point.y)):[...current,point];
      });
    }}>
      {Array.from({length:8},(_,i)=>{const x=margin+i*(width-margin*2)/7;return <line key={`x-${i}`} x1={x} y1={margin} x2={x} y2={height-margin} className="is-lab-grid"/>;})}
      {Array.from({length:6},(_,i)=>{const y=margin+i*(height-margin*2)/5;return <line key={`y-${i}`} x1={margin} y1={y} x2={width-margin} y2={y} className="is-lab-grid"/>;})}
      <line x1={margin} y1={height-margin} x2={width-margin} y2={height-margin} className="is-lab-axis"/>
      <line x1={margin} y1={margin} x2={margin} y2={height-margin} className="is-lab-axis"/>
      {Array.from({length:8},(_,i)=>{const value=i*10;const p=toScreen({x:value,y:0});return <text key={`xt-${value}`} x={p.x} y={height-margin+24} textAnchor="middle">{value}</text>;})}
      {Array.from({length:6},(_,i)=>{const value=i*10;const p=toScreen({x:0,y:value});return <text key={`yt-${value}`} x={margin-12} y={p.y+4} textAnchor="end">{value}</text>;})}
      {points.map((point,index)=>{const p=toScreen(point);return <g key={`${point.x}-${point.y}-${index}`}><line x1={p.x-5} y1={p.y-5} x2={p.x+5} y2={p.y+5} className="is-lab-point"/><line x1={p.x-5} y1={p.y+5} x2={p.x+5} y2={p.y-5} className="is-lab-point"/></g>;})}
      {xLabel&&<text x={width/2} y={height-8} textAnchor="middle">{xLabel}</text>}
      {yLabel&&<text transform={`translate(15 ${height/2}) rotate(-90)`} textAnchor="middle">{yLabel}</text>}
    </svg>
    <div className="is-lab-actions"><button type="button" onClick={()=>setPoints([])}>Clear graph</button><button type="button" className="primary" onClick={check}>{done?"Check again":"Check graph"}</button></div>
    {message&&<p className={`is-lab-feedback ${done?"success":""}`} role="status">{message}</p>}
  </section>;
}

function VariablesLab({done,onDone}){
  const [independent,setIndependent]=useState("");
  const [dependent,setDependent]=useState("");
  const [control,setControl]=useState("");
  const [message,setMessage]=useState("");
  const check=()=>{
    const ok=independent===VARIABLE_CHOICES[0]&&dependent===VARIABLE_CHOICES[1]&&control===VARIABLE_CHOICES[2];
    setMessage(ok?"Correct. Only temperature should be deliberately changed while reaction time is measured and enzyme volume is kept constant.":"Recheck what is changed, what is measured, and what must be kept the same for a fair test.");
    if(ok) onDone?.();
  };
  const selector=(label,value,setter)=><label><span>{label}</span><select value={value} onChange={e=>setter(e.target.value)}><option value="">Choose</option>{VARIABLE_CHOICES.map(choice=><option key={choice}>{choice}</option>)}</select></label>;
  return <section className="is-lab-station">
    <SectionHeader step="2" title="Design a fair test">A student investigates how temperature affects the time an enzyme-controlled reaction takes to finish.</SectionHeader>
    <div className="is-lab-axis-fields">
      {selector("Independent variable",independent,setIndependent)}
      {selector("Dependent variable",dependent,setDependent)}
      {selector("One controlled variable",control,setControl)}
    </div>
    <button type="button" className="is-lab-check primary" onClick={check}>{done?"Check again":"Check variables"}</button>
    {message&&<p className={`is-lab-feedback ${done?"success":""}`} role="status">{message}</p>}
  </section>;
}

function MeasurementLab({done,onDone}){
  const [mean,setMean]=useState("");
  const [rate,setRate]=useState("");
  const [message,setMessage]=useState("");
  const readings=[23.8,24.1,24.0];
  const expectedMean=round(readings.reduce((a,b)=>a+b,0)/readings.length,1);
  const expectedRate=round(30/expectedMean,2);
  const check=()=>{
    const ok=Math.abs(Number(mean)-expectedMean)<=0.05&&Math.abs(Number(rate)-expectedRate)<=0.02;
    setMessage(ok?`Correct. Mean time = ${expectedMean.toFixed(1)} s and rate = ${expectedRate.toFixed(2)} cm s⁻¹.`:"Calculate the mean first, then use rate = distance ÷ mean time.");
    if(ok) onDone?.();
  };
  return <section className="is-lab-station">
    <SectionHeader step="3" title="Process repeated measurements">A trolley travels 30 cm. Three measured times are 23.8 s, 24.1 s and 24.0 s. Use all three readings.</SectionHeader>
    <div className="is-lab-axis-fields">
      <label><span>Mean time / s</span><input inputMode="decimal" value={mean} onChange={e=>setMean(e.target.value)} placeholder="e.g. 24.0"/></label>
      <label><span>Rate / cm s⁻¹</span><input inputMode="decimal" value={rate} onChange={e=>setRate(e.target.value)} placeholder="distance ÷ mean time"/></label>
    </div>
    <button type="button" className="is-lab-check primary" onClick={check}>{done?"Check again":"Check calculation"}</button>
    {message&&<p className={`is-lab-feedback ${done?"success":""}`} role="status"><IntegratedScienceText>{message}</IntegratedScienceText></p>}
  </section>;
}

function EvaluationLab({done,onDone}){
  const [choice,setChoice]=useState("");
  const [limitation,setLimitation]=useState("");
  const [message,setMessage]=useState("");
  const check=()=>{
    const improvementOk=choice===EVALUATION_CHOICES[0];
    const limitationOk=/(reaction|human|timing|stopwatch|parallax|reading|measurement|uncertainty)/i.test(limitation.trim());
    const ok=improvementOk&&limitationOk;
    setMessage(ok?"Good evaluation. You identified a realistic source of uncertainty and an improvement that would make the evidence more reliable.":"Choose an improvement that increases reliability and state a realistic measurement limitation.");
    if(ok) onDone?.();
  };
  return <section className="is-lab-station">
    <SectionHeader step="4" title="Evaluate the investigation">A good practical answer explains a real limitation and gives an improvement that directly reduces its effect.</SectionHeader>
    <label className="is-lab-wide-field"><span>Best improvement</span><select value={choice} onChange={e=>setChoice(e.target.value)}><option value="">Choose</option>{EVALUATION_CHOICES.map(option=><option key={option}>{option}</option>)}</select></label>
    <label className="is-lab-wide-field"><span>State one realistic limitation</span><textarea rows={3} value={limitation} onChange={e=>setLimitation(e.target.value)} placeholder="For example, explain a timing or reading uncertainty."/></label>
    <button type="button" className="is-lab-check primary" onClick={check}>{done?"Check again":"Check evaluation"}</button>
    {message&&<p className={`is-lab-feedback ${done?"success":""}`} role="status">{message}</p>}
  </section>;
}

export default function IntegratedSciencePracticalLab({onBack,onComplete}){
  const [done,setDone]=useState(new Set());
  const markDone=id=>setDone(current=>new Set([...current,id]));
  const allDone=done.size===4;
  const progress=useMemo(()=>Math.round(done.size/4*100),[done.size]);

  return <main className="is-practice-shell is-practical-lab-shell">
    <div className="is-practice-top-actions">
      <button type="button" className="is-back-button" onClick={onBack}><span aria-hidden="true">←</span>Back to practice modes</button>
    </div>
    <header className="is-practice-hero">
      <div>
        <span>CSEC INTEGRATED SCIENCE PRACTICAL SKILLS</span>
        <h1>Practical Skills Lab</h1>
        <p>Work through graphing, experimental variables, measurements and evaluation. These are the skills needed for practical and investigative questions across all three modules.</p>
      </div>
      <div className="is-lab-progress-card"><strong>{done.size}/4</strong><span>stations complete</span><div><i style={{width:`${progress}%`}}/></div></div>
    </header>

    <GraphLab done={done.has("graph")} onDone={()=>markDone("graph")}/>
    <VariablesLab done={done.has("variables")} onDone={()=>markDone("variables")}/>
    <MeasurementLab done={done.has("measurement")} onDone={()=>markDone("measurement")}/>
    <EvaluationLab done={done.has("evaluation")} onDone={()=>markDone("evaluation")}/>

    <section className="is-lab-completion">
      <strong>{allDone?"Practical skills lab complete":"Complete all four stations"}</strong>
      <p>{allDone?"You have completed the core graphing, planning, processing and evaluation workflow.":"SPARK will mark the lab complete after every station has been checked successfully."}</p>
      <button type="button" className="primary" disabled={!allDone} onClick={()=>onComplete?.({score:4,total:4,percent:100})}>Save practical lab completion</button>
    </section>
  </main>;
}
