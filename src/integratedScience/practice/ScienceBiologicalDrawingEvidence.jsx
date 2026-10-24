import React,{useRef,useState} from "react";

/**
 * Independent student-authored annotation evidence for biological drawings.
 * No labels, marks, points or visual judgments are prefilled or certified.
 */
const SOURCES={
 "IS-M1-P2-21:1:0":{
  title:"Stoma and guard cells",
  names:["guard cell","stoma","chloroplast","nucleus"],
  dimension:"width"
 },
 "IS-M1-P2-27:0:0":{
  title:"Longitudinal flower section",
  names:["petal","sepal","anther","filament","stigma","style","ovary","ovule","receptacle"],
  dimension:"height"
 }
};
const normalizePoint=(p)=>Array.isArray(p)&&p.length===2&&p.every(n=>typeof n==="number"&&Number.isFinite(n)&&n>=0&&n<=1);
export function biologicalDrawingSource(questionId,partIndex,itemIndex){
 return SOURCES[questionId+":"+partIndex+":"+itemIndex]||null;
}
export function readBiologicalDrawingEvidence(raw,source){
 const blank={title:"",labels:[],measurementMm:""};
 if(!source)return blank;
 let data=raw;
 try{if(typeof raw==="string")data=JSON.parse(raw);}catch{return blank;}
 if(!data||typeof data!=="object")return blank;
 return {
  title:typeof data.title==="string"?data.title.slice(0,160):"",
  measurementMm:typeof data.measurementMm==="string"?data.measurementMm.slice(0,20):"",
  // Preserve the student's incorrect terms as assessment evidence.
  // Filtering them out would silently erase wrong answers before marking.
  labels:Array.isArray(data.labels)?data.labels.filter(l=>l&&typeof l.name==="string"&&
   /^[A-Za-z][A-Za-z0-9 ()-]{0,44}$/.test(l.name.trim())&&
   normalizePoint(l.from)&&normalizePoint(l.to)).slice(0,18)
   .map(l=>({...l,name:l.name.trim()})):[]
 };
}
function locate(event){
 const box=event.currentTarget.getBoundingClientRect();
 if(box.width<=0||box.height<=0||!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return null;
 return [Number(Math.max(0,Math.min(1,(event.clientX-box.left)/box.width)).toFixed(4)),
  Number(Math.max(0,Math.min(1,(event.clientY-box.top)/box.height)).toFixed(4))];
}
export default function ScienceBiologicalDrawingEvidence({base,questionId,partIndex,itemIndex,responses,onChange,disabled,sharedCanvas=false,selectedLabel="",onLabelChange}){
 const source=biologicalDrawingSource(questionId,partIndex,itemIndex);
 const [name,setName]=useState("");
 const start=useRef(null);
 if(!source)return null;
 const evidence=readBiologicalDrawingEvidence(responses[base+":biologicalEvidence"],source);
 const save=value=>onChange(base+":biologicalEvidence",JSON.stringify(value));
 const down=e=>{if(disabled)return;start.current=locate(e);e.currentTarget.setPointerCapture?.(e.pointerId);};
 const up=e=>{
  const from=start.current;start.current=null;
  if(disabled||!from||!name)return;
  const to=locate(e);
  if(!to||Math.hypot(from[0]-to[0],from[1]-to[1])<.035||evidence.labels.length>=18)return;
  save({...evidence,labels:[...evidence.labels,{name,from,to}]});
 };
 return <section className="is-p2-biological-evidence" aria-label={source.title+" annotation evidence"}>
  <p>Draw your specimen in the shared drawing area, then select a label and draw its leader line on that same diagram. Label positions and measurements require verification before marks can be awarded.</p>
  <label>Diagram title
   <input disabled={disabled} value={evidence.title} placeholder="Write your own diagram title"
    onChange={e=>save({...evidence,title:e.target.value})}/>
  </label>
  <label>Label to place
   <input type="text" disabled={disabled} value={name} maxLength={45}
    placeholder="Write a structure name" onChange={e=>setName(e.target.value)}
    autoComplete="off" />
  </label>
  {!sharedCanvas&&<svg className="is-p2-biological-annotation-canvas" viewBox="0 0 640 320" role="img"
   aria-label="Student placed biological label lines" onPointerDown={down} onPointerUp={up}
   onPointerCancel={()=>{start.current=null;}}
   style={{width:"100%",maxWidth:"720px",touchAction:"none",cursor:disabled?"default":"crosshair"}}>
   <rect x="1" y="1" width="638" height="318" stroke="currentColor" opacity=".35" fill="none"/>
   {evidence.labels.map((l,i)=><g key={i}>
    <line x1={l.from[0]*640} y1={l.from[1]*320} x2={l.to[0]*640} y2={l.to[1]*320}
     stroke="currentColor" strokeWidth="1.6"/>
    <text x={l.from[0]*640} y={l.from[1]*320-6} fontSize="14"
     textAnchor="middle" fill="currentColor">{l.name}</text>
   </g>)}
  </svg>}
  <label>Measured {source.dimension} of your own drawing (mm)
   <input disabled={disabled} value={evidence.measurementMm} inputMode="decimal"
    placeholder="Your measured value, in mm" onChange={e=>save({...evidence,measurementMm:e.target.value})}/>
  </label>
  {sharedCanvas&&<p>Use the **Draw** and **Label line** controls directly beneath the common diagram to switch tools.</p>}
  {!disabled&&<button type="button" className="is-exam-secondary" disabled={!evidence.labels.length}
   onClick={()=>save({...evidence,labels:evidence.labels.slice(0,-1)})}>Undo label line</button>}
 </section>;
}
