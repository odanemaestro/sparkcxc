/**
 * Deterministic, source-bound CSEC Mathematics table-cell grading.
 *
 * Supports only the six audited E-J Q5(a) tables whose response schemas
 * already expose individual, labelled cells. Never derive marks from a
 * student's prose or an unordered number list.
 */
const OWN=Object.prototype.hasOwnProperty;
const GROUPS={
  p2e:[["m2","m3"],["m4","p2"],["p3","p4"]],
  p2f:[["c3"],["c4"]],
  p2g:[["m2","m3"],["m4","p2"],["p3","p4"]],
  p2h:[["c3"],["c4"]],
  p2i:[["m2","m3"],["m4","p2"],["p3","p4"]],
  p2j:[["c3"],["c4"]]
};
const numberPattern=/^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)$/;
const plainObject=x=>Boolean(x)&&typeof x==="object"&&!Array.isArray(x);
const stable=x=>Array.isArray(x)?x.map(stable):
  plainObject(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const same=(a,b)=>JSON.stringify(stable(a))===JSON.stringify(stable(b));
const parseNumber=v=>{
  if(typeof v!=="string"&&typeof v!=="number")return null;
  const s=String(v).trim();
  return s&&numberPattern.test(s)&&Number.isFinite(Number(s))?Number(s):null;
};

export function gradeOriginalMathematicsTable({criterionId,source,part,response}){
 const match=/^(p2[e-j])-q5::a$/.exec(criterionId);
 if(!match)return null;
 const group=GROUPS[match[1]];
 const schema=part?.responseSchema;
 if(!group||schema?.type!=="table"||schema.explicitCellMarks!==true||
    !Array.isArray(schema.rows)||!plainObject(response)||!plainObject(response.cells))
   return null;
 const rubric=Array.isArray(source?.criteria)?source.criteria:[];
 const original=Array.isArray(part.criteria)?part.criteria:[];
 if(rubric.length!==original.length||
    !same(rubric,original)||
    rubric.some(c=>c?.check?.type!=="manual-verification"||
      c?.kind!=="B"||c.provisional===true||c.reviewRequired===true))
   return null;
 const cells=schema.rows.flat().filter(cell=>plainObject(cell)&&
    typeof cell.key==="string"&&cell.answer!=null);
 const byKey=new Map(cells.map(cell=>[cell.key,cell]));
 if(cells.length!==byKey.size||group.flat().some(k=>!byKey.has(k))||
    group.some((g,i)=>rubric[i]?.marks!==1&&rubric[i]?.marks!==0)||
    rubric.reduce((n,c)=>n+c.marks,0)!==part.marks||
    group.length!==part.marks)return null;
 const entries=Object.entries(response.cells);
 // Unexpected or duplicate fields can never be used as marking evidence.
 if(entries.some(([k,v])=>!byKey.has(k)||
   (String(v??"").trim()!==""&&parseNumber(v)===null)))return null;
 const score=group.reduce((total,keys)=>
   total+Number(keys.every(key=>{
     const got=parseNumber(OWN.call(response.cells,key)?response.cells[key]:null);
     const expected=parseNumber(byKey.get(key).answer);
     return got!==null&&expected!==null&&Math.abs(got-expected)<=1e-8;
   })),0);
 return {marks:score,resolved:true,method:"source-labelled-mathematics-table-v1"};
}
