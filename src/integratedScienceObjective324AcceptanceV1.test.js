const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921073000_integrated_science_objective_324.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","VolcanoEruptionsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","volcanoEruptionsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.2.4 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.2.4"');expect(migration).toContain("3.2.4 Volcanic Eruptions");});
 test("distinguishes magma and lava",()=>{expect(migration).toContain("When magma reaches the surface, it is called lava");expect(explorer).toContain("Volcano structure");});
 test("explains viscosity gas and eruption style",()=>{expect(migration).toContain("Low-viscosity magma");expect(migration).toContain("High-viscosity magma");expect(migration).toContain("trap expanding gases");expect(explorer).toContain("Eruption style");expect(explorer).toContain("EruptionStyleDiagram");expect(explorer).toContain("gas trapped, pressure builds");expect(explorer).toContain("gas escapes readily");expect(explorer).toContain("runny lava flows far");expect(explorer).toContain("ash + gas + rock fragments");});
 test("covers shield composite and cinder cones",()=>{expect(migration).toContain("Shield volcanoes");expect(migration).toContain("Composite or stratovolcanoes");expect(migration).toContain("Cinder cones");expect(explorer).toContain("CINDER CONE");});
 test("uses a sourced comparative volcano-profile reference",()=>{for(const term of ["Volcanic_Profiles-01.svg","Carie Frantz","CC BY-SA 4.0","Shield volcano","Composite / stratovolcano","Cinder cone","Submarine volcano"]) expect(explorer).toContain(term);expect(css).toContain(".spark-volcano-reference-view");expect(css).toContain(".spark-volcano-reference-figure img");expect(css).toContain(".spark-volcano-reference-focus");});
 test("covers volcano structure",()=>{expect(migration).toContain("magma chamber");expect(migration).toContain("main vent");expect(migration).toContain("crater");expect(explorer).toContain("magma chamber");});
 test("uses a sourced stratovolcano cross-section for internal structure",()=>{for(const term of ["Stratovolcano_cross-section.svg","Woudloper","CC BY-SA 3.0 / GFDL","Central vent","Layers and deposits","Flank features","Magma and lava","When magma reaches Earth's surface it is called lava"]) expect(explorer).toContain(term);expect(css).toContain(".spark-volcano-reference-view");expect(css).toContain(".spark-volcano-reference-note");});
 test("covers current Caribbean examples",()=>{expect(migration).toContain("Kick-''em-Jenny");expect(migration).toContain("live submarine volcano");expect(migration).toContain("1995–2010");expect(migration).toContain("Plymouth was abandoned");});
 test("covers effects and benefits",()=>{expect(migration).toContain("ash damage to crops");expect(migration).toContain("fertile soils");});
 test("covers seismograph magnitude and earthquake safety",()=>{expect(migration).toContain("seismograph or seismometer");expect(migration).toContain("ten times greater recorded wave amplitude");expect(migration).toContain("Drop, Cover and Hold On");expect(explorer).toContain("Monitoring");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"volcano-eruptions"');expect(view).toContain("VolcanoEruptionsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-four objectives",()=>{expect(migration).toContain('"objectivesBuilt":74');});
});
