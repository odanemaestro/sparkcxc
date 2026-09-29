const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921063500_integrated_science_objective_253.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","ThermometerTypesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","thermometerTypesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 2.5.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"2.5.3"');expect(migration).toContain("2.5.3 Types of Thermometers");});
 test("covers temperature and units",()=>{expect(migration).toContain("SI unit of temperature is the kelvin");expect(migration).toContain("how hot or cold");});
 test("covers laboratory and clinical ranges",()=>{expect(migration).toContain("-10 °C to 110 °C");expect(migration).toContain("35 °C to 42 °C");expect(explorer).toContain("Clinical thermometer");});
 test("covers constriction and shaking",()=>{expect(migration).toContain("constriction");expect(migration).toContain("shaken before reuse");expect(explorer).toContain("Why shake before reuse?");});
 test("covers mercury alcohol and digital",()=>{expect(migration).toContain("-115 °C");expect(migration).toContain("-39 °C");expect(migration).toContain("toxic");expect(explorer).toContain("Digital thermometer");});
 test("covers expansion and reading practice",()=>{expect(migration).toContain("liquid expands when heated");expect(migration).toContain("37 °C");expect(explorer).toContain("Set reading");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"thermometer-types"');expect(view).toContain("ThermometerTypesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to sixty-three objectives",()=>{expect(migration).toContain('"objectivesBuilt":63');});
});
