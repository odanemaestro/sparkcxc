const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921083000_integrated_science_objective_356.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","CorrosionProtectionExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","corrosionProtectionExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.5.6 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.5.6"');expect(migration).toContain("3.5.6 Preventing Rusting and Tarnishing");});
 test("covers barrier methods",()=>{expect(migration).toContain("Painting and plastic coating");expect(migration).toContain("physical barriers");expect(explorer).toContain("Painting");});
 test("covers oil grease and silica gel",()=>{expect(migration).toContain("Oil and grease");expect(migration).toContain("Silica gel is a desiccant");expect(explorer).toContain("With silica gel");});
 test("covers galvanising and sacrificial action",()=>{expect(migration).toContain("coating of iron or steel with zinc");expect(migration).toContain("sacrificial protection");expect(explorer).toContain("Coating scratched");});
 test("covers electroplating",()=>{expect(migration).toContain("uses an electric current to deposit");expect(migration).toContain("Chromium-plated");expect(migration).toContain("silver plating");expect(explorer).toContain("Metal plating");});
 test("covers food cans",()=>{expect(migration).toContain("steel coated with a thin layer of tin");expect(explorer).toContain("FOOD CAN");});
 test("covers silver and brass tarnish prevention",()=>{expect(migration).toContain("Airtight bags or containers");expect(migration).toContain("Clear lacquer");expect(explorer).toContain("Tarnish prevention");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"corrosion-protection"');expect(view).toContain("CorrosionProtectionExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-six objectives",()=>{expect(migration).toContain('"objectivesBuilt":86');});
});
