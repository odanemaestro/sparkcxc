import {gradePobHistoricalArithmetic,matchPobWrittenEvidence} from "./pobHistoricalPaper2Evidence";
const criteria=[{marks:1,rule:"First valid reason"},{marks:1,rule:"Second different reason"}];
const model="• Foreign trade improves employment and local wages for workers.\n• Export earnings bring foreign currency into the country.";
test("POB separates distinct positive claims and prevents contradictory credit",()=>{
 const good="Foreign trade improves employment and local wages for workers. Export earnings bring foreign currency into the country.";
 expect(matchPobWrittenEvidence(good,model,criteria).confirmed).toHaveLength(2);
 const contradict="Foreign trade improves employment and local wages for workers. Foreign trade does not improve employment and local wages for workers.";
 expect(matchPobWrittenEvidence(contradict,model,criteria).confirmed).toHaveLength(0);
 expect(matchPobWrittenEvidence(good+" "+good,model,criteria).confirmed).toHaveLength(2);
});
test("POB cannot use a correct working value over an explicitly wrong final answer",()=>{
 const id="POB-P2-2005-MJ";
 expect(gradePobHistoricalArithmetic(id,"Q9:a.ii",
  "24000 - 26000 = -2000 deficit; final answer: 3000").marks).toBe(1);
 expect(gradePobHistoricalArithmetic(id,"Q9:a.ii",
  "24000 - 26000 = -2000 deficit; final answer: -2000").marks).toBe(2);
 expect(gradePobHistoricalArithmetic(id,"Q9:b",
  "visible -2000, invisible 5000, current account surplus 3000. Final answer: 7000").marks).toBe(2);
});
