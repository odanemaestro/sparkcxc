const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921065000_integrated_science_objective_311.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","UniverseComponentsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","universeComponentsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.1.1 acceptance audit",()=>{
 test("creates the Module 3 section before inserting topics",()=>{expect(migration).toContain("insert into public.spark_subject_sections");expect(migration).toContain("module-3-environment");expect(migration).toContain("Module 3: Our Planet");});
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.1.1"');expect(migration).toContain("3.1.1 Components of the Universe");});
 test("covers Milky Way and nearest star",()=>{expect(migration).toContain("Milky Way");expect(migration).toContain("nearest star to Earth");});
 test("covers asteroid comet and dwarf planet",()=>{expect(migration).toContain("between Mars and Jupiter");expect(migration).toContain("ice, dust and rock");expect(migration).toContain("Pluto");});
 test("distinguishes meteor and meteorite",()=>{expect(migration).toContain("A meteor is the streak of light");expect(migration).toContain("A meteorite is a piece");expect(explorer).toContain("Meteorite");});
 test("covers comet-tail direction",()=>{expect(migration).toContain("solar wind");expect(migration).toContain("away from the Sun");expect(explorer).toContain("Near the Sun");});
 test("covers scale ordering and light-year",()=>{expect(migration).toContain("planet → star → galaxy → universe");expect(migration).toContain("unit of distance");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"universe-components"');expect(view).toContain("UniverseComponentsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to sixty-six objectives",()=>{expect(migration).toContain('"objectivesBuilt":66');});
});
