import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathematicsTable} from "./v2OriginalMathTableScoring";

const get=id=>{
 const [qid]=id.split("::");
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===qid);
 const raw=q?.parts.find(x=>x.id==="a");
 if(!raw)throw new Error("Missing audited table "+id);
 // Original rich-workspace questions omit part.criteria locally; the private
 // registered rubric supplies these during server-side assessment. Simulate
 // that exact registration boundary without changing the mark allocation.
 const registered=Array.from({length:raw.marks},(_,index)=>({
   code:"B"+(index+1),kind:"B",marks:1,field:"all",
   check:{type:"manual-verification",evidence:"source table group "+(index+1)}
 }));
 const part={...raw,criteria:registered};
 return {part,source:{criteria:registered,answer:part.answer}};
};
const cells=part=>Object.fromEntries(part.responseSchema.rows.flat()
 .filter(x=>x&&typeof x==="object"&&!Array.isArray(x)&&x.key)
 .map(x=>[x.key,String(x.answer)]));

test.each(["p2e","p2f","p2g","p2h","p2i","p2j"])(
 "source-backed %s statistics table grades individual labelled cells",paper=>{
 const criterionId=paper+"-q5::a",ctx=get(criterionId);
 const complete={cells:cells(ctx.part)};
 const full=gradeOriginalMathematicsTable({...ctx,criterionId,response:complete});
 expect(full).toMatchObject({marks:ctx.part.marks,resolved:true});
 const wrong={cells:Object.fromEntries(Object.keys(complete.cells).map(k=>[k,"999"]))};
 const noCredit=gradeOriginalMathematicsTable({...ctx,criterionId,response:wrong});
 expect(noCredit).toMatchObject({marks:0,resolved:true});
 const empty=gradeOriginalMathematicsTable({...ctx,criterionId,response:{cells:{}}});
 expect(empty).toMatchObject({marks:0,resolved:true});
 expect(gradeOriginalMathematicsTable({...ctx,criterionId,
  response:{answer:Object.values(complete.cells).join(", ")}})).toBeNull();
});

test("original grouped midpoints award one mark only when both cells are correct",()=>{
 const criterionId="p2e-q5::a",ctx=get(criterionId),correct=cells(ctx.part);
 expect(gradeOriginalMathematicsTable({...ctx,criterionId,
  response:{cells:{m2:correct.m2}}})).toMatchObject({marks:0,resolved:true});
 expect(gradeOriginalMathematicsTable({...ctx,criterionId,
  response:{cells:{m2:correct.m2,m3:correct.m3}}})).toMatchObject({marks:1,resolved:true});
 expect(gradeOriginalMathematicsTable({...ctx,criterionId,
  response:{cells:{m2:correct.m3,m3:correct.m2}}})).toMatchObject({marks:0,resolved:true});
});

test("unknown keys, unsupported papers, tampered source schemes abstain",()=>{
 const id="p2f-q5::a",ctx=get(id);
 expect(gradeOriginalMathematicsTable({...ctx,criterionId:id,
  response:{cells:{c3:"42",selfAssessedMark:"2"}}})).toBeNull();
 expect(gradeOriginalMathematicsTable({...ctx,criterionId:"p2f-q5::b",
  response:{cells:{c3:"42"}}})).toBeNull();
 expect(gradeOriginalMathematicsTable({...ctx,criterionId:id,
  source:{criteria:ctx.source.criteria.map(x=>({...x,description:"replaced"}))},
  response:{cells:cells(ctx.part)}})).toBeNull();
});


test.each([
 "p2e-q7","p2f-q7","p2g-q7","p2h-q7","p2i-q7","p2j-q7",
 "p2e-q8","p2g-q8","p2i-q8"
])("original %s source table grades exact labelled pattern or quadratic cells",qid=>{
 const id=qid+"::a",ctx=get(id),expected=cells(ctx.part);
 expect(gradeOriginalMathematicsTable({...ctx,criterionId:id,
  response:{cells:expected}})).toMatchObject({marks:ctx.part.marks,resolved:true});
 const firstKey=Object.keys(expected)[0];
 expect(gradeOriginalMathematicsTable({...ctx,criterionId:id,
  response:{cells:{[firstKey]:expected[firstKey]}}})).toMatchObject({marks:1,resolved:true});
 const wrong=Object.fromEntries(Object.keys(expected).map(k=>
  [k,k==="dn"?"n+999":"999"]));
 expect(gradeOriginalMathematicsTable({...ctx,criterionId:id,
  response:{cells:wrong}})).toMatchObject({marks:0,resolved:true});
});

test("source expression cell accepts equivalent nth-term forms, never answer lists",()=>{
 const criterionId="p2e-q7::a",ctx=get(criterionId),original=cells(ctx.part);
 expect(gradeOriginalMathematicsTable({...ctx,criterionId,
  response:{cells:{...original,dn:"(n^2+n)/2"}}})).toMatchObject({marks:4,resolved:true});
 expect(gradeOriginalMathematicsTable({...ctx,criterionId,
  response:{cells:{...original,dn:"n(n+1)/2 or n+3"}}})).toBeNull();
 expect(gradeOriginalMathematicsTable({...ctx,criterionId,
  response:{cells:{...original,dn:"n+999"}}})).toMatchObject({marks:3,resolved:true});
});
