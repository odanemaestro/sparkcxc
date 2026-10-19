import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q6_SOURCES_V2 as SOURCES,evaluateMathQ6V2 as grade} from "./mathMensurationTrigonometryV2";

const originalIds=Array.from({length:10},(_,i)=>"p2-q6-v"+(i+1));
describe.each(originalIds)("Q6 assembled paper V2 source audit %s",id=>{
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===id);
 const source=SOURCES[id];
 test("all student-visible parts and source mark ceilings are preserved",()=>{
  expect(source).toBeDefined();
  expect(q).toBeDefined();
  expect(q.question_number).toBe(6);
  expect(q.marks).toBe(9);
  expect(q.parts.map(p=>p.id).sort()).toEqual(Object.keys(source.marks).sort());
  expect(q.parts.reduce((n,p)=>n+p.marks,0)).toBe(9);
  for(const part of q.parts){
   expect(part.marks).toBe(source.marks[part.id]);
   if(!(id==="p2-q6-v4"&&part.id==="d"))
    expect(Number(part.answer)).toBe(source.answers[part.id]);
   const r=grade({questionId:id,partId:part.id});
   expect(r.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(part.marks);
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(part.marks);
   expect(r.authority).toBe("advisory");
   expect(r.publishable).toBe(false);
  }
 });
 test("correct number by itself never fabricates missing method marks",()=>{
  for(const part of q.parts.filter(p=>!(id==="p2-q6-v4"&&p.id==="d"))){
   const r=grade({questionId:id,partId:part.id,response:{answer:part.answer}});
   expect(r.suggestedMarks).toBe(1);
   expect(r.unresolvedMarks).toBe(part.marks-1);
   expect(r.publishable).toBe(false);
  }
 });
 test("unrelated and competing answers fail closed",()=>{
  for(const part of q.parts){
   const wrongAnswers=id==="p2-q6-v4"&&part.id==="d"
    ?["wrong","",part.answer+" or incorrect","not four times",
      "twice as large because radius doubles","NaN","Infinity"]
    :["wrong","",part.answer+" or incorrect","-"+part.answer,"NaN","Infinity"];
   for(const answer of wrongAnswers){
    expect(grade({questionId:id,partId:part.id,response:{answer}}).suggestedMarks).toBe(0);
   }
  }
 });
});
test("all 10 versions form precisely 90 source marks",()=>{
 const papers=PAPER2_QUESTION_BANK.filter(q=>originalIds.includes(q.question_id));
 expect(papers).toHaveLength(10);
 expect(papers.reduce((n,q)=>n+q.marks,0)).toBe(90);
});
test.each([
 ["p2-q6-v1","a","38.5","22/7*(3.5)^2=38.5"],
 ["p2-q6-v2","b","2310","154*15=2310"],
 ["p2-q6-v3","c","528","2*22/7*10.5*8=528"],
 ["p2-q6-v1","d","28","154/5.5=28"],
 ["p2-q6-v4","a","44","(120/360)*2*(22/7)*21=44"],
 ["p2-q6-v5","b","154","90/360*22/7*14^2=154"],
 ["p2-q6-v6","c","128","44+2*42=128"],
 ["p2-q6-v7","a","24","1/2*8*6=24"],
 ["p2-q6-v8","b","750","30*25=750"],
 ["p2-q6-v7","c","10","sqrt(8^2+6^2)=10"],
 ["p2-q6-v8","d","810","2*30+(12+5+13)*25=810"],
 ["p2-q6-v9","a","32.4","48*tan34=32.4"],
 ["p2-q6-v10","b","47.1","35/cos42=47.1"]
])("source-calibrated method and accuracy candidates for %s %s",
 (questionId,partId,answer,working)=>{
  const correct=grade({questionId,partId,response:{answer,working}});
  expect(correct.suggestedMarks).toBe(2);
  expect(correct.publishable).toBe(false);
  const methodOnly=grade({questionId,partId,response:{answer:"wrong",working}});
  expect(methodOnly.suggestedMarks).toBe(1);
  expect(methodOnly.unresolvedMarks).toBe(SOURCES[questionId].marks[partId]-1);
  const answerOnly=grade({questionId,partId,response:{answer}});
  expect(answerOnly.suggestedMarks).toBe(1);
 });
test("Q6 v4 new R3 reasoning earns separately stated area factor and squared-radius reason",()=>{
 const id="p2-q6-v4";
 expect(SOURCES[id].marks).toEqual({a:2,b:3,c:2,d:2});
 const text="Four times as large because sector area depends on the square of the radius";
 const full=grade({questionId:id,partId:"d",response:{answer:text}});
 expect(full.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 expect(full.publishable).toBe(false);
 expect(grade({questionId:id,partId:"d",response:"Four times larger"})
  .criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 expect(grade({questionId:id,partId:"d",response:"Area varies with radius squared"})
  .criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 for(const falseAnswer of ["Twice as large because radius doubles",
  "Four times OR twice as large","Not four times because radius is squared"]){
  expect(grade({questionId:id,partId:"d",response:falseAnswer}).suggestedMarks).toBe(0);
 }
});
test("Q6 nearest-degree and one-decimal requirements do not grant incorrect precision",()=>{
 const towers=[["p2-q6-v9","32.4","32.38","25"],
               ["p2-q6-v10","31.5","31.51","32"]];
 for(const [id,height,unrounded,angle] of towers){
  expect(grade({questionId:id,partId:"a",response:height}).suggestedMarks).toBe(1);
  // Unrounded intermediates are useful working, not a rounded final answer.
  expect(grade({questionId:id,partId:"a",response:unrounded}).suggestedMarks).toBe(0);
  expect(grade({questionId:id,partId:"a",response:{answer:height+" m"}}).suggestedMarks).toBe(1);
  expect(grade({questionId:id,partId:"c",response:angle}).suggestedMarks).toBe(1);
  expect(grade({questionId:id,partId:"c",response:angle+".5"}).suggestedMarks).toBe(0);
 }
});
test("wrong variant method and unsupported identities never create a candidate",()=>{
 expect(grade({questionId:"p2-q6-v2",partId:"b",
  response:{answer:"wrong",working:"38.5*4=154"}}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q6-v9",partId:"a",
  response:{answer:"wrong",working:"35*tan42=31.5"}}).suggestedMarks).toBe(0);
 for(const [id,p] of [["p2-q6-v11","a"],["p2-q6-v1","e"],["p2-q5-v1","a"]])
  expect(()=>grade({questionId:id,partId:p})).toThrow(/Uncalibrated/);
});


test.each([
 ["p2-q6-v9","25","atan(32.38/68)=25"],
 ["p2-q6-v10","32","atan(31.51/50)=32"]
])("source-appropriate inverse-tangent workings are separate from rounded answers for %s",
 (questionId,answer,working)=>{
  const result=grade({questionId,partId:"c",response:{answer,working}});
  expect(result.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1]);
  expect(result.suggestedMarks).toBe(2);
  expect(result.unresolvedMarks).toBe(1);
  expect(result.publishable).toBe(false);
  const sourceMismatched=grade({questionId,partId:"c",response:{
   answer:"incorrect",
   working:questionId==="p2-q6-v9"?"atan(31.51/50)":"atan(32.38/68)"
  }});
  expect(sourceMismatched.suggestedMarks).toBe(0);
 });
test("Q6 correct substitutions do not invent extra three-mark allocations",()=>{
 for(const [id,partId,answer,working] of [
  ["p2-q6-v2","b","2310","154*15=2310"],
  ["p2-q6-v5","b","154","90/360*22/7*14^2=154"],
  ["p2-q6-v8","d","810","2*30+(12+5+13)*25=810"],
  ["p2-q6-v9","b","57.9","48/cos34=57.9"]
 ]){
  const r=grade({questionId:id,partId,response:{answer,working}});
  expect(r.suggestedMarks+r.unresolvedMarks).toBe(3);
  expect(r.unresolvedMarks).toBe(1);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
 }
});

test("Q6 final trigonometric answer precision follows the student-facing instructions",()=>{
 expect(grade({questionId:"p2-q6-v9",partId:"b",response:"57.9 m"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q6-v9",partId:"b",response:"57.90"}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q6-v9",partId:"b",response:"57.92"}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q6-v9",partId:"c",response:"25 degrees"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q6-v9",partId:"c",response:"25.0"}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q6-v10",partId:"a",response:"31.5"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q6-v10",partId:"a",response:"31.51"}).suggestedMarks).toBe(0);
});
