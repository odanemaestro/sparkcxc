/**
 * Advisory checker for Physics practice 1, Question 1(a).
 * Uses source-authored table rows and rounding allowances. Never publishes marks.
 */
const expected=Object.freeze([
 {key:"1:2",volume:12,scaled:8.333333333,marks:2},
 {key:"3:2",volume:20,scaled:5,marks:2},
 {key:"5:2",volume:30,scaled:3.333333333,marks:1}
]);
const parse=value=>{
 if(typeof value==="number")return Number.isFinite(value)?value:null;
 if(typeof value!=="string")return null;
 const s=value.trim().replace(/,/g,"");
 if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;
 const n=Number(s);return Number.isFinite(n)?n:null;
};
export function evaluatePhysicsReciprocalTable({response,working=""}={}){
 const cells=response?.table;
 const validCells=cells&&typeof cells==="object"&&!Array.isArray(cells);
 const breakdown=expected.map(({key,volume,scaled,marks})=>{
  const value=validCells?parse(cells[key]):null;
  const tol=0.055; // Source specifically allows one-decimal rounding.
  const match=value!==null&&(
   Math.abs(value-scaled)<=tol ||
   Math.abs(value-1/volume)<=0.00055
  );
  return {key,maxMarks:marks,candidateMarks:match?marks:null,
   status:match?"candidate-correct":"unresolved"};
 });
 const method=/\b1\s*\/\s*(?:12(?:\.0)?|20(?:\.0)?|30(?:\.0)?)\b/.test(String(working));
 return {authority:"advisory",publishable:false,
  criteria:[{key:"M1",maxMarks:1,candidateMarks:method?1:null,status:method?"candidate-correct":"unresolved"},...breakdown],
  suggestedMarks:(method?1:0)+breakdown.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
  // Missing or malformed cells do not imply a denial.
  unresolvedMarks:(method?0:1)+breakdown.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)
 };
}
