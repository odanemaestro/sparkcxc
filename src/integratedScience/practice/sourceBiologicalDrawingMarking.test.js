import {markSourceBiologicalDrawing} from "./sourceBiologicalDrawingMarking";
const sample=(base,marks,strokes,biologicalEvidence,notes="")=>
 markSourceBiologicalDrawing(base.split(":")[0],Number(base.split(":")[1]),Number(base.split(":")[2]),
  {marks,response:{type:"drawing"}},{
  [base+":strokes"]:JSON.stringify(strokes),
  [base+":biologicalEvidence"]:JSON.stringify(biologicalEvidence),
  [base]:notes
 });
const line=(x,y)=>Array.from({length:12},(_,i)=>({x:x+i*9,y:y+i*3}));
const drawing=[line(110,20),line(310,75),line(190,205)];
test("historical drawings remain unresolved without independently verified anatomy",()=>{
 const stoma=sample("IS-M1-P2-21:1:0",7,drawing,{title:"Stoma in leaf epidermis surface view",measurementMm:"60",labels:[]},"×3000");
 expect(stoma.score).toBe(4);
 expect(stoma.unassessedMarks).toBe(3);
 expect(stoma.sourceResolved).toBe(false);
 const flower=sample("IS-M1-P2-27:0:0",6,drawing,{title:"Flower",measurementMm:"105",labels:[]});
 expect(flower.score).toBe(2);
 expect(flower.sourceResolved).toBe(false);
});
test("labels alone, empty submissions and spoofed title cannot prove biology",()=>{
 const no=sample("IS-M1-P2-21:1:0",7,[],{title:"Stoma in leaf surface view",measurementMm:"60",labels:[]});
 expect(no.score).toBe(0);
 expect(no.unassessedMarks).toBe(7);
 const empty=sample("IS-M1-P2-27:0:0",6,[],{title:"",labels:[]});
 expect(empty.score).toBe(0);
});
test("incorrect measurement cannot earn source magnification mark",()=>{
 expect(sample("IS-M1-P2-21:1:0",7,drawing,{title:"Stoma leaf surface view",measurementMm:"30",labels:[]},"×3000").score).toBe(3);
});
test("other source drawing criteria are untouched",()=>{
 expect(markSourceBiologicalDrawing("IS-M2-P2-07",0,0,{marks:3,response:{type:"drawing"}},{})).toBeNull();
});
