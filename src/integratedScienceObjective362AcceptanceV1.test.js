const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921084000_integrated_science_objective_362.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","AcidsBasesSaltsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","acidsBasesSaltsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.6.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.6.2"');expect(migration).toContain("3.6.2 Acids, Bases and Salts");});
 test("covers pH and indicators",()=>{expect(migration).toContain("pH below 7 are acidic");expect(migration).toContain("Blue litmus turns red");expect(migration).toContain("Universal indicator");expect(explorer).toContain("pH scale");});
 test("distinguishes base alkali and salt",()=>{expect(migration).toContain("An alkali is a base that dissolves in water");expect(migration).toContain("Sodium chloride, common table salt");});
 test("covers neutralisation applications",()=>{expect(migration).toContain("acid + base → salt + water");expect(migration).toContain("Antacids");expect(migration).toContain("Farmers may add lime");expect(migration).toContain("Wastewater treatment");});
 test("covers acid carbonate reaction",()=>{expect(migration).toContain("acid + carbonate → salt + water + carbon dioxide");expect(migration).toContain("Limestone");});
 test("corrects outdated sting treatment",()=>{expect(migration).toContain("should not be taught as real first aid");expect(migration).toContain("Current NHS guidance");expect(explorer).toContain("Sting myth correction");});
 test("covers household examples",()=>{expect(migration).toContain("Vinegar and citrus juice are acidic");expect(migration).toContain("oven cleaners are strongly alkaline");expect(migration).toContain("Toothpaste is often mildly alkaline");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"acids-bases-salts"');expect(view).toContain("AcidsBasesSaltsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-eight objectives",()=>{expect(migration).toContain('"objectivesBuilt":88');});
});
