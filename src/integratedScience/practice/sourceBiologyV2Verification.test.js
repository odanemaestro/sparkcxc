import {originalBiologySourceFixtures} from "../../grading/v2Fixtures/integratedScienceOriginalBiology";
import {verifyOriginalBiologyEvidence} from "./sourceBiologyV2Verification";

const IDS={
 stoma:["IS-M1-P2-21::(b)::(i)","IS-M1-P2-21:1:0"],
 flower:["IS-M1-P2-27::(a)::(i)","IS-M1-P2-27:0:0"],
 magnification:["IS-M1-P2-27::(a)::(ii)","IS-M1-P2-27:0:1"]
};
function flattened(key,fixture){
 const [id,base]=IDS[key];
 const items=fixture.responses||{[id]:fixture.response};
 const output={};
 for(const [itemId,item] of Object.entries(items)){
  const b=itemId===IDS.flower[0]?IDS.flower[1]:
   itemId===IDS.magnification[0]?IDS.magnification[1]:base;
  if(!item||typeof item!=="object")continue;
  for(const [name,val] of Object.entries(item))
   output[name==="answer"?b:b+":"+name]=val;
 }
 return output;
}
test.each(["stoma","flower","magnification"])(
 "historical %s grading resolves complete, partial and incorrect source evidence",
 key=>{
  const [id,base]=IDS[key],fixture=originalBiologySourceFixtures(id);
  for(const cls of ["full","partial","incorrect"]){
   const sample=fixture.fixtures.find(f=>f.cls===cls);
   const result=verifyOriginalBiologyEvidence(base,flattened(key,sample));
   expect(result).toMatchObject({score:sample.expect,resolved:true});
  }
 }
);
test.each(["stoma","flower"])(
 "historical %s blank and non-drawing answers get no source drawing marks",
 key=>{
  const [id,base]=IDS[key],fixtures=originalBiologySourceFixtures(id).fixtures;
  for(const cls of ["blank","irrelevant"]){
   const sample=fixtures.find(f=>f.cls===cls);
   // This focused examiner abstains. The paper-level adapter handles blanks.
   expect(verifyOriginalBiologyEvidence(base,flattened(key,sample))).toBeNull();
  }
 }
);
test("unrelated unlabelled circles never certify anatomy",()=>{
 const base=IDS.stoma[1];
 const wrong=[
  Array.from({length:21},(_,i)=>({x:160+45*Math.cos(i*Math.PI/10),y:145+70*Math.sin(i*Math.PI/10)})),
  Array.from({length:21},(_,i)=>({x:410+45*Math.cos(i*Math.PI/10),y:145+70*Math.sin(i*Math.PI/10)})),
  Array.from({length:21},(_,i)=>({x:285+15*Math.cos(i*Math.PI/10),y:145+40*Math.sin(i*Math.PI/10)}))
 ];
 const responses={[base+":strokes"]:JSON.stringify(wrong),
 [base+":biologicalEvidence"]:JSON.stringify({title:"Stoma leaf surface view",measurementMm:"100",labels:[]})};
 const outcome=verifyOriginalBiologyEvidence(base,responses);
 expect(outcome?.resolved).not.toBe(true);
});
