const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921070500_integrated_science_objective_314.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","EarthMoonEffectsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","earthMoonEffectsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.1.4 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.1.4"');expect(migration).toContain("3.1.4 Effects of Other Bodies on Earth");});
 test("covers day and night and Earth year",()=>{expect(migration).toContain("Earth rotates on its axis once in about 24 hours");expect(migration).toContain("365¼ days");expect(explorer).toContain("Day and night");});
 test("covers Moon light and phase cycle",()=>{expect(migration).toContain("reflects sunlight");expect(migration).toContain("29½ days");expect(explorer).toContain("Moon phases");});
 test("covers solar eclipse",()=>{expect(migration).toContain("solar eclipse can occur at new moon");expect(migration).toContain("umbra");expect(explorer).toContain("Solar eclipse");});
 test("covers lunar eclipse",()=>{expect(migration).toContain("lunar eclipse can occur at full moon");expect(explorer).toContain("Lunar eclipse");});
 test("covers straight-line shadow formation",()=>{expect(migration).toContain("light travels approximately in straight lines");expect(migration).toContain("point-like source");expect(explorer).toContain("STRAIGHT-LINE LIGHT");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"earth-moon-effects"');expect(view).toContain("EarthMoonEffectsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to sixty-nine objectives",()=>{expect(migration).toContain('"objectivesBuilt":69');});
});
