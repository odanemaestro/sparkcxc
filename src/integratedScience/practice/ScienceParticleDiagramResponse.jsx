import React from "react";

/**
 * Two blank canvases for student-created particle arrangements.
 * Every markable dot comes from a user pointer action, never a template.
 */
const DIAGRAMS=[["solid","Solid"],["liquid","Liquid"]];
const empty=()=>({solid:[],liquid:[]});
export function readParticleLayout(input){
 try{
  const data=typeof input==="string"?JSON.parse(input):input;
  if(!data||typeof data!=="object")return empty();
  const safe=p=>Array.isArray(p)&&p.length===2&&p.every(v=>typeof v==="number"&&Number.isFinite(v)&&v>=0&&v<=1);
  return Object.fromEntries(DIAGRAMS.map(([key])=>[key,Array.isArray(data[key])?data[key].filter(safe).slice(0,36):[]]));
 }catch{return empty();}
}
export default function ScienceParticleDiagramResponse({base,responses,onChange,disabled}){
 const layout=readParticleLayout(responses[base+":particleLayout"]);
 const save=next=>onChange(base+":particleLayout",JSON.stringify(next));
 const place=(which,event)=>{
  if(disabled||layout[which].length>=36)return;
  const rect=event.currentTarget.getBoundingClientRect();
  if(rect.width<=0||rect.height<=0||!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return;
  const x=Number(Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width)).toFixed(4));
  const y=Number(Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height)).toFixed(4));
  save({...layout,[which]:[...layout[which],[x,y]]});
 };
 return <div className="is-p2-particle-workspace">
  <p>Place each particle by tapping inside the two blank grids. Build your own arrangements. Use Undo to correct a position.</p>
  <div className="is-p2-particle-grid">
  {DIAGRAMS.map(([which,name])=><section key={which} className="is-p2-particle-panel">
   <strong>{name}</strong>
   <svg viewBox="0 0 220 180" role="img" aria-label={name+" particle arrangement drawing"}
    onPointerDown={event=>place(which,event)}
    style={{width:"100%",touchAction:"none",cursor:disabled?"default":"crosshair"}}>
    <rect x="1" y="1" width="218" height="178" rx="4" fill="none" stroke="currentColor" opacity=".6"/>
    {layout[which].map(([x,y],i)=><circle key={i} cx={x*220} cy={y*180} r="8" fill="currentColor"/>)}
   </svg>
   <div className="is-p2-drawing-actions">
    <span>{layout[which].length} particles</span>
    <button type="button" className="is-exam-secondary" disabled={disabled||!layout[which].length}
     onClick={()=>save({...layout,[which]:layout[which].slice(0,-1)})}>Undo</button>
    <button type="button" className="is-exam-secondary" disabled={disabled||!layout[which].length}
     onClick={()=>save({...layout,[which]:[]})}>Clear</button>
   </div>
  </section>)}
  </div>
 </div>;
}
