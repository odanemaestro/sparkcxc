const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921064500_integrated_science_objective_255.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","VentilationExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","ventilationExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 2.5.5 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"2.5.5"');expect(migration).toContain("2.5.5 Ventilation");});
 test("covers ventilation need and crowded rooms",()=>{expect(migration).toContain("carbon dioxide, heat and humidity");expect(migration).toContain("supplies fresh outdoor air");});
 test("covers cross ventilation and high vents",()=>{expect(migration).toContain("opposite walls");expect(migration).toContain("Warm air is less dense");expect(explorer).toContain("Cross-ventilation");});
 test("covers louvre windows",()=>{expect(migration).toContain("Louvre windows");expect(migration).toContain("helping to keep out rain");expect(explorer).toContain("LOUVRE WINDOWS");});
 test("covers mechanical ventilation",()=>{expect(migration).toContain("Exhaust fans");expect(migration).toContain("Air-conditioning systems");expect(explorer).toContain("Mechanical ventilation");});
 test("covers carbon monoxide hazards",()=>{expect(migration).toContain("Burning charcoal in a closed room");expect(migration).toContain("gasoline generator in a garage");expect(explorer).toContain("GENERATOR");});
 test("clarifies ceiling fans",()=>{expect(migration).toContain("fan alone does not necessarily replace stale indoor air");expect(explorer).toContain("CEILING FAN");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"ventilation"');expect(view).toContain("VentilationExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to sixty-five objectives",()=>{expect(migration).toContain('"objectivesBuilt":65');});
});
