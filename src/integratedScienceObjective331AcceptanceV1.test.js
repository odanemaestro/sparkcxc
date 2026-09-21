const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921073500_integrated_science_objective_331.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","WaterPropertiesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","waterPropertiesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.3.1 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.1"');expect(migration).toContain("3.3.1 Properties of Water");});
 test("covers freezing boiling and evaporation",()=>{expect(migration).toContain("freezes at about 0 °C");expect(migration).toContain("boils at about 100 °C");expect(migration).toContain("Evaporation can occur below the boiling point");});
 test("covers density and expansion on freezing",()=>{expect(migration).toContain("Water expands when it freezes");expect(migration).toContain("Ice is therefore less dense");expect(migration).toContain("Sea water is denser than fresh water");expect(explorer).toContain("Density");});
 test("covers specific heat capacity",()=>{expect(migration).toContain("high specific heat capacity");expect(migration).toContain("warm and cool slowly");expect(explorer).toContain("Specific heat");});
 test("covers solvent and surface tension",()=>{expect(migration).toContain("does not mean that water dissolves everything");expect(migration).toContain("surface tension");expect(explorer).toContain("Surface tension");});
 test("covers dissolved oxygen and seawater salt",()=>{expect(migration).toContain("Cold, moving water");expect(migration).toContain("sodium chloride");expect(explorer).toContain("Dissolved oxygen");});
 test("covers freshwater and marine fish osmosis",()=>{expect(migration).toContain("freshwater fish is placed in sea water");expect(migration).toContain("marine fish is placed in fresh water");expect(explorer).toContain("Freshwater fish in sea water");});
 test("covers coral requirements",()=>{expect(migration).toContain("photosynthetic algae");expect(migration).toContain("warm, shallow, clear tropical water");expect(explorer).toContain("CORAL REEFS");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"water-properties"');expect(view).toContain("WaterPropertiesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-five objectives",()=>{expect(migration).toContain('"objectivesBuilt":75');});
});
