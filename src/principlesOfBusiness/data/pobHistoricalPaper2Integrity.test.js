import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";
import {buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {reviewPobHistoricalPaper2} from "./pobHistoricalPaper2RubricReview";
import {getPobP2VisualTask} from "./pobHistoricalPaper2Visual";
import {defaultPobArchiveSelection} from "../../grading/pobArchiveExaminer";

const canon={
 "POB-P2-2006-MJ:Q4:c.ii":{kind:"org-span",fields:{count:"2",left:"Sales Supervisor North",right:"Sales Supervisor South"}},
 "POB-P2-2006-MJ:Q4:d.ii":{kind:"command-path",fields:{step1:"Managing Director",step2:"Marketing Manager",step3:"Sales Supervisor South",step4:"Sales Clerk"}},
 "POB-P2-2014-MJ:Q1:c.ii":{kind:"org-branch",fields:{top:"Manager",left:"Supervisor of mail delivery",right:"Supervisor of mail sorting",leftParent:"Top position",rightParent:"Top position"}},
 "POB-P2-2018-MJ:Q1:b":{kind:"org-chain",fields:{top:"Board of Directors",middle:"Managing Director",bottom:"Supervisor",middleParent:"Top position",bottomParent:"Middle position"}},
 "POB-P2-2019-JAN:Q3:c":{kind:"distribution",fields:{box1:"Producer",box2:"Wholesaler",box3:"Retailer",box4:"Consumer"}},
 "POB-P2-2022-MJ:Q4:a.i":{kind:"distribution-missing",fields:{A:"Manufacturer",B:"Retailer"}}
};
test("all twenty full source-worked scripts reconcile to exactly 100 candidate marks without AI",()=>{
 const records=POB_HISTORICAL_REVIEW_BANKS.filter(r=>r.paper===2);
 const owner=records.map(r=>({r,p:buildPobOwnerPaper2Bank(r.id,r.bank)})).filter(x=>x.p);
 expect(owner).toHaveLength(20);
 for(const {r,p} of owner){
  const answers={};
  for(const q of p.questions){
   for(const part of q.parts){
    const key="Q"+q.number+":"+part.id;
    const visual=getPobP2VisualTask(r.id,key);
    if(visual){
     const value=canon[r.id+":"+key];
     expect(value).toBeDefined();
     expect(value.kind).toBe(visual.kind);
     answers[key]=value;
    }else{
     answers[key]=part.modelAnswer;
    }
   }
  }
  const selected=defaultPobArchiveSelection(p);
  const report=reviewPobHistoricalPaper2(answers,p,selected);
  expect(report.availableMarks).toBe(100);
  expect(report.assessedMarks).toBe(100);
  expect(report.confirmedMarks).toBe(100);
  expect(report.unresolvedMarks).toBe(0);
  expect(report.unresolvedParts).toBe(0);
  expect(report.questions.flatMap(x=>x.parts).every(x=>x.criteria.every(c=>c.assessedMarks===c.availableMarks))).toBe(true);
 }
});
test("copying an answer-diagram explanation instead of constructing a chart cannot earn chart marks",()=>{
 for(const [key] of Object.entries(canon)){
  const [paperId,partKey]=key.split(":Q");
  const id="Q"+partKey,number=Number(partKey.split(":")[0]);
  const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id===paperId),paper=buildPobOwnerPaper2Bank(record.id,record.bank);
  const part=paper.questions.find(q=>q.number===number).parts.find(p=>p.id===partKey.split(":")[1]);
  const report=reviewPobHistoricalPaper2({[id]:part.modelAnswer},paper,defaultPobArchiveSelection(paper));
  const outcome=report.questions.find(q=>q.number===number)?.parts.find(p=>p.id===id);
  if(!outcome)continue; // paper optional question not selected in original default selection
  expect(outcome.assessedMarks).toBeNull();
  expect(outcome.confirmedMarks).toBe(0);
  expect(outcome.unresolvedMarks).toBe(part.marks);
  expect(outcome.status).toBe("diagram-input-required");
 }
});
