const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080000_integrated_science_objective_343.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","StabilityCentreGravityExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","stabilityCentreGravityExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.4.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.4.3"');expect(migration).toContain("3.4.3 Centre of Gravity and Stability");});
 test("defines centre of gravity",()=>{expect(migration).toContain("point where the whole weight of an object appears to act");expect(explorer).toContain("CENTRE OF GRAVITY");});
 test("covers base width and centre-of-gravity height",()=>{expect(migration).toContain("centre of gravity is low");expect(migration).toContain("base is wide");expect(migration).toContain("outside the base of support");expect(explorer).toContain("Low and wide");expect(explorer).toContain("spark-stability-svg");expect(explorer).toContain("base of support");expect(explorer).toContain("centre of gravity");expect(explorer).toContain("line of action of weight");expect(explorer).toContain("TOPPLING BEGINS");});
 test("covers truck bus and racing car stability",()=>{expect(migration).toContain("loaded as low as practical");expect(migration).toContain("Racing cars are built low and wide");expect(migration).toContain("heavily loaded upper deck");expect(explorer).toContain("Truck loading");});
 test("covers regular shapes",()=>{expect(migration).toContain("uniform circular disc");expect(migration).toContain("diagonals intersect");expect(explorer).toContain("Regular shapes");});
 test("covers plumb-line method",()=>{expect(migration).toContain("vertical plumb line");expect(migration).toContain("intersect at the centre of gravity");expect(explorer).toContain("Plumb-line method");});
 test("covers tare and loading limits",()=>{expect(migration).toContain("tare of a vehicle is its mass when empty");expect(migration).toContain("Loading limits protect vehicle stability");expect(explorer).toContain("Tare and limits");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"stability-centre-gravity"');expect(view).toContain("StabilityCentreGravityExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty objectives",()=>{expect(migration).toContain('"objectivesBuilt":80');});
});
