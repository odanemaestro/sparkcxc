const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921085500_integrated_science_objective_365.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","SeparationTechniquesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","separationTechniquesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.6.5 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.6.5"');expect(migration).toContain("3.6.5 Separation Techniques");});
 test("covers filtration evaporation and crystallisation",()=>{expect(migration).toContain("Filtration separates");expect(migration).toContain("Evaporation is useful");expect(migration).toContain("Crystallisation is used");expect(explorer).toContain("Filtration");expect(explorer).toContain("sep-filter-paper");expect(explorer).toContain("residue");expect(explorer).toContain("filtrate");});
 test("renders complete simple distillation apparatus",()=>{expect(explorer).toContain("sep-thermometer");expect(explorer).toContain("sep-condenser-jacket");expect(explorer).toContain("cold water in");expect(explorer).toContain("water out");expect(explorer).toContain("sep-flame");expect(css).toContain(".spark-filtration-view svg");});
 test("renders crystallisation as an apparatus and process sequence",()=>{
  ["spark-crystallisation-svg","sep-evap-dish","sep-flame-small","sep-crystal-beaker","sep-crystal-solid","sep-crystal-funnel","sep-crystal-paper","mother liquor","do not boil to dryness when good crystals are required"].forEach(term=>expect(explorer).toContain(term));
  expect(css).toContain(".spark-crystallisation-svg");
  expect(css).toContain(".sep-crystal-solid");
  expect(css).toContain(".sep-crystal-funnel");
 });
 test("covers distillation",()=>{expect(migration).toContain("Distillation involves boiling");expect(migration).toContain("pure water from a solution such as ink");expect(migration).toContain("rum production");expect(explorer).toContain("Distillation");});
 test("covers chromatography",()=>{expect(migration).toContain("Chromatography separates");expect(migration).toContain("food colouring or ink");expect(explorer).toContain("Chromatography");});
 test("covers separating funnel",()=>{expect(migration).toContain("immiscible liquids such as oil and water");expect(explorer).toContain("Separating funnel");});
 test("covers sand salt sequence",()=>{expect(migration).toContain("First add water and stir");expect(migration).toContain("Filter the mixture");expect(migration).toContain("recover the salt");expect(explorer).toContain("Sand + salt");});
 test("covers non-aqueous stain solvent",()=>{expect(migration).toContain("Oil-based paint");expect(migration).toContain("turpentine");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"separation-techniques"');expect(view).toContain("SeparationTechniquesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety-one objectives",()=>{expect(migration).toContain('"objectivesBuilt":91');});
});
