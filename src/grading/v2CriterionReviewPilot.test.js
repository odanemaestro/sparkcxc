import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {check} from "../practice/cxcMarking/checkers";

/**
 * Criterion-level evidence for the initial SPARK V2 automated QA review.
 * This is an AI-assisted mathematical source review, not a substitute for the
 * separate authorizing rubric attestation or full-paper scoring accuracy.
 *
 * Each target is a single B1/accuracy mark requiring no method evidence,
 * diagrams, graph interpretation or error-carried-forward dependency.
 */
export const V2_CRITERION_PILOT = [
 {
  paperId:"original-v1",questionId:"p2-q2-v1",partId:"c1",
  answer:"8w + 8",promptContains:"PERIMETER",
  sourceCheck:{type:"expression",value:"8w+8"},
  correct:["8w+8","2(4w+4)","8 + 8w"],
  wrong:["8w+4","6w+8","8w-8"]
 },
 {
  paperId:"original-v1",questionId:"p2-q4-v1",partId:"a1",
  answer:"15",promptContains:"f(4)",
  sourceCheck:{type:"numeric",value:15,tolerance:0.001},
  correct:["15","15.000","Answer: 15"],
  wrong:["13","14","16","15 or 16"]
 },
 {
  paperId:"original-v2",questionId:"p2-q2-v2",partId:"c1",
  answer:"6w + 10",promptContains:"PERIMETER",
  sourceCheck:{type:"expression",value:"6w+10"},
  correct:["6w + 10","2(3w+5)","10+6w"],
  wrong:["6w+5","4w+10","8w+10"]
 },
 {
  paperId:"original-v2",questionId:"p2-q4-v2",partId:"a1",
  answer:"13",promptContains:"f(6)",
  sourceCheck:{type:"numeric",value:13,tolerance:0.011},
  correct:["13","13.000","Answer: 13"],
  wrong:["15","12","14","13 or 14"]
 }
];

describe("V2 first source-bound criterion approval evidence",()=>{
 test.each(V2_CRITERION_PILOT)("$paperId $questionId::$partId accepts and rejects mathematical evidence",entry=>{
  const question=PAPER2_QUESTION_BANK.find(q=>q.question_id===entry.questionId);
  expect(question).toBeDefined();
  const part=question.parts.find(p=>p.id===entry.partId);
  expect(part).toBeDefined();
  expect(part.marks).toBe(1);
  expect(part.prompt).toContain(entry.promptContains);
  expect(part.answer.replace(/\\s+/g,"")).toBe(entry.answer.replace(/\\s+/g,""));
  for(const answer of entry.correct){
   expect(check(answer,entry.sourceCheck).ok).toBe(true);
  }
  for(const answer of entry.wrong){
   expect(check(answer,entry.sourceCheck).ok).toBe(false);
  }
  expect(check("",entry.sourceCheck).ok).toBe(false);
 });
});
