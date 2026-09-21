const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921072000_integrated_science_objective_322.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","CaribbeanWeatherExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","caribbeanWeatherExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.2.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.2.2"');expect(migration).toContain("3.2.2 Caribbean Weather Patterns");});
 test("covers wet dry and hurricane seasons",()=>{expect(migration).toContain("June to November");expect(migration).toContain("December to May");expect(migration).toContain("June 1 to November 30");});
 test("covers current tropical-cyclone thresholds",()=>{expect(migration).toContain("below 63 km/h");expect(migration).toContain("63 to 118 km/h");expect(migration).toContain("at least 119 km/h");expect(explorer).toContain("Cyclone stages");});
 test("covers hurricane energy source and weakening over land",()=>{expect(migration).toContain("latent heat is released");expect(migration).toContain("loses direct access to the warm ocean");expect(explorer).toContain("How hurricanes are powered");});
 test("covers eye and eyewall",()=>{expect(migration).toContain("eye is the relatively calm");expect(migration).toContain("eyewall");expect(explorer).toContain("eyewall: strongest winds and rain");});
 test("covers storm surge and pressure",()=>{expect(migration).toContain("Storm surge is an abnormal rise");expect(migration).toContain("965 mb");expect(explorer).toContain("Pressure");});
 test("covers preparation",()=>{expect(migration).toContain("store safe drinking water");expect(migration).toContain("secure loose outdoor objects");expect(explorer).toContain("Hazards and preparation");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"caribbean-weather"');expect(view).toContain("CaribbeanWeatherExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-two objectives",()=>{expect(migration).toContain('"objectivesBuilt":72');});
});
