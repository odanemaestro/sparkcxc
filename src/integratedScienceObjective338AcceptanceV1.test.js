const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921075010_integrated_science_objective_338.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","MarineNavigationExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","marineNavigationExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.3.8 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.8"');expect(migration).toContain("3.3.8 Navigation at Sea");});
 test("covers GPS radar sonar compass sextant lighthouse",()=>{for(const s of ["GPS","Radar","Sonar","Magnetic compass","Sextant","Lighthouses"])expect(migration).toContain(s);expect(explorer).toContain("Navigation devices");});
 test("covers sonar calculation",()=>{expect(migration).toContain("1 500 × 0.4 = 600 m");expect(migration).toContain("600 ÷ 2 = 300 m");expect(explorer).toContain("Sonar depth");});
 test("covers vessel safety equipment",()=>{expect(migration).toContain("life jackets");expect(migration).toContain("two-way communication");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"marine-navigation"');expect(view).toContain("MarineNavigationExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves canonical total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});