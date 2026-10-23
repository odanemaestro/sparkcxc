import {guidedDiagramForSource,markGuidedDiagram,markGuidedMagnification,readGuidedDiagramAnswers} from "./scienceGuidedDiagramMarking";
const stoma=guidedDiagramForSource("IS-M1-P2-21",1,0);
const flower=guidedDiagramForSource("IS-M1-P2-27",0,0);
describe("separate guided diagrams, not historical exam drawing marks",()=>{
 test("targets are source-specific and never pre-answer a blank submission",()=>{
  expect(stoma.maxMarks).toBe(4);
  expect(flower.maxMarks).toBe(6);
  expect(guidedDiagramForSource("IS-M3-P2-11",0,1)).toBeNull();
  const r=markGuidedDiagram(stoma,{});
  expect(r.score).toBe(0);
  expect(r.sourceCriterionVerified).toBe(false);
 });
 test.each([[stoma,4],[flower,6]])("full source-keyed labels score exactly %i slots",(guide,total)=>{
  const a=Object.fromEntries(guide.slots.map(slot=>[slot.id,slot.answer]));
  const result=markGuidedDiagram(guide,a);
  expect(result.score).toBe(total);
  expect(result.maxMarks).toBe(total);
  expect(result.sourceCriterionVerified).toBe(false);
 });
 test("swapped labels are not credited; one correct label earns one point",()=>{
  const r=markGuidedDiagram(stoma,{A:"stoma",B:"guard cell",C:"chloroplast",D:"ovary"});
  expect(r.score).toBe(1);
 });
 test("invalid JSON or injected options cannot prefill other labels",()=>{
  expect(readGuidedDiagramAnswers("not-json")).toEqual({});
  expect(markGuidedDiagram(flower,{A:"chloroplast",B:"sepal",C:"sepal"}).score).toBe(1);
 });
 test("given-size magnification awards separate formula and result points",()=>{
  expect(markGuidedMagnification({working:"120 ÷ 60 = 2",answer:"×2"}).score).toBe(2);
  expect(markGuidedMagnification({working:"120/60",answer:"×3"}).score).toBe(1);
  expect(markGuidedMagnification({working:"60/120",answer:"×2"}).score).toBe(1);
  expect(markGuidedMagnification({working:"",answer:"2"}).score).toBe(0);
  expect(markGuidedMagnification({working:"",answer:""}).sourceCriterionVerified).toBe(false);
 });
});