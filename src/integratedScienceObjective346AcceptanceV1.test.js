const fs=require("fs"),path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080030_integrated_science_objective_346.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","SimpleMachinesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","simpleMachinesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.4.6 acceptance audit",()=>{
 test("maps objective",()=>expect(migration).toContain('"objective":"3.4.6"'));
 test("covers lever classes",()=>{expect(migration).toContain("First-class");expect(migration).toContain("Second-class");expect(migration).toContain("Third-class");expect(explorer).toContain("Lever classes");expect(explorer).toContain("spark-lever-svg");expect(explorer).toContain("sl-fulcrum");expect(explorer).toContain("sl-effort");expect(explorer).toContain("sl-load");expect(explorer).toContain("First-class lever");expect(explorer).toContain("Second-class lever");expect(explorer).toContain("Third-class lever");});
 test("covers forearm",()=>expect(migration).toContain("biceps provides effort"));
 test("covers pulleys",()=>{expect(migration).toContain("single fixed pulley");expect(migration).toContain("number of rope segments");expect(explorer).toContain("spark-pulley-svg");expect(explorer).toContain("Single fixed pulley");expect(explorer).toContain("sp-moving-block");expect(explorer).toContain("sp-supporting-strands");expect(explorer).toContain("ideal mechanical advantage ≈ number of rope strands supporting the moving load");});
 test("covers inclined plane screw gears",()=>{expect(migration).toContain("Inclined planes");expect(migration).toContain("A screw is an inclined plane");expect(migration).toContain("Bicycle gears");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"simple-machines"');expect(view).toContain("SimpleMachinesExplorer");});
 test("responsive and dark",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves total",()=>expect(migration).toContain('"objectivesBuilt":96'));
});