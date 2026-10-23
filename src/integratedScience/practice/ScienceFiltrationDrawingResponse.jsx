import React,{useRef,useState} from "react";

/** Blank ruled-line apparatus drawing editor; no model diagram or positions. */
const LABELS=["funnel","filter paper","residue","filtrate"];
const EMPTY={title:"",lines:[],labels:[]};
export function readFiltrationDrawing(value){
 let data=value;try{if(typeof value==="string")data=JSON.parse(value);}catch{return {...EMPTY};}
 if(!data||typeof data!=="object")return {...EMPTY};
 const valid=p=>Array.isArray(p)&&p.length===2&&p.every(x=>Number.isFinite(x)&&x>=0&&x<=1);
 return {title:typeof data.title==="string"?data.title.slice(0,160):"",
  lines:Array.isArray(data.lines)?data.lines.filter(l=>Array.isArray(l)&&l.length===2&&l.every(valid)).slice(0,80):[],
  labels:Array.isArray(data.labels)?data.labels.filter(l=>l&&LABELS.includes(l.name)&&valid(l.from)&&valid(l.to)).slice(0,12):[]};
}
function pointer(event){
 const rect=event.currentTarget.getBoundingClientRect();
 if(!(rect.width>0&&rect.height>0&&Number.isFinite(event.clientX)&&Number.isFinite(event.clientY)))return null;
 return [Number(Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width)).toFixed(4)),
 Number(Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height)).toFixed(4))];
}
export default function ScienceFiltrationDrawingResponse({base,responses,onChange,disabled}){
 const drawing=readFiltrationDrawing(responses[base+":filtrationDrawing"]);
 const [mode,setMode]=useState("line"),[label,setLabel]=useState("funnel");
 const start=useRef(null);
 const save=data=>onChange(base+":filtrationDrawing",JSON.stringify(data));
 const down=e=>{
  if(disabled)return;
  const p=pointer(e);if(!p)return;
  start.current=p;e.currentTarget.setPointerCapture?.(e.pointerId);
 };
 const up=e=>{
  if(disabled||!start.current)return;
  const from=start.current;start.current=null;
  const to=pointer(e);if(!to||Math.hypot(from[0]-to[0],from[1]-to[1])<.03)return;
  if(mode==="line")save({...drawing,lines:[...drawing.lines,[from,to]]});
  else save({...drawing,labels:[...drawing.labels,{name:label,from,to}]});
 };
 return <div className="is-p2-filtration-drawing">
  <p>Draw your own filtration apparatus with straight line segments. Switch to Label line to draw a ruled leader line from a word towards the part it names. No example diagram is inserted into your answer.</p>
  <label>Diagram title
   <input value={drawing.title} disabled={disabled} placeholder="Enter your own diagram title"
    onChange={e=>save({...drawing,title:e.target.value})}/>
  </label>
  <div className="is-p2-filtration-tools">
   <button type="button" className="is-exam-secondary" aria-pressed={mode==="line"} disabled={disabled}
    onClick={()=>setMode("line")}>Draw line</button>
   <button type="button" className="is-exam-secondary" aria-pressed={mode==="label"} disabled={disabled}
    onClick={()=>setMode("label")}>Label line</button>
   <label>Label
    <select disabled={disabled} value={label} onChange={e=>setLabel(e.target.value)}>
     {LABELS.map(v=><option key={v} value={v}>{v}</option>)}
    </select>
   </label>
  </div>
  <svg viewBox="0 0 640 360" className="is-p2-filtration-canvas" role="img"
   aria-label="Blank filtration apparatus drawing canvas"
   onPointerDown={down} onPointerUp={up} onPointerCancel={()=>{start.current=null;}}
   style={{width:"100%",maxWidth:"720px",touchAction:"none",cursor:disabled?"default":"crosshair"}}>
    <rect x="1" y="1" width="638" height="358" stroke="currentColor" opacity=".3" fill="none"/>
    {drawing.lines.map(([a,b],i)=><line key={"line"+i} x1={a[0]*640} y1={a[1]*360}
     x2={b[0]*640} y2={b[1]*360} stroke="currentColor" strokeWidth="2.1"/>)}
    {drawing.labels.map((l,i)=><g key={"label"+i}>
     <line x1={l.from[0]*640} y1={l.from[1]*360} x2={l.to[0]*640} y2={l.to[1]*360}
      stroke="currentColor" strokeWidth="1.4"/>
     <text x={l.from[0]*640} y={l.from[1]*360-4} fontSize="13" textAnchor="middle" fill="currentColor">{l.name}</text>
    </g>)}
  </svg>
  {!disabled&&<div className="is-p2-drawing-actions">
   <span>{drawing.lines.length} lines, {drawing.labels.length} labels</span>
   <button className="is-exam-secondary" type="button" disabled={!drawing.lines.length}
    onClick={()=>save({...drawing,lines:drawing.lines.slice(0,-1)})}>Undo line</button>
   <button className="is-exam-secondary" type="button" disabled={!drawing.labels.length}
    onClick={()=>save({...drawing,labels:drawing.labels.slice(0,-1)})}>Undo label</button>
   <button className="is-exam-secondary" type="button"
    disabled={!drawing.lines.length&&!drawing.labels.length&&!drawing.title}
    onClick={()=>save({...EMPTY})}>Clear diagram</button>
  </div>}
 </div>;
}
