import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q9_SOURCES_V2 as SOURCES,evaluateMathQ9V2 as grade} from "./mathCircleTrigonometryBearingsV2";

const ids=Array.from({length:10},(_,i)=>"p2-q9-v"+(i+1));
const check=(id,partId,answer="",working="")=>
 grade({questionId:id,partId,response:{answer,working}});

describe.each(ids)("Q9 full source inventory %s",id=>{
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===id);
 test("all actual learner-facing parts and marks remain in the advisory allocation",()=>{
  expect(q).toBeDefined();
  expect(q.question_number).toBe(9);
  expect(q.marks).toBe(12);
  expect(q.parts.map(p=>[p.id,p.marks])).toEqual(Object.entries(SOURCES[id].marks));
  expect(q.parts.reduce((n,p)=>n+p.marks,0)).toBe(12);
  for(const part of q.parts){
   const report=check(id,part.id);
   expect(report.sourcePart).toBe(id+"::"+part.id);
   expect(report.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(part.marks);
   expect(report.suggestedMarks).toBe(0);
   expect(report.unresolvedMarks).toBe(part.marks);
   expect(report.publishable).toBe(false);
   expect(report.authority).toBe("advisory");
   expect(report.rubricAllocation).toBe("proposed-from-worked-solution");
  }
 });
 test("unknown, blank, contradictory and competitive responses fail closed",()=>{
  for(const p of q.parts){
   for(const answer of ["","unknown","or 52","not the correct result",
    "Infinity","NaN"]){
    const report=check(id,p.id,answer);
    expect(report.suggestedMarks).toBe(0);
    expect(report.publishable).toBe(false);
   }
  }
 });
});
test("ten Q9 source variants preserve 120 marks",()=>{
 const papers=PAPER2_QUESTION_BANK.filter(q=>ids.includes(q.question_id));
 expect(papers).toHaveLength(10);
 expect(papers.reduce((s,q)=>s+q.marks,0)).toBe(120);
});
describe.each([
 ["p2-q9-v1",104,52,38,40,220,130,90,120,150,"093"],
 ["p2-q9-v2",128,64,26,55,235,145,60,80,100,"108"]
])("Q9 circle theorem and two-bearing source %s",
 (id,centre,inscribed,base,out,back,second,l1,l2,distance,bearing)=>{
 test("circle angle and distinct central angle theorem evidence",()=>{
  const model=PAPER2_QUESTION_BANK.find(q=>q.question_id===id).parts.find(p=>p.id==="a1");
  expect(model.answer).toContain("circumference");
  const full=check(id,"a1",inscribed+" degrees because the angle at the centre is twice the angle at the circumference");
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
  expect(check(id,"a1",String(inscribed)).suggestedMarks).toBe(1);
  expect(check(id,"a1",String(inscribed)+" or "+String(inscribed+1)).suggestedMarks).toBe(0);
  const baseResult=check(id,"a2",String(base),"(180-"+centre+")/2="+base);
  expect(baseResult.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(check(id,"a2",String(base)).suggestedMarks).toBe(1);
 });
 test("the printed 90 degree angle cannot earn marks without back-bearing proof",()=>{
  expect(PAPER2_QUESTION_BANK.find(q=>q.question_id===id)
   .parts.find(p=>p.id==="b1").requireWorking).toBe(true);
  expect(check(id,"b1","Angle PQR = 90°").suggestedMarks).toBe(0);
  expect(check(id,"b1","90",back+"-"+second+"=90").suggestedMarks).toBe(0);
  const full=check(id,"b1","Angle PQR = 90°",
   out+"+180="+back+";"+back+"-"+second+"=90");
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(full.publishable).toBe(false);
 });
 test("pythagorean distance and direction remain distinct method and answer marks",()=>{
  const d=check(id,"b2",String(distance),l1+"^2+"+l2+"^2="+distance*distance);
  expect(d.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(check(id,"b2",String(distance)).suggestedMarks).toBe(1);
  expect(check(id,"b2","wrong",l1+"^2+"+l2+"^2="+distance*distance).suggestedMarks).toBe(1);
  const angle=check(id,"b3",bearing,"atan("+l2+"/"+l1+")=53.1");
  expect(angle.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(check(id,"b3",bearing).suggestedMarks).toBe(1);
  expect(check(id,"b3","incorrect","atan("+l2+"/"+l1+")=53.1").suggestedMarks).toBe(1);
 });
});
describe.each([
 ["p2-q9-v3",9,14,68,13.5,13.51,74,58.4],
 ["p2-q9-v4",11,15,57,12.9,12.89,77,69.2],
 ["p2-q9-v5",8,13,112,17.6,17.63,43,48.2]
])("Q9 cosine-rule and area source %s",
 (id,lk,lm,angle,km,kmInter,atK,area)=>{
 test("cosine-rule length has independent method and one-decimal A candidate",()=>{
  const work=lk+"^2+"+lm+"^2-2*"+lk+"*"+lm+"*cos"+angle+"=182";
  const full=check(id,"a",km.toFixed(1),work);
  expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,null,null,1]);
  expect(check(id,"a",km.toFixed(1)).suggestedMarks).toBe(1);
  expect(check(id,"a",km.toFixed(2)).suggestedMarks).toBe(0);
  expect(check(id,"a","wrong",work).suggestedMarks).toBe(1);
 });
 test("nearest-degree angle follows the source cosine relation",()=>{
  const formula="("+lk+"^2+"+kmInter+"^2-"+lm+"^2)/(2*"+lk+"*"+kmInter+")";
  const report=check(id,"b",String(atK),formula+"=0.3");
  expect(report.criteria.map(c=>c.candidateMarks)).toEqual([1,null,null,1]);
  expect(check(id,"b",String(atK)+".0").suggestedMarks).toBe(0);
  expect(check(id,"b",String(atK)).suggestedMarks).toBe(1);
 });
 test("half ab sin(C) uses the source included angle, not a different variant",()=>{
  const method="1/2*"+lk+"*"+lm+"*sin"+angle;
  expect(check(id,"c",area.toFixed(1),method+"="+area).suggestedMarks).toBe(2);
  expect(check(id,"c",area.toFixed(1),"1/2*9*14*sin112").suggestedMarks)
   .toBe(id==="p2-q9-v3"?1:1);
  expect(check(id,"c","incorrect",method).suggestedMarks).toBe(1);
 });
});
describe.each([
 ["p2-q9-v6",47,61,72],
 ["p2-q9-v7",52,58,70]
])("Q9 alternate segment and tangent theorem %s",(id,alternate,given,t)=>{
 test("source now preserves alternate segment reasons in the assembled answers",()=>{
  const q=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
  expect(q.parts.find(p=>p.id==="a").answer).toContain("alternate segment");
  expect(q.parts.find(p=>p.id==="c").answer).toContain("alternate segment");
  for(const [part,value] of [["a",alternate],["c",given]]){
   const full=check(id,part,value+"° by the alternate segment theorem");
   expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
   expect(check(id,part,String(value)).suggestedMarks).toBe(1);
   expect(check(id,part,value+"° because the tangent theorem does not apply")
    .suggestedMarks).toBe(0);
  }
 });
 test("triangle angle sum and right-angle tangent radius explanations",()=>{
  const b=check(id,"b",String(t),"180-"+alternate+"-"+given+"="+t);
  expect(b.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
  const d=check(id,"d","A tangent is perpendicular to the radius at the point of contact");
  expect(d.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
  expect(check(id,"d","A tangent is perpendicular to the radius").suggestedMarks).toBe(1);
  expect(check(id,"d","A tangent is not perpendicular to the radius at the point of contact").suggestedMarks).toBe(0);
 });
});
describe.each([
 ["p2-q9-v8",60,210,80,120,52,30,100,157],
 ["p2-q9-v9",45,320,70,50,34.5,28.9,83.2,17],
 ["p2-q9-v10",90,240,50,150,45,77.9,103,211]
])("Q9 compass bearing and components %s",
 (id,l1,b1,l2,b2,north,east,distance,bearing)=>{
 test("signed north and east components produce source-appropriate magnitudes",()=>{
  const c=check(id,"a",north.toFixed(1),l1+"*cos"+b1+"=-"+north);
  expect(c.criteria.map(x=>x.candidateMarks)).toEqual([1,null,1]);
  const e=check(id,"b",east.toFixed(1),l1+"*sin"+b1+"=-"+east);
  expect(e.criteria.map(x=>x.candidateMarks)).toEqual([1,null,1]);
  expect(check(id,"a",String(north.toFixed(2))).suggestedMarks).toBe(0);
 });
 test("combined route distance can be obtained by the 90 degree resultant",()=>{
  const full=check(id,"c",distance.toFixed(1),"sqrt("+l1+"^2+"+l2+"^2+")="+distance);
  expect(full.criteria.map(x=>x.candidateMarks)).toEqual([1,null,1]);
  expect(check(id,"c",distance.toFixed(1)).suggestedMarks).toBe(1);
  const another=ids.find(x=>x!==id&&x.includes("-v8"))||"p2-q9-v8";
  if(id!=="p2-q9-v8")expect(check(id,"c","wrong","sqrt(60^2+80^2)=100").suggestedMarks).toBe(0);
 });
 test("three-figure bearing is source-calibrated and cannot be treated as unrounded degrees",()=>{
  const asBearing=String(bearing).padStart(3,"0");
  expect(check(id,"d",asBearing).suggestedMarks).toBe(1);
  expect(check(id,"d",asBearing+".0").suggestedMarks).toBe(0);
  expect(check(id,"d","incorrect","90/360*20=5").suggestedMarks).toBe(0);
 });
});
test("unrecognised Q9 source or part identifiers always fail closed",()=>{
 for(const [id,p] of [["p2-q9-v11","a"],["p2-q8-v1","a1"],
   ["p2-q9-v3","b1"],["p2-q9-v6","b2"],["p2-q9-v10","e"]])
  expect(()=>grade({questionId:id,partId:p})).toThrow(/Uncalibrated/);
});
