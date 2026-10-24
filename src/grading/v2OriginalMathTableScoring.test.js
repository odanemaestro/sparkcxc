import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathematicsTable} from "./v2OriginalMathTableScoring";

const get=id=>{
 const [qid]=id.split("::");
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===qid);
 const part=q?.parts.find(x=>x.id==="a");
 if(!part)throw new Error("Missing audited table "+id);
 return {part,source:{criteria:part.criteria,answer:part.answer}};
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
 const wrong={cells:Object.fromEntries(Object.keys(complete.cells).map(k=>[k:"999"]))};
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
