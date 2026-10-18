import {evaluateHistoricalResponseBenchmarks,historicalPaperEligibility} from "./historicalResponseBenchmark";
import {FNH_HISTORICAL_P2_2005} from "../fnh/data/fnhHistorical2005Paper2";
import {FNH_HISTORICAL_P2_2018} from "../fnh/data/fnhHistorical2018Paper2";
import {gradeFnhWrittenPart,FNH_P2_RUBRIC_CALIBRATION_VERSION} from "../fnh/practice/fnhPaper2Marking";
import {FNH_STRUCTURED_CRITERIA_VERSION} from "../fnh/practice/fnhHistoricalStructuredCriteria";
import {POB_HISTORICAL_REVIEW_BANKS} from "../principlesOfBusiness/data/pobHistoricalArchiveRegistry";
import {buildPobOwnerPaper2Bank} from "../principlesOfBusiness/data/pobPaper2OwnerSourceBank";
import {reviewPobHistoricalPaper2,POB_HISTORICAL_RUBRIC_REVIEW_VERSION} from "../principlesOfBusiness/data/pobHistoricalPaper2RubricReview";
import {buildChemistryHistoricalExam} from "../chemistry/data/chemistryHistoricalExam";

const fnhPapers=[FNH_HISTORICAL_P2_2005,FNH_HISTORICAL_P2_2018];
const pobRecords=POB_HISTORICAL_REVIEW_BANKS.filter(row=>["POB-P2-2005-MJ","POB-P2-2019-JAN"].includes(row.id));
const pobPapers=pobRecords.map(record=>buildPobOwnerPaper2Bank(record.id,record.bank));

const fnh=(paper,question,part,category,response,confirmed,unresolved,id,version=FNH_P2_RUBRIC_CALIBRATION_VERSION)=>({
  caseId:id,subjectId:"food-nutrition-and-health",
  benchmarkAuthority:"spark-authored-candidate-fixture",
  paperId:paper.id,sourceFile:paper.sourceFile,
  questionId:paper.questions.find(q=>q.number===question).id,
  partId:part,category,response,expectedConfirmed:confirmed,
  expectedUnresolved:unresolved,rubricVersion:version
});
const pob=(paperId,question,part,category,response,confirmed,id)=>({
  caseId:id,subjectId:"principles-of-business",
  benchmarkAuthority:"spark-authored-candidate-fixture",
  paperId,sourceFile:pobRecords.find(r=>r.id===paperId).source.filename,
  questionId:String(question),partId:part,category,response,
  expectedConfirmed:confirmed,expectedUnresolved:0,
  rubricVersion:POB_HISTORICAL_RUBRIC_REVIEW_VERSION
});

const cases=[
 fnh(FNH_HISTORICAL_P2_2005,1,"d","correct",
  "Increased thirst and frequent urination.",2,0,"fnh-2005-symptoms-both"),
 fnh(FNH_HISTORICAL_P2_2005,1,"d","alternative",
  "Polydipsia; polyuria.",2,0,"fnh-2005-symptoms-medical-terms"),
 fnh(FNH_HISTORICAL_P2_2005,1,"d","partial",
  "Charles feels increased thirst.",1,1,"fnh-2005-symptoms-one"),
 fnh(FNH_HISTORICAL_P2_2005,1,"d","incorrect",
  "Charles has a broken leg.",0,2,"fnh-2005-symptoms-unrelated"),
 fnh(FNH_HISTORICAL_P2_2005,1,"d","contradiction",
  "Increased thirst. Charles does not have increased thirst.",0,2,"fnh-2005-symptoms-contradict"),
 fnh(FNH_HISTORICAL_P2_2005,1,"d","blank","",0,0,"fnh-2005-symptoms-unanswered"),
 fnh(FNH_HISTORICAL_P2_2005,1,"a","alternative",
  "Dietary fibre helps with constipation prevention.",1,2,"fnh-2005-fibre-relief"),
 fnh(FNH_HISTORICAL_P2_2005,1,"a","incorrect",
  "Fibre causes constipation.",0,3,"fnh-2005-fibre-opposite-effect"),
 fnh(FNH_HISTORICAL_P2_2005,1,"a","correct",
  "Fibre helps prevent constipation.",1,2,"fnh-2005-fibre-confirm-one"),
 fnh(FNH_HISTORICAL_P2_2018,1,"a","correct",
  "CARPHA; CFNI; Ministry of Health and Wellness.",3,0,"fnh-2018-three-nutrition-agencies"),
 fnh(FNH_HISTORICAL_P2_2018,1,"a","alternative",
  "CARPHA.",1,2,"fnh-2018-one-acronym"),
 fnh(FNH_HISTORICAL_P2_2018,1,"a","partial",
  "UNICEF.",1,2,"fnh-2018-one-international-agency"),
 fnh(FNH_HISTORICAL_P2_2018,1,"b","partial",
  "Educate families about balanced diets, food safety and affordable food choices.",2,2,"fnh-2018-community-nutrition-explanation",FNH_STRUCTURED_CRITERIA_VERSION),
 pob("POB-P2-2005-MJ",9,"a.ii","correct",
  "24,000 - 26,000 = -2,000 deficit.",2,"pob-2005-trade-full"),
 pob("POB-P2-2005-MJ",9,"a.ii","partial",
  "24,000 - 26,000 = 3,000.",1,"pob-2005-trade-method-only"),
 pob("POB-P2-2005-MJ",9,"a.ii","wrong-final",
  "24,000 - 26,000 = -2,000; final answer: 3,000.",1,"pob-2005-trade-wrong-final-method"),
 pob("POB-P2-2005-MJ",9,"a.ii","incorrect",
  "The trade balance is 5,000.",0,"pob-2005-trade-wrong"),
 pob("POB-P2-2005-MJ",9,"a.ii","blank","",0,"pob-2005-trade-unanswered"),
 pob("POB-P2-2005-MJ",9,"b","correct",
  "Visible -2,000, invisible 5,000, current-account surplus 3,000.",3,"pob-2005-current-account-full"),
 pob("POB-P2-2005-MJ",9,"b","partial",
  "Goods balance -2,000; net services 5,000.",2,"pob-2005-current-account-partial"),
 pob("POB-P2-2019-JAN",3,"c","diagram",
  {kind:"distribution",fields:{box1:"Producer",box2:"Wholesaler",box3:"Retailer",box4:"Consumer"}},
  4,"pob-2019-distribution-full"),
 pob("POB-P2-2019-JAN",3,"c","diagram",
  {kind:"distribution",fields:{box1:"Producer",box2:"Transporter",box3:"Retailer",box4:"Wholesaler"}},
  2,"pob-2019-distribution-partial")
];

function resolve(fixture){
 if(fixture.subjectId==="food-nutrition-and-health"){
   const paper=fnhPapers.find(p=>p.id===fixture.paperId);
   if(!paper)throw Error("not found");
   const question=paper.questions.find(q=>q.id===fixture.questionId);
   const part=question?.items.find(p=>p.id===fixture.partId);
   if(!part)throw Error("historical part missing");
   const scored=gradeFnhWrittenPart(part,fixture.response);
   return {paperId:paper.id,sourceFile:paper.sourceFile,questionId:question.id,partId:part.id,
     confirmed:scored.confirmedMarks,unresolved:scored.unresolvedMarks,maximum:part.marks,
     final:scored.assessedMarks!==null,rubricVersion:scored.rubricVersion};
 }
 if(fixture.subjectId==="principles-of-business"){
   const paper=pobPapers.find(p=>p.id===fixture.paperId);
   const question=paper?.questions.find(q=>String(q.number)===fixture.questionId);
   const part=question?.parts.find(p=>p.id===fixture.partId);
   if(!part)throw Error("historical part missing");
   const responseKey="Q"+question.number+":"+part.id;
   const review=reviewPobHistoricalPaper2({[responseKey]:fixture.response},paper,[question.number]);
   const scored=review.questions[0].parts.find(p=>p.part===part.id);
   return {paperId:paper.id,
     sourceFile:pobRecords.find(r=>r.id===paper.id).source.filename,
     questionId:String(question.number),partId:part.id,maximum:part.marks,
     confirmed:scored.confirmedMarks,unresolved:scored.unresolvedMarks,
     final:scored.assessedMarks!==null,rubricVersion:review.rubricVersion};
 }
 throw Error("Unknown calibration subject");
}

test("actual historical FNH and POB candidate responses retain distinct credit, uncertainty, and provenance",()=>{
 const report=evaluateHistoricalResponseBenchmarks(cases,resolve);
 expect(report.total).toBe(22);
 expect(report.failures).toEqual([]);
 expect(report.pass).toBe(true);
 expect(report.bySubject["food-nutrition-and-health"].failed).toBe(0);
 expect(report.bySubject["principles-of-business"].failed).toBe(0);
 expect(report.byCategory.alternative).toBeGreaterThan(1);
 expect(report.byCategory.contradiction).toBeGreaterThan(0);
 expect(report.byCategory["wrong-final"]).toBe(1);
 expect(report.bySubject["food-nutrition-and-health"].missedCredits).toBe(0);
 expect(report.bySubject["principles-of-business"].falseAwards).toBe(0);
});
test("a broken historic scorer's false awards and withheld valid credit are measurable",()=>{
 const altered=fixture=>{
   const result=resolve(fixture);
   if(fixture.caseId==="fnh-2005-fibre-opposite-effect")return {...result,confirmed:1,unresolved:2};
   if(fixture.caseId==="pob-2005-trade-full")return {...result,confirmed:1};
   return result;
 };
 const report=evaluateHistoricalResponseBenchmarks(cases,altered);
 expect(report.pass).toBe(false);
 expect(report.bySubject["food-nutrition-and-health"].falseAwards).toBe(1);
 expect(report.bySubject["principles-of-business"].missedCredits).toBe(1);
 expect(report.failures.some(r=>r.error==="confirmed-credit-disagreement")).toBe(true);
});
test("source identity drift and fixture tampering always fail",()=>{
 const tampered=[{...cases[0],sourceFile:"not-the-original.pdf"}];
 const report=evaluateHistoricalResponseBenchmarks(tampered,resolve);
 expect(report.pass).toBe(false);
 expect(report.failures.map(f=>f.error)).toContain("source-identity-drift");
 const ids=evaluateHistoricalResponseBenchmarks([cases[0],cases[0]],resolve);
 expect(ids.failures.map(f=>f.error)).toContain("duplicate-or-missing-case-id");
});
test("all Chemistry historical drafts remain blocked from certified scoring despite available text or mark schemes",()=>{
 const source=buildChemistryHistoricalExam("CHEM-P2-2005-MJ");
 expect(source).toBeTruthy();
 expect(source.isHistorical).toBe(true);
 expect(source.verified).toBe(false);
 const gate=historicalPaperEligibility({
   historical:source.isHistorical,sourceVerified:source.verified,
   rubricVerified:false,bankVerified:source.complete===true,
   selectionValid:true
 });
 expect(gate.eligible).toBe(false);
 expect(gate.blockers).toContain("source-not-verified");
 expect(gate.blockers).toContain("rubric-not-verified");
 expect(historicalPaperEligibility({
   historical:true,sourceVerified:true,rubricVerified:true,
   bankVerified:true,selectionValid:true
 }).eligible).toBe(true);
});
