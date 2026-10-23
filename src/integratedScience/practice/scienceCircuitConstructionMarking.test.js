import {markCircuitConstruction,circuitConstructionSource} from "./scienceCircuitConstructionMarking";
import {integratedScienceCircuitFixtures} from "../../grading/v2Fixtures/integratedScienceCircuits";

const items=[
 ["IS-M2-P2-07",[
  "Cell, lamp and two crocodile clips/gap for the test material in a single series loop (1)",
  "Correct symbols for cell and lamp (1)",
  "Wires drawn with a ruler, no gaps other than the test position (1)"
 ]],
 ["IS-M2-P2-15",[
  "Supply, resistor and ammeter in series (1)",
  "Voltmeter in parallel across the resistor (1)",
  "Correct symbols, lines drawn with a ruler (1)"
 ]]
];
const source=points=>({marks:3,response:{type:"drawing"},markScheme:{points}});
test.each(items)("validates source archive for %s",(id,points)=>{
 const item=source(points);
 expect(circuitConstructionSource(id,0,0,item)).not.toBeNull();
 expect(circuitConstructionSource(id,1,0,item)).toBeNull();
 expect(circuitConstructionSource(id,0,0,{...item,marks:4})).toBeNull();
 expect(circuitConstructionSource(id,0,0,{...item,markScheme:{points:[...points,"new mark"]}})).toBeNull();
});
test.each(items)("%s two valid topologies earn 3 independent marks",(id,points)=>{
 const item=source(points),fixtures=integratedScienceCircuitFixtures(id,0,0,item,3);
 for(const cls of ["full","equivalent"]){
  const fixture=fixtures.fixtures.find(f=>f.cls===cls);
  const result=markCircuitConstruction(id,0,0,item,fixture.response.circuitNetlist);
  expect(result.score).toBe(3);
  expect(result.sourceResolved).toBe(true);
  expect(result.criteria).toHaveLength(3);
 }
});
test.each(items)("%s partial correctly selected symbols earn at most 1 mark",(id,points)=>{
 const item=source(points),fixtures=integratedScienceCircuitFixtures(id,0,0,item,3);
 const fixture=fixtures.fixtures.find(f=>f.cls==="partial");
 const result=markCircuitConstruction(id,0,0,item,fixture.response.circuitNetlist);
 expect(result.score).toBe(1);
 expect(result.sourceResolved).toBe(true);
});
test.each(items)("%s unrelated components and blank response do not get marks",(id,points)=>{
 const item=source(points),fixtures=integratedScienceCircuitFixtures(id,0,0,item,3);
 for(const cls of ["incorrect","irrelevant","blank"]){
  const f=fixtures.fixtures.find(f=>f.cls===cls);
  const r=markCircuitConstruction(id,0,0,item,f.response.circuitNetlist);
  expect(r.score).toBe(0);
  expect(r.sourceResolved).toBe(true);
 }
});
test.each(items)("%s extra connections and malformed diagrams abstain",(id,points)=>{
 const item=source(points),fixtures=integratedScienceCircuitFixtures(id,0,0,item,3);
 const competing=fixtures.fixtures.find(f=>f.cls==="competing");
 expect(markCircuitConstruction(id,0,0,item,competing.response.circuitNetlist).sourceResolved).toBe(false);
 expect(markCircuitConstruction(id,0,0,item,"{bad-json").sourceResolved).toBe(false);
 expect(markCircuitConstruction(id,0,0,item,null,true)).toBeNull();
});
test("a voltmeter wired in series is not confused with a parallel branch",()=>{
 const id="IS-M2-P2-15",item=source(items[1][1]);
 const full=integratedScienceCircuitFixtures(id,0,0,item,3).sourceAnswer.circuitNetlist;
 const broken={components:full.components,wires:[
  {...full.wires[0]},{...full.wires[1]},{...full.wires[2]},
  {from:"v",fromPort:"a",to:"a",toPort:"a"},
  {from:"v",fromPort:"b",to:"c",toPort:"b"}
 ]};
 const r=markCircuitConstruction(id,0,0,item,broken);
 expect(r.sourceResolved).toBe(false);
 expect(r.score).toBeLessThan(3);
});
