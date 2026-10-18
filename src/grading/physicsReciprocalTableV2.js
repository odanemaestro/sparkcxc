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
 const breakdown=expected.map(({key,volume,marks})=>{
  const value=validCells?parse(cells[key]):null;
  // Award candidate credit only for a value correctly rounded to its
  // submitted precision. A broad tolerance accepts wrong near-miss answers.
  const raw=validCells?cells[key]:null;
  const input=typeof raw==="number"?String(raw):typeof raw==="string"?raw.trim():"";
  const places=(input.split(".")[1]||"").length;
  const scaledExact=100/volume;
  const inverseExact=1/volume;
  const minInversePlaces=Number.isInteger(inverseExact*100)?2:3;
  const rounded=(number)=>Number(number.toFixed(places));
  const scaledMatch=places>=(Number.isInteger(scaledExact)?0:1)&&value===rounded(scaledExact);
  const inverseMatch=places>=minInversePlaces&&value===rounded(inverseExact);
  const match=value!==null&&places<=12&&(scaledMatch||inverseMatch);
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
