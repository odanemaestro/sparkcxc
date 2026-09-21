const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921075500_integrated_science_objective_342.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","GravityInertiaExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","gravityInertiaExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.4.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.4.2"');expect(migration).toContain("3.4.2 Gravity and Inertia");});
 test("covers non-contact gravity",()=>{expect(migration).toContain("Gravity can act between objects without direct physical contact");expect(explorer).toContain("Non-contact forces");});
 test("distinguishes mass and weight",()=>{expect(migration).toContain("Mass is the amount of matter");expect(migration).toContain("Weight is the gravitational force");expect(explorer).toContain("Mass and weight");});
 test("covers banked weight calculations",()=>{expect(migration).toContain("50 × 10 = 500 N");expect(migration).toContain("5 × 10 = 50 N");});
 test("covers Moon mass and weight",()=>{expect(migration).toContain("mass is the same on Earth and on the Moon");expect(migration).toContain("weight is smaller on the Moon");});
 test("covers free fall and air resistance",()=>{expect(migration).toContain("feather and a hammer");expect(migration).toContain("air resistance");expect(explorer).toContain("Vacuum");});
 test("covers inertia and seat belts",()=>{expect(migration).toContain("Newton''s first law");expect(migration).toContain("seat belt provides the force");expect(explorer).toContain("Inertia");});
 test("covers centripetal force and tangent motion",()=>{expect(migration).toContain("gravity provides the centripetal force");expect(migration).toContain("straight line tangent");expect(explorer).toContain("String breaks");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"gravity-inertia"');expect(view).toContain("GravityInertiaExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-nine objectives",()=>{expect(migration).toContain('"objectivesBuilt":79');});
});
