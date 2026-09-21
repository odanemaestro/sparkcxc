const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921074900_integrated_science_objective_337.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","FlotationExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","flotationExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.3.7 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.7"');expect(migration).toContain("3.3.7 Flotation");});
 test("covers upthrust and Archimedes",()=>{expect(migration).toContain("Upthrust is the upward force");expect(migration).toContain("Archimedes'' principle");expect(migration).toContain("5.0 - 3.0 = 2.0 N");expect(explorer).toContain("Archimedes");});
 test("covers density calculations",()=>{expect(migration).toContain("Density = mass ÷ volume");expect(migration).toContain("0.6 g/cm³");expect(migration).toContain("1.25 g/cm³");expect(explorer).toContain("Density");});
 test("covers why steel ships float",()=>{expect(migration).toContain("ship is hollow");expect(migration).toContain("average density");expect(explorer).toContain("Why ships float");});
 test("covers sea and fresh water",()=>{expect(migration).toContain("floats slightly higher in sea water");expect(migration).toContain("sinks slightly lower when it enters fresh water");expect(explorer).toContain("Sea vs fresh water");});
 test("covers salt water egg",()=>{expect(migration).toContain("Adding salt increases the density");expect(explorer).toContain("Salt-water egg");});
 test("covers safe loading and Plimsoll line",()=>{expect(migration).toContain("reduces its freeboard");expect(migration).toContain("Plimsoll or load line");expect(explorer).toContain("Safe loading");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"flotation"');expect(view).toContain("FlotationExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves canonical total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});