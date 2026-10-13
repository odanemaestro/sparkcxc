import "./scienceGraphEditor.css";
import React, {useId,useState} from "react";
import {newScienceGraph,readScienceGraph,graphPoints,graphPreviewAxis,graphPointIssues,graphPath} from "./scienceGraphModel";

const formatCoord=value=>String(value);
const displayCoord=point=>`(${String(point.x)}, ${formatCoord(point.y)})`;

const COLORS=["#168f8a","#cf6a25","#8760c6"];
export default function ScienceGraphEditor({base,responses,onChange,disabled}){
  const clipId=useId().replace(/:/g,"");
  const [activeSeries,setActiveSeries]=useState(0);
  const [hover,setHover]=useState(null);
  const [selected,setSelected]=useState(null);
  const graph=readScienceGraph(responses[`${base}:graph`]) || newScienceGraph();
  const update=patch=>onChange(`${base}:graph`,JSON.stringify({...graph,...patch}));
  const updateSeries=(index,patch)=>update({series:graph.series.map((s,i)=>i===index?{...s,...patch}:s)});
  const series=graph.series.map(s=>({...s,parsed:graphPoints(s.points,graph.kind),issues:graphPointIssues(s.points,graph.kind)}));
  const categories=[...new Set([...(Array.isArray(graph.categories)?graph.categories.slice(0,50):[]),...series.flatMap(s=>s.parsed.filter(Boolean).map(p=>p.x))])];
  const yInfo=graphPreviewAxis(graph.y);
  const xInfo=graph.kind==="bar"
    ?{axis:{min:0,max:Math.max(1,categories.length),intervals:categories.length,step:1},valid:true,suggestedStep:null}
    :graphPreviewAxis(graph.x);
  const y=yInfo.axis,x=xInfo.axis;
  const hasPlotArea=Boolean(x&&y&&graph.kind);
  const validPoints=series.flatMap((s,index)=>s.parsed.filter(Boolean).map(p=>({...p,seriesIndex:index,name:s.name||`Series ${index+1}`})));
  const outside=validPoints.filter(p=>hasPlotArea&&
    (p.y<y.min||p.y>y.max||(graph.kind!=="bar"&&(p.x<x.min||p.x>x.max))));
  const sx=v=>50+(v-x.min)/(x.max-x.min)*500;
  const sy=v=>260-(v-y.min)/(y.max-y.min)*210;
  const validWidth=Number.isFinite(Number(graph.barWidth)) && Number(graph.barWidth)>0 && Number(graph.barWidth)<1;
  const chosen=Math.min(activeSeries,series.length-1);
  // Map pointer positions through the actual SVG viewBox, including the empty
  // margins caused by preserveAspectRatio on narrow phones and tablets.
  const localPosition=event=>{
    const svg=event.currentTarget;
    const box=svg.getBoundingClientRect();
    if(!box.width||!box.height)return null;
    if(typeof svg.createSVGPoint==="function"&&typeof svg.getScreenCTM==="function"){
      const matrix=svg.getScreenCTM();
      if(matrix&&typeof matrix.inverse==="function"){
        const pt=svg.createSVGPoint();
        pt.x=event.clientX;pt.y=event.clientY;
        const local=pt.matrixTransform(matrix.inverse());
        return {x:local.x,y:local.y};
      }
    }
    const scale=Math.min(box.width/600,box.height/335);
    const left=box.left+(box.width-600*scale)/2;
    const top=box.top+(box.height-335*scale)/2;
    return {x:(event.clientX-left)/scale,y:(event.clientY-top)/scale};
  };
  const plotted=hasPlotArea?validPoints.filter(p=>
    graph.kind==="bar"?categories.includes(p.x)&&p.y>=y.min&&p.y<=y.max:
    p.x>=x.min&&p.x<=x.max&&p.y>=y.min&&p.y<=y.max
  ):[];
  const closePoint=local=>{
    if(!x||!y||!local)return null;
    if(graph.kind==="bar"){
      // Inspect only the actual painted bar, not the entire category.
      // Other series must still be able to plot the same category independently.
      if(!validWidth||!categories.length)return null;
      const group=500/categories.length;
      const width=group*Number(graph.barWidth)/series.length;
      return plotted.find(p=>{
        const center=sx(categories.indexOf(p.x)+.5);
        const left=center-group*Number(graph.barWidth)/2+p.seriesIndex*width;
        const zero=sy(0),top=Math.min(sy(p.y),zero),bottom=Math.max(sy(p.y),zero);
        return local.x>=left-2&&local.x<=left+width+2&&
          local.y>=top-4&&local.y<=bottom+4;
      })||null;
    }
    const found=plotted.reduce((nearest,p)=>{
      const distance=Math.hypot(sx(p.x)-local.x,sy(p.y)-local.y);
      return distance<nearest.distance?{point:p,distance}:nearest;
    },{point:null,distance:12});
    return found.point;
  };
  const candidate=local=>{
    if(!hasPlotArea||!local||local.x<50||local.x>550||local.y<50||local.y>260)return null;
    const match=closePoint(local);
    if(match)return {point:match,existing:true};
    const snap=(v,step)=>Number((Math.round(v/step)*step).toPrecision(10));
    const xv=graph.kind==="bar"
      ?categories[Math.min(categories.length-1,Math.max(0,Math.floor((local.x-50)/500*categories.length)))]
      :snap(x.min+(local.x-50)/500*(x.max-x.min),x.step/5);
    if(xv===undefined)return null;
    const yv=snap(y.max-(local.y-50)/210*(y.max-y.min),y.step/5);
    return {point:{x:xv,y:yv,seriesIndex:chosen,name:series[chosen]?.name||`Series ${chosen+1}`},existing:false};
  };
  const preview=event=>setHover(candidate(localPosition(event)));
  const fixStep=axis=>{
    const info=axis==="x"?xInfo:yInfo;
    if(info.suggestedStep!=null){
      update({[axis]:{...graph[axis],step:String(info.suggestedStep)}});
      setHover(null);
    }
  };
  const removeLastPoint=()=>{
    const lines=series[chosen].points.split(/\n|;/);
    for(let i=lines.length-1;i>=0;i--){
      if(graphPoints(lines[i],graph.kind)[0]){
        lines.splice(i,1);
        updateSeries(chosen,{points:lines.join("\n")});
        setHover(null);setSelected(null);
        return;
      }
    }
  };
  const addPoint=event=>{
    const next=candidate(localPosition(event));
    if(!next)return;
    setSelected(next);
    if(disabled||next.existing)return;
    const old=series[chosen].parsed.filter(Boolean).filter(p=>graph.kind!=="bar"||p.x!==next.point.x);
    updateSeries(chosen,{points:[...old,{x:next.point.x,y:next.point.y}].map(p=>`${p.x},${p.y}`).join("\n")});
  };
  const focusPoint=(point,index)=>{setHover(null);setSelected({point:{...point,seriesIndex:index},existing:true});};
  const displayed=hover||selected;
  const displayedPoint=displayed?.point;
  const pin=displayedPoint&&hasPlotArea&&(
    displayedPoint.y>=y.min&&displayedPoint.y<=y.max&&
    (graph.kind==="bar"||displayedPoint.x>=x.min&&displayedPoint.x<=x.max))
    ?{x:graph.kind==="bar"?sx(categories.indexOf(displayedPoint.x)+.5):sx(displayedPoint.x),y:sy(displayedPoint.y)}
    :null;

  return <div className="is-p2-graph-workspace">
    <p>Choose a graph type and scale. Move over the grid to preview exact coordinates, then click or tap to plot. Hover over any plotted point to inspect its exact values. Keyboard coordinate entry is also available.</p>
    <div className="is-p2-graph-fields">
      <label>Graph type<select disabled={disabled} value={graph.kind} onChange={e=>{setHover(null);setSelected(null);update({kind:e.target.value});}}><option value="">Choose a type</option><option value="line">Line / scatter</option><option value="bar">Bar chart</option></select></label>
      {["x","y"].map(axis=><label key={axis}>{axis}-axis label<input aria-label={`${axis}-axis label`} disabled={disabled} value={responses[`${base}:${axis}Label`] || ""} onChange={e=>onChange(`${base}:${axis}Label`,e.target.value)}/></label>)}
      {graph.kind!=="bar" && <label>Join points<select disabled={disabled} value={graph.connection} onChange={e=>update({connection:e.target.value})}><option value="none">Leave unjoined</option><option value="segments">Straight segments</option><option value="smooth">Smooth curve</option><option value="best-fit">Straight line of best fit</option></select></label>}
      {graph.kind==="bar" && <label>Bar group width (0–1)<input type="number" min="0.1" max="0.9" step="0.1" disabled={disabled} value={graph.barWidth} onChange={e=>update({barWidth:e.target.value})}/></label>}
      <label>Plotting series<select disabled={disabled} value={chosen} onChange={e=>setActiveSeries(Number(e.target.value))}>{series.map((s,i)=><option key={i} value={i}>{s.name || `Series ${i+1}`}</option>)}</select></label>
      {graph.kind==="bar" && <label>Categories, one per line<textarea disabled={disabled} value={(graph.categories || []).join("\n")} onChange={e=>update({categories:e.target.value.split("\n").map(s=>s.trim()).filter(Boolean).slice(0,50)})}/></label>}
    </div>
    {(graph.kind==="bar"?["y"]:["x","y"]).map(axis=><fieldset key={axis} disabled={disabled}><legend>{axis}-axis scale</legend><div className="is-p2-graph-fields">{["min","max","step"].map(field=><label key={field}>{field==="step"?"Units per interval":field==="min"?"Minimum":"Maximum"}<input aria-label={`${axis} ${field}`} type="number" step="any" value={graph[axis][field]} onChange={e=>update({[axis]:{...graph[axis],[field]:e.target.value}})}/></label>)}</div></fieldset>)}
    {series.map((s,index)=><fieldset disabled={disabled} key={index}><legend>Series {index+1}</legend><label>Key / series name<input aria-label={`Series ${index+1} name`} value={s.name} onChange={e=>updateSeries(index,{name:e.target.value})}/></label><label>{graph.kind==="bar"?"Category, height — one per line":"x, y — one point per line"}<textarea aria-label={`Series ${index+1} points`} rows={4} value={s.points} onChange={e=>updateSeries(index,{points:e.target.value})} placeholder={graph.kind==="bar"?"Category, 2":"1, 2"}/></label>
      {s.issues.map(issue=><p key={issue.line} className="is-p2-graph-input-error" role="alert">{issue.message} You entered: <code>{issue.text}</code></p>)}
      {s.points.split(/\n|;/).filter(line=>line.trim()).length>101&&<p role="alert">Only the first 101 points per series are included.</p>}{series.length>1 && <button type="button" onClick={()=>update({series:graph.series.filter((_,i)=>i!==index)})}>Remove series</button>}</fieldset>)}
    {!disabled && series.length<3 && <button type="button" onClick={()=>update({series:[...graph.series,{name:"",points:""}]})}>Add series</button>}
    {(!x || !y)&&<p className="is-p2-graph-input-error" role="alert">Enter a minimum smaller than the maximum on each axis before plotting. The graph will appear when the bounds are valid.</p>}
    {hasPlotArea&&!xInfo.valid&&<div className="is-p2-graph-scale-warning" role="status">
      <span>The x-axis interval is invalid. The graph is using a preview interval of {xInfo.suggestedStep}. This preview does not count as your selected scale.</span>
      {!disabled&&<button type="button" onClick={()=>fixStep("x")}>Use x interval {xInfo.suggestedStep}</button>}
    </div>}
    {hasPlotArea&&!yInfo.valid&&<div className="is-p2-graph-scale-warning" role="status">
      <span>The y-axis interval is invalid. The graph is using a preview interval of {yInfo.suggestedStep}. This preview does not count as your selected scale.</span>
      {!disabled&&<button type="button" onClick={()=>fixStep("y")}>Use y interval {yInfo.suggestedStep}</button>}
    </div>}
    {outside.length>0&&<div className="is-p2-graph-input-error" role="alert">
      {outside.length} point{outside.length===1?" is":"s are"} outside the current axis bounds and {outside.length===1?"is":"are"} not visible: {outside.slice(0,6).map(displayCoord).join("; ")}. Adjust the minimum or maximum to include {outside.length===1?"this point":"these points"}.
    </div>}
    <div className="is-p2-graph-toolbar"><button type="button" disabled={disabled||!series[chosen].parsed.some(Boolean)} onClick={removeLastPoint}>Undo point</button><button type="button" disabled={disabled} onClick={()=>update({series:graph.series.map(s=>({...s,points:""}))})}>Clear graph</button></div>
    <div className="is-p2-graph-coordinate-status" role="status">
      <strong>{displayedPoint?`${displayed?.existing?"Plotted point":"Plot at"}: ${displayCoord(displayedPoint)}`:"Coordinates"}</strong>
      <span>{displayedPoint?(displayed.existing?"Exact coordinates of the selected point":disabled?"Graph review":"Click or tap to plot this point"):hasPlotArea?"Move over the graph or select a plotted point to see its exact coordinates.":"Set the axis minimum and maximum to show the graph."}</span>
    </div>
    <svg className="is-p2-graph-response" viewBox="0 0 600 335" role="img" aria-label="Student graph plot" onPointerMove={preview} onPointerLeave={()=>setHover(null)} onClick={addPoint}>
      <defs><clipPath id={clipId}><rect x="50" y="50" width="500" height="210"/></clipPath></defs>
      <rect x="50" y="50" width="500" height="210" fill="transparent" pointerEvents="all" stroke="currentColor"/>
      {hasPlotArea&&<>
        {Array.from({length:y.intervals+1},(_,i)=>{const v=y.min+i*y.step;return <g key={`y${i}`}><line x1="50" x2="550" y1={sy(v)} y2={sy(v)} stroke="currentColor" opacity=".16"/><text x="45" y={sy(v)+3} textAnchor="end" fontSize="9" fill="currentColor">{Number(v.toPrecision(5))}</text></g>;})}
        {graph.kind!=="bar" && Array.from({length:x.intervals+1},(_,i)=>{const v=x.min+i*x.step;return <g key={`x${i}`}><line x1={sx(v)} x2={sx(v)} y1="50" y2="260" stroke="currentColor" opacity=".16"/><text x={sx(v)} y="277" textAnchor="middle" fontSize="9" fill="currentColor">{Number(v.toPrecision(5))}</text></g>;})}
        {graph.kind==="bar" && categories.map((category,i)=><text key={category} x={sx(i+.5)} y="278" textAnchor="middle" fontSize="8" fill="currentColor">{category}</text>)}
        <g clipPath={`url(#${clipId})`}>{series.map((s,index)=>{
          const points=s.parsed.filter(Boolean).filter(p=>graph.kind==="bar"
            ?categories.includes(p.x)&&p.y>=y.min&&p.y<=y.max
            :p.x>=x.min&&p.x<=x.max&&p.y>=y.min&&p.y<=y.max),color=COLORS[index];
          if(graph.kind==="bar") return validWidth && points.map((p,i)=>{const group=500/Math.max(1,categories.length),width=group*Number(graph.barWidth)/series.length;return <rect key={`${index}-${i}`} x={sx(categories.indexOf(p.x)+.5)-group*Number(graph.barWidth)/2+index*width} y={Math.min(sy(p.y),sy(0))} width={width} height={Math.abs(sy(p.y)-sy(0))} fill={color}/>;});
          const sorted=[...points].sort((a,b)=>a.x-b.x).map(p=>({x:sx(p.x),y:sy(p.y)}));
          return <g key={index} stroke={color} fill={color}><path d={graphPath(sorted,graph.connection)} fill="none" strokeWidth="2"/>{sorted.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3"/>)}</g>;
        })}</g>
        {pin&&displayedPoint&&<g pointerEvents="none" className="is-p2-graph-crosshair">
          <line x1={pin.x} x2={pin.x} y1="50" y2="260" stroke="currentColor" strokeDasharray="4 4" strokeOpacity=".7"/>
          <line x1="50" x2="550" y1={pin.y} y2={pin.y} stroke="currentColor" strokeDasharray="4 4" strokeOpacity=".7"/>
          <circle cx={pin.x} cy={pin.y} r="6" stroke="#0a645d" strokeWidth="2" fill="white"/>
          <g transform={`translate(${Math.min(423,Math.max(53,pin.x+12))},${Math.max(68,Math.min(251,pin.y-11))})`}>
            <rect x="0" y="-18" width="120" height="25" rx="6" fill="#112c44"/>
            <text x="60" y="-2" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">{displayCoord(displayedPoint)}</text>
          </g>
        </g>}
      </>}
      <text x="300" y="302" textAnchor="middle" fontSize="12" fill="currentColor">{responses[`${base}:xLabel`] || ""}</text>
      <text transform="translate(12 160) rotate(-90)" textAnchor="middle" fontSize="11" fill="currentColor">{responses[`${base}:yLabel`] || ""}</text>
      {series.map((s,i)=><text key={i} x={50+i*170} y="324" fontSize="10" fill={COLORS[i]}>{s.name}</text>)}
    </svg>
    {plotted.length>0&&<div className="is-p2-plotted-point-list" aria-label="Plotted coordinates">
      <strong>Plotted coordinates</strong>
      <div>{plotted.map((point,i)=><button key={`${point.seriesIndex}-${i}`} type="button"
        onPointerEnter={()=>focusPoint(point,point.seriesIndex)}
        onFocus={()=>focusPoint(point,point.seriesIndex)}
        onClick={()=>focusPoint(point,point.seriesIndex)}
        aria-label={`Inspect ${point.name} point ${displayCoord(point)}`}>
        {point.name}: {displayCoord(point)}
      </button>)}</div>
    </div>}
    <label>Optional graph notes<textarea disabled={disabled} value={responses[base] || ""} onChange={e=>onChange(base,e.target.value)}/></label>
  </div>;
}
