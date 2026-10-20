import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {check} from "../practice/cxcMarking/checkers";
import {physicsValueCheck} from "../physics/paper2/physicsPaper2Marking";
import physics2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";

// Positive and negative evidence was derived from the actual corrected
// question text and worked solution. This does not approve other paper parts.
export const V2_BULK_DETERMINISTIC_SOURCE_CASES=[
 {subject:"mathematics",paper:"original-v1",question:"p2-q10-v1",part:"b",
  expected:"7",fragment:"determinant of M",
  check:{type:"numeric",value:7,tolerance:0.001},
  correct:["7","7.0","Answer: 7"],wrong:["6","10","3 or 7"]},
 {subject:"mathematics",paper:"original-v3",question:"p2-q1-v3",part:"b3",
  expected:"16.67",fragment:"percentage of the cash price",
  check:{type:"numeric",value:16.67,tolerance:0.011},
  correct:["16.67","16.67%","16.6667"],wrong:["16.5","20","16.67 or 18"]},
 {subject:"mathematics",paper:"p2e",question:"p2e-q4",part:"a2",
  expected:"22",fragment:"perimeter of triangle",
  check:{type:"numeric",value:22,tolerance:0.011},
  correct:["22","22 cm","22.000"],wrong:["23","21","22 or 23"]},
 {subject:"mathematics",paper:"p2g",question:"p2g-q4",part:"a2",
  expected:"4",fragment:"length of AM",
  check:{type:"numeric",value:4,tolerance:0.011},
  correct:["4","4 cm","4.0"],wrong:["8","2","4 or 8"]},
 {subject:"mathematics",paper:"p2i",question:"p2i-q4",part:"a2",
  expected:"120",fragment:"angle CAL",
  check:{type:"numeric",value:120,tolerance:0.011},
  correct:["120","120°","120.0"],wrong:["60","90","120 or 60"]},
 {subject:"physics",paper:"spark-phy-p02-practice-2",
  question:"phy-p2-2-q3",part:"biii",expected:"2.54 × 10⁵ J",
  fragment:"",check:{type:"value",value:254000,unit:"J",tolerance:0.02},
  correct:["254000 J","2.54 x 10^5 J"],wrong:["254000 N","200000 J","254000 or 200000 J"]}
];
describe("V2 bulk calibrated source-bound numerical criteria",()=>{
 test.each(V2_BULK_DETERMINISTIC_SOURCE_CASES)("$paper $question::$part",item=>{
  const bank=item.subject==="physics"?physics2.questions:PAPER2_QUESTION_BANK;
  const question=bank.find(q=>q.question_id===item.question);
  expect(question).toBeDefined();
  const part=question.parts.find(p=>p.id===item.part);
  expect(part).toBeDefined();
  expect(part.marks).toBe(1);
  expect(part.answer).toBe(item.expected);
  if(item.fragment)expect(part.prompt).toContain(item.fragment);
  if(item.subject==="physics")expect(part.criteria[0].check).toEqual(item.check);
  for(const response of item.correct)
   expect(item.subject==="physics"
     ?physicsValueCheck(response,item.check):check(response,item.check).ok).toBe(true);
  for(const response of item.wrong)
   expect(item.subject==="physics"
     ?physicsValueCheck(response,item.check):check(response,item.check).ok).toBe(false);
  expect(item.subject==="physics"
    ?physicsValueCheck("",item.check):check("",item.check).ok).toBe(false);
 });
});
