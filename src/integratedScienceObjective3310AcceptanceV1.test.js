const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921075030_integrated_science_objective_3310.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","DivingEffectsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","divingEffectsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.3.10 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.10"');expect(migration).toContain("3.3.10 Effects of Diving on the Human Body");});
 test("covers pressure with depth",()=>{expect(migration).toContain("one atmosphere of pressure for every 10 m");expect(explorer).toContain("Pressure with depth");});
 test("covers decompression sickness accurately",()=>{expect(migration).toContain("nitrogen can form bubbles");expect(migration).toContain("controlled ascent");expect(migration).toContain("no single decompression-stop rule");expect(explorer).toContain("The bends");});
 test("covers hyperbaric treatment",()=>{expect(migration).toContain("hyperbaric chamber");expect(migration).toContain("high-concentration oxygen");});
 test("covers ear barotrauma",()=>{expect(migration).toContain("pressure outside the eardrum");expect(migration).toContain("barotrauma");expect(explorer).toContain("Ear pressure");});
 test("covers breath holding and gas embolism",()=>{expect(migration).toContain("Holding the breath");expect(migration).toContain("arterial gas embolism");expect(explorer).toContain("Breath-holding");});
 test("covers narcosis blackout and weights",()=>{expect(migration).toContain("nitrogen narcosis");expect(migration).toContain("Free-divers can lose consciousness");expect(migration).toContain("weights to offset buoyancy");});
 test("covers flying after diving carefully",()=>{expect(migration).toContain("Flying or travelling to altitude too soon");expect(migration).toContain("waiting intervals vary with the dive profile");expect(explorer).toContain("Flying after diving");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"diving-effects"');expect(view).toContain("DivingEffectsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves canonical total",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});