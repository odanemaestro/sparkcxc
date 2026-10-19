import {evaluateV2ShadowDiagnostics} from "../../supabase/functions/mark-paper2-v2-shadow/evaluator.js";
const check=(id,maxMarks,sourceMarking)=>({id,maxMarks,sourceMarking});

test("strict numeric answer matches are advisory and never publishable",()=>{
 const report=evaluateV2ShadowDiagnostics({
  criteria:[check("q1",3,{answer:"7"}),check("q2",2,{answer:"4"})],
  responses:{q1:{answer:"7",working:"7/1"},q2:"four"}
 });
 expect(report).toMatchObject({reviewedItems:2,maxMarks:5,
  candidateParts:1,candidateMarks:3,confirmedMarks:0,
  unresolvedMarks:5,canPublishFinalScore:false});
 expect(report.candidates).toEqual([{criterionId:"q1",suggestedMarks:3,rule:"scalar-answer-match"}]);
});
test("correct raw numerals inside prose are not treated as marks",()=>{
 const report=evaluateV2ShadowDiagnostics({
  criteria:[check("q1",3,{answer:"7"})],
  responses:{q1:{answer:"7 because 2+5",working:"7"}}
 });
 expect(report.candidates).toEqual([]);
 expect(report.unresolvedMarks).toBe(3);
});
test("typed independent numerical checks award only their advisory submarks",()=>{
 const report=evaluateV2ShadowDiagnostics({criteria:[check("part",4,{
  criteria:[
   {code:"B1",marks:1,depends:[],field:"answer",check:{type:"numeric",value:12,tolerance:0.01}},
   {code:"M1",marks:1,depends:[],field:"working",check:{type:"numeric",value:6,tolerance:0}},
   {code:"M2",marks:2,depends:["M1"],field:"answer",check:{type:"numeric",value:12,tolerance:0}}
  ]})],responses:{part:{answer:"12",working:"6"}}});
 expect(report.candidates).toEqual([{criterionId:"part",suggestedMarks:2,rule:"typed-numeric-check"}]);
 expect(report.confirmedMarks).toBe(0);
 expect(report.unresolvedMarks).toBe(4);
});
test("ambiguous, unknown and mismatched responses remain unresolved",()=>{
 const criteria=[check("graph",2,{answer:"8"}),check("essay",10,{criteria:[{
  code:"B1",marks:10,depends:[],field:"answer",check:{type:"prose",tokens:["excellent"]}}]})];
 const report=evaluateV2ShadowDiagnostics({criteria,responses:{
  graph:{answer:"8, 9"},essay:{answer:"excellent"}}});
 expect(report.candidates).toHaveLength(0);
 expect(report.unresolvedMarks).toBe(12);
});
test("duplicate IDs and overruns fail closed",()=>{
 expect(()=>evaluateV2ShadowDiagnostics({criteria:[check("x",1,{}),check("x",1,{})],responses:{}}))
  .toThrow("Invalid server-owned shadow criterion");
 expect(()=>evaluateV2ShadowDiagnostics({criteria:[check("x",1,{
  criteria:[{code:"M1",marks:2,depends:[],field:"answer",check:{type:"numeric",value:1,tolerance:0}}]
 })],responses:{x:"1"}})).toThrow("exceeds maximum");
});
