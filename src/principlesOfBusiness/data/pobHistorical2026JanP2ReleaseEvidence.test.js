import {assessPobJan2026ReleaseEvidence} from "./pobHistorical2026JanP2ReleaseEvidence";
const report={paper:"POB-P2-2026-JAN",model:"test-model",generatedAt:"2026-10-17T00:00:00Z",
 failures:0,disputed:0,results:Array.from({length:20},(_,i)=>({id:"fixture-"+i,result:"pass"}))};
const coverage={uniqueParts:32,criterionMarks:100,semanticBenchmarkedParts:32};
const approvals={authenticatedWorkerVerified:true,serverBankRegistered:true,productionGatesVerified:true,approvedByAdmin:true};
describe("historical Paper 2 release evidence policy",()=>{
 test("no report, no authenticated server, no release",()=>{
  const result=assessPobJan2026ReleaseEvidence();
  expect(result.eligible).toBe(false);
  expect(result.publicationPerformed).toBe(false);
  expect(result.blockers.length).toBeGreaterThan(3);
 });
 test("fixture-only or CI success is insufficient",()=>{
  expect(assessPobJan2026ReleaseEvidence({report,coverage}).eligible).toBe(false);
  expect(assessPobJan2026ReleaseEvidence({report,coverage,...approvals,approvedByAdmin:false}).eligible).toBe(false);
  expect(assessPobJan2026ReleaseEvidence({report,coverage:{...coverage,semanticBenchmarkedParts:20},...approvals}).eligible).toBe(false);
 });
 test("any disputed or failed marking result blocks release",()=>{
  for(const result of ["failure","disputed","error"]){
   const bad={...report,results:report.results.map((r,i)=>i===0?{...r,result}:r)};
   expect(assessPobJan2026ReleaseEvidence({report:bad,coverage,...approvals}).eligible).toBe(false);
  }
  expect(assessPobJan2026ReleaseEvidence({report:{...report,disputed:1},coverage,...approvals}).eligible).toBe(false);
 });
 test("only all expressly verified conditions become eligible, without deploying",()=>{
  expect(assessPobJan2026ReleaseEvidence({report,coverage,...approvals})).toMatchObject({
   eligible:true,blockers:[],publicationPerformed:false
  });
 });
});
