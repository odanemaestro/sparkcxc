import {matchScienceWrittenEvidence,scienceResponseClauses} from "./scienceWrittenEvidence";

const tokens=value=>String(value).toLowerCase().match(/[a-z]+/g)||[];
const tokenPresent=(text,term)=>tokens(text).some(token=>token===term ||
 token.replace(/s$/,"")===term.replace(/s$/,""));
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

test("handles qualifying contrast without merging irrelevant negation into a positive science claim",()=>{
 expect(check("Heat increases evaporation although the water does not boil.","heat increases evaporation").matched).toBe(true);
 expect(check("Heat increases evaporation yet the water does not boil.","heat increases evaporation").matched).toBe(true);
});

test("contradictions after although, yet, and nevertheless cannot earn marks",()=>{
 for(const joining of ["although","yet","nevertheless"]){
  const answer="Heat increases evaporation "+joining+" heat does not increase evaporation.";
  const result=check(answer,"heat increases evaporation");
  expect(result.matched).toBe(false);
  expect(result.contradicted).toBe(true);
 }
});

test("rejects denials using fails to and unable to",()=>{
 for(const answer of ["Oxygen fails to move into blood.",
                      "Oxygen is unable to move into blood."]){
  const result=check(answer,"oxygen moves into blood");
  expect(result.matched).toBe(false);
  expect(result.contradicted).toBe(true);
 }
});
test("curly apostrophe denials do not earn positive evidence",()=>{
 const result=check("Oxygen doesn’t move into blood.","oxygen moves into blood");
 expect(result.matched).toBe(false);
 expect(result.contradicted).toBe(true);
});
test("source-authored negative facts retain their required polarity",()=>{
 expect(check("Water is unable to cross the barrier.","water is unable to cross the barrier").matched).toBe(true);
 expect(check("Water crosses the barrier.","water is unable to cross the barrier").matched).toBe(false);
});

test("rejects false-that and incorrect-to-say denials despite matching key science terms",()=>{
 for(const sentence of [
  "It is false that oxygen moves into blood.",
  "It is incorrect to say oxygen moves into blood.",
  "Oxygen moves into blood is false."
 ]){
  const result=check(sentence,"oxygen moves into blood");
  expect(result.matched).toBe(false);
  expect(result.contradicted).toBe(true);
 }
});
test("explicitly negative science references still receive matching negative claims",()=>{
 expect(check("It is false that light travels through opaque wood.",
  "it is false that light travels through opaque wood").matched).toBe(true);
});
