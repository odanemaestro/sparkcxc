import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q10_SOURCES_V2 as SOURCES,evaluateMathQ10V2 as grade} from "./mathMatricesVectorsV2";

const ids=Array.from({length:10},(_,i)=>"p2-q10-v"+(i+1));
const check=(id,partId,answer="",working="")=>
 grade({questionId:id,partId,response:{answer,working}});

describe.each(ids)("Q10 original learner-facing source %s",id=>{
 const question=PAPER2_QUESTION_BANK.find(p=>p.question_id===id);
 test("all original parts, amended marks and 12-mark total match the assembled bank",()=>{
  expect(question).toBeDefined();
  expect(question.question_number).toBe(10);
  expect(question.marks).toBe(12);
  expect(question.parts.map(p=>[p.id,p.marks])).toEqual(Object.entries(SOURCES[id].marks));
  expect(question.parts.reduce((n,p)=>n+p.marks,0)).toBe(12);
  for(const p of question.parts){
   const r=check(id,p.id);
   expect(r.sourcePart).toBe(id+"::"+p.id);
   expect(r.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(p.marks);
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(p.marks);
   expect(r.authority).toBe("advisory");
   expect(r.publishable).toBe(false);
  }
 });
 test("unsupported and conflicting answers cannot create marks",()=>{
  for(const p of question.parts){
   for(const answer of ["", "not sure", "wrong", "either 1 or 2", "Infinity"]){
    expect(check(id,p.id,answer).suggestedMarks).toBe(0);
   }
  }
 });
});
test("10 original Q10 templates account for 120 question marks",()=>{
 const questions=PAPER2_QUESTION_BANK.filter(q=>ids.includes(q.question_id));
 expect(questions).toHaveLength(10);
 expect(questions.reduce((n,q)=>n+q.marks,0)).toBe(120);
});
describe.each(["p2-q10-v1","p2-q10-v2","p2-q10-v3"])("source-calibrated matrix algebra %s",id=>{
 const s=SOURCES[id];
 const paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
 test("ordered matrix product with independent row-column method evidence",()=>{
  const answer="[["+s.product.slice(0,2).join(",")+"],["+s.product.slice(2).join(",")+"]]";
  expect(paper.parts.find(p=>p.id==="a").answer.replace(/\s/g,"")).toBe(answer);
  expect(check(id,"a",answer).criteria.map(c=>c.candidateMarks))
   .toEqual([null,null,1]);
  expect(check(id,"a",s.product.join(",")).suggestedMarks).toBe(1);
  expect(check(id,"a","["+s.product.slice().reverse().join(",")+"]").suggestedMarks).toBe(0);
 });
 test("source determinant and inverse leave unsupported method allocations unresolved",()=>{
  const det=check(id,"b",String(s.det));
  expect(det.suggestedMarks).toBe(1);
  expect(det.unresolvedMarks).toBe(s.marks.b-1);
  const adj=s.inverse;
  const inv="(1/"+s.det+")[["+adj.slice(0,2).join(",")+"],["+adj.slice(2).join(",")+"]]";
  expect(check(id,"c",inv).criteria.at(-1).candidateMarks).toBe(1);
  const divided="[["+adj.slice(0,2).map(x=>x+"/"+s.det).join(",")+"],["+
   adj.slice(2).map(x=>x+"/"+s.det).join(",")+"]]";
  expect(check(id,"c",divided).criteria.at(-1).candidateMarks).toBe(1);
  expect(check(id,"c","(1/"+s.det+")[["+adj.slice().reverse().join(",")+"]]")
   .suggestedMarks).toBe(0);
 });
 test("full matrix solution preserves independent x and y evidence",()=>{
  const answer="x = "+s.solution[0]+", y = "+s.solution[1];
  expect(paper.parts.find(p=>p.id==="d").answer).toBe(answer);
  const r=check(id,"d",answer);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1,1]);
  expect(r.publishable).toBe(false);
  expect(check(id,"d","(99, "+s.solution[1]+")").suggestedMarks).toBe(1);
  expect(check(id,"d","("+s.solution[0]+", 99)").suggestedMarks).toBe(1);
 });
});
test("Q10 v1 singular-matrix reasoning uses the reallocated b2 mark",()=>{
 const question=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q10-v1");
 expect(question.parts.find(p=>p.id==="b").marks).toBe(1);
 expect(question.parts.find(p=>p.id==="b2").marks).toBe(1);
 expect(check("p2-q10-v1","b2","M is not singular because its determinant is not zero")
  .criteria.map(c=>c.candidateMarks)).toEqual([1]);
 expect(check("p2-q10-v1","b2","M is singular because the determinant is zero")
  .suggestedMarks).toBe(0);
 expect(()=>check("p2-q10-v2","b2","not singular")).toThrow(/Uncalibrated/);
});
describe.each(["p2-q10-v4","p2-q10-v5"])("combined transformation %s",id=>{
 const s=SOURCES[id];
 test("rotation, enlargement factor and ordered matrix are separately evidenced",()=>{
  const xy="("+s.rotated.join(",")+")";
  expect(check(id,"a",xy).suggestedMarks).toBe(1);
  expect(check(id,"a","("+s.rotated.slice().reverse().join(",")+")").suggestedMarks).toBe(0);
  expect(check(id,"b",String(s.k)).suggestedMarks).toBe(1);
  const combined="[["+s.combined.slice(0,2).join(",")+"],["+
   s.combined.slice(2).join(",")+"]]";
  expect(check(id,"c",combined).criteria.at(-1).candidateMarks).toBe(1);
  expect(check(id,"c","[["+s.k+",0],[0,"+s.k+"]]").suggestedMarks).toBe(0);
 });
 test("determinant value and area scaling are two distinct candidates",()=>{
  const factor=String(s.areaFactor);
  expect(check(id,"d",factor).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1,null]);
  const both=check(id,"d",factor+"; areas are multiplied by "+factor);
  expect(both.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1]);
  expect(check(id,"d","areas are multiplied by "+factor).suggestedMarks).toBe(1);
  expect(check(id,"d","the determinant is zero, so areas are unchanged").suggestedMarks).toBe(0);
 });
});
describe.each(["p2-q10-v6","p2-q10-v7"])("source-corrected vector midpoint theorem %s",id=>{
 test("equivalent AB and half-vector expressions are recognised without wrong-sign marks",()=>{
  for(const answer of ["b-a","-a+b"]){
   expect(check(id,"a",answer).suggestedMarks).toBe(1);
  }
  for(const answer of ["(1/2)(b-a)","(b-a)/2","0.5(b-a)"]){
   expect(check(id,"b",answer).suggestedMarks).toBe(1);
  }
  expect(check(id,"a","a-b").suggestedMarks).toBe(0);
  expect(check(id,"b","(a-b)/2").suggestedMarks).toBe(0);
 });
 test("parallel relationship and half length need separate evidence",()=>{
  const r=check(id,"c","MN is parallel to AB and half the length of AB because MN is a scalar multiple of AB");
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(check(id,"c","MN is parallel to AB").suggestedMarks).toBe(1);
  expect(check(id,"c","MN is half the length of AB").suggestedMarks).toBe(1);
  expect(check(id,"c","MN is not parallel to AB").suggestedMarks).toBe(0);
 });
 test("AP, opposite sides and parallelogram conclusion respect source-C9",()=>{
  const full=check(id,"d","AP = b = OB, so AP and OB are equal and parallel, and OAPB is a parallelogram");
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1,1]);
  expect(full.publishable).toBe(false);
  const onlyFinal=check(id,"d","OAPB is a parallelogram");
  expect(onlyFinal.suggestedMarks).toBe(1);
  const methodOnly=check(id,"d","AP = b = OB");
  expect(methodOnly.suggestedMarks).toBe(3);
  expect(check(id,"d","OAPB is not a parallelogram").suggestedMarks).toBe(0);
 });
});
describe.each(["p2-q10-v8","p2-q10-v9","p2-q10-v10"])("source vectors and line division %s",id=>{
 const s=SOURCES[id],paper=PAPER2_QUESTION_BANK.find(x=>x.question_id===id);
 test("AB and OC coordinates are source-pinned ordered vectors",()=>{
  expect(paper.parts.find(x=>x.id==="a").answer).toBe("("+s.ab.join(", ")+")");
  expect(paper.parts.find(x=>x.id==="c").answer).toBe("("+s.c.join(", ")+")");
  expect(check(id,"a","("+s.ab.join(",")+")").suggestedMarks).toBe(1);
  expect(check(id,"c","("+s.c.join(",")+")").suggestedMarks).toBe(1);
  expect(check(id,"c","("+s.c.slice().reverse().join(",")+")").suggestedMarks)
   .toBe(s.c[0]===s.c[1]?1:0);
 });
 test("magnitude must be the published two-decimal final precision",()=>{
  const value=s.magnitude.toFixed(2);
  expect(paper.parts.find(p=>p.id==="b").answer).toBe(value);
  expect(check(id,"b",value).suggestedMarks).toBe(1);
  expect(check(id,"b",String(s.magnitude)).suggestedMarks)
   .toBe(value===String(s.magnitude)?0:0);
  expect(check(id,"b","99.99").suggestedMarks).toBe(0);
 });
 test("nonparallel answer and mathematical justification must be separate",()=>{
  expect(check(id,"d","not parallel").criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
  const full=check(id,"d","not parallel",s.cross[0]+"!="+s.cross[1]);
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(full.publishable).toBe(false);
  expect(check(id,"d","parallel").suggestedMarks).toBe(0);
 });
});
test("all other question and part identities fail closed",()=>{
 for(const [id,part] of [["p2-q10-v11","a"],["p2-q9-v1","a"],
  ["p2-q10-v2","b2"],["p2-q10-v5","e"],["p2-q10-v8","b2"]]){
  expect(()=>grade({questionId:id,partId:part})).toThrow(/Uncalibrated/);
 }
});
