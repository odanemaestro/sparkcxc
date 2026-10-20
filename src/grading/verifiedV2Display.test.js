import {verifiedV2Display,verifiedV2Parts} from "./verifiedV2Display";

const attemptId="it-student-attempt";
const sample=(overrides={})=>({
  available:true,status:"verified",attemptId,score:90,maxMarks:90,
  criterionResults:[
    {criterionId:"2-b",maxMarks:2,suggestedMarks:2,resolved:true},
    {criterionId:"4-b",maxMarks:4,suggestedMarks:4,resolved:true},
    {criterionId:"4-c",maxMarks:8,suggestedMarks:8,resolved:true},
    {criterionId:"4-e",maxMarks:3,suggestedMarks:3,resolved:true},
    {criterionId:"rest",maxMarks:73,suggestedMarks:73,resolved:true}
  ],...overrides
});

test("the IT Paper 2 display replaces a stale 87/90 practice estimate with the saved verified 90/90",()=>{
  expect(verifiedV2Display(sample(),attemptId)).toEqual({score:90,maxMarks:90,percent:100});
  const result=verifiedV2Parts(sample(),attemptId);
  expect(result.size).toBe(5);
  expect(result.get("2-b")).toBe(2);
  expect(result.get("4-c")).toBe(8);
});

test("provisional and failed results never override the local estimate",()=>{
  for(const status of ["provisional","queued","running","retry","failed","not-eligible"]){
    expect(verifiedV2Display(sample({status}),attemptId)).toBeNull();
    expect(verifiedV2Parts(sample({status}),attemptId)).toBeNull();
  }
});

test("reject another student's or another exam's claimed score",()=>{
  expect(verifiedV2Display(sample({attemptId:"different-attempt"}),attemptId)).toBeNull();
  expect(verifiedV2Display(sample({available:false}),attemptId)).toBeNull();
  expect(verifiedV2Display(sample({score:null}),attemptId)).toBeNull();
  expect(verifiedV2Display(sample({score:92}),attemptId)).toBeNull();
  expect(verifiedV2Display(sample({score:"n/a"}),attemptId)).toBeNull();
});

test("criterion marks require a complete, unique and fully resolved server paper",()=>{
  for(const criterionResults of [
    sample().criterionResults.slice(1),
    [...sample().criterionResults,sample().criterionResults[0]],
    sample().criterionResults.map((p,i)=>i===0?{...p,resolved:false}:p),
    sample().criterionResults.map((p,i)=>i===0?{...p,suggestedMarks:3}:p),
    sample().criterionResults.map((p,i)=>i===0?{...p,suggestedMarks:1}:p)
  ]) expect(verifiedV2Parts(sample({criterionResults}),attemptId)).toBeNull();
});

test("partial-credit verified totals remain numerical, not rounded to all-or-nothing",()=>{
  const result=sample({score:85.5,criterionResults:[
    {criterionId:"a",suggestedMarks:85.5,maxMarks:90,resolved:true}
  ]});
  expect(verifiedV2Display(result,attemptId)).toEqual({score:85.5,maxMarks:90,percent:95});
  expect(verifiedV2Parts(result,attemptId)?.get("a")).toBe(85.5);
});
