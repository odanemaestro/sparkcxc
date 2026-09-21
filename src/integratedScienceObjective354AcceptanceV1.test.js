const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921082000_integrated_science_objective_354.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","AlloysExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","alloysExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.5.4 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.5.4"');expect(migration).toContain("3.5.4 Benefits of Alloys");});
 test("defines alloy and common compositions",()=>{expect(migration).toContain("An alloy is a mixture");expect(migration).toContain("Brass is an alloy of copper and zinc");expect(migration).toContain("Bronze is an alloy of copper and tin");expect(migration).toContain("Steel is primarily an alloy of iron and carbon");});
 test("explains why alloys are often harder",()=>{expect(migration).toContain("atoms of different sizes");expect(migration).toContain("cannot slide as easily");expect(explorer).toContain("Why alloys are harder");});
 test("covers stainless steel",()=>{expect(migration).toContain("containing chromium");expect(migration).toContain("cutlery, sinks and cookware");expect(explorer).toContain("Stainless steel");});
 test("covers brass use",()=>{expect(migration).toContain("door handles, locks");});
 test("covers solder",()=>{expect(migration).toContain("tin-lead alloy");expect(migration).toContain("relatively low melting point");expect(explorer).toContain("Solder");});
 test("distinguishes alloying and electroplating",()=>{expect(migration).toContain("Electroplating deposits only a thin surface layer");expect(explorer).toContain("Alloy vs plating");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"alloys"');expect(view).toContain("AlloysExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-four objectives",()=>{expect(migration).toContain('"objectivesBuilt":84');});
});
