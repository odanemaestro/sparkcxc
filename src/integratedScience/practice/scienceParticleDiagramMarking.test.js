import {isSourceParticleDiagram,markSourceParticleDiagram} from "./scienceParticleDiagramMarking";
import {integratedScienceParticleFixtures} from "../../grading/v2Fixtures/integratedScienceParticles";

const qid="IS-M3-P2-25";
const item={marks:2,response:{type:"drawing"},markScheme:{points:[
 "Solid: particles closely packed in a regular arrangement (1)",
 "Liquid: particles close together but irregularly arranged (1)"
]}};
const score=(input,freehand=false)=>markSourceParticleDiagram(qid,1,0,item,input,freehand);
test("checks source, question position, and unmodified mark scheme",()=>{
 expect(isSourceParticleDiagram(qid,1,0,item)).toBe(true);
 expect(isSourceParticleDiagram(qid,0,0,item)).toBe(false);
 expect(isSourceParticleDiagram(qid,1,0,{...item,marks:3})).toBe(false);
});
test("source full and equivalent diagrams are certainly correct",()=>{
 const set=integratedScienceParticleFixtures(qid,1,0,item,2);
 for(const cls of ["full","equivalent"]){
  const test=set.fixtures.find(f=>f.cls===cls);
  const result=score(test.response.particleLayout);
  expect(result.score).toBe(2);
  expect(result.sourceResolved).toBe(true);
 }
});
test("each phase awards one mark independently",()=>{
 const set=integratedScienceParticleFixtures(qid,1,0,item,2);
 for(const f of set.fixtures.filter(f=>f.cls==="partial")){
  const r=score(f.response.particleLayout);
  expect(r.score).toBe(1);
  expect(r.sourceResolved).toBe(true);
 }
});
test("reversed or sparse diagrams earn no marks",()=>{
 const set=integratedScienceParticleFixtures(qid,1,0,item,2);
 for(const cls of ["incorrect","irrelevant"]){
  const test=set.fixtures.find(f=>f.cls===cls);
  const result=score(test.response.particleLayout);
  expect(result.score).toBe(0);
  expect(result.sourceResolved).toBe(true);
 }
});
test("overlap, invalid geometry, or freehand preserves manual review",()=>{
 const set=integratedScienceParticleFixtures(qid,1,0,item,2);
 const conflicting=set.fixtures.find(f=>f.cls==="competing");
 expect(score(conflicting.response.particleLayout).sourceResolved).toBe(false);
 expect(score("{broken json").sourceResolved).toBe(false);
 expect(score(null,true)).toBeNull();
 expect(score(null,false).sourceResolved).toBe(true);
});
