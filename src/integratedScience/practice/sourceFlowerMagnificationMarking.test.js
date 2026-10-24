import {markSourceFlowerMagnification,FLOWER_SOURCE_MAGNIFICATION_BASE as BASE} from "./sourceFlowerMagnificationMarking";
const responses=(measured="105",drawing="105",actual="35",working="105 / 35",answer="×3")=>({
 "IS-M1-P2-27:0:0:biologicalEvidence":JSON.stringify({title:"Flower",labels:[],measurementMm:measured}),
 [BASE+":drawingHeightMm"]:drawing,[BASE+":actualHeightMm"]:actual,
 [BASE+":magnificationWorking"]:working,[BASE+":magnificationAnswer"]:answer
});
test("no evidence never receives a magnification mark",()=>{
 const x=markSourceFlowerMagnification({});
 expect(x.score).toBe(0);
 expect(x.sourceResolved).toBe(false);
 expect(x.unassessedMarks).toBe(2);
});
test("independent student dimensions yield 2 distinct provisional marks",()=>{
 const x=markSourceFlowerMagnification(responses());
 expect(x.score).toBe(2);
 expect(x.visualEvidence.matchesDrawing).toBe(true);
 expect(x.sourceResolved).toBe(false);
});
test("working without correct final answer earns method mark only",()=>{
 expect(markSourceFlowerMagnification(responses("105","105","35","105/35","×2")).score).toBe(1);
 expect(markSourceFlowerMagnification(responses("105","105","35","35/105","×3")).score).toBe(1);
});
test("wrong original drawing measurement and contradictory answers do not earn marks",()=>{
 expect(markSourceFlowerMagnification(responses("115","105","35","105/35","×3")).score).toBe(0);
 expect(markSourceFlowerMagnification(responses("105","105","35","105/35 or 1/2","×3")).score).toBe(1);
 expect(markSourceFlowerMagnification(responses("105","105","35","105/35","3")).score).toBe(1);
});
test("no invented physical-scale verification or source approval",()=>{
 expect(markSourceFlowerMagnification(responses("120","120","60","120 / 60 = 2","×2")).visualEvidence.externalPhysicalScaleVerified).toBe(false);
 expect(markSourceFlowerMagnification(responses(),"another-id")).toBeNull();
});
