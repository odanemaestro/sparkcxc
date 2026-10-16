import {inspectPobShortAnswer,POB_SHORT_ANSWER_HINT_KEYS} from "./pobShortAnswerFeedback";
const id="POB-SPARK-P2-ORIGINAL-01-Q2:a";
describe("POB cautious written-answer feedback",()=>{
 test("provides concept hints but never points",()=>{
  const x=inspectPobShortAnswer(id,"Planning and organising");
  expect(x.observed).toEqual(["planning","organising"]);
  expect(x.marks).toBeNull();
  expect(x.message).toMatch(/not marks/i);
 });
 test("does not reward substrings in unrelated words",()=>{
  const x=inspectPobShortAnswer(id,"My planarian specimen is unusual.");
  expect(x.observed).toEqual([]);
 });
 test("avoids directly negated concepts",()=>{
  const x=inspectPobShortAnswer(id,"Not planning, but leading.");
  expect(x.observed).not.toContain("planning");
  expect(x.observed).toContain("leading");
 });
 test("lists potential omissions without treating them as errors",()=>{
  const x=inspectPobShortAnswer("POB-SPARK-P2-ORIGINAL-01-Q3:b","Advertising and product");
  expect(x.observed).toContain("promotion");
  expect(x.observed).toContain("product");
  expect(x.notIdentified).toContain("place");
  expect(x.marks).toBeNull();
 });
 test("does not confuse a narrative question with one of the supported parts",()=>{
  expect(inspectPobShortAnswer("POB-SPARK-P2-ORIGINAL-01-Q1:e","Partnership")).toBeNull();
  expect(POB_SHORT_ANSWER_HINT_KEYS).toHaveLength(4);
 });
 test("handles an unanswered question without inferring a mark",()=>{
  expect(inspectPobShortAnswer(id," ").status).toBe("unanswered");
  expect(inspectPobShortAnswer(id," ").marks).toBeNull();
 });
});
