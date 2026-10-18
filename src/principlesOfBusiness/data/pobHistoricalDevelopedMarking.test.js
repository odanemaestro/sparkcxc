import {gradePobDevelopedPart,getPobDevelopedTask,
  POB_DEVELOPED_SUBCRITERIA_VERSION} from "./pobHistoricalDevelopedMarking";
import {reviewPobHistoricalPaper2} from "./pobHistoricalPaper2RubricReview";
import {buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";
import {gradePobHistoricalArithmetic} from "./pobHistoricalPaper2Evidence";

const id="POB-P2-2005-MJ";
const owner=POB_HISTORICAL_REVIEW_BANKS.find(entry=>entry.id===id);
const bank=buildPobOwnerPaper2Bank(id,owner.bank);
const score=(partKey,response)=>gradePobDevelopedPart(id,partKey,response);
const reviewed=(question,partId,response)=>reviewPobHistoricalPaper2(
 {["Q"+question+":"+partId]:response},bank,[question]).questions[0].parts.find(row=>row.part===partId);

test("rules apply only to the source-matched 2005 historical multi-mark questions",()=>{
 expect(getPobDevelopedTask(id,"Q2:c")?.maxMarks).toBe(6);
 expect(getPobDevelopedTask(id,"Q3:b")?.maxDistinct).toBe(3);
 expect(getPobDevelopedTask("POB-P2-2018-MJ","Q2:c")).toBeNull();
 expect(score("Q1:a","Any text")).toBeNull();
 for(const [question,part] of [[2,"c"],[3,"b"]]){
  const source=bank.questions.find(q=>q.number===question).parts.find(p=>p.id===part);
  expect(source.marks).toBe(6);
  expect(source.criteria.map(c=>c.marks)).toEqual([2,2,2]);
 }
});
test("labour-efficiency source awards strategy plus explained mechanism independently",()=>{
 const answer=[
  "Train employees to improve their skills and reduce mistakes.",
  "Bonuses motivate staff to work harder and increase output.",
  "Modern machines help workers produce more items in less time."
 ].join("\n");
 const grade=score("Q2:c",answer);
 expect(grade.maximum).toBe(6);
 expect(grade.confirmedMarks).toBe(6);
 expect(grade.unresolvedMarks).toBe(0);
 expect(grade.assessedMarks).toBe(6);
 expect(grade.concepts.map(c=>c.id)).toEqual(["training","motivation","technology"]);
 expect(grade.criteria.map(c=>c.marks)).toEqual([2,2,2]);
 const actual=reviewed(2,"c",answer);
 expect(actual.confirmedMarks).toBe(6);
 expect(actual.unresolvedMarks).toBe(0);
 expect(actual.assessedMarks).toBe(6);
 expect(actual.status).toBe("criterion-verified");
 expect(actual.subcriteriaVersion).toBe(POB_DEVELOPED_SUBCRITERIA_VERSION);
});
test("a strategy earns identification credit without invented explanation marks",()=>{
 const answer="Training.\nBonuses.\nModern machinery.";
 const grade=score("Q2:c",answer);
 expect(grade.confirmedMarks).toBe(3);
 expect(grade.unresolvedMarks).toBe(3);
 expect(grade.assessedMarks).toBeNull();
 expect(grade.criteria.map(c=>c.marks)).toEqual([1,1,1]);
 const actual=reviewed(2,"c",answer);
 expect(actual.confirmedMarks).toBe(3);
 expect(actual.unresolvedMarks).toBe(3);
 expect(actual.assessedMarks).toBeNull();
 expect(actual.criteria.map(c=>c.assessedMarks)).toEqual([1,1,1]);
});
test("a mixed-quality answer preserves five earned marks and one genuinely unresolved mark",()=>{
 const answer="Training improves workers' skills. Bonuses. Better machinery helps increase output in the same time.";
 const grade=score("Q2:c",answer);
 expect(grade.confirmedMarks).toBe(5);
 expect(grade.unresolvedMarks).toBe(1);
 expect(grade.assessedMarks).toBeNull();
 expect(grade.criteria.map(c=>c.marks)).toEqual([2,1,2]);
});
test("repeating one strategy, unrelated claims, or unsupported keyword stuffing never earns extra marks",()=>{
 const repeat=score("Q2:c","Training improves skills. Training reduces mistakes. Bonuses encourage effort.");
 expect(repeat.confirmedMarks).toBe(4);
 expect(repeat.concepts.map(c=>c.id)).toEqual(["training","motivation"]);
 expect(score("Q2:c","Training, skills, bonuses, machinery, output.").confirmedMarks)
   .toBeLessThanOrEqual(1);
 expect(score("Q2:c","Fibre prevents constipation.").confirmedMarks).toBe(0);
 expect(score("Q2:c","Training does not improve skills.").confirmedMarks).toBe(0);
 expect(score("Q2:c","Modern machines reduce productivity.").confirmedMarks).toBe(0);
});
test("reasons from a different sentence cannot be attached to an unsupported strategy",()=>{
 const answer="Train workers.\nThey learn useful skills.\nProvide bonuses.";
 const grade=score("Q2:c",answer);
 expect(grade.confirmedMarks).toBe(2);
 expect(grade.unresolvedMarks).toBe(4);
});
test("supply-increase question recognises three independent factors AND positive effects",()=>{
 const answer=[
  "Improved breeding methods allow farmers to rear more cattle.",
  "Lower feed costs make beef cheaper to produce.",
  "Government subsidies lower production costs and encourage beef supply."
 ].join("\n");
 const grade=score("Q3:b",answer);
 expect(grade.confirmedMarks).toBe(6);
 expect(grade.assessedMarks).toBe(6);
 expect(grade.concepts.map(c=>c.id)).toEqual(["technology","input-cost","subsidies"]);
 const actual=reviewed(3,"b",answer);
 expect(actual.confirmedMarks).toBe(6);
 expect(actual.assessedMarks).toBe(6);
});
test("incorrect economic directions and repeated factors do not get false development credit",()=>{
 expect(score("Q3:b","Higher feed costs reduce beef supply.").confirmedMarks).toBe(0);
 expect(score("Q3:b","Government subsidies lower production costs. Government grants lower costs.").confirmedMarks)
  .toBeLessThanOrEqual(2);
 expect(score("Q3:b","Farmers buy improved breeding technology.").confirmedMarks).toBe(1);
 expect(score("Q3:b","Beef is cheaper and sales increase.").confirmedMarks).toBe(0);
});
test("unknown paraphrases remain pending rather than being classified as incorrect",()=>{
 const grade=score("Q3:b","Innovations in animal husbandry allow each farm to harvest larger herds.");
 expect(grade.confirmedMarks).toBe(0);
 expect(grade.unresolvedMarks).toBe(6);
 expect(grade.assessedMarks).toBeNull();
});
test("unchanged historic arithmetic and unrelated prose review keep their previous scoring",()=>{
 expect(gradePobHistoricalArithmetic(id,"Q9:a.ii",
  "24000-26000=-2000 deficit; final answer:3000").marks).toBe(1);
 const other=reviewed(2,"a","Productivity is output per unit of input.");
 expect(other.subcriteriaVersion).toContain("pob-2005-definition");
 expect(other.confirmedMarks+other.unresolvedMarks).toBeLessThanOrEqual(other.availableMarks);
});
