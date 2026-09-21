const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921082500_integrated_science_objective_355.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","RustingConditionsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","rustingConditionsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.5.5 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.5.5"');expect(migration).toContain("3.5.5 Conditions for Rusting");});
 test("requires both oxygen and water",()=>{expect(migration).toContain("only when both oxygen and water are available");expect(explorer).toContain("Air + water");});
 test("covers rust equation and oxidation",()=>{expect(migration).toContain("iron + oxygen + water → hydrated iron(III) oxide");expect(migration).toContain("described as oxidation");});
 test("covers experiment controls",()=>{expect(migration).toContain("boiled water covered with oil");expect(migration).toContain("dry air");expect(explorer).toContain("Boiled water + oil");});
 test("compares all four controlled rusting tubes in one scientific visual",()=>{expect(explorer).toContain("spark-rusting-comparison");expect(explorer).toContain("Controlled rusting experiment");expect(explorer).toContain("rt-oil");expect(explorer).toContain("rt-desiccant");expect(explorer).toContain("Salt water + air");expect(css).toContain(".spark-rusting-comparison");});
 test("covers salt warmth humidity and coastal context",()=>{expect(migration).toContain("Salt water speeds rusting");expect(migration).toContain("Warm humid air");expect(migration).toContain("Sea spray deposits salts");});
 test("covers acidic pollution",()=>{expect(migration).toContain("sulfur dioxide");expect(migration).toContain("more acidic");});
 test("covers mass increase",()=>{expect(migration).toContain("mass of the nail and attached rust can therefore increase");});
 test("distinguishes tarnish",()=>{expect(migration).toContain("Silver tarnish is a different chemical process");expect(explorer).toContain("Rust vs tarnish");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"rusting-conditions"');expect(view).toContain("RustingConditionsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-five objectives",()=>{expect(migration).toContain('"objectivesBuilt":85');});
});
