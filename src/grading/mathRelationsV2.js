/**
 * Source-calibrated, advisory checking of SPARK Mathematics Paper 2 Q4
 * relation tables, finite-domain range, outside-domain preimages and
 * one-to-one explanations (originals p2-q4-v9 and p2-q4-v10).
 *
 * The authored paper supplies 3/2/2/2 marks. Only the one-to-one B1/B2
 * explanation split is authored atomically; the other criterion splits are
 * proposed from the worked solutions and never publishable.
 */
const SOURCES=Object.freeze({
 "p2-q4-v9":Object.freeze({
  domain:Object.freeze([-2,-1,0,1,2]),
  outputs:Object.freeze([-5,-3,-1,1,3]),outside:5
 }),
 "p2-q4-v10":Object.freeze({
  domain:Object.freeze([-1,0,1,2,3]),
  outputs:Object.freeze([7,4,1,-2,-5]),outside:5
 })
});
const input=value=>typeof value==="string"?value:typeof value==="number"&&Number.isFinite(value)?String(value):"";
const normalize=s=>input(s).trim().replace(/[−–—]/g,"-").replace(/\r\n/g,"\n");
const currentAnswer=r=>r&&typeof r==="object"&&!Array.isArray(r)?input(r.answer):input(r);
const numberRx=/^[+-]?\d+$/;
const number=s=>{
 const value=normalize(s);
 if(!numberRx.test(value))return null;
 const n=Number(value);
 return Number.isSafeInteger(n)&&Math.abs(n)<=1000000?n:null;
};
const sourceMark=(id,ok,reason)=>({
 id,maxMarks:1,candidateMarks:ok?1:null,
 status:ok?"candidate-correct":"unresolved",
 reason:ok?reason:"insufficient-source-evidence"
});
const result=(questionId,partId,criteria,authored=false)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:authored?"authored":"proposed-from-worked-solution",
 criteria,
 suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?c.maxMarks:0),0)
});
const ambiguous=s=>/\b(?:or|either|maybe|perhaps)\b/i.test(s);
function orderedTable(raw,source){
 const s=normalize(raw);
 if(!s||s.length>1000||ambiguous(s))return null;
 const answer=s.replace(/^(?:table|values|f\(x\))\s*(?:is|=|:)\s*/i,"").trim();
 // A complete ordered row is unambiguous only when all five positions
 // are supplied. Bare shorter rows cannot prove which input each value fits.
 const rawRow=answer.replace(/^\[/,"").replace(/\]$/,"").trim();
 const cells=rawRow.split(/[\s,;]+/).filter(Boolean);
 if(cells.length===source.domain.length&&cells.every(v=>number(v)!==null))
  return source.domain.map((x,i)=>({x,y:number(cells[i])}));
 // Labelled mapping entries can be incomplete, but each entry has to
 // identify a unique source input and contain no unparsed stray characters.
 const lines=answer.split(/[;\n,]+/).map(s=>s.trim()).filter(Boolean);
 const matches=lines.map(s=>/^f\s*\(\s*([+-]?\d+)\s*\)\s*=\s*([+-]?\d+)$/i.exec(s));
 if(matches.length===0||matches.some(m=>!m))return null;
 const map=new Map();
 for(const match of matches){
  const x=number(match[1]),y=number(match[2]);
  if(x===null||y===null||map.has(x)||!source.domain.includes(x))return null;
  map.set(x,y);
 }
 return [...map].map(([x,y])=>({x,y}));
}
function parseRange(raw){
 const s=normalize(raw);
 if(!s||s.length>1000||ambiguous(s))return null;
 let cleaned=s.replace(/^(?:the\s+)?range(?:\s+of\s+f)?\s*(?:is|=|:)\s*/i,"").trim();
 if(cleaned.startsWith("{")!==cleaned.endsWith("}"))return null;
 if(cleaned.startsWith("{"))cleaned=cleaned.slice(1,-1).trim();
 const pieces=cleaned.split(/[\s,;]+/).filter(Boolean);
 if(pieces.length===0||pieces.length>25||pieces.some(v=>number(v)===null))return null;
 const values=pieces.map(number);
 if(new Set(values).size!==values.length)return null;
 return values;
}
function outsideDomainAnswer(raw,source){
 const s=normalize(raw);
 if(!s||s.length>1000||ambiguous(s))return {value:false,excluded:false};
 const xRegex=/\bx\s*=\s*([+-]?\d+)\b/gi;
 const xs=[...s.matchAll(xRegex)];
 const direct=/^\s*([+-]?\d+)(?=$|[,;\n\s])/.exec(s);
 const x=xs.length===1?number(xs[0][1]):xs.length===0&&direct?number(direct[1]):null;
 const correct=x===source.outside;
 const rejected=/\b(?:not\s+(?:in|within|a\s+member\s+of)(?:\s+the)?\s+(?:given\s+)?domain|outside\s+(?:the\s+)?(?:given\s+)?domain|excluded\s+from\s+(?:the\s+)?domain)\b/i.test(s)
  ||/(?:5\s*∉\s*(?:d|domain))/i.test(s);
 const conflicting=/\b(?:is|it's|it\s+is)\s+in\s+(?:the\s+)?(?:given\s+)?domain\b/i.test(s)
  ||/\b(?:inside|belongs\s+to)\s+(?:the\s+)?(?:given\s+)?domain\b/i.test(s);
 return {value:correct,excluded:rejected&&!conflicting};
}
function oneToOne(raw){
 const s=normalize(raw).toLowerCase().replace(/\s+/g," ");
 if(!s||s.length>1500)return {statement:false,reason:false};
 const disputed=/\b(?:not|no|isn't|is not|never)\s+(?:a\s+)?(?:one[- ]to[- ]one|1[- ]to[- ]1)\b/.test(s)
  ||/\bmany[- ]to[- ]one\b/.test(s)
  ||/\b(?:is not|isn't|not)\s+injective\b/.test(s);
 const affirmed=/^(?:yes|true)(?:[\s,.]|$)/.test(s)
  ||/\bone[- ]to[- ]one\b/.test(s)
  ||/\b1[- ]to[- ]1\b/.test(s)
  ||/\binjective\b/.test(s);
 const contradictory=/\b(?:two\s+(?:different|distinct)\s+inputs?\s+(?:have|give|map\s+to)\s+(?:the\s+)?same\s+output|outputs?\s+(?:are|is)\s+repeated|same\s+output\s+for\s+different\s+inputs)\b/.test(s);
 const validReason=/\b(?:different|distinct|unique)\s+(?:output|range\s+value|image|value)\b/.test(s)
  ||/\b(?:different|distinct)\s+(?:inputs?|x[- ]values?).{0,55}\b(?:different|distinct|unique)\s+(?:outputs?|y[- ]values?|range\s+values?)\b/.test(s)
  ||/\bno\s+two\s+(?:different\s+)?(?:inputs?|domain\s+(?:values?|members?|elements?)|x[- ]values?).{0,65}\b(?:same\s+(?:output|image|value)|one\s+(?:output|image|value))\b/.test(s)
  ||/\b(?:non[- ]zero|not\s+zero|nonzero)\s+(?:gradient|slope)\b/.test(s)
  ||/\b(?:gradient|slope)\s+(?:is\s+)?(?:non[- ]zero|not\s+zero|nonzero)\b/.test(s)
  ||/\b(?:output|image|range\s+value)s?\s+(?:are\s+)?(?:all\s+)?(?:different|distinct|unique|not\s+repeated)\b/.test(s)
  ||/\b(?:no\s+)?(?:repeated|duplicate)\s+(?:outputs?|values?)\b/.test(s);
 return {statement:affirmed&&!disputed&&!contradictory,
  reason:validReason&&!disputed&&!contradictory};
}
export function evaluateMathRelationsV2({questionId,partId,response={}}={}){
 const source=SOURCES[questionId];
 if(!source||!["a","b","c","d"].includes(partId))
  throw new TypeError("Unsupported source-calibrated Mathematics relation question");
 const submitted=currentAnswer(response);
 if(partId==="a"){
  const entries=orderedTable(submitted,source);
  const table=new Map((entries||[]).map(e=>[e.x,e.y]));
  const valid=source.domain.map((x,i)=>table.has(x)&&table.get(x)===source.outputs[i]);
  return result(questionId,partId,[
   sourceMark("B1",valid[0]&&valid[1],"first-two-table-evaluations"),
   sourceMark("B2",valid[2]&&valid[3],"middle-two-table-evaluations"),
   sourceMark("B3",valid[4],"final-table-evaluation")
  ]);
 }
 if(partId==="b"){
  const range=parseRange(submitted),actual=source.outputs;
  const correct=range===null?[]:range.filter(v=>actual.includes(v));
  const partial=range!==null&&range.every(v=>actual.includes(v))&&correct.length>=3;
  const complete=range!==null&&range.length===actual.length&&correct.length===actual.length;
  return result(questionId,partId,[
   sourceMark("B1",partial,"three-or-more-valid-distinct-range-members"),
   sourceMark("B2",complete,"complete-range-set-without-extras")
  ]);
 }
 if(partId==="c"){
  const check=outsideDomainAnswer(submitted,source);
  return result(questionId,partId,[
   sourceMark("B1",check.value,"correct-preimage-x-value"),
   sourceMark("B2",check.excluded,"outside-given-finite-domain")
  ]);
 }
 const answer=oneToOne(submitted);
 return result(questionId,partId,[
  sourceMark("B1",answer.statement,"one-to-one-claim"),
  sourceMark("B2",answer.reason,"distinct-outputs-or-nonzero-gradient-reason")
 ],true);
}
