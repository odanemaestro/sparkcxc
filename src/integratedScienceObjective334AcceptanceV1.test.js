const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921074600_integrated_science_objective_334.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","FishingMethodsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","fishingMethodsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.3.4 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.4"');expect(migration).toContain("3.3.4 Local Fishing Methods");});
 test("covers fishing methods",()=>{expect(migration).toContain("Hand-line fishing");expect(migration).toContain("Fish pots");expect(migration).toContain("Long-line fishing");expect(migration).toContain("seine net");expect(migration).toContain("Trawling");});
 test("covers sustainability controls",()=>{expect(migration).toContain("Larger mesh");expect(migration).toContain("Closed seasons");expect(explorer).toContain("Sustainable practice");});
 test("covers harmful methods",()=>{expect(migration).toContain("Bottom trawling");expect(migration).toContain("Dynamite fishing");expect(migration).toContain("Scuba-assisted spearfishing");expect(explorer).toContain("Environmental harm");});
 test("covers aquaculture nuance",()=>{expect(migration).toContain("It is not automatically impact-free");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"fishing-methods"');expect(view).toContain("FishingMethodsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves canonical total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});