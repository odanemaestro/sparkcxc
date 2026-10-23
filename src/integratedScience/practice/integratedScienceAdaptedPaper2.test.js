import {ADAPTED_BIOLOGY_P2_ID,ADAPTED_BIOLOGY_P2_MARKS,ADAPTED_BIOLOGY_P2_RUBRIC,
 ADAPTED_BIOLOGY_P2_QUESTIONS,gradeAdaptedBiologyPaper2} from "./integratedScienceAdaptedPaper2";

describe("independent adapted biology Paper 2 marking",()=>{
 test("versioned source identity and total are not the historical 105-mark paper",()=>{
  expect(ADAPTED_BIOLOGY_P2_ID).toBe("is-p2-adapted-biology-v1");
  expect(ADAPTED_BIOLOGY_P2_RUBRIC).toBe("is-p2-adapted-biology-rubric-v1");
  expect(ADAPTED_BIOLOGY_P2_MARKS).toBe(12);
  expect(ADAPTED_BIOLOGY_P2_QUESTIONS.map(x=>x.maxMarks)).toEqual([4,6,2]);
  const blank=gradeAdaptedBiologyPaper2({});
  expect(blank.maxMarks).toBe(12);
  expect(blank.score).toBe(0);
  expect(blank.originalSourceCriterionVerified).toBe(false);
  expect(blank.serverAuthoritative).toBe(false);
 });
 test("correct labels and fixed-size calculation earn exactly 12 marks",()=>{
  const result=gradeAdaptedBiologyPaper2({
   "stoma-identification":{A:"guard cell",B:"stoma",C:"chloroplast",D:"nucleus"},
   "flower-identification":{A:"petal",B:"sepal",C:"anther",D:"filament",E:"stigma",F:"ovary"},
   "flower-magnification":{working:"120 ÷ 60 = 2",answer:"×2"}
  });
  expect(result.rows.map(r=>r.score)).toEqual([4,6,2]);
  expect(result.score).toBe(12);
  expect(result.percent).toBe(100);
  expect(result.rows.every(r=>r.originalSourceCriterionVerified===false)).toBe(true);
 });
 test("partial, swapped, missing and contradictory responses are not full marks",()=>{
  const result=gradeAdaptedBiologyPaper2({
   "stoma-identification":{A:"stoma",B:"guard cell",C:"chloroplast",D:"nucleus"},
   "flower-identification":{A:"petal",B:"wrong",C:"anther"},
   "flower-magnification":{working:"60/120",answer:"×2"}
  });
  expect(result.rows.map(r=>r.score)).toEqual([2,2,1]);
  expect(result.score).toBe(5);
 });
 test("untrusted extras cannot change the published practice total",()=>{
  const r=gradeAdaptedBiologyPaper2({
   "stoma-identification":{A:"guard cell",B:"stoma",C:"chloroplast",D:"nucleus",extra:"100 marks"},
   "unknown":{score:999},
   "flower-magnification":{working:"",answer:""}
  });
  expect(r.score).toBe(4);
  expect(r.maxMarks).toBe(12);
 });
});