const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921074800_integrated_science_objective_336.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","WaterPurificationExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","waterPurificationExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.3.6 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.6"');expect(migration).toContain("3.3.6 Water Purification");});
 test("covers treatment plant stages",()=>{expect(migration).toContain("Sedimentation");expect(migration).toContain("Alum");expect(migration).toContain("Filtration");expect(migration).toContain("chlorine");expect(explorer).toContain("Treatment plant");expect(explorer).toContain("Typical municipal water-treatment sequence");expect(explorer).toContain("alum + mixing");expect(explorer).toContain("flocs settle as sludge");expect(explorer).toContain("sand");expect(explorer).toContain("gravel");expect(explorer).toContain("controlled chlorine dose");});
 test("covers boiling limits",()=>{expect(migration).toContain("kills many disease-causing microorganisms");expect(migration).toContain("does not remove dissolved salts");});
 test("covers activated carbon limits",()=>{expect(migration).toContain("adsorbs many organic compounds");expect(migration).toContain("not a complete disinfection method");});
 test("covers distillation and condenser",()=>{expect(migration).toContain("Dissolved non-volatile salts remain behind");expect(migration).toContain("condenser");expect(explorer).toContain("Distillation");});
 test("covers desalination and reverse osmosis",()=>{expect(migration).toContain("Desalination is the removal");expect(migration).toContain("Reverse osmosis applies pressure");expect(explorer).toContain("Reverse osmosis");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"water-purification"');expect(view).toContain("WaterPurificationExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');expect(css).toContain("SPARK_WATER_TREATMENT_PROCESS_V2");expect(css).toContain(".spark-treatment-process");});
 test("preserves canonical total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});