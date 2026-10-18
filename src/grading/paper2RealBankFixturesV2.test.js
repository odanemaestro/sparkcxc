import physicsPaper from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import itData from "../informationTechnology/practice/itPaper2Data.json";
import {mapPhysicsPaper2,mapInformationTechnologyPaper2} from "./paper2TechnicalAdaptersV2";

test("Physics bank maps every part without losing marks",()=>{
 const mapped=mapPhysicsPaper2({paper:physicsPaper});
 const parts=physicsPaper.questions.flatMap(question=>question.parts);
 expect(mapped.criteria).toHaveLength(parts.length);
 expect(mapped.criteria.reduce((total,part)=>total+part.maxMarks,0))
  .toBe(physicsPaper.marks);
 expect(mapped.criteria.every(c=>c.acceptedPhrases.length===0)).toBe(true);
});

test("IT source bank maps every part without losing marks",()=>{
 expect(itData.papers.length).toBeGreaterThan(0);
 for(const paper of itData.papers){
  const mapped=mapInformationTechnologyPaper2({paper});
  const parts=paper.questions.flatMap(question=>question.parts);
  expect(mapped.criteria).toHaveLength(parts.length);
  expect(mapped.criteria.reduce((sum,c)=>sum+c.maxMarks,0))
   .toBe(itData.format.marks);
 }
});
