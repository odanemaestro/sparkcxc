import {getPobDemandPriceTask,gradePobDemandPricePart,
  POB_DEMAND_PRICE_RUBRIC_VERSION} from "./pobHistoricalDemandPriceMarking";
import {reviewPobHistoricalPaper2,POB_HISTORICAL_RUBRIC_REVIEW_VERSION} from "./pobHistoricalPaper2RubricReview";
import {buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";

const paperId="POB-P2-2005-MJ";
const entry=POB_HISTORICAL_REVIEW_BANKS.find(row=>row.id===paperId);
const paper=buildPobOwnerPaper2Bank(paperId,entry.bank);
const scored=(part,response)=>gradePobDemandPricePart(paperId,part,response);
const review=(part,response)=>reviewPobHistoricalPaper2({["Q3:"+part]:response},paper,[3])
 .questions[0].parts.find(row=>row.part===part);

test("calibration applies only to the May/June 2005 Q3(c) and Q3(d) 6-mark parts",()=>{
 expect(paper).toBeTruthy();
 for(const part of ["c","d"]){
   const authored=paper.questions.find(q=>q.number===3).parts.find(p=>p.id===part);
   expect(authored).toBeTruthy();
   expect(authored.marks).toBe(6);
   expect(authored.criteria.map(c=>c.marks)).toEqual([2,2,2]);
   expect(getPobDemandPriceTask(paperId,"Q3:"+part)?.maximum).toBe(6);
 }
 expect(getPobDemandPriceTask("POB-P2-2006-MJ","Q3:c")).toBeNull();
 expect(getPobDemandPriceTask(paperId,"Q3:b")).toBeNull();
 expect(POB_HISTORICAL_RUBRIC_REVIEW_VERSION).toContain("v5");
});
test("three distinct demand-decreasing factors with linked effects receive 6 marks",()=>{
 const answer=[
   "Falling household income causes families to buy less ice cream.",
   "Cold weather reduces demand for ice cream.",
   "Cheaper frozen yoghurt makes consumers switch to yoghurt rather than ice cream."
 ].join("\n");
 const result=scored("Q3:c",answer);
 expect(result.maximum).toBe(6);
 expect(result.confirmedMarks).toBe(6);
 expect(result.unresolvedMarks).toBe(0);
 expect(result.assessedMarks).toBe(6);
 expect(result.criteria.map(c=>c.marks)).toEqual([2,2,2]);
 expect(result.concepts.map(c=>c.conceptId)).toEqual(["lower-income","weather","substitutes"]);
 const actual=review("c",answer);
 expect(actual.confirmedMarks).toBe(6);
 expect(actual.assessedMarks).toBe(6);
 expect(actual.subcriteriaVersion).toBe(POB_DEMAND_PRICE_RUBRIC_VERSION);
 expect(actual.criteria.every(c=>Boolean(c.evidence))).toBe(true);
});
test("partial and alternative demand answers retain identification without invented explanation",()=>{
 const answer="Falling household income.\nCold or rainy weather.\nCheaper frozen yoghurt makes customers switch to it instead of ice cream.";
 const result=scored("Q3:c",answer);
 expect(result.criteria.map(c=>c.marks)).toEqual([1,1,2]);
 expect(result.confirmedMarks).toBe(4);
 expect(result.unresolvedMarks).toBe(2);
 expect(result.assessedMarks).toBeNull();
 const actual=review("c",answer);
 expect(actual.confirmedMarks).toBe(4);
 expect(actual.unresolvedMarks).toBe(2);
 expect(actual.assessedMarks).toBeNull();
});
test("rising income, ice-cream own-price and warm weather are not valid decreasing-demand factors",()=>{
 expect(scored("Q3:c","Rising income increases ice cream demand.").confirmedMarks).toBe(0);
 expect(scored("Q3:c","Higher price of ice cream reduces demand.").confirmedMarks).toBe(0);
 expect(scored("Q3:c","Warm weather increases demand for ice cream.").confirmedMarks).toBe(0);
 expect(scored("Q3:c","Cooler weather increases demand for ice cream.").confirmedMarks).toBe(1);
 expect(scored("Q3:c","Cooler weather reduces demand for ice cream.").confirmedMarks).toBe(2);
});
test("different wordings of the same demand factor never count as three points",()=>{
 const result=scored("Q3:c","Cool weather lowers ice cream demand. Cold weather reduces demand for ice cream. Rainy weather makes fewer people buy ice cream.");
 expect(result.confirmedMarks).toBeLessThanOrEqual(2);
 expect(result.concepts.map(c=>c.conceptId)).toEqual(["weather"]);
});
test("demand factors cannot borrow an effect from a different statement",()=>{
 const result=scored("Q3:c","Cool weather.\nIce cream demand decreases for unrelated reasons.");
 expect(result.confirmedMarks).toBe(1);
 expect(result.unresolvedMarks).toBe(5);
});
test("three distinct producer/consumer cheese price influences earn six marks",()=>{
 const answer=[
   "Producers cut cheese supply so its price rises.",
   "Producers increase cheese production so its price falls.",
   "Consumers boycott cheese so cheese prices fall."
 ].join("\n");
 const result=scored("Q3:d",answer);
 expect(result.confirmedMarks).toBe(6);
 expect(result.assessedMarks).toBe(6);
 expect(result.concepts.map(c=>c.conceptId)).toEqual(["supply-cut","supply-rise","boycott"]);
 const actual=review("d",answer);
 expect(actual.confirmedMarks).toBe(6);
 expect(actual.assessedMarks).toBe(6);
 expect(actual.subcriteriaVersion).toBe(POB_DEMAND_PRICE_RUBRIC_VERSION);
});
test("advertising, monopoly and price-control explanations accept independently justified marks",()=>{
 expect(scored("Q3:d","Producers advertise cheese, increasing demand and raising its price.").confirmedMarks).toBe(2);
 expect(scored("Q3:d","A monopoly fixes cheese prices.").confirmedMarks).toBe(2);
 const controls=scored("Q3:d","Consumers lobby government because they want price controls on cheese.");
 expect(controls.confirmedMarks).toBe(2);
 expect(controls.concepts[0].conceptId).toBe("price-control");
});
test("backwards cheese economic directions receive no causal explanation credit",()=>{
 const cut=scored("Q3:d","Producers cut cheese supply so its price falls.");
 expect(cut.confirmedMarks).toBe(1);
 const rise=scored("Q3:d","Producers increase cheese supply so its price rises.");
 expect(rise.confirmedMarks).toBe(1);
 const boycott=scored("Q3:d","Consumers boycott cheese so cheese prices rise.");
 expect(boycott.confirmedMarks).toBe(1);
});
test("keyword stuffing and repeated cheese-price explanations do not earn six marks",()=>{
 const result=scored("Q3:d","Cheese cheese price supply demand advertising producers consumers.");
 expect(result.confirmedMarks).toBeLessThanOrEqual(1);
 const repeats=scored("Q3:d","Consumers boycott cheese so its price falls.\nBuyers boycott cheese which lowers its price.\nConsumers avoid buying cheese causing lower prices.");
 expect(repeats.confirmedMarks).toBeLessThanOrEqual(2);
});
test("blank, negative and unfamiliar phrases cannot silently receive incorrect zero grades",()=>{
 for(const part of ["Q3:c","Q3:d"]){
   const result=scored(part,"");
   expect(result.confirmedMarks).toBe(0);
   expect(result.unresolvedMarks).toBe(0);
   expect(result.status).toBe("unanswered");
 }
 const unfamiliar=scored("Q3:c","A plausible but unfamiliar determinant could change consumer attitudes.");
 expect(unfamiliar.confirmedMarks).toBe(0);
 expect(unfamiliar.unresolvedMarks).toBe(6);
 expect(unfamiliar.assessedMarks).toBeNull();
 expect(scored("Q3:d","Producers do not reduce cheese supply.").confirmedMarks).toBe(0);
});
test("existing POB 2005 labour and beef calibrations remain unaffected",()=>{
 const answer="Training improves workers' skills. Bonuses motivate staff to work harder. Modern machines increase output.";
 const previous=reviewPobHistoricalPaper2({"Q2:c":answer},paper,[2]).questions[0].parts.find(p=>p.part==="c");
 expect(previous.subcriteriaVersion).toContain("pob-developed-source");
 expect(previous.confirmedMarks).toBe(6);
});
