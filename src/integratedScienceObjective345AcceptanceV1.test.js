const fs=require("fs"),path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080020_integrated_science_objective_345.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","MomentumConservationExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","momentumConservationExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.4.5 acceptance audit",()=>{
 test("maps objective",()=>expect(migration).toContain('"objective":"3.4.5"'));
 test("covers formula and units",()=>{expect(migration).toContain("Momentum p = mass × velocity");expect(migration).toContain("kg m/s");});
 test("covers banked examples",()=>{expect(migration).toContain("20 000 kg m/s");expect(migration).toContain("600 kg m/s");expect(migration).toContain("2 m/s");});
 test("covers conservation examples",()=>{expect(migration).toContain("Rocket propulsion");expect(migration).toContain("Skaters");expect(explorer).toContain("Examples");});
 test("renders collision and conservation examples as working scientific diagrams",()=>{expect(explorer).toContain("spark-momentum-collision-diagram");expect(explorer).toContain("m₁v₁ = (m₁ + m₂)v");expect(explorer).toContain("spark-momentum-example-diagram");expect(explorer).toContain("rocket momentum forward");expect(explorer).toContain("gas momentum backward");expect(explorer).toContain("Object.entries(examples)");expect(css).toContain(".spark-momentum-collision-diagram");});
 test("covers stopping time",()=>{expect(migration).toContain("increasing the stopping time reduces the average force");expect(explorer).toContain("Seat belts");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"momentum-conservation"');expect(view).toContain("MomentumConservationExplorer");});
 test("responsive and dark",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves total",()=>expect(migration).toContain('"objectivesBuilt":96'));
});