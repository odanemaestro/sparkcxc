import {gradeFnhWrittenPart,gradeFnhWrittenPaper} from "./fnhPaper2Marking";
import {FNH_PAPER2_ORIGINAL_SET_ONE} from "../data/fnhPaper2Bank";

test("source-linked FNH gives verified credit only for actually written content",()=>{
 const part={marks:3,modelPoints:[
  "Diet means the usual foods and drinks consumed by a person.",
  "Fruit provides vitamin C for healthy tissues and wound healing.",
  "Clean drinking water reduces the risk of food contamination."
 ]};
 const full=gradeFnhWrittenPart(part,
  "Diet means the usual foods and drinks consumed by a person. Fruit provides vitamin C for healthy tissues and wound healing. Clean drinking water reduces the risk of food contamination.");
 expect(full.confirmedMarks).toBe(3);
 expect(full.unresolvedMarks).toBe(0);
 const partial=gradeFnhWrittenPart(part,"Diet means the usual foods and drinks consumed by a person.");
 expect(partial.confirmedMarks).toBe(1);
 expect(partial.unresolvedMarks).toBe(2);
 expect(partial.assessedMarks).toBeNull();
});
test("FNH never grants score from isolated words, repetition or opposite meanings",()=>{
 const p={marks:2,modelPoints:[
  "Fruit provides vitamin C for healthy tissues and wound healing.",
  "Clean drinking water reduces the risk of food contamination."
 ]};
 expect(gradeFnhWrittenPart(p,"Fruit vitamin tissues. Clean risk.").confirmedMarks).toBe(0);
 expect(gradeFnhWrittenPart(p,"Fruit does not provide vitamin C for healthy tissues and wound healing.").confirmedMarks).toBe(0);
 expect(gradeFnhWrittenPart(p,"Fruit provides vitamin C for healthy tissues and wound healing. Fruit provides vitamin C for healthy tissues and wound healing.").confirmedMarks).toBe(1);
});
test("FNH refuses to award credit for marking instructions in the model bank",()=>{
 const p={marks:2,modelPoints:[
  "Award distinct accurate food–nutrient pairs, not foods without the linked nutrient.",
  "Fruit provides vitamin C for healthy tissues and wound healing."
 ]};
 expect(gradeFnhWrittenPart(p,"Award distinct accurate food nutrient pairs not foods without linked nutrient.").confirmedMarks).toBe(0);
});
test("FNH never allows candidate-selected checkboxes to influence written grades",()=>{
 const part={marks:2,modelPoints:["Diet means the usual foods and drinks consumed by a person.",
   "Diet influences physical and nutritional wellbeing by supplying energy and nutrients."]};
 expect(gradeFnhWrittenPaper([{id:"Q",items:[{...part,id:"a"}]}],{}).confirmedMarks).toBe(0);
 const paper=FNH_PAPER2_ORIGINAL_SET_ONE;
 const graded=gradeFnhWrittenPaper(paper,{[paper[0].id+":a"]:
  "Diet means the usual foods and drinks consumed by a person."});
 expect(graded.maxMarks).toBe(96);
 expect(graded.confirmedMarks).toBeGreaterThan(0);
 expect(graded.assessedMarks).toBeNull();
 expect(graded.unresolvedMarks).toBeGreaterThan(0);
 expect(graded.confirmedMarks+graded.unresolvedMarks).toBeLessThanOrEqual(graded.maxMarks);
});


test("FNH cannot confirm a claim contradicted elsewhere in the same response",()=>{
 const part={marks:1,modelPoints:["Fruit provides vitamin C for healthy tissues and wound healing."]};
 const answer="Fruit provides vitamin C for healthy tissues and wound healing. Fruit does not provide vitamin C for healthy tissues and wound healing.";
 expect(gradeFnhWrittenPart(part,answer).confirmedMarks).toBe(0);
 expect(gradeFnhWrittenPart(part,answer).unresolvedMarks).toBe(1);
});
test("FNH numerical criteria cannot accept a different value by matching nearby words",()=>{
 const part={marks:1,modelPoints:["A safe holding temperature of 63 degrees prevents bacterial growth in food."]};
 expect(gradeFnhWrittenPart(part,"A safe holding temperature of 23 degrees prevents bacterial growth in food.").confirmedMarks).toBe(0);
 expect(gradeFnhWrittenPart(part,"A safe holding temperature of 63 degrees prevents bacterial growth in food.").confirmedMarks).toBe(1);
});
