import React,{useRef,useState} from "react";

const NAMES=[["fuse","Fuse"],["voltmeter","Voltmeter"],["switch","Switch"]];
const TOOLS=["line","rect","circle","V"];
const empty=()=>({fuse:[],voltmeter:[],switch:[]});
const isShape=s=>s&&["line","rect","circle","letter"].includes(s.kind);
export function readCircuitSymbolDrawing(value){
 try{
  const v=typeof value==="string"?JSON.parse(value):value;
  if(!v||typeof v!=="object")return empty();
  return Object.fromEntries(NAMES.map(([id])=>[id,Array.isArray(v[id])?v[id].filter(isShape).slice(0,20):[]]));
 }catch{return empty();}
}
const coord=(event)=>{
 const r=event.currentTarget.getBoundingClientRect();
 if(r.width<=0||r.height<=0||!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return null;
 return [
  Number(Math.max(0,Math.min(1,(event.clientX-r.left)/r.width)).toFixed(4)),
  Number(Math.max(0,Math.min(1,(event.clientY-r.top)/r.height)).toFixed(4))
 ];
};
const makeShape=(tool,start,end)=>{
 if(tool==="line")return {kind:"line",x1:start[0],y1:start[1],x2:end[0],y2:end[1]};
 if(tool==="rect")return {kind:"rect",x:Math.min(start[0],end[0]),y:Math.min(start[1],end[1]),
  w:Math.abs(start[0]-end[0]),h:Math.abs(start[1]-end[1])};
 if(tool==="circle")return {kind:"circle",cx:start[0],cy:start[1],r:Number((Math.hypot((start[0]-end[0])*250,(start[1]-end[1])*150)/150).toFixed(4))};
 return null;
};
export default function ScienceCircuitSymbolResponse({base,responses,onChange,disabled}){
 const drawings=readCircuitSymbolDrawing(responses[base+":symbolDrawing"]);
 const [active,setActive]=useState({fuse:"line",voltmeter:"circle",switch:"line"});
 const started=useRef(null);
 const save=data=>onChange(base+":symbolDrawing",JSON.stringify(data));
 const insert=(name,shape)=>{
  if(disabled||drawings[name].length>=20||!shape)return;
  save({...drawings,[name]:[...drawings[name],shape]});
 };
 const down=(name,event)=>{
  if(disabled)return;
  const p=coord(event);if(!p)return;
  if(active[name]==="V"){insert(name,{kind:"letter",x:p[0],y:p[1],text:"V"});return;}
  started.current={name,point:p};
  event.currentTarget.setPointerCapture?.(event.pointerId);
 };
 const up=(name,event)=>{
  const current=started.current;started.current=null;
  if(disabled||!current||current.name!==name)return;
  const p=coord(event);if(!p||Math.hypot(p[0]-current.point[0],p[1]-current.point[1])<.03)return;
  insert(name,makeShape(active[name],current.point,p));
 };
 return <div className="is-p2-symbol-workspace">
  <p>Draw each symbol using the line, rectangle, circle and letter tools. Each primitive must be positioned by you. The drawing pad remains available for freehand work.</p>
  {NAMES.map(([name,label])=><section className="is-p2-symbol-panel" key={name}>
   <strong>{label}</strong>
   <div className="is-p2-symbol-tools" role="group" aria-label={label+" drawing tool"}>
    {TOOLS.map(tool=><button type="button" key={tool} className="is-exam-secondary"
     disabled={disabled} aria-pressed={active[name]===tool}
     onClick={()=>setActive(current=>({...current,[name]:tool}))}>{tool==="rect"?"Rectangle":tool==="circle"?"Circle":tool==="line"?"Line":"Letter V"}</button>)}
   </div>
   <svg viewBox="0 0 250 150" role="img" aria-label={label+" student symbol canvas"}
    onPointerDown={event=>down(name,event)} onPointerUp={event=>up(name,event)}
    onPointerCancel={()=>{started.current=null;}}
    style={{width:"100%",touchAction:"none",cursor:disabled?"default":"crosshair"}}>
    <rect x="1" y="1" width="248" height="148" rx="4" fill="none" stroke="currentColor" opacity=".35"/>
    {drawings[name].map((s,i)=>{
     if(s.kind==="line")return <line key={i} x1={s.x1*250} y1={s.y1*150} x2={s.x2*250} y2={s.y2*150} stroke="currentColor" strokeWidth="2.4"/>;
     if(s.kind==="rect")return <rect key={i} x={s.x*250} y={s.y*150} width={s.w*250} height={s.h*150} fill="none" stroke="currentColor" strokeWidth="2.4"/>;
     if(s.kind==="circle")return <circle key={i} cx={s.cx*250} cy={s.cy*150} r={s.r*150} fill="none" stroke="currentColor" strokeWidth="2.4"/>;
     if(s.kind==="letter")return <text key={i} x={s.x*250} y={s.y*150} dominantBaseline="central" textAnchor="middle" fontSize="24" fill="currentColor">V</text>;
     return null;
    })}
   </svg>
   <div className="is-p2-drawing-actions">
    <span>{drawings[name].length} shapes</span>
    <button className="is-exam-secondary" type="button" disabled={disabled||!drawings[name].length}
     onClick={()=>save({...drawings,[name]:drawings[name].slice(0,-1)})}>Undo</button>
    <button className="is-exam-secondary" type="button" disabled={disabled||!drawings[name].length}
     onClick={()=>save({...drawings,[name]:[]})}>Clear</button>
   </div>
  </section>)}
 </div>;
}
