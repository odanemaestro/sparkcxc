const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921074700_integrated_science_objective_335.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","WaterPollutionExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","waterPollutionExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.3.5 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.5"');expect(migration).toContain("3.3.5 Water Pollution and Aquatic Life");});
 test("covers eutrophication chain",()=>{expect(migration).toContain("Fertiliser runoff and sewage");expect(migration).toContain("decomposer microorganisms");expect(migration).toContain("Dissolved oxygen may fall");expect(explorer).toContain("Eutrophication");expect(explorer).toContain("spark-eutrophication-model");expect(explorer).toContain("nitrates + phosphates enter water");expect(explorer).toContain("rapid algal bloom near surface");expect(explorer).toContain("dead algae sink");expect(explorer).toContain("decomposers respire and use dissolved oxygen");expect(explorer).toContain("dissolved O₂ falls");expect(explorer).toContain("fish may die");});
 test("covers oil sewage pesticides and thermal pollution",()=>{expect(migration).toContain("Oil can coat seabird feathers");expect(migration).toContain("Raw sewage");expect(migration).toContain("Some pesticides");expect(migration).toContain("Thermal pollution");});
 test("pollutant selector exposes every pollutant option",()=>{expect(explorer).toContain("const options={");expect(explorer).toContain("const data=options[type]");expect(explorer).toContain("Object.entries(options)");["Oil spills","Raw sewage","Pesticides","Thermal pollution","Sediment / silt"].forEach(term=>expect(explorer).toContain(term));});
 test("covers coral and sediment",()=>{expect(migration).toContain("Suspended sediment blocks light");expect(migration).toContain("smother coral surfaces");});
 test("covers mangroves and parrotfish",()=>{expect(migration).toContain("Mangrove roots provide shelter");expect(migration).toContain("Parrotfish are natural reef organisms");expect(explorer).toContain("Habitats");});
 test("covers oxygen recovery",()=>{expect(migration).toContain("dissolved oxygen may recover");expect(explorer).toContain("Dissolved oxygen");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"water-pollution"');expect(view).toContain("WaterPollutionExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');expect(css).toContain("SPARK_EUTROPHICATION_PROCESS_V2");expect(css).toContain(".spark-eutrophication-model");});
 test("preserves canonical total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});