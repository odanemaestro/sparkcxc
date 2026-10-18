import {FNH_HISTORICAL_P2_2005} from "../data/fnhHistorical2005Paper2";
import {FNH_HISTORICAL_P2_2018} from "../data/fnhHistorical2018Paper2";
import {getFnhHistoricalStructuredTask,FNH_STRUCTURED_CRITERIA_VERSION} from "./fnhHistoricalStructuredCriteria";
import {gradeFnhWrittenPart,gradeFnhWrittenPaper} from "./fnhPaper2Marking";

const q18=FNH_HISTORICAL_P2_2018.questions[0];
const community=q18.items.find(p=>p.id==="b");
const q05=FNH_HISTORICAL_P2_2005.questions.find(q=>q.number===2);
const dehydration=q05.items.find(p=>p.id==="a");
const score=(part,text)=>gradeFnhWrittenPart(part,text);

test("only exact historical, source-authored explanation tasks receive new FNH rules",()=>{
 expect(getFnhHistoricalStructuredTask(community)).toBe("community");
 expect(getFnhHistoricalStructuredTask(dehydration)).toBe("dehydration");
 expect(getFnhHistoricalStructuredTask({...community,prompt:"Another question"})).toBeNull();
 expect(getFnhHistoricalStructuredTask({...dehydration,modelPoints:["Just add water"]})).toBeNull();
 expect(community.marks).toBe(4);
 expect(dehydration.marks).toBe(2);
});
test("two independently explained community nutrition roles earn all four marks",()=>{
 const full="Educate families about balanced diets and food safety.\nSchool-feeding programmes give children nutritious school meals and prevent deficiencies.";
 const result=score(community,full);
 expect(result.confirmedMarks).toBe(4);
 expect(result.unresolvedMarks).toBe(0);
 expect(result.assessedMarks).toBe(4);
 expect(result.criteria.map(c=>c.marks)).toEqual([2,2]);
 expect(result.rubricVersion).toBe(FNH_STRUCTURED_CRITERIA_VERSION);
});
test("role identification and explanation are independently worth one mark each",()=>{
 const result=score(community,"Teach families.\nSchool feeding programmes help children get nutrients.");
 expect(result.confirmedMarks).toBe(3);
 expect(result.unresolvedMarks).toBe(1);
 expect(result.assessedMarks).toBeNull();
 expect(result.criteria.map(c=>c.marks)).toEqual([1,2]);
});
test("repetition, contradiction and unsupported effects cannot manufacture community marks",()=>{
 expect(score(community,"Educate families about balanced diets.\nTeach parents about food safety.").confirmedMarks).toBe(2);
 expect(score(community,"Do not educate families about nutrition.").confirmedMarks).toBe(0);
 expect(score(community,"Educate families about unhealthy junk food.").confirmedMarks).toBe(1);
 expect(score(community,"There are four separate roles.").confirmedMarks).toBe(0);
 expect(score(community,"Teach families.\nBalanced diets can help everyone.").confirmedMarks).toBe(1);
});
test("community assessment and nutrition education count as different roles",()=>{
 const result=score(community,"Screen communities for nutrient deficiencies to find vulnerable households.\nEducate parents about affordable balanced meals.");
 expect(result.confirmedMarks).toBe(4);
 expect(result.assessedMarks).toBe(4);
});
test("2005 dehydration definition separately verifies water removal and preservation mechanism",()=>{
 const complete=score(dehydration,"Dehydration removes moisture from food so bacteria cannot grow and cause spoilage.");
 expect(complete.confirmedMarks).toBe(2);
 expect(complete.unresolvedMarks).toBe(0);
 expect(complete.criteria.map(c=>c.marks)).toEqual([1,1]);
 const identification=score(dehydration,"Dehydration removes water from food.");
 expect(identification.confirmedMarks).toBe(1);
 expect(identification.unresolvedMarks).toBe(1);
 const reversed=score(dehydration,"Dehydration does not remove moisture from food.");
 expect(reversed.confirmedMarks).toBe(0);
 expect(reversed.unresolvedMarks).toBe(2);
 expect(score(dehydration,"Dehydration adds water to food.").confirmedMarks).toBe(0);
 expect(score(dehydration,"").assessedMarks).toBe(0);
});
test("historical totals and normal-scoring fallback remain intact",()=>{
 const answers={
  [q18.id+":b"]:"Educate families about balanced diets and food safety.\nProvide school-feeding programmes for children to avoid deficiencies."
 };
 const result=gradeFnhWrittenPaper([q18],answers);
 expect(result.maxMarks).toBe(16);
 expect(result.confirmedMarks).toBe(4);
 expect(result.assessedMarks).toBeNull();
 expect(result.unresolvedMarks).toBe(0);
 const standard=score(FNH_HISTORICAL_P2_2005.questions[0].items.find(p=>p.id==="d"),
   "increased thirst; frequent urination");
 expect(standard.confirmedMarks).toBe(2);
 expect(standard.maxMarks).toBe(2);
});
