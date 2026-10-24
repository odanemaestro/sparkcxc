import {biologicalSourceEvidenceReadiness} from "./scienceBiologicalSourceEvidence";
const check=(q,p,i,r)=>biologicalSourceEvidenceReadiness(q,p,i,r);
test("all three original biology criteria require independent source review",()=>{
 for(const [q,p,i] of [["IS-M1-P2-21",1,0],["IS-M1-P2-27",0,0],["IS-M1-P2-27",0,1]]){
  const result=check(q,p,i,{});
  expect(result.sourceApproved).toBe(false);
  expect(result.readyForVisualReview).toBe(false);
 }
});
test("flower magnification must use recorded height of the actual student drawing",()=>{
 const base="IS-M1-P2-27:0:1";
 const r={
  "IS-M1-P2-27:0:0:biologicalEvidence":JSON.stringify({title:"Flower",measurementMm:"105",labels:[]}),
  [base+":drawingHeightMm"]:"120",[base+":actualHeightMm"]:"60",
  [base+":magnificationWorking"]:"120 / 60",[base+":magnificationAnswer"]:"×2"
 };
 expect(check("IS-M1-P2-27",0,1,r).checks.drawingHeightMatches).toBe(false);
 r[base+":drawingHeightMm"]="105";r[base+":actualHeightMm"]="35";
 r[base+":magnificationWorking"]="105 / 35";r[base+":magnificationAnswer"]="×3";
 expect(check("IS-M1-P2-27",0,1,r).readyForVisualReview).toBe(true);
 expect(check("IS-M1-P2-27",0,1,r).sourceApproved).toBe(false);
});
