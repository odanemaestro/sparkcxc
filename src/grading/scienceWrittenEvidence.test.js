import {matchScienceWrittenEvidence,scienceResponseClauses} from "./scienceWrittenEvidence";

const tokens=value=>String(value).toLowerCase().match(/[a-z]+/g)||[];
const tokenPresent=(text,term)=>tokens(text).includes(term);
const check=(response,reference,strict=false)=>matchScienceWrittenEvidence(response,reference,{tokens,tokenPresent,strict});

test("scores evidence within one clause, never assembled keywords across sentences",()=>{
 expect(check("Heat increases evaporation.","heat increases evaporation").matched).toBe(true);
 expect(check("Heat increases. Evaporation occurs.","heat increases evaporation").matched).toBe(false);
});
test("rejects explicit contradictory claims, including corrected-looking later claims",()=>{
 const result=check("Oxygen moves into blood. Oxygen does not move into blood.","oxygen moves into blood");
 expect(result.matched).toBe(false);
 expect(result.contradicted).toBe(true);
});
test("a separate irrelevant negation does not defeat valid affirmative evidence",()=>{
 expect(check("Plants do not eat soil. Heat increases evaporation.","heat increases evaporation").matched).toBe(true);
});
test("accepts valid negative reference only when the candidate states the negative",()=>{
 expect(check("Light does not travel through wood.","light does not travel through wood").matched).toBe(true);
 expect(check("Light travels through wood.","light does not travel through wood").matched).toBe(false);
});
test("does not split decimal values at their decimal points",()=>{
 expect(scienceResponseClauses("The mass is 2.50 g. The solution is blue.")).toEqual(["The mass is 2.50 g","The solution is blue."]);
});
