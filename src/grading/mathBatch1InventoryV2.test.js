import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q1_REMAINING_SOURCES_V2} from "./mathQ1RemainingV2";
import {MATH_Q2_REMAINING_SOURCES_V2} from "./mathQ2RemainingV2";
import {MATH_RATIO_VARIATION_SOURCES_V2} from "./mathRatioInverseVariationV2";
import {MATH_ENLARGEMENT_SOURCES_V2} from "./mathEnlargementV2";
import {MATH_ROTATION_SOURCES_V2} from "./mathRotationV2";
import {MATH_CONSTRUCTION_SOURCES_V2} from "./mathConstructionV2";

/** Batch-1 source identity inventory. Templates are counted once, regardless of
 * partial and alternative checker functions. This is coverage, NOT verified
 * source-authorised M/A/B atomic mark allocation or final score release. */
test("Batch 1 inventories all 30 original Q1-Q3 Mathematics Paper 2 versions",()=>{
 const originals=PAPER2_QUESTION_BANK.filter(q=>/^p2-q[123]-v(?:10|[1-9])$/.test(q.question_id));
 expect(originals).toHaveLength(30);
 expect(new Set(originals.map(q=>q.question_id)).size).toBe(30);
 const q1=new Set(["p2-q1-v1",...Object.keys(MATH_Q1_REMAINING_SOURCES_V2),...Object.keys(MATH_RATIO_VARIATION_SOURCES_V2)]);
 const q2=new Set(["p2-q2-v1","p2-q2-v2","p2-q2-v3",...Object.keys(MATH_Q2_REMAINING_SOURCES_V2),"p2-q2-v9","p2-q2-v10"]);
 const q3=new Set(["p2-q3-v1","p2-q3-v2","p2-q3-v3",...Object.keys(MATH_ENLARGEMENT_SOURCES_V2),
  ...Object.keys(MATH_ROTATION_SOURCES_V2),...Object.keys(MATH_CONSTRUCTION_SOURCES_V2)]);
 for(const [number,ids] of [[1,q1],[2,q2],[3,q3]]){
  expect(ids.size).toBe(10);
  const papers=originals.filter(q=>q.question_number===number);
  expect(papers).toHaveLength(10);
  for(const q of papers){
   expect(ids.has(q.question_id)).toBe(true);
   expect(q.parts.reduce((sum,p)=>sum+p.marks,0)).toBe(q.marks);
   expect(q.parts.every(p=>p.id&&p.marks>0)).toBe(true);
  }
 }
});
