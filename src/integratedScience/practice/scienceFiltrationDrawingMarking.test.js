import {isSourceFiltrationDrawing,markSourceFiltrationDrawing} from "./scienceFiltrationDrawingMarking";
import {filtrationSourceFixtures} from "../../grading/v2Fixtures/integratedScienceFiltration";
const source={marks:4,response:{type:"drawing"},markScheme:{points:[
 "Funnel with filter paper drawn correctly (1)",
 "Beaker/flask to collect the filtrate (1)",
 "Labels: filter paper, residue, filtrate, funnel (any three) (1)",
 "Clean lines, drawn with a ruler, appropriate title (1)"
]}};
const id="IS-M3-P2-11",fixtures=filtrationSourceFixtures(id,0,1,source,4).fixtures;
const score=input=>markSourceFiltrationDrawing(id,0,1,source,input);
test("only source-specific four-mark filtration question is accepted",()=>{
 expect(isSourceFiltrationDrawing(id,0,1,source)).toBe(true);
 expect(isSourceFiltrationDrawing(id,1,1,source)).toBe(false);
 expect(isSourceFiltrationDrawing(id,0,1,{...source,marks:5})).toBe(false);
});
test.each(["full","equivalent"])("%s student-authored geometry earns four marks",(cls)=>{
 const d=fixtures.find(f=>f.cls===cls);
 const result=score(d.response.filtrationDrawing);
 expect(result.score).toBe(4);
 expect(result.sourceResolved).toBe(true);
 expect(result.visualEvidence.correctLabels).toBeGreaterThanOrEqual(3);
});
test("funnel and paper only earn one mark, not beaker/labels/title",()=>{
 const d=fixtures.find(f=>f.cls==="partial");
 const result=score(d.response.filtrationDrawing);
 expect(result.score).toBe(1);
 expect(result.sourceResolved).toBe(true);
});
test.each(["incorrect","irrelevant","blank"])("%s yields a certain zero",(cls)=>{
 const d=fixtures.find(f=>f.cls===cls);
 const result=score(d.response.filtrationDrawing);
 expect(result.score).toBe(0);
 expect(result.sourceResolved).toBe(true);
});
test("duplicate and malformed diagrams require further review",()=>{
 const d=fixtures.find(f=>f.cls==="competing");
 expect(score(d.response.filtrationDrawing).sourceResolved).toBe(false);
 expect(score("{broken-json").sourceResolved).toBe(false);
 expect(markSourceFiltrationDrawing(id,0,1,source,null,true)).toBeNull();
});
test("correct label words without corresponding geometry cannot earn marks",()=>{
 const full=fixtures.find(f=>f.cls==="full").response.filtrationDrawing;
 const r=score({...full,lines:[]});
 expect(r.score).toBe(0);
 expect(r.sourceResolved).toBe(true);
});
