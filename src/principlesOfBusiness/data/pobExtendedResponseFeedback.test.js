import {inspectPobExtendedResponse,POB_EXTENDED_FEEDBACK_KEYS} from "./pobExtendedResponseFeedback";
describe("POB extended-answer writing diagnostics",()=>{
 const key="POB-SPARK-P2-ORIGINAL-01-Q1:e";
 test("provides writing signals, never marks",()=>{
  const result=inspectPobExtendedResponse(key,"A company may be suitable for the sauce business because investors can provide finance. Liability and control should be considered, however registration has extra costs.");
  expect(result.status).toBe("diagnostic");
  expect(result.marks).toBeNull();
  expect(result.checks).toHaveLength(4);
  expect(result.checks.some(item=>item.seen)).toBe(true);
 });
 test("empty answers are unanswered, not graded",()=>{
  expect(inspectPobExtendedResponse(key," ").status).toBe("unanswered");
  expect(inspectPobExtendedResponse(key," ").marks).toBeNull();
 });
 test("irrelevant writing is not treated as substantiated",()=>{
  const result=inspectPobExtendedResponse(key,"The sunset is beautiful.");
  expect(result.checks.every(item=>item.seen===false)).toBe(true);
 });
 test("a conjunction alone cannot satisfy substantive content checks",()=>{
  const result=inspectPobExtendedResponse(key,"Because.");
  expect(result.checks.slice(0,3).every(item=>item.seen===false)).toBe(true);
  expect(result.marks).toBeNull();
 });
 test("all supported extended prompts are from the original Paper 2",()=>{
  expect(POB_EXTENDED_FEEDBACK_KEYS).toHaveLength(5);
  expect(inspectPobExtendedResponse("POB-SPARK-P2-ORIGINAL-01-Q3:a","300 / 10 = 30")).toBeNull();
 });
});
