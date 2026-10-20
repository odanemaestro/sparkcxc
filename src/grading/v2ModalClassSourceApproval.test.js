import {checkClassInterval,check} from "../practice/cxcMarking/checkers";
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";

export const MODAL_CLASS_SOURCE_CASES=[
 {paper:"original-v1",question:"p2-q5-v1",part:"a",value:[16,20]},
 {paper:"original-v2",question:"p2-q5-v2",part:"a",value:[11,15]},
 {paper:"original-v3",question:"p2-q5-v3",part:"a",value:[11,15]},
 {paper:"original-v10",question:"p2-q5-v10",part:"a",value:[21,25]},
 {paper:"p2e",question:"p2e-q5",part:"b",value:[21,30]},
 {paper:"p2g",question:"p2g-q5",part:"b",value:[21,30]},
 {paper:"p2i",question:"p2i-q5",part:"b",value:[31,40]}
];

const probe=(value,s)=>check(s,{type:"classInterval",value}).ok;

describe.each(MODAL_CLASS_SOURCE_CASES)("Modal class source approval $paper $question::$part",src=>{
 const source=PAPER2_QUESTION_BANK.find(q=>q.question_id===src.question);
 const part=source?.parts.find(x=>x.id===src.part);
 const [lower,upper]=src.value;
 const answer=lower+" - "+upper;
 test("exact source identity, one mark and correct range",()=>{
  expect(source).toBeDefined();
  expect(part).toBeDefined();
  expect(part.marks).toBe(1);
  expect(part.answer.replace(/\s+/g,"")).toBe(answer.replace(/\s+/g,""));
 });
 test.each([
  answer,lower+"-"+upper,lower+" to "+upper,
  lower+"–"+upper,"modal class "+lower+"–"+upper,
  "the modal class is "+lower+" to "+upper+" kg",
  "Class: "+lower+" - "+upper+" kilograms"
 ])("accept equivalent ordered interval: %s",input=>{
  expect(probe(src.value,input)).toBe(true);
 });
 test.each([
  upper+"-"+lower,lower+" and "+upper,
  upper+" to "+lower,lower+" or "+upper,
  lower+"-"+upper+" or "+(upper+1)+"-"+(upper+10),
  lower+"-"+upper+" and "+upper+"-"+(upper+10),
  lower+" - "+(upper+1), (lower+1)+" - "+upper,
  "The class is "+lower+"-"+upper+" but I also select another",
  "ZXQJ VMPQ unrelated answer", "", 
  lower+"-"+upper+" is wrong"
 ])("reject wrong or competing interval: %s",input=>{
  expect(probe(src.value,input)).toBe(false);
 });
 test("V2 whole-question server scorer resolves this exact criterion only",()=>{
  const id=src.question+"::"+src.part;
  const criteria=source.parts.map(x=>({
   id:src.question+"::"+x.id,maxMarks:x.marks,
   sourceMarking:{
    answer:x.answer,solution:x.solution||"",
    criteria:x.id===src.part?[{
     code:"B1",kind:"B",field:"answer",marks:1,depends:[],
     check:{type:"classInterval",value:src.value},
     description:"source-checked modal class interval"
    }]:x.criteria
   }
  }));
  const evaluate=response=>evaluateExistingSubjectPaper2V2({
   subjectId:"mathematics",paperId:src.paper,
   criteria,responses:{[id]:response}
  });
  const good=evaluate(answer);
  const bad=evaluate(upper+"-"+lower);
  const conflicting=evaluate(answer+" or "+upper+"-"+lower);
  const get=r=>r.rows.find(x=>x.criterionId===id);
  expect(get(good).suggestedMarks).toBe(1);
  expect(get(good).resolved).toBe(true);
  expect(get(bad).suggestedMarks).toBe(0);
  expect(get(bad).resolved).toBe(true);
  expect(get(conflicting).suggestedMarks).toBe(0);
  expect(get(conflicting).resolved).toBe(true);
 });
});

test("bad and inverted source interval specs fail closed",()=>{
 expect(checkClassInterval("20-16",{value:[20,16]}).ok).toBe(false);
 expect(checkClassInterval("16-20",{value:[16]}).ok).toBe(false);
 expect(checkClassInterval("16-20",{value:[16,Number.NaN]}).ok).toBe(false);
});
