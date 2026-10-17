import {
 POB_2023_JAN_P1_AUTHORED_KEY,verifyPob2023JanP1AuthoredKey
} from "./pobHistorical2023JanP1AuthoredKey";
import {
 POB_2024_JAN_P2_SPARK_MARKING,verifyPob2024JanP2AuthoredRubric
} from "./pobHistorical2024JanP2AuthoredRubric";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {POB_HISTORICAL_2023_JAN_P1_Q01_10} from "./pobHistorical2023JanP1Q01to10Draft";
import {POB_HISTORICAL_P2_2024_JAN_DRAFT} from "./pobHistoricalP22024JanDraft";

describe("SPARK internally authored historical POB answer and rubric banks",()=>{
 test("Jan 2023 P1: exactly 60 distinct explained answers, tied to the correct source",()=>{
  const paper=POB_2023_JAN_P1_AUTHORED_KEY;
  expect(verifyPob2023JanP1AuthoredKey()).toEqual({valid:true,errors:[]});
  expect(paper.entries).toHaveLength(60);
  expect(paper.entries.map(r=>r.answer).join("")).toBe(
   "BAACADCCBAADBADDBBCADCADBCBCDBDCBAADBDCBCCAADACDDCBCCACBBDBD"
  );
  expect(paper.entries.every(row=>row.explanation.length>35)).toBe(true);
  expect(paper.entries.every(row=>row.sourcePdfPage>=2&&row.sourcePdfPage<=9)).toBe(true);
  expect(paper.sourceSha256).toBe(POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper.id).sourceSha256);
  expect(paper.officialCxcKeySupplied).toBe(false);
  expect(paper.liveScoringApproved).toBe(false);
 });
 test("first ten Jan 2023 answers fit the already source-checked printed options",()=>{
  const source=POB_HISTORICAL_2023_JAN_P1_Q01_10.questions;
  for(let i=0;i<10;i++){
   const key=POB_2023_JAN_P1_AUTHORED_KEY.entries[i];
   expect(source[i].number).toBe(key.number);
   expect(source[i].options).toHaveLength(4);
   expect(source[i].options["ABCD".indexOf(key.answer)]).toBeTruthy();
  }
  expect(source[0].options[1]).toBe("mixed economy");
  expect(source[3].options[2]).toMatch(/Stationery/);
  expect(source[6].options[2]).toBe("Motivating");
  expect(source[9].options[0]).toBe("unfair practices");
 });
 test("P1 source tampering, grade activation or incomplete explanations fail verification",()=>{
  const clone=()=>JSON.parse(JSON.stringify(POB_2023_JAN_P1_AUTHORED_KEY));
  const p1=clone();p1.entries[2].answer="X";
  expect(verifyPob2023JanP1AuthoredKey(p1).valid).toBe(false);
  const p2=clone();p2.entries[25].explanation="";
  expect(verifyPob2023JanP1AuthoredKey(p2).valid).toBe(false);
  const p3=clone();p3.liveScoringApproved=true;
  expect(verifyPob2023JanP1AuthoredKey(p3).valid).toBe(false);
  const p4=clone();p4.entries.pop();
  expect(verifyPob2023JanP1AuthoredKey(p4).valid).toBe(false);
 });
 test("Jan 2024 P2: correct source, 28 parts, exactly 100 separately awarded criteria",()=>{
  const paper=POB_2024_JAN_P2_SPARK_MARKING;
  expect(verifyPob2024JanP2AuthoredRubric()).toEqual({
   valid:true,errors:[],parts:28,marks:100
  });
  expect(paper.questions).toHaveLength(5);
  const original=POB_HISTORICAL_P2_2024_JAN_DRAFT;
  expect(paper.sourceSha256).toBe(POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper.id).sourceSha256);
  for(const q of paper.questions){
   const source=original.questions.find(s=>s.number===q.number);
   expect(source).toBeDefined();
   expect(q.parts.map(p=>p.id)).toEqual(source.parts.map(p=>p.id));
   expect(q.parts.map(p=>p.prompt)).toEqual(source.parts.map(p=>p.prompt));
   expect(q.parts.map(p=>p.marks)).toEqual(source.parts.map(p=>p.marks));
   expect(q.parts.reduce((sum,p)=>sum+p.marks,0)).toBe(20);
  }
  expect(paper.officialCxcMarkingSchemeSupplied).toBe(false);
  expect(paper.liveScoringApproved).toBe(false);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
 test("P2 rejects a 19- or 21-mark question, missing part, fake CXC accreditation",()=>{
  const clone=()=>JSON.parse(JSON.stringify(POB_2024_JAN_P2_SPARK_MARKING));
  const wrong=clone();wrong.questions[2].parts[0].criteria.pop();
  expect(verifyPob2024JanP2AuthoredRubric(wrong).valid).toBe(false);
  const wrong2=clone();wrong2.questions[1].parts.pop();
  expect(verifyPob2024JanP2AuthoredRubric(wrong2).valid).toBe(false);
  const fake=clone();fake.officialCxcMarkingSchemeSupplied=true;
  expect(verifyPob2024JanP2AuthoredRubric(fake).valid).toBe(false);
 });
 test("source ambiguity cannot falsely award intellectual property marks",()=>{
  const paper=POB_2024_JAN_P2_SPARK_MARKING;
  const ip=paper.questions[2].parts.find(p=>p.id==="d.ii");
  expect(ip.modelAnswer).toMatch(/original novel/i);
  expect(ip.modelAnswer).toMatch(/royalties/i);
  expect(ip.criteria).toHaveLength(3);
  // Source asks about 'obtaining' copyright, but copyright normally attaches
  // automatically to an original written work without mandatory registration.
  expect(paper.rubricProvenance).toBe("spark-authored-not-CXC-official");
 });
});