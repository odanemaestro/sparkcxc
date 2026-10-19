import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q8_SOURCES_V2 as SOURCES,evaluateMathQ8V2 as grade} from "./mathQuestion8V2";

const ids=Array.from({length:10},(_,i)=>"p2-q8-v"+(i+1));
const check=(id,partId,answer="",working="")=>grade({
 questionId:id,partId,response:{answer,working}
});
describe.each(ids)("Q8 source-anchored advisory inventory %s",id=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
 test("preserves every assembled question part and its mark allocation",()=>{
  expect(q).toBeDefined();
  expect(q.question_number).toBe(8);
  expect(q.marks).toBe(12);
  expect(q.parts.map(p=>[p.id,p.marks])).toEqual(
   Object.entries(SOURCES[id].marks));
  expect(q.parts.reduce((n,p)=>n+p.marks,0)).toBe(12);
  for(const p of q.parts){
   const empty=check(id,p.id);
   expect(empty.sourcePart).toBe(id+"::"+p.id);
   expect(empty.suggestedMarks).toBe(0);
   expect(empty.unresolvedMarks).toBe(p.marks);
   expect(empty.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(p.marks);
   expect(empty.authority).toBe("advisory");
   expect(empty.publishable).toBe(false);
  }
 });
 test("missing, mixed-source and competitive response evidence never manufactures marks",()=>{
  for(const p of q.parts){
   expect(check(id,p.id,"not sure").suggestedMarks).toBe(0);
   expect(check(id,p.id,"").suggestedMarks).toBe(0);
   expect(check(id,p.id,"incorrect", "I drew the graph").suggestedMarks).toBe(0);
  }
 });
});
test("all ten Q8 assembled versions sum to 120 marks",()=>{
 const q=PAPER2_QUESTION_BANK.filter(x=>ids.includes(x.question_id));
 expect(q).toHaveLength(10);
 expect(q.reduce((n,p)=>n+p.marks,0)).toBe(120);
});
describe.each([
 ["p2-q8-v1","3(x-2)^2+8","3(x^2-4x)+20;(x-2)^2-4",8,2,20],
 ["p2-q8-v2","2(x+3)^2+5","2(x^2+6x)+23;(x+3)^2-9",5,-3,23],
 ["p2-q8-v3","(x-4)^2-7","(x-4)^2-16",-7,4,9]
])("Q8 completed-square and quadratic graph features %s",
 (id,expression,working,minimum,h,y0)=>{
 test("completed-square answer and independently stated method candidates",()=>{
  const full=check(id,"a",expression,working);
  expect(full.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(4);
  expect(full.criteria.at(-1).candidateMarks).toBe(1);
  expect(full.suggestedMarks).toBe(id.endsWith("v3")?2:3);
  expect(full.unresolvedMarks).toBe(4-full.suggestedMarks);
  const bare=check(id,"a",expression);
  expect(bare.suggestedMarks).toBe(1);
  expect(check(id,"a","x^2-8x+9").suggestedMarks).toBe(0);
 });
 test("minimum, turning x, symmetry and y-axis coordinates are independent",()=>{
  for(const [p,value] of [
   ["b1",String(minimum)],["b2",String(h)],["c","x = "+h],["d","(0, "+y0+")"]
  ]){
   expect(check(id,p,value).criteria.at(-1).candidateMarks).toBe(1);
   expect(check(id,p,"incorrect").suggestedMarks).toBe(0);
  }
  expect(check(id,"d","("+y0+",0)").suggestedMarks).toBe(0);
 });
});
describe.each([
 ["p2-q8-v4",[0,-4,5]],
 ["p2-q8-v5",[0,-8,7]]
])("Q8 plotted graphs %s",(id,entries)=>{
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===id);
 test("table cells have independently proposed correct-value evidence",()=>{
  const full=check(id,"a",entries.join(", "));
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(check(id,"a",[entries[0],999,entries[2]].join(","))
   .criteria.map(c=>c.candidateMarks)).toEqual([1,null,1]);
  expect(check(id,"a",entries.slice(0,2).join(",")).suggestedMarks).toBe(0);
  expect(check(id,"a",entries.reverse().join(",")).suggestedMarks).toBeLessThan(3);
 });
 test("graph drawing and graph-derived results require graphical verification",()=>{
  for(const p of q.parts.filter(x=>x.id!=="a")){
   for(const response of [
    {answer:p.answer},
    {answer:p.answer,working:"graph drawn perfectly"},
    {answer:p.answer,graph:{points:[[0,0],[1,1]],validated:true}},
    {answer:"drawn"}
   ]){
    const r=grade({questionId:id,partId:p.id,response});
    expect(r.suggestedMarks).toBe(0);
    expect(r.unresolvedMarks).toBe(p.marks);
    expect(r.publishable).toBe(false);
   }
  }
 });
});
describe.each([
 ["p2-q8-v6","2x+3y<=60;x>=6;y>=4",
  "(6,4);(6,16);(24,4)","P=50x+60y",
  "$1440, from 24 shirts and 4 pairs of trousers","50*24+60*4=1440"],
 ["p2-q8-v7","3x+2y<=72;x>=6;y>=6",
  "(6,6);(6,27);(20,6)","P=40x+30y",
  "$1050, from 6 tables and 27 chairs","40*6+30*27=1050"]
])("Q8 linear programming %s",(id,ineq,verts,profit,decision,work)=>{
 test("inequalities and vertices match the source and preserve order alternatives",()=>{
  expect(check(id,"a",ineq).criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(check(id,"b",verts).criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(check(id,"a",ineq.replace(/<=/g,">=")).suggestedMarks).toBe(0);
  expect(check(id,"b","(999,999);(998,998);(997,997)").suggestedMarks).toBe(0);
 });
 test("profit expression and the production decision remain separate evidence",()=>{
  expect(check(id,"c",profit).suggestedMarks).toBe(1);
  const full=check(id,"d",decision,work);
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,null,1,1]);
  expect(full.suggestedMarks).toBe(3);
  expect(full.unresolvedMarks).toBe(1);
  expect(full.publishable).toBe(false);
  const onlyProfit=check(id,"d",String(SOURCES[id].max));
  expect(onlyProfit.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1,null]);
  expect(check(id,"d","incorrect",work).suggestedMarks).toBe(1);
 });
});
describe.each([
 ["p2-q8-v8","3.89, -0.39","sqrt(73)","x^2+2x-5=3x+1;x^2-x-6=0",
  "x^2-x-6=0","(-2,-5) and (3,10)","(x+2)(x-3)=0"],
 ["p2-q8-v9","0.18, -1.85","sqrt(37)","x^2-3x+4=2x-2;x^2-5x+6=0",
  "x^2-5x+6=0","(2,2) and (3,4)","(x-2)(x-3)=0"],
 ["p2-q8-v10","0.64, -3.14","sqrt(57)","x^2+x-11=4x-1;x^2-3x-10=0",
  "x^2-3x-10=0","(-2,-9) and (5,19)","(x+2)(x-5)=0"]
])("Q8 formula and intersection reasoning %s",
 (id,roots,discriminant,equating,target,coordinates,factorised)=>{
 test("two-decimal quadratic roots and discriminant remain separately evidenced",()=>{
  const r=check(id,"a",roots,discriminant+"="+SOURCES[id].discriminant);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1,1,1]);
  expect(r.suggestedMarks).toBe(3);
  expect(check(id,"a",roots).suggestedMarks).toBe(2);
  expect(check(id,"a",roots.replace(/\.(\d\d)/g,".$10")).suggestedMarks).toBe(0);
 });
 test("printed equation alone earns zero without its derivation",()=>{
  expect(check(id,"b1",target).suggestedMarks).toBe(0);
  expect(check(id,"b1",target,target).suggestedMarks).toBe(0);
  const fully=check(id,"b1",target,equating);
  expect(fully.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  const first=check(id,"b1",target,equating.split(";")[0]);
  expect(first.criteria.map(c=>c.candidateMarks)).toEqual([1,null,null]);
 });
 test("two source intersection points, alternative order and factorisation",()=>{
  const full=check(id,"b2",coordinates,factorised);
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,null,1,1]);
  expect(full.suggestedMarks).toBe(3);
  expect(check(id,"b2",coordinates).suggestedMarks).toBe(2);
  expect(check(id,"b2","(0,0) and (1,1)").suggestedMarks).toBe(0);
 });
});
test("all source and part identities fail closed",()=>{
 for(const [id,p] of [["p2-q8-v11","a"],["p2-q7-v1","a"],["p2-q8-v1","e"],
  ["p2-q8-v9","c"],["p2-q8-v4","b1"]]){
  expect(()=>grade({questionId:id,partId:p,response:{answer:"1"}}))
   .toThrow(/Uncalibrated/);
 }
});


test("Q8 advisory fixtures are pinned to the corrected assembled learner-facing answers",()=>{
 const cleaned=x=>String(x).replace(/\s+/g,"").toLowerCase();
 for(const id of ids){
  const source=SOURCES[id],paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
  const part=p=>paper.parts.find(x=>x.id===p);
  if(source.kind==="vertex"){
   expect(cleaned(part("a").answer)).toBe(cleaned(source.vertex));
   expect(Number(part("b1").answer)).toBe(source.k);
   expect(Number(part("b2").answer)).toBe(source.h);
   expect(cleaned(part("c").answer)).toBe("x="+source.h);
   expect(cleaned(part("d").answer)).toBe("(0,"+source.yIntercept+")");
  }else if(source.kind==="graph"){
   expect(part("a").answer.split(",").map(Number)).toEqual(source.entries);
   expect(cleaned(part("c").answer)).toBe("("+source.minimum.join(",")+")");
   expect(part("d").prompt.toLowerCase()).toContain("use your graph");
   expect(part("e").prompt.toLowerCase()).toContain("drawing a suitable straight line");
  }else if(source.kind==="linear"){
   expect(cleaned(part("a").answer).replace(/≤/g,"<=").replace(/≥/g,">="))
    .toBe(source.inequalities.join(";"));
   for(const xy of source.vertices){
    expect(cleaned(part("b").answer)).toContain("("+xy.join(",")+")");
   }
   expect(cleaned(part("c").answer)).toBe(
    "p="+source.profit[0]+"x+"+source.profit[1]+"y");
   expect(part("d").answer).toContain(String(source.max));
  }else{
   for(const root of source.roots)expect(part("a").answer).toContain(root.toFixed(2));
   expect(cleaned(part("b1").answer)).toBe(cleaned(source.equation));
   for(const xy of source.points){
    expect(cleaned(part("b2").answer)).toContain("("+xy.join(",")+")");
   }
   expect(part("b1").requireWorking).toBe(true);
  }
 }
});
