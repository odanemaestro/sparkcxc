const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921065500_integrated_science_objective_312.sql"),"utf8");
const lessonText=migration.replace(/''/g,"'");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","OrbitMotionExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","orbitMotionExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.1.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.1.2"');expect(migration).toContain("3.1.2 Bodies in Orbit");});
 test("covers gravity and tangent motion",()=>{expect(migration).toContain("centripetal force");expect(migration).toContain("straight line tangent");expect(explorer).toContain("Gravity removed");});
 test("covers natural and artificial satellites",()=>{expect(lessonText).toContain("Moon is Earth's natural satellite");expect(migration).toContain("human-made object placed in orbit");});
 test("covers geostationary orbit",()=>{expect(migration).toContain("about 24 hours");expect(migration).toContain("above the equator");expect(explorer).toContain("Geostationary");});
 test("covers orbital periods and elliptical paths",()=>{expect(migration).toContain("ellipses");expect(migration).toContain("take longer to complete one orbit");expect(explorer).toContain("Planet years");});
 test("covers synchronous Moon rotation",()=>{expect(migration).toContain("same lunar hemisphere generally faces Earth");expect(explorer).toContain("Moon rotation");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"orbit-motion"');expect(view).toContain("OrbitMotionExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to sixty-seven objectives",()=>{expect(migration).toContain('"objectivesBuilt":67');});
});
