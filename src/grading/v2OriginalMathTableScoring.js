/**
 * Deterministic, source-bound CSEC Mathematics table-cell grading.
 *
 * Supports only the six audited E-J Q5(a) tables whose response schemas
 * already expose individual, labelled cells. Never derive marks from a
 * student's prose or an unordered number list.
 */
import {check} from "../practice/cxcMarking/checkers";
const OWN=Object.prototype.hasOwnProperty;
const GROUPS={
 "p2e-q5":[["m2","m3"],["m4","p2"],["p3","p4"]],
 "p2f-q5":[["c3"],["c4"]],
 "p2g-q5":[["m2","m3"],["m4","p2"],["p3","p4"]],
 "p2h-q5":[["c3"],["c4"]],
 "p2i-q5":[["m2","m3"],["m4","p2"],["p3","p4"]],
 "p2j-q5":[["c3"],["c4"]],
 "p2e-q7":[["d4"],["d5"],["d10"],["dn"]],
 "p2f-q7":[["q4"],["r4"],["q10"],["r10"]],
 "p2g-q7":[["d4"],["d5"],["d10"],["dn"]],
 "p2h-q7":[["q4"],["r4"],["q10"],["r10"]],
 "p2i-q7":[["d4"],["d5"],["d10"],["dn"]],
 "p2j-q7":[["q4"],["r4"],["q10"],["r10"]],
 "p2e-q8":[["y2"],["y4"]],
 "p2g-q8":[["y2"],["y6"]],
 "p2i-q8":[["y2"],["y4"]]
};
const numberPattern=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;
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
 const match=/^(p2[e-j]-q(?:5|7|8))::a$/.exec(criterionId);
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
 const validCell=(key,value)=>{
   if(String(value??"").trim()==="")return true;
   if(key==="dn"){
     const expr=String(value??"").trim();
     return expr.length<=96&&/^[A-Za-z0-9+\\-*/^().\\s]+$/.test(expr)&&
       !/\\b(?:or|either)\\b/i.test(expr);
   }
   return parseNumber(value)!==null;
 };
 const correctCell=(key)=>{
   const submitted=OWN.call(response.cells,key)?response.cells[key]:null;
   const expected=byKey.get(key).answer;
   if(key==="dn")return validCell(key,submitted)&&
     check(submitted,{type:"expression",value:String(expected)}).ok===true;
   const got=parseNumber(submitted),want=parseNumber(expected);
   return got!==null&&want!==null&&Math.abs(got-want)<=1e-8;
 };
 const entries=Object.entries(response.cells);
 // Unexpected or malformed fields must not be certified by the source grader.
 if(entries.some(([key,value])=>!byKey.has(key)||!validCell(key,value)))return null;
 const score=group.reduce((total,keys)=>
   total+Number(keys.every(correctCell)),0);
 return {marks:score,resolved:true,method:"source-labelled-mathematics-table-v1"};
}
