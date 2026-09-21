const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921075020_integrated_science_objective_339.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","WaterSafetyExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","waterSafetyExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.3.9 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.9"');expect(migration).toContain("3.3.9 Water Safety Devices");});
 test("covers life jacket buoyancy and visibility",()=>{expect(migration).toContain("buoyant foam or trapped air");expect(migration).toContain("bright colours");expect(explorer).toContain("Why jackets float");});
 test("renders life-jacket buoyancy with forces and displaced water",()=>{
  ["spark-water-buoyancy-svg","ws-displaced-region jacket","ws-force up","ws-force down","upthrust","weight","more water displaced before sinking deeply","life jacket increases volume with little added mass"].forEach(term=>expect(explorer).toContain(term));
  expect(css).toContain(".spark-water-buoyancy-svg");
  expect(css).toContain(".ws-displaced-region");
  expect(css).toContain(".ws-force.up");
 });
 test("covers ring buoys and life rafts",()=>{expect(migration).toContain("ring buoy");expect(migration).toContain("life raft");expect(explorer).toContain("Flotation devices");});
 test("covers boat safety equipment",()=>{expect(migration).toContain("life jackets, flares and a two-way radio");expect(explorer).toContain("Boat equipment");});
 test("covers beach warning carefully",()=>{expect(migration).toContain("red beach flag");expect(migration).toContain("flag systems can vary");expect(explorer).toContain("Beach warnings");});
 test("covers child flotation limitation",()=>{expect(migration).toContain("do not replace close adult supervision");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"water-safety"');expect(view).toContain("WaterSafetyExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves canonical total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});