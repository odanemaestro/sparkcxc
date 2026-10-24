import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathNumericWorking as grade,SOURCE_NUMERIC_TWO_MARK_IDS} from "./v2OriginalMathNumericWorking";
import {mathematicsNumericWorkingFixtures} from "./v2Fixtures/mathematicsNumericWorking";
const partFor=id=>{
 const [questionId,partId]=id.split("::");
 return PAPER2_QUESTION_BANK.find(q=>q.question_id===questionId)?.parts.find(p=>p.id===partId);
};
const sourceFor=part=>({
 answer:part.answer,solution:part.solution,criteria:[
 {code:"M1",kind:"M",marks:1,check:{type:"manual-verification",evidence:"Independent source method evidence for M1"}},
 {code:"A1",kind:"A",marks:1,check:{type:"manual-verification",evidence:"Independent source final answer evidence for A1"}}
]});
test("all fifty source IDs are unique",()=>{
 expect(SOURCE_NUMERIC_TWO_MARK_IDS).toHaveLength(50);
 expect(new Set(SOURCE_NUMERIC_TWO_MARK_IDS).size).toBe(50);
});
describe.each(SOURCE_NUMERIC_TWO_MARK_IDS)("source atomic numerical M1/A1 %s",id=>{
 const part=partFor(id);
 test("part has an original numeric solution and a source two-mark ceiling",()=>{
  expect(part).toBeDefined();
  expect(part.marks).toBe(2);
  expect(Number.isFinite(Number(String(part.answer).replace(/,/g,"")))).toBe(true);
  expect(part.solution.length).toBeGreaterThan(18);
 });
 test("canonical, partial, incorrect and contradictory responses are resolved",()=>{
  const source=sourceFor(part);
  const fixtures=mathematicsNumericWorkingFixtures({criterion:{id,sourceMarking:source},part,maxMarks:2});
  expect(fixtures.kind).toBe("structured");
  const outcomes=fixtures.fixtures.map(f=>({...f,result:grade({criterionId:id,part,source,response:f.response})}));
  for(const x of outcomes){
   if(x.mustAbstain){expect(x.result).toBeNull();continue;}
   expect(x.result).not.toBeNull();
   expect(x.result.resolved).toBe(true);
   expect(x.result.marks).toBe(x.expect);
  }
 });
 test("altered source, rubric, invented working and unknown fields abstain",()=>{
  const source=sourceFor(part);
  const answer={answer:part.answer,working:part.solution};
  expect(grade({criterionId:id,part,source:{...source,answer:"-999"},response:answer})).toBeNull();
  expect(grade({criterionId:id,part,source:{...source,solution:"tampered"},response:answer})).toBeNull();
  expect(grade({criterionId:id,part,source:{...source,criteria:source.criteria.slice(1)},response:answer})).toBeNull();
  expect(grade({criterionId:id,part,source,response:{...answer,unknown:"secret"}})).toBeNull();
  expect(grade({criterionId:id,part,source,response:{...answer,working:"banana"}})).toBeNull();
  expect(grade({criterionId:id,part,source,response:{...answer,answer:NaN}})).toBeNull();
 });
});
test("unlisted source is never granted authority",()=>{
 const part=partFor(SOURCE_NUMERIC_TWO_MARK_IDS[0]);
 expect(grade({criterionId:"p2-q6-v10::b",part,source:sourceFor(part),
  response:{answer:part.answer,working:part.solution}})).toBeNull();
});
