import {buildPobJan2026ExaminerPack,summarizePobJan2026Marks}
 from "../principlesOfBusiness/data/pobJan2026ExaminerMarking";
import {buildPob2026JanHistoricalPaper} from "../principlesOfBusiness/data/pobHistorical2026JanP2RealPaper";
import {gradePobJan2026ExaminerPaper} from "./historicalPobExaminerPipeline";
import {validateSemanticPass,reconcileSemanticPasses} from "./semanticMarking";

const source=buildPob2026JanHistoricalPaper();
const full=Object.fromEntries(source.questions.flatMap(q=>q.items.map(p=>[q.id+":"+p.id,p.modelAnswer])));
const max=(p)=>p.items.reduce((n,i)=>n+i.maxMarks,0);
const evidenceFor=i=>({responseKey:i.constraints.primaryResponseKey,
 quote:full[i.constraints.primaryResponseKey].slice(0,18)});

describe("CSEC January 2026 Paper 2 criterion-level examiner",()=>{
 test("all 32 actual subparts map to 100 separate marks, preserving 20 per question",()=>{
  const pack=buildPobJan2026ExaminerPack({responses:full});
  expect(pack.parts).toHaveLength(32);
  expect(pack.items).toHaveLength(100);
  expect(max(pack)).toBe(100);
  expect(pack.items.every(i=>i.maxMarks===1&&i.rubric.length===1)).toBe(true);
  for(const number of [1,2,3,4,5]){
   expect(pack.items.filter(i=>i.constraints.questionNumber===number)).toHaveLength(20);
  }
  expect(new Set(pack.items.map(i=>i.id)).size).toBe(100);
 });
 test("blank script is graded zero, not uncertain, and needs no provider calls",async()=>{
  const pack=buildPobJan2026ExaminerPack({responses:{}});
  const requestPass=jest.fn();
  const result=await gradePobJan2026ExaminerPaper({pack,model:"mock",apiKey:"none",requestPass});
  expect(requestPass).not.toHaveBeenCalled();
  expect(result.score).toBe(0);
  expect(result.maxScore).toBe(0);
  expect(result.parts).toHaveLength(32);
  expect(result.parts.every(p=>p.marks===0)).toBe(true);
  expect(result.questions.map(q=>q.score)).toEqual([0,0,0,0,0]);
 });
 test("two independent passes mark each source criterion; valid partial responses aggregate by question",async()=>{
  const pack=buildPobJan2026ExaminerPack({responses:full});
  const selected=new Set([
   "POB-P2-2026-JAN:Q1:a:C1","POB-P2-2026-JAN:Q1:c.i:C1",
   "POB-P2-2026-JAN:Q4:a.i:C1"
  ]);
  const requestPass=jest.fn(async({items})=>({criteria:items.map(i=>({
   id:i.id,marks:selected.has(i.id)?1:0,uncertain:false,
   feedback:selected.has(i.id)?"Correct concept shown.":"Required point not demonstrated.",
   evidence:selected.has(i.id)?[evidenceFor(i)]:[]
  }))}));
  const report=await gradePobJan2026ExaminerPaper({pack,model:"mock",apiKey:"test",requestPass});
  expect(requestPass).toHaveBeenCalledTimes(10);
  expect(report.score).toBe(3);
  expect(report.questions.map(q=>q.score)).toEqual([2,0,0,1,0]);
  expect(report.parts.find(p=>p.id==="POB-P2-2026-JAN:Q1:a").marks).toBe(1);
  expect(report.parts.find(p=>p.id==="POB-P2-2026-JAN:Q1:a").criteria.map(c=>c.marks)).toEqual([1,0,0]);
  expect(report.minScore).toBe(3);
  expect(report.maxScore).toBe(3);
 });
 test("different passes with supported primary evidence expose uncertain range, never a fabricated final score",async()=>{
  const pack=buildPobJan2026ExaminerPack({responses:{
   "POB-P2-2026-JAN:Q2:a.i":"An asset pledged to secure a bank loan."
  }});
  const requestPass=jest.fn(async({items,pass})=>({criteria:items.map((i,index)=>({
   id:i.id,marks:index===0&&pass===1?1:0,uncertain:false,
   feedback:pass===1?"Pledge recognised.":"Missing detail.",
   evidence:index===0&&pass===1?[{responseKey:i.constraints.primaryResponseKey,quote:"asset pledged"}]:[]
  }))}));
  const marked=await gradePobJan2026ExaminerPaper({pack,model:"mock",apiKey:"test",requestPass});
  expect(marked.uncertain).toBe(true);
  expect(marked.score).toBeNull();
  expect(marked.minScore).toBe(0);
  expect(marked.maxScore).toBe(1);
  expect(marked.parts.find(p=>p.id==="POB-P2-2026-JAN:Q2:a.i").marks).toBeNull();
 });
 test("duplicate text evidence cannot earn two different listing marks",()=>{
  const id="POB-P2-2026-JAN:Q4:a.ii";
  const pack=buildPobJan2026ExaminerPack({responses:{[id]:"Price, price, and promotion."}});
  const rows=pack.items.map((i,index)=>({
   id:i.id,marks:index<=1?1:0,uncertain:false,feedback:"List evidence",
   evidence:index<=1?[{responseKey:id,quote:"Price"}]:[]
  }));
  expect(()=>validateSemanticPass({criteria:rows},pack.items,pack.responses)).toThrow("duplicate_listing_credit");
 });
 test("a linked question cannot receive marks based only on the earlier answer",()=>{
  const current="POB-P2-2026-JAN:Q3:a.iii",previous="POB-P2-2026-JAN:Q3:a.ii";
  const pack=buildPobJan2026ExaminerPack({responses:{
   [previous]:"Bauxite and petroleum",[current]:"Oil refining follows from petroleum."
  }});
  const items=pack.items.filter(i=>i.constraints.primaryResponseKey===current);
  const pass={criteria:items.map((i,n)=>({
   id:i.id,marks:n===0?1:0,uncertain:false,feedback:"Linked context",
   evidence:n===0?[{responseKey:previous,quote:"Bauxite"}]:[]
  }))};
  expect(()=>validateSemanticPass(pass,items,pack.responses)).toThrow("missing_primary_evidence");
 });
});
