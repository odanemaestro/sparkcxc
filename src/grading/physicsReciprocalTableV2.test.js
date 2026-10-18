import physics from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {evaluatePhysicsReciprocalTable} from "./physicsReciprocalTableV2";
const part=physics.questions[0].parts[0];
test("source has three missing third-column entries and six marks",()=>{
 expect(part.table.rows.map((r,i)=>r[2]===""?i:null).filter(i=>i!==null)).toEqual([1,3,5]);
 expect(part.marks).toBe(6);
});
test("correct source values and stated method produce six advisory marks",()=>{
 const result=evaluatePhysicsReciprocalTable({response:{table:{"1:2":"8.33","3:2":"5.00","5:2":"3.33"}},working:"1/12"});
 expect(result.suggestedMarks).toBe(6);
 expect(result.unresolvedMarks).toBe(0);
 expect(result.publishable).toBe(false);
});
test("source-approved one-decimal answers are accepted",()=>{
 const r=evaluatePhysicsReciprocalTable({response:{table:{"1:2":"8.3","3:2":"5.0","5:2":"3.3"}}});
 expect(r.suggestedMarks).toBe(5);
 expect(r.unresolvedMarks).toBe(1);
});
test("unscaled inverse-volume alternatives are accepted",()=>{
 const r=evaluatePhysicsReciprocalTable({response:{table:{"1:2":"0.0833","3:2":"0.05","5:2":"0.0333"}}});
 expect(r.suggestedMarks).toBe(5);
});
test("partial and incorrect entries cannot become false zero marks",()=>{
 const r=evaluatePhysicsReciprocalTable({response:{table:{"1:2":"8.33","3:2":"wrong","5:2":"4"}}});
 expect(r.suggestedMarks).toBe(2);
 expect(r.unresolvedMarks).toBe(4);
});

test("nearby incorrect values are not accepted under rounding allowance",()=>{
 const r=evaluatePhysicsReciprocalTable({response:{table:{"1:2":"8.38","3:2":"5.04","5:2":"3.38"}}});
 expect(r.suggestedMarks).toBe(0);
 expect(r.unresolvedMarks).toBe(6);
});
test("Physics exam response key preserves actual table coordinates",()=>{
 const p=physics.questions[0].parts[0];
 const blanks=p.table.rows.flatMap((row,rowIndex)=>row.flatMap((cell,colIndex)=>cell===""?[rowIndex+":"+colIndex]:[]));
 expect(blanks).toEqual(["1:2","3:2","5:2"]);
 const result=evaluatePhysicsReciprocalTable({response:{table:Object.fromEntries(blanks.map(k=>[k,"5.0"]))}});
 expect(result.criteria.slice(1).map(c=>c.key)).toEqual(blanks);
});
