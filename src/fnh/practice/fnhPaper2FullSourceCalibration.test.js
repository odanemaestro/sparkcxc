import {FNH_HISTORICAL_P2_2005} from "../data/fnhHistorical2005Paper2";
import {FNH_HISTORICAL_P2_2006} from "../data/fnhHistorical2006Paper2";
import {FNH_HISTORICAL_P2_2008} from "../data/fnhHistorical2008Paper2";
import {FNH_HISTORICAL_P2_2009} from "../data/fnhHistorical2009Paper2";
import {FNH_HISTORICAL_P2_2010} from "../data/fnhHistorical2010Paper2";
import {FNH_HISTORICAL_P2_2011} from "../data/fnhHistorical2011Paper2";
import {FNH_HISTORICAL_P2_2012} from "../data/fnhHistorical2012Paper2";
import {FNH_HISTORICAL_P2_2013} from "../data/fnhHistorical2013Paper2";
import {FNH_HISTORICAL_P2_2014} from "../data/fnhHistorical2014Paper2";
import {FNH_HISTORICAL_P2_2015} from "../data/fnhHistorical2015Paper2";
import {FNH_HISTORICAL_P2_2016} from "../data/fnhHistorical2016Paper2";
import {FNH_HISTORICAL_P2_2017} from "../data/fnhHistorical2017Paper2";
import {FNH_HISTORICAL_P2_2018} from "../data/fnhHistorical2018Paper2";
import {FNH_HISTORICAL_P2_2019} from "../data/fnhHistorical2019Paper2";
import {FNH_HISTORICAL_P2_2021} from "../data/fnhHistorical2021Paper2";
import {FNH_HISTORICAL_P2_2022} from "../data/fnhHistorical2022Paper2";
import {FNH_HISTORICAL_P2_2024} from "../data/fnhHistorical2024Paper2";
import {FNH_HISTORICAL_P2_2026} from "../data/fnhHistorical2026Paper2";
import {FNH_PAPER2_ORIGINAL_SET_ONE} from "../data/fnhPaper2Bank";
import {FNH_PAPER2_ORIGINAL_SET_TWO} from "../data/fnhPaper2SetTwo";
import {gradeFnhWrittenPart,gradeFnhWrittenPaper,FNH_P2_RUBRIC_CALIBRATION_VERSION} from "./fnhPaper2Marking";
import {matchFnhCriterionEvidence} from "./fnhPaper2RubricCalibration";

const original=[FNH_PAPER2_ORIGINAL_SET_ONE,FNH_PAPER2_ORIGINAL_SET_TWO];
const historical=[FNH_HISTORICAL_P2_2005,FNH_HISTORICAL_P2_2006,FNH_HISTORICAL_P2_2008,FNH_HISTORICAL_P2_2009,FNH_HISTORICAL_P2_2010,FNH_HISTORICAL_P2_2011,FNH_HISTORICAL_P2_2012,FNH_HISTORICAL_P2_2013,FNH_HISTORICAL_P2_2014,FNH_HISTORICAL_P2_2015,FNH_HISTORICAL_P2_2016,FNH_HISTORICAL_P2_2017,FNH_HISTORICAL_P2_2018,FNH_HISTORICAL_P2_2019,FNH_HISTORICAL_P2_2021,FNH_HISTORICAL_P2_2022,FNH_HISTORICAL_P2_2024,FNH_HISTORICAL_P2_2026];
const all=[...original.map((questions,i)=>({id:"practice-"+(i+1),questions})),...historical];
const everyPart=paper=>paper.questions.flatMap(q=>q.items.map(p=>({...p,sourceKey:q.id+":"+p.id})));

test("all 18 historical Paper 2 years and both original sets have bounded question-level deterministic grading",()=>{
 expect(historical).toHaveLength(18);
 expect(original).toHaveLength(2);
 for(const paper of all){
  const questions=paper.questions;
  const out=gradeFnhWrittenPaper(questions,{});
  expect(out.rubricVersion).toBe(FNH_P2_RUBRIC_CALIBRATION_VERSION);
  expect(out.confirmedMarks).toBe(0);
  expect(out.unresolvedMarks).toBe(0);
  expect(out.assessedMarks).toBe(0);
  expect(out.maxMarks).toBe(questions.length*16);
  expect(out.questions).toHaveLength(questions.length);
  questions.forEach((q,index)=>{
   expect(out.questions[index].maxMarks).toBe(16);
   expect(new Set(q.items.map(p=>p.id)).size).toBe(q.items.length);
   q.items.forEach(part=>{
    const result=gradeFnhWrittenPart(part,"");
    expect(result.maxMarks).toBe(part.marks);
    expect(result.confirmedMarks).toBe(0);
    expect(result.status).toBe("unanswered");
   });
  });
 }
});
test("source answers across all released papers have bounded, explicit provenance and no automatically invented extra marks",()=>{
 let eligible=0,found=0,verifiedSourceParts=0,parts=0;
 for(const paper of all)for(const part of everyPart(paper)){
   parts++;
   const source=part.modelPoints.join("\n");
   const marked=gradeFnhWrittenPart(part,source);
   expect(marked.rubricVersion).toBe(FNH_P2_RUBRIC_CALIBRATION_VERSION);
   expect(marked.confirmedMarks).toBeGreaterThanOrEqual(0);
   expect(marked.confirmedMarks).toBeLessThanOrEqual(part.marks);
   expect(marked.confirmedMarks+marked.unresolvedMarks).toBeLessThanOrEqual(part.marks);
   const substantive=part.modelPoints.filter(point=>matchFnhCriterionEvidence(point,point).confirmed).length;
   eligible+=Math.min(part.marks,substantive);
   found+=marked.confirmedMarks;
   if(marked.confirmedMarks>0)verifiedSourceParts++;
 }
 expect(parts).toBeGreaterThan(500);
 expect(eligible).toBeGreaterThan(100);
 expect(found).toBeGreaterThan(100);
 expect(verifiedSourceParts).toBeGreaterThan(100);
});
test("accepts source-based alternate terms for 2005 historical nutrition symptoms",()=>{
 const paper=FNH_HISTORICAL_P2_2005;
 const [benefits,causes,, ,symptoms]=paper.questions[0].items;
 expect(symptoms.prompt).toMatch(/symptoms/i);
 const response="Charles reports increased thirst and frequent urination.";
 const result=gradeFnhWrittenPart(symptoms,response);
 expect(result.confirmedMarks).toBe(2);
 expect(result.unresolvedMarks).toBe(0);
 expect(gradeFnhWrittenPart(symptoms,"polydipsia; polyuria").confirmedMarks).toBe(2);
 expect(gradeFnhWrittenPart(symptoms,"he does not have increased thirst").confirmedMarks).toBe(0);
 expect(gradeFnhWrittenPart(benefits,"constipation prevention").confirmedMarks).toBeGreaterThanOrEqual(1);
});
test("source-based FNH distinct macronutrients never earn duplicate credit",()=>{
 const part=FNH_PAPER2_ORIGINAL_SET_ONE[1].items[0];
 expect(part.prompt).toMatch(/macronutrients/i);
 expect(gradeFnhWrittenPart(part,"carbohydrates and protein").confirmedMarks).toBe(2);
 expect(gradeFnhWrittenPart(part,"carbohydrates. carbs. starches.").confirmedMarks).toBeLessThanOrEqual(1);
 expect(gradeFnhWrittenPart(part,"carbohydrates, protein, and fats").confirmedMarks).toBe(2);
});
test("source-linked FNH complete match cannot be obtained from unsupported or conflicting vocabulary",()=>{
 const part={marks:2,modelPoints:[
  "Liver contains dietary iron important for haemoglobin formation.",
  "Orange juice supplies vitamin C, which improves absorption of non-haem iron present in the meal."
 ]};
 expect(gradeFnhWrittenPart(part,"Liver has iron to make haemoglobin. Orange juice has vitamin C, helping the body absorb iron.").confirmedMarks).toBeGreaterThanOrEqual(1);
 expect(gradeFnhWrittenPart(part,"Liver does not contain iron and cannot help haemoglobin.").confirmedMarks).toBe(0);
});
