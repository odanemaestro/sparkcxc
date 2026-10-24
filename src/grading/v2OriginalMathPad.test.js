import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathPad} from "./v2OriginalMathPad";
import {mathematicsOriginalPadFixtures} from "./v2Fixtures/mathematicsOriginalPad";
const ids=[
 "p2e-q4::a1","p2f-q4::a1","p2f-q4::a2","p2g-q4::a1",
 "p2h-q4::a1","p2h-q4::a2","p2i-q4::a1","p2j-q4::a1","p2j-q4::a2"
];
const ctx=id=>{
 const [qid,pid]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
 if(!part)throw Error("Missing original source "+id);
 return {criterionId:id,part,source:{answer:part.answer,criteria:Array.from(
   {length:part.marks},(_,i)=>({code:"B"+(i+1),kind:"B",marks:1,
    check:{type:"manual-verification",evidence:"Source drawing "+id+" B"+(i+1)}}))}};
};
describe.each(ids)("Math E-J original pad %s",id=>{
 const x=ctx(id);
 const f=mathematicsOriginalPadFixtures({criterion:{id},part:x.part,maxMarks:x.part.marks});
 const grade=response=>gradeOriginalMathPad({...x,response});
 test("full, order-independent and partial source constructions",()=>{
  const fixtures=f.fixtures;
  const expected=x.part.marks;
  expect(grade(fixtures.find(t=>t.cls==="full").response)).toMatchObject({marks:expected,resolved:true});
  expect(grade(fixtures.find(t=>t.cls==="equivalent").response)).toMatchObject({marks:expected,resolved:true});
  if(expected>1)expect(grade(fixtures.find(t=>t.cls==="partial").response).marks).toBe(1);
  expect(grade(fixtures.find(t=>t.cls==="incorrect").response).marks).toBe(0);
  expect(grade(fixtures.find(t=>t.cls==="blank").response).marks).toBe(0);
  expect(grade(fixtures.find(t=>t.cls==="irrelevant").response).marks).toBe(0);
  expect(grade(fixtures.find(t=>t.cls==="competing").response).marks).toBe(expected===1?0:1);
  expect(grade(fixtures.find(t=>t.cls==="ceiling").response).marks).toBe(expected);
 });
 test("source drift, inappropriate protractor and invalid objects abstain",()=>{
  const full=f.fixtures[0].response;
  expect(gradeOriginalMathPad({...x,source:{...x.source,answer:"tampered"},response:full})).toBeNull();
  expect(gradeOriginalMathPad({...x,part:{...x.part,responseSchema:{
   ...x.part.responseSchema,allowedTools:["segment","circle","protractor"]}},response:full})).toBeNull();
  expect(grade({objects:[...full.objects,{kind:"angle_measure",degrees:60}]})).toBeNull();
  expect(grade({objects:[...full.objects,{kind:"circle",cx:1,cy:1,r:Infinity}]})).toBeNull();
  expect(grade({objects:[...full.objects,{kind:"circle",cx:1,cy:1,r:NaN}]})).toBeNull();
 });
});
test("unlisted questions remain advisory",()=>{
 const x=ctx("p2e-q4::a1");
 expect(gradeOriginalMathPad({...x,criterionId:"p2e-q4::b",response:{objects:[]}})).toBeNull();
});
