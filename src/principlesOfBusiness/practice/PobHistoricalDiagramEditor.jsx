import React, {useState} from "react";
import {getPobP2VisualTask} from "../data/pobHistoricalPaper2Visual";

// Keyboard-accessible diagram constructor. Its explicit nodes, links and
// labels make the student's visual work measurable using the SPARK rubric.
export default function PobHistoricalDiagramEditor({paperId,partKey,value,onChange,disabled=false}){
 const task=getPobP2VisualTask(paperId,partKey);
 if(!task)return null;
 const fields=value?.kind===task.kind&&value?.fields?value.fields:{};
 const [selected,setSelected]=useState("");
 const [dragged,setDragged]=useState("");
 const setField=(key,text)=>onChange({kind:task.kind,fields:{...fields,[key]:text}});
 const at=k=>fields[k]||"";
 const slots=Object.entries(task.fields).filter(([k])=>!["count","leftParent","rightParent","middleParent","bottomParent"].includes(k));
 const choices=[...new Set(slots.flatMap(([,f])=>f.choices.filter(Boolean)))];
 const place=(key,choice)=>{if(!disabled&&task.fields[key]?.choices.includes(choice)){setField(key,choice);setSelected("");setDragged("");}};

 const span=task.kind==="org-span";
 const branch=task.kind==="org-branch"||span,chain=task.kind==="org-chain";
 const node=(x,y,w,h,label,key)=>(
  <g key={key}>
   <rect x={x} y={y} width={w} height={h} rx="9" fill="#eff5ff" stroke="#31588f" strokeWidth="1.5"/>
   <text x={x+w/2} y={y+h/2} dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#172f56" textLength={Math.min((label||"Choose a position").length*6.4,w-16)} lengthAdjust="spacingAndGlyphs">
    {label||"Choose a position"}
   </text>
  </g>
 );
 const labels=branch?[
   node(175,10,170,48,span?"Marketing Manager":at("top"),"top"),
   node(30,145,210,48,at("left"),"left"),
   node(285,145,210,48,at("right"))
  ]:chain?[
   node(175,8,170,44,at("top"),"top"),
   node(175,93,170,44,at("middle"),"middle"),
   node(175,178,170,44,at("bottom"),"bottom")
  ]:null;
 const connector=(x1,y1,x2,y2,key)=>(
  <line key={key} x1={x1} y1={y1} x2={x2} y2={y2}
   stroke="#31588f" strokeWidth="2" markerEnd="url(#pobArrow)"/>
 );
 let paths=[];
 if(branch){
  if(span?!!at("left"):at("leftParent")==="Top position")paths.push(connector(230,58,130,145,"l"));
  if(span?!!at("right"):at("rightParent")==="Top position")paths.push(connector(290,58,390,145,"r"));
 }else if(chain){
  if(at("middleParent")==="Top position")paths.push(connector(260,52,260,93,"m"));
  if(at("bottomParent")==="Middle position")paths.push(connector(260,137,260,178,"b"));
 }
 const distribution=task.kind.startsWith("distribution")||task.kind==="command-path";
 const boxes=task.kind==="command-path"?["Consultant",at("step1"),at("step2"),at("step3"),at("step4")]:
  task.kind==="distribution"?[at("box1"),at("box2"),at("box3"),at("box4")]:
   [at("A"),"Wholesaler",at("B"),"Consumer"];
 const pitch=520/boxes.length;
 return <div className="pob-visual-editor" aria-label={task.title}>
  <h4>{task.title}</h4>
  <p>Complete the original diagram. SPARK marks each correct element.</p>
  <div className="pob-visual-workbench">
   <strong>Choose and place labels</strong>
   <p>Select a label, then select a diagram slot. On desktop, drag labels to slots. Use the precise controls below for connections.</p>
   <div className="pob-visual-bank" aria-label="Diagram label bank">
    {choices.map(choice=><button key={choice} type="button" draggable={!disabled} disabled={disabled}
      aria-pressed={selected===choice} className={selected===choice?"is-selected":""}
      onClick={()=>setSelected(selected===choice?"":choice)}
      onDragStart={e=>{setDragged(choice);e.dataTransfer?.setData("text/plain",choice);}}
      onDragEnd={()=>setDragged("")}>{choice}</button>)}
   </div>
   <div className="pob-visual-slots">
    {slots.map(([key,field])=><div className="pob-visual-slot" key={key}>
     <span>{field.label}</span>
     <div className="pob-visual-slot-actions">
      <button type="button" disabled={disabled} aria-label={"Place label in "+field.label}
       onClick={()=>place(key,selected)}
       onDragOver={e=>{if(!disabled)e.preventDefault();}}
       onDrop={e=>{e.preventDefault();place(key,dragged||e.dataTransfer?.getData("text/plain"));}}
       className="pob-visual-dropzone">{at(key)||"Place label here"}</button>
      {at(key)&&<button type="button" disabled={disabled} onClick={()=>setField(key,"")}
       aria-label={"Remove "+field.label}>Remove</button>}
     </div>
    </div>)}
   </div>
  </div>
  {span&&<fieldset className="pob-visual-connection" disabled={disabled}>
   <legend>Number of direct reports</legend>
   <div className="pob-visual-connection-options">
    {task.fields.count.choices.filter(Boolean).map(count=><button key={count} type="button"
     aria-pressed={at("count")===count} onClick={()=>setField("count",count)}>{count}</button>)}
   </div>
  </fieldset>}
  {Object.entries(task.fields).filter(([key])=>key.endsWith("Parent")).map(([key,field])=>
   <fieldset className="pob-visual-connection" key={key} disabled={disabled}>
    <legend>{field.label}</legend>
    <div className="pob-visual-connection-options">
     {field.choices.filter(Boolean).map(choice=><button type="button" key={choice}
      disabled={disabled} aria-pressed={at(key)===choice}
      onClick={()=>setField(key,at(key)===choice?"":choice)}>{choice}</button>)}
    </div>
   </fieldset>
  )}
  <details className="pob-visual-precise"><summary>Precise labels and reporting connections</summary>
  <div className="pob-visual-fields">
   {Object.entries(task.fields).map(([key,field])=><label key={key}>
    <span>{field.label}</span>
    <select aria-label={field.label} value={at(key)} disabled={disabled}
     onChange={event=>setField(key,event.target.value)}>
     {field.choices.map((choice,i)=><option key={i} value={choice}>{choice||"Select…"}</option>)}
    </select>
   </label>)}
  </div>
  </details>
  <div className="pob-visual-preview">
   <svg role="img" aria-label={"Your constructed "+(task.kind==="command-path"?"reporting path":distribution?"distribution chain":"organisational chart")}
    viewBox={distribution?"0 0 520 115":"0 0 520 235"} xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="pobArrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0 0 L6 3 L0 6" fill="none" stroke="#31588f" strokeWidth="1.3"/></marker></defs>
    {distribution?boxes.map((value,index)=>(
      <g key={index}>
       <rect x={5+index*pitch} y="23" width={pitch-12} height="58" rx="9" fill="#eff5ff" stroke="#31588f" strokeWidth="1.5"/>
       <text x={index*pitch+pitch/2} y="44" fontSize="11" fill="#172f56" textAnchor="middle">
        {task.kind==="distribution-missing"&&index===0?"A":task.kind==="distribution-missing"&&index===2?"B":"Link "+(index+1)}
       </text>
       <text x={index*pitch+pitch/2} y="63" fontSize="11" fill="#172f56" textAnchor="middle" textLength={Math.min((value||"?").length*5.6,pitch-20)} lengthAdjust="spacingAndGlyphs">{(value||"?").replace("Sales Supervisor","Sales Sup.")}</text>
       {index<boxes.length-1&&connector((index+1)*pitch-7,52,(index+1)*pitch+4,52,"arr"+index)}
      </g>
    )):<>{React.Children.toArray([...paths,...(labels||[])])}</>}
   </svg>
  </div>
 </div>;
}
