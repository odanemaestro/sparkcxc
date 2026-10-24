import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathConstruction} from "./v2OriginalMathConstruction";
import {constructionSourceResponse} from "./v2Fixtures/mathematicsConstruction";

const cases=["p2-q3-v9::a","p2-q3-v10::a"];
const context=id=>{
 const [qid,pid]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
 if(!part)throw Error("Missing original source: "+id);
 const source={answer:part.answer,solution:part.solution,
  criteria:["M1","M2","M3","A1"].map((code,i)=>({
   code,kind:i===3?"A":"M",marks:1,
   check:{type:"manual-verification",evidence:"original construction evidence for "+code}
  }))};
 return {criterionId:id,part,source};
};
describe.each(cases)("Mathematics source compass construction %s",id=>{
 const ctx=context(id),full=constructionSourceResponse(id),mark=response=>
  gradeOriginalMathConstruction({...ctx,response});
 const seg=full.objects.filter(x=>x.kind==="segment");
 const arc=full.objects.filter(x=>x.kind==="circle");
 test("awards source marks only for observable ruler and compass geometry",()=>{
  expect(mark(full)).toMatchObject({marks:4,resolved:true});
  expect(mark({objects:[...full.objects].reverse()})).toMatchObject({marks:4,resolved:true});
  expect(mark({objects:seg})).toMatchObject({marks:2,resolved:true});
  expect(mark({objects:full.objects.slice(0,-1)})).toMatchObject({marks:3,resolved:true});
  expect(mark({objects:[]})).toMatchObject({marks:0,resolved:true});
  expect(mark({objects:[{kind:"segment",x1:1,y1:1,x2:4,y2:1}]}))
   .toMatchObject({marks:0,resolved:true});
 });
 test("cannot invent compass method evidence or inflate mark ceiling",()=>{
  expect(mark({objects:[...seg,{kind:"circle",cx:4,cy:4,r:2}]}).marks).toBe(2);
  expect(mark({objects:[...full.objects,{kind:"segment",x1:2,y1:2,x2:3,y2:2}]}).marks).toBe(4);
  expect(mark({objects:[...full.objects,arc[0]]})).toMatchObject({marks:4,resolved:true});
  expect(mark({objects:[...seg,{kind:"angle_measure",degrees:60}]})).toBeNull();
  expect(mark({objects:[...seg,{kind:"circle",cx:0,cy:0,r:Infinity}]})).toBeNull();
  expect(mark({objects:[...full.objects,{kind:"circle",cx:4,cy:4,r:NaN}]})).toBeNull();
 });
 test("source rubric and drawing schema must match exactly",()=>{
  expect(gradeOriginalMathConstruction({...ctx,source:{...ctx.source,answer:"made up"},
   response:full})).toBeNull();
  expect(gradeOriginalMathConstruction({...ctx,source:{...ctx.source,criteria:ctx.source.criteria.slice(1)},
   response:full})).toBeNull();
  expect(gradeOriginalMathConstruction({...ctx,part:{...ctx.part,
   responseSchema:{...ctx.part.responseSchema,allowedTools:["segment","circle","protractor"]}},
   response:full})).toBeNull();
  expect(gradeOriginalMathConstruction({...ctx,criterionId:"p2-q3-v8::a",
   response:full})).toBeNull();
 });
});
