const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921074500_integrated_science_objective_333.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","WaterUsesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","waterUsesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.3.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.3"');expect(migration).toContain("3.3.3 Uses of Water");});
 test("covers human-body roles",()=>{expect(migration).toContain("transports dissolved nutrients");expect(migration).toContain("Digestive enzymes");expect(migration).toContain("wastes in urine");expect(explorer).toContain("Human body");});
 test("covers household calculations",()=>{expect(migration).toContain("4 500 litres");expect(migration).toContain("12 m³");expect(migration).toContain("One cubic metre equals 1 000 litres");expect(explorer).toContain("Home use");});
 test("covers water conservation",()=>{expect(migration).toContain("Fix leaking pipes");expect(migration).toContain("Turn taps off");expect(explorer).toContain("Conservation");});
 test("distinguishes aquaculture mariculture and hydroponics",()=>{expect(migration).toContain("Aquaculture is the farming");expect(migration).toContain("Mariculture is aquaculture");expect(migration).toContain("Hydroponics is the cultivation");expect(explorer).toContain("Hydroponics");});
 test("covers energy and industrial uses",()=>{expect(migration).toContain("hydroelectric system");expect(migration).toContain("High-pressure steam");expect(migration).toContain("high specific heat capacity");expect(explorer).toContain("Energy and industry");});
 test("covers firefighting with safety limits",()=>{expect(migration).toContain("cooling burning material");expect(migration).toContain("live electrical equipment");expect(migration).toContain("burning cooking oil");expect(explorer).toContain("Fire and cooling");});
 test("covers precipitation in water supply",()=>{expect(migration).toContain("precipitation returns water");expect(explorer).toContain("precipitation");});
 test("renders the full water cycle as a scientific SVG",()=>{for(const term of ["spark-water-cycle-svg","evaporation","transpiration","condensation","precipitation","surface run-off","infiltration","groundwater flow","river flow","sea and ocean storage","lakes and rivers","fresh groundwater"]) expect(explorer).toContain(term);expect(css).toContain(".spark-water-cycle-svg");expect(css).toContain(".wu-groundwater-layer");expect(css).toContain(".wu-cycle-flow");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"water-uses"');expect(view).toContain("WaterUsesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-seven objectives",()=>{expect(migration).toContain('"objectivesBuilt":77');});
});
