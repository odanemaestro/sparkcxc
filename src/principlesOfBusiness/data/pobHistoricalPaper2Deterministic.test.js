import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";
import {buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {reviewPobHistoricalPaper2} from "./pobHistoricalPaper2RubricReview";
import {getPobP2VisualTask,gradePobP2VisualTask,POB_P2_VISUAL_TASKS} from "./pobHistoricalPaper2Visual";
import {gradePobHistoricalArithmetic,matchPobWrittenEvidence} from "./pobHistoricalPaper2Evidence";
import {defaultPobArchiveSelection} from "../../grading/pobArchiveExaminer";

const record=id=>POB_HISTORICAL_REVIEW_BANKS.find(x=>x.id===id);
const bank=id=>buildPobOwnerPaper2Bank(id,record(id).bank);
const review=(id,responses={},selected=null)=>reviewPobHistoricalPaper2(responses,bank(id),selected||defaultPobArchiveSelection(bank(id)));
const part=(result,question,key)=>result.questions.find(q=>q.number===question).parts.find(p=>p.part===key);

test("four source-specific visual tasks use exactly their original rubric marks",()=>{
 expect(Object.keys(POB_P2_VISUAL_TASKS)).toHaveLength(4);
 for(const [id,task] of Object.entries(POB_P2_VISUAL_TASKS)){
  const [paper,partKey]=id.split(":Q");
  const key="Q"+partKey;
  const q=Number(partKey.split(":")[0]);
  const p=bank(paper).questions.find(x=>x.number===q).parts.find(x=>x.id===partKey.split(":")[1]);
  expect(getPobP2VisualTask(paper,key)).toBe(task);
  expect(p.marks).toBe(task.marks);
  expect(p.criteria.reduce((sum,c)=>sum+c.marks,0)).toBe(task.marks);
  expect(p.criteria).toHaveLength(task.marks);
  expect(gradePobP2VisualTask(paper,key,{}).marks).toBe(0);
 }
});
test("2014 organisation chart credits top, two equal-level supervisors and separate reporting links",()=>{
 const id="POB-P2-2014-MJ",key="Q1:c.ii";
 const a={kind:"org-branch",fields:{top:"Manager",left:"Supervisor of mail delivery",right:"Supervisor of mail sorting",leftParent:"Top position",rightParent:"Top position"}};
 expect(gradePobP2VisualTask(id,key,a).marks).toBe(3);
 expect(part(review(id,{[key]:a}),1,"c.ii").assessedMarks).toBe(3);
 const swapped={...a,fields:{...a.fields,left:"Supervisor of mail sorting",right:"Supervisor of mail delivery"}};
 expect(gradePobP2VisualTask(id,key,swapped).marks).toBe(3);
 const missingLink={...a,fields:{...a.fields,rightParent:"No reporting relationship"}};
 expect(gradePobP2VisualTask(id,key,missingLink).marks).toBe(2);
 const wrong={kind:"org-branch",fields:{top:"Sales Clerk",left:"Wholesaler",right:"Consumer"}};
 expect(gradePobP2VisualTask(id,key,wrong).marks).toBe(0);
});
test("2018 chart awards partial credit for correctly located managerial levels and links",()=>{
 const id="POB-P2-2018-MJ",key="Q1:b";
 const a={kind:"org-chain",fields:{top:"Board of Directors",middle:"Managing Director",bottom:"Operations Manager",middleParent:"Top position",bottomParent:"Middle position"}};
 expect(gradePobP2VisualTask(id,key,a).marks).toBe(4);
 expect(part(review(id,{[key]:a}),1,"b").assessedMarks).toBe(4);
 const broken={...a,fields:{...a.fields,bottomParent:"No reporting relationship"}};
 expect(gradePobP2VisualTask(id,key,broken).marks).toBe(3);
});
test("January 2019 distribution figure scores each of its four positions individually",()=>{
 const id="POB-P2-2019-JAN",key="Q3:c";
 const a={kind:"distribution",fields:{box1:"Producer",box2:"Wholesaler",box3:"Retailer",box4:"Consumer"}};
 expect(gradePobP2VisualTask(id,key,a).marks).toBe(4);
 const p=part(review(id,{[key]:a}),3,"c");
 expect(p.assessedMarks).toBe(4);
 expect(p.criteria.map(c=>c.assessedMarks)).toEqual([1,1,1,1]);
 const partial={...a,fields:{...a.fields,box2:"Transporter",box4:"Wholesaler"}};
 expect(gradePobP2VisualTask(id,key,partial).marks).toBe(2);
});
test("May 2022 missing chain links give one mark each with accepted producer alternative",()=>{
 const id="POB-P2-2022-MJ",key="Q4:a.i";
 const a={kind:"distribution-missing",fields:{A:"Manufacturer",B:"Retailer"}};
 expect(gradePobP2VisualTask(id,key,a).marks).toBe(2);
 expect(part(review(id,{[key]:a}),4,"a.i").assessedMarks).toBe(2);
 const b={kind:"distribution-missing",fields:{A:"Producer",B:"Consumer"}};
 expect(gradePobP2VisualTask(id,key,b).marks).toBe(1);
 expect(part(review(id,{[key]:b}),4,"a.i").criteria.map(c=>c.assessedMarks)).toEqual([1,0]);
});
test("2005 calculation awards independent method and result marks without guessed wording",()=>{
 const id="POB-P2-2005-MJ";
 expect(gradePobHistoricalArithmetic(id,"Q9:a.ii","24,000 - 26,000 = -2,000 deficit").marks).toBe(2);
 expect(gradePobHistoricalArithmetic(id,"Q9:a.ii","24,000 - 26,000 = 3,000").marks).toBe(1);
 expect(gradePobHistoricalArithmetic(id,"Q9:a.ii","The balance of trade is 5000").marks).toBe(0);
 expect(gradePobHistoricalArithmetic(id,"Q9:b","visible -2000, invisible 5000, current-account surplus of 3000").marks).toBe(3);
 expect(gradePobHistoricalArithmetic(id,"Q9:b","goods balance -2000, net services 5000").marks).toBe(2);
 const result=review(id,{"Q9:a.ii":"24,000 - 26,000 = -2,000 deficit"},[1,2,3,4,6,9]);
 expect(part(result,9,"a.ii").assessedMarks).toBe(2);
 expect(result.availableMarks).toBe(100);
});
test("written evidence proves separate specific points but not repeated or negated claims",()=>{
 const criteria=[{marks:1,rule:"First valid reason"},{marks:1,rule:"Second different reason"}];
 const model="• Foreign trade improves employment and local wages for workers.\n• Export earnings bring foreign currency into the country.";
 const good="Foreign trade improves employment and local wages for workers. Export earnings bring foreign currency into the country.";
 const result=matchPobWrittenEvidence(good,model,criteria);
 expect(result.confirmed).toHaveLength(2);
 const repeat="Foreign trade improves employment and local wages for workers. Foreign trade improves employment and local wages for workers.";
 expect(matchPobWrittenEvidence(repeat,model,criteria).confirmed).toHaveLength(1);
 expect(matchPobWrittenEvidence("Foreign trade does not improve employment and local wages for workers.",model,criteria).confirmed).toHaveLength(0);
 expect(matchPobWrittenEvidence("Jobs and currency.",model,criteria).confirmed).toHaveLength(0);
});
test("all 20 historical papers remain 100-mark evidence-based without an AI provider",()=>{
 const rows=POB_HISTORICAL_REVIEW_BANKS.filter(r=>r.paper===2).map(r=>buildPobOwnerPaper2Bank(r.id,r.bank)).filter(Boolean);
 expect(rows).toHaveLength(20);
 for(const paper of rows){
  const scored=reviewPobHistoricalPaper2({},paper,defaultPobArchiveSelection(paper));
  expect(scored.availableMarks).toBe(100);
  expect(scored.assessedMarks).toBe(0);
  expect(scored.unresolvedMarks).toBe(0);
 }
});
