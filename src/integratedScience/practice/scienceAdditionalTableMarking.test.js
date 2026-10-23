import {gradeAdditionalTable,additionalTableSpec} from "./scienceAdditionalTableMarking";
import {additionalTableFixtures} from "../../grading/v2Fixtures/integratedScienceAdditionalTables";

const contexts=[
 ["IS-M2-P2-07",0,2,3,["Title (1)","Column headings (1)","Enclosed table listing all six materials (1)"]],
 ["IS-M2-P2-13",1,0,5,["Title (1)","Enclosed table with suitable headings (1)","Carbohydrate e.g. rice/yam - supplies energy (1)"]],
 ["IS-M3-P2-15",0,0,4,["Title (1)","W - many bubbles, rapid reaction; X - some bubbles (1)"]]
];
const item=(marks,points)=>({marks,response:{type:"drawing"},markScheme:{points}});
test.each(contexts)("source %s has a complete verified table matrix",(qid,pi,ii,marks,points)=>{
 const source=item(marks,points);
 expect(additionalTableSpec(qid,pi,ii,source)).not.toBeNull();
 const set=additionalTableFixtures(qid,pi,ii,source,marks);
 expect(set.kind).toBe("structured");
 for(const f of set.fixtures){
  const r=gradeAdditionalTable(qid,pi,ii,source,f.response.drawingTable);
  expect(r).not.toBeNull();
  expect(r.score).toBeGreaterThanOrEqual(0);
  expect(r.score).toBeLessThanOrEqual(marks);
  if(["full","equivalent","partial","incorrect","blank","irrelevant"].includes(f.cls)){
   expect(r.sourceResolved).toBe(true);
   expect(r.score).toBe(f.expect);
  }
 }
});
test("freehand-only work abstains instead of being scored as a table",()=>{
 const src=item(3,contexts[0][4]);
 expect(gradeAdditionalTable("IS-M2-P2-07",0,2,src,null,true)).toBeNull();
});
test("source scheme changes invalidate the additional rubric",()=>{
 const src=item(3,["Updated scheme with different criteria"]);
 expect(additionalTableSpec("IS-M2-P2-07",0,2,src)).toBeNull();
});
