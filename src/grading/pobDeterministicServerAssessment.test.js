import {buildTrustedAssessment} from "./serverAssessment";
const P="POB-SPARK-P2-ORIGINAL-01-Q";
const attempt=responses=>({
 status:"submitted",paper:"02",subject_id:"principles-of-business",
 bank_version:"pob-original-paper2-01",
 metadata:{paper_id:"pob-original-paper2-01"},
 response_snapshot:responses
});
describe("POB source-trusted dual-pass marking and deterministic credit boundaries",()=>{
 test("verified numeric result is one deterministic mark and cannot be reawarded in model rubric",()=>{
  const part=P+"5:a",value="850,000 - 470,000 = 380,000 gross profit";
  const pack=buildTrustedAssessment(attempt({[part]:value}));
  expect(pack.deterministicScore).toBe(1);
  expect(pack.items).toHaveLength(1);
  expect(pack.items[0].id).toBe(part);
  expect(pack.items[0].maxMarks).toBe(2);
  expect(pack.items[0].rubric).toHaveLength(2);
  expect(pack.items[0].constraints.deterministicResultMark).toBe(1);
  expect(pack.items[0].rubric.reduce((n,c)=>n+c.marks,0)+pack.deterministicScore).toBe(3);
 });
 test("no demonstrated calculation, no deterministic marks and all criteria go to semantic grader",()=>{
  const part=P+"5:a";
  const pack=buildTrustedAssessment(attempt({[part]:"380,000 gross profit"}));
  expect(pack.deterministicScore).toBe(0);
  expect(pack.items[0].maxMarks).toBe(3);
  expect(pack.items[0].rubric).toHaveLength(3);
  expect(pack.items[0].constraints.deterministicResultMark).toBe(0);
 });
 test("aggregate four verified result marks and distinct two-mark listing without overlap",()=>{
  const answers={
   [P+"3:a"]:"300 / 10 = 30 bottles per labour hour",
   [P+"3:c"]:"250 - 130 = 120 per bottle",
   [P+"5:a"]:"850,000 - 470,000 = 380,000 gross profit",
   [P+"5:b"]:"380,000 - 260,000 = 120,000 net profit",
   [P+"2:a"]:"planning and organising"
  };
  const pack=buildTrustedAssessment(attempt(answers));
  expect(pack.deterministicScore).toBe(6);
  expect(pack.items).toHaveLength(4);
  expect(pack.items.map(x=>x.maxMarks)).toEqual([2,3,2,2]);
  expect(pack.items.every(x=>x.constraints.deterministicResultMark===1)).toBe(true);
  expect(pack.maxMarks).toBe(100);
 });
 test("unsupported bank version and draft attempts never reach grading",()=>{
  expect(()=>buildTrustedAssessment({...attempt({}),bank_version:"student-created-bank"})).toThrow("unsupported_bank_version");
  expect(()=>buildTrustedAssessment({...attempt({}),status:"started"})).toThrow();
 });
});