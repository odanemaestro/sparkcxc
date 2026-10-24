import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathematicsGraph} from "./v2OriginalMathGraphScoring";
const plot=new Set(["p2e-q3::a","p2g-q3::a","p2i-q3::a"]);
const ids=[...plot,"p2e-q8::b","p2g-q8::b","p2i-q8::b"];
const partFor=id=>{
 const [qid,pid]=id.split("::");
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===qid);
 const part=q?.parts.find(x=>x.id===pid);
 if(!part)throw Error("missing authored source "+id);
 const criteria=Array.from({length:part.marks},(_,n)=>({
  code:"B"+(n+1),kind:"B",marks:1,
  check:{type:"manual-verification",evidence:"source plot label or curve at "+(n+1)}
 }));
 return {part,source:{answer:part.answer,criteria}};
};
const pointsFor=(p,labels)=>p.responseSchema.criteria.find(x=>x.kind==="graph_points")
 .points.map(([x,y],i)=>({x,y,...(labels?{label:i?"B":"A"}:{})}));

test.each(ids)("source-bound graph %s resolves only genuine original marks",id=>{
 const {part,source}=partFor(id),label=plot.has(id),points=pointsFor(part,label);
 const grade=response=>gradeOriginalMathematicsGraph({criterionId:id,part,source,response});
 expect(grade({points,curve:!label})).toMatchObject({marks:part.marks,resolved:true});
 expect(grade({points:[...points].reverse(),curve:!label})).toMatchObject({marks:part.marks,resolved:true});
 expect(grade({points:[]}).marks).toBe(0);
 expect(grade({points:label?[points[0]]:points.slice(0,3)})).toMatchObject({marks:1,resolved:true});
 expect(grade({points:[{x:part.responseSchema.graph.xMin,y:part.responseSchema.graph.yMin}]}))
  .toMatchObject({marks:0,resolved:true});
 if(label){
  expect(grade({points:points.map(({x,y})=>({x,y}))})).toMatchObject({marks:0,resolved:true});
  expect(grade({points:[points[0],{...points[1],label:"A"}]})).toBeNull();
 }else{
  expect(grade({points,curve:false})).toMatchObject({marks:3,resolved:true});
  expect(grade({points:points.slice(0,3),curve:true}).marks).toBe(1);
  expect(grade({points,curve:true,axisXStep:999})).toBeNull();
  expect(grade({points:[...points,{x:0.25,y:part.responseSchema.graph.yMin}],curve:true}).marks).toBeLessThan(4);
 }
});

test("invalid geometry, source drift and unsupported sources abstain",()=>{
 const id="p2e-q3::a",ctx=partFor(id),valid=pointsFor(ctx.part,true);
 const grade=values=>gradeOriginalMathematicsGraph({criterionId:id,...ctx,...values});
 expect(grade({response:{points:[...valid,{x:Infinity,y:1}]}})).toBeNull();
 expect(grade({response:{points:valid},source:{...ctx.source,answer:"substituted"}})).toBeNull();
 expect(grade({response:{points:valid},source:{...ctx.source,criteria:ctx.source.criteria.slice(1)}})).toBeNull();
 expect(gradeOriginalMathematicsGraph({...ctx,criterionId:"p2f-q3::a",response:{points:valid}})).toBeNull();
});
