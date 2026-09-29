const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080400_integrated_science_objective_349.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","MachineEfficiencyExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","machineEfficiencyExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.4.9 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.4.9"');expect(migration).toContain("3.4.9 Efficiency of Simple Machines");});
 test("covers mechanical advantage",()=>{expect(migration).toContain("Mechanical advantage = load ÷ effort");expect(migration).toContain("200 ÷ 50 = 4");expect(explorer).toContain("Mechanical advantage");});
 test("covers work and joules",()=>{expect(migration).toContain("Work = force × distance");expect(migration).toContain("150 J");expect(migration).toContain("60 000 J");expect(explorer).toContain("Work");});
 test("covers efficiency calculations",()=>{expect(migration).toContain("400 ÷ 500 × 100 = 80%");expect(migration).toContain("400 ÷ 480 × 100 ≈ 83%");expect(explorer).toContain("Efficiency");});
 test("explains why real machines are below one hundred per cent",()=>{expect(migration).toContain("Friction between moving parts");expect(migration).toContain("heat and sound");});
 test("covers improving efficiency",()=>{expect(migration).toContain("Lubricating chains");expect(migration).toContain("Removing rust");expect(explorer).toContain("Improve efficiency");});
 test("covers inclined-plane ideal MA",()=>{expect(migration).toContain("length of slope ÷ vertical height");expect(migration).toContain("4 m ramp");expect(explorer).toContain("Inclined plane");expect(explorer).toContain("me-ramp");});
 test("uses physical diagrams for force work energy and pulley calculations",()=>{expect(explorer).toContain("me-lever-beam");expect(explorer).toContain("me-load-box");expect(explorer).toContain("me-machine-box");expect(explorer).toContain("me-pulley-wheel");expect(explorer).toContain("load rises 2 m");expect(css).toContain(".spark-machine-diagram");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"machine-efficiency"');expect(view).toContain("MachineEfficiencyExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves completed subject stats",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});
