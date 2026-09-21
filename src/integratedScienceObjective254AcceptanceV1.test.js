const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921064000_integrated_science_objective_254.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","BodyTemperatureRegulationExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","bodyTemperatureRegulationExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 2.5.4 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"2.5.4"');expect(migration).toContain("2.5.4 Temperature Regulation in Humans");});
 test("covers hypothalamus and normal temperature",()=>{expect(migration).toContain("about 37 °C");expect(migration).toContain("hypothalamus");});
 test("covers sweating humidity and latent heat",()=>{expect(migration).toContain("latent heat");expect(migration).toContain("Humid air");expect(explorer).toContain("Humidity and sweat");});
 test("covers vasodilation and vasoconstriction",()=>{expect(migration).toContain("Vasodilation");expect(migration).toContain("Vasoconstriction");expect(explorer).toContain("vasodilation");});
 test("covers shivering",()=>{expect(migration).toContain("rapid involuntary muscle contractions");expect(migration).toContain("raises respiration");});
 test("covers heat-stroke and dehydration risk",()=>{expect(migration).toContain("Heat stroke");expect(migration).toContain("dehydration");expect(explorer).toContain("HEAT STRESS");});
 test("covers high and low temperature effects",()=>{expect(migration).toContain("damage proteins");expect(migration).toContain("metabolic rate slow");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"body-temperature-regulation"');expect(view).toContain("BodyTemperatureRegulationExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to sixty-four objectives",()=>{expect(migration).toContain('"objectivesBuilt":64');});
});
