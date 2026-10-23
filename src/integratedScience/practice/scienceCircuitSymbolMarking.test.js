import {markSourceCircuitSymbols,isSourceCircuitSymbols} from "./scienceCircuitSymbolMarking";
import {integratedScienceCircuitSymbolFixtures} from "../../grading/v2Fixtures/integratedScienceCircuitSymbols";

const qid="IS-M2-P2-25",pi=1,ii=0;
const item={marks:3,response:{type:"drawing"},markScheme:{points:[
 "Fuse: rectangle with a line through it (1)",
 "Voltmeter: circle containing V (1)",
 "Switch: break with a hinged line (1)"
]}};
const grade=value=>markSourceCircuitSymbols(qid,pi,ii,item,value);
const fixtures=integratedScienceCircuitSymbolFixtures(qid,pi,ii,item,3).fixtures;
test("only applies to the source-bound drawing mark scheme",()=>{
 expect(isSourceCircuitSymbols(qid,pi,ii,item)).toBe(true);
 expect(isSourceCircuitSymbols(qid,0,ii,item)).toBe(false);
 expect(isSourceCircuitSymbols(qid,pi,ii,{...item,marks:4})).toBe(false);
});
test.each(["full","equivalent"])("%s source symbol geometry scores three certain marks",(name)=>{
 const f=fixtures.find(x=>x.cls===name),r=grade(f.response.symbolDrawing);
 expect(r.sourceResolved).toBe(true);
 expect(r.score).toBe(3);
 expect(r.criteria).toHaveLength(3);
});
test("one correct drawn fuse or voltmeter is worth one mark",()=>{
 for(const f of fixtures.filter(x=>x.cls==="partial")){
  const r=grade(f.response.symbolDrawing);
  expect(r.sourceResolved).toBe(true);
  expect(r.score).toBe(1);
 }
});
test("explicit unrelated symbols are a certain zero",()=>{
 for(const f of fixtures.filter(x=>["incorrect","irrelevant"].includes(x.cls))){
  const r=grade(f.response.symbolDrawing);
  expect(r.sourceResolved).toBe(true);
  expect(r.score).toBe(0);
 }
});
test("unknown, conflicting and freehand shapes are not certified",()=>{
 expect(grade(fixtures.find(x=>x.cls==="competing").response.symbolDrawing).sourceResolved).toBe(false);
 expect(grade("{bad JSON").sourceResolved).toBe(false);
 expect(markSourceCircuitSymbols(qid,pi,ii,item,null,true)).toBeNull();
 expect(grade({fuse:[{kind:"line",x1:.1,y1:.1,x2:.9,y2:.8}],voltmeter:[],switch:[]}).sourceResolved).toBe(false);
});
