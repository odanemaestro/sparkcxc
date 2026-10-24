/** Original Mathematics table evidence. Groups track exact source mark allocations.
 * A group earns its mark only when all source-labelled cells in that group
 * have correct finite numeric values. No marks from unkeyed prose or shuffled numbers.
 */
export const RESIDUAL_ORIGINAL_TABLE_GROUPS=Object.freeze({
 "p2-q5-v1::c":[["cf1"],["cf2"],["cf3"]],
 "p2-q7-v1::a":[["r3c1","r3c2"],["r3c3"]],
 "p2-q4-v10::a":[["f0","f1"],["f2","f3"],["f4"]],
 "p2-q5-v10::c":[["cf0","cf1"],["cf2","cf3"],["cf4"]],
 "p2-q5-v2::c":[["cf1","cf2"],["cf3"],["cf4"]],
 "p2-q7-v2::a":[["r3c1"],["r3c2","r3c3"]],
 "p2-q5-v3::c":[["cf0","cf1"],["cf2","cf3"],["cf4"]],
 "p2-q7-v3::a":[["r3c1","r3c2"],["r3c3"]],
 "p2-q5-v4::a":[["cf1","cf2"],["cf3","cf4"]],
 "p2-q7-v4::a":[["r3c1","r3c2"],["r3c3"]],
 "p2-q8-v4::a":[["r0c2"],["r0c4"],["r0c7"]],
 "p2-q5-v5::a":[["cf1","cf2","cf3"],["cf4","cf5"]],
 "p2-q7-v5::a":[["r3c1","r3c2"],["r3c3"]],
 "p2-q8-v5::a":[["r0c2"],["r0c4"],["r0c9"]],
 "p2-q4-v9::a":[["f0","f1"],["f2","f3"],["f4"]]
});
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const validNumeric=v=>(typeof v==="string"||typeof v==="number")&&
 /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(String(v).trim())&&
 Number.isFinite(Number(v));
export function gradeOriginalMathResidualTable48({criterionId,source,part,response}){
 const groups=RESIDUAL_ORIGINAL_TABLE_GROUPS[criterionId];
 if(!groups)return null;
 const schema=part?.responseSchema;
 const checks=source?.criteria;
 if(schema?.type!=="table"||!Array.isArray(schema.rows)||
  !Array.isArray(checks)||checks.length!==groups.length||
  groups.length!==part.marks||checks.some(c=>c.marks!==1))return null;
 const cells=schema.rows.flat().filter(c=>obj(c)&&c.key&&c.answer!==undefined);
 const sourceCells=new Map(cells.map(c=>[c.key,c.answer]));
 if(sourceCells.size!==cells.length||groups.flat().some(k=>!sourceCells.has(k))||
  groups.flat().some((k,i,a)=>a.indexOf(k)!==i))return null;
 const method="source-original-keyed-table-48-v1";
 if(!obj(response)||!obj(response.cells)||
  Object.keys(response).some(k=>k!=="cells"))
  return {marks:0,resolved:false,method:method+"-unstructured"};
 if(Object.entries(response.cells).some(([key,value])=>
  !sourceCells.has(key)||!validNumeric(value)&&String(value??"").trim()!==""))
  return {marks:0,resolved:false,method:method+"-unexpected-cell"};
 const same=k=>Object.prototype.hasOwnProperty.call(response.cells,k)&&
  validNumeric(response.cells[k])&&
  Number(response.cells[k])===Number(sourceCells.get(k));
 const score=groups.reduce((a,keys)=>a+Number(keys.every(same)),0);
 return {marks:score,resolved:true,method};
}
