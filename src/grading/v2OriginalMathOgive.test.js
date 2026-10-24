import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathOgive} from "./v2OriginalMathOgive";
const CASES=["p2f-q5::b","p2h-q5::b","p2j-q5::b"];
const partFor=id=>{
 const [qid,pid]=id.split("::");
 const paper=PAPER2_QUESTION_BANK.find(x=>x.question_id===qid);
 const part=paper?.parts.find(x=>x.id===pid);
 if(!part)throw Error("missing source graph: "+id);
 const rules=id.startsWith("p2f")?
  [{code:"B1",marks:2},{code:"B2",marks:1}]:
  [{code:"B1",marks:1},{code:"B2",marks:1},{code:"B3",marks:1}];
 return {part,source:{answer:part.answer,criteria:rules.map(r=>({
  ...r,kind:"B",check:{type:"manual-verification",evidence:"source plot "+r.code}
 }))}};
};
const plotted=part=>part.responseSchema.criteria[0].points.map(([x,y])=>({x,y}));
test.each(CASES)("source cumulative-frequency graph %s preserves original marks",id=>{
 const ctx=partFor(id),pts=plotted(ctx.part),mark=response=>
  gradeOriginalMathOgive({...ctx,criterionId:id,response});
 expect(mark({points:pts,curve:true})).toMatchObject({marks:3,resolved:true});
 expect(mark({points:[...pts].reverse(),curve:true})).toMatchObject({marks:3,resolved:true});
 expect(mark({points:pts,curve:false})).toMatchObject({
  marks:id.startsWith("p2f")?2:2,resolved:true
 });
 expect(mark({points:pts.slice(0,3),curve:false})).toMatchObject({
  marks:id.startsWith("p2f")?0:1,resolved:true
 });
 expect(mark({points:[]})).toMatchObject({marks:0,resolved:true});
 const extra={x:ctx.part.responseSchema.graph.xMin+2,
  y:ctx.part.responseSchema.graph.yMin+1};
 expect(mark({points:[...pts,extra],curve:true}).marks).toBeLessThan(3);
 expect(mark({points:pts,curve:false,linePoints:pts})).toMatchObject({marks:2,resolved:true});
 expect(mark({points:pts,curve:true,axisXStep:999})).toBeNull();
 expect(mark({points:[{x:Infinity,y:0}]})).toBeNull();
 expect(mark({points:pts,curve:true,extraMarks:99}).marks).toBe(3);
});
test("different original rubric, unexpected graph or supported paper abstains",()=>{
 const id="p2h-q5::b",ctx=partFor(id),response={points:plotted(ctx.part),curve:true};
 expect(gradeOriginalMathOgive({criterionId:id,...ctx,
  source:{...ctx.source,answer:"fabricated source"},response})).toBeNull();
 expect(gradeOriginalMathOgive({criterionId:id,...ctx,
  source:{...ctx.source,criteria:ctx.source.criteria.slice(1)},response})).toBeNull();
 expect(gradeOriginalMathOgive({criterionId:"p2h-q4::a1",...ctx,response})).toBeNull();
});
