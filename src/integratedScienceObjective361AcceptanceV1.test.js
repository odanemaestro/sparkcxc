const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921083500_integrated_science_objective_361.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","HouseholdChemicalsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","householdChemicalsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.6.1 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.6.1"');expect(migration).toContain("3.6.1 Uses of Common Household Chemicals");});
 test("covers common chemical uses",()=>{for(const term of ["Water is the most common solvent","Bleach","Acetone","Turpentine","Ammonia solution","Methylated spirit","Antacids","Baking powder"]) expect(migration).toContain(term);});
 test("covers hazard symbols",()=>{for(const term of ["flame pictogram","corrosion pictogram","skull-and-crossbones","exploding-bomb","exclamation-mark"]) expect(migration).toContain(term);expect(explorer).toContain("Hazard symbols");});
 test("renders recognisable hazard pictograms as SVGs",()=>{for(const term of ["spark-ghs-hazard-svg","hc-flame","hc-corrosion","hc-hand","hc-metal-bar","hc-skull-crossbones","hc-crossbone","hc-explosion","hc-fragment","hc-exclamation"])expect(explorer).toContain(term);expect(css).toContain(".spark-ghs-hazard-svg");expect(css).toContain(".hc-tube");expect(css).toContain(".hc-crossbone");});
 test("covers bleach ammonia warning",()=>{expect(migration).toContain("must never be mixed with ammonia-based cleaners");expect(migration).toContain("toxic chloramine gases");expect(explorer).toContain("Bleach + ammonia cleaner");});
 test("covers safe storage",()=>{expect(migration).toContain("original labelled containers");expect(migration).toContain("soft-drink or water bottles");expect(explorer).toContain("Storage");});
 test("covers economical and environmental use",()=>{expect(migration).toContain("recommended amount");expect(migration).toContain("biodegradable products");expect(explorer).toContain("Economical use");});
 test("covers hand sanitiser",()=>{expect(migration).toContain("alcohol as the active antimicrobial ingredient");expect(migration).toContain("flammable");expect(explorer).toContain("Hand sanitiser");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"household-chemicals"');expect(view).toContain("HouseholdChemicalsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-seven objectives",()=>{expect(migration).toContain('"objectivesBuilt":87');});
});
