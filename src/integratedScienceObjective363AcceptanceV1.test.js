const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921084500_integrated_science_objective_363.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","StatesMatterExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","statesMatterExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.6.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.6.3"');expect(migration).toContain("3.6.3 States of Matter");});
 test("covers solid liquid gas particle models",()=>{expect(migration).toContain("Solid particles are closely packed");expect(migration).toContain("Liquid particles are close together");expect(migration).toContain("Gas particles are far apart");expect(explorer).toContain("Particle models");});
 test("covers compressibility and forces",()=>{expect(migration).toContain("Gases are easily compressed");expect(migration).toContain("Attractive forces are strongest in solids");});
 test("covers all key changes of state",()=>{for(const term of ["Melting","freezing","Evaporation","Boiling","Condensation","Sublimation","Deposition"]) expect(migration).toContain(term);});
 test("renders all state-change pathways in one scientific SVG",()=>{
  ["spark-state-change-svg","sm-change-node solid","sm-change-node liquid","sm-change-node gas","sm-phase-arrow heat","sm-phase-arrow cool","sm-sublimation-path","sm-deposition-path","energy added","energy removed","sublimation, solid → gas","deposition, gas → solid"].forEach(term=>expect(explorer).toContain(term));
  expect(css).toContain(".spark-state-change-svg");
  expect(css).toContain(".sm-sublimation-path");
  expect(css).toContain(".sm-deposition-path");
 });
 test("covers everyday evaporation and condensation",()=>{expect(migration).toContain("Wet clothes dry faster");expect(migration).toContain("Water droplets on the outside of an iced glass");});
 test("covers plasma",()=>{expect(migration).toContain("Lightning and the Sun");expect(explorer).toContain("PLASMA");});
 test("covers heating-curve plateau",()=>{expect(migration).toContain("temperature can remain constant");expect(migration).toContain("overcome attractive forces");expect(explorer).toContain("Heating curve");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"states-matter"');expect(view).toContain("StatesMatterExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-nine objectives",()=>{expect(migration).toContain('"objectivesBuilt":89');});
});
