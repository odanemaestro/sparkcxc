const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921085000_integrated_science_objective_364.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","MixturesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","mixturesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.6.4 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.6.4"');expect(migration).toContain("3.6.4 Properties of Mixtures");});
 test("covers solute solvent and aqueous",()=>{expect(migration).toContain("solute dissolves evenly in a solvent");expect(migration).toContain("An aqueous solution uses water as the solvent");expect(migration).toContain("Iodine dissolved in alcohol");});
 test("covers suspensions",()=>{expect(migration).toContain("settle on standing");expect(migration).toContain("removed by filtration");expect(migration).toContain("Muddy water");expect(explorer).toContain("Settling");});
 test("covers medicines requiring shaking",()=>{expect(migration).toContain("shaking redistributes them");});
 test("covers colloids and Tyndall effect",()=>{expect(migration).toContain("Milk is a colloid");expect(migration).toContain("Mayonnaise is an emulsion");expect(migration).toContain("Tyndall effect");expect(explorer).toContain("Tyndall effect");});
 test("covers household classification examples",()=>{expect(migration).toContain("Vinegar is a solution");expect(migration).toContain("Muddy water is a suspension");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"mixtures"');expect(view).toContain("MixturesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety objectives",()=>{expect(migration).toContain('"objectivesBuilt":90');});
});
