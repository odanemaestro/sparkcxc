const fs=require("fs"),path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080010_integrated_science_objective_344.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","EquilibriumMomentsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","equilibriumMomentsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.4.4 acceptance audit",()=>{
 test("maps objective",()=>{expect(migration).toContain('"objective":"3.4.4"');});
 test("covers moment formula and units",()=>{expect(migration).toContain("Moment = force × perpendicular distance");expect(migration).toContain("6 N m");});
 test("covers mechanical equilibrium",()=>{expect(migration).toContain("clockwise moment equals total anticlockwise moment");expect(migration).toContain("upward forces must balance downward forces");});
 test("covers stable unstable neutral",()=>{expect(migration).toContain("Stable equilibrium");expect(migration).toContain("Unstable equilibrium");expect(migration).toContain("Neutral equilibrium");expect(explorer).toContain("Types of equilibrium");});
 test("covers biology and chemistry",()=>{expect(migration).toContain("homeostasis");expect(migration).toContain("dynamic equilibrium");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"equilibrium-moments"');expect(view).toContain("EquilibriumMomentsExplorer");});
 test("responsive and dark",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});