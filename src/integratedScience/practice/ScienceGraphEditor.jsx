import React, {useId} from "react";
import {newScienceGraph,readScienceGraph,graphPoints,graphAxis,graphPath} from "./scienceGraphModel";

const COLORS=["#168f8a","#cf6a25","#8760c6"];
export default function ScienceGraphEditor({base,responses,onChange,disabled}){
  const clipId=useId().replace(/:/g,"");
  const graph=readScienceGraph(responses[`${base}:graph`]) || newScienceGraph();
  const update=patch=>onChange(`${base}:graph`,JSON.stringify({...graph,...patch}));
  const updateSeries=(index,patch)=>update({series:graph.series.map((s,i)=>i===index?{...s,...patch}:s)});
  const series=graph.series.map(s=>({...s,parsed:graphPoints(s.points,graph.kind)}));
  const categories=[...new Set(series.flatMap(s=>s.parsed.filter(Boolean).map(p=>p.x)))];
  const y=graphAxis(graph.y),x=graph.kind==="bar"?{min:0,max:Math.max(1,categories.length),intervals:categories.length,step:1}:graphAxis(graph.x);
  const sx=v=>50+(v-x.min)/(x.max-x.min)*500;
  const sy=v=>260-(v-y.min)/(y.max-y.min)*210;
  const validWidth=Number.isFinite(Number(graph.barWidth)) && Number(graph.barWidth)>0 && Number(graph.barWidth)<1;
  return <div className="is-p2-graph-workspace">
    <p>Choose your graph type and scale, then enter each series. Your choices form part of your answer.</p>
    <div className="is-p2-graph-fields">
      <label>Graph type<select disabled={disabled} value={graph.kind} onChange={e=>update({kind:e.target.value})}><option value="">Choose a type</option><option value="line">Line / scatter</option><option value="bar">Bar chart</option></select></label>
      {["x","y"].map(axis=><label key={axis}>{axis}-axis label<input aria-label={`${axis}-axis label`} disabled={disabled} value={responses[`${base}:${axis}Label`] || ""} onChange={e=>onChange(`${base}:${axis}Label`,e.target.value)}/></label>)}
      {graph.kind!=="bar" && <label>Join points<select disabled={disabled} value={graph.connection} onChange={e=>update({connection:e.target.value})}><option value="none">Leave unjoined</option><option value="segments">Straight segments</option><option value="smooth">Smooth curve</option><option value="best-fit">Straight line of best fit</option></select></label>}
      {graph.kind==="bar" && <label>Bar group width (0–1)<input type="number" min="0.1" max="0.9" step="0.1" disabled={disabled} value={graph.barWidth} onChange={e=>update({barWidth:e.target.value})}/></label>}
    </div>
    {(graph.kind==="bar"?["y"]:["x","y"]).map(axis=><fieldset key={axis} disabled={disabled}><legend>{axis}-axis scale</legend><div className="is-p2-graph-fields">{["min","max","step"].map(field=><label key={field}>{field==="step"?"Units per interval":field==="min"?"Minimum":"Maximum"}<input aria-label={`${axis} ${field}`} type="number" value={graph[axis][field]} onChange={e=>update({[axis]:{...graph[axis],[field]:e.target.value}})}/></label>)}</div></fieldset>)}
    {series.map((s,index)=><fieldset disabled={disabled} key={index}><legend>Series {index+1}</legend><label>Key / series name<input aria-label={`Series ${index+1} name`} value={s.name} onChange={e=>updateSeries(index,{name:e.target.value})}/></label><label>{graph.kind==="bar"?"Category, height — one per line":"x, y — one point per line"}<textarea aria-label={`Series ${index+1} points`} rows={4} value={s.points} onChange={e=>updateSeries(index,{points:e.target.value})}/></label>{s.parsed.some(p=>!p) && <p role="status">Check the coordinate format. Use a comma between each pair.</p>}{series.length>1 && <button type="button" onClick={()=>update({series:graph.series.filter((_,i)=>i!==index)})}>Remove series</button>}</fieldset>)}
    {!disabled && series.length<3 && <button type="button" onClick={()=>update({series:[...graph.series,{name:"",points:""}]})}>Add series</button>}
    {(!x || !y) && <p role="status">Enter increasing axis bounds and a positive interval that divides the range into 1–20 equal intervals.</p>}
    <svg className="is-p2-graph-response" viewBox="0 0 600 335" role="img" aria-label="Student graph plot">
      <defs><clipPath id={clipId}><rect x="50" y="50" width="500" height="210"/></clipPath></defs>
      <rect x="50" y="50" width="500" height="210" fill="none" stroke="currentColor"/>
      {x&&y&&<>
        {Array.from({length:y.intervals+1},(_,i)=>{const v=y.min+i*y.step;return <g key={`y${i}`}><line x1="50" x2="550" y1={sy(v)} y2={sy(v)} stroke="currentColor" opacity=".16"/><text x="45" y={sy(v)+3} textAnchor="end" fontSize="9" fill="currentColor">{Number(v.toPrecision(5))}</text></g>;})}
        {graph.kind!=="bar" && Array.from({length:x.intervals+1},(_,i)=>{const v=x.min+i*x.step;return <g key={`x${i}`}><line x1={sx(v)} x2={sx(v)} y1="50" y2="260" stroke="currentColor" opacity=".16"/><text x={sx(v)} y="277" textAnchor="middle" fontSize="9" fill="currentColor">{Number(v.toPrecision(5))}</text></g>;})}
        {graph.kind==="bar" && categories.map((category,i)=><text key={category} x={sx(i+.5)} y="278" textAnchor="middle" fontSize="8" fill="currentColor">{category}</text>)}
        <g clipPath={`url(#${clipId})`}>{series.map((s,index)=>{
          const points=s.parsed.filter(Boolean),color=COLORS[index];
          if(graph.kind==="bar") return validWidth && points.map((p,i)=>{const group=500/Math.max(1,categories.length),width=group*Number(graph.barWidth)/series.length;return <rect key={`${index}-${i}`} x={sx(categories.indexOf(p.x)+.5)-group*Number(graph.barWidth)/2+index*width} y={Math.min(sy(p.y),sy(0))} width={width} height={Math.abs(sy(p.y)-sy(0))} fill={color}/>;});
          const sorted=[...points].sort((a,b)=>a.x-b.x).map(p=>({x:sx(p.x),y:sy(p.y)}));
          return <g key={index} stroke={color} fill={color}><path d={graphPath(sorted,graph.connection)} fill="none" strokeWidth="2"/>{sorted.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3"/>)}</g>;
        })}</g>
      </>}
      <text x="300" y="302" textAnchor="middle" fontSize="12" fill="currentColor">{responses[`${base}:xLabel`] || ""}</text>
      <text transform="translate(12 160) rotate(-90)" textAnchor="middle" fontSize="11" fill="currentColor">{responses[`${base}:yLabel`] || ""}</text>
      {series.map((s,i)=><text key={i} x={50+i*170} y="324" fontSize="10" fill={COLORS[i]}>{s.name}</text>)}
    </svg>
    <label>Optional graph notes<textarea disabled={disabled} value={responses[base] || ""} onChange={e=>onChange(base,e.target.value)}/></label>
  </div>;
}
