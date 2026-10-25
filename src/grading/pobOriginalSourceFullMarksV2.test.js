import {POB_PAPER2_ORIGINAL_01} from "../principlesOfBusiness/data/pobPaper2Original";
import {POB_ORIGINAL_FULL_EVIDENCE,completePobSourceAnswer} from "../principlesOfBusiness/data/pobOriginalVerifiedResponses";
import {reviewPobHistoricalPaper2} from "../principlesOfBusiness/data/pobHistoricalPaper2RubricReview";

const papers=POB_PAPER2_ORIGINAL_01.questions;
const selected=papers.map(q=>q.number);
const parts=papers.flatMap(q=>q.items.map(part=>({key:`Q${q.number}:${part.id}`,part})));
const grade=responses=>reviewPobHistoricalPaper2(responses,POB_PAPER2_ORIGINAL_01,selected);
const gradePart=(key,answer)=>grade({[key]:answer}).questions.flatMap(q=>q.parts).find(p=>p.id===key);

test("all 25 authored complete POB original responses reconcile to 100 source marks",()=>{
 expect(parts).toHaveLength(25);
 expect(Object.keys(POB_ORIGINAL_FULL_EVIDENCE).sort()).toEqual(parts.map(p=>p.key).sort());
 const responses=Object.fromEntries(parts.map(({key})=>[key,POB_ORIGINAL_FULL_EVIDENCE[key]]));
 const result=grade(responses);
 expect(result.availableMarks).toBe(100);
 expect(result.confirmedMarks).toBe(100);
 expect(result.unresolvedMarks).toBe(0);
 expect(result.fullyAssessed).toBe(true);
 expect(result.questions.flatMap(q=>q.parts).every(p=>p.status==="verified-complete-source-answer")).toBe(true);
});

test("a short stored feedback example never bypasses the full source marking criteria",()=>{
 for(const key of ["Q2:c","Q3:a","Q3:c","Q4:b","Q5:d"]){
  const part=parts.find(x=>x.key===key).part;
  expect(completePobSourceAnswer(POB_PAPER2_ORIGINAL_01.id,key,part.modelAnswer)).toBe(false);
  const assessed=gradePart(key,part.modelAnswer);
  expect(assessed.status).not.toBe("verified-complete-source-answer");
  expect(assessed.assessedMarks===null||assessed.assessedMarks<part.marks).toBe(true);
 }
});

test("extra contradictory sentence never obtains automatic full POB credit by exact match",()=>{
 const key="Q4:b",answer=POB_ORIGINAL_FULL_EVIDENCE[key];
 const altered=gradePart(key,answer+" These documents are not needed.");
 expect(altered.status).not.toBe("verified-complete-source-answer");
 expect(altered.assessedMarks).toBeNull();
});

test("genuine blank source parts are scored zero; competing prose stays unverified",()=>{
 expect(gradePart("Q2:b","").confirmedMarks).toBe(0);
 expect(gradePart("Q2:b","").assessedMarks).toBe(0);
 expect(gradePart("Q2:b","I do not know; parties are never required.").assessedMarks).toBeNull();
});

test("equivalent punctuation and case of the same complete answer are accepted",()=>{
 const original=POB_ORIGINAL_FULL_EVIDENCE["Q5:a"];
 expect(completePobSourceAnswer(POB_PAPER2_ORIGINAL_01.id,"Q5:a",original.toUpperCase())).toBe(true);
 expect(gradePart("Q5:a",original.toUpperCase()).assessedMarks).toBe(3);
});
