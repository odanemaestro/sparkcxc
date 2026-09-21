const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921091000_integrated_science_objective_371.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","AirPollutionExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","airPollutionExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.7.1 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.7.1"');expect(migration).toContain("3.7.1 Effects of Air Pollution");});
 test("covers acid rain gases accurately",()=>{expect(migration).toContain("Sulfur dioxide and nitrogen oxides");expect(migration).toContain("Carbon monoxide is poisonous but is not a principal acid-rain gas");expect(explorer).toContain("Acid rain");});
 test("covers dust effects on plants",()=>{expect(migration).toContain("reduce the amount of light");expect(migration).toContain("interfere with stomata");expect(explorer).toContain("Dust and plants");});
 test("covers asthma allergies and CO",()=>{expect(migration).toContain("worsen asthma");expect(migration).toContain("Pollen and dust");expect(migration).toContain("binds strongly to haemoglobin");});
 test("covers open burning carefully",()=>{expect(migration).toContain("exact toxic products depend on the materials");expect(migration).toContain("uncontrolled garbage burning should be avoided");expect(explorer).toContain("Open burning");});
 test("covers carbon dioxide and warming",()=>{expect(migration).toContain("strengthens the greenhouse effect");expect(migration).toContain("global warming");});
 test("covers pollution reduction",()=>{expect(migration).toContain("public transport");expect(migration).toContain("Industrial emission controls");expect(migration).toContain("do not replace emission reduction");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"air-pollution"');expect(view).toContain("AirPollutionExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety-four objectives",()=>{expect(migration).toContain('"objectivesBuilt":94');});
});
