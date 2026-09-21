const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921071500_integrated_science_objective_321.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","AirMassFrontsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","airMassFrontsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.2.1 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.2.1"');expect(migration).toContain("3.2.1 Air Masses in the Caribbean");});
 test("defines air masses and fronts",()=>{expect(migration).toContain("large body of air with broadly similar temperature and humidity");expect(migration).toContain("boundary between two air masses");});
 test("covers air-mass classifications",()=>{expect(migration).toContain("maritime tropical");expect(migration).toContain("continental polar");expect(migration).toContain("maritime polar");expect(explorer).toContain("cT: Continental tropical");});
 test("covers front symbols",()=>{expect(migration).toContain("triangles on one side");expect(migration).toContain("semicircles on one side");expect(explorer).toContain("Cold front");expect(explorer).toContain("Warm front");});
 test("covers cold and warm front weather",()=>{expect(migration).toContain("heavy showers, thunderstorms");expect(migration).toContain("longer periods of light or steady rain");});
 test("covers occluded and stationary fronts",()=>{expect(migration).toContain("cold front catches up with a warm front");expect(migration).toContain("stationary front");expect(explorer).toContain("Occluded front");});
 test("covers Saharan dust and volcanic ash",()=>{expect(migration).toContain("Saharan dust");expect(migration).toContain("asthma and allergies");expect(migration).toContain("Montserrat");expect(explorer).toContain("Dust and ash");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"air-mass-fronts"');expect(view).toContain("AirMassFrontsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-one objectives",()=>{expect(migration).toContain('"objectivesBuilt":71');});
});
