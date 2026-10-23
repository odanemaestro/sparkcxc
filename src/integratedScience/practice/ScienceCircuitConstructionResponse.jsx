import React,{useRef,useState} from "react";

/**
 * Student-authored blank circuit editor. The student must select each symbol,
 * place it on the canvas and connect named A/B terminals. No prefilled netlist.
 */
const KINDS=[
 ["cell","Cell / supply"],["lamp","Lamp"],["test-gap","Test-material gap"],
 ["resistor","Resistor"],["ammeter","Ammeter"],["voltmeter","Voltmeter"],
 ["switch","Switch"],["fuse","Fuse"]
];
const nameOf=k=>KINDS.find(([id])=>id===k)?.[1]||k;
const empty=()=>({components:[],wires:[]});
export function readScienceCircuitDiagram(raw){
 try{
  const v=typeof raw==="string"?JSON.parse(raw):raw;
  if(!v||!Array.isArray(v.components)||!Array.isArray(v.wires))return empty();
  return {components:v.components.filter(c=>c&&KINDS.some(([k])=>k===c.kind)&&
   typeof c.id==="string"&&Number.isFinite(c.x)&&Number.isFinite(c.y)&&c.x>=0&&c.x<=1&&c.y>=0&&c.y<=1).slice(0,12),
   wires:v.wires.filter(w=>w&&typeof w==="object").slice(0,32)};
 }catch{return empty();}
}
const ports=c=>({a:[c.x-.065,c.y],b:[c.x+.065,c.y]});
function glyph(kind,x,y){
 const [cx,cy]=[x*640,y*330];
 if(kind==="cell")return <g>
  <line x1={cx-6} y1={cy-22} x2={cx-6} y2={cy+22} stroke="currentColor" strokeWidth="2.5"/>
  <line x1={cx+6} y1={cy-12} x2={cx+6} y2={cy+12} stroke="currentColor" strokeWidth="2.5"/>
 </g>;
 if(kind==="lamp")return <g>
  <circle cx={cx} cy={cy} r="17" stroke="currentColor" fill="none" strokeWidth="2.2"/>
  <path d={"M"+(cx-12)+" "+(cy-12)+" L"+(cx+12)+" "+(cy+12)+" M"+(cx+12)+" "+(cy-12)+" L"+(cx-12)+" "+(cy+12)}
   stroke="currentColor" strokeWidth="2"/>
 </g>;
 if(kind==="test-gap")return <g><circle cx={cx-12} cy={cy} r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
  <circle cx={cx+12} cy={cy} r="4" fill="none" stroke="currentColor" strokeWidth="2"/></g>;
 if(kind==="resistor"||kind==="fuse")return <g>
  <rect x={cx-19} y={cy-12} width="38" height="24" stroke="currentColor" strokeWidth="2" fill="none"/>
  {kind==="fuse"&&<line x1={cx-25} y1={cy} x2={cx+25} y2={cy} stroke="currentColor" strokeWidth="2"/>}
 </g>;
 if(kind==="ammeter"||kind==="voltmeter")return <g>
  <circle cx={cx} cy={cy} r="18" stroke="currentColor" strokeWidth="2" fill="none"/>
  <text x={cx} y={cy} fontSize="17" textAnchor="middle" dominantBaseline="middle" fill="currentColor">{kind==="ammeter"?"A":"V"}</text>
 </g>;
 return <g><line x1={cx-25} y1={cy} x2={cx-8} y2={cy} stroke="currentColor" strokeWidth="2"/>
  <line x1={cx-8} y1={cy} x2={cx+13} y2={cy-14} stroke="currentColor" strokeWidth="2"/>
  <line x1={cx+14} y1={cy} x2={cx+26} y2={cy} stroke="currentColor" strokeWidth="2"/></g>;
}
export default function ScienceCircuitConstructionResponse({base,responses,onChange,disabled}){
 const diagram=readScienceCircuitDiagram(responses[base+":circuitNetlist"]);
 const [kind,setKind]=useState("cell");
 const [from,setFrom]=useState(""),[to,setTo]=useState("");
 const sequence=useRef(0);
 const save=next=>onChange(base+":circuitNetlist",JSON.stringify(next));
 const place=event=>{
  if(event.target!==event.currentTarget&&event.target?.getAttribute?.("data-place-surface")!=="true")return;
  if(disabled||diagram.components.length>=12)return;
  const r=event.currentTarget.getBoundingClientRect();
  if(!r.width||!r.height||!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return;
  const x=Number(Math.max(.1,Math.min(.9,(event.clientX-r.left)/r.width)).toFixed(4));
  const y=Number(Math.max(.1,Math.min(.9,(event.clientY-r.top)/r.height)).toFixed(4));
  sequence.current+=1;
  const id="component-"+Date.now().toString(36)+"-"+sequence.current;
  save({...diagram,components:[...diagram.components,{id,kind,x,y}]});
 };
 const terminals=diagram.components.flatMap(c=>["a","b"].map(p=>({
  id:c.id+":"+p,label:nameOf(c.kind)+" "+c.id.slice(-3)+" terminal "+p
 })));
 const addWire=()=>{
  if(disabled||!from||!to||from===to)return;
  const [source,sourcePort]=from.split(":"),[target,targetPort]=to.split(":");
  if(source===target||!diagram.components.some(c=>c.id===source)||!diagram.components.some(c=>c.id===target))return;
  if(diagram.wires.some(w=>(w.from===source&&w.fromPort===sourcePort&&w.to===target&&w.toPort===targetPort)||
    (w.to===source&&w.toPort===sourcePort&&w.from===target&&w.fromPort===targetPort)))return;
  save({...diagram,wires:[...diagram.wires,{from:source,fromPort:sourcePort,to:target,toPort:targetPort}]});
  setFrom("");setTo("");
 };
 const byId=new Map(diagram.components.map(c=>[c.id,c]));
 const wirePoints=w=>{
  const a=byId.get(w.from),b=byId.get(w.to);
  if(!a||!b)return null;
  return [ports(a)[w.fromPort],ports(b)[w.toPort]];
 };
 return <div className="is-p2-netlist-editor">
  <p>Select a circuit symbol and tap on the blank diagram to place it. Add your own wires between terminal A and B of each symbol. The connections, not just the names of symbols, are graded.</p>
  <div className="is-p2-netlist-tools">
   <label>Symbol to place
    <select disabled={disabled} value={kind} onChange={e=>setKind(e.target.value)}>
     {KINDS.map(([value,label])=><option key={value} value={value}>{label}</option>)}
    </select>
   </label>
   <span>{diagram.components.length} components · {diagram.wires.length} wires</span>
  </div>
  <svg viewBox="0 0 640 330" role="img" aria-label="Blank circuit construction canvas"
   onPointerDown={place} className="is-p2-netlist-canvas"
   style={{width:"100%",maxWidth:"780px",touchAction:"none",cursor:disabled?"default":"crosshair"}}>
   <rect data-place-surface="true" x="1" y="1" width="638" height="328" fill="none" stroke="currentColor" opacity=".4"/>
   {diagram.wires.map((w,i)=>{
    const pts=wirePoints(w);return !pts?null:<line key={"wire-"+i}
     x1={pts[0][0]*640} y1={pts[0][1]*330} x2={pts[1][0]*640} y2={pts[1][1]*330}
     stroke="currentColor" strokeWidth="2.4"/>;
   })}
   {diagram.components.map(c=><g key={c.id}>
    {glyph(c.kind,c.x,c.y)}
    {["a","b"].map(p=><circle key={p} cx={ports(c)[p][0]*640} cy={ports(c)[p][1]*330}
     r="4.5" fill="currentColor"/>)}
    <text x={c.x*640} y={c.y*330+39} textAnchor="middle" fontSize="12" fill="currentColor">{nameOf(c.kind)}</text>
   </g>)}
  </svg>
  <div className="is-p2-netlist-connections">
   <label>Wire from
    <select disabled={disabled} value={from} onChange={e=>setFrom(e.target.value)}>
     <option value="">Select starting terminal</option>
     {terminals.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
    </select>
   </label>
   <label>Wire to
    <select disabled={disabled} value={to} onChange={e=>setTo(e.target.value)}>
     <option value="">Select ending terminal</option>
     {terminals.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
    </select>
   </label>
   <button className="is-exam-secondary" type="button" disabled={disabled||!from||!to} onClick={addWire}>Connect terminals</button>
  </div>
  {!disabled&&<div className="is-p2-drawing-actions">
   <button className="is-exam-secondary" type="button" disabled={!diagram.wires.length}
    onClick={()=>save({...diagram,wires:diagram.wires.slice(0,-1)})}>Undo wire</button>
   <button className="is-exam-secondary" type="button" disabled={!diagram.components.length}
    onClick={()=>{const list=diagram.components.slice(0,-1);save({components:list,
     wires:diagram.wires.filter(w=>list.some(c=>c.id===w.from)&&list.some(c=>c.id===w.to))});setFrom("");setTo("");}}>Undo component</button>
   <button className="is-exam-secondary" type="button" disabled={!diagram.components.length&&!diagram.wires.length}
    onClick={()=>{save(empty());setFrom("");setTo("");}}>Clear diagram</button>
  </div>}
 </div>;
}
