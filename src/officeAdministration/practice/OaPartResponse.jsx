import OaResponseDiagram,{oaDiagramFieldLabel} from './OaResponseDiagram';
import React from 'react';
import {oaFormValues,oaFormResponse} from './oaResponses';
const editable=(table,row,col)=>table.editable?.some(([r,c])=>r===row&&c===col);
export function oaResponseTableLabel(table,row,col){return `${table.title} · ${table.rowLabels?.[row]||`Row ${row+1}`} · ${table.columnLabels?.[col]||table.columns[col]}`;}
export function oaPartResponseFields(part){return [...(part.fields||[]),...(part.responseDiagram?.nodes||[]).filter(node=>node.fixed===undefined).map(node=>({label:oaDiagramFieldLabel(part.responseDiagram,node),kind:'text'})),...(part.responseTables||[]).flatMap(table=>table.rows.flatMap((row,r)=>row.flatMap((_,c)=>editable(table,r,c)?[{label:oaResponseTableLabel(table,r,c),kind:table.numeric?'numeric':'text'}]:[])))];}
export default function OaPartResponse({part,value,onChange,review,busy,labelId}){
 const fields=oaPartResponseFields(part),values=oaFormValues(value,fields);
 const change=(label,next)=>onChange(oaFormResponse({...values,[label]:next},fields));
 if(!fields.length)return <textarea aria-labelledby={labelId} rows={part.answerType==='document'?10:5} value={value} readOnly={review} disabled={busy} onChange={e=>onChange(e.target.value)}/>;
 const fieldNode=field=>field.kind==='checkbox'?<label key={field.label} className="oa-document-checkbox"><input type="checkbox" checked={values[field.label]==='Yes'} disabled={review||busy} onChange={e=>change(field.label,e.target.checked?'Yes':'')}/><span>{field.label}</span></label>:<label key={field.label}><span>{field.label}{field.unit?` (${field.unit})`:''}</span><textarea rows={field.rows||(field.kind==='numeric'?2:3)} inputMode={field.kind==='numeric'?'decimal':undefined} value={values[field.label]||''} readOnly={review} disabled={busy} onChange={e=>change(field.label,e.target.value)}/></label>;
 return <fieldset className={`oa-document-fields${part.fieldLayout==='stacked'?' oa-document-stacked':''}`} aria-labelledby={labelId}>
 <legend>{part.documentTitle||'Complete the document'}</legend>
 {(part.fields||[]).filter(f=>f.position!=='after').map(fieldNode)}
 {(part.responseTables||[]).map(table=><div className="oa-data-table oa-response-table" key={table.title} tabIndex={0} role="region" aria-label={table.title}><table style={{minWidth:Math.max(280,table.columns.length*120)}}><caption>{table.title}</caption><thead><tr>{table.columns.map((column,i)=><th key={i} scope="col">{column}</th>)}</tr></thead><tbody>{table.rows.map((row,r)=><tr key={r}>{row.map((cell,c)=>{
 const covered=table.merges?.some(m=>r>=m.row&&r<m.row+(m.rowSpan||1)&&c>=m.col&&c<m.col+(m.colSpan||1)&&(r!==m.row||c!==m.col));if(covered)return null;
 const merge=table.merges?.find(m=>m.row===r&&m.col===c);
 return <td key={c} rowSpan={merge?.rowSpan} colSpan={merge?.colSpan} style={merge?.align?{textAlign:merge.align}:undefined}>{editable(table,r,c)?<>{table.preserveGiven?.some(([row,col])=>row===r&&col===c)&&cell}<textarea aria-label={oaResponseTableLabel(table,r,c)} inputMode={table.numeric?'decimal':undefined} rows={table.inputRows?.[r]||2} value={values[oaResponseTableLabel(table,r,c)]||''} readOnly={review} disabled={busy} onChange={e=>change(oaResponseTableLabel(table,r,c),e.target.value)}/></>:cell}</td>;
 })}</tr>)}</tbody></table>{table.details?.map((detail,i)=><p key={i}>{detail}</p>)}</div>)}
 {part.responseDiagram&&<OaResponseDiagram diagram={part.responseDiagram} values={values} onChange={change} review={review} busy={busy}/>}
 {(part.fields||[]).filter(f=>f.position==='after').map(fieldNode)}
 </fieldset>;
}
