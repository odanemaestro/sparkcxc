import {buildPob2026JanHistoricalPaper} from "./pobHistorical2026JanP2RealPaper";
import {buildPob2026JanHistoricalCalibrationPack} from "./pobHistorical2026JanP2CalibrationPack";
import {validateSemanticPass,reconcileSemanticPasses} from "../../grading/semanticMarking";

describe("January 2026 historical Paper 2 full assessment coverage and fail-closed checks",()=>{
 const source=buildPob2026JanHistoricalPaper();
 const entries=source.questions.flatMap(q=>q.items.map(p=>({key:q.id+":"+p.id,item:p})));
 const responses=Object.fromEntries(entries.map(({key,item})=>[key,item.modelAnswer]));
 test("all 32 unique parts and all 100 criterion marks are present",()=>{
  const pack=buildPob2026JanHistoricalCalibrationPack({responses});
  expect(pack.items).toHaveLength(32);
  expect(new Set(pack.items.map(i=>i.id)).size).toBe(32);
  expect(pack.items.reduce((s,i)=>s+i.maxMarks,0)).toBe(100);
  expect(pack.items.reduce((s,i)=>s+i.rubric.reduce((n,c)=>n+c.marks,0),0)).toBe(100);
  expect(pack.productionEligible).toBe(false);
  expect(pack.benchmarkOnly).toBe(true);
 });
 test("missing response is not silently counted or rewarded",()=>{
  for(const {key} of entries){
   const pack=buildPob2026JanHistoricalCalibrationPack({responses:{[key]:""}});
   expect(pack.items).toHaveLength(0);
   expect(pack.deterministicScore).toBe(0);
  }
 });
 test("criterion validation rejects unsupported quotations for every printed part",()=>{
  const pack=buildPob2026JanHistoricalCalibrationPack({responses});
  for(const item of pack.items){
   const pass={criteria:pack.items.map(i=>({id:i.id,marks:i.id===item.id?1:0,
    uncertain:false,feedback:"Evidence verification",evidence:i.id===item.id?[{
     responseKey:i.responseKeys[0],quote:"NONEXISTENT_UNSUPPORTED_EVIDENCE_2026"
    }]:[]}))};
   expect(()=>validateSemanticPass(pass,pack.items,pack.responses)).toThrow("unsupported_evidence");
  }
 });
 test("an uncertain second pass never generates a numeric final grade",()=>{
  const target=entries[0];
  const pack=buildPob2026JanHistoricalCalibrationPack({responses:{[target.key]:responses[target.key]}});
  const row=(marks,uncertain)=>({criteria:[{id:target.key,marks,uncertain,
   feedback:"Provisional benchmark only",
   evidence:marks?[{responseKey:target.key,quote:responses[target.key].slice(0,20)}]:[]} ]});
  const grade=reconcileSemanticPasses(row(1,false),row(0,true),pack.items,pack.responses);
  expect(grade.score).toBeNull();
  expect(grade.uncertain).toBe(true);
 });
});
