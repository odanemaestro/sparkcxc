import React from "react";

/**
 * These Paper 2 questions ask for a table, not an illustration.
 * Preserve the freehand pad as an option, but capture table headings,
 * rows and titles as structured evidence for later verified marking.
 * Empty cells are never prefilled from a model answer.
 */
const TEMPLATES=Object.freeze({
 "IS-M3-P2-05:0:0":{rows:4,columns:2},
 "IS-M2-P2-07:0:2":{rows:6,columns:3},
 "IS-M2-P2-13:1:0":{rows:3,columns:3},
 "IS-M3-P2-15:0:0":{rows:4,columns:2},
});

export function scienceDrawingTableTemplate(questionId,partIndex,itemIndex){
 return TEMPLATES[`${questionId}:${partIndex}:${itemIndex}`]||null;
}
export function readScienceDrawingTable(value,template){
 const fallback=()=>({
  title:"",
  headings:Array(template.columns).fill(""),
  rows:Array.from({length:template.rows},()=>Array(template.columns).fill("")),
 });
 if(!template)return null;
 try{
  const v=typeof value==="string"?JSON.parse(value):value;
  if(!v||!Array.isArray(v.headings)||!Array.isArray(v.rows))return fallback();
  return {
   title:typeof v.title==="string"?v.title:"",
   headings:Array.from({length:template.columns},(_,i)=>String(v.headings[i]??"")),
   rows:Array.from({length:template.rows},(_,i)=>Array.from({length:template.columns},(_,j)=>String(v.rows[i]?.[j]??""))),
  };
 }catch{return fallback();}
}
export default function ScienceDrawingTableResponse({base,questionId,partIndex,itemIndex,responses,onChange,disabled}){
 const template=scienceDrawingTableTemplate(questionId,partIndex,itemIndex);
 if(!template)return null;
 const value=readScienceDrawingTable(responses[`${base}:drawingTable`],template);
 const save=next=>onChange(`${base}:drawingTable`,JSON.stringify(next));
 const setHeading=(index,text)=>save({...value,headings:value.headings.map((v,i)=>i===index?text:v)});
 const setCell=(row,col,text)=>save({...value,rows:value.rows.map((r,i)=>i===row?r.map((v,j)=>j===col?text:v):r)});
 return (
  <section className="is-p2-drawing-table-builder" aria-label="Construct your results table">
   <p>Construct your table using the cells below. Enter your own title, headings and observations.</p>
   <label>
    <span>Table title</span>
    <input disabled={disabled} value={value.title}
     onChange={e=>save({...value,title:e.target.value})} placeholder="Write a suitable title"/>
   </label>
   <div style={{overflowX:"auto"}}>
    <table>
     <thead><tr>{value.headings.map((heading,i)=><th key={i}>
      <input disabled={disabled} value={heading} aria-label={`Column ${i+1} heading`}
       onChange={e=>setHeading(i,e.target.value)} placeholder={`Heading ${i+1}`}/>
     </th>)}</tr></thead>
     <tbody>{value.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>
      <input disabled={disabled} value={cell} aria-label={`Row ${i+1} column ${j+1}`}
       onChange={e=>setCell(i,j,e.target.value)} placeholder={`Row ${i+1}, cell ${j+1}`}/>
     </td>)}</tr>)}</tbody>
    </table>
   </div>
  </section>
 );
}
